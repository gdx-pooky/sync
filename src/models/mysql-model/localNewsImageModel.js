/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
import _isArray from 'lodash/isArray';
const db = SequelizeServices.sequelizeHds.content;

let Images = db.defineModel('images','local_news_image', {
    news_id:db.BIGINT(20),
    imgUrl:db.STRING(1000),
    type:db.INTEGER(1),
    sort: db.INTEGER(6),
    width:db.INTEGER(11),
    height:db.INTEGER(11),
    description:{
        type:db.STRING(1000),
        allowNull:true,
        defaultValue:'',
    }
});

Images.hook('afterFind',function (images,options) {
    if(!_isArray(images)){
        images = [images];
    }
    for(let i of images){
        if(i.description === null){
            i.description = '';
        }
    }
});

module.exports = Images;