/**
 * Created by shipengqi on 17-3-21.
 */
const model = require('../../framework/model')();

module.exports.alterPublishStatus = async (id,is_publish) => {
    return await model.localNewsModel.update({
        is_publish:is_publish
    },{
        where:{
            id:id
        }
    });
};