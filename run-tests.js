/**
 * Automated Test Execution Script
 * Runs the Math Helper Test Suite and generates results
 */

// Load the test suite
const testSuite = new MathHelperTestSuite();

// Run all tests
async function runAutomatedTests() {
    console.log('🚀 Starting Automated Unit Testing with Math Helper...');
    console.log('=' .repeat(60));
    
    try {
        await testSuite.runAllTests();
        
        // Display summary
        console.log('\n📊 TEST EXECUTION SUMMARY');
        console.log('=' .repeat(60));
        console.log(`Total Tests: ${testSuite.totalTests}`);
        console.log(`Passed: ${testSuite.passedTests} ✅`);
        console.log(`Failed: ${testSuite.failedTests} ❌`);
        console.log(`Success Rate: ${((testSuite.passedTests / testSuite.totalTests) * 100).toFixed(1)}%`);
        
        if (testSuite.failedTests === 0) {
            console.log('\n🎉 ALL TESTS PASSED! Application is fully functional.');
        } else {
            console.log(`\n⚠️ ${testSuite.failedTests} tests failed. Check the details above.`);
        }
        
        return {
            total: testSuite.totalTests,
            passed: testSuite.passedTests,
            failed: testSuite.failedTests,
            successRate: (testSuite.passedTests / testSuite.totalTests) * 100,
            results: testSuite.testResults
        };
        
    } catch (error) {
        console.error('❌ Test execution failed:', error);
        return {
            error: error.message,
            total: testSuite.totalTests,
            passed: testSuite.passedTests,
            failed: testSuite.failedTests
        };
    }
}

// Export for use in browser console or other scripts
if (typeof window !== 'undefined') {
    window.runAutomatedTests = runAutomatedTests;
    window.testSuite = testSuite;
}

// Auto-run if in browser
if (typeof window !== 'undefined' && window.location.pathname.includes('test-runner.html')) {
    console.log('🧪 Test Runner detected. Ready to run tests.');
    console.log('Click "Run All Tests" button or run: runAutomatedTests()');
}
