---
author: Alfresco Documentation
---

# Developer guide

The Developer guide includes extensive guidance and reference materials to aid the developer in creating applications and extensions for Alfresco.

There are a number of approaches to developing for Alfresco depending on what you want to do. For example, if you are writing a client application, perhaps in Ruby or Python to connect to Alfresco either on-premise, or Alfresco in the Cloud, then you would most likely use the Alfresco REST API. If on the other hand you wanted to write a server-side extension in Java, you would use the Public Java API, or perhaps write a web script using Java, JavaScript and FreeMarker. Generally if you are creating extensions to Alfresco you would use the Alfresco SDK. This allows you to work in your IDE of choice, using technologies you already know, such as Java and Maven.

This Developer guide attempts to lay out the various options available to you, so you can use the right approach, depending on what you want to achieve.

You can read the material in this Developer guide sequentially, or the following table with give you some starting points if you want to dive in:

|What do you want to do?|Documentation|
|-----------------------|-------------|
|You would like to get an overview of the architecture of Alfresco from the developer's perspective|[Architectural overview](dev-arch-overview.md)|
|You want to write client applications for Alfresco using a REST API|[Alfresco REST API](../pra/1/topics/pra-welcome.md)|
|You are going to build a Platform Extension.|[Developing extensions](dev-platform-extensions.md)|
|You are going to build a Platform Integration.|[Developing integrations](dev-platform-integrations.md)|
|You want to write small extensions to Alfresco in JavaScript and FreeMarker|[Web Scripts](ws-presentation-intro.md)|
|You want to create a custom REST API for Alfresco|[Web scripts](ws-presentation-intro.md)|
|You want develop applications for Alfresco using RAD|[Alfresco SDK](alfresco-sdk-intro.md)|
|You want to get developing for Alfresco using Maven|[Alfresco SDK](alfresco-sdk-intro.md)|
|You would like to know what APIs are available for Alfresco, and when you should use them|[Overview of Alfresco APIs](dev-api-intro.md)|
|You would like to know how to package your extensions for distribution|[Extension packaging](dev-extensions-packaging-techniques.md)|
|You want to write new Alfresco services in Java, and need to check what APIs are supported|[Alfresco Public Java API](java-public-api-list.md)|
|You want to configure and customize Share|[Share Extensions](dev-extensions-share.md)|
|You would like to develop extensions to Share|[Developing Share Extensions](dev-extensions-share.md)|
|You would like to know about the new UI framework Aikau|[Aikau](aikau-intro.md)|
|You want to develop applications for iOS.|[Alfresco Mobile SDK for iOS](http://docs.alfresco.com/mobile_sdk/ios/concepts/mobile-sdk-ios-intro.html)|
|You want to develop applications for Android.|[Alfresco Mobile SDK for Android](http://docs.alfresco.com/mobile_sdk/android/concepts/mobile-sdk-android-intro.html)|

-   **[Architecture](../concepts/dev-arch-overview.md)**  
This gives a view of the architecture of Alfresco from the developer's perspective. Alfresco at its core is a repository that provides a store for content, and a wide range of services that can be used by content applications to manipulate the content.
-   **[Alfresco SDK 2.2.0](../concepts/alfresco-sdk-intro.md)**  
This documentation covers version 2.2.0 of the Alfresco SDK. The Alfresco SDK is a Maven based development kit that provides an easy to use approach to developing applications and extensions for Alfresco.
-   **[API guide](../concepts/dev-api-intro.md)**  
Alfresco supports a range of APIs \(Application Programming Interfaces\) to enable developers to write applications that access the Alfresco content repository, both on-premise and cloud.
-   **[Extension packaging - modules](../concepts/dev-modules.md)**  
Extensions can be packaged as loadable modules. These modules are registered with Alfresco and can be viewed from the Admin Console or the Share Admin Console.
-   **[Platform extensions](../concepts/dev-platform-extensions.md)**  
Platform Extensions are extensions to the Alfresco Platform, and can be implemented through a variety of mechanisms. This information identifies the supported extension points and how you can leverage them to build your extensions to the Alfresco Platform.
-   **[Platform integrations](../concepts/dev-platform-integrations.md)**  
Platform integrations are external additions to the Alfresco Platform. These are generally clients that leverage the Alfresco platform.
-   **[Share extensions](../concepts/dev-extensions-share.md)**  
This information looks at developing extensions for Alfresco Share. In particular, the creation of Share Extensibility Modules.

**Parent topic:**[Alfresco One](../concepts/welcome.md)

