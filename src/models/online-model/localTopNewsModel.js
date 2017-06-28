/**
 * Created by shipengqi on 17-2-27.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let Tops = db.define('tops', {
    id:{
        type: db.BIGINT(20),
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    channel:db.INTEGER(6),
    region_id:db.INTEGER(6),
    sequence:db.INTEGER(4),
    news_id:db.BIGINT(20),
    status:db.INTEGER(1)
},{
    tableName: 'local_top_news',
    freezeTableName:true,
    timestamps:false
});


module.exports = Tops;