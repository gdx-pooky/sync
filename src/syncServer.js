/**
 * Created by shipengqi on 17-2-24.
 */
import {
    KafkaService,
    SequelizeServices,
    MongoServices,
    RedisServices,
    GrpcService
} from 'cms-public';
import {newsServiceProto} from 'proto-file';
import monitor from './framework/logHelper';
import config from 'config';


MongoServices.connectMongodb(config.get('MongoServiceParas'));

RedisServices.connectRedis(config.get('redisServiceParas'));

SequelizeServices.initSequelize(config.get('sequelizeServiceParas'));

GrpcService.createClient({
    ip:'118.178.231.36:50051',
    // ip:'0.0.0.0:50051',
    PROTO_PATH:newsServiceProto,
    serviceName:'getNews'
});

const ConsumeMessageService = require('./services/api/ConsumeMessageService');
const consumeMessageService = new ConsumeMessageService();
KafkaService.createConsumer({address:'localhost:2181',topics:[{
    topic: 'cms',
    partition:0
},{
    topic: 'cms',
    partition:1
},{
    topic: 'cms',
    partition:2
},{
    topic: 'cms',
    partition:3
}]},consumeMessageService.syncOperation.bind(consumeMessageService));



//进程级别的异常捕获
process.on('uncaughtException', function (err) {
    monitor.error(`process uncaughtException : ${err.message}`);
    monitor.error(err.stack);
});