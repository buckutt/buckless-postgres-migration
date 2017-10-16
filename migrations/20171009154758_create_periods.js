exports.up = function(knex) {
    return knex.schema
        .createTable('periods', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable();
            t.dateTime('start').notNullable();
            t.dateTime('end').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('periods');
};
