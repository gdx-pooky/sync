/**
 * Created by shipengqi on 17-3-3.
 */
import {
    GLOBAL_TOP_NEWS_LIST,
    TOP_NEWS_LIST,
    SORT_NEWS_LIST,
    COMMON_NEWS_LIST,
    ONLINE_SET_TOP_ARTICLE,
    ONLINE_GLOBAL_ARTICLE,
    ENUM_COUNTRY_CHANNEL,
    ENUM_COMMEND_CHANNEL
} from '../../contants/contants';
import monitor from '../../framework/logHelper';
import ClearCacheService from '../cache/ClearCacheService';
const DaoServices = require('../../framework/services')('/services/dao/');
const model = require('../../framework/model')('/models/online-model/');
const channelMapping = new Map([
    [ENUM_COUNTRY_CHANNEL,2],
    [ENUM_COMMEND_CHANNEL,1]
]);


module.exports = async (params) => {
    let area_id = params.areaId;
    let site_id = params.siteId;
    let functions = [];
    let channel_id = channelMapping.get(params.channel) || 1;
    params.newsIds.forEach(function (id) {
        functions.push(DaoServices.localNewsSyncDao.getOnlineInfo(id));
    });
    let news_ids = await Promise.all(functions);
    news_ids = news_ids.map(function(item){
        return item.online_news_id;
    });

    let region_id = await DaoServices.siteDao.convertToBdttId(site_id);
    let clearCacheService = new ClearCacheService('list');
    switch (area_id)
    {
        case GLOBAL_TOP_NEWS_LIST:
            await model.localNewsGlobalTopModel.destroy({
                where:{
                    region_id:region_id,
                    channel_id:channel_id,
                    type:ONLINE_GLOBAL_ARTICLE
                }
            });

            model.localNewsGlobalTopModel.bulkCreate(news_ids.reverse().map(function (id,index) {
                return {
                    news_id:id,
                    sequence:index+1,
                    region_id:region_id,
                    channel_id:channel_id,
                    status:1,
                    type:ONLINE_GLOBAL_ARTICLE
                }
            }));

            clearCacheService.clearGlobalListCache(region_id,channel_id);
            break;
        case TOP_NEWS_LIST:
            await model.localNewsGlobalTopModel.destroy({
                where:{
                    region_id:region_id,
                    channel_id:channel_id,
                    type:ONLINE_SET_TOP_ARTICLE
                }
            });

            model.localNewsGlobalTopModel.bulkCreate(news_ids.map(function (id,index) {
                return {
                    news_id:id,
                    sequence:index+1,
                    region_id:region_id,
                    channel_id:channel_id,
                    status:1,
                    type:ONLINE_SET_TOP_ARTICLE
                }
            }));

            clearCacheService.clearTopListCache(region_id,channel_id);
            break;
        case SORT_NEWS_LIST:
            await model.localTopNewsModel.destroy({
                where:{
                    region_id:region_id,
                    channel:channel_id
                }
            });

            model.localTopNewsModel.bulkCreate(news_ids.map(function (id,index) {
                return {
                    news_id:id,
                    sequence:index+1,
                    region_id:region_id,
                    channel:channel_id,
                    status:1
                }
            }));

            clearCacheService.clearSortListCache(region_id,channel_id);
            break;
        case COMMON_NEWS_LIST:
            monitor.warn(`unSupport areaId : ${area_id}`);
            break;
        default:
            monitor.warn(`unknown areaId : ${area_id}`);
    }

};
