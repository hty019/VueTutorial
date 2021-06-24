class Employee {

    constructor(
        private _fullName:string,
        private _age:number,
        private _jobTitle:string,
        private _hourlyRate:number,
        public workingHoursPerWeek:number){

    }
    printEmployeeDetails = ():void => {
        console.log('tempString');
        console.log(`${this.fullName}의 직업은 ${this.jobTitle} 이고 일주일의 수입은 ${this.hourlyRate*this.workingHoursPerWeek} 달러이다.`)
        console.log("그리고 슬슬 JPA 고급 강의 들어야한다.");
    }
}

let employee1 = new Employee();
employee1.printEmployeeDetails();
