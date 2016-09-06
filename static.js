module.exports = function(request, response){  
  var fs = require('fs');
  var url = request.url;
  var sections;
  var folderName;
  var filePath;
  var folderType;
  var filePath;
  function readWrite(errors, contents){
    if (!errors) {
      response.writeHead(200);
      response.write(contents);
    }else{
      response.writeHead(404);
      response.write("File not found");
    }
    response.end(); 
  }
  sections = url.split("/").filter(function(section) {return section.length != 0});
  url = sections.join('/');
  folderName = sections[0];
  if(folderName !== "static" && folderName !== "bower_components"){
    folderName = "views";
  }
  if(folderName === "static"){
    folderType = sections[1];
    if(folderType === "images"){
      fs.readFile(url, readWrite);
    }else{
      fs.readFile(url, 'utf8', readWrite);
    }
  }else if(url === ''){
    fs.readFile('views/index.html', 'utf8', readWrite);
  }else if(folderName === "views"){
    fs.readFile(folderName+url, 'utf8', readWrite);
  }else if(folderName === "bower_components"){
    fs.readFile(url, 'utf8', readWrite);
  }
}