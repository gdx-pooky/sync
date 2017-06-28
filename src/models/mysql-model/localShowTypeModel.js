/**
 * Created by shipengqi on 17-2-15.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

let ShowTypes = db.defineModel('showTypes','local_showtype', {
    site_id:db.INTEGER(6),
    bdtt_id:db.INTEGER(6),
    showtype:db.ENUM('custom','commend')
});


module.exports = ShowTypes;