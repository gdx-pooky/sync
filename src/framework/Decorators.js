/**
 * Created by shipengqi on 17-1-17.
 */
import {buildRedisKey} from './utils/functionUtils';
import monitor from './logHelper';
import {REDIS_EXPIRE_MATERIAL_LIST} from '../contants/contants';
import RedisCacheService from '../services/redis/RedisCacheService';

function log(target, name, descriptor) {

    let oldValue = descriptor.value;

    descriptor.value = function(...args) {
        monitor.info(`Calling interface "${name}" with params : ${JSON.stringify(args)}`);
        return oldValue.apply(this, args);
    };

    return descriptor;
}

function interfaceCache(target, name, descriptor) {
    let oldValue = descriptor.value;


    const get = async (key) => {
        let cacheService = new RedisCacheService('bdtt');
        return await cacheService.getCache(key);
    };
    const set = async (key,data) => {
        let cacheService = new RedisCacheService('bdtt');
        return await cacheService.setCache(key,data,REDIS_EXPIRE_MATERIAL_LIST);
    };
    descriptor.value = async function (...args) {
        let Key = buildRedisKey(name,args);
        let cacheData = await get(Key);

        if(cacheData){
            return cacheData;
        }else{
            let data = await oldValue.apply(this, args);
            await set(Key,data);
            return oldValue.apply(this, args);
        }
    };

    return descriptor;
}

export {
    log,
    interfaceCache
}
