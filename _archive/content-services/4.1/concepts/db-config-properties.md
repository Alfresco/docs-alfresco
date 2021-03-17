---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [configuration files, solr]
---

# Advanced database configuration properties

This topic describes the advanced properties you can use to configure databases with Alfresco.

Alfresco Enterprise supports Oracle, Microsoft SQL Server, DB2, as well as MySQL and PostgreSQL.

As an administrator, you need to edit some of these properties to customize your database configuration. However, many properties do not need to be edited. So, the advanced database configuration properties can be categorized into two groups on the basis of their relevance:

-   properties that you **SHOULD** edit
-   properties that you **COULD** edit

The following table lists and describes the properties that you **SHOULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.txn.isolation`|The JDBC code number for the transaction isolation level, corresponding to those in the `java.sql.Connection` class. The value of -1 indicates that the database's default transaction isolation level should be used. For the Microsoft SQL Server JDBC driver, the special value of 4096 should be used to enable snapshot isolation.|`-1`|
|`db.pool.initial`|The number of connections opened when the pool is initialized.|`10`|
|`db.pool.validate.query`|The SQL query that will be used to ensure that your connections are still alive. This is useful if your database closes long-running connections after periods of inactivity.|For Oracle database, use `select 1 from dual`For MySQL database, use `select 1`

For SQL Server database, use `select 1`

For PostgreSQL database, use `select 1`

|

The following table lists and describes the properties that you **COULD** edit:

|Property name|Description|Default value|
|-------------|-----------|-------------|
|`db.pool.statements.enable`|A Boolean property. When set to `true` it indicates that all pre-compiled statements used on a connection will be kept open and cached for reuse.|`true`|
|`db.pool.statements.max`|The maximum number of precompiled statements to cache for each connection. The Alfresco default is 40. Note that Oracle does not allow more that 50 by default.|`40`|
|
|`db.pool.idle`|The maximum number of connections that are not in use kept open.|`-1`|
|`db.pool.min`|The minimum number of connections in the pool.|`0`|
|`db.pool.wait.max`|Time \(in milliseconds\) to wait for a connection to be returned before generating an exception when connections are unavailable. A value of 0 or -1 indicates that the exception should not be generated.|`-1`|
|`db.pool.validate.borrow`|A Boolean property. When set to `true` it indicates that connections will be validated before being borrowed from the pool.|`true`|
|`db.pool.validate.return`|A Boolean property. When set to `true` it indicates that connections will be validated before being returned to the pool.|`false`|
|`db.pool.evict.interval`|Indicates the interval \(in milliseconds\) between eviction runs. If the value of this property is zero or less, idle objects will not be evicted in the background.|`-1`|
|`db.pool.evict.idle.min`|The minimum number of milliseconds that a connection may remain idle before it is eligible for eviction.|`1800000`|
|`db.pool.evict.validate`|A Boolean property. When set to `true` it indicates that the idle connections will be validated during eviction runs.|`false`|
|`db.pool.abandoned.detect`|A Boolean property. When set to `true` it indicates that a connection is considered abandoned and eligible for removal if it has been idle longer than the `db.pool.abandoned.time`.|`false`|
|`db.pool.abandoned.time`|The time in seconds before an abandoned connection can be removed.|`300`|

**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

