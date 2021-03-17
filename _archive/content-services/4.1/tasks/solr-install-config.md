---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, install, configure]
---

# Installing and Configuring Solr

This section describes how to install and configure Solr using the distribution archive file on an existing Alfresco installation using Tomcat.

**Note:** To confirm which application servers Alfresco supports for running the Solr application on, see the [Supported Platforms](http://www.alfresco.com/services/subscription/supported-platforms) matrix for your version of Alfresco.

The distribution archive file is called alfresco-enterprise-solr-4.1.10.zip.

This file contains the following artifacts:

-   a template SOLR home directory containing solr.xml, which is expected by Solr
-   Solr WAR file
-   an example context to wire up in Tomcat
-   a lib directory with all the required Alfresco and other JARs
-   two Solr core configurations: one to track the live SpacesStore and one to track items archived from the SpacesStore

You can install Solr either to the same Tomcat application server as Alfresco or a separate Tomcat. The Solr server indexes data in Alfresco by periodically tracking the changes made to Alfresco. It does so by calling a RESTful API that describe the latest transactions to it. The Alfresco server performs searches through the Solr server by issuing queries through a special API. For this reason, there needs to be two-way communication between the Alfresco server and the Solr server. For security reasons, the communication channel between the Alfresco server and Solr server must be secured by means of https encryption and mutual client certificate authentication.

The following instructions use <ALFRESCO\_TOMCAT\_HOME\> to refer to the tomcat directory where Alfresco is installed and <SOLR\_TOMCAT\_HOME\> to refer to the tomcat directory where Solr is installed. These may be the same or different directories, depending on whether you have chosen to install Solr on a standalone server. The <ALFRESCO\_HOME\> refers to the directory where Alfresco is installed.

1.  Extract the alfresco-enterprise-solr-4.1.10.zip file to a location. For example, <SOLR-ARCHIVE\>.

2.  Copy the context.xml file to <SOLR\_TOMCAT\_HOME\>\\conf\\Catalina\\localhost\\solr.xml.

3.  Edit `docBase` in the <SOLR\_TOMCAT\_HOME\>\\conf\\Catalina\\localhost\\solr.xml file to point to <SOLR-ARCHIVE\>\\apache-solr-1.4.1.war.

4.  Edit solr/home in XML to point to <SOLR-ARCHIVE\>.

    For example:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <Context docBase="<SOLR-ARCHIVE>\apache-solr-1.4.1.war" debug="0" crossContext="true">
       <Environment name="solr/home" type="java.lang.String" value="<SOLR-ARCHIVE>" override="true"/>
    </Context>
    ```

5.  For each core, edit the solrcore.properties file:

    -   <SOLR-ARCHIVE\>/archive-SpacesStore/conf/solrcore.properties
    -   <SOLR-ARCHIVE\>/workspace-SpacesStore/conf/solrcore.properties
    Set the `data.dir.root` property to the location where the Solr indexes will be stored. You can set the same value for the both cores, and the cores will create the sub-directories.

6.  Ensure that Alfresco has already been started at least once and the <ALFRESCO\_TOMCAT\_HOME\>/webapps/alfresco/WEB-INF directory exists.

7.  Create and populate a keystore directory for the Alfresco and Solr servers. By default, the keystore directory is created in <ALFRESCO\_HOME\>/alf\_data/keystore. Note that at this stage the keystore directory will just be a template, containing standard keys. To secure the installation, you must follow the steps to generate new keys as explained in the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) section.

    For example:

    For Unix:

    ```
    mkdir -p <ALFRESCO_HOME>/alf_data/keystore 
    
    cp <ALFRESCO_TOMCAT_HOME>/webapps/alfresco/WEB-INF/classes/alfresco/keystore/* <ALFRESCO_HOME>/alf_data/keystore 
    ```

    For Windows:

    ```
    mkdir <ALFRESCO_HOME>\alf_data\keystore 
    
    copy <ALFRESCO_TOMCAT_HOME>\webapps\alfresco\WEB-INF\classes\alfresco\keystore\* <ALFRESCO_HOME>\alf_data\keystore 
    ```

8.  Configure the Alfresco and Solr tomcat application servers to use the keystore and truststore for https requests by editing the specification of the connector on port 8443 in <ALFRESCO\_TOMCAT\_HOME\>/conf/server.xml and <SOLR\_TOMCAT\_HOME\>/conf/server.xml as shown below:

    **Note:** Remember to replace <ALFRESCO\_HOME\>/alf\_data/keystore with the full path to your keystore directory. Also, make sure that the Tomcat connectors is configured with `maxSavePostSize="-1"` to support SSL.

    For example:

    ```
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol"
          SSLEnabled="true" maxThreads="150" scheme="https"
          keystoreFile="<ALFRESCO_HOME>/alf_data/keystore/ssl.keystore"
          keystorePass="kT9X6oe68t" keystoreType="JCEKS" secure="true" connectionTimeout="240000"
          truststoreFile="<ALFRESCO_HOME>/alf_data/keystore/ssl.truststore"
          truststorePass="kT9X6oe68t" truststoreType="JCEKS" clientAuth="false" sslProtocol="TLS" maxSavePostSize="-1"/>  
    ```

9.  Configure Alfresco to use the keystore and truststore for client requests to Solr by specifying dir.keystore in <ALFRESCO\_TOMCAT\_HOME\>/shared/classes/alfresco-global.properties.

    **Note:** Remember to replace <ALFRESCO\_HOME\>/alf\_data/keystore with the full path to your keystore directory.

    For example:

    ```
    dir.keystore=<ALFRESCO_HOME>/alf_data/keystore 
    ```

10. Configure an identity for the Alfresco server. In <SOLR\_TOMCAT\_HOME\>/conf/tomcat-users.xml, add the following:

    **Note:** Remember, you can choose a different username, such as the host name of the Alfresco server, but it must match the REPO\_CERT\_DNAME that you will later specify in the keystore in the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) section.

    For example:

    ```
    <user username="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB" roles="repository" password="null"/>
    ```

11. Configure an identity for the Solr server. In <ALFRESCO\_TOMCAT\_HOME\>/conf/tomcat-users.xml, add the following:

    **Note:** Remember, you can choose a different username but it must match the SOLR\_CLIENT\_CERT\_DNAME that you will later specify in the keystore in the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) section.

    For example:

    ```
    <user username="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB" roles="repoclient" password="null"/>
    ```

12. To complete the installation, it is necessary to secure the two-way communication between Alfresco and Solr by generating your own keys. See the [Generating Secure Keys for Solr Communication](generate-keys-solr.md) topic.


**Parent topic:**[Configuring Solr](../concepts/solr-webapp-config.md)

