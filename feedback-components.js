/**
 * Minimal Feedback Components System
 * Includes: Alert, Title, Drawer, Message, Modal, Notification, Popconfirm, Progress, Skeleton, Spin, Watermark
 */

class FeedbackComponents {
    constructor() {
        this.components = {
            alert: this.createAlert.bind(this),
            title: this.createTitle.bind(this),
            drawer: this.createDrawer.bind(this),
            message: this.createMessage.bind(this),
            modal: this.createModal.bind(this),
            notification: this.createNotification.bind(this),
            popconfirm: this.createPopconfirm.bind(this),
            progress: this.createProgress.bind(this),
            skeleton: this.createSkeleton.bind(this),
            spin: this.createSpin.bind(this),
            watermark: this.createWatermark.bind(this)
        };
        
        this.activeNotifications = [];
        this.activeModals = [];
        this.init();
    }

    init() {
        this.createGlobalStyles();
        this.createNotificationContainer();
        console.log('🎨 Feedback Components System initialized');
    }

    createGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Feedback Components Global Styles */
            .feedback-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .feedback-alert {
                padding: 12px 16px;
                border-radius: 6px;
                border: 1px solid;
                margin: 8px 0;
                display: flex;
                align-items: center;
                gap: 8px;
            }

            .feedback-alert.info {
                background: #e6f7ff;
                border-color: #91d5ff;
                color: #1890ff;
            }

            .feedback-alert.success {
                background: #f6ffed;
                border-color: #b7eb8f;
                color: #52c41a;
            }

            .feedback-alert.warning {
                background: #fffbe6;
                border-color: #ffe58f;
                color: #faad14;
            }

            .feedback-alert.error {
                background: #fff2f0;
                border-color: #ffccc7;
                color: #ff4d4f;
            }

            .feedback-title {
                font-size: 24px;
                font-weight: 600;
                color: #262626;
                margin: 0 0 16px 0;
                line-height: 1.35;
            }

            .feedback-drawer {
                position: fixed;
                background: white;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1001;
                transition: transform 0.3s ease;
            }

            .feedback-drawer.right {
                top: 0;
                right: 0;
                height: 100vh;
                width: 378px;
                transform: translateX(100%);
            }

            .feedback-drawer.left {
                top: 0;
                left: 0;
                height: 100vh;
                width: 378px;
                transform: translateX(-100%);
            }

            .feedback-drawer.top {
                top: 0;
                left: 0;
                right: 0;
                height: 378px;
                transform: translateY(-100%);
            }

            .feedback-drawer.bottom {
                bottom: 0;
                left: 0;
                right: 0;
                height: 378px;
                transform: translateY(100%);
            }

            .feedback-drawer.open {
                transform: translate(0, 0);
            }

            .feedback-message {
                position: fixed;
                top: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 8px 16px;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 1010;
                display: flex;
                align-items: center;
                gap: 8px;
                animation: messageSlideIn 0.3s ease;
            }

            @keyframes messageSlideIn {
                from { transform: translateX(-50%) translateY(-100%); }
                to { transform: translateX(-50%) translateY(0); }
            }

            .feedback-modal {
                background: white;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-width: 520px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }

            .feedback-modal-header {
                padding: 16px 24px;
                border-bottom: 1px solid #f0f0f0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .feedback-modal-body {
                padding: 24px;
            }

            .feedback-modal-footer {
                padding: 10px 16px;
                border-top: 1px solid #f0f0f0;
                display: flex;
                justify-content: flex-end;
                gap: 8px;
            }

            .feedback-notification-container {
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 1010;
                width: 384px;
            }

            .feedback-notification {
                background: white;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 16px;
                margin-bottom: 16px;
                border-left: 4px solid #1890ff;
                animation: notificationSlideIn 0.3s ease;
            }

            @keyframes notificationSlideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            .feedback-popconfirm {
                position: absolute;
                background: white;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                padding: 12px;
                z-index: 1005;
                min-width: 200px;
            }

            .feedback-progress {
                background: #f5f5f5;
                border-radius: 100px;
                overflow: hidden;
                height: 8px;
            }

            .feedback-progress-bar {
                background: #1890ff;
                height: 100%;
                transition: width 0.3s ease;
                border-radius: 100px;
            }

            .feedback-skeleton {
                animation: skeletonLoading 1.5s ease-in-out infinite;
            }

            .feedback-skeleton-line {
                background: #f0f0f0;
                border-radius: 4px;
                margin: 8px 0;
            }

            @keyframes skeletonLoading {
                0% { opacity: 1; }
                50% { opacity: 0.4; }
                100% { opacity: 1; }
            }

            .feedback-spin {
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }

            .feedback-spin-icon {
                width: 14px;
                height: 14px;
                border: 2px solid #f0f0f0;
                border-top: 2px solid #1890ff;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            .feedback-watermark {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                z-index: 9;
                opacity: 0.1;
                background-image: repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 100px,
                    rgba(0, 0, 0, 0.1) 100px,
                    rgba(0, 0, 0, 0.1) 200px
                );
            }

            .feedback-btn {
                padding: 4px 15px;
                border-radius: 6px;
                border: 1px solid #d9d9d9;
                background: white;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.3s;
            }

            .feedback-btn:hover {
                border-color: #40a9ff;
                color: #40a9ff;
            }

            .feedback-btn.primary {
                background: #1890ff;
                border-color: #1890ff;
                color: white;
            }

            .feedback-btn.primary:hover {
                background: #40a9ff;
                border-color: #40a9ff;
            }
        `;
        document.head.appendChild(style);
    }

    createNotificationContainer() {
        if (!document.getElementById('feedback-notification-container')) {
            const container = document.createElement('div');
            container.id = 'feedback-notification-container';
            container.className = 'feedback-notification-container';
            document.body.appendChild(container);
        }
    }

    // Alert Component
    createAlert(options = {}) {
        const {
            type = 'info',
            message = 'Alert message',
            closable = false,
            onClose = null
        } = options;

        const alert = document.createElement('div');
        alert.className = `feedback-alert ${type}`;
        
        const icon = this.getIcon(type);
        alert.innerHTML = `
            ${icon}
            <span>${message}</span>
            ${closable ? '<button class="feedback-alert-close" style="margin-left: auto; background: none; border: none; cursor: pointer;">×</button>' : ''}
        `;

        if (closable) {
            const closeBtn = alert.querySelector('.feedback-alert-close');
            closeBtn.onclick = () => {
                alert.remove();
                if (onClose) onClose();
            };
        }

        return alert;
    }

    // Title Component
    createTitle(options = {}) {
        const {
            level = 1,
            text = 'Title',
            className = ''
        } = options;

        const title = document.createElement(`h${level}`);
        title.className = `feedback-title ${className}`;
        title.textContent = text;
        
        return title;
    }

    // Drawer Component
    createDrawer(options = {}) {
        const {
            title = 'Drawer',
            placement = 'right',
            width = 378,
            height = 378,
            closable = true,
            onClose = null,
            content = ''
        } = options;

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'feedback-overlay';
        
        // Create drawer
        const drawer = document.createElement('div');
        drawer.className = `feedback-drawer ${placement}`;
        
        if (placement === 'left' || placement === 'right') {
            drawer.style.width = `${width}px`;
        } else {
            drawer.style.height = `${height}px`;
        }

        drawer.innerHTML = `
            <div class="feedback-modal-header">
                <h4 style="margin: 0; font-size: 16px; font-weight: 500;">${title}</h4>
                ${closable ? '<button class="feedback-drawer-close" style="background: none; border: none; cursor: pointer; font-size: 18px;">×</button>' : ''}
            </div>
            <div class="feedback-modal-body">
                ${content}
            </div>
        `;

        const closeDrawer = () => {
            drawer.classList.remove('open');
            setTimeout(() => {
                overlay.remove();
                if (onClose) onClose();
            }, 300);
        };

        if (closable) {
            const closeBtn = drawer.querySelector('.feedback-drawer-close');
            closeBtn.onclick = closeDrawer;
            overlay.onclick = (e) => {
                if (e.target === overlay) closeDrawer();
            };
        }

        overlay.appendChild(drawer);
        document.body.appendChild(overlay);
        
        // Trigger animation
        setTimeout(() => drawer.classList.add('open'), 10);

        return { overlay, drawer, close: closeDrawer };
    }

    // Message Component
    createMessage(options = {}) {
        const {
            type = 'info',
            content = 'Message',
            duration = 3000
        } = options;

        const message = document.createElement('div');
        message.className = 'feedback-message';
        
        const icon = this.getIcon(type);
        message.innerHTML = `${icon}<span>${content}</span>`;

        document.body.appendChild(message);

        if (duration > 0) {
            setTimeout(() => {
                message.style.animation = 'messageSlideIn 0.3s ease reverse';
                setTimeout(() => message.remove(), 300);
            }, duration);
        }

        return message;
    }

    // Modal Component
    createModal(options = {}) {
        const {
            title = 'Modal',
            content = '',
            closable = true,
            footer = null,
            onOk = null,
            onCancel = null
        } = options;

        const overlay = document.createElement('div');
        overlay.className = 'feedback-overlay';

        const modal = document.createElement('div');
        modal.className = 'feedback-modal';

        const defaultFooter = `
            <button class="feedback-btn" onclick="this.closest('.feedback-overlay').querySelector('.feedback-modal-cancel').click()">Cancel</button>
            <button class="feedback-btn primary" onclick="this.closest('.feedback-overlay').querySelector('.feedback-modal-ok').click()">OK</button>
        `;

        modal.innerHTML = `
            <div class="feedback-modal-header">
                <h4 style="margin: 0; font-size: 16px; font-weight: 500;">${title}</h4>
                ${closable ? '<button class="feedback-modal-close" style="background: none; border: none; cursor: pointer; font-size: 18px;">×</button>' : ''}
            </div>
            <div class="feedback-modal-body">
                ${content}
            </div>
            <div class="feedback-modal-footer">
                ${footer || defaultFooter}
            </div>
        `;

        const closeModal = () => {
            overlay.remove();
            this.activeModals = this.activeModals.filter(m => m !== overlay);
        };

        // Event handlers
        if (closable) {
            const closeBtn = modal.querySelector('.feedback-modal-close');
            closeBtn.onclick = closeModal;
        }

        // Hidden buttons for event handling
        const okBtn = document.createElement('button');
        okBtn.className = 'feedback-modal-ok';
        okBtn.style.display = 'none';
        okBtn.onclick = () => {
            if (onOk) onOk();
            closeModal();
        };

        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'feedback-modal-cancel';
        cancelBtn.style.display = 'none';
        cancelBtn.onclick = () => {
            if (onCancel) onCancel();
            closeModal();
        };

        modal.appendChild(okBtn);
        modal.appendChild(cancelBtn);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        this.activeModals.push(overlay);

        return { overlay, modal, close: closeModal };
    }

    // Notification Component
    createNotification(options = {}) {
        const {
            type = 'info',
            message = 'Notification',
            description = '',
            duration = 4500,
            placement = 'topRight'
        } = options;

        const container = document.getElementById('feedback-notification-container');
        const notification = document.createElement('div');
        notification.className = 'feedback-notification';
        
        const icon = this.getIcon(type);
        notification.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 12px;">
                ${icon}
                <div style="flex: 1;">
                    <div style="font-weight: 500; margin-bottom: 4px;">${message}</div>
                    ${description ? `<div style="color: #666; font-size: 14px;">${description}</div>` : ''}
                </div>
                <button class="feedback-notification-close" style="background: none; border: none; cursor: pointer; color: #999;">×</button>
            </div>
        `;

        const closeBtn = notification.querySelector('.feedback-notification-close');
        closeBtn.onclick = () => {
            notification.style.animation = 'notificationSlideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
                this.activeNotifications = this.activeNotifications.filter(n => n !== notification);
            }, 300);
        };

        container.appendChild(notification);
        this.activeNotifications.push(notification);

        if (duration > 0) {
            setTimeout(() => closeBtn.click(), duration);
        }

        return notification;
    }

    // Popconfirm Component
    createPopconfirm(options = {}) {
        const {
            title = 'Are you sure?',
            content = '',
            onConfirm = null,
            onCancel = null,
            trigger = null
        } = options;

        if (!trigger) return null;

        const popconfirm = document.createElement('div');
        popconfirm.className = 'feedback-popconfirm';
        popconfirm.style.display = 'none';

        popconfirm.innerHTML = `
            <div style="margin-bottom: 12px;">
                <div style="font-weight: 500; margin-bottom: 4px;">${title}</div>
                ${content ? `<div style="color: #666; font-size: 14px;">${content}</div>` : ''}
            </div>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <button class="feedback-btn feedback-popconfirm-cancel">Cancel</button>
                <button class="feedback-btn primary feedback-popconfirm-ok">OK</button>
            </div>
        `;

        const okBtn = popconfirm.querySelector('.feedback-popconfirm-ok');
        const cancelBtn = popconfirm.querySelector('.feedback-popconfirm-cancel');

        const hide = () => {
            popconfirm.style.display = 'none';
        };

        okBtn.onclick = () => {
            if (onConfirm) onConfirm();
            hide();
        };

        cancelBtn.onclick = () => {
            if (onCancel) onCancel();
            hide();
        };

        trigger.onclick = (e) => {
            e.stopPropagation();
            const rect = trigger.getBoundingClientRect();
            popconfirm.style.display = 'block';
            popconfirm.style.top = `${rect.bottom + 8}px`;
            popconfirm.style.left = `${rect.left}px`;
        };

        document.body.appendChild(popconfirm);

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!popconfirm.contains(e.target) && e.target !== trigger) {
                hide();
            }
        });

        return popconfirm;
    }

    // Progress Component
    createProgress(options = {}) {
        const {
            percent = 0,
            status = 'normal',
            showInfo = true,
            strokeWidth = 8
        } = options;

        const progress = document.createElement('div');
        progress.innerHTML = `
            <div class="feedback-progress" style="height: ${strokeWidth}px;">
                <div class="feedback-progress-bar" style="width: ${percent}%;"></div>
            </div>
            ${showInfo ? `<div style="margin-top: 4px; font-size: 14px; color: #666;">${percent}%</div>` : ''}
        `;

        progress.updateProgress = (newPercent) => {
            const bar = progress.querySelector('.feedback-progress-bar');
            const info = progress.querySelector('div:last-child');
            bar.style.width = `${newPercent}%`;
            if (showInfo && info) {
                info.textContent = `${newPercent}%`;
            }
        };

        return progress;
    }

    // Skeleton Component
    createSkeleton(options = {}) {
        const {
            active = true,
            paragraph = { rows: 3 },
            title = true,
            avatar = false
        } = options;

        const skeleton = document.createElement('div');
        skeleton.className = active ? 'feedback-skeleton' : '';

        let html = '';
        
        if (avatar) {
            html += '<div style="width: 40px; height: 40px; background: #f0f0f0; border-radius: 50%; margin-bottom: 16px;"></div>';
        }
        
        if (title) {
            html += '<div class="feedback-skeleton-line" style="height: 16px; width: 38%; margin-bottom: 16px;"></div>';
        }
        
        if (paragraph && paragraph.rows) {
            for (let i = 0; i < paragraph.rows; i++) {
                const width = i === paragraph.rows - 1 ? '61%' : '100%';
                html += `<div class="feedback-skeleton-line" style="height: 14px; width: ${width};"></div>`;
            }
        }

        skeleton.innerHTML = html;
        return skeleton;
    }

    // Spin Component
    createSpin(options = {}) {
        const {
            spinning = true,
            tip = 'Loading...',
            size = 'default'
        } = options;

        const spin = document.createElement('div');
        spin.className = 'feedback-spin';
        
        if (spinning) {
            spin.innerHTML = `
                <div class="feedback-spin-icon"></div>
                ${tip ? `<span>${tip}</span>` : ''}
            `;
        }

        spin.setSpinning = (isSpinning) => {
            if (isSpinning) {
                spin.innerHTML = `
                    <div class="feedback-spin-icon"></div>
                    ${tip ? `<span>${tip}</span>` : ''}
                `;
            } else {
                spin.innerHTML = '';
            }
        };

        return spin;
    }

    // Watermark Component
    createWatermark(options = {}) {
        const {
            content = 'Watermark',
            font = {
                fontSize: 16,
                fontFamily: 'sans-serif',
                fontWeight: 'normal',
                color: 'rgba(0, 0, 0, 0.15)'
            }
        } = options;

        const watermark = document.createElement('div');
        watermark.className = 'feedback-watermark';
        watermark.style.background = `
            repeating-linear-gradient(
                45deg,
                transparent,
                transparent 200px,
                ${font.color} 200px,
                ${font.color} 201px
            )
        `;

        // Add text watermark
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 200;
        
        ctx.font = `${font.fontWeight} ${font.fontSize}px ${font.fontFamily}`;
        ctx.fillStyle = font.color;
        ctx.textAlign = 'center';
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(content, 0, 100);
        
        watermark.style.backgroundImage = `url(${canvas.toDataURL()})`;
        watermark.style.backgroundRepeat = 'repeat';

        return watermark;
    }

    // Helper method to get icons
    getIcon(type) {
        const icons = {
            info: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm0 11c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm1-3H6V4h2v4z"/></svg>',
            success: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.5 5.5L6 10 3.5 7.5l1-1L6 8l3.5-3.5 1 1z"/></svg>',
            warning: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0L0 12h14L7 0zm0 10c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm1-3H6V4h2v3z"/></svg>',
            error: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 0C3.134 0 0 3.134 0 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7zm3.5 9.5L9.5 10.5 7 8l-2.5 2.5L3.5 9.5 6 7 3.5 4.5 4.5 3.5 7 6l2.5-2.5L10.5 4.5 8 7l2.5 2.5z"/></svg>'
        };
        return icons[type] || icons.info;
    }

    // Apply components to existing elements
    applyToExisting() {
        console.log('🎨 Applying feedback components...');

        // Apply to existing alerts
        this.applyAlerts();
        
        // Apply to existing modals
        this.applyModals();
        
        // Apply to existing progress bars
        this.applyProgress();
        
        // Apply to existing loading states
        this.applySpinners();

        console.log('✅ Feedback components applied!');
    }

    applyAlerts() {
        // Find existing alert-like elements and enhance them
        const alerts = document.querySelectorAll('.alert, .notification, .banner');
        alerts.forEach(alert => {
            if (!alert.classList.contains('feedback-enhanced')) {
                alert.classList.add('feedback-alert', 'info', 'feedback-enhanced');
            }
        });
    }

    applyModals() {
        // Enhance existing modals
        const modals = document.querySelectorAll('.modal, #detailModal');
        modals.forEach(modal => {
            if (!modal.classList.contains('feedback-enhanced')) {
                modal.classList.add('feedback-enhanced');
                // Add close functionality if not present
                if (!modal.querySelector('.modal-close')) {
                    const closeBtn = document.createElement('button');
                    closeBtn.innerHTML = '×';
                    closeBtn.className = 'modal-close';
                    closeBtn.style.cssText = 'position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 20px; cursor: pointer;';
                    closeBtn.onclick = () => {
                        modal.classList.add('hidden');
                        modal.classList.remove('flex');
                    };
                    modal.appendChild(closeBtn);
                }
            }
        });
    }

    applyProgress() {
        // Find and enhance progress elements
        const progressElements = document.querySelectorAll('.progress, [role="progressbar"]');
        progressElements.forEach(progress => {
            if (!progress.classList.contains('feedback-enhanced')) {
                progress.classList.add('feedback-progress', 'feedback-enhanced');
            }
        });
    }

    applySpinners() {
        // Find and enhance loading elements
        const loadingElements = document.querySelectorAll('.loading, .spinner, [data-loading]');
        loadingElements.forEach(loading => {
            if (!loading.classList.contains('feedback-enhanced')) {
                loading.classList.add('feedback-spin', 'feedback-enhanced');
                if (!loading.querySelector('.feedback-spin-icon')) {
                    loading.innerHTML = '<div class="feedback-spin-icon"></div>' + loading.innerHTML;
                }
            }
        });
    }

    // Utility methods for easy access
    static alert(message, type = 'info') {
        const instance = new FeedbackComponents();
        const alert = instance.createAlert({ message, type, closable: true });
        document.body.appendChild(alert);
        return alert;
    }

    static message(content, type = 'info', duration = 3000) {
        const instance = new FeedbackComponents();
        return instance.createMessage({ content, type, duration });
    }

    static notification(message, description = '', type = 'info') {
        const instance = new FeedbackComponents();
        return instance.createNotification({ message, description, type });
    }

    static modal(title, content, options = {}) {
        const instance = new FeedbackComponents();
        return instance.createModal({ title, content, ...options });
    }

    static progress(percent) {
        const instance = new FeedbackComponents();
        return instance.createProgress({ percent, showInfo: true });
    }

    static spin(tip = 'Loading...') {
        const instance = new FeedbackComponents();
        return instance.createSpin({ tip, spinning: true });
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FeedbackComponents;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.FeedbackComponents = FeedbackComponents;
    
    // Create global instance
    window.feedbackComponents = new FeedbackComponents();
    
    // Add convenient global methods
    window.showAlert = (message, type) => FeedbackComponents.alert(message, type);
    window.showMessage = (content, type) => FeedbackComponents.message(content, type);
    window.showNotification = (message, description, type) => FeedbackComponents.notification(message, description, type);
    window.showModal = (title, content, options) => FeedbackComponents.modal(title, content, options);
    
    console.log('🎨 Feedback Components loaded. Use showAlert(), showMessage(), showNotification(), showModal()');
}
