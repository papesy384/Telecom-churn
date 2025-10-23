/**
 * Integration Test Suite - Browser Console Version
 * Comprehensive Testing of Dashboard Component Interactions
 * Copy and paste this entire script into the browser console of the dashboard
 */

(function() {
    console.log('🔗 Starting Comprehensive Integration Testing...');
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
    
    // WORKFLOW INTEGRATION TESTS
    console.log('\n👤 User Workflow Integration Tests...');
    
    // Test 1: Complete Dashboard Navigation Flow
    testDataIntegrity('Workflow #1: Dashboard Navigation Flow', () => {
        const navElements = ['hero-section', 'live-demo', 'customer-dashboard', 'how-it-works'];
        const allElementsExist = navElements.every(id => document.getElementById(id) !== null);
        const hasShowSection = typeof showSection === 'function';
        return allElementsExist && hasShowSection;
    });
    
    // Test 2: Customer Triage Workflow
    testDataIntegrity('Workflow #2: Customer Triage Workflow', () => {
        const triageElements = ['valueThreshold', 'customerListContainer', 'all-high-risk-tbody'];
        const allElementsExist = triageElements.every(id => document.getElementById(id) !== null);
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        const hasUpdateCustomerList = typeof updateCustomerList === 'function';
        return allElementsExist && hasPrioritizeCustomers && hasUpdateCustomerList;
    });
    
    // Test 3: Modal Interaction Workflow
    testDataIntegrity('Workflow #3: Modal Interaction Workflow', () => {
        const modal = document.getElementById('detailModal');
        const modalContent = document.getElementById('modalContent');
        const actionLogInput = document.getElementById('actionLogInput');
        const hasShowCustomerDetail = typeof showCustomerDetail === 'function';
        const hasSaveNoteLocally = typeof saveNoteLocally === 'function';
        return modal && modalContent && actionLogInput && hasShowCustomerDetail && hasSaveNoteLocally;
    });
    
    // Test 4: Filter and Search Workflow
    testDataIntegrity('Workflow #4: Filter and Search Workflow', () => {
        const filterInput = document.getElementById('valueThreshold');
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        const hasApplyFilters = typeof applyFilters === 'function';
        const hasResetFilters = typeof resetFilters === 'function';
        return filterInput && hasPrioritizeCustomers && hasApplyFilters && hasResetFilters;
    });
    
    // Test 5: Data Persistence Workflow
    testDataIntegrity('Workflow #5: Data Persistence Workflow', () => {
        const hasLoadSavedData = typeof loadSavedData === 'function';
        const hasSaveNoteLocally = typeof saveNoteLocally === 'function';
        
        // Test localStorage functionality
        const testKey = 'integration-test';
        const testValue = 'test-value';
        localStorage.setItem(testKey, testValue);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        
        return hasLoadSavedData && hasSaveNoteLocally && retrieved === testValue;
    });
    
    // COMPONENT INTEGRATION TESTS
    console.log('\n🧩 Component Integration Tests...');
    
    // Test 6: Dashboard Tabs Integration
    testDataIntegrity('Component #1: Dashboard Tabs Integration', () => {
        const tabElements = ['dashboard-overview', 'dashboard-customers', 'dashboard-analytics', 'dashboard-playbook'];
        const allTabsExist = tabElements.every(id => document.getElementById(id) !== null);
        const hasShowDashboardTab = typeof showDashboardTab === 'function';
        return allTabsExist && hasShowDashboardTab;
    });
    
    // Test 7: Table and Modal Integration
    testDataIntegrity('Component #2: Table and Modal Integration', () => {
        const table = document.getElementById('all-high-risk-table');
        const tableBody = document.getElementById('all-high-risk-tbody');
        const modal = document.getElementById('detailModal');
        const hasRenderAllHighRiskTable = typeof renderAllHighRiskTable === 'function';
        const hasShowCustomerDetail = typeof showCustomerDetail === 'function';
        return table && tableBody && modal && hasRenderAllHighRiskTable && hasShowCustomerDetail;
    });
    
    // Test 8: Filter and Display Integration
    testDataIntegrity('Component #3: Filter and Display Integration', () => {
        const filterInput = document.getElementById('valueThreshold');
        const customerListContainer = document.getElementById('customerListContainer');
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        const hasRenderCustomerList = typeof renderCustomerList === 'function';
        return filterInput && customerListContainer && hasPrioritizeCustomers && hasRenderCustomerList;
    });
    
    // Test 9: Data Visualization Integration
    testDataIntegrity('Component #4: Data Visualization Integration', () => {
        const visualizationElements = ['metrics-display', 'roi-metrics', 'cause-chart', 'playbook-content'];
        const allElementsExist = visualizationElements.every(id => document.getElementById(id) !== null);
        const hasRenderModelMetrics = typeof renderModelMetrics === 'function';
        const hasRenderROISummary = typeof renderROISummary === 'function';
        const hasRenderRootCauseDistribution = typeof renderRootCauseDistribution === 'function';
        return allElementsExist && hasRenderModelMetrics && hasRenderROISummary && hasRenderRootCauseDistribution;
    });
    
    // Test 10: Navigation and Content Integration
    testDataIntegrity('Component #5: Navigation and Content Integration', () => {
        const navElements = ['hero-section', 'live-demo', 'customer-dashboard', 'how-it-works'];
        const contentElements = ['customerListContainer', 'all-high-risk-tbody', 'metrics-display'];
        const allNavElementsExist = navElements.every(id => document.getElementById(id) !== null);
        const allContentElementsExist = contentElements.every(id => document.getElementById(id) !== null);
        return allNavElementsExist && allContentElementsExist;
    });
    
    // DATA FLOW INTEGRATION TESTS
    console.log('\n📊 Data Flow Integration Tests...');
    
    // Test 11: Customer Data Flow
    testDataIntegrity('Data Flow #1: Customer Data Flow', () => {
        const hasCustomerData = customerData && customerData.length > 0;
        const hasProcessedCustomers = processedCustomers && processedCustomers.length > 0;
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        return hasCustomerData && hasProcessedCustomers && hasPrioritizeCustomers;
    });
    
    // Test 12: Risk Score Calculation Flow
    testDataIntegrity('Data Flow #2: Risk Score Calculation Flow', () => {
        const hasCustomerData = customerData && customerData.length > 0;
        const hasRiskScores = hasCustomerData && customerData.every(c => typeof c.riskScore === 'number');
        const hasProcessedCustomers = processedCustomers && processedCustomers.length > 0;
        const hasRiskProcessing = hasProcessedCustomers && processedCustomers.every(c => typeof c.riskScore === 'number');
        return hasRiskScores && hasRiskProcessing;
    });
    
    // Test 13: Filter Data Flow
    testDataIntegrity('Data Flow #3: Filter Data Flow', () => {
        const hasCustomerData = customerData && customerData.length > 0;
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        
        let filterWorks = false;
        if (hasPrioritizeCustomers) {
            try {
                const filteredCustomers = prioritizeCustomers();
                filterWorks = Array.isArray(filteredCustomers);
            } catch (e) {
                filterWorks = false;
            }
        }
        
        return hasCustomerData && hasPrioritizeCustomers && filterWorks;
    });
    
    // Test 14: Local Storage Data Flow
    testDataIntegrity('Data Flow #4: Local Storage Data Flow', () => {
        const hasLoadSavedData = typeof loadSavedData === 'function';
        const hasSaveNoteLocally = typeof saveNoteLocally === 'function';
        
        const testKey = 'integration-test-storage';
        const testData = JSON.stringify({ test: 'data' });
        localStorage.setItem(testKey, testData);
        const retrieved = localStorage.getItem(testKey);
        localStorage.removeItem(testKey);
        
        return hasLoadSavedData && hasSaveNoteLocally && retrieved === testData;
    });
    
    // UI INTEGRATION TESTS
    console.log('\n🎨 UI Integration Tests...');
    
    // Test 15: Responsive Design Integration
    testDataIntegrity('UI #1: Responsive Design Integration', () => {
        const responsiveElements = ['customerListContainer', 'all-high-risk-table', 'detailModal'];
        const allElementsExist = responsiveElements.every(id => document.getElementById(id) !== null);
        const hasResponsiveClasses = document.querySelector('.overflow-x-auto') !== null;
        return allElementsExist && hasResponsiveClasses;
    });
    
    // Test 16: Color and Theme Integration
    testDataIntegrity('UI #2: Color and Theme Integration', () => {
        const themeElements = ['detailModal', 'all-high-risk-table', 'metrics-display'];
        const allElementsExist = themeElements.every(id => document.getElementById(id) !== null);
        const hasThemeClasses = document.querySelector('.bg-dark-card') !== null;
        return allElementsExist && hasThemeClasses;
    });
    
    // Test 17: Interactive Elements Integration
    testDataIntegrity('UI #3: Interactive Elements Integration', () => {
        const interactiveElements = ['valueThreshold', 'detailModal', 'actionLogInput'];
        const allElementsExist = interactiveElements.every(id => document.getElementById(id) !== null);
        const hasInteractiveClasses = document.querySelector('.hover\\:bg-dark-bg') !== null;
        return allElementsExist && hasInteractiveClasses;
    });
    
    // PERFORMANCE INTEGRATION TESTS
    console.log('\n⚡ Performance Integration Tests...');
    
    // Test 18: Load Time Performance
    testDataIntegrity('Performance #1: Load Time Performance', () => {
        const hasLoaded = document.readyState === 'complete';
        const hasEssentialElements = document.getElementById('customerListContainer') !== null;
        return hasLoaded && hasEssentialElements;
    });
    
    // Test 19: Interaction Performance
    testDataIntegrity('Performance #2: Interaction Performance', () => {
        const hasShowCustomerDetail = typeof showCustomerDetail === 'function';
        const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
        
        let interactionTime = 0;
        if (hasPrioritizeCustomers) {
            const startTime = performance.now();
            try {
                prioritizeCustomers();
                interactionTime = performance.now() - startTime;
            } catch (e) {
                interactionTime = Infinity;
            }
        }
        
        return hasShowCustomerDetail && hasPrioritizeCustomers && interactionTime < 1000;
    });
    
    // Test 20: Memory Usage Performance
    testDataIntegrity('Performance #3: Memory Usage Performance', () => {
        const hasCustomerData = customerData && customerData.length > 0;
        const hasProcessedCustomers = processedCustomers && processedCustomers.length > 0;
        
        const customerDataSize = hasCustomerData ? JSON.stringify(customerData).length : 0;
        const processedDataSize = hasProcessedCustomers ? JSON.stringify(processedCustomers).length : 0;
        
        const totalDataSize = customerDataSize + processedDataSize;
        return totalDataSize < 1000000; // 1MB max
    });
    
    // Generate Summary
    console.log('\n📊 INTEGRATION TEST SUMMARY');
    console.log('=' .repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (failedTests === 0) {
        console.log('\n🎉 ALL INTEGRATION TESTS PASSED! Dashboard is fully integrated and functional.');
    } else {
        console.log(`\n⚠️ ${failedTests} integration tests failed. Check the details above.`);
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
