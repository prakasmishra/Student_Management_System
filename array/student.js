import fs from "fs";

// Create a Student class
class Student {
    constructor(name, roll, dept,dept_code) {
        this.name = name;
        this.roll = roll;
        this.dept = dept;
        this.dept_code=dept_code;
    }
}

// Sample student object
const student = [
    new Student('Abir Bera', 'CSE1','CSE',1000),
    new Student('Prakash Mishra', 'IT1', 'IT',1002)
]

// Convert student object to JSON format
const studentJSON = JSON.stringify(student);

// Specify the file path
const filePath = '../files/student.txt';

// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading file:', err);
//     } else {
//         try {
//             // Parse the JSON data to get the student object
//             const studentread = JSON.parse(data);
//             console.log('Student data read from file:', studentread.name);
//         } catch (parseError) {
//             console.error('Error parsing JSON:', parseError);
//         }
//     }
// });
// Write the student data to the file
fs.writeFile(filePath, studentJSON, 'utf8', (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Student data has been written to', filePath);
    }
});