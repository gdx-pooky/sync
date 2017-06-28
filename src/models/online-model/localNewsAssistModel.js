/**
 * Created by shipengqi on 17-2-27.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let Assists = db.defineModel('assists','local_news_assist', {
    tag_id:db.INTEGER(11),
    region_id_new:db.INTEGER(11),
    mp_id:db.INTEGER(11),
    news_id:db.BIGINT(20),
    is_recommand: db.INTEGER(1),
    sequence:db.BIGINT(20),
    status:db.INTEGER(1),
    version:{
        type:db.INTEGER(11),
        allowNull:true
    }
});


module.exports = Assists;