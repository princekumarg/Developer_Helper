const { generateKeyPairSync, publicEncrypt, privateDecrypt } = require('crypto');

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
});

const message = 'Hello RSA Encryption';

// Encrypt with public key
const encryptedMessage = publicEncrypt(publicKey, Buffer.from(message));
console.log(encryptedMessage.toString('base64'));

// Decrypt with private key
const decryptedMessage = privateDecrypt(privateKey, encryptedMessage);
console.log(decryptedMessage.toString('utf8'));
