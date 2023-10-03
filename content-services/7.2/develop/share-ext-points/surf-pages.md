---
title: Surf Pages Extension Point
---

The Alfresco Share web application is built up of a main menu from which you can navigate to a number of pages. These 
pages are implemented with the Surf development framework. However, note that some pages have been converted and 
implemented with the Aikau development framework, see architecture section.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

Surf pages are the "old school" pages that most of the Share UI is built up around. But more and more pages are converted 
to [Aikau pages]({% link content-services/7.2/develop/share-ext-points/aikau-pages.md %}). All files involved in defining a Surf page are stored under 
`/site-data` and `/templates`.

Putting together a Surf page involves a lot of objects, such as page, template-instance, component, and so on. 
This is called the [siteData]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surfobjsitedata) model and the following picture illustrates 
how these objects play together:

![dev-extensions-share-surf-page-model]({% link content-services/images/dev-extensions-share-surf-page-model.png %}) 
 
The definition of a [Surf page]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surfpagexml) is done in XML and looks like this in a Hello World example:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<page>
    <title>Hello World</title>
    <title-id>page.helloworld.title</title-id>
    <description>Hello World Description</description>
    <description-id>page.helloworld.description</description-id>
    <template-instance>helloworldhome-three-column</template-instance>
    <authentication>none</authentication>
</page>   
```

Page definition file names follow a naming convention: `<page-id>.xml`, the above page definition could be stored in a 
file called `helloworld.xml` under `site-data/pages`.

The page definition refers to a [template instance]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surftemplateinstancexml) that 
links to the physical template, it is defined in XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<template-instance>
    <template-type>org/alfresco/training/helloworld-1-column</template-type>
</template-instance>   
```

Template instance definition file names follow a naming convention: `<template-instance-id>.xml`, the above template 
instance definition could be stored in a file called `helloworld-1-column.xml` under `site-data/template-instances`.

The physical template is defined in FreeMarker and looks something like this:

```xml
<#include "/org/alfresco/include/alfresco-template.ftl" />
<@templateHeader>
</@>

<@templateBody>
   <@markup id="alf-hd">
   <div id="alf-hd">
      <@region scope="global" id="share-header" chromeless="true"/>
   </div>
   </@>
   <@markup id="bd">
    <div id="bd">
        <@region id="body" scope="page" />
    </div>
   </@>
</@>

<@templateFooter>
   <@markup id="alf-ft">
   <div id="alf-ft">
      <@region id="footer" scope="global" />
   </div>
   </@>
</@>   
```

Template files are stored under `/templates`.

The page is built up of different regions, and each `region` is defined for a specific `scope`, such as `global` or `page`. 
If the scope is page then we always need to implement the rendition for the region. This is done via a 
[component]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#surfcomponentxml), which is defined in XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<component>
    <url>/components/helloworld/body</url>
</component>
```

Page definition file names follow a naming convention: `<scope[global|template|page]>.<region-id>.<[template-instance-id|page-id]>.xml`, 
the above component definition could be stored in a file called `page.body.helloworld.xml` under `site-data/components`. The 
component just points to a [Surf Web Script]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}) that should render the HTML for 
the page region.

A Surf page is processed and generated via the Spring MVC framework. The following picture gives an overview of how it works:

![dev-extensions-share-surf-pages-architecture]({% link content-services/images/dev-extensions-share-surf-pages-architecture.png %})

As we can see in the picture, all dynamic content that should go onto the page is fetched indirectly via Surf Web Scripts, 
which can get the content from either the Alfresco Repository or from some other remote Web Service.

## Template markup

There are a number of additional FreeMarker template directives.

In the [widget instantiation customization tutorial]({% link content-services/7.2/tutorial/share/doclib.md %}#customizesurfwidget) 
the `documentlist.get.html.ftl` and `documentlist.get.js` files were modified to instantiate a custom JavaScript widget 
that extends the default `Alfresco.DocumentList`. This is a fragment from the `webview.get.html.ftl` file:

```xml
<@markup id="widgets">
   <@inlineScript group="dashlets">var editDashletEvent = new YAHOO.util.CustomEvent("onDashletConfigure"); </@> 
   <@createWidgets group="dashlets"/> 
   <@inlineScript group="dashlets"> editDashletEvent.subscribe(webView.onConfigWebViewClick, webView, true); </@> 
</@>
```

Note that another new FreeMarker directive is being used: `<@inlineScript>` - this directive is used to demarcate 
sections of JavaScript to be included on the rendered HTML page but allows the specified script to be moved around 
the page or into aggregated generated resource files.

### Setting Object References

This extra code is required in this web script to create a custom event that is triggered when a user clicks on a 
button in the title bar. The `<@createWidgets>` directive is able to pass a reference to the `editDashletEvent` object 
by way of a special data structure that can be used when creating the instantiation metadata in the JavaScript controller.

The problem is that when creating the model it is impossible to distinguish between a primitive String and a String that 
is a reference to a JavaScript variable defined in the FreeMarker template, because the controller has no awareness of 
that variable (the JavaScript controller is processed before the FreeMarker template).

To work around this problem the webview.get.js controller sets a reference by including the following object to the 
widget's `options` metadata object:

```javascript
eventOnClick: { _alfValue : "editDashletEvent", _alfType: "REFERENCE"},
```

When the `<@createWidgets>` directive encounters a JSON object with the attributes `_alfValue` and `_alfType`, 
and *only* those attributes, it converts that object into a variable reference instead of a String.

### Generated JavaScript

The source for the generated page will contain the following:

```xml
<script>//<![CDATA[ var editDashletEvent = new YAHOO.util.CustomEvent("onDashletConfigure"); //]]></script> 
<script type="text/javascript">//&lt;![CDATA[ var webView=new Alfresco.dashlet.WebView("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default").setOptions({"webviewTitle":"","webviewURI":"/share/page/webview-default","isDefault":true,"webviewHeight":"","componentId":"page.component-1-2.site~site1~dashboard#default"}).setMessages({"label.noWebPage": "No web page to display.", "dashlet.help": "<p>This dashlet shows the website of your choice. Click the edit icon on the dashlet to change the web address.</p><p>Clicking the dashlet title opens the website in a separate window.</p>", "label.header": "Web View"}); new Alfresco.widget.DashletResizer("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default", "page.component-1-2.site~site1~dashboard#default"); new Alfresco.widget.DashletTitleBarActions("page_x002e_component-1-2_x002e_site_x007e_site1_x007e_dashboard_x0023_default").setOptions({"actions":[{"eventOnClick":editDashletEvent,"cssClass":"edit","tooltip":"dashlet.edit.tooltip"},{"bubbleOnClick":{"message":"dashlet.help"},"cssClass":"help","tooltip":"dashlet.help.tooltip"}]}); //]]></script> <script type="text/javascript">//<![CDATA[ editDashletEvent.subscribe(webView.onConfigWebViewClick, webView, true); //]]></script> 
```

Contained in the script for the `Alfresco.widget.DashletTitleBarActions` widget is the following call to the `.setOptions()` function:

```javascript
.setOptions({ "actions": [{ "eventOnClick" : editDashletEvent, "cssClass" : "edit", "tooltip" : "dashlet.edit.tooltip" }, { "bubbleOnClick": { "message" : "dashlet.help" }, "cssClass" : "help", "tooltip" : "dashlet.help.tooltip" } ] });
```

Note that the `eventOnClick` attribute is being set as an object reference and not a String.

You have learned how to address the issue of referencing JavaScript objects declared in the FreeMarker template in the 
widget instantiation metadata, and the reason for the "pre" and "post" `<@markup>` directives in the new boiler-plate template.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-data/pages` - Page definition
* `tomcat/shared/classes/alfresco/web-extension/site-data/template-instances` - Template instance pointing to FreeMarker template
* `tomcat/shared/classes/alfresco/web-extension/site-data/components` - Components fetching content and rendering presentation for a specific region in the physical template
* `tomcat/shared/classes/alfresco/web-extension/templates` - FreeMarker template location

These paths are untouched by re-deployments and upgrades) For component Web Script file locations see: 
[Web Script]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}) section.

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/pages`
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/template-instances`
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/components`
* `aio/share-jar/src/main/resources/alfresco/web-extension/templates`

For component web script file locations see: [Web Script]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}) section.

## More Information

* [Introduction to Surf Pages]({% link content-services/7.2/develop/software-architecture.md %}#surfpageintro) - This page contains a walk-through on how to create a Surf page, and it also has links to a page that shows how to create the same page with Aikau.
* [Spring Surf Framework Guide]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}) - Deep dive into the Surf framework

## Sample Code

* [Custom Surf Pages, Surf Dashlets, and Surf Web Scripts](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-surf-dashlet-and-page-share){:target="_blank"}

## Tutorials

* [Page tutorials]({% link content-services/7.2/tutorial/share/pages.md %})

## Developer Blogs

* [Adding a Surf page and making it the landing page](https://hub.alfresco.com/t5/alfresco-content-services-blog/advanced-share-customization-part-1/ba-p/293015){:target="_blank"}
* [Adding a Surf page and making it the login page](https://hub.alfresco.com/t5/alfresco-content-services-blog/advanced-share-customization-part-2/ba-p/287517){:target="_blank"}
* [Checksum dependencies for page resources](https://hub.alfresco.com/t5/alfresco-content-services-blog/checksum-dependencies-in-surf/ba-p/287715){:target="_blank"}
* [CSS Data Image Support in pages](https://hub.alfresco.com/t5/alfresco-content-services-blog/css-data-image-support-in-spring-surf/ba-p/287698){:target="_blank"}

