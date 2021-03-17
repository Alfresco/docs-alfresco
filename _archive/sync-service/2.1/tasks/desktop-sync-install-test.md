---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Setting up test instance of Desktop Sync service

Use these instructions to install the Desktop Sync test instance with default Alfresco Content Services \(using PostgreSQL\).

The Desktop Sync distribution zip file, called AlfrescoSyncServer-2.1.1.zip, includes all the files required to provide the synchronization service. This file contains the following artifacts:

-   amps-repository directory containing the Desktop Sync repository AMP, alfresco-device-sync-repo-2.1.1.amp.
-   licenses directory containing the 3rd-party licenses.
-   service-sync directory containing the synchronization service jar \(service-sync-2.1.1.jar\), config.yml property file, alfresco-sync start/stop script, and sync.jks SSL keys.
-   activemq directory containing a bundled ActiveMQ zip file.

1.  Stop the Alfresco repository.

2.  Extract the AlfrescoSyncServer-2.1.1.zip file into a system directory; for example, <installLocation\>/.

    We will refer to this new directory \(<installLocation\>/sync\), as the *Alfresco Desktop Sync installation directory*. In this directory you will see these folders:

    -   activemq
    -   amps-repository
    -   licenses
    -   service-sync
3.  Use the Module Management Tool \(MMT\) to install the alfresco-device-sync-repo-2.1.1.amp AMP into the repository WAR. For more information, see instructions in [Install the AMP file](http://docs.alfresco.com/5.0/tasks/dev-extensions-tutorials-simple-module-install-amp.html).

    For example, to apply the alfresco-device-sync-repo-2.1.1.amp, use the following command:

    ```
    java -jar <alfrescoInstallLocation>\bin\alfresco-mmt.jar install <installLocation>\amps-repository\alfresco-device-sync-repo-2.1.1.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

4.  Add the following properties to the alfresco-global.properties file:

    ```
    dsync.service.uris=https://<ip address>:9090/alfresco
    messaging.broker.url=failover:(tcp://localhost:61616)?timeout=3000
    ```

    where:

    -   `dsync.service.uris` specifies the public IP address of the sync service that desktop sync clients can see, for example, `https://172.29.100.12:9090/alfresco`.
    -   `messaging.broker.url` specifies the location of ActiveMQ.
5.  Configure the synchronization service properties in the <installLocation\>/service-sync/config.yml file. See [Configure synchronization service](../concepts/syncservice-configure.md).

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

6.  Start ActiveMQ.

    For more information, see [Setting up ActiveMQ](http://docs.alfresco.com/5.0/tasks/activemq-install.html).

7.  Start the repository.

8.  Start the synchronization service.

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

9.  Access Alfresco Share by browsing to:

    ```
    http://<your-server-name>:8080/share
    ```

10. Check the repository and synchronization service log file \(by default <installLocation\>\\service-sync\\logs\\sync-service.log\) to see if the synchronization service started properly. The location of the log file can be configured using the *logging* properties in the config.yml file.


**Parent topic:**[Installing and configuring Desktop Sync](../concepts/desktopsync-admin.md)

