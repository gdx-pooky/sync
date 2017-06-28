/**
 * Created by shipengqi on 17-1-13.
 */
const mongoose = require('mongoose');
const _isString = require("lodash/isString");



const imageSchema = new mongoose.Schema(
    {
        src: String,
        text: String,
        height: Number,
        ori_src: String,
        width: Number,
        type: String,
        size: String
    }
);

/**
 * 文章 Schema
 */

const NewsSchema = new mongoose.Schema(
    {
        article_id: {type: Number, default: function() {
            return new Date().getTime();
        }},
        news_desc : {type: String, validate: {
            validator: function (value) {
                return _isString(value) && value.length > 0;
            },
            message: '{VALUE} not allow empty',
            required: [true,  'news_desc is required']
        }},
        news_title :{
            type: String,
            validate: {
                validator: function (value) {
                    return _isString(value) && value.length > 0;
                },
                message: '{VALUE} not allow empty',
                required: [true,  'news_title is required']
            }
        },
        is_handwork_news : {type: String, default: 1},
        update_time: {type: Number, default: function () {
            return new Date().getTime();
        }},
        originalUrl: String,
        region_id: Number,
        source_type: Number,
        news_image: String,
        cat: Number,
        typeName: String,
        region_id_new: String,
        news_intro: String,
        news_paper_name: String,
        news_category: Number,
        pic_uploaded: {type: Number, default: 0},
        allimage: String,
        mp_title: String,
        is_news:Number,
        news_pretty_desc:String,
        publish_time:String,
        title:String,
        url:String,
        is_handwork:Boolean,
        tag_id:[Number],
        category_id:Number,
        channel_id:[Number],
        create_time:String,
        source:String,
        images:[imageSchema]
    }
);

export default NewsSchema;