---
title: Installation overview
---
Installing Alfresco Search and Insight Engine introduces additional features, including new sharding methods and sharding with SSL. Mutual TLS is not just used to encrypt data in transit, it is also used as an authentication mechanism between the repository and Search and Insight Engine.

It is possible to deploy Alfresco Content Services without mutual TLS between the repository and Search and Insight Engine, however this will expose internal APIs that give full access to the repository without authentication. In such a setup, it is critical to properly protect these APIs.

You may choose to secure Search and Insight Engine with SSL.

> **Note:** When choosing to secure Search and Insight Engine with SSL, be aware that there is a known issue when using Solr 6 where the SSL truststore and keystore passwords are visible as plain text in the Solr 6 process arguments. Alfresco recommends that you ensure the server running Solr 6 is security hardened and access is restricted to admin users only. For more information, see [Apache](https://issues.apache.org/jira/browse/SOLR-8897){:target="_blank"}.

**Important:** Alfresco strongly recommends that you use firewalls and other infrastructure means to ensure that the Search and Insight Engine server is not accessible from anything other than trusted hosts and/or users, and only on the ports needed for Search and Insight Engine.

You can download the Search and Insight Engine installation file from the Alfresco Support Portal: [http://support.alfresco.com](http://support.alfresco.com/). Click Downloads, and then select the version of the product you require.

## Prerequisites

The supported platforms are the combinations of operating systems, databases, and application servers that are tested and certified for Alfresco Content Services.

Before you install Search and Insight Engine you must install Alfresco Content Services 6.2 or later. You can install Search and Insight Engine using the distribution zip and docker compose, but the docker compose method of installation is only for development and test environments.

See [Supported Platforms and Languages](https://www.alfresco.com/services/subscription/supported-platforms) for information about prerequisites and requirements.
