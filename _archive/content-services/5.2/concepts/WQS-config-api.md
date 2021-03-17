---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the API

You configure the API in the wcmqs-api.properties file. The file is located in the clientapi JAR file in the alfresco folder. You can override this location by adding a file with the same name on the classpath before the clientapi JAR. For example, if you're using the WQS API from within a JEE webapp then add a wcmqs-api.properties file to the WEB-INF/classes/alfresco/ folder.

You can specify the following properties:

-   **wcmqs.api.alfresco**

    The base URL for the Alfresco repository. The default value is http://localhost:8080/alfresco.

-   **wcmqs.api.user**

    The username to authenticate the WQS API to Alfresco Content Services. It is recommended that this is changed.

-   **wcmqs.api.password**

    The password to authenticate the WQS API to Alfresco Content Services. It is recommended that this is changed.

-   **wcmqs.api.alfresco.cmis**

    The URL that the API will use to reach the CMIS interface. The default value is %\{wcmqs.api.alfresco\}/service/cmis.

-   **wcmqs.api.alfresco.webscript**

    The base URL the API uses invoke webscripts in the repository. The default value is %.


To override individual properties, place them in a file named wqsapi-custom.properties located on the classpath in a /alfresco/extension/ \(under /shared/classes/ in a Tomcat installation, for example\). You can specify these additional properties in this file:

-   **wcmqs.api.repositoryPollMilliseconds**

    The time the API will wait between checks for the repository being available. This mechanism ensures that the webapp can be started before the repository. The webapp will connect when the repository becomes available. The default value is 2000 milliseconds.

-   **wcmqs.api.sectionCacheSeconds**

    The time the API caches section objects before reloading them from the repository. The default value is 60 seconds.

-   **wcmqs.api.websiteCacheSeconds**

    The time the API caches website objects before reloading them from the repository. The default value is 300 seconds.


**Parent topic:**[Configuring Web Quick Start](../tasks/WQS-config.md)

