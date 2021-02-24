---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Configuration]
keyword: [desktop sync, overview]
---

# Desktop Sync process

When you log in to Desktop Sync for the first time, your device gets registered using the REST API in the repository Sync AMP. This creates an association in the repository between the person node and the device node.

Furthermore, when you subscribe to a folder, this creates an association representing the node that you have subscribed to.

The repository sends events to an ActiveMQ topic when:

-   a device is registered or de-registered
-   a node subscription is created or removed
-   a node is added
-   a node is removed
-   a node is renamed
-   a node is moved
-   node content is changed
-   node Permissions are changed
-   User / Group is added to new or existing group
-   User / Group is removed from a group
-   a node is checked out, checked in and cancelled checked out
-   a file / Folder is classified \(requires Records Management\)
-   a file is declared as Record \(requires Records Management\)

**Important:** If ActiveMQ is unavailable, the Alfresco instance will become read-only and no transactions will be committed.

The synchronization service consumes the events from the topic and persists them to the synchronization server PostgreSQL database. This is transactional - so if Postgres is down or unavailable, the events will remain in the ActiveMQ topic and the synchronization service will retry until the events have been successfully persisted to the database.

When a user subscribes to a folder in the repository, the Desktop Sync client performs a tree-walk against the repository \(using the CMIS API\). The folder structure and content is synced to the Desktop Sync client device. The Desktop Sync client will then poll the synchronization service for changes every 5 minutes, by default. Changes on the device will trigger a poll of the synchronization service for changes. The synchronization service responds with a set of events that represent what has changed in that folder since the last poll request. Based on that, the client determines what changes need to be pushed to the repository, what changes need to be pulled from the repository and which content is in conflict.

Note that the synchronization service doesn't store any authentication information, instead it proxies \(and caches for a configurable period of time\) authentication from Desktop Sync client poll requests to the repository authentication APIs.

**Note:** In this release of Sync Service, only basic authentication is supported.

**Parent topic:**[Desktop Sync overview](../concepts/desktop-sync-overview.md)

