//requires
const fs = require('fs')
const path = require('path')

// Retornar data.json
module.exports = {
    getDataAll: () => {
            let dataPath = __dirname + path.join('/data/data.json');
            console.log('Probando data Path');
            console.log(dataPath);
            return new Promise((resolve, reject) => {
                fs.readFile(dataPath, 'utf8', (err, readData) => {
                    if (err) reject(err)
                    resolve(JSON.parse(readData));
                });
            });
        }
};