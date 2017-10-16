exports.up = function(knex) {
    return knex.schema
        .createTable('meansofpayment', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable().unique();
            t.string('slug').notNullable().unique();
            t.integer('step').notNullable().defaultTo(100);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('meansofpayment');
};
