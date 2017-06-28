/**
 * Created by shipengqi on 17-3-20.
 */
const DaoServices = require('../../framework/services')('/services/dao/');

module.exports = async (params) => {
    let [update,news_id] = await Promise.all([
        DaoServices.localNewsSyncDao.alterOnlineStatus(params.status,params.online_news_id),
        DaoServices.localNewsSyncDao.getNewsId(params.online_news_id)
    ]);

    return await DaoServices.localNewsDao.alterPublishStatus(news_id,params.status);
};