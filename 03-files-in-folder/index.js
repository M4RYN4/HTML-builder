const fs = require('fs');
const path = require('path');

const pathToSecretFolder = path.join(__dirname, 'secret-folder');
//2.fs.readdir(path[, options], callback)-read the contents of  dir
// option { withFileTypes: true } - if obj file
// callback (err, files)
fs.readdir(pathToSecretFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
       console.log(err);
    }
    files.map((item) => {
    //4. object is a file:
      if (item.isFile()) {
        //path.join([...paths])->(pathToSecretFolder + name of file (Dirent name))
        const filePath = path.join(pathToSecretFolder, item.name);
        //path.extname('.index.md');//->.md->remove 1st .
        const fileExt = path.extname(filePath).slice(1);
        // console.log(item.name);//data.csv ->
        const fileName = item.name.replace(`.${fileExt}`, '');
        displayFileData(fileName, fileExt, filePath);
      }
    });
});
//5.display:
const displayFileData = (fileName, fileExt, filePath) => {
  // fs.stat(path[, options], callback)
  // callback (err, files)
  fs.stat(filePath, (err, files) => {
    if (err) {
        console.log(err);
    }
    //!!!!32.7 KB (33,517 bytes)- actual size of data.csv -> checked file
    //`<file name>-<file extension>-<file size>`
    //`example - txt - 128.369kb`

    //.size in bytes-> kb = .size /1024: data - csv - 32.7314453125kb
    //(files.size / 1024).toFixed(3)->data - csv - 32.731kb
    console.log(`${fileName} - ${fileExt} - ${(files.size / 1024).toFixed(3)}kb`);
  });
}