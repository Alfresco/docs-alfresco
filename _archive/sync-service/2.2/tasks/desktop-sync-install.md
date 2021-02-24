---
author: Alfresco Documentation
source: 
audience: 
category: Administration
keyword: configuration
---

# Installing Sync Service

Use these instructions to install the Sync Service repository modules and services on Alfresco.

The Sync Service distribution zip file, called AlfrescoSyncServer-2.2.x.zip, includes all the files required to provide the Sync Service. This file contains the following artifacts:

-   amps-repository directory containing the Sync Service repository AMP, alfresco-device-sync-repo-2.2.x.amp.
-   licenses directory containing the 3rd-party licenses.
-   service-sync directory containing the Sync Service jar \(service-sync-2.2.x.jar\), config.yml property file, alfresco-sync start/stop script, and sync.jks SSL keys.

    **Note:** The keystore `sync.jks` contains a self-signed certificate that should be used for testing purposes only. You'll need to provide your own SSL keys for a production environment.

-   activemq directory containing a bundled ActiveMQ zip file.



1.  Browse to the [Alfresco Support Portal](http://support.alfresco.com) and download AlfrescoSyncServer-2.2.x.zip.

2.  Extract the AlfrescoSyncServer-2.2.x.zip file into a system directory; for example, <installLocation\>/.

    We will refer to this new directory \(<installLocation\>/sync\), as the *Alfresco Sync Service installation directory*. In this directory you will see these folders:

    -   activemq
    -   amps-repository
    -   licenses
    -   service-sync
3.  Stop the Alfresco repository.

4.  Use the Module Management Tool \(MMT\) to install the alfresco-device-sync-repo-2.2.x.amp AMP into the repository WAR. For more information, see instructions in [Install the AMP file](http://docs.alfresco.com/5.0/tasks/dev-extensions-tutorials-simple-module-install-amp.html).

    For example, to apply the alfresco-device-sync-repo-2.2.x.amp, use the following command:

    ```
    java -jar <alfrescoInstallLocation>\bin\alfresco-mmt.jar install <installLocation>\amps-repository\alfresco-device-sync-repo-2.2.x.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

5.  Add the following properties to the alfresco-global.properties file:

    ```
    dsync.service.uris=https://<hostname>:9090/alfresco
    messaging.broker.url=failover:(tcp://localhost:61616)?timeout=3000
    ```

    where:

    -   `dsync.service.uris` specifies the hostname of the Sync Service \(or the load balancer hiding the Sync Service cluster\) that Desktop Sync clients can see. For example, `https://<hostname>:9090/alfresco`.
    -   The `dsync.service.uris` value needs to be set to an IP address or hostname of the Sync Service machine that can be accessed by the Desktop Sync clients outside the firewall. In addition, the port 9090 needs to be opened up in the firewall so that clients can access the Sync Service.
    -   `messaging.broker.url` specifies the location of ActiveMQ.
6.  Configure the Sync Service properties in the <installLocation\>/service-sync/config.yml file. See [Configuring the Sync Service](../concepts/syncservice-configure.md).

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

7.  Start and configure PostgreSQL.

    For more information, see [Configuring PostgreSQL database for Desktop Sync](postgres-config.md).

8.  Start ActiveMQ.

    If ActiveMQ is down, the repository transactions will fail and rollback. In production environments, it is advised that you run an ActiveMQ cluster in a failover mode to avoid this situation. See [ActiveMQ master/slave configurations](http://activemq.apache.org/masterslave.html).

    For more information, see [Setting up ActiveMQ](http://docs.alfresco.com/5.0/tasks/activemq-install.html).

9.  Start the repository.

    **Note:** Wait for the repository to fully start before proceeding to the next step.

10. Start the Sync Service.

    For Linux:

    ```
    cd <installLocation>/service-sync
    
    java -Xmx2G -Djava.io.tmpdir=/var/tmp/dsync -classpath <classpath to database.jar file>:service-sync-2.2.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    See [Running Sync Service via a script](desktop-sync-run-script.md).

    For Windows:

    ```
    cd <installLocation>/service-sync
    
    java -Xmx2G -Djava.io.tmpdir=/users/<username>sync/tmp -classpath <classpath to database.jar file>;service-sync-2.2.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    **Note:** For production systems, you need to configure JMX authentication as password authentication over the Secure Sockets Layer \(SSL\) is enabled by default. However, in the test environment, you can disable all security, namely both password authentication and SSL, when you start the Java VM. See [Connecting to Sync Service through JMX](ds-jmx-access.md) for configuration options. For more information, see the [JRE documentation](http://docs.oracle.com/javase/7/docs/technotes/guides/management/agent.html).

    **Note:** The PostgreSQL JDBC driver must be provided and included in the startup command line as shown above.

    For more information, see [Installing and configuring PostgreSQL database](postgres-config.md).

11. Access Alfresco Share by browsing to:

    ```
    http://<hostname>:8080/share
    ```

12. Check the repository and Sync Service log file \(by default <installLocation\>\\service-sync\\logs\\sync-service.log\) to see if the Sync Service started properly. The location of the log file can be configured using the *logging* properties in the config.yml file.

    To validate that the Sync Service is configured correctly, see [Sync Service health check](../concepts/desktop-sync-monitor.md#healthcheck).


**SSL certificate for the synchronization server**

Alfresco supplies a self-signed certificate with the Sync Service. This certificate is for testing purposes only, and it's not recommended for use in a production system.

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


-   **[Configuring the Sync Service](../concepts/syncservice-configure.md)**  
The out-of-the-box Sync Service provides an SSL key but it is recommended that you use your own SSL key. To configure the Sync Service, update the `server.applicationConnectors.http.keyStore*` properties in the sync/service-sync/config.yml file.
-   **[Installing and configuring databases](../concepts/syncservice-db-config.md)**  
Use these instructions to install and configure a database for Sync Service.
-   **[Connecting to Sync Service through JMX](../tasks/ds-jmx-access.md)**  
To connect to Sync Service remotely via a JMX client \(for example, using JConsole\), you need to start the Sync Service by enabling the JMX remote option and choose whether to disable authentication and/or SSL. This is because password authentication over the Secure Sockets Layer \(SSL\) and Transport Layer Security \(TLS\) is enabled by default.

**Parent topic:**[Installing and configuring Sync Service](../concepts/desktopsync-admin.md)

