exports.up = function(knex) {
    return knex.schema
        .createTable('events', (t) => {
            t.uuid('id').primary();
            t.timestamps(false, true);
            t.dateTime('deleted_at').nullable();

            t.string('name').notNullable().unique();
            t.integer('minReload').notNullable().defaultTo(100);
            t.integer('maxPerAccount').notNullable().defaultTo(100 * 1000);
            t.integer('maxAlcohol').notNullable().defaultTo(0);
            t.boolean('useGroups').notNullable().defaultTo(true);
            t.boolean('useFundations').notNullable().defaultTo(true);
            t.boolean('usePeriods').notNullable().defaultTo(true);
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('events');
};
