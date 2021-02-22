---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Alfresco Content Services architecture overview

At the core of the Alfresco Content Services system is a repository supported by a server that persists content, metadata, associations, and full text indexes. Programming interfaces support multiple languages and protocols upon which developers can create custom applications and solutions. Out-of-the-box applications provide standard solutions such as document management and records management.

As a Java application, the system runs on virtually any system that can run Java Enterprise Edition. At the core is the Spring platform, providing the ability to modularize functionality, such as versioning, security, and rules. Alfresco Content Services uses scripting to simplify adding new functionality and developing new programming interfaces. This portion of the architecture is known as web scripts and can be used for both data and presentation services. The lightweight architecture is easy to download, install, and deploy.

There are many ways to deploy, however most deployments follow a general pattern. Ultimately, Alfresco Content Services is used to implement ECM solutions, such as document management and records management. There can also be elements of collaboration and search across these solutions.

The solutions are typically split between clients and server, where clients offer users a user interface to the solution and the server provides content management services and storage. Solutions commonly offer multiple clients against a shared server, where each client is tailored for the environment in which it is used.

## Clients

Alfresco Content Services offers a web-based client called Alfresco Share, built entirely with the web script technology. Share provides content management capabilities with simple user interfaces, tools to search and browse the repository, content such as thumbnails and associated metadata, previews, and a set of collaboration tools such as wikis and discussions. Share is organized as a set of sites that can be used as a meeting place for collaboration. It's a web-based application that can be run on a different server to the server that runs the repository, providing opportunities to increase scale and performance.

Share can be deployed to its own tier separate from the content application server. It focuses on the collaboration aspects of content management and streamlining the user experience. It's implemented using Surf and can be customized without JSF knowledge.

Clients also exist for portals \(by using JSR-168 portlets\), mobile platforms, Microsoft Office, and the desktop. In addition, using the folder drive of the operating system, users can share documents through a network drive. Using JLAN technology, Alfresco can look and act just like a folder drive. JLAN is the only Java server-side implementation of the CIFS protocol, letting users interact with Alfresco Content Services as they do any other normal file drive except the content is now stored and managed in the content application server.

## Server

The content application server comprises a content repository and value-added services for building solutions.

The content application server provides the following categories of services built upon the content repository:

-   Content services \(transformation, tagging, metadata extraction\)
-   Control services \(workflow, records management, change sets\)
-   Collaboration services \(social graph, activities, wiki\)

Clients communicate with the content application server and its services through numerous supported protocols. HTTP and SOAP offer programmatic access while CIFS, FTP, WebDAV, IMAP, and Microsoft SharePoint protocols offer application access. The Alfresco Content Services installer provides an out-of-the-box prepackaged deployment where the content application server and Share are deployed as distinct web applications inside Apache Tomcat.

-   **[Guiding design principles](../concepts/alfresco-principles.md)**  
The Alfresco Content Services architecture supports the requirements of Enterprise Content Management \(ECM\) applications, such as Document Management \(DM\), Web Content Management \(WCM\), Records Management \(RM\), Digital Asset Management \(DAM\), and Search.
-   **[Web tier and Surf](../concepts/surf-about.md)**  
Alfresco Content Services provides ECM capabilities as data services, user interfaces, and user applications. The user interface capabilities are provided by applications and application components using Alfresco Content Services web tier, Surf, originally developed as a faster way to develop content applications using scripting and REST architecture.
-   **[Alfresco Share client application](../concepts/apps-about.md)**  
The Alfresco Content Services client application provide a means of accessing the repository. Alfresco Content Services provides Alfresco Share which is a web-based client application, providing an interface that allows the user to create, upload, and manage content.
-   **[Application server](../concepts/content-server-about.md)**  
At the heart of Alfresco Content Services is the application server, which manages and maintains the repository. The server's primary responsibility is to provide services for use in building ECM solutions. All the applications of the Alfresco Content Services suite are built upon and executed by the application server.
-   **[Repository](../concepts/content-repo-about.md)**  
The repository is comparable to a database, except that it holds more than data. The binary streams of content are stored in the repository and the associated full-text indexes are maintained by SOLR indexes.
-   **[Content services](../concepts/serv-about.md)**  
Services address the core use cases for content management applications including the logical organization of content, file management, version control, and security. Services also support the control of content through workflow and process management, and social and collaborative applications.
-   **[Programming models](../concepts/models-about.md)**  
A number of programming models are available for building an application using the content application server.
-   **[APIs](../concepts/api-about.md)**  
To access and extend out-of-the-box services, the content application server exposes two flavors of API, each designed for a specific type of client.
-   **[Content modeling](../concepts/content-modeling-about.md)**  
Content modeling is a fundamental building block of the repository that provides a foundation for structuring and working with content.
-   **[Protocols](../concepts/protocols-about.md)**  
 The content application server supports many folder and document-based protocols to access and manage content held within the repository using familiar client tools.
-   **[Modularity](../concepts/spring-fw-modularity.md)**  
The Alfresco Content Services system is modular. Every moving part is encapsulated as a service, where each service provides an external face in a formally defined interface and has one or more black-box implementations.
-   **[Web application framework](../concepts/web-app-framework.md)**  
Alfresco Share and all new web applications are built on Surf. This web application framework provides the typical features of this kind of framework and supports web content management needs.
-   **[Deployment options](../concepts/deploy-options.md)**  
You can deploy Alfresco Content Services in many different forms and topologies. Because its infrastructure foundation protects Alfresco Content Services from the environment within which it executes, you can choose components such as operating system, database, application server, web browser, and authentication system. It's designed to scale down as well as up.

**Parent topic:**[Alfresco Content Services architecture](../concepts/dev-arch-overview.md)

