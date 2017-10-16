exports.up = function(knex) {
    return knex.schema
        .createTable('categories', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable();
            t.integer('priority').notNullable().defaultTo(0);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('categories');
};
