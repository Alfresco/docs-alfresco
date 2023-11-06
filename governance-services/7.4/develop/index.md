---
title: Governance Services APIs
---

Governance Services provides two APIs, the GS Core API and the GS Security Marks API.

> **Note:** The GS Security Marks API isn't available in Governance Services Community Edition.

The APIs are designed for you to create remote clients to manage the {% include tooltip.html word="fileplan" text="File Plan" %}. You can easily explore and test the endpoints using the Governance Services API Explorer. 

You can download the API Explorer from:

* [Alfresco Nexus repository](https://nexus.alfresco.com/nexus/#welcome){:target="_blank"}

The Governance Services distribution zip contains the `alfresco-governance-services-enterprise-rest-api-explorer-20.143.war` file.

> **Note:** Contact [Alfresco Support](https://support.alfresco.com/){:target="_blank"} for log in credentials.

Deploy it on the same port as Governance Services and test the APIs with your server directly from the API Explorer.

The following table provides a brief overview of each API.

|API|Description|
|---|-----------|
|GS Core API|This is the main public API for interfacing your client application with Governance Services. The REST API gives you access to core functionality. You can use it to manage the Governance Services site, record categories, record folders, unfiled containers and unfiled record folders, upload new records or declare an existing file as record, file records in the file plan and get information about transfers.|
|GS Security Marks API|The Security Marks API gives you access to the classification and security controls features of Governance Services. You can use it to manage classification guides, reasons, values, and declassification exemptions, as well as security control settings.|
