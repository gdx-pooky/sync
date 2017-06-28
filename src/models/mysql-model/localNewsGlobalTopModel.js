'use strict';

var _cmsPublic = require('cms-public');

var db = _cmsPublic.SequelizeServices.sequelizeHds.content; /**
                                                          * Created by shipengqi on 17-1-12.
                                                          */


module.exports = db.define('clobalTops', {
    id: {
        type: db.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    news_id: {
        type: db.BIGINT(20),
        allowNull: false
    },
    news_category: db.INTEGER(3),
    channel_id: {
        type: db.INTEGER(11),
        allowNull: false
    },
    region_id: {
        type: db.INTEGER(11),
        allowNull: false
    },
    status: {
        type: db.INTEGER(4),
        allowNull: false
    },
    is_delete: {
        type: db.INTEGER(4),
        allowNull: false
    },
    type: {
        type: db.INTEGER(4),
        allowNull: false
    },
    sequence: db.BIGINT(20)
}, {
    tableName: 'local_news_global_top',
    freezeTableName: true,
    timestamps: false
});