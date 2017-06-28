/**
 * Created by shipengqi on 17-1-10.
 */
import fs from 'fs';
import path from 'path';


module.exports = function (dir) {
    let models = {};
    const dirPath = path.dirname(__dirname) + (dir ? dir : '/models/mysql-model/');

    let files = fs.readdirSync(dirPath);

    let js_files = files.filter((f)=>{
        return f.endsWith('.js');
    }, files);

    for (let f of js_files) {
        console.log(`import model from file ${f}...`);
        let name = f.substring(0, f.length - 3);
        models[name] = require(dirPath + f);
    }

    return models;
};


