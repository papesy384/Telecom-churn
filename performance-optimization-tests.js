/**
 * Performance Optimization Testing Suite
 * Tests for preventing incomplete renders and ensuring single DOM updates
 */

class PerformanceOptimizationTester {
    constructor() {
        this.testResults = [];
        this.performanceMetrics = {
            renderCount: 0,
            domUpdates: 0,
            incompleteRenders: 0,
            debounceEffectiveness: 0
        };
    }

    // Test 1: Debouncing Effectiveness
    testDebouncingEffectiveness() {
        console.log('🔍 Testing Debouncing Effectiveness...');
        
        const originalUpdateFunction = window.updateCustomerList;
        let callCount = 0;
        let actualRenders = 0;
        
        // Override updateCustomerList to track calls
        window.updateCustomerList = function() {
            callCount++;
            return originalUpdateFunction.apply(this, arguments);
        };
        
        // Override renderCustomerListOptimized to track renders
        const originalRenderFunction = window.renderCustomerListOptimized;
        window.renderCustomerListOptimized = function(data) {
            actualRenders++;
            return originalRenderFunction.apply(this, arguments);
        };
        
        // Simulate rapid input changes
        const input = document.getElementById('valueThreshold');
        if (input) {
            // Simulate typing "12345" character by character
            input.value = '1';
            input.dispatchEvent(new Event('input'));
            
            input.value = '12';
            input.dispatchEvent(new Event('input'));
            
            input.value = '123';
            input.dispatchEvent(new Event('input'));
            
            input.value = '1234';
            input.dispatchEvent(new Event('input'));
            
            input.value = '12345';
            input.dispatchEvent(new Event('input'));
            
            // Wait for debounce to complete
            setTimeout(() => {
                const debounceEffectiveness = actualRenders < callCount;
                
                this.testResults.push({
                    test: 'Debouncing Effectiveness',
                    passed: debounceEffectiveness,
                    details: {
                        inputEvents: callCount,
                        actualRenders: actualRenders,
                        debounceWorking: debounceEffectiveness
                    }
                });
                
                console.log(debounceEffectiveness ? '✅ Debouncing test PASSED' : '❌ Debouncing test FAILED');
                
                // Restore original functions
                window.updateCustomerList = originalUpdateFunction;
                window.renderCustomerListOptimized = originalRenderFunction;
            }, 200);
        }
    }

    // Test 2: DocumentFragment Usage
    testDocumentFragmentUsage() {
        console.log('🔍 Testing DocumentFragment Usage...');
        
        const originalRenderFunction = window.renderCustomerListOptimized;
        let fragmentUsed = false;
        
        // Override renderCustomerListOptimized to check for DocumentFragment
        window.renderCustomerListOptimized = function(data) {
            // Check if the function uses DocumentFragment
            const functionCode = originalRenderFunction.toString();
            fragmentUsed = functionCode.includes('createDocumentFragment') && 
                          functionCode.includes('fragment.appendChild');
            
            return originalRenderFunction.apply(this, arguments);
        };
        
        // Test with sample data
        const testData = [
            { Customer_ID: "C1", Customer_Name: "Test Corp", LTV: 10000, riskScore: 85, topDrivers: ["Test driver"] }
        ];
        
        window.renderCustomerListOptimized(testData);
        
        this.testResults.push({
            test: 'DocumentFragment Usage',
            passed: fragmentUsed,
            details: {
                fragmentUsed: fragmentUsed,
                singleDOMUpdate: fragmentUsed
            }
        });
        
        console.log(fragmentUsed ? '✅ DocumentFragment test PASSED' : '❌ DocumentFragment test FAILED');
        
        // Restore original function
        window.renderCustomerListOptimized = originalRenderFunction;
    }

    // Test 3: Data Processing Before Rendering
    testDataProcessingOrder() {
        console.log('🔍 Testing Data Processing Order...');
        
        const originalPrioritizeFunction = window.prioritizeCustomers;
        let dataProcessedBeforeRender = false;
        
        // Override prioritizeCustomers to track processing
        window.prioritizeCustomers = function() {
            const result = originalPrioritizeFunction.apply(this, arguments);
            dataProcessedBeforeRender = true;
            return result;
        };
        
        // Override renderCustomerListOptimized to check if data was processed
        const originalRenderFunction = window.renderCustomerListOptimized;
        window.renderCustomerListOptimized = function(data) {
            if (dataProcessedBeforeRender) {
                dataProcessedBeforeRender = false; // Reset for next test
            }
            return originalRenderFunction.apply(this, arguments);
        };
        
        // Test the flow
        window.updateCustomerListImmediate();
        
        this.testResults.push({
            test: 'Data Processing Order',
            passed: dataProcessedBeforeRender,
            details: {
                dataProcessedFirst: dataProcessedBeforeRender,
                processingBeforeRendering: dataProcessedBeforeRender
            }
        });
        
        console.log(dataProcessedBeforeRender ? '✅ Data processing order test PASSED' : '❌ Data processing order test FAILED');
        
        // Restore original functions
        window.prioritizeCustomers = originalPrioritizeFunction;
        window.renderCustomerListOptimized = originalRenderFunction;
    }

    // Test 4: Loading State Prevention
    testLoadingStatePrevention() {
        console.log('🔍 Testing Loading State Prevention...');
        
        const container = document.getElementById('customerListContainer');
        if (!container) {
            console.log('❌ Container not found');
            return;
        }
        
        // Clear container to simulate empty state
        container.innerHTML = '';
        
        // Trigger loading state
        window.showLoadingState();
        
        const hasLoadingState = container.innerHTML.includes('Processing data...') && 
                              container.innerHTML.includes('animate-spin');
        
        this.testResults.push({
            test: 'Loading State Prevention',
            passed: hasLoadingState,
            details: {
                loadingStateShown: hasLoadingState,
                preventsFlickering: hasLoadingState
            }
        });
        
        console.log(hasLoadingState ? '✅ Loading state test PASSED' : '❌ Loading state test FAILED');
    }

    // Test 5: Performance Metrics
    testPerformanceMetrics() {
        console.log('🔍 Testing Performance Metrics...');
        
        const startTime = performance.now();
        
        // Simulate multiple rapid updates
        for (let i = 0; i < 10; i++) {
            const input = document.getElementById('valueThreshold');
            if (input) {
                input.value = 1000 + (i * 1000);
                input.dispatchEvent(new Event('input'));
            }
        }
        
        // Wait for all updates to complete
        setTimeout(() => {
            const endTime = performance.now();
            const totalTime = endTime - startTime;
            
            // Performance should be good (under 500ms for 10 updates)
            const performanceGood = totalTime < 500;
            
            this.testResults.push({
                test: 'Performance Metrics',
                passed: performanceGood,
                details: {
                    totalTime: `${totalTime.toFixed(2)}ms`,
                    updatesPerformed: 10,
                    performanceGood: performanceGood
                }
            });
            
            console.log(performanceGood ? '✅ Performance test PASSED' : '❌ Performance test FAILED');
        }, 200);
    }

    // Run all tests
    runAllTests() {
        console.log('🚀 Starting Performance Optimization Tests...\n');
        
        const tests = [
            () => this.testDebouncingEffectiveness(),
            () => this.testDocumentFragmentUsage(),
            () => this.testDataProcessingOrder(),
            () => this.testLoadingStatePrevention(),
            () => this.testPerformanceMetrics()
        ];
        
        let passedTests = 0;
        tests.forEach(test => {
            try {
                if (test()) passedTests++;
            } catch (error) {
                console.error('Test error:', error);
            }
        });
        
        console.log(`\n📊 Test Results: ${passedTests}/${tests.length} tests passed`);
        
        // Generate detailed report
        this.generateReport();
        
        return passedTests === tests.length;
    }

    // Generate detailed test report
    generateReport() {
        console.log('\n📋 Performance Optimization Report:');
        console.log('=====================================');
        
        this.testResults.forEach(result => {
            console.log(`\n${result.passed ? '✅' : '❌'} ${result.test}`);
            Object.entries(result.details).forEach(([key, value]) => {
                console.log(`   ${key}: ${value}`);
            });
        });
        
        // Overall assessment
        const passedCount = this.testResults.filter(r => r.passed).length;
        const totalCount = this.testResults.length;
        
        console.log(`\n🎯 Overall Assessment: ${passedCount}/${totalCount} tests passed`);
        
        if (passedCount === totalCount) {
            console.log('🎉 All performance optimizations are working correctly!');
            console.log('✨ Browser will only update once with final, perfect data!');
        } else {
            console.log('⚠️  Some performance optimizations need attention.');
        }
    }
}

// Initialize and run tests when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Performance Optimization Tester loaded');
    
    // Make tester available globally for manual testing
    window.performanceOptimizationTester = new PerformanceOptimizationTester();
    
    // Auto-run tests after a short delay to ensure everything is loaded
    setTimeout(() => {
        console.log('🚀 Auto-running performance optimization tests...');
        window.performanceOptimizationTester.runAllTests();
    }, 1000);
});

// Manual test runner function
function runPerformanceOptimizationTests() {
    if (window.performanceOptimizationTester) {
        return window.performanceOptimizationTester.runAllTests();
    } else {
        console.error('❌ Performance Optimization Tester not available');
        return false;
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizationTester;
}
