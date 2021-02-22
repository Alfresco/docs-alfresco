---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Preface
keyword: [system, paths, directories, classpath, extension, configRoot, alfresco-global.properties]
---

# System paths

This section describes the conventions for common system paths.

**Note:**

-   Explicit Windows paths use back slashes

    C:\\Adirectory

-   Explicit Linux paths use forward slashes

    /srv/adirectory

-   Back slashes also indicate the same path can apply in both Windows or Linux environments

    \\adirectory\\


**Parent topic:**[Overview](../concepts/system-about.md)

## Alfresco installation location

The Alfresco installation directory is referenced throughout this guide as <installLocation\>.

## <classpathRoot\> directory \(Windows\)

The <classpathRoot\> denotes a directory whose contents are automatically added to the start of your application server’s classpath. The location of this directory varies depending on your application server. For example:

-   \(Tomcat\) C:\\Alfresco\\tomcat\\shared\\classes
-   \(JBoss\) C:\\jboss\\server\\default\\conf
-   \(WebLogic\) C:\\bea\\user\_projects\\domains\\alf\_domain

    **Note:** The path can be anywhere on the WebLogic classpath.


## <classpathRoot\> directory \(Linux\)

The <classpathRoot\> denotes a directory whose contents are automatically added to the start of your application server’s classpath. The location of this directory varies depending on your application server. For example:

-   \(Tomcat\) tomcat/shared/classes/
-   \(JBoss\) /jboss/server/default/conf
-   \(WebLogic\) <bea\>/user\_projects/domains/alf\_domain

    **Note:** The path can be anywhere on the WebLogic classpath.


## alfresco-global.properties file

The alfresco-global.properties file is where you store all the configuration settings for your environment. The file is in Java properties format, so backslashes must be escaped. The file should be placed in <classpathRoot\>. When you install Alfresco using the setup wizard, an alfresco-global.properties file is created, which contains the settings that you specified in the wizard. An alfresco-global.properties.sample file is supplied with the setup wizard and also with the WAR zip file. This .sample file contains examples of common settings that you can copy into your alfresco-global.properties file.

## <extension\> directory

The <extension\> directory is where you store Spring configuration files that extend and override the system configuration. This directory can be found at <classpathRoot\>\\alfresco\\extension.

## <web-extension\>

The <web-extension\> directory is where you store Spring configurations that extend and override the system Share configuration. This directory can be found at <classpathRoot\>\\alfresco\\web-extension.

## <configRoot\>

The <configRoot\> directory is where the default configuration files are stored. For example, for Tomcat, <configRoot\> is <TOMCAT\_HOME\>\\webapps\\alfresco\\WEB-INF.

## <configRootShare\>

The <configRootShare\> directory is where the default configuration files for Share are stored. For example, for Tomcat, <configRootShare\> is <TOMCAT\_HOME\>\\webapps\\share\\WEB-INF.

