// 1. Import the necessary modules for task execution:
// 2. Create a new **ReadStream** from the file `text.txt`.
// 3. Direct the read stream to the standard output stream.

//rs.on('data', (txt) => console.log(txt.toString());
//rs.on('data', (txt) => process.stdout.write(txt));

//fs.createReadStream(path, options)
const fs = require('fs');
const path = require('path');

const pathToTxt = path.join(__dirname, 'text.txt');
//2.fs.createReadStream(path[, options])->to open up a file/stream to read data
const rs = fs.createReadStream(pathToTxt);

rs.on('data', (txt) => {
  console.log(txt.toString());
});