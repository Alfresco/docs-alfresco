---
author: Alfresco Documentation
source: 
---

# Administering Desktop Sync FAQs

Here's a list of common questions about Desktop Sync.

**General**

-   [Does Desktop Sync support Alfresco Records Management?](ds-faqs-admin.md#rm)
-   [Does Desktop Sync support Smart Folders?](ds-faqs-admin.md#sf)
-   [What tools can I use to validate the relative states of the MQ/synchronization server/Desktop Sync data/Alfresco data and the existing sync sets?](ds-faqs-admin.md#1)
-   [What is the starting order of Desktop Sync?](ds-faqs-admin.md#2)
-   [In the event of a conflict, how do I resolve it?](ds-faqs-admin.md#3)
-   [What authentication does Desktop Sync support?](ds-faqs-admin.md#4)

**Monitoring/Logging**

-   [How can I monitor ActiveMQ?](ds-faqs-admin.md#5)
-   [How can I monitor the Sync Service?](ds-faqs-admin.md#6)

**File synchronization**

-   [Why does Desktop Sync connect for content selection then immediately go offline?](ds-faqs-admin.md#9)
-   [What can I check if content can't be added to or updated in Alfresco Content Services via Share or another application?](ds-faqs-admin.md#10)
-   [Why has sync stopped working since upgrading the client operating system \(for example to Mac OS X to Sierra High\)?](ds-faqs-admin.md#11)

**Backup and restore**

-   [What tools can I use if either the desktop or Alfresco needs to restored from a backup?](ds-faqs-admin.md#8)

![](../images/hr.png)

**Does Desktop Sync support Alfresco Records Management?**

No, this version of Desktop Sync doesn't support Alfresco Records Management.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**Does Desktop Sync support Smart Folders?**

No, this version of Desktop Sync doesn't support Smart Folders.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**What tools can I use to validate the relative states of the MQ/synchronization server/Desktop Sync data/Alfresco data and the existing sync sets?**

To bring the synchronization service and Alfresco repository in sync, see [Backing up and restoring Desktop Sync](../tasks/ds-backup-restore.md). Currently, there are no tools that can validate this.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**What is the starting order of Desktop Sync?**

The sequence in which different Desktop Sync components should be started is:

1.  Postgres
2.  ActiveMQ
3.  Alfresco repository \(Share\)
4.  Synchronization service

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**In the event of a conflict, how do I resolve it?**

The [Sync conflict resolution matrix](https://docs.alfresco.com/desktopsync/concepts/ds-conflicts.html) describes how Desktop Sync handles sync conflicts.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**What authentication does Desktop Sync support?**

Desktop Sync supports basic authentication. SAML SSO is currently not supported.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**How can I monitor ActiveMQ?**

Access the ActiveMQ Web Console using `http://<servername>:8161/admin/queues.jsp`.

Make sure that the:

-   name of the subscriber corresponds to the synchronization service ID.
-   total number of **Messages Enqueued** is same as **Messages Dequeued**.

For detailed information, see [How can I monitor ActiveMQ?](http://activemq.apache.org/how-can-i-monitor-activemq.html)

For information on ActiveMQ logging, see [How do I change the logging](http://activemq.apache.org/how-do-i-change-the-logging.html).

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**How can I monitor the Sync Service?**

To monitor the Sync Service, see [synchronization service health check](../concepts/desktop-sync-monitor.md#healthcheck).

To get detailed logging information on synchronization service, change the logging level in the config.yml file as shown below:

```
logging:
 level: DEBUG
loggers:
   "org.alfresco.service.common.auth": DEBUG
   "org.apache.activemq": DEBUG
   "com.sun.jersey.api.container.filter.LoggingFilter": WARN
   "org.alfresco.service": DEBUG
```

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**Why does the Desktop Sync client connect for content selection then immediately go offline?**

If the Desktop Sync client connects to Alfresco to start content selection then immediately goes offline, folders may already have been created, but no files have been synced; check the following:

-   The Desktop Sync service is running
-   The Desktop Sync service is accessible from the client - you can use the [Healthcheck URL](../concepts/desktop-sync-monitor.md#) in the clients browser
-   The global properties file is correctly set up - see [Installing Desktop Sync service](../tasks/desktop-sync-install.md)

For example, if the Sync Service port is not open on the firewall, then the client won't be able to connect to the Desktop Sync service, or the Healthcheck URL. The port is set when [Installing Desktop Sync service](../tasks/desktop-sync-install.md), where the default is 9090.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**What can I check if content can't be added to or updated in Alfresco Content Services via Alfresco Share or another application?**

To fix this issue, check if ActiveMQ is running and available to the repository. See [Desktop Sync prerequisites](../concepts/desktop-sync-prerequisites.md) for more. A feature of the Desktop Sync service is to provide resilience of the service, and ensuring that no critical event information is lost.

The recommendation is to run an ActiveMQ cluster to ensure high availability.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**Why has sync stopped working since upgrading the client operating system \(for example to Mac OS X to Sierra High\)?**

If SSL has been enabled on the Sync Service without provision for a signed certificate, then the clients may fail to sync content. The log files contain a message "SSL peer certificate or SSH remote key was not OK". [Install the Desktop Sync service](../tasks/desktop-sync-install.md) with a valid security certificate or disable SSL for the synchronization server if required.

[back to top](ds-faqs-admin.md#)

![](../images/hr.png)

**What tools can I use if either the desktop or Alfresco needs to restored from a backup?**

See [Backing up and restoring Desktop Sync](../tasks/ds-backup-restore.md).

[back to top](ds-faqs-admin.md#)



