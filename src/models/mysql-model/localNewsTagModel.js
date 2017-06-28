/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;
const ChannelTag = require('./localChannelTagModel');

const Tags = db.defineModel('tags','local_news_tag', {
    news_id:db.BIGINT(20),
    tag_id:db.INTEGER(11)
});

Tags.hasMany(ChannelTag,{as:'channelTags',foreignKey:'tag_id'});

module.exports = Tags;