---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: [install, JBoss]
---

# Configuring Alfresco on JBoss with Solr installed on a Tomcat instance

Use this information to configure Alfresco deployed on JBoss EAP 6 with Solr on a separate Tomcat instance.

Before configuring Alfresco, ensure that:

-   Solr is installed on a separate Tomcat instance. For detailed information, see [Configure Solr 4 search service](../concepts/configure-solr4.md).
-   Alfresco has been deployed on JBoss EAP 6.
-   JBoss server is not running.

The following instructions use <ALF\_DATA\> to refer to the value of the `dir.root` property, which specifies the directory where the content and indexes are stored.

1.  Add the following properties to the alfresco-global.properties file:

    ```
    index.subsystem.name=solr
    dir.keystore=${dir.root}/keystore
    encryption.ssl.keystore.type=JKS
    encryption.ssl.truststore.type=JKS
    solr.port.ssl=8443
    solr.host=<solr_host_ip_address>
    solr.port=8080
    ```

2.  Generate certificates that will be used for Solr and Alfresco communication. The <ALF\_DATA\>\\keystore\\generate\_keystores.bat can be used, the only requirement is to use JKS keystores and truststores, as JBoss does not support JCEKS.

3.  Replace the newly generated certificates with certificates in the <ALF\_DATA\>\\keystore and Solr configuration directories.

4.  Add the SSL connector to the web subsystem in the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file.

    ```
    <subsystem xmlns="urn:jboss:domain:web:1.5" default-virtual-server="default-host" native="false">
      <connector name="https" protocol="HTTP/1.1" scheme="https" socket-binding="https" secure="true">
        <ssl name="ssl" key-alias="ssl.repo" password="kT9X6oe68t" certificate-key-file="<ALF_DATA>\keystore\ssl.keystore"
            protocol="TLSv1" verify-client="true" ca-certificate-file="<ALF_DATA>\keystore\ssl.truststore" keystore-type="JKS"
            truststore-type="JKS"/>
      </connector>
       …
    </subsystem>
    ```

    **Note:** Remember to replace <ALF\_DATA\> with an actual path.

5.  Create the roles.properties file in <ALF\_DATA\>\\keystore with the following content:

    ```
    <SOLR_CLIENT_CERT_DNAME>=repoclient
    ```

    where `SOLR_CLIENT_CERT_DNAME` is the Solr client certificate subject name.

    For example, if the following certificate subject name was used:

    ```
    SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
    ```

    then contents of roles.properties should be:

    ```
    CN\=Alfresco\ Repository\ Client,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repoclient
    ```

6.  Add a security domain in the security subsystem in the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\ standalone.xml file.

    ```
    <subsystem xmlns="urn:jboss:domain:security:1.2">
      <security-domains>    
        …
     <security-domain name="trustStore">
      <jsse truststore-password="kT9X6oe68t" truststore-type="JKS" truststore-url="<ALF_DATA>\keystore\ssl.truststore" protocols="TLSv1"/>
     </security-domain>
     <security-domain name="alfresco" cache-type="default">
      <authentication>
        <login-module code="CertificateRoles" flag="required">
          <module-option name="securityDomain" value="java:/jaas/trustStore"/>
          <module-option name="verifier" value="org.jboss.security.auth.certs.AnyCertVerifier"/>
          <module-option name="rolesProperties" value="<ALF_DATA>\keystore\roles.properties"/>
        </login-module>
      </authentication>
     </security-domain>
    </subsystem>  
    ```

    where <ALF\_DATA\> should be substituted with an actual path.

7.  Unzip the alfresco-enterprise-5.0.5.ear\\alfresco.war file and add the security domain to the WEB-INF\\jboss-web.xml file:

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE jboss-web PUBLIC "-//JBoss//DTD Web Application 4.2//EN" "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
    <jboss-web>
      <resource-ref>
        <res-ref-name>jdbc/dataSource</res-ref-name>
        <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
      </resource-ref>
      <resource-ref>
        <res-ref-name>jdbc/activitiIdGeneratorDataSource</res-ref-name>
        <jndi-name>java:jboss/datasources/MySqlDS</jndi-name>
      </resource-ref>
      <security-domain>alfresco</security-domain>
    </jboss-web>
    ```

8.  Start the standalone JBoss Web Server.

9.  Redeploy the Alfresco EAR as we have made changes to it.


**Parent topic:**[Installing Alfresco on JBoss](../tasks/alf-jboss-install.md)

**Related information**  


[Installing Solr on JBoss 6 EAP with Java 8](solr-jboss-install.md)

[Modifying the global properties file](global-props-config.md)

