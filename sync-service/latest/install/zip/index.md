---
title: Install with Zip
---

Use these instructions to install the Sync Service repository modules and services on Alfresco Content Services.

The Sync Service distribution zip file, `AlfrescoSyncServer-3.3.x.zip`, includes all the files required to provide the Sync Service. This file contains the following artifacts:

* `amps-repository` directory containing the Sync Service repository AMP, `alfresco-device-sync-repo-3.3.x.amp`.
* `licenses` directory containing the 3rd-party licenses.
service-sync directory containing the Sync Service jar (`service-sync-3.3.x.jar`), `config.yml` property file, `alfresco-sync` start/stop script, and `sync.jks` SSL keys.

> **Note:** The keystore `sync.jks` contains a self-signed certificate that should be used for testing purposes only. You'll need to provide your own SSL keys for a production environment.

> **Note:** Make sure you're running the correct versions of operating system and software before you install the AMP file. See [Prerequisites]({% link sync-service/latest/install/index.md %}) for more information.

1. Browse to the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"} and download `AlfrescoSyncServer-3.3.x.zip`.

2. Extract the `AlfrescoSyncServer-3.3.x.zip` file into a system directory; for example, `<installLocation>/`.

    We will refer to this new directory (`<installLocation>/sync`), as the *Alfresco Sync Service installation directory*. In this directory you'll see these folders:

    * `amps-repository`
    * `licenses`
    * `service-sync`

3. Stop the Alfresco repository.

4. Use the Module Management Tool (MMT) to install the `alfresco-device-sync-repo-3.3.x.amp` AMP into the repository WAR. For more information, see instructions in [Install the AMP file](https://docs.alfresco.com/5.0/tasks/dev-extensions-tutorials-simple-module-install-amp.html){:target="_blank"}(#LINK).

    For example, to apply the `alfresco-device-sync-repo-3.3.x.amp`, use the following command:

    ```bash
    java -jar <alfrescoInstallLocation>\bin\alfresco-mmt.jar install <installLocation>\amps-repository\alfresco-device-sync-repo-3.3.x.amp <installLocation>\tomcat\webapps\alfresco.war
    ```

5. Add the following properties to the `alfresco-global.properties` file:

    ```bash
    dsync.service.uris=https://<hostname>:9090/alfresco
    messaging.broker.url=failover:(tcp://localhost:61616)?timeout=3000
    ```

    where:

    * `dsync.service.uris` specifies the hostname of the Sync Service (or the load balancer hiding the Sync Service cluster) that Desktop Sync clients can see. For example, `https://<hostname>:9090/alfresco`.
    * The `dsync.service.uris` value needs to be set to an IP address or hostname of the Sync Service machine that can be accessed by the Desktop Sync clients outside the firewall. In addition, the port 9090 needs to be opened up in the firewall so that clients can access the Sync Service.
    * `messaging.broker.url` specifies the location of ActiveMQ.

6. Configure the Sync Service properties in the `<installLocation>/service-sync/config.yml` file. See [Configure Sync Service]({% link sync-service/latest/config/index.md %}).

    For example, edit the following properties:

    * repo:

        ```bash
            hostname: localhost
        ```

        where `repo.hostname` is the IP address of the repository host.

    * messaging:

        ```bash
            broker:
                host: localhost
        ```

        where `messaging.broker.host` is the IP address of the ActiveMQ host.

    * sql:

        ```bash
            db:
                url: jdbc:postgresql:alfresco
        ```

        where `sql.db.url` is the URL of the Postgres database.

7. Start and configure PostgreSQL.

    For more information, see [Configuring PostgreSQL database for Desktop Sync]({% link sync-service/latest/install/database/index.md %}).

8. Start ActiveMQ.

    If ActiveMQ is down, the repository transactions will fail and rollback. In production environments, it is advised that you run an ActiveMQ cluster in a failover mode to avoid this situation. See [ActiveMQ master/slave configurations](https://activemq.apache.org/masterslave.html){:target="_blank"}.

    For more information, see [Setting up ActiveMQ](https://docs.alfresco.com/6.0/tasks/activemq-install.html){:target="_blank"}(#LINK).

9. Start the repository.

    > **Note:** Wait for the repository to fully start before proceeding to the next step.

10. Start the Sync Service.

    For Linux:

    ```bash
    cd <installLocation>/service-sync

    java -Xmx2G -Djava.io.tmpdir=/var/tmp/dsync -classpath <classpath to database.jar file>:service-sync-3.3.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    See [Running Sync Service via a script]({% link sync-service/latest/config/script.md %}).

    For Windows:

    ```bash
    cd <installLocation>/service-sync

    java -Xmx2G -Djava.io.tmpdir=/users/<username>sync/tmp -classpath <classpath to database.jar file>;service-sync-3.3.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    > **Note:** For production systems, you need to configure JMX authentication as password authentication over the Secure Sockets Layer (SSL) is enabled by default. However, in a test environment, you can disable all security, namely both password authentication and SSL, when you start the Java VM. See [Connect to Sync Service through JMX]({% link sync-service/latest/config/jmx.md %}) for configuration options. For more information, see the [JRE documentation](https://docs.oracle.com/javase/7/docs/technotes/guides/management/agent.html){:target="_blank"}.

    > **Note:** The PostgreSQL JDBC driver must be provided and included in the startup command line as shown above.

    For more information, see [Install and configure PostgreSQL database]({% link sync-service/latest/install/database/index.md %}).

11. Access Alfresco Share by browsing to:

    ```bash
    http://<hostname>:8080/share
    ```

12. Check the repository and Sync Service log file (`<installLocation>/service-sync/logs/sync-service.log` by default) to see if the Sync Service started properly. The location of the log file can be configured using the `logging` properties in the `config.yml` file.

    To validate that the Sync Service is configured correctly, see [Sync Service health check]({% link sync-service/latest/admin/index.md %}).

## SSL certificate for the synchronization server

Alfresco supplies a self-signed certificate with the Sync Service. This certificate is for testing purposes only, and it's not recommended for use in a production system.

## How to disable SSL for the synchronization server

1. In the `applicationConnector` section of the config.yml file, comment out or remove the lines from `type: https` to `validateCerts: false`.

    ```bash
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

2. For the `dsync.service.uris` property, replace `https` with `http` in the alfresco-global.properties file.

    For example, `dsync.service.uris=http://localhost:9090/alfresco`.

## Install and configure databases

The Sync Service is not packaged with a database driver, so it will need to be downloaded separately and cited in the start-up.

See instructions to [install and configure databases]({% link sync-service/latest/install/database/index.md %}).

<!--![]({% link sync-service/images/hr.png %})-->

## Uninstalling Sync Service

To remove the Sync Service, uninstall the Sync Service AMP file, remove the Sync Service installation, and then remove the ActiveMQ topic.

These instructions apply to both Alfresco Content Services and Alfresco One.

1. Stop the Alfresco server.

2. Uninstall the Sync Service, AMP file in the repository, for example using the Module Management Tool (MMT):

    ```bash
    java -jar bin/alfresco-mmt.jar ﻿uninstall alfresco-device-sync-repo-3.3.x.amp tomcat/webapps/alfresco.war
    ```

    [Uninstall an AMP file](https://docs.alfresco.com/5.0/tasks/uninstall-amp.html){:target="_blank"}(#LINK) provides information on how to uninstall the AMP file, and remove the AMP content from the WAR files.

3. Delete the Tomcat webapp directory.

    For example, delete `tomcat/webapps/alfresco`.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4. Review the `autoStart` properties in your alfresco-global.properties file to ensure that the events and messaging subsystems are not set to start automatically.

    Uninstalling the AMP file removes any settings applied by the Sync Service repository module, however you should review custom `autoStart` properties to check that they are set to `false`:

    ```bash
    events.subsystem.autoStart=false
    messaging.subsystem.autoStart=false
    ```

5. Ensure that all system services relating to the Sync Service are stopped, disabled or removed. Disable all cron jobs, and ensure there are no active Analytics processes on your server.

    There are four system services to stop: ActiveMQ, event and messaging broker, and the Sync Service.

6. Ensure that Alfresco Content Services is not physically connected to the Sync Service installation and that all related functions are disabled.

    You will physically remove all parts of the Sync Service installation, so you must make sure this does not affect the Alfresco Content Services installation. Most Sync Service files are installed in `<installLocation>`), which you chose during installation (for example, `<installLocation>/sync`).

7. Remove the Sync Service installation and database.

    Navigate to the Sync Service installation directory. Remove all Sync Service files by running the `rm -rf` command, or run this command from another directory:

    ```bash
    rm -rf /<installLocation>/sync
    ```

8. Using the ActiveMQ Console, remove the ActiveMQ topic and queues matching the following names:

    ```bash
    Queue Consumer.*.VirtualTopic.alfresco.repo.events.nodes
    Topic VirtualTopic.alfresco.repo.events.nodes
    ```
