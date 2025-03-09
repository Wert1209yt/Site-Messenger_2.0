const fs = require('fs');
const config = require('../config');

const textFile = config.textFile;

module.exports = {
    appendText: (text) => {
        fs.appendFileSync(textFile, text + '\n');
    },
    readFile: () => {
        return fs.readFileSync(textFile, 'utf8');
    },
    deleteMessage: (index) => {
        const data = fs.readFileSync(textFile, 'utf8');
        let messagesArray = data.split('\n').filter(line => line);
        if (index >= 0 && index < messagesArray.length) {
            messagesArray.splice(index, 1);
            fs.writeFileSync(textFile, messagesArray.join('\n') + '\n');
        }
    },
    clearChat: () => {
        fs.writeFileSync(textFile, '');
    },
};
