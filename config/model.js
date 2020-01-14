const sequelize = require('./db');
console.log(sequelize)
const fs = require('fs');
let files = fs.readdirSync('schema');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    console.log(name)
    console.log('=================')

    module.exports[name] = await sequelize.import('../schema/' + f);
    // module.exports[name] = require('../schema/' + f);

}

module.exports.sync = () => {
    sequelize.sync();
};