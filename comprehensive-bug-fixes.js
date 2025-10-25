/**
 * Comprehensive Visual Enhancement Bug Fixes
 * Addresses all potential issues identified during testing
 */

// Apply all bug fixes to the current page
function applyAllVisualEnhancementFixes() {
    console.log('🔧 Applying Comprehensive Visual Enhancement Fixes...\n');
    
    let fixesApplied = 0;
    let totalFixes = 0;
    
    // Fix 1: Ensure ARR Input Field has all required classes
    function fixARRInputField() {
        const arrInput = document.querySelector('#valueThreshold');
        if (!arrInput) {
            console.error('❌ ARR input field not found');
            return false;
        }
        
        const requiredClasses = [
            'w-32', 'h-12', 'pl-8', 'pr-4', 'text-lg', 'font-bold', 
            'text-orange-800', 'bg-white', 'border-2', 'border-orange-300', 
            'rounded-lg', 'focus:outline-none', 'focus:ring-4', 'focus:ring-orange-200', 
            'focus:border-orange-500', 'transition-all', 'duration-200', 'shadow-md', 'hover:shadow-lg'
        ];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!arrInput.classList.contains(className)) {
                arrInput.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to ARR input field`);
            return true;
        }
        return false;
    }
    
    // Fix 2: Ensure Customer Cards have all required classes
    function fixCustomerCards() {
        const customerCards = document.querySelectorAll('.customer-card');
        if (customerCards.length === 0) {
            console.error('❌ No customer cards found');
            return false;
        }
        
        const requiredClasses = [
            'bg-gradient-to-br', 'from-white', 'to-gray-50', 'rounded-xl', 
            'shadow-lg', 'p-6', 'border-2', 'border-gray-200', 'hover:shadow-2xl', 
            'hover:border-orange-400', 'hover:scale-105', 'transition-all', 
            'duration-300', 'cursor-pointer', 'transform'
        ];
        
        let totalApplied = 0;
        customerCards.forEach((card, index) => {
            let applied = 0;
            requiredClasses.forEach(className => {
                if (!card.classList.contains(className)) {
                    card.classList.add(className);
                    applied++;
                }
            });
            if (applied > 0) {
                console.log(`✅ Applied ${applied} missing classes to customer card ${index + 1}`);
                totalApplied += applied;
            }
        });
        
        return totalApplied > 0;
    }
    
    // Fix 3: Ensure Customer Names have proper styling
    function fixCustomerNames() {
        const customerNames = document.querySelectorAll('.customer-card h3');
        if (customerNames.length === 0) {
            console.error('❌ No customer names found');
            return false;
        }
        
        const requiredClasses = ['text-xl', 'font-bold', 'text-gray-900'];
        
        let totalApplied = 0;
        customerNames.forEach((name, index) => {
            let applied = 0;
            requiredClasses.forEach(className => {
                if (!name.classList.contains(className)) {
                    name.classList.add(className);
                    applied++;
                }
            });
            if (applied > 0) {
                console.log(`✅ Applied ${applied} missing classes to customer name ${index + 1}`);
                totalApplied += applied;
            }
        });
        
        return totalApplied > 0;
    }
    
    // Fix 4: Ensure ARR Displays have proper styling
    function fixARRDisplays() {
        const arrDisplays = document.querySelectorAll('.customer-card .text-2xl');
        if (arrDisplays.length === 0) {
            console.error('❌ No ARR displays found');
            return false;
        }
        
        const requiredClasses = ['text-2xl', 'font-bold', 'text-orange-600'];
        
        let totalApplied = 0;
        arrDisplays.forEach((display, index) => {
            let applied = 0;
            requiredClasses.forEach(className => {
                if (!display.classList.contains(className)) {
                    display.classList.add(className);
                    applied++;
                }
            });
            if (applied > 0) {
                console.log(`✅ Applied ${applied} missing classes to ARR display ${index + 1}`);
                totalApplied += applied;
            }
        });
        
        return totalApplied > 0;
    }
    
    // Fix 5: Ensure Container has proper grid classes
    function fixContainerGrid() {
        const container = document.querySelector('#customerListContainer');
        if (!container) {
            console.error('❌ Customer list container not found');
            return false;
        }
        
        const requiredClasses = ['grid', 'grid-cols-1', 'lg:grid-cols-2', 'xl:grid-cols-3', 'gap-6'];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!container.classList.contains(className)) {
                container.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to container grid`);
            return true;
        }
        return false;
    }
    
    // Fix 6: Ensure Confirmation Message has proper structure
    function fixConfirmationMessage() {
        const confirmation = document.querySelector('#saveConfirmation');
        if (!confirmation) {
            console.error('❌ Confirmation element not found');
            return false;
        }
        
        // Check if confirmation has proper structure
        const hasProperStructure = confirmation.querySelector('.bg-green-50') && 
                                  confirmation.querySelector('svg') && 
                                  confirmation.querySelector('.text-lg') && 
                                  confirmation.querySelector('.text-sm');
        
        if (!hasProperStructure) {
            confirmation.innerHTML = `
                <div class="flex items-center space-x-3 px-4 py-3 bg-green-50 border-2 border-green-200 rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-green-600 animate-pulse">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                        <div class="text-lg font-bold text-green-800">Intervention Successfully Logged!</div>
                        <div class="text-sm text-green-600">Critical action data saved for audit trail</div>
                    </div>
                </div>
            `;
            console.log('✅ Fixed confirmation message structure');
            return true;
        }
        return false;
    }
    
    // Fix 7: Ensure Save Button has proper styling
    function fixSaveButton() {
        const saveButton = document.querySelector('button[onclick*="saveNoteLocally"]');
        if (!saveButton) {
            console.error('❌ Save button not found');
            return false;
        }
        
        const requiredClasses = [
            'px-6', 'py-3', 'bg-gradient-to-r', 'from-orange-500', 'to-orange-600', 
            'text-white', 'font-semibold', 'rounded-lg', 'hover:from-orange-600', 
            'hover:to-orange-700', 'transition-all', 'duration-200', 'shadow-md', 
            'hover:shadow-lg', 'transform', 'hover:scale-105'
        ];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!saveButton.classList.contains(className)) {
                saveButton.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to save button`);
            return true;
        }
        return false;
    }
    
    // Fix 8: Ensure Filter Status has proper structure
    function fixFilterStatus() {
        const filterStatus = document.querySelector('#filterStatus');
        if (!filterStatus) {
            console.error('❌ Filter status element not found');
            return false;
        }
        
        // Check if filter status has proper structure
        const hasProperStructure = filterStatus.querySelector('.bg-orange-200') && 
                                 filterStatus.querySelector('svg');
        
        if (!hasProperStructure) {
            filterStatus.innerHTML = `
                <div class="inline-flex items-center px-4 py-2 bg-orange-200 text-orange-800 rounded-lg font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Filter Active: Showing high-value customers only
                </div>
            `;
            console.log('✅ Fixed filter status structure');
            return true;
        }
        return false;
    }
    
    // Fix 9: Ensure ARR Container has proper styling
    function fixARRContainer() {
        const arrContainer = document.querySelector('#valueThreshold')?.closest('.bg-gradient-to-r');
        if (!arrContainer) {
            console.error('❌ ARR container not found');
            return false;
        }
        
        const requiredClasses = [
            'bg-gradient-to-r', 'from-orange-50', 'to-orange-100', 'rounded-xl', 
            'p-6', 'border-2', 'border-orange-200', 'shadow-lg', 'mb-6'
        ];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!arrContainer.classList.contains(className)) {
                arrContainer.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to ARR container`);
            return true;
        }
        return false;
    }
    
    // Fix 10: Ensure ARR Label has proper styling
    function fixARRLabel() {
        const arrLabel = document.querySelector('label[for="valueThreshold"]');
        if (!arrLabel) {
            console.error('❌ ARR label not found');
            return false;
        }
        
        const requiredClasses = ['text-lg', 'font-semibold', 'text-orange-800', 'whitespace-nowrap'];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!arrLabel.classList.contains(className)) {
                arrLabel.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to ARR label`);
            return true;
        }
        return false;
    }
    
    // Fix 11: Ensure Reset Button has proper styling
    function fixResetButton() {
        const resetButton = document.querySelector('button[onclick="resetFilters()"]');
        if (!resetButton) {
            console.error('❌ Reset button not found');
            return false;
        }
        
        const requiredClasses = [
            'px-6', 'py-3', 'bg-orange-600', 'text-white', 'font-semibold', 
            'rounded-lg', 'hover:bg-orange-700', 'transition-all', 'duration-200', 
            'shadow-md', 'hover:shadow-lg', 'transform', 'hover:scale-105'
        ];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!resetButton.classList.contains(className)) {
                resetButton.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to reset button`);
            return true;
        }
        return false;
    }
    
    // Fix 12: Ensure Responsive Design classes
    function fixResponsiveDesign() {
        const arrContainerFlex = document.querySelector('#valueThreshold')?.closest('.flex');
        if (!arrContainerFlex) {
            console.error('❌ ARR container flex not found');
            return false;
        }
        
        const requiredClasses = ['flex-col', 'sm:flex-row', 'items-center', 'justify-center', 'gap-4'];
        
        let applied = 0;
        requiredClasses.forEach(className => {
            if (!arrContainerFlex.classList.contains(className)) {
                arrContainerFlex.classList.add(className);
                applied++;
            }
        });
        
        if (applied > 0) {
            console.log(`✅ Applied ${applied} missing classes to responsive design`);
            return true;
        }
        return false;
    }
    
    // Fix 13: Ensure Priority Indicators exist
    function fixPriorityIndicators() {
        const customerCards = document.querySelectorAll('.customer-card');
        if (customerCards.length === 0) {
            console.error('❌ No customer cards found');
            return false;
        }
        
        let totalApplied = 0;
        customerCards.forEach((card, index) => {
            const nameContainer = card.querySelector('h3')?.parentElement;
            if (nameContainer && !nameContainer.querySelector('.w-3.h-3')) {
                const indicator = document.createElement('div');
                indicator.className = 'w-3 h-3 rounded-full bg-gray-500';
                nameContainer.insertBefore(indicator, nameContainer.firstChild);
                console.log(`✅ Created priority indicator for card ${index + 1}`);
                totalApplied++;
            }
        });
        
        return totalApplied > 0;
    }
    
    // Fix 14: Ensure Risk Score Color Coding
    function fixRiskScoreColorCoding() {
        const customerCards = document.querySelectorAll('.customer-card');
        if (customerCards.length === 0) {
            console.error('❌ No customer cards found');
            return false;
        }
        
        let totalApplied = 0;
        customerCards.forEach((card, index) => {
            const riskScoreElement = card.querySelector('[class*="bg-red-100"], [class*="bg-orange-100"], [class*="bg-green-100"]');
            
            if (!riskScoreElement) {
                // Find risk score element and add default color
                const riskElements = card.querySelectorAll('[class*="Risk"]');
                if (riskElements.length > 0) {
                    riskElements[0].classList.add('bg-green-100', 'text-green-800', 'px-4', 'py-2', 'rounded-lg', 'text-lg', 'font-bold', 'border-2', 'border-green-200');
                    console.log(`✅ Added default color coding to risk score ${index + 1}`);
                    totalApplied++;
                }
            }
        });
        
        return totalApplied > 0;
    }
    
    // Apply all fixes
    const fixFunctions = [
        fixARRInputField,
        fixCustomerCards,
        fixCustomerNames,
        fixARRDisplays,
        fixContainerGrid,
        fixConfirmationMessage,
        fixSaveButton,
        fixFilterStatus,
        fixARRContainer,
        fixARRLabel,
        fixResetButton,
        fixResponsiveDesign,
        fixPriorityIndicators,
        fixRiskScoreColorCoding
    ];
    
    fixFunctions.forEach((fixFunction, index) => {
        try {
            totalFixes++;
            const applied = fixFunction();
            if (applied) {
                fixesApplied++;
            }
        } catch (error) {
            console.error(`❌ Error in fix ${index + 1}:`, error);
        }
    });
    
    console.log(`\n📊 Bug Fix Summary:`);
    console.log(`✅ Fixes applied: ${fixesApplied}/${totalFixes}`);
    console.log(`❌ Fixes failed: ${totalFixes - fixesApplied}/${totalFixes}`);
    console.log(`🎯 Success rate: ${((fixesApplied / totalFixes) * 100).toFixed(1)}%`);
    
    if (fixesApplied === totalFixes) {
        console.log('\n🎉 All visual enhancement bugs have been fixed!');
    } else if (fixesApplied > 0) {
        console.log('\n✅ Some visual enhancement bugs have been fixed!');
    } else {
        console.log('\n✨ No bugs found - all visual enhancements are already correct!');
    }
    
    return {
        fixesApplied,
        totalFixes,
        successRate: (fixesApplied / totalFixes) * 100
    };
}

// Export for use
window.applyAllVisualEnhancementFixes = applyAllVisualEnhancementFixes;

console.log('🔧 Comprehensive Visual Enhancement Bug Fixer Loaded');
console.log('Run: applyAllVisualEnhancementFixes()');
console.log('This will check and fix any missing classes or structural issues');
