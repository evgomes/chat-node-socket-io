const bcrypt = require('bcryptjs');

async function hash(input) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(input, salt);

    return hash;
}

async function hashMatches(input, hash) {
    return await bcrypt.compare(input, hash);
}

module.exports = { hash, hashMatches };