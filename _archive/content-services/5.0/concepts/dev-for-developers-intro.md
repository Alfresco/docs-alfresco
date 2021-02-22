---
author: Alfresco Documentation
---

# Introduction

This section of the documentation examines the various ways developers can configure, customize and extend Alfresco.

In this documentation the possibilities for developing applications and extensions to Alfresco are explored. Each section typically consists of concepts, followed by tutorials and then API references where appropriate.

The extension points into Alfresco are described. It is possible to customize or extend the content models in XML and write code using a wide variety of APIs and languages.

Alfresco allows you to write small, useful web scripts with JavaScript and FreeMarker, or more complex services using Java and the Public Java API. Full-featured clients that access Alfresco can be developed leveraging the client APIs. For example, using the [Repository REST API](../references/RESTful-intro.md) or the new [Alfresco One API](https://www.alfresco.com/develop).

## General terminology

First it is necessary to define some terms as used in this documentation, to avoid confusion.

-   **Customizations**

    Customizations are any changes to Alfresco default functionality. These changes can include editing an existing configuration file, adding a web script, or developing a full-featured module. Customizations can be divided into three broad categories: Configurations, Extensions and Modules.

-   **Configurations**

    Configurations are where you modify existing files to change default behavior. These changes could mean editing, for example, property or configuration files. Examples of such files include share-config.xml, share-custom-config.xml or alfresco-global.properties file. Note that if you have Alfresco Enterprise you can also configure Alfresco using the Admin Console or JMX. These configurations modify the database directly, and override any configurations loaded from the file system.

-   **Extensions**

    Extensions are where you add functionality not included with the standard Alfresco. There are various types of extensions. These could be Dashlets, Portlets, JavaScript web scripts, Java-backed web scripts, new content models, users and groups, permission files, and new Java classes and Spring bean context files. These extensions can be packaged in various ways, including in zip files, JAR files, or simply by copying directly into the Alfresco exploded WAR file, or elsewhere in the application server directory structure. They can also be developed as Modules, which have a defined directory structure and are most usually deployed using the AMP file format.

-   **Modules**

    Modules are customizations that are packaged in the Alfresco Module Package \(AMP\) file format for deployment. Modules can be used to implement a range of customizations including configurations \(where property or configuration files are replaced to change existing behavior\), and extensions \(where functionality is added\). In general, the terms module and AMP are often used interchangeably. During the earlier phase of the development cycle customizations can use other deployment techniques, such as copying files directly into the exploded Alfresco or Share WAR files, or perhaps using JAR files on the shared classpath of the application server. Packaging a customization in the AMP file format provides a more convenient way to distribute and install the customization, when shared with the wider community.


**Parent topic:**[Developing](../concepts/dev-for-developers.md)

