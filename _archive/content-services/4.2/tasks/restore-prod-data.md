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

    If Solr is being used, put the following directories from your backup to the dir.root directory on a new Alfresco 4.2 instance.

    -   contentstore directory
    -   solr/workspace directory \(optional\)
    -   solr/archive directory \(optional\)
    -   contentstore.deleted directory
    Some of the above mentioned directories are optional. This is because if the indexes are not copied over from the previous Alfresco installation, Solr will query Alfresco and rebuild its index in background after the startup. It may take more time to rebuild indexes on large repositories. Alfresco applications will be accessible during reindex process.

    If Lucene is being used, put the following directories from your backup to the dir.root directory on a new Alfresco 4.2 instance:

    -   contentstore directory
    -   lucene-indexes directory \(optional\)
    -   contentstore.deleted directory
    The lucene-indexes directory is optional. This is because if the indexes are not copied over from the previous installation, Alfresco will rebuild the indexes during the startup. The index recovery process may last longer on large repositories. Alfresco applications will not be available while the indexes are being rebuilt.

    The Lucene index check/rebuild is controlled by the `index.recovery.mode` property. This property accepts the following values:

    |Property values|What is it?|
    |---------------|-----------|
    |**VALIDATE**|This value checks the indexes for consistency. If the indexes are not in sync with the current contentstore directory, the bootstrap process will fail. This enables Lucene-based content indexing. It is the default value.|
    |**AUTO**|This value is same as `VALIDATE` but in case of inconsistency, the indexes will be rebuilt during the bootstrap process.|
    |**FULL**|This value forces a full index rebuild.|

    If you want to omit a check on the health of the indexes, set the `index.recovery.mode` property to `NONE`.

2.  Point the new Alfresco deployment to the old database via the `db.*` properties in alfresco-global.properties by providing the JDBC URL, database name, login credentials, and any other relevant configuration options. Remember to specify the relevant JDBC driver into your application server's classpath.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

