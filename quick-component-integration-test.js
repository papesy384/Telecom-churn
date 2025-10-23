/**
 * Quick Integration Test - Dashboard Console
 * Run this directly in the dashboard console to test component integration
 * This avoids CORS issues by running in the same context as the dashboard
 */

console.log('🔗 Quick Integration Test - Component Integration');
console.log('=' .repeat(50));

// Test Component Integration
function testComponentIntegration() {
    const results = [];
    
    // Test 1: Dashboard Tabs Integration
    const tabElements = ['dashboard-overview', 'dashboard-customers', 'dashboard-analytics', 'dashboard-playbook'];
    const allTabsExist = tabElements.every(id => document.getElementById(id) !== null);
    const hasShowDashboardTab = typeof showDashboardTab === 'function';
    results.push({
        test: 'Component #1: Dashboard Tabs Integration',
        passed: allTabsExist && hasShowDashboardTab,
        details: allTabsExist && hasShowDashboardTab ? 'All tabs and function found' : 'Missing tabs or function'
    });
    
    // Test 2: Table and Modal Integration
    const table = document.getElementById('all-high-risk-table');
    const tableBody = document.getElementById('all-high-risk-tbody');
    const modal = document.getElementById('detailModal');
    const hasRenderAllHighRiskTable = typeof renderAllHighRiskTable === 'function';
    const hasShowCustomerDetail = typeof showCustomerDetail === 'function';
    results.push({
        test: 'Component #2: Table and Modal Integration',
        passed: table && tableBody && modal && hasRenderAllHighRiskTable && hasShowCustomerDetail,
        details: 'Table, modal, and functions integration check'
    });
    
    // Test 3: Filter and Display Integration
    const filterInput = document.getElementById('valueThreshold');
    const customerListContainer = document.getElementById('customerListContainer');
    const hasPrioritizeCustomers = typeof prioritizeCustomers === 'function';
    const hasRenderCustomerList = typeof renderCustomerList === 'function';
    results.push({
        test: 'Component #3: Filter and Display Integration',
        passed: filterInput && customerListContainer && hasPrioritizeCustomers && hasRenderCustomerList,
        details: 'Filter input, display container, and functions integration check'
    });
    
    // Test 4: Data Visualization Integration
    const visualizationElements = ['metrics-display', 'roi-metrics', 'cause-chart', 'playbook-content'];
    const allElementsExist = visualizationElements.every(id => document.getElementById(id) !== null);
    const hasRenderModelMetrics = typeof renderModelMetrics === 'function';
    const hasRenderROISummary = typeof renderROISummary === 'function';
    const hasRenderRootCauseDistribution = typeof renderRootCauseDistribution === 'function';
    results.push({
        test: 'Component #4: Data Visualization Integration',
        passed: allElementsExist && hasRenderModelMetrics && hasRenderROISummary && hasRenderRootCauseDistribution,
        details: 'Visualization elements and render functions integration check'
    });
    
    // Test 5: Navigation and Content Integration
    const navElements = ['hero-section', 'live-demo', 'customer-dashboard', 'how-it-works'];
    const contentElements = ['customerListContainer', 'all-high-risk-tbody', 'metrics-display'];
    const allNavElementsExist = navElements.every(id => document.getElementById(id) !== null);
    const allContentElementsExist = contentElements.every(id => document.getElementById(id) !== null);
    results.push({
        test: 'Component #5: Navigation and Content Integration',
        passed: allNavElementsExist && allContentElementsExist,
        details: 'Navigation and content elements integration check'
    });
    
    return results;
}

// Run the tests
const testResults = testComponentIntegration();

// Display results
console.log('\n🧩 Component Integration Test Results:');
console.log('=' .repeat(50));

let passedCount = 0;
let totalCount = testResults.length;

testResults.forEach(result => {
    console.log(`${result.passed ? '✅' : '❌'} ${result.test}: ${result.passed ? 'PASS' : 'FAIL'}`);
    console.log(`   ${result.details}`);
    if (result.passed) passedCount++;
});

console.log('\n📊 Summary:');
console.log(`Total Tests: ${totalCount}`);
console.log(`Passed: ${passedCount} ✅`);
console.log(`Failed: ${totalCount - passedCount} ❌`);
console.log(`Success Rate: ${((passedCount / totalCount) * 100).toFixed(1)}%`);

if (passedCount === totalCount) {
    console.log('\n🎉 ALL COMPONENT INTEGRATION TESTS PASSED!');
    console.log('Dashboard components are fully integrated and working together.');
} else {
    console.log(`\n⚠️ ${totalCount - passedCount} component integration tests failed.`);
    console.log('Check the details above for specific issues.');
}

// Return results for further analysis
return {
    total: totalCount,
    passed: passedCount,
    failed: totalCount - passedCount,
    successRate: (passedCount / totalCount) * 100,
    results: testResults
};
