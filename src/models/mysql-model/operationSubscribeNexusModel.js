/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.source;

const Operations = db.defineModel('operations','operation_subscribe_nexus', {
    operation_id:db.BIGINT(20),
    site_id:{
        type:db.INTEGER(11),
        allowNull:false
    },
});


module.exports = Operations;
