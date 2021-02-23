---
author: Alfresco Documentation
---

# JAR files

Many types of extension can be conveniently packaged in the standard JAR file format.Once the extension is packaged in the JAR file format, it can be loaded from one of the application server's standard classpath locations. For example, on Tomcat, this could be tomcat/shared/lib, or tomcat/webapps/alfresco/WEB-INF/lib.

Since Alfresco 3.4, the Share web application supports overrides that are packaged as JAR files. This allows multiple customizations to be isolated from each other, and order of selection can be predicted. Static files such as JavaScript, CSS, or image files that would normally be placed in the web root of the Share application can also be packaged into these JARs.

To deploy these JARs, it is recommended to place them inside one or more AMP files, and deploy them into the share.war file.

As mentioned previously, installing these JARs directly into the exploded webapp directory structure is not recommended as application servers can overwrite your changes at unpredictable times.

While it is possible to avoid the overwriting problem \(at least in Tomcat\) by placing these JAR files in tomcat/shared/lib \(that is, outside of the web application directory structure itself\), this is also not recommended for final deployment as this causes the JARs to be included on the classpath of every web application installed in that Tomcat server \(typically this means at least the Share webapp and the Alfresco repository webapp\). In fact, since v6.0, Tomcat no longer provides a shared/lib directory by default, specifically because it is so problematic from a webapp isolation perspective. However, this can be changed via the conf/catalina.properties file.

**Parent topic:**[Packaging techniques](../concepts/dev-extensions-packaging-techniques.md)

