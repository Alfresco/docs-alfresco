---
author: Alfresco Documentation
---

# Creating Aikau Pages with Menus

You can add a page to Share using the new Aikau UI framework.

## Create a new page

To create a new page in Share using the new capabilities added by recent updates you can now do the following:

Create a new web script \(made up of the following files\):

-   new-page.get.desc.xml \(web script descriptor\)
-   new-page.get.js \(web script controller\)
-   new-page.get.html.ftl \(web script template\)

Place these files in any path under <tomcat-home\>/webapps/share/WEB-INF/classes/alfresco/site-webscript

Add the following content to the web descriptor:

```
<webscript>
   <shortname>My New Page</shortname>
   <url>/my-new-page</url>
</webscript>
```

Add the following content to the JavaScript controller:

```
model.jsonModel = {
   widgets: [{
      name: "alfresco/logo/Logo"
   }]
};
```

Add the following content to the template file:

```
<@processJsonModel group="share"/>
```

In your web browser navigate to: http://<server\>:<port\>/share/page/dp/ws/my-new-page and you will see the Alfresco logo displayed on the page.

## Widget creation configuration

The `alfresco/logo/Logo` widget declares a number of different CSS rules that allow us to easily change the logo that is rendered. Update the JavaScript controller to be the following:

```
model.jsonModel = {
   widgets: [{
      name: "alfresco/logo/Logo",
      config: {
         logoClasses: "surf-logo-large"
      }
   }]
};
```

If you make the changes to the source files in the deployed web application you can apply these changes simply by refreshing the web scripts by clicking the **Refresh Web Scripts** button on the web scripts home page http://<server\>:<port\>/share/service/index.

When you refresh the page you will now see the Surf logo displayed.

What we have done is to add some instantiation arguments to the `alfresco/logo/Logo` widget to override the default logoClasses attribute with a different CSS class that a selector was defined in the CSS resource associated with it. In the JSON model the `name` attribute refers to the name of the widget that you want to instantiate \(technically it refers to the Module Identifier or MID\) and config attribute is an object passed during instantiation of that widget.

## A simple menu bar

To create a menu bar:

```

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

The key thing to note here is the use of the widgets attribute in the config object of the `alfresco/menus/AlfMenuBar`. Where one widget can be the parent to several child widgets it is always possible for the model for those children to be defined in an array assigned to the widgets attribute. This repeating pattern is one of the many ways in which Surf is able to establish all the dependencies to load onto the page.

## Adding a menu list

To make the menu bar a bit more detailed, update the model to be the following:

```
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

## Adding cascading menus and icons

The first menu item has been converted to a popup menu containing two more menu items \(note again the repeating config/widgets/config/widgets pattern\). Now add some icons to the menu items, do some grouping and add a cascading menu. Try this model in your JavaScript controller:

```
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

When the web scripts are refreshed and the page is reloaded you will see a page displaying a menu with lists, cascaded menus and icons.

## The hybrid page

There is also the availability of the "hybrid" view of the page. By changing the URL to: http://<server\>:<port\>/share/page/hdp/ws/my-new-page \(note the additional "h"\) you will get the page content rendered between the standard Alfresco Content Services header and footer.

## Summary and next steps

This information has shown that it is possible to develop widgets using JSON models.

One of the main advantages of the new header bar in Share is that you can easily change it without copying and pasting all of the XML that defined it.

**Parent topic:**[Aikau Pages](../concepts/dev-extensions-share-aikau-pages.md)

