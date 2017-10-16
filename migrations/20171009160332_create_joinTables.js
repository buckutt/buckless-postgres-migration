exports.up = function(knex) {
  return knex.schema
    .createTable('articles_categories', (t) => {
            t.increments();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.uuid('article_id');
            t.uuid('category_id');
    })
    .createTable('articles_sets', (t) => {
            t.increments();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.uuid('article_id');
            t.uuid('set_id');
    })
    .createTable('articles_purchases', (t) => {
            t.increments();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();
            t.integer('count').defaultTo(1);

            t.uuid('article_id');
            t.uuid('purchase_id');
    })
    .createTable('categories_points', (t) => {
            t.increments();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.uuid('category_id');
            t.uuid('point_id');
    })
    .createTable('promotions_sets', (t) => {
            t.increments();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.uuid('promotion_id');
            t.uuid('set_id');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('articles_categories')
    .dropTable('articles_sets')
    .dropTable('articles_purchases')
    .dropTable('categories_points')
    .dropTable('promotions_sets');
};
