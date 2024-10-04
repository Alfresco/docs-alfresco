---
title: Overriding Logging Defaults
---

You can override the default logging configuration in OpenContent by deploying the `log4j2-OpenAnnotate.xml` file to the configured classpath.

To override the default logging configuration:

1.	Stop the Alfresco server.

2.	Locate the `/alfresco` classpath, for example, the `tomcat/shared/classes` directory.

3.	Place the `log4j2-OpenAnnotate.xml` file on the configured classpath.

4.	Start the Alfresco server.

>**Note:** For more information on overriding logging in OpenContent, see [Logging in the Content Accelerator]({% link content-accelerator\3.7\install\logging.md %}).