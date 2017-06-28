/**
 * Created by shipengqi on 17-1-13.
 */
import monitor from '../../framework/logHelper';
import {MongoServices} from 'cms-public';
import NewsSchema from '../../models/mongo-model/MongoNews';


class MongoNewsService {

    constructor() {
        this.mongoHds = MongoServices.mongoHds;
        this.news = null;
    }

    initialize (instanceName,collectionName) {
        if (!this.mongoHds.hasOwnProperty(instanceName)) {
            let msg = `initialize failed, unknown instanceName: ${instanceName}`;
            monitor.warn(msg);
            return;
        }
        let hd = this.mongoHds[instanceName];
        this.news = hd.model(collectionName, NewsSchema);
    }

    insert(newsData) {
        let self = this;
        return new Promise(function(resolve,reject){
            self.news.create(newsData, function (error, doc) {
                if (error) {
                    monitor.error(error);
                    reject(error);
                    return;
                }
                resolve(doc._id);
            });
        })
    }

    updateById(id, newsData) {
        let self = this;
        return new Promise(function (resolve,reject) {
            //数据量太大会导致find时间长，更新失败
            self.news.findOneAndUpdate({_id: id}, newsData, {upsert: true, new: true}, function (error, response) {
                if (error) {
                    monitor.error(error);
                    reject(error);
                    return;
                }
                resolve(response._id);
            });
        })
    }

    findById(id) {
        let self = this;
        return new Promise(function (resolve,reject) {
            self.news.findById(id, function (error, result) {
                if (error) {
                    monitor.error(error);
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        })
    }

    update(query, data) {
        let self = this;
        return new Promise(function (resolve,reject) {
            self.news.update(query, data, function (error) {
                if (error) {
                    monitor.error(error);
                    reject(error);
                } else {
                    resolve('success');
                }
            });
        })
    }
}


export default MongoNewsService;