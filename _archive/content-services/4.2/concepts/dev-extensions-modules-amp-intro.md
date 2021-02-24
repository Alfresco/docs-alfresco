---
author: Alfresco Documentation
---

# Alfresco Module Package \(AMP\)

Modules are usually packaged in the Alfresco Module Package \(AMP\) file format for deployment in production environments. An AMP is essentially a Zip file with a specific layout, containing all of the files required for a specific extension, including data you might to upload to the repository.

.

For deployment the AMP file is applied to a target WAR file using the Module Management Tool.

This format allows the module to be more easily shared, for example with a community of developers or for shipping to customers. During development, non-AMP formats are often used to ease the development process.

## Advantages of using AMP files

Here are some of the advantages of packaging your extension in an AMP file:

-   AMPs provide a namespace feature that helps prevent file name clashes with other extensions.
-   The minimum and maximum version of Alfresco required for the extension to operate correctly can be specified in the AMP file.
-   Dependencies on other modules can be declared in the AMP file.
-   AMP files can contain a module version number.
-   Data required by the extension when the module is loaded can be included in the AMP.
-   It is possible to run initialization code when the AMP is installed.

**Parent topic:**[Modules](../concepts/dev-extensions-modules-intro.md)

