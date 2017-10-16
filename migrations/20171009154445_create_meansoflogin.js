exports.up = function (knex) {
    return knex.schema
        .createTable('meansoflogin', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('type').notNullable();
            t.string('data').notNullable();
            t.boolean('blocked').notNullable().defaultTo(false);

            t.unique(['type', 'data', 'deleted_at']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('meansoflogin');
};
