/**
 * Created by shipengqi on 17-2-27.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.bdtt;

let Images = db.defineModel('images','local_news_image', {
    news_id:{
        type:db.BIGINT(20),
        allowNull:true
    },
    imgUrl:{
        type:db.STRING(1000),
        allowNull:true
    },
    is_list_img:db.INTEGER(1),
    list_img_order:db.INTEGER(6),
    width:{
        type:db.INTEGER(11),
        allowNull:true
    },
    height:{
        type:db.INTEGER(11),
        allowNull:true
    },
    description:db.STRING(1000)
});


module.exports = Images;