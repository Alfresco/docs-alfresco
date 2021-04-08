---
author: Alfresco Documentation
---

# Developer guide

The Developer guide includes extensive guidance and reference materials to aid the developer in creating applications and extensions for Alfresco Content Services.

There are a number of approaches to developing for Alfresco Content Services depending on what you want to do. For example, if you are writing a client application, perhaps in Ruby or Python to connect to Alfresco Content Services then you would most likely use the Alfresco Content Services ReST API. If on the other hand you wanted to write a server-side extension in Java, you would use the Public Java API, or perhaps write a Web Script using Java, JavaScript and FreeMarker. Generally if you are creating extensions to Alfresco Content Services you would use the Alfresco SDK. This allows you to work in your IDE of choice, using technologies you already know, such as Java and Maven.

This Developer guide attempts to lay out the various options available to you, so you can use the right approach, depending on what you want to achieve.

You can read the material in this Developer guide sequentially, or the following table with give you some starting points if you want to dive in:

|What do you want to do?|Documentation|
|-----------------------|-------------|
|You would like to get an overview of the architecture of Alfresco Content Services from the developer's perspective|[Architectural overview](dev-arch-overview.md)|
|You want to know what development kit to use when building extensions for Alfresco|[Alfresco SDK](sdk-intro.md)|
|You would like to know how to package your extensions for distribution|[Extension packaging](dev-extensions-packaging-techniques.md)|
|You want to write client applications for Alfresco Content Services using a ReST API|{::nomarkdown}<ul><li>[ReST APIs Intro](../pra/1/topics/pra-welcome.md)</li><li>[Alfresco ReST API version 1.0 User Guide](dev-api-by-language-alf-rest.md)</li></ul>{:/} |
|You are going to build a Platform \(Repository\) Extension.|{::nomarkdown}<ul><li>[Platform / Repo Extension Intro](dev-platform-extensions.md)</li><li>[Platform / Repo Extension Points](dev-platform-extension-points.md)</li></ul>{:/} |
|You are going to build a Platform \(Repository\) Integration.|[Developing integrations](dev-platform-integrations.md)|
|You want to write small extensions for Alfresco Content Services in JavaScript and FreeMarker|{::nomarkdown}<ul><li>[Repo Web Script Intro](ws-overview.md)</li><li>[Repo Web Script Extension Point](../references/dev-extension-points-webscripts.md)</li><li>[Repository JavaScript API](API-JS-intro.md)</li></ul>{:/} |
|You want to create a custom ReST API for Alfresco Content Services, using Java and/or JavaScript for logic and FreeMarker to produce responses in JSON and/or XML|{::nomarkdown}<ul><li>[Repo Web Script Intro](ws-overview.md)</li><li>[Repo Web Script Extension Point](../references/dev-extension-points-webscripts.md)</li><li>[Repository JavaScript API](API-JS-intro.md)</li><li>[Public Java API Services](dev-services.md)</li></ul>{:/} |
|You would like to know what APIs are available for Alfresco Content Services, and when you should use them|[Overview of Alfresco APIs](dev-api-intro.md)|
|You want to write new services in Java, and need to check what APIs are supported|{::nomarkdown}<ul><li>[Alfresco Public Java API Intro](java-public-api-list.md)</li><li>[Public Java API Services](dev-services.md)</li></ul>{:/} |
|You want to configure and customize Alfresco Share|[Share Extensions](dev-extensions-share.md)|
|You would like to develop extensions to Alfresco Share UI|{::nomarkdown}<ul><li>[Developing Share Extensions](dev-extensions-share.md)</li><li>[Share Extension Points](dev-extensions-share-extension-points-introduction.md)</li></ul>{:/} |
|You would like to know about the new UI framework Aikau|[Aikau](aikau-intro.md)|
|You want to develop applications for iOS.|[Alfresco Mobile SDK for iOS](http://docs.alfresco.com/mobile_sdk/ios/concepts/mobile-sdk-ios-intro.html)|
|You want to develop applications for Android.|[Alfresco Mobile SDK for Android](http://docs.alfresco.com/mobile_sdk/android/concepts/mobile-sdk-android-intro.html)|

-   **[Alfresco Content Services architecture](../concepts/dev-arch-overview.md)**  
This gives a view of the architecture of Alfresco Content Services from the developer's perspective. At its core is a repository that provides a store for content, and a wide range of services that can be used by content applications to manipulate the content.
-   **[Alfresco Content Services SDK 3](../concepts/sdk-intro.md)**  
Alfresco Content Services SDK 3 is a Maven based development kit that provides an easy to use approach to developing applications and extensions for Alfresco. With this SDK you can develop, package, test, run, document and release your extension project.
-   **[API guide](../concepts/dev-api-intro.md)**  
Alfresco Content Services supports a range of APIs \(Application Programming Interfaces\) to enable developers to write applications that access the repository on-premise.
-   **[Extension packaging - modules](../concepts/dev-modules.md)**  
Extensions can be packaged as loadable modules. These modules are registered with Alfresco Content Services and can be viewed from the Admin Console or the Share Admin Tools.
-   **[Platform extensions](../concepts/dev-platform-extensions.md)**  
Platform Extensions are extensions to the Platform or Alfresco Content Services, and can be implemented through a variety of mechanisms. This information identifies the supported extension points and how you can leverage them to build your extensions to the Platform.
-   **[Platform integrations](../concepts/dev-platform-integrations.md)**  
Platform integrations are external additions to the Alfresco Content Services platform. These are generally clients that leverage the platform.
-   **[Share extensions](../concepts/dev-extensions-share.md)**  
This information looks at developing extensions for Alfresco Share. In particular, the creation of Share Extensibility Modules.

**Parent topic:**[Alfresco Content Services](../concepts/welcome.md)

