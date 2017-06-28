/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;
// const localNewsTag = require('./localNewsTagModel');
// const localNewsArea = require('./localNewsAreaModel');
// const localNewsImage = require('./localNewsImageModel');
// const localNewsRegion = require('./localNewsRegionModel');
// const localNewsCommon = require('./localNewsCommonModel');

let News = db.defineModel('news','local_news', {
    type:db.INTEGER(11),
    create_date:db.BIGINT(20),
    create_hour:db.BIGINT(20),
    is_publish:db.INTEGER(4),
    title:db.STRING(100),
    source:db.STRING(60),
    collection_name:db.CHAR(64),
    data_id:db.STRING(128)
});

// News.hasMany(localNewsTag,{as:'newsTags',foreignKey:'news_id'});
// News.hasMany(localNewsArea,{as:'newsAreas',foreignKey:'news_id'});
// News.hasMany(localNewsImage,{as:'newsImages',foreignKey:'news_id'});
// News.hasMany(localNewsRegion,{as:'newsRegions',foreignKey:'news_id'});
// News.hasOne(localNewsCommon,{as:'newsCommons',targetKey:'news_id'});

module.exports = News;