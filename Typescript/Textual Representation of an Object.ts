class Student {
  constructor(name, major) {
    this.name = name;
    this.major = major;
  }

  toString() {
    return `I am ${this.name} and I study ${this.major}`;
  }
}

const student = new Student('Alice', 'Chemistry');
console.log(student.toString());
