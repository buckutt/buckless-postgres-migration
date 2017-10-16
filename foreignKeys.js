exports.up = function(knex) {
    return knex.schema
        .table('devices', (t) => {
            t.foreign('defaultGroup_id').references('groups.id');
        })
        .table('wikets', (t) => {
            t.foreign('device_id').references('devices.id');
            t.foreign('point_id').references('points.id');
            t.foreign('period_id').references('periods.id');
        })
        .table('events', (t) => {
            t.foreign('defaultGroup_id').references('groups.id');
            t.foreign('defaultFundation_id').references('fundations.id');
            t.foreign('defaultPeriod_id').references('periods.id');
        })
        .table('memberships', (t) => {
            t.foreign('user_id').references('users.id');
            t.foreign('group_id').references('groups.id');
            t.foreign('period_id').references('periods.id');
        })
        .table('meansoflogin', (t) => {
            t.foreign('user_id').references('users.id');
        })
        .table('periods', (t) => {
            t.foreign('event_id').references('events.id');
        })
        .table('prices', (t) => {
            t.foreign('article_id').references('articles.id');
            t.foreign('fundation_id').references('fundations.id');
            t.foreign('group_id').references('groups.id');
            t.foreign('period_id').references('periods.id');
            t.foreign('point_id').references('points.id');
            t.foreign('promotion_id').references('promotions.id');
        })
        .table('purchases', (t) => {
            t.foreign('price_id').references('prices.id');
            t.foreign('point_id').references('points.id');
            t.foreign('promotion_id').references('promotions.id');
            t.foreign('buyer_id').references('users.id');
            t.foreign('seller_id').references('users.id');
        })
        .table('refunds', (t) => {
            t.foreign('buyer_id').references('users.id');
            t.foreign('seller_id').references('users.id');
        })
        .table('reloads', (t) => {
            t.foreign('point_id').references('points.id');
            t.foreign('buyer_id').references('users.id');
            t.foreign('seller_id').references('users.id');
        })
        .table('rights', (t) => {
            t.foreign('point_id').references('points.id');
            t.foreign('period_id').references('periods.id');
            t.foreign('user_id').references('users.id');
        })
        .table('transfers', (t) => {
            t.foreign('sender_id').references('users.id');
            t.foreign('reciever_id').references('users.id');
        })
        .table('articles_categories', (t) => {
            t.foreign('article_id').references('articles.id');
            t.foreign('category_id').references('categories.id');
        })
        .table('articles_sets', (t) => {
            t.foreign('article_id').references('articles.id');
            t.foreign('set_id').references('sets.id');
        })
        .table('articles_purchases', (t) => {
            t.foreign('article_id').references('articles.id');
            t.foreign('purchase_id').references('purchases.id');
        })
        .table('categories_points', (t) => {
            t.foreign('category_id').references('categories.id');
            t.foreign('point_id').references('points.id');
        })
        .table('promotions_sets', (t) => {
            t.foreign('promotion_id').references('promotions.id');
            t.foreign('set_id').references('sets.id');
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('devices', (t) => {
            t.dropForeign('defaultGroup_id');
            t.dropColumn('defaultGroup_id');
        })
        .table('wikets', (t) => {
            t.dropForeign('device_id');
            t.dropForeign('point_id');
            t.dropForeign('period_id');
            t.dropColumn('device_id');
            t.dropColumn('point_id');
            t.dropColumn('period_id');
        })
        .table('events', (t) => {
            t.dropForeign('defaultGroup_id');
            t.dropForeign('defaultFundation_id');
            t.dropForeign('defaultPeriod_id');
            t.dropColumn('defaultGroup_id');
            t.dropColumn('defaultFundation_id');
            t.dropColumn('defaultPeriod_id');
        })
        .table('memberships', (t) => {
            t.dropForeign('user_id');
            t.dropForeign('group_id');
            t.dropForeign('defaultPeriod_id');
            t.dropColumn('period_id');
            t.dropColumn('group_id');
            t.dropColumn('period_id');
        })
        .table('meansoflogin', (t) => {
            t.dropForeign('user_id');
            t.dropColumn('user_id');
        })
        .table('periods', (t) => {
            t.dropForeign('event_id');
            t.dropColumn('event_id');
        })
        .table('prices', (t) => {
            t.dropForeign('article_id');
            t.dropForeign('fundation_id');
            t.dropForeign('group_id');
            t.dropForeign('period_id');
            t.dropForeign('point_id');
            t.dropForeign('promotion_id');
            t.dropColumn('article_id');
            t.dropColumn('fundation_id');
            t.dropColumn('group_id');
            t.dropColumn('period_id');
            t.dropColumn('point_id');
            t.dropColumn('promotion_id');
        })
        .table('purchases', (t) => {
            t.dropForeign('price_id');
            t.dropForeign('point_id');
            t.dropForeign('promotion_id');
            t.dropForeign('buyer_id');
            t.dropForeign('seller_id');
            t.dropColumn('price_id');
            t.dropColumn('point_id');
            t.dropColumn('promotion_id');
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('refunds', (t) => {
            t.dropForeign('buyer_id');
            t.dropForeign('seller_id');
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('reloads', (t) => {
            t.dropForeign('point_id');
            t.dropForeign('buyer_id');
            t.dropForeign('seller_id');
            t.dropColumn('point_id');
            t.dropColumn('buyer_id');
            t.dropColumn('seller_id');
        })
        .table('rights', (t) => {
            t.dropForeign('point_id');
            t.dropForeign('period_id');
            t.dropForeign('user_id');
            t.dropColumn('point_id');
            t.dropColumn('period_id');
            t.dropColumn('user_id');
        })
        .table('transfers', (t) => {
            t.dropForeign('sender_id');
            t.dropForeign('reciever_id');
            t.dropColumn('sender_id');
            t.dropColumn('reciever_id');
        });
};
