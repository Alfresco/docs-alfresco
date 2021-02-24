---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
keyword: [MySQL, configuration wizard, settings]
---

# Optimizing MySQL to work with Alfresco

When installing MySQL, there are some settings that are required for it to work with Alfresco. This section describes the configuration settings that you should use in your MySQL instance.

The following table represents the specific settings in the MySQL configuration wizard that enable MySQL to work effectively with Alfresco.

|Configuration wizard dialog|Setting for Alfresco|
|---------------------------|--------------------|
|Server Type|Choose **Dedicated MySQL Server Machine**. The option selected determines the memory allocation.|
|Database usage|Choose **Transactional Database Only**. This creates a database that uses InnoDB as its storage engine.|
|InnoDB Tablespace|Accept the default drive and path.|
|Concurrent Connections|Select **Decision Support \(DSS\) OLAP**. This sets the approximate number of concurrent connections to the server.|
|Networking and Strict Mode Options|Accept the default networking options \(**Enable TCP/IP Networking**, **Port Number 3306**\), and the default server SQL mode \(Enable Strict Mode\).|
|Character Set|Select **Best Support for Multilingualism**. This sets the default character set to be UTF-8 \(set in `character-set-server`\).|
|Security Options|Select **Modify Security Settings**. Type the root password admin, then retype the password.|

Use the following variable setting to enable MySQL to prevent some update operations from locking database access. Add this setting to your MySQL configuration file \(/etc/my.cnf\) in the `[mysqld]` section:

```
innodb_locks_unsafe_for_binlog = 1
```

Ensure that you restart the MySQL server after adding this setting.

The effect of enabling this variable is similar to setting the transaction isolation level to `READ_COMMITTED`.

By default, table aliases are case sensitive on Unix but not on Windows or Mac OS X. Use the following variable setting to enable MySQL server to handle case sensitivity of database and table names:

```
 lower_case_table_names=1  
```

Using this variable setting allows MySQL to convert all table names to lowercase on storage and lookup. This behavior also applies to database names and table aliases. This setting also prevents data transfer problems between platforms and between file systems with varying case sensitivity.

Refer to the [http://dev.mysql.com/](http://dev.mysql.com/) website for more information on these variables.

**Parent topic:**[Configuring the MySQL database](../tasks/mysql-config.md)

