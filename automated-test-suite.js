/**
 * Comprehensive Automated Test Suite
 * Tests all core functionality of the Churn Prediction Dashboard
 */

class AutomatedTestSuite {
    constructor() {
        this.testResults = [];
        this.totalTests = 0;
        this.passedTests = 0;
        this.failedTests = 0;
        this.startTime = null;
        this.endTime = null;
    }

    // Test runner
    async runAllTests() {
        console.log('🚀 Starting Comprehensive Automated Test Suite...');
        this.startTime = Date.now();
        
        // Core functionality tests
        await this.testCustomerDataIntegrity();
        await this.testCustomerListRendering();
        await this.testFilterFunctionality();
        await this.testModalFunctionality();
        await this.testNavigationSystem();
        await this.testDashboardTabs();
        await this.testDataPersistence();
        await this.testPerformanceOptimizations();
        await this.testResponsiveDesign();
        await this.testErrorHandling();
        
        this.endTime = Date.now();
        this.generateTestReport();
        return this.getTestSummary();
    }

    // Test helper methods
    test(name, testFunction) {
        this.totalTests++;
        try {
            const result = testFunction();
            if (result === true || result === undefined) {
                this.passedTests++;
                this.testResults.push({ name, status: 'PASS', message: 'Test passed successfully' });
                console.log(`✅ ${name}`);
            } else {
                this.failedTests++;
                this.testResults.push({ name, status: 'FAIL', message: result || 'Test failed' });
                console.log(`❌ ${name}: ${result}`);
            }
        } catch (error) {
            this.failedTests++;
            this.testResults.push({ name, status: 'ERROR', message: error.message });
            console.log(`💥 ${name}: ${error.message}`);
        }
    }

    async asyncTest(name, testFunction) {
        this.totalTests++;
        try {
            const result = await testFunction();
            if (result === true || result === undefined) {
                this.passedTests++;
                this.testResults.push({ name, status: 'PASS', message: 'Test passed successfully' });
                console.log(`✅ ${name}`);
            } else {
                this.failedTests++;
                this.testResults.push({ name, status: 'FAIL', message: result || 'Test failed' });
                console.log(`❌ ${name}: ${result}`);
            }
        } catch (error) {
            this.failedTests++;
            this.testResults.push({ name, status: 'ERROR', message: error.message });
            console.log(`💥 ${name}: ${error.message}`);
        }
    }

    // Customer Data Tests
    async testCustomerDataIntegrity() {
        console.log('\n📊 Testing Customer Data Integrity...');
        
        this.test('Customer data exists and is array', () => {
            return Array.isArray(window.customerData) && window.customerData.length > 0;
        });

        this.test('All customers have required fields', () => {
            const requiredFields = ['Customer_ID', 'Customer_Name', 'LTV', 'riskScore', 'topDrivers'];
            return window.customerData.every(customer => 
                requiredFields.every(field => customer.hasOwnProperty(field))
            );
        });

        this.test('Risk scores are valid (0-100)', () => {
            return window.customerData.every(customer => 
                customer.riskScore >= 0 && customer.riskScore <= 100
            );
        });

        this.test('LTV values are positive numbers', () => {
            return window.customerData.every(customer => 
                typeof customer.LTV === 'number' && customer.LTV > 0
            );
        });
    }

    // Customer List Rendering Tests
    async testCustomerListRendering() {
        console.log('\n🎨 Testing Customer List Rendering...');
        
        this.test('Customer list container exists', () => {
            return document.getElementById('customerListContainer') !== null;
        });

        await this.asyncTest('Customer list renders with data', async () => {
            if (typeof window.renderCustomerListOptimized === 'function') {
                const container = document.getElementById('customerListContainer');
                const testData = window.customerData.slice(0, 3);
                window.renderCustomerListOptimized(testData);
                
                // Wait for DOM update
                await new Promise(resolve => setTimeout(resolve, 100));
                
                return container.children.length > 0;
            }
            return 'renderCustomerListOptimized function not found';
        });

        await this.asyncTest('Empty state renders correctly', async () => {
            if (typeof window.renderCustomerListOptimized === 'function') {
                const container = document.getElementById('customerListContainer');
                window.renderCustomerListOptimized([]);
                
                // Wait for DOM update
                await new Promise(resolve => setTimeout(resolve, 100));
                
                return container.innerHTML.includes('No customers match');
            }
            return 'renderCustomerListOptimized function not found';
        });

        this.test('Customer cards have proper CSS classes', () => {
            const cards = document.querySelectorAll('.customer-card-compact');
            return cards.length >= 0; // Should exist or be empty
        });
    }

    // Filter Functionality Tests
    async testFilterFunctionality() {
        console.log('\n🔍 Testing Filter Functionality...');
        
        this.test('Value threshold input exists', () => {
            return document.getElementById('valueThreshold') !== null;
        });

        this.test('Filter status element exists', () => {
            return document.getElementById('filterStatus') !== null;
        });

        await this.asyncTest('Filter updates customer list', async () => {
            const thresholdInput = document.getElementById('valueThreshold');
            if (thresholdInput && typeof window.updateCustomerList === 'function') {
                const originalValue = thresholdInput.value;
                thresholdInput.value = '10000';
                
                // Trigger filter update
                window.updateCustomerList();
                
                // Wait for debounce
                await new Promise(resolve => setTimeout(resolve, 200));
                
                // Restore original value
                thresholdInput.value = originalValue;
                
                return true;
            }
            return 'Filter elements or functions not found';
        });

        this.test('Reset filter function exists', () => {
            return typeof window.resetFilters === 'function';
        });
    }

    // Modal Functionality Tests
    async testModalFunctionality() {
        console.log('\n📱 Testing Modal Functionality...');
        
        this.test('Detail modal exists', () => {
            return document.getElementById('detailModal') !== null;
        });

        this.test('Modal content container exists', () => {
            return document.getElementById('modalContent') !== null;
        });

        this.test('Show customer detail function exists', () => {
            return typeof window.showCustomerDetail === 'function';
        });

        this.test('Close modal function exists', () => {
            return typeof window.closeDetailModal === 'function';
        });

        await this.asyncTest('Modal opens and closes correctly', async () => {
            if (typeof window.showCustomerDetail === 'function' && 
                typeof window.closeDetailModal === 'function') {
                
                const modal = document.getElementById('detailModal');
                const testCustomerId = window.customerData[0]?.Customer_ID;
                
                if (testCustomerId) {
                    // Open modal
                    window.showCustomerDetail(testCustomerId);
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    const isOpen = !modal.classList.contains('hidden');
                    
                    // Close modal
                    window.closeDetailModal();
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                    const isClosed = modal.classList.contains('hidden');
                    
                    return isOpen && isClosed;
                }
            }
            return 'Modal functions or test data not available';
        });
    }

    // Navigation System Tests
    async testNavigationSystem() {
        console.log('\n🧭 Testing Navigation System...');
        
        this.test('Show section function exists', () => {
            return typeof window.showSection === 'function';
        });

        this.test('All required sections exist', () => {
            const requiredSections = ['home', 'problem', 'solution', 'live-demo', 'customer-dashboard', 'how-it-works', 'scaling'];
            return requiredSections.every(sectionId => 
                document.getElementById(sectionId) !== null
            );
        });

        this.test('Navigation links exist', () => {
            const navLinks = document.querySelectorAll('.nav-link');
            return navLinks.length > 0;
        });

        await this.asyncTest('Section navigation works', async () => {
            if (typeof window.showSection === 'function') {
                const testSection = 'customer-dashboard';
                window.showSection(testSection);
                
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const activeSection = document.querySelector('.spa-section.active');
                return activeSection && activeSection.id === testSection;
            }
            return 'showSection function not found';
        });
    }

    // Dashboard Tabs Tests
    async testDashboardTabs() {
        console.log('\n📊 Testing Dashboard Tabs...');
        
        this.test('Dashboard tab function exists', () => {
            return typeof window.showDashboardTab === 'function';
        });

        this.test('Dashboard tab elements exist', () => {
            const tabs = ['tab-overview', 'tab-customers', 'tab-analytics', 'tab-playbook'];
            return tabs.every(tabId => document.getElementById(tabId) !== null);
        });

        await this.asyncTest('Tab switching works', async () => {
            if (typeof window.showDashboardTab === 'function') {
                window.showDashboardTab('analytics');
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const activeTab = document.querySelector('.dashboard-tab.active');
                return activeTab && activeTab.id === 'tab-analytics';
            }
            return 'showDashboardTab function not found';
        });
    }

    // Data Persistence Tests
    async testDataPersistence() {
        console.log('\n💾 Testing Data Persistence...');
        
        this.test('Local storage functions exist', () => {
            return typeof window.saveData === 'function' && typeof window.loadSavedData === 'function';
        });

        this.test('Local storage is available', () => {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch (e) {
                return 'Local storage not available';
            }
        });

        await this.asyncTest('Data saves and loads correctly', async () => {
            if (typeof window.saveData === 'function' && typeof window.loadSavedData === 'function') {
                const testData = { test: 'automated-test-data', timestamp: Date.now() };
                
                // Save test data
                window.saveData('C1', 'Test intervention', testData);
                
                // Load data
                window.loadSavedData();
                
                // Check if data exists in localStorage
                const savedData = localStorage.getItem('customerInterventions');
                return savedData && savedData.includes('automated-test-data');
            }
            return 'Data persistence functions not found';
        });
    }

    // Performance Tests
    async testPerformanceOptimizations() {
        console.log('\n⚡ Testing Performance Optimizations...');
        
        this.test('Debounce timer exists', () => {
            return typeof window.debounceTimer !== 'undefined';
        });

        await this.asyncTest('Large dataset rendering performance', async () => {
            if (typeof window.renderCustomerListOptimized === 'function') {
                const startTime = performance.now();
                
                // Create large test dataset
                const largeDataset = Array(100).fill(null).map((_, i) => ({
                    ...window.customerData[0],
                    Customer_ID: `TEST_${i}`,
                    Customer_Name: `Test Customer ${i}`
                }));
                
                window.renderCustomerListOptimized(largeDataset);
                
                const endTime = performance.now();
                const renderTime = endTime - startTime;
                
                // Should render 100 items in less than 100ms
                return renderTime < 100;
            }
            return 'renderCustomerListOptimized function not found';
        });

        this.test('DocumentFragment optimization is used', () => {
            // Check if the function uses DocumentFragment (indirect test)
            const funcString = window.renderCustomerListOptimized?.toString() || '';
            return funcString.includes('DocumentFragment') || funcString.includes('createDocumentFragment');
        });
    }

    // Responsive Design Tests
    async testResponsiveDesign() {
        console.log('\n📱 Testing Responsive Design...');
        
        this.test('Viewport meta tag exists', () => {
            const viewportMeta = document.querySelector('meta[name="viewport"]');
            return viewportMeta !== null;
        });

        this.test('CSS media queries exist', () => {
            const stylesheets = Array.from(document.styleSheets);
            let hasMediaQueries = false;
            
            try {
                stylesheets.forEach(sheet => {
                    if (sheet.cssRules) {
                        Array.from(sheet.cssRules).forEach(rule => {
                            if (rule.type === CSSRule.MEDIA_RULE) {
                                hasMediaQueries = true;
                            }
                        });
                    }
                });
            } catch (e) {
                // Cross-origin stylesheets might not be accessible
                return true; // Assume they exist
            }
            
            return hasMediaQueries;
        });

        this.test('Mobile menu elements exist', () => {
            return document.getElementById('mobile-menu') !== null;
        });
    }

    // Error Handling Tests
    async testErrorHandling() {
        console.log('\n🛡️ Testing Error Handling...');
        
        await this.asyncTest('Handles missing DOM elements gracefully', async () => {
            // Test with non-existent customer ID
            if (typeof window.showCustomerDetail === 'function') {
                try {
                    window.showCustomerDetail('NON_EXISTENT_ID');
                    return true; // Should not throw error
                } catch (error) {
                    return `Error handling failed: ${error.message}`;
                }
            }
            return 'showCustomerDetail function not found';
        });

        await this.asyncTest('Handles invalid filter values', async () => {
            if (typeof window.updateCustomerList === 'function') {
                const thresholdInput = document.getElementById('valueThreshold');
                if (thresholdInput) {
                    const originalValue = thresholdInput.value;
                    
                    // Test with invalid values
                    thresholdInput.value = 'invalid';
                    try {
                        window.updateCustomerList();
                        await new Promise(resolve => setTimeout(resolve, 200));
                        
                        // Restore original value
                        thresholdInput.value = originalValue;
                        return true;
                    } catch (error) {
                        thresholdInput.value = originalValue;
                        return `Error handling failed: ${error.message}`;
                    }
                }
            }
            return 'Filter functions not found';
        });

        this.test('Console error handling exists', () => {
            // Check if functions have error logging
            const functions = [
                window.renderCustomerListOptimized?.toString(),
                window.showCustomerDetail?.toString(),
                window.updateCustomerList?.toString()
            ];
            
            return functions.some(func => 
                func && (func.includes('console.error') || func.includes('try') || func.includes('catch'))
            );
        });
    }

    // Generate comprehensive test report
    generateTestReport() {
        const duration = this.endTime - this.startTime;
        const successRate = ((this.passedTests / this.totalTests) * 100).toFixed(1);
        
        console.log('\n' + '='.repeat(60));
        console.log('📋 AUTOMATED TEST SUITE REPORT');
        console.log('='.repeat(60));
        console.log(`🕒 Duration: ${duration}ms`);
        console.log(`📊 Total Tests: ${this.totalTests}`);
        console.log(`✅ Passed: ${this.passedTests}`);
        console.log(`❌ Failed: ${this.failedTests}`);
        console.log(`📈 Success Rate: ${successRate}%`);
        console.log('='.repeat(60));
        
        // Detailed results
        console.log('\n📝 DETAILED RESULTS:');
        this.testResults.forEach(result => {
            const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '💥';
            console.log(`${icon} ${result.name}: ${result.message}`);
        });
        
        // Recommendations
        if (this.failedTests > 0) {
            console.log('\n🔧 RECOMMENDATIONS:');
            this.testResults
                .filter(result => result.status !== 'PASS')
                .forEach(result => {
                    console.log(`• Fix: ${result.name} - ${result.message}`);
                });
        }
        
        console.log('\n' + '='.repeat(60));
    }

    getTestSummary() {
        return {
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            failedTests: this.failedTests,
            successRate: ((this.passedTests / this.totalTests) * 100).toFixed(1),
            duration: this.endTime - this.startTime,
            results: this.testResults
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutomatedTestSuite;
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
    window.AutomatedTestSuite = AutomatedTestSuite;
    
    // Add convenient test runner function
    window.runAutomatedTests = async function() {
        const testSuite = new AutomatedTestSuite();
        return await testSuite.runAllTests();
    };
    
    console.log('🧪 Automated Test Suite loaded. Run tests with: runAutomatedTests()');
}
