/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
import _isArray from 'lodash/isArray';
const db = SequelizeServices.sequelizeHds.content;

let Commons = db.defineModel('commons','local_news_common', {
    type: db.INTEGER(11),
    block_id:db.INTEGER(11),
    link:{
        type:db.STRING(1000),
        allowNull:true
    },
    news_id:db.BIGINT(20),
    description:{
        type:db.STRING(1000),
        defaultValue:'',
        allowNull:true
    }
});

Commons.hook('afterFind',function (commons,option) {
    if(!_isArray(commons)){
        commons = [commons];
    }
    for(let i of commons){
        if(i.description === null){
            i.description = '';
        }
        if(i.link === null){
            i.link = '';
        }
    }
});

module.exports = Commons;
