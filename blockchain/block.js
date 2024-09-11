const { GENESIS_DATA } = require("./config");
const cryptoHash = require('./crypto.hash')
class Block {
    constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }
    static genesis() {
        return new this(GENESIS_DATA);
    }
    static mineBlock({ prevBlock, data }) {
        let hash, timestamp;
        const prevHash = prevBlock.hash;
        const { difficulty } = prevBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
        return new this({
            timestamp, prevHash, data, nonce, difficulty, hash
        });
    }
}
// const block1 = new Block('2/09/22', '0xacb', '0xc12', 'hello');
// const block2 = new Block('3/09/22', '0xc12', '0x123', 'world');
// const block3 = new Block({
//     hash: "0xacb",
//     timestamp: "4/09/22",
//     previousHash: "0xc12",
//     data: "hello",
// });
const block1 = new Block({
    hash: "0xacb",
    timestamp: "2/09/22",
    prevHash: "0xc12",
    data: "hello",
});
// console.log(block1);
// console.log(block2);
// console.log(block3);
// const genesisBlock = Block.genesis();
// console.log(genesisBlock);
// const result = Block.mineBlock({ prevBlock: block1, data: "block2" });
// console.log(result);
module.exports = Block;