---
title: Overview of in-process Share extension points
---

An extension point is an interface that a developer can use to customize the Share web application in a supported way. 
There are a number of extension points that can be used to do things like adding custom pages, hiding content on 
existing pages, display custom metadata, modify the menu, and so on.

Read through the [Getting started guide]({% link content-services/7.2/develop/index.md %}) to get up to 
speed on the difference between in-process and out-of-process extensions. 

To fully understand the extension points it is a good idea to first read through the  
[Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture) section.

Also, you should get familiar with the [Alfresco SDK]({% link content-services/7.2/develop/sdk.md %}) as it is 
the recommended way of developing Share extensions.

The Share extension points can be grouped into three different categories:

* **Declarative** - XML configuration that requires no coding
* **Programmatic** - Code that adds new functionality
* **Override** - Code that overrides default behavior of Share

The following table lists all the extension points that are available to you when customization the Share web application:

|Extension Point Name|Description|Category|Support Status|
|--------------------|-----------|--------|--------------|
|[Share Configuration]({% link content-services/7.2/develop/share-ext-points/share-config.md %})|A lot of customizations to the Share UI can be done via configuration, get familiar with what can be achieved with configuration before attempting any programming customizations.|Declarative|Full Support|
|[Form Controls]({% link content-services/7.2/develop/share-ext-points/form-controls.md %})|When defining a form the form controls for each field controls how the field is displayed and handled.|Programmatic|Full Support|
|[Form Processors]({% link content-services/7.2/develop/share-ext-points/form-processors.md %})|Form processors control the persistence of form data and the generation of the form template for a specific item such as a node, task, type, or action. Custom Form Processors can be implemented to support a new kind of item.|Programmatic|Full Support|
|[Form Processor Filters]({% link content-services/7.2/develop/share-ext-points/form-processor-filters.md %})|Form filters can be used to intercept a form processor's persist form data call and generate form template call. "Before" and "After" method hooks are available in the filter to control form data persistence and form template generation.|Programmatic|Full Support|
|[Form Field Validation Handlers]({% link content-services/7.2/develop/share-ext-points/form-field-validation-handlers.md %})|A validation handler is a small JavaScript function that gets called by the forms runtime when a field value needs to be validated.|Programmatic|Full Support|
|[Evaluators]({% link content-services/7.2/develop/share-ext-points/evaluators.md %})|Component visibility in the Share user interface can be controlled by Evaluators.|Declarative and Programmatic|Full Support|
|[Site Presets]({% link content-services/7.2/develop/share-ext-points/site-presets.md %})|A site preset contains the initial configuration for a Share site, such as the site Dashboard layout.|Declarative|Full Support|
|[Share Themes]({% link content-services/7.2/develop/share-ext-points/share-themes.md %})|The Share web application comes with a number of themes that can be used to set the look and feel of the application. It is also possible to create your own custom UI themes.|Declarative|Full Support|
|[Document Library]({% link content-services/7.2/develop/share-ext-points/doclib.md %})|The Document Library page has several extension points that can be used to customize its behavior, such as actions.|Declarative and Programmatic|Full Support|
|[Surf Extension Modules]({% link content-services/7.2/develop/share-ext-points/surf-extension-modules.md %})|Surf Extension Modules are the main tool to use when adding, updating, or hiding content in the Share User Interface (UI). They can be deployed and un-deployed during runtime. A module is defined in XML and stored in the `site-data/extensions` directory.|Declarative and Programmatic|Full Support|
|[Surf Web Scripts]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %})|When you look under the covers of the Share web application you will notice that most of the functionality is implemented as Surf Web Scripts. This is true for both Pages and Dashlets.|Declarative and Programmatic|Full Support|
|[Surf Web Script JavaScript Root Objects]({% link content-services/7.2/develop/share-ext-points/javascript-root-objects.md %})|A number of JavaScript root objects are available when you are implementing a controller for a Surf Web Script, such as `page` and `remote`. Sometimes you might have custom Java code that you want to call from JavaScript controllers, this is possible by adding custom JavaScript root objects.|Programmatic|Full Support|
|[Surf Pages]({% link content-services/7.2/develop/share-ext-points/surf-pages.md %})|The Alfresco Share web application is built up of a main menu from which you can navigate to a number of pages.|Declarative and Programmatic|Limited Support (Use Aikau Pages instead)|
|[Surf Dashlets]({% link content-services/7.2/develop/share-ext-points/surf-dashlets.md %})|The Share web application has a special page called Dashboard, which contains windows (think Portlets) of content called dashlets.|Declarative and Programmatic|Limited Support (Use Aikau Dashlets instead)|
|[Surf Widgets]({% link content-services/7.2/develop/share-ext-points/surf-widgets.md %})|The Share web application is built up of a main menu, pages, and dashlets. The pages and dashlets are mainly processed on the server side as web scripts. When client side processing is needed in the form of browser JavaScript and CSS then this is contained in Widgets.|Programmatic|Full Support|
|[Aikau Menus]({% link content-services/7.2/develop/share-ext-points/aikau-menus.md %})|The main menu of Share is implemented with the new Aikau UI development framework.|Programmatic|Full Support|
|[Aikau Pages]({% link content-services/7.2/develop/share-ext-points/aikau-pages.md %})|The Share web application is built up of a main menu from which you can navigate to a number of pages. These pages are implemented mostly in the Surf development framework. However, a number of pages, such as search, have been converted and implemented with the new Aikau development framework, see architecture section.|Declarative and Programmatic|Full Support|
|[Aikau Dashlets]({% link content-services/7.2/develop/share-ext-points/aikau-dashlets.md %})|The Share web application has a special page called Dashboard, which contains windows of content called dashlets. Currently most of these dashlets are Spring Surf dashlets, but they will eventually be converted to Aikau dashlets.|Declarative and Programmatic|Full Support|
|[Aikau Widgets]({% link content-services/7.2/develop/share-ext-points/aikau-widgets.md %})|Aikau pages are built up of widgets. There are two types of widgets, presentation widgets and service widgets. These JavaScript widgets are Dojo classes. A widget can have its own CSS, HTML, and Properties.|Programmatic|Full Support|
|[Modifying OOTB Code]({% link content-services/7.2/develop/share-ext-points/modify-ootb-code.md %})|Most of the Share UI functionality can be traced back to a web script in one place or another. Sometimes it is useful to be able to override the controller or template of one of these out-of-the-box web scripts. Same things goes for other out-of-the-box code for things like pages and dashlets.|Override|Full Support via [Surf Extension Modules]({% link content-services/7.2/develop/share-ext-points/surf-extension-modules.md %})|
