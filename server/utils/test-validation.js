const { studentCreateSchema, studentUpdateSchema } = require('../validations/studentValidation');

const testCases = [
    {
        name: 'Valid student creation',
        schema: studentCreateSchema,
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            age: 20,
            address: '123 Main St'
        },
        expectedValid: true
    },
    {
        name: 'Missing name',
        schema: studentCreateSchema,
        data: {
            email: 'john@example.com',
            age: 20,
            address: '123 Main St'
        },
        expectedValid: false
    },
    {
        name: 'Invalid email',
        schema: studentCreateSchema,
        data: {
            name: 'John Doe',
            email: 'not-an-email',
            age: 20,
            address: '123 Main St'
        },
        expectedValid: false
    },
    {
        name: 'Negative age',
        schema: studentCreateSchema,
        data: {
            name: 'John Doe',
            email: 'john@example.com',
            age: -5,
            address: '123 Main St'
        },
        expectedValid: false
    },
    {
        name: 'Valid update (partial)',
        schema: studentUpdateSchema,
        data: {
            age: 25
        },
        expectedValid: true
    },
    {
        name: 'Empty update',
        schema: studentUpdateSchema,
        data: {},
        expectedValid: false
    }
];

console.log('--- Joi Validation Test ---');
let passed = 0;
testCases.forEach((tc, index) => {
    const { error } = tc.schema.validate(tc.data);
    const isValid = !error;
    if (isValid === tc.expectedValid) {
        console.log(`[PASS] Case ${index + 1}: ${tc.name}`);
        passed++;
    } else {
        console.log(`[FAIL] Case ${index + 1}: ${tc.name}`);
        if (error) {
            console.log('      Error details:', error.details.map(d => d.message).join(', '));
        } else {
            console.log('      Expected error but none found.');
        }
    }
});

console.log(`\nResults: ${passed}/${testCases.length} passed.`);
if (passed === testCases.length) {
    process.exit(0);
} else {
    process.exit(1);
}
