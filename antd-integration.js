/**
 * Ant Design Component Integration JavaScript
 * Integrates copied Figma components into the dashboard
 */

// Ant Design Component Factory
class AntDComponentFactory {
    constructor() {
        this.theme = 'orange'; // Your brand theme
        this.init();
    }

    init() {
        // Apply Ant Design theme to the dashboard
        document.body.classList.add('dashboard-antd-integration', 'antd-theme-orange');
        console.log('🎨 Ant Design components initialized');
    }

    // Create Ant Design Button
    createButton(options = {}) {
        const {
            text = 'Button',
            type = 'default', // default, primary, success, warning, error
            size = 'default', // sm, default, lg
            onClick = null,
            disabled = false,
            className = '',
            icon = null
        } = options;

        const button = document.createElement('button');
        button.className = `antd-btn antd-btn-${type} antd-btn-${size} ${className}`;
        button.textContent = text;
        button.disabled = disabled;

        if (icon) {
            const iconElement = document.createElement('span');
            iconElement.innerHTML = icon;
            button.insertBefore(iconElement, button.firstChild);
        }

        if (onClick) {
            button.addEventListener('click', onClick);
        }

        return button;
    }

    // Create Ant Design Float Button
    createFloatButton(options = {}) {
        const {
            icon = '➕',
            onClick = null,
            position = 'bottom-right', // bottom-right, bottom-left, top-right, top-left
            className = ''
        } = options;

        const floatBtn = document.createElement('button');
        floatBtn.className = `antd-float-btn ${className}`;
        floatBtn.innerHTML = icon;

        // Position the float button
        const positions = {
            'bottom-right': { bottom: '24px', right: '24px' },
            'bottom-left': { bottom: '24px', left: '24px' },
            'top-right': { top: '24px', right: '24px' },
            'top-left': { top: '24px', left: '24px' }
        };

        Object.assign(floatBtn.style, positions[position]);

        if (onClick) {
            floatBtn.addEventListener('click', onClick);
        }

        return floatBtn;
    }

    // Create Ant Design Typography
    createTypography(options = {}) {
        const {
            type = 'p', // h1, h2, h3, h4, h5, p, span
            text = '',
            variant = 'default', // default, secondary, success, warning, danger
            className = ''
        } = options;

        const element = document.createElement(type);
        element.className = `antd-typography antd-typography-${type} antd-typography-${variant} ${className}`;
        element.textContent = text;

        return element;
    }

    // Create Ant Design Label
    createLabel(options = {}) {
        const {
            text = 'Label',
            required = false,
            className = ''
        } = options;

        const label = document.createElement('label');
        label.className = `antd-label ${className}`;
        if (required) {
            label.classList.add('antd-label-required');
        }
        label.textContent = text;

        return label;
    }

    // Create Ant Design Link
    createLink(options = {}) {
        const {
            text = 'Link',
            href = '#',
            onClick = null,
            className = ''
        } = options;

        const link = document.createElement('a');
        link.className = `antd-link ${className}`;
        link.textContent = text;
        link.href = href;

        if (onClick) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                onClick(e);
            });
        }

        return link;
    }

    // Create Ant Design Card
    createCard(options = {}) {
        const {
            title = '',
            content = '',
            className = '',
            headerActions = []
        } = options;

        const card = document.createElement('div');
        card.className = `antd-card ${className}`;

        // Card header
        if (title || headerActions.length > 0) {
            const header = document.createElement('div');
            header.className = 'antd-card-head';

            if (title) {
                const titleElement = document.createElement('div');
                titleElement.className = 'antd-card-title';
                titleElement.textContent = title;
                header.appendChild(titleElement);
            }

            if (headerActions.length > 0) {
                const actionsContainer = document.createElement('div');
                actionsContainer.className = 'antd-card-head-actions';
                headerActions.forEach(action => {
                    actionsContainer.appendChild(action);
                });
                header.appendChild(actionsContainer);
            }

            card.appendChild(header);
        }

        // Card body
        const body = document.createElement('div');
        body.className = 'antd-card-body';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.appendChild(content);
        }
        card.appendChild(body);

        return card;
    }

    // Create Ant Design Table
    createTable(options = {}) {
        const {
            columns = [],
            data = [],
            className = '',
            onRowClick = null
        } = options;

        const table = document.createElement('table');
        table.className = `antd-table ${className}`;

        // Table header
        if (columns.length > 0) {
            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            
            columns.forEach(column => {
                const th = document.createElement('th');
                th.textContent = column.title || column.key;
                headerRow.appendChild(th);
            });
            
            thead.appendChild(headerRow);
            table.appendChild(thead);
        }

        // Table body
        const tbody = document.createElement('tbody');
        data.forEach((row, index) => {
            const tr = document.createElement('tr');
            
            columns.forEach(column => {
                const td = document.createElement('td');
                const value = row[column.key] || '';
                td.textContent = value;
                tr.appendChild(td);
            });

            if (onRowClick) {
                tr.style.cursor = 'pointer';
                tr.addEventListener('click', () => onRowClick(row, index));
            }

            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);

        return table;
    }

    // Create Ant Design Modal
    createModal(options = {}) {
        const {
            title = 'Modal Title',
            content = '',
            footer = [],
            className = '',
            onClose = null,
            closable = true
        } = options;

        const modal = document.createElement('div');
        modal.className = `antd-modal ${className}`;

        const modalContent = document.createElement('div');
        modalContent.className = 'antd-modal-content';

        // Modal header
        const header = document.createElement('div');
        header.className = 'antd-modal-header';

        const titleElement = document.createElement('div');
        titleElement.className = 'antd-modal-title';
        titleElement.textContent = title;
        header.appendChild(titleElement);

        if (closable) {
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = 'position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 18px; cursor: pointer; color: #999;';
            closeBtn.addEventListener('click', () => {
                if (onClose) onClose();
                modal.remove();
            });
            header.appendChild(closeBtn);
        }

        modalContent.appendChild(header);

        // Modal body
        const body = document.createElement('div');
        body.className = 'antd-modal-body';
        if (typeof content === 'string') {
            body.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            body.appendChild(content);
        }
        modalContent.appendChild(body);

        // Modal footer
        if (footer.length > 0) {
            const footerElement = document.createElement('div');
            footerElement.className = 'antd-modal-footer';
            footer.forEach(button => {
                footerElement.appendChild(button);
            });
            modalContent.appendChild(footerElement);
        }

        modal.appendChild(modalContent);

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (onClose) onClose();
                modal.remove();
            }
        });

        return modal;
    }
}

// Initialize Ant Design Components
const antdFactory = new AntDComponentFactory();

// Dashboard Integration Functions
function integrateAntDComponents() {
    console.log('🔧 Integrating Ant Design components into dashboard...');

    // Replace existing buttons with Ant Design buttons
    replaceButtons();
    
    // Replace existing cards with Ant Design cards
    replaceCards();
    
    // Replace existing modals with Ant Design modals
    replaceModals();
    
    // Add Ant Design typography
    applyTypography();
    
    // Add float button for quick actions
    addFloatButton();

    console.log('✅ Ant Design components integrated successfully!');
}

function replaceButtons() {
    // Replace "See Live Demo" button
    const demoButton = document.querySelector('a[data-section="live-demo"]');
    if (demoButton) {
        const antdButton = antdFactory.createButton({
            text: 'See Live Demo',
            type: 'primary',
            size: 'lg',
            onClick: () => showSection('live-demo'),
            className: 'w-full'
        });
        demoButton.parentNode.replaceChild(antdButton, demoButton);
    }

    // Replace "How It Works" button
    const howItWorksButton = document.querySelector('a[data-section="how-it-works"]');
    if (howItWorksButton) {
        const antdButton = antdFactory.createButton({
            text: 'How It Works',
            type: 'default',
            size: 'lg',
            onClick: () => showSection('how-it-works'),
            className: 'w-full'
        });
        howItWorksButton.parentNode.replaceChild(antdButton, howItWorksButton);
    }

    // Replace "Reset Filter" button
    const resetButton = document.querySelector('button[onclick="resetFilters()"]');
    if (resetButton) {
        const antdButton = antdFactory.createButton({
            text: '🔄 Reset Filter',
            type: 'default',
            onClick: resetFilters,
            className: 'w-full'
        });
        resetButton.parentNode.replaceChild(antdButton, resetButton);
    }

    // Replace "Save Intervention" button
    const saveButton = document.querySelector('button[onclick*="saveNoteLocally"]');
    if (saveButton) {
        const antdButton = antdFactory.createButton({
            text: '💾 Save Intervention',
            type: 'primary',
            onClick: () => saveNoteLocally(window.currentCustomerId),
            className: 'w-full'
        });
        saveButton.parentNode.replaceChild(antdButton, saveButton);
    }

    // Replace "Close" button in modal
    const closeButton = document.querySelector('button[onclick="closeDetailModal()"]');
    if (closeButton) {
        const antdButton = antdFactory.createButton({
            text: 'Close',
            type: 'default',
            onClick: closeDetailModal,
            className: 'w-full'
        });
        closeButton.parentNode.replaceChild(antdButton, closeButton);
    }
}

function replaceCards() {
    // Replace customer cards with Ant Design cards
    const customerCards = document.querySelectorAll('.customer-card');
    customerCards.forEach(card => {
        const customerName = card.querySelector('h3')?.textContent || 'Customer';
        const riskScore = card.querySelector('[class*="Risk"]')?.textContent || '0% Risk';
        const arrValue = card.querySelector('.text-2xl')?.textContent || '$0';
        
        const antdCard = antdFactory.createCard({
            title: customerName,
            content: `
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="text-center">
                        <div class="text-2xl font-bold text-orange-600">${arrValue}</div>
                        <div class="text-sm text-gray-600">Annual Revenue</div>
                    </div>
                    <div class="text-center">
                        <div class="text-lg font-bold">${riskScore}</div>
                        <div class="text-sm text-gray-600">Risk Score</div>
                    </div>
                </div>
                <div class="text-center">
                    <span class="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                        High Priority
                    </span>
                </div>
            `,
            className: 'cursor-pointer hover:shadow-lg transition-all duration-300'
        });

        // Add click handler
        antdCard.addEventListener('click', () => {
            const customerId = card.getAttribute('onclick')?.match(/\d+/)?.[0];
            if (customerId) {
                showCustomerDetail(parseInt(customerId));
            }
        });

        card.parentNode.replaceChild(antdCard, card);
    });
}

function replaceModals() {
    // The existing modal will be enhanced with Ant Design styling
    const existingModal = document.getElementById('detailModal');
    if (existingModal) {
        existingModal.classList.add('antd-modal');
        
        const modalContent = existingModal.querySelector('.bg-white');
        if (modalContent) {
            modalContent.classList.add('antd-modal-content');
        }
    }
}

function applyTypography() {
    // Apply Ant Design typography to headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5');
    headings.forEach(heading => {
        heading.classList.add('antd-typography', `antd-typography-${heading.tagName.toLowerCase()}`);
    });

    // Apply to paragraphs
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        p.classList.add('antd-typography', 'antd-typography-p');
    });
}

function addFloatButton() {
    // Add a floating action button for quick access to dashboard
    const floatBtn = antdFactory.createFloatButton({
        icon: '📊',
        onClick: () => showSection('live-demo'),
        position: 'bottom-right'
    });

    document.body.appendChild(floatBtn);
}

// Enhanced customer detail modal with Ant Design
function createAntDCustomerModal(customer) {
    const modal = antdFactory.createModal({
        title: `${customer.name} - Customer Details`,
        content: `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div class="antd-card">
                        <div class="antd-card-body">
                            <h4 class="antd-typography antd-typography-h4 mb-2">Key Metrics</h4>
                            <div class="space-y-2">
                                <div class="flex justify-between">
                                    <span class="antd-typography antd-typography-secondary">Customer ID:</span>
                                    <span class="antd-typography">C${customer.id}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="antd-typography antd-typography-secondary">Annual Revenue:</span>
                                    <span class="antd-typography antd-typography-success">$${customer.arr.toLocaleString()}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="antd-typography antd-typography-secondary">Risk Score:</span>
                                    <span class="antd-typography antd-typography-danger">${customer.riskScore}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="antd-card">
                        <div class="antd-card-body">
                            <h4 class="antd-typography antd-typography-h4 mb-2">Top Drivers</h4>
                            <div class="space-y-2">
                                ${customer.topDrivers.map(driver => `
                                    <div class="p-2 bg-gray-50 rounded">
                                        <span class="antd-typography ${driver.includes('[Actionable]') ? 'antd-typography-success' : 'antd-typography-secondary'}">
                                            ${driver}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="antd-card">
                    <div class="antd-card-body">
                        <h4 class="antd-typography antd-typography-h4 mb-2">Single-Action Recommendation</h4>
                        <div class="p-3 bg-orange-50 border border-orange-200 rounded">
                            <p class="antd-typography antd-typography-secondary">
                                ${generateSingleActionRecommendation(customer)}
                            </p>
                        </div>
                    </div>
                </div>
                
                <div class="antd-card">
                    <div class="antd-card-body">
                        <h4 class="antd-typography antd-typography-h4 mb-2">Action Log</h4>
                        <textarea 
                            id="actionLogInput" 
                            class="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            rows="4"
                            placeholder="Add intervention notes here..."
                        >${customer.notes || ''}</textarea>
                    </div>
                </div>
            </div>
        `,
        footer: [
            antdFactory.createButton({
                text: 'Close',
                type: 'default',
                onClick: () => modal.remove()
            }),
            antdFactory.createButton({
                text: '💾 Save Intervention',
                type: 'primary',
                onClick: () => {
                    const notes = document.getElementById('actionLogInput').value;
                    customer.notes = notes;
                    localStorage.setItem('customerData', JSON.stringify(customerData));
                    
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'antd-typography antd-typography-success text-center p-2';
                    successMsg.textContent = '✅ Intervention saved successfully!';
                    modal.querySelector('.antd-modal-body').appendChild(successMsg);
                    
                    setTimeout(() => {
                        modal.remove();
                    }, 2000);
                }
            })
        ]
    });

    document.body.appendChild(modal);
    return modal;
}

// Export for use
window.antdFactory = antdFactory;
window.integrateAntDComponents = integrateAntDComponents;
window.createAntDCustomerModal = createAntDCustomerModal;

console.log('🎨 Ant Design integration script loaded');
console.log('Run: integrateAntDComponents() to apply Ant Design styling');
