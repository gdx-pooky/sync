/**
 * Created by shipengqi on 17-2-27.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let Globals = db.defineModel('globals','local_news_global_top', {
    news_id: db.BIGINT(20),
    news_category:{
        type:db.INTEGER(3),
        allowNull:true
    },
    region_id:db.INTEGER(11),
    channel_id:db.INTEGER(11),
    status:db.INTEGER(4),
    type:db.INTEGER(4),
    sequence:{
        type:db.BIGINT(20),
        allowNull:true
    }
});


module.exports = Globals;