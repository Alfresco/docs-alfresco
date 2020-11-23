---
title: System paths convention
---

When using the Content Services documentation, there are a number of conventions for common system paths.

>**Note:**
>
>* Explicit Linux paths use forward slashes:
>
>    `/srv/some-directory`
>
>* Explicit Windows paths use back slashes
>
>    `C:\some-directory`
>
>* Where you see forward slashes, the same path can apply in both Linux or Windows environments:
>
>    /some-directory/

## Content Services installation directory

The installation directory is referenced throughout this guide as `<installLocation>`.

For example:

* (Linux): `/opt/alfresco`
* (Windows): `C:\alfresco`

## \<classpathRoot\> directory 

The `<classpathRoot>` is a directory whose contents are automatically added to the start of your application server classpath. 
The location of this directory varies depending on your application server. 

For example:

* (Tomcat)(Linux): `<installLocation>/tomcat/shared/classes/`
* (Tomcat)(Windows): `<installLocation>\tomcat\shared\classes`

## alfresco-global.properties file

The `alfresco-global.properties` file is where you store all the configuration settings for your environment. 
The file is in Java properties format, so backslashes must be escaped. The file should be placed in `<classpathRoot>`. 
An `alfresco-global.properties.sample` file is supplied with the WAR distribution zip file. This `.sample` file contains 
examples of common settings that you can copy into your `alfresco-global.properties` file.

## \<extension\> directory

The `<extension>` directory is where you store Spring configuration files that extend and override the Repository 
(i.e. `alfresco.war`) system configuration.

This directory can be found at `<classpathRoot>/alfresco/extension`.

## \<web-extension\> directory

The `<web-extension>` directory is where you store Spring configurations that extend and override the system Share 
(i.e. `share.war`) configuration.
 
This directory can be found at `<classpathRoot>/alfresco/web-extension`.

## \<solrRootDir\> directory

The `<solrRootDir>` directory is the Search Services home directory which contains the Solr core directories and 
configuration files. This directory can be found at `<SOLR_HOME>`.

## \<configRoot\> directory

The `<configRoot>` directory contains the default Repository (i.e. `alfresco.war`) configuration. 

For example, for Tomcat, `<configRoot>` is `<installLocation>/tomcat/webapps/alfresco/WEB-INF`.

## \<configRootShare\> directory

The `<configRootShare>` directory contains the default application configuration for Share (i.e. `share.war`). 

For example, for Tomcat, `<configRootShare>` is `<installLocation>/tomcat/webapps/share/WEB-INF`.

