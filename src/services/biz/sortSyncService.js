/**
 * Created by shipengqi on 17-3-3.
 */
const DaoServices = require('../../framework/services')('/services/dao/');

module.exports = async (params) => {
    return await DaoServices.syncSortNewsDao(params);
};