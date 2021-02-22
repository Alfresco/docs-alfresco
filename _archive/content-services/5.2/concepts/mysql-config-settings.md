---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Installation, Alfresco Server]
---

# Optimizing MySQL to work with Alfresco Content Services

There are some settings that are required for MySQL to work with Alfresco Content Services.

The following table represents the specific settings in the MySQL configuration wizard that enable MySQL to work effectively.

|Configuration wizard dialog|Setting for Alfresco Content Services|
|---------------------------|-------------------------------------|
|Server Type|Choose **Dedicated MySQL Server Machine**. The option selected determines the memory allocation.|
|Database usage|Choose **Transactional Database Only**. This creates a database that uses InnoDB as its storage engine.|
|InnoDB Tablespace|Accept the default drive and path.|
|Concurrent Connections|Select **Decision Support \(DSS\) OLAP**. This sets the approximate number of concurrent connections to the server.|
|Networking and Strict Mode Options|Accept the default networking options \(**Enable TCP/IP Networking**, **Port Number 3306**\), and the default server SQL mode \(Enable Strict Mode\).|
|Character Set|Select **Best Support for Multilingualism**. This sets the default character set to be UTF-8 \(set in `character-set-server`\).|
|Security Options|Select **Modify Security Settings**. Type the root password admin, then retype the password.|

By default, table aliases are case sensitive on Unix but not on Windows or Mac OS X. Use the following variable setting to enable MySQL server to handle case sensitivity of database and table names:

```
 lower_case_table_names=1  
```

Using this variable setting allows MySQL to convert all table names to lowercase on storage and lookup. This behavior also applies to database names and table aliases. This setting also prevents data transfer problems between platforms and between file systems with varying case sensitivity.

Refer to the [http://dev.mysql.com/](http://dev.mysql.com/) website for more information on this variable.

**Parent topic:**[Configuring the MySQL database](../tasks/mysql-config.md)

