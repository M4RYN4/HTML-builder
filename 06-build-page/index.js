// 1. Import all required modules. y
// 2. Read and save the template file in a variable.
// 3. Find all tag names in the template file.
// 4. Replace template tags with the content of component files.
// 5. Write the modified template to the `index.html` file in the `project-dist` folder.
// 6. Use the script written in task **05-merge-styles** to create the `style.css` file.
// 7. Use the script from task **04-copy-directory** to move the `assets` folder into the `project-dist` folder.

//NEW folder `project-dist` s.h index.html file & style.css file &assets folder
const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathToFolderSourceAssets = path.join(__dirname, 'assets');
const pathToFolderDestAssets = path.join(__dirname, 'project-dist', 'assets');

//from task 4. Copy folder assets -> & move to folder:
async function copyDirAssets(pathToFolderSourceAssets, pathToProjFolder) {
  try {
    //2. fsPromises.mkdir(path[, options])-to create dir
    //path-path of dir to be created
    //options-{ recursive: true }-> as otherwise, error if dir already exists
    await fsPromises.mkdir(pathToProjFolder, { recursive: true });
    //fs.readdir(path[, options], callback)-read the contents of  dir
    // option { withFileTypes: true } - if obj file
    const files = await fsPromises.readdir(pathToFolderSourceAssets, { withFileTypes: true });

    files.forEach((item) => {
      const src = path.join(pathToFolderSourceAssets, item.name);
      const dest = path.join(pathToProjFolder, item.name);
      //object is a dir
      if (item.isDirectory()) {
        copyDirAssets(src, dest);
      } else {
      //4. fsPromises.copyFile(src, dest[, mode])
      //dest is overwritten if it already exists
        fsPromises.copyFile(src, dest);
      }
    });
  } catch (error) {
    console.log(`The folder with assets could not be copied: ${error}`);
  }
}

//3.     from task 5. Combine CSS files to one ->& move to folder:
async function combineCSS() {
    const pathToFolderSourceCSS = path.join(__dirname, 'styles');
    const pathToDestCSS = path.join(__dirname, 'project-dist', 'style.css');
      try {
      const files = await fsPromises.readdir(pathToFolderSourceCSS, { withFileTypes: true });
      //fs.createWriteStream(path[, options])->make a writable stream for writing data to a file
      const ws = fs.createWriteStream(pathToDestCSS);

      files.forEach((item) => {
          //object is a file:
          if (item.isFile()) {
              //path.join([...paths])->(pathToSecretFolder + name of file (Dirent name))
              const filePath = path.join(pathToFolderSourceCSS, item.name);
              const fileExt = path.extname(filePath);

              if (fileExt === '.css') {
              //fs.createReadStream(path[, options])->to open up a file/stream to read data
              const rs = fs.createReadStream(filePath);
              //.'pipe' event->for connecting read stream & write stream
              rs.pipe(ws);
              }
            }
         });
      } catch (error) {
      console.log(`The folder with CSS files could not be combined: ${error}`);
    }
  }

//2.
async function combineHTML() {
    const pathToSourceTemplateFile = path.join(__dirname, 'template.html');
    const pathToSourceComponentsFolder = path.join(__dirname, 'components');
    const pathToDestHTMLFile = path.join(__dirname, 'project-dist', 'index.html');
    //2.1
    await copyHTMLFile(pathToSourceTemplateFile, pathToDestHTMLFile);

    let HTMLfile = await fsPromises.readFile(pathToDestHTMLFile, 'utf-8');
    //fs.readdir(path[, options], callback)-read the contents of  dir
    // option { withFileTypes: true } - if obj file -option 'utf-8' is must!!
    const componentsUnreadable = await fsPromises.readdir(pathToSourceComponentsFolder, { withFileTypes: true});
  //call on 2.2 -1 components HTML-done
    const HTMLfinal = await removeUnreadableFromHTML(HTMLfile, componentsUnreadable, pathToSourceComponentsFolder);
    // fs.writeFile(file-desc, data[, options], callback)-> to write data to a file
    await fsPromises.writeFile(pathToDestHTMLFile, HTMLfinal);
}

  //2.1
  async function copyHTMLFile(srcPath, destPath) {
    //fs.readdir(path[, options], callback)-read the contents of  dir
    const content = await fsPromises.readFile(srcPath);
    // fs.writeFile(file, data[, options], callback)-> to write data to a file
    await fsPromises.writeFile(destPath, content);
  }
  //2.2
  async function removeUnreadableFromHTML(HTMLfile, files, pathDir) {
    for (let i = 0; i < files.length; i++) {
      const fileExt = path.join(pathDir, files[i].name);

      if (files[i].isFile() && path.extname(fileExt) === '.html') {
        const fileName = files[i].name.slice(0, files[i].name.lastIndexOf('.'));
        //fs.readFile(file[, options])->to read the file
        const srcData = await fsPromises.readFile(fileExt);

        HTMLfile = HTMLfile.replace(`{{${fileName}}}`, srcData);
      }

    }
    return HTMLfile;
  }

//1
async function createFolderProjDist() {
    const pathToProjFolder = path.join(__dirname, 'project-dist');
    //2. fsPromises.mkdir(path[, options])-to create dir
    //path-path of dir to be created
    //options-{ recursive: true }-> as otherwise, error if dir already exists
    await fsPromises.mkdir(pathToProjFolder, { recursive: true });
    await combineHTML();
    await combineCSS();
    await copyDirAssets(pathToFolderSourceAssets, pathToFolderDestAssets);
}

createFolderProjDist();