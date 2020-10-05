---
title: Solr security
---
By default, communication between the repository and Solr is protected by SSL with mutual authentication. Both the repository and Solr have their own standard public/private key pair. To secure the two-way communication between the repository and Solr, you must generate your own keys.

> **Note:** For security reasons, you must generate a new set of keys to secure the Solr communication and access to the Solr Admin Console.

For more information, see [Configuring Search and Insight Engine using Admin Console](../tasks/adminconsole-searchservice-solr.md) and [Generating secure keys overview](generate-keys-overview.md).

