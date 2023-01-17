---
title: Aikau Menus Extension Point
---

The main menu of Share is implemented with the new Aikau UI development framework. It is possible to customize this menu, 
so you can navigate to new custom pages for example.

Architecture Information: [Share Architecture]({% link content-services/7.2/develop/software-architecture.md %}#sharearchitecture)

## Description

The main menu and title in Share is implemented in Aikau, it looks like this:

![dev-extensions-share-main-menu]({% link content-services/images/dev-extensions-share-main-menu.png %})

Adding and removing menu items from the menu is a common task. To do this we use a 
[Surf Extension Module]({% link content-services/7.2/develop/share-ext-points/surf-extension-modules.md %}). 
It will look something like this:

```xml
<extension>
  <modules>
    <module>
      <id>Add custom menu item to header</id>
      <version>1.0</version>
      <auto-deploy>true</auto-deploy>  
      <customizations>
        <customization>
          <targetPackageRoot>org.alfresco.share.header</targetPackageRoot>
          <sourcePackageRoot>com.example.header</sourcePackageRoot>
        </customization>
      </customizations>
    </module>
  </modules>
</extension>   
```

So we are targeting the `/share/WEB-INF/classes/alfresco/site-webscripts/org/alfresco/share/header/share-header.get.js` 
web script controller file, which implements the menu JSON model. Now, if we want to for example add a menu item we need 
to create a file with the same name and put it in `alfresco/web-extension/site-webscripts/com/example/header`. 
The file will look like this:

```javascript
var headerMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_APP_MENU_BAR");
if (headerMenu != null) {
    headerMenu.config.widgets.push({
        id: "HEADER_CUSTOM_PROFILE_LINK",
        name: "alfresco/menus/AlfMenuBarItem",
            config: {
                label: "My profile",
                targetUrl: "user/" + encodeURIComponent(user.name) + "/profile"
            }
    });
}   
```

This is all that is required to extend an existing JSON model. We're using `widgetUtils` to find the `HEADER_APP_MENU_BAR` 
widget. Once we have it, we simply push a widget into it.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/web-extension/site-webscripts` - put the files that are overriding here  
* `tomcat/shared/classes/alfresco/web-extension/site-data/extensions` - put the Extension Module here.

(Untouched by re-deployments and upgrades)

## Deployment All-in-One SDK project

* `aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts` - put the files that are overriding here
* `aio/share-jar/src/main/resources/alfresco/web-extension/site-data/extensions` - put the Extension Module here.

## More Information

* [Creating an Aikau page with Menus]({% link content-services/7.2/develop/share-ext-points/aikau-pages.md %}#createpagewithmenu)
* [Aikau Widget Reference](http://dev.alfresco.com/resource/docs/aikau-jsdoc/){:target="_blank"} - this is the place to look for menu widgets that you can use.

## Tutorials

* [Customizing the Admin Tools Menu]({% link content-services/7.2/tutorial/share/header.md %}#customizeadmintoolsmenu)
* [Customizing the Sites Menu]({% link content-services/7.2/tutorial/share/header.md %}#customsitesmenu)
* [Removing Menu Items]({% link content-services/7.2/tutorial/share/header.md %}#removemenuitem)
* [Aikau Tutorials on GitHub](https://github.com/Alfresco/Aikau/tree/master/tutorial/chapters){:target="_blank"}

## Developer Blogs

* [Creating a simple Aikau page with Cascading Menu](https://hub.alfresco.com/t5/alfresco-content-services-blog/simple-page-creation-in-share/ba-p/287600){:target="_blank"}
* [Extending the Share Main Menu](http://ohej.github.io/alfresco-tutorials/tutorial/aikau/tutorial.html#part-three-extending-json-models){:target="_blank"}
