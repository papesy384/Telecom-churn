/**
 * Minimal Ant Design Integration - Core Components Only
 * Includes: Button, FloatButton, Typography, Label, Link
 */

class MinimalAntDComponents {
    constructor() {
        this.components = {
            button: this.createButton.bind(this),
            floatButton: this.createFloatButton.bind(this),
            typography: this.createTypography.bind(this),
            label: this.createLabel.bind(this),
            link: this.createLink.bind(this)
        };
    }

    // Create Ant Design Button
    createButton(options = {}) {
        const {
            text = 'Button',
            type = 'default', // primary, secondary, success, warning, error, default
            size = 'middle', // small, middle, large
            disabled = false,
            loading = false,
            icon = null,
            onClick = null,
            className = ''
        } = options;

        const button = document.createElement('button');
        button.className = `antd-btn antd-btn-${type} antd-btn-${size} ${className}`;
        button.disabled = disabled;
        
        if (loading) {
            button.classList.add('antd-btn-loading');
        }

        // Button content
        const content = document.createElement('span');
        content.className = 'antd-btn-content';
        
        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.className = 'antd-btn-icon';
            iconElement.innerHTML = icon;
            content.appendChild(iconElement);
        }
        
        const textElement = document.createElement('span');
        textElement.textContent = text;
        content.appendChild(textElement);
        
        button.appendChild(content);

        // Loading spinner
        if (loading) {
            const spinner = document.createElement('span');
            spinner.className = 'antd-btn-loading-icon';
            spinner.innerHTML = '⟳';
            button.appendChild(spinner);
        }

        // Event handling
        if (onClick) {
            button.addEventListener('click', onClick);
        }

        return button;
    }

    // Create Ant Design FloatButton
    createFloatButton(options = {}) {
        const {
            icon = '+',
            type = 'primary',
            position = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            onClick = null,
            className = ''
        } = options;

        const floatButton = document.createElement('button');
        floatButton.className = `antd-float-btn antd-float-btn-${type} antd-float-btn-${position} ${className}`;
        
        const iconElement = document.createElement('span');
        iconElement.className = 'antd-float-btn-icon';
        iconElement.textContent = icon;
        floatButton.appendChild(iconElement);

        if (onClick) {
            floatButton.addEventListener('click', onClick);
        }

        return floatButton;
    }

    // Create Ant Design Typography
    createTypography(options = {}) {
        const {
            text = '',
            type = 'p', // h1, h2, h3, h4, h5, h6, p, span
            level = 1, // for headings
            strong = false,
            italic = false,
            underline = false,
            strikethrough = false,
            code = false,
            className = ''
        } = options;

        const element = document.createElement(type);
        element.className = `antd-typography antd-typography-${type} ${className}`;
        
        if (strong) element.classList.add('antd-typography-strong');
        if (italic) element.classList.add('antd-typography-italic');
        if (underline) element.classList.add('antd-typography-underline');
        if (strikethrough) element.classList.add('antd-typography-strikethrough');
        if (code) element.classList.add('antd-typography-code');

        if (type.startsWith('h') && level) {
            element.classList.add(`antd-typography-level-${level}`);
        }

        element.textContent = text;
        return element;
    }

    // Create Ant Design Label
    createLabel(options = {}) {
        const {
            text = 'Label',
            required = false,
            disabled = false,
            htmlFor = '',
            className = ''
        } = options;

        const label = document.createElement('label');
        label.className = `antd-label ${className}`;
        label.htmlFor = htmlFor;
        
        if (required) {
            label.classList.add('antd-label-required');
        }
        
        if (disabled) {
            label.classList.add('antd-label-disabled');
        }

        const textElement = document.createElement('span');
        textElement.textContent = text;
        label.appendChild(textElement);

        if (required) {
            const requiredMark = document.createElement('span');
            requiredMark.className = 'antd-label-required-mark';
            requiredMark.textContent = ' *';
            label.appendChild(requiredMark);
        }

        return label;
    }

    // Create Ant Design Link
    createLink(options = {}) {
        const {
            text = 'Link',
            href = '#',
            target = '_self',
            disabled = false,
            underline = true,
            onClick = null,
            className = ''
        } = options;

        const link = document.createElement('a');
        link.className = `antd-link ${className}`;
        link.href = href;
        link.target = target;
        
        if (disabled) {
            link.classList.add('antd-link-disabled');
        }
        
        if (!underline) {
            link.classList.add('antd-link-no-underline');
        }

        link.textContent = text;

        if (onClick) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                onClick(e);
            });
        }

        return link;
    }






    // Apply components to existing elements
    applyToExisting() {
        console.log('🎨 Applying minimal Ant Design components...');

        // Replace existing buttons
        this.replaceButtons();
        
        // Apply typography
        this.applyTypography();
        
        // Add float button
        this.addFloatButton();


        console.log('✅ Minimal Ant Design components applied!');
    }

    replaceButtons() {
        // Replace main CTA buttons
        const ctaButtons = document.querySelectorAll('a[data-section="live-demo"]');
        ctaButtons.forEach(button => {
            const newButton = this.createButton({
                text: button.textContent.trim(),
                type: 'primary',
                size: 'large',
                onClick: () => {
                    const section = button.getAttribute('data-section');
                    if (typeof showSection === 'function') {
                        showSection(section);
                    }
                }
            });
            button.parentNode.replaceChild(newButton, button);
        });

        // Replace modal buttons
        const modalButtons = document.querySelectorAll('#detailModal button');
        modalButtons.forEach(button => {
            if (button.textContent.includes('Save')) {
                const newButton = this.createButton({
                    text: button.textContent.trim(),
                    type: 'primary',
                    onClick: () => {
                        if (typeof saveNoteLocally === 'function') {
                            saveNoteLocally(window.currentCustomerId);
                        }
                    }
                });
                button.parentNode.replaceChild(newButton, button);
            } else if (button.textContent.includes('Close')) {
                const newButton = this.createButton({
                    text: button.textContent.trim(),
                    onClick: () => {
                        if (typeof hideCustomerDetail === 'function') {
                            hideCustomerDetail();
                        }
                    }
                });
                button.parentNode.replaceChild(newButton, button);
            }
        });

        // Replace filter buttons
        const filterButtons = document.querySelectorAll('#arrFilterContainer button, button[onclick*="resetFilters"]');
        filterButtons.forEach(button => {
            const newButton = this.createButton({
                text: button.textContent.trim(),
                type: 'default',
                icon: '🔄',
                onClick: () => {
                    if (typeof resetFilters === 'function') {
                        resetFilters();
                    }
                }
            });
            button.parentNode.replaceChild(newButton, button);
        });

        // Replace test buttons in modal
        const testButtons = document.querySelectorAll('button[onclick*="Test"]');
        testButtons.forEach(button => {
            let buttonConfig = {
                text: button.textContent.trim(),
                size: 'small',
                onClick: button.onclick
            };
            
            if (button.textContent.includes('Visual')) {
                buttonConfig.type = 'primary';
                buttonConfig.icon = '🧪';
            } else if (button.textContent.includes('Performance')) {
                buttonConfig.type = 'success';
                buttonConfig.icon = '⚡';
            }
            
            const newButton = this.createButton(buttonConfig);
            button.parentNode.replaceChild(newButton, button);
        });

        // Replace navigation buttons
        const navButtons = document.querySelectorAll('a[data-section]:not(.antd-btn)');
        navButtons.forEach(button => {
            const isPrimary = button.classList.contains('btn-primary') || button.dataset.section === 'live-demo';
            const newButton = this.createButton({
                text: button.textContent.trim(),
                type: isPrimary ? 'primary' : 'ghost',
                size: 'large',
                href: button.href || '#',
                onClick: () => {
                    const section = button.getAttribute('data-section');
                    if (typeof showSection === 'function') {
                        showSection(section);
                    }
                }
            });
            button.parentNode.replaceChild(newButton, button);
        });
    }

    applyTypography() {
        // Apply to headings
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            if (!heading.classList.contains('antd-typography')) {
                heading.classList.add('antd-typography');
                heading.classList.add(`antd-typography-${heading.tagName.toLowerCase()}`);
            }
        });

        // Apply to paragraphs
        document.querySelectorAll('p').forEach(p => {
            if (!p.classList.contains('antd-typography')) {
                p.classList.add('antd-typography', 'antd-typography-p');
            }
        });
        
        // Apply to labels
        this.applyLabels();
        
        // Apply to links
        this.applyLinks();
    }
    
    applyLabels() {
        // Apply to form labels
        document.querySelectorAll('label:not(.antd-label)').forEach(label => {
            label.classList.add('antd-label');
            
            // Check if it's a required field
            const input = document.querySelector(`#${label.htmlFor}`);
            if (input && input.hasAttribute('required')) {
                label.classList.add('antd-label-required');
            }
        });
        
        // Apply to span elements that act as labels
        document.querySelectorAll('span.text-sm.font-medium.text-gray-500').forEach(span => {
            if (!span.classList.contains('antd-label')) {
                span.classList.add('antd-label');
            }
        });
    }
    
    applyLinks() {
        // Apply to navigation links
        document.querySelectorAll('a:not(.antd-btn):not(.antd-link)').forEach(link => {
            link.classList.add('antd-link');
            
            // Add hover effects for external links
            if (link.href && (link.href.startsWith('http') || link.href.startsWith('mailto'))) {
                link.classList.add('antd-link-external');
            }
        });
    }

    addFloatButton() {
        // Add enhanced float button group for quick actions
        const existingFloatButton = document.querySelector('.antd-float-btn');
        if (!existingFloatButton) {
            // Create main float button
            const mainFloatButton = this.createFloatButton({
                icon: '🚀',
                type: 'primary',
                position: 'bottom-right',
                onClick: () => {
                    this.toggleFloatButtonGroup();
                }
            });
            
            // Create float button group (initially hidden)
            const floatButtonGroup = document.createElement('div');
            floatButtonGroup.className = 'antd-float-btn-group antd-float-btn-bottom-right';
            floatButtonGroup.style.bottom = '90px';
            floatButtonGroup.style.right = '24px';
            floatButtonGroup.style.display = 'none';
            floatButtonGroup.id = 'antd-float-btn-group';
            
            // Add action buttons to group
            const actionButtons = [
                {
                    icon: '💬',
                    type: 'default',
                    onClick: () => alert('Contact Support - Feature coming soon!')
                },
                {
                    icon: '📊',
                    type: 'default',
                    onClick: () => {
                        const section = document.getElementById('live-demo');
                        if (section) {
                            section.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                },
                {
                    icon: '🧪',
                    type: 'default',
                    onClick: () => {
                        if (typeof runVisualEnhancementTests === 'function') {
                            runVisualEnhancementTests();
                        }
                    }
                }
            ];
            
            actionButtons.forEach(config => {
                const actionButton = this.createFloatButton(config);
                floatButtonGroup.appendChild(actionButton);
            });
            
            document.body.appendChild(mainFloatButton);
            document.body.appendChild(floatButtonGroup);
        }
    }
    
    toggleFloatButtonGroup() {
        const group = document.getElementById('antd-float-btn-group');
        if (group) {
            const isVisible = group.style.display !== 'none';
            group.style.display = isVisible ? 'none' : 'flex';
            
            // Animate the buttons
            if (!isVisible) {
                const buttons = group.querySelectorAll('.antd-float-btn');
                buttons.forEach((button, index) => {
                    button.style.transform = 'scale(0)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                        button.style.transition = 'transform 0.2s ease';
                    }, index * 50);
                });
            }
        }
    }

}

// Initialize minimal Ant Design components
const minimalAntD = new MinimalAntDComponents();

// Auto-apply when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => minimalAntD.applyToExisting(), 1000);
    });
} else {
    setTimeout(() => minimalAntD.applyToExisting(), 1000);
}

// Export for global access
window.minimalAntD = minimalAntD;

console.log('🎨 Minimal Ant Design components loaded!');
console.log('Available components: button, floatButton, typography, label, link');
