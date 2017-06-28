/**
 * Created by shipengqi on 17-2-15.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;
const localNewsModel = require('./localNewsModel');

let Sync = db.defineModel('sync','local_news_sync', {
    online_news_id:{
        type:db.BIGINT(20),
        unique: true
    },
    news_id:db.BIGINT(20),
    is_online:db.INTEGER(4),
    site_id:db.BIGINT(20),
    publish_date:db.BIGINT(20),
    publish_hour:db.BIGINT(20),
    publish_time:db.BIGINT(20),
    channel:db.ENUM('country','commend'),
    area_id:db.INTEGER(11)
});

Sync.belongsTo(localNewsModel,{as:'news',foreignKey:'news_id'});

module.exports = Sync;