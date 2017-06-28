/**
 * Created by shipengqi on 17-3-14.
 */
import request from 'requestretry';
import config from 'config';
import {ONLINE_LOCAL_CHANNEL} from '../../contants/contants';
const ltsUrl = config.get('ltsUrl');

class CacheService {

    async ltsRefresh(region_id) {

        let options = {
            url: ltsUrl,
            method: "POST",
            form: {
                region_id:region_id,
                channel_id:ONLINE_LOCAL_CHANNEL
            }
        };

        return await request(options);
    }
}

export default CacheService;