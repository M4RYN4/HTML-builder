// const fs = require('fs');
// const path = require('path');
// const data = '';//in case, data is not provided

// const pathToTxt = path.join(__dirname, 'text.txt');
// const rs = fs.createReadStream(pathToTxt, 'utf-8');

//process.stdout.write() better than console.log() as c.l() might show unreadable chars
//rs.on('data', (txt) => console.log(txt));
//rs.on('data', (txt) => process.stdout.write(txt));

//fs.createReadStream(path, options)
const fs = require('fs');
const path = require('path');

const pathToTxt = path.join(__dirname, 'text.txt');
const createReader = fs.createReadStream(pathToTxt, 'utf-8'); 

createReader.on('data', (data) => {
  console.log(data.toString());
});