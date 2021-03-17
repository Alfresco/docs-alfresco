---
author: Alfresco Documentation
---

# Alfresco Module Package \(AMP\)

Alfresco Module Packages, known as AMPs, are Zip files containing the extension. The extension must follow a prescribed layout and include important files that describe the module.

Alfresco Module Packages, known as AMPs, are the recommended way of packaging Alfresco customizations and extensions for deployment, where those extensions depend on third-party libraries, as such depedencies are not yet supported by Simple JAR Modules. Simple JAR modules are generally the preferred type of packaging for extensions where dependencies on third-party libraries do not exist.

AMPs can be used to package custom templates, custom models, web scripts, UI customizations, and can be used to implement extensive additions to the Alfresco functionality. Records Management is an an example of an application that provides a significant enhancement to Alfresco's capabilities and is distributed via AMP files.

AMPs are Zip files that follow a specific layout and can be merged with the other WAR files such as alfresco.war or share.war using the Alfresco Module Management Tool \(MMT\), which is available as alfresco-mmt.jar in the bin directory of your Alfresco installation.

AMPs can be thought of as installable extensions to Alfresco. Once packaged into an AMP file format an extension can be applied to Alfresco using the Module Management Tool \(MMT\). Alfresco has two directories that contain AMP files, the amps directory and the amps\_share directory. Modules that extend the repository tier are located in the amps directory. Modules that extend the Share tier are located in the amps\_share directory.

When a module is installed using the MMT it is applied to the relevant WAR file. The Alfresco application typically consists of at least two WAR files: alfresco.war for the content server and share.war for the web client. The module AMP file is applied to the appropriate WAR using the MMT.

Larger, more complex modules can be distributed as two AMP files, one to be applied to the Alfresco WAR file and another to be applied to the Share WAR file. Records Management, for example, is distributed in this manner.

**Note:** If your extension does not require third-party libraries you should use the Simple JAR Module format. Only use the AMP format where your extension has dependencies on third-party libraries.

-   **[Advantages of AMP files](../concepts/dev-extensions-modules-amp-intro.md)**  
The AMP file is the recommended technique for packaging your extension.
-   **[AMP file format](../concepts/dev-extensions-modules-amp-format.md)**  
The AMP file has a specific directory layout that contains the files that make up the extension. In addition it contains special files such as module-context.xml, module.properties and file-mapping.properties that control the behavior of the AMP.
-   **[AMP to WAR mapping](../concepts/dev-extensions-modules-amp-mapping.md)**  
When an AMP file is to be deployed it is applied to the target WAR file using the Module Management Tool. This is a convenient way of applying a number of files to a variety of directories within the target WAR's exploded directory structure. When the AMP is applied, the default mappings can be applied to map from the module directory structure to the exploded WAR directory structure. Custom mappings can also be applied.
-   **[Customizing the AMP to WAR mapping](../concepts/dev-extensions-modules-custom-amp.md)**  
A custom mapping from the AMP directory structure to the WAR file is sometimes useful, for example if you wish to use a non-standard module directory structure, or if you wish to map files into non-default locations in the target WAR. This custom mapping is achieved through use of the file-mapping.properties file.
-   **[Project layout](../concepts/dev-extensions-modules-structure.md)**  
When developing a module it is recommended that code is structured in a consistent format to comply with AMP file requirements.
-   **[log4j.properties file](../concepts/dev-extensions-modules-module-log4j.md)**  
Each module can have its own Apache Log4j properties file.
-   **[Using the Module Management Tool \(MMT\)](../concepts/dev-extensions-modules-management-tool.md)**  
The Module Management Tool \(MMT\) helps install and manage modules packaged as AMP \(Alfresco Module Package\) files. These AMP files are applied to a target WAR file, for example, alfresco.war or share.war.

**Parent topic:**[Module package formats](../concepts/dev-extensions-packaging-techniques.md)

