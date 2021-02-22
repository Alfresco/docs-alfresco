---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Alfresco Share
option: [extending, Share, Document library, EXIF renderer source code]
---

# Configuring Alfresco Share

Alfresco Share provides a rich web-based collaboration environment for managing documents, wiki content, blogs and more. Share leverages the repository to provide content services and uses the Surf platform to provide the underlying presentation framework.

A number of options are available to developers and administrators for configuring Share to better fit into their environment. Many of these mechanisms are provided by the underlying Surf framework, therefore a knowledge of Surf is considered useful for anyone wishing to implement substantial customizations.

You can customize Share through configuration files. Extending Share through more advanced techniques in discussed in the [Share extensions](dev-extensions-share.md) section.

The main aspects of Share that can be configured are:

-   General properties \(for example port number, user name and password\)
-   UI Controls
-   Forms \(custom types, built-in types, search, workflow\)
-   Menu bar
-   Themes
-   Custom types and aspects

**Note:** Usually, once you have changed a configuration file, you will need to restart Alfresco Content Services for the changes to take effect.

-   **[Share configuration files](../concepts/share-configuration-files.md)**  
Share can be configured through a number of configuration files.
-   **[Configuring Share user name and password](../tasks/share-change-password.md)**  
This information describes how to change the Share user name and password.
-   **[Configuring Share for mixed user name types](../tasks/usernametypes-mix-config.md)**  
When there is a mix of user name types, for example, some using the `@domain` in their user name, this may have an impact on the use of Share.
-   **[Configuring the Share default port](../tasks/share-change-port.md)**  
Use this information to configure the default port configuration for Share.
-   **[Configuring Share to remove persistent cookies](../tasks/share-customizing-cookies.md)**  
Use this information to turn off cookies that store a user name after a session expires.
-   **[Configuring Share Actions with Smart Folders](../concepts/sf-share-actions.md)**  
Share actions are disabled, by default, when using Smart Folders in Alfresco Content Services.
-   **[Enabling External Users panel](../tasks/share-enable-external-user.md)**  
The External Users panel is disabled by default in Alfresco Share. Use this information to enable this panel to add external users.
-   **[Share Document Library](../concepts/share-repodoclib.md)**  
The Share document library is a feature that gives full access to the Alfresco Content Services repository.
-   **[Share themes](../concepts/themes-intro.md)**  
When you run Share, the look and feel is set by a default theme. Use this information to select one of the alternative themes available in Share, and also how to create and use your own themes for corporate branding.
-   **[Share Forms](../concepts/forms-intro.md)**  
Alfresco Share presents data view and entry forms throughout its user interface, which are built on the Surf framework. This framework provides a convention for implementing forms.
-   **[Adding Custom MIME types](../concepts/dev-extensions-share-custom-mimetype.md)**  
You can add custom MIME types to Share.

**Parent topic:**[Share Configuration](../concepts/dev-extensions-share-configuration.md)

**Related information**  


[Developing Share Extensions](dev-extensions-share.md)

