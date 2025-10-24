/**
 * Comprehensive Unit Tests for generateSingleActionRecommendation Function
 * Tests all edge cases, null inputs, invalid types, and customer scenarios
 */

// Mock the function for testing (extracted from index.html)
function generateSingleActionRecommendation(customer) {
    const actionableDrivers = customer.topDrivers.filter(driver => driver.includes('[Actionable]'));
    
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

// Test Suite
class SingleActionRecommendationTestSuite {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
        this.results = [];
    }

    // Test helper methods
    assert(condition, testName, expected, actual) {
        if (condition) {
            this.passed++;
            this.results.push({ status: 'PASS', test: testName, expected, actual });
            console.log(`✅ ${testName}`);
        } else {
            this.failed++;
            this.results.push({ status: 'FAIL', test: testName, expected, actual });
            console.log(`❌ ${testName} - Expected: ${expected}, Got: ${actual}`);
        }
    }

    assertThrows(fn, testName, expectedError) {
        try {
            fn();
            this.failed++;
            this.results.push({ status: 'FAIL', test: testName, expected: `Should throw ${expectedError}`, actual: 'No error thrown' });
            console.log(`❌ ${testName} - Expected error but none was thrown`);
        } catch (error) {
            this.passed++;
            this.results.push({ status: 'PASS', test: testName, expected: expectedError, actual: error.message });
            console.log(`✅ ${testName}`);
        }
    }

    assertContains(text, substring, testName) {
        const condition = text.includes(substring);
        this.assert(condition, testName, `Should contain "${substring}"`, text);
    }

    // Test cases
    runAllTests() {
        console.log('🧪 Starting Comprehensive Unit Tests for generateSingleActionRecommendation\n');
        
        this.testNullInput();
        this.testUndefinedInput();
        this.testInvalidTypes();
        this.testEmptyObject();
        this.testMissingProperties();
        this.testValidCustomerScenarios();
        this.testEdgeCases();
        this.testSpecialCharacters();
        this.testLongStrings();
        this.testArrayEdgeCases();
        
        this.printSummary();
        return this.getResults();
    }

    // 1. Null Input Tests
    testNullInput() {
        console.log('📋 Testing Null Input Cases...');
        
        this.assertThrows(
            () => generateSingleActionRecommendation(null),
            'Null input should throw error',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(null),
            'Null customer parameter',
            'Cannot read properties of null'
        );
    }

    // 2. Undefined Input Tests
    testUndefinedInput() {
        console.log('📋 Testing Undefined Input Cases...');
        
        this.assertThrows(
            () => generateSingleActionRecommendation(undefined),
            'Undefined input should throw error',
            'TypeError'
        );
        
        this.assertThrows(
            () => generateSingleActionRecommendation(),
            'No parameters should throw error',
            'TypeError'
        );
    }

    // 3. Invalid Type Tests
    testInvalidTypes() {
        console.log('📋 Testing Invalid Type Cases...');
        
        // String input
        this.assertThrows(
            () => generateSingleActionRecommendation('invalid string'),
            'String input should throw error',
            'TypeError'
        );
        
        // Number input
        this.assertThrows(
            () => generateSingleActionRecommendation(123),
            'Number input should throw error',
            'TypeError'
        );
        
        // Boolean input
        this.assertThrows(
            () => generateSingleActionRecommendation(true),
            'Boolean input should throw error',
            'TypeError'
        );
        
        // Array input
        this.assertThrows(
            () => generateSingleActionRecommendation([1, 2, 3]),
            'Array input should throw error',
            'TypeError'
        );
        
        // Function input
        this.assertThrows(
            () => generateSingleActionRecommendation(() => {}),
            'Function input should throw error',
            'TypeError'
        );
    }

    // 4. Empty Object Tests
    testEmptyObject() {
        console.log('📋 Testing Empty Object Cases...');
        
        this.assertThrows(
            () => generateSingleActionRecommendation({}),
            'Empty object should throw error',
            'TypeError'
        );
    }

    // 5. Missing Properties Tests
    testMissingProperties() {
        console.log('📋 Testing Missing Properties Cases...');
        
        // Missing name
        this.assertThrows(
            () => generateSingleActionRecommendation({ topDrivers: [] }),
            'Missing name property should throw error',
            'TypeError'
        );
        
        // Missing topDrivers
        this.assertThrows(
            () => generateSingleActionRecommendation({ name: 'Test Customer' }),
            'Missing topDrivers property should throw error',
            'TypeError'
        );
        
        // Both missing
        this.assertThrows(
            () => generateSingleActionRecommendation({ id: 1 }),
            'Missing required properties should throw error',
            'TypeError'
        );
    }

    // 6. Valid Customer Scenarios
    testValidCustomerScenarios() {
        console.log('📋 Testing Valid Customer Scenarios...');
        
        // Customer with Inactivity on Key Feature
        const customer1 = {
            name: 'Acme Corp',
            topDrivers: ['Inactivity on Key Feature [Actionable]', 'Low usage']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'feature walkthrough call', 'Inactivity recommendation');
        this.assertContains(result1, 'Acme Corp', 'Customer name in recommendation');
        
        // Customer with Low API Usage
        const customer2 = {
            name: 'TechStart Inc',
            topDrivers: ['Low API Usage [Actionable]', 'Integration issues']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'technical team', 'API usage recommendation');
        this.assertContains(result2, 'TechStart Inc', 'Customer name in recommendation');
        
        // Customer with Billing issue
        const customer3 = {
            name: 'Global Solutions',
            topDrivers: ['Billing issue [Actionable]', 'Payment delay']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'finance team', 'Billing recommendation');
        this.assertContains(result3, 'Global Solutions', 'Customer name in recommendation');
        
        // Customer with Support ticket spike
        const customer4 = {
            name: 'Enterprise Dynamics',
            topDrivers: ['Support ticket spike [Actionable]', 'Multiple issues']
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, 'support tickets', 'Support recommendation');
        this.assertContains(result4, 'Enterprise Dynamics', 'Customer name in recommendation');
        
        // Customer with Contract renewal approaching
        const customer5 = {
            name: 'Innovation Labs',
            topDrivers: ['Contract renewal approaching [Actionable]', 'Renewal due']
        };
        const result5 = generateSingleActionRecommendation(customer5);
        this.assertContains(result5, 'renewal conversation', 'Renewal recommendation');
        this.assertContains(result5, 'Innovation Labs', 'Customer name in recommendation');
        
        // Customer with Feature adoption decline
        const customer6 = {
            name: 'Digital Ventures',
            topDrivers: ['Feature adoption decline [Actionable]', 'Low engagement']
        };
        const result6 = generateSingleActionRecommendation(customer6);
        this.assertContains(result6, 'feature adoption report', 'Adoption recommendation');
        this.assertContains(result6, 'Digital Ventures', 'Customer name in recommendation');
        
        // Customer with no actionable drivers
        const customer7 = {
            name: 'Stable Customer',
            topDrivers: ['Regular usage', 'No issues', 'Happy customer']
        };
        const result7 = generateSingleActionRecommendation(customer7);
        this.assertContains(result7, 'Monitor', 'Monitoring recommendation');
        this.assertContains(result7, 'Stable Customer', 'Customer name in recommendation');
    }

    // 7. Edge Cases
    testEdgeCases() {
        console.log('📋 Testing Edge Cases...');
        
        // Customer with empty topDrivers array
        const customer1 = {
            name: 'Empty Drivers Customer',
            topDrivers: []
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'Monitor', 'Empty drivers should trigger monitoring');
        
        // Customer with only ignore drivers
        const customer2 = {
            name: 'Ignore Only Customer',
            topDrivers: ['Billing issue [Ignore]', 'Low priority [Ignore]']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'Monitor', 'Only ignore drivers should trigger monitoring');
        
        // Customer with mixed actionable and ignore drivers
        const customer3 = {
            name: 'Mixed Drivers Customer',
            topDrivers: ['Inactivity on Key Feature [Actionable]', 'Billing issue [Ignore]']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'feature walkthrough', 'Should prioritize actionable driver');
        
        // Customer with multiple actionable drivers
        const customer4 = {
            name: 'Multiple Actionable Customer',
            topDrivers: ['Low API Usage [Actionable]', 'Inactivity on Key Feature [Actionable]']
        };
        const result4 = generateSingleActionRecommendation(customer4);
        this.assertContains(result4, 'technical team', 'Should use first actionable driver');
        
        // Customer with unknown actionable driver
        const customer5 = {
            name: 'Unknown Driver Customer',
            topDrivers: ['Unknown Issue [Actionable]', 'Random problem']
        };
        const result5 = generateSingleActionRecommendation(customer5);
        this.assertContains(result5, 'executive check-in', 'Unknown driver should trigger generic recommendation');
    }

    // 8. Special Characters Tests
    testSpecialCharacters() {
        console.log('📋 Testing Special Characters...');
        
        // Customer name with special characters
        const customer1 = {
            name: 'Customer & Co. (Ltd.)',
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'Customer & Co. (Ltd.)', 'Special characters in name');
        
        // Customer name with quotes
        const customer2 = {
            name: 'Customer "Special" Name',
            topDrivers: ['Low API Usage [Actionable]']
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'Customer "Special" Name', 'Quotes in name');
        
        // Customer name with unicode characters
        const customer3 = {
            name: 'Café & Résumé Corp',
            topDrivers: ['Billing issue [Actionable]']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'Café & Résumé Corp', 'Unicode characters in name');
    }

    // 9. Long Strings Tests
    testLongStrings() {
        console.log('📋 Testing Long Strings...');
        
        // Very long customer name
        const longName = 'A'.repeat(1000);
        const customer1 = {
            name: longName,
            topDrivers: ['Inactivity on Key Feature [Actionable]']
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, longName, 'Very long customer name');
        
        // Very long driver description
        const longDriver = 'Very long driver description that goes on and on '.repeat(50) + '[Actionable]';
        const customer2 = {
            name: 'Test Customer',
            topDrivers: [longDriver]
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'executive check-in', 'Long driver should trigger generic recommendation');
    }

    // 10. Array Edge Cases
    testArrayEdgeCases() {
        console.log('📋 Testing Array Edge Cases...');
        
        // topDrivers with null elements
        const customer1 = {
            name: 'Null Elements Customer',
            topDrivers: [null, 'Inactivity on Key Feature [Actionable]', undefined]
        };
        const result1 = generateSingleActionRecommendation(customer1);
        this.assertContains(result1, 'feature walkthrough', 'Should handle null/undefined in array');
        
        // topDrivers with non-string elements
        const customer2 = {
            name: 'Mixed Types Customer',
            topDrivers: [123, 'Inactivity on Key Feature [Actionable]', true]
        };
        const result2 = generateSingleActionRecommendation(customer2);
        this.assertContains(result2, 'feature walkthrough', 'Should handle mixed types in array');
        
        // topDrivers with empty strings
        const customer3 = {
            name: 'Empty Strings Customer',
            topDrivers: ['', 'Inactivity on Key Feature [Actionable]', '   ']
        };
        const result3 = generateSingleActionRecommendation(customer3);
        this.assertContains(result3, 'feature walkthrough', 'Should handle empty strings in array');
    }

    // Summary and Results
    printSummary() {
        console.log('\n📊 Test Summary:');
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`📈 Total: ${this.passed + this.failed}`);
        console.log(`🎯 Success Rate: ${((this.passed / (this.passed + this.failed)) * 100).toFixed(1)}%`);
        
        if (this.failed > 0) {
            console.log('\n❌ Failed Tests:');
            this.results.filter(r => r.status === 'FAIL').forEach(result => {
                console.log(`   - ${result.test}: ${result.expected} vs ${result.actual}`);
            });
        }
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

// Run the tests
const testSuite = new SingleActionRecommendationTestSuite();
const results = testSuite.runAllTests();

// Export for use in other test runners
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateSingleActionRecommendation, SingleActionRecommendationTestSuite };
}
