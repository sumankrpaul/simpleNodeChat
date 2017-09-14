// Dependencies
const net = require('net');
const stdin = process.openStdin();
let content = '';
let client = {};

let _name = process.env.NAME || 'Unknown';
let _port = process.env.PORT || 7000;

// create the clinet and listen to the chat server
client.createClient = (name)=>{
    client._me = new net.Socket();
    client._me.connect(_port,'127.0.0.1',()=>{
        console.log('Connected');
        let name_json = JSON.stringify({'name':name});
        console.log(name_json);
        client._me.write(name_json);
    });
    client._me.on('data',(data)=>{
        console.log(':> '+data);                
        // client._me.write(' Bye it is good to see you ');
    });
    
    client._me.on('close',()=>{
        console.log('good bye');
    });
}

//listening to console for input and XD or xd will kill the client
stdin.addListener('data', data => {
    content = '';
    content += data.toString();
        
    if(client._me){
        client._me.write(content);
    }
    
    if(content.match(/\sxd/i)){
        client._me.destroy();
        process.exit();
    }
});

client.createClient(_name);



