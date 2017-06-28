/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

const Sorts = db.defineModel('sorts','local_news_sort', {
    news_id:db.BIGINT(20),
    channel:db.ENUM('country','commend'),
    news_area:db.INTEGER(11),
    sort:db.INTEGER(11),
    site_id:db.INTEGER(11)
});


module.exports = Sorts;
