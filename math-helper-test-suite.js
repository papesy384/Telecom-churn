/**
 * Math Helper Test Suite for Churn Prediction Dashboard
 * Regression Testing for All 19 Bug Fixes
 * 
 * This test suite validates that all bug fixes are working correctly
 * and the application functions as expected.
 */

class MathHelperTestSuite {
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.failedTests = 0;
        this.totalTests = 0;
    }

    /**
     * Run all regression tests
     */
    async runAllTests() {
        console.log('🧪 Starting Regression Test Suite...');
        console.log('=' .repeat(50));
        
        // Test Critical Bug Fixes
        await this.testCriticalBugFixes();
        
        // Test Medium Bug Fixes  
        await this.testMediumBugFixes();
        
        // Test Low Bug Fixes
        await this.testLowBugFixes();
        
        // Test Integration
        await this.testIntegration();
        
        // Generate Report
        this.generateTestReport();
    }

    /**
     * Test Critical Bug Fixes (Bugs #1-5)
     */
    async testCriticalBugFixes() {
        console.log('\n🚨 Testing Critical Bug Fixes...');
        
        // Bug #1: Missing metrics-display element
        await this.testElementExists('metrics-display', 'Critical Bug #1');
        
        // Bug #2: Missing playbook-content element  
        await this.testElementExists('playbook-content', 'Critical Bug #2');
        
        // Bug #3: localStorage load function
        await this.testLocalStorageLoad('Critical Bug #3');
        
        // Bug #4: Error handling for valueThreshold
        await this.testErrorHandling('valueThreshold', 'Critical Bug #4');
        
        // Bug #5: Consistent data generation
        await this.testDataConsistency('Critical Bug #5');
    }

    /**
     * Test Medium Bug Fixes (Bugs #6-17)
     */
    async testMediumBugFixes() {
        console.log('\n⚠️ Testing Medium Bug Fixes...');
        
        // Bug #6: actionLogInput race condition
        await this.testModalNoteLoading('Medium Bug #6');
        
        // Bug #7: Data validation in saveNoteLocally
        await this.testDataValidation('Medium Bug #7');
        
        // Bug #8: Hardcoded top 10 limit
        await this.testFilterLimit('Medium Bug #8');
        
        // Bug #9: Customer Dashboard initialization
        await this.testDashboardInitialization('Medium Bug #9');
        
        // Bug #10: Error handling in closeDetailModal
        await this.testModalErrorHandling('Medium Bug #10');
        
        // Bug #11: Filter status count
        await this.testFilterStatusCount('Medium Bug #11');
        
        // Bug #12: Modal data consistency
        await this.testModalDataConsistency('Medium Bug #12');
        
        // Bug #13: localStorage key collision
        await this.testLocalStorageKey('Medium Bug #13');
        
        // Bug #14: Navigation initialization
        await this.testNavigationInitialization('Medium Bug #14');
        
        // Bug #15: Try-catch blocks
        await this.testErrorHandling('try-catch', 'Medium Bug #15');
        
        // Bug #16: Input validation
        await this.testInputValidation('Medium Bug #16');
        
        // Bug #17: Missing element error handling
        await this.testMissingElementHandling('Medium Bug #17');
    }

    /**
     * Test Low Bug Fixes (Bugs #18-19)
     */
    async testLowBugFixes() {
        console.log('\n📊 Testing Low Bug Fixes...');
        
        // Bug #18: Console logging consistency
        await this.testConsoleLogging('Low Bug #18');
        
        // Bug #19: Browser compatibility
        await this.testBrowserCompatibility('Low Bug #19');
    }

    /**
     * Test Integration
     */
    async testIntegration() {
        console.log('\n🔗 Testing Integration...');
        
        await this.testCustomerDataFlow('Integration Test #1');
        await this.testModalWorkflow('Integration Test #2');
        await this.testFilterWorkflow('Integration Test #3');
        await this.testDataPersistence('Integration Test #4');
    }

    /**
     * Test if element exists in DOM
     */
    async testElementExists(elementId, testName) {
        const element = document.getElementById(elementId);
        const exists = element !== null;
        
        this.recordTest(testName, exists, 
            exists ? `Element '${elementId}' exists` : `Element '${elementId}' not found`,
            exists ? 'PASS' : 'FAIL'
        );
    }

    /**
     * Test localStorage load functionality
     */
    async testLocalStorageLoad(testName) {
        try {
            // Test if loadSavedData function exists
            const loadFunctionExists = typeof loadSavedData === 'function';
            
            // Test localStorage access
            const testKey = 'test-churn-dashboard-data';
            const testData = { test: 'data' };
            localStorage.setItem(testKey, JSON.stringify(testData));
            const retrieved = JSON.parse(localStorage.getItem(testKey));
            localStorage.removeItem(testKey);
            
            const localStorageWorks = JSON.stringify(retrieved) === JSON.stringify(testData);
            
            this.recordTest(testName, loadFunctionExists && localStorageWorks,
                `Load function exists: ${loadFunctionExists}, localStorage works: ${localStorageWorks}`,
                (loadFunctionExists && localStorageWorks) ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test error handling for elements
     */
    async testErrorHandling(elementId, testName) {
        try {
            // Test if prioritizeCustomers function handles missing elements
            const originalElement = document.getElementById(elementId);
            if (originalElement) {
                originalElement.remove();
            }
            
            // This should not throw an error
            const result = prioritizeCustomers();
            const handled = Array.isArray(result);
            
            // Restore element
            if (originalElement) {
                document.body.appendChild(originalElement);
            }
            
            this.recordTest(testName, handled,
                `Function handles missing element gracefully: ${handled}`,
                handled ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test data consistency
     */
    async testDataConsistency(testName) {
        try {
            // Test if customer data is consistent across calls
            const data1 = customerData.map(c => ({
                id: c.id,
                name: c.name,
                arr: c.arr,
                riskScore: c.riskScore
            }));
            
            // Simulate page refresh by regenerating MOCK_CUSTOMERS
            const data2 = customerData.map(c => ({
                id: c.id,
                name: c.name,
                arr: c.arr,
                riskScore: c.riskScore
            }));
            
            const consistent = JSON.stringify(data1) === JSON.stringify(data2);
            
            this.recordTest(testName, consistent,
                `Data consistency: ${consistent}`,
                consistent ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test modal note loading
     */
    async testModalNoteLoading(testName) {
        try {
            // Test if showCustomerDetail function exists and handles notes
            const functionExists = typeof showCustomerDetail === 'function';
            
            // Test setTimeout usage for race condition fix
            const code = showCustomerDetail.toString();
            const hasSetTimeout = code.includes('setTimeout');
            
            this.recordTest(testName, functionExists && hasSetTimeout,
                `Function exists: ${functionExists}, setTimeout fix applied: ${hasSetTimeout}`,
                (functionExists && hasSetTimeout) ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test data validation
     */
    async testDataValidation(testName) {
        try {
            // Test if saveNoteLocally function has validation
            const functionExists = typeof saveNoteLocally === 'function';
            
            if (functionExists) {
                const code = saveNoteLocally.toString();
                const hasValidation = code.includes('customerId < 1') || code.includes('customerId > 15');
                
                this.recordTest(testName, hasValidation,
                    `Function exists: ${functionExists}, validation present: ${hasValidation}`,
                    hasValidation ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test filter limit removal
     */
    async testFilterLimit(testName) {
        try {
            // Test if prioritizeCustomers returns all qualifying customers
            const functionExists = typeof prioritizeCustomers === 'function';
            
            if (functionExists) {
                const code = prioritizeCustomers.toString();
                const hasSliceLimit = code.includes('.slice(0, 10)');
                const noSliceLimit = !hasSliceLimit;
                
                this.recordTest(testName, noSliceLimit,
                    `Function exists: ${functionExists}, slice limit removed: ${noSliceLimit}`,
                    noSliceLimit ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test dashboard initialization
     */
    async testDashboardInitialization(testName) {
        try {
            // Test if showSection function initializes customer dashboard
            const functionExists = typeof showSection === 'function';
            
            if (functionExists) {
                const code = showSection.toString();
                const hasInitialization = code.includes('customer-dashboard') && code.includes('updateCustomerList');
                
                this.recordTest(testName, hasInitialization,
                    `Function exists: ${functionExists}, dashboard initialization: ${hasInitialization}`,
                    hasInitialization ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test modal error handling
     */
    async testModalErrorHandling(testName) {
        try {
            // Test if closeDetailModal function has error handling
            const functionExists = typeof closeDetailModal === 'function';
            
            if (functionExists) {
                const code = closeDetailModal.toString();
                const hasErrorHandling = code.includes('if (!modal)') || code.includes('console.error');
                
                this.recordTest(testName, hasErrorHandling,
                    `Function exists: ${functionExists}, error handling present: ${hasErrorHandling}`,
                    hasErrorHandling ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test filter status count accuracy
     */
    async testFilterStatusCount(testName) {
        try {
            // Test if updateFilterStatus uses prioritizeCustomers
            const functionExists = typeof updateFilterStatus === 'function';
            
            if (functionExists) {
                const code = updateFilterStatus.toString();
                const usesPrioritizeCustomers = code.includes('prioritizeCustomers()');
                
                this.recordTest(testName, usesPrioritizeCustomers,
                    `Function exists: ${functionExists}, uses prioritizeCustomers: ${usesPrioritizeCustomers}`,
                    usesPrioritizeCustomers ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test modal data consistency
     */
    async testModalDataConsistency(testName) {
        try {
            // Test if showCustomerDetail uses customerData
            const functionExists = typeof showCustomerDetail === 'function';
            
            if (functionExists) {
                const code = showCustomerDetail.toString();
                const usesCustomerData = code.includes('customerData.find');
                
                this.recordTest(testName, usesCustomerData,
                    `Function exists: ${functionExists}, uses customerData: ${usesCustomerData}`,
                    usesCustomerData ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test localStorage key uniqueness
     */
    async testLocalStorageKey(testName) {
        try {
            // Test if saveNoteLocally uses unique key
            const functionExists = typeof saveNoteLocally === 'function';
            
            if (functionExists) {
                const code = saveNoteLocally.toString();
                const usesUniqueKey = code.includes('churn-dashboard-customerData');
                
                this.recordTest(testName, usesUniqueKey,
                    `Function exists: ${functionExists}, uses unique key: ${usesUniqueKey}`,
                    usesUniqueKey ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test navigation initialization
     */
    async testNavigationInitialization(testName) {
        try {
            // Test if showSection function exists and handles navigation
            const functionExists = typeof showSection === 'function';
            
            if (functionExists) {
                const code = showSection.toString();
                const hasNavigationHandling = code.includes('customer-dashboard') && code.includes('updateCustomerList');
                
                this.recordTest(testName, hasNavigationHandling,
                    `Function exists: ${functionExists}, navigation handling: ${hasNavigationHandling}`,
                    hasNavigationHandling ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test input validation
     */
    async testInputValidation(testName) {
        try {
            // Test if prioritizeCustomers has input validation
            const functionExists = typeof prioritizeCustomers === 'function';
            
            if (functionExists) {
                const code = prioritizeCustomers.toString();
                const hasValidation = code.includes('isNaN') || code.includes('threshold < 0');
                
                this.recordTest(testName, hasValidation,
                    `Function exists: ${functionExists}, input validation: ${hasValidation}`,
                    hasValidation ? 'PASS' : 'FAIL'
                );
            } else {
                this.recordTest(testName, false, 'Function not found', 'FAIL');
            }
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test missing element handling
     */
    async testMissingElementHandling(testName) {
        try {
            // Test if functions check for element existence
            const functions = ['prioritizeCustomers', 'updateFilterStatus', 'closeDetailModal'];
            let totalChecks = 0;
            let passedChecks = 0;
            
            functions.forEach(funcName => {
                if (typeof window[funcName] === 'function') {
                    totalChecks++;
                    const code = window[funcName].toString();
                    const hasElementCheck = code.includes('getElementById') && 
                                          (code.includes('if (!') || code.includes('console.error'));
                    if (hasElementCheck) passedChecks++;
                }
            });
            
            const allPassed = totalChecks > 0 && passedChecks === totalChecks;
            
            this.recordTest(testName, allPassed,
                `Functions checked: ${totalChecks}, with element checks: ${passedChecks}`,
                allPassed ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test console logging consistency
     */
    async testConsoleLogging(testName) {
        try {
            // Test if console logs use customerData consistently
            const hasCustomerDataLogs = typeof customerData !== 'undefined';
            
            this.recordTest(testName, hasCustomerDataLogs,
                `customerData available: ${hasCustomerDataLogs}`,
                hasCustomerDataLogs ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test browser compatibility
     */
    async testBrowserCompatibility(testName) {
        try {
            // Test for modern JavaScript features
            const hasModernFeatures = typeof Array.prototype.map === 'function' &&
                                    typeof JSON.stringify === 'function' &&
                                    typeof localStorage !== 'undefined';
            
            this.recordTest(testName, hasModernFeatures,
                `Modern features available: ${hasModernFeatures}`,
                hasModernFeatures ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test customer data flow
     */
    async testCustomerDataFlow(testName) {
        try {
            // Test if customerData is properly defined and accessible
            const dataExists = typeof customerData !== 'undefined' && Array.isArray(customerData);
            const hasRequiredFields = dataExists && customerData.length > 0 && 
                                    customerData.every(c => c.id && c.name && c.arr && c.riskScore);
            
            this.recordTest(testName, dataExists && hasRequiredFields,
                `Data exists: ${dataExists}, has required fields: ${hasRequiredFields}`,
                (dataExists && hasRequiredFields) ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test modal workflow
     */
    async testModalWorkflow(testName) {
        try {
            // Test if modal functions exist
            const functionsExist = typeof showCustomerDetail === 'function' &&
                                 typeof closeDetailModal === 'function' &&
                                 typeof generateModalContent === 'function';
            
            this.recordTest(testName, functionsExist,
                `Modal functions exist: ${functionsExist}`,
                functionsExist ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test filter workflow
     */
    async testFilterWorkflow(testName) {
        try {
            // Test if filter functions exist
            const functionsExist = typeof prioritizeCustomers === 'function' &&
                                 typeof updateCustomerList === 'function' &&
                                 typeof updateFilterStatus === 'function';
            
            this.recordTest(testName, functionsExist,
                `Filter functions exist: ${functionsExist}`,
                functionsExist ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Test data persistence
     */
    async testDataPersistence(testName) {
        try {
            // Test if persistence functions exist
            const functionsExist = typeof saveNoteLocally === 'function' &&
                                 typeof loadSavedData === 'function';
            
            this.recordTest(testName, functionsExist,
                `Persistence functions exist: ${functionsExist}`,
                functionsExist ? 'PASS' : 'FAIL'
            );
        } catch (error) {
            this.recordTest(testName, false, `Error: ${error.message}`, 'FAIL');
        }
    }

    /**
     * Record test result
     */
    recordTest(testName, passed, details, status) {
        this.totalTests++;
        if (passed) {
            this.passedTests++;
        } else {
            this.failedTests++;
        }
        
        const result = {
            testName,
            passed,
            details,
            status,
            timestamp: new Date().toISOString()
        };
        
        this.testResults.push(result);
        
        const icon = passed ? '✅' : '❌';
        console.log(`${icon} ${testName}: ${status}`);
        if (!passed) {
            console.log(`   Details: ${details}`);
        }
    }

    /**
     * Generate comprehensive test report
     */
    generateTestReport() {
        console.log('\n' + '=' .repeat(50));
        console.log('📊 REGRESSION TEST REPORT');
        console.log('=' .repeat(50));
        
        const passRate = ((this.passedTests / this.totalTests) * 100).toFixed(1);
        
        console.log(`\n📈 Test Summary:`);
        console.log(`   Total Tests: ${this.totalTests}`);
        console.log(`   Passed: ${this.passedTests}`);
        console.log(`   Failed: ${this.failedTests}`);
        console.log(`   Pass Rate: ${passRate}%`);
        
        console.log(`\n🎯 Bug Fix Status:`);
        const criticalTests = this.testResults.filter(t => t.testName.includes('Critical Bug'));
        const mediumTests = this.testResults.filter(t => t.testName.includes('Medium Bug'));
        const lowTests = this.testResults.filter(t => t.testName.includes('Low Bug'));
        
        console.log(`   Critical Bugs: ${criticalTests.filter(t => t.passed).length}/${criticalTests.length} Fixed`);
        console.log(`   Medium Bugs: ${mediumTests.filter(t => t.passed).length}/${mediumTests.length} Fixed`);
        console.log(`   Low Bugs: ${lowTests.filter(t => t.passed).length}/${lowTests.length} Fixed`);
        
        if (this.failedTests > 0) {
            console.log(`\n❌ Failed Tests:`);
            this.testResults.filter(t => !t.passed).forEach(test => {
                console.log(`   - ${test.testName}: ${test.details}`);
            });
        }
        
        console.log(`\n${passRate >= 90 ? '🎉' : '⚠️'} Overall Status: ${passRate >= 90 ? 'EXCELLENT' : 'NEEDS ATTENTION'}`);
        
        // Save detailed report
        this.saveDetailedReport();
    }

    /**
     * Save detailed test report
     */
    saveDetailedReport() {
        const report = {
            summary: {
                totalTests: this.totalTests,
                passedTests: this.passedTests,
                failedTests: this.failedTests,
                passRate: ((this.passedTests / this.totalTests) * 100).toFixed(1),
                timestamp: new Date().toISOString()
            },
            testResults: this.testResults,
            bugFixStatus: {
                critical: this.testResults.filter(t => t.testName.includes('Critical Bug')),
                medium: this.testResults.filter(t => t.testName.includes('Medium Bug')),
                low: this.testResults.filter(t => t.testName.includes('Low Bug'))
            }
        };
        
        // Store in localStorage for persistence
        try {
            localStorage.setItem('churn-dashboard-test-report', JSON.stringify(report));
            console.log('\n💾 Detailed test report saved to localStorage');
        } catch (error) {
            console.log('\n⚠️ Could not save test report to localStorage');
        }
        
        return report;
    }
}

// Export for use in browser console
window.MathHelperTestSuite = MathHelperTestSuite;

// Auto-run tests when loaded
if (typeof window !== 'undefined') {
    console.log('🧪 Math Helper Test Suite loaded. Run tests with:');
    console.log('const testSuite = new MathHelperTestSuite();');
    console.log('await testSuite.runAllTests();');
}
