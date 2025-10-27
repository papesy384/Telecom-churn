/**
 * Data Entry Components System
 * Includes: AutoComplete, Input, Select, Checkbox, DatePicker, Form, InputNumber, Radio, Switch, Slider, TimePicker, Upload
 */

class DataEntryComponents {
    constructor() {
        this.components = {
            autoComplete: this.createAutoComplete.bind(this),
            input: this.createInput.bind(this),
            select: this.createSelect.bind(this),
            checkbox: this.createCheckbox.bind(this),
            datePicker: this.createDatePicker.bind(this),
            form: this.createForm.bind(this),
            inputNumber: this.createInputNumber.bind(this),
            radio: this.createRadio.bind(this),
            switch: this.createSwitch.bind(this),
            slider: this.createSlider.bind(this),
            timePicker: this.createTimePicker.bind(this),
            upload: this.createUpload.bind(this),
            rate: this.createRate.bind(this)
        };
        
        this.activePopups = [];
        this.init();
    }

    init() {
        this.createGlobalStyles();
        console.log('📝 Data Entry Components System initialized');
    }

    createGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Data Entry Components Global Styles */
            .de-component {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                box-sizing: border-box;
            }

            /* AutoComplete Component */
            .de-autocomplete {
                position: relative;
                width: 100%;
            }

            .de-autocomplete-input {
                width: 100%;
                padding: 4px 11px;
                font-size: 14px;
                line-height: 1.5715;
                color: rgba(0, 0, 0, 0.85);
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
            }

            .de-autocomplete-input:focus {
                outline: none;
                border-color: #40a9ff;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
            }

            .de-autocomplete-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-height: 256px;
                overflow-y: auto;
                z-index: 1050;
                margin-top: 4px;
            }

            .de-autocomplete-option {
                padding: 5px 12px;
                cursor: pointer;
                transition: background 0.3s;
            }

            .de-autocomplete-option:hover {
                background: #f5f5f5;
            }

            .de-autocomplete-option.selected {
                background: #e6f7ff;
                color: #1890ff;
            }

            /* Input Component */
            .de-input {
                box-sizing: border-box;
                margin: 0;
                padding: 4px 11px;
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                line-height: 1.5715;
                list-style: none;
                position: relative;
                display: inline-block;
                width: 100%;
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
            }

            .de-input:focus {
                border-color: #40a9ff;
                border-right-width: 1px;
                outline: 0;
                box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
            }

            .de-input:hover {
                border-color: #40a9ff;
            }

            .de-input::placeholder {
                color: #bfbfbf;
            }

            .de-input-group {
                position: relative;
                display: inline-block;
                width: 100%;
                border-collapse: separate;
                border-spacing: 0;
            }

            .de-input-prefix,
            .de-input-suffix {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(0, 0, 0, 0.45);
            }

            .de-input-prefix {
                left: 11px;
            }

            .de-input-suffix {
                right: 11px;
            }

            .de-input-prefix + .de-input,
            .de-input + .de-input-suffix {
                padding-left: 30px;
                padding-right: 30px;
            }

            /* Select Component */
            .de-select {
                position: relative;
                display: inline-block;
                width: 100%;
                box-sizing: border-box;
            }

            .de-select-selector {
                position: relative;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 100%;
                min-height: 32px;
                padding: 4px 11px;
                line-height: 1.5715;
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
            }

            .de-select-selector:hover {
                border-color: #40a9ff;
            }

            .de-select-single .de-select-selector {
                display: flex;
                align-items: center;
            }

            .de-select-placeholder {
                opacity: 0.4;
                color: rgba(0, 0, 0, 0.25);
            }

            .de-select-arrow {
                position: absolute;
                top: 50%;
                right: 11px;
                transform: translateY(-50%);
                color: rgba(0, 0, 0, 0.45);
                pointer-events: none;
                transition: transform 0.3s;
            }

            .de-select-dropdown {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                max-height: 256px;
                overflow-y: auto;
                z-index: 1050;
                margin-top: 4px;
            }

            .de-select-option {
                padding: 5px 12px;
                cursor: pointer;
                transition: background 0.3s;
            }

            .de-select-option:hover {
                background: #f5f5f5;
            }

            .de-select-option.selected {
                background: #e6f7ff;
                color: #1890ff;
            }

            /* Checkbox Component */
            .de-checkbox {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                line-height: 1.5715;
                list-style: none;
                position: relative;
                display: inline-block;
                white-space: nowrap;
                cursor: pointer;
            }

            .de-checkbox-input {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                cursor: pointer;
                opacity: 0;
            }

            .de-checkbox-inner {
                position: relative;
                top: 0;
                left: 0;
                display: block;
                width: 16px;
                height: 16px;
                direction: ltr;
                background-color: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                transition: all 0.3s;
            }

            .de-checkbox-input:checked + .de-checkbox-inner {
                background-color: #1890ff;
                border-color: #1890ff;
            }

            .de-checkbox-input:checked + .de-checkbox-inner::after {
                position: absolute;
                top: 2px;
                left: 5px;
                display: block;
                width: 5px;
                height: 8px;
                border: 2px solid #fff;
                border-top: 0;
                border-left: 0;
                transform: rotate(45deg);
                content: '';
            }

            .de-checkbox-label {
                padding-left: 8px;
            }

            /* DatePicker Component */
            .de-datepicker {
                position: relative;
                display: inline-block;
                width: 100%;
            }

            .de-datepicker-input {
                width: 100%;
                padding: 4px 11px;
                font-size: 14px;
                line-height: 1.5715;
                color: rgba(0, 0, 0, 0.85);
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
                cursor: pointer;
            }

            .de-datepicker-input:hover {
                border-color: #40a9ff;
            }

            /* Form Component */
            .de-form {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                font-variant: tabular-nums;
                line-height: 1.5715;
                list-style: none;
            }

            .de-form-item {
                margin-bottom: 24px;
                vertical-align: top;
            }

            .de-form-item-label {
                display: inline-block;
                flex-grow: 0;
                overflow: hidden;
                white-space: nowrap;
                text-align: right;
                vertical-align: middle;
            }

            .de-form-item-control {
                flex: 1 1 0;
                max-width: 100%;
            }

            /* InputNumber Component */
            .de-input-number {
                position: relative;
                display: inline-block;
                width: 100%;
                min-width: 0;
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                line-height: 1.5715;
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
            }

            .de-input-number-handler {
                position: absolute;
                right: 0;
                display: flex;
                flex-direction: column;
                width: 22px;
                height: 100%;
                background: #fafafa;
                border-left: 1px solid #d9d9d9;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            }

            .de-input-number-handler-up,
            .de-input-number-handler-down {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: background 0.3s;
                user-select: none;
            }

            .de-input-number-handler-up:hover,
            .de-input-number-handler-down:hover {
                background: #e6f7ff;
            }

            .de-input-number-input {
                width: 100%;
                height: 100%;
                padding: 4px 32px 4px 11px;
                text-align: left;
                border: none;
                border-radius: 6px;
                outline: none;
                transition: all 0.3s;
                font-size: 14px;
            }

            /* Radio Component */
            .de-radio {
                position: relative;
                display: inline-block;
                margin-right: 16px;
                white-space: nowrap;
                cursor: pointer;
            }

            .de-radio-input {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                cursor: pointer;
                opacity: 0;
            }

            .de-radio-inner {
                position: relative;
                top: 0;
                left: 0;
                display: block;
                width: 16px;
                height: 16px;
                background-color: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 50%;
                transition: all 0.3s;
            }

            .de-radio-input:checked + .de-radio-inner {
                background-color: #1890ff;
                border-color: #1890ff;
            }

            .de-radio-input:checked + .de-radio-inner::after {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 6px;
                height: 6px;
                background: #fff;
                border-radius: 50%;
                content: '';
            }

            .de-radio-label {
                padding-left: 8px;
            }

            /* Switch Component */
            .de-switch {
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                min-width: 44px;
                height: 22px;
                line-height: 22px;
                vertical-align: middle;
                background-color: rgba(0, 0, 0, 0.25);
                border: 0;
                border-radius: 100px;
                cursor: pointer;
                transition: all 0.3s;
                user-select: none;
            }

            .de-switch-handle {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 18px;
                height: 18px;
                transition: all 0.3s;
                background: #fff;
                border-radius: 18px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .de-switch.checked {
                background-color: #1890ff;
            }

            .de-switch.checked .de-switch-handle {
                left: calc(100% - 20px);
            }

            .de-switch:disabled {
                cursor: not-allowed;
                opacity: 0.4;
            }

            /* Slider Component */
            .de-slider {
                position: relative;
                height: 20px;
                margin: 14px 0;
                padding: 5px 0;
                cursor: pointer;
                touch-action: none;
            }

            .de-slider-rail {
                position: absolute;
                width: 100%;
                height: 4px;
                background-color: #f5f5f5;
                border-radius: 2px;
                transition: background-color 0.3s;
            }

            .de-slider-track {
                position: absolute;
                height: 4px;
                background-color: #1890ff;
                border-radius: 2px;
                transition: background-color 0.3s;
            }

            .de-slider-handle {
                position: absolute;
                width: 14px;
                height: 14px;
                margin-top: -5px;
                background-color: #fff;
                border: 2px solid #1890ff;
                border-radius: 50%;
                cursor: pointer;
                transition: border-color 0.3s, box-shadow 0.3s;
            }

            .de-slider-handle:hover {
                border-color: #40a9ff;
            }

            /* TimePicker Component */
            .de-timepicker {
                position: relative;
                display: inline-block;
                width: 100%;
            }

            .de-timepicker-input {
                width: 100%;
                padding: 4px 11px;
                font-size: 14px;
                line-height: 1.5715;
                color: rgba(0, 0, 0, 0.85);
                background: #fff;
                border: 1px solid #d9d9d9;
                border-radius: 6px;
                transition: all 0.3s;
                cursor: pointer;
            }

            .de-timepicker-input:hover {
                border-color: #40a9ff;
            }

            /* Upload Component */
            .de-upload {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                color: rgba(0, 0, 0, 0.85);
                font-size: 14px;
                line-height: 1.5715;
                list-style: none;
            }

            .de-upload-drag {
                position: relative;
                width: 100%;
                height: 180px;
                background: #fafafa;
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                transition: border-color 0.3s;
                cursor: pointer;
            }

            .de-upload-drag:hover {
                border-color: #40a9ff;
            }

            .de-upload-drag-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: rgba(0, 0, 0, 0.65);
            }

            .de-upload-icon {
                font-size: 48px;
                color: #40a9ff;
                margin-bottom: 16px;
            }

            .de-upload-text {
                margin-bottom: 8px;
                color: rgba(0, 0, 0, 0.85);
                font-size: 16px;
            }

            .de-upload-hint {
                color: rgba(0, 0, 0, 0.45);
                font-size: 14px;
            }

            /* Rate Component */
            .de-rate {
                display: inline-flex;
                font-size: 20px;
                line-height: 1;
                cursor: pointer;
            }

            .de-rate-star {
                position: relative;
                display: inline-block;
                margin-right: 8px;
                color: #f0f0f0;
                transition: color 0.3s;
            }

            .de-rate-star:hover {
                color: #1890ff;
            }

            .de-rate-star.checked {
                color: #faad14;
            }

            .de-rate-star:hover ~ .de-rate-star {
                color: #f0f0f0;
            }
        `;
        document.head.appendChild(style);
    }

    // AutoComplete Component
    createAutoComplete(options = {}) {
        const {
            placeholder = 'AutoComplete',
            dataSource = [],
            onChange = null,
            onSelect = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-autocomplete';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'de-autocomplete-input';
        input.placeholder = placeholder;
        container.appendChild(input);

        const dropdown = document.createElement('div');
        dropdown.className = 'de-autocomplete-dropdown';
        dropdown.style.display = 'none';
        container.appendChild(dropdown);

        input.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();
            if (value && dataSource.length > 0) {
                const filtered = dataSource.filter(item => 
                    item.toLowerCase().includes(value)
                );
                if (filtered.length > 0) {
                    dropdown.innerHTML = filtered.map(item => `
                        <div class="de-autocomplete-option">${item}</div>
                    `).join('');
                    dropdown.style.display = 'block';
                } else {
                    dropdown.style.display = 'none';
                }
            } else {
                dropdown.style.display = 'none';
            }

            if (onChange) onChange(e.target.value);
        });

        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('de-autocomplete-option')) {
                input.value = e.target.textContent;
                dropdown.style.display = 'none';
                if (onSelect) onSelect(e.target.textContent);
            }
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        return container;
    }

    // Input Component
    createInput(options = {}) {
        const {
            type = 'text',
            placeholder = '',
            value = '',
            prefix = null,
            suffix = null,
            onChange = null,
            onPressEnter = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-input-group';

        if (prefix) {
            const prefixEl = document.createElement('span');
            prefixEl.className = 'de-input-prefix';
            prefixEl.innerHTML = prefix;
            container.appendChild(prefixEl);
        }

        const input = document.createElement('input');
        input.type = type;
        input.className = 'de-input';
        input.placeholder = placeholder;
        input.value = value;
        
        if (onChange) {
            input.addEventListener('input', (e) => onChange(e.target.value));
        }

        if (onPressEnter) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    onPressEnter(e.target.value);
                }
            });
        }

        container.appendChild(input);

        if (suffix) {
            const suffixEl = document.createElement('span');
            suffixEl.className = 'de-input-suffix';
            suffixEl.innerHTML = suffix;
            container.appendChild(suffixEl);
        }

        return container;
    }

    // Select Component
    createSelect(options = {}) {
        const {
            placeholder = 'Select',
            options: selectOptions = [],
            defaultValue = null,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-select de-select-single';

        const selector = document.createElement('div');
        selector.className = 'de-select-selector';
        selector.innerHTML = `
            <span class="de-select-selection-search"></span>
            <span class="de-select-selection-item">${defaultValue || placeholder}</span>
            <span class="de-select-arrow">▼</span>
        `;
        container.appendChild(selector);

        const dropdown = document.createElement('div');
        dropdown.className = 'de-select-dropdown';
        dropdown.style.display = 'none';
        dropdown.innerHTML = selectOptions.map(option => {
            const isDefault = option.value === defaultValue;
            return `
                <div class="de-select-option ${isDefault ? 'selected' : ''}" data-value="${option.value}">
                    ${option.label}
                </div>
            `;
        }).join('');
        container.appendChild(dropdown);

        selector.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        dropdown.addEventListener('click', (e) => {
            if (e.target.classList.contains('de-select-option')) {
                const value = e.target.dataset.value;
                selector.querySelector('.de-select-selection-item').textContent = e.target.textContent;
                dropdown.style.display = 'none';
                if (onChange) onChange(value);
            }
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                dropdown.style.display = 'none';
            }
        });

        return container;
    }

    // Checkbox Component
    createCheckbox(options = {}) {
        const {
            checked = false,
            children = '',
            onChange = null
        } = options;

        const label = document.createElement('label');
        label.className = 'de-checkbox';
        
        label.innerHTML = `
            <input type="checkbox" class="de-checkbox-input" ${checked ? 'checked' : ''}>
            <span class="de-checkbox-inner"></span>
            ${children ? `<span class="de-checkbox-label">${children}</span>` : ''}
        `;

        const input = label.querySelector('.de-checkbox-input');
        input.addEventListener('change', (e) => {
            if (onChange) onChange(e.target.checked);
        });

        return label;
    }

    // DatePicker Component
    createDatePicker(options = {}) {
        const {
            placeholder = 'Select date',
            value = null,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-datepicker';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'de-datepicker-input';
        input.placeholder = placeholder;
        input.value = value || '';
        input.readOnly = true;
        container.appendChild(input);

        input.addEventListener('click', () => {
            // Simple date picker implementation
            const today = new Date();
            const dateStr = prompt('Enter date (YYYY-MM-DD):', today.toISOString().split('T')[0]);
            if (dateStr) {
                input.value = dateStr;
                if (onChange) onChange(dateStr);
            }
        });

        return container;
    }

    // Form Component
    createForm(options = {}) {
        const {
            layout = 'vertical',
            onFinish = null
        } = options;

        const form = document.createElement('form');
        form.className = `de-form de-form-${layout}`;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (onFinish) {
                const formData = new FormData(e.target);
                const data = {};
                for (let [key, value] of formData.entries()) {
                    data[key] = value;
                }
                onFinish(data);
            }
        });

        form.render = (content) => {
            form.innerHTML = content;
        };

        form.addItem = (item) => {
            const formItem = document.createElement('div');
            formItem.className = 'de-form-item';
            formItem.innerHTML = item;
            form.appendChild(formItem);
        };

        return form;
    }

    // InputNumber Component
    createInputNumber(options = {}) {
        const {
            min = 0,
            max = 100,
            step = 1,
            defaultValue = 0,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-input-number';

        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'de-input-number-input';
        input.min = min;
        input.max = max;
        input.step = step;
        input.value = defaultValue;

        if (onChange) {
            input.addEventListener('input', (e) => {
                onChange(parseInt(e.target.value));
            });
        }

        const handlers = document.createElement('div');
        handlers.className = 'de-input-number-handler';
        handlers.innerHTML = `
            <span class="de-input-number-handler-up">▲</span>
            <span class="de-input-number-handler-down">▼</span>
        `;

        handlers.querySelector('.de-input-number-handler-up').onclick = () => {
            const newValue = Math.min(max, parseInt(input.value) + step);
            input.value = newValue;
            if (onChange) onChange(newValue);
        };

        handlers.querySelector('.de-input-number-handler-down').onclick = () => {
            const newValue = Math.max(min, parseInt(input.value) - step);
            input.value = newValue;
            if (onChange) onChange(newValue);
        };

        container.appendChild(input);
        container.appendChild(handlers);

        return container;
    }

    // Radio Component
    createRadio(options = {}) {
        const {
            name = 'radio',
            value = '',
            checked = false,
            children = '',
            onChange = null
        } = options;

        const label = document.createElement('label');
        label.className = 'de-radio';
        
        label.innerHTML = `
            <input type="radio" class="de-radio-input" name="${name}" value="${value}" ${checked ? 'checked' : ''}>
            <span class="de-radio-inner"></span>
            ${children ? `<span class="de-radio-label">${children}</span>` : ''}
        `;

        const input = label.querySelector('.de-radio-input');
        input.addEventListener('change', (e) => {
            if (onChange) onChange(e.target.value);
        });

        return label;
    }

    // Switch Component
    createSwitch(options = {}) {
        const {
            checked = false,
            onChange = null
        } = options;

        const switchEl = document.createElement('span');
        switchEl.className = `de-switch ${checked ? 'checked' : ''}`;
        switchEl.innerHTML = '<span class="de-switch-handle"></span>';

        switchEl.addEventListener('click', (e) => {
            e.preventDefault();
            switchEl.classList.toggle('checked');
            if (onChange) onChange(switchEl.classList.contains('checked'));
        });

        switchEl.setChecked = (isChecked) => {
            if (isChecked) {
                switchEl.classList.add('checked');
            } else {
                switchEl.classList.remove('checked');
            }
        };

        return switchEl;
    }

    // Slider Component
    createSlider(options = {}) {
        const {
            min = 0,
            max = 100,
            defaultValue = 0,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-slider';

        const rail = document.createElement('div');
        rail.className = 'de-slider-rail';
        container.appendChild(rail);

        const track = document.createElement('div');
        track.className = 'de-slider-track';
        track.style.width = `${(defaultValue / (max - min)) * 100}%`;
        container.appendChild(track);

        const handle = document.createElement('div');
        handle.className = 'de-slider-handle';
        handle.style.left = `${(defaultValue / (max - min)) * 100}%`;
        container.appendChild(handle);

        // Add dragging functionality
        let isDragging = false;

        handle.addEventListener('mousedown', () => {
            isDragging = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const rect = container.getBoundingClientRect();
                const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const value = Math.round((percentage / 100) * (max - min) + min);
                handle.style.left = `${percentage}%`;
                track.style.width = `${percentage}%`;
                if (onChange) onChange(value);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        return container;
    }

    // TimePicker Component
    createTimePicker(options = {}) {
        const {
            placeholder = 'Select time',
            value = null,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-timepicker';

        const input = document.createElement('input');
        input.type = 'time';
        input.className = 'de-timepicker-input';
        input.placeholder = placeholder;
        input.value = value || '';

        if (onChange) {
            input.addEventListener('change', (e) => {
                onChange(e.target.value);
            });
        }

        container.appendChild(input);
        return container;
    }

    // Upload Component
    createUpload(options = {}) {
        const {
            name = 'file',
            multiple = false,
            accept = '*',
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-upload';

        const drag = document.createElement('div');
        drag.className = 'de-upload-drag';
        drag.innerHTML = `
            <div class="de-upload-drag-content">
                <div class="de-upload-icon">📤</div>
                <div class="de-upload-text">Click or drag file to this area to upload</div>
                <div class="de-upload-hint">Support for a single or bulk upload.</div>
            </div>
        `;

        const input = document.createElement('input');
        input.type = 'file';
        input.name = name;
        input.multiple = multiple;
        input.accept = accept;
        input.style.display = 'none';

        drag.addEventListener('click', () => input.click());

        input.addEventListener('change', (e) => {
            if (onChange) onChange(e.target.files);
        });

        container.appendChild(drag);
        container.appendChild(input);

        return container;
    }

    // Rate Component
    createRate(options = {}) {
        const {
            defaultValue = 0,
            onChange = null
        } = options;

        const container = document.createElement('div');
        container.className = 'de-rate';

        for (let i = 0; i < 5; i++) {
            const star = document.createElement('div');
            star.className = `de-rate-star ${i < defaultValue ? 'checked' : ''}`;
            star.textContent = '★';
            star.dataset.index = i;

            star.addEventListener('click', () => {
                const value = i + 1;
                container.querySelectorAll('.de-rate-star').forEach((s, idx) => {
                    if (idx < value) {
                        s.classList.add('checked');
                    } else {
                        s.classList.remove('checked');
                    }
                });
                if (onChange) onChange(value);
            });

            container.appendChild(star);
        }

        return container;
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataEntryComponents;
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.DataEntryComponents = DataEntryComponents;
    
    // Create global instance
    window.dataEntryComponents = new DataEntryComponents();
    
    console.log('📝 Data Entry Components loaded');
}
