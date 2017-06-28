/**
 * Created by shipengqi on 17-3-3.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let News = db.defineModel('News','local_news', {
    title:db.STRING(100),
    source_url:{
        type:db.STRING(700),
        allowNull:true
    },
    source_title:{
        type:db.STRING(140),
        allowNull:true
    },
    region_type: {
        type:db.INTEGER(4),
        allowNull:true
    },
    news_category:db.INTEGER(6),
    block_id:{
        type:db.BIGINT(20),
        allowNull:true
    },
    region_id:{
        type:db.BIGINT(20),
        allowNull:true
    },
    description:{
        type:db.STRING(1000),
        allowNull:true
    },
    mp_id:{
        type:db.BIGINT(20),
        allowNull:true
    },
    status:db.INTEGER(1),
    source_type:{
        type:db.INTEGER(4),
        allowNull:true
    },
    keywords:{
        type:db.STRING(1024),
        allowNull:true
    },
    news_date:{
        type:db.STRING(128),
        allowNull:true
    },
    sequence:{
        type:db.BIGINT(15),
        allowNull:true
    },
    collection_name:{
        type:db.CHAR(64),
        allowNull:true
    },
    data_id:{
        type:db.STRING(128),
        allowNull:true
    },
    new_data_id:{
        type:db.STRING(128),
        allowNull:true
    },
    paper_id:{
        type:db.STRING(128),
        allowNull:true
    },
    region_id_new:{
        type:db.BIGINT(32),
        allowNull:true
    },
    real_click_count:{
        type:db.INTEGER(11),
        allowNull:true
    },
    fake_click_count:{
        type:db.INTEGER(11),
        allowNull:true
    }
});


module.exports = News;