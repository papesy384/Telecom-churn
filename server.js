const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = 3000;

// Figma Configuration
const FIGMA_FILE_KEY = 'YOUR_FIGMA_FILE_KEY_HERE';
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN; // Set this in your environment

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Cache for Figma data (to reduce API calls)
let figmaDataCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 1000 * 60 * 10; // 10 minutes

/**
 * Extract design tokens from Figma file
 */
function extractDesignTokens(figmaData) {
    const tokens = {
        colors: {},
        typography: {},
        spacing: {},
        components: {}
    };

    try {
        // Extract colors from styles
        if (figmaData.styles) {
            Object.entries(figmaData.styles).forEach(([key, style]) => {
                if (style.styleType === 'FILL') {
                    const styleName = style.name.toLowerCase().replace(/\s+/g, '-');
                    tokens.colors[styleName] = style;
                }
                if (style.styleType === 'TEXT') {
                    const styleName = style.name.toLowerCase().replace(/\s+/g, '-');
                    tokens.typography[styleName] = style;
                }
            });
        }

        // Extract color variables
        if (figmaData.document && figmaData.document.children) {
            figmaData.document.children.forEach(page => {
                if (page.children) {
                    page.children.forEach(node => {
                        if (node.type === 'RECTANGLE' && node.fills && node.fills.length > 0) {
                            const fill = node.fills[0];
                            if (fill.type === 'SOLID' && fill.color) {
                                const color = fill.color;
                                const hex = rgbToHex(color.r, color.g, color.b);
                                const name = node.name.toLowerCase().replace(/\s+/g, '-');
                                tokens.colors[name] = hex;
                            }
                        }
                    });
                }
            });
        }

        // Extract components
        if (figmaData.components) {
            tokens.components = Object.keys(figmaData.components).reduce((acc, key) => {
                const component = figmaData.components[key];
                acc[component.name] = {
                    key: component.key,
                    description: component.description || ''
                };
                return acc;
            }, {});
        }

    } catch (error) {
        console.error('Error extracting design tokens:', error);
    }

    return tokens;
}

/**
 * Convert RGB to Hex
 */
function rgbToHex(r, g, b) {
    const toHex = (val) => {
        const hex = Math.round(val * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * API Endpoint: Get Figma Design Tokens
 */
app.get('/api/figma/design-tokens', async (req, res) => {
    try {
        // Check if we have cached data
        const now = Date.now();
        if (figmaDataCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
            console.log('Returning cached Figma data');
            return res.json(figmaDataCache);
        }

        // Check if access token is provided
        if (!FIGMA_ACCESS_TOKEN) {
            return res.status(400).json({
                error: 'Figma access token not configured',
                message: 'Please set FIGMA_ACCESS_TOKEN environment variable',
                fallback: true,
                tokens: getDefaultDesignTokens()
            });
        }

        // Fetch from Figma API
        console.log('Fetching from Figma API...');
        const response = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_KEY}`, {
            headers: {
                'X-Figma-Token': FIGMA_ACCESS_TOKEN
            }
        });

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
        }

        const figmaData = await response.json();
        const tokens = extractDesignTokens(figmaData);

        // Cache the data
        figmaDataCache = {
            tokens,
            metadata: {
                name: figmaData.name,
                lastModified: figmaData.lastModified,
                version: figmaData.version,
                fetchedAt: new Date().toISOString()
            }
        };
        cacheTimestamp = now;

        res.json(figmaDataCache);

    } catch (error) {
        console.error('Error fetching Figma data:', error);
        res.status(500).json({
            error: error.message,
            fallback: true,
            tokens: getDefaultDesignTokens()
        });
    }
});

/**
 * API Endpoint: Get specific component from Figma
 */
app.get('/api/figma/component/:componentId', async (req, res) => {
    try {
        const { componentId } = req.params;

        if (!FIGMA_ACCESS_TOKEN) {
            return res.status(400).json({
                error: 'Figma access token not configured'
            });
        }

        const response = await fetch(
            `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${componentId}`,
            {
                headers: {
                    'X-Figma-Token': FIGMA_ACCESS_TOKEN
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching component:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * API Endpoint: Get Figma file images/exports
 */
app.get('/api/figma/images', async (req, res) => {
    try {
        const { ids, scale = 1, format = 'png' } = req.query;

        if (!FIGMA_ACCESS_TOKEN) {
            return res.status(400).json({
                error: 'Figma access token not configured'
            });
        }

        if (!ids) {
            return res.status(400).json({
                error: 'Node IDs required'
            });
        }

        const response = await fetch(
            `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${ids}&scale=${scale}&format=${format}`,
            {
                headers: {
                    'X-Figma-Token': FIGMA_ACCESS_TOKEN
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Default/Fallback Design Tokens
 */
function getDefaultDesignTokens() {
    return {
        colors: {
            'primary-orange': '#F97316',
            'dark-bg': '#171717',
            'dark-card': '#262626',
            'light-text': '#f5f5f5',
            'success': '#10B981',
            'error': '#EF4444',
            'warning': '#F59E0B',
            'info': '#3B82F6'
        },
        typography: {
            'font-family': "'Inter', sans-serif",
            'base-size': '16px',
            'hero-title': 'clamp(3rem, 8vw, 5.5rem)',
            'section-title': 'clamp(2.25rem, 5vw, 3.75rem)',
            'body-text': '16px'
        },
        spacing: {
            'xs': '0.5rem',
            'sm': '1rem',
            'md': '1.5rem',
            'lg': '2rem',
            'xl': '3rem',
            '2xl': '4rem'
        },
        borderRadius: {
            'sm': '0.375rem',
            'md': '0.5rem',
            'lg': '0.75rem',
            'xl': '1rem'
        }
    };
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        figmaConfigured: !!FIGMA_ACCESS_TOKEN,
        cacheStatus: figmaDataCache ? 'populated' : 'empty',
        timestamp: new Date().toISOString()
    });
});

/**
 * Clear cache endpoint (for development)
 */
app.post('/api/cache/clear', (req, res) => {
    figmaDataCache = null;
    cacheTimestamp = null;
    res.json({ message: 'Cache cleared successfully' });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  🚀 Figma Design Token API Server                         ║
╠════════════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}                  ║
║  Figma File Key: ${FIGMA_FILE_KEY.substring(0, 20)}...           ║
║  Access Token: ${FIGMA_ACCESS_TOKEN ? '✓ Configured' : '✗ Not configured'}                 ║
╠════════════════════════════════════════════════════════════╣
║  API Endpoints:                                            ║
║  • GET  /api/health                                        ║
║  • GET  /api/figma/design-tokens                           ║
║  • GET  /api/figma/component/:id                           ║
║  • GET  /api/figma/images?ids=...                          ║
║  • POST /api/cache/clear                                   ║
╠════════════════════════════════════════════════════════════╣
║  Setup Instructions:                                       ║
║  1. Get your Figma access token from:                      ║
║     https://www.figma.com/developers/api#access-tokens     ║
║  2. Set environment variable:                              ║
║     export FIGMA_ACCESS_TOKEN="your-token-here"            ║
║  3. Restart the server                                     ║
╚════════════════════════════════════════════════════════════╝
    `);

    if (!FIGMA_ACCESS_TOKEN) {
        console.warn(`
⚠️  WARNING: FIGMA_ACCESS_TOKEN not configured!
   The API will return fallback design tokens.
   
   To fix this:
   1. Visit: https://www.figma.com/settings
   2. Generate a Personal Access Token
   3. Set it: export FIGMA_ACCESS_TOKEN="your-token-here"
   4. Restart server: node server.js
        `);
    }
});

