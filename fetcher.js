const request = require('request');
const fs = require('fs');

//intake only the necessary arguments
let myArgs = process.argv.slice(2);
let URL = myArgs[0];
let localPath = myArgs[1];

// let URL = "https://attacomsian.com/blog/nodejs-get-file-size"
// let localPath = ".\index5.html";
//console.log('URL:', URL);
//console.log('localPath:', localPath);

let findSizeAndOutput = () => {fs.stat(localPath, (err, stats) => {
    //console.log(stats);
    console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`)
  })
};

let writeBodyToLP = (body, localPath, callback) => {
  //console.log("localPath inside function:", localPath);
  fs.writeFile(localPath, body, { flag: 'w+' }, err => {
    if (err) {
      console.log(err)
      return;
    } else {
      callback();
    }
  });
}

request(URL, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  writeBodyToLP(body, localPath, findSizeAndOutput);
});