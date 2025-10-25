/**
 * Automated Test Runner for Telecom Churn Prediction Dashboard
 * Provides automated execution, reporting, and CI/CD integration
 */

class AutomatedTestRunner {
    constructor() {
        this.testSuites = [];
        this.results = [];
        this.config = {
            timeout: 30000, // 30 seconds per test
            retries: 2,
            parallel: false,
            verbose: true,
            generateReport: true,
            reportFormat: 'json'
        };
    }

    // Load all test suites
    async loadTestSuites() {
        console.log('🔄 Loading test suites...');
        
        try {
            // Load test framework
            await this.loadScript('test-framework.js');
            
            // Load unit tests
            await this.loadScript('unit-tests.js');
            
            // Load integration tests
            await this.loadScript('integration-tests.js');
            
            // Load E2E tests
            await this.loadScript('e2e-tests.js');
            
            console.log('✅ All test suites loaded successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to load test suites:', error);
            return false;
        }
    }

    // Load script dynamically
    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // Run all tests
    async runAllTests() {
        console.log('🚀 Starting Automated Test Suite');
        console.log('='.repeat(60));
        
        const startTime = Date.now();
        
        if (!await this.loadTestSuites()) {
            return { success: false, error: 'Failed to load test suites' };
        }

        try {
            const results = await testFramework.runTests();
            const endTime = Date.now();
            
            const summary = {
                success: results.failed === 0,
                totalTests: results.total,
                passed: results.passed,
                failed: results.failed,
                duration: endTime - startTime,
                successRate: results.successRate,
                timestamp: new Date().toISOString(),
                results: results.results
            };

            if (this.config.generateReport) {
                this.generateTestReport(summary);
            }

            return summary;
        } catch (error) {
            console.error('❌ Test execution failed:', error);
            return { success: false, error: error.message };
        }
    }

    // Run specific test suite
    async runTestSuite(suiteName) {
        console.log(`🧪 Running test suite: ${suiteName}`);
        
        const startTime = Date.now();
        
        try {
            // Filter tests by suite name
            const originalTests = testFramework.tests;
            testFramework.tests = testFramework.tests.filter(test => 
                test.suite.toLowerCase().includes(suiteName.toLowerCase())
            );
            
            const results = await testFramework.runTests();
            
            // Restore original tests
            testFramework.tests = originalTests;
            
            const endTime = Date.now();
            
            return {
                suiteName,
                success: results.failed === 0,
                totalTests: results.total,
                passed: results.passed,
                failed: results.failed,
                duration: endTime - startTime,
                successRate: results.successRate
            };
        } catch (error) {
            console.error(`❌ Test suite ${suiteName} failed:`, error);
            return { success: false, error: error.message };
        }
    }

    // Generate comprehensive test report
    generateTestReport(summary) {
        const report = {
            project: 'Telecom Churn Prediction Dashboard',
            version: '1.0.0',
            timestamp: summary.timestamp,
            summary: {
                totalTests: summary.totalTests,
                passed: summary.passed,
                failed: summary.failed,
                successRate: summary.successRate,
                duration: summary.duration
            },
            testSuites: this.groupTestsBySuite(summary.results),
            failures: summary.results.filter(r => !r.passed),
            environment: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine
            },
            performance: {
                memoryUsage: performance.memory ? {
                    usedJSHeapSize: performance.memory.usedJSHeapSize,
                    totalJSHeapSize: performance.memory.totalJSHeapSize,
                    jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
                } : null,
                timing: performance.timing ? {
                    loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
                    domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart
                } : null
            }
        };

        // Save report
        this.saveReport(report, 'comprehensive-test-report.json');
        
        // Display summary
        this.displayReportSummary(report);
        
        return report;
    }

    // Group tests by suite
    groupTestsBySuite(results) {
        const suites = {};
        
        results.forEach(result => {
            if (!suites[result.suite]) {
                suites[result.suite] = {
                    name: result.suite,
                    tests: [],
                    passed: 0,
                    failed: 0,
                    total: 0
                };
            }
            
            suites[result.suite].tests.push(result);
            suites[result.suite].total++;
            
            if (result.passed) {
                suites[result.suite].passed++;
            } else {
                suites[result.suite].failed++;
            }
        });
        
        return suites;
    }

    // Save report to file
    saveReport(report, filename) {
        const reportJson = JSON.stringify(report, null, 2);
        
        // Create downloadable file
        const blob = new Blob([reportJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`📄 Test report saved as ${filename}`);
    }

    // Display report summary
    displayReportSummary(report) {
        console.log('\n' + '='.repeat(60));
        console.log('📊 COMPREHENSIVE TEST REPORT');
        console.log('='.repeat(60));
        console.log(`Project: ${report.project}`);
        console.log(`Version: ${report.version}`);
        console.log(`Timestamp: ${report.timestamp}`);
        console.log(`Total Tests: ${report.summary.totalTests}`);
        console.log(`✅ Passed: ${report.summary.passed}`);
        console.log(`❌ Failed: ${report.summary.failed}`);
        console.log(`📈 Success Rate: ${report.summary.successRate.toFixed(1)}%`);
        console.log(`⏱️  Duration: ${report.summary.duration}ms`);
        
        console.log('\n📋 Test Suites:');
        Object.values(report.testSuites).forEach(suite => {
            console.log(`  ${suite.name}: ${suite.passed}/${suite.total} passed`);
        });
        
        if (report.failures.length > 0) {
            console.log('\n❌ Failures:');
            report.failures.forEach(failure => {
                console.log(`  - ${failure.name}: ${failure.message}`);
            });
        }
        
        console.log('\n🌍 Environment:');
        console.log(`  Platform: ${report.environment.platform}`);
        console.log(`  Language: ${report.environment.language}`);
        console.log(`  Online: ${report.environment.onLine}`);
        
        if (report.performance.memoryUsage) {
            console.log('\n⚡ Performance:');
            console.log(`  Memory Used: ${(report.performance.memoryUsage.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  Memory Total: ${(report.performance.memoryUsage.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
        }
    }

    // Run tests with specific configuration
    async runWithConfig(config) {
        this.config = { ...this.config, ...config };
        return await this.runAllTests();
    }

    // Run tests in CI/CD mode
    async runCIMode() {
        console.log('🏗️ Running in CI/CD mode...');
        
        const config = {
            timeout: 60000, // 1 minute timeout for CI
            retries: 1,
            parallel: false,
            verbose: false,
            generateReport: true,
            reportFormat: 'json'
        };
        
        const results = await this.runWithConfig(config);
        
        // Exit with appropriate code
        if (results.success) {
            console.log('✅ All tests passed - CI/CD pipeline can continue');
            return 0;
        } else {
            console.log('❌ Tests failed - CI/CD pipeline should stop');
            return 1;
        }
    }

    // Run performance tests
    async runPerformanceTests() {
        console.log('⚡ Running performance tests...');
        
        const performanceTests = [
            {
                name: 'Dashboard Load Time',
                test: () => {
                    const start = performance.now();
                    updateCustomerList();
                    const end = performance.now();
                    return end - start;
                },
                threshold: 500 // ms
            },
            {
                name: 'Large Dataset Rendering',
                test: () => {
                    const start = performance.now();
                    const largeDataset = Array.from({ length: 100 }, (_, i) => ({
                        ...customerData[i % customerData.length],
                        Customer_ID: `C${i + 3000}`,
                        Customer_Name: `Perf Test ${i + 3000}`
                    }));
                    renderCustomerList(largeDataset);
                    const end = performance.now();
                    return end - start;
                },
                threshold: 1000 // ms
            },
            {
                name: 'Modal Open/Close',
                test: () => {
                    const start = performance.now();
                    const customer = customerData[0];
                    showCustomerDetail(customer.Customer_ID);
                    hideCustomerDetail();
                    const end = performance.now();
                    return end - start;
                },
                threshold: 100 // ms
            }
        ];
        
        const results = [];
        
        for (const perfTest of performanceTests) {
            try {
                const duration = perfTest.test();
                const passed = duration <= perfTest.threshold;
                
                results.push({
                    name: perfTest.name,
                    duration: duration,
                    threshold: perfTest.threshold,
                    passed: passed
                });
                
                console.log(`${passed ? '✅' : '❌'} ${perfTest.name}: ${duration.toFixed(2)}ms (threshold: ${perfTest.threshold}ms)`);
            } catch (error) {
                console.log(`💥 ${perfTest.name}: Error - ${error.message}`);
                results.push({
                    name: perfTest.name,
                    error: error.message,
                    passed: false
                });
            }
        }
        
        return results;
    }
}

// Global test runner instance
window.testRunner = new AutomatedTestRunner();

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutomatedTestRunner;
}

console.log('🤖 Automated Test Runner loaded successfully!');
console.log('Usage:');
console.log('  testRunner.runAllTests() - Run all tests');
console.log('  testRunner.runTestSuite("unit") - Run specific suite');
console.log('  testRunner.runCIMode() - Run in CI/CD mode');
console.log('  testRunner.runPerformanceTests() - Run performance tests');
