---
title: Alfresco Content Connector for SAP Cloud
---

The Alfresco Content Connector for SAP Cloud is an add-on module that offers seamless integration between Alfresco Content Services and SAP S/4HANA Cloud Essentials as well as on-premises through the SAP Document Management Service (via the CMIS protocol). It allows you to manage SAP related documents within an SAP environment while the documents are actually stored in Alfresco Content Services.

Here is a summary of the key capabilities:

* Support SAP S/4HANA Cloud Essentials
* Support SAP S/4HANA on-premises
* Manage documents using Content Management Interoperability Services (CMIS)
* Provides the necessary folder structure in Alfresco Content Services
* Fully flexible data exchange either via OData or RFC/SNC.

This release includes a [`GenericXchange` framework]({% link sap-cloud/latest/config/genericxchange.md %}) - a Low Code approach that offers an easy and fully flexible data exchange for any kind of metadata between the content in Alfresco and the related SAP Business Object. This is accomplished either by calling any existing OData service in SAP Cloud Essentials (or SAP S/4HANA on-premises) or invoking any remote enabled SAP function module via the SAP JavaConnector (using RFC/SNC connection).

> **Important:** The SAP Cloud Connector module can be applied to several versions of Content Services. See [Prerequisites]({% link sap-cloud/latest/install/index.md %}#prerequisites) and [Supported Platforms]({% link sap-cloud/latest/support/index.md %}) for more.

> **Note:**
>
> * This documentation only covers how to use Content Services with the SAP Cloud Connector.
>
> * The Alfresco Content Connector for SAP Cloud can be applied to Alfresco Content Services 7.0 - 7.3 only.
