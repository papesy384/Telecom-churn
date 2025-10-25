/**
 * SAP Fiori Transformation
 * Converts the existing dashboard to SAP Fiori design
 */

class SAPFioriTransformer {
    constructor() {
        this.isTransformed = false;
        this.originalClasses = new Map();
    }

    // Transform the entire page to SAP Fiori design
    transformToSAP() {
        console.log('🔄 Transforming to SAP Fiori design...');
        
        // Apply SAP shell structure
        this.createSAPShell();
        
        // Transform navigation
        this.transformNavigation();
        
        // Transform main content
        this.transformMainContent();
        
        // Transform cards and components
        this.transformCards();
        
        // Transform buttons
        this.transformButtons();
        
        // Transform tables
        this.transformTables();
        
        // Transform forms
        this.transformForms();
        
        // Apply SAP styling
        this.applySAPStyling();
        
        this.isTransformed = true;
        console.log('✅ SAP Fiori transformation complete!');
    }

    // Revert back to original design
    revertFromSAP() {
        console.log('🔄 Reverting from SAP Fiori design...');
        
        // Remove SAP shell
        this.removeSAPShell();
        
        // Restore original classes
        this.restoreOriginalClasses();
        
        // Remove SAP stylesheet
        this.removeSAPStylesheet();
        
        this.isTransformed = false;
        console.log('✅ Reverted to original design!');
    }

    // Create SAP Shell structure
    createSAPShell() {
        const body = document.body;
        
        // Store original body classes
        this.originalClasses.set('body', body.className);
        
        // Create SAP shell wrapper
        const sapShell = document.createElement('div');
        sapShell.className = 'sap-shell';
        sapShell.id = 'sap-shell';
        
        // Create SAP header
        const sapHeader = this.createSAPHeader();
        sapShell.appendChild(sapHeader);
        
        // Create SAP content area
        const sapContent = document.createElement('div');
        sapContent.className = 'sap-shell-content';
        sapContent.id = 'sap-content';
        
        // Move existing content to SAP content area
        const existingContent = document.querySelector('main') || document.querySelector('.container') || body;
        if (existingContent && existingContent !== body) {
            sapContent.appendChild(existingContent);
        } else {
            // Move all body children to SAP content
            while (body.firstChild && body.firstChild !== sapShell) {
                sapContent.appendChild(body.firstChild);
            }
        }
        
        sapShell.appendChild(sapContent);
        
        // Clear body and add SAP shell
        body.innerHTML = '';
        body.appendChild(sapShell);
        body.className = 'sap-body';
    }

    // Create SAP Header
    createSAPHeader() {
        const header = document.createElement('header');
        header.className = 'sap-shell-header';
        
        const headerContent = document.createElement('div');
        headerContent.className = 'sap-shell-header-content';
        
        // Logo
        const logo = document.createElement('a');
        logo.className = 'sap-shell-logo';
        logo.href = '#';
        logo.textContent = 'Telecom Churn Prediction';
        
        // Navigation
        const nav = document.createElement('nav');
        nav.className = 'sap-shell-nav';
        
        const navItems = [
            { text: 'Dashboard', href: '#home', active: true },
            { text: 'Analytics', href: '#analytics' },
            { text: 'Customers', href: '#customers' },
            { text: 'Reports', href: '#reports' }
        ];
        
        navItems.forEach(item => {
            const navItem = document.createElement('a');
            navItem.className = `sap-shell-nav-item ${item.active ? 'active' : ''}`;
            navItem.href = item.href;
            navItem.textContent = item.text;
            nav.appendChild(navItem);
        });
        
        // User area
        const userArea = document.createElement('div');
        userArea.className = 'sap-shell-user';
        userArea.innerHTML = `
            <span class="sap-icon sap-icon-user"></span>
            <span>Admin User</span>
        `;
        
        headerContent.appendChild(logo);
        headerContent.appendChild(nav);
        headerContent.appendChild(userArea);
        header.appendChild(headerContent);
        
        return header;
    }

    // Transform main content to SAP page structure
    transformMainContent() {
        const content = document.getElementById('sap-content');
        if (!content) return;
        
        // Create SAP page wrapper
        const sapPage = document.createElement('div');
        sapPage.className = 'sap-page';
        
        // Create page header
        const pageHeader = document.createElement('div');
        pageHeader.className = 'sap-page-header';
        
        const pageTitle = document.createElement('h1');
        pageTitle.className = 'sap-page-title';
        pageTitle.textContent = 'Churn Prediction Dashboard';
        
        const pageSubtitle = document.createElement('p');
        pageSubtitle.className = 'sap-page-subtitle';
        pageSubtitle.textContent = 'AI-powered customer retention analytics and intervention management';
        
        const pageActions = document.createElement('div');
        pageActions.className = 'sap-page-actions';
        pageActions.innerHTML = `
            <button class="sap-btn sap-btn-primary">
                <span class="sap-icon sap-icon-add"></span>
                New Analysis
            </button>
            <button class="sap-btn sap-btn-secondary">
                <span class="sap-icon sap-icon-filter"></span>
                Filter
            </button>
            <button class="sap-btn sap-btn-ghost">
                <span class="sap-icon sap-icon-settings"></span>
                Settings
            </button>
        `;
        
        pageHeader.appendChild(pageTitle);
        pageHeader.appendChild(pageSubtitle);
        pageHeader.appendChild(pageActions);
        
        // Move existing content
        const existingContent = content.innerHTML;
        content.innerHTML = '';
        
        sapPage.appendChild(pageHeader);
        
        const contentArea = document.createElement('div');
        contentArea.innerHTML = existingContent;
        sapPage.appendChild(contentArea);
        
        content.appendChild(sapPage);
    }

    // Transform cards to SAP style
    transformCards() {
        // Transform existing cards
        const cards = document.querySelectorAll('.customer-card, .card, .bg-white');
        cards.forEach(card => {
            this.originalClasses.set(card, card.className);
            
            // Create SAP card structure
            const sapCard = document.createElement('div');
            sapCard.className = 'sap-card';
            
            // Extract title from card
            const title = card.querySelector('h1, h2, h3, h4, h5, h6');
            if (title) {
                const cardHeader = document.createElement('div');
                cardHeader.className = 'sap-card-header';
                
                const cardTitle = document.createElement('h3');
                cardTitle.className = 'sap-card-title';
                cardTitle.textContent = title.textContent;
                
                cardHeader.appendChild(cardTitle);
                sapCard.appendChild(cardHeader);
            }
            
            // Card content
            const cardContent = document.createElement('div');
            cardContent.className = 'sap-card-content';
            
            // Move existing content (excluding title)
            const contentElements = Array.from(card.children).filter(child => 
                !['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(child.tagName)
            );
            
            contentElements.forEach(element => {
                cardContent.appendChild(element.cloneNode(true));
            });
            
            sapCard.appendChild(cardContent);
            
            // Replace original card
            card.parentNode.replaceChild(sapCard, card);
        });
    }

    // Transform buttons to SAP style
    transformButtons() {
        const buttons = document.querySelectorAll('button:not(.sap-btn), a.btn-primary, a.group');
        buttons.forEach(button => {
            this.originalClasses.set(button, button.className);
            
            let sapButtonClass = 'sap-btn';
            
            // Determine button type based on existing classes
            if (button.classList.contains('btn-primary') || 
                button.classList.contains('bg-orange-500') || 
                button.classList.contains('bg-orange-600')) {
                sapButtonClass += ' sap-btn-primary';
            } else if (button.classList.contains('bg-green-500')) {
                sapButtonClass += ' sap-btn-positive';
            } else if (button.classList.contains('bg-red-500')) {
                sapButtonClass += ' sap-btn-negative';
            } else if (button.classList.contains('bg-blue-500')) {
                sapButtonClass += ' sap-btn-secondary';
            } else {
                sapButtonClass += ' sap-btn-ghost';
            }
            
            button.className = sapButtonClass;
            
            // Add SAP icons based on button text
            if (button.textContent.includes('Save')) {
                button.innerHTML = `<span class="sap-icon sap-icon-save"></span> ${button.textContent}`;
            } else if (button.textContent.includes('Reset')) {
                button.innerHTML = `<span class="sap-icon sap-icon-cancel"></span> ${button.textContent}`;
            } else if (button.textContent.includes('Test')) {
                button.innerHTML = `<span class="sap-icon sap-icon-check"></span> ${button.textContent}`;
            }
        });
    }

    // Transform tables to SAP style
    transformTables() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            this.originalClasses.set(table, table.className);
            table.className = 'sap-table';
        });
    }

    // Transform forms to SAP style
    transformForms() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            this.originalClasses.set(input, input.className);
            input.className = 'sap-input';
        });
        
        const labels = document.querySelectorAll('label');
        labels.forEach(label => {
            this.originalClasses.set(label, label.className);
            label.className = 'sap-label';
        });
    }

    // Transform navigation
    transformNavigation() {
        // Hide existing navigation
        const existingNav = document.querySelector('nav, .navigation');
        if (existingNav) {
            existingNav.style.display = 'none';
        }
    }

    // Apply SAP styling and load stylesheet
    applySAPStyling() {
        // Load SAP Fiori CSS
        const sapCSS = document.createElement('link');
        sapCSS.rel = 'stylesheet';
        sapCSS.href = 'sap-fiori.css';
        sapCSS.id = 'sap-fiori-css';
        document.head.appendChild(sapCSS);
        
        // Add SAP-specific classes to elements
        const riskElements = document.querySelectorAll('[class*="risk"], [class*="Risk"]');
        riskElements.forEach(element => {
            const riskText = element.textContent.toLowerCase();
            if (riskText.includes('high') || riskText.includes('80')) {
                element.className += ' sap-status sap-status-negative';
            } else if (riskText.includes('medium') || riskText.includes('60')) {
                element.className += ' sap-status sap-status-critical';
            } else if (riskText.includes('low')) {
                element.className += ' sap-status sap-status-positive';
            }
        });
        
        // Transform grid layouts
        const grids = document.querySelectorAll('.grid, .flex');
        grids.forEach(grid => {
            if (grid.children.length === 2) {
                grid.className = 'sap-grid sap-grid-2';
            } else if (grid.children.length === 3) {
                grid.className = 'sap-grid sap-grid-3';
            } else if (grid.children.length >= 4) {
                grid.className = 'sap-grid sap-grid-4';
            }
        });
    }

    // Remove SAP shell
    removeSAPShell() {
        const sapShell = document.getElementById('sap-shell');
        if (sapShell) {
            const content = document.getElementById('sap-content');
            if (content) {
                // Move content back to body
                while (content.firstChild) {
                    document.body.appendChild(content.firstChild);
                }
            }
            sapShell.remove();
        }
    }

    // Restore original classes
    restoreOriginalClasses() {
        this.originalClasses.forEach((originalClass, element) => {
            if (element && element.nodeType === Node.ELEMENT_NODE) {
                element.className = originalClass;
            }
        });
        this.originalClasses.clear();
    }

    // Remove SAP stylesheet
    removeSAPStylesheet() {
        const sapCSS = document.getElementById('sap-fiori-css');
        if (sapCSS) {
            sapCSS.remove();
        }
    }

    // Toggle between SAP and original design
    toggle() {
        if (this.isTransformed) {
            this.revertFromSAP();
        } else {
            this.transformToSAP();
        }
    }

    // Create SAP-style customer cards
    createSAPCustomerCard(customer) {
        const card = document.createElement('div');
        card.className = 'sap-card';
        card.onclick = () => showCustomerDetail(customer.Customer_ID);
        
        // Card header
        const header = document.createElement('div');
        header.className = 'sap-card-header';
        
        const title = document.createElement('h3');
        title.className = 'sap-card-title';
        title.textContent = customer.Customer_Name;
        
        const subtitle = document.createElement('p');
        subtitle.className = 'sap-card-subtitle';
        subtitle.textContent = `Customer ID: ${customer.Customer_ID}`;
        
        header.appendChild(title);
        header.appendChild(subtitle);
        
        // Card content
        const content = document.createElement('div');
        content.className = 'sap-card-content';
        
        const riskStatus = customer.riskScore >= 80 ? 'negative' : 
                          customer.riskScore >= 60 ? 'critical' : 'positive';
        
        content.innerHTML = `
            <div class="sap-grid sap-grid-2 sap-mb-md">
                <div>
                    <div class="sap-label">Risk Score</div>
                    <div class="sap-status sap-status-${riskStatus}">${customer.riskScore}% Risk</div>
                </div>
                <div>
                    <div class="sap-label">Annual Revenue</div>
                    <div style="font-size: 1.25rem; font-weight: 600; color: var(--sap-brand-primary);">
                        $${customer.LTV.toLocaleString()}
                    </div>
                </div>
            </div>
            <div class="sap-label">Top Drivers</div>
            <div style="margin-top: 0.5rem;">
                ${customer.topDrivers.map(driver => {
                    const isActionable = driver.includes('[Actionable]');
                    const statusClass = isActionable ? 'sap-status-critical' : 'sap-status-information';
                    return `<span class="sap-status ${statusClass}" style="margin-right: 0.5rem; margin-bottom: 0.25rem; display: inline-block;">${driver}</span>`;
                }).join('')}
            </div>
        `;
        
        // Card actions
        const actions = document.createElement('div');
        actions.className = 'sap-card-actions';
        actions.innerHTML = `
            <button class="sap-btn sap-btn-ghost">
                <span class="sap-icon sap-icon-info"></span>
                Details
            </button>
        `;
        
        card.appendChild(header);
        card.appendChild(content);
        card.appendChild(actions);
        
        return card;
    }
}

// Initialize SAP Fiori Transformer
const sapTransformer = new SAPFioriTransformer();

// Make it globally available
window.sapTransformer = sapTransformer;

// Auto-transform on load (can be disabled)
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 SAP Fiori Transformer loaded');
    
    // Add toggle button to the page
    setTimeout(() => {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = '🔄 Toggle SAP Design';
        toggleButton.className = 'sap-btn sap-btn-secondary';
        toggleButton.style.position = 'fixed';
        toggleButton.style.top = '10px';
        toggleButton.style.right = '10px';
        toggleButton.style.zIndex = '9999';
        toggleButton.onclick = () => sapTransformer.toggle();
        document.body.appendChild(toggleButton);
    }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SAPFioriTransformer;
}
