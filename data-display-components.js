/**
 * Data Display Components System
 * Includes: Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, List, 
 * Popover, Segmented, Statistic, Table, Tabs, Tag, Timeline, Tooltip, Tour
 */

class DataDisplayComponents {
    constructor() {
        this.components = {
            avatar: this.createAvatar.bind(this),
            badge: this.createBadge.bind(this),
            calendar: this.createCalendar.bind(this),
            card: this.createCard.bind(this),
            carousel: this.createCarousel.bind(this),
            collapse: this.createCollapse.bind(this),
            descriptions: this.createDescriptions.bind(this),
            empty: this.createEmpty.bind(this),
            list: this.createList.bind(this),
            popover: this.createPopover.bind(this),
            segmented: this.createSegmented.bind(this),
            statistic: this.createStatistic.bind(this),
            table: this.createTable.bind(this),
            tabs: this.createTabs.bind(this),
            tag: this.createTag.bind(this),
            timeline: this.createTimeline.bind(this),
            tooltip: this.createTooltip.bind(this),
            tour: this.createTour.bind(this)
        };
        
        this.activeTooltips = [];
        this.activePopovers = [];
        this.activeTours = [];
        this.init();
    }

    init() {
        this.createGlobalStyles();
        console.log('📊 Data Display Components System initialized');
    }

    createGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Data Display Components Global Styles */
            .data-display-component {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                box-sizing: border-box;
            }

            /* Avatar Component */
            .dd-avatar {
                position: relative;
                display: inline-block;
                overflow: hidden;
                color: #fff;
                white-space: nowrap;
                text-align: center;
                vertical-align: middle;
                background: #ccc;
                width: 32px;
                height: 32px;
                line-height: 32px;
                border-radius: 50%;
                font-size: 14px;
            }

            .dd-avatar.large {
                width: 40px;
                height: 40px;
                line-height: 40px;
                font-size: 18px;
            }

            .dd-avatar.small {
                width: 24px;
                height: 24px;
                line-height: 24px;
                font-size: 12px;
            }

            .dd-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            /* Badge Component */
            .dd-badge {
                position: relative;
                display: inline-block;
                line-height: 1;
            }

            .dd-badge-count {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(50%, -50%);
                background: #ff4d4f;
                color: #fff;
                border-radius: 10px;
                min-width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                font-size: 12px;
                padding: 0 6px;
                box-shadow: 0 0 0 1px #fff;
            }

            .dd-badge-dot {
                position: absolute;
                top: 0;
                right: 0;
                transform: translate(50%, -50%);
                width: 6px;
                height: 6px;
                background: #ff4d4f;
                border-radius: 50%;
                box-shadow: 0 0 0 1px #fff;
            }

            /* Calendar Component */
            .dd-calendar {
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                padding: 16px;
                width: 300px;
            }

            .dd-calendar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
                font-weight: 500;
            }

            .dd-calendar-nav {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
                transition: background 0.3s;
            }

            .dd-calendar-nav:hover {
                background: #f5f5f5;
            }

            .dd-calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 4px;
            }

            .dd-calendar-cell {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
            }

            .dd-calendar-cell:hover {
                background: #f5f5f5;
            }

            .dd-calendar-cell.today {
                background: #1890ff;
                color: #fff;
            }

            .dd-calendar-cell.other-month {
                color: #bfbfbf;
            }

            /* Card Component */
            .dd-card {
                background: #fff;
                border-radius: 6px;
                border: 1px solid #f0f0f0;
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
                transition: box-shadow 0.3s;
            }

            .dd-card:hover {
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px rgba(0, 0, 0, 0.03), 0 2px 24px rgba(0, 0, 0, 0.03);
            }

            .dd-card-header {
                padding: 16px 24px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .dd-card-title {
                margin: 0;
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-card-extra {
                color: #1890ff;
                cursor: pointer;
                font-size: 14px;
            }

            .dd-card-body {
                padding: 24px;
            }

            /* Carousel Component */
            .dd-carousel {
                position: relative;
                overflow: hidden;
                border-radius: 6px;
            }

            .dd-carousel-container {
                display: flex;
                transition: transform 0.5s ease;
            }

            .dd-carousel-slide {
                flex: 0 0 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #f5f5f5;
                min-height: 200px;
            }

            .dd-carousel-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                color: #fff;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .dd-carousel-prev {
                left: 10px;
            }

            .dd-carousel-next {
                right: 10px;
            }

            .dd-carousel-dots {
                position: absolute;
                bottom: 16px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 8px;
            }

            .dd-carousel-dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transition: background 0.3s;
            }

            .dd-carousel-dot.active {
                background: #fff;
            }

            /* Collapse Component */
            .dd-collapse {
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                background: #fff;
            }

            .dd-collapse-item {
                border-bottom: 1px solid #d9d9d9;
            }

            .dd-collapse-item:last-child {
                border-bottom: none;
            }

            .dd-collapse-header {
                padding: 12px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: space-between;
                transition: background 0.3s;
            }

            .dd-collapse-header:hover {
                background: #f5f5f5;
            }

            .dd-collapse-arrow {
                transition: transform 0.3s;
            }

            .dd-collapse-arrow.expanded {
                transform: rotate(90deg);
            }

            .dd-collapse-content {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.3s ease;
            }

            .dd-collapse-content.expanded {
                max-height: 500px;
            }

            .dd-collapse-body {
                padding: 16px;
                border-top: 1px solid #f0f0f0;
            }

            /* Table Component */
            .dd-table {
                width: 100%;
                border-collapse: collapse;
                background: #fff;
                border-radius: 6px;
                overflow: hidden;
                border: 1px solid #f0f0f0;
            }

            .dd-table th,
            .dd-table td {
                padding: 16px;
                text-align: left;
                border-bottom: 1px solid #f0f0f0;
            }

            .dd-table th {
                background: #fafafa;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-table tr:hover {
                background: #f5f5f5;
            }

            /* Tabs Component */
            .dd-tabs {
                background: #fff;
            }

            .dd-tabs-nav {
                display: flex;
                border-bottom: 1px solid #f0f0f0;
                margin-bottom: 16px;
            }

            .dd-tab {
                padding: 12px 16px;
                cursor: pointer;
                border-bottom: 2px solid transparent;
                transition: all 0.3s;
                color: rgba(0, 0, 0, 0.65);
            }

            .dd-tab:hover {
                color: #1890ff;
            }

            .dd-tab.active {
                color: #1890ff;
                border-bottom-color: #1890ff;
            }

            .dd-tab-content {
                display: none;
            }

            .dd-tab-content.active {
                display: block;
            }

            /* Timeline Component */
            .dd-timeline {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .dd-timeline-item {
                position: relative;
                padding-bottom: 20px;
                padding-left: 24px;
            }

            .dd-timeline-item:not(:last-child)::before {
                content: '';
                position: absolute;
                left: 4px;
                top: 0;
                height: 100%;
                width: 2px;
                background: #f0f0f0;
            }

            .dd-timeline-dot {
                position: absolute;
                left: 0;
                top: 5px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #1890ff;
                border: 2px solid #fff;
                box-shadow: 0 0 0 1px #d9d9d9;
            }

            .dd-timeline-content {
                margin-left: 8px;
            }

            .dd-timeline-title {
                margin: 0 0 4px 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-timeline-description {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
            }

            /* Tag Component */
            .dd-tag {
                display: inline-block;
                padding: 0 7px;
                font-size: 12px;
                line-height: 20px;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                background: #fafafa;
                color: rgba(0, 0, 0, 0.65);
                cursor: default;
                transition: all 0.3s;
                margin: 0 8px 8px 0;
            }

            .dd-tag.success {
                background: #f6ffed;
                border-color: #b7eb8f;
                color: #52c41a;
            }

            .dd-tag.error {
                background: #fff2f0;
                border-color: #ffccc7;
                color: #ff4d4f;
            }

            .dd-tag.warning {
                background: #fffbe6;
                border-color: #ffe58f;
                color: #faad14;
            }

            .dd-tag.processing {
                background: #e6f7ff;
                border-color: #91d5ff;
                color: #1890ff;
            }

            .dd-tag-close {
                margin-left: 4px;
                cursor: pointer;
                font-size: 10px;
                opacity: 0.5;
                transition: opacity 0.3s;
            }

            .dd-tag-close:hover {
                opacity: 1;
            }

            /* Tooltip Component */
            .dd-tooltip {
                position: absolute;
                z-index: 1060;
                background: rgba(0, 0, 0, 0.75);
                color: #fff;
                padding: 6px 8px;
                border-radius: 6px;
                font-size: 12px;
                max-width: 250px;
                word-wrap: break-word;
                pointer-events: none;
            }

            .dd-tooltip-arrow {
                position: absolute;
                width: 0;
                height: 0;
                border: 4px solid transparent;
            }

            .dd-tooltip.top .dd-tooltip-arrow {
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                border-top-color: rgba(0, 0, 0, 0.75);
            }

            .dd-tooltip.bottom .dd-tooltip-arrow {
                top: -8px;
                left: 50%;
                transform: translateX(-50%);
                border-bottom-color: rgba(0, 0, 0, 0.75);
            }

            /* Statistic Component */
            .dd-statistic {
                text-align: center;
            }

            .dd-statistic-title {
                margin-bottom: 4px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 14px;
            }

            .dd-statistic-content {
                color: rgba(0, 0, 0, 0.85);
                font-size: 24px;
                font-weight: 500;
                font-variant-numeric: tabular-nums;
            }

            /* List Component */
            .dd-list {
                background: #fff;
                border-radius: 6px;
                border: 1px solid #f0f0f0;
            }

            .dd-list-header,
            .dd-list-footer {
                padding: 12px 24px;
                border-bottom: 1px solid #f0f0f0;
                background: #fafafa;
                font-weight: 500;
            }

            .dd-list-footer {
                border-bottom: none;
                border-top: 1px solid #f0f0f0;
            }

            .dd-list-item {
                padding: 12px 24px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                align-items: center;
                transition: background 0.3s;
            }

            .dd-list-item:hover {
                background: #f5f5f5;
            }

            .dd-list-item:last-child {
                border-bottom: none;
            }

            .dd-list-item-content {
                flex: 1;
            }

            .dd-list-item-title {
                margin: 0 0 4px 0;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-list-item-description {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
            }

            /* Empty Component */
            .dd-empty {
                text-align: center;
                padding: 32px;
                color: rgba(0, 0, 0, 0.45);
            }

            .dd-empty-image {
                width: 64px;
                height: 64px;
                margin: 0 auto 16px;
                opacity: 0.5;
            }

            .dd-empty-description {
                margin-bottom: 16px;
                font-size: 14px;
            }

            /* Descriptions Component */
            .dd-descriptions {
                background: #fff;
            }

            .dd-descriptions-title {
                margin-bottom: 16px;
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-descriptions-view {
                border: 1px solid #f0f0f0;
                border-radius: 6px;
            }

            .dd-descriptions-row {
                display: flex;
                border-bottom: 1px solid #f0f0f0;
            }

            .dd-descriptions-row:last-child {
                border-bottom: none;
            }

            .dd-descriptions-item {
                flex: 1;
                display: flex;
                padding: 16px;
                border-right: 1px solid #f0f0f0;
            }

            .dd-descriptions-item:last-child {
                border-right: none;
            }

            .dd-descriptions-item-label {
                width: 100px;
                color: rgba(0, 0, 0, 0.85);
                font-weight: 500;
                margin-right: 16px;
            }

            .dd-descriptions-item-content {
                flex: 1;
                color: rgba(0, 0, 0, 0.65);
            }

            /* Segmented Component */
            .dd-segmented {
                display: inline-flex;
                background: #f5f5f5;
                border-radius: 6px;
                padding: 2px;
            }

            .dd-segmented-item {
                padding: 4px 16px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.65);
            }

            .dd-segmented-item:hover {
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-segmented-item.active {
                background: #fff;
                color: rgba(0, 0, 0, 0.85);
                box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px rgba(0, 0, 0, 0.03);
            }

            /* Popover Component */
            .dd-popover {
                position: absolute;
                z-index: 1030;
                background: #fff;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                border: 1px solid rgba(0, 0, 0, 0.06);
                max-width: 276px;
            }

            .dd-popover-title {
                padding: 5px 16px 4px;
                border-bottom: 1px solid #f0f0f0;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-popover-content {
                padding: 12px 16px;
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                line-height: 1.5715;
            }

            /* Tour Component */
            .dd-tour-mask {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1040;
            }

            .dd-tour-spotlight {
                position: absolute;
                border: 2px solid #1890ff;
                border-radius: 6px;
                box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
            }

            .dd-tour-popup {
                position: absolute;
                background: #fff;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 16px;
                max-width: 300px;
                z-index: 1041;
            }

            .dd-tour-title {
                margin: 0 0 8px 0;
                font-size: 16px;
                font-weight: 500;
                color: rgba(0, 0, 0, 0.85);
            }

            .dd-tour-description {
                margin-bottom: 16px;
                color: rgba(0, 0, 0, 0.65);
                font-size: 14px;
                line-height: 1.5715;
            }

            .dd-tour-buttons {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .dd-calendar {
                    width: 100%;
                }
                
                .dd-card-body {
                    padding: 16px;
                }
                
                .dd-table {
                    font-size: 12px;
                }
                
                .dd-table th,
                .dd-table td {
                    padding: 8px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Avatar Component
    createAvatar(options = {}) {
        const {
            size = 'default',
            src = null,
            alt = '',
            text = '',
            icon = null,
            shape = 'circle'
        } = options;

        const avatar = document.createElement('div');
        avatar.className = `dd-avatar ${size}`;
        
        if (shape === 'square') {
            avatar.style.borderRadius = '6px';
        }

        if (src) {
            avatar.innerHTML = `<img src="${src}" alt="${alt}" />`;
        } else if (text) {
            avatar.textContent = text.charAt(0).toUpperCase();
            avatar.style.background = this.getAvatarColor(text);
        } else if (icon) {
            avatar.innerHTML = icon;
        } else {
            avatar.innerHTML = '👤';
        }

        return avatar;
    }

    // Badge Component
    createBadge(options = {}) {
        const {
            count = 0,
            dot = false,
            showZero = false,
            overflowCount = 99,
            children = null
        } = options;

        const badge = document.createElement('div');
        badge.className = 'dd-badge';

        if (children) {
            badge.appendChild(children);
        }

        if (dot) {
            const dotElement = document.createElement('div');
            dotElement.className = 'dd-badge-dot';
            badge.appendChild(dotElement);
        } else if (count > 0 || showZero) {
            const countElement = document.createElement('div');
            countElement.className = 'dd-badge-count';
            countElement.textContent = count > overflowCount ? `${overflowCount}+` : count;
            badge.appendChild(countElement);
        }

        return badge;
    }

    // Calendar Component
    createCalendar(options = {}) {
        const {
            value = new Date(),
            onChange = null
        } = options;

        const calendar = document.createElement('div');
        calendar.className = 'dd-calendar';

        const currentDate = new Date(value);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        calendar.innerHTML = `
            <div class="dd-calendar-header">
                <button class="dd-calendar-nav" data-action="prev-month">‹</button>
                <span>${this.getMonthName(month)} ${year}</span>
                <button class="dd-calendar-nav" data-action="next-month">›</button>
            </div>
            <div class="dd-calendar-grid">
                ${this.generateCalendarDays(year, month)}
            </div>
        `;

        // Add event listeners
        calendar.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'prev-month') {
                currentDate.setMonth(month - 1);
                this.updateCalendar(calendar, currentDate);
            } else if (e.target.dataset.action === 'next-month') {
                currentDate.setMonth(month + 1);
                this.updateCalendar(calendar, currentDate);
            } else if (e.target.dataset.date) {
                if (onChange) onChange(new Date(e.target.dataset.date));
            }
        });

        return calendar;
    }

    // Card Component
    createCard(options = {}) {
        const {
            title = '',
            extra = '',
            children = '',
            hoverable = true
        } = options;

        const card = document.createElement('div');
        card.className = 'dd-card';
        
        if (!hoverable) {
            card.style.boxShadow = 'none';
        }

        let headerHtml = '';
        if (title || extra) {
            headerHtml = `
                <div class="dd-card-header">
                    <h3 class="dd-card-title">${title}</h3>
                    ${extra ? `<div class="dd-card-extra">${extra}</div>` : ''}
                </div>
            `;
        }

        card.innerHTML = `
            ${headerHtml}
            <div class="dd-card-body">
                ${children}
            </div>
        `;

        return card;
    }

    // Table Component
    createTable(options = {}) {
        const {
            columns = [],
            dataSource = [],
            pagination = false
        } = options;

        const tableContainer = document.createElement('div');
        
        const table = document.createElement('table');
        table.className = 'dd-table';

        // Create header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        columns.forEach(col => {
            const th = document.createElement('th');
            th.textContent = col.title;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create body
        const tbody = document.createElement('tbody');
        dataSource.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                if (col.render) {
                    td.innerHTML = col.render(row[col.dataIndex], row);
                } else {
                    td.textContent = row[col.dataIndex] || '';
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        tableContainer.appendChild(table);

        if (pagination) {
            const paginationEl = this.createPagination({
                total: dataSource.length,
                pageSize: 10,
                current: 1
            });
            tableContainer.appendChild(paginationEl);
        }

        return tableContainer;
    }

    // Tabs Component
    createTabs(options = {}) {
        const {
            items = [],
            defaultActiveKey = null,
            onChange = null
        } = options;

        const tabs = document.createElement('div');
        tabs.className = 'dd-tabs';

        const activeKey = defaultActiveKey || (items[0] && items[0].key);

        // Create nav
        const nav = document.createElement('div');
        nav.className = 'dd-tabs-nav';
        
        items.forEach(item => {
            const tab = document.createElement('div');
            tab.className = `dd-tab ${item.key === activeKey ? 'active' : ''}`;
            tab.textContent = item.label;
            tab.dataset.key = item.key;
            nav.appendChild(tab);
        });

        // Create content
        const content = document.createElement('div');
        content.className = 'dd-tabs-content';
        
        items.forEach(item => {
            const pane = document.createElement('div');
            pane.className = `dd-tab-content ${item.key === activeKey ? 'active' : ''}`;
            pane.innerHTML = item.children || '';
            pane.dataset.key = item.key;
            content.appendChild(pane);
        });

        // Add click handler
        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('dd-tab')) {
                const key = e.target.dataset.key;
                
                // Update active tab
                nav.querySelectorAll('.dd-tab').forEach(tab => {
                    tab.classList.toggle('active', tab.dataset.key === key);
                });
                
                // Update active content
                content.querySelectorAll('.dd-tab-content').forEach(pane => {
                    pane.classList.toggle('active', pane.dataset.key === key);
                });

                if (onChange) onChange(key);
            }
        });

        tabs.appendChild(nav);
        tabs.appendChild(content);

        return tabs;
    }

    // Timeline Component
    createTimeline(options = {}) {
        const {
            items = []
        } = options;

        const timeline = document.createElement('ul');
        timeline.className = 'dd-timeline';

        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'dd-timeline-item';
            
            li.innerHTML = `
                <div class="dd-timeline-dot"></div>
                <div class="dd-timeline-content">
                    <div class="dd-timeline-title">${item.children || item.label}</div>
                    ${item.description ? `<div class="dd-timeline-description">${item.description}</div>` : ''}
                </div>
            `;
            
            timeline.appendChild(li);
        });

        return timeline;
    }

    // Tag Component
    createTag(options = {}) {
        const {
            children = '',
            color = 'default',
            closable = false,
            onClose = null
        } = options;

        const tag = document.createElement('span');
        tag.className = `dd-tag ${color}`;
        tag.innerHTML = children;

        if (closable) {
            const closeBtn = document.createElement('span');
            closeBtn.className = 'dd-tag-close';
            closeBtn.innerHTML = '×';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                tag.remove();
                if (onClose) onClose();
            };
            tag.appendChild(closeBtn);
        }

        return tag;
    }

    // Tooltip Component
    createTooltip(options = {}) {
        const {
            title = '',
            placement = 'top',
            trigger = 'hover',
            children = null
        } = options;

        if (!children) return null;

        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-block';
        wrapper.appendChild(children);

        const tooltip = document.createElement('div');
        tooltip.className = `dd-tooltip ${placement}`;
        tooltip.innerHTML = `
            ${title}
            <div class="dd-tooltip-arrow"></div>
        `;
        tooltip.style.display = 'none';

        const showTooltip = (e) => {
            const rect = wrapper.getBoundingClientRect();
            tooltip.style.display = 'block';
            
            if (placement === 'top') {
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
                tooltip.style.transform = 'translateX(-50%)';
            } else if (placement === 'bottom') {
                tooltip.style.left = `${rect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.bottom + 8}px`;
                tooltip.style.transform = 'translateX(-50%)';
            }
        };

        const hideTooltip = () => {
            tooltip.style.display = 'none';
        };

        if (trigger === 'hover') {
            wrapper.addEventListener('mouseenter', showTooltip);
            wrapper.addEventListener('mouseleave', hideTooltip);
        } else if (trigger === 'click') {
            wrapper.addEventListener('click', showTooltip);
            document.addEventListener('click', (e) => {
                if (!wrapper.contains(e.target)) hideTooltip();
            });
        }

        document.body.appendChild(tooltip);
        this.activeTooltips.push(tooltip);

        return wrapper;
    }

    // Helper methods
    getAvatarColor(text) {
        const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#1890ff', '#52c41a', '#eb2f96'];
        const index = text.charCodeAt(0) % colors.length;
        return colors[index];
    }

    getMonthName(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    }

    generateCalendarDays(year, month) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        let html = '';
        const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        
        // Add day headers
        dayNames.forEach(day => {
            html += `<div class="dd-calendar-cell" style="font-weight: 500; color: #666;">${day}</div>`;
        });

        // Add calendar days
        const current = new Date(startDate);
        for (let i = 0; i < 42; i++) {
            const isCurrentMonth = current.getMonth() === month;
            const isToday = current.toDateString() === new Date().toDateString();
            
            html += `
                <div class="dd-calendar-cell ${isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''}" 
                     data-date="${current.toISOString()}">
                    ${current.getDate()}
                </div>
            `;
            
            current.setDate(current.getDate() + 1);
        }

        return html;
    }

    updateCalendar(calendar, date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const header = calendar.querySelector('.dd-calendar-header span');
        header.textContent = `${this.getMonthName(month)} ${year}`;
        
        const grid = calendar.querySelector('.dd-calendar-grid');
        grid.innerHTML = this.generateCalendarDays(year, month);
    }

    createPagination(options = {}) {
        const { total = 0, pageSize = 10, current = 1 } = options;
        const totalPages = Math.ceil(total / pageSize);
        
        const pagination = document.createElement('div');
        pagination.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 8px; margin-top: 16px;';
        
        for (let i = 1; i <= Math.min(totalPages, 5); i++) {
            const page = document.createElement('button');
            page.textContent = i;
            page.style.cssText = `
                padding: 4px 8px; border: 1px solid #d9d9d9; background: ${i === current ? '#1890ff' : '#fff'};
                color: ${i === current ? '#fff' : '#000'}; border-radius: 4px; cursor: pointer;
            `;
            pagination.appendChild(page);
        }
        
        return pagination;
    }

    // Utility methods for easy access
    static avatar(options) {
        const instance = new DataDisplayComponents();
        return instance.createAvatar(options);
    }

    static badge(options) {
        const instance = new DataDisplayComponents();
        return instance.createBadge(options);
    }

    static card(options) {
        const instance = new DataDisplayComponents();
        return instance.createCard(options);
    }

    static table(options) {
        const instance = new DataDisplayComponents();
        return instance.createTable(options);
    }

    static tabs(options) {
        const instance = new DataDisplayComponents();
        return instance.createTabs(options);
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataDisplayComponents;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.DataDisplayComponents = DataDisplayComponents;
    
    // Create global instance
    window.dataDisplayComponents = new DataDisplayComponents();
    
    console.log('📊 Data Display Components loaded');
}
