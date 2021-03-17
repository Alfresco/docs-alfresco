---
author: Alfresco Documentation
---

# Surf Extension Modules

This section covers the Surf Extension Modules.

|Extension Point|Surf Extension Modules|
|---------------|----------------------|
|Architecture Information|[Share Architecture](dev-extensions-share-architecture-extension-points.md).|
|Description|Surf Extension Modules are the main tool to use when adding, updating, or hiding content in the Alfresco Share User Interface \(UI\). They can be deployed and un-deployed during runtime. A module is defined in XML and stored in the site-data/extensions directory.

 Working with these extension modules assume a certain knowledge of the Alfresco Surf UI development framework. Make sure that you have read through the [Share Architecture](dev-extensions-share-architecture-extension-points.md) section and the [Surf deep dive](surf-fwork-intro.md) section.

 This section covers the following:

-   Introduction to Surf Extension Modules
-   Module deployment
-   Module dependencies
-   Module configuration

|
|Deployment - App Server|tomcat/shared/classes/alfresco/web-extension/site-data/extensions \(Untouched by re-depolyments and upgrades\)|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-share-amp-archetype.md)|share-amp/src/main/amp/config/alfresco/web-extension/site-data/extensions|
|More Information|For a comprehensive introduction to Extension Modules see [this page](dev-extensions-share-surf-extension-modules-introduction.md), which also compares Share configuration with Extension Modules.|
|Tutorials|-   [Adding content to a Surf page](../tasks/dev-extensions-share-tutorials-add-content.md)
-   [Removing/hiding content from a Surf page](../tasks/dev-extensions-share-tutorials-hide-content.md)
-   [Conditionally controlling rendering of content on Surf page](../tasks/dev-extensions-share-tutorials-subcomponent-evals.md)
-   [Customizing \(Web Script Properties\) the footer text for a Surf page](../tasks/dev-extensions-share-tutorials-i18n-customize.md)
-   [Customizing \(Web Script Controller\) the WebView dashlet on the Dashboard page](../tasks/dev-extensions-share-tutorials-js-customize.md)
-   [Customizing \(Web Script Template\) the footer text for a Surf page](../tasks/dev-extensions-share-tutorials-fm-temp-customize.md)
-   [Extend an out-of-the-box Surf Widget \(YUI\)](../tasks/dev-extensions-share-tutorials-customizing-widget-instantiation.md)
-   [Add a new menu item to "Create..." menu in DocLib](../tasks/dev-extensions-share-tutorials-add-menuitem-create-menu.md)
-   [Customizing the Share Header Style \(Aikau\)](../tasks/dev-extensions-share-tutorials-customize-header-style.md)
-   [Adding JS packages \(Aikau\)](../tasks/dev-extensions-share-tutorials-amd-packages-via-extension.md)

|
|Alfresco Developer Blogs|-   [Extensibility Module Deployment](http://blogs.alfresco.com/wp/developer/2011/08/26/extensibility-module-deployment/)
-   [Replaces the Document Library configuration for Flash enablement for sites with specific name](http://blogs.alfresco.com/wp/developer/2012/03/05/share-configuration-extensibility/)
-   [Hide the title on a Surf Page](http://blogs.alfresco.com/wp/developer/2011/07/27/how-to-hide-content-on-an-existing-alfresco-share-page/) \(Old School Surf\)
-   [Adding content to a Surf Page](http://blogs.alfresco.com/wp/developer/2011/07/22/how-to-add-content-to-an-alfresco-share-page/) \(Old School Surf\)

|

-   **[Introduction to Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules-introduction.md)**  
This section introduces you to the Spring Surf extension modules, which are the preferred way of customizing many of the Alfresco Share user interface features.
-   **[Module deployment and evaluators](../concepts/dev-extensions-share-module-deployment.md)**  
You can deploy Surf Extension Modules and change their behavior using evaluators.
-   **[Module dependencies](../concepts/dev-extensions-share-module-dependencies.md)**  
This topic describes how dependencies such as additional CSS and JavaScript code can be included in a Surf Extension Module.
-   **[Module dynamic configuration](../concepts/dev-extensions-share-module-dynamic-configuration.md)**  
This topic describes how to dynamically configure modules.

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

