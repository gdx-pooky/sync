/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;
// const localNewsRegionModel = require('./localNewsRegionModel');

let Areas = db.defineModel('areas','local_news_area', {
    news_id:db.BIGINT(20),
    news_area:db.INTEGER(11)
});

// Areas.belongsTo(localNewsRegionModel,{as:'regions',foreignKey:'news_id',targetKey:'news_id'});

module.exports = Areas;