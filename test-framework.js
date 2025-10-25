/**
 * Comprehensive Test Framework for Telecom Churn Prediction Dashboard
 * Supports Unit Tests, Integration Tests, and E2E Tests
 */

class TestFramework {
    constructor() {
        this.tests = [];
        this.results = [];
        this.startTime = null;
        this.endTime = null;
    }

    // Test registration methods
    describe(suiteName, testFunction) {
        console.log(`\n🧪 Test Suite: ${suiteName}`);
        console.log('='.repeat(50));
        testFunction();
    }

    it(testName, testFunction) {
        this.tests.push({
            name: testName,
            function: testFunction,
            suite: this.currentSuite || 'Default'
        });
    }

    // Assertion methods
    assertEqual(actual, expected, message = '') {
        if (actual === expected) {
            return { pass: true, message: message || `✅ ${actual} === ${expected}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected ${expected}, got ${actual}`,
                actual,
                expected
            };
        }
    }

    assertNotEqual(actual, expected, message = '') {
        if (actual !== expected) {
            return { pass: true, message: message || `✅ ${actual} !== ${expected}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected not ${expected}, got ${actual}`,
                actual,
                expected
            };
        }
    }

    assertTrue(condition, message = '') {
        if (condition === true) {
            return { pass: true, message: message || `✅ Condition is true` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected true, got ${condition}`,
                actual: condition,
                expected: true
            };
        }
    }

    assertFalse(condition, message = '') {
        if (condition === false) {
            return { pass: true, message: message || `✅ Condition is false` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected false, got ${condition}`,
                actual: condition,
                expected: false
            };
        }
    }

    assertContains(array, item, message = '') {
        if (array.includes(item)) {
            return { pass: true, message: message || `✅ Array contains ${item}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Array does not contain ${item}`,
                actual: array,
                expected: item
            };
        }
    }

    assertNotContains(array, item, message = '') {
        if (!array.includes(item)) {
            return { pass: true, message: message || `✅ Array does not contain ${item}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Array contains ${item}`,
                actual: array,
                expected: `not ${item}`
            };
        }
    }

    assertGreaterThan(actual, expected, message = '') {
        if (actual > expected) {
            return { pass: true, message: message || `✅ ${actual} > ${expected}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected ${actual} > ${expected}`,
                actual,
                expected
            };
        }
    }

    assertLessThan(actual, expected, message = '') {
        if (actual < expected) {
            return { pass: true, message: message || `✅ ${actual} < ${expected}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected ${actual} < ${expected}`,
                actual,
                expected
            };
        }
    }

    assertNotNull(value, message = '') {
        if (value !== null && value !== undefined) {
            return { pass: true, message: message || `✅ Value is not null` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected not null, got ${value}`,
                actual: value,
                expected: 'not null'
            };
        }
    }

    assertNull(value, message = '') {
        if (value === null || value === undefined) {
            return { pass: true, message: message || `✅ Value is null` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected null, got ${value}`,
                actual: value,
                expected: null
            };
        }
    }

    assertType(value, expectedType, message = '') {
        const actualType = typeof value;
        if (actualType === expectedType) {
            return { pass: true, message: message || `✅ Type is ${expectedType}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected type ${expectedType}, got ${actualType}`,
                actual: actualType,
                expected: expectedType
            };
        }
    }

    assertInstanceOf(value, expectedClass, message = '') {
        if (value instanceof expectedClass) {
            return { pass: true, message: message || `✅ Instance of ${expectedClass.name}` };
        } else {
            return { 
                pass: false, 
                message: message || `❌ Expected instance of ${expectedClass.name}`,
                actual: value.constructor.name,
                expected: expectedClass.name
            };
        }
    }

    // Test execution methods
    async runTests() {
        console.log('🚀 Starting Automated Test Suite');
        console.log('='.repeat(60));
        
        this.startTime = Date.now();
        let passed = 0;
        let failed = 0;

        for (const test of this.tests) {
            try {
                console.log(`\n🔍 Running: ${test.name}`);
                const result = await test.function();
                
                if (result && result.pass) {
                    console.log(`✅ PASS: ${test.name}`);
                    passed++;
                } else {
                    console.log(`❌ FAIL: ${test.name}`);
                    if (result && result.message) {
                        console.log(`   ${result.message}`);
                    }
                    failed++;
                }
                
                this.results.push({
                    name: test.name,
                    suite: test.suite,
                    passed: result ? result.pass : false,
                    message: result ? result.message : 'No result',
                    timestamp: new Date().toISOString()
                });
                
            } catch (error) {
                console.log(`💥 ERROR: ${test.name}`);
                console.log(`   ${error.message}`);
                failed++;
                
                this.results.push({
                    name: test.name,
                    suite: test.suite,
                    passed: false,
                    message: `Error: ${error.message}`,
                    timestamp: new Date().toISOString()
                });
            }
        }

        this.endTime = Date.now();
        const duration = this.endTime - this.startTime;

        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⏱️  Duration: ${duration}ms`);
        console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);

        return {
            passed,
            failed,
            total: passed + failed,
            duration,
            successRate: (passed / (passed + failed)) * 100,
            results: this.results
        };
    }

    // Utility methods
    generateReport() {
        const summary = {
            timestamp: new Date().toISOString(),
            totalTests: this.results.length,
            passed: this.results.filter(r => r.passed).length,
            failed: this.results.filter(r => !r.passed).length,
            duration: this.endTime - this.startTime,
            results: this.results
        };

        return JSON.stringify(summary, null, 2);
    }

    saveReport(filename = 'test-report.json') {
        const report = this.generateReport();
        
        // In browser environment
        if (typeof window !== 'undefined') {
            const blob = new Blob([report], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
        }
        
        // In Node.js environment
        if (typeof require !== 'undefined') {
            const fs = require('fs');
            fs.writeFileSync(filename, report);
        }
        
        console.log(`📄 Test report saved as ${filename}`);
    }
}

// Global test framework instance
window.testFramework = new TestFramework();

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TestFramework;
}

console.log('🧪 Test Framework loaded successfully!');
console.log('Usage: testFramework.describe("Suite Name", () => { testFramework.it("Test Name", () => { /* test code */ }); });');
