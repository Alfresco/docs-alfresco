# Database configuration

Set the following properties to change the database.

**Using JDBC Connection Parameters**

|Property

|Description

|
|----------|-------------|
|`datasource.driver`|The JDBC driver used to connect to the database. Note that the driver must be on the classpath of the web application.

|
|`datasource.url`|The JDBC URL used to connect to the database.

|
|`datasource.username`|The user of the database system that is used to connect to the database.

|
|`datasource.password`|The password of the above user.

|

Example:

```
datasource.driver=com.mysql.jdbc.Driver
datasource.url=jdbc:mysql://127.0.0.1:3306/activiti?characterEncoding=UTF-8

datasource.username=alfresco
datasource.password=alfresco
```

**Connection Pooling**

When using JDBC Connection Parameters, you can configure the following connection pool settings to suit the anticipated load.

|Property

|Description

|Default

|
|`datasource.min-pool-size`|The minimum number of connections in the connection pool.

|5

|
|`datasource.max-pool-size`|The maximum number of connections in the connection pool.

|100

|
|`datasource.acquire-increment`|The number of additional connections the system will try to acquire each time the connection pool is exhausted.

|5

|
|`datasource.preferred-test-query`|The query used to verify that the connection is still valid

|No default value \(not a required property\). The value depends on the database: *select 1* for H2, MySQL, PostgreSQL and Microsoft SQL Server, *SELECT 1 FROM DUAL* for Oracle and *SELECT current date FROM sysibm.sysdummy1* for DB2.

|
|`datasource.test-connection-on-checkin`|Boolean value. If true, an operation will be performed asynchronously on every connection checkin to verify that the connection is valid. For best performance, a proper *datasource.preferred-test-query* should be set.

|true

|
|`datasource.test-connection-on-checkout`|Boolean value. If true, an operation will be performed asynchronously on every connection checkout to verify that the connection is valid. Testing Connections on checkout is the simplest and most reliable form of Connection testing. For best performance, a proper *datasource.preferred-test-query* should be set.

|true

|
|`datasource.max-idle-time`|The number of seconds a connection can be pooled before being discarded.

|1800

|
|`datasource.max-idle-time-excess-connections`|Number of seconds that connections in excess of `minPoolSize` should be permitted to remain idle in the pool before being discarded. The intention is that connections remain in the pool during a load spike.

|1800

|

The connection pooling framework used is [C3P0](http://www.mchange.com/projects/c3p0/). It has extensive documentation on the settings described above.

**Using a JNDI Data source**

If a JNDI data source is configured in the web container or application server, the JNDI name should be set with the following properties:

|Property

|Description

|Default

|
|`datasource.jndi.name`

|The JNDI name of the datasource. This varies depending on the application server or web container.

|jdbc/activitiDS

|
|`datasource.jndi.resourceRef`

|Set whether the look up occurs in a J2EE container, that is, if the prefix `java:comp/env/` needs to be added if the JNDI name doesn’t already contain it.

|true

|

Example \(on JBoss EAP 6.3\):

```
datasource.jndi.name=java:jboss/datasources/activitiDS
```

**Hibernate settings**

The Alfresco Process Services specific logic is written using JPA 2.0 with Hibernate as implementation. Note that the Process Engine itself uses [MyBatis](http://mybatis.github.io/mybatis-3/) for full control of each SQL query.

Set the following properties.

|Property

|Description

|Mandatory

|
|`hibernate.dialect`|The dialect implementation that Hibernate uses. This is database specific.

|Yes. Very important to set the correct dialect, otherwise the app might not boot up.

|

The following values are used to test Alfresco Process Services.

|Database

|Dialect

|
|H2

|`org.hibernate.dialect.H2Dialect`

|
|MySQL

|`org.hibernate.dialect.MySQLDialect`

|
|Oracle

|`org.hibernate.dialect.Oracle10gDialect`

|
|SQL Server

|`org.hibernate.dialect.SQLServerDialect`

|
|DB2

|`org.hibernate.dialect.DB2Dialect`

|
|PostgreSQL

|`org.hibernate.dialect.PostgreSQLDialect`

|

Optionally, the `hibernate.show_sql` property can be set to *true* if the SQL being executed needs to be printed to the log.

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

