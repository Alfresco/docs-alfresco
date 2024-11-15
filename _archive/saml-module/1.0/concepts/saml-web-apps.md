---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Working with single page web applications

When calling APIs on the repository directly from the browser, you may run into CSRF and CORS issues.

**Configuring CSRF**

The Application Development Framework \(ADF\) documentation contains some information on how to configure CSRF. For more information, see [Flag to disable csrf in the core and in the demo shell](https://github.com/Alfresco/alfresco-ng2-components/issues/819) and [Prerequisites for building and running apps with the Alfresco Application Development Framework](https://github.com/Alfresco/alfresco-ng2-components/blob/f575bc5f61210b1ce233fbdda6ab9cb37814abed/PREREQUISITES.md).

**Enable CORS in Alfresco**

The web client for ADF will be loaded from a different web server than the on which Alfresco runs. So, the Alfresco server needs to know that any request that comes in from this custom web client should be allowed access to the repository. This is done by enabling cross-origin resource sharing \(CORS\).

To enable CORS in the Alfresco, do one of the following:

-   Download and install the CORS module
    1.  Download the [CORS module](https://artifacts.alfresco.com/nexus/repository/releases/org/alfresco/enablecors/1.0/enablecors-1.0.jar).
    2.  Stop the Alfresco server.
    3.  Add the enable CORS platform module JAR to the <ALFRESCO\_HOME\>/modules/platform directory.
    4.  Restart the Alfresco server.

        **Note:** By default, the CORS filter that is enabled will allow any origin.

-   Manually update the `web.xml` file
    1.  Open `<ALFRESCO_HOME>/tomcat/webapps/alfresco/WEB-INF/web.xml`.
    2.  Uncomment the following section:

        ```
        <filter-mapping>
            <filter-name>CORS</filter-name>
            <url-pattern>/api/*</url-pattern>
            <url-pattern>/service/*</url-pattern>
            <url-pattern>/s/*</url-pattern>
            <url-pattern>/cmisbrowser/*</url-pattern>
        </filter-mapping>
        ```

    3.  Update `cors.allowOrigin` URL to `http://localhost:3000`. Make sure to use the URL that will be used by the web client.

**Parent topic:**[SAML SSO REST API service provider usage guidelines](../concepts/develop-saml.md)

