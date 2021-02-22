---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Installing Desktop Sync service

Use these instructions to install the Desktop Sync repository modules and services on Alfresco Content Services.

The Desktop Sync distribution zip file, called AlfrescoSyncServer-2.1.1.zip, includes all the files required to provide the synchronization service. This file contains the following artifacts:

-   amps-repository directory containing the Desktop Sync repository AMP, alfresco-device-sync-repo-2.1.1.amp.
-   licenses directory containing the 3rd-party licenses.
-   service-sync directory containing the synchronization service jar \(service-sync-2.1.1.jar\), config.yml property file, alfresco-sync start/stop script, and sync.jks SSL keys.
-   activemq directory containing a bundled ActiveMQ zip file.

1.  Stop the Alfresco repository.

2.  Browse to the [Alfresco Support Portal](http://support.alfresco.com) and download AlfrescoSyncServer-2.1.1.zip.

3.  Extract the AlfrescoSyncServer-2.1.1.zip file into a system directory; for example, <installLocation\>/.

    We will refer to this new directory \(<installLocation\>/sync\), as the *Alfresco Desktop Sync installation directory*. In this directory you will see these folders:

    -   activemq
    -   amps-repository
    -   licenses
    -   service-sync
4.  Use the Module Management Tool \(MMT\) to install the alfresco-device-sync-repo-2.1.1.amp AMP into the repository WAR. For more information, see instructions in [Install the AMP file](http://docs.alfresco.com/5.0/tasks/dev-extensions-tutorials-simple-module-install-amp.html).

    For example, to apply the alfresco-device-sync-repo-2.1.1.amp, use the following command:

    ```
    java -jar <alfrescoInstallLocation>\bin\alfresco-mmt.jar install <installLocation>\amps-repository\alfresco-device-sync-repo-2.1.1.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

5.  Add the following properties to the alfresco-global.properties file:

    ```
    dsync.service.uris=https://<hostname>:9090/alfresco
    messaging.broker.url=failover:(tcp://localhost:61616)?timeout=3000
    ```

    where:

    -   `dsync.service.uris` specifies the hostname of the sync service that Desktop Sync clients can see, for example, `https://172.29.100.12:9090/alfresco`.
    -   The `dsync.service.uris` value needs to be set to an IP address or hostname of the synchronization service machine that can be accessed by the Desktop Sync clients outside the firewall. In addition, the port 9090 needs to be opened up in the firewall so that clients can access the synchronization service.
    -   `messaging.broker.url` specifies the location of ActiveMQ.
6.  Configure the synchronization service properties in the <installLocation\>/service-sync/config.yml file. See [Configure synchronization service](../concepts/syncservice-configure.md).

    For example, edit the following properties:

    -   repo:

        ```
            hostname: localhost
        ```

        where `repo.hostname` is the IP address of the repository host.

    -   messaging:

        ```
            broker:
                host: localhost
        ```

        where `messaging.broker.host` is the IP address of the ActiveMQ host.

    -   sql:

        ```
            db:
                url: jdbc:postgresql:alfresco
        ```

        where `sql.db.url` is the URL of the Postgres database.

7.  Start PostgreSQL.

    For more information, see [Configuring PostgreSQL database for Desktop Sync](postgres-config.md).

8.  Create a Postgres user and database.

    1.  Create a Postgres user with the username given by the sync property, `sql.db.username`, with password given by the sync property, `sql.db.password`.

        ```
        CREATE USER alfresco WITH PASSWORD 'admin';
        ```

    2.  Create a Postgres database with the name given in the property, `sql.db.url`, owned by the user, `alfresco`.

        ```
        CREATE DATABASE alfresco OWNER alfresco;
        GRANT ALL PRIVILEGES ON DATABASE alfresco TO alfresco;
        ```

9.  Start ActiveMQ.

    If ActiveMQ is down, the repository transactions will fail and rollback. In production environment, it is advised that you run an ActiveMQ cluster in a failover mode to avoid this situation. See [ActiveMQ master/slave configurations](http://activemq.apache.org/masterslave.html).

    For more information, see [Setting up ActiveMQ](http://docs.alfresco.com/5.0/tasks/activemq-install.html).

10. Start the repository.

    **Note:** Wait for the repository to fully start before proceeding to the next step.

11. Start the synchronization service.

    For Linux:

    ```
    cd <installLocation>/service-sync
    java -Xmx2G -Djava.io.tmpdir=/var/tmp/dsync -classpath <classpath to postgresql.jar file>:service-sync-2.1.1.jar 
    org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    For Windows:

    ```
    cd <installLocation>/service-sync
    java -Xmx2G -Djava.io.tmpdir=/users/<user name>/sync/tmp -classpath <classpath to postgresql.jar file>;service-sync-2.1.1.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    **Note:** For production systems, you need to configure JMX authentication as password authentication over the Secure Sockets Layer \(SSL\) is enabled by default. However, in the test environment, you can disable all security, namely both password authentication and SSL, when you start the Java VM. See [Connecting to sync service through JMX](ds-jmx-access.md) for configuration options. For more information, see the [JRE documentation](http://docs.oracle.com/javase/7/docs/technotes/guides/management/agent.html).

    **Note:** The synchronization service database is used only by the synchronization service. It's not shared with the repository.

    **Note:** The synchronization service uses the value of `java.io.tmpdir` to store files relating to its operation. This needs to be set to a directory that's not cleaned up during reboots. Make sure you set `java.io.tmpdir` to a directory that's durable because the synchronization service writes files used in its operation into that directory. Don't set it to the `/tmp` directory on a Linux server because the files are likely to be removed on a reboot of the server.

    For example, for Linux, set `java.io.tmpdir` to /home/sync/tmp, and for Windows, set `java.io.tmpdir` to /users/<user name\>/sync/tmp.

    **Note:** The PostgreSQL JDBC driver must be provided and included in the startup command line as shown above. Make sure you download the appropriate driver compatible with JDBC41 from the [PostgreSQL JDBC Driver download page](https://jdbc.postgresql.org/download.html).

12. Access Alfresco Share by browsing to:

    ```
    http://<your-server-name>:8080/share
    ```

13. Check the repository and synchronization service log file \(by default <installLocation\>\\service-sync\\logs\\sync-service.log\) to see if the synchronization service started properly. The location of the log file can be configured using the *logging* properties in the config.yml file.

    To validate that the synchronization service is configured correctly, see [synchronization service health check](../concepts/desktop-sync-monitor.md#healthcheck).


**SSL certificate for the synchronization server**

Alfresco supplies a self-signed certificate with the Desktop Sync Service. This certificate is for testing purposes only, and it's not recommended for use in a production system.

**How to disable SSL for the synchronization server**

1.  In the `applicationConnector` section of the config.yml file, comment out or remove the lines from `type: https` to `validateCerts: false`.

    ```
    server:
        type: default
        applicationConnectors:
            - type: http
              port: 9090
            # type: https
            # keyStorePath: ./sync.jks
            # keyStorePassword: N9SnIgrcAx7zWr
            # keyStoreType: JCEKS
            # validateCerts: false
    ```

2.  For the `dsync.service.uris` property, replace `https` with `http` in the alfresco-global.properties file.

    For example, `dsync.service.uris=http://localhost:9090/alfresco`.


-   **[Configuring synchronization service](../concepts/syncservice-configure.md)**  
The out-of-the-box synchronization service provides an SSL key but it is recommended that you use your own SSL key. To configure synchronization service, update the `server.applicationConnectors.http.keyStore*` properties in the sync/service-sync/config.yml file.
-   **[Installing and configuring PostgreSQL database for Desktop Sync](../tasks/postgres-config.md)**  
Use these instructions to install and configure PostgreSQL database for Desktop Sync.
-   **[Connecting to sync service through JMX](../tasks/ds-jmx-access.md)**  
To connect to sync service remotely via a JMX client \(for example, using JConsole\), you need to start the sync service by enabling the JMX remote option and choose whether to disable authentication and/or SSL. This is because password authentication over the Secure Sockets Layer \(SSL\) and Transport Layer Security \(TLS\) is enabled by default.

**Parent topic:**[Installing and configuring Desktop Sync](../concepts/desktopsync-admin.md)

