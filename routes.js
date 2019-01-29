const fs = require("fs");
const requestHandler = (req, res) => {
 const url = req.url;
 const method = req.method;
 if (url === "/") {
  res.setHeader("Content-Type", "text/html");
  res.write("<h1 >hello</h1>");
  res.write(
   "<body><form action='/message' method='POST'><input type='text' name='message'></input><button type='submit'>submit</button></form></body>"
  );
  return res.end();
 }
 if (url === "/message" && method === "POST") {
  const body = [];
  req.on("data", chunk => {
   console.log(chunk);
   body.push(chunk);
  }); //this will be fired whenever a new chunk is ready to be read
  return req.on("end", () => {
   const parsedBody = Buffer.concat(body).toString();
   const message = parsedBody.split("=")[1];
   console.log(parsedBody);
   fs.writeFile("message.txt", message, err => {
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
   });
  }); //this is fired whenever it is done parsing the incoming requests
 }
 res.setHeader("Content-Type", "text/html");
 res.write("<h1 >hello from server</h1>");
 res.end();
};

module.exports = requestHandler;
