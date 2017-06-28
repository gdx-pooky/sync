/**
 * Created by shipengqi on 17-3-3.
 */
import {
    GrpcService
} from 'cms-public';

class RpcService {

    getNewsDetail (params) {
        return new Promise(function (resolve,reject) {
            GrpcService.client['getNews'].getNewsDetail(params, function(err, response) {
                if(err){
                    reject(err);
                    return;
                }
                resolve(response);
            });
        })
    }

    getShowType (params) {
        return new Promise(function (resolve,reject) {
            GrpcService.client['getNews'].getShowType(params, function(err, response) {
                if(err){
                    reject(err);
                    return;
                }
                resolve(response);
            });
        })
    };
}

export default RpcService;