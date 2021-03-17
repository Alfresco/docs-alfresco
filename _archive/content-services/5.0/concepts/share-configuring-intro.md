---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, EXIF renderer source code]
---

# Configuring Alfresco Share

Alfresco Share provides a rich web-based collaboration environment for managing documents, wiki content, blogs and more. Share leverages the Alfresco repository to provide content services and uses the Alfresco Surf platform to provide the underlying presentation framework.

A number of options are available to developers and administrators for configuring Alfresco Share to better fit into their environment. Many of these mechanisms are provided by the underlying Surf framework, therefore a knowledge of Surf is considered useful for anyone wishing to implement substantial customizations.

This section of the documentation looks at customizing Share through configuration files. Extending Share through more advanced techniques in discussed in the [Developing Share Extensions](dev-extensions-share.md) section.

The main aspects of Share that can be configured are:

-   General properties \(for example port number, username and password\)
-   UI Controls
-   Forms \(custom types, built-in types, search, workflow\)
-   Menu bar
-   Themes
-   Custom types and aspects

**Note:** Usually, once you have changed a configuration file, you will need to restart Alfresco for the changes to take effect.

-   **[Share configuration files](../concepts/share-configuration-files.md)**  
Share can be configured through configuration files. This topic looks at the key configuration files available.
-   **[Configuring Share with the share-config-custom.xml file](../tasks/share-customizing-custom-config-file.md)**  
This task describes how to modify the Share custom configuration file.
-   **[Configuring Share user name and password](../tasks/share-change-password.md)**  
This section describes how to change the Share user name and password.
-   **[Configuring the Share default port](../tasks/share-change-port.md)**  
This section describes how to configure the default port configuration for Alfresco Share.
-   **[Configuring Share to remove persistent cookies](../tasks/share-customizing-cookies.md)**  
Use this information to turn off cookies that store a user name after a session expires.
-   **[Share Document Library](../concepts/share-repodoclib.md)**  
The Share repository document library is a feature that gives full access to the Alfresco repository.
-   **[Share themes](../concepts/themes-intro.md)**  
When you run Alfresco Share, the look and feel is set by a default theme. This section describes how to select one of the alternative themes available in Share, and also how to create and use your own themes for corporate branding.
-   **[Share Forms](../concepts/forms-intro.md)**  
Alfresco Share presents data view and entry forms throughout its user interface, which are built on the Surf framework. This framework provides a convention for implementing forms.

**Parent topic:**[Developing](../concepts/dev-for-developers.md)

**Related information**  


[Developing Share Extensions](dev-extensions-share.md)

