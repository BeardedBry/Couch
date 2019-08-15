const http = require('http');

const server = http.createServer((req,res)=>{
    var str = req.url;
    var firstSlash = str.indexOf('/',1);
    var word = [];
    word[0] = str.slice(1,firstSlash);

    function findSlash(str, i){
        return str.indexOf('/',i);
    }

    
    res.write(word[0]);
       res.end();

});

server.listen(3000);
console.log('listening on port 3000');