// 1. Import all required modules.
// 2. Create a writable stream to a text file.
// 3. Display a welcome message in the console.
// 4. Wait for user input, with subsequent checking for the presence of the keyword `exit`.
// 5. Write the entered text to the file.
// 6. Wait for further input.
// 7. Implement a farewell message when the process is stopped.

const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const pathToTxt = path.join(__dirname, 'NewText.txt');
//2.fs.createWriteStream(path[, options])->make a writable stream for writing data to a file
const ws = fs.createWriteStream(pathToTxt);
//3.
process.stdout.write('Hi! Please enter your message:\n');
//funcs to exit if:
process.on('SIGINT', () => {//ctrl + c btn
    process.exit();
});

process.on('exit', () => {
  console.log('Good luck! See you later!')
});
//check if word "exit" is present:
process.stdin.on('data', (data) => {
  ws.write(data);//-> continue until "exit" or (ctrl+c) btn
    if (data.toString().includes('exit')) {
      process.exit();
    }
});