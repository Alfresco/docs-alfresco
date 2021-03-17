---
author: Alfresco Documentation
---

# Advantages of AMP files

The AMP file is the recommended technique for packaging your extension.

This format allows the module to be more easily shared, for example with a community of developers or for shipping to customers. During development, non-AMP formats are sometimes used to ease the development process.

## Advantages of using AMP files

Here are some of the advantages of packaging your extension in an AMP file:

-   AMPs provide a namespace feature that helps prevent file name clashes with other extensions.
-   The minimum and maximum version of Alfresco Content Services required for the extension to operate correctly can be specified in the AMP file.
-   Dependencies on other modules can be declared in the AMP file.
-   AMP files can contain a module version number.
-   Data required by the extension when the module is loaded can be included in the AMP.
-   It is possible to run initialization code when the AMP is installed.

**Parent topic:**[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)

