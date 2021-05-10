---
title: Developer guide
---

The Developer guide includes extensive guidance and reference materials to aid the developer in creating applications and extensions for Alfresco Content Services.

There are a number of approaches to developing for Alfresco Content Services depending on what you want to do. For example, if you are writing a client application, perhaps in Ruby or Python to connect to Alfresco Content Services then you would most likely use the Alfresco Content Services ReST API. If on the other hand you wanted to write a server-side extension in Java, you would use the Public Java API, or perhaps write a Web Script using Java, JavaScript and FreeMarker. Generally if you are creating extensions to Alfresco Content Services you would use the Alfresco SDK. This allows you to work in your IDE of choice, using technologies you already know, such as Java and Maven.

This Developer guide attempts to lay out the various options available to you, so you can use the right approach, depending on what you want to achieve.

You can read the material in this Developer guide sequentially, or the following table with give you some starting points if you want to dive in:

|What do you want to do?|Documentation|
|-----------------------|-------------|
|You would like to get an overview of the architecture of Alfresco Content Services from the developer's perspective|[Architectural overview](#alfresco-content-services-architecture)|
|You want to know what development kit to use when building extensions for Alfresco|[Alfresco SDK]({% link content-services/5.2/develop/sdk.md %})|
|You would like to know how to package your extensions for distribution|[Extension packaging]({% link content-services/5.2/develop/extension-packaging.md %}#module-package-formats)|
|You want to write client applications for Alfresco Content Services using a ReST API|-   [ReST APIs Intro]({% link content-services/5.2/develop/api-reference.md %}#rest-apis)
-   [Alfresco ReST API version 1.0 User Guide]({% link content-services/5.2/develop/rest-api-guide/index.md %}#rest-api)

|
|You are going to build a Platform (Repository) Extension.|-   [Platform / Repo Extension Intro](#platform-extension-point)
-   [Platform / Repo Extension Points](#platform-extension-points)

|
|You are going to build a Platform (Repository) Integration.|[Developing integrations]({% link content-services/5.2/develop/platform-integrations.md %})|
|You want to write small extensions for Alfresco Content Services in JavaScript and FreeMarker|-   [Repo Web Script Intro]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#repository-tier-web-scripts)
-   [Repo Web Script Extension Point]({% link content-services/5.2/develop/api-reference.md %}#web-scripts)
-   [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/java-api-guide.md %}#java-api)

|
|You want to create a custom ReST API for Alfresco Content Services, using Java and/or JavaScript for logic and FreeMarker to produce responses in JSON and/or XML|-   [Repo Web Script Intro]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#repository-tier-web-scripts)
-   [Repo Web Script Extension Point]({% link content-services/5.2/develop/api-reference.md %}#web-scripts)
-   [Repository JavaScript API]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/java-api-guide.md %}#java-api)
-   [Public Java API Services]({% link content-services/5.2/develop/java-api-guide.md %}#public-java-api-services)

|
|You would like to know what APIs are available for Alfresco Content Services, and when you should use them|[Overview of Alfresco APIs]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide)|
|You want to write new services in Java, and need to check what APIs are supported|-   [Alfresco Public Java API Intro]({% link content-services/5.2/develop/api-reference.md %}#java-api)
-   [Public Java API Services]({% link content-services/5.2/develop/java-api-guide.md %}#public-java-api-services)

|
|You want to configure and customize Alfresco Share|[Share Extensions](#share-extensions)|
|You would like to develop extensions to Alfresco Share UI|-   [Developing Share Extensions](#share-extensions)
-   [Share Extension Points]({% link content-services/5.2/develop/share-ext-points/index.md %})

|
|You would like to know about the new UI framework Aikau|[Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau)|

-   **[Alfresco Content Services architecture](#alfresco-content-services-architecture)**  
This gives a view of the architecture of Alfresco Content Services from the developer's perspective. At its core is a repository that provides a store for content, and a wide range of services that can be used by content applications to manipulate the content.
-   **[Alfresco Content Services SDK 3]({% link content-services/5.2/develop/sdk.md %})**  
Alfresco Content Services SDK 3 is a Maven based development kit that provides an easy to use approach to developing applications and extensions for Alfresco. With this SDK you can develop, package, test, run, document and release your extension project.
-   **[API guide]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide)**  
Alfresco Content Services supports a range of APIs (Application Programming Interfaces) to enable developers to write applications that access the repository on-premises.
-   **[Extension packaging - modules]({% link content-services/5.2/develop/extension-packaging.md %}#extension-packaging-modules)**  
Extensions can be packaged as loadable modules. These modules are registered with Alfresco Content Services and can be viewed from the Admin Console or the Share Admin Tools.
-   **[Platform extensions](#platform-extension-point)**  
Platform Extensions are extensions to the Platform or Alfresco Content Services, and can be implemented through a variety of mechanisms. This information identifies the supported extension points and how you can leverage them to build your extensions to the Platform.
-   **[Platform integrations]({% link content-services/5.2/develop/platform-integrations.md %})**  
Platform integrations are external additions to the Alfresco Content Services platform. These are generally clients that leverage the platform.
-   **[Share extensions](#share-extensions)**  
This information looks at developing extensions for Alfresco Share. In particular, the creation of Share Extensibility Modules.

## Alfresco Content Services architecture

This gives a view of the architecture of Alfresco Content Services from the developer's perspective. At its core is a repository that provides a store for content, and a wide range of services that can be used by content applications to manipulate the content.

The following diagram illustrates the idea that can be thought of as consisting of three main components, **Platform**, User Interface (**UI**), and **Search**. These components are implemented as separate web applications:

![]({% link content-services/images/dev-alfresco-architecture-overview.png %})

The main component is called the **Platform** and is implemented in the alfresco.war web application. It provides the repository where content is stored plus all the associated content services. Alfresco Share provides a web client interface (that is a User Interface, UI) for the repository and is implemented as the share.war web application. Share makes it easy for users to manage their sites, documents, users and so on. The search functionality is implemented on top of Apache **Solr 4** and provides the indexing of all content, which enables powerful search functionality. Besides the web clients accessing the Repository via Share there are also mobile clients that will access the content via REST APIs provided by the platform.

If we dive deeper into the platform (packaged in `alfresco.war`) we will see that it also supports workflow in the form of the embedded Activiti Workflow Engine. The platform is usually also integrated with a Directory Server (LDAP) to be able to sync users and groups with Alfresco Content Services. And most installations also integrates with an SMTP server so the Platform can send emails, such as site invitations.

For more information about the internals of the Platform, and specifically the content repository, see the [concepts](#repository-concepts) section.

Besides Share there are also many other clients that can connect to the repository, including any CMIS-compatible client, and via the Microsoft SharePoint protocol any SharePoint client.

The Platform also contains numerous [APIs]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide), [Services]({% link content-services/5.2/develop/java-api-guide.md %}#public-java-api-services), and [Protocols](#access-protocols).

The following diagram illustrates this extended architecture:

![]({% link content-services/images/alfresco_overview.png %})

Note that content metadata is stored in a relational database system such as PostgreSQL, MySQL, Oracle, and so on. The content itself is stored on the file system (or other storage system such as Amazon S3).

Alfresco provides a number of extension points to allow you to customize it. These extensions points have various formats, but include:

-   [Platform extension points and detailed architecture](#platform-architecture)
-   [Share extension points and detailed architecture](#share-architecture)
-   [Platform integration points and detailed architecture]({% link content-services/5.2/develop/platform-integrations.md %})
-   [APIs]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide)
-   [Protocols](#access-protocols)
-   [Services]({% link content-services/5.2/develop/java-api-guide.md %}#public-java-api-services)

The links in the list above provide further information on each of these topics.

-   **[Architecture overview](#architecture-overview)**  
At the core of the Alfresco Content Services system is a repository supported by a server that persists content, metadata, associations, and full text indexes. Programming interfaces support multiple languages and protocols upon which developers can create custom applications and solutions. Out-of-the-box applications provide standard solutions such as document management and records management.
-   **[Access protocols](#access-protocols)**  
Alfresco Content Services supports a number of different protocols for accessing the content repository. Their availability extends the options available to developers, when building their own applications and extensions.
-   **[Repository concepts](#repository-concepts)**  
It is important as a developer to have a good understanding of the fundamental concepts of Alfresco Content Services when implementing extensions. Important concepts covered include repository, nodes, stores, types, aspects and so on.


## Architecture overview

At the core of the Alfresco Content Services system is a repository supported by a server that persists content, metadata, associations, and full text indexes. Programming interfaces support multiple languages and protocols upon which developers can create custom applications and solutions. Out-of-the-box applications provide standard solutions such as document management and records management.

As a Java application, the system runs on virtually any system that can run Java Enterprise Edition. At the core is the Spring platform, providing the ability to modularize functionality, such as versioning, security, and rules. Alfresco Content Services uses scripting to simplify adding new functionality and developing new programming interfaces. This portion of the architecture is known as web scripts and can be used for both data and presentation services. The lightweight architecture is easy to download, install, and deploy.

There are many ways to deploy, however most deployments follow a general pattern. Ultimately, Alfresco Content Services is used to implement ECM solutions, such as document management and records management. There can also be elements of collaboration and search across these solutions.

The solutions are typically split between clients and server, where clients offer users a user interface to the solution and the server provides content management services and storage. Solutions commonly offer multiple clients against a shared server, where each client is tailored for the environment in which it is used.

### Clients

Alfresco Content Services offers a web-based client called Alfresco Share, built entirely with the web script technology. Share provides content management capabilities with simple user interfaces, tools to search and browse the repository, content such as thumbnails and associated metadata, previews, and a set of collaboration tools such as wikis and discussions. Share is organized as a set of sites that can be used as a meeting place for collaboration. It's a web-based application that can be run on a different server to the server that runs the repository, providing opportunities to increase scale and performance.

Share can be deployed to its own tier separate from the content application server. It focuses on the collaboration aspects of content management and streamlining the user experience. It's implemented using Surf and can be customized without JSF knowledge.

Clients also exist for portals (by using JSR-168 portlets), mobile platforms, Microsoft Office, and the desktop. In addition, using the folder drive of the operating system, users can share documents through a network drive. Using JLAN technology, Alfresco can look and act just like a folder drive. JLAN is the only Java server-side implementation of the CIFS protocol, letting users interact with Alfresco Content Services as they do any other normal file drive except the content is now stored and managed in the content application server.

### Server

The content application server comprises a content repository and value-added services for building solutions.

The content application server provides the following categories of services built upon the content repository:

-   Content services (transformation, tagging, metadata extraction)
-   Control services (workflow, records management, change sets)
-   Collaboration services (social graph, activities, wiki)

Clients communicate with the content application server and its services through numerous supported protocols. HTTP and SOAP offer programmatic access while CIFS, FTP, WebDAV, IMAP, and Microsoft SharePoint protocols offer application access. The Alfresco Content Services installer provides an out-of-the-box prepackaged deployment where the content application server and Share are deployed as distinct web applications inside Apache Tomcat.

-   **[Guiding design principles](#guiding-design-principles)**  
The Alfresco Content Services architecture supports the requirements of Enterprise Content Management (ECM) applications, such as Document Management (DM), Web Content Management (WCM), Records Management (RM), Digital Asset Management (DAM), and Search.
-   **[Web tier and Surf](#web-tier-and-surf)**  
Alfresco Content Services provides ECM capabilities as data services, user interfaces, and user applications. The user interface capabilities are provided by applications and application components using Alfresco Content Services web tier, Surf, originally developed as a faster way to develop content applications using scripting and REST architecture.
-   **[Alfresco Share client application](#alfresco-share-client-application)**  
The Alfresco Content Services client application provide a means of accessing the repository. Alfresco Content Services provides Alfresco Share which is a web-based client application, providing an interface that allows the user to create, upload, and manage content.
-   **[Application server](#application-server)**  
At the heart of Alfresco Content Services is the application server, which manages and maintains the repository. The server's primary responsibility is to provide services for use in building ECM solutions. All the applications of the Alfresco Content Services suite are built upon and executed by the application server.
-   **[Repository](#repository)**  
The repository is comparable to a database, except that it holds more than data. The binary streams of content are stored in the repository and the associated full-text indexes are maintained by SOLR indexes.
-   **[Content services](#content-services)**  
Services address the core use cases for content management applications including the logical organization of content, file management, version control, and security. Services also support the control of content through workflow and process management, and social and collaborative applications.
-   **[Programming models](#programming-models)**  
A number of programming models are available for building an application using the content application server.
-   **[APIs](#apis)**  
To access and extend out-of-the-box services, the content application server exposes two flavors of API, each designed for a specific type of client.
-   **[Content modeling](#content-modeling)**  
Content modeling is a fundamental building block of the repository that provides a foundation for structuring and working with content.
-   **[Protocols](#protocols)**  
 The content application server supports many folder and document-based protocols to access and manage content held within the repository using familiar client tools.
-   **[Modularity](#modularity)**  
The Alfresco Content Services system is modular. Every moving part is encapsulated as a service, where each service provides an external face in a formally defined interface and has one or more black-box implementations.
-   **[Web application framework](#web-application-framework)**  
Alfresco Share and all new web applications are built on Surf. This web application framework provides the typical features of this kind of framework and supports web content management needs.
-   **[Deployment options](#deployment-options)**  
You can deploy Alfresco Content Services in many different forms and topologies. Because its infrastructure foundation protects Alfresco Content Services from the environment within which it executes, you can choose components such as operating system, database, application server, web browser, and authentication system. It's designed to scale down as well as up.

## Guiding design principles {#guiding-design-principles}

The Alfresco Content Services architecture supports the requirements of Enterprise Content Management (ECM) applications, such as Document Management (DM), Web Content Management (WCM), Records Management (RM), Digital Asset Management (DAM), and Search.

### Support ECM requirements

Each of these disciplines has unique and overlapping characteristics so that the design of each capability is not done in isolation but in the context of the whole system.

### Simple, simple, simple

Alfresco Content Services aims to be as simple as possible to develop against, customize, deploy, and use. The simplest and probably most widely deployed ECM solution is the shared document drive: the architecture is driven by the aim to be as simple as a shared drive.

### Scaling to the enterprise

Every service and feature is designed up front to scale in terms of size of data set, processing power, and number of users.

### Modular approach

Alfresco Content Services architecture takes a modular approach in which capabilities are bundled into modules whose implementation can be replaced if required, or not included at all. Aspect-Oriented Programming (AOP) techniques allow for fine-tuning and optimization of an ECM solution.

### Incorporating best-of-breed libraries

Where possible, Alfresco Content Services incorporates best-of-breed third-party libraries. The open source nature lends itself to integrating with the wealth of available open source libraries. This is done whenever it is more profitable to integrate than build or whenever expertise is better provided in another project rather than in-house.

### Environment independence

Alfresco Content Services does not dictate the environment upon which it depends, allowing choice in the operating system, database, application server, browser, and authentication system to use when deploying. ECM is less about the application and more about the services embedded within an application. You can choose how to package Alfresco Content Services — for example, as a web application, an embedded library, or portlet.

### Solid core

The heart of Alfresco Content Services is implemented in Java. This decision was driven by the wealth of available Java libraries, monitoring tools, and enterprise integrations. Java is also a trusted runtime for many enterprises wishing to deploy applications in their data centers. Each capability is implemented as a black-box Java service tested independently and tuned appropriately.

### Scriptable extensions

Extensions will always need to be created for custom solutions and there are many custom solutions versus the single Alfresco Content Services core. Therefore, extension points are developed using JVM-based scripting languages, allowing a much wider pool of developers to build extensions versus those that can contribute to the core. Extensions are packaged entities, allowing for the growth of a library of third-party reusable extensions.

### Standards-based approach

The architecture always complies with standards where applicable and advantageous. Primary concerns are to reduce lock-in, improve integration possibilities, and hook into the ecosystems built around the chosen standards.

### Architecture of participation

The architecture promotes a system designed for community contribution. In particular, the architecture principles of a solid core, modularity, standards compliance, simplicity of development, and scriptable extensions encourage contribution of plug-ins and custom ECM solutions. Participation complements the open source approach to the development of Alfresco Content Services and fosters growth of the Alfresco community. As the community grows, the quality of self service improves, as well as the quality of feedback. This, in turn, enhances Alfresco Content Services and creates the ultimate feedback loop.

## Web tier and Surf {#web-tier-and-surf}

Alfresco Content Services provides ECM capabilities as data services, user interfaces, and user applications. The user interface capabilities are provided by applications and application components using Alfresco Content Services web tier, Surf, originally developed as a faster way to develop content applications using scripting and REST architecture.

Development of web scripts allows for the creation of a REST-based API. Web scripts can be executed without compilation, and provide a quick and easy way to extend and enhance Alfresco Content Services standard services.

The web script infrastructure accommodates Java beans as easily as JavaScript. Web scripts add little overhead but provide a great deal of flexibility and development productivity. Web scripts in the web tier let you quickly build user interface components with Surf or simple HTML and deploy them as Alfresco Share components, portlets, or other web platforms such as Google Gadgets.

## Alfresco Share client application {#alfresco-share-client-application}

The Alfresco Content Services client application provide a means of accessing the repository. Alfresco Content Services provides Alfresco Share which is a web-based client application, providing an interface that allows the user to create, upload, and manage content.

The user interface is built entirely with the Alfresco web script technology, which can be used to extend the application. Share provides content management capabilities with simple user interfaces, tools to search and browse the repository, content such as thumbnails and associated metadata, renditions of content, and a set of collaboration tools such as wikis, discussions, and blogs. Alfresco Share is organized as a set of sites that can be used as a meeting place for collaboration. Alfresco Share is a web-based application that can be run on a different server to the server that runs the repository, providing opportunities to increase scale and performance.

## Application server {#application-server}

At the heart of Alfresco Content Services is the application server, which manages and maintains the repository. The server's primary responsibility is to provide services for use in building ECM solutions. All the applications of the Alfresco Content Services suite are built upon and executed by the application server.

The application server exposes a set of remote public interfaces for allowing a client to communicate with it. The remote public interfaces are the only part of the server visible to the client. There are two types:

-   **Remote APIs** - for interacting with services of the server programmatically
-   **Protocol bindings** - for mapping services for use by a protocol-compliant client

![]({% link content-services/images/2-2.png %})

Internally, the server comprises several layers. The foundation includes infrastructure concerns, such as configuration, authentication, permissions, and transactions that cut across all capabilities. Infrastructure also shields the server from being tied to any specific environmental implementation, such as transaction managers or caching mechanisms.

The repository is built on this infrastructure, which itself is the building block for content, control, and collaboration services. Each capability of the repository and content services is individually bundled as a module with its own in-process interface and implementation. Modules are bound together by the infrastructure through their interfaces.

You can deploy extensions to the content application server to extend or override its capabilities. Their implementation might use the in-process interfaces offered by the repository and content services.

## Repository {#repository}

The repository is comparable to a database, except that it holds more than data. The binary streams of content are stored in the repository and the associated full-text indexes are maintained by SOLR indexes.

The actual binary streams of the content are stored in files managed in the repository, although these files are for internal use only and do not reflect what you might see through the shared drive interfaces. The repository also holds the associations among content items, classifications, and the folder/file structure. The folder/file structure is maintained in the database and is not reflected in the internal file storage structure.

The repository implements services including:

-   Definition of content structure (modeling)
-   Creation, modification, and deletion of content, associated metadata, and relationships
-   Query of content
-   Access control on content (permissions)
-   Versioning of content
-   Content renditions
-   Locking
-   Events
-   Audits
-   Import/Export
-   Multilingual
-   Rules/Actions

The repository implements and exposes these services through an API, CMIS protocol bindings, and the JSR-170 Java API. The storage engine of the repository stores and retrieves content, metadata, and relationships, and operates on the following constructs:

-   **Nodes** - provide metadata and structure to content. A node can support properties, such as author, and relate to other nodes such as folder hierarchy and annotations. Parent to child relationships are treated specially.
-   **Content** - the content to record, such as a Microsoft Word document or an XML fragment.

Content models are registered with the repository to constrain the structure of nodes and the relationships between them, and to constrain property values.

![]({% link content-services/images/2-3.png %})

The storage engine also exposes query capabilities provided by a custom query engine built on Apache Lucene that supports the following search constructs:

-   Metadata filtering
-   Path matching
-   Full text search
-   Any combination of these search constructs

The query engine and storage engines are hooked into the transaction and permission support of the infrastructure, offering consistent views and permission access. Several query languages are exposed, including native Lucene, XPath, Alfresco FTS (Full Text Search), and CMIS Query Language (with embedded Alfresco FTS).

![]({% link content-services/images/2-4.png %})

By default nodes are stored in an RDBMS while content is stored in the file system. Using a database provides transaction support, scaling, and administration capabilities. A database abstraction layer is used for interacting with the database, which isolates the storage engine from variations in SQL dialect. This eases the database porting effort, allowing certification against all the prominent RDBMS implementations. The file system stores content to allow for very large content, random access, streaming, and options for different storage devices. Updates to content are always translated to append operations in the file system, allowing for transaction consistency between database and file system.

You can bundle and deploy the repository independently or as part of a greater bundle, such as the application server.

## Content services {#content-services}

Services address the core use cases for content management applications including the logical organization of content, file management, version control, and security. Services also support the control of content through workflow and process management, and social and collaborative applications.

Alfresco Content Services exposes services at various levels including:

-   Java
-   Scripting
-   REST
-   Web services
-   Client interfaces, such as Alfresco Share

Some services are considered internal; others are public. For example, the Java level services are internal. The majority of these are accessible through other public interfaces including the public APIs, client applications, and CMIS.

Services are divided into two main categories; application services and repository services.

## Programming models {#programming-models}

A number of programming models are available for building an application using the content application server.

-   The simplest model for non-programmers is to use out-of-the-box components of the Alfresco Share application and the Rules and Actions model, a set of conditions and actions to take on content based on those conditions. You can define rules and actions using a wizard and perform actions such as converting content, moving content, or executing a simple JavaScript snippet.
-   Web scripts let you perform more sophisticated processing without complex programming. The Content Management Interoperability Services (CMIS) implementation was built using web scripts. By using JavaScript to build these data services, it is easy to create new services. To build new user interfaces or extensions to Share, you can also use web scripts by using a web templating language like FreeMarker. Most of Share was built using web scripts.
-   To use Java to build applications or extend Share, you can use the many tools associated with Java that were used to build the system. Surf, the web runtime framework, lets you extend Share and build web applications. Because Share was built using Surf, you can build your own extensions as a combination of Java programming and web scripts, or with Java alone. You can also use Java to access or even replace whole pieces of Alfresco Content Services, content application server, or Share by using the Spring platform. You can use the source code as an example for rewriting pieces and using Spring beans and configuration to extend or replace functionality in Alfresco Content Services.
-   To write applications that use Alfresco Content Services but are portable to other ECM systems, you can use Content Management Interoperability Services (CMIS), the OASIS standard for accessing content repositories.

## APIs {#apis}

To access and extend out-of-the-box services, the content application server exposes two flavors of API, each designed for a specific type of client.

The two main categories of API are embedded and remote APIs.

-   **[Embedded APIs](#embedded-apis)**  
The Embedded API is used for developing extensions to the application server. Extensions deployed into the server often depend on existing services provided by the server. Therefore, developers of extensions use the Embedded API to gain access to those services.
-   **[Remote APIs](#remote-apis)**  
 The Remote API is primarily used to build ECM solutions against the content application server.

## Embedded APIs {#embedded-apis}

The Embedded API is used for developing extensions to the application server. Extensions deployed into the server often depend on existing services provided by the server. Therefore, developers of extensions use the Embedded API to gain access to those services.



The Embedded API comes in several forms, where each form is structured for a particular need or kind of extension:

-   [Alfresco Public Java API]({% link content-services/5.2/develop/api-reference.md %}#java-api) - a set of public Java interfaces exposed by services built into the content application server
-   JavaScript API - an object-oriented view of the Java Foundation API specifically tailored for use in JavaScript. There is a [JavaScript API for the repository tier]({% link content-services/5.2/develop/api-reference.md %}#java-api) and the [Repository JavaScript API]({% link content-services/5.2/develop/java-api-guide.md %}#java-api) and a [JavaScript API for the Share tier]({% link content-services/5.2/develop/api-reference.md %}#spring-surf-api).
-   [FreeMarker API]({% link content-services/5.2/develop/api-reference.md %}#freemarker-api) - an object-oriented view of the Java Foundation API specifically tailored for use in FreeMarker templates
-   Content Definition - an API for creating and editing content models
-   Workflow Definition - an API for defining business processes

The JavaScript and Template APIs are the key building blocks for web scripts to develop the RESTful APIs.

![]({% link content-services/images/2-9.png %})

Web scripts are a popular extension for the content application server. They allow you to define your own Remote API for clients to interact with the content application server. A web script implementation can use any of the Embedded APIs, such as the Public Java API, JavaScript, and FreeMarker, for its implementation. Developing your own Remote API is very useful for the following scenarios:

-   Exposing new extension services deployed into the application server to remote clients
-   Providing alternate batching or transaction demarcation of existing services
-   Creating a facade for integration with a third-party tool, such as a Forms engine

There is another use case for the Embedded API. An application or client can also directly embed the content application server to inherit its suite of content services.

![]({% link content-services/images/2-10.png %})

The infrastructure of the server means it can be deployed into a number of environments, not just as a web application. Essentially, the content application server is treated as a library, where any of its services, including the content repository, can be chosen independently or mixed to provide a custom solution. The server can scale down as well as up.

## Remote APIs {#remote-apis}

The Remote API is primarily used to build ECM solutions against the content application server.

There are three main remote APIs:

1.  Alfresco Content Services API
2.  CMIS API
3.  Repository REST API (Deprecated)

The Alfresco Content Services API was introduced with version 4.x. It provides the main remote API, and is the recommended API for developing remote client applications to work across on-premises deployments. It comprises two sub-APIs, the Alfresco Content Services REST API for gaining access to Alfresco Content Services-specific functionality such as sites, and a standard CMIS API for repository manipulation and management. SDKs such as the Mobile SDK for Android and the Mobile SDK for iOS both use the services of the Alfresco Content Services API.

CMIS provides a standardized set of common services for working with content repositories. CMIS is not language-specific, it does not dictate how a repository works, and it does not seek to incorporate every feature of every repository. Alfresco Content Services provides an implementation of CMIS Web service and RESTful bindings, as well as a CMIS client API for use in Surf and other environments.

The Repository REST API provides access to the core repository functionality using a RESTful approach. This is useful where the developer does not want to, or have a need to, write custom web scripts, and is developing a client-side application. This API can be thought of as a ready-built collection of web scripts that can be called from any client capable of making REST requests and receiving the associated responses.

For more information about the APIs and their support status see the [API overview page]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-overview).

## Content modeling {#content-modeling}

Content modeling is a fundamental building block of the repository that provides a foundation for structuring and working with content.

> **Note:** For more information about working with custom metadata models (aspects, types and forms), flexible content organization and actions in the Model Manager, see [Content modeling]({% link content-services/5.2/tutorial/model.md %}#content-modeling-with-model-manager).

Content modeling specifies how nodes stored in the repository are constrained, imposing a formal structure on nodes that an application can understand and enforce. Nodes can represent anything stored in the repository, such as folders, documents, XML fragments, renditions, collaboration sites, and people. Each node has a unique ID and is a container for any number of named properties, where property values can be of any data type, single or multi-valued.

Nodes are related to each other through relationships. A parent/child relationship represents a hierarchy of nodes where child nodes cannot outlive their parent. You can also create arbitrary relationships between nodes and define different types of nodes and relationships.

A content model defines how a node in the repository is constrained. Each model defines one or more types, where a type enumerates the properties and relationships that a node of that type can support. Often, concepts that cross multiple types of node must be modeled, which the repository supports through aspects. Although a node can only be of a single type, you can apply any number of aspects to a node. An aspect can encapsulate both data and process, providing a flexible tool for modeling content.

Content modeling puts the following constraints on the data structure:

-   A node must be of a given kind.
-   A node must carry an enumerated set of properties.
-   A property must be of a given data type.
-   A value must be within a defined set of values.
-   A node must be related to other nodes in a particular way.

These constraints allow the definition (or modeling) of entities within the domain. For example, many applications are built around the notion of folders and documents. It is content modeling that adds meaning to the node data structure.

![]({% link content-services/images/5-1.png %})

The repository provides services for reading, querying, and maintaining nodes. Events are fired on changes, allowing for processes to be triggered. In particular, the repository provides the following capabilities based on events:

-   Policies: event handlers registered for specific kinds of node events for either all nodes or nodes of a specific type
-   Rules: declarative definition of processes based on addition, update, or removal of nodes (for example, the equivalent of email rules)

Models also define kinds of relationships, property data types, and value constraints. A special data type called `content` allows a property to hold arbitrary length binary data. Alfresco Content Services comes prepackaged with several content models. You can define new models for specific use cases from scratch or by inheriting definitions from existing models.

## Protocols {#protocols}

The content application server supports many folder and document-based protocols to access and manage content held within the repository using familiar client tools.

All the protocol bindings expose folders and documents held in the repository. This means a client tool accessing the repository using the protocol can navigate through folders, examine properties, and read content. Most protocols also permit updates, allowing a client tool to modify the folder structure, create and update documents, and write content. Some protocols also allow interaction with capabilities such as version histories, search, and tasks.

Internally, the protocol bindings interact with the repository services, which encapsulate the behavior of working with folders and files. This ensures a consistent view and update approach across all client tools interacting with the content application server.

A subsystem for file servers allows configuration and lifecycle management for each of the protocols either through property files or JMX.

![]({% link content-services/images/2-7.png %})

Supported protocols include:

-   **CIFS (Common Internet File System)**

    CIFS allows the projection of Alfresco Content Services as a native shared file drive. Any client that can read and write to file drives can read and write to Alfresco Content Services, allowing the commonly used shared file drive to be replaced with an ECM system without users even knowing.


-   **WebDAV (Web-based Distributed Authoring and Versioning)**

    WebDAV provides a set of extensions to HTTP for managing files collaboratively on web servers. It has strong support for authoring scenarios such as locking, metadata, and versioning. Many content production tools, such as the Microsoft Office suite, support WebDAV. Additionally, there are tools for mounting a WebDAV server as a network drive.


-   **FTP (File Transfer Protocol)**

    FTP is a standard network protocol for exchanging and manipulating files over a network. This protocol is particularly useful for bulk loading folders and files into the repository.


-   **IMAP (Internet Message Access Protocol)**

    IMAP is a prevalent standard for allowing email access on a remote mail server. Alfresco presents itself as a mail server, allowing clients such as Microsoft Outlook, AppleMail, and Thunderbird to connect to and interact with folders and files held within the repository. IMAP supports three modes of operation:

    1.  Archive: allows email storage in the repository by using drag/drop and copy/paste from the IMAP client
    2.  Virtual: folders and files held in the repository are exposed as emails within the IMAP client with the ability to view metadata and trigger actions using links embedded in the email body
    3.  Mixed: a combination of both archive and virtual

-   **Microsoft SharePoint Protocols**

    Alfresco Office Services support Microsoft SharePoint Protocols. This allows Alfresco Content Services to act as a SharePoint server, creating tight integration with the Microsoft Office suite. A user who is familiar with the Microsoft task pane can view and act upon documents held within the repository. Collaborative features of Microsoft SharePoint are mapped to Alfresco Share site capabilities.


## Modularity {#modularity}

The Alfresco Content Services system is modular. Every moving part is encapsulated as a service, where each service provides an external face in a formally defined interface and has one or more black-box implementations.

The system is designed this way to allow for:

-   Pick and mix of services for building an ECM solution
-   Reimplementation of individual services
-   Multiple implementations of a service, where the appropriate implementation is chosen based on the context within which the solution is executed
-   A pattern for extending Alfresco Content Services (at design and runtime)
-   Easier testing of services

To support this approach, Alfresco Content Services used the Spring framework for its factory, Dependency Injection, and Aspect-Oriented Programming (AOP) capabilities. Services are bound together through their interfaces and configured using Spring’s declarative Dependency Injection.

![]({% link content-services/images/2-5.png %})

A service interface is defined as a Java interface. For services that form the internal embedded API for extensions, cross-cutting concerns such as transaction demarcation, access control, auditing, logging, and multi-tenancy are plugged in through Spring AOP behind the service interface. This means that service implementations are not polluted with these concerns. It also means the cross-cutting concerns can be configured independently or even switched off across the server if, for example, performance is the top-most requirement and the feature is not necessary.

Multiple services are aggregated into an Alfresco Content Services subsystem where a subsystem represents a complete coherent capability of the Alfresco Content Services server, such as authentication, transformation, and protocols. As a unit, subsystems have their own lifecycle where they can be shut down and restarted while the server is running. This is useful to disable aspects of the server, or reconfigure parts of it, such as how LDAP synchronization is mapped. Each subsystem supports its own administration interface that is accessible through property files or JMX.

## Web application framework {#web-application-framework}

Alfresco Share and all new web applications are built on Surf. This web application framework provides the typical features of this kind of framework and supports web content management needs.

At the heart of Surf is a site assembly framework that bundles a full site construction object model and toolkit for building websites and applications.

Its features include:

-   A Site Dispatcher to create pages easily, link them to the overall navigation of a website, and build pages in a way that promotes reusability.
-   Templates for defining a page layout once and then reusing it across a large set of pages. You can develop pages using FreeMarker, JSP, HTML, or Java.
-   A UI Library containing reusable UI components comprising back-end application logic and front-end presentation code that can be bound into regions (or slots) within a page or template.
-   Pages that you can render in multiple formats, such as print, PDF, or mobile device.
-   AJAX support for integration with the Yahoo! User Interface (YUI) library.
-   Forms in a rich forms engine for rendering and collecting data.

![]({% link content-services/images/2-14.png %})

Surf embeds Spring web scripts, allowing developers to use the same techniques that were used when building content application server RESTful APIs. Often, a Surf website requires access to and management of content held within the application content server, such as to support user-generated content, dynamic site artifacts, personalized presentation, and tagging. To support this, Surf provides the following integration services:

-   Remote: encapsulates any number of data sources with out-of-the-box support for the content application server
-   Credentials: manages user authentication with out-of-the-box support for the content application server

With the CMIS client API, Surf provides an open stack for implementing web-based, content-enabled applications.

Alfresco Content Services 5.2.7 includes the UI framework built on Surf, [Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau). Aikau provides a modern, higher-level approach to developing custom UI applications, and features a simplified method for creating pages and widgets. New pages with standard widgets can be created through JSON code, and then extended as required using JavaScript.

## Deployment options {#deployment-options}

You can deploy Alfresco Content Services in many different forms and topologies. Because its infrastructure foundation protects Alfresco Content Services from the environment within which it executes, you can choose components such as operating system, database, application server, web browser, and authentication system. It's designed to scale down as well as up.

### Embedded Alfresco Content Services

An embedded Alfresco Content Services is contained directly within a host where the host communicates with Alfresco Content Services through its embedded API, meaning the host and Alfresco Content Services reside in the same process. Typical hosts include content-rich client applications that require content-oriented storage, retrieval, and services, but can also include hosts such as test harnesses and samples. A client can choose to embed the web application framework or content application server, or both, treating Alfresco Content Services as a third-party library. In any case, the client can pick and mix the services to embed, allowing very small-footprint versions. The host is responsible for the start up and shutdown of Alfresco Content Services.

### Content application server

An content application server is a stand-alone server capable of servicing requests over remote protocols. A single server can support any number of different applications and clients where new applications can be arbitrarily added. Clients communicate through its Remote API and protocol bindings, although you can configure a server to omit or prohibit specific access points. This type of deployment takes advantage of an application server where Alfresco Content Services is bundled as a web application. Application server features, such as transaction management and resource pooling, are injected into the infrastructure foundation, allowing Alfresco Content Services to take advantage of them.

For example, you can embed the content application server inside Apache Tomcat for the lightest-weight deployment, as well as inside Java Enterprise Edition compliant application servers from JBoss, Oracle, or IBM to take advantage of advanced capabilities such as distributed transactions.

### Clustered

To support large-scale systems, you can cluster Alfresco Content Services. This lets you set up multiple servers to work with each other, allowing client requests to be fulfilled across a number of processors. You can cluster both the web application framework and content application server, allowing each tier to scale out independently. Each node of a clustered content application server shares the same content repository store, although the store itself can be replicated across the nodes, if required. Caches and search indexes are also distributed, meaning that a clustered content application server looks and acts like a single content application server.

Typically, a load balancer is placed in front of the clustered content application server to distribute requests across the nodes. This setup also supports Cloud deployments. Alfresco Content Services provides images and tools for easily deploying a clustered content application server across multiple Amazon EC2 virtual nodes.

### Backup server

This is a special case of the clustered deployment where, in case of failure, an application can switch to a backup version of the deployed stack. Depending upon configuration, the backup version might be available immediately on failure (known as hot backup) or shortly after failure, following some configuration changes (known as warm backup). One of the nodes in the cluster is designated the master, which supports the live application, while the other node is designated the slave, which keeps itself replicated with the master. The slave remains read-only until the point of switchover.

### Multi-tenancy

Multi-tenancy allows a single content application server (clustered or not) to support multiple tenants, where a tenant such as a customer, company, or organization believes they are the only user of the server as they connect to a logical partition. Physically, all tenants share the same infrastructure, such as deployed nodes in a cluster and content, repository storage. However, data maintained by one tenant cannot be read or manipulated by another tenant. A deployment of this type eases administration and reduces the cost associated with maintaining many different applications and user bases, in particular when upgrading core services or performing backups, as this only needs to be done once for all tenants.

Alfresco Content Services provides administration tools for managing tenants, including the creation of tenants at runtime. In conjunction with clustering, multi-tenancy provides an ideal deployment option for the Cloud.

## Access protocols {#access-protocols}

Alfresco Content Services supports a number of different protocols for accessing the content repository. Their availability extends the options available to developers, when building their own applications and extensions.

Protocols provide developers with another possible avenue for building their own applications and extensions. For example, if you are building a client application to connect with multiple repositories from multiple vendors, including Alfresco Content Services, then CMIS is a consideration. If you are building a client to connect via the SharePoint Protocol, then use the Alfresco Office Services (AOS). Protocols provide a resource for developers, in addition to the numerous other extension points and APIs built into Alfresco.

When any of these protocols are used to access or upload content to the repository, access control is always enforced based on configured permissions, regardless of what protocol that is used.

The following table list some of the main protocols supported by Alfresco Content Services and links to more detailed documentation.

|Protocol|Description|Support Status|
|--------|-----------|--------------|
|HTTP|The main protocol used to access the repository via for example the REST APIs.|Standard in Alfresco Content Services and Community Edition.|
|[WebDAV]({% link content-services/5.2/admin/troubleshoot.md %}#troubleshooting-webdav)|Web-based Distributed Authoring and Versioning is a set of HTTP extensions that lets you manage files collaboratively on web servers.|Standard in Alfresco Content Servicesand Community Edition.|
|[FTP]({% link content-services/5.2/config/file-servers.md %}#configuring-the-ftp-file-server)|File Transfer Protocol - standard network protocol for file upload, download and manipulation. Useful for bulk uploads and downloads.|Standard in Alfresco Content Services and Community.|
|[CIFS]({% link content-services/5.2/config/file-servers.md %}#configuring-smb/cifs-server)|Common Internet File System - allows the projection of Alfresco Content Services as a native shared drive. Any client that can read or write to file drives can read and write to Alfresco Content Services, allowing the commonly used shared file drive to be replaced with an ECM system, without users knowing.|Standard in Alfresco Content Servicesand Community Edition.|
|[SPP]({% link content-services/5.2/admin/audit.md %}#installing-and-configuring-alfresco-office-services)|Enables Alfresco Content Services to act as a Microsoft SharePoint Server. Allows Microsoft Office users to access documents within the Alfresco repository.|Supported as part of Alfresco Office Services (AOS). Community versions have support for the older SharePoint Protocol Support.|
|[Alfresco Office Services]({% link content-services/5.2/admin/audit.md %}#installing-and-configuring-alfresco-office-services)|Alfresco Office Services (AOS) allow you to access Alfresco Content Services directly from all your Microsoft Office applications.|Standard in Alfresco Content Services and Community Edition.|
|[CMIS]({% link content-services/5.2/develop/api-reference.md %}#cmis-rest-api)|Alfresco fully implements both the [CMIS](https://www.oasis-open.org/committees/tc_home.php?wg_abbrev=cmis) 1.0 and 1.1 standards to allow your application to manage content and metadata in an on-premises repository.|Standard in Alfresco Content Services and Community Edition.|
|[IMAP]({% link content-services/5.2/config/email.md %}#configuring-the-email-client-with-imap)|Internet Message Access Protocol - allows access to email on a remote server. Alfresco Content Services can present itself as an email server, allowing clients such as Microsoft Outlook, Thunderbird, Apple Mail and other email clients to access the content repository, and manipulate folders and files contained there.|Standard in Alfresco Content Services and Community Edition.|
|[SMTP]({% link content-services/5.2/config/email.md %}#configuring-inbound-and-outbound-email)|It is possible to email content into the repository (InboundSMTP). A folder can be dedicated as an email target.|Standard in Alfresco Content Services and Community Edition.|

## Repository concepts {#repository-concepts}

It is important as a developer to have a good understanding of the fundamental concepts of Alfresco Content Services when implementing extensions. Important concepts covered include repository, nodes, stores, types, aspects and so on.

*Key Concepts*

All files that are stored in Alfresco Content Services are stored in what is referred to as the **repository**. The repository is a logical entity that consists of three important parts:

1.  The physical content files that are uploaded
2.  The index files created when indexing the uploaded file so it is searchable
3.  The metadata/properties for the file, which are stored in a relational database management system (RDBMS).

When a file is uploaded to the repository it is stored on disk in a special directory structure that is based on the date and time of the upload. The file name is also changed to the UUID (Universally Unique Identifier) assigned to the file when it is added to the repository. The file's metadata is stored in an RDBMS such as PostgreSQL. Indexes are also stored on the disk. When the file is added to the repository it is stored in a folder, and the folder has domain specific metadata, rules, and fine grained permissions. The top folder in the repository is called **Company Home**, although it will be referred to with the name **repository** in the Alfresco Share user interface.

*Logical Structure*

All the files and folders that are uploaded and created in the repository are referred to as **nodes**. Some nodes, such as folders and rules, can contain other nodes (and are therefore known as container nodes). Nodes can also be associated with other nodes in a peer to peer relationship, in a similar fashion to how an HTML file can reference an image file. All nodes live in a **Store**. Each store has a root node at the top, and nodes can reference specific files, as shown in the following diagram:

![]({% link content-services/images/dev-repository-concepts-logical-structure.png %})

*Stores Overview*

The Repository contains multiple logical stores. However, a node lives only in one store. Most of the stores are implemented as data in the connected RDBMS, only the **Content Store** is implemented so as to store items on disk:

![]({% link content-services/images/dev-repository-concepts-stores-overview.png %})

*The main stores*

The **Working Store** (`workspace://SpacesStore`) contains the metadata for all active/live nodes in the Repository. This store is implemented using a database (RDBMS).

The **Content Store** contains the physical files uploaded to the Repository and is located in the {Alfresco install dir}/alf_data/contentstore directory on the filesystem by default, but can also be configured to use other storage systems, for example, Amazon S3. It is also possible to define content store policies for storing files on different storage systems, effectively defining more than one physical content store.

Whenever a node is deleted, the metadata for the node is moved to the **Archive Store** (`archive://SpacesStore`), which uses the configured database. The physical file for a deleted node is moved (by default after 14 days) to the {Alfresco install dir}/alf_data/contentstore.deleted directory, where it stays indefinitely. However, a clean-up job can be configured to remove the file at a certain point in time (referred to as eager clean-up).

When the `versionable` aspect is applied to a node, a version history is created in the **Version Store** (`workspace://version2Store`). Versioned node metadata is stored in the database and files remain in the {Alfresco install dir}/alf_data/contentstore directory. Versioning is not applicable to folder nodes.

The **System Store** is used to save information about installed Alfresco Content Services extension modules.

*Content Store Implementation*

When considering file storage, it should be noted that files added to Alfresco Content Services can be of almost any type, and include images, photos, binary document files (Word, PPT, Excel), as well as text files (HTML, XML, plain text). Some binary files such as videos and music files can be relatively large. Content store files are located on the disk, rather than in the database as BLOBs. There are several reasons for this:

1.  It removes incompatibility issues across database vendors.
2.  The random file access support (as required by CIFS and other applications) cannot be provided by database persistence without first copying files to the file system.
3.  Possibility of real-time streaming (for direct streaming of files to browser).
4.  Standard database access would be difficult when using BLOBs as the most efficient BLOB APIs are vendor-specific.
5.  Faster access.

*Content Store Selectors*

The *content store selector* provides a mechanism to control the physical location on disk for a content file associated with a particular content node. This allows storage polices to be implemented to control which underlying physical storage is used, based on your applications needs or business policies.

For example, it is possible to use a very fast tier-1 Solid State Drive (SSD) for our most important content files. Then, based on business policies that have been decided, gradually move the data, as it becomes less important, to cheaper tier-2 drives such as Fiber Channel (FC) drives or Serial ATA drives. In this way, it is possible to manage the storage of content more cost effectively:

![]({% link content-services/images/dev-repository-concepts-content-store-selectors.png %})

*Store Reference*

When working with the APIs a store is accessed via its **store reference**, for example `workspace://SpacesStore`. The store reference consists of two parts: the protocol and the identifier. The first part (for example `workspace`) is called the protocol and indicates the content you are interested in, such as live content (`workspace://SpacesStore`) or archived content (`archive://SpacesStore`). The second part is the identifier (the type of store) for the store, such as `SpacesStore`, which contains folder nodes (previously called spaces) and file nodes data, or for example `lightWeightVersionStore` that contains version history data.

> **Important:** The reason some things are referred to as spaces (for example SpacesStore) is that in previous versions of Alfresco Content Services a folder used to be called a space. The Share user interface has generally been changed to use the name folder instead of the name space. However, there is functionality, such as Space Templates, that still uses the term "space". A space can simply be thought of as a folder.

*Node Information*

A node usually represents a folder or a file. Each store also contains a special root node at the top level with the type `sys:store_root`. The root node can have one or more child nodes, such as the Company Home folder node. Each node has a primary path to a parent node and the following metadata:

-   **Type**: a node is of one type, such as Folder, File, Marketing Document, Rule, Calendar Event, Discussion, Data List and so on.
-   **Aspects**: a node can have many aspects applied, such as Versioned, Emailed, Transformed, Classified, Geographic and so on.
-   **Properties**: both types and aspects define properties. If it is a file node then one of the properties points to the physical file in the content store.
-   **Permissions**: access control settings for the node.
-   **Associations**: relationships to other nodes (peer or child).

*Node Reference*

A node is uniquely identified in the Repository via its **node reference**, also commonly referred to as *NodeRef*. A node reference points to a store and a node in that store. A node reference has the following format: `{store protocol://store identifier}/UUID` such as for example `workspace://SpacesStore/986570b5-4a1b-11dd-823c-f5095e006c11`. The first part is the store reference and the second part is a Universally Unique Identifier (UUID) for that store. Node references are used a lot in the available APIs so it is good to have an idea of how they are constructed.

*Node Properties*

The node properties, also referred to as the node's **metadata**, contains the majority of the information for a node. The `sys:store-protocol`, `sys:store-identifier`, and `sys:node-uuid` properties contains all the data needed to construct the NodeRef, uniquely identifying the node. The special property called `cm:content` points to where the physical content file is stored on disk (unless it is a folder or other contentless node type). All properties are either contained in a type or in an aspect defined in a content model. When a node is created some properties are automatically set by the system and cannot be easily changed, they are called **audit properties** (from the `cm:auditable` aspect) and are Created Date, Creator, Modified Date, Modifier, and Accessed. Defining new domain specific node properties, together with the types and aspects that contain them, is the primary way of classifying a node so it can be easily found via searches.

*Metadata/Property Extractors*

Some of the properties of a file node are set automatically when it is uploaded to the Repository, such as *author*. This is handled by **metadata extractors**. A metadata extractor is set up to extract properties from a specific file MIME type. There are numerous metadata extractors available out-of-the-box covering common MIME types such as MS Office document types, PDFs, Emails, JPEGs, HTML files, DWG files and more. The metadata extractors are implemented via the Tika library, although custom metadata extractors are available. Each metadata extractor implementation has a mapping between the properties it can extract from the content file, and what content model properties that should be set as node metadata.

*Node Associations*

There are two types of associations:

-   **Parent** to **Child** associations - these are for example folder to file associations where deleting the folder will cascade delete its children.
-   **Peer** to **Peer** - an example could be article to image associations where deleting the article does not affect the related image node(s). These associations are also referred to as source to target associations.

*QName*

All properties are defined within a specific content model, which also defines a unique **namespace**. For example, a property called `description` can be part of many namespaces (content models). To uniquely identify what `description` property is being referenced, a fully qualified name, or a `QName`, is used. A QName has the following format: `{namespace URL}property local name`, for example:

```
{http://www.alfresco.org/model/content/1.0}description
```

The first part in curly braces is the namespace identifier defining the content model that the property is part of. The second part is the local name of the property (that is *description* in this case).

A QName is used for types, aspects, properties, associations, constraints and so on. The QName for the generic folder type that is part of the out-of-the-box document content model is `cm:folder`. Note the use of `cm` to denote the namespace. Each content model defines a prefix for each namespace that is used in the content model. Each type, aspect, property and so on in the content model definition uses the namespace prefix instead of the full namespace URL. You will also use the prefix when referring to entities such as types, aspects, properties, in the different APIs.

*Permissions*

Permissions are set up per node and a node can inherit permissions from its parent node. A Role (Group) Based Access Control configuration is the preferred way to set up permissions in the repository. However, permissions can also be set for an individual user. Groups and users can be synchronized with an external directory such as LDAP or MS Active Directory. Some groups are created automatically during installation:

-   **EVERYONE** – all users in the system
-   **ALFRESCO_ADMINISTRATORS** – administrators with full access to everything in the Repository.
-   **ALFRESCO_SEARCH_ADMINISTRATORS** – can access the Search Manager tool and set up search filters (facets).
-   **SITE_ADMINISTRATORS** – can access the Site Manager tool and change visibility of sites, delete sites, and perform site related operations.
-   **E-MAIL_CONTRIBUTORS** – users that can send email with content into Alfresco Content Services.

Permission settings involve three entities:

![]({% link content-services/images/dev-repository-concepts-permission-mapping.png %})

There are a number of out-of-the-box roles:

1.  Consumer
2.  Contributor
3.  Editor
4.  Collaborator
5.  Coordinator

Whenever a Share site is created there are also four associated groups created that are used to set up permissions within the site. In the repository, groups are prefixed with `GROUP_` and roles with `ROLE_`, this is important when referring to a group or role when using one of the APIs.

> **Important:** A **Site** is a collaboration area in Alfresco Share where a team of people can collaborate on content.

*Owner*

The Repository contains a special authority called owner. Whoever creates a node in the repository is called the owner of the node. Owner status overrides any other permission setting. As owner you can do any operation on the node (basically the same as being coordinator/admin). Anyone with Coordinator or Admin status can take ownership of a node (`cm:ownable` is then applied).

*Folder Node and File Node Overview*

The diagram illustrates a typical folder node with a child file node when it has been classified with the out-of-the-box default document content model:

![]({% link content-services/images/dev-repository-concepts-folder-file-node-overview.png %})

## Mini glossary {#mini-glossary}

Terms and concepts used when developing for Alfresco Content Services.

|Term|Description|
|----|-----------|
|Actions|Actions typically work in conjunction with Rules. When creating a rule you specify the action to be carried out when the rule is activated. There are standard actions, but you can also create custom actions. Custom actions are implemented in Java as Spring beans.|
|Aspects|While nodes must be of a single Type, they can have multiple Aspects applied to them. Dublin Core, Taggable, EXIF, Geographic, Emailed are all examples of aspects. Also a single aspect can be applied to multiple types.|
|Associations|Relationships between Types are modeled with Associations. There are two types: Child Associations and Peer Associations.|
|Attributes|Attributes provide a global means of storing key-value data. Whereas properties are attached to a node, attributes are system-wide, and not stored per-node. They can be quickly searched for without the need for an index and are cluster-safe.|
|Auditing|Auditing allows you to track events that occur in Alfresco Content Services. The events that you audit are completely configurable.|
|Configuration|Platform provides many points at which the configuration of the system can be changed. For example, changes may be made to `alfresco-global.properties` or many of the other configuration files. In addition, Share is [highly configurable]({% link content-services/5.2/develop/share-ext-points/share-config.md %}#configuring-alfresco-share).|
|Content|This is the piece of content to be stored in the repository. It could be a Word document, a PDF, a PNG image file, an audio file and so on. Note that the content itself will be stored on the file system, while its corresponding node, containing metadata, will be stored in an RDBMS.|
|Content Model|The content model describes the nodes and the hierarchical relationship between them, as well as any constraints that may exist. For example, nodes that are of container type can contain other nodes.|
|Content Renditions|Renditions are manipulations of content that typically involves some content transformation, followed by some other operation such as crop or resize. For example, you might have a PDF document, which you might convert the first page of to a PNG, and then crop and resize that image to create a thumbnail view of the document. The key service is the Rendition Service.|
|Content Store|The repository has multiple content stores. Typically this would include a main content store, an encrypted content store, an archive content store (for deleted items), and a version store (to hold previous versions of documents). It is also possible for developers to create custom content stores for specific purposes.|
|Content Transformation|Content transformation transforms one format of content into another. There are numerous applications of this, such as converting content into plain text for indexing and generating PDF versions of Word files. Transformations can be chained together, for example DOC to PDF using LibreOffice. Key service is the ContentTransformation Service.|
|Extension|Extensions can be thoughts of as server-side additions to Alfresco Content Services. There are two main types of extension: Platform and Share. Each of these extension types are fully described in this documentation, along with all officially supported extension points.|
|Events|Data structures created on various changes within the repository, such as name change of a piece of content. There are three types of Event: 1.  Inbound event - content arriving into a folder
2.  Outbound event - content leaving a folder
3.  Update event - content being modified

|
|Indexing|As content is added to Alfresco Content Services it is indexed by an indexer such as Solr. Solr indexes both meta data and the plain text content of files added. The content model defines the metadata (aspects, properties, types, associations) that are to be indexed via the `<tokenise>` element. The indexes can be queried using a variety of query languages, including: -   fts-alfresco
-   storeroot
-   noderef
-   xpath
-   lucene
-   cmis-strict
-   cmis-alfresco
-   db-afts
-   db-cmis

 Queries can be executed from JavaScript and Java code, and also in the Node Browser (available under Admin Tools in Share).

|
|Nodes|Each piece of content in the repository has a node associated with it. The node contains information about the content, such as its metadata and location within the content store. The node is stored in a RDBMS such as PostgreSQL, the content itself is stored on the file system.|
|Predefined Content Model|There are pre-defined content models provided out-of-the-box, these include Folder/Document hierarchy, Dublin Core, blogs, Wiki, Sites.|
|Policies|These are event handlers triggered by certain node events for either all nodes or just nodes of a specific type.|
|Metadata|Most content has metadata associated with it. For example, photographs have EXIF metadata. Word documents would have Author, Creation Date, and so on. The metadata provides very useful information for document discovery, without the overhead of having to extract and process the full content of a document.|
|Metadata extraction|Content type (mimetype) can automatically be identified for the standard types by Tika. This metadata can be extracted from the content and copied into the content's associated node (properties). For custom content types it is possible to create Custom metadata extractors. Key service is the MetadataExtractor Service. You can also create [custom metadata extractors]({% link content-services/5.2/develop/repo-ext-points/metadata-extractors.md %}#metadata-extractors).|
|Mimetypes|The mimetype essentially identifies the type of content. Alfresco Content Services can automatically identify content types and establish mimetype (using Tika). It is also possible to create custom content identification through custom mimetypes.|
|Module|A module is the format in which an *extension* is packaged.|
|Property|Properties are named items of metadata associated with a Type. Each Property is of a specific data type (such as Text or Date). Constraints can be applied to restrict the value of a Property.|
|Repository|This is where content is stored, and can be thought of as the content stores and all the related services. It consists of the filesystem or storage service where the content is stored and a database containing metadata. See [Repository Concepts](#repository-concepts) for an overview.|
|Rules|Declarative definition of processes based on addition, update, or removal of nodes with respect to folders (think email rules for content). These are set up for a folder in Share. See documentation and videos on [applying rules to folders]({% link content-services/5.2/using/content/rules.md %}#applying-rules-to-folders). Note that Rules can be filtered based on conditions/criteria: -   All items (no filter)
-   Items with a specific mimetype (for example .doc, .pdf)
-   Contained in a category
-   Specific content type applied to a specific aspect file name pattern (for example *-context.xml)

Boolean NOT can be used (for example not .pdf). There are no limits to the number of conditions that can be applied to each Rule.

|
|Type|A node is always of a single Type. A Type is similar to a class in Object-Oriented Programming, Types can be inherited from a parent Type in the content model.|

## Platform architecture {#platform-architecture}

The platform architecture consists of the repository and related services. The platform contains the key extension points for building your own extensions.

The following diagram illustrates the platform architecture and [extension points](#platform-extension-points). Note that this does not represent a complete list of [extension points](#platform-extension-points):

![]({% link content-services/images/dev-repo-extension-points.png %})

The platform consists of the repository and all services, developer [extension points]({% link content-services/5.2/develop/software-architecture.md %}#platform-extension-points), and [APIs]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide). The repository provides storage for documents and other content. The content metadata is stored in a relational database, while the content itself is stored directly on the file system. The relationships between content items, and their various properties (metadata) are defined in one or more [content models]({% link content-services/5.2/develop/repo-ext-points/content-model.md %}).

[Content models]({% link content-services/5.2/develop/repo-ext-points/content-model.md %}) can be thought of as describing types of content and the relationships between pieces of content. For example, there is a relationship between a content that has a container functionality (that is, folder), and the piece of content contained within it (that is, sub-folders and files). There might be constraints defined in the content model, such as a content type cannot contain other content unless it is a container type.

As well as the basic content storage functionality, the platform provides a wide range of content-related services. These include core services such as the Node Service, and the Version Service. There are also higher-level services such as Thumbnail Service (for creating thumbnail images and renditions of documents), the Site Service used for creating and managing sites in the Share application, and the Tagging Service, which provides the ability to tag content with keywords. The following sections of this documentation provide a brief tour of the available services.

Typically these services are implemented in Java, and expose an API described by the [Public Java API](http://dev.alfresco.com/resource/AlfrescoOne/5.0/PublicAPI/).

The platform is highly extensible. You can write extensions in Java, JavaScript, and FreeMarker, and you can write client applications in any language using the [REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis). You can create new [content models]({% link content-services/5.2/develop/repo-ext-points/content-model.md %}) that define new content types, metadata, and relationships. You can create business workflow processes using [Activiti BPMN]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow), and define [custom actions]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %}) that the repository will carry out when certain events happen (such as when new content is added to the repository). You can even create entirely new services, if required.

The following sections of this documentation look at various extension points, the services provided by the platform, the [APIs you can leverage]({% link content-services/5.2/develop/rest-api-guide/index.md %}#api-guide), and even how you can customize and [extend web client applications such as Share](#share-extensions). There are many tutorials, as well as reference materials to study.


## Platform extension points {#platform-extension-points}

The Alfresco Content Services platform features a number of extension points that can be used to create customizations. The table of supported extension points includes links to more information.

The following table lists platform extension points and links to relevant documentation:

|Extension point|Description|Support Status|
|---------------|-----------|--------------|
|[Content Model]({% link content-services/5.2/develop/repo-ext-points/content-model.md %})|Content modeling provides a foundation for structuring and working with content. It is used to create a domain specific model that can be used to classify content and refine the search capabilities.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Data Lists]({% link content-services/5.2/develop/repo-ext-points/data-lists.md %})|Data lists are a useful feature available in sites. They can be used to keep records data. This is metadata that does not necessarily have any file content associated with it. It can be for example a to-do list or an event list.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Actions]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %})|Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the repository through a Spring configuration file. Actions provide a place to locate reusable business logic.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Workflow]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)|Alfresco Content Services embeds the Process Engine from Alfresco Process Services as standard. You can create custom business workflows to manage your content and processes.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Web scripts]({% link content-services/5.2/develop/api-reference.md %}#web-scripts)|Web scripts provide the ability to create custom REST APIs. A web script is implemented in XML, JavaScript, and FreeMarker. Java can also be used to implement a web script if the business logic requires it. If written in JavaScript and FreeMarker it is possible to write new extensions that do not require a server restart to take effect.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[JavaScript root objects]({% link content-services/5.2/develop/repo-ext-points/javascript-root-objects.md %})|The JavaScript root object collection provides a ready made set of objects you can access from your web scripts. These objects provide access to the repository content. It is also possible to extend the platform with new custom JavaScript root objects that can be used in for example Web Scripts controllers.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Behaviors / policies]({% link content-services/5.2/develop/repo-ext-points/behavior-policies.md %}#behaviors/policies)|Behaviors are logic that is tightly coupled to a repository event, such as adding content. Examples of out-of-the-box mechanisms that employ behaviors are versioning and auditing. Custom behaviors can be implemented to support features such as automatically adding a unique ID property to a content node when added to the repository, or automatically applying metadata attached to a folder to content stored in the folder.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Bootstrap content]({% link content-services/5.2/develop/repo-ext-points/bootstrap-content.md %})|Most content management solutions require some content to be available before the system is going live. This can be users, groups, files and folders, sites, and so on. This content can be imported into the repository using a bootstrapping procedure.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Permissions (Custom Roles)]({% link content-services/5.2/develop/repo-ext-points/permissions.md %})|Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution configuration directory as permissionDefinitions.xml and sitePermissionDefinitions.xml. This configuration can be replaced or extended to create new roles.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[MIME Types]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})|Alfresco Content Services is able to automatically identify most file types and establish MIME type accordingly. However, if you have custom file types it is possible to add support for these by adding custom MIME types. You will typically also need to provide custom content transformations, and metadata extraction to fully support the content type.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Content Stores]({% link content-services/5.2/develop/repo-ext-points/content-stores.md %}#content-stores)|The repository has multiple content stores used for different purposes. By default, Alfresco Content Services is configured to save files or content items in the File Content Store. You can also have an encrypted content store, or a custom content store, depending on your requirements.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Audit Log]({% link content-services/5.2/develop/repo-ext-points/audit-log.md %}#audit-log)|The Audit service can be used to keep a record of all operations performed in the content repository. The audit information is stored in a database in a form that is designed to be simple for third-party reporting tools to consume. Custom audit applications can be configured.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Metadata Extractors]({% link content-services/5.2/develop/repo-ext-points/metadata-extractors.md %}#metadata-extractors)|Alfresco Content Services performs metadata extraction on content automatically, however, you may wish to create custom metadata extractors to handle custom file properties and custom content models.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Admin Console Component]({% link content-services/5.2/develop/repo-ext-points/admin-console-components.md %}#admin-console-components)|The [Admin Console]({% link content-services/5.2/admin/admin-console.md %}) provides a way of managing services integrated into Alfresco Content Services, or built on as extensions. Installed modules can have a custom Admin Console component, so that they can be managed from the well-known interface of the Admin Console.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Content Transformers (and Renditions)]({% link content-services/5.2/develop/repo-ext-points/content-transformers-renditions.md %})|Content transformers transform one type of content into another. Transformations can also be chained together. You can create custom content transformers to transform one type of content into another, where that transformation is not already supported. Closely related to transformations are renditions, which can be used to generate another version of the content, such as a preview, thumbnail, HTML etc.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Scheduled jobs]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions)|Alfresco Content Services automatically runs a number of scheduled jobs, for example the content store cleaner job and temporary file cleaner job. It is possible to configure new scheduled jobs.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Authentication]({% link content-services/5.2/develop/repo-ext-points/authentication.md %}#authentication)|Alfresco Content Services includes multiple authentication systems, including Active Directory, LDAP, Kerberos and so on, which you can opt to use. You can also create and plug in your own custom authentication system.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Subsystems]({% link content-services/5.2/develop/repo-ext-points/subsystems.md %}#subsystems)|Implementing a customization as a subsystem allows a more fully decoupled customization. It is, for example, possible to disable the customization at run time.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Module Components]({% link content-services/5.2/develop/repo-ext-points/module-components.md %})|A Module Component executes code and is tied to a specific Module. It is packed with the rest of the module files in an AMP or JAR.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Ratings]({% link content-services/5.2/develop/repo-ext-points/ratings.md %})|A rating scheme is a defined system of ratings for content which is identified by a unique name and which provides a minimum and maximum allowed rating. There are out of the box ratings facilities, but as a developer you can also implement your own.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Form Processors]({% link content-services/5.2/develop/share-ext-points/form-processors.md %}#form-processors)|Form processors control the persistence of form data and the generation of the form template for a specific item such as a node, task, type, or action. Custom Form Processors can be implemented to support a new kind of item.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Form Processor Filters]({% link content-services/5.2/develop/share-ext-points/form-processor-filters.md %}#form-processor-filters)|Form filters can be used to intercept a form processor's persist form data call and generate form template call. "Before" and "After" method hooks are available in the filter to control form data persistence and form template generation.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|[Patches]({% link content-services/5.2/develop/repo-ext-points/patches.md %})|A patch executes a piece of Java code when Alfresco Content Services starts up, and logs the result in `ALF_APPLIED_PATCHES` database table.|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|

-   **[Content Model]({% link content-services/5.2/develop/repo-ext-points/content-model.md %})**  
Defining a custom content model for the repository is a fundamental task in almost every content management project. It will allow you to build a robust system with content that can be classified, searched, structured, and processed in many different ways.
-   **[Data Lists]({% link content-services/5.2/develop/repo-ext-points/data-lists.md %})**  
Data lists are records of data stored in the repository as nodes. There are a number of data list types available but custom ones can also be implemented.
-   **[Actions]({% link content-services/5.2/develop/repo-ext-points/repo-actions.md %})**  
Repository actions are reusable units of work that can be invoked from the User Interface (UI). Examples include Workflow and web scripts. Much of the functionality in the Share UI is backed by an Action.
-   **[Workflow]({% link content-services/5.2/develop/repo-ext-points/index.md %}#workflow)**  
Alfresco Content Services includes the Process Engine as standard. You can create custom workflows to manage your business processes.
-   **[Web scripts]({% link content-services/5.2/develop/api-reference.md %}#web-scripts)**  
Repository web scripts are the fundamental building blocks used for extending the REST API in Alfresco Content Services.
-   **[JavaScript Root Objects]({% link content-services/5.2/develop/repo-ext-points/javascript-root-objects.md %})**  
A number of JavaScript root objects are available when you are implementing a controller for a Web Script, such as `companyhome` and `people`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.
-   **[Behaviors/Policies]({% link content-services/5.2/develop/repo-ext-points/behavior-policies.md %}#behaviors/policies)**  
Behavior Policies can be used to run custom code when an event, such as adding a content item or deleting a content item, happens.
-   **[Bootstrap content]({% link content-services/5.2/develop/repo-ext-points/bootstrap-content.md %})**  
For many content management solutions it is useful to have some data populated when the solution is first deployed. This is done by bootstrapping content.
-   **[Permissions / Roles]({% link content-services/5.2/develop/repo-ext-points/permissions.md %})**  
 Permissions and their groupings are defined in XML configuration files. The default files are found in the distribution configuration directory as permissionDefinitions.xml and sitePermissionDefinitions.xml. This configuration can be replaced or extended to create new permissions and roles.
-   **[MIME Types]({% link content-services/5.2/develop/repo-ext-points/mimetypes.md %})**  
Alfresco Content Services supports, and can detect, a wide range of MIME types out-of-the-box. It is also possible to add support for other custom MIME types.
-   **[Content Stores]({% link content-services/5.2/develop/repo-ext-points/content-stores.md %}#content-stores)**  
There are many Content Stores available out-of-the-box but custom stores can also be implemented.
-   **[Audit Log]({% link content-services/5.2/develop/repo-ext-points/audit-log.md %}#audit-log)**  
Alfresco provides the ability to audit activity in the repository. What to audit log can be customized.
-   **[Metadata Extractors]({% link content-services/5.2/develop/repo-ext-points/metadata-extractors.md %}#metadata-extractors)**  
Alfresco Content Services performs metadata extraction on content automatically, however, you may wish to create custom metadata extractors to handle custom file properties and custom content models.
-   **[Admin Console Components]({% link content-services/5.2/develop/repo-ext-points/admin-console-components.md %}#admin-console-components)**  
Extension modules that needs some form of administration interface can be supported by a custom Admin Console Component.
-   **[Content Transformers (and Renditions)]({% link content-services/5.2/develop/repo-ext-points/content-transformers-renditions.md %})**  
Alfresco Content Services provides many different types of content transformations out-of-the-box. Custom transformations can also be implemented and configured.
-   **[Scheduled Jobs]({% link content-services/5.2/develop/repo-ext-points/scheduled-jobs.md %}#scheduled-jobs-definitions)**  
Alfresco Content Services automatically runs a number of scheduled jobs, for example the content store cleaner job and temporary file cleaner job. It is possible to configure new scheduled jobs.
-   **[Authentication]({% link content-services/5.2/develop/repo-ext-points/authentication.md %}#authentication)**  
Alfresco Content Services provides a number of authentication systems out-of-the-box, such as LDAP. It is also possible to implement and configure custom authentication systems.
-   **[Subsystems]({% link content-services/5.2/develop/repo-ext-points/subsystems.md %}#subsystems)**  
Subsystems are configurable modules responsible for a piece of functionality in Alfresco Content Services. It is possible to implement an extension as a custom subsystem.
-   **[Module Components]({% link content-services/5.2/develop/repo-ext-points/module-components.md %})**  
A ModuleComponent executes code and is tied to a specific Module. It is packed with the rest of the module files in an AMP or JAR.
-   **[Ratings]({% link content-services/5.2/develop/repo-ext-points/ratings.md %})**  
Alfresco Content Services supports rating of content according to different schemes, such as likes or five-star. It is also possible to implement custom rating schemes.
-   **[Form Processors]({% link content-services/5.2/develop/share-ext-points/form-processors.md %}#form-processors)**  
Custom Form Processor implementations can be implemented and integrated via a small amount of Spring configuration. Typically you will do this to support a new "kind" of form.
-   **[Form Processor Filters]({% link content-services/5.2/develop/share-ext-points/form-processor-filters.md %}#form-processor-filters)**  
Form Processor filters can be used to modify submitted form data before and after persistence. They can also be used to manage form fields before and after form generation.
-   **[Patches]({% link content-services/5.2/develop/repo-ext-points/patches.md %})**  
A patch is a piece of Java code that executes once when Alfresco Content Services starts. Custom patches can be implemented.


## Share extensions {#share-extensions}

This information looks at developing extensions for Alfresco Share. In particular, the creation of Share Extensibility Modules.

-   **[Getting started](#getting-started)**  
This information covers the use case of extending the Alfresco Share User Interface with extra functionality, such as displaying custom metadata and custom workflow forms.
-   **[Share Architecture](#share-architecture)**  
When developing for Share it is important to understand the application architecture and the underlying development frameworks. It is also important to know what extension points that are available to you for customizing the UI in a supported way.
-   **[Share Extension Points]({% link content-services/5.2/develop/share-ext-points/index.md %})**  
Introduction to the supported extension points in the Alfresco Share web application.
-   **[Useful Tools]({% link content-services/5.2/develop/tools.md %}#useful-tools)**  
There are a few tools that is useful to know about when developing customizations for the Share web application.
-   **[Tutorials]({% link content-services/5.2/tutorial/index.md %}#tutorials)**  
Tutorials for the different Extension Points that can be used to customize the Share web application. The tutorials have been organized based on what part of the user interface they relate to, such as for example Menu, Pages, Dashboard, and so on.
-   **[Introducing Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau)**  
There are a number of updated UI framework features that were introduced in Alfresco One 4.2 and further expanded in Alfresco Content Services 5.2.7. The updated UI framework goes by the name of Aikau.



## Getting started {#getting-started}

This information covers the use case of extending the Alfresco Share User Interface with extra functionality, such as displaying custom metadata and custom workflow forms.

The Share User Interface provides a number of extension points where custom functionality can be plugged in and run embedded with the rest of the Share code. This is functionality that is not related to the platform and that does not fit the remote integration use case.



## Share Architecture {#share-architecture}

When developing for Share it is important to understand the application architecture and the underlying development frameworks. It is also important to know what extension points that are available to you for customizing the UI in a supported way.

### Introduction

Alfresco Share (share.war) is a web application that runs on the Java Platform. In a development environment it is usually deployed and run on top of Apache Tomcat. Share is built up of a main menu that leads to pages, which is similar to most other web applications that you might come across. However, there is one special page type called Dashboard that contains dashlets. A Dashboard page can be configured by the end-user, who can add, remove, and organize the dashlets on the page.

Share pages and dashlets are implemented with something called web scripts, which is basically REST-based APIs. These APIs are called Surf web scripts when you are dealing with Alfresco Share. There is also repository web scripts that are used to extend the repository web application (alfresco.war) with REST-based APIs. Surf Web Scripts are referred to as *Presentation Web Scripts* and the repository web scripts as *Data Web Scripts*.

Share web scripts, pages, and dashlets are implemented with a user interface (UI) development framework called Surf. This framework was originally developed by Alfresco, then donated to the Spring Source foundation, and finally brought back into Alfresco products. It provides a way of breaking a HTML page into re-usable component parts. Surf is built on top of the Spring Web MVC technology, which in turn uses the Spring Framework.

Developers can also add completely new pages and dashlets to the Share UI when content should be viewed or handled in a specific way. Sometimes it is also required to modify existing pages. To customize the Share UI developers use so called *[Extension Points]({% link content-services/5.2/develop/share-ext-points/index.md %})*, which are supported ways of injecting new custom code that should alter the functionality of the Share web application.

The following picture gives an overview of the Alfresco Share application architecture, note that not all available extension points are illustrated in this picture:

![]({% link content-services/images/dev-extensions-share-architecture.png %})

Share gets the content that it should display in pages and dashlets by calling repository web scripts, which returns JSON or XML that can be incorporated into the presentation. The presentation is actually put together with two different kinds of JavaScript frameworks, Yahoo UI library (YUI) and Aikau, which is based on Dojo. An Aikau page is based on Surf but it makes page composition much easier than with pure Surf pages.

You can focus solely on Aikau if the only thing you are going to do is add new stuff to the Share UI. However, if you need to alter behavior of existing pages, then you might also need to get up to speed on the details of the Surf page model, as only the following has been converted to Aikau:

-   Share Header Menu and Title (4.2)
-   Live Search (5.0)
-   Filtered Search Page (5.0)
-   Search Management Page (5.0)
-   Site Management Page (5.0)
-   Analytics and Reporting Widgets (5.0)
-   Document List prototype (5.0)

The following sections get into a bit more details around Surf pages and Aikau pages.

### Server Side Framework (Surf)

The layout of a Share page is defined with the Surf development framework, which is a server side framework ([Surf deep dive](#surf-framework-guide)). This means that the involved files are processed on the server side (compared to Browser processing of JavaScript files). Surf is based on the Model View Controller (MVC) pattern where the controller(s) is mostly implemented in server side JavaScript (The Rhino JavaScript engine is included on the server side). The template is written in FreeMarker, and the model is a hash map that is set up in the controller(s) and available in the template.

Each page template defines one or more regions for things like header, footer, body, navigation, see the following picture:

![]({% link content-services/images/dev-extensions-share-surf-template.png %})

To be able to reuse regions we can scope them to page, template, or global usage:

![]({% link content-services/images/dev-extensions-share-surf-template-scopes.png %})

Each region is implemented as a reusable component. A component implementation is done with a Surf web script, which is the same thing as the REST-based request and response model, the predominant Web Service design model. The component web scripts will typically return HTML fragments that make up different parts of the page:

![]({% link content-services/images/dev-extensions-share-surf-template-components.png %})

With all these different objects we might expect there to be some form of model that makes up the whole Surf UI development framework. It looks like this:

![]({% link content-services/images/dev-extensions-share-surf-page-model.png %})

The model is referred to as the `siteData` and has more stuff than just pages and templates ([siteData Reference]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#surf-object-xml-quick-reference-sitedata)). You will however mostly be dealing with component, page, and template-instance files, which are simple XML files:

```

/WEB-INF/classes/alfresco
  /site-data
    /chrome
    /components
      ...
      global.header.xml
    /component-types
    /configurations
    /content-associations
    /extensions
    /page-associations
    /pages
      ...
      documentlibrary.xml
      ...
      search.xml
      ...
      task-details.xml
      ...
    /page-types
    /template-instances
        1-column.xml
        2-columns.xml
        3-columns.xml
        ...
        content-viewer.xml
        ...
        search.xml
        ...
    /template-types
    /themes
    
```

The Site Data model defines the [page in XML]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#page), like in the following example for Search (alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-data/pages/search.xml):

```

<?xml version='1.0' encoding='UTF-8'?>
<page>
   <title>Search</title>
   <title-id>page.search.title</title-id>
   <description>Search view</description>
   <description-id>page.search.description</description-id>
   <template-instance>search</template-instance>
   <authentication>user</authentication>
   <components>

      <!-- Title -->
      <component>
         <region-id>title</region-id>
         <url>/components/title/search-title</url>
      </component>

      <!-- Search -->
      <component>
         <region-id>search</region-id>
         <url>/components/search/search</url>
      </component>

   </components>
</page>

```

Here we can see that some [components]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#component) have been defined inline in the search page definition, instead of in the `/components` directory as separate files. The name of the page definition file is implicitly setting the page id to `search`. A corresponding [template instance]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#template-instance) file is expected to be present in the `template-instances` directory. In our case it will be a file called `search.xml`:

```

<?xml version='1.0' encoding='UTF-8'?>
<template-instance>
   <template-type>org/alfresco/search</template-type>
</template-instance>
```

It will have a link to the physical template that contains the layout of the page. The template files are located under a different directory called `/templates`, which is on the same level as the `site-data` directory:

```

/WEB-INF/classes/alfresco
  /site-data
  /templates
    /org
      /alfresco
        1-column.ftl
        2-columns.ftl
        3-columns.ftl
        ...
        content-viewer.ftl
        ...
        search.ftl
        ...
      
```

The `search.ftl` template file looks like this with the regions etc:

```

<#include "include/alfresco-template.ftl" />
<@templateHeader />

<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
   <div id="bd">
      <div class="yui-t1">
         <div id="yui-main">
            <@region id="search" scope="page" />
         </div>
      </div>
   </div>
   </@>
</@>

<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>

```

The search page reuses the global header and footer components and then defines a page specific region called search. The web script to call for the search component is already defined in the page definition XML above (that is, /components/search/search). The controller file for the search Web Script looks like this (alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/components/search/search.get.js):

```

/**
 * Search component GET method
 */

function main()
{
   // fetch the request params required by the search component template
   var siteId = (page.url.templateArgs["site"] != null) ? page.url.templateArgs["site"] : "";
   var siteTitle = null;
   if (siteId.length != 0)
   {
      // Call the repository for the site profile
      var json = remote.call("/api/sites/" + siteId);
...

```

This is server side JavaScript code that sets up a model with data for the template. The template looks like this (alfresco/tomcat/webapps/share/WEB-INF/classes/alfresco/site-webscripts/components/search/search.get.html.ftl):

```

<@markup id="css" >
   <#-- CSS Dependencies -->
   <@link href="${url.context}/res/components/search/search.css" group="search"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <@script src="${url.context}/res/components/search/search-lib.js" group="search"/>
   <@script src="${url.context}/res/components/search/search.js" group="search"/>
</@>

<@markup id="widgets">
   <@createWidgets group="search"/>
</@>

<@markup id="html">
   <@uniqueIdDiv>
      <#assign el=args.htmlid>
      <#assign searchconfig=config.scoped['Search']['search']>
      <div id="${el}-body" class="search">
         <#assign context=searchconfig.getChildValue('repository-search')!"context">
         <#if searchQuery?length == 0 && context != "always">
         <div class="search-sites">
...

```

The template is where we will find references to client side code/resources. The `css` and `js` sections above points to the client side CSS and JS that should be part of the `<head>` section in the web page, and downloaded and executed by the browser to create the user interface. So as we are starting to talk about the client side, let's dig into it a bit more in the next section.

### Client Side Frameworks (Surf Pages and Aikau Pages)

To get an idea of the differences between the old school Surf pages, and the new Surf pages called Aikau, this example implements a simple page in both client side frameworks. The thing that might be a bit confusing to start with is that Aikau pages are also old school Surf pages under the hood. An Aikau page actually uses a predefined Surf page as a starting point. Start with an old school Hello World page and see how to add it to the Share UI.

**Hello World Old School Surf Page**

The following steps are needed to add a Surf Page:

-   Add a Surf Page definition file (XML)
-   Add a Template Instance file (XML)
-   Add a physical Template file (FTL)
-   Add a properties file (.properties) - Optional but good practice
-   Add Web Script(s) that fetches content to display (if you have `page` scoped regions and use an existing template)

The full tutorial, and introduction to Surf Pages, can be found ([here](#introduction-to-surf-pages)).

Next, have a look at how to implement the same Hello World page with Aikau.

**Hello World Aikau Page**

To implement the Hello World page in Aikau we have to go through the following steps:

-   Add a Web Script descriptor (XML)
-   Add a Web Script template (FTL)
-   Add a Web Script controller (JS) with page layout/model
-   Add Widget to display content
-   Choose what Surf Page you want to use as a basis (dp, hdp, rdp etc)

For a full tutorial and introduction to Aikau Pages, see ([Introduction to Aikau Pages](#introduction-to-aikau-pages)).

### Extension Points in Share

As you can imagine, there are loads of extension points that you can use in the Share UI to build a customized version of the user interface. In this article we have looked at the major ones, which are old school Surf Pages, Aikau Surf pages, Aikau widgets, web scripts, Surf Module extensions, and dashlets. I know we did not explicitly look at how to implement dashlets, but it is the same thing as implementing a Web Script.

There are many more extension points though, for example the Document Library page in a site can be extended via something called Document Library Actions. It is important to know about these supported extension points, and follow them, as otherwise your code might not work in a future release of Alfresco Content Services, and you might have trouble getting the support you need.

Here is a list of each supported extension point in Share, for a comprehensive description of each one go to the [Share Extension Points]({% link content-services/5.2/develop/share-ext-points/index.md %}) section (OOTB = Out-of-the-box functionality):

|Extension Point Name|
|--------------------|
|[Share Configuration]({% link content-services/5.2/develop/share-ext-points/share-config.md %})|
|[Form Controls]({% link content-services/5.2/develop/share-ext-points/form-controls.md %}#form-controls)|
|[Form Filters]({% link content-services/5.2/develop/share-ext-points/form-processor-filters.md %}#form-processor-filters)|
|[Form Field Validation Handlers]({% link content-services/5.2/develop/share-ext-points/form-field-validation-handlers.md %}#form-field-validation-handlers)|
|[Evaluators]({% link content-services/5.2/develop/share-ext-points/evaluators.md %}#evaluators)|
|[Site Presets]({% link content-services/5.2/develop/share-ext-points/site-presets.md %}#site-presets)|
|[Share Themes]({% link content-services/5.2/develop/share-ext-points/share-themes.md %}#share-themes)|
|[Document Library]({% link content-services/5.2/develop/share-ext-points/doclib.md %}#document-library))|
|[Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|[Surf Web Scripts]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#surf-web-scripts)|
|[Surf Web Script JavaScript Root Objects]({% link content-services/5.2/develop/share-ext-points/javascript-root-objects.md %}#surf-web-script-javascript-root-objects)|
|[Surf Pages]({% link content-services/5.2/develop/share-ext-points/surf-pages.md %}#surf-pages)|
|[Surf Dashlets]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets)|
|[Surf Widgets]({% link content-services/5.2/develop/share-ext-points/surf-widgets.md %}#surf-widgets)|
|[Aikau Menus]({% link content-services/5.2/develop/share-ext-points/aikau-menus.md %}#aikau-menus)|
|[Aikau Pages]({% link content-services/5.2/develop/share-ext-points/aikau-pages.md %}#aikau-pages)|
|[Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/aikau-dashlets.md %}#aikau-dashlets)|
|[Aikau Widgets]({% link content-services/5.2/develop/share-ext-points/aikau-widgets.md %}#aikau-widgets)|
|[Modifying OOTB Surf Pages]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-pages)|
|[Modifying OOTB Surf Dashlets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-dashlets)|
|[Modifying OOTB Surf Widgets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-surf-widgets)|
|[Modifying OOTB Aikau Pages]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-pages)|
|[Modifying OOTB Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-dashlets)|
|[Modifying OOTB Aikau Widgets]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md %}#modifying-out-of-the-box-aikau-widgets)|
|[Modifying OOTB Surf Web Scripts]({% link content-services/5.2/develop/share-ext-points/modify-ootb-code.md%}#modifying-out-of-the-box-surf-web-scripts)|

-   **[Introduction to Surf Pages](#introduction-to-surf-pages)**  
Use this information for a brief introduction to Spring Surf Pages.
-   **[Introduction to Aikau Pages](#introduction-to-aikau-pages)**  
Use this information for a brief overview of Aikau Pages.
-   **[Surf Framework Guide](#surf-framework-guide)**  
Surf lets you build user interfaces for web applications using server-side scripts and templates without Java coding, recompilation, or server restarts. Surf follows a content-driven approach, where scripts and templates are simple files on disk so that you can make changes to a live site in a text editor.
-   **[Advanced Surf Topics]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#advanced-surf-topics)**  
Advanced topics in the Surf development framework.



[Spring Framework](http://spring.io/)

[Spring MVC](http://docs.spring.io/spring/docs/current/spring-framework-reference/html/mvc.html)

[Dojo Toolkit](https://dojotoolkit.org/)

[Dijit Widget Library](https://github.com/dojo/dijit)

[Programming with Surf](#surf-framework-guide)

## Introduction to Surf Pages {#introduction-to-surf-pages}

Use this information for a brief introduction to Spring Surf Pages.

Let's see how we can implement a Hello World page with the old school Surf Page framework.

The following steps are needed to add a Surf Page:

-   Add a Surf Page definition file (XML)
-   Add a Template Instance file (XML)
-   Add a physical Template file (FTL)
-   Add a properties file (.properties) - Optional but good practice
-   Add Web Script(s) that fetches content to display (if you have `page` scoped regions and use an existing template)

Let's start out with the page definition file, create a file called `helloworldhome.xml` in the alfresco/tomcat/shared/classes/alfresco/web-extension/site-data/pages directory. You will have to create the site-data and pages directories. We are not using a build project to be able to focus solely on Surf.

Add the following XML to the file:

```
<?xml version='1.0' encoding='UTF-8'?>
<page>
   <title>Hello World Home</title>
   <title-id>page.helloworldhome.title</title-id>
   <description>Hello World Home Description</description>
   <description-id>page.helloworldhome.description</description-id>
   <template-instance>helloworldhome-three-column</template-instance>
   <authentication>none</authentication>
</page>
```

Here we are defining the title and description of the page both hard-coded in the definition, and as references to a properties file with labels (i.e. the `title-id` and `description-id` elements). The page will not require any authentication, which means we cannot fetch any content from the Alfresco Repository from it. It is also going to use a three column template, or that is the idea, you can name the template instance whatever you want.

Now create the template instance file called `helloworldhome-three-column.xml` in the alfresco/tomcat/shared/classes/alfresco/web-extension/site-data/template-instances directory. You will have to create the template-instances directory:

```
<?xml version='1.0' encoding='UTF-8'?>
<template-instance>
   <template-type>org/alfresco/demo/helloworldhome</template-type>
</template-instance>
```

This file just points to where the FreeMarker template for this page will be stored. So create the alfresco/tomcat/shared/classes/alfresco/web-extension/templates/org/alfresco/demo directory path. Then add the `helloworldhome.ftl` template file to it:

```
This is just a test page. Hello World!
```

Continue with the properties file for the page title and description. Create a file called `helloworldhome.properties` in the alfresco/tomcat/shared/classes/alfresco/web-extension/messages directory. You will have to create the messages directory:

```
page.helloworldhome.title=Hello World 
page.helloworldhome.description=Hello World Home Description
```

This file just points to where the FreeMarker template for this page will be stored. We also need to tell Alfresco Share about the new resource file, rename the `custom-slingshot-application-context.xml.sample` to `custom-slingshot-application-context.xml`, it is located in the web-extension directory. Then define the following bean:

```
<bean id="org.alfresco.demo.resources" class="org.springframework.extensions.surf.util.ResourceBundleBootstrapComponent">
  <property name="resourceBundles">
     <list>
        <value>alfresco.web-extension.messages.helloworldhome</value>
     </list>
  </property>
</bean>
```

To test this page you will have to restart Alfresco. It can then be accessed via the `http://localhost:8080/share/page/helloworldhome`. The page does not look very exciting:

![]({% link content-services/images/dev-extensions-share-surf-page-helloworld-noheaderfooter.png %})

So we are missing both the Share header and footer, which turns out to be global components that we can easily include. We just need to change the template file a bit. Open up the `helloworldhome.ftl` file and change it so it looks like this:

```
<#include "/org/alfresco/include/alfresco-template.ftl" />
<@templateHeader></@>
<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
    <div id="bd">
        <h1>This is just a test page. Hello World!</h1>
    </div>
   </@>
</@>
<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>
```

What we are doing here is first bringing in another FreeMarker file called `alfresco-template.ftl` that contains, you guessed it, FreeMarker template macros. We then use these macros (elements starting with `@`) to set up the layout of the page with header and footer. The header and footer content is fetched via the `share-header` and `footer` global scope components (Web Scripts). To view the result of our change we need to restart the server again, after this we should see the following:

![]({% link content-services/images/dev-extensions-share-surf-page-helloworld-headerfooter.png %})

So that looks a bit better. The next thing we want to do is to make the page a bit more dynamic, currently we have hard-coded the content for the page in the template. Let's add a Web Script that will return the content to display. This will require us to update the template with an extra region as follows:

```
<#include "/org/alfresco/include/alfresco-template.ftl" />
<@templateHeader></@>
<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
    <div id="bd">
        <@region id="body" scope="page" />
    </div>
   </@>
</@>
<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>
```

We have called the new region `body` and set `page` scope for it. This requires us to define a new component for this region. This can be done either in the page XML, or as a separate file in the site-data/components directory, we will do the latter. Create the components directory and add a file called `page.body.helloworldhome.xml` to it:

```
<?xml version='1.0' encoding='UTF-8'?>
<component>
  <scope>page</scope>
  <region-id>body</region-id>
  <source-id>helloworldhome</source-id>
  <url>/components/helloworld/body</url>
</component>      
```

The component file names follow a naming convention: `global | template | page>.<region-id>.[<template-instance-id | page-id>].xml` The URL for this component points to a Web Script that will return the Hello World message. Start implementing it by creating a descriptor file called `helloworld-body.get.desc.xml` located in the alfresco/tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco/demo directory:

```
<webscript>
    <shortname>helloworldbody</shortname>
    <description>Returns the body content for the Hello World page.</description>
    <url>/components/helloworld/body</url>
</webscript>
```

Note that the URL is the same as we set in the component definition. Now implement the controller for the Web Script, create a file called `helloworld-body.get.js` in the same place as the descriptor:

```
model.body = "This is just a test page. Hello World! (Web Scripting)";      
```

The controller just sets up one field in the model with the Hello World message. Now implement the template for the Web Script, create a file called `helloworld-body.get.html.ftl` in the same place as the descriptor:

```
<h1>${body}</h1>      
```

Restart the server. Then access the page again, you should see the Hello World message change to "This is just a test page. Hello World! (Web Scripting)".

To summarize a bit, the following is a picture of all the files that were involved in creating this Surf page the old school way:

![]({% link content-services/images/dev-extensions-share-surf-page-helloworld-involvedfiles.png %})

What you could do now is extend the Hello World page with some more sophisticated presentation using the YUI library. If you do that you end up with the pattern for how most of the old school Share pages have been implemented.

Next we will have a look at how to implement the same Hello World page the new way with [Aikau](#introduction-to-aikau-pages).

[Back to Share Architecture and Extension Points](#share-architecture).



## Introduction to Aikau Pages {#introduction-to-aikau-pages}

Use this information for a brief overview of Aikau Pages.

Let's see how we can implement a Hello World page with the new Aikau framework.

The following steps are needed to add an Aikau Page:

-   Add a Web Script descriptor (XML)
-   Add a Web Script template (FTL)
-   Add a Web Script controller (JS) with page layout/model
-   Add Widget to display content
-   Choose what Surf Page you want to use as a basis (dp, hdp, rdp etc)

OK, this might be a bit confusing, starting with a web script and then selecting a Surf page? If you have read through the [Share Architecture](#share-architecture) page then you will remember that an Aikau page is based on a predefined Surf Page. So when you implement an Aikau page you are actually bypassing all the Site Data model stuff, and you go directly to the Web Script implementation that does the real job of fetching content and defining the presentation.

Start implementing the Aikau Page web script by creating a descriptor file called `helloworld-aikau.get.desc.xml` located in the alfresco/tomcat/shared/classes/alfresco/web-extension/site-webscripts/org/alfresco/demo directory:

```
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World page definition</description>
    <family>Share</family>
    <url>/helloworld</url>
</webscript>
```

Now implement the controller for the Web Script, create a file called `helloworld-aikau.get.js` in the same place as the descriptor:

```
model.jsonModel = {
    widgets: [
        {
            id: "SET_PAGE_TITLE",
            name: "alfresco/header/SetTitle",
            config: {
                title: "Hello World"
            }
        },
        {
            id: "DEMO_SIMPLE_MSG",
            name: "example/widgets/HelloWorldTextWidget"
        }
    ]
};      
```

The controller is where the main work is done when it comes to implementing the layout of the page. If you do not need any custom widgets then it might even be the only major thing you need to implement to get the Aikau page up and running. Now implement the template for the web script, create a file called `helloworld-aikau.get.html.ftl` in the same place as the descriptor:

```
<@processJsonModel />
```

The template just kicks off the `processJsonModel` FreeMarker template macro, which will, as it says, process the JSON model and assemble the page components.

Our page model contains an example widget that we need to implement. It is specified to be at the `example/widgets` package path. Dojo is the JavaScript framework used behind the scenes, and we need to tell it about the new package path. This can be done via a Spring Surf Module extension. Create a file called `example-widgets.xml` and put it in the alfresco/tomcat/shared/classes/alfresco/web-extension/site-data/extensions directory:

```
<extension>
  <modules>
    <module>
      <id>Example Aikau Widgets</id>
      <version>1.0</version>
      <auto-deploy>true</auto-deploy>
      <configurations>
        <config evaluator="string-compare" condition="WebFramework" replace="false">
          <web-framework>
            <dojo-pages>
              <packages>
                <package name="example" location="js/example"/>
              </packages>
            </dojo-pages>
          </web-framework>
        </config>
      </configurations>
    </module>
  </modules>
</extension>      
```

Now we can start implementing the Aikau Widget that should return the Hello World message. To do that we need to implement a new Dojo JavaScript class called `HelloWorldTextWidget`. The widget is pure client side resource stuff so we need to add the files involved into the exploded Share web app (this is just because we are not using a build project). Create a file called `HelloWorldTextWidget.js` and put it in the alfresco/tomcat/webapps/share/js/example/widgets directory:

```
define(["dojo/_base/declare",
        "dijit/_WidgetBase",
        "alfresco/core/Core",
        "dijit/_TemplatedMixin",
        "dojo/text!./HelloWorldTextWidget.html"
    ],
    function(declare, _Widget, Core, _Templated, template) {
        return declare([_Widget, Core, _Templated], {
            templateString: template,
            i18nRequirements: [ {i18nFile: "./HelloWorldTextWidget.properties"} ],
            cssRequirements: [{cssFile:"./HelloWorldTextWidget.css"}],
            
            buildRendering: function example_widgets_HelloWorldTextWidget__buildRendering() {
                this.helloWorldMsg = this.message('hello.world');
                this.inherited(arguments);

            }
        });
});      
```

This widget is based on an HTML template defined in a file called `HelloWorldTextWidget.html`, create this file in the same place as the Widget class:

```
<div class="helloWorldMsgStyle">${helloWorldMsg}</div>
```

The widget also uses a property called `hello.world` that needs to be available in a resource file called `HelloWorldTextWidget.properties`, create it in the same place as the Widget class:

```
hello.world=This is just a test page. Hello World! (Aikau)      
```

Finally the widget template uses a CSS style called `helloWorldMsgStyle` that needs to be available in a resource file called `HelloWorldTextWidget.css`, create it in the same place as the Widget class:

```
.helloWorldMsgStyle {
    border: 1px #000000 solid;
    padding: 1em;
    width: 100px;
    background-color:lightgrey;
}      
```

Now restart Alfresco Content Services and then access the page with the `http://localhost:8080/share/page/hdp/ws/helloworld` URL. You should see the following page in Share:

![]({% link content-services/images/dev-extensions-share-surf-page-helloworld-aikau.png %})

The page we choose as a basis (that is, the Hybrid Dynamic Surf Page - `hdp`) provides both the header and the footer for the Share web application. If you want to see the page stand-alone you can use the `dp` page as a basis.

So when we are working with Aikau pages we do not have to bother about the Site Data model and all the different kinds of XML files. We just create a web script where the controller will contain the complete layout of the page. And then the page content will go into an auto-generated region on the Surf page we select.

[Back to Introduction to Surf Pages](#introduction-to-surf-pages)

[Back to Share Architecture and Extension Points](#share-architecture)



## Surf Framework Guide {#surf-framework-guide}

Surf lets you build user interfaces for web applications using server-side scripts and templates without Java coding, recompilation, or server restarts. Surf follows a content-driven approach, where scripts and templates are simple files on disk so that you can make changes to a live site in a text editor.

Surf is a Spring framework extension for building new Spring framework applications or plugging into existing Spring web MVC (Model, View, Controller) applications. Spring Web MVC provides separation between the application Model, View, and Controller (known as *MVC*). You can use Surf with other popular Spring Web MVC technologies including Tiles, Grails, and Web Flow.

Surf's object model lets you define pages, templates, components, and themes using XML. The Spring application picks up new files and processes them through scripts and templates to produce the view, and writes scripts using server-side JavaScript and Groovy. Templates are written using FreeMarker. You can build both page-centric and content-centric websites using Surf, and it provides out-of-the-box support for rendering content delivered through content delivery services, such as CMIS, Atom, and RSS.

> **Note:** The Groovy invokedynamic `indy` library is included in Alfresco Content Services. Depending on the JVM version, you can target close to Java performance for dynamic Groovy with invokedynamic support activated.

### Features

-   **Scripts and templates**: Everything in Surf consists of scripts, templates, or configuration. This means no server restarts or compilation.
-   **Reusability**: Surf’s presentation objects, templates, and scripts emphasize reusability. Scoped regions and component bindings allow you to describe presentation with less code.
-   **Spring Web MVC**: Surf plugs in as a view resolver for Spring Web MVC, enabling you to use Surf for all or part of a site's view resolution. Surf renders views on top of annotated controllers and is plug-compatible with Spring Web Flow, Spring Security, Spring Roo, and Spring tag libraries.
-   **RESTful scripts and templates**: All page elements and remote interfaces are delivered through a RESTful API. The full feature set of web scripts is available to Surf applications. Write new remote interfaces or new portlets with a script, a template, and a configuration file.
-   **Content management**: A set of client libraries and out-of-the-box components streamline interoperability with CMIS content management systems, letting you easily access and present Enterprise content using Surf components and templates.
-   **Two-tier architecture**: Surf works in a decoupled architecture where the presentation tier is separate from the content services tier.
-   **Production, development, and staging/preview**: Configure Surf to work in a number of deployment scenarios including development, preview, or production environments.
-   **Development tools**: Tools that plug into the SpringSource suite of development tools include Eclipse add-ons for SpringSource Tool Suite, as well as Spring Roo plug-ins to enable scaffolding and script-driven site generation.

-   **[Surf content types]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#surf-content-types)**  
In Spring Surf, content is devided into *Semantic content* and *Presentation content*, and the web application looks at both to render the final look of the Web page.
-   **[Content delivery services]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#content-delivery-services)**  
Surf connects to content delivery services to provide content retrieval and query for presentation and semantic content.
-   **[Model-View-Controller]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#model-view-controller)**  
MVC applications use a dispatcher to handle requests for an application. It looks at the URL to determine which controller to invoke to set up a model, and then which view to invoke to render the model.
-   **[Spring Web MVC]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#spring-web-mvc)**  
Spring Web MVC is the Model-View-Controller implementation for Spring framework web applications.
-   **[Surf View Composition framework]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#surf-view-composition-framework)**  
Surf provides a view composition framework.
-   **[Presentation content]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#presentation-content)**  
Presentation content consists of templates, scripts, and XML files that Surf can pick up without a server restart.
-   **[Connectors and credentials]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#connectors-and-credentials)**  
Web script developers often work with remote sources of data. Surf makes it easy to reach out to these information sources and pull together feeds of data.
-   **[Surf object XML quick reference (siteData)]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#surf-object-xml-quick-reference-sitedata)**  
Surf objects are defined in XML. This document provides a quick reference guide to the most commonly used Surf objects, and how they are defined in XML.



