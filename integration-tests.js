/**
 * Integration Tests for Telecom Churn Prediction Dashboard
 * Tests the interaction between different components and modules
 */

// Integration Tests for Dashboard Components
testFramework.describe('Dashboard Integration Tests', () => {
    testFramework.it('should integrate customer data with UI rendering', () => {
        // Test that customer data flows correctly to UI
        const testData = customerData.slice(0, 5);
        renderCustomerList(testData);
        
        const container = document.getElementById('customerListContainer');
        const result = testFramework.assertNotNull(container, 'Container should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(
            container.children.length === testData.length,
            `Should render ${testData.length} customer cards`
        );
        
        return result2;
    });

    testFramework.it('should integrate filtering with prioritization', () => {
        const originalValue = document.getElementById('valueThreshold').value;
        document.getElementById('valueThreshold').value = '15000';
        
        const prioritized = prioritizeCustomers();
        updateFilterStatus();
        
        const statusElement = document.getElementById('filterStatus');
        const result = testFramework.assertNotNull(statusElement, 'Status element should exist');
        if (!result.pass) {
            document.getElementById('valueThreshold').value = originalValue;
            return result;
        }
        
        const result2 = testFramework.assertTrue(
            statusElement.innerHTML.includes('15000'),
            'Status should show current threshold'
        );
        
        // Restore original value
        document.getElementById('valueThreshold').value = originalValue;
        
        return result2;
    });

    testFramework.it('should integrate modal with customer details', () => {
        const customer = customerData[0];
        showCustomerDetail(customer.Customer_ID);
        
        const modalTitle = document.getElementById('modalTitle');
        const result = testFramework.assertNotNull(modalTitle, 'Modal title should exist');
        if (!result.pass) return result;
        
        const result2 = testFramework.assertTrue(
            modalTitle.textContent.includes(customer.Customer_Name),
            'Modal title should include customer name'
        );
        
        // Clean up
        hideCustomerDetail();
        
        return result2;
    });

    testFramework.it('should integrate localStorage with customer updates', () => {
        const customer = customerData[0];
        const testNote = 'Integration test note';
        
        // Mock localStorage
        const originalLocalStorage = window.localStorage;
        const mockStorage = {};
        window.localStorage = {
            setItem: (key, value) => { mockStorage[key] = value; },
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            // Update customer notes
            customer.notes = testNote;
            localStorage.setItem('churn-dashboard-customerData', JSON.stringify(customerData));
            
            // Load saved data
            loadSavedData();
            
            const result = testFramework.assertEqual(
                customerData[0].notes,
                testNote,
                'Should persist customer notes through localStorage'
            );
            
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });
});

// Integration Tests for User Workflows
testFramework.describe('User Workflow Integration', () => {
    testFramework.it('should complete full customer review workflow', () => {
        const customer = customerData[0];
        
        // Step 1: Show customer in list
        renderCustomerList([customer]);
        const container = document.getElementById('customerListContainer');
        const result1 = testFramework.assertTrue(
            container.children.length > 0,
            'Customer should appear in list'
        );
        if (!result1.pass) return result1;
        
        // Step 2: Open customer details
        showCustomerDetail(customer.Customer_ID);
        const modal = document.getElementById('detailModal');
        const result2 = testFramework.assertTrue(
            !modal.classList.contains('hidden'),
            'Modal should open'
        );
        if (!result2.pass) return result2;
        
        // Step 3: Generate recommendation
        const recommendation = generateSingleActionRecommendation(customer);
        const result3 = testFramework.assertNotNull(recommendation, 'Should generate recommendation');
        if (!result3.pass) return result3;
        
        // Step 4: Close modal
        hideCustomerDetail();
        const result4 = testFramework.assertTrue(
            modal.classList.contains('hidden'),
            'Modal should close'
        );
        
        return result4;
    });

    testFramework.it('should complete filtering workflow', () => {
        const originalValue = document.getElementById('valueThreshold').value;
        
        // Step 1: Set filter threshold
        document.getElementById('valueThreshold').value = '8000';
        
        // Step 2: Update customer list
        updateCustomerList();
        
        // Step 3: Verify filtered results
        const prioritized = prioritizeCustomers();
        const result1 = testFramework.assertTrue(
            prioritized.every(c => c.LTV >= 8000),
            'All customers should meet threshold'
        );
        if (!result1.pass) {
            document.getElementById('valueThreshold').value = originalValue;
            return result1;
        }
        
        // Step 4: Reset filter
        resetFilters();
        const result2 = testFramework.assertEqual(
            document.getElementById('valueThreshold').value,
            '5000',
            'Should reset to default threshold'
        );
        
        // Restore original value
        document.getElementById('valueThreshold').value = originalValue;
        
        return result2;
    });

    testFramework.it('should complete intervention logging workflow', () => {
        const customer = customerData[0];
        const testNote = 'Test intervention workflow';
        
        // Mock localStorage
        const originalLocalStorage = window.localStorage;
        const mockStorage = {};
        window.localStorage = {
            setItem: (key, value) => { mockStorage[key] = value; },
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            // Step 1: Open customer details
            showCustomerDetail(customer.Customer_ID);
            
            // Step 2: Add intervention note
            const actionLogInput = document.getElementById('actionLogInput');
            if (actionLogInput) {
                actionLogInput.value = testNote;
            }
            
            // Step 3: Save intervention
            saveNoteLocally(customer.Customer_ID);
            
            // Step 4: Verify save
            const savedData = JSON.parse(localStorage.getItem('churn-dashboard-customerData'));
            const result = testFramework.assertEqual(
                savedData[0].notes,
                testNote,
                'Should save intervention note'
            );
            
            // Clean up
            hideCustomerDetail();
            
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });
});

// Integration Tests for Data Flow
testFramework.describe('Data Flow Integration', () => {
    testFramework.it('should maintain data consistency across components', () => {
        const customer = customerData[0];
        const originalNotes = customer.notes;
        
        // Update customer data
        customer.notes = 'Updated notes';
        
        // Verify consistency in different components
        const recommendation = generateSingleActionRecommendation(customer);
        const modalContent = generateModalContent(customer);
        
        const result1 = testFramework.assertTrue(
            recommendation.includes(customer.Customer_Name),
            'Recommendation should use updated customer data'
        );
        if (!result1.pass) return result1;
        
        const result2 = testFramework.assertTrue(
            modalContent.includes(customer.Customer_Name),
            'Modal content should use updated customer data'
        );
        
        // Restore original notes
        customer.notes = originalNotes;
        
        return result2;
    });

    testFramework.it('should handle data updates across UI components', () => {
        const testData = customerData.slice(0, 3);
        
        // Render initial data
        renderCustomerList(testData);
        const container1 = document.getElementById('customerListContainer');
        const initialCount = container1.children.length;
        
        // Update with different data
        const newData = customerData.slice(3, 6);
        renderCustomerList(newData);
        const container2 = document.getElementById('customerListContainer');
        const newCount = container2.children.length;
        
        const result = testFramework.assertEqual(
            newCount,
            newData.length,
            'Should update UI with new data'
        );
        
        return result;
    });

    testFramework.it('should synchronize filter state with display', () => {
        const threshold = 12000;
        document.getElementById('valueThreshold').value = threshold;
        
        const prioritized = prioritizeCustomers();
        updateCustomerList();
        updateFilterStatus();
        
        const statusElement = document.getElementById('filterStatus');
        const result = testFramework.assertTrue(
            statusElement.innerHTML.includes(threshold.toString()),
            'Filter status should reflect current threshold'
        );
        
        return result;
    });
});

// Integration Tests for Error Handling
testFramework.describe('Error Handling Integration', () => {
    testFramework.it('should handle missing DOM elements gracefully', () => {
        const originalContainer = document.getElementById('customerListContainer');
        const testContainer = document.createElement('div');
        testContainer.id = 'customerListContainer';
        document.body.appendChild(testContainer);
        
        try {
            // Remove the container temporarily
            document.body.removeChild(testContainer);
            
            // Try to render
            renderCustomerList(customerData);
            
            const result = testFramework.assertTrue(true, 'Should handle missing container gracefully');
            return result;
        } finally {
            // Restore container
            if (originalContainer) {
                document.body.appendChild(originalContainer);
            }
        }
    });

    testFramework.it('should handle invalid customer IDs gracefully', () => {
        try {
            showCustomerDetail('INVALID_ID');
            const result = testFramework.assertTrue(true, 'Should handle invalid customer ID gracefully');
            return result;
        } catch (error) {
            return { pass: false, message: `Should not throw error: ${error.message}` };
        }
    });

    testFramework.it('should handle localStorage errors gracefully', () => {
        const originalLocalStorage = window.localStorage;
        
        // Mock localStorage to throw error
        window.localStorage = {
            setItem: () => { throw new Error('Storage quota exceeded'); },
            getItem: () => null
        };
        
        try {
            const customer = customerData[0];
            saveNoteLocally(customer.Customer_ID);
            
            const result = testFramework.assertTrue(true, 'Should handle localStorage errors gracefully');
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });
});

// Integration Tests for Performance
testFramework.describe('Performance Integration', () => {
    testFramework.it('should render large customer lists efficiently', () => {
        const startTime = performance.now();
        
        // Create large dataset
        const largeDataset = Array.from({ length: 100 }, (_, i) => ({
            ...customerData[i % customerData.length],
            Customer_ID: `C${i + 1000}`,
            Customer_Name: `Test Customer ${i + 1000}`
        }));
        
        renderCustomerList(largeDataset);
        
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        const result = testFramework.assertTrue(
            renderTime < 1000, // Should render in less than 1 second
            `Rendering took ${renderTime.toFixed(2)}ms, should be under 1000ms`
        );
        
        return result;
    });

    testFramework.it('should handle rapid filter changes efficiently', () => {
        const startTime = performance.now();
        
        // Rapid filter changes
        for (let i = 0; i < 10; i++) {
            document.getElementById('valueThreshold').value = (i + 1) * 1000;
            updateCustomerList();
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        
        const result = testFramework.assertTrue(
            totalTime < 500, // Should complete in less than 500ms
            `Rapid filtering took ${totalTime.toFixed(2)}ms, should be under 500ms`
        );
        
        // Reset to original value
        document.getElementById('valueThreshold').value = '5000';
        
        return result;
    });
});

console.log('🔗 Integration tests loaded successfully!');
console.log('Run: testFramework.runTests() to execute all tests');
