---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Glossary
option: glossary
---

# Glossary

-   **ACP**

    ACP \(\>Alfresco Content Package\) files hold exported information produced when using the Export feature.


-   **alf\_data**

    Directory containing binary content and Lucene indexes.

-   **alfresco-global.properties**

    The alfresco-global.properties file contains the customizations for extending Alfresco. The standard global properties file that is supplied with the installers contains settings for the location of the content and index data, the database connection properties, the location of third-party software, and database driver and Hibernate properties.


-   **Alfresco WAR**

    The Alfresco Web application Archive \(WAR\) file is for deployment in existing application servers.

-   **AMP**

    AMP \(Alfresco Module Package\) is a collection of code, XML, images, CSS, that collectively extend the functionality or data provided by the standard Alfresco repository. An AMP file can contain as little as a set of custom templates or a new category. It can contain a custom model and associated user interface customizations. It could contain a complete new set of functionality, for example records management.


-   **AVM**

    Alfresco Advanced Versioning Manager \(AVM\) is an advanced store implementation designed to support the version control requirements of large websites and web applications.


-   **breadcrumb**

    A navigation link that allows you to jump to any part of the breadcrumb path.

-   **<classpathRoot\>**

    The <classpathRoot\> is the directory whose contents are automatically added to the start of your application server's classpath. The location of this directory varies depending on your application server.


-   **<configRoot\>**

    The <configRoot\> directory is where the default configuration files are stored. Where possible, you should not edit these files but you can edit the overrides in the <extension\> directory. For example, for Tomcat, <configRoot\> is: <TOMCAT\_HOME\>/webapps/alfresco/WEB-INF/

-   **<configRootShare\>**

    The <configRootShare\> directory is where the default configuration files for Share are stored. Where possible, you should not edit these files but you can edit the Share override files in the <web-extension\> directory. For example, for Tomcat, <configRootShare\> is <TOMCAT\_HOME\>/webapps/share/WEB-INF


-   **CIFS**

    Microsoft Common Internet File System \(CIFS\) is a network file system for sharing files across the Internet.


-   **content**

    Files or documents made of two main elements: the content itself and information about the content \(metadata\). For example, documents, video, audio, images, XML, and HTML.

-   **dashboard**

    The Alfresco dashboard is an interactive user interface that presents and organizes information to the user.

-   **dashlet**

    A dashlet is an application that appears in the Alfresco dashboard that presents information to the user. Users can organize dashlets into different layouts and set keyboard short cuts for each dashlet.


-   **dir.root**

    The `dir.root` property is specified in the alfresco-global.properties file. It points to the directory `alf_data`, which contains the content and the Lucene indexes.


-   **dir.indexes**

    This folder contains all Lucene indexes and deltas against those indexes.


-   **Enterprise Content Management \(ECM\)**

    Enterprise Content Management \(ECM\) is a set of technologies used to capture, store, preserve and deliver content and documents and content related to organizational processes. ECM tools and strategies allow the management of an organization's unstructured information, wherever that information exists.

    Quoted from: [http://en.wikipedia.org/wiki/Enterprise\_content\_management](http://en.wikipedia.org/wiki/Enterprise_content_management)


-   **Enterprise Edition**

    The Enterprise Edition is production-ready open source. It is the stress-tested, certified build that is supported by Alfresco Software. It is recommended for corporations, governments, and other organizations looking for a production-ready open source ECM solution, with the primary benefit of being a stable, reliable, certified, supported application with warranty and indemnity, with the support of Alfresco and its certified partners.


-   **<extension\>**

    The <extension\> directory is where you store files that extend and override the Alfresco default files. When Alfresco is installed, there are sample files in this directory. Many of these files have a .samplesuffix, which must be removed to activate the file.

    For example: for Tomcat, <extension\> is:`<TOMCAT_HOME>/shared/classes/alfresco/extension/`


-   **Hibernate**

    Hibernate is an object-relational mapping \(ORM\) library for the Java language, providing a framework for mapping an object-oriented domain model to a traditional relational database. Hibernate solves Object-Relational impedance mismatch problems by replacing direct persistence-related database accesses with high-level object handling functions.


-   **ImageMagick**

    ImageMagick is a software suite to create, edit, and compose bitmap images. It can read, convert and write images in a large variety of formats. Images can be cropped, colors can be changed, various effects can be applied, images can be rotated and combined, and text, lines, polygons, ellipses and Bézier curves can be added to images and stretched and rotated.

    Quoted from: [http://www.imagemagick.org/script/index.php](http://www.imagemagick.org/script/index.php)


-   **Java Content Repository \(JCR\) API**

    Java Content Repository API is a standard Java API \(as defined by JSR-170\) for accessing content repositories. Alfresco provides support for JCR level 1 and level 2 giving standardized read and write access.

-   **Java Management Extension \(JMX\) interface**

    The JMX interface allows you to access Alfresco through a standard console that supports JMX remoting \(JSR-160\). Example consoles include, JConsole, MC4J, and JManage.


-   **JVM**

    Java Virtual Machine


-   **Lucene**

    Apache Lucene is a high-performance, full-featured text search engine library written entirely in Java. It is a technology suitable for nearly any application that requires full-text search, especially cross-platform.

    Quoted from: [http://lucene.apache.org/java/docs/index.html](http://lucene.apache.org/java/docs/index.html)


-   **repository**

    The repository is the combination of the content, the indexes, and the database.


-   **sandbox**

    An environment for testing, experimenting, or using as a working area. In WCM, a sandbox is an area where users can make changes to web content. In the sandbox, a user can add, edit, and delete both folders and files.

-   **site**

    A site is a collaborative area for a unit of work or a project.


-   **Spring**

    Spring is an open-source application framework for Java/JEE. The Alfresco repository uses the Spring Framework as the core foundation of its architecture.


-   **store**

    A store is a logical partition within the repository, grouped for a particular automated use. Each store contains a hierarchy of nodes with one root node. Two main stores in Alfresco are the Document Management \(DM\) and the Advanced Versioning Manager \(AVM\) stores. AVM stores are used for Web Content Management. Each store is identified by a content store reference. This reference consists of a store protocol \(such as archive or workspace\) and a store id \(such as SpaceStore or User\).

-   **WAR**

    The Alfresco Web application ARchive \(WAR\) file is for deployment in existing application servers.


-   **Web Content Management \(WCM\)**

    Web Content Management is an Alfresco product for the rapid deployment of web content, allowing users to create, develop, and maintain content for websites.


-   **WebDAV**

    Web-based Distributed Authoring and Versioning. A protocol that allows users to edit and manage files on remote web servers.


-   **<web-extension\>**

    The <web-extension\> directory is where you store files that extend and override the Alfresco default files for Alfresco Share. When Alfresco is installed, there are sample files in this directory. Many of the files have a .sample suffix, which must be removed to activate the file.

    For example: for Tomcat, <web-extension\> is:`<TOMCAT_HOME>/shared/classes/alfresco/web-extension/`


-   **workflow**

    A workflow is a work procedure and workflow steps that represent the activities users must follow in order to achieve the desired outcome. Alfresco provides two different types of workflow: simple and advanced. Simple workflow defines content rules for a space. Advanced workflow provides two out-of-the-box workflows \(Review and Approve; Adhoc Task\).


**Parent topic:**[Reference](../concepts/ch-reference.md)

