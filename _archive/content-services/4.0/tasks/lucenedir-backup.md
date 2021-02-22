---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Team
option: [Admin Console, open]
---

# Specifying the Lucene backup directory

This section describes how to specify the Lucene backup directory.

You can set the Lucene backup directory using the following two ways: by editing the alfresco-global.properties file or by using a JMX client, such as JConsole.

**Parent topic:**[Backing up and restoring Lucene indexes](../concepts/backup-lucene-intro.md)

## Specifying Lucene backup directory via alfresco-global.properties file

This task shows how to specify the Lucene backup directory via alfresco-global.properties file.

-   To set the Lucene backup directory and schedule, using the alfresco-global.properties file, set the  value of the following properties to the relevant cron expression and the full path where the backups should be kept:

    ```
    index.backup.cronExpression=0 0 3 * * ?
    dir.indexes.backup=${dir.root}/backup-lucene-indexes
    ```


## Specifying Lucene backup directory via JMX client

You can use the JMX client, JConsole to specify the backup directory for Lucene indexes.

-   To use JMX client to setup Lucene backup directory, navigate to **MBeans tab \> Alfresco \> Configuration \> Search \> managed \> lucene \> Attributes** and change the values for index.backup.cronExpression and dir.indexes.backup properties.


