---
author: Alfresco Documentation
---

# Configuring forms

Forms can be configured through the share-config-custom.xml file.

The default forms configuration is specified in the ./tomcat/webapps/share/WEB-INF/classes/alfresco/share-form-config.xml file. This file contains all the default controls and constraint handlers for the content model and the form configuration for the `cm:content`and `cm:folder` types. This file also contains an example of configuring the `cm:content` type.

**Note:** You should apply all your forms customizations to a custom configuration file. To configure forms for the Share application, use the custom configuration file named share-config-custom.xml.

There are a number of files involved in form configuration, but generally you should add your configurations to a custom configuration file. The default configuration files are listed here so that you can see the range of configurations available:

|File|Description|
|----|-----------|
|form-config.xml|Default form configuration file|
|share-form-config.xml|Default forms for content and folder creation, edit and search|
|share-datalist-form-config.xml|Forms for the built-in datalists|
|share-workflow-form-config.xml|Core workflow forms and built-in workflows|

CAUTION:

Avoid editing the default configuration files directly.

1.  Open the ./tomcat/shared/classes/alfresco/<web-extension\>/share-config-custom.xml file.

2.  Modify the forms configuration settings using the XML configuration syntax.


**Parent topic:**[Share Forms](../concepts/forms-intro.md)

