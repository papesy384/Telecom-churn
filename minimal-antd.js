/**
 * Minimal Ant Design Integration - Core Components Only
 * Includes: Button, FloatButton, Typography, Label, Link, Layout, Divider, Text Line, Space, Slot
 */

class MinimalAntDComponents {
    constructor() {
        this.components = {
            button: this.createButton.bind(this),
            floatButton: this.createFloatButton.bind(this),
            typography: this.createTypography.bind(this),
            label: this.createLabel.bind(this),
            link: this.createLink.bind(this),
            layout: this.createLayout.bind(this),
            divider: this.createDivider.bind(this),
            textLine: this.createTextLine.bind(this),
            space: this.createSpace.bind(this),
            slot: this.createSlot.bind(this)
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

    // Create Ant Design Layout
    createLayout(options = {}) {
        const {
            header = null,
            content = '',
            footer = null,
            sider = null,
            className = ''
        } = options;

        const layout = document.createElement('div');
        layout.className = `antd-layout ${className}`;

        // Layout header
        if (header) {
            const headerElement = document.createElement('div');
            headerElement.className = 'antd-layout-header';
            if (typeof header === 'string') {
                headerElement.textContent = header;
            } else if (header instanceof HTMLElement) {
                headerElement.appendChild(header);
            }
            layout.appendChild(headerElement);
        }

        // Layout content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'antd-layout-content';
        
        // Layout sider
        if (sider) {
            const siderElement = document.createElement('div');
            siderElement.className = 'antd-layout-sider antd-layout-sider-expanded';
            if (typeof sider === 'string') {
                siderElement.innerHTML = sider;
            } else if (sider instanceof HTMLElement) {
                siderElement.appendChild(sider);
            }
            contentContainer.appendChild(siderElement);
        }

        // Main content
        const mainContent = document.createElement('div');
        mainContent.className = 'antd-layout-content';
        if (typeof content === 'string') {
            mainContent.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            mainContent.appendChild(content);
        }
        contentContainer.appendChild(mainContent);

        layout.appendChild(contentContainer);

        // Layout footer
        if (footer) {
            const footerElement = document.createElement('div');
            footerElement.className = 'antd-layout-footer';
            if (typeof footer === 'string') {
                footerElement.textContent = footer;
            } else if (footer instanceof HTMLElement) {
                footerElement.appendChild(footer);
            }
            layout.appendChild(footerElement);
        }

        return layout;
    }

    // Create Ant Design Divider
    createDivider(options = {}) {
        const {
            type = 'horizontal', // horizontal, vertical
            text = '',
            orientation = 'center', // left, center, right
            dashed = false,
            className = ''
        } = options;

        const divider = document.createElement('div');
        divider.className = `antd-divider antd-divider-${type} ${dashed ? 'antd-divider-dashed' : ''} ${className}`;

        if (text) {
            divider.classList.add('antd-divider-with-text');
            if (orientation === 'left') {
                divider.classList.add('antd-divider-with-text-left');
            } else if (orientation === 'right') {
                divider.classList.add('antd-divider-with-text-right');
            }

            const textElement = document.createElement('span');
            textElement.className = 'antd-divider-text';
            textElement.textContent = text;
            divider.appendChild(textElement);
        }

        return divider;
    }

    // Create Ant Design Text Line
    createTextLine(options = {}) {
        const {
            text = '',
            type = 'solid', // solid, dashed, dotted
            className = ''
        } = options;

        const textLine = document.createElement('span');
        textLine.className = `antd-text-line antd-text-line-${type} ${className}`;
        textLine.textContent = text;

        return textLine;
    }

    // Create Ant Design Space
    createSpace(options = {}) {
        const {
            direction = 'horizontal', // horizontal, vertical
            align = 'center', // start, center, end, baseline
            size = 'middle', // small, middle, large
            wrap = false,
            children = [],
            className = ''
        } = options;

        const space = document.createElement('div');
        space.className = `antd-space ${direction === 'vertical' ? 'antd-space-vertical' : ''} antd-space-align-${align} ${className}`;

        children.forEach((child, index) => {
            const spaceItem = document.createElement('div');
            spaceItem.className = 'antd-space-item';
            
            if (typeof child === 'string') {
                spaceItem.textContent = child;
            } else if (child instanceof HTMLElement) {
                spaceItem.appendChild(child);
            }
            
            space.appendChild(spaceItem);
        });

        return space;
    }

    // Create Ant Design Slot
    createSlot(options = {}) {
        const {
            display = 'block', // block, inline, flex
            direction = 'row', // row, column
            justify = 'start', // start, center, end, between, around
            align = 'start', // start, center, end, stretch, baseline
            wrap = false,
            content = '',
            className = ''
        } = options;

        const slot = document.createElement('div');
        slot.className = `antd-slot antd-slot-${display} ${className}`;

        if (display === 'flex') {
            slot.classList.add(`antd-slot-flex-${direction}`);
            slot.classList.add(`antd-slot-justify-${justify}`);
            slot.classList.add(`antd-slot-align-${align}`);
            
            if (wrap) {
                slot.classList.add('antd-slot-flex-wrap');
            } else {
                slot.classList.add('antd-slot-flex-nowrap');
            }
        }

        if (typeof content === 'string') {
            slot.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            slot.appendChild(content);
        }

        return slot;
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

        // Apply Layout components
        this.applyLayoutComponents();

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
        const filterButtons = document.querySelectorAll('#arrFilterContainer button');
        filterButtons.forEach(button => {
            const newButton = this.createButton({
                text: button.textContent.trim(),
                type: 'secondary',
                onClick: () => {
                    if (typeof resetFilters === 'function') {
                        resetFilters();
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
    }

    addFloatButton() {
        // Add float button for quick actions
        const existingFloatButton = document.querySelector('.antd-float-btn');
        if (!existingFloatButton) {
            const floatButton = this.createFloatButton({
                icon: '💬',
                type: 'primary',
                position: 'bottom-right',
                onClick: () => {
                    alert('Quick Action: Contact Support');
                }
            });
        document.body.appendChild(floatButton);
    }

    applyLayoutComponents() {
        console.log('🏗️ Applying layout components...');

        // Add dividers between major sections
        this.addSectionDividers();

        // Apply space components to button groups
        this.applySpaceComponents();

        // Apply slot components to content areas
        this.applySlotComponents();

        // Add text lines for visual separation
        this.addTextLines();
    }

    addSectionDividers() {
        // Add dividers between major sections
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index > 0) { // Don't add divider before first section
                const divider = this.createDivider({
                    type: 'horizontal',
                    className: 'my-8'
                });
                section.parentNode.insertBefore(divider, section);
            }
        });
    }

    applySpaceComponents() {
        // Apply space to button groups
        const buttonGroups = document.querySelectorAll('.flex.gap-4, .flex.items-center.gap-4');
        buttonGroups.forEach(group => {
            if (!group.classList.contains('antd-space')) {
                group.classList.add('antd-space', 'antd-space-horizontal', 'antd-space-align-center');
            }
        });

        // Apply space to form elements
        const formGroups = document.querySelectorAll('.space-y-4, .space-y-6');
        formGroups.forEach(group => {
            if (!group.classList.contains('antd-space')) {
                group.classList.add('antd-space', 'antd-space-vertical', 'antd-space-align-start');
            }
        });
    }

    applySlotComponents() {
        // Apply slot components to main content areas
        const mainContent = document.querySelector('main');
        if (mainContent && !mainContent.classList.contains('antd-slot')) {
            mainContent.classList.add('antd-slot', 'antd-slot-flex', 'antd-slot-flex-column');
        }

        // Apply slot to dashboard sections
        const dashboardSections = document.querySelectorAll('#live-demo .grid, #live-demo .flex');
        dashboardSections.forEach(section => {
            if (!section.classList.contains('antd-slot')) {
                section.classList.add('antd-slot', 'antd-slot-flex', 'antd-slot-flex-row', 'antd-slot-justify-between');
            }
        });
    }

    addTextLines() {
        // Add text lines for visual separation in modals
        const modalContent = document.querySelector('#modalContent');
        if (modalContent) {
            const sections = modalContent.querySelectorAll('.space-y-6 > div');
            sections.forEach((section, index) => {
                if (index > 0) {
                    const textLine = this.createTextLine({
                        text: '',
                        type: 'solid',
                        className: 'my-4'
                    });
                    section.parentNode.insertBefore(textLine, section);
                }
            });
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
