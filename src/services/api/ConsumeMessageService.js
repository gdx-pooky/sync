/**
 * Created by shipengqi on 17-2-24.
 */
import _isString from 'lodash/isString';
import monitor from '../../framework/logHelper';
import {log} from '../../framework/Decorators';
import {
    OPERATION_SYNC_SHOW_TYPE,
    OPERATION_SYNC_ARTICLE,
    OPERATION_SYNC_SORT,
    OPERATION_SYNC_ONLINE_ARTICLE,
    OPERATION_SYNC_ONLINE_STATUS,
    OPERATION_SYNC_ONLINE_AREA
} from '../../contants/operation';

const bizServices = require('../../framework/services')('/services/biz/');

class ConsumeMessageService {

    constructor () {
        this.OPERATION_FUNCTION_MAPPING = new Map([
            [OPERATION_SYNC_SHOW_TYPE,bizServices.showTypeSyncService],
            [OPERATION_SYNC_ARTICLE,bizServices.articleSyncService],
            [OPERATION_SYNC_SORT,bizServices.sortSyncService],
            [OPERATION_SYNC_ONLINE_ARTICLE,bizServices.onlineArticleSyncService],
            [OPERATION_SYNC_ONLINE_STATUS,bizServices.onlineStatusSyncService],
            [OPERATION_SYNC_ONLINE_AREA,bizServices.onlineAreaSyncService]
        ]);
    }

    @log
    async syncOperation(err,message) {
        try{
            let self = this;
            if(err){
                monitor.error(err);
                return;
            }
            if(!_isString(message.value)){
                monitor.warn(`message value must be string: ${JSON.stringify(message.value)}`);
                return;
            }
            monitor.info(message);
            let messageData = JSON.parse(message.value);
            if(!messageData.operation || !messageData.data){
                monitor.warn('The message format is not supported, please check it where the message is send...');
                monitor.warn(`message: ${JSON.stringify(message)}`);
                return;
            }

            if(!self.OPERATION_FUNCTION_MAPPING.has(messageData.operation)){
                monitor.warn(`unknown operation : ${messageData.operation}, please check it`);
                return;
            }
            await self.OPERATION_FUNCTION_MAPPING.get(messageData.operation)(messageData.data);
        }catch(err) {
            monitor.error(err);
        }

    }
}

module.exports = ConsumeMessageService;