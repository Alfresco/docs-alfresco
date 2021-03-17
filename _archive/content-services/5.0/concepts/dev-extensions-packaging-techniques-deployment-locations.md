---
author: Alfresco Documentation
---

# Deployment locations

Extensions and customizations can be located in several possible locations depending on the phase of the development lifecycle, the packaging used, and the application server.When you are developing your extensions there are various locations your extension can be deployed to. The location used is determined by the application server used, how the extension is packaged, and whether you are in the initial development phase, or deployment phase of the overall development cycle.

Any specific change can be deployed to various locations so as to override an Alfresco file.

All locations depend on the application server you are using.

## Tomcat

Once the Tomcat server has been started, the Alfresco application \(alfresco.war\) is exploded into $CATALINA\_HOME/webapps/alfresco. Stop the server if it is running, copy the extension file\(s\) to $CATALINA\_HOME/webapps/alfresco/WEB-INF/ and re-start Tomcat.

CAUTION:

Beware that any time your application server re-deploys the alfresco.war file, your extension will be deleted and you will have to re-deploy it.

One solution is to use a permanently exploded deployment \(instead of deploying an Alfresco WAR file under /webapps\). Create a directory called alfresco under the webapps directory and extract the contents of alfresco.war into it. Then copy your files to $CATALINA\_HOME/webapps/alfresco/WEB-INF/ and restart Tomcat. It is then recommended you remove the WAR file so that Tomcat cannot redeploy the file and overwrite your changes.

For background information on Tomcat classpath refer to the document [Understanding the Tomcat Classpath](http://www.mulesoft.com/tomcat-classpath) at the Mulesoft website.

## JBoss

In JBoss, if you deploy a web application as a WAR file the application gets exploded to a temporary directory each time the application server starts. Thus there is nowhere to copy the JAR file to. One solution is to use an exploded deployment. Create a directory called alfresco.war under the deploy directory and extract the contents of the Alfresco WAR file, alfresco.war, into it. Then copy your JAR file to ../deploy/alfresco.war/WEB-INF/lib and restart JBoss.

## Shared classpath folder

Many customizations can be placed on your application server's classpath. Examples of this include:

-   Alfresco configuration files, such as share-config-custom.xml
-   Spring context files
-   Properties files, such as webclient.properties

For Tomcat, the shared class loader folder is $CATALINA\_HOME/shared/classes/alfresco/ for class files.

For JBoss, the shared classloader folder is $JBOSS\_HOME/server/default/conf/alfresco/.

In the shared class loader folder there are standard sub-directories:

-   extension: for changes to the repository
-   web-extension: for changes to the Share UI
-   messages: for localization strings

Files that are packaged as a JAR file should be placed in the appropriate lib directory, for example, $CATALINA\_HOME/shared/lib.

Files placed in these folders will overlay the relevant file in the appropriate WAR.

CAUTION:

Be aware that files on the application server classpath will overlay all WARs in the application server. It is more predictable to put your files into the classpath for a specific WAR.

**Attention:** Because of web application sandboxing, Java classes that extend Alfresco's Java classes cannot be placed in the shared class loader. They must be in the class loader for the web application to which they apply.

**Note:** In Tomcat 7 $CATALINA\_HOME/shared/lib is no longer on the default classpath as it is recommended to put your library in a context specific to your WAR.

## WAR specific classpath

A better location for your customizations would be in one of:

-   $CATALINA\_HOME/webapps/alfresco/WEB-INF/classes
-   $CATALINA\_HOME/webapps/alfresco/WEB-INF/lib \(for JARs\)
-   $CATALINA\_HOME/webapps/share/WEB-INF/classes
-   $CATALINA\_HOME/webapps/share/WEB-INF/lib \(for JARs\)

**Attention:** It is most common to patch the Alfresco and Share WAR files in order to put your code in the correct location in a way that is preserved through redeployments of the application server. This is what the apply\_amps script accomplishes, it applies your AMP file to the target WAR file using the Module Management Tool \(MMT\). To achieve greater control, instead of using the apply\_amps script use MMT directly.

**Parent topic:**[Packaging options](../concepts/dev-extensions-packaging-techniques.md)

