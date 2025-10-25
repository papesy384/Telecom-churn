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

    // Enhanced Ant Design Layout
    createLayout(options = {}) {
        const {
            header = null,
            content = '',
            footer = null,
            sider = null,
            className = '',
            hasSider = false,
            siderCollapsed = false,
            siderCollapsible = false,
            siderWidth = 200,
            siderBreakpoint = 'lg',
            theme = 'light' // light, dark
        } = options;

        const layout = document.createElement('div');
        layout.className = `antd-layout antd-layout-${theme} ${hasSider ? 'antd-layout-has-sider' : ''} ${className}`;

        // Layout header
        if (header) {
            const headerElement = document.createElement('div');
            headerElement.className = `antd-layout-header antd-layout-header-${theme}`;
            
            if (typeof header === 'string') {
                headerElement.innerHTML = header;
            } else if (header instanceof HTMLElement) {
                headerElement.appendChild(header);
            } else if (typeof header === 'object') {
                // Enhanced header with navigation
                const headerContent = document.createElement('div');
                headerContent.className = 'antd-layout-header-content';
                
                if (header.logo) {
                    const logo = document.createElement('div');
                    logo.className = 'antd-layout-header-logo';
                    logo.innerHTML = header.logo;
                    headerContent.appendChild(logo);
                }
                
                if (header.nav) {
                    const nav = document.createElement('nav');
                    nav.className = 'antd-layout-header-nav';
                    nav.innerHTML = header.nav;
                    headerContent.appendChild(nav);
                }
                
                if (header.actions) {
                    const actions = document.createElement('div');
                    actions.className = 'antd-layout-header-actions';
                    actions.innerHTML = header.actions;
                    headerContent.appendChild(actions);
                }
                
                headerElement.appendChild(headerContent);
            }
            
            layout.appendChild(headerElement);
        }

        // Layout content container
        const contentContainer = document.createElement('div');
        contentContainer.className = 'antd-layout-content-wrapper';
        
        // Layout sider
        if (sider || hasSider) {
            const siderElement = document.createElement('div');
            siderElement.className = `antd-layout-sider antd-layout-sider-${theme} ${siderCollapsed ? 'antd-layout-sider-collapsed' : 'antd-layout-sider-expanded'}`;
            siderElement.style.width = siderCollapsed ? '80px' : `${siderWidth}px`;
            
            // Collapsible functionality
            if (siderCollapsible) {
                siderElement.classList.add('antd-layout-sider-collapsible');
                
                const collapseButton = document.createElement('button');
                collapseButton.className = 'antd-layout-sider-trigger';
                collapseButton.innerHTML = siderCollapsed ? '▶' : '◀';
                collapseButton.onclick = () => {
                    const isCollapsed = siderElement.classList.contains('antd-layout-sider-collapsed');
                    if (isCollapsed) {
                        siderElement.classList.remove('antd-layout-sider-collapsed');
                        siderElement.classList.add('antd-layout-sider-expanded');
                        siderElement.style.width = `${siderWidth}px`;
                        collapseButton.innerHTML = '◀';
                    } else {
                        siderElement.classList.remove('antd-layout-sider-expanded');
                        siderElement.classList.add('antd-layout-sider-collapsed');
                        siderElement.style.width = '80px';
                        collapseButton.innerHTML = '▶';
                    }
                };
                siderElement.appendChild(collapseButton);
            }
            
            // Sider content
            const siderContent = document.createElement('div');
            siderContent.className = 'antd-layout-sider-content';
            if (typeof sider === 'string') {
                siderContent.innerHTML = sider;
            } else if (sider instanceof HTMLElement) {
                siderContent.appendChild(sider);
            }
            siderElement.appendChild(siderContent);
            
            contentContainer.appendChild(siderElement);
        }

        // Main content
        const mainContent = document.createElement('div');
        mainContent.className = `antd-layout-content antd-layout-content-${theme}`;
        
        if (typeof content === 'string') {
            mainContent.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            mainContent.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(item => {
                if (typeof item === 'string') {
                    const div = document.createElement('div');
                    div.innerHTML = item;
                    mainContent.appendChild(div);
                } else if (item instanceof HTMLElement) {
                    mainContent.appendChild(item);
                }
            });
        }
        
        contentContainer.appendChild(mainContent);
        layout.appendChild(contentContainer);

        // Layout footer
        if (footer) {
            const footerElement = document.createElement('div');
            footerElement.className = `antd-layout-footer antd-layout-footer-${theme}`;
            
            if (typeof footer === 'string') {
                footerElement.innerHTML = footer;
            } else if (footer instanceof HTMLElement) {
                footerElement.appendChild(footer);
            } else if (typeof footer === 'object') {
                // Enhanced footer with sections
                const footerContent = document.createElement('div');
                footerContent.className = 'antd-layout-footer-content';
                
                if (footer.links) {
                    const links = document.createElement('div');
                    links.className = 'antd-layout-footer-links';
                    links.innerHTML = footer.links;
                    footerContent.appendChild(links);
                }
                
                if (footer.copyright) {
                    const copyright = document.createElement('div');
                    copyright.className = 'antd-layout-footer-copyright';
                    copyright.innerHTML = footer.copyright;
                    footerContent.appendChild(copyright);
                }
                
                footerElement.appendChild(footerContent);
            }
            
            layout.appendChild(footerElement);
        }

        return layout;
    }

    // Enhanced Ant Design Divider
    createDivider(options = {}) {
        const {
            type = 'horizontal', // horizontal, vertical
            text = '',
            orientation = 'center', // left, center, right
            dashed = false,
            className = '',
            size = 'default', // small, default, large
            style = 'solid', // solid, dashed, dotted
            color = null,
            margin = null,
            icon = null
        } = options;

        const divider = document.createElement('div');
        let dividerClasses = ['antd-divider', `antd-divider-${type}`, `antd-divider-${size}`];
        
        if (dashed || style === 'dashed') {
            dividerClasses.push('antd-divider-dashed');
        } else if (style === 'dotted') {
            dividerClasses.push('antd-divider-dotted');
        }
        
        divider.className = `${dividerClasses.join(' ')} ${className}`;
        
        // Custom styling
        if (color) {
            divider.style.borderColor = color;
        }
        
        if (margin) {
            divider.style.margin = margin;
        }

        // Divider with text or icon
        if (text || icon) {
            divider.classList.add('antd-divider-with-text');
            
            if (orientation === 'left') {
                divider.classList.add('antd-divider-with-text-left');
            } else if (orientation === 'right') {
                divider.classList.add('antd-divider-with-text-right');
            } else {
                divider.classList.add('antd-divider-with-text-center');
            }

            const contentElement = document.createElement('span');
            contentElement.className = 'antd-divider-inner-text';
            
            if (icon && text) {
                const iconSpan = document.createElement('span');
                iconSpan.className = 'antd-divider-icon';
                iconSpan.innerHTML = icon;
                contentElement.appendChild(iconSpan);
                
                const textSpan = document.createElement('span');
                textSpan.textContent = text;
                contentElement.appendChild(textSpan);
            } else if (icon) {
                contentElement.className += ' antd-divider-icon-only';
                contentElement.innerHTML = icon;
            } else {
                contentElement.textContent = text;
            }
            
            divider.appendChild(contentElement);
        }

        return divider;
    }

    // Enhanced Ant Design Text Line
    createTextLine(options = {}) {
        const {
            text = '',
            type = 'solid', // solid, dashed, dotted, double, wavy
            className = '',
            color = null,
            thickness = 1,
            position = 'bottom', // top, bottom, through
            animated = false,
            gradient = false,
            gradientColors = ['#F97316', '#EA580C']
        } = options;

        const textLine = document.createElement('span');
        textLine.className = `antd-text-line antd-text-line-${type} antd-text-line-${position} ${animated ? 'antd-text-line-animated' : ''} ${className}`;
        textLine.textContent = text;
        
        // Custom styling
        const borderProperty = position === 'through' ? 'textDecoration' : 
                              position === 'top' ? 'borderTop' : 'borderBottom';
        
        if (gradient && gradientColors.length >= 2) {
            if (position === 'through') {
                textLine.style.textDecorationImage = `linear-gradient(90deg, ${gradientColors.join(', ')})`;
                textLine.style.textDecorationThickness = `${thickness}px`;
            } else {
                textLine.style.borderImage = `linear-gradient(90deg, ${gradientColors.join(', ')}) 1`;
                textLine.style[borderProperty] = `${thickness}px solid`;
            }
        } else {
            if (position === 'through') {
                textLine.style.textDecorationThickness = `${thickness}px`;
                if (color) textLine.style.textDecorationColor = color;
            } else {
                textLine.style[borderProperty] = `${thickness}px ${type} ${color || 'currentColor'}`;
            }
        }
        
        // Animation
        if (animated) {
            textLine.style.animation = 'antd-text-line-pulse 2s infinite';
        }

        return textLine;
    }

    // Enhanced Ant Design Space
    createSpace(options = {}) {
        const {
            direction = 'horizontal', // horizontal, vertical
            align = 'center', // start, center, end, baseline, stretch
            size = 'middle', // small, middle, large, number (px), array [horizontal, vertical]
            wrap = false,
            children = [],
            className = '',
            split = null, // divider between items
            block = false // full width
        } = options;

        const space = document.createElement('div');
        let spaceClasses = ['antd-space'];
        
        if (direction === 'vertical') {
            spaceClasses.push('antd-space-vertical');
        } else {
            spaceClasses.push('antd-space-horizontal');
        }
        
        spaceClasses.push(`antd-space-align-${align}`);
        
        if (wrap) {
            spaceClasses.push('antd-space-wrap');
        }
        
        if (block) {
            spaceClasses.push('antd-space-block');
        }
        
        // Size handling
        if (typeof size === 'number') {
            spaceClasses.push('antd-space-custom');
        } else if (Array.isArray(size)) {
            spaceClasses.push('antd-space-custom-array');
        } else {
            spaceClasses.push(`antd-space-${size}`);
        }
        
        space.className = `${spaceClasses.join(' ')} ${className}`;
        
        // Custom gap sizing
        if (typeof size === 'number') {
            space.style.gap = `${size}px`;
        } else if (Array.isArray(size) && size.length >= 2) {
            if (direction === 'vertical') {
                space.style.gap = `${size[1]}px ${size[0]}px`;
            } else {
                space.style.gap = `${size[0]}px ${size[1]}px`;
            }
        }

        children.forEach((child, index) => {
            const spaceItem = document.createElement('div');
            spaceItem.className = 'antd-space-item';
            
            if (typeof child === 'string') {
                spaceItem.innerHTML = child;
            } else if (child instanceof HTMLElement) {
                spaceItem.appendChild(child);
            } else if (typeof child === 'object' && child.element) {
                // Support for wrapped elements with additional properties
                spaceItem.appendChild(child.element);
                if (child.className) {
                    spaceItem.className += ` ${child.className}`;
                }
            }
            
            space.appendChild(spaceItem);
            
            // Add split divider
            if (split && index < children.length - 1) {
                const splitElement = document.createElement('div');
                splitElement.className = 'antd-space-split';
                
                if (typeof split === 'string') {
                    splitElement.innerHTML = split;
                } else if (split instanceof HTMLElement) {
                    splitElement.appendChild(split.cloneNode(true));
                }
                
                space.appendChild(splitElement);
            }
        });

        return space;
    }

    // Enhanced Ant Design Slot
    createSlot(options = {}) {
        const {
            display = 'block', // block, inline, flex, grid
            direction = 'row', // row, column, row-reverse, column-reverse
            justify = 'start', // start, center, end, between, around, evenly
            align = 'start', // start, center, end, stretch, baseline
            wrap = false,
            content = '',
            className = '',
            gap = null,
            padding = null,
            margin = null,
            background = null,
            borderRadius = null,
            shadow = false,
            // Grid specific options
            gridTemplate = null,
            gridColumns = null,
            gridRows = null,
            // Advanced flex options
            flex = null, // flex grow/shrink/basis
            order = null,
            alignSelf = null
        } = options;

        const slot = document.createElement('div');
        let slotClasses = ['antd-slot', `antd-slot-${display}`];

        if (display === 'flex') {
            slotClasses.push(`antd-slot-flex-${direction}`);
            slotClasses.push(`antd-slot-justify-${justify}`);
            slotClasses.push(`antd-slot-align-${align}`);
            
            if (wrap) {
                slotClasses.push('antd-slot-flex-wrap');
            } else {
                slotClasses.push('antd-slot-flex-nowrap');
            }
        } else if (display === 'grid') {
            slotClasses.push('antd-slot-grid');
        }
        
        if (shadow) {
            slotClasses.push('antd-slot-shadow');
        }
        
        slot.className = `${slotClasses.join(' ')} ${className}`;

        // Apply custom styles
        if (gap) {
            slot.style.gap = typeof gap === 'number' ? `${gap}px` : gap;
        }
        
        if (padding) {
            slot.style.padding = typeof padding === 'number' ? `${padding}px` : padding;
        }
        
        if (margin) {
            slot.style.margin = typeof margin === 'number' ? `${margin}px` : margin;
        }
        
        if (background) {
            slot.style.background = background;
        }
        
        if (borderRadius) {
            slot.style.borderRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
        }
        
        if (flex) {
            slot.style.flex = flex;
        }
        
        if (order) {
            slot.style.order = order;
        }
        
        if (alignSelf) {
            slot.style.alignSelf = alignSelf;
        }
        
        // Grid specific styles
        if (display === 'grid') {
            if (gridTemplate) {
                slot.style.gridTemplate = gridTemplate;
            }
            if (gridColumns) {
                slot.style.gridTemplateColumns = gridColumns;
            }
            if (gridRows) {
                slot.style.gridTemplateRows = gridRows;
            }
        }

        // Content handling
        if (typeof content === 'string') {
            slot.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            slot.appendChild(content);
        } else if (Array.isArray(content)) {
            content.forEach(item => {
                if (typeof item === 'string') {
                    const div = document.createElement('div');
                    div.innerHTML = item;
                    slot.appendChild(div);
                } else if (item instanceof HTMLElement) {
                    slot.appendChild(item);
                }
            });
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
