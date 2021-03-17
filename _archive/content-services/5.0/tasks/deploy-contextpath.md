---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
---

# Deploying Alfresco with a different context path

There are a number of updates that you need to make if you want to deploy Alfresco to a context path that is not /alfresco.

The context path is the path that is used by applications \(for example, Share, SOLR, SharePoint, and others\) to access the Alfresco repository. If you change this value, you must reflect the change in your application server configuration.

**Note:** You cannot install Alfresco at the server root \(/\). In other words, the context path cannot be the server root.

Follow these steps if you want to deploy Alfresco to a context path that is not /alfresco. The string new-context-path is used to represent the name of the context path that you are using:

1.  Deploy the alfresco.war file to a different context path; for example, if you are using Tomcat, rename the alfresco.war file to new-context-path.war and then deploy it. For other application servers, set the context path in the Admin Console during deployment.

2.  Update alfresco-global.properties with the name of the context path: `alfresco.context=new-context-path`.

3.  Update share-config-custom.xml as described in [Configuring the Share default port](share-change-port.md).

4.  Update the context path setting in the \_vti\_bin application:

    1.  Unpack the \_vti\_bin.war file.

    2.  Locate the WEB-INF/web.xml file in the\_vti\_bin application.

    3.  Replace the `<param-value>` value with `/new-context-path/aos` to update the context parameter with the new context path. The example shows the default values in the WEB-INF/web.xml file:

        ```
        <context-param>
           <param-name>org.alfresco.enterprise.repo.officeservices.dispatch.SERVICES</param-name>
           <param-value>/alfresco/aos</param-value>
           <description>A space separated list of url-encoded context paths of SharePoint protocol enabled applications (e.g. Alfresco One, Alfresco Office Workdesk)</description>
        </context-param>
        ```

    4.  Repack the contents of the \_vti\_bin application into a \_vti\_bin.war file and deploy it.

5.  Unpack ROOT.war and edit the index.jsp file to set the context path:

    Change /alfresco to /new-context-path:

    ```
    if(request.getMethod().equals("PROPFIND") || request.getMethod().equals("OPTIONS"))
    { ServletContext alfrescoContext = application.getContext("/alfresco"); ... }
    ```

6.  Repack the contents of ROOT.war and deploy it.

7.  Update the Solr 4 or Solr configuration to specify the new context path:

    If you are using Solr 4, modify the following files:

    ```
    solr4/workspace-SpacesStore/conf/solrcore.properties
    solr4/archive-SpacesStore/conf/solrcore.properties
    ```

    If you are using Solr, modify the following files:

    ```
    solr/workspace-SpacesStore/conf/solrcore.properties
    solr/archive-SpacesStore/conf/solrcore.properties
    ```

    to specify the properties relevant to your configuration:

    ```
    alfresco.host=localhost
    alfresco.port=8080
    alfresco.port.ssl=8443
    alfresco.baseUrl=/alfresco
    ```


**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

## Deploying Alfresco with a reverse proxy

Follow this guidance if you want to run Alfresco with a reverse proxy.

1.  If the reverse proxy maps the target server to a different context path, or if you deployed Alfresco specifically to a different context path, you need to follow the steps in [Deploying Alfresco with a different context path](deploy-contextpath.md#), with the following changes:

    1.  In step [2](deploy-contextpath.md#alfresco-global), update the values in the alfresco-global.properties file:

        ```
        alfresco.context=xxx
        alfresco.host=xxx 
        alfresco.port=xxx
        alfresco.protocol=xxx
        
        ```

        where xxx are the externally visible context, host name, port number and protocol values.

    2.  You must specify the context path that is externally visible in all steps, and not the context path that the repository is actually running on. Exceptions are in step [1](deploy-contextpath.md#step-1) and in step [3](deploy-contextpath.md#share-config) if Share is connecting to the repository directly and not through the reverse proxy. The other exception is in step [7](deploy-contextpath.md#solr) if Solr or Solr 4 is contacted directly and not through the reverse proxy.


