---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Upgrading from Alfresco Search Services 1.0 or 1.1 to Alfresco Search Services 1.2

Use this information to upgrade from Alfresco Search Services 1.0 or 1.1 to Alfresco Search Services 1.2 with the Solr 6 search index server.

1.  Stop Alfresco Search Services 1.0 or 1.1.

    ```
    ./solr/bin/solr stop
    ```

2.  Backup or move the existing alfresco-search-services folder to a preferred location. For example, alfresco-search-services-1.0.

3.  Download and unzip the Solr 6 distribution, alfresco-search-services-1.2.x.zip to a preferred location.

    By default, the contents of alfresco-search-services-1.2.x.zip are decompressed in a folder at ./alfresco-search-services. So, the folder extracts into the same location as the zip.

4.  Copy archive and alfresco from the backup alfresco-search-services-1.0/solrhome/ to alfresco-search-services/solrhome/.

5.  Copy the contentstore from the backup to alfresco-search-services.

6.  \(Optional\) If you have changed the alfresco-search-services/solr.in.sh or alfresco-search-services/solr.in.cmd file, you must restore it from your backup.

7.  Start Alfresco Search Services 1.2.

    ```
    ./solr/bin/solr start
    ```


**Parent topic:**[Configuring Alfresco Search Services with Solr 6](../concepts/solr6-home.md)

