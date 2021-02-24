---
author: Alfresco Documentation
---

# Modules

An Alfresco Module is a collection of code, configuration, scripts and media resources, typically packaged as an AMP file, and which extends the functionality of Alfresco. They can implement custom templates, custom models, web scripts, UI customizations, or can be used to implement extensive additions to the Alfresco functionality. Records Management is an an example of a module that provides a significant enhancement to Alfresco's capabilities.

Modules can be thought of as installable extensions to Alfresco. Once packaged into an AMP file format they can be applied to Alfresco using the Module Management Tool \(MMT\). Alfresco has two directories that contain AMP files, the amps directory and the amps\_share directory. Modules that extend the repository tier are located in the amps directory. Modules that extend the Share tier are located in the amps\_share directory.

When a module is installed using the MMT it is applied to the relevant WAR file. The Alfresco application typically consists of at least two WAR files: alfresco.war and share.war. The module AMP file is applied to the appropriate WAR using the MMT. Larger, more complex modules may be distributed as two AMP files, one to be applied to the Alfresco WAR file and another to be applied to the Share WAR file. Records Management, for example, is distributed in this manner.

-   **[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-modules-amp-intro.md)**  
Modules are usually packaged in the Alfresco Module Package \(AMP\) file format for deployment in production environments. An AMP is essentially a Zip file with a specific layout, containing all of the files required for a specific extension, including data you might to upload to the repository.
-   **[AMP file format](../concepts/dev-extensions-modules-amp-format.md)**  
The AMP file has a specific directory layout that contains the files that make up the extension. In addition it contains special files such as module-context.xml, module.properties and file-mapping.properties that control the behavior of the AMP.
-   **[Module properties file](../concepts/dev-extensions-modules-module-properties.md)**  
The module properties file is required by the module service to identify the module, and its details, when it is installed.
-   **[Module context file](../concepts/dev-extensions-modules-module-context.md)**  
Each module requires a module context file. This loads the Spring configuration for the module.
-   **[AMP to WAR mapping](../concepts/dev-extensions-modules-amp-mapping.md)**  
When an AMP file is to be deployed it is applied to the target WAR file using the Module Management Tool. An AMP is deployed by applying it to a target WAR file. This is a convenient way of applying a number of files to a variety of directories within the target WAR's exploded directory structure. When the AMP is applied, the default mappings can be applied to map from the module directory structure to the exploded WAR directory structure. Custom mappings can also be applied.
-   **[Customizing the AMP to WAR mapping](../concepts/dev-extensions-modules-custom-amp.md)**  
A custom mapping from the AMP directory structure to the WAR file is sometimes useful, for example if you wish to use a non-standard module directory structure, or if you wish to map files into non-default locations in the target WAR. This custom mapping is achieved through use of the file-mapping.properties file.
-   **[Project layout](../concepts/dev-extensions-modules-structure.md)**  
When developing a module it is recommended that code is structured in a consistent format to comply with AMP file requirements.
-   **[Log4j.properties file](../concepts/dev-extensions-modules-module-log4j.md)**  
Each module can have its own Log4j properties file.
-   **[Importing Module Data](../concepts/dev-extensions-modules-importing-module-data.md)**  
As part of your content model and module, you can import some data that the module uses. These can be, for example, Categories, FTL scripts in the data dictionary, project template hierarchies, ACP files.
-   **[Adding a Custom Model](../concepts/dev-extensions-modules-custom-model.md)**  
Custom content models can be bootstrapped into the repository via Spring configuration added to the module context file.
-   **[Importing Users/Groups](../concepts/dev-extensions-modules-importing-users.md)**  
A module can create users or groups as part of its initialization. This can be achieved by via creation of an import file containing the users/groups you want to import and then including these via the module context file.
-   **[Adding a Custom Permission Model](../concepts/dev-extensions-modules-custom-permission-model.md)**  
A custom permission model can be bootstrapped via a module.
-   **[Adding Custom Client Configuration](../concepts/dev-extensions-modules-custom-client-config.md)**  
Custom web client configuration can be included via a module context.
-   **[Adding Custom Faces Configuration](../concepts/dev-extensions-modules-custom-faces-config.md)**  
It is possible to add custom faces configuration to a module.
-   **[Using the Module Management Tool \(MMT\)](../concepts/dev-extensions-modules-management-tool.md)**  
The Module Management Tool \(MMT\) helps install and manage modules packaged as AMP \(Alfresco Module Package\) files. These AMP files are applied to a target WAR file, for example alfresco.war or share.war.
-   **[Module Tutorials](../concepts/dev-extensions-modules-tutorials.md)**  
The following tutorials demonstrate how to create simple modules from scratch. They use Ant-based build scripts to illustrate the concepts of constructing, building and deploying modules. They do not represent a recommended way to develop extensions - they are designed to help you learn more about the construction and layout of modules from first principles.

**Parent topic:**[Alfresco Extensions](../concepts/dev-extensions-intro.md)

