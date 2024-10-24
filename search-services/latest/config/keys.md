---
title: Secure keys
---

This section describes a recommended approach for generating secure keys and setting up certificates. It is not required that you use this approach if you have an alternative solution that you already use.

If you're installing Alfresco Content Services using the distribution zip, you need to generate certificates for the repository and Solr. By default, the distribution zips are configured to use SSL, so you'll need to generate these certificates to get your system to run successfully.

You can create the keystores, truststores and certificates required to configure SSL/mutual TLS authentication between different services in Alfresco Content Services, such as the repository and Solr.

## Generate secure keys for SSL communication

Use this information to generate certificates for SSL/mutual TLS authentication between the repository and Search Services, using secure keys specific to your installation.

A certificates generator script, `run.sh` (for Linux) and `run.cmd` (for Windows) is provided in a GitHub project. The script consists of two parts - the first part is based on OpenSSL (to generate the certificates), and the second part is based on the Java `keytool` (to build the keystores and truststores). Here, we'll focus on running the script for a standalone Linux or Windows operating system.

Before you start, you must already have OpenSSL and `keytool` available in your system path.

1. Browse to the [https://github.com/Alfresco/alfresco-ssl-generator](https://github.com/Alfresco/alfresco-ssl-generator) GitHub project and click **Clone** or **Download**.

    If you downloaded the project, extract the files to a suitable location.

2. Change directory to the following location and run the script:

    (For Linux)

    ```bash
    cd /ssl-tool
    ./run.sh
    ```

    (For Windows)

    ```bash
    cd ssl-tool-win
    run.cmd
    ```

    By default, this creates a `keystores` folder in your current working directory.

    > **Note:** If the `keystores` folder isn't empty, the script exits without producing any keystore or truststore. You can safely, remove the `keystores` folder if you need to re-run the script. Also, you can delete the `ca` folder to avoid getting these errors in the console:
    ```
     * Invalid switch - "*".
     * A subdirectory or file ca\certs already exists.
     * Error occurred while processing: ca\certs.
     * A subdirectory or file ca\crl already exists.
     * Error occurred while processing: ca\crl.
     * A subdirectory or file ca\newcerts already exists.
     * Error occurred while processing: ca\newcerts.
     * A subdirectory or file ca\private already exists.
     * Error occurred while processing: ca\private.
    ```

See [Keystore directory structure](#keystore-directory-structure) for more and [Customize certificate generation](#customizing-certificate-generation) for a full list of parameters that allow you to customize your certificates. It is recommended that you set your own passwords when generating certificates.

## Customize certificate generation

Here is a full list of parameters that allow you to customize your certificates. These parameters will override the default values listed in the `run.sh` and `run.cmd` scripts.

|Parameter|Value|Description|
|---------|-----|-----------|
|alfrescoversion|enterprise/community|Sets the type of Alfresco environment. The default value is enterprise.|
|keysize|1024/2048/4096 |Specifies the RSA key length. The default value is 1024.|
|keystoretype|PKCS12/JKS/JCEKS|Sets the type of the keystores (containing private keys). The default value is JCEKS.|
|keystorepass|Any string|Specifies the password for the keystores|
|truststoretype|JKS/JCEKS|Sets the type of the truststores (containing public keys). The default value is JCEKS.|
|truststorepass|Any string|Specifies the password for the truststores|
|encstorepass|Any string|Specifies the password for the encryption keystore|
|encmetadatapass|Any string|Specifies the password for the encryption metadata|
|cacertdname| |Sets the Distinguished Name of the CA certificate, starting with a forward-slash. For example:`/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco CA`|
|repocertdname| |Sets the Distinguished Name of the repository certificate, starting with a forward-slash. For example:`/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco Repository`|
|solrcertdname| |Sets the Distinguished Name of the Solr certificate, starting with a forward-slash. For example:`/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco Repository Client`|
|browsercertdname| |Sets the Distinguished Name of the browser certificate, starting with a forward-slash. For example:`/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Browser Client`|
|caservername|Any string, localhost by default.|DNS Name of CA Server.|
|alfrescoservername|Any string, localhost by default.|DNS Name for Alfresco Server.|
|solrservername|Any string, localhost by default.|DNS Name For Solr Server.|
|alfrescoformat|classic, current|Default format for certificates: current for IE SS 2.0.0+ and classic for previous versions.|

> **Note:** If you plan to use custom DNames in your certificates, you must use double quotes around the values. For example:

```bash
$ ./run.sh -cacertdname  
"/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Windows Alfresco CA"
-repocertdname "/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Repo"
-solrcertdname "/C=GB/ST=UK/L=Maidenhead/O=Alfresco/OU=Unknown/CN=Solr"
```

It is recommended that you set your own passwords when generating certificates. For example:

(For Linux)

```bash
./run.sh -keystorepass "password" -truststorepass "password"
```

(For Windows)

```bash
run.cmd -keystorepass "password" -truststorepass "password"
```

## Keystore directory structure

The `keystores` directory contains the following structure and files:

```bash
keystores
├── alfresco
│   ├── keystore
│   ├── ssl.keystore
│   ├── ssl.truststore
├── client
│   └── browser.p12
└── solr
│   ├── ssl-repo-client.keystore
│   └── ssl-repo-client.truststore
```

|File name|Description|
|---------|-----------|
|browser.p12|The PKCS12 keystore generated from `ssl.keystore` that contains the repository private key and certificate for use in browsers, such as Firefox.|
|keystore|Secret key keystore containing the secret key used to encrypt and decrypt node properties.|
|ssl.keystore|Repository keystore containing the repository private/public key pair and certificate.|
|ssl.truststore|Repository truststore containing certificates that the repository trusts.|
|ssl-repo-client.keystore|Solr SSL keystore containing the Solr private/public key pair and certificate.|
|ssl-repo-client.truststore|Solr truststore containing certificates that the repository trusts.|

## Set up certificates

Use this information to set up your generated certificates in their correct locations.

Before continuing, make sure that you've already completed the steps in [Generating secure keys for SSL communication](#generating-secure-keys-for-ssl-communication).

1. Copy the files under `/keystores/alfresco` to the Alfresco Content Services install location:

    ```bash
    ${ALF_DATA_DIR}/keystore
    ```

2. Copy the files under `/keystores/solr` to the Alfresco Search Services install location:

    ```bash
    <SOLR_HOME>/keystore
    ```

3. You can use the file under `keystores/client` from a browser to access the server using HTTPS on port 8443.

4. Override the SSL properties as shown.

    1. In `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` update the following:

        ```bash
        dir.keystore=${ALF_DATA_DIR}/keystore
        # encryption
        solr.secureComms=https
        # ssl encryption
        encryption.ssl.keystore.location=${dir.keystore}/ssl.keystore
        encryption.ssl.keystore.type=JCEKS
        encryption.ssl.keystore.keyMetaData.location=
        encryption.ssl.truststore.location=${dir.keystore}/ssl.truststore
        encryption.ssl.truststore.type=JCEKS
        encryption.ssl.truststore.keyMetaData.location=
        # secret key keystore configuration
        encryption.keystore.location=${dir.keystore}/keystore
        encryption.keystore.keyMetaData.location=
        encryption.keystore.type=JCEKS
        solr.host=localhost
        solr.port=8983
        solr.port.ssl=8983
        ```

        > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file.

    2. For the Tomcat SSL Connector in `<TOMCAT_HOME>/conf/server.xml` update the following:

        ```bash
        <Connector port="8443" protocol="HTTP/1.1"
            SSLEnabled="true" maxThreads="150" scheme="https"
            keystoreFile="/usr/local/tomcat/alf_data/keystore/ssl.keystore"
            keystorePass="password" keystoreType="JCEKS"
            secure="true" connectionTimeout="240000"
            truststoreFile="/usr/local/tomcat/alf_data/keystore/ssl.truststore"
            truststorePass="password" truststoreType="JCEKS"
            clientAuth="want" sslProtocol="TLS" />
        ```

        > **Note:** If you're using a different keystore or truststore type other than the default, `JCEKS`, you must change the value in the properties file. Also, make sure that the keystore and truststore file locations are correct for your environment.

    See [Installing the Tomcat application server]({% link content-services/latest/install/zip/tomcat.md %}) and [Solr configuration files]({% link search-services/latest/config/index.md %}#solr-configuration-files) for more.

5. Change the SSL properties in `<SOLR_HOME>/solrhome/templates/rerank/conf/solrcore.properties`.

    The `rerank` template is used to generate the `alfresco` and `archive` Solr cores when you first run Alfresco Search Services.

    ```bash
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

    ```bash
    <SOLR_HOME>/solrhome/alfresco/conf/solrcore.properties
    <SOLR_HOME>/solrhome/archive/conf/solrcore.properties
    ```

    See [Solr core configuration properties]({% link search-services/latest/config/properties.md %}) for more.
