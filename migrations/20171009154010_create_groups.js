exports.up = function(knex) {
    return knex.schema
        .createTable('groups', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable().unique();
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('groups');
};
