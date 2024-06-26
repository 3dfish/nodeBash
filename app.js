const express = require('express');
const app = express();//函数express的返回值
const fs = require('fs');
const { exec } = require('child_process');
const httpsOption = {
//	key:fs.readFileSync('/etc/letsencrypt/archive/craws.cn/privkey1.pem'),
//	cert:fs.readFileSync('/etc/letsencrypt/archive/craws.cn/fullchain1.pem')
	key:fs.readFileSync('./https/key.pem'),
	cert:fs.readFileSync('./https/cert.pem'),
//	ca:fs.readFileSync('./https/craws.cn.csr')
}

servs = require('https').createServer(httpsOption,app);

app.get('/factorio',function(req,res){
	res.sendFile(__dirname + '/client/factorio.html');/////////////////////////////
});
app.get('/pal',function(req,res){
	res.sendFile(__dirname + '/client/pal.html');/////////////////////////////
});

app.get('/factorio/start',function(req,res){
	exec('sudo systemctl start factorio.service', (error, stdout, stderr) => {
	  if (error) {
		console.error(`执行出错: ${error}`);
		return;
	  }
	  if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  res.json({ message: '服务器启动成功' });
	});
});
app.get('/factorio/stop',function(req,res){
	exec('sudo systemctl stop factorio.service', (error, stdout, stderr) => {
	  if (error) {
		console.error(`执行出错: ${error}`);
		return;
	  }
	  if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  res.json({ message: '服务器停止' });
	});
});
app.get('/pal/start',function(req,res){
	exec('sudo systemctl start pal.service', (error, stdout, stderr) => {
	  if (error) {
		console.error(`执行出错: ${error}`);
		return;
	  }
	  if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  res.json({ message: '服务器启动成功' });
	});
});
app.get('/pal/stop',function(req,res){
	exec('sudo systemctl stop pal.service', (error, stdout, stderr) => {
	  if (error) {
		console.error(`执行出错: ${error}`);
		return;
	  }
	  if (stderr) {
		console.error(`stderr: ${stderr}`);
		return;
	  }
	  console.log(`stdout: ${stdout}`);
	  res.json({ message: '服务器停止' });
	});
});

app.use('/etc',express.static(__dirname + '/client/etc'));

servs.listen(6443);