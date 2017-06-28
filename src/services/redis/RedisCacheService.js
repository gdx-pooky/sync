/**
 * Created by shipengqi on 17-1-17.
 */
import monitor from '../../framework/logHelper';
import{RedisServices} from 'cms-public';

class RedisCacheService {

    constructor(instanceName) {
        this.redisHds = RedisServices.redisHds;
        this.redisClient = null;
        if (!this.redisHds.hasOwnProperty(instanceName)) {
            let msg = `initialize failed, unknown instanceName: ${instanceName}`;
            monitor.warn(msg);
            return;
        }
        this.redisClient = this.redisHds[instanceName];
    }

    setCache(redisKey,cacheData,expire) {
        let self = this;
        switch (arguments.length)
        {
            case 2:
                self.redisClient.set(redisKey,JSON.stringify(cacheData));
                break;
            case 3:
                self.redisClient.set(redisKey,JSON.stringify(cacheData),'EX',expire);
                break;
            default:
                monitor.error('unSupport params');
                break;
        }
    }

    saddCache(redisKey,data,expire) {
        let self = this;
        switch (arguments.length)
        {
            case 2:
                self.redisClient.sadd(redisKey,data);
                break;
            case 3:
                self.redisClient.sadd(redisKey,data,'EX',expire);
                break;
            default:
                monitor.error('unSupport params');
                break;
        }

    }

    getCache(redisKey) {
        let self = this;
        return new Promise(function(resolve,reject){
            self.redisClient.get(redisKey,function(err,result){
                if (err) {
                    monitor.error(`redisClient get data error: ${err}, key: ${redisKey}`);
                    reject(err);
                }else{
                    resolve(result);
                }
            });
        });
    }

    clearCache(redisKey) {
        let self = this;
        return new Promise(function (resolve,reject) {
            self.redisClient.del(redisKey,function(err){
                if (err) {
                    monitor.error(`redisClient del error: ${err}, key: ${redisKey}`);
                    reject(err);
                }else{
                    monitor.info(`redis cache clear ,key : ${redisKey}`);
                    resolve(`redisClient del success , key : ${redisKey}`);
                }
            })
        });
    }
}

export default RedisCacheService;