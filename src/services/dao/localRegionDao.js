/**
 * Created by shipengqi on 17-2-27.
 */
const model = require('../../framework/model')('/models/online-model/');

module.exports.syncShowType = async (site_id,auto_update) => {
    return await model.localRegionModel.update({is_allow_auto_update:auto_update},{
        where:{
            new_region_id:site_id
        }
    });
};

module.exports.getRegionId = async (region_id_new) => {
    let id =  await model.localRegionModel.findOne({
        attributes: ['id'],
        where:{
            new_region_id:region_id_new
        }
    });

    return id.dataValues.id;
};