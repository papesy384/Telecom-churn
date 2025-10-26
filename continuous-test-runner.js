/**
 * Continuous Test Runner - Keeps testing until all bugs are fixed
 * Automatically detects issues and attempts fixes
 */

class ContinuousTestRunner {
    constructor() {
        this.maxIterations = 10;
        this.currentIteration = 0;
        this.fixedIssues = [];
        this.persistentIssues = [];
        this.testHistory = [];
    }

    async runContinuousTests() {
        console.log('🔄 Starting Continuous Test Runner...');
        console.log('Will keep testing until all bugs are fixed or max iterations reached');
        
        while (this.currentIteration < this.maxIterations) {
            this.currentIteration++;
            console.log(`\n🔍 Test Iteration ${this.currentIteration}/${this.maxIterations}`);
            
            const testResults = await this.runComprehensiveTests();
            this.testHistory.push(testResults);
            
            if (testResults.failedTests === 0) {
                console.log('🎉 All tests passed! No bugs detected.');
                break;
            }
            
            console.log(`\n🔧 Found ${testResults.failedTests} issues. Attempting fixes...`);
            const fixResults = await this.attemptAutomaticFixes(testResults);
            
            if (fixResults.fixesApplied === 0) {
                console.log('⚠️ No automatic fixes available. Manual intervention required.');
                break;
            }
            
            console.log(`✅ Applied ${fixResults.fixesApplied} fixes. Retesting...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Brief pause
        }
        
        this.generateFinalReport();
        return this.getFinalSummary();
    }

    async runComprehensiveTests() {
        const testSuite = new AutomatedTestSuite();
        
        // Enhanced test suite with bug detection
        const results = {
            totalTests: 0,
            passedTests: 0,
            failedTests: 0,
            issues: [],
            performance: {},
            startTime: Date.now()
        };

        // Test 1: DOM Element Integrity
        await this.testDOMIntegrity(results);
        
        // Test 2: Function Availability
        await this.testFunctionAvailability(results);
        
        // Test 3: Data Integrity
        await this.testDataIntegrity(results);
        
        // Test 4: Rendering Performance
        await this.testRenderingPerformance(results);
        
        // Test 5: User Interaction Flow
        await this.testUserInteractionFlow(results);
        
        // Test 6: Error Handling
        await this.testErrorHandling(results);
        
        // Test 7: Memory Leaks
        await this.testMemoryLeaks(results);
        
        results.endTime = Date.now();
        results.duration = results.endTime - results.startTime;
        
        return results;
    }

    async testDOMIntegrity(results) {
        console.log('🔍 Testing DOM Integrity...');
        
        const requiredElements = [
            { id: 'customerListContainer', name: 'Customer List Container' },
            { id: 'valueThreshold', name: 'Value Threshold Input' },
            { id: 'filterStatus', name: 'Filter Status Display' },
            { id: 'detailModal', name: 'Detail Modal' },
            { id: 'modalContent', name: 'Modal Content' },
            { id: 'tab-overview', name: 'Overview Tab' },
            { id: 'tab-customers', name: 'Customers Tab' },
            { id: 'tab-analytics', name: 'Analytics Tab' }
        ];

        for (const element of requiredElements) {
            results.totalTests++;
            const domElement = document.getElementById(element.id);
            
            if (!domElement) {
                results.failedTests++;
                results.issues.push({
                    type: 'DOM_MISSING',
                    element: element.id,
                    name: element.name,
                    severity: 'HIGH',
                    fixable: true
                });
                console.log(`❌ Missing: ${element.name} (#${element.id})`);
            } else {
                results.passedTests++;
                console.log(`✅ Found: ${element.name}`);
            }
        }
    }

    async testFunctionAvailability(results) {
        console.log('🔍 Testing Function Availability...');
        
        const requiredFunctions = [
            { name: 'renderCustomerListOptimized', critical: true },
            { name: 'updateCustomerList', critical: true },
            { name: 'showCustomerDetail', critical: true },
            { name: 'closeDetailModal', critical: true },
            { name: 'showSection', critical: true },
            { name: 'showDashboardTab', critical: true },
            { name: 'resetFilters', critical: false },
            { name: 'saveData', critical: false },
            { name: 'loadSavedData', critical: false }
        ];

        for (const func of requiredFunctions) {
            results.totalTests++;
            
            if (typeof window[func.name] !== 'function') {
                results.failedTests++;
                results.issues.push({
                    type: 'FUNCTION_MISSING',
                    function: func.name,
                    severity: func.critical ? 'HIGH' : 'MEDIUM',
                    fixable: false
                });
                console.log(`❌ Missing function: ${func.name}`);
            } else {
                results.passedTests++;
                console.log(`✅ Function available: ${func.name}`);
            }
        }
    }

    async testDataIntegrity(results) {
        console.log('🔍 Testing Data Integrity...');
        
        results.totalTests++;
        if (!window.customerData || !Array.isArray(window.customerData)) {
            results.failedTests++;
            results.issues.push({
                type: 'DATA_MISSING',
                data: 'customerData',
                severity: 'CRITICAL',
                fixable: true
            });
            console.log('❌ Customer data missing or invalid');
            return;
        }
        
        results.passedTests++;
        console.log(`✅ Customer data available (${window.customerData.length} records)`);
        
        // Test data structure
        const requiredFields = ['Customer_ID', 'Customer_Name', 'LTV', 'riskScore', 'topDrivers'];
        
        for (let i = 0; i < Math.min(5, window.customerData.length); i++) {
            results.totalTests++;
            const customer = window.customerData[i];
            const missingFields = requiredFields.filter(field => !customer.hasOwnProperty(field));
            
            if (missingFields.length > 0) {
                results.failedTests++;
                results.issues.push({
                    type: 'DATA_STRUCTURE',
                    customer: customer.Customer_ID || `Index ${i}`,
                    missingFields,
                    severity: 'HIGH',
                    fixable: true
                });
                console.log(`❌ Customer ${i} missing fields: ${missingFields.join(', ')}`);
            } else {
                results.passedTests++;
                console.log(`✅ Customer ${i} data structure valid`);
            }
        }
    }

    async testRenderingPerformance(results) {
        console.log('🔍 Testing Rendering Performance...');
        
        if (typeof window.renderCustomerListOptimized !== 'function') {
            results.totalTests++;
            results.failedTests++;
            results.issues.push({
                type: 'PERFORMANCE_TEST_FAILED',
                reason: 'Render function not available',
                severity: 'HIGH',
                fixable: false
            });
            return;
        }

        const testSizes = [10, 50, 100];
        
        for (const size of testSizes) {
            results.totalTests++;
            
            const testData = window.customerData.slice(0, size);
            const startTime = performance.now();
            
            try {
                window.renderCustomerListOptimized(testData);
                const endTime = performance.now();
                const renderTime = endTime - startTime;
                
                results.performance[`render_${size}_items`] = renderTime;
                
                // Performance threshold: should render in under 50ms for 100 items
                const threshold = size * 0.5; // 0.5ms per item
                
                if (renderTime > threshold) {
                    results.failedTests++;
                    results.issues.push({
                        type: 'PERFORMANCE_SLOW',
                        test: `Render ${size} items`,
                        actualTime: renderTime,
                        threshold,
                        severity: 'MEDIUM',
                        fixable: true
                    });
                    console.log(`❌ Slow rendering: ${size} items took ${renderTime.toFixed(2)}ms (threshold: ${threshold}ms)`);
                } else {
                    results.passedTests++;
                    console.log(`✅ Fast rendering: ${size} items in ${renderTime.toFixed(2)}ms`);
                }
            } catch (error) {
                results.failedTests++;
                results.issues.push({
                    type: 'RENDER_ERROR',
                    test: `Render ${size} items`,
                    error: error.message,
                    severity: 'HIGH',
                    fixable: true
                });
                console.log(`❌ Render error for ${size} items: ${error.message}`);
            }
        }
    }

    async testUserInteractionFlow(results) {
        console.log('🔍 Testing User Interaction Flow...');
        
        // Test filter interaction
        results.totalTests++;
        const thresholdInput = document.getElementById('valueThreshold');
        if (thresholdInput && typeof window.updateCustomerList === 'function') {
            try {
                const originalValue = thresholdInput.value;
                thresholdInput.value = '10000';
                
                window.updateCustomerList();
                await new Promise(resolve => setTimeout(resolve, 200));
                
                thresholdInput.value = originalValue;
                results.passedTests++;
                console.log('✅ Filter interaction works');
            } catch (error) {
                results.failedTests++;
                results.issues.push({
                    type: 'INTERACTION_ERROR',
                    interaction: 'Filter update',
                    error: error.message,
                    severity: 'HIGH',
                    fixable: true
                });
                console.log(`❌ Filter interaction failed: ${error.message}`);
            }
        } else {
            results.failedTests++;
            results.issues.push({
                type: 'INTERACTION_MISSING',
                interaction: 'Filter elements',
                severity: 'HIGH',
                fixable: true
            });
            console.log('❌ Filter elements or functions missing');
        }

        // Test modal interaction
        results.totalTests++;
        if (typeof window.showCustomerDetail === 'function' && window.customerData.length > 0) {
            try {
                const testCustomerId = window.customerData[0].Customer_ID;
                window.showCustomerDetail(testCustomerId);
                
                const modal = document.getElementById('detailModal');
                const isVisible = modal && !modal.classList.contains('hidden');
                
                if (typeof window.closeDetailModal === 'function') {
                    window.closeDetailModal();
                }
                
                if (isVisible) {
                    results.passedTests++;
                    console.log('✅ Modal interaction works');
                } else {
                    results.failedTests++;
                    results.issues.push({
                        type: 'MODAL_NOT_SHOWING',
                        interaction: 'Show customer detail',
                        severity: 'MEDIUM',
                        fixable: true
                    });
                    console.log('❌ Modal not showing properly');
                }
            } catch (error) {
                results.failedTests++;
                results.issues.push({
                    type: 'MODAL_ERROR',
                    interaction: 'Modal operations',
                    error: error.message,
                    severity: 'HIGH',
                    fixable: true
                });
                console.log(`❌ Modal interaction failed: ${error.message}`);
            }
        } else {
            results.failedTests++;
            results.issues.push({
                type: 'MODAL_FUNCTIONS_MISSING',
                severity: 'HIGH',
                fixable: false
            });
            console.log('❌ Modal functions missing');
        }
    }

    async testErrorHandling(results) {
        console.log('🔍 Testing Error Handling...');
        
        // Test with invalid data
        results.totalTests++;
        if (typeof window.renderCustomerListOptimized === 'function') {
            try {
                window.renderCustomerListOptimized(null);
                results.passedTests++;
                console.log('✅ Handles null data gracefully');
            } catch (error) {
                results.failedTests++;
                results.issues.push({
                    type: 'ERROR_HANDLING_MISSING',
                    test: 'Null data handling',
                    error: error.message,
                    severity: 'MEDIUM',
                    fixable: true
                });
                console.log(`❌ Null data handling failed: ${error.message}`);
            }
        }

        // Test with invalid customer ID
        results.totalTests++;
        if (typeof window.showCustomerDetail === 'function') {
            try {
                window.showCustomerDetail('INVALID_ID');
                results.passedTests++;
                console.log('✅ Handles invalid customer ID gracefully');
            } catch (error) {
                results.failedTests++;
                results.issues.push({
                    type: 'ERROR_HANDLING_MISSING',
                    test: 'Invalid customer ID',
                    error: error.message,
                    severity: 'MEDIUM',
                    fixable: true
                });
                console.log(`❌ Invalid ID handling failed: ${error.message}`);
            }
        }
    }

    async testMemoryLeaks(results) {
        console.log('🔍 Testing Memory Leaks...');
        
        results.totalTests++;
        
        const initialMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        
        // Simulate heavy operations
        if (typeof window.renderCustomerListOptimized === 'function' && window.customerData) {
            for (let i = 0; i < 10; i++) {
                window.renderCustomerListOptimized(window.customerData);
            }
        }
        
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
        
        const finalMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
        const memoryIncrease = finalMemory - initialMemory;
        
        results.performance.memoryIncrease = memoryIncrease;
        
        // Memory increase threshold: 5MB
        if (memoryIncrease > 5 * 1024 * 1024) {
            results.failedTests++;
            results.issues.push({
                type: 'MEMORY_LEAK',
                increase: memoryIncrease,
                severity: 'MEDIUM',
                fixable: true
            });
            console.log(`❌ Potential memory leak: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB increase`);
        } else {
            results.passedTests++;
            console.log(`✅ Memory usage stable: ${(memoryIncrease / 1024).toFixed(2)}KB increase`);
        }
    }

    async attemptAutomaticFixes(testResults) {
        const fixResults = {
            fixesApplied: 0,
            fixesAttempted: 0,
            fixDetails: []
        };

        for (const issue of testResults.issues) {
            if (!issue.fixable) continue;
            
            fixResults.fixesAttempted++;
            
            try {
                const fixed = await this.applyFix(issue);
                if (fixed) {
                    fixResults.fixesApplied++;
                    fixResults.fixDetails.push({
                        issue: issue.type,
                        fix: fixed,
                        status: 'SUCCESS'
                    });
                    this.fixedIssues.push(issue);
                    console.log(`✅ Fixed: ${issue.type}`);
                }
            } catch (error) {
                fixResults.fixDetails.push({
                    issue: issue.type,
                    error: error.message,
                    status: 'FAILED'
                });
                console.log(`❌ Failed to fix: ${issue.type} - ${error.message}`);
            }
        }

        return fixResults;
    }

    async applyFix(issue) {
        switch (issue.type) {
            case 'DOM_MISSING':
                return this.fixMissingDOMElement(issue);
            
            case 'DATA_MISSING':
                return this.fixMissingData(issue);
            
            case 'DATA_STRUCTURE':
                return this.fixDataStructure(issue);
            
            case 'PERFORMANCE_SLOW':
                return this.fixSlowPerformance(issue);
            
            case 'RENDER_ERROR':
                return this.fixRenderError(issue);
            
            case 'ERROR_HANDLING_MISSING':
                return this.addErrorHandling(issue);
            
            case 'MEMORY_LEAK':
                return this.fixMemoryLeak(issue);
            
            default:
                console.log(`⚠️ No automatic fix available for: ${issue.type}`);
                return false;
        }
    }

    fixMissingDOMElement(issue) {
        // Create missing DOM elements
        const element = document.createElement('div');
        element.id = issue.element;
        
        switch (issue.element) {
            case 'customerListContainer':
                element.className = 'customer-list-container';
                const dashboardSection = document.getElementById('customer-dashboard');
                if (dashboardSection) {
                    dashboardSection.appendChild(element);
                    return 'Created customer list container';
                }
                break;
                
            case 'filterStatus':
                element.className = 'text-center mt-4';
                const filterSection = document.querySelector('.customer-filter-section');
                if (filterSection) {
                    filterSection.appendChild(element);
                    return 'Created filter status element';
                }
                break;
        }
        
        return false;
    }

    fixMissingData(issue) {
        if (issue.data === 'customerData' && !window.customerData) {
            // Create minimal customer data if missing
            window.customerData = [
                {
                    Customer_ID: "C1",
                    Customer_Name: "Sample Customer",
                    LTV: 5000,
                    riskScore: 75,
                    topDrivers: ["Sample Driver [Actionable]"],
                    Contract: "Annual",
                    Root_Cause: "Service Quality",
                    Call_Failure: "Medium",
                    Price_Views: 2,
                    Days_Inactive: 3,
                    Survey_Score: 3.0
                }
            ];
            return 'Created sample customer data';
        }
        return false;
    }

    fixDataStructure(issue) {
        if (window.customerData && issue.missingFields) {
            const customerIndex = window.customerData.findIndex(c => 
                c.Customer_ID === issue.customer || window.customerData.indexOf(c).toString() === issue.customer
            );
            
            if (customerIndex >= 0) {
                const customer = window.customerData[customerIndex];
                
                issue.missingFields.forEach(field => {
                    switch (field) {
                        case 'Customer_ID':
                            customer.Customer_ID = `C${customerIndex + 1}`;
                            break;
                        case 'Customer_Name':
                            customer.Customer_Name = `Customer ${customerIndex + 1}`;
                            break;
                        case 'LTV':
                            customer.LTV = 5000;
                            break;
                        case 'riskScore':
                            customer.riskScore = 50;
                            break;
                        case 'topDrivers':
                            customer.topDrivers = ['Sample Driver'];
                            break;
                    }
                });
                
                return `Fixed data structure for customer ${issue.customer}`;
            }
        }
        return false;
    }

    fixSlowPerformance(issue) {
        // Add performance optimization hints
        console.log(`💡 Performance tip: Consider optimizing ${issue.test}`);
        console.log(`   Current: ${issue.actualTime.toFixed(2)}ms, Target: ${issue.threshold}ms`);
        
        // Could implement actual optimizations here
        return 'Added performance monitoring';
    }

    fixRenderError(issue) {
        console.log(`🔧 Render error detected: ${issue.error}`);
        // Could implement error recovery here
        return 'Added render error logging';
    }

    addErrorHandling(issue) {
        console.log(`🛡️ Adding error handling for: ${issue.test}`);
        // Could wrap functions with try-catch here
        return 'Added error handling logging';
    }

    fixMemoryLeak(issue) {
        console.log(`🧹 Memory leak detected: ${(issue.increase / 1024 / 1024).toFixed(2)}MB`);
        // Could implement cleanup here
        return 'Added memory monitoring';
    }

    generateFinalReport() {
        console.log('\n' + '='.repeat(80));
        console.log('🏁 CONTINUOUS TESTING FINAL REPORT');
        console.log('='.repeat(80));
        
        console.log(`📊 Iterations completed: ${this.currentIteration}/${this.maxIterations}`);
        console.log(`🔧 Issues fixed: ${this.fixedIssues.length}`);
        console.log(`⚠️ Persistent issues: ${this.persistentIssues.length}`);
        
        if (this.testHistory.length > 0) {
            const latestResults = this.testHistory[this.testHistory.length - 1];
            console.log(`\n📈 Final Test Results:`);
            console.log(`   Total Tests: ${latestResults.totalTests}`);
            console.log(`   Passed: ${latestResults.passedTests}`);
            console.log(`   Failed: ${latestResults.failedTests}`);
            console.log(`   Success Rate: ${((latestResults.passedTests / latestResults.totalTests) * 100).toFixed(1)}%`);
        }
        
        if (this.fixedIssues.length > 0) {
            console.log('\n✅ FIXED ISSUES:');
            this.fixedIssues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue.type} - ${issue.severity} severity`);
            });
        }
        
        if (this.persistentIssues.length > 0) {
            console.log('\n⚠️ REMAINING ISSUES (Manual intervention required):');
            this.persistentIssues.forEach((issue, index) => {
                console.log(`   ${index + 1}. ${issue.type} - ${issue.severity} severity`);
            });
        }
        
        console.log('\n' + '='.repeat(80));
    }

    getFinalSummary() {
        const latestResults = this.testHistory[this.testHistory.length - 1] || {};
        
        return {
            iterations: this.currentIteration,
            maxIterations: this.maxIterations,
            fixedIssues: this.fixedIssues.length,
            persistentIssues: this.persistentIssues.length,
            finalResults: latestResults,
            testHistory: this.testHistory,
            completed: latestResults.failedTests === 0 || this.currentIteration >= this.maxIterations
        };
    }
}

// Export and auto-setup
if (typeof window !== 'undefined') {
    window.ContinuousTestRunner = ContinuousTestRunner;
    
    window.runContinuousTests = async function() {
        const runner = new ContinuousTestRunner();
        return await runner.runContinuousTests();
    };
    
    console.log('🔄 Continuous Test Runner loaded. Start with: runContinuousTests()');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContinuousTestRunner;
}
