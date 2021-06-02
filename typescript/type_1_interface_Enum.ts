let studentID: number = 12345;
let studentName:string = 'Jenny Kim';
let age:number = 21;
let gender:string = 'female';
let subject:string = 'Javascript';
let courseCompleted:boolean = false;

enum GenderType {
    Male = 'male',
    Female = 'female',
    genderNeutral = 'genderNeutral'
}

let student1:Student = {
    studentID:12345,
    studentName:'Jenny Kim',
    gender:'male',
    subject:'Javascript',
    courseCompleted:false
}

interface Student { // 인터페이스는 App 내에서 스트링이나 넘버처럼 사용가능
    readonly studentID: number
    studentName: string
    age?: number
    gender: 'male'|'female'|'genderNeutral'
    subject: string
    courseCompleted: boolean
    // addComment (comment: string): string
    addComment?: (comment:string) => string
}

function getStudentDetails(studentID: number): Student{
    return {
        studentID:12345,
        studentName:'Jenny Kim',
        gender:'male',
        subject:'Javascript',
        courseCompleted:false
    }
}

function saveStudentDetails(student:Student):void {
    
}
saveStudentDetails(student1)