---
title: Database connectors
---

There are three database connectors that can be used to execute queries against:

* [MariaDB](#mariadb)
* [Oracle](#oracle)
* [PostgreSQL](#postgresql)

All database connectors are displayed on the process diagram with their respective logos.

> **Important**: All databases should be hosted outside of the Alfresco hosted environment and should be created and managed by customers.

## MariaDB

The [MariaDB](https://mariadb.org/){:target=_"_blank"} connector has four actions it can execute: **INSERT**, **UPDATE**, **DELETE** and **SELECT**.

### MariaDB insert

The MariaDB **INSERT** action is used to execute an insert statement against a MariaDB database.

The input parameters for an insert statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| query | String | *Required.* The query to execute against the database. |
| metadata | JSON | *Optional.* The list of parameters to pass to the query. |

The `metadata` parameter can be used to pass variables into the `query` parameter.

For example, if the contents of `metadata` are:

```json
{
"type" : "mint"
}
```

This can be used in the `query` parameter as:

```sql
INSERT INTO flavors (flavor)
VALUES ({type});
```

> **Note:** The `{ }` are declared without quotations.

The output parameters from an insert statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| result | Integer | *Optional.* The number of rows in the database that were affected by the statement. |

### MariaDB update

The MariaDB **UPDATE** action is used to execute an update statement against a MariaDB database.

The input parameters for an update statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| query | String | *Required.* The query to execute against the database. |
| metadata | JSON | *Optional.* The list of parameters to pass to the query. |

The `metadata` parameter can be used to pass variables into the `query` parameter.

For example, if the contents of `metadata` are:

```json
{
"type" : "mint"
}
```

This can be used in the `query` parameter as:

```sql
UPDATE flavors
SET flavor = {type}
WHERE flavor = "mint-choc";
```

> **Note:** The `{ }` are declared without quotations.

The output parameters from an update statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| result | Integer | *Optional.* The number of rows in the database that were affected by the statement. |

### MariaDB delete

The MariaDB **DELETE** action is used to execute a delete statement against a MariaDB database.

The input parameters for a delete statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| query | String | *Required.* The query to execute against the database. |
| metadata | JSON | *Optional.* The list of parameters to pass to the query. |

The `metadata` parameter can be used to pass variables into the `query` parameter.

For example, if the contents of `metadata` are:

```json
{
"type" : "mint"
}
```

This can be used in the `query` parameter as:

```sql
DELETE FROM flavors
WHERE flavor = {type};
```

> **Note:** The `{ }` are declared without quotations.

The output parameters from a delete statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| result | Integer | *Optional.* The number of rows in the database that were affected by the statement. |

### MariaDB select

The MariaDB **SELECT** action is used to execute a select query against a MariaDB database.

The input parameters for an insert statement are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| query | String | *Required.* The query to execute against the database. |
| metadata | JSON | *Optional.* The list of parameters to pass to the query. |

The `metadata` parameter can be used to pass variables into the `query` parameter.

For example, if the contents of `metadata` are:

```json
{
"type" : "mint"
}
```

This can be used in the `query` parameter as:

```sql
SELECT TOP 10 * FROM flavors
WHERE flavor = {type}
ORDER BY ingredients DESC;
```

> **Note:** The `{ }` are declared without quotations.

The output parameters from a select query are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| result | Integer | *Optional.* A JSON object containing the selected data. |

### MariaDB configuration parameters

The configuration parameters for the MariaDB connector are:

| Parameter | Description |
| --------- | ----------- |
| DB_USERNAME | *Required.* The database user to execute the statement as. |
| DB_PASSWORD | *Required.* The password for the database user executing the statement. |
| MARIADB_HOST | *Optional.* The host address of the database. |
| MARIADB_PORT | *Optional.* The port of the hosted database. |
| DB_NAME | *Optional.* The name of the database to execute the statement against. |
| DB_DATASOURCE | *Required.* The database datasource, the default of this is a concatenation of `MARIADB_HOST`, `MARIADB_PORT` and `DB_NAME`: `jdbc:mysql://${MARIADB_HOST}:${MARIADB_PORT}/${DB_NAME}`. |
| DB_DRIVER_CLASS_NAME | *Optional.* The database driver to use. The default value is `org.mariadb.jdbc.Driver`. |

### MariaDB errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the MariaDB connector are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| DATA_ACCESS_ERROR | Unable to access data. |
| DATA_INTEGRITY_VIOLATION_ERROR | Data integrity violation error occurs when performing database operation. |
| CONNECTION_ERROR | Cannot connect to a database instance. |
| SQL_GRAMMAR_ERROR | Invalid syntax error. |
| DUPLICATE_KEY_ERROR | Duplicate key error occurs when performing database operation. |
| OPTIMISTIC_LOCK_ERROR | Optimistic error occurs when performing database operation. |
| DEAD_LOCK_ERROR | Deadlock error occurs when performing database operation. |
| PERMISSION_DENIED_ERROR | Lack of permission to the resource and method requested. |
| UNKNOWN_ERROR | Unexpected runtime error. |

## Oracle

## PostgreSQL
