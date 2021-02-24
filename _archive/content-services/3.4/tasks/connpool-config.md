---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: extended services connection pool
---

# Configuring the connection pool

This task describes how to override the connection pool.

1.  Open the <extension\>\\custom-connection-pool-context.xml.sample file.

    You can also set the basic pool information in the alfresco-global.properties file.

2.  Set the connection pool properties. For example:

    ```
    db.pool.initial=10 
    db.pool.max=100
    ```

3.  Remove the `.sample` extension from this file.

4.  Modify the properties where appropriate, paying particular attention to the `validationQuery` property. This property is an SQL query that validates connections from this pool before returning them to the caller. This query must returns at least one row.

    For explanations of each property shown in the file, refer to: [Database Configuration Properties](../concepts/db-config-properties.md).


-   **[Database configuration properties](../concepts/db-config-properties.md)**  
This topic describes properties that you can use to configure databases with Alfresco.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

