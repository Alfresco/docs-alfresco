---
title: Alfresco Content Services - API Support Policy
---

This page describes the Support and Backward compatibility Policy for all the supported in process and remote APIs / Extension Points provided for Alfresco Content Services (Alfresco One). These policies are provided to ensure high longevity customizations and integrations with Alfresco Content Services.

## Supported APIs

Alfresco Content Services is an open source, open standard and open architecture platform allowing powerful extensions and integrations to be built against a comprehensive set of **APIs**.

Alfresco provides the following **supported APIs**:

* On the Alfresco Content Services platform side, [Platform Public Java API](LINK java-public-api-list.html), [Javascript API](LINK API-JS-intro.html) and [Freemarker API](LINK API-FreeMarker-intro.html) [Platform Extension Points](LINK dev-platform-extension-points.html) to build powerful Alfresco Content Services **extensions**
* On the Alfresco Share side, [Share Extension Points](LINK dev-extensions-share-extension-points-introduction.html) to extend the Share UI functionality
* On the Alfresco repository side,[REST/CMIS APIs](LINK pra-welcome.html) to integrate and build powerful content centric applications and integrations

These APIs are part of the Alfresco developer platform and should be used to extend Alfresco Content Services. The **API Support Status** is defined at API-set level and maintained in the [Product Support Status](https://www.alfresco.com/alfresco-product-support-status){:target="_blank"} page.

> **NOTE:** Customizations and Integrations not using these supported APIs **cannot be supported by Alfresco Software**.

## Supported Extension Points

In addition to its APIs, Alfresco provides several way to extend the Alfresco Content Services Platform both at repository and UI level to power very different content centric processes and use cases.

Alfresco provides the following **Supported Extension Points**:

* [Platform Extension Points](LINK dev-platform-extension-points.html) to extend out of the box Alfresco Content Services Platform functionality
* [Share Extension Points](LINK dev-extensions-share-extension-points-introduction.html) to extend out of the box the Alfresco Share functionality

These Extension points are part of the Alfresco Developer platform and should be used to extend Alfresco Content Services. The **Extension Points Support Status** is defined per each Extension Point for [Platform](LINK dev-platform-extension-points.html) and [Share](LINK dev-extensions-share-extension-points-introduction.html).

> **NOTE:** Customizations and Integrations not using these supported Extension Points **cannot be supported by Alfresco Software**.

## Versioning and Backward compatibility

At Alfresco, we understand the need to provide an Enterprise Grade Platform, for building high longevity applications, which survive version upgrades and allow your business to evolve without the operational burden of re-developing, re-testing and re-deploying your customizations.

**For Alfresco 5.1 and above**, for every API and Extension Point Alfresco provides the following versioning scheme & backward compatibility policy:

|API / Extension Points|Versioning|Backward Compatibility|
|----------------------|----------|----------------------|
|Platform Java Public API|Highly coupled with the Alfresco repository, it's not explicitly versioned follows the version number of the underlying Alfresco repository.|No backward incompatible are allowed within an Alfresco repository family (Major version). Incremental, backward compatible changes can be added in Alfresco repository releases (Minor versions).|
|Platform Extension points|Highly coupled with the Alfresco repository, it's not explicitly versioned follows the version number of the underlying Alfresco repository.|No backward incompatible are allowed within an Alfresco repository family (Major version). Incremental, backward compatible changes can be added in Alfresco repository releases (Minor versions).|
|Share Extension Points|Highly coupled with the Alfresco Share, it's not explicitly versioned and follows the version number of the underlying Alfresco Share product (for example, 5.x)|No backward incompatible are allowed within an Alfresco Share family (Major version). Incremental, backward compatible changes can be added in Alfresco Share releases (Minor versions).|
|REST / CMIS API|The Version of the REST API is independent from the underlying Alfresco repository version and follows a single digit incremental scheme. Current version: V1|Version X is Supported until Version X+2 is released or 1 year after Version X+1 is released (which ever is the earliest)|
