---
author: Alfresco Documentation
---

# Customizing Alfresco Share configuration items

This section describes how to customize Alfresco Share configuration items.

A number of options are available when you want to customize Alfresco Share. Many of these mechanisms are provided by the underlying Surf platform, therefore a knowledge of Surf is useful for anyone wishing to implement substantial customizations.

Although it is possble to simply edit the share-config-custom.xml file and restart Alfresco for customizations to take effect, other options are available. For example, you can create a share-config-custom.xml file to be packaged in the JAR of your project. You could potentially have multiple JAR files each containing its own share-config-custom.xml file. These JARs need to sit somewhere on the classpath, such as ./tomcat/shared/lib.

You can also package such configurations into an AMP file. For more information on the structure of AMP files and their deployment please see the [Alfresco Wiki](https://wiki.alfresco.com/wiki/AMP_Files).

1.  To configure the Share application, you can use the sample custom configuration file named share-config-custom.xml.sample.

    **Note:** If you are overriding a configuration section, you must apply the `replace="true"` attribute to replace the existing Alfresco configuration.

2.  Back up the share-config-custom.xml file. This gives you a known good configuration file to fall back on should something go wrong.

3.  Open the following file:

    ./tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml.sample

4.  Uncomment any <config\> items that you want to enable.

5.  Add any <config\> items that you want to include.

6.  Save the edited file without the .sample extension.


-   **[Share repository document library](../concepts/share-repodoclib.md)**  
The Share repository document library is a feature that gives full access to the Alfresco repository.
-   **[Configuring the Share default port](../tasks/share-change-port.md)**  
This section describes how to configure the default port configuration for Alfresco Share.
-   **[Configuring the RSS Feed Dashlet with HTTP authentication](../tasks/rss-http-config.md)**  
This section describes how to enable the RSS Feed Dashlet for accessing sites over secure connections is a JDK configuration issue connected with absence of certificate\(s\) of the target feeds sender in the JDK keystore. To do this, you must add the certificate\(s\) from each site into the keystore of the JDK.
-   **[Enabling Google Docs integration](../tasks/googledocs-enable.md)**  
The Google Docs integration enables documents from Google Docs to be imported into the Alfresco repository, and therefore benefit from Alfresco features, such as checkin and checkout. Google Docs is disabled by default.
-   **[Share themes](../concepts/themes-intro.md)**  
When you run Alfresco Share, the look and feel is set by a default theme. This section describes how to select one of the alternative themes available in Share, and also how to create and use your own themes for corporate branding.
-   **[Forms](../concepts/forms-intro.md)**  
Alfresco Share presents data view and entry forms throughout its user interface, which are built on the Surf framework. This framework provides a convention for implementing forms.

**Parent topic:**[Customizing and extending Alfresco Share](../concepts/dev-Share-intro.md)

