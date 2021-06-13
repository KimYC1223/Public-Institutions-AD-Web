const fs = require('fs')

console.log("Data load start...");
const dataBuffer = fs.readFileSync('./data_utf.json')
console.log("Data load as byte...");

const dataJSON = dataBuffer.toString()
console.log("Byte -> String format change complete...");

//console.log(dataJSON)

const data= JSON.parse(dataJSON)
console.log("JSON parsing complete...")

console.log(data[2].hostName)