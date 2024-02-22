import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

const filePath = 'files/student.txt';
        const fpDept = 'files/dept.txt';
        // console.log("test");
        const deptData = fs.readFileSync(fpDept, 'utf8');
        const depts = JSON.parse(deptData);
        
        // Read existing student data from the file
        const studentData = fs.readFileSync(filePath, 'utf8');
        // // console.log("test1");
        const students = JSON.parse(studentData);

const app = express();
const port = 3000;
class Student {
    constructor(name, roll, dept,dept_code) {
        this.name = name;
        this.roll = roll;
        this.dept = dept;
        this.dept_code=dept_code;
    }
}

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.ejs',{
        departments : depts,
        studentsArray : students
    });
});

app.get('/add', (req, res) => {
    res.render('add.ejs',{
        departments : depts
    });
});

app.get('/edit', (req, res) => {
    res.render('edit.ejs',{
        departments : depts,
        studentsArray : students
    });
});

app.post('/search', (req, res) => {
    const r=req.body.roll;
    res.render('search.ejs',{
        departments : depts,
        studentsArray : students,
        yourRoll: r
    });
});

app.post('/display', (req, res) => {
    const d=req.body.selectedDepartment;
    // console.log(d);
    res.render('display.ejs',{
        departments : depts,
        studentsArray : students,
        deptCheck : d
    });
});

app.post('/delete', (req, res) => {
    const r=req.body.deleteRoll;
    for(let i=0;i<students.length;i++)
    {
        if(students[i].roll === r)
        {
            students.splice(i,1);
        }
    }

    fs.writeFileSync(filePath, JSON.stringify(students), 'utf8');
    res.send("Student data deleted!");
});

app.post('/cancel', (req, res) => {
    res.send("Cancelled adding!");
});

app.post('/edit', (req, res) => {
    const r=req.body.editRoll;
    res.render('edit.ejs',{
        departments : depts,
        studentsArray : students,
        yourRoll: r
    });
});



app.post('/editStudent', (req, res) => {
    try {
        const { eroll,nameEdit} = req.body;

        for(let i=0;i<students.length;i++)
        {
            if(students[i].roll === eroll)
            {
                students[i].name=nameEdit;
                // students[i].dept=selectedDepartment;
                // students[i].dept_code=departmentCode;
            }
        }

        
        // Write the updated array back to the file
        fs.writeFileSync(filePath, JSON.stringify(students), 'utf8');
        // console.log(depts);

        res.send('Data edited successfully!');
    } catch (error) {
        // console.log(depts);
        console.error('Error adding student:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/addStudent', (req, res) => {
    try {
        let departmentCode;
        let max=0;
        const { name,selectedDepartment} = req.body;
        for(let i=0;i<depts.length;i++)
        {
            if(depts[i].name === selectedDepartment)
            {
                departmentCode=depts[i].dept_code;
            }
        }
        // console.log(depts);
        for(let i=0;i<students.length;i++)
        {
            if(students[i].dept === selectedDepartment)
            {
                max++;
            }
        }

        const roll= selectedDepartment+(max+1);

        const newStudent = new Student(name,roll,selectedDepartment,departmentCode);


        // Add the new student to the existing array
        students.push(newStudent);

        // Write the updated array back to the file
        fs.writeFileSync(filePath, JSON.stringify(students), 'utf8');
        // console.log(depts);

        res.send('Student added successfully!');
    } catch (error) {
        // console.log(depts);
        console.error('Error adding student:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});