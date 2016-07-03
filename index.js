const io = require('socket.io')(3000);
const ping = require('ping');

const url = 'http://www.baidu.com';

io.on('connection', (socket) => {
    setInterval(() => {
        pingServer().then((latency) => {
            console.log(latency);
            socket.emit('ping', latency);
        });
    }, 1000);
});

function pingServer() {
    const date = new Date();
    return ping.promise.probe(url).then(() => {
        return new Date() - date;
    });
}