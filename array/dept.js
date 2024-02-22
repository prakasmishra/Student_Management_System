import fs from "fs";

// Create a dept class
class Department {
    constructor(name, dept_code) {
        this.name = name;
        this.dept_code = dept_code;
    }
}

// Sample dept object
const dept = [
    new Department('CSE',1000 ),
    new Department('ETCE',1001 ),
    new Department('IT',1002 ),
    new Department('EE',1003 ),
    new Department('ME',1004 )
]

// Convert dept object to JSON format
const deptJSON = JSON.stringify(dept);

// Specify the file path
const filePath = 'files/dept.txt';

fs.writeFile(filePath, deptJSON, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('dept data has been written to', filePath);
    }
});