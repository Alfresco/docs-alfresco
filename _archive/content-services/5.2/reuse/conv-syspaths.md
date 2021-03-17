---
author: [Alfresco Documentation, Alfresco Documentation]
---

# System path conventions

When using the Alfresco Content Services documentation, there are a number of conventions for common system paths.

**Note:**

-   Explicit Linux paths use forward slashes

    /srv/adirectory

-   Explicit Windows paths use back slashes

    C:\\Adirectory

-   Where you see forward slashes, the same path can apply in both Linux or Windows environments:

    /adirectory/


**Parent topic:**[Reference](../concepts/ch-reference.md)

## Alfresco Content Services installation location

The installation directory is referenced throughout this guide as <installLocation\>.

## <classpathRoot\> directory \(Linux\)

The <classpathRoot\> is a directory whose contents are automatically added to the start of your application server classpath. The location of this directory varies depending on your application server. For example:

-   \(Tomcat\) tomcat/shared/classes/

## <classpathRoot\> directory \(Windows\)

The <classpathRoot\> is a directory whose contents are automatically added to the start of your application server classpath. The location of this directory varies depending on your application server. For example:

-   \(Tomcat\) C:\\Alfresco\\tomcat\\shared\\classes

## alfresco-global.properties file

The alfresco-global.properties file is where you store all the configuration settings for your environment. The file is in Java properties format, so backslashes must be escaped. The file should be placed in <classpathRoot\>. When you install using the setup wizard, an alfresco-global.properties file is created, which contains the settings that you specified in the setup wizard. An alfresco-global.properties.sample file is supplied with the setup wizard and also with the WAR zip file. This .sample file contains examples of common settings that you can copy into your alfresco-global.properties file.

## <extension\> directory

The <extension\> directory is where you store Spring configuration files that extend and override the system configuration. This directory can be found at <classpathRoot\>/alfresco/extension.

## <web-extension\>

The <web-extension\> directory is where you store Spring configurations that extend and override the system Share configuration. This directory can be found at <classpathRoot\>/alfresco/web-extension.

## <solrRootDir\>

The <solrRootDir\> directory is the Solr home directory which contains the Solr core directories and configuration files. This directory can be found at <ALFRESCO\_HOME\>/solr4.

## <configRoot\>

The <configRoot\> directory contains the default application configuration. For example, for Tomcat, <configRoot\> is <TOMCAT\_HOME\>/webapps/alfresco/WEB-INF.

## <configRootShare\>

The <configRootShare\> directory contains the default application configuration for Share. For example, for Tomcat, <configRootShare\> is <TOMCAT\_HOME\>/webapps/share/WEB-INF.

