const net = require('net');
let clients = [];
let port = process.env.PORT || 7000;

let createServer = ()=>{
	let server = net.createServer((socket)=>{

		socket.write("Welcome "+ socket.remoteAddress +"/n");
		
		socket.on('data',(data)=>{
			try{
				let name = JSON.parse(data);
				socket.name = name.name;
				clients.push(socket);
				broadcast(socket.name+" have just connected ",socket);
			}catch(e){
				broadcast(socket.name+" > "+ data +" " ,socket);				
			}
		});
		
		socket.on('end',()=>{
			clients.splice(clients.indexOf(socket),1);
			broadcast(socket.name + "left the chat ");
		});
		
	}).listen(port);

	server.listen(()=>{
		let address = server.address();
		console.info(' Th server is open on port -> '+address.port);
	})
}

let broadcast = (message, sender)=>{
	clients.forEach((client)=>{
		if(client === sender) return;
		client.write(message);
	});
	process.stdout.write(message);
}

createServer();