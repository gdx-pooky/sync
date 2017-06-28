/**
 * Created by shipengqi on 17-3-20.
 */
const model = require('../../framework/model')();

module.exports = async (params) => {
    let operation = 'create';
    let results;
    let news_id =  await model.localNewsSyncModel.findOne({
        attributes: ['news_id'],
        where:{
            online_news_id:params.online_news_id
        }
    });
    if(news_id){
        operation = 'update';
    }

    if(operation === 'create'){
        params.syncInfo.is_online = 0;
        params.newsInfo.is_publish = 0;
        let newsResult = await model.localNewsModel.create(params.newsInfo);
        params.syncInfo.news_id = newsResult.id;
        results = await Promise.all([
            model.localNewsAreaModel.create({
                news_id:newsResult.id,
                news_area:params.syncInfo.area_id
            }),
            model.localNewsTagModel.create({
                news_id:newsResult.id,
                tag_id:params.tag_id
            }),
            model.localNewsRegionModel.create({
                news_id:newsResult.id,
                region_id_new:params.syncInfo.site_id
            }),
            model.localNewsSyncModel.create(params.syncInfo)
        ]);
    }else{
        await Promise([
            model.localNewsAreaModel.destroy({
                where:{
                    news_id:news_id.news_id
                }
            }),
            model.localNewsTagModel.destroy({
                where:{
                    news_id:news_id.news_id
                }
            }),
            model.localNewsRegionModel.destroy({
                where:{
                    news_id:news_id.news_id
                }
            }),
        ]);
        results = await Promise.all([
            model.localNewsSyncModel.update(params.syncInfo,{
                where:{
                    news_id:news_id.news_id
                }
            }),
            model.localNewsModel.update(params.newsInfo,{
                where:{
                    id:news_id.news_id
                }
            }),
            model.localNewsAreaModel.create({
                news_id:news_id.news_id,
                news_area:params.syncInfo.area_id
            }),
            model.localNewsTagModel.create({
                news_id:news_id.news_id,
                tag_id:params.tag_id
            }),
            model.localNewsRegionModel.create({
                news_id:news_id.news_id,
                region_id_new:params.syncInfo.site_id
            }),
        ]);
    }

    return results;

};