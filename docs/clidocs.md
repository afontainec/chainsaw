## Command Line Interface Documentation

Creating CRUD (Create, Read, Update, Delete) operations has never being easier than with Chinchay. Use a intuitive and easy-to-use CLI to get started, generating Model View Controllers with just one command.

Do not get stuck making complex SQL queries. Chinchay makes that part easy using readable JSON object.

### The "new" Command

This command will create migrations, models, controllers, views and routes for a given relation. Basically with just one command you are all set to for the CRUD (create, read, update, delete) of than relation. You can use it by running:

```
$ chinchay new relation_name
```

Where relation_name is the name of the relation you want to work with.

#### Migration

A migration file will be created on the directory specified in the knexfile. If you are unfamiliar of how knexfile or knex works see the [knex documentation](https://knexjs.org/). 

But, in a glance, knex uses migrations to make changes to the database schema. For every change you want to make, you create a migration file.
This file has two main methods: _up_ and _down_. The change to the database must be included in the _up_ method where in the _down_ method code to reverse the change should be provided. Therefore you can go back and forth a migration running the _down_ and _up_ method.
The main commands that knex uses here are:

```
$ knex migrate:latest
```
This will run all the _up_ methods of the migration files. It will register which migrations it ran, therefore if yo create more migration and then run again this command, only the new migrations will ran.
```
$ knex migrate:rollback
```
This will run all the _down_ methods of the migration files. Its kind of an "undo" for the previous command.
```
$ knex migrate:make migration_name
```
This will create a new migration file called _migration_name_.

When you run:
```
$ chinchay new relation_name
```
A migration file is created as if you had ran:
```
$ knex migrate:make relation_name
```

By default this file is as follows:

```javascript
exports.up = function (knex) {
  return knex.schema.createTable('relation_name', (table) => {
    // Incremental id
    table.increments();

    // created_at and updated_at
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('relation_name');
};
```

It will create a table with an incremental id and a created_at and updated_at columns. You can edit this file as you wish, for example:

```javascript
exports.up = function (knex) {
  return knex.schema.createTable('relation_name', (table) => {
    // Incremental id
    table.increments();
    table.string('name').notNullable();
    table.integer('price');
    // created_at and updated_at
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('relation_name');
};
```

Go to the [knex documentation](https://knexjs.org/) for more info of how to work aroud migrations.

Dont forget to run: `$ knex migrate:latest ` in order for the migration to take place!

#### Routes

The command also generates a lot of routes to work around with this relation. 
This routes are generated in two separated files: relationName.js and relationNameAPI.js. Both files are created within the directory specified in the [chainfile](#.chainfile.js). This will be explained further on but feel free to go to the [chainfile section](#.chainfile.js).

The CRUD operations are in the following routes:

##### C for CREATE

* **URL:** _POST_ /relation_name/new
* **File:** relationName.js
* **Description:** This URL creates a new entry in the relation. It recieved a JSON object as parameter with the columns name.
* **EXAMPLE:** Here is an example using requestify:
```javascript
requestify.post('/relation_name/new', {
    name: 'The name of the entry',
    price: 20
  });
```
This will create the entry with the given name and price.

##### R for READ

* **URL:** _GET_ /relation_name/:id
* **File:** relationNameAPI.js
* **Description:** This URL returns the JSON corresponding to the entry with the given id.
* **EXAMPLE:** Here is an example using requestify:
```javascript
const response = await requestify.get('/relation_name/1');
const body = response.getBody();
```


* **URL:** *_DELETE_ /relation_name/:id
* **File:** relationName.js
* **Description:** This URL deletes an entry in the relation.
* **EXAMPLE:** Here is an example using requestify:
```javascript
requestify.delete('/relation_name/1');
```
This will delete the entry with id = 1.

##### U for UPDATE

* **URL:** _PUT_ _POST_ _PATCH_ /relation_name/:id/edit
* **File:** relationName.js
* **Description:** This URL updates an entry in the relation. it recieved a JSON object as parameter with the columns name.
* **EXAMPLE:** Here is an example using requestify:
```javascript
requestify.put('/relation_name/1/edit', {
    name: 'This is the new name',
    price: 10
  });
```
This will update the name and price of the entry with id = 1. It will only update the columns specified, therefore if the price was not included in the JSON, only the name will be updated.

* **URL:** *_DELETE_ /relation_name/:id
* **File:** relationName.js
* **Description:** This URL deletes an entry in the relation.
* **EXAMPLE:** Here is an example using requestify:
```javascript
requestify.delete('/relation_name/1');
```
This will delete the entry with id = 1.



* _GET_ /relation_name/
* _GET_ /relation_name/new
* _GET_ /relation_name/:id
* _GET_ /relation_name/:id/edit

All this files render a view. You can edit this views on the [view files created](#views)

#### Views

#### Controller

#### Model


### .chainfile.js






We will install drivers to use PostgresSQL database. we will use knexjs and pg

```
$ npm install pg -s
$ npm install knex -s
```

Also we will use ejs instead off jade. So we need to run
```
$ npm install ejs -s
```

You can run the following commands to see the default express app
```
$ npm install
$ npm start
```

Visit http://localhost:3000 to see the defaut express web app

## Create Postgresql Database

In this tutorial we will not dig in how Postgres fully work. For more information on how to work around Postgres visit https://www.postgresql.org/.

In order to connect to Postgres, we need to create a database. If you have postgresql installed you can run
```
$ psql
```
This should open up postgresql console. Run the following command:

```
postgres=# CREATE DATABASE test_saw;
```
*NOTE:* Depending on your default user and psql version the syntax of the previous line may vary.

if its successful close psql, run:
```
postgres=# \q

```


## Connecting to the Database

In this tutorial we will not dig in how knex fully work. For more information on how to work around knex visit https://knex.org/.

First of all, we highly recommend to install knex globally:

```
$ npm install knex -g
```

Until now we should have the following Directory Structure:

    .
    ├── bin                  
    ├── node_modules       
    ├── public   
    ├── routes
    ├── views              
    ├── app.js
    ├── package-lock.json
    └── package.json

We will add the following:

    .
    ├── bin
    ├── database
        ├── migrations       
        └── seeds
            ├── development
            ├── production   
            └──  test
    ├── node_modules       
    ├── public   
    ├── routes
    ├── views              
    ├── app.js
    ├── knex.js        
    ├── package-lock.json
    └── package.json

* database/migrations/ directory will hold all the migrations (changes) to the database.
* database/seed/ directory will hold all the seed files. Every subdirectory will hold the seed corresponding to that environment.
* knex.js Will be the instance to connect to the database.

Go ahead and create those files

Before we continue we need to create a configuration file to let knex know how to interact with the database. We need to create a knexfile.js
```
$ touch knexfile.js
```
Add the following code to knexfile.js

```javascript
const path = require('path');

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://localhost:5432/test_saw',
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/test'),
    },
    acquireConnectionTimeout: 10000,
  },
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/test_saw',
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/development'),
    },
    acquireConnectionTimeout: 10000,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/test_saw',
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/production'),
    },
    acquireConnectionTimeout: 10000,
  },
  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost:5432/test_saw',
    migrations: {
      directory: path.join(__dirname, '/database/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '/database/seeds/production'),
    },
    acquireConnectionTimeout: 10000,
  },
};

```
_NOTE:_ If your Postgres user it is not postgres change it accordingly in the connection URL.

We will not get i detail of how this file works, but basically we are telling knex were we want to save the migrations, the seeds and what is the url to connect to the database. Note that the knexfile defines this variables for every environment by separate.


Now we need to add the following code to the knex.js file:

```javascript
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
module.exports = require('knex')(config);
```


Now knex is configured to connect to the database.


## Using Chinchay

Now its the simple part. But before we need to create one last file:
* .chainfile.js: file for all the configuration for chinchay.

Go ahead and create this file.


In the .chainfile.js add the following:
```javascript
const path = require('path');

module.exports = {
  models: {
    directory: path.join(__dirname, '/models'),
  },
  controllers: {
    directory: path.join(__dirname, '/controllers')
  },
  views: {
    directory: path.join(__dirname, '/views')
  },
  routes: {
    directory: path.join(__dirname, '/routes')
  },
  knex:  path.join(__dirname, 'knex.js')
};
```

Here we are defining which directories will hold the  the models, the controllers, the views and the routes.

Install chinchay:
```
$ npm install chinchay -g -s
```
This will allow you to run chinchay from outside.

Lets build a new relation called coffee and the files to work around with it:

```
$ chinchay new coffee
```

This will create a model, a controllers, views, routes and a knex migration in the directories defined in .chainfile.js.


The migrations will be saved in the directory database/migrations/. The name will vary but it will be appended by an coffee.js

In this file insert the following:
```javascript
exports.up = function (knex) {
  return knex.schema.createTable('coffee', (table) => {
    // Incremental id
    table.increments();
    table.string('name').notNullable();
    table.integer('price');
    // created_at and updated_at
    table.timestamps();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('coffee');
};
```

This is the piece of code that will create a relation witin our database with the variables name and price. Also will generate a id and a created_at and updated_at timestamps for every entry. To run this migration:
```
$ knex migrate:latest
```


Last, but not least, add the following lines to the app.js

```javascript
var coffee = require('./routes/coffee');
var coffeeAPI = require('./routes/coffeeAPI');
app.use('/', coffee);
app.use('/api', coffeeAPI);
```
Now run the app
```
$ npm start
```

and visit localhost:3000/coffee

Click new to create a coffee!

Enjoy!


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.