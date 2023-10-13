---
title: Mutual TLS
---

This section describes a recommended approach for generating secure keys and setting up certificates. It is not required that you use this approach if you have an alternative solution that you already use.

If you're installing Content Services using the distribution zip, you need to generate certificates for the repository and Solr. By default, the distribution zips are configured to use SSL, so you'll need to generate these certificates to get your system to run successfully.

You can create the keystores, truststores and certificates required to configure SSL/mutual TLS authentication between different services in Content Services, such as the repository, Solr, and Alfresco Transform Service.

The diagram shown is an overview of mTLS structure:

![mTLS diagram]({% link content-services/images/mtls-diagram.png %})

## Generate secure keys for SSL communication

Use this information to generate certificates for SSL/mutual TLS authentication between the repository and Content Services, using secure keys specific to your installation.

The old script version can still be used and its description is provided in the Alfresco Search Services page, [Secure keys]({% link search-services/latest/config/keys.md %}). It can be replaced with executions of new scripts, that allow for more granularity and control (for example, excluding Solr).

For both approaches, the `run_additional` script can be used to generate additional sets of keystores/truststores to be used by other services. So adding mTLS set up for the Transform Service with mTLS already present for Solr is possible with the `run_additional` scripts usage.

A certificates generator script, `run.sh` (for Linux) and `run.cmd` (for Windows) is provided in a GitHub project. The script consists of two parts - the first part is based on OpenSSL (to generate the certificates), and the second part is based on the Java `keytool` (to build the keystores and truststores). Here, we'll focus on running the script for a standalone Linux or Windows operating system.

Before you start, you must already have OpenSSL and `keytool` available in your system path.

1. Browse to the [https://github.com/Alfresco/alfresco-ssl-generator](https://github.com/Alfresco/alfresco-ssl-generator){:target="_blank"} GitHub project and click **Clone** or **Download**.

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

    > **Note:** If the `keystores` folder isn't empty, the script exits without producing any keystore or truststore. You can safely, remove the `keystores` folder if you need to re-run the script.

See [Keystore directory structure]({% link search-services/latest/config/keys.md %}#keystore-directory-structure) for more and [Customize certificate generation]({% link search-services/latest/config/keys.md %}#customize-certificate-generation) for a full list of parameters that allow you to customize your certificates. It is recommended that you set your own passwords when generating certificates.

## Customize certificate generation

The legacy scripts `run.sh` and `run.cmd` have a more rigid structure allowing for less control, though still viable for usage. The new scripts (`run_ca`, `run_encryption`, and `run_additional`) provide a lot more flexibility. They can replace or add onto the previous scripts.

### Legacy script summary

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
|alfrescoformat|classic, current|Default format for certificates: `current` for Alfresco Search and Insight Engine or Alfresco Search Services 2.0.0+, and `classic` for previous versions.|

### New scripts summary

**Script: run_ca**: Generates the Root CA.

|Parameter|Value|Description|
|---------|-----|-----------|
|keysize|2048/4096|Specifies the RSA key length. The default value is `2048`.|
|keystorepass|Any string between 6 and 1023 characters|Specifies the password to the Root CA keystore. A prompt will be shown for the default value.|
|cacertdname| |Sets the Distinguished Name of the CA certificate, starting with a forward-slash. The default value is`/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Alfresco CA`|
|servername|Any string|DNS Names for Root CA. Multiple values can be provided, split by “,”. For example: `localhost`,`additional`. In Windows variant these have to be enclosed in double quotes. The default value is `localhost`.|
|validityduration|Positive integer|Duration of Root CA validity in days. The default value is `365`.|

**Script: run_encryption**: Generates keystore for Repository metadata encryption.

|Parameter|Value|Description|
|---------|-----|-----------|
|servicename|String|Encryption service name. The default value is `encryption`.|
|subfoldername|String|Subfolder name to generate the encryption keystore in. The default value is the same as `servicename`.|
|encstorepass|Any string between 6 and 1023 characters|Specifies the password for the encryption keystore. A prompt will be shown for the default value.|
|encmetadatapass|Any string between 6 and 1023 characters|Specifies the password for the encryption key. Key alias: metadata. A prompt will be shown for the default value.|
|alfrescoformat|classic/current|Default format for certificates: `current` for Search and Insight Engine or Search Services 2.0.0+, and `classic` for previous versions. The default value is `current`. `classic` value settings: Keystore type: JCEKS. Key algorithm: DESede. Creates a password file. `current` value settings: Keystore type: PKCS12, Key algorithm: AES, Keysize: 256, No password file created.|

**Script: run_additional**: Generates a keystore and truststore for a service. Can be ran with assignment of role (client/server) to generate two separate sets of those.

|Parameter|Value|Description|
|---------|-----|-----------|
|servicename|String|Service name. The default value is `service`.|
|subfoldername|String|Subfolder name to generate the keystore and truststore in. The default value is the same as `servicename`.|
|alias|String|Private key alias. The default value is the same as `servicename`.|
|role|client/server/both|Role to be fulfilled by the keystore key, different roles correspond to dedicated settings in `openssl.cnf` file. The default value is `both`.|
|rootcapass|String|Password that has been set for the Root CA, it is mandatory and not set by default. The default value is not set and will result with an exception being thrown.|
|keysize|2048/4096|Specifies the RSA key length. The default value is `2048`.|
|keystoretype|PKCS12/JKS/JCEKS|Sets the type of the keystore (containing private keys). The default value is `JCEKS`.|
|keystorepass|Any string between 6 and 1023 characters|Specifies the password for the keystore. A prompt will be shown for the default value.|
|notruststore|N/A|Flag to turn off generating of the truststore and needs to be defined. The default value is N/A.|
|truststoretype|JKS/JCEKS|Sets the type of the truststore (containing public keys). The default value is `JCEKS`.|
|truststorepass|Any string between 6 and 1023 characters|Specifies the password for the truststore. A prompt will be shown for the default value.|
|certdname|String|Sets the Distinguished Name of the CA certificate, starting with a forward-slash. The default value is `/C=GB/ST=UK/L=Maidenhead/O=Alfresco Software Ltd./OU=Unknown/CN=Custom Service`.|
|servername|String|DNS Names for Service. Multiple values can be provided, split by “,”. For example: `localhost`,`additional`. In Windows, these have to be enclosed in double quotes. The default value is `localhost`.|
|alfrescoformat|classic/current|The default format for certificates is `current` for Search and Insight Engine or Search Services 2.0.0+, and `classic` for previous versions. The main difference is that classic format generates text files containing keystore/truststore password, private key/public key alias, and in case of keystore, also the private key password (which currently has to be the same as the keystore). The default value is `current`.|

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

### Script usage examples

Find sample scripts in [alfresco-ssl-generator](https://github.com/Alfresco/alfresco-ssl-generator) repository [for Linux](https://github.com/Alfresco/alfresco-ssl-generator/tree/master/ssl-tool/samples) and [for Windows](https://github.com/Alfresco/alfresco-ssl-generator/tree/master/ssl-tool-win/samples).

> **Note:** In Windows:
>
> * To run sample scripts you’ll need to move them 1 directory upwards
> * Add keytool to PATH system variable
> * Set 2 environment variables:
>   * `SET OPENSSL_CONF=<path_to_project>\alfresco-ssl-generator\ssl-tool-win\openssl.cnf`
>   * `SET RANDFILE=.rnd`

## Keystore directory structure

For new scripts (`run_ca`, `run_encryption`, or `run_additional`), the folders within `keystores` folder can be specified through the `subfoldername` parameter. The keystore and truststore name will use the `servicename` parameter value to create files. For existing scripts (`run.sh` or `run.cmd`), the `keystores` directory contains the following structure and files:

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

## Repository configuration

Use this information to set up your generated certificates in their correct locations.

Configuration set up for both the server-side and client-side of the repository is provided in the Alfresco Search Services page, [Secure keys]({% link search-services/latest/config/keys.md %}#set-up-certificates).
When using new scripts, make sure the folder path provided in the instruction is replaced with what has been provided in the `subfoldername` parameter of a script.

### Set HttpClient properties

For the full list of available HttpClient properties and services that use them, see [repository documentation]({% link content-services/latest/config/repository.md %}#httpclientproperties).

Mutual TLS is disabled by default, to turn it on you have to change the value of properties `httpclient.config.<service>.mTLSEnabled` to `true` for all services you intend to use with mTLS.

> **Note:** Hostname verification can be disabled for responses with `httpclient.config.<service>.hostnameVerificationDisabled`, by setting it to `true`. Though be aware that disabling it poses a significant security risk.

### Configuration for Transform Service

To enable mTLS, additional configuration must be set for Transform Router, Transform Engines, Transform Aspose, AI Renditions, and Shared File Store.

The following example is for simple transform-core-aio, where only one keystore and truststore is used. If there is a need for separation between server/client behavior, generate an additional set of keystore + truststore pair while determining a specific role for that pair (look up sample usages placed in scripts named “client_server”).

Below is an example of providing values through properties:

```text
#Enable SSL
server.ssl.enabled=true

#Server behavior keystore
server.ssl.key-password=password
server.ssl.key-store=/keystores/tengineAIO/tengineAIO.keystore 
server.ssl.key-store-password=password
server.ssl.key-store-type=JCEKS
#Server behavior truststore
server.ssl.trust-store=/keystores/tengineAIO/tengineAIO.truststore
server.ssl.trust-store-password=password
server.ssl.trust-store-type=JCEKS
#Require inbound communication to provide a certificate
server.ssl.client-auth=need

#Client behavior keystore
client.ssl.key-store=/keystores/tengineAIO/tengineAIO.keystore
client.ssl.key-store-password=password
client.ssl.key-store-type=JCEKS
#Client behavior truststore
client.ssl.trust-store=/keystores/tengineAIO/tengineAIO.truststore
client.ssl.trust-store-password=password
client.ssl.trust-store-type=JCEKS
```

Below is an example providing values through Docker image variables:

1. Add the keystore and truststore files as volumes:

    ```text
    volumes:
        - ${WORKSPACE}/keystores/tengineAIO/tengineAIO.truststore:/tengineAIO.truststore
        - ${WORKSPACE}/keystores/tengineAIO/tengineAIO.keystore:/tengineAIO.keystore
    ```

2. Set environment variables for the Docker image:

    ```text
    #Enable SSL
    SERVER_SSL_ENABLED: "true"

    #Server behavior keystore
    SERVER_SSL_KEY_PASSWORD: "password"
    SERVER_SSL_KEY_STORE: "file:/tengineAIO.keystore"
    SERVER_SSL_KEY_STORE_PASSWORD: "password"
    SERVER_SSL_KEY_STORE_TYPE: "JCEKS"
    #Server behavior truststore
    SERVER_SSL_TRUST_STORE: "file:/tengineAIO.truststore"
    SERVER_SSL_TRUST_STORE_PASSWORD: "password"
    SERVER_SSL_TRUST_STORE_TYPE: "JCEKS"
    #Require inbound communication to provide a certificate
    SERVER_SSL_CLIENT_AUTH: "need"

    #Client behavior keystore
    CLIENT_SSL_KEY_STORE: "file:/tengineAIO.keystore"
    CLIENT_SSL_KEY_STORE_PASSWORD: "password"
    CLIENT_SSL_KEY_STORE_TYPE: "JCEKS"
    #Client behavior truststore
    CLIENT_SSL_TRUST_STORE: "file:/tengineAIO.truststore"
    CLIENT_SSL_TRUST_STORE_PASSWORD: "password"
    CLIENT_SSL_TRUST_STORE_TYPE: "JCEKS"
    ```
