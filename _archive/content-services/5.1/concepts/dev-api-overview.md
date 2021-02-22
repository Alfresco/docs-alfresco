---
author: Alfresco Documentation
---

# Overview

Provides an overview of each of the supported APIs, with links to further documentation.

Alfresco ECM provides a wide range of APIs which you can use depending on what you are trying to do. The APIs can generally be divided into two main types: Remote, where code runs in the remote client, and Embedded, where the code runs on the server.

For example, the Alfresco REST API is a remote API, designed to allow you to create remote client applications. The Repository JavaScript API is an embedded API that allows you to create server-side extensions in JavaScript. The Public Java API is an embedded API that allows you to create server-side extensions that require a lower level of access, such as required if you are writing new services or Java-backed web scripts.

The following table provides a brief overview of each API, with links to further information:

|API|Type|Description|Support Status|
|---|----|-----------|--------------|
|[REST API](../pra/1/topics/pra-welcome.md)|Remote|This is the main public API for interfacing your client application with Alfresco. This RESTful API can be used to access both Cloud and On-Premise Alfresco repositories.

The REST API provides the ability to access core repository functionality through a **[CMIS REST API](../pra/1/topics/cmis-welcome.md)**, such as uploading a file, and Alfresco-specific functionality, such as management of sites, can be accessed through the Alfresco REST API.|Fully supported.|
|[Repository JavaScript API](API-JS-intro.md)|Embedded|This API is a JavaScript API used primarily for the development of [Web Scripts](../references/dev-extension-points-webscripts.md) that execute embedded in the Alfresco platform.

Web scripts are extensions to Alfresco that can be written and built without requiring compilation, and therefore have a reduced development time.

The web scripts are accessed using URLs, so can be thought of as providing the ability to create custom REST APIs.|Fully supported.|
|[Repository Freemarker Template API](../references/API-FreeMarker-intro.md)|Embedded|This API provides a wide-range of objects and methods for creating scripts using the FreeMarker templating language, that execute embedded in the Alfresco platform.

It provides a more limited API than the Repository JavaScript API, but with the convenience of using a simpler templating language, rather than a more complex scripting language such as JavaScript.|Fully supported.|
|[Spring Surf API](ws-presentation-intro.md)|Embedded|Spring Surf is a server-side UI development framework that is used by Share. Both legacy Surf pages and new Aikau pages are based on Spring Surf. A Spring Surf page is backed by one or more presentation Web Scripts, referred to as Spring Surf Web Scripts.

The Surf Platform API is used in Surf Web Script controllers and provides a JavaScript API to allow you to access URL and page contexts, as well as calling remote REST services.|Fully supported.|
|[Aikau Widget and Service Reference/API](http://dev.alfresco.com/resource/docs/aikau-jsdoc/)|Embedded|This is the reference, and API, for all the new Aikau widgets and services that are used in the Share user interface. These are fully available when developing custom pages, dashlets, and menus for Share.

|Fully supported.|
|[Public Java API](java-public-api-list.md)|Embedded|When you are extending the Alfresco Platform with new content models and workflows it is often useful to provide corresponding new custom services implemented in Java. The business logic in Web Script controllers sometimes also need to be implemented in Java to use 3rd party libraries etc.

Alfresco provides numerous Java-level APIs, which are documented through the JavaDoc system. Links to the JavaDoc documentation can be found on the [Alfresco Developer Site](http://dev.alfresco.com/resource/AlfrescoOne/5.0/PublicAPI/).

While in theory it is possible to access the complete range of out-of-the-box Java classes \(APIs\), there is a public API of classes and interfaces that you should stick to. This is to ensure that your application works on future versions of Alfresco and that you get appropriate support.|Fully supported.|
|[Mobile SDK for iOS](http://docs.alfresco.com/mobile_sdk/ios/concepts/mobile-sdk-ios-intro.html)|Remote|The SDK/API to use for developing mobile applications for iOS.

|Fully Supported. Current version 1.4.|
|[Mobile SDK for Android](http://docs.alfresco.com/mobile_sdk/android/concepts/mobile-sdk-android-intro.html)|Remote|The SDK/API to use for developing mobile applications for Android.

|Fully Supported. Current version 1.4.|
|Repository REST API|Remote|This is the older deprecated REST API based on Web Scripts. Moving forward you should use the new REST API, which consist of the CMIS REST API and the Alfresco REST API.

|**DEPRECATED: use [REST API](../pra/1/topics/pra-welcome.md) instead.**|

**Parent topic:**[API guide](../concepts/dev-api-intro.md)

