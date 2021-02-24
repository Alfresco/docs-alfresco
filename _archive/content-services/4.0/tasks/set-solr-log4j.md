---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting Solr log4j values

This topic describes the method of setting the Solr log4j values.

To set debug logging levels for Alfresco-Solr components, follow the steps below:

1.  Copy tomcat/webapps/solr/WEB-INF/classes/log4j.properties to <solrRootDir\>/log4j.properties.

2.  Edit it to add your required logging setting. For example:

    ```
    log4j.logger.org.alfresco.solr.tracker.CoreTracker=DEBUG
    ```

3.  Changes to the log4j.properties file will be re-read by Solr when it starts up. If you need to make changes to the logging level while the system is running, going to the following URL \(either in a browser or for example, using curl\) will cause Solr to re-load the properties file.

    ```
    https://<solrHostName>:<solrPort>/solr/admin/cores?action=LOG4J&resource=log4j.properties
    ```


**Parent topic:**[Configuring Search](../concepts/solr-home.md)

