const CONSTANTS = require('./constants');
const getEnum = (name) => {
    if(CONSTANTS[name]) {
        return CONSTANTS[name];
    }else {
        return undefined;
    }
}

module.exports = {
    getEnum,
}