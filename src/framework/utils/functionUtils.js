/**
 * Created by shipengqi on 17-1-11.
 */
import fs from 'fs';
import mkdirp from 'mkdirp';
import moment from 'moment';
import md5 from 'md5';
import {CMS_COLLECTION_NAME_PREFIX} from '../../contants/contants';


function checkAndMkdir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        mkdirp.sync(dirPath);
    }
}

function buildCollectionName() {
    return `${CMS_COLLECTION_NAME_PREFIX}${moment().format('YYYYMMDD')}`;
}

function _date(Time){
    let time = moment().format('YYYYMMDD');
    if(Time){
        time = moment(Time).format('YYYYMMDD');
    }
    return time;
}

function _hour(Time){
    let time = moment().format('YYYYMMDDHH');
    if(Time){
        time = moment(Time).format('YYYYMMDDHH');
    }
    return time;
}

function newsDate(Time){
    let time = moment().format('YYYY-MM-DD HH:mm:ss');
    if(Time){
        time = moment(Time).format('YYYY-MM-DD HH:mm:ss');
    }
    return time;
}

function _second(Time){
    let time = moment().format('MMDDHHmmss');
    if(Time){
        time = moment(Time).format('MMDDHHmmss');
    }
    return time;
}

function _timestamp(Time){
    let time = new Date().getTime();
    if(Time){
        time = new Date(Time).getTime();
    }
    return time;
}

function buildRedisKey(key,params) {
    return `${key}_api:${md5(JSON.stringify(params))}`;
}


export {
    checkAndMkdir,
    buildCollectionName,
    buildRedisKey,
    _timestamp,
    _date,
    _hour,
    _second,
    newsDate
}