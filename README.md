# sync-server



benditoutiao cms 内容管理同步服务



## Usage



>./scripts/build.sh




## dir



[TOC]


### config
配置文件


default.js  &emsp;&emsp;默认配置  


develop.js&emsp;&emsp;开发环境配置


production.js&emsp;&emsp;生产环境配置

### logs
日志
### test
单元测试
### src

#### contants


contants.js  &emsp;&emsp; 普通常量


operation.js&emsp;&emsp;操作类型常量


responseData.js&emsp;&emsp;请求回复常量


### framework


Decorators.js      &emsp;&emsp;装饰器


logHelper.js &emsp;&emsp;日志文件


model.js&emsp;&emsp;导入model文件


services.js&emsp;&emsp;导入service文件


#### utils


functionUtils.js&emsp;&emsp; 函数工具
    

### models

#### mongo-model
mongoose model


#### mysql-model
线下Sequelize model


#### online-model
线上Sequelize model


### services
服务层


#### api
接口层


#### biz
业务层


#### cache
缓存


#### dao
数据层


#### external
与php通信服务


#### mongo
mongo服务


#### redis
redis服务


#### rpc
rpc服务
