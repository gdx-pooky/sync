/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

module.exports = db.defineModel('channelTags','local_channel_tag', {
    channel_id:db.INTEGER(11),
    tag_id:db.INTEGER(11)
});
