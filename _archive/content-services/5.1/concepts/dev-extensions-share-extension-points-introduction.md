---
author: Alfresco Documentation
---

# Share Extension Points

Introduction to the supported extension points in the Alfresco Share web application.

An extension point is an interface that a developer can use to customize the Alfresco Share web application in a supported way. There are a number of extension points that can be used to do things like adding custom pages, hiding content on existing pages, display custom metadata, modify the menu etc. To fully understand the extension points it is a good idea to first read through the [Share Architecture section](dev-extensions-share-architecture-extension-points.md).

The Share extension points can be grouped into three different categories:

-   **Declarative** - XML configuration that requires no coding
-   **Programmatic** - Code that adds new functionality
-   **Override** - Code that overrides default behaviour of Alfresco Share

The following table lists all the extension points that are available to you when customization the Share web application:

|Extension Point Name|Category|Support Status|
|--------------------|--------|--------------|
|[Share Configuration](dev-extensions-share-configuration.md)|Declarative|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Form Controls](dev-extensions-share-form-controls.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Form Field Validation Handlers](dev-extensions-share-form-field-validation-handlers.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Evaluators](dev-extensions-share-evaluators.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Site Presets](dev-extensions-share-site-presets.md)|Declarative|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Share Themes](dev-extensions-share-themes.md)|Declarative|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Document Library](dev-extensions-share-doclib-actions.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Surf Web Scripts](dev-extensions-share-surf-web-scripts.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Surf Web Script JavaScript Root Objects](dev-extensions-share-surf-web-script-js-root-objects.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Surf Pages](dev-extensions-share-surf-pages.md)|Declarative and Programmatic|[Limited Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) \(Use Aikau Pages instead\)|
|[Surf Dashlets](dev-extensions-share-surf-dashlets.md)|Declarative and Programmatic|[Limited Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) \(Use Aikau Dashlets instead\)|
|[Surf Widgets](dev-extensions-share-surf-widgets.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Aikau Menus](dev-extensions-share-aikau-menus.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Aikau Pages](dev-extensions-share-aikau-pages.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Aikau Dashlets](dev-extensions-share-aikau-dashlets.md)|Declarative and Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Aikau Widgets](dev-extensions-share-aikau-widgets.md)|Programmatic|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Modifying OOTB Surf Pages](dev-extensions-share-override-ootb-surf-pages.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|[Modifying OOTB Surf Dashlets](dev-extensions-share-override-ootb-surf-dashlets.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|[Modifying OOTB Surf Widgets](dev-extensions-share-override-ootb-surf-widgets.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|[Modifying OOTB Aikau Pages](dev-extensions-share-override-ootb-aikau-pages.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|[Modifying OOTB Aikau Dashlets](dev-extensions-share-override-ootb-aikau-dashlets.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html) via [Surf Extension Modules](dev-extensions-share-surf-extension-modules.md)|
|[Modifying OOTB Aikau Widgets](dev-extensions-share-override-ootb-aikau-widgets.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|[Modifying OOTB Surf Web Scripts](dev-extensions-share-override-ootb-surf-webscripts.md)|Override|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|

Note that the table has links to each Extension Point section.

-   **[Share Configuration](../concepts/dev-extensions-share-configuration.md)**  
A lot of the customizations that you might want to do to the Share user interface does not require coding. They can be handled by XML configuration and a simple restart of Alfresco.
-   **[Form Controls](../concepts/dev-extensions-share-form-controls.md)**  
When defining a form the form controls for each field controls how the field is displayed and handled.
-   **[Form Field Validation Handlers](../concepts/dev-extensions-share-form-field-validation-handlers.md)**  
A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to be validated.
-   **[Evaluators](../concepts/dev-extensions-share-evaluators.md)**  
Component visibility in the Share user interface can be controlled by Evaluators.
-   **[Site Presets](../concepts/dev-extensions-share-site-presets.md)**  
A site preset contains the initial configuration for a Share Site, such as the site Dashboard layout.
-   **[Share Themes](../concepts/dev-extensions-share-themes.md)**  
The Share web application comes with a number of themes that can be used to set the look and feel of the application. It is also possible to create your own custom UI themes.
-   **[Document Library](../concepts/dev-extensions-share-doclib-actions.md)**  
The Document Library page has several extension points that can be used to customize its behaviour, such as actions.
-   **[Surf Extension Modules](../concepts/dev-extensions-share-surf-extension-modules.md)**  
This section covers the Surf Extension Modules.
-   **[Surf Web Scripts](../concepts/dev-extensions-share-surf-web-scripts.md)**  
When you look under the covers of the Share web application you will notice that most of the functionality is implemented as Surf Web Scripts. This is true for both Pages and Dashlets.
-   **[Surf Web Script JavaScript Root Objects](../concepts/dev-extensions-share-surf-web-script-js-root-objects.md)**  
A number of JavaScript root objects are available when you are implementing a controller for a Surf Web Script, such as `page` and `remote`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.
-   **[Surf Pages](../concepts/dev-extensions-share-surf-pages.md)**  
The Share web application is built up of a main menu from which you can navigate to a number of pages. These pages are implemented with the Surf development framework. However, note that some pages have been converted and implemented with the new Aikau development framework, see architecture section.
-   **[Surf Dashlets](../concepts/dev-extensions-share-surf-dashlets.md)**  
The Share web application has a special page called Dashboard, which contains windows \(think Portlets\) of content called Dashlets. Currently most of these Dashlets are Spring Surf Dashlets, but they will eventually be converted to Aikau Dashlets.
-   **[Surf Widgets](../concepts/dev-extensions-share-surf-widgets.md)**  
The Share web application is built up of a main menu, pages, and Dashlets. The pages and Dashlets are mainly processed on the server side as Web Scripts. When client side processing is needed in the form of browser JavaScript and CSS then this is contained in Widgets. The Surf Widgets uses the Yahoo UI library as JavaScript framework and widget library. These widgets will eventually be replaced by Aikau Widgets.
-   **[Aikau Menus](../concepts/dev-extensions-share-aikau-menus.md)**  
The main menu of Share is implemented with the new Aikau UI development framework. It is possible to customize this menu, so you can navigate to new custom pages for example.
-   **[Aikau Pages](../concepts/dev-extensions-share-aikau-pages.md)**  
The Share web application is built up of a main menu from which you can navigate to a number of pages. These pages are implemented mostly in the Surf development framework. However, a number of pages, such as Search, have been converted and implemented with the new Aikau development framework, see architecture section.
-   **[Aikau Dashlets](../concepts/dev-extensions-share-aikau-dashlets.md)**  
The Share web application has a special page called Dashboard, which contains windows of content called Dashlets. Currently most of these Dashlets are Spring Surf Dashlets, but they will eventually be converted to Aikau Dashlets.
-   **[Aikau Widgets](../concepts/dev-extensions-share-aikau-widgets.md)**  
Aikau pages are built up of widgets. There are two types of widgets, presentation widgets and service widgets. These JavaScript widgets are Dojo classes. A widget can have its own CSS, HTML, and Properties.
-   **[Modifying Out-of-the-box Surf Pages](../concepts/dev-extensions-share-override-ootb-surf-pages.md)**  
Most of the pages in the Share web application are implemented with the Surf UI framework. In many cases it is necessary to modify these pages.
-   **[Modifying Out-of-the-box Surf Dashlets](../concepts/dev-extensions-share-override-ootb-surf-dashlets.md)**  
The Share web application has a special page called Dashboard, which contains windows of content called Dashlets. Currently most of these Dashlets are Spring Surf Dashlets, and it is possible to modify the contents on them.
-   **[Modifying Out-of-the-box Surf Widgets](../concepts/dev-extensions-share-override-ootb-surf-widgets.md)**  
The Share web application pages and dashlets are built up of widgets. Sometimes it is necessary to modify these.
-   **[Modifying Out-of-the-box Aikau Pages](../concepts/dev-extensions-share-override-ootb-aikau-pages.md)**  
The Share web application has a number of Aikau pages. These can be modified.
-   **[Modifying Out-of-the-box Aikau Dashlets](../concepts/dev-extensions-share-override-ootb-aikau-dashlets.md)**  
The Share web application has a special page called Dashboard, which contains windows of content called Dashlets. Currently most of these Dashlets are Spring Surf Dashlets, but they will eventually be converted to Aikau Dashlets.
-   **[Modifying Out-of-the-box Aikau Widgets](../concepts/dev-extensions-share-override-ootb-aikau-widgets.md)**  
Every Aikau menu, page, and dashlet is built up of one or more widgets. Sometimes it is necessary to modify out of the box widgets.
-   **[Modifying Out-of-the-box Surf Web Scripts](../concepts/dev-extensions-share-override-ootb-surf-webscripts.md)**  
Most of the Share UI functionality can be traced back to a Web Script in one place or another. Sometimes it is useful to be able to override the controller or template of one of these Out-of-the-box \(OOTB\) Web Scripts.

**Parent topic:**[Share extensions](../concepts/dev-extensions-share.md)

