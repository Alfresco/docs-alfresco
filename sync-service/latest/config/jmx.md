---
title: Connect to Sync Service through JMX
---

To connect to Sync Service remotely via a JMX client (for example, using JConsole), you need to start the Sync Service by enabling the JMX remote option and choose whether to disable authentication and/or SSL. This is because password authentication over the Secure Sockets Layer (SSL) and Transport Layer Security (TLS) is enabled by default.

## Insecure JMX connection

You can start the Sync Service with JMX remote enabled and all security disabled, but this isn't recommended for production systems.

1. Start the service with the following Java options by substituting the required host name and ports:

    ```java
    -Dcom.sun.management.jmxremote=true
    -Djava.rmi.server.hostname=<sync-service-IP>
    -Dcom.sun.management.jmxremote.port=<jmx-remote-port>
    -Dcom.sun.management.jmxremote.rmi.port=<jmx-rmi-port>
    -Dcom.sun.management.jmxremote.authenticate=false
    -Dcom.sun.management.jmxremote.ssl=false
    ```

    For example:

    ```bash
    cd <installLocation>/service-sync
    ```

    ```java
    java -Xmx2G -Dcom.sun.management.jmxremote=true -Djava.rmi.server.hostname=34.253.209.238
    -Dcom.sun.management.jmxremote.port=50800 -Dcom.sun.management.jmxremote.rmi.port=50801
    -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false
    -Djava.io.tmpdir=/var/tmp/dsync -cp postgresql.jar:service-sync-5.0.x.jar
    org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    > **Note:** Make sure the ports for `com.sun.management.jmxremote.port` and `com.sun.management.jmxremote.rmi.port` are open. Also, replace `service-sync-5.0.x.jar` with your exact version.

    > **Note:** For production systems, use both SSL client certificates to authenticate the client host, and password authentication for user management, by enabling `com.sun.management.jmxremote.authenticate` and `com.sun.management.jmxremote.ssl`.

2. Start JConsole by typing the following command:

    ```bash
    jconsole
    ```

3. Select **Remote Process**, and enter the Sync Service IP, and `com.sun.management.jmxremote.port` value, as shown in the example below.
4. Click **Connect**.

    ![JConsole - blank credentials]({% link sync-service/images/jconsole-blank.png %})

## JMX connection with authentication

Before enabling the authentication, first you need to create a password file. The file name isn't important. Use the following example for guidance.

> **Note:** If you're using an earlier JDK version than 9, then you'll need to specify the role in a separate `jmx.access` file.

1. Create the file `jmx.password`.

    `jmx.password` is the password file which defines the roles and their passwords.

    To be functional, a role must have an entry in the password file.

2. In the `jmx.password` file, add the role and the desired password.

    For example:

    ```bash
    alfrescoSync password
    ```

3. Change the `jmx.password` permission to read-only for the owner:

    For example:

    ```bash
    sudo chown dsync: jmx.password && sudo chmod 600 jmx.password
    ```

4. Start the Sync Service by enabling authentication, and pass on the path to the created file:

    ```java
    -Dcom.sun.management.jmxremote.authenticate=true
    -Dcom.sun.management.jmxremote.password.file=/path/to/jmx.password
    ```

    For example:

    ```bash
    cd <installLocation>/service-sync
    ```

    ```java
    java -Xmx2G -Dcom.sun.management.jmxremote=true -Djava.rmi.server.hostname=34.253.209.238
    -Dcom.sun.management.jmxremote.port=50800 -Dcom.sun.management.jmxremote.rmi.port=50801
    -Dcom.sun.management.jmxremote.authenticate=true
    -Dcom.sun.management.jmxremote.password.file=/path/to/jmx.password
    -Dcom.sun.management.jmxremote.ssl=false -Djava.io.tmpdir=/var/tmp/dsync
    -cp postgresql.jar:service-sync-5.0.x.jar org.alfresco.service.sync.dropwizard.SyncService
    server config.yml
    ```

    > **Note:** Replace `service-sync-5.0.x.jar` with your exact version.

5. Start JConsole and select **Remote Process**.

6. Enter the Sync Service IP, `com.sun.management.jmxremote.port` value, user name, and password, as shown in the example below.

7. Click **Connect**.

    ![JConsole]({% link sync-service/images/jconsole.png %})

## JMX connection with authentication and SSL

The out-of-the-box Sync Service provides keystore (`sync.jks`) and truststore (`sync.truststore`). The password for the keystore and truststore for the default installation is specified in the `applicationConnectors` section of the `config.yml` file:

```yaml
server:
    applicationConnectors:
         keyStorePassword:
```

The keystore contains a private key and a self-signed certificate for the Sync Service. The truststore contains the self-signed certificate exported from the keystore to create a trust relationship between the Sync Service and itself. In production systems, the truststore usually contains only certificates that are trusted and signed by certificate authorities (CA).

> **Note:** For production systems, it's strongly advised that you use your own SSL key and a certificate that's signed by a certificate authority.

1. Start the Sync Service by enabling SSL and pass on the path, password, and the store type to the keystore and truststore:

    ```java
    -Dcom.sun.management.jmxremote.ssl=true -Djavax.net.ssl.keyStore=/path/to/keystore
    -Djavax.net.ssl.keyStorePassword=<password> -Djavax.net.ssl.keyStoreType=<type>
    -Djavax.net.ssl.trustStore=/path/to/truststore -Djavax.net.ssl.trustStoreType=<type>
    -Djavax.net.ssl.trustStorePassword=<password>
    ```

    For example:

    ```bash
    cd <installLocation>/service-sync
    ```

    ```java
    java -Xmx2G -Dcom.sun.management.jmxremote=true -Djava.rmi.server.hostname=34.253.209.238
    -Dcom.sun.management.jmxremote.port=50800 -Dcom.sun.management.jmxremote.rmi.port=50801
    -Dcom.sun.management.jmxremote.authenticate=true
    -Dcom.sun.management.jmxremote.password.file=/path/to/jmx.password -Dcom.sun.management.jmxremote.ssl=true
    -Djavax.net.ssl.keyStore=/path/to/sync.jks -Djavax.net.ssl.keyStorePassword=<password>
    -Djavax.net.ssl.keyStoreType=JCEKS -Djavax.net.ssl.trustStore=/path/to/sync.truststore
    -Djavax.net.ssl.trustStoreType=JCEKS -Djavax.net.ssl.trustStorePassword=<password>  
    -Djava.io.tmpdir=/var/tmp/dsync -cp postgresql.jar:service-sync-5.0.x.jar org.alfresco.service.sync.dropwizard.SyncService
    server config.yml
    ```

    > **Note:** Replace `service-sync-5.0.x.jar` with your exact version.

2. Copy the Sync Service truststore into your local machine or export the Sync Service certificate into a new truststore. See the example steps in [How to export and import SSL certificate](#how-to-export-and-import-ssl-certificate).

3. Start JConsole:

    ```java
    jconsole -J-Djavax.net.ssl.trustStore=sync.truststore -J-Djavax.net.ssl.trustStoreType=JCEKS -J-Djavax.net.ssl.trustStorePassword=<password>
    ```

4. Select **Remote Process** and enter the Sync Service IP and `com.sun.management.jmxremote.port` valuevalue, user name, and password, as in the earlier example.

## How to export and import SSL certificate

1. Export the certificate from the `sync.jks` keystore.

    For example, you can use the Java keytool (`<JavaInstallationDir>/bin/keytool`):

    ```java
    keytool -exportcert -alias sync -keystore sync.jks -file synccer.cer -storetype jceks -storepass <password>
    ```

    This creates a `synccer.cer` file. This certificate can then be imported into the truststore so you can use it to start the JConsole.

2. Import the certificate into a truststore.

    For example, using the Java keytool:

    ```java
    keytool -importcert -alias sync -file synccer.cer -keystore sync.truststore -storetype JCEKS -storepass <yourPassword>
    ```

    This creates a truststore file of type JCEKS with the name `sync.truststore` (if it doesn't already exist).
