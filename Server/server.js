// http
const http = require('http');
const fs = require('fs');       // open, read, write, append, update, delete, rename

const server = http.createServer((req, res) => {
    //    console.log(req.url);
    let filepath;
    switch (req.url) {
        case '/':
                filepath = "./index.html";
            break;
        case '/about':
                filepath = "./about.html";
            break;
        case '/contact':
                filepath = "./contact.html";
            break;
    
        default:
            filepath = "./notFound.html";
            break;
    }

    let data = fs.readFileSync(filepath, 'utf-8');
     res.end(data);
});

server.listen(1234, (err)=> {
    if(err){
        console.log(err);
        return;
    }
    console.log('Server Start at http://localhost:1234');
});


// fs.readFile('../basic.js', 'utf-8', (err, data) => {
//     if(err)
//         console.log(err)
//         else console.log(data);
// })

// let data = fs.writeFileSync('../abc.js', 'utf-8')
// console.log(data);