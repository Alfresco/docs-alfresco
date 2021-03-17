---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting Solr 4 log4j values

You can set different debug logging levels for Alfresco-Solr 4 components using the Solr 4 log4j properties.

1.  Locate the <solrRootDir\>/log4j-solr.properties file.

2.  Edit it to add your required logging setting. For example:

    ```
    log4j.logger.org.alfresco.solr.tracker.MetadataTracker=DEBUG
    ```

3.  Changes to the log4j-solr.properties file will be re-read by Solr 4 when it starts up. If you need to make changes to the logging level while the system is running, going to the following URL \(either in a browser or for example, using curl\) will cause Solr 4 to re-load the properties file.

    ```
    https://<solrHostName>:<solrPort>/solr4/admin/cores?action=LOG4J&resource=log4j-solr.properties
    ```


**Parent topic:**[Configuring search](../concepts/solr-home.md)

