// brd:
// 1. Import all required modules.
// 2. Create the `files-copy` folder if it does not exist yet.
// 3. Read the contents of the `files` folder.
// 4. Copy files from the `files` folder to the `files-copy` folder.
const fs = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'files');
const pathToDestFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
  try {
    //2. fsPromises.mkdir(path[, options])-to create dir
    //path-path of dir to be created
    //options-{ recursive: true }-> as otherwise, error if dir already exists
    await fs.mkdir(pathToDestFolder, { recursive: true });
    //3. fs.readdir(path)-read the contents of  dir
    const files = await fs.readdir(pathToFolder);

    for (const x of files) {
      const src = path.join(pathToFolder, x);
      const dest = path.join(pathToDestFolder, x);
      //4. fsPromises.copyFile(src, dest[, mode])
      //dest is overwritten if it already exists
      await fs.copyFile(src, dest);
    }
    console.log('The folded copied successfully.');
  } catch (error) {
    console.log(`The folder could not be copied: ${error}`);
  }
}

copyDir();