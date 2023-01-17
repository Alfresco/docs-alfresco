---
title: Aikau Pages Extension Point
---

The Share web application is built up of a main menu from which you can navigate to a number of pages. These pages are 
implemented mostly in the Surf development framework. However, a number of pages, such as search, have been converted 
and implemented with the new Aikau development framework, see architecture section.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

Aikau pages are the new type of pages that the Share UI will use in the future. Currently only the following pages are 
implemented in Aikau:

* Live Search
* Filtered Search Page
* Search Management Page
* Site Management Page
* Analytics and Reporting Widgets
* Document List prototype

Implementing an Aikau page is greatly simplified compared to creating a [Surf page]({% link content-services/7.2/develop/share-ext-points/surf-pages.md %}). 
The only thing you need to do is implement a [Surf Web Script]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}) and zero or 
more [Aikau Widgets]({% link content-services/7.2/develop/share-ext-points/aikau-widgets.md %}).

The web scripts controller is where all the fun happens. It is where you define your page layout in JSON, including all 
the Aikau Widgets that make up the page. It will look something like this for a Hello World page:

```javascript
model.jsonModel = {
    widgets: [
        {
            id: "SET_PAGE_TITLE",
            name: "alfresco/header/SetTitle",
            config: {
                title: "Hello World"
            }
        }
    ]
};   
```

The template will be very simple and the only thing it does is this:

```xml
<@processJsonModel />   
```

It basically just processes the JSON model that we set-up in the controller. Here we have used an out of the box Aikau 
widget called `alfresco/header/SetTitle`, and the only thing left to do is to create the web scripts descriptor:

```xml
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World page definition</description>
    <family>Share</family>
    <url>/helloworld</url>
</webscript>   
```

Now this is all there is to it. The page can be accessed via the `http://localhost:8080/share/page/hdp/ws/helloworld` URL. 
You should see the following page in Share: 

![dev-extensions-share-surf-page-helloworld-aikau-no-widget]({% link content-services/images/dev-extensions-share-surf-page-helloworld-aikau-no-widget.png %})

An Aikau page is processed and generated via the Spring Surf and Spring MVC framework. The following picture gives an 
overview of how it works:

![dev-extensions-share-aikau-pages-architecture]({% link content-services/images/dev-extensions-share-aikau-pages-architecture.png %})

As we can see in the picture, all dynamic content that should go onto the page is fetched indirectly via Aikau Widgets, 
which can get the content from either the repository or from some other remote Web Service. Worth noting here is that we 
are actually using a Surf Page when we are invoking an Aikau page, in the Hello World example we are used the hybrid 
dynamic page (hdp) to get the Share header and footer included.

## Creating Aikau Pages with Menus {#createpagewithmenu}

You can add a page to Share using the new Aikau UI framework.

### Create a new page

To create a new page in Share using the new capabilities added by recent updates you can now do the following:

Create a new web script (made up of the following files):

* `new-page.get.desc.xml` (web script descriptor)
* `new-page.get.js` (web script controller)
* `new-page.get.html.ftl` (web script template)

Place these files in any path under `<tomcat-home>/webapps/share/WEB-INF/classes/alfresco/site-webscript`.

Add the following content to the web descriptor:

```xml
<webscript>
   <shortname>My New Page</shortname>
   <url>/my-new-page</url>
</webscript>
```

Add the following content to the JavaScript controller:

```javascript
model.jsonModel = {
   widgets: [{
      name: "alfresco/logo/Logo"
   }]
};
```

Add the following content to the template file:

```xml
<@processJsonModel group="share"/>
```

In your web browser navigate to: `http://<server>:<port>/share/page/dp/ws/my-new-page` and you will see the Alfresco 
logo displayed on the page.

### Widget creation configuration

The `alfresco/logo/Logo` widget declares a number of different CSS rules that allow us to easily change the logo that 
is rendered. Update the JavaScript controller to be the following:

```javascript
model.jsonModel = {
   widgets: [{
      name: "alfresco/logo/Logo",
      config: {
         logoClasses: "surf-logo-large"
      }
   }]
};
```

If you make the changes to the source files in the deployed web application you can apply these changes simply by 
refreshing the web scripts by clicking the **Refresh Web Scripts** button on the web scripts home page 
`http://<server>:<port>/share/service/index`.

When you refresh the page you will now see the Surf logo displayed.

What we have done is to add some instantiation arguments to the `alfresco/logo/Logo` widget to override the default 
`logoClasses` attribute with a different CSS class that a selector was defined in the CSS resource associated with it. 
In the JSON model the `name` attribute refers to the name of the widget that you want to instantiate (technically it 
refers to the Module Identifier or MID) and config attribute is an object passed during instantiation of that widget.

### A simple menu bar

To create a menu bar:

```javascript
   model.jsonModel = {
   widgets: [{
      name: "alfresco/menus/AlfMenuBar",
      config: {
         widgets: [{
               name: "alfresco/menus/AlfMenuBarItem",
               config: {
               label: "One"
            }
            },{
               name: "alfresco/menus/AlfMenuBarItem",
               config: {
               label: "Two"
            }
         }]
      }
   }
]}; 
```

This creates a basic menu bar with two menu items.

The key thing to note here is the use of the widgets attribute in the config object of the `alfresco/menus/AlfMenuBar`. 
Where one widget can be the parent to several child widgets it is always possible for the model for those children to 
be defined in an array assigned to the widgets attribute. This repeating pattern is one of the many ways in which Surf 
is able to establish all the dependencies to load onto the page.

### Adding a menu list

To make the menu bar a bit more detailed, update the model to be the following:

```javascript
model.jsonModel = {
   widgets: [{
      name: "alfresco/menus/AlfMenuBar",
      config: {
         widgets: [{
            name: "alfresco/menus/AlfMenuBarPopup",
            config: {
               label: "One",
               widgets: [{
                  name: "alfresco/menus/AlfMenuItem",
                  config: {
                     label: "Popup item 1"
               }
         },{
               name: "alfresco/menus/AlfMenuItem",
               config: {
                  label: "Popup item 2"
               }
            }]
         }
      },{
            name: "alfresco/menus/AlfMenuBarItem",
            config: {
               label: "Two"
            }
         }]
      }
   }
]};
```

The result displays a menu list.

### Adding cascading menus and icons

The first menu item has been converted to a popup menu containing two more menu items (note again the repeating 
`config/widgets/config/widgets` pattern). Now add some icons to the menu items, do some grouping and add a cascading menu. 
Try this model in your JavaScript controller:

```javascript
model.jsonModel = {
   widgets: [{
      name: "alfresco/menus/AlfMenuBar",
      config: {
         widgets: [
         {
            name: "alfresco/menus/AlfMenuBarPopup",
            config: {
               label: "One",
               widgets: [
               {
                  name: "alfresco/menus/AlfMenuGroup",
                  config: {
                     label: "Group 1",
                     widgets: [{
                        name: "alfresco/menus/AlfMenuItem",
                        config: {
                           label: "Popup item 1",
                           iconClass: "alf-edit-icon"
                        }
                },{
                     name: "alfresco/menus/AlfCascadingMenu",
                     config: {
                        label: "Popup item 2",
                        iconClass: "alf-cog-icon",
                        widgets: [
                        {
                           name: "alfresco/menus/AlfMenuItem",
                           config: {
                              label: "Cascaded menu item 1",
                              iconClass: "alf-leave-icon"
                           }
                     },{
                        name: "alfresco/menus/AlfMenuItem",
                        config: {
                           label: "Cascaded menu item 2",
                           iconClass: "alf-help-icon"
                        }
                     }]
                  }
                 }]
               }
               },{
                  name: "alfresco/menus/AlfMenuGroup",
                  config: {
                     label: "Group 2",
                     iconClass: "alf-logout-icon",
                     widgets: [{
                        name: "alfresco/menus/AlfMenuItem",
                        config: {
                           label: "Popup item 3",
                           iconClass: "alf-profile-icon"
                        }
                     }]
                  }
               }]
            }
         },{
            name: "alfresco/menus/AlfMenuBarItem",
            config: {
               label: "Two"
            }
         }]
      }
   }
]};
```

When the web scripts are refreshed and the page is reloaded you will see a page displaying a menu with lists, 
cascaded menus and icons.

### The hybrid page

There is also the availability of the "hybrid" view of the page. By changing the URL to: 
`http://<server>:<port>/share/page/hdp/ws/my-new-page` (note the additional "h") you will get the page content 
rendered between the standard Content Services header and footer.

### Summary and next steps

This information has shown that it is possible to develop widgets using JSON models.

One of the main advantages of the new header bar in Share is that you can easily change it without copying and pasting 
all of the XML that defined it.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-webscripts` (Untouched by re-deployments and upgrades)
* `tomcat/shared/classes/alfresco/web-extension/site-data/extensions` (Untouched by re-deployments and upgrades)
* `tomcat/webapps/share/js` (when web resources are included, such as Aikau Widgets, you need to put them directly into the exploded webapp, this is **NOT** recommended.)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts` - Aikau page web scripts
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` - Extension modules with Dojo package definitions
* `aio/share-jar/src/main/resources/META-INF/resources/share-jar/js/<dojo package>` - web resources, such as Aikau Widgets

## More Information

* [Software Architecture - Introduction to Aikau Pages]({% link content-services/7.2/develop/software-architecture.md %}#aikauintro) - This page contains a walk-through on how to create an Aikau page, and it also has links to a page that shows how to create the same page with old-school Surf.
* [Introduction to Aikau]({% link content-services/7.2/develop/reference/aikau-intro-ref.md %})
* [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"} - this is the place to look for widgets that you can use in your pages.

## Tutorials

* [Adding new AMD packages for Aikau Widgets]({% link content-services/7.2/tutorial/share/amd.md %})
* [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/tree/master/tutorial/chapters){:target="_blank"}

## Developer Blogs

* [Creating a simple Aikau page with Cascading Menu](https://hub.alfresco.com/t5/alfresco-content-services-blog/simple-page-creation-in-share/ba-p/287600){:target="_blank"}
* [Creating a simple Aikau page with a button on it.](http://ohej.github.io/alfresco-tutorials/tutorial/aikau/tutorial.html#part-one-creating-a-page){:target="_blank"}
* [Aikau background and concepts](https://hub.alfresco.com/t5/alfresco-content-services-blog/latest-updates-to-share-and-surf/ba-p/289014){:target="_blank"}
* [Deep dive into Dojo, Dijit, and Aikau development](https://docs.google.com/document/d/1q25jA5EQ5PRYekr8tpM3ELlwOQ8Ht3Ng6D4VWsKoZtY/pub){:target="_blank"}
* [Aikau Tutorial](http://ohej.github.io/alfresco-tutorials/tutorial/aikau/tutorial.html){:target="_blank"}
