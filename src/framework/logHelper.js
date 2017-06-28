/**
 * Created by shipengqi on 17-2-9.
 */
import log from 'log4js';
import path from 'path';
import {checkAndMkdir} from './utils/functionUtils';
import config from 'config';

let helper = {};
// 加载配置文件
let objConfig = config.get('logs');

// 检查配置文件所需的目录是否存在，不存在时创建
if(objConfig.appenders){
    let baseDir = objConfig["customBaseDir"];
    let defaultAttr = objConfig["customDefaultAttr"];

    for(let i= 0, j=objConfig.appenders.length; i<j; i++){
        let item = objConfig.appenders[i];
        if(item["type"] == "console")
            continue;

        if(defaultAttr != null){
            for(let attr in defaultAttr){
                if(item[attr] == null)
                    item[attr] = defaultAttr[attr];
            }
        }
        if(baseDir != null){
            if(item["filename"] == null)
                item["filename"] = baseDir;
            else
                item["filename"] = baseDir + item["filename"];
        }
        let fileName = item["filename"];
        if(fileName == null)
            continue;
        let pattern = item["pattern"];
        if(pattern != null){
            fileName += pattern;
        }
        let category = item["category"];
        let dir = path.dirname(fileName);
        // 判断日志目录是否存在，不存在时创建日志目录
        checkAndMkdir(dir);
    }
}

// 目录创建完毕，才加载配置，不然会出异常
log.configure(objConfig);

let logDebug = log.getLogger('monitorDebug');
let logInfo = log.getLogger('monitorInfo');
let logWarn = log.getLogger('monitorWarn');
let logErr = log.getLogger('monitorError');

helper.debug = function(msg){
    if(msg == null)
        msg = "";
    logDebug.debug(msg);
};

helper.info = function(msg){
    if(msg == null)
        msg = "";
    logInfo.info(msg);
};

helper.warn = function(msg){
    if(msg == null)
        msg = "";
    logWarn.warn(msg);
};

helper.error = function(msg, exp){
    if(msg == null)
        msg = "";
    if(exp != null)
        msg += "\r\n" + exp;
    logErr.error(msg);
};

export default helper;