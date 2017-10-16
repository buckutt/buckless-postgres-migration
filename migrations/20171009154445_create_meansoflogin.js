exports.up = function(knex) {
    return knex.schema
        .createTable('meansoflogin', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('type').notNullable();
            t.string('data').notNullable().unique();
            t.boolean('blocked').notNullable().defaultTo(false);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('meansoflogin');
};
