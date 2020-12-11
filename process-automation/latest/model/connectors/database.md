---
title: Database connectors
---

There are three database connectors that can be used to execute queries against:

* [MariaDB](#mariadb)
* [Oracle](#oracle)
* [PostgreSQL](#postgresql)

All database connectors are displayed on the process diagram with their respective logos.

> **Important**: All databases should be hosted outside of the Alfresco hosted environment and should be created and managed by customers.

> **Note**: All queries are sent as prepared statements using parameters. SQL injection is not possible.

## MariaDB

The [MariaDB](https://mariadb.org/){:target="_blank"} connector has four actions it can execute: **INSERT**, **UPDATE**, **DELETE** and **SELECT**.

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
| DB_USERNAME | *Required.* The database user to execute the statement as, for example `connector-user`. |
| DB_PASSWORD | *Required.* The password for the database user executing the statement. |
| MARIADB_HOST | *Optional.* The host address of the database, for example `mariadb.example.com`. |
| MARIADB_PORT | *Optional.* The port of the hosted database, for example `421`. |
| DB_NAME | *Optional.* The name of the database to execute the statement against, for example `inventory`. |
| DB_DATASOURCE | *Required.* The database datasource, the default value is a concatenation of `MARIADB_HOST`, `MARIADB_PORT` and `DB_NAME`: `jdbc:mysql://${MARIADB_HOST}:${MARIADB_PORT}/${DB_NAME}`. |
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

The [Oracle](https://www.oracle.com/index.html){:target="_blank"} connector has four actions it can execute: **INSERT**, **UPDATE**, **DELETE** and **SELECT**.

### Oracle insert

The Oracle **INSERT** action is used to execute an insert statement against a Oracle database.

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

### Oracle update

The Oracle **UPDATE** action is used to execute an update statement against a Oracle database.

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

### Oracle delete

The Oracle **DELETE** action is used to execute a delete statement against a Oracle database.

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

### Oracle select

The Oracle **SELECT** action is used to execute a select query against a Oracle database.

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

### Oracle configuration parameters

The configuration parameters for the Oracle connector are:

| Parameter | Description |
| --------- | ----------- |
| DB_USERNAME | *Required.* The database user to execute the statement as, for example `connector-user`. |
| DB_PASSWORD | *Required.* The password for the database user executing the statement. |
| ORACLE_HOST | *Optional.* The host address of the database, for example `oracle.example.com`. |
| ORACLE_PORT | *Optional.* The port of the hosted database, for example `421`. |
| DB_NAME | *Optional.* The name of the database to execute the statement against, for example `inventory`. |
| DB_DATASOURCE | *Required.* The database datasource, the default value is a concatenation of `ORACLE_HOST`, `ORACLE_PORT` and `DB_NAME`: `jdbc:oracle:thin:@//${ORACLE_HOST}:${ORACLE_PORT}/${DB_NAME}`. |
| DB_DRIVER_CLASS_NAME | *Optional.* The database driver to use. The default value is `oracle.jdbc.OracleDriver`. |

### Oracle errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the Oracle connector are:

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

## PostgreSQL

The [PostgreSQL](https://www.postgresql.org/){:target="_blank"} connector has four actions it can execute: **INSERT**, **UPDATE**, **DELETE** and **SELECT**.

### PostgreSQL insert

The PostgreSQL **INSERT** action is used to execute an insert statement against a PostgreSQL database.

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

### PostgreSQL update

The PostgreSQL **UPDATE** action is used to execute an update statement against a PostgreSQL database.

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

### PostgreSQL delete

The PostgreSQL **DELETE** action is used to execute a delete statement against a PostgreSQL database.

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

### PostgreSQL select

The PostgreSQL **SELECT** action is used to execute a select query against a PostgreSQL database.

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

### PostgreSQL configuration parameters

The configuration parameters for the PostgreSQL connector are:

| Parameter | Description |
| --------- | ----------- |
| DB_USERNAME | *Required.* The database user to execute the statement as, for example `connector-user`. |
| DB_PASSWORD | *Required.* The password for the database user executing the statement. |
| POSTGRES_HOST | *Optional.* The host address of the database, for example `postgres.example.com`. |
| POSTGRES_PORT | *Optional.* The port of the hosted database, for example `421`. |
| DB_NAME | *Optional.* The name of the database to execute the statement against, for example `inventory`. |
| DB_DATASOURCE | *Required.* The database datasource, the default value is a concatenation of `POSTGRES_HOST`, `POSTGRES_PORT` and `DB_NAME`: `jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${DB_NAME}`. |
| DB_DRIVER_CLASS_NAME | *Optional.* The database driver to use. The default value is `org.postgresql.Driver`. |

### PostgreSQL errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the PostgreSQL connector are:

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
