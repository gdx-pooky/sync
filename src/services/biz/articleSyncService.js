/**
 * Created by shipengqi on 17-2-25.
 */
import monitor from '../../framework/logHelper';
import {RESDATA_SUCCESS} from '../../contants/responseData';
import RpcService from '../rpc/RpcService';
const rpcService = new RpcService();
const DaoServices = require('../../framework/services')('/services/dao/');

module.exports = async (params) => {

    let detail = await rpcService.getNewsDetail(params);
    if(detail.code === RESDATA_SUCCESS){
        let onlineInfo = await DaoServices.localNewsSyncDao.getOnlineInfo(params.newsId);
        return await DaoServices.syncNewsBaseDetailDao(detail.data,onlineInfo);

    }else{
        monitor.warn(detail.msg);
    }

};