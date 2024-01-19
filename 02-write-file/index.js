const fs = require('fs');
const path = require('path');
const { stdin, stdout } = require('process');

const pathToTxt = path.join(__dirname, 'NewText.txt');
const ws = fs.createWriteStream(pathToTxt, 'utf-8');
//welcome message:
stdout.write('Hi! Please enter your message:\n');
//funcs to exit if:
process.on('SIGINT', () => {//ctrl + c btn
    process.exit();
});

process.on('exit', () => {
  console.log('Good luck! See you later!')
});
//check if word "exit" is present:
stdin.on('data', (data) => {
  ws.write(data);//-> continue until "exit" or (ctrl+c) btn
    if (data.toString().includes('exit')) {
      process.exit();
    }
});