/**
 * Created by shipengqi on 17-3-20.
 */
import monitor from '../../framework/logHelper';
import {
    _date,
    _hour,
    _timestamp
} from '../../framework/utils/functionUtils';
import {
    NEWS_CATEGORY_COMMON,
    NEWS_CATEGORY_SEMINAR,
    NEWS_CATEGORY_ACTIVITY,
    NEWS_CATEGORY_H5_ACTIVITY,
    NEWS_CATEGORY_REVELATION,
    NEWS_CATEGORY_ADVERT,
    ONLINE_CATERGORY_COMMON,
    ONLINE_CATERGORY_SEMINAR,
    ONLINE_CATERGORY_IMAGE,
    ONLINE_CATERGORY_JOKE,
    ONLINE_CATERGORY_VIDEO,
    ONLINE_CATERGORY_BEAUTY,
    ONLINE_CATERGORY_ACTIVITY,
    ONLINE_CATERGORY_OUTSIDE_LINK,
    ONLINE_CATERGORY_REVELATION,
    ONLINE_CATERGORY_ADVERT,
    ONLINE_CATERGORY_H5_ACTIVITY,
    ENUM_COUNTRY_CHANNEL,
    ENUM_COMMEND_CHANNEL,
    LOCAL_CHANNEL_TAG,
    COUNTRY_CHANNEL_TAG
} from '../../contants/contants';
const DaoServices = require('../../framework/services')('/services/dao/');
const CATEGORY_MAPPING = new Map([
    [ONLINE_CATERGORY_COMMON,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_IMAGE,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_JOKE,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_VIDEO,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_COMMON,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_BEAUTY,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_OUTSIDE_LINK,NEWS_CATEGORY_COMMON],
    [ONLINE_CATERGORY_SEMINAR,NEWS_CATEGORY_SEMINAR],
    [ONLINE_CATERGORY_ACTIVITY,NEWS_CATEGORY_ACTIVITY],
    [ONLINE_CATERGORY_REVELATION,NEWS_CATEGORY_H5_ACTIVITY],
    [ONLINE_CATERGORY_ADVERT,NEWS_CATEGORY_REVELATION],
    [ONLINE_CATERGORY_H5_ACTIVITY,NEWS_CATEGORY_ADVERT]
]);

const CHANNEL_MAPPING = {
    1:ENUM_COMMEND_CHANNEL,
    2:ENUM_COUNTRY_CHANNEL
};

const TAG_MAPPING = {
    1:LOCAL_CHANNEL_TAG,
    2:COUNTRY_CHANNEL_TAG
};

module.exports = async (params) => {
    if(!CATEGORY_MAPPING.has(params.news_category)){
        monitor.warn(`unknown category : ${params.news_category}, please check it`);
        return;
    }

    let newsInfo = {
        create_date : _date(),
        create_hour :  _hour(),
        type : CATEGORY_MAPPING.get(params.news_category),
        data_id : params.new_data_id,
        collection_name : params.collection_name,
        title : params.title,
        source :  params.source_title
    };
    let site_id = await DaoServices.siteDao.convertToSiteId(params.region_id_new);
    let tag_id = TAG_MAPPING[params.channel_id];
    params.channel_id = CHANNEL_MAPPING[params.channel_id];
    let syncInfo = {
        publish_time: _timestamp(),
        publish_hour: _hour(),
        publish_date: _date(),
        area_id: params.area_id,
        channel: params.channel_id,
        site_id: site_id,
        online_news_id:params.online_news_id
    };

    return await DaoServices.syncOnlineArticleDao({
        online_news_id:params.online_news_id,
        newsInfo:newsInfo,
        syncInfo:syncInfo,
        tag_id:tag_id
    });
};