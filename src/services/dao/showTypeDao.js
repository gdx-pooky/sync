/**
 * Created by shipengqi on 17-2-15.
 */
const model = require('../../framework/model')();

module.exports = {};
module.exports.getShowTypeByBdtt = async (bdtt_id) => {
    return await model.localShowTypeModel.findOne({
        attributes: [['showtype','showType']],
        where:{
            bdtt_id:bdtt_id,
            is_delete:0
        }
    });
};