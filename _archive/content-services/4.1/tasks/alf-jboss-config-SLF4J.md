---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: JBoss
---

# Configuring JBoss logging for Alfresco using Simple Logging Facade for Java \(SLF4J\)

This section describes how to configure JBoss logging for Alfresco using SLF4J.

JBOSS 5.1 uses Simple Logging Facade for Java \(SLF4J\) as the default logging library. Alfresco uses both log4j and slf4 and by default all the Alfresco logs go to alfresco.log. Configure JBoss logging for Alfresco using SLF4J if you want logs for all your applications to go to server.log and if you also use an external tool to analyze the generated logs. Use this configuration to ensure that the logs are formatted properly.

1.  Download the appropriate version of the slf4j-x.x.x.zip file or slf4j-x.x.x.tar.gz file from [SLF4J](http://slf4j.org/download.html).

2.  Remove the following JAR files from <JBOSS\_HOME\>/server/default/deploy/alfresco.war/WEB-INF/lib/.

    -   commons-logging.jar
    -   log4j.jar
    -   log4j-over-slf4j.jar \(if it is present\)
3.  Ensure that the following JAR files exist. Any missing files can be found in the archive you downloaded in step 1.

    -   slf4j-api.jar
    -   slf4j-log4j12.jar
    -   jcl-over-slf4j.jar
4.  Repeat steps 2 and 3 for the share.war file.

5.  Configure your log level in the following file <JBOSS\_HOME\>/server/default/conf/jboss-log4j.xml.

    For more information, refer to [Configuring JBoss for Alfresco](alf-jboss-config.md).

6.  Start the Alfresco server.

    **Note:** You may see the following errors during the startup:

    ```
    2011-10-12 10:47:21,505 ERROR [STDERR] (main) SLF4J: Class path contains multiple SLF4J bindings.
    2011-10-12 10:47:21,505 ERROR [STDERR] (main) SLF4J: Found binding in [vfszip:/usr/local/jeap51/jboss-
    as/common/lib/slf4j-jboss-logging.jar/org/slf4j/impl/StaticLoggerBinder.class]
    2011-10-12 10:47:21,505 ERROR [STDERR] (main) SLF4J: Found binding in [vfszip:/usr/local/jeap51/jboss
    -as/server/W51J51I1/deploy/alfresco.war/WEB-INF/lib/slf4j-log4j12-1.5.11.jar/org/slf4j/impl/StaticLoggerBinder.class] 
    2011-10-12 10:47:21,505 ERROR [STDERR] (main) SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
    ```

    To avoid these errors, remove the <JBOSS\_HOME\>/common/lib/slf4j-jboss-logging.jar file.


**Parent topic:**[Installing Alfresco on JBoss](../tasks/alf-jboss-install.md)

