---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Restoring production data

This section describes the steps for restoring the production data.

The dir.root directory is defined in the alfresco-global.properties file. By default, this directory is named alf\_data and is located within the directory where Alfresco is installed.

1.  Restore the backup into the new repository.

    If Solr is being used, put the following directories from your backup to the dir.root directory on a new Alfresco One instance.

    -   contentstore directory
    -   solr/workspace directory \(optional\)
    -   solr/archive directory \(optional\)
    -   contentstore.deleted directory
    Some of the above mentioned directories are optional. This is because if the indexes are not copied over from the previous Alfresco installation, Solr will query Alfresco and rebuild its index in background after the startup. It may take more time to rebuild indexes on large repositories. Alfresco applications will be accessible during reindex process.

2.  Point the new Alfresco deployment to the old database via the `db.*` properties in alfresco-global.properties by providing the JDBC URL, database name, login credentials, and any other relevant configuration options. Remember to specify the relevant JDBC driver into your application server's classpath.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

