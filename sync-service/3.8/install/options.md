---
title: Installation options
---

There are several options for installing the Sync Service:

* Install manually using a distribution ZIP
* Install using Helm charts or Docker Compose (i.e. [containerized deployment](#containerized-deployment))

> **Note:** It is recommended that you familiarize yourself with the concepts of containerized deployment before working with Docker, Kubernetes, and Helm.

## Install with zip

Use these instructions to install the Sync Service repository modules and services on Alfresco Content Services.

The Sync Service distribution zip file, `AlfrescoSyncServer-3.8.x.zip`, includes all the files required to provide the Sync Service. This file contains the following artifacts:

* `amps-repository` directory containing the Sync Service repository AMP: `alfresco-device-sync-repo-3.8.x.amp`
* `licenses` directory containing the 3rd-party licenses
* `service-sync` directory with:
  * `service-sync-3.8.x.jar` Sync Service JAR
  * `config.yml` property file
  * `syncservice` start/stop script
  * `sync.jks` SSL keys

> **Note:** The keystore `sync.jks` contains a self-signed certificate that should be used for testing purposes only. You'll need to provide your own SSL keys for a production environment.

> **Note:** Make sure you're running the correct versions of operating system and software before you install the AMP file. See [Prerequisites]({% link sync-service/3.8/install/index.md %}) for more information.

1. Download `AlfrescoSyncServer-3.8.x.zip` from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2. Extract the `AlfrescoSyncServer-3.8.x.zip` file into a system directory; for example, `<installLocation>/`.

    We'll refer to this new directory (`<installLocation>/sync`), as the *Alfresco Sync Service installation directory*. In this directory you'll see these folders:

    * `amps-repository`
    * `licenses`
    * `service-sync`

3. Stop the Alfresco repository.

4. Use the Module Management Tool (MMT) to install the `alfresco-device-sync-repo-3.8.x.amp` AMP into the repository WAR.

    For more information, see instructions in [Install the AMP file]({% link content-services/latest/install/zip/amp.md %}).

    For example, to apply the `alfresco-device-sync-repo-3.8.x.amp`, use the following command:

    ```java
    java -jar <alfrescoInstallLocation>\bin\alfresco-mmt.jar install <installLocation>\amps-repository\alfresco-device-sync-repo-3.8.x.amp <installLocation>\tomcat\webapps\alfresco.war
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

6. Configure the Sync Service properties in the `<installLocation>/service-sync/config.yml` file.

    See [Configure Sync Service]({% link sync-service/3.8/config/index.md %}).

    For example, edit the following properties:

    * repo:

        ```yaml
        hostname: localhost
        ```

        where `repo.hostname` is the IP address of the repository host.

    * messaging:

        ```yaml
        broker:
            host: localhost
        ```

        where `messaging.broker.host` is the IP address of the ActiveMQ host.

    * sql:

        ```yaml
        db:
            url: jdbc:postgresql:alfresco
        ```

        where `sql.db.url` is the URL of the Postgres database.

7. Start and configure PostgreSQL.

    For more information, see [Configuring PostgreSQL database for Desktop Sync]({% link sync-service/3.8/install/database.md %}).

8. Start ActiveMQ.

    If ActiveMQ is down, the repository transactions will fail and rollback. In production environments, it's advisable that you run an ActiveMQ cluster in failover mode to avoid this situation. See [ActiveMQ master/slave configurations](https://activemq.apache.org/masterslave.html){:target="_blank"}.

    For more information, see [Setting up ActiveMQ]({% link content-services/latest/config/activemq.md %}).

9. Start the repository.

    > **Note:** Wait for the repository to fully start before proceeding to the next step.

10. Start the Sync Service.

    For Linux:

    ```bash
    cd <installLocation>/service-sync

    java -Xmx2G -Djava.io.tmpdir=/var/tmp/dsync -classpath <classpath to database.jar file>:service-sync-3.8.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    See [Running Sync Service via a script]({% link sync-service/3.8/config/script.md %}).

    For Windows:

    ```bash
    cd <installLocation>/service-sync

    java -Xmx2G -Djava.io.tmpdir=/users/<username>sync/tmp -classpath <classpath to database.jar file>;service-sync-3.8.x.jar org.alfresco.service.sync.dropwizard.SyncService server config.yml
    ```

    > **Note:** For production systems, you need to configure JMX authentication as password authentication over the Secure Sockets Layer (SSL) is enabled by default. However, in a test environment, you can disable all security, namely both password authentication and SSL, when you start the Java VM. See [Connect to Sync Service through JMX]({% link sync-service/3.8/config/jmx.md %}) for configuration options. For more information, see the [JRE documentation](https://docs.oracle.com/javase/7/docs/technotes/guides/management/agent.html){:target="_blank"}.

    > **Note:** The PostgreSQL JDBC driver must be provided and included in the startup command line as shown above.

    For more information, see [Install and configure PostgreSQL database]({% link sync-service/3.8/install/database.md %}).

11. Access Alfresco Share by browsing to:

    ```http
    http://<hostname>:8080/share
    ```

12. Check the repository and Sync Service log file (`<installLocation>/service-sync/logs/sync-service.log` by default) to see if the Sync Service started properly. The location of the log file can be configured using the `logging` properties in the `config.yml` file.

    To validate that the Sync Service is configured correctly, see [Sync Service health check]({% link sync-service/3.8/admin/monitor/index.md %}#sync-service-health-check).

## SSL certificate for the synchronization server

Alfresco supplies a self-signed certificate with the Sync Service. This certificate is for testing purposes only, and it's not recommended for use in a production system.

## How to disable SSL for the synchronization server

1. In the `applicationConnector` section of the `config.yml` file, comment out or remove the lines from `type: https` to `validateCerts: false`.

    ```yaml
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

See instructions to [install and configure databases]({% link sync-service/3.8/install/database.md %}).

## Containerized deployment

Sync Service can optionally be deployed as part of Alfresco Content Services using Helm charts or a Docker Compose file.

It is recommended that these deployment references are used as an accelerator by customers who have prior production experience with containerized deployment technologies like Docker, Kubernetes and Helm.

Follow these links to find out how to deploy Alfresco Content Services including the Sync Service using Helm charts or Docker Compose:

* [Install with Helm charts]({% link content-services/latest/install/containers/helm.md %})
* [Install with Docker Compose]({% link content-services/latest/install/containers/docker-compose.md %})

Due to the limited capabilities of Docker Compose, this deployment method is recommended for development and test environments only.

## Uninstalling Sync Service

To remove the Sync Service, uninstall the Sync Service AMP file, remove the Sync Service installation, and then remove the ActiveMQ topic.

1. Stop the Alfresco server.

2. Uninstall the Sync Service, AMP file in the repository, for example using the Module Management Tool (MMT):

    ```java
    java -jar bin/alfresco-mmt.jar uninstall alfresco-device-sync-repo-3.8.x.amp tomcat/webapps/alfresco.war
    ```

    [Uninstall an AMP file]({% link content-services/latest/install/zip/amp.md %}#uninstall-an-amp-file) provides information on how to uninstall the AMP file, and remove the AMP content from the WAR files.

3. Delete the Tomcat webapp directory.

    For example, delete `tomcat/webapps/alfresco`.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4. Review the `autoStart` properties in your `alfresco-global.properties` file to ensure that the events and messaging subsystems aren't set to start automatically.

    Uninstalling the AMP file removes any settings applied by the Sync Service repository module, however you should review custom `autoStart` properties to check that they're set to `false`:

    ```bash
    events.subsystem.autoStart=false
    messaging.subsystem.autoStart=false
    ```

5. Ensure that all system services relating to the Sync Service are stopped, disabled or removed. Disable all cron jobs, and ensure there are no active Analytics processes on your server.

    There are four system services to stop:
    * ActiveMQ
    * Event broker
    * Messaging broker
    * Sync Service

6. Ensure that Alfresco Content Services isn't physically connected to the Sync Service installation and that all related functions are disabled.

    You'll physically remove all parts of the Sync Service installation, so you must make sure this doesn't affect the Alfresco Content Services installation. Most Sync Service files are installed in `<installLocation>`), which you chose during installation (for example, `<installLocation>/sync`).

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
