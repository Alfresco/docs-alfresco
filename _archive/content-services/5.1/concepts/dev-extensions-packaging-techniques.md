---
author: Alfresco Documentation
---

# Module package formats

There are two supported ways of packaging extensions: Alfresco Module Packages \(AMPs\) and Simple Modules.

The two supported module packaging options are:

1.  [Alfresco Module Package \(AMP\)](dev-extensions-packaging-techniques-amps.md)
2.  [Simple Module](dev-extensions-packaging-techniques-jar-files.md)

**Note:** The [Alfresco SDK](alfresco-sdk-intro.md) provides a set of tools for building and deploying AMPs and Simple Modules.

Each of these Module Package formats is described in the following information.

-   **[Alfresco Module Package \(AMP\)](../concepts/dev-extensions-packaging-techniques-amps.md)**  
Alfresco Module Packages, known as AMPs, are Zip files containing the extension. The extension must follow a prescribed layout and include important files that describe the module.
-   **[Simple Module](../concepts/dev-extensions-packaging-techniques-jar-files.md)**  
Platform and Share extensions are most suitably packaged in the Simple Module format. This module type uses the standard JAR file format. A Simple Module contains, in addition to the files that comprise the extension, at least a module.properties file to identify the extension as a module.

**Parent topic:**[Extension packaging - modules](../concepts/dev-modules.md)

