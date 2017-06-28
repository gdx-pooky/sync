/**
 * Created by shipengqi on 17-2-27.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let Regions = db.defineModel('regions','local_region', {
    new_region_id:db.INTEGER(11),
    ord:db.INTEGER(11),
    areaId:db.INTEGER(11),
    parent_id:db.INTEGER(11),
    name:db.STRING(100),
    spell:db.STRING(50),
    spell_short:db.STRING(50),
    display_sequence:db.INTEGER(11),
    path:db.TEXT,
    depth:db.INTEGER(11),
    is_allow_auto_update:db.INTEGER(11)
});


module.exports = Regions;