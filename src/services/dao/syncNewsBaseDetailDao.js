/**
 * Created by shipengqi on 17-3-2.
 */
import {
    newsDate,
    _timestamp,
    _date,
    _hour,
    _second
} from '../../framework/utils/functionUtils';
import {
    ONLINE_BLOCK_ID_GLOBAL_TOP,
    ONLINE_BLOCK_ID_BIG_ADVERT,
    ONLINE_BLOCK_ID_SMALL_ADVERT,
    ONLINE_BLOCK_ID_NO_IMAGE,
    ONLINE_BLOCK_ID_SINGLE_IMAGE,
    ONLINE_BLOCK_ID_MULTIPLE_IMAGE,
    ONLINE_CATERGORY_COMMON,
    ONLINE_CATERGORY_IMAGE,
    ONLINE_CATERGORY_VIDEO,
    ONLINE_CATERGORY_OUTSIDE_LINK,
    BLOCK_ID_BIG_ADVERT,
    BLOCK_ID_SMALL_ADVERT,
    BLOCK_ID_NO_IMAGE,
    BLOCK_ID_SINGLE_IMAGE,
    BLOCK_ID_MULTIPLE_IMAGE,
    BLOCK_ID_VIDEO,
    GLOBAL_TOP_NEWS_LIST,
    TOP_NEWS_LIST,
    NEWS_TYPE_COMMON,
    NEWS_TYPE_IMAGE,
    NEWS_TYPE_VIDEO,
    NEWS_TYPE_OUTSIDE_LINK,
    COUNTRY_SITE_ID,
    ONLINE_SET_TOP_ARTICLE,
    ONLINE_GLOBAL_ARTICLE,
    LOCAL_CHANNEL_TAG,
    ONLINE_LOCAL_CHANNEL,
    ONLINE_COUNTRY_CHANNEL,
    ONLINE_BLOCK_ID_VIDEO,
    ENUM_COUNTRY_CHANNEL,
    ENUM_COMMEND_CHANNEL,
    SORT_NEWS_LIST,
    ONLINE_LOCAL_TAG,
    ONLINE_COUNTRY_TAG,
    NEWS_CATEGORY_COMMON,
    NEWS_CATEGORY_SEMINAR,
    NEWS_CATEGORY_ACTIVITY,
    NEWS_CATEGORY_H5_ACTIVITY,
    NEWS_CATEGORY_ADVERT,
    NEWS_CATEGORY_REVELATION,
    ONLINE_CATERGORY_SEMINAR,
    ONLINE_CATERGORY_REVELATION,
    ONLINE_CATERGORY_ADVERT,
    ONLINE_CATERGORY_H5_ACTIVITY,
    ONLINE_CATERGORY_ACTIVITY
} from '../../contants/contants';
import ClearCacheService from '../cache/ClearCacheService';
const DaoServices = require('../../framework/services')('/services/dao/');
const model = require('../../framework/model')('/models/online-model/');
const offlineModel = require('../../framework/model')();
const COMMON_NEWS_CATEGORY_MAPPING = new Map([
    [NEWS_TYPE_COMMON,ONLINE_CATERGORY_COMMON],
    [NEWS_TYPE_IMAGE,ONLINE_CATERGORY_IMAGE],
    [NEWS_TYPE_VIDEO,ONLINE_CATERGORY_VIDEO],
    [NEWS_TYPE_OUTSIDE_LINK,ONLINE_CATERGORY_OUTSIDE_LINK]
]);

const NEWS_CATEGORY_MAPPING = new Map([
    [NEWS_CATEGORY_SEMINAR,ONLINE_CATERGORY_SEMINAR],
    [NEWS_CATEGORY_ACTIVITY,ONLINE_CATERGORY_ACTIVITY],
    [NEWS_CATEGORY_REVELATION,ONLINE_CATERGORY_REVELATION],
    [NEWS_CATEGORY_ADVERT,ONLINE_CATERGORY_ADVERT],
    [NEWS_CATEGORY_H5_ACTIVITY,ONLINE_CATERGORY_H5_ACTIVITY]
]);
const NEWS_BLOCK_ID_MPPING = new Map([
    [BLOCK_ID_BIG_ADVERT,ONLINE_BLOCK_ID_BIG_ADVERT],
    [BLOCK_ID_SMALL_ADVERT,ONLINE_BLOCK_ID_SMALL_ADVERT],
    [BLOCK_ID_NO_IMAGE,ONLINE_BLOCK_ID_NO_IMAGE],
    [BLOCK_ID_SINGLE_IMAGE,ONLINE_BLOCK_ID_SINGLE_IMAGE],
    [BLOCK_ID_MULTIPLE_IMAGE,ONLINE_BLOCK_ID_MULTIPLE_IMAGE],
    [BLOCK_ID_VIDEO,ONLINE_BLOCK_ID_VIDEO]
]);

module.exports = async (detail,onlineInfo) => {
    let is_online = false;
    let insertId;
    let site_id = detail.region_ids[0].region_id;
    let area_id = detail.areas[0].area_id;
    let tag_id = detail.channels[0].tag_id;
    let channel_enum;
    let top_channel;
    let category = detail.type === NEWS_CATEGORY_COMMON ? COMMON_NEWS_CATEGORY_MAPPING.get(detail.common_type) : NEWS_CATEGORY_MAPPING.get(detail.type);
    let news = {};
    news.title = detail.title;
    news.source_title = detail.source_title;
    news.region_type = 2;
    news.block_id = NEWS_BLOCK_ID_MPPING.get(detail.block_id);
    news.description = detail.description;
    news.news_date = newsDate();
    news.is_delete = 0;
    news.source_url = detail.link;
    news.status = detail.is_publish;
    news.source_type = 0;
    news.news_category = category || ONLINE_CATERGORY_COMMON;
    news.paper_id = 'handwork';
    news.collection_name = detail.collection_name;
    news.data_id = detail.data_id;
    news.new_data_id = detail.data_id;
    if (area_id === GLOBAL_TOP_NEWS_LIST) {
        news.block_id = ONLINE_BLOCK_ID_GLOBAL_TOP;
    }
    if (detail.region_ids[0].region_id === COUNTRY_SITE_ID) {
        news.region_id = -1;
        news.region_id_new = 999999;
    } else {
        let region_id_new = await DaoServices.siteDao.convertToBdttId(site_id);
        let regionId = await DaoServices.localRegionDao.getRegionId(region_id_new);
        news.region_id = regionId;
        news.region_id_new = region_id_new;
    }

    if (onlineInfo && onlineInfo.online_news_id) { //线上是否同步过
        news.id = onlineInfo.online_news_id;
        is_online = true;
    }

    if (is_online) {　//线上已同步过　更新
        await model.localNewsModel.update(news, {
            where: {
                id: news.id
            }
        });
        insertId = news.id;
    } else {　　　　　//未同步　插入记录
        let insertResult = await model.localNewsModel.create(news);
        insertId = insertResult.id;
    }

    let result = await model.localNewsModel.findById(insertId);
    let news_id = news.id || result.id;
    //先删除辅表记录
    await Promise.all([
        model.localNewsImageModel.destroy({
            where: {
                news_id: news_id
            }
        }),
        model.localNewsAssistModel.destroy( {
            where: {
                news_id: news_id
            }
        }),
        model.localNewsGlobalTopModel.destroy({
            where: {
                news_id: news_id
            }
        }),
        model.localTopNewsModel.destroy({
            where:{
                news_id: news_id
            }
        })
    ]);

    let onlineImages = detail.images.map(function (item) {
        let temp = {};
        temp.is_list_img = item.type;
        temp.list_img_order = item.sort;
        temp.news_id = news_id;
        temp.imgUrl = item.imgUrl;
        temp.width = item.width;
        temp.height = item.height;
        temp.description = item.description || '';
        return temp;
    });
    model.localNewsImageModel.bulkCreate(onlineImages);

    if (tag_id === LOCAL_CHANNEL_TAG) {
        channel_enum = ENUM_COMMEND_CHANNEL;
        top_channel = ONLINE_LOCAL_CHANNEL;
    } else {
        channel_enum = ENUM_COUNTRY_CHANNEL;
        top_channel = ONLINE_COUNTRY_CHANNEL;
    }
    if (!is_online) {
        offlineModel.localNewsSyncModel.create({
            online_news_id: news_id,
            publish_time: _timestamp(),
            publish_hour: _hour(),
            publish_date: _date(),
            news_id: detail.id,
            area_id: area_id,
            channel: channel_enum,
            is_online: detail.is_publish,
            site_id: site_id
        });
    }else{
        offlineModel.localNewsSyncModel.update({
            publish_time: _timestamp(),
            publish_hour: _hour(),
            publish_date: _date(),
            area_id: area_id,
            channel: channel_enum,
            is_online: detail.is_publish,
            site_id: site_id
        },{
            where:{
                news_id: detail.id
            }
        });
    }

    if(area_id === SORT_NEWS_LIST){
        model.localTopNewsModel.create({
            news_id:news_id,
            sequence:_second(),
            region_id:news.region_id_new,
            channel:top_channel,
            status:detail.is_publish
        });
    }

    let clearCacheService = new ClearCacheService('app');
    clearCacheService.clearArticleCache(detail.data_id);
    clearCacheService.clearCommonListCache(news.region_id_new);

    let top_type,
        sequence = 0,
        is_globao_top = true,
        global_sequence;

    if (area_id === TOP_NEWS_LIST) {
        top_type = ONLINE_SET_TOP_ARTICLE;
        global_sequence = _second();
    } else if (area_id === GLOBAL_TOP_NEWS_LIST) {
        top_type = ONLINE_GLOBAL_ARTICLE;
        global_sequence = 0-_second();
    }else{
        is_globao_top = false;
        sequence = result.sequence;
    }

    let onlineAssists = detail.channels.map(function (item) {
        let temp = {};
        temp.region_id_new = news.region_id_new;
        temp.news_id = news_id;
        temp.is_recommand = 0;
        temp.status = detail.is_publish;
        temp.sequence = sequence;
        temp.version = 30800;
        temp.tag_id = item.tag_id === LOCAL_CHANNEL_TAG ? ONLINE_LOCAL_TAG : ONLINE_COUNTRY_TAG;
        return temp;
    });
    if (onlineAssists.length === 0) {
        onlineAssists = [{
            tag_id: 0,
            region_id_new: news.region_id_new,
            news_id: news_id,
            is_recommand: 0,
            status: detail.is_publish,
            sequence: sequence,
            version: 30800
        }]
    }

    model.localNewsAssistModel.bulkCreate(onlineAssists);

    if(!is_globao_top){
        return;
    }

    let globalTops = detail.channels.map(function (item,index) {
        let temp = {tag_id: item.tag_id};
        if (temp.tag_id === LOCAL_CHANNEL_TAG) {
            temp.channel_id = ONLINE_LOCAL_CHANNEL;
        } else {
            temp.channel_id = ONLINE_COUNTRY_CHANNEL;
        }
        temp.region_id = news.region_id_new;
        temp.news_id = news_id;
        temp.status = detail.is_publish;
        temp.type = top_type;
        temp.sequence = global_sequence;
        return temp;
    });

    model.localNewsGlobalTopModel.bulkCreate(globalTops);

};