/**
 * Created by shipengqi on 17-3-3.
 */
const model = require('../../framework/model')();

module.exports.getSortById = async (id) => {
    return await model.localNewsSortModel.findAll({
        where:{
            news_id:id,
            is_delete:0
        }
    });
};