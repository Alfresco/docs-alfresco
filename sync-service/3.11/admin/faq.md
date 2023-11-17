---
title: Sync Service Admin FAQs
---

Here's a list of common questions about administering Sync Service.

## Does Sync Service support Smart Folders

No, this version of Sync Service doesn't support Smart Folders.

## What tools can I use to validate the relative states of the MQ/Sync Service/Desktop Sync data/Alfresco data and the existing sync sets?

To bring the Sync Service and Alfresco Content Services repository in sync, see [Back up and restore Sync Service]({% link sync-service/3.11/admin/index.md %}#back-up-and-restore-sync-service). Currently, there are no tools that can validate this.

## What is the starting order of Sync Service?

The sequence in which different Sync Service components should be started is:

1. Postgres
2. ActiveMQ
3. Alfresco Content Services repository (Share)
4. Sync Service

## In the event of a conflict, how do I resolve it?

The [conflict resolution matrix]({% link desktop-sync/latest/using/sync-conflict-guide.md %}) describes how Desktop Sync handles sync conflicts.

## What authentication do Desktop Sync and Sync Service support?

Alfresco Desktop Sync supports SAML authentication with the Identity Service. See the [Single Sign On Guide]({% link identity-service/latest/tutorial/sso/index.md %}) for more details.

Alfresco Desktop Sync also supports basic authentication with Alfresco Content Services where Identity Service is not being used.

> **Important:** Alfresco Desktop Sync does not support [SAML Module for Alfresco Content Services]({% link saml-module/latest/index.md %}). Users can log in with their credentials using basic authentication, but SAML authentication must not be enforced.

## How can I monitor ActiveMQ?

Access the ActiveMQ Web Console using `http://<servername>:8161/admin/queues.jsp`.

Make sure that the:

* name of the subscriber corresponds to the Sync Service ID.
* total number of **Messages Enqueued** is same as **Messages Dequeued**.

For detailed information, see [How can I monitor ActiveMQ?](https://activemq.apache.org/how-can-i-monitor-activemq.html){:target="_blank"}.

For information on ActiveMQ logging, see [How do I change the logging](https://activemq.apache.org/how-do-i-change-the-logging.html){:target="_blank"}.

## How can I monitor Sync Service?

To monitor Sync Service, see [Sync Service health check]({% link sync-service/3.11/admin/monitor/index.md %}#sync-service-health-check).

To get detailed logging information on Sync Service, change the logging level in the `config.yml` file as shown below:

```bash
logging:
   level: DEBUG
loggers:
   "org.alfresco.service.common.auth": DEBUG
   "org.apache.activemq": DEBUG
   "com.sun.jersey.api.container.filter.LoggingFilter": WARN
   "org.alfresco.service": DEBUG
```

## Why does the Desktop Sync client connect for content selection then immediately go offline?

If the Desktop Sync client connects to Alfresco Content Services to start content selection then immediately goes offline, folders may already have been created, but no files have been synced; check the following:

* The Sync Service is running
* The Sync Service is accessible from the client - you can use the [Healthcheck URL]({% link sync-service/3.11/admin/monitor/index.md %}#sync-service-health-check) in the clients browser
* The global properties file is correctly set up - see [Install Sync Service]({% link sync-service/3.11/install/options.md %}#install-with-zip)

For example, if the Sync Service port is not open on the firewall, then the client won't be able to connect to the Desktop Sync service, or the Healthcheck URL. The port is set when installing the Sync Service, where the default is 9090.

> **Note:** Desktop Sync 1.2 (for Windows and Mac) performs a health check which prevents this from occurring.

## What can I check if content can't be added to or updated in Alfresco Content Services via Alfresco Share or another application?

To fix this issue, check if ActiveMQ is running and available to the repository. See [Prerequisites]({% link sync-service/3.11/install/index.md %}) for more. A feature of the Sync Service is to provide resilience of the service, and ensuring that no critical event information is lost.

The recommendation is to run an ActiveMQ cluster to ensure high availability.

## Why has sync stopped working since upgrading the client operating system (for example to Mac OS X to Sierra High)?

If SSL has been enabled on the Sync Service without provision for a signed certificate, then the clients may fail to sync content. The log files contain a message "SSL peer certificate or SSH remote key was not OK". [Install the Sync Service]({% link sync-service/3.11/install/index.md %}) with a valid security certificate or disable SSL for the synchronization server if required.

## How can I prevent the synchronization of a folder, or folder structure?

You can stop users from synchronizing folders by creating a custom model with an aspect, and then updating the configuration in Alfresco Content Services.

See [Limit folder synchronization]({% link sync-service/3.11/admin/index.md %}#limit-folder-synchronization) for more.

## What tools can I use if either the desktop or Alfresco Content Services needs to restored from a backup?

See [Back up and restore Sync Service]({% link sync-service/3.11/admin/index.md %}#back-up-and-restore-sync-service).
