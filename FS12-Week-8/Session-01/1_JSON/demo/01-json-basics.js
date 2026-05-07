// Demo: JSON Basics - Converting between objects and JSON strings

// A regular JavaScript object
const student = { "name": "Alice", "age": 25, "enrolled": true };

console.log(student.age);

// Convert the object into a JSON string (for sending or storing)
const jsonString = JSON.stringify(student);
console.log("JSON string:", jsonString);
console.log("Type:", typeof jsonString);

// I can try really hard to see the age, but this wont work because STRINGS are not OBJECTS
// this jsonString is what you will get back from rest APIS and will have to be converted into OBJECTS
console.log(jsonString.age)

const parsed = JSON.parse(jsonString)
console.log("Parsed object:", parsed);
console.log("Name:", parsed.name);
