---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Installing and configuring Solr nodes

This topic describes the instructions for installing and configuring Solr nodes in a cluster.

1.  Configure Solr nodes. See [Configuring search](../concepts/solr-home.md) for more information.

2.  Open the <ALFRESCO\_HOME\>/alf\_data/solr/archive-SpacesStore/conf/solrcore.properties file.

3.  Open the <ALFRESCO\_HOME\>/alf\_data/solr/workspace-SpacesStore/conf/solrcore.properties file.

4.  Set the following solr properties.

    ```
    alfresco.host=localhost
    alfresco.port=8080 (if using HTTP transport, specify the HTTP port)
    alfresco.port.ssl=8443 (if using HTTPS transport, specify the SSL port)
    alfresco.secureComms=none or https (depending on whether HTTP or HTTPS transport is being used)
    ```

5.  Comment out or delete all the `<security-constraint>` properties in the web.xml file in alfresco.war and solr.war.

    In the <ALFRESCO\_HOME\>/tomcat/webapps/alfresco/WEB-INF/web.xml file, comment out the following:

    In the <ALFRESCO\_HOME\>/tomcat/webapps/solr4/WEB-INF/web.xml file, comment out the following:


If you are using HTTP transport, make sure that the following properties are set:

-   `solr.secureComms=none` in the alfresco-global.properties file
-   `alfresco.secureComms=none` in the solrcore.properties file

Additionally, you need to comment out or delete all the `<security-constraint>` properties in the web.xml file in alfresco.war and solr.war. For example, in the <ALFRESCO\_HOME\>/tomcat/webapps/alfresco/WEB-INF/web.xml file, comment out the following:

```
<security-constraint>
        <web-resource-collection>
            <url-pattern>/*</url-pattern>
        </web-resource-collection>
        <auth-constraint>
            <role-name>repository</role-name>
        </auth-constraint>
        <user-data-constraint>
            <transport-guarantee>CONFIDENTIAL</transport-guarantee>
        </user-data-constraint>
    </security-constraint>

    <login-config>
        <auth-method>CLIENT-CERT</auth-method>
        <realm-name>Solr</realm-name>
    </login-config>

    <security-role>
       <role-name>repository</role-name>
    </security-role>
```

and in the <ALFRESCO\_HOME\>/tomcat/webapps/solr4/WEB-INF/web.xml file, comment out the following:

```
<security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/service/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/s/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/wcservice/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <security-constraint>
      <web-resource-collection>
         <web-resource-name>SOLR</web-resource-name>
         <url-pattern>/wcs/api/solr/*</url-pattern>
      </web-resource-collection>

      <auth-constraint>
         <role-name>repoclient</role-name>
      </auth-constraint>

      <user-data-constraint>
         <transport-guarantee>CONFIDENTIAL</transport-guarantee>
      </user-data-constraint>
   </security-constraint>

   <login-config>
      <auth-method>CLIENT-CERT</auth-method>
      <realm-name>Repository</realm-name>
   </login-config>
   
   <security-role>
     <role-name>repoclient</role-name>
   </security-role>
```

If you are using HTTPS transport, make sure that your load balancer is configured to use the Alfresco certificate. You may need to generate your own certificate from browser.p12, which is shipped with Alfresco Solr, and add it to your load balancer configuration.

**Parent topic:**[Scenario: Clustering for high throughput](../concepts/cluster-scenario-throughput.md)

