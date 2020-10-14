---
title: Backing up Alfresco Search and Insight Engine
---

There are a number of ways to back up Alfresco Search and Insight Engine. You can set the Solr indexes backup properties either by using the Admin Console in Share, by editing the <TOMCAT_HOME>/shared/classes/alfresco-global.properties file, or by using a JMX client, such as JConsole.

## Set up Solr backup properties using Share Admin Console

You can only see the Admin Console if you're an administrator user.

1. Launch the Admin Console. For information, see [Launching the Admin Console](LINK LINK).
2. In the **Repository Services** section, click **Search Service**.

    You see the Search Service page.

3. Scroll down to the **Backup Settings** section. ![df]({% link insight-engine/images/solr6-backupsie.png %})

    Here, you can specify the backup location and edit backup properties for each core of the Solr index: **Main Store** and **Archive Store**.

    * **Backup Location**: Specifies the full-path location for the backup to be stored. This location must be on the machine on which Alfresco Search and Insight Engine is installed or it must be a location which is accessible from the Solr host. For example, /opt/alfresco-insight-engine/backups/alfresco.
    * **Backup Cron Expression**: Specifies a Quartz cron expression that defines when backups occur. Solr creates a timestamped sub-directory for each index back up you make.
    * **Backups To Keep**: Specifies the maximum number of index backups that Solr should store.
4. Click **Save**.

## Specifying Solr backup directory by using alfresco-global.properties file

This task shows how to specify the Solr backup directory by using the <TOMCAT_HOME>/shared/classes/alfresco-global.properties file.

To set the Solr backup directory using the alfresco-global.properties file, set the value of the following properties to the full path where the backups should be kept:

```bash
solr.backup.archive.remoteBackupLocation=
solr.backup.alfresco.remoteBackupLocation=
```

The values set on a subsystem will mean that the property values from configuration files may be ignored. Use the Share Admin Console or JMX client to set the backup location.

## Back up Solr indexes using JMX client

If you have installed the Oracle Java SE Development Kit (JDK), you can use the JMX client, JConsole, to backup Solr indexes, edit Solr backup properties and setup the backup directory.

* You can set the backup of Solr indexes using the JMX client, such as JConsole on the **JMX MBeans > Alfresco > Schedule > DEFAULT > MonitoredCronTrigger > search.alfrescoCoreBackupTrigger > Operations > executeNow** tab. The default view is the Solr core summary. Alternatively, navigate to **MBeans > Alfresco > SolrIndexes > coreName > Operations > backUpIndex** tab. Type the directory name in the **remoteLocation** text box and click **backUpIndex**.
* Solr backup properties can be edited using the JMX client on the **JMX MBeans > Alfresco > Configuration > Search > managed > solr6 > Attributes** tab. The default view is the Solr core summary.

    ![]({% link insight-engine/images/solr6jmx.png %})

* To use JMX client to setup Solr backup directory, navigate to **MBeans tab > Alfresco > Configuration > Search > managed > solr > Attributes** and change the values for solr.backup.alfresco.remoteBackupLocation and solr.backup.archive.remoteBackupLocation properties.
* You may also trigger a backup with an HTTP command which instructs the /replication handler to backup Solr, for example:

        ```http
        http://localhost:8080/solr/alfresco/replication?command=backup&location={{existingDirectory}}&numberToKeep=4&wt=xml
        ```

        where:

        location specifies the path where the backup will be created. If the path is not absolute then the backup path will be relative to Solr's instance directory.

        numberToKeep specifies the number of backups to keep.
