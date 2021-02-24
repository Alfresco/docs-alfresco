---
author: Alfresco Documentation
audience: [, ]
---

# Governance Services Records Management APIs

Alfresco Governance Services provides two APIs, the GS Core API and the GS Security Marks API.

**Note:** The GS Security Marks API isn't available in Records Management Community Edition.

The APIs are designed for you to create remote clients to manage the File Plan. You can easily explore and test the endpoints using the Alfresco Governance Services API Explorer. You can download the API Explorer war zip file from:

-   [https://download.alfresco.com/cloudfront/release/community/RM/2.7.a-build-00008/alfresco-rm-community-rest-api-explorer-2.7.a.war](https://download.alfresco.com/cloudfront/release/community/RM/2.7.a-build-00008/alfresco-rm-community-rest-api-explorer-2.7.a.war)
-   [https://nexus.alfresco.com/nexus/\#nexus-search;quick~alfresco-rm-enterprise-api-explorer](https://nexus.alfresco.com/nexus/#nexus-search;quick~alfresco-rm-enterprise-api-explorer)

Deploy it on the same port as Governance ServicesRecords Management and test the APIs with your server directly from the API Explorer.

You can read more about working with Alfresco APIs in the [Alfresco API Guide](http://docs.alfresco.com/community/concepts/dev-api-intro.html).

The following table provides a brief overview of each API.

|API|Description|
|---|-----------|
|GS Core API|This is the main public API for interfacing your client application with Alfresco Governance Services. The REST API gives you access to core functionality. You can use it to manage the Records Management site, record categories, record folders, unfiled containers and unfiled record folders, upload new records or declare an existing file as record, file records in the file plan and get information about transfers.|
|GS Security Marks API|The Security Marks API gives you access to the classification and security controls features of Records Management. You can use it to manage classification guides, reasons, values, and declassification exemptions, as well as security control settings.|

**Parent topic:**[Records Management](../concepts/welcome-rm.md)

**Parent topic:**[Alfresco Governance Services](../concepts/welcome-gs.md)

