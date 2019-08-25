const http = require('http');
//const data = include('data.json');
const fs = require('fs');

// https://goenning.net/2016/04/14/stop-reading-json-files-with-require/
var readJson = (path, cb) => {
    fs.readFile(require.resolve(path), (err, data) => {
      if (err)
        cb(err)
      else
        cb(null, JSON.parse(data))
    })
}

const server = http.createServer((req,res)=>{
    
    if (req.url === '/favicon.ico') {
        //res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        //console.log('favicon requested');
        return;
    }

    var arr = req.url.split('/').filter((r)=>r !== '');
    var json;
    
    if(arr[0] === 'write'){
        readJson('./data.json', function(err, data){
            data[arr[1]] = arr[3];
            return;
        });
    }

    if(arr[0] === 'read'){
        readJson('./data.json', function(err, data){
            res.write(JSON.stringify(data[arr[1]]));
            res.end();
            return;
        });
    }
    
   


    // var firstSlash = str.indexOf('/',1);
    // if(firstSlash > 0){
    //     word[0] = str.slice(1,firstSlash);
    // }else{
    //     word[0] = str.slice(1);
    // }



    // function findSlash(str, i){
    //     return str.indexOf('/',i);
    // }

   

});

server.listen(3000);
console.log('listening on port 3000');