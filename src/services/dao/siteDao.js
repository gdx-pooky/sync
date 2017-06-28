/**
 * Created by shipengqi on 17-2-28.
 */
import {
    COUNTRY_SITE_ID,
    ONLINE_COUNTRY_REGION_ID
} from '../../contants/contants';
const model = require('../../framework/model')();

module.exports.convertToBdttId = async (site_id) => {
    let bdttId =  await model.siteModel.findOne({
        attributes: ['bdtt_id'],
        where:{
            id:site_id
        }
    });

    return bdttId ? bdttId.dataValues.bdtt_id : ONLINE_COUNTRY_REGION_ID;
};

module.exports.convertToSiteId = async (bdtt_id) => {

    let siteId =  await model.siteModel.findOne({
        attributes: [['id','site_id']],
        where:{
            bdtt_id:bdtt_id
        }
    });

    return siteId ? siteId.dataValues.site_id : COUNTRY_SITE_ID;

};