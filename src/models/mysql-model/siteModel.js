/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.gateway;

const Sites = db.defineModel('sites','site', {
    name:db.STRING(32),
    short_name:{
        type:db.STRING(32),
        allowNull:true
    },
    path:db.STRING(80),
    ambiguous:{
        type:db.INTEGER(11),
        allowNull:true
    },
    bdtt_id:{
        type:db.INTEGER(11),
        allowNull:true
    },
    priority:{
        type:db.INTEGER(11),
        allowNull:true
    },
    mq_url:{
        type:db.STRING(255),
        allowNull:true
    }
});


module.exports = Sites;
