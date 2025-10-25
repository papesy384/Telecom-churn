/**
 * Quick Visual Enhancement Test Runner
 * Run this in the browser console on the dashboard page
 */

function runVisualEnhancementTests() {
    console.log('🧪 Starting Visual Enhancement Tests...\n');
    
    const results = {
        passed: 0,
        failed: 0,
        warnings: 0,
        tests: []
    };

    function test(name, condition, expected, actual) {
        const passed = condition;
        results.tests.push({ name, passed, expected, actual });
        if (passed) {
            results.passed++;
            console.log(`✅ ${name}`);
        } else {
            results.failed++;
            console.log(`❌ ${name} - Expected: ${expected}, Got: ${actual}`);
        }
    }

    function warn(name, condition, message) {
        results.tests.push({ name, passed: !condition, expected: message, actual: condition ? 'Warning' : 'OK' });
        if (condition) {
            results.warnings++;
            console.log(`⚠️ ${name} - ${message}`);
        } else {
            results.passed++;
            console.log(`✅ ${name}`);
        }
    }

    // Test 1: ARR Input Field Enhancements
    console.log('\n💰 Testing ARR Input Field Enhancements...');
    
    const arrInput = document.querySelector('#valueThreshold');
    test('ARR input exists', !!arrInput, 'Element should exist', arrInput ? 'Found' : 'Not found');
    
    if (arrInput) {
        const computedStyle = window.getComputedStyle(arrInput);
        test('ARR input height', computedStyle.height === '48px', '48px', computedStyle.height);
        test('ARR input font size', computedStyle.fontSize === '18px', '18px', computedStyle.fontSize);
        test('ARR input font weight', computedStyle.fontWeight === '700', '700', computedStyle.fontWeight);
        test('ARR input padding left', computedStyle.paddingLeft === '32px', '32px', computedStyle.paddingLeft);
    }

    const arrContainer = arrInput?.closest('.bg-gradient-to-r');
    test('ARR gradient container', !!arrContainer, 'Gradient container should exist', arrContainer ? 'Found' : 'Not found');

    const arrLabel = document.querySelector('label[for="valueThreshold"]');
    if (arrLabel) {
        const labelStyle = window.getComputedStyle(arrLabel);
        test('ARR label font size', labelStyle.fontSize === '18px', '18px', labelStyle.fontSize);
        test('ARR label font weight', labelStyle.fontWeight === '600', '600', labelStyle.fontWeight);
    }

    // Test 2: Customer Card Enhancements
    console.log('\n🎴 Testing Customer Card Enhancements...');
    
    const customerCards = document.querySelectorAll('.customer-card');
    test('Customer cards exist', customerCards.length > 0, 'At least one card', `${customerCards.length} cards`);
    
    if (customerCards.length > 0) {
        const firstCard = customerCards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        
        test('Card padding', cardStyle.padding === '24px', '24px', cardStyle.padding);
        test('Card border width', cardStyle.borderWidth === '2px', '2px', cardStyle.borderWidth);
        test('Card border radius', cardStyle.borderRadius === '12px', '12px', cardStyle.borderRadius);
        test('Card gradient background', firstCard.classList.contains('bg-gradient-to-br'), 'Gradient class', 'Present');
    }

    const container = document.querySelector('#customerListContainer');
    if (container) {
        const containerStyle = window.getComputedStyle(container);
        test('Container gap', containerStyle.gap === '24px', '24px', containerStyle.gap);
        test('Container grid display', containerStyle.display === 'grid', 'grid', containerStyle.display);
    }

    const customerNames = document.querySelectorAll('.customer-card h3');
    if (customerNames.length > 0) {
        const nameStyle = window.getComputedStyle(customerNames[0]);
        test('Customer name font size', nameStyle.fontSize === '20px', '20px', nameStyle.fontSize);
        test('Customer name font weight', nameStyle.fontWeight === '700', '700', nameStyle.fontWeight);
    }

    const arrDisplays = document.querySelectorAll('.customer-card .text-2xl');
    if (arrDisplays.length > 0) {
        const arrStyle = window.getComputedStyle(arrDisplays[0]);
        test('ARR display font size', arrStyle.fontSize === '24px', '24px', arrStyle.fontSize);
        test('ARR display font weight', arrStyle.fontWeight === '700', '700', arrStyle.fontWeight);
    }

    // Test 3: Confirmation Message Enhancements
    console.log('\n✅ Testing Confirmation Message Enhancements...');
    
    const confirmation = document.querySelector('#saveConfirmation');
    test('Confirmation element exists', !!confirmation, 'Element should exist', confirmation ? 'Found' : 'Not found');
    
    if (confirmation) {
        const confirmationDiv = confirmation.querySelector('.bg-green-50');
        test('Confirmation green background', !!confirmationDiv, 'Green background should exist', confirmationDiv ? 'Found' : 'Not found');
        
        const icon = confirmation.querySelector('svg');
        test('Confirmation icon', !!icon, 'Icon should exist', icon ? 'Found' : 'Not found');
        
        const title = confirmation.querySelector('.text-lg');
        const subtitle = confirmation.querySelector('.text-sm');
        test('Confirmation two-line message', !!(title && subtitle), 'Title and subtitle should exist', 'Both present');
    }

    const saveButton = document.querySelector('button[onclick*="saveNoteLocally"]');
    if (saveButton) {
        const buttonStyle = window.getComputedStyle(saveButton);
        test('Save button padding', buttonStyle.padding === '24px 24px', '24px padding', buttonStyle.padding);
        test('Save button font weight', buttonStyle.fontWeight === '600', '600', buttonStyle.fontWeight);
        test('Save button gradient', saveButton.classList.contains('bg-gradient-to-r'), 'Gradient class', 'Present');
    }

    // Test 4: Filter Status Enhancements
    console.log('\n📊 Testing Filter Status Enhancements...');
    
    const filterStatus = document.querySelector('#filterStatus');
    test('Filter status exists', !!filterStatus, 'Element should exist', filterStatus ? 'Found' : 'Not found');
    
    if (filterStatus) {
        const statusDiv = filterStatus.querySelector('.bg-orange-200');
        test('Filter status orange background', !!statusDiv, 'Orange background should exist', statusDiv ? 'Found' : 'Not found');
        
        const icon = filterStatus.querySelector('svg');
        test('Filter status icon', !!icon, 'Icon should exist', icon ? 'Found' : 'Not found');
    }

    // Test 5: Responsive Design
    console.log('\n📱 Testing Responsive Design...');
    
    const arrContainerFlex = arrInput?.closest('.flex');
    if (arrContainerFlex) {
        const hasResponsiveClasses = arrContainerFlex.classList.contains('flex-col') && 
                                   arrContainerFlex.classList.contains('sm:flex-row');
        test('ARR responsive classes', hasResponsiveClasses, 'Responsive classes should exist', 'Present');
    }

    // Test 6: Hover Effects
    console.log('\n🔄 Testing Hover Effects...');
    
    if (customerCards.length > 0) {
        const firstCard = customerCards[0];
        const hasHoverClasses = firstCard.classList.contains('hover:scale-105') && 
                              firstCard.classList.contains('hover:shadow-2xl');
        test('Customer card hover effects', hasHoverClasses, 'Hover classes should exist', 'Present');
    }

    // Test 7: Accessibility
    console.log('\n♿ Testing Accessibility...');
    
    if (arrInput) {
        test('ARR input has label', !!arrLabel, 'Label should exist', arrLabel ? 'Found' : 'Not found');
        test('ARR input has min attribute', arrInput.hasAttribute('min'), 'Min attribute', 'Present');
        test('ARR input has step attribute', arrInput.hasAttribute('step'), 'Step attribute', 'Present');
    }

    if (customerCards.length > 0) {
        const firstCard = customerCards[0];
        test('Customer card clickable', firstCard.hasAttribute('onclick'), 'Click handler', 'Present');
        test('Customer card pointer cursor', firstCard.classList.contains('cursor-pointer'), 'Pointer cursor', 'Present');
    }

    // Test 8: Visual Hierarchy
    console.log('\n🎨 Testing Visual Hierarchy...');
    
    if (arrContainer) {
        const hasOrangeTheme = arrContainer.classList.contains('from-orange-50') && 
                             arrContainer.classList.contains('to-orange-100');
        test('ARR orange theme', hasOrangeTheme, 'Orange theme should exist', 'Present');
    }

    const priorityIndicators = document.querySelectorAll('.customer-card .w-3.h-3');
    test('Priority indicators', priorityIndicators.length > 0, 'At least one indicator', `${priorityIndicators.length} indicators`);

    const riskScores = document.querySelectorAll('.customer-card [class*="bg-red-100"], .customer-card [class*="bg-orange-100"], .customer-card [class*="bg-green-100"]');
    test('Color coded risk scores', riskScores.length > 0, 'At least one color coded score', `${riskScores.length} scores`);

    // Performance Test
    console.log('\n⚡ Testing Performance...');
    
    const startTime = performance.now();
    for (let i = 0; i < 100; i++) {
        document.querySelectorAll('.customer-card');
    }
    const endTime = performance.now();
    const performanceTime = endTime - startTime;
    
    warn('Performance test', performanceTime > 10, `Performance may be slow: ${performanceTime.toFixed(2)}ms`);

    // Summary
    console.log('\n📊 Test Summary:');
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⚠️ Warnings: ${results.warnings}`);
    console.log(`📈 Total: ${results.passed + results.failed + results.warnings}`);
    console.log(`🎯 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
    
    if (results.failed > 0) {
        console.log('\n❌ Failed Tests:');
        results.tests.filter(t => !t.passed).forEach(test => {
            console.log(`   - ${test.name}: ${test.expected} vs ${test.actual}`);
        });
    }

    return results;
}

// Auto-run tests
console.log('🚀 Visual Enhancement Test Runner Loaded');
console.log('Run: runVisualEnhancementTests()');
console.log('Or click the test button in the interface');

// Export for use
window.runVisualEnhancementTests = runVisualEnhancementTests;
