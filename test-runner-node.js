#!/usr/bin/env node

/**
 * Node.js Test Runner for CI/CD Pipeline
 * Runs automated tests in headless environment
 */

const fs = require('fs');
const path = require('path');

class NodeTestRunner {
    constructor() {
        this.results = [];
        this.config = {
            timeout: 30000,
            retries: 2,
            verbose: process.argv.includes('--verbose'),
            output: process.argv.includes('--output') ? process.argv[process.argv.indexOf('--output') + 1] : 'test-results.json'
        };
    }

    // Mock browser environment
    setupMockEnvironment() {
        global.window = {
            localStorage: {
                data: {},
                setItem: (key, value) => { this.data[key] = value; },
                getItem: (key) => this.data[key] || null,
                removeItem: (key) => { delete this.data[key]; },
                clear: () => { this.data = {}; }
            },
            document: {
                getElementById: (id) => ({
                    value: '5000',
                    textContent: '',
                    innerHTML: '',
                    classList: {
                        contains: () => false,
                        add: () => {},
                        remove: () => {},
                        toggle: () => {}
                    },
                    style: {},
                    children: [],
                    appendChild: () => {},
                    removeChild: () => {},
                    click: () => {},
                    focus: () => {},
                    dispatchEvent: () => {}
                }),
                querySelector: () => null,
                querySelectorAll: () => [],
                createElement: () => ({
                    style: {},
                    classList: { add: () => {}, remove: () => {} },
                    appendChild: () => {},
                    click: () => {}
                }),
                head: { appendChild: () => {} },
                body: { appendChild: () => {}, removeChild: () => {} }
            },
            navigator: {
                userAgent: 'Node.js Test Runner',
                platform: 'Node.js',
                language: 'en-US',
                cookieEnabled: true,
                onLine: true
            },
            performance: {
                now: () => Date.now(),
                memory: {
                    usedJSHeapSize: 1000000,
                    totalJSHeapSize: 2000000,
                    jsHeapSizeLimit: 4000000
                },
                timing: {
                    navigationStart: Date.now() - 1000,
                    loadEventEnd: Date.now(),
                    domContentLoadedEventEnd: Date.now() - 500
                }
            },
            URL: {
                createObjectURL: () => 'mock-url',
                revokeObjectURL: () => {}
            },
            Blob: class MockBlob {
                constructor(data) { this.data = data; }
            }
        };

        global.document = global.window.document;
        global.localStorage = global.window.localStorage;
    }

    // Load test framework
    loadTestFramework() {
        try {
            const frameworkCode = fs.readFileSync(path.join(__dirname, 'test-framework.js'), 'utf8');
            eval(frameworkCode);
            
            // Make testFramework available globally
            global.testFramework = global.window.testFramework;
            
            return true;
        } catch (error) {
            console.error('❌ Failed to load test framework:', error.message);
            return false;
        }
    }

    // Mock customer data and functions
    setupMockData() {
        global.customerData = [
            { Customer_ID: "C1", Customer_Name: "Test Corp", LTV: 8500, riskScore: 85, topDrivers: ["Inactivity [Actionable]", "Low Usage"], notes: "", Contract: "Annual", Root_Cause: "Service Quality", Call_Failure: "High", Price_Views: 3, Days_Inactive: 7, Survey_Score: 2.1 },
            { Customer_ID: "C2", Customer_Name: "Test Inc", LTV: 12000, riskScore: 65, topDrivers: ["Contract renewal"], notes: "", Contract: "Monthly", Root_Cause: "Product Disengagement", Call_Failure: "Low", Price_Views: 1, Days_Inactive: 2, Survey_Score: 3.8 },
            { Customer_ID: "C3", Customer_Name: "Test Ltd", LTV: 18500, riskScore: 92, topDrivers: ["Low Usage [Actionable]", "Billing issue"], notes: "", Contract: "Annual", Root_Cause: "Network Issues", Call_Failure: "High", Price_Views: 5, Days_Inactive: 12, Survey_Score: 1.9 }
        ];

        global.MOCK_CUSTOMERS = global.customerData.map(customer => ({
            Customer_ID: customer.Customer_ID,
            Contract_Type: customer.Contract,
            Customer_Name: customer.Customer_Name,
            Monthly_Charge: Math.round(customer.LTV / 12),
            LTV: customer.LTV,
            Has_Early_Termination_Fee: customer.riskScore < 60 ? 1 : 0,
            Total_Data_Usage: 50 + (parseInt(customer.Customer_ID.substring(1)) * 10),
            Days_Since_Last_Login: customer.Days_Inactive,
            Support_Tickets_Last_90_Days: customer.riskScore >= 80 ? 3 : 1,
            Call_Failure_Rate: customer.Call_Failure === 'High' ? 0.08 : 0.02,
            Recent_Pricing_Page_Views: customer.Price_Views,
            Device_Upgrade_Inquiry: customer.riskScore >= 80,
            Last_Survey_Score: customer.Survey_Score,
            Churn_Flag: customer.riskScore >= 80,
            Risk_Score: customer.riskScore,
            Root_Cause_Tag: customer.Root_Cause,
            name: customer.Customer_Name,
            arr: customer.LTV,
            riskScore: customer.riskScore,
            topDrivers: customer.topDrivers,
            notes: customer.notes
        }));

        // Mock functions
        global.prioritizeCustomers = () => {
            const threshold = parseInt(global.window.document.getElementById('valueThreshold').value) || 5000;
            return global.customerData.filter(c => c.LTV >= threshold).sort((a, b) => b.riskScore - a.riskScore);
        };

        global.generateSingleActionRecommendation = (customer) => {
            if (!customer) return 'Monitor customer closely for emerging risk signals.';
            const actionableDrivers = customer.topDrivers.filter(driver => driver.includes('[Actionable]'));
            if (actionableDrivers.length === 0) {
                return `Monitor ${customer.Customer_Name} closely for any emerging risk signals.`;
            }
            return `Schedule immediate check-in call with ${customer.Customer_Name} to address ${actionableDrivers[0]}.`;
        };

        global.generateModalContent = (customer) => {
            if (!customer) return '';
            return `<div>Customer: ${customer.Customer_Name}, Risk: ${customer.riskScore}%</div>`;
        };

        global.renderCustomerList = (data) => {
            const container = global.window.document.getElementById('customerListContainer');
            if (container) {
                container.children = Array(data.length).fill({});
            }
        };

        global.showCustomerDetail = (customerId) => {
            const modal = global.window.document.getElementById('detailModal');
            if (modal) {
                modal.classList.contains = () => false;
            }
        };

        global.hideCustomerDetail = () => {
            const modal = global.window.document.getElementById('detailModal');
            if (modal) {
                modal.classList.contains = () => true;
            }
        };

        global.updateCustomerList = () => {
            const prioritized = global.prioritizeCustomers();
            global.renderCustomerList(prioritized);
        };

        global.updateFilterStatus = () => {
            const status = global.window.document.getElementById('filterStatus');
            if (status) {
                status.innerHTML = 'Filter active';
            }
        };

        global.resetFilters = () => {
            global.window.document.getElementById('valueThreshold').value = '5000';
        };

        global.saveNoteLocally = (customerId) => {
            const customer = global.customerData.find(c => c.Customer_ID === customerId);
            if (customer) {
                customer.notes = 'Test note';
                global.window.localStorage.setItem('churn-dashboard-customerData', JSON.stringify(global.customerData));
            }
        };

        global.loadSavedData = () => {
            const saved = global.window.localStorage.getItem('churn-dashboard-customerData');
            if (saved) {
                global.customerData = JSON.parse(saved);
            }
        };
    }

    // Run tests
    async runTests() {
        console.log('🚀 Starting Node.js Test Runner');
        console.log('='.repeat(50));

        this.setupMockEnvironment();
        
        if (!this.loadTestFramework()) {
            return { success: false, error: 'Failed to load test framework' };
        }

        this.setupMockData();

        try {
            // Load and run unit tests
            const unitTestsCode = fs.readFileSync(path.join(__dirname, 'unit-tests.js'), 'utf8');
            eval(unitTestsCode);

            const results = await testFramework.runTests();
            
            const summary = {
                success: results.failed === 0,
                totalTests: results.total,
                passed: results.passed,
                failed: results.failed,
                duration: results.duration,
                successRate: results.successRate,
                timestamp: new Date().toISOString(),
                environment: 'Node.js',
                results: results.results
            };

            // Save results
            fs.writeFileSync(this.config.output, JSON.stringify(summary, null, 2));

            // Display results
            console.log('\n📊 TEST RESULTS');
            console.log('='.repeat(50));
            console.log(`✅ Passed: ${results.passed}`);
            console.log(`❌ Failed: ${results.failed}`);
            console.log(`📈 Success Rate: ${results.successRate.toFixed(1)}%`);
            console.log(`⏱️  Duration: ${results.duration}ms`);
            console.log(`📄 Results saved to: ${this.config.output}`);

            if (results.failed > 0) {
                console.log('\n❌ FAILURES:');
                results.results.filter(r => !r.passed).forEach(failure => {
                    console.log(`  - ${failure.name}: ${failure.message}`);
                });
            }

            return summary;
        } catch (error) {
            console.error('❌ Test execution failed:', error.message);
            return { success: false, error: error.message };
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const runner = new NodeTestRunner();
    runner.runTests().then(results => {
        process.exit(results.success ? 0 : 1);
    }).catch(error => {
        console.error('💥 Test runner crashed:', error.message);
        process.exit(1);
    });
}

module.exports = NodeTestRunner;
