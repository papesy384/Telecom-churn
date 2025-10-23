/**
 * Quick Diagnostic Script for Failed Tests
 * Run this in the browser console to identify issues
 */

function runQuickDiagnostic() {
    console.log('🔍 Running Quick Diagnostic...');
    console.log('=' .repeat(50));
    
    const results = {
        elements: {},
        functions: {},
        data: {},
        errors: []
    };
    
    // Check critical elements
    const criticalElements = ['metrics-display', 'playbook-content', 'valueThreshold', 'detailModal'];
    criticalElements.forEach(id => {
        const element = document.getElementById(id);
        results.elements[id] = {
            exists: element !== null,
            element: element
        };
        console.log(`${element ? '✅' : '❌'} Element '${id}': ${element ? 'EXISTS' : 'MISSING'}`);
    });
    
    // Check critical functions
    const criticalFunctions = ['loadSavedData', 'saveNoteLocally', 'prioritizeCustomers', 'showCustomerDetail', 'closeDetailModal'];
    criticalFunctions.forEach(funcName => {
        const func = window[funcName];
        results.functions[funcName] = {
            exists: typeof func === 'function',
            function: func
        };
        console.log(`${typeof func === 'function' ? '✅' : '❌'} Function '${funcName}': ${typeof func === 'function' ? 'EXISTS' : 'MISSING'}`);
    });
    
    // Check data
    results.data.customerData = {
        exists: typeof customerData !== 'undefined',
        isArray: Array.isArray(customerData),
        length: customerData ? customerData.length : 0
    };
    console.log(`${typeof customerData !== 'undefined' ? '✅' : '❌'} customerData: ${typeof customerData !== 'undefined' ? `EXISTS (${customerData.length} items)` : 'MISSING'}`);
    
    // Check localStorage
    try {
        const testKey = 'test-diagnostic';
        localStorage.setItem(testKey, 'test');
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        results.data.localStorage = {
            works: retrieved === 'test'
        };
        console.log(`${retrieved === 'test' ? '✅' : '❌'} localStorage: ${retrieved === 'test' ? 'WORKS' : 'BROKEN'}`);
    } catch (error) {
        results.data.localStorage = { works: false, error: error.message };
        console.log(`❌ localStorage: ERROR - ${error.message}`);
    }
    
    // Test specific bug fixes
    console.log('\n🧪 Testing Specific Bug Fixes...');
    
    // Bug #3: localStorage load function
    if (typeof loadSavedData === 'function') {
        try {
            loadSavedData();
            console.log('✅ Bug #3: loadSavedData function works');
        } catch (error) {
            console.log(`❌ Bug #3: loadSavedData error - ${error.message}`);
            results.errors.push(`Bug #3: ${error.message}`);
        }
    }
    
    // Bug #4: Error handling for valueThreshold
    if (typeof prioritizeCustomers === 'function') {
        try {
            const result = prioritizeCustomers();
            console.log(`✅ Bug #4: prioritizeCustomers works (returned ${Array.isArray(result) ? result.length : 'non-array'} items)`);
        } catch (error) {
            console.log(`❌ Bug #4: prioritizeCustomers error - ${error.message}`);
            results.errors.push(`Bug #4: ${error.message}`);
        }
    }
    
    // Bug #6: Modal functions
    if (typeof showCustomerDetail === 'function' && typeof closeDetailModal === 'function') {
        console.log('✅ Bug #6: Modal functions exist');
    } else {
        console.log('❌ Bug #6: Modal functions missing');
        results.errors.push('Bug #6: Modal functions missing');
    }
    
    // Bug #7: Data validation
    if (typeof saveNoteLocally === 'function') {
        const code = saveNoteLocally.toString();
        const hasValidation = code.includes('customerId < 1') || code.includes('customerId > 15');
        console.log(`${hasValidation ? '✅' : '❌'} Bug #7: Data validation ${hasValidation ? 'PRESENT' : 'MISSING'}`);
        if (!hasValidation) {
            results.errors.push('Bug #7: Data validation missing');
        }
    }
    
    // Summary
    console.log('\n📊 Diagnostic Summary:');
    const elementIssues = Object.values(results.elements).filter(e => !e.exists).length;
    const functionIssues = Object.values(results.functions).filter(f => !f.exists).length;
    const dataIssues = !results.data.customerData.exists || !results.data.localStorage.works;
    
    console.log(`Elements missing: ${elementIssues}`);
    console.log(`Functions missing: ${functionIssues}`);
    console.log(`Data issues: ${dataIssues ? 'YES' : 'NO'}`);
    console.log(`Errors found: ${results.errors.length}`);
    
    if (results.errors.length > 0) {
        console.log('\n❌ Errors found:');
        results.errors.forEach(error => console.log(`   - ${error}`));
    }
    
    return results;
}

// Auto-run diagnostic
console.log('🔍 Quick Diagnostic Script loaded');
console.log('Run: runQuickDiagnostic()');
console.log('Or just run the diagnostic automatically...');

// Auto-run
runQuickDiagnostic();
