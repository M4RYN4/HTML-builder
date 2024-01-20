// BRD: `bundle.css` s.b in folder `project-dist` (already exist & has HTML with path to it href="bundle.css")
// 1. Import all required modules.
// 2. Read the contents of the `styles` folder.
// 3. Check if an object in the folder is a file and has the correct file extension.
// 4. Read the style file.
// 5. Write the read data to an array.
// 6. Write the array of styles to the `bundle.css` file.

const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'styles');
const pathToDestCSS = path.join(__dirname, 'project-dist', 'bundle.css');
//fs.createWriteStream(path[, options])->make a writable stream for writing data to a file
const ws = fs.createWriteStream(pathToDestCSS);
//2.fs.readdir(path[, options], callback)-read the contents of  dir
// option { withFileTypes: true } - if obj file
// callback (err, files)
fs.readdir(pathToFolder, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
     }
    files.forEach((item) => {
        //3. object is a file:
        if (item.isFile()) {
        //path.join([...paths])->(pathToSecretFolder + name of file (Dirent name))
        const filePath = path.join(pathToFolder, item.name);
        const fileExt = path.extname(filePath);

          if (fileExt === '.css') {
            //fs.createReadStream(path[, options])->to open up a file/stream to read data
            const rs = fs.createReadStream(filePath);
            //.'pipe' event->for connecting read stream & write stream
            rs.pipe(ws);
          }
        }
    });
});