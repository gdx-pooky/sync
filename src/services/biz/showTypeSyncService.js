/**
 * Created by shipengqi on 17-2-25.
 */
const services = require('../../framework/services')('/services/dao/');
const showType = {
    custom:0,
    commend:1
};

module.exports = async (params) => {
    let result = await services.showTypeDao.getShowTypeByBdtt(params.bdttId);
    return await services.localRegionDao.syncShowType(params.bdttId,showType[result.dataValues.showType]);
};