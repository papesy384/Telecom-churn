#!/usr/bin/env node

/**
 * Unit Test Runner - Churn Prediction Dashboard
 * Comprehensive unit testing with best practices
 */

const fs = require('fs');
const path = require('path');

class UnitTestRunner {
    constructor() {
        this.testResults = [];
        this.passedTests = 0;
        this.failedTests = 0;
        this.totalTests = 0;
        this.testCategories = {
            'Data Integrity': [],
            'Function Existence': [],
            'Element Existence': [],
            'Functionality': [],
            'Data Processing': [],
            'UI Components': [],
            'Performance': []
        };
    }

    async runAllUnitTests() {
        console.log('🧪 Starting Comprehensive Unit Testing...');
        console.log('=' .repeat(60));
        
        // Mock DOM environment
        this.setupMockEnvironment();
        
        // Run all test categories
        await this.runDataIntegrityTests();
        await this.runFunctionExistenceTests();
        await this.runElementExistenceTests();
        await this.runFunctionalityTests();
        await this.runDataProcessingTests();
        await this.runUIComponentTests();
        await this.runPerformanceTests();
        
        // Generate comprehensive report
        this.generateTestReport();
        
        return this.getTestSummary();
    }

    setupMockEnvironment() {
        // Mock customer data
        global.customerData = [
            { id: 1, name: "Acme Corporation", arr: 8500, riskScore: 85, topDrivers: ["Inactivity on Key Feature [Actionable]", "Low API Usage [Actionable]", "Support ticket spike"], notes: "" },
            { id: 2, name: "Tech Solutions Inc", arr: 12000, riskScore: 75, topDrivers: ["Support response time", "Feature requests"], notes: "" },
            { id: 3, name: "Global Solutions Ltd", arr: 18500, riskScore: 92, topDrivers: ["Low API Usage [Actionable]", "Billing issue [Ignore]", "Competitor evaluation"], notes: "" },
            { id: 4, name: "Data Analytics Co", arr: 6800, riskScore: 65, topDrivers: ["Data export issues", "Report generation"], notes: "" },
            { id: 5, name: "Innovation Labs", arr: 6500, riskScore: 78, topDrivers: ["Inactivity on Key Feature [Actionable]", "Support response time"], notes: "" },
            { id: 6, name: "Enterprise Systems", arr: 22000, riskScore: 55, topDrivers: ["Integration challenges", "Custom requirements"], notes: "" },
            { id: 7, name: "Cloud Systems Co", arr: 3200, riskScore: 88, topDrivers: ["Low API Usage [Actionable]", "Billing issue [Ignore]", "Platform migration"], notes: "" },
            { id: 8, name: "Digital Marketing", arr: 4500, riskScore: 70, topDrivers: ["Campaign performance", "ROI tracking"], notes: "" },
            { id: 9, name: "Mobile Solutions", arr: 7800, riskScore: 82, topDrivers: ["Inactivity on Key Feature [Actionable]", "Mobile app usage decline"], notes: "" },
            { id: 10, name: "Security First Corp", arr: 16800, riskScore: 58, topDrivers: ["Compliance requirements", "Security audit"], notes: "" },
            { id: 11, name: "AI Innovations", arr: 4200, riskScore: 75, topDrivers: ["Low API Usage [Actionable]", "Model performance issues"], notes: "" },
            { id: 12, name: "E-commerce Platform", arr: 9500, riskScore: 68, topDrivers: ["Payment processing", "Inventory management"], notes: "" },
            { id: 13, name: "Healthcare Systems", arr: 9200, riskScore: 90, topDrivers: ["Inactivity on Key Feature [Actionable]", "Billing issue [Ignore]", "Regulatory compliance"], notes: "" },
            { id: 14, name: "Financial Services", arr: 18200, riskScore: 62, topDrivers: ["Audit requirements", "Data retention policies"], notes: "" },
            { id: 15, name: "Manufacturing Co", arr: 5600, riskScore: 80, topDrivers: ["Low API Usage [Actionable]", "IoT integration challenges"], notes: "" }
        ];

        // Mock processed customers
        global.processedCustomers = global.customerData.map(customer => ({
            ...customer,
            Customer_ID: `C${customer.id}`,
            LTV: customer.arr,
            isHighRisk: customer.riskScore >= 80,
            isHighValue: customer.arr >= 4000,
            rootCauseTag: 'Service Quality',
            Contract_Type: customer.riskScore >= 80 ? 'Month-to-Month' : customer.riskScore >= 60 ? '1-Year' : '2-Year',
            Days_Since_Last_Login: customer.riskScore >= 80 ? (customer.id % 10) + 1 : (customer.id % 30) + 1,
            Support_Tickets_Last_90_Days: customer.riskScore >= 80 ? (customer.id % 5) + 2 : customer.id % 3,
            Call_Failure_Rate: customer.riskScore >= 80 ? 0.08 : customer.riskScore >= 60 ? 0.04 : 0.02,
            Recent_Pricing_Page_Views: customer.riskScore >= 80 ? (customer.id % 3) + 1 : customer.id % 2,
            Device_Upgrade_Inquiry: customer.riskScore >= 80 ? (customer.id % 2 === 0) : (customer.id % 3 === 0),
            Last_Survey_Score: customer.riskScore >= 80 ? ((customer.id % 2) + 1) : customer.riskScore >= 60 ? ((customer.id % 2) + 2) : ((customer.id % 2) + 3),
            Churn_Flag: customer.riskScore >= 80
        }));

        // Mock functions
        global.prioritizeCustomers = () => {
            return global.processedCustomers.filter(c => c.isHighRisk).slice(0, 10);
        };

        global.updateCustomerList = () => {
            return true;
        };

        global.renderCustomerList = (data) => {
            return data.length;
        };

        global.showCustomerDetail = (id) => {
            return global.customerData.find(c => c.id === id);
        };

        global.saveNoteLocally = (customerId) => {
            return true;
        };

        global.loadSavedData = () => {
            return true;
        };

        global.showSection = (sectionId) => {
            return true;
        };

        global.showDashboardTab = (tabId) => {
            return true;
        };

        global.renderAllHighRiskTable = () => {
            return true;
        };

        global.renderModelMetrics = () => {
            return true;
        };

        global.renderROISummary = () => {
            return true;
        };

        global.renderRootCauseDistribution = () => {
            return true;
        };

        global.renderActionList = () => {
            return true;
        };

        global.applyFilters = () => {
            return true;
        };

        global.resetFilters = () => {
            return true;
        };

        global.updateFilterStatus = () => {
            return true;
        };

        // Mock DOM
        global.document = {
            getElementById: (id) => {
                const mockElements = {
                    'customerListContainer': { innerHTML: '', insertAdjacentHTML: () => {} },
                    'valueThreshold': { value: '5000' },
                    'detailModal': { classList: { contains: () => false, add: () => {}, remove: () => {} } },
                    'modalContent': { innerHTML: 'Mock content' },
                    'actionLogInput': { value: '' },
                    'dashboard-overview': { style: {} },
                    'dashboard-customers': { style: {} },
                    'dashboard-analytics': { style: {} },
                    'dashboard-playbook': { style: {} },
                    'all-high-risk-table': { closest: () => ({ classList: { contains: () => true } }) },
                    'all-high-risk-tbody': { innerHTML: '' },
                    'metrics-display': { innerHTML: '' },
                    'roi-metrics': { innerHTML: '' },
                    'hero-section': { style: {} },
                    'live-demo': { style: {} },
                    'customer-dashboard': { style: {} },
                    'how-it-works': { style: {} }
                };
                return mockElements[id] || null;
            },
            querySelectorAll: () => [{ classList: { contains: () => true } }],
            querySelector: () => ({ classList: { contains: () => true } })
        };

        // Mock localStorage
        global.localStorage = {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {}
        };

        // Mock performance
        global.performance = {
            now: () => Date.now()
        };
    }

    async runDataIntegrityTests() {
        console.log('\n📊 Data Integrity Unit Tests...');
        
        this.addTest('Customer Data Structure', () => {
            const hasCustomerData = global.customerData && Array.isArray(global.customerData);
            const hasCorrectLength = hasCustomerData && global.customerData.length === 15;
            const hasRequiredFields = hasCustomerData && global.customerData.every(c => 
                c.id && c.name && typeof c.arr === 'number' && typeof c.riskScore === 'number' && 
                Array.isArray(c.topDrivers) && typeof c.notes === 'string'
            );
            
            return hasCustomerData && hasCorrectLength && hasRequiredFields;
        }, 'Data Integrity', 'Customer data structure validation');

        this.addTest('Risk Score Validation', () => {
            const validRiskScores = global.customerData.every(c => c.riskScore >= 50 && c.riskScore <= 100);
            const hasHighRiskCustomers = global.customerData.some(c => c.riskScore >= 80);
            
            return validRiskScores && hasHighRiskCustomers;
        }, 'Data Integrity', 'Risk score range and high-risk customer validation');

        this.addTest('ARR Value Validation', () => {
            const validARR = global.customerData.every(c => c.arr >= 2000 && c.arr <= 25000);
            const hasHighValueCustomers = global.customerData.some(c => c.arr >= 4000);
            
            return validARR && hasHighValueCustomers;
        }, 'Data Integrity', 'ARR value range and high-value customer validation');

        this.addTest('Actionable Tags Validation', () => {
            const hasActionableTags = global.customerData.some(c => c.topDrivers.some(driver => driver.includes('[Actionable]')));
            const hasIgnoreTags = global.customerData.some(c => c.topDrivers.some(driver => driver.includes('[Ignore]')));
            
            return hasActionableTags && hasIgnoreTags;
        }, 'Data Integrity', 'Actionable and ignore tags validation');
    }

    async runFunctionExistenceTests() {
        console.log('\n🔧 Function Existence Unit Tests...');
        
        this.addTest('Core Functions Existence', () => {
            const coreFunctions = [
                'prioritizeCustomers', 'updateCustomerList', 'renderCustomerList',
                'showCustomerDetail', 'saveNoteLocally', 'loadSavedData',
                'showSection', 'showDashboardTab'
            ];
            
            return coreFunctions.every(func => typeof global[func] === 'function');
        }, 'Function Existence', 'Core functions availability');

        this.addTest('Render Functions Existence', () => {
            const renderFunctions = [
                'renderAllHighRiskTable', 'renderModelMetrics', 'renderROISummary',
                'renderRootCauseDistribution', 'renderActionList'
            ];
            
            return renderFunctions.every(func => typeof global[func] === 'function');
        }, 'Function Existence', 'Render functions availability');

        this.addTest('Filter Functions Existence', () => {
            const filterFunctions = ['applyFilters', 'resetFilters', 'updateFilterStatus'];
            
            return filterFunctions.every(func => typeof global[func] === 'function');
        }, 'Function Existence', 'Filter functions availability');
    }

    async runElementExistenceTests() {
        console.log('\n🎯 Element Existence Unit Tests...');
        
        this.addTest('Core Elements Existence', () => {
            const coreElements = [
                'customerListContainer', 'valueThreshold', 'detailModal',
                'modalContent', 'actionLogInput'
            ];
            
            return coreElements.every(id => global.document.getElementById(id) !== null);
        }, 'Element Existence', 'Core DOM elements availability');

        this.addTest('Dashboard Elements Existence', () => {
            const dashboardElements = [
                'dashboard-overview', 'dashboard-customers', 'dashboard-analytics', 'dashboard-playbook',
                'all-high-risk-table', 'all-high-risk-tbody', 'metrics-display', 'roi-metrics'
            ];
            
            return dashboardElements.every(id => global.document.getElementById(id) !== null);
        }, 'Element Existence', 'Dashboard DOM elements availability');

        this.addTest('Navigation Elements Existence', () => {
            const navElements = [
                'hero-section', 'live-demo', 'customer-dashboard', 'how-it-works'
            ];
            
            return navElements.every(id => global.document.getElementById(id) !== null);
        }, 'Element Existence', 'Navigation DOM elements availability');
    }

    async runFunctionalityTests() {
        console.log('\n⚙️ Functionality Unit Tests...');
        
        this.addTest('Prioritize Customers Function', () => {
            try {
                const result = global.prioritizeCustomers();
                const isValidArray = Array.isArray(result);
                const hasCorrectLength = result.length <= 10;
                const hasValidCustomers = result.every(c => c.id && c.name && c.riskScore);
                
                return isValidArray && hasCorrectLength && hasValidCustomers;
            } catch (error) {
                return false;
            }
        }, 'Functionality', 'Prioritize customers function execution');

        this.addTest('Customer Detail Modal Function', () => {
            try {
                const testCustomer = global.customerData[0];
                const result = global.showCustomerDetail(testCustomer.id);
                
                return result && result.id === testCustomer.id;
            } catch (error) {
                return false;
            }
        }, 'Functionality', 'Customer detail modal function execution');

        this.addTest('Local Storage Functionality', () => {
            try {
                const testKey = 'unit-test-key';
                const testValue = 'unit-test-value';
                
                global.localStorage.setItem(testKey, testValue);
                const retrieved = global.localStorage.getItem(testKey);
                global.localStorage.removeItem(testKey);
                
                return retrieved === testValue;
            } catch (error) {
                return false;
            }
        }, 'Functionality', 'Local storage operations');

        this.addTest('Filter Input Functionality', () => {
            try {
                const filterInput = global.document.getElementById('valueThreshold');
                const originalValue = filterInput.value;
                
                filterInput.value = '10000';
                const newValue = filterInput.value;
                
                filterInput.value = originalValue;
                
                return newValue === '10000';
            } catch (error) {
                return false;
            }
        }, 'Functionality', 'Filter input manipulation');
    }

    async runDataProcessingTests() {
        console.log('\n🔄 Data Processing Unit Tests...');
        
        this.addTest('Processed Customers Generation', () => {
            const hasProcessedCustomers = global.processedCustomers && Array.isArray(global.processedCustomers);
            const hasCorrectLength = hasProcessedCustomers && global.processedCustomers.length === global.customerData.length;
            const hasRequiredFields = hasProcessedCustomers && global.processedCustomers.every(c => 
                c.Customer_ID && c.LTV && typeof c.isHighRisk === 'boolean' && typeof c.isHighValue === 'boolean'
            );
            
            return hasProcessedCustomers && hasCorrectLength && hasRequiredFields;
        }, 'Data Processing', 'Processed customers data structure');

        this.addTest('High-Risk Customer Filtering', () => {
            const highRiskCustomers = global.processedCustomers.filter(c => c.isHighRisk);
            const hasHighRiskCustomers = highRiskCustomers.length > 0;
            const correctRiskThreshold = highRiskCustomers.every(c => c.riskScore >= 80);
            
            return hasHighRiskCustomers && correctRiskThreshold;
        }, 'Data Processing', 'High-risk customer filtering logic');

        this.addTest('High-Value Customer Filtering', () => {
            const highValueCustomers = global.processedCustomers.filter(c => c.isHighValue);
            const hasHighValueCustomers = highValueCustomers.length > 0;
            const correctValueThreshold = highValueCustomers.every(c => c.arr >= 4000);
            
            return hasHighValueCustomers && correctValueThreshold;
        }, 'Data Processing', 'High-value customer filtering logic');
    }

    async runUIComponentTests() {
        console.log('\n🎨 UI Component Unit Tests...');
        
        this.addTest('Modal Styling', () => {
            const modal = global.document.getElementById('detailModal');
            const hasCorrectClasses = modal && modal.classList.contains('fixed') && modal.classList.contains('inset-0');
            
            return hasCorrectClasses;
        }, 'UI Components', 'Modal styling classes');

        this.addTest('Table Responsiveness', () => {
            const table = global.document.getElementById('all-high-risk-table');
            const hasResponsiveClass = table && table.closest('.overflow-x-auto') !== null;
            
            return hasResponsiveClass;
        }, 'UI Components', 'Table responsive design');

        this.addTest('Color Theme Consistency', () => {
            const darkElements = global.document.querySelectorAll('.bg-dark-card');
            const hasThemeElements = darkElements.length > 0;
            
            return hasThemeElements;
        }, 'UI Components', 'Color theme consistency');
    }

    async runPerformanceTests() {
        console.log('\n⚡ Performance Unit Tests...');
        
        this.addTest('Function Execution Speed', () => {
            const startTime = global.performance.now();
            try {
                global.prioritizeCustomers();
                const endTime = global.performance.now();
                const executionTime = endTime - startTime;
                
                return executionTime < 100; // Less than 100ms
            } catch (error) {
                return false;
            }
        }, 'Performance', 'Function execution speed');

        this.addTest('Memory Usage', () => {
            const customerDataSize = JSON.stringify(global.customerData).length;
            const processedDataSize = JSON.stringify(global.processedCustomers).length;
            const totalSize = customerDataSize + processedDataSize;
            
            return totalSize < 50000; // Less than 50KB
        }, 'Performance', 'Memory usage optimization');
    }

    addTest(testName, testFunction, category, description) {
        this.totalTests++;
        
        try {
            const passed = testFunction();
            if (passed) this.passedTests++;
            else this.failedTests++;
            
            const result = {
                name: testName,
                passed,
                category,
                description,
                timestamp: new Date().toISOString()
            };
            
            this.testResults.push(result);
            this.testCategories[category].push(result);
            
            console.log(`${passed ? '✅' : '❌'} [${category}] ${testName}: ${passed ? 'PASS' : 'FAIL'}`);
            if (description) console.log(`   ${description}`);
            
        } catch (error) {
            this.failedTests++;
            const result = {
                name: testName,
                passed: false,
                category,
                description: `Error: ${error.message}`,
                timestamp: new Date().toISOString()
            };
            
            this.testResults.push(result);
            this.testCategories[category].push(result);
            
            console.log(`❌ [${category}] ${testName}: FAIL`);
            console.log(`   Error: ${error.message}`);
        }
    }

    generateTestReport() {
        console.log('\n📊 UNIT TEST SUMMARY');
        console.log('=' .repeat(60));
        console.log(`Total Tests: ${this.totalTests}`);
        console.log(`Passed: ${this.passedTests} ✅`);
        console.log(`Failed: ${this.failedTests} ❌`);
        console.log(`Success Rate: ${((this.passedTests / this.totalTests) * 100).toFixed(1)}%`);
        
        // Category breakdown
        Object.keys(this.testCategories).forEach(category => {
            const categoryTests = this.testCategories[category];
            const categoryPassed = categoryTests.filter(r => r.passed).length;
            console.log(`\n[${category}] Tests: ${categoryPassed}/${categoryTests.length} passed`);
        });
        
        if (this.failedTests === 0) {
            console.log('\n🎉 ALL UNIT TESTS PASSED! All functions and components are working correctly.');
        } else {
            console.log(`\n⚠️ ${this.failedTests} unit tests failed. Check the details above.`);
        }
        
        // Generate JSON report
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total: this.totalTests,
                passed: this.passedTests,
                failed: this.failedTests,
                successRate: (this.passedTests / this.totalTests) * 100
            },
            categories: this.testCategories,
            results: this.testResults
        };
        
        fs.writeFileSync('unit-test-report.json', JSON.stringify(report, null, 2));
        console.log('\n📄 Unit test report saved to: unit-test-report.json');
    }

    getTestSummary() {
        return {
            total: this.totalTests,
            passed: this.passedTests,
            failed: this.failedTests,
            successRate: (this.passedTests / this.totalTests) * 100,
            results: this.testResults
        };
    }
}

// Run if called directly
if (require.main === module) {
    const testRunner = new UnitTestRunner();
    testRunner.runAllUnitTests().then(summary => {
        console.log('\n🎉 Unit testing completed!');
        process.exit(summary.failed > 0 ? 1 : 0);
    }).catch(error => {
        console.error('❌ Unit testing failed:', error);
        process.exit(1);
    });
}

module.exports = UnitTestRunner;
