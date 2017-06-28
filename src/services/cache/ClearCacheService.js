/**
 * Created by shipengqi on 17-3-14.
 */
import {
    REDIS_KEY_ARTICLE_DETAIL,
    REDIS_KEY_GLOBAL_YOP_LIST,
    REDIS_KEY_TOP_LIST,
    REDIS_KEY_SORT_LIST
} from '../../contants/contants';
import RedisCacheService from '../redis/RedisCacheService';
import CacheService from '../external/CacheService';
const cacheService = new CacheService();

class ClearCacheDao extends RedisCacheService {
    constructor(instanceName) {
        super(instanceName);
    }

    async clearArticleCache(data_id) {
        let key = `${REDIS_KEY_ARTICLE_DETAIL}${data_id}`;
        return await super.clearCache(key);
    }

    async clearGlobalListCache(region_id,channel_id) {
        let key = `${REDIS_KEY_GLOBAL_YOP_LIST}r${region_id}c${channel_id}`;
        return await super.clearCache(key);
    }

    async clearTopListCache(region_id,channel_id) {
        let key = `${REDIS_KEY_TOP_LIST}r${region_id}c${channel_id}`;
        return await super.clearCache(key);
    }

    async clearSortListCache(region_id,channel_id) {
        let key = `${REDIS_KEY_SORT_LIST}r${region_id}c${channel_id}`;
        return await super.clearCache(key);
    }

    async clearCommonListCache(region_id) {
        return await cacheService.ltsRefresh(region_id);
    }
}

export default ClearCacheDao;