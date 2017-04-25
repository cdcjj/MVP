let path = require('path');
let knex = require('knex') ({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});

let db = require('bookshelf')(knex);

db.knex.schema.createTableIfNotExists('urls', user => {
  user.increments('id').primary();
  user.string('username', 20).unique();
  user.string('password', 20)
})
.then(table => {
  console.log(`Created table: ${table}`);
});

db.knex.schema.createTableIfNotExists('inventory', function(inventory) {
  inventory.increments('id').primary();
  inventory.string('name', 255);
  inventory.date('date');
  inventory.integer('amount');
  inventory.integer('user_id').unsigned();
  inventory.integer('category_id').unsigned();
  inventory.foreign('user_id').references('users.id');
  inventory.foreign('category_id').references('users.id');
})
.then(function(table) {
  console.log(`Created table: ${table}`);
});


db.knex.schema.createTable('category', function(category) {
  category.increments('id').primary();
  category.string('name', 255);
})
.then(table => {
  console.log(`Created table: ${table}`);
});

db.knex.schema.createTableIfNotExists('users_category', function(table) {
  table.increments().primary();
  table.integer('user_id').unsigned();
  table.integer('category_id').unsigned();
  table.foreign('user_id').references('users.id');
  table.foreign('category_id').references('categories.id');
})
.then(function(table) {
  console.log(`Created table: ${table}`);
});

module.exports = db;
