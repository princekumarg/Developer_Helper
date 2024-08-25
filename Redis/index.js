const net = require('net');
const Parser = require('redis-parser');
const express = require('express');
const app = express();
const store = {};
const server = net.createServer(connection => {
    console.log('client connected');
    connection.on('data', data => {
        const parser = new Parser({
            returnReply: function (reply) {
                const command = reply[0];
                switch (command) {
                    case 'set': {
                        const key = reply[1];
                        const value = reply[2];
                        store[key] = value;
                        connection.write('OK\r\n');
                    }
                        break;
                    case 'get': {
                        const key = reply[1];
                        const value = store[key];
                        if (!value) connection.write('$-1\r\n');
                        else connection.write(`$${value.length}\r\n${value}\r\n`);
                    }
                        break;
                }
            },
            returnError: function (err) {
                console.log('error:', err);
            },
            returnFatalError: function (err) {
                console.log('fatal error:', err);
            },
            returnBuffers: true
        });
        parser.execute(data);
    })
})
server.listen(6030, () =>
    console.log('server is running on port:6030')
)
app.get('/', (req, res) => {
    res.send('Hello Redis');
})
app.listen(3000, () => {
    console.log('server is running on port:http://localhost:3000');
})