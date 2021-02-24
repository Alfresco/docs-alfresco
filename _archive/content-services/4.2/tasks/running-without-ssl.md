---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Running Without SSL

Alfresco uses SSL to secure communication between the repository server and the Solr server. In this communication, SSL not only provides encryption, it is also used for authentication. This topic describes how to turn-off SSL and deactivate authentication between Alfresco repository and the Solr server.

1.  Set the `solr.secureComms` property to `none` in the alfresco-global.properties file.

2.  Ensure that the `solr.port` property is set to the correct non-SSL port of the application server in which Solr is running.

3.  In the <solrRootDir\>/archive-SpacesStore/conf/solrcore.properties file and <solrRootDir\>/workspace-SpacesStore/conf/solrcore.properties file, do the following:

    1.  Set the property `alfresco.secureComms` property to `none`.

    2.  Ensure that the `alfresco.port` property is set to the correct non-SSL port of the application server in which your repository is running.

4.  In the repository web.xml, remove the following configuration:

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

5.  In the Solr web.xml, remove the following configuration:

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


If you decide to turn-off SSL and deactivate authentication between Alfresco repository and the Solr server, you need to protect your environment.

**Parent topic:**[Solr security](../concepts/solrsecurity-intro.md)

