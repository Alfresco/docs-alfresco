---
author: Alfresco Documentation
---

# Customizing Admin Tools Menu \(Aikau\)

This tutorial demonstrates how to customize the Alfresco Share Header Menu Admin Tools item.

You will need to have Eclipse installed, and this tutorial assumes you have some familiarity with using Eclipse. It also assumes you have installed the XML editing tools for Eclipse. You will also need to have the Spring Framework installed. If you have not already done to you should review the [Introducing SurfBug](../concepts/dev-extensions-share-surfbug.md) topic.

In this tutorial you will add several customizations to the Share Header Menu. As this is a large and complex tutorial you will create a new Eclipse project to help you manage the various files that will need to be created and extended. The tutorial is also split into several parts.

1.  In Eclipse create a new Java Project called, for example, `CustomShareHeaderMenu`.

2.  In the Package Explorer \(in Eclipse\) right-click on the `CustomShareHeaderMenu` project folder and create a new folder called `config`.

3.  In the config folder create a new folder called alfresco.

4.  In the config/alfresco folder create a new folder called site-webscripts.

5.  In the config/alfresco/site-webscripts folder create a new folder called tutorials.

    **Note:** tutorials is the path to the web script in this case, you are free to use a different path as required.

6.  In the config/alfresco folder create another folder called site-data.

7.  In the site-data folder create a new folder called extensions.

8.  In the Eclipse Package Explorer, in the config/alfresco/site-webscripts/tutorials folder create a new web script file called share-header.get.js \(the file must be named this\), with the following contents:

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

9.  In the Eclipse Package Explorer, in the alfresco/site-data/extensions folder, create a new extension file called extension-modules.xml that contains the following:

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

10. Right-click on the `CustomShareHeaderMenu` project folder and create a new XML file called build.xml

    This will contain an Ant script for packaging up and deploying the project.

11. Add the following content to your Ant script:

    ```
    
                            
    ﻿<?xml version="1.0" encoding="UTF-8"?>
    <project default="deploy-jar">
    
    	<!-- Set these as required -->
    	<property name="jar.name" value="extension_modules.jar"/>	
    	<property name="jar.deploy.dir" value="/Applications/alfresco-4.2.3/tomcat/webapps/share/WEB-INF/lib"/>	
    
    	<property name="project.dir" value="."/>
    	<property name="build.dir" value="${project.dir}/build"/>
    	<property name="jar.file" value="${build.dir}/lib/${jar.name}"/>
    
    	<target name="mkdirs">
    		<mkdir dir="${build.dir}/lib" />
    	</target>
    	
    	<target name="package-jar" depends="mkdirs">
    		<jar destfile="${jar.file}" >
    			<fileset dir="${project.dir}/config" includes="**/*" />
    		</jar>
    	</target>
    	
    	<target name="deploy-jar" depends="package-jar">
    		<copy file="${jar.file}" todir="${jar.deploy.dir}"/> 
    	</target>
    	
    	<target name="clean">
    		<delete file="${jar.file}"/>
    		<delete file="${jar.deploy.dir}/${jar.name}"/>
    	</target>
    
    </project>                        
                            
                        
    ```

    **Attention:** You will need to change at least the value for `jar.deploy.dir`.

    The main purpose of this Ant script is to create a JAR file and deploy it. Everything below the config folder is included in the JAR file. The deploy target simply copies the JAR file to the tomcat/webapps/share/WEB-INF/lib directory of your alfresco installation.

12. Now run the build file by right-clicking on it and selecting **Run As** \> **Ant Build**.

    Check the Eclipse Console for messages. You should see `BUILD SUCCESSFUL`.

13. Restart the application server \(for example, Tomcat\).

14. **Note:** The extension module needs to be deployed before it will be visible. Module deployment was a new feature in Alfresco 4.0 that is achieved through a web script found at: `http://localhost:8080/share/service/modules/deploy`.

    Navigate to this page to view a list of Available Modules and a list of Deployed Modules.

15. Select **Custom Share Header Menu** and click **Add** to move it into the **Deployed Modules** list.

16. Click **Apply Changes**.

    Note that the **Last update** time stamp changes. You only need to do this action once as Module Deployment data is saved into the Alfresco Repository.

17. Now log back in to Alfresco Share and click on the **Admin Tools** menu item - you will see it is now a drop-down menu list.


**Parent topic:**[Customizing Share Header Menu \(Aikau\)](../tasks/dev-extensions-share-tutorials-custom-share-header-menu.md)

