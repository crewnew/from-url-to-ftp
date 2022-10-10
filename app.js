let https = require("https");
let ftp = require("ftp");
let fs = require("fs");
var DOWNLOAD_DIR = __dirname + "folder/"; // Folder to download

let download = async () => {
  let file_url = "https://domain.com/file.xml"; // Url from where to download
  let file = fs.createWriteStream(DOWNLOAD_DIR + "file.xml", { flags: "w" }); //filename on hard drive
  const request = await https.get(file_url, function (response) {
    response.pipe(file);
  });

  let second_file_url =
    "https://domain.com/file2.xml"; // In case you need another file
  let secondFile = fs.createWriteStream(DOWNLOAD_DIR + "file2.xml", {
    flags: "w",
  });
  const secondRequest = await https.get(second_file_url, function (response) {
    response.pipe(secondFile);
  });
};

download();

let ftpInstance = new ftp();

ftpInstance.on("ready", () => {
  ftpInstance.put("file.xml", "file.xml", (err) => { // file names on upload
    if (err) throw err;
    ftpInstance.end();
  });

  ftpInstance.put("file2.xml", "file2.xml", (err) => { // second file's names
    if (err) throw err;
    ftpInstance.end();
  });
});

ftpInstance.connect({
  host: "ftp.domain.com",
  port: 21,
  password: "password",
  user: "john@domain.com",
});
