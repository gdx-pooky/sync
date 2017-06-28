/**
 * Created by shipengqi on 17-1-12.
 */
import fs from 'fs';
import path from 'path';

module.exports = function (dirPath) {
    let Path = dirPath || '/services/api/';
    let rootPath = path.dirname(__dirname) + Path;

    let files = fs.readdirSync(rootPath);

    let js_files = files.filter((f)=>{
        return f.endsWith('.js');
    }, files);

    let services = {};
    for (let f of js_files) {
        console.log(`import service from file ${f}...`);
        let name = f.substring(0, f.length - 3);
        services[name] = require(rootPath + f);
    }

    return services;
};

