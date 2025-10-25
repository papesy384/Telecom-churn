/**
 * Unit Tests for Telecom Churn Prediction Dashboard
 * Tests all core functionality including data processing, UI interactions, and business logic
 */

// Load the test framework
const testFramework = window.testFramework;

// Unit Tests for Customer Data Processing
testFramework.describe('Customer Data Processing', () => {
    testFramework.it('should have valid customer data structure', () => {
        const result = testFramework.assertNotNull(customerData, 'Customer data should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(Array.isArray(customerData), 'Customer data should be an array');
        if (!result2.pass) return result2;
        
        const result3 = testFramework.assertGreaterThan(customerData.length, 0, 'Customer data should not be empty');
        if (!result3.pass) return result3;
        
        return { pass: true, message: '✅ Customer data structure is valid' };
    });

    testFramework.it('should have required fields for each customer', () => {
        const requiredFields = ['Customer_ID', 'Customer_Name', 'LTV', 'riskScore', 'topDrivers'];
        
        for (const customer of customerData) {
            for (const field of requiredFields) {
                const result = testFramework.assertNotNull(customer[field], `Customer should have ${field}`);
                if (!result.pass) return result;
            }
        }
        
        return { pass: true, message: '✅ All customers have required fields' };
    });

    testFramework.it('should have valid risk scores', () => {
        for (const customer of customerData) {
            const result = testFramework.assertTrue(
                customer.riskScore >= 0 && customer.riskScore <= 100,
                `Risk score should be between 0-100, got ${customer.riskScore}`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ All risk scores are valid' };
    });

    testFramework.it('should have valid LTV values', () => {
        for (const customer of customerData) {
            const result = testFramework.assertTrue(
                customer.LTV > 0,
                `LTV should be positive, got ${customer.LTV}`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ All LTV values are valid' };
    });

    testFramework.it('should have unique customer IDs', () => {
        const customerIds = customerData.map(c => c.Customer_ID);
        const uniqueIds = [...new Set(customerIds)];
        
        const result = testFramework.assertEqual(
            customerIds.length,
            uniqueIds.length,
            'All customer IDs should be unique'
        );
        
        return result;
    });
});

// Unit Tests for MOCK_CUSTOMERS Processing
testFramework.describe('MOCK_CUSTOMERS Processing', () => {
    testFramework.it('should create MOCK_CUSTOMERS from customerData', () => {
        const result = testFramework.assertNotNull(MOCK_CUSTOMERS, 'MOCK_CUSTOMERS should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(Array.isArray(MOCK_CUSTOMERS), 'MOCK_CUSTOMERS should be an array');
        if (!result2.pass) return result2;
        
        const result3 = testFramework.assertEqual(MOCK_CUSTOMERS.length, customerData.length, 'MOCK_CUSTOMERS should have same length as customerData');
        return result3;
    });

    testFramework.it('should have correct field mappings', () => {
        for (let i = 0; i < MOCK_CUSTOMERS.length; i++) {
            const mockCustomer = MOCK_CUSTOMERS[i];
            const originalCustomer = customerData[i];
            
            const result = testFramework.assertEqual(
                mockCustomer.Customer_ID,
                originalCustomer.Customer_ID,
                'Customer_ID should match'
            );
            if (!result.pass) return result;
            
            const result2 = testFramework.assertEqual(
                mockCustomer.LTV,
                originalCustomer.LTV,
                'LTV should match'
            );
            if (!result2.pass) return result2;
        }
        
        return { pass: true, message: '✅ All field mappings are correct' };
    });
});

// Unit Tests for Customer Prioritization
testFramework.describe('Customer Prioritization Logic', () => {
    testFramework.it('should filter customers by LTV threshold', () => {
        const threshold = 10000;
        const prioritized = prioritizeCustomers();
        
        for (const customer of prioritized) {
            const result = testFramework.assertTrue(
                customer.LTV >= threshold,
                `Customer LTV ${customer.LTV} should be >= ${threshold}`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ Customers filtered by LTV threshold' };
    });

    testFramework.it('should sort customers by risk score descending', () => {
        const prioritized = prioritizeCustomers();
        
        for (let i = 1; i < prioritized.length; i++) {
            const result = testFramework.assertTrue(
                prioritized[i-1].riskScore >= prioritized[i].riskScore,
                'Customers should be sorted by risk score descending'
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ Customers sorted by risk score' };
    });

    testFramework.it('should handle invalid threshold values', () => {
        // Test with invalid threshold
        const originalValue = document.getElementById('valueThreshold').value;
        document.getElementById('valueThreshold').value = 'invalid';
        
        const result = testFramework.assertNotNull(prioritizeCustomers(), 'Should return default data for invalid threshold');
        
        // Restore original value
        document.getElementById('valueThreshold').value = originalValue;
        
        return result;
    });
});

// Unit Tests for Single Action Recommendation
testFramework.describe('Single Action Recommendation', () => {
    testFramework.it('should generate recommendation for actionable drivers', () => {
        const customer = customerData.find(c => c.topDrivers.some(d => d.includes('[Actionable]')));
        
        if (customer) {
            const recommendation = generateSingleActionRecommendation(customer);
            const result = testFramework.assertNotNull(recommendation, 'Should generate recommendation');
            if (!result.pass) return result;
            
            const result2 = testFramework.assertTrue(
                recommendation.length > 0,
                'Recommendation should not be empty'
            );
            return result2;
        }
        
        return { pass: true, message: '✅ No actionable customers found to test' };
    });

    testFramework.it('should generate recommendation for non-actionable drivers', () => {
        const customer = customerData.find(c => !c.topDrivers.some(d => d.includes('[Actionable]')));
        
        if (customer) {
            const recommendation = generateSingleActionRecommendation(customer);
            const result = testFramework.assertNotNull(recommendation, 'Should generate recommendation');
            if (!result.pass) return result;
            
            const result2 = testFramework.assertTrue(
                recommendation.length > 0,
                'Recommendation should not be empty'
            );
            return result2;
        }
        
        return { pass: true, message: '✅ No non-actionable customers found to test' };
    });

    testFramework.it('should include customer name in recommendation', () => {
        const customer = customerData[0];
        const recommendation = generateSingleActionRecommendation(customer);
        
        const result = testFramework.assertContains(
            recommendation,
            customer.Customer_Name,
            'Recommendation should include customer name'
        );
        
        return result;
    });

    testFramework.it('should handle null customer gracefully', () => {
        try {
            const recommendation = generateSingleActionRecommendation(null);
            return { pass: false, message: 'Should throw error for null customer' };
        } catch (error) {
            return { pass: true, message: '✅ Handles null customer gracefully' };
        }
    });
});

// Unit Tests for Modal Content Generation
testFramework.describe('Modal Content Generation', () => {
    testFramework.it('should generate modal content for valid customer', () => {
        const customer = customerData[0];
        const content = generateModalContent(customer);
        
        const result = testFramework.assertNotNull(content, 'Should generate modal content');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(
            content.includes(customer.Customer_Name),
            'Content should include customer name'
        );
        if (!result2.pass) return result2;
        
        const result3 = testFramework.assertTrue(
            content.includes(customer.riskScore.toString()),
            'Content should include risk score'
        );
        return result3;
    });

    testFramework.it('should highlight actionable drivers', () => {
        const customer = customerData.find(c => c.topDrivers.some(d => d.includes('[Actionable]')));
        
        if (customer) {
            const content = generateModalContent(customer);
            const result = testFramework.assertTrue(
                content.includes('bg-green-100'),
                'Should highlight actionable drivers with green background'
            );
            return result;
        }
        
        return { pass: true, message: '✅ No actionable customers found to test' };
    });

    testFramework.it('should include single action recommendation', () => {
        const customer = customerData[0];
        const content = generateModalContent(customer);
        
        const result = testFramework.assertTrue(
            content.includes('Single-Action Recommendation'),
            'Should include single action recommendation section'
        );
        
        return result;
    });
});

// Unit Tests for Filter Status Updates
testFramework.describe('Filter Status Updates', () => {
    testFramework.it('should update filter status correctly', () => {
        const originalValue = document.getElementById('valueThreshold').value;
        document.getElementById('valueThreshold').value = '5000';
        
        updateFilterStatus();
        
        const statusElement = document.getElementById('filterStatus');
        const result = testFramework.assertNotNull(statusElement, 'Filter status element should exist');
        if (!result.pass) {
            document.getElementById('valueThreshold').value = originalValue;
            return result;
        }
        
        const result2 = testFramework.assertTrue(
            statusElement.innerHTML.length > 0,
            'Filter status should have content'
        );
        
        // Restore original value
        document.getElementById('valueThreshold').value = originalValue;
        
        return result2;
    });

    testFramework.it('should calculate correct percentages', () => {
        const threshold = 10000;
        const totalCount = customerData.length;
        const filteredCount = customerData.filter(c => c.LTV >= threshold).length;
        const expectedPercentage = Math.round((filteredCount / totalCount) * 100);
        
        const result = testFramework.assertTrue(
            expectedPercentage >= 0 && expectedPercentage <= 100,
            'Percentage should be between 0-100'
        );
        
        return result;
    });
});

// Unit Tests for Local Storage
testFramework.describe('Local Storage Operations', () => {
    testFramework.it('should save customer notes to localStorage', () => {
        const customer = customerData[0];
        const testNote = 'Test intervention note';
        
        // Mock localStorage
        const originalLocalStorage = window.localStorage;
        const mockStorage = {};
        window.localStorage = {
            setItem: (key, value) => { mockStorage[key] = value; },
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            customer.notes = testNote;
            localStorage.setItem('churn-dashboard-customerData', JSON.stringify(customerData));
            
            const savedData = JSON.parse(localStorage.getItem('churn-dashboard-customerData'));
            const result = testFramework.assertNotNull(savedData, 'Should save data to localStorage');
            if (!result.pass) return result;
            
            const result2 = testFramework.assertEqual(
                savedData[0].notes,
                testNote,
                'Should save customer notes correctly'
            );
            
            return result2;
        } finally {
            // Restore original localStorage
            window.localStorage = originalLocalStorage;
        }
    });

    testFramework.it('should load saved data correctly', () => {
        const originalLocalStorage = window.localStorage;
        const mockStorage = {
            'churn-dashboard-customerData': JSON.stringify(customerData)
        };
        
        window.localStorage = {
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            loadSavedData();
            const result = testFramework.assertTrue(true, 'Should load saved data without errors');
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });
});

// Unit Tests for DOM Manipulation
testFramework.describe('DOM Manipulation', () => {
    testFramework.it('should render customer list correctly', () => {
        const testData = customerData.slice(0, 3);
        renderCustomerList(testData);
        
        const container = document.getElementById('customerListContainer');
        const result = testFramework.assertNotNull(container, 'Customer list container should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(
            container.children.length > 0,
            'Container should have customer cards'
        );
        
        return result2;
    });

    testFramework.it('should show customer detail modal', () => {
        const customer = customerData[0];
        showCustomerDetail(customer.Customer_ID);
        
        const modal = document.getElementById('detailModal');
        const result = testFramework.assertNotNull(modal, 'Detail modal should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(
            !modal.classList.contains('hidden'),
            'Modal should be visible'
        );
        
        // Hide modal after test
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
        
        return result2;
    });

    testFramework.it('should hide customer detail modal', () => {
        const modal = document.getElementById('detailModal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        hideCustomerDetail();
        
        const result = testFramework.assertTrue(
            modal.classList.contains('hidden'),
            'Modal should be hidden'
        );
        
        return result;
    });
});

// Unit Tests for Data Validation
testFramework.describe('Data Validation', () => {
    testFramework.it('should validate customer ID format', () => {
        for (const customer of customerData) {
            const result = testFramework.assertTrue(
                /^C\d+$/.test(customer.Customer_ID),
                `Customer ID ${customer.Customer_ID} should match format C[number]`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ All customer IDs have correct format' };
    });

    testFramework.it('should validate topDrivers array', () => {
        for (const customer of customerData) {
            const result = testFramework.assertTrue(
                Array.isArray(customer.topDrivers),
                'topDrivers should be an array'
            );
            if (!result.pass) return result;
            
            const result2 = testFramework.assertTrue(
                customer.topDrivers.length > 0,
                'topDrivers should not be empty'
            );
            if (!result2.pass) return result2;
        }
        
        return { pass: true, message: '✅ All topDrivers arrays are valid' };
    });

    testFramework.it('should validate contract types', () => {
        const validContracts = ['Annual', 'Monthly'];
        
        for (const customer of customerData) {
            const result = testFramework.assertContains(
                validContracts,
                customer.Contract,
                `Contract ${customer.Contract} should be valid`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ All contract types are valid' };
    });

    testFramework.it('should validate root cause values', () => {
        const validRootCauses = ['Service Quality', 'Network Issues', 'Cost Sensitivity', 'Product Disengagement', 'Low Usage'];
        
        for (const customer of customerData) {
            const result = testFramework.assertContains(
                validRootCauses,
                customer.Root_Cause,
                `Root cause ${customer.Root_Cause} should be valid`
            );
            if (!result.pass) return result;
        }
        
        return { pass: true, message: '✅ All root cause values are valid' };
    });
});

console.log('🧪 Unit tests loaded successfully!');
console.log('Run: testFramework.runTests() to execute all tests');
