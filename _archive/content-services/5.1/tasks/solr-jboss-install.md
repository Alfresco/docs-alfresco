---
author: [Alfresco Documentation, Alfresco Documentation]
source: Wiki
audience: 
category: [Installation, Alfresco Server]
keyword: [install, JBoss]
---

# Installing Solr on JBoss 6 EAP with Java 8

Use this information to install Solr on the same JBoss 6 instance on which Alfresco is installed.

Ensure that JBoss and Java 8 are installed. Review the Supported Platforms page on the [Support Portal](http://support.alfresco.com) for more information.

The following instructions:

-   Are only for Solr 1 installation; the Solr 4 server is only supported when running in a Tomcat application server.
-   Assume that you know the path of the JBoss directory, which is represented as <JBOSS\_EAP\_HOME\>.
-   Are written for Windows Server 2008 R2 installation with MySQL as data source. More details for JBoss 6 EAP configuration could be found in the [JBoss Enterprise Application Platform 6](https://access.redhat.com/site/documentation/en-US/JBoss_Enterprise_Application_Platform/6/html-single/Administration_and_Configuration_Guide/index.html) guide.

Before installing Solr, ensure that:

-   Alfresco has been deployed on JBoss EAP 6.
-   JBoss server is not running.

The following instructions use <ALF\_DATA\> to refer to the value of the `dir.root` property, which specifies the directory where the content and indexes are stored.

1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com).

2.  Download the alfresco-solr1-5.1.5.zip file.

3.  Create a temporary directory \(the path for it is represented as <TEMP\>\) and uncompress the zip file here.

4.  Create a JBoss module with Solr configuration.

    1.  Create a main directory at <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\.

    2.  Copy the contents of <TEMP\> to the <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main directory. Do not copy the contents of the alf\_data directory.

    3.  Copy the contents of <TEMP\>\\alf\_data to <ALFRESCO\_HOME\>/ALF\_DATA directory.

    4.  Add the following properties to the alfresco-global.properties file:

        ```
        index.subsystem.name=solr
        dir.keystore=${dir.root}/keystore
        encryption.ssl.keystore.type=JKS
        encryption.ssl.truststore.type=JKS
        solr.port.ssl=8443
        solr.host=<solr_host_ip_address>
        solr.port=8080
        ```

    5.  Create the module.xml file at <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main\\ with the following content:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
         <module xmlns="urn:jboss:module:1.0" name="org.apache.solr.configuration">
           <resources>
             <resource-root path="."/>
           </resources>
         </module>
        ```

    6.  Add the following system properties to the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file:

        ```
        <system-properties>
          <property name="solr.solr.home" value="<JBOSS_EAP_HOME>\modules\org\apache\solr\configuration\main" />
          <property name="solr.data.dir" value="<SOLR_DATA>" />
        </system-properties>
        ```

        where <SOLR\_DATA\> is the directory where indexes would be stored.

    7.  Generate certificates that will be used for Solr and Alfresco communication. The <ALF\_DATA\>\\keystore\\generate\_keystores.bat can be used, the only requirement is to use JKS keystores and truststores, as JBoss does not support JCEKS.

    8.  Replace the existing certificates with the newly generated certificates at the following locations:

        -   <ALF\_DATA\>\\keystore to <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main\\archive-SpacesStore\\conf
        -   <ALF\_DATA\>\\keystore to <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main\\workspace-SpacesStore\\conf
    9.  Modify the following property files with the new certificate properties:

        -   <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main\\archive-SpacesStore\\conf\\solrcore.properties
        -   <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main\\workspace-SpacesStore\\conf\\solrcore.properties
    10. Add SSL connector to the web subsystem in the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file.

        ```
        <subsystem xmlns="urn:jboss:domain:web:1.5" default-virtual-server="default-host" native="false">
          <connector name="https" protocol="HTTP/1.1" scheme="https" socket-binding="https" secure="true">
             <ssl name="ssl" key-alias="ssl.repo" password="kT9X6oe68t" certificate-key-file="<ALF_DATA>\keystore\ssl.keystore" protocol="TLSv1" verify-client="true"
                ca-certificate-file="<ALF_DATA>\keystore\ssl.truststore" keystore-type="JKS"
                truststore-type="JKS"/>
          </connector>
            …
        </subsystem>
        ```

    11. Create the roles.properties file in the <ALF\_DATA\>\\keystore directory with the following content:

        ```
        <REPO_CERT_DNAME>=repository
        <SOLR_CLIENT_CERT_DNAME>=repoclient
        ```

        where, `REPO_CERT_DNAME` specifies the repository server certificate subject name, and `SOLR_CLIENT_CERT_DNAME` specifies the Solr client certificate subject name.

        For example, if the following certificate subject names are used:

        ```
        REPO_CERT_DNAME="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
        SOLR_CLIENT_CERT_DNAME="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB"
        ```

        then contents of the roles.properties file should be:

        ```
        CN\=Alfresco\ Repository\ Client,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repoclient
        CN\=Alfresco\ Repository,\ OU\=Unknown,\ O\=Alfresco\ Software\ Ltd.,\ L\=Maidenhead,\ ST\=UK,\ C\=GB=repository
        ```

    12. Add a security domain in the security subsystem in <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml:

        ```
        <subsystem xmlns="urn:jboss:domain:security:1.2">
         <security-domains>
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
         </security-domains>
        </subsystem>
        ```

        **Note:** Remember to replace <ALF\_DATA\> with an actual path.

    13. Rename the WAR file to solr.war in the <JBOSS\_EAP\_HOME\>\\modules\\org\\apache\\solr\\configuration\\main directory.

    14. Unzip solr.war and update the WEB-INF\\jboss-deployment-structure.xml file as shown below:

        ```
        <?xml version="1.0" encoding="UTF-8"?>
        <jboss-deployment-structure>
          <deployment>
            <dependencies>
              <module name="org.apache.solr.configuration"/>
            </dependencies>
          </deployment>
        </jboss-deployment-structure>
        ```

        Also, modify the WEB-INF\\jboss-web.xml file with the following content:

        ```
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE jboss-web PUBLIC "-//JBoss//DTD Web Application 4.2//EN" "http://www.jboss.org/j2ee/dtd/jboss-web_4_2.dtd">
         <jboss-web>
           <security-domain>alfresco</security-domain>
        </jboss-web>
        ```

    15. Unzip the alfresco-enterprise-5.1.5.ear\\alfresco.war file and add the security domain to WEB-INF\\jboss-web.xml:

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

    16. Re-compress the Alfresco WAR and alfresco-enterprise-5.1.5.ear files.

    17. Start the standalone JBoss Web Server.

    18. Redeploy the modified Alfresco EAR file as shown is Step 14 of [Configuring JBoss for Alfresco](alf-jboss-config.md).

5.  Deploy the Solr WAR.

    1.  Open the **JBoss Management Console**.

    2.  Navigate to **Runtime \> Manage Deployments**.

    3.  Click the **Add** button.

    4.  Browse and select the modified Solr WAR file.

    5.  After the WAR file is added, click the **Enable** button.


**Parent topic:**[Installing Alfresco on JBoss](../tasks/alf-jboss-install.md)

**Related information**  


[Advantages of Solr 4 over Solr 1.4 search](../concepts/solr-benefits.md)

[Configuring JBoss for Alfresco](alf-jboss-config.md)

[Configuring Alfresco on JBoss with Solr installed on a Tomcat instance](solr-tomcat-install.md)

[Modifying the global properties file](global-props-config.md)

