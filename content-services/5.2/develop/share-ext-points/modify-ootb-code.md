---
title: Modifying Out-of-the-box Surf Web Scripts
---

Most of the Share UI functionality can be traced back to a web script in one place or another. Sometimes it is useful to be able to override the controller or template of one of these Out-of-the-box (OOTB) web scripts.

|Extension Point|Modifying Out-of-the-box Surf Web Scripts|
|---------------|-----------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying out-of-the-box Surf Web Scripts is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the Web Script that should be replaced:

```
<extension>
    <modules>
        <module>
            <id>Customize a Web Script</id>
            <version>1.0</version>
            <auto-deploy>true</auto-deploy>
            <customizations>
                <customization>
                    <targetPackageRoot>The path to the out-of-the-box Web Script you are overriding, such as org.alfresco.components.dashlets</targetPackageRoot>
                    <sourcePackageRoot>The path to your Web Script customizations, such as org.alfresco.tutorials.customization.webscript.controller</sourcePackageRoot>
                </customization>
            </customizations>
        </module>
    </modules>
</extension>
```

 The Web Script files in your package should have the same names as the original ones that you are overriding. The Extension Modules section has all the details.

 Out-of-the-box Surf Web Scripts **used** to be overridden by putting the modified files under alfresco/web-extension/site-webscripts/org/alfresco/... directory using the exact same path. This approach is no longer needed.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here
-   aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts - Your Web Script overrides are stored here under a custom package path

|
|More Information|-   [Surf Web Scripts]({% link content-services/5.2/develop/repo-ext-points/web-scripts.md %}#surf-web-scripts)
-   [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)

|
|Tutorials|-   See [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)

|

## Modifying Out-of-the-box Surf Pages {#modifying-out-of-the-box-surf-pages}

Most of the pages in the Share web application are implemented with the Surf UI framework. In many cases it is necessary to modify these pages.

|Extension Point|Modifying Out-of-the-box Surf Pages|
|---------------|-----------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying Surf pages is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the component that should be replaced or hidden. It is also possible to add components to a page this way. The Extension Modules section has all the details.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here

|
|More Information|-   [Surf Pages]({% link content-services/5.2/develop/share-ext-points/surf-pages.md %}#surf-pages)

|
|Tutorials|-   See [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)

|
|Developer Blogs||

## Modifying Out-of-the-box Surf Dashlets {#modifying-out-of-the-box-surf-dashlets}

The Share web application has a special page called Dashboard, which contains windows of content called dashlets. Currently most of these dashlets are Spring Surf dashlets, and it is possible to modify the contents on them.

|Extension Point|Modifying Out-of-the-box Surf Dashlets|
|---------------|--------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying Surf dashlets is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the component that should be replaced or hidden. It is also possible to add components to a dashlet this way. The Extension Modules section has all the details.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here

|
|More Information|-   [Surf Dashlets]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets)

|
|Tutorials|-   See [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)

|
|Developer Blogs||

## Modifying Out-of-the-box Surf Widgets {#modifying-out-of-the-box-surf-widgets}

The Share web application pages and dashlets are built up of widgets. Sometimes it is necessary to modify these.

|Extension Point|Modifying Out-of-the-box Surf Widgets|
|---------------|-------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying Surf widgets is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the component that has the widget that should be replaced or hidden. It is also possible to add widgets to a page this way. The Extension Modules section has all the details.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Store extension modules here

|
|More Information|-   [Surf Widgets]({% link content-services/5.2/develop/share-ext-points/surf-widgets.md %}#surf-widgets)

|
|Tutorials|-   See [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)

|
|Developer Blogs||

## Modifying Out-of-the-box Aikau Pages {#modifying-out-of-the-box-aikau-pages}

The Share web application has a number of Aikau pages. These can be modified.

|Extension Point|Modifying Out-of-the-box Aikau Pages|
|---------------|------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture)|
|Description|The preferred way of modifying Aikau pages is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the Aikau widget that should be replaced or hidden. It is also possible to add widgets to a page this way. The Extension Modules section has all the details. Now, if we want to modify an existing page we need to grab hold of it in the Web Script controller, this will look like this:

```
var widget = widgetUtils.findObject(model.jsonModel.widgets, "id", "FCTSRCH_SEARCH_RESULTS_LIST");
if (widget && widget.config && widget.config.widgets) {
   widget.config.widgets.push( {
...   
```

This is all that is required to extend an existing JSON model. We're using `widgetUtils` to find the `FCTSRCH_SEARCH_RESULTS_LIST` widget. Once we have it, we simply push widgets into it.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3)|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Extension module goes here

|
|More Information|-   [Aikau Pages]({% link content-services/5.2/develop/share-ext-points/aikau-pages.md %}#aikau-pages)
-   [Introduction to Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau)
-   [Aikau Widget Reference](https://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.

|
|Tutorials|-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)
-   [Adding new AMD packages for Aikau Widgets]({% link content-services/5.2/tutorial/share/amd.md %}#adding-amd-packages-via-extension-modules-aikau)

|
|Developer Blogs|-   [Customizing Search Page](https://hub.alfresco.com/t5/alfresco-content-services-blog/adding-views-to-filtered-search/ba-p/292844)
-   [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|

## Modifying Out-of-the-box Aikau Dashlets {#modifying-out-of-the-box-aikau-dashlets}

The Share web application has a special page called Dashboard, which contains windows of content called dashlets. Currently most of these dashlets are Spring Surf dashlets, but they will eventually be converted to Aikau dashlets.

|Extension Point|Modifying Out-of-the-box Aikau Dashlets|
|---------------|---------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying Aikau dashlets is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the Aikau widget that should be replaced or hidden. It is also possible to add widgets to a dashlet this way. The Extension Modules section has all the details.|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Extension modules go here

|
|More Information|-   [Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/aikau-dashlets.md %}#aikau-dashlets)
-   [Introduction to Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau)
-   [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.

|
|Tutorials|-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)
-   [Adding new AMD packages for Aikau Widgets]({% link content-services/5.2/tutorial/share/amd.md %}#adding-amd-packages-via-extension-modules-aikau)

|
|Developer Blogs|-   [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|

## Modifying Out-of-the-box Aikau Widgets {#modifying-out-of-the-box-aikau-widgets}

Every Aikau menu, page, and dashlet is built up of one or more widgets. Sometimes it is necessary to modify out of the box widgets.

|Extension Point|Modifying Out-of-the-box Aikau Widgets|
|---------------|--------------------------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %}) via [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules)|
|Architecture Information|[Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture).|
|Description|The preferred way of modifying Aikau widgets is by using [Surf Extension Modules]({% link content-services/5.2/develop/share-ext-points/surf-extension-modules.md %}#surf-extension-modules) to target the widget that should be replaced or hidden. It is also possible to add widgets this way. The Extension Modules section has all the details.|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-data/extensions/ (Untouched by re-depolyments and upgrades)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions - Extension modules go here

|
|More Information|-   [Aikau Widgets]({% link content-services/5.2/develop/share-ext-points/aikau-widgets.md %}#aikau-widgets)
-   [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/) - this is the place to look for widgets that you can use in your dashlets.
-   [Introduction to Aikau]({% link content-services/5.2/develop/reference/aikau-intro-ref.md %}#introducing-aikau)

|
|Tutorials|-   [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/blob/master/tutorial/chapters)
-   [Adding new AMD packages for Aikau Widgets]({% link content-services/5.2/tutorial/share/amd.md %}#adding-amd-packages-via-extension-modules-aikau)

|
|Developer Blogs|-   [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014)
-   [Deep dive into Dojo, Dijit, and Aikau development.](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub)

|
