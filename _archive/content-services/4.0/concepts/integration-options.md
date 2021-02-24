---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Integration]
keyword: integration
---

# Integrating your application with Alfresco

Alfresco provides many programmatic ways to access the content management capabilities of the system to support applications that need access to content services. Because Alfresco supports a number of standards-based protocols; applications and application development environments can use existing tools to access, update, and search Alfresco content.

Although Alfresco is built using the Java programming language, the system can be used by applications written in most popular programming languages. You can use the tools that are easiest to get your application developed as quickly as possible. The Alfresco repository takes care of handling metadata, workflow, lifecycles, location, and search access. The tools you use depend on the level of control your application needs over metadata, context, and business processes, as well as the tools your application or your development environment provide for handling content.

The following guidelines list the programming interfaces provided by Alfresco, and the situations in which they could be used.

## CMIS

CMIS \(Content Management Interoperability Services\) is an OASIS standard designed for the ECM industry. It enables access to any content management repository that implements the CMIS standard, such as Microsoft SharePoint, IBM FileNet, EMC Documentum, and Alfresco. Consider using CMIS if your application needs programmatic access to the content repository, and especially if you intend to port your application to other content management systems.

## Web scripts

Existing web scripts in Alfresco provide a great deal of functionality. You can also create your own web scripts to perform an operation in Alfresco that is not covered by an existing web script, or to combine several operations to minimize network communication. This can increase the performance of your application and push the logic down to the Alfresco repository, where it can be reused.

## File-based access

If metadata is not important to your application or processing of content and metadata can be handled with rules and actions, then file-based access can be an easier route to integration with Alfresco. You can use CIFS, WebDAV, NFS, or FTP file to access Alfresco content. File-based access may already be supported by your application through standard file interfaces. File-based applications that create content can store that content in Alfresco where it will be available for other applications to access.

Applications that access files through Open dialogs or through programmatic file interfaces can navigate Alfresco folder hierarchies and content seamlessly. Although the content appears to your application to be a file, it is not directly accessing the content. It uses Alfresco APIs, so all the controls and services are in place. File access is an emulation of a file system access and storage is no different than through APIs directly.

By storing content using file system emulation, logic for processing content \(for example, archiving, applying workflows and retention policies, and extracting metadata\) can be performed with rules. Applied at the folder or space level, these rules are initiated when the file is stored. This means the application integrating with Alfresco does not need to be modified to use Alfresco. All the business logic is stored in the Alfresco repository.

## OpenSearch and feeds

Some applications, websites, and portals may use standard web-based technology to access external information using feeds, such as RSS or Atom subscription protocols, or queries using OpenSearch. Alfresco provides out-of-the-box RSS feeds to observe the contents of an individual folder or space, as well as activities related to a user or Share site. The Alfresco system also implements OpenSearch, which is a standard query protocol supported by many web sites, such as Yahoo!, Google, and Amazon.

If an application is designed to use either feeds or OpenSearch, then it can access Alfresco using the feed or search address. The results return descriptive information about the content returned and a URL pointing directly to the content. If more specialized information is required or you would rather point to the properties page in Share or Explorer, you can create new RSS feeds or OpenSearch APIs as fairly simple web scripts. You can use the RSS feed and OpenSearch templates in the Alfresco Data Dictionary as a reference for how to build your own.

## Java applications

If a repository is single-purpose and performance is a prime concern, then you may want to access Alfresco using the core API directly. This requires your application to reside on the same application server as the Alfresco system. A Java application can access all the base APIs and web scripts with minimal context switching.

## PHP applications

PHP applications can access Alfresco through CMIS, through web scripts as a RESTful interface, or directly from the same application server as Alfresco. Alfresco has an optional extension that includes the Quercus PHP interpreter in a Tomcat server. The Quercus PHP interpreter is capable of running popular PHP applications, such as Joomla!, Drupal, WordPress, and MediaWiki. With the Quercus integration with Alfresco, these applications are capable of accessing the Alfresco system, as are other PHP applications. The most popular way of accessing Alfresco is remotely through CMIS.

## .NET applications

Integrating Alfresco applications with .NET applications is very similar to integrations with Java applications through remote interfaces such as web scripts or CMIS. Either the SOAP or Atom Publishing interfaces can be used. All patterns of integration can be supported.

## Surf components

Surf components are designed to work with other web frameworks, such as Spring Webflow or Spring MVC. Surf components can save a lot of work in reimplementing user interface portions of your application or website if they replicate functionality that you were intending to build in a different web framework, such as a browser or viewer.

## Authentication and directory services

To interoperate between an application and Alfresco, it is important to consistently authenticate users to ensure secure access to either system. In addition, both systems need a consistent understanding of the identity of the user, so sharing a common directory service is also important. Alfresco synchronizes and uses standard LDAP and Active Directory services for authentication and directory services. The security systems are open as well to adapt to other systems. Alfresco also integrates with some single sign-on technologies to provide a seamless navigation between Alfresco and another web applications.

-   **[Content management integration patterns](../concepts/integration-patterns.md)**  
Applications that use Alfresco can use a set of common patterns to access content. This list of suggested patterns is provided to help you manage your application development.

**Parent topic:**[Programming with Alfresco](../concepts/programming-intro.md)

