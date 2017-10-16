exports.up = function (knex) {
    return knex.schema
        .createTable('meansofpayment', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable();
            t.string('slug').notNullable();
            t.integer('step').notNullable().defaultTo(100);

            t.unique(['name', 'deleted_at']);
            t.unique(['slug', 'deleted_at']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('meansofpayment');
};
