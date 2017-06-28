/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

module.exports = db.defineModel('copys','local_news_copy', {
    collection_name:{
        type:db.STRING(255),
        allowNull:false
    },
    data_id:{
        type:db.STRING(255),
        allowNull:false
    },
    site_id:db.INTEGER(11),

    account_id:db.INTEGER(11),
    news_id:db.BIGINT(20),
    channel:db.ENUM('country','commend'),
    area_id:db.INTEGER(11)
});
