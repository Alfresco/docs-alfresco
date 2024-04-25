---
title: Configure Sync Service
---

Use this information to configure Sync Service.

You can also find additional information in:

* [Connect to Sync Service through JMX]({% link sync-service/4.0/config/jmx.md %})
* [Run Sync Service via a script]({% link sync-service/4.0/config/script.md %})

## Required properties

The out-of-the-box Sync Service provides an SSL key but it's recommended that you use your own SSL key.

To configure the Sync Service, update the `server.applicationConnectors.http.keyStore*` properties in the `sync/service-sync/config.yml` file.

The following table lists the Sync Service properties:

| Property | Description |
| -------- | ----------- |
| repo.scheme | *Required.* Specifies the repository URL scheme. The default value is `http`. |
| repo.hostname | *Required.* Specifies the repository hostname. The default value is `localhost`. |
| messaging.broker.host | *Required.* Specifies the ActiveMQ broker hostname. |
| messaging.broker.port | *Required.* Specifies the ActiveMQ broker port. |
| sql.db.url | *Required.* Specifies the sync database URL. |
| sql.db.username | *Required.* Specifies the sync database username. |
| sql.db.password | *Required.* Specifies the sync database password. |

## Optional properties

You can modify the installation, depending on your requirements, using the following optional properties in the `<installLocation>/service-sync/config.yml` file:

| Property | Description |
| -------- | ----------- |
| messaging.events.repo.node.maxConsumers |  Specifies the maximum size of the event consumer thread pool. Increase this to provide more threads for event consumption. |
| messaging.events.repo.node.numConsumers | Specifies the initial size of the event consumer thread pool. Depending on the load it will increase up to `maxConsumers`. |
| sync.health.events.eventLagTolerance | Specifies the event lag the synchronization service events health check will tolerate before displaying a warning (default is 5000ms). |
| sync.authentication.basicAuthUrl | Specifies the standard repository authentication URL that the synchronization service uses to authenticate sync requests. |
| sync.authentication.cache.expiryMs | Specifies the expiry time (in ms) of the synchronization service authentication cache. Setting this higher than the default client polling time (5 minutes) should ensure that sync requests do not need to re-authenticate with the repository very often, at the cost of more memory use. |
| sync.cleanup.keepPeriod | Specifies the length of time events are retained before being deleted (default is 28 days). |
| sync.cleanup.events.schedulerExpression | Specifies a cron expression used by Quartz to trigger the jobs that delete old node events, namely events that are older than a configured number of days/hours/minutes (see property `sync.cleanup.events.keepPeriod`). The default value is `0 0 * ? * *` (every hour). For more information about the cron expression, see the [CronTrigger tutorial](https://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/tutorial-lesson-06.html){:target="_blank"}. |
| sync.cleanup.events.numThreads | Specifies the maximum number of threads to use for event cleanup. |
| sync.cleanup.events.batchSize | Specifies the batch size for event cleanup. |
| sync.cleanup.events.maxItems | Specifies the maximum number of events that will be deleted once the cleaning job is triggered. |
| sync.cleanup.authEvents.schedulerExpression | Specifies a cron expression used by Quartz to trigger the jobs that delete old authority events. These are events that don't apply to a specific node, such as events generated when a group is deleted. The default value is `0 0 */4 ? * *`(every 4 hours). |
| sync.cleanup.txns.schedulerExpression | Specifies a cron expression used by Quartz to trigger the jobs that delete old transaction entries. The default value is `0 0 0-7 ? * *` (every hour between 00:00 and 7:00). |
| logging.level | Specifies the synchronization service logging level. |
| messaging.events.repo.node.redelivery.numRetries | Specifies the maximum number of redelivery attempts allowed to be performed by Apache Camel before the message is exhausted and is moved to the dead letter queue. `0` disables redelivery, and `-1` attempts redelivery forever until it succeeds. **Note:** This is an Apache Camel redelivery attempt, not ActiveMQ. ActiveMQ will try to redeliver the message based on the `jms.redeliveryPolicy.maximumRedeliveries` property which is appended to the `messaging.broker.url`. For example, if the Sync Service is terminated in the middle of a repository transaction, the Apache Camel redelivery configuration will have no effect. Also, Apache Camel will not redeliver the message if an exception of type `DoNotRetryException` occurs. |
| messaging.broker.url | Specifies the ActiveMQ connector URL. Set the value to specify your ActiveMQ location, and connection protocol. Optionally, you can override the default ActiveMQ options, such as `maximumRedeliveries` (default value is 6). |
| sync.metrics.reporter.graphite.address | IP/hostname of the [Graphite](https://github.com/hopsoft/docker-graphite-statsd){:target="_blank"} server where the Sync Service metrics will be sent|
| sync.metrics.reporter.graphite.enabled | Sets whether sending metrics to Graphite is enabled or not. |
| sync.metrics.reporter.graphite.pollingInterval | The amount of time between polls (in seconds). After every `<pollingInterval>` Graphite will receive a new batch of metrics from the Sync Service. |
| sync.metrics.reporter.graphite.prefix | Prefix used to prepend Sync Service metrics with. |
| sync.metrics.reporter.graphite.port | Port of the Carbon receiver. Carbon is one of the components of Graphite, and is responsible for receiving metrics over the network and writing them to disk using a storage backend. |

### Overriding ActiveMQ default properties via messaging.broker.url

Example: `jms.redeliveryPolicy.maximumRedeliveries`

This property specifies the maximum number of times a message will be redelivered by ActiveMQ before it is considered a poisoned pill and returned to the broker, so it can go to a Dead Letter Queue (DLQ).

* `0` is used to disable redelivery
* `-1` is used for unlimited redeliveries

The property can be appended to `messaging.broker.url`. It's recommended that you set it to the `messaging.events.repo.node.maxConsumers` value, so that when the Sync Service is terminated in the middle of a repository transaction, the message goes back to the broker queue rather than the dead letter queue. By doing this, when the Sync Service comes back online, the broker sends the message again.

For example:

```bash
failover:(tcp://localhost:61616?wireFormat.maxInactivityDurationInitalDelay=30000)?timeout=3000&jms.useCompression=true&startupMaxReconnectAttempts=0&jms.redeliveryPolicy.maximumRedeliveries=10
```

> **Note:** This redelivery is performed by ActiveMQ, not Apache Camel (i.e `messaging.events.repo.node.redelivery.numRetries`). To put this into perspective, consider a scenario where a message can't be acknowledged because of a DB exception. First, Apache Camel attempts to redeliver the message up to the maximum configured value. If it doesn't succeed, the message goes back to the broker, and Apache Camel resets its redelivery counter. Then, the broker attempts to redeliver the message based on its configured value (`jms.redeliveryPolicy.maximumRedeliveries`), if each time the message is sent and not acknowledged; Apache Camel again attempts to redeliver up to the maximum configured value. After all the redelivery attempts performed by Camel and ActiveMQ, the message is sent to the Dead Letter Queue.

## SAML configuration

Alfresco Desktop Sync users can authenticate through a SAML identity provider.

The following prerequisites are required - see the [Supported platforms]({% link sync-service/4.0/support/index.md %}) page for specific versions:

* Alfresco Content Services
* Identity Service
* Alfresco Desktop Sync for Mac or Windows

Sync Service supplies the default configuration set in the `alfresco.global.properties` file directly to the Desktop Sync clients as users start the initial login.

See [Setting up Desktop Sync (Windows)]({% link desktop-sync/latest/install/index.md %}#install/windows/setting-up-desktop-sync-on-windows) and [Setting up Desktop Sync (Mac)]({% link desktop-sync/latest/install/index.md %}#install/mac/setting-up-desktop-sync-on-mac) for further details.

The Identity Service may be configured with multiple applications. If an application is created for Alfresco Desktop Sync, then specific configuration properties must be included in the `sync/service-sync/config.yml` file.

| Property | Description |
| -------- | ----------- |
| identity-service.auth-server-url | The base URL of the Identity Service. Example setting: `https://ids.example.com/auth` |
| identity-service.realm | The realm name configured in the Identity Service for Alfresco applications. Example setting: `alfresco` |
| identity-service.resource | The OAuth2 **Client ID** set up in the Identity Service for Alfresco Desktop Sync. Each application has a Client ID that's used to identify the application. The client needs to exist underneath the realm set for `identity-service.realm`. Example setting: `desktop-sync` |
| identity-service.credentials.secret | The secret key for this client if the access type isn't set to public. |
