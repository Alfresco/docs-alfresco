---
author: Alfresco Documentation
---

# Share themes

When you run Alfresco Share, the look and feel is set by a default theme. Use this information to select one of the alternative themes available in Share, and also how to create and use your own themes for corporate branding.

Share themes consist of a directory containing a CSS and images files, and they can be located in the theme directory \(<TOMCAT\_HOME\>/webapps/share/WEB-INF/classes/alfresco/site-data/themes\). The default theme is called default.xml.

The following themes are available in Share:

-   Blue theme \(default\)
-   Light theme
-   Yellow theme
-   Green theme
-   High contrast black
-   Google Docs theme

The default theme, which comprises the CSS and image assets used across all pages, displays in a new Alfresco installation.

You can also create your own Share themes. Take a look at the [Adding a custom Share Theme](../tasks/dev-extensions-share-tutorials-add-theme.md) tutorial.

-   **[Selecting themes](../tasks/themes-select.md)**  
Only an Administrator user can select the Share theme. Any change to the theme will affect all users of the Alfresco instance from the next time that they log in or from a browser refresh.
-   **[Editing a theme](../tasks/themes-edit.md)**  
A theme consists of some CSS files, an image directory, and a directory for assets for YUI. To create a new look, change the presentation.css file and, if required, replace or add images to the /images directory.

**Parent topic:**[Configuring Alfresco Share](../concepts/share-configuring-intro.md)

