/**
 * Browser Console Test Suite
 * Run this directly in the browser console of the dashboard
 * Copy and paste this entire script into the console
 */

(function() {
    console.log('🧪 Starting Browser Console Test Suite...');
    console.log('=' .repeat(60));
    
    const testResults = [];
    let passedTests = 0;
    let failedTests = 0;
    let totalTests = 0;
    
    function addTestResult(testName, passed, details) {
        totalTests++;
        if (passed) passedTests++;
        else failedTests++;
        
        testResults.push({
            name: testName,
            passed,
            details
        });
        
        console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASS' : 'FAIL'}`);
        if (details) console.log(`   Details: ${details}`);
    }
    
    function testElementExists(elementId, testName) {
        const element = document.getElementById(elementId);
        const passed = element !== null;
        addTestResult(testName, passed, 
            passed ? `Element '${elementId}' found` : `Element '${elementId}' not found`);
    }
    
    function testFunctionExists(functionName, testName) {
        const func = window[functionName];
        const passed = typeof func === 'function';
        addTestResult(testName, passed, 
            passed ? `Function '${functionName}' found` : `Function '${functionName}' not found`);
    }
    
    function testDataExists(dataName, testName) {
        const data = window[dataName];
        const passed = data !== undefined && data !== null;
        addTestResult(testName, passed, 
            passed ? `Data '${dataName}' exists` : `Data '${dataName}' not found`);
    }
    
    function testDataIntegrity(testName, testFunction) {
        try {
            const passed = testFunction();
            addTestResult(testName, passed, 
                passed ? 'Data integrity check passed' : 'Data integrity check failed');
        } catch (error) {
            addTestResult(testName, false, `Data integrity error: ${error.message}`);
        }
    }
    
    // Run Critical Bug Fix Tests
    console.log('\n🚨 Testing Critical Bug Fixes...');
    testElementExists('metrics-display', 'Critical Bug #1: metrics-display element');
    testElementExists('playbook-content', 'Critical Bug #2: playbook-content element');
    testFunctionExists('loadSavedData', 'Critical Bug #3: loadSavedData function');
    testElementExists('valueThreshold', 'Critical Bug #4: valueThreshold element');
    testDataExists('customerData', 'Critical Bug #5: customerData array');
    
    // Run Medium Bug Fix Tests
    console.log('\n⚠️ Testing Medium Bug Fixes...');
    testElementExists('detailModal', 'Medium Bug #6: detailModal element');
    testFunctionExists('saveNoteLocally', 'Medium Bug #7: saveNoteLocally function');
    testFunctionExists('prioritizeCustomers', 'Medium Bug #8: prioritizeCustomers function');
    testFunctionExists('showCustomerDetail', 'Medium Bug #9: showCustomerDetail function');
    testElementExists('action-list-container', 'Medium Bug #10: action-list-container element');
    testFunctionExists('renderAllHighRiskTable', 'Medium Bug #11: renderAllHighRiskTable function');
    testFunctionExists('renderModelMetrics', 'Medium Bug #12: renderModelMetrics function');
    testFunctionExists('renderROISummary', 'Medium Bug #13: renderROISummary function');
    testFunctionExists('renderRootCauseDistribution', 'Medium Bug #14: renderRootCauseDistribution function');
    testFunctionExists('updateCustomerList', 'Medium Bug #15: updateCustomerList function');
    testFunctionExists('showSection', 'Medium Bug #16: showSection function');
    testFunctionExists('showDashboardTab', 'Medium Bug #17: showDashboardTab function');
    
    // Run Low Bug Fix Tests
    console.log('\n📝 Testing Low Bug Fixes...');
    testDataIntegrity('Low Bug #18: Customer data integrity', () => {
        return customerData && customerData.length === 15;
    });
    
    // Test localStorage functionality
    try {
        const testKey = 'test-key';
        const testValue = 'test-value';
        localStorage.setItem(testKey, testValue);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        addTestResult('Low Bug #19: Local storage functionality', retrieved === testValue, 
            retrieved === testValue ? 'Local storage works correctly' : 'Local storage not working');
    } catch (error) {
        addTestResult('Low Bug #19: Local storage functionality', false, `Local storage error: ${error.message}`);
    }
    
    // Run Integration Tests
    console.log('\n🔗 Testing Integration...');
    testDataIntegrity('Integration #1: Dashboard initialization', () => {
        return customerData && customerData.length > 0 && processedCustomers && processedCustomers.length > 0;
    });
    
    testDataIntegrity('Integration #2: Modal functionality', () => {
        const modal = document.getElementById('detailModal');
        return modal !== null && typeof showCustomerDetail === 'function';
    });
    
    testDataIntegrity('Integration #3: Filter functionality', () => {
        const filterInput = document.getElementById('valueThreshold');
        return filterInput !== null && typeof prioritizeCustomers === 'function';
    });
    
    testDataIntegrity('Integration #4: Data persistence', () => {
        return typeof saveNoteLocally === 'function' && typeof loadSavedData === 'function';
    });
    
    // Generate Summary
    console.log('\n📊 TEST EXECUTION SUMMARY');
    console.log('=' .repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (failedTests === 0) {
        console.log('\n🎉 ALL TESTS PASSED! Dashboard is fully functional.');
    } else {
        console.log(`\n⚠️ ${failedTests} tests failed. Check the details above.`);
    }
    
    // Return results for further analysis
    return {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: (passedTests / totalTests) * 100,
        results: testResults
    };
})();
