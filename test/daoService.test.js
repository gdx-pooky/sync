/**
 * Created by shipengqi on 17-3-7.
 */
import {expect} from 'chai';
import {
    SequelizeServices,
} from 'cms-public';
import config from 'config';
import {
    bdtt_id,
    news_id,
    sync_news_id,
    new_region_id,
    site_id
} from './test.json';

let showTypeDao = null,
    localNewsSyncDao = null,
    localNewsSortDao = null,
    localRegionDao = null,
    siteDao = null,
    syncNewsBaseDetailDao = null,
    syncSortNewsDao = null;

describe('daoService 测试',function () {

    before(function () {
        SequelizeServices.initSequelize(config.get('sequelizeServiceParas'));
    });

    describe('showTypeDao 测试', function() {

        before(function () {
            showTypeDao = require('../src/services/dao/showTypeDao');
        });

        it('getShowTypeByBdtt bdtt_id=110000 expect result=custom',function(done) {
            showTypeDao.getShowTypeByBdtt(bdtt_id).then(function (result) {
                expect(result.dataValues.showType).to.be.equal('custom');
                done();
            })
        });
    });

    describe('localNewsSortDao 测试', function() {

        before(function () {
            localNewsSortDao = require('../src/services/dao/localNewsSortDao');
        });

        it('getSortById news_id=123 expect result.length=0',function(done) {
            localNewsSortDao.getSortById(news_id).then(function (result) {
                expect(result.length).to.be.equal(0);
                done();
            })
        });
    });

    describe('localNewsSyncDao 测试', function() {

        before(function () {
            localNewsSyncDao = require('../src/services/dao/localNewsSyncDao');
        });

        it('getOnlineInfo sync_news_id=137 expect result:news_id=137 online_news_id=65181558',function(done) {
            localNewsSyncDao.getOnlineInfo(sync_news_id).then(function (result) {
                expect(result.dataValues.news_id).to.be.equal(137);
                expect(result.dataValues.online_news_id).to.be.equal(65181558);
                done();
            })
        });
    });

    describe('localRegionDao 测试', function() {

        before(function () {
            localRegionDao = require('../src/services/dao/localRegionDao');
        });

        it('getRegionId new_region_id=101000 expect result=101',function(done) {
            localRegionDao.getRegionId(new_region_id).then(function (result) {
                expect(result).to.be.equal(101);
                done();
            })
        });
    });

    describe('siteDao 测试', function() {

        before(function () {
            siteDao = require('../src/services/dao/siteDao');
        });

        it('convertToBdttId site_id=110000 expect result:150000',function(done) {
            siteDao.convertToBdttId(site_id).then(function (result) {
                expect(result).to.be.equal(150000);
                done();
            })
        });

        it('convertToSiteId bdtt_id=101017 expect result:330109',function(done) {
            siteDao.convertToSiteId(bdtt_id).then(function (result) {
                expect(result).to.be.equal(330109);
                done();
            })
        });

    });

    // describe('syncNewsBaseDetailDao 测试', function() {
    //
    //     before(function () {
    //         syncNewsBaseDetailDao = require('../src/services/dao/syncNewsBaseDetailDao');
    //     });
    //
    //     it('bdtt_id=110000 expect result:custom',function() {
    //         // showTypeDao.getShowTypeByBdtt(data.bdtt_id).then(function (result) {
    //         //     expect(result.dataValues.showType).to.be.equal('custom');
    //         //     done();
    //         // })
    //     });
    // });
    //
    // describe('syncSortNewsDao 测试', function() {
    //
    //     before(function () {
    //         syncSortNewsDao = require('../src/services/dao/syncSortNewsDao');
    //     });
    //
    //     it('bdtt_id=110000 expect result:custom',function() {
    //         // showTypeDao.getShowTypeByBdtt(data.bdtt_id).then(function (result) {
    //         //     expect(result.dataValues.showType).to.be.equal('custom');
    //         //     done();
    //         // })
    //     });
    // });
});
