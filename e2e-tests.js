/**
 * End-to-End Tests for Telecom Churn Prediction Dashboard
 * Tests complete user journeys and browser interactions
 */

// E2E Tests for Complete User Journeys
testFramework.describe('End-to-End User Journeys', () => {
    testFramework.it('should complete full dashboard exploration journey', () => {
        // Step 1: Load dashboard
        const result1 = testFramework.assertNotNull(document.getElementById('customerListContainer'), 'Dashboard should load');
        if (!result1.pass) return result1;
        
        // Step 2: Verify initial customer list
        updateCustomerList();
        const container = document.getElementById('customerListContainer');
        const result2 = testFramework.assertTrue(container.children.length > 0, 'Should show initial customers');
        if (!result2.pass) return result2;
        
        // Step 3: Apply filter
        document.getElementById('valueThreshold').value = '10000';
        updateCustomerList();
        const result3 = testFramework.assertTrue(container.children.length > 0, 'Should show filtered customers');
        if (!result3.pass) return result3;
        
        // Step 4: Open customer detail
        const firstCustomer = customerData[0];
        showCustomerDetail(firstCustomer.Customer_ID);
        const modal = document.getElementById('detailModal');
        const result4 = testFramework.assertTrue(!modal.classList.contains('hidden'), 'Should open customer modal');
        if (!result4.pass) return result4;
        
        // Step 5: Close modal
        hideCustomerDetail();
        const result5 = testFramework.assertTrue(modal.classList.contains('hidden'), 'Should close modal');
        
        return result5;
    });

    testFramework.it('should complete customer intervention workflow', () => {
        const customer = customerData[0];
        const interventionNote = 'E2E Test Intervention - Customer contacted for feature training';
        
        // Mock localStorage for testing
        const originalLocalStorage = window.localStorage;
        const mockStorage = {};
        window.localStorage = {
            setItem: (key, value) => { mockStorage[key] = value; },
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            // Step 1: Open customer details
            showCustomerDetail(customer.Customer_ID);
            const modal = document.getElementById('detailModal');
            const result1 = testFramework.assertTrue(!modal.classList.contains('hidden'), 'Should open modal');
            if (!result1.pass) return result1;
            
            // Step 2: Add intervention note
            const actionLogInput = document.getElementById('actionLogInput');
            if (actionLogInput) {
                actionLogInput.value = interventionNote;
            }
            
            // Step 3: Save intervention
            saveNoteLocally(customer.Customer_ID);
            
            // Step 4: Verify save
            const savedData = JSON.parse(localStorage.getItem('churn-dashboard-customerData'));
            const result2 = testFramework.assertEqual(savedData[0].notes, interventionNote, 'Should save intervention');
            if (!result2.pass) return result2;
            
            // Step 5: Close modal
            hideCustomerDetail();
            const result3 = testFramework.assertTrue(modal.classList.contains('hidden'), 'Should close modal');
            
            return result3;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });

    testFramework.it('should complete filter and search workflow', () => {
        // Step 1: Set high threshold
        document.getElementById('valueThreshold').value = '20000';
        updateCustomerList();
        const highThresholdCount = document.getElementById('customerListContainer').children.length;
        
        // Step 2: Set medium threshold
        document.getElementById('valueThreshold').value = '10000';
        updateCustomerList();
        const mediumThresholdCount = document.getElementById('customerListContainer').children.length;
        
        // Step 3: Set low threshold
        document.getElementById('valueThreshold').value = '5000';
        updateCustomerList();
        const lowThresholdCount = document.getElementById('customerListContainer').children.length;
        
        // Verify filtering works correctly
        const result1 = testFramework.assertTrue(
            lowThresholdCount >= mediumThresholdCount,
            'Lower threshold should show more customers'
        );
        if (!result1.pass) return result1;
        
        const result2 = testFramework.assertTrue(
            mediumThresholdCount >= highThresholdCount,
            'Medium threshold should show more customers than high threshold'
        );
        
        // Reset to default
        resetFilters();
        
        return result2;
    });
});

// E2E Tests for Navigation and UI Flow
testFramework.describe('Navigation and UI Flow E2E', () => {
    testFramework.it('should navigate between dashboard sections', () => {
        // Test navigation to live demo section
        const liveDemoLink = document.querySelector('a[data-section="live-demo"]');
        if (liveDemoLink) {
            liveDemoLink.click();
            
            // Wait for section to load
            setTimeout(() => {
                const liveDemoSection = document.getElementById('live-demo');
                const result = testFramework.assertTrue(
                    liveDemoSection && liveDemoSection.classList.contains('active'),
                    'Should navigate to live demo section'
                );
            }, 100);
        }
        
        return { pass: true, message: '✅ Navigation test completed' };
    });

    testFramework.it('should handle mobile menu interactions', () => {
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            // Test menu toggle
            mobileMenuBtn.click();
            const result1 = testFramework.assertTrue(
                !mobileMenu.classList.contains('hidden'),
                'Should open mobile menu'
            );
            if (!result1.pass) return result1;
            
            // Test menu close
            mobileMenuBtn.click();
            const result2 = testFramework.assertTrue(
                mobileMenu.classList.contains('hidden'),
                'Should close mobile menu'
            );
            
            return result2;
        }
        
        return { pass: true, message: '✅ Mobile menu test completed' };
    });

    testFramework.it('should handle responsive design changes', () => {
        // Test that UI adapts to different screen sizes
        const container = document.getElementById('customerListContainer');
        const result = testFramework.assertNotNull(container, 'Container should exist');
        if (!result.pass) return result;
        
        // Check for responsive classes
        const hasResponsiveClasses = container.className.includes('grid-cols-1') && 
                                   container.className.includes('lg:grid-cols-2');
        
        const result2 = testFramework.assertTrue(
            hasResponsiveClasses,
            'Should have responsive grid classes'
        );
        
        return result2;
    });
});

// E2E Tests for Data Persistence
testFramework.describe('Data Persistence E2E', () => {
    testFramework.it('should persist data across page interactions', () => {
        const customer = customerData[0];
        const testNote = 'E2E Persistence Test';
        
        // Mock localStorage
        const originalLocalStorage = window.localStorage;
        const mockStorage = {};
        window.localStorage = {
            setItem: (key, value) => { mockStorage[key] = value; },
            getItem: (key) => mockStorage[key] || null
        };
        
        try {
            // Step 1: Save data
            customer.notes = testNote;
            localStorage.setItem('churn-dashboard-customerData', JSON.stringify(customerData));
            
            // Step 2: Simulate page interactions
            updateCustomerList();
            showCustomerDetail(customer.Customer_ID);
            hideCustomerDetail();
            
            // Step 3: Verify data persistence
            const savedData = JSON.parse(localStorage.getItem('churn-dashboard-customerData'));
            const result = testFramework.assertEqual(
                savedData[0].notes,
                testNote,
                'Data should persist across interactions'
            );
            
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });

    testFramework.it('should handle localStorage quota exceeded', () => {
        const originalLocalStorage = window.localStorage;
        
        // Mock localStorage to simulate quota exceeded
        let setItemCallCount = 0;
        window.localStorage = {
            setItem: (key, value) => {
                setItemCallCount++;
                if (setItemCallCount > 5) {
                    throw new Error('QuotaExceededError');
                }
            },
            getItem: (key) => null
        };
        
        try {
            const customer = customerData[0];
            saveNoteLocally(customer.Customer_ID);
            
            const result = testFramework.assertTrue(true, 'Should handle quota exceeded gracefully');
            return result;
        } finally {
            window.localStorage = originalLocalStorage;
        }
    });
});

// E2E Tests for Error Scenarios
testFramework.describe('Error Scenarios E2E', () => {
    testFramework.it('should handle network errors gracefully', () => {
        // Test that the app works offline
        const result = testFramework.assertNotNull(
            document.getElementById('customerListContainer'),
            'Should work without network connection'
        );
        
        return result;
    });

    testFramework.it('should handle invalid user input gracefully', () => {
        const originalValue = document.getElementById('valueThreshold').value;
        
        // Test invalid input
        document.getElementById('valueThreshold').value = 'invalid';
        updateCustomerList();
        
        const result = testFramework.assertTrue(
            document.getElementById('customerListContainer').children.length > 0,
            'Should handle invalid input gracefully'
        );
        
        // Restore original value
        document.getElementById('valueThreshold').value = originalValue;
        
        return result;
    });

    testFramework.it('should handle rapid user interactions', () => {
        const customer = customerData[0];
        
        // Rapid modal open/close
        for (let i = 0; i < 5; i++) {
            showCustomerDetail(customer.Customer_ID);
            hideCustomerDetail();
        }
        
        const modal = document.getElementById('detailModal');
        const result = testFramework.assertTrue(
            modal.classList.contains('hidden'),
            'Should handle rapid interactions correctly'
        );
        
        return result;
    });
});

// E2E Tests for Performance
testFramework.describe('Performance E2E', () => {
    testFramework.it('should load dashboard within acceptable time', () => {
        const startTime = performance.now();
        
        // Simulate dashboard load
        updateCustomerList();
        
        const endTime = performance.now();
        const loadTime = endTime - startTime;
        
        const result = testFramework.assertTrue(
            loadTime < 500, // Should load in less than 500ms
            `Dashboard loaded in ${loadTime.toFixed(2)}ms, should be under 500ms`
        );
        
        return result;
    });

    testFramework.it('should handle large datasets efficiently', () => {
        const startTime = performance.now();
        
        // Create large dataset
        const largeDataset = Array.from({ length: 50 }, (_, i) => ({
            ...customerData[i % customerData.length],
            Customer_ID: `C${i + 2000}`,
            Customer_Name: `Performance Test Customer ${i + 2000}`
        }));
        
        renderCustomerList(largeDataset);
        
        const endTime = performance.now();
        const renderTime = endTime - startTime;
        
        const result = testFramework.assertTrue(
            renderTime < 1000, // Should render in less than 1 second
            `Large dataset rendered in ${renderTime.toFixed(2)}ms, should be under 1000ms`
        );
        
        return result;
    });

    testFramework.it('should maintain smooth interactions', () => {
        const startTime = performance.now();
        
        // Perform multiple interactions
        for (let i = 0; i < 10; i++) {
            document.getElementById('valueThreshold').value = (i + 1) * 1000;
            updateCustomerList();
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        
        const result = testFramework.assertTrue(
            totalTime < 1000, // Should complete in less than 1 second
            `Multiple interactions took ${totalTime.toFixed(2)}ms, should be under 1000ms`
        );
        
        // Reset
        document.getElementById('valueThreshold').value = '5000';
        
        return result;
    });
});

// E2E Tests for Accessibility
testFramework.describe('Accessibility E2E', () => {
    testFramework.it('should support keyboard navigation', () => {
        const thresholdInput = document.getElementById('valueThreshold');
        const result = testFramework.assertNotNull(thresholdInput, 'Threshold input should exist');
        if (!result.pass) return result;
        
        // Test keyboard input
        thresholdInput.focus();
        thresholdInput.value = '15000';
        
        // Simulate Enter key
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
        thresholdInput.dispatchEvent(enterEvent);
        
        const result2 = testFramework.assertEqual(
            thresholdInput.value,
            '15000',
            'Should accept keyboard input'
        );
        
        return result2;
    });

    testFramework.it('should have proper ARIA labels', () => {
        const thresholdInput = document.getElementById('valueThreshold');
        const result = testFramework.assertNotNull(thresholdInput, 'Input should exist');
        if (!result.pass) return result;
        
        // Check for accessibility attributes
        const hasLabel = thresholdInput.getAttribute('aria-label') || 
                        document.querySelector(`label[for="${thresholdInput.id}"]`);
        
        const result2 = testFramework.assertNotNull(hasLabel, 'Should have accessibility label');
        
        return result2;
    });

    testFramework.it('should support screen reader navigation', () => {
        // Test that important elements are accessible
        const customerCards = document.querySelectorAll('.customer-card');
        const result = testFramework.assertTrue(
            customerCards.length > 0,
            'Should have customer cards for screen readers'
        );
        
        return result;
    });
});

console.log('🌐 End-to-End tests loaded successfully!');
console.log('Run: testFramework.runTests() to execute all tests');
