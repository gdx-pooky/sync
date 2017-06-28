/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.source;
const Wechat = db.defineModel('wechats','wechat_subscribe_nexus', {
    wechat_id:db.BIGINT(40),
    site_id:{
        type:db.INTEGER(11),
        allowNull:false
    }
});


module.exports = Wechat;
