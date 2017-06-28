/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

module.exports = db.defineModel('regions','local_news_region', {
    news_id:db.BIGINT(20),
    region_id_new:db.BIGINT(20)
});