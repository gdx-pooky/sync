/**
 * Created by shipengqi on 17-1-12.
 */
import {SequelizeServices} from 'cms-public';
const db = SequelizeServices.sequelizeHds.content;

let Accounts = db.defineModel('accounts','local_account_library', {
    account_id:{
        type:db.BIGINT(20),
        allowNull:true
    },
    account_site_id:{
        type:db.STRING(6),
        allowNull:true
    },
    library_site_id:{
        type:db.STRING(6),
        allowNull:true
    },
    icon:{
        type:db.STRING(20),
        allowNull:true
    }
});


module.exports = Accounts;
