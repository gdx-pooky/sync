/**
 * Created by shipengqi on 17-2-24.
 */
var kafka = require('cms-public').KafkaService;
// kafka.createProducer({address:'118.178.231.36:2181'});
kafka.createProducer({address:'127.0.0.1:2181'});
var appId = 101010;
setTimeout(function () {
    // var partition = appId % 4;
    // console.log(partition)
    // kafka.sendMsg([{
    //     topic: 'cms',
    //     messages: JSON.stringify({operation:'showTypeSync',data:{bdttId:101017}})
    // }], function(err, result) {
    //     console.log(err || result);
    //     appId ++;
    //     console.log(appId);
    // });
    kafka.sendMsg([{
        topic: 'cms',
        messages: JSON.stringify({operation:'articleSync',data:{newsId:554,siteId:0}})
    }], function(err, result) {
        console.log(err || result);
    });
    // kafka.sendMsg([{
    //     topic: 'cms',
    //     messages: JSON.stringify({"operation":"sortSync",
    //         data:{
    //         "newsIds":["305","307","309","306","311"],
    //         "channel":"commend",
    //         "areaId":1,
    //         "siteId":540121
    //         }
    //     })
    // }], function(err, result) {
    //     console.log(err || result);
    // });

    // kafka.sendMsg([{
    //     topic: 'cms',
    //     messages: JSON.stringify({operation:'onlineArticleSync',data:{
    //         online_news_id:99857239,
    //         news_category:2,
    //         status:0,
    //         channel_id:1,
    //         area_id:3,
    //         title:'ss',
    //         source_title:'ss',
    //         new_data_id:'23546543216543213541',
    //         collection_name:'34323ddd213'
    //     }})
    // }], function(err, result) {
    //     console.log(err || result);
    // });
    // kafka.sendMsg([{
    //     topic: 'cms',
    //     messages: JSON.stringify({operation:'onlineStatusSync',data:{
    //         online_news_id:74277294,
    //         status:0
    //     }})
    // }], function(err, result) {
    //     console.log(err || result);
    // });
},2000);


