---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Integration]
keyword: integration
---

# Integrating with other applications

Alfresco provides different programmatic ways to access the content management capabilities of the system to support use cases where applications need content services. By supporting a number of standards-based protocols, applications and application development environments can use existing tools to access, update, and search content.

Although Alfresco is built using the Java programming language, the system can be used by most of the popular programming languages. You can use the tools that are easiest to get your application up and going as quickly as possible, where the repository takes care of handling metadata, workflow, lifecycles, location, and search access. The tool you use depends on the level of control your application needs over metadata, context, and business processes, as well as the tools your application or your development environment provide for handling content.

The following guidelines describe how and where you might use these various integration points as part of your application.

## CMIS

Consider CMIS if your application needs programmatic access to the content repository, and especially if you intend to port your application to other content management systems.

## Web scripts

Existing web scripts provide a great deal of functionality in Alfresco. However, you can also create your own web scripts to perform an operation in Alfresco that is not covered by a web script or to perform several operations and minimize network communication. This can increase the performance of your application and push the logic down to the Alfresco repository, where it can be reused.

## File-based access

If metadata is not important to your application or processing of content and metadata can be handled with rules and actions, file-based access may be an easier route to integration with Alfresco. With the CIFS, WebDAV, NFS, and FTP file system emulation, storing and accessing content to and from Alfresco may already be supported by your application through standard file interfaces. Applications that create content can store content in Alfresco and it is now available for other applications and websites to access.

Applications that access files through Open dialogs or through programmatic file interfaces can navigate folder hierarchies and the content seamlessly. Although the content appears to be a file, the application is not directly accessing the content. Rather, it uses Alfresco APIs, so all the controls and services are in place. File access is simply an emulation of files and its access and storage would be no different than through APIs directly.

By storing content using file system emulation, logic for processing content \(for example, archiving, applying workflows and retention policies, and extracting metadata\) can be performed with rules. Applied at the folder or space level, these rules are initiated when the file is stored; therefore, the application integrating with Alfresco does not need to be modified to use Alfresco. All the business logic can be stored in the Alfresco repository.

## OpenSearch and feeds

Some applications, websites, and portals may use standard web-based technology to access external information using feeds \(such as RSS or Atom subscription protocols\) or queries using OpenSearch. Alfresco provides out-of-the-box RSS feeds to observe the contents of an individual folder or space, as well as activities related to a user or Share site. The Alfresco system also implements OpenSearch, which is a standard query protocol supported by many web sites, such as Yahoo!, Google, and Amazon.

If an application is designed to use either feeds or OpenSearch, then it can access Alfresco using the feed or search address. The results return descriptive information about the content return and a URL pointing directly to the content. If more specialized information is required or you would rather point to the properties page in Share or Explorer, you can create new RSS feeds or OpenSearch APIs as fairly simple web scripts. See the actual RSS feed and OpenSearch templates in the Data Dictionary as a reference for how to build your own.

## Java applications

If a repository is single-purpose and performance is most important, then you may want to access the Alfresco core API directly. This requires your application to reside on the same application server as the Alfresco system. A Java application can access all the base APIs and web scripts with minimal context switch.

## PHP applications

PHP applications can access Alfresco through CMIS, through web scripts as a RESTful interface, or directly from the same application server as Alfresco. Alfresco has an optional extension that includes the Quercus PHP interpreter in a Tomcat server. The Quercus PHP interpreter is capable of running popular PHP applications, such as Joomla!, Drupal, WordPress, and MediaWiki. With the Quercus integration with Alfresco, these applications are capable of accessing the Alfresco system, as are other PHP applications. The most popular way of accessing Alfresco is remotely through CMIS.

## .NET applications

Integrating Alfresco applications with .NET applications is very similar to integrations with Java applications through remote interfaces such as web scripts or CMIS. Either the SOAP or Atom Publishing interfaces can be used. All patterns of integration can be supported.

## Surf components

Surf components are designed to work with other web frameworks, such as Spring Webflow or Spring MVC. Surf components can save a lot of work in reimplementing user interface portions of your application or website if they replicate functionality that you were intending to build in a different web framework, such as a browser or viewer.

## Authentication and directory services

To interoperate between an application and Alfresco, it is important to consistently authenticate users to ensure secure access to either system. In addition, both systems need a consistent understanding of the identity of the user, so sharing a common directory service is also important. Alfresco synchronizes and uses standard LDAP and Active Directory services for authentication and directory services. The security systems are open as well to adapt to other systems. Alfresco also integrates with a few single sign-on technologies to provide a seamless navigation between Alfresco and another web application.

-   **[Content management integration patterns](../concepts/integration-patterns.md)**  
When applications use the value of a content management system like Alfresco, they use common patterns in the way that they access this information. These patterns have developed as a result of the way users interact with systems that they use on a day-to-day basis.

**Parent topic:**[Customizing and extending](../concepts/ch-customize.md)

