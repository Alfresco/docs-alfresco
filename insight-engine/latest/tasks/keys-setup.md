---
author: Alfresco Documentation
---

# Setting up your certificates

Use this information to set up your generated certificates in their correct locations.

Before continuing, make sure that you've already completed the steps in [Generating secure keys for SSL communication](generate-keys-ssl.md)



1.  Copy the files under `/keystores/alfresco` to the Alfresco Content Services install location:

    ```
    ${ALF_DATA_DIR}/keystore
    ```

2.  Copy the files under `/keystores/solr` to the Alfresco Search Services install location:

    ```
    <SOLR_HOME>/keystore
    ```

3.  You can use the file under `keystores/client` from a browser to access the server using HTTPS on port 8443.

4.  Override the SSL properties as shown.

    1.  In `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` update the following:

        ```
        dir.keystore=${ALF_DATA_DIR}/keystore
        
        # encryption
        solr.secureComms=https
        
        # ssl encryption
        encryption.ssl.keystore.location=${dir.keystore}/ssl.keystore
        encryption.ssl.keystore.type=JCEKS
        encryption.ssl.keystore.keyMetaData.location=encryption.ssl.truststore.location=${dir.keystore}/ssl.truststore
        encryption.ssl.truststore.type=JCEKS
        encryption.ssl.truststore.keyMetaData.location=
        
        # secret key keystore
        configurationencryption.keystore.location=${dir.keystore}/keystore
        encryption.keystore.keyMetaData.location=encryption.keystore.type=JCEKS
        solr.host=localhost
        solr.port=8983
        solr.port.ssl=8983
        ```

        > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file.

    2.  For the Tomcat SSL Connector in `<TOMCAT_HOME>/conf/server.xml` update the following:

        ```
        <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol" 
            SSLEnabled="true" maxThreads="150" scheme="https" 
            keystoreFile="/usr/local/tomcat/alf_data/keystore/ssl.keystore" 
            keystorePass="password" keystoreType="JCEKS" 
            secure="true" connectionTimeout="240000" 
            truststoreFile="/usr/local/tomcat/alf_data/keystore/ssl.truststore" 
            truststorePass="password" truststoreType="JCEKS" 
            clientAuth="want" sslProtocol="TLS" />
        ```

        > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file. Also, make sure that the keystore and truststore file locations are correct for your environment.

    See [Installing the Tomcat application server](https://docs.alfresco.com/6.1/tasks/configfiles-change-path.html) and [Solr configuration files](../concepts/solr-config-files.md) for more.

5.  Change the SSL properties in `<SOLR_HOME>/solrhome/templates/rerank/conf/solrcore.properties`.

    The `rerank` template is used to generate the `alfresco` and `archive` Solr cores when you first run Alfresco Search Services.

    ```
    # encryption
    alfresco.secureComms=https
    
    # ssl
    alfresco.encryption.ssl.keystore.type=JCEKS
    alfresco.encryption.ssl.keystore.location=<SOLR_HOME>/ssl-repo-client.keystore
    alfresco.encryption.ssl.keystore.passwordFileLocation=
    alfresco.encryption.ssl.truststore.type=JCEKS
    alfresco.encryption.ssl.truststore.location=<SOLR_HOME>/ssl-repo-client.truststore
    alfresco.encryption.ssl.truststore.passwordFileLocation=alfresco.host=localhost
    alfresco.port.ssl=8443
    ```

    > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file.

    If the `alfresco` and `archive` cores already exist, ensure that `alfresco.secureComms` is set to `https` for both the cores in the following files:

    ```
    <SOLR_HOME>/solrhome/alfresco/conf/solrcore.properties
    <SOLR_HOME>/solrhome/archive/conf/solrcore.properties
    ```

    See [Solr core configuration properties](../concepts/solrcore-properties-file.md) for more.


**Parent topic:**[Generating secure keys overview](../concepts/generate-keys-overview.md)

