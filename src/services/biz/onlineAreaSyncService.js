/**
 * Created by shipengqi on 17-3-22.
 */
const DaoServices = require('../../framework/services')('/services/dao/');

module.exports = async (params) => {
    return await DaoServices.localNewsSyncDao.alterArea(params.area_id,params.online_news_id);
};