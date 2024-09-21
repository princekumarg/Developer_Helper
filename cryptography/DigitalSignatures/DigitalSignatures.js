const { generateKeyPairSync, sign, verify, constants } = require('crypto');

// Generate key pair
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' }
});

const data = 'This is some data to sign';

// Sign the data
const signature = sign('sha256', Buffer.from(data), {
    key: privateKey,
    padding: constants.RSA_PKCS1_PSS_PADDING,  // Use constants.RSA_PKCS1_PSS_PADDING
    saltLength: constants.RSA_PSS_SALTLEN_DIGEST
});

// Verify the signature
const isVerified = verify('sha256', Buffer.from(data), {
    key: publicKey,
    padding: constants.RSA_PKCS1_PSS_PADDING,  // Use constants.RSA_PKCS1_PSS_PADDING
    saltLength: constants.RSA_PSS_SALTLEN_DIGEST
}, signature);

console.log(`Signature valid: ${isVerified}`);