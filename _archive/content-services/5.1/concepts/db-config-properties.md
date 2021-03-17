---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Advanced database configuration properties

As an administrator, you need to edit some advanced properties to customize your database configuration. Many properties, however, do not need to be edited.

Alfresco One 5.1.5 supports Oracle, Microsoft SQL Server, DB2, as well as MySQL and PostgreSQL.

The advanced database configuration properties are categorized into two groups based on their relevance:

-   properties that you **SHOULD** edit
-   properties that you **COULD** edit

The following table describes the properties that you **SHOULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.txn.isolation`|The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The value of -1 indicates that the database's default transaction isolation level should be used. For the Microsoft SQL Server JDBC driver, the special value of 4096 should be used to enable snapshot isolation.|`-1`|
|`db.pool.initial`|The number of connections opened when the pool is initialized.|`10`|
|`db.pool.validate.query`|The SQL query that is used to ensure that your connections are still alive. This is useful if your database closes long-running connections after periods of inactivity.|For Oracle database, use `SELECT 1 from dual`For MySQL database, use `SELECT 1`

For SQL Server database, use `SELECT 1`

For PostgreSQL database, use `SELECT 1`

|

The following table describes the properties that you **COULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.pool.statements.enable`|A Boolean property. When set to `true` it indicates that all pre-compiled statements used on a connection will be kept open and cached for reuse.|`true`|
|`db.pool.statements.max`|The maximum number of pre-compiled statements to cache for each connection. The Alfresco default is 40. Note that Oracle does not allow more that 50 by default.|`40`|
|
|`db.pool.idle`|The maximum number of connections that are not in use kept open.|`10`|
|`db.pool.max`|The maximum number of connections in the pool. See the Note below for more information on this property.|`275`|
|`db.pool.min`|The minimum number of connections in the pool.|`10`|
|`db.pool.wait.max`|Time \(in milliseconds\) to wait for a connection to be returned before generating an exception when connections are unavailable. A value of 0 or -1 indicates that the exception should not be generated.|`-1`|
|`db.pool.validate.borrow`|A Boolean property. When set to `true` it indicates that connections will be validated before being borrowed from the pool.|`true`|
|`db.pool.validate.return`|A Boolean property. When set to `true` it indicates that connections will be validated before being returned to the pool.|`false`|
|`db.pool.evict.interval`|Indicates the interval \(in milliseconds\) between eviction runs. If the value of this property is zero or less, idle objects will not be evicted in the background.|`600000`|
|`db.pool.evict.idle.min`|The minimum number of milliseconds that a connection may remain idle before it is eligible for eviction.|`1800000`|
|`db.pool.evict.validate`|A Boolean property. When set to `true` it indicates that the idle connections will be validated during eviction runs.|`false`|
|`db.pool.abandoned.detect`|A Boolean property. When set to `true` it indicates that a connection is considered abandoned and eligible for removal if it has been idle longer than the `db.pool.abandoned.time`.|`false`|
|`db.pool.abandoned.time`|The time in seconds before an abandoned connection can be removed.|`300`|

The `db.pool.max` property is the most important. By default, each Alfresco instance is configured to use up to a maximum of 275. All operations in Alfresco require a database connection, which places a hard upper limit on the amount of concurrent requests a single Alfresco instance can service \(that is, 40\), from all protocols, by default.

Most Java application servers have higher default settings for concurrent access \(Tomcat allows up to 200 concurrent HTTP requests by default\). Coupled with other threads in Alfresco \(non-HTTP protocol threads, background jobs, and so on\) this can quickly result in excessive contention for database connections within Alfresco, manifesting as poor performance for users.

If you are using Alfresco in anything other than a single-user evaluation mode, increase the maximum size of the database connection pool to at least the following setting.

```
[number of application server worker threads] + 75. 
```

For a Tomcat default HTTP worker thread configuration, and with all other Alfresco thread pools left at the defaults, this means this property should be set to at least 275.

To increase the database connection pool, add the `db.pool.max` property to the alfresco.global.properties file and set it to the recommended value of 275, for example:

```
db.pool.max=275
```

For clarity, add this property immediately after the other database properties.

**Important:** After increasing the size of the Alfresco database connection pools, you must also increase the number of concurrent connections your database can handle to at least the size of the cumulative Alfresco connection pools. In a cluster, each node has its own independent database connection pool. You must configure sufficient database connections for all of the Alfresco cluster nodes to be able to connect simultaneously. Alfresco recommends that you configure at least 10 more connections to the database than are configured cumulatively across all of the Alfresco connection pools to ensure that you can still connect to the database even if Alfresco saturates its own connection pools. Remember to factor in cluster nodes \(which can each use up to 275 database connections\) as well as connections required by other applications that are using the same database server as Alfresco.

The precise mechanism for reconfiguring your database's connection limit depends on the relational database product you are using; contact your DBA for configuration details.

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

