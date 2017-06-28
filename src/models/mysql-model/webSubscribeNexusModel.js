/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.source;

const Web = db.defineModel('webs','web_subscribe_nexus', {
    web_id:db.STRING(255),
    site_id:{
        type:db.INTEGER(11),
        allowNull:false
    },
    url:db.STRING(255)
});


module.exports = Web;