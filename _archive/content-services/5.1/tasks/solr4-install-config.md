---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, install, configure]
---

# Installing and configuring Solr

The Solr 4 search subsystem is installed by default when you install Alfresco One 5.1.5 using the setup wizards \(installer\), and therefore, you do not need to do these steps. If you install Alfresco manually using the distribution zip, you will need to configure Solr 4 separately on the existing Alfresco installation using Tomcat.

**Note:** To confirm which application servers Alfresco supports for running the Solr application on, see the [Supported Platforms](http://www.alfresco.com/services/subscription/supported-platforms) matrix for your version of Alfresco One.

The installation contains the following artifacts:

-   a template SOLR home directory containing solr.xml, which is expected by Solr
-   Solr WAR file
-   an example context to wire up in Tomcat
-   two Solr core configurations: one to track the live SpacesStore and one to track items archived from the SpacesStore

You can install Solr either to the same Tomcat application server as Alfresco or a separate Tomcat. The Solr server indexes data in Alfresco by periodically tracking the changes made to Alfresco. It does so by calling a RESTful API that describe the latest transactions to it. The Alfresco server performs searches through the Solr server by issuing queries through a special API. For this reason, there needs to be two-way communication between the Alfresco server and the Solr server. For security reasons, the communication channel between the Alfresco server and Solr server must be secured by means of https encryption and mutual client certificate authentication.

The following instructions use <ALFRESCO\_TOMCAT\_HOME\> to refer to the tomcat directory where Alfresco is installed and <SOLR4\_TOMCAT\_HOME\> to the tomcat directory where Solr is installed. These can be the same or different directories, depending on whether you have chosen to install Solr on a standalone server.

1.  Extract the alfresco-one-distribution-5.1.5.zip file to a location. For example, <EXTRACTED-ARCHIVE\>.

2.  The <EXTRACTED-ARCHIVE\> directory contains a solr4 directory. Copy the solr4 folder to the <ALFRESCO\_HOME\> directory, for example, <ALFRESCO\_HOME\>/solr4/. This directory now becomes <SOLR4-ARCHIVE\>, which is the Solr base directory.

3.  Copy the <ALFRESCO\_HOME\>/solr4/context.xml file to <SOLR4\_TOMCAT\_HOME\>\\conf\\Catalina\\localhost\\solr4.xml.

4.  Edit solr/home in XML to point to the path for <SOLR4-ARCHIVE\>, which is the Solr base directory mentioned in Step 2.

    For example:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <Context debug="0" crossContext="true">
      <Environment name="solr/home" type="java.lang.String" value="<SOLR4-ARCHIVE>" override="true"/>
      <Environment name="solr/model/dir" type="java.lang.String" value="@@ALFRESCO_SOLR4_MODEL_DIR@@" override="true"/>
      <Environment name="solr/content/dir" type="java.lang.String" value="@@ALFRESCO_SOLR4_CONTENT_DIR@@" override="true"/>
    </Context>
    ```

    where:

    -   @@ALFRESCO\_SOLR4\_MODEL\_DIR@@ should point to the location of the Solr model directory. For example, <ALFRESCO\_HOME\>/alf\_data/solr4/model.
    -   @@ALFRESCO\_SOLR4\_CONTENT\_DIR@@ should point to the location of the Solr content directory. For example, <ALFRESCO\_HOME\>/alf\_data/solr4/content.
5.  For each core, edit the solrcore.properties file:

    -   `archive-SpacesStore/conf/solrcore.properties`
    -   `workspace-SpacesStore/conf/solrcore.properties`
    Set the `data.dir.root` property to the location where the Solr indexes will be stored. You can set the same value for the both cores, and the cores will create the sub-directories.

6.  Ensure that Alfresco has already been started at least once and the <ALFRESCO\_TOMCAT\_HOME\>/webapps/alfresco/WEB-INF directory exists.

7.  Create and populate a keystore directory for the Alfresco and Solr servers. By default, the keystore directory is created in <ALFRESCO\_HOME\>/alf\_data/keystore. Note that at this stage the keystore directory will just be a template, containing standard keys. To secure the installation, you must follow the steps to generate new keys as explained in the [Generating Secure Keys for Solr Communication](generate-keys-solr4.md) section.

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

8.  Configure the Alfresco and Solr tomcat application servers to use the keystore and truststore for https requests by editing the specification of the connector on port 8443 in <ALFRESCO\_TOMCAT\_HOME\>/conf/server.xml and <SOLR4\_TOMCAT\_HOME\>/conf/server.xml as shown:

    **Note:** Remember to replace <ALFRESCO\_HOME\>/alf\_data/keystore with the full path to your keystore directory.

    **Note:** Make sure that you set the connector to `clientAuth=want` for this version of Alfresco One.

    For example:

    ```
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol"
          SSLEnabled="true" maxThreads="150" scheme="https"
          keystoreFile="<ALFRESCO_HOME>/alf_data/keystore/ssl.keystore"
          keystorePass="kT9X6oe68t" keystoreType="JCEKS" secure="true" connectionTimeout="240000"
          truststoreFile="<ALFRESCO_HOME>/alf_data/keystore/ssl.truststore"
          truststorePass="kT9X6oe68t" truststoreType="JCEKS" clientAuth="want" sslProtocol="TLS"/>  
    ```

9.  Configure Alfresco to use the keystore and truststore for client requests to Solr by specifying dir.keystore in <ALFRESCO\_TOMCAT\_HOME\>/shared/classes/alfresco-global.properties.

    **Note:** Remember to replace <ALFRESCO\_HOME\>/alf\_data/keystore with the full path to your keystore directory.

    For example:

    ```
    dir.keystore=<ALFRESCO_HOME>/alf_data/keystore 
    ```

10. Configure an identity for the Alfresco server. In <SOLR4\_TOMCAT\_HOME\>/conf/tomcat-users.xml, add the following:

    **Note:** Remember, you can choose a different user name, such as the host name of the Alfresco server, but it must match the REPO\_CERT\_DNAME that you will later specify in the keystore in the [Generating Secure Keys for Solr Communication](generate-keys-solr4.md) section.

    For example:

    ```
    <user username="CN=Alfresco Repository, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB" roles="repository" password="null"/>
    ```

11. Configure an identity for the Solr server. In <ALFRESCO\_TOMCAT\_HOME\>/conf/tomcat-users.xml, add the following:

    **Note:** Remember, you can choose a different user name but it must match the SOLR\_CLIENT\_CERT\_DNAME that you will later specify in the keystore in the [Generating Secure Keys for Solr Communication](generate-keys-solr4.md) section.

    For example:

    ```
    <user username="CN=Alfresco Repository Client, OU=Unknown, O=Alfresco Software Ltd., L=Maidenhead, ST=UK, C=GB" roles="repoclient" password="null"/>
    ```

12. To complete the installation, it is necessary to secure the two-way communication between Alfresco and Solr by generating your own keys. See the [Generating Secure Keys for Solr Communication](generate-keys-solr4.md) topic.


**Parent topic:**[Configure Solr search service](../concepts/configure-solr4.md)

