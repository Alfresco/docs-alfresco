---
author: Alfresco Documentation
---

# Customizing the admin tools menu \(Aikau\)

This tutorial shows you how to customize the Share header admin tools menu item.

In this tutorial you add several customizations to the Share Header Menu. Your customization will be implemented as a [Surf extension module](../concepts/dev-extensions-share-surf-extension-modules.md).

1.  Create a new [SDK 3.0 All-In-One Project](../concepts/sdk-getting-started.md).

2.  In the aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-webscripts folder create a new folder called tutorials

    **Note:** tutorials is the path to the web script in this case, you can use a different path if required.

3.  In your IDE, navigate to the new tutorials folder and create a new webscript file called share-header.get.js\] with the following contents:

    ```
    
    
    // Find the admin menu - it'll only be present if the current user is Admin...
    var adminMenu = widgetUtils.findObject(model.jsonModel, "id", "HEADER_ADMIN_CONSOLE");
    if (adminMenu != null)
    {
       // Change the widget to a menu bar popup
       adminMenu.name = "alfresco/header/AlfMenuBarPopup";
       
       // Remove the targetUrl attribute - this isn't strictly necessary but is "cleaner"
       delete adminMenu.config.targetUrl;
       
       // Add a new "widgets" array to the configuration...
       adminMenu.config.widgets = [
          {   
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "Tools", // I'm not bothering with localisation - but you could get localised values using msg.get("..")
                widgets: [
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Application",
                         targetUrl: "console/admin-console/application"
                      }
                   },
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Category Manager",
                         targetUrl: "console/admin-console/category-manager"
                      }
                   },
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Node Browser",
                         targetUrl: "console/admin-console/node-browser"
                      }
                   },
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Tag Manager",
                         targetUrl: "console/admin-console/tag-management"
                      }
                   }
                ]
             }
          },
          {   
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "File Management",
                widgets: [
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Trashcan",
                         targetUrl: "console/admin-console/trashcan"
                      }
                   }
                ]
             }
          },
          {   
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "Content Publishing", 
                widgets: [
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Channel Manager",
                         targetUrl: "console/admin-console/channel-admin"
                      }
                   }
                ]
             }
          },
          {   
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "Repository", 
                widgets: [
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Replication Jobs",
                         targetUrl: "console/admin-console/replication-jobs"
                      }
                   }
                ]
             }
          },
          {   
             name: "alfresco/menus/AlfMenuGroup",
             config: {
                label: "Users and Groups", 
                widgets: [
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Groups",
                         targetUrl: "console/admin-console/groups"
                      }
                   },
                   {
                      name: "alfresco/header/AlfMenuItem",
                      config:
                      {
                         label: "Users",
                         targetUrl: "console/admin-console/users"
                      }
                   }
                ]
             }
          }
       ];
    }
                            
                        
    ```

4.  In your IDE navigate to the aio/aio-share-jar/src/main/resources/alfresco/web-extension/site-data/extensions folder, and create a new extension file called custom-header-extension.xml that contains the following extension definition:

    ```
    
    
    <extension>
      <modules>
        <module>
          <id>Custom Share Header Menu</id>
          <version>1.0</version>
          <customizations>
            <customization>
              <targetPackageRoot>org.alfresco.share.header</targetPackageRoot>
              <sourcePackageRoot>tutorials</sourcePackageRoot>
            </customization>
          </customizations>
        </module>
      </modules>
    </extension>
    
    
    ```

5.  Run the [run.sh](../concepts/alfresco-sdk-cmd-reference-aio.md) command to add your new Surf extension module.

6.  **Note:** The extension module needs to be deployed before it will be visible. In your browser, go to `http://localhost:8080/share/service/modules/deploy`.

    You see a list of available Modules and a list of deployed Modules.

7.  Select **Custom Share Header Menu** and click **Add** to move it into the **Deployed Modules** list.

8.  Click **Apply Changes**.

    Note that the **Last update** time stamp changes. You only need to do this action once as Module Deployment data is saved into the repository.

9.  Now log back in to Share and click on the **Admin Tools** menu item - you can see it is now a drop-down menu list.


**Parent topic:**[Customizing the Share header menu \(Aikau\)](../tasks/dev-extensions-share-tutorials-custom-share-header-menu.md)

