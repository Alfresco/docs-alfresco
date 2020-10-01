---
title: Repository SSL keystores
---
Use this information to understand the keystores used by the repository for mutual TLS.

The keys and certificates required for mutual TLS on the repository side are set up in Tomcat.

1. Modify <TOMCAT\_HOME\>/conf/server.xml and add the following connector:

    ```bash
    <Connector port="8999" protocol="org.apache.coyote.http11.Http11Protocol"
        connectionTimeout="20000"
        SSLEnabled="true" scheme="https" secure="true"
        sslProtocol="TLS" clientAuth="true"
        keystoreFile="xxxxxxx"
        keystorePass="yyyyy"
        truststoreFile="xxxxxxx"
        truststorePass="yyyyy"
    />
    ```

2. Copy the keystore and truststore files you created in [Generating secure keys for SSL communication](generate-keys-ssl.md) to the machine that's running the repository.

3. Set the parameters in the connector, replacing the `xxxxxxx` and `yyyyy` values.

4. Make sure that the following property is added to the TOMCAT\_HOME\>/shared/classes/alfresco-global.properties file:

    ```bash
    solr.secureComms=https
   ```
