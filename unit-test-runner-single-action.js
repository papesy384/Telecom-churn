#!/usr/bin/env node

/**
 * Node.js Command-Line Test Runner for generateSingleActionRecommendation Function
 * Comprehensive unit tests covering all edge cases and scenarios
 */

const fs = require('fs');
const path = require('path');

// Enhanced version of the function with better error handling
function generateSingleActionRecommendation(customer) {
    // Input validation
    if (!customer || typeof customer !== 'object') {
        throw new TypeError('Customer must be a valid object');
    }
    
    if (!customer.name || typeof customer.name !== 'string') {
        throw new TypeError('Customer name is required and must be a string');
    }
    
    if (!customer.topDrivers || !Array.isArray(customer.topDrivers)) {
        throw new TypeError('Customer topDrivers must be an array');
    }
    
    // Filter actionable drivers, handling null/undefined elements
    const actionableDrivers = customer.topDrivers.filter(driver => 
        driver && typeof driver === 'string' && driver.includes('[Actionable]')
    );
    
    if (actionableDrivers.length === 0) {
        return `Monitor ${customer.name} closely for any emerging risk signals. Current drivers suggest stable usage patterns.`;
    }
    
    const primaryDriver = actionableDrivers[0];
    
    // Generate specific recommendations based on actionable drivers
    if (primaryDriver.includes('Inactivity on Key Feature')) {
        return `Schedule immediate feature walkthrough call with ${customer.name}'s primary contact. Demonstrate advanced features they haven't used and provide personalized training session. Follow up within 48 hours with usage metrics.`;
    } else if (primaryDriver.includes('Low API Usage')) {
        return `Reach out to ${customer.name}'s technical team to understand integration challenges. Offer API optimization consultation and provide developer resources. Consider offering integration support credits.`;
    } else if (primaryDriver.includes('Billing issue')) {
        return `Contact ${customer.name}'s finance team directly to resolve billing concerns. Offer flexible payment terms or billing adjustments if appropriate. Ensure billing contact has direct line to account manager.`;
    } else if (primaryDriver.includes('Support ticket spike')) {
        return `Escalate ${customer.name}'s support tickets to senior support engineer. Schedule proactive check-in call to address root cause of issues. Consider temporary dedicated support channel.`;
    } else if (primaryDriver.includes('Contract renewal approaching')) {
        return `Initiate renewal conversation 90 days early with ${customer.name}. Prepare value demonstration showing ROI and usage analytics. Offer early renewal incentives.`;
    } else if (primaryDriver.includes('Feature adoption decline')) {
        return `Send personalized feature adoption report to ${customer.name} with specific recommendations. Schedule product demo focusing on unused features that match their use case.`;
    } else {
        return `Schedule immediate executive check-in call with ${customer.name} to discuss current challenges and opportunities. Prepare customized success plan based on their specific needs.`;
    }
}

class ComprehensiveTestSuite {
    constructor() {
        this.tests = [];
        this.results = [];
        this.passed = 0;
        this.failed = 0;
        this.startTime = Date.now();
    }

    // Test assertion methods
    assert(condition, testName, expected, actual) {
        const result = {
            test: testName,
            status: condition ? 'PASS' : 'FAIL',
            expected,
            actual,
            timestamp: new Date().toISOString()
        };
        
        this.results.push(result);
        
        if (condition) {
            this.passed++;
            console.log(`✅ ${testName}`);
        } else {
            this.failed++;
            console.log(`❌ ${testName}`);
            console.log(`   Expected: ${expected}`);
            console.log(`   Actual: ${actual}`);
        }
    }

    assertThrows(fn, testName, expectedError) {
        try {
            fn();
            this.assert(false, testName, `Should throw ${expectedError}`, 'No error thrown');
        } catch (error) {
            this.assert(true, testName, expectedError, error.message);
        }
    }

    assertContains(text, substring, testName) {
        const condition = text.includes(substring);
        this.assert(condition, testName, `Should contain "${substring}"`, text);
    }

    assertNotContains(text, substring, testName) {
        const condition = !text.includes(substring);
        this.assert(condition, testName, `Should not contain "${substring}"`, text);
    }

    // Test categories
    runAllTests() {
        console.log('🧪 Starting Comprehensive Unit Tests for generateSingleActionRecommendation\n');
        console.log('=' * 80);
        
        this.testNullAndUndefinedInputs();
        this.testInvalidTypes();
        this.testEmptyAndMissingProperties();
        this.testValidCustomerScenarios();
        this.testEdgeCases();
        this.testSpecialCharacters();
        this.testLongStrings();
        this.testArrayEdgeCases();
        this.testPerformance();
        this.testSecurity();
        
        this.printSummary();
        this.generateReport();
        
        return this.getResults();
    }

    testNullAndUndefinedInputs() {
        console.log('\n📋 Testing Null and Undefined Inputs...');
        
        this.assertThrows(
            () => generateSingleActionRecommendation(null),
            'Null input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(undefined),
            'Undefined input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(),
            'No parameters should throw TypeError',
            'TypeError'
        );
    }

    testInvalidTypes() {
        console.log('\n📋 Testing Invalid Type Inputs...');
        
        // Primitive types
        this.assertThrows(
            () => generateSingleActionRecommendation('invalid string'),
            'String input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(123),
            'Number input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(true),
            'Boolean input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(false),
            'Boolean false input should throw TypeError',
            'TypeError'
        );
        
        // Complex types
        this.assertThrows(
            () => generateSingleActionRecommendation([1, 2, 3]),
            'Array input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(() => {}),
            'Function input should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(new Date()),
            'Date input should throw TypeError',
            'TypeError'
        );
    }

    testEmptyAndMissingProperties() {
        console.log('\n📋 Testing Empty Objects and Missing Properties...');
        
        // Empty object
        this.assertThrows(
            () => generateSingleActionRecommendation({}),
            'Empty object should throw TypeError',
            'TypeError'
        );
        
        // Missing name property
        this.assertThrows(
            () => generateSingleActionRecommendation({ topDrivers: [] }),
            'Missing name property should throw TypeError',
            'TypeError'
        );
        
        // Missing topDrivers property
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 'Test Customer' }),
            'Missing topDrivers property should throw TypeError',
            'TypeError'
        );
        
        // Invalid name types
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: null, topDrivers: [] }),
            'Null name should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 123, topDrivers: [] }),
            'Number name should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: [], topDrivers: [] }),
            'Array name should throw TypeError',
            'TypeError'
        );
        
        // Invalid topDrivers types
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 'Test', topDrivers: null }),
            'Null topDrivers should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 'Test', topDrivers: 'not an array' }),
            'String topDrivers should throw TypeError',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 'Test', topDrivers: 123 }),
            'Number topDrivers should throw TypeError',
            'TypeError'
        );
    }

    testValidCustomerScenarios() {
        console.log('\n📋 Testing Valid Customer Scenarios...');
        
        // Customer with Inactivity on Key Feature
        const customer1 = {
            name: 'Acme Corporation',
            topDrivers: ['Inactivity on Key Feature [Actionable]', 'Low usage', 'Support tickets']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'feature walkthrough call', 'Inactivity recommendation should contain walkthrough');
        this.assertContains(result1, 'Acme Corporation', 'Result should contain customer name');
        this.assertContains(result1, 'primary contact', 'Result should mention primary contact');
        
        // Customer with Low API Usage
        const customer2 = {
            name: 'TechStart Inc',
            topDrivers: ['Low API Usage [Actionable]', 'Integration issues', 'Developer concerns']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'technical team', 'API usage recommendation should mention technical team');
        this.assertContains(result2, 'TechStart Inc', 'Result should contain customer name');
        this.assertContains(result2, 'API optimization', 'Result should mention API optimization');
        
        // Customer with Billing issue
        const customer3 = {
            name: 'Global Solutions Ltd',
            topDrivers: ['Billing issue [Actionable]', 'Payment delay', 'Invoice problems']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'finance team', 'Billing recommendation should mention finance team');
        this.assertContains(result3, 'Global Solutions Ltd', 'Result should contain customer name');
        this.assertContains(result3, 'billing concerns', 'Result should mention billing concerns');
        
        // Customer with Support ticket spike
        const customer4 = {
            name: 'Enterprise Dynamics',
            topDrivers: ['Support ticket spike [Actionable]', 'Multiple issues', 'Escalation needed']
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, 'support tickets', 'Support recommendation should mention support tickets');
        this.assertContains(result4, 'Enterprise Dynamics', 'Result should contain customer name');
        this.assertContains(result4, 'senior support engineer', 'Result should mention senior support');
        
        // Customer with Contract renewal approaching
        const customer5 = {
            name: 'Innovation Labs',
            topDrivers: ['Contract renewal approaching [Actionable]', 'Renewal due', 'Negotiation needed']
        };
        const result5 = generateSingleActionRecommendation(customer5);
        this.assertContains(result5, 'renewal conversation', 'Renewal recommendation should mention renewal conversation');
        this.assertContains(result5, 'Innovation Labs', 'Result should contain customer name');
        this.assertContains(result5, '90 days early', 'Result should mention early renewal');
        
        // Customer with Feature adoption decline
        const customer6 = {
            name: 'Digital Ventures',
            topDrivers: ['Feature adoption decline [Actionable]', 'Low engagement', 'Usage drop']
        };
        const result6 = generateSingleActionRecommendation(customer6);
        this.assertContains(result6, 'feature adoption report', 'Adoption recommendation should mention adoption report');
        this.assertContains(result6, 'Digital Ventures', 'Result should contain customer name');
        this.assertContains(result6, 'product demo', 'Result should mention product demo');
        
        // Customer with no actionable drivers
        const customer7 = {
            name: 'Stable Customer Corp',
            topDrivers: ['Regular usage', 'No issues', 'Happy customer', 'Growing adoption']
        };
        const result7 = generateSingleActionRecommendation(customer7);
        this.assertContains(result7, 'Monitor', 'No actionable drivers should trigger monitoring');
        this.assertContains(result7, 'Stable Customer Corp', 'Result should contain customer name');
        this.assertContains(result7, 'stable usage patterns', 'Result should mention stable patterns');
        
        // Customer with unknown actionable driver
        const customer8 = {
            name: 'Mystery Company',
            topDrivers: ['Unknown Issue [Actionable]', 'Random problem', 'Unclear cause']
        };
        const result8 = generateSingleActionRecommendation(customer8);
        this.assertContains(result8, 'executive check-in', 'Unknown driver should trigger executive check-in');
        this.assertContains(result8, 'Mystery Company', 'Result should contain customer name');
        this.assertContains(result8, 'customized success plan', 'Result should mention success plan');
    }

    testEdgeCases() {
        console.log('\n📋 Testing Edge Cases...');
        
        // Customer with empty topDrivers array
        const customer1 = {
            name: 'Empty Drivers Customer',
            topDrivers: []
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'Monitor', 'Empty drivers should trigger monitoring');
        this.assertContains(result1, 'Empty Drivers Customer', 'Result should contain customer name');
        
        // Customer with only ignore drivers
        const customer2 = {
            name: 'Ignore Only Customer',
            topDrivers: ['Billing issue [Ignore]', 'Low priority [Ignore]', 'Not urgent [Ignore]']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'Monitor', 'Only ignore drivers should trigger monitoring');
        this.assertContains(result2, 'Ignore Only Customer', 'Result should contain customer name');
        
        // Customer with mixed actionable and ignore drivers
        const customer3 = {
            name: 'Mixed Drivers Customer',
            topDrivers: ['Inactivity on Key Feature [Actionable]', 'Billing issue [Ignore]', 'Low priority [Ignore]']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'feature walkthrough', 'Should prioritize actionable driver');
        this.assertContains(result3, 'Mixed Drivers Customer', 'Result should contain customer name');
        
        // Customer with multiple actionable drivers
        const customer4 = {
            name: 'Multiple Actionable Customer',
            topDrivers: ['Low API Usage [Actionable]', 'Inactivity on Key Feature [Actionable]', 'Billing issue [Actionable]']
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, 'technical team', 'Should use first actionable driver');
        this.assertContains(result4, 'Multiple Actionable Customer', 'Result should contain customer name');
        
        // Customer with whitespace-only drivers
        const customer5 = {
            name: 'Whitespace Customer',
            topDrivers: ['   ', '\t', '\n', 'Inactivity on Key Feature [Actionable]']
        };
        const result5 = generateSingleActionRecommendation(customer5);
        this.assertContains(result5, 'feature walkthrough', 'Should handle whitespace drivers');
        this.assertContains(result5, 'Whitespace Customer', 'Result should contain customer name');
    }

    testSpecialCharacters() {
        console.log('\n📋 Testing Special Characters...');
        
        // Customer name with special characters
        const customer1 = {
            name: 'Customer & Co. (Ltd.)',
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'Customer & Co. (Ltd.)', 'Special characters in name should be preserved');
        
        // Customer name with quotes
        const customer2 = {
            name: 'Customer "Special" Name',
            topDrivers: ['Low API Usage [Actionable]']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'Customer "Special" Name', 'Quotes in name should be preserved');
        
        // Customer name with unicode characters
        const customer3 = {
            name: 'Café & Résumé Corp',
            topDrivers: ['Billing issue [Actionable]']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'Café & Résumé Corp', 'Unicode characters in name should be preserved');
        
        // Customer name with emojis
        const customer4 = {
            name: '🚀 Rocket Corp 🚀',
            topDrivers: ['Support ticket spike [Actionable]']
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, '🚀 Rocket Corp 🚀', 'Emojis in name should be preserved');
        
        // Customer name with HTML-like characters
        const customer5 = {
            name: 'Company <script>alert("test")</script>',
            topDrivers: ['Contract renewal approaching [Actionable]']
        };
        const result5 = generateSingleActionRecommendation(customer5);
        this.assertContains(result5, 'Company <script>alert("test")</script>', 'HTML-like characters should be preserved');
    }

    testLongStrings() {
        console.log('\n📋 Testing Long Strings...');
        
        // Very long customer name
        const longName = 'A'.repeat(1000);
        const customer1 = {
            name: longName,
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, longName, 'Very long customer name should be handled');
        
        // Very long driver description
        const longDriver = 'Very long driver description that goes on and on '.repeat(50) + '[Actionable]';
        const customer2 = {
            name: 'Test Customer',
            topDrivers: [longDriver]
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'executive check-in', 'Long driver should trigger generic recommendation');
        
        // Customer name with maximum length
        const maxLengthName = 'B'.repeat(10000);
        const customer3 = {
            name: maxLengthName,
            topDrivers: ['Low API Usage [Actionable]']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, maxLengthName, 'Maximum length name should be handled');
    }

    testArrayEdgeCases() {
        console.log('\n📋 Testing Array Edge Cases...');
        
        // topDrivers with null elements
        const customer1 = {
            name: 'Null Elements Customer',
            topDrivers: [null, 'Inactivity on Key Feature [Actionable]', undefined]
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'feature walkthrough', 'Should handle null/undefined in array');
        this.assertContains(result1, 'Null Elements Customer', 'Result should contain customer name');
        
        // topDrivers with non-string elements
        const customer2 = {
            name: 'Mixed Types Customer',
            topDrivers: [123, 'Inactivity on Key Feature [Actionable]', true, {}, []]
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'feature walkthrough', 'Should handle mixed types in array');
        this.assertContains(result2, 'Mixed Types Customer', 'Result should contain customer name');
        
        // topDrivers with empty strings
        const customer3 = {
            name: 'Empty Strings Customer',
            topDrivers: ['', 'Inactivity on Key Feature [Actionable]', '   ', '\t\n']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'feature walkthrough', 'Should handle empty strings in array');
        this.assertContains(result3, 'Empty Strings Customer', 'Result should contain customer name');
        
        // topDrivers with very large array
        const largeArray = new Array(1000).fill('Regular driver').concat(['Inactivity on Key Feature [Actionable]']);
        const customer4 = {
            name: 'Large Array Customer',
            topDrivers: largeArray
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, 'feature walkthrough', 'Should handle large arrays');
        this.assertContains(result4, 'Large Array Customer', 'Result should contain customer name');
    }

    testPerformance() {
        console.log('\n📋 Testing Performance...');
        
        const customer = {
            name: 'Performance Test Customer',
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        
        const iterations = 1000;
        const startTime = Date.now();
        
        for (let i = 0; i < iterations; i++) {
            generateSingleActionRecommendation(customer);
        }
        
        const endTime = Date.now();
        const totalTime = endTime - startTime;
        const avgTime = totalTime / iterations;
        
        this.assert(avgTime < 1, 'Performance test', 'Average execution time should be less than 1ms', `${avgTime.toFixed(3)}ms`);
        
        console.log(`   Performance: ${iterations} iterations in ${totalTime}ms (avg: ${avgTime.toFixed(3)}ms per call)`);
    }

    testSecurity() {
        console.log('\n📋 Testing Security...');
        
        // Test for potential injection attacks
        const maliciousCustomer = {
            name: 'Customer<script>alert("xss")</script>',
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        const result = generateSingleActionRecommendation(maliciousCustomer);
        
        // The function should not execute the script, just include it in the string
        this.assertContains(result, 'Customer<script>alert("xss")</script>', 'Should preserve malicious content as text');
        this.assertContains(result, 'alert("xss")', 'Should preserve script content as text (not executed)');
        
        // Test with SQL injection attempt
        const sqlInjectionCustomer = {
            name: "Customer'; DROP TABLE users; --",
            topDrivers: ['Low API Usage [Actionable]']
        };
        const sqlResult = generateSingleActionRecommendation(sqlInjectionCustomer);
        this.assertContains(sqlResult, "Customer'; DROP TABLE users; --", 'Should preserve SQL injection attempt as text');
    }

    printSummary() {
        const endTime = Date.now();
        const totalTime = endTime - this.startTime;
        const successRate = ((this.passed / (this.passed + this.failed)) * 100).toFixed(1);
        
        console.log('\n' + '='.repeat(80));
        console.log('📊 Test Summary:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Total: ${this.passed + this.failed}`);
        console.log(`🎯 Success Rate: ${successRate}%`);
        console.log(`⏱️  Total Time: ${totalTime}ms`);
        
        if (this.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.filter(r => r.status === 'FAIL').forEach(result => {
                console.log(`   - ${result.test}`);
                console.log(`     Expected: ${result.expected}`);
                console.log(`     Actual: ${result.actual}`);
            });
        }
        
        console.log('\n' + '='.repeat(80));
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            function: 'generateSingleActionRecommendation',
            summary: {
                total: this.passed + this.failed,
                passed: this.passed,
                failed: this.failed,
                successRate: (this.passed / (this.passed + this.failed)) * 100,
                executionTime: Date.now() - this.startTime
            },
            results: this.results,
            environment: {
                nodeVersion: process.version,
                platform: process.platform,
                arch: process.arch
            }
        };
        
        const reportPath = path.join(__dirname, 'single-action-recommendation-test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`📄 Detailed report saved to: ${reportPath}`);
    }

    getResults() {
        return {
            total: this.passed + this.failed,
            passed: this.passed,
            failed: this.failed,
            successRate: (this.passed / (this.passed + this.failed)) * 100,
            results: this.results
        };
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    const testSuite = new ComprehensiveTestSuite();
    const results = testSuite.runAllTests();
    
    // Exit with appropriate code
    process.exit(results.failed > 0 ? 1 : 0);
}

module.exports = { generateSingleActionRecommendation, ComprehensiveTestSuite };
