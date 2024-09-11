const Block = require('./block');
const cryptoHash = require('./crypto.hash');
class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];
    }
    addBlock({ data }) {
        const newBlock = Block.mineBlock({
            prevBlock: this.chain[this.chain.length - 1],
            data
        });
        this.chain.push(newBlock);
    }
    replaceChain(chain) {
        if (chain <= this.chain.length) {
            console.error('The incoming chain must be longer');
            return;
        }
        if (!Blockchain.isvalideChain(chain)) {
            console.error('The incoming chain must be valid');
            return;
        }
        console.log('Replacing chain with', chain);
        this.chain = chain;
    }
    static isvalideChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false;
        for (let i = 1; i < chain.length; i++) {
            const { timestamp, prevHash, hash, nonce, difficulty, data } = chain[i];
            const actualPrevHash = chain[i - 1].hash;
            if (prevHash !== actualPrevHash) return false;
            const validatedHash = cryptoHash(timestamp, prevHash, nonce, difficulty, data);
            if (hash !== validatedHash) return false;
        }
        return true;
    }
}
const blockchain = new Blockchain();
blockchain.addBlock({ data: 'Block1' });
blockchain.addBlock({ data: 'Block2' });
// console.log(blockchain);
const result = Blockchain.isvalideChain(blockchain.chain);
console.log(blockchain.chain);
console.log(result);
module.exports = Blockchain;