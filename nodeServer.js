const http = require('http');
const fs = require('fs');
const json = require('./form.json');
var file;


const server = http.createServer(function(req, res){
	let file

	try{
		file = fs.readFileSync('./index.html');
	}
	catch(e){
		res.writeHead(404, {'content-type': 'text/plain'});
		res.write('404 File Not Found!');
		res.end();
		return;
	}

	if(file){
		res.writeHead(200, {'content-type': 'text/html'});
		res.write(file);
		res.end();
	}

/*******GETS THE FORM DATA************/
	req.on('data', (data)=>{
		var arr = decodeURIComponent(data).replace(/\+/g, ' ').replace('monthyear=', '').replace('sector=', '').replace('csm=', '')
				.replace ('account=', '').replace('email=', '').replace('update=', '') .replace('blockers=', '').replace('blockersummary=', '') .split('&');

		var node = json.head;
		var next;

/****TURNS JSON INTO LINKED LIST OF FORM INPUT********/
	while(node){
		next = node.head;

		if(node.head == null){
			node.head = { monthyear: arr[0], sector: arr[1], csm: arr[2], account: arr[3], email: arr[4], update: arr[5], blockers: arr[6], blockersummary: arr[7], head: null};

/**********WRITES THE NEW JSON TO THE JSON FILE****************/
fs.writeFile('./form.json', JSON.stringify(json, null, 7), (err)=>{
	if(err){
		throw err;
	}
});
break;
}
else {
node = next;
}
}

});

}).listen(3000, ()=>{console.log('Server running on 3000');});