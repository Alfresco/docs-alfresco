---
author: Alfresco Documentation
---

# Packaging options

There are various ways of packaging Alfresco extensions. This section of the documentation describes various ways in which extensions can be packaged, including packaging as a module using the AMP file format.

**Important:** It is important to note that the AMP format is currently the only **supported** extension packaging format.

The packaging mechanism selected depends very much on the type of extension being developed. For simple extensions that can consist of a simple web script or two, a suitable choice could be a JAR file containing the scripts, located somewhere on the application server classpath, for example in tomcat/shared/lib. For much more extensive extensions a module layout might be a better choice, where the module is packaged as an AMP file and then applied to a target WAR file such as alfresco.war or share.war.

The main packaging options are:

-   **Unpackaged files**

    Individual files such as web scripts can be copied into the extension directory.

-   **Zip file**

    Extensions can be packaged as zip files.

-   **JAR file**

    Extensions can be packaged in standard JAR format and loaded by using the shared classpath.

-   **AMP file**

    This is the format of choice for most extensions, especially where the extension is to be widely distributed.

    **Important:** It is important to note that the AMP format is currently the only **supported** extension packaging format.


Each of these options is described in the following sections.

-   **[Unpackaged files or zip files](../concepts/dev-extensions-packaging-techniques-unpackaged-or-zip.md)**  
The simple packaging technique is to simply copy or unzip the extension's files into the Alfresco directory hierarchy.
-   **[JAR files](../concepts/dev-extensions-packaging-techniques-jar-files.md)**  
Many types of extension can be conveniently packaged in the standard JAR file format.
-   **[AMP files](../concepts/dev-extensions-packaging-techniques-amps.md)**  
Alfresco Module Packages, known as AMP files, are the recommended way of packaging Alfresco customizations and extensions for deployment.
-   **[Deployment locations](../concepts/dev-extensions-packaging-techniques-deployment-locations.md)**  
Extensions and customizations can be located in several possible locations depending on the phase of the development lifecycle, the packaging used, and the application server.

**Parent topic:**[Extension packaging](../concepts/dev-extensions-packaging.md)

