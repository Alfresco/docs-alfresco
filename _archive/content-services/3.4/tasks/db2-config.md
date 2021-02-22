---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: DB2 database
---

# Configuring a DB2 database

This section describes how to configure a DB2 database for use with Alfresco.

These steps assume that you are using DB2 v9.7 Fix Pack 3a or later.

1.  Create a database named alfresco.

    Create the database with a larger page size of 32K. Ensure that the database is created with the UTF-8 character set.

    If you do not create the database with these settings, you will see error SQL0286N \(`sqlCode -286, sqlstate 42727`\) because the schema is created for tables that do not fit the page size.

2.  Ensure that the `cur_commit` database configuration parameter is set to `ON`.

3.  For new databases, this parameter is set to ON by default. If you have upgraded from a previous DB2 release, you must set this parameter manually.

4.  Set up the `alfresco` user and associated schema.

    DB2 only integrates with the operating system security. You can not add a database user with a password as you can say in oracle.

5.  Open the alfresco-global.properties.sample file.

6.  Add the following properties.

    ```
    db.name=alfresco
    db.username=alfresco
    db.password=alfresco
    db.host=localhost
    db.port=50000
    db.driver=com.ibm.db2.jcc.DB2Driver
    db.url=jdbc:db2://{db.host}:${db.port}/${db.name}
    ```

7.  Save the file without the .sample extension.


**Parent topic:**[Configuring databases](../concepts/intro-db-setup.md)

