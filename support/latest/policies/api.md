---
title: Alfresco Content Services - API Support Policy
---

This page describes the Support and Backward compatibility Policy for all the supported in process and remote APIs / Extension Points provided for Alfresco Content Services. These policies are provided to ensure high longevity customizations and integrations with Alfresco Content Services.

## Supported APIs

Alfresco Content Services is an open source, open standard and open architecture platform allowing powerful extensions and integrations to be built against a comprehensive set of **APIs**.

Alfresco provides the following **supported APIs**:

* On the Alfresco Content Services platform side, build powerful Alfresco Content Services **extensions**:
  * Platform Public Java API
  * JavaScript API
  * FreeMarker API
  * [Platform Extension Points]({% link content-services/latest/develop/repo-ext-points/index.md %})
* On the Alfresco Share side, [Share Extension Points]({% link content-services/latest/develop/share-ext-points/index.md %}) to extend the Share UI functionality
* On the Alfresco repository side, integrate and build powerful content centric applications and integrations:
  * [REST/CMIS APIs]({% link content-services/latest/develop/rest-api-guide/index.md %})

These APIs are part of the Alfresco developer platform and should be used to extend Alfresco Content Services. The **API Support Status** is defined at API-set level and maintained in the [Product Support Status](https://www.alfresco.com/services/subscription/technical-support/product-support-status){:target="_blank"} page.

> **Note:** Customizations and Integrations not using these supported APIs **cannot be supported by Alfresco**.

## Supported Extension Points

In addition to its APIs, Alfresco provides several way to extend the Alfresco Content Services Platform both at repository and UI level to power very different content centric processes and use cases.

Alfresco provides the following **Supported Extension Points**:

* [Platform Extension Points]({% link content-services/latest/develop/repo-ext-points/index.md %}) to extend out of the box Alfresco Content Services Platform functionality
* [Share Extension Points]({% link content-services/latest/develop/share-ext-points/index.md %}) to extend out of the box the Alfresco Share functionality

These Extension points are part of the Alfresco Developer platform and should be used to extend Alfresco Content Services. The **Extension Points Support Status** is defined per each Extension Point for [Platform]({% link content-services/latest/develop/repo-ext-points/index.md %}) and [Share]({% link content-services/latest/develop/share-ext-points/index.md %}).

> **Note:** Customizations and Integrations not using these supported Extension Points **cannot be supported by Alfresco**.

## Versioning and Backward compatibility

At Alfresco, we understand the need to provide an Enterprise Grade Platform, for building high longevity applications, which survive version upgrades and allow your business to evolve without the operational burden of re-developing, re-testing and re-deploying your customizations.

**For Alfresco 5.1 and above:** For every API and Extension Point, Alfresco provides the following versioning scheme and backward compatibility policy:

|API / Extension Points|Versioning|Backward Compatibility|
|----------------------|----------|----------------------|
|Platform Java Public API|Highly coupled with the Alfresco repository, it's not explicitly versioned and follows the version number of the underlying Alfresco repository.|No backward incompatible changes are allowed within an Alfresco repository family. <br><br>Incremental, backward compatible changes can be added in Alfresco repository releases (Service Pack versions).|
|Platform Extension points|Highly coupled with the Alfresco repository, it's not explicitly versioned and follows the version number of the underlying Alfresco repository.|No backward incompatible changes are allowed within an Alfresco repository family. <br><br>Incremental, backward compatible changes can be added in Alfresco repository releases (Service Pack versions).|
|Share Extension Points|Highly coupled with the Alfresco Share, it's not explicitly versioned and follows the version number of the underlying Alfresco Share product (for example, `7.x`)|No backward incompatible changes are allowed within an Alfresco Share family. <br><br>Incremental, backward compatible changes can be added in Alfresco Share releases (Service Pack versions).|
|REST / CMIS API|The Version of the REST API is independent from the underlying Alfresco repository version and follows a single digit incremental scheme. Current version: V1|Version `X` is Supported until Version `X+2` is released or 1 year after Version `X+1` is released (whichever is the earliest)|
