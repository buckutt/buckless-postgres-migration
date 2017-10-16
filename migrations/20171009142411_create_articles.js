exports.up = function (knex) {
    return knex.schema
        .createTable('articles', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable();
            t.integer('alcohol').notNullable().unsigned().defaultTo(0);
            t.integer('stock').notNullable().defaultTo(0);
            t.integer('vat').notNullable().defaultTo(0);

            t.unique(['name', 'deleted_at']);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('articles');
};
