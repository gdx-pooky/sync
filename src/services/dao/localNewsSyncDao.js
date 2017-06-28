/**
 * Created by shipengqi on 17-3-2.
 */
const model = require('../../framework/model')();

module.exports.getOnlineInfo = async (id) => {
    return await model.localNewsSyncModel.findOne({
        where:{
            news_id:id
        }
    });
};

module.exports.alterOnlineStatus = async (is_online,online_news_id) => {
    return await model.localNewsSyncModel.update({
        is_online:is_online
    },{
        where:{
            online_news_id:online_news_id
        }
    });
};

module.exports.alterArea = async (area_id,online_news_id) => {
    return await model.localNewsSyncModel.update({
        area_id:area_id
    },{
        where:{
            online_news_id:online_news_id
        }
    });
};

module.exports.getNewsId = async (online_news_id) => {
    let newsId = await model.localNewsSyncModel.findOne({
        attributes: ['news_id'],
        where:{
            online_news_id:online_news_id
        }
    });

    return newsId ? newsId.news_id : -1;
};