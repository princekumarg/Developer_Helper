const dgram = require('dgram');
const dnsPacket = require('dns-packet');
const server = dgram.createSocket('udp4');
const db = {
    'princeagrwal.dev': {
        type: 'A',
        data: '1.2.3.4'
    },
    'blog.princeagrawal.dev': {
        type: 'CNAME',
        data: 'hashnode.network'
    }
}
server.on('message', (msg, rinfo) => {
    const incomingReq = dnsPacket.decode(msg);
    const ipFromDb = db[incomingReq.questions[0].name];
    const ans = dnsPacket.encode({
        type: 'query',
        id: 'incomingReq.id',
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers: [{
            type: ipFromDb.type,
            class: 'IN',
            name: incomingReq.questions[0].name,
            data: ipFromDb.date
        }]
    })
    server.send(ans, rinfo.port, rinfo.address);
    // console.log({
    //     msg: incomingReq.questions[0].name,
    //     rinfo
    // });
})
server.bind(53, () => {
    console.log('DNS Server is running on Port 53')
})
//cmd: dig @localhost blog.princeagrawal.dev