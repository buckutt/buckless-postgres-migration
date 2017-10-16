exports.up = function(knex) {
    return knex.schema
        .table('devices', (t) => {
            t.uuid('defaultGroup_id');
        })
        .table('wikets', (t) => {
            t.uuid('device_id');
            t.uuid('point_id');
            t.uuid('period_id');
        })
        .table('events', (t) => {
            t.uuid('defaultGroup_id');
            t.uuid('defaultFundation_id');
            t.uuid('defaultPeriod_id');
        })
        .table('memberships', (t) => {
            t.uuid('user_id');
            t.uuid('group_id');
            t.uuid('period_id');
        })
        .table('meansoflogin', (t) => {
            t.uuid('user_id');
        })
        .table('periods', (t) => {
            t.uuid('event_id');
        })
        .table('prices', (t) => {
            t.uuid('article_id');
            t.uuid('fundation_id');
            t.uuid('group_id');
            t.uuid('period_id');
            t.uuid('point_id');
            t.uuid('promotion_id');
        })
        .table('purchases', (t) => {
            t.uuid('price_id');
            t.uuid('point_id');
            t.uuid('promotion_id');
            t.uuid('buyer_id');
            t.uuid('seller_id');
        })
        .table('refunds', (t) => {
            t.uuid('buyer_id');
            t.uuid('seller_id');
        })
        .table('reloads', (t) => {
            t.uuid('point_id');
            t.uuid('buyer_id');
            t.uuid('seller_id');
        })
        .table('rights', (t) => {
            t.uuid('point_id');
            t.uuid('period_id');
            t.uuid('user_id');
        })
        .table('transfers', (t) => {
            t.uuid('sender_id');
            t.uuid('reciever_id');
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('devices', (t) => {
            t.dropColumn('defaultGroup_id');
        })
        .table('wikets', (t) => {
            t.dropColumn('device_id');
            t.dropColumn('point_id');
            t.dropColumn('period_id');
        })
        .table('events', (t) => {
            t.dropColumn('defaultGroup_id');
            t.dropColumn('defaultFundation_id');
            t.dropColumn('defaultPeriod_id');
        })
        .table('memberships', (t) => {
            t.dropColumn('period_id');
            t.dropColumn('group_id');
            t.dropColumn('period_id');
        })
        .table('meansoflogin', (t) => {
            t.dropColumn('user_id');
        })
        .table('periods', (t) => {
            t.dropColumn('event_id');
        })
        .table('prices', (t) => {
            t.dropColumn('article_id');
            t.dropColumn('fundation_id');
            t.dropColumn('group_id');
            t.dropColumn('period_id');
            t.dropColumn('point_id');
            t.dropColumn('promotion_id');
        })
        .table('purchases', (t) => {
            t.dropColumn('price_id');
            t.dropColumn('point_id');
            t.dropColumn('promotion_id');
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('refunds', (t) => {
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('reloads', (t) => {
            t.dropColumn('point_id');
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('rights', (t) => {
            t.dropColumn('point_id');
            t.dropColumn('period_id');
            t.dropColumn('user_id');
        })
        .table('transfers', (t) => {
            t.dropColumn('sender_id');
            t.dropColumn('reciever_id');
        });
};
