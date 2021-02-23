---
author: Alfresco Documentation
---

# Customizing Sites Menu Item

This tutorial demonstrates how to customize the Alfresco Share Header Menu Sites item.

Assumes you have completed the [previous tutorial](dev-extensions-share-tutorials-custom-admin-menu.md).

In this tutorial you will customize the Share main menu so that the **Sites** menu item includes additional functionality. The **Sites** menu item is modified so that if a site under **Recent Sites** is selected, then the individual pages of that site are displayed as additional menu items. Individual pages displayed include **Site Dashboard**, **Document Library** and **Site Members**.

1.  In the **CustomShareHeaderMenu** project, create a new folder in the existing config folder called META-INF.

2.  In the META-INF folder create a new folder called js.

3.  In the META-INF/js folder create a new folder called tutorials.

4.  In the folder META-INF/js/tutorials create a new file SitesMenu.js with the following contents:

    ```
    
                            
     ﻿define(["dojo/_base/declare",
            "alfresco/header/AlfSitesMenu",
            "alfresco/core/CoreXhr",
            "dojo/_base/lang",
            "dojo/_base/array",
            "dojo/aspect",
            "dijit/registry",
            "alfresco/menus/AlfMenuGroup",
            "alfresco/header/AlfMenuItem",
            "alfresco/header/AlfCascadingMenu",
            "dojo/dom-style",
            "dijit/popup"], 
            function(declare, AlfSitesMenu, AlfXhr, lang, array, aspect, registry, AlfMenuGroup, AlfMenuItem, AlfCascadingMenu, domStyle, popup) {
       
       return declare([AlfSitesMenu, AlfXhr], {
          
          /**
           * Adds an individual menu item.
           * 
           * @instance
           * @param {object} group The group to add the menu item to
           * @param {object} widget The menu item to add
           * @param {integer} index The index to add the menu item at.
           */
          _addMenuItem: function tutorials_SitesMenu___addMenuItem(group, widget, index) {
             if (group == this.recentGroup)
             {
                // Create a basic group for holding the favourites...
                 var sitePageList = new AlfMenuGroup({
                   widgets: [{
                      name: "alfresco/header/AlfMenuItem",
                      config: {
                         label: "Loading..."
                      }
                   }]
                });
                
                // Create the cascading menu item to popout the favourites list...
                var siteCascade = new AlfCascadingMenu(widget.config);
                
                // Set up the sites cascading popup to asynchronously load the pages upon request...
                siteCascade.popup.onOpen = dojo.hitch(this, "loadSitePages", widget.config.siteShortName, sitePageList);
                
                // Add the list into the cascading menu...
                siteCascade.popup.addChild(sitePageList);
    
                // Add the default menu items...
                group.addChild(siteCascade);
             }
             else
             {
                // If we're not adding a Recent Sites menu item then just default to the normal action
                this.inherited(arguments);
             }
          },
          
          /**
           * This variable will be used to keep track of which sites pages have been loaded. It is initialised
           * to null and populated as page data is loaded.
           * 
           * @instance
           * @type {object}
           * @default null
           */
          _sitePagesLoaded: null,
          
          /**
           * This function is hitched to the each sites cascading menu so that when it is clicked a XHR request is made
           * to retrieve the pages for the site.
           * 
           * @instance
           * @param {string} siteShortName The short name of the site to load the pages for
           * @param {object} sitePageList A reference to the alfresco/menus/AlfMenuGroup widget that the site pages should be added to
           */
          loadSitePages: function tutorials_SitesMenu__loadSitePages(siteShortName, sitePageList) {
             if (this._sitePagesLoaded != null && this._sitePagesLoaded[siteShortName] == true)
             {
                this.alfLog("log", "Site pages already loaded for: " + siteShortName);
             }
             else
             {
                this.alfLog("log", "Loading pages for site: " + siteShortName);
                this.serviceXhr({url : Alfresco.constants.URL_SERVICECONTEXT + "tutorials/site/" + siteShortName,
                                 method: "GET",
                                 siteShortName: siteShortName, // Including the site short name will make it available in the "sitePagesLoaded" callback "originalRequestConfig"
                                 sitePageList: sitePageList,   // ...as will the sitePageList menu group
                                 successCallback: this.sitePagesLoaded,
                                 callbackScope: this});
             }
          },
          
          /**
           * This function is "hitched" from the serviceXhr call in the "loadSitePages" function and handles the response
           * from the asynchronous request to get site pages. It clears the original "Loading..." menu item and adds in
           * each of the site page links.
           * 
           * @instance
           * @param {object} response The response from the request
           * @param {object} originalRequestConfig The configuration passed on the original request
           */
          sitePagesLoaded: function tutorials_SitesMenu__loadSitePages(response, originalRequestConfig) {
             this.alfLog("log", "Site pages data loaded successfully", response);
             
             // Initialise the object that keeps track of which pages have been loaded if it has not
             // previously been initialised...
             if (this._sitePagesLoaded == null)
             {
                this._sitePagesLoaded = {};
             }
             
             // Record that the site pages have been loaded to prevent them from being loaded again...
             this._sitePagesLoaded[originalRequestConfig.siteShortName] = true;
             
             // Check for keyboard access by seeing if the first child is focused...
             var focusFirstChild = (originalRequestConfig.sitePageList && originalRequestConfig.sitePageList.getChildren().length > 0 && originalRequestConfig.sitePageList.getChildren()[0].focused);
             
             // Remove the loading item...
             array.forEach(originalRequestConfig.sitePageList.getChildren(), function(widget, index) {
                originalRequestConfig.sitePageList.removeChild(widget);
             });
             
             // Add the site pages...
             if (response.sitePages && response.sitePages.length > 0)
             {
                array.forEach(response.sitePages, function(sitePage, index) {
                   this.alfLog("log", "Adding site page menu item", sitePage);
                   var item = new AlfMenuItem(sitePage);
                   originalRequestConfig.sitePageList.addChild(item);
                }, this);
             }
             else
             {
                // TODO: Should add some error handling here - but has been left out as Example for Blog post only covers "golden path"
             }
             
             if (focusFirstChild)
             {
                // Focus the first site page...
                originalRequestConfig.sitePageList.focusFirstChild();
             }
          }
       });
    });                       
                            
                        
    ```

5.  The Surf configuration file will need to be edited to ensure that the Dojo AMD loader can locate the new `tutorials` package. Load tomcat/webapps/share/WEB-INF/surf.xml into a suitable editor, such as Eclipse, and locate the `<dojo-pages>` section.

6.  In the `<dojo-pages>` section modify the code to add the new package:

    ```
    
                            
    ...
        ﻿<packages>
            <package name="dojo" location="js/lib/dojo-1.9.0/dojo"/>
            <package name="dijit" location="js/lib/dojo-1.9.0/dijit"/>
            <package name="dojox" location="js/lib/dojo-1.9.0/dojox"/>
            <package name="alfresco" location="js/alfresco"/>
            
            <!-- ADD THE LINE BELOW: Add the new tutorials package -->
            <package name="tutorials" location="js/tutorials"/>
            
            <!-- The following package declaration can be uncommented if DOH is required-->
            <!-- <package name="doh" location="js/lib/dojo-1.9.0/util/doh"/> -->
        </packages> 
    ...    
                            
                        
    ```

7.  Load the file config/alfresco/site-webscripts/tutorials/share-header.get.js, created in the previous tutorial, and add the following code at the end of the file:

    ```
    
                            
       ﻿//Find the "Sites" menu...
       var sitesMenu = 
         widgetUtils.findObject(model.jsonModel, "id", "HEADER_SITES_MENU");
       if (sitesMenu != null)
       {
         // Change the widget to our custom menu...
         sitesMenu.name = "tutorials/sites-menu";
       }                        
                            
                        
    ```

8.  Create a new XML file in the folder config/alfresco/site-webscripts/tutorials called site-pages.get.desc.xml, with the following content:

    ```
    
                            
    <webscript>
       <shortname>Get the pages for the requested site</shortname>
       <description>This WebScript is added to allow the tutorials/SitesMenu widget to asynchronously request the page for each site</description>
       <url>/tutorials/site/{shortname}</url>
       <format default="json"></format>
    </webscript>                        
                            
                        
    ```

9.  In the same folder create a new JavaScript file called site-pages.get.js, with the following content:

    ```
    
                            
    <import resource="classpath:/alfresco/site-webscripts/org/alfresco/share/imports/share-header.lib.js">
    
    // We need to set up a fake page structure to allow the page-centric imported function to work...                                                                  
    page = { url: { templateArgs: { site: url.templateArgs.shortname}}};
    
    // Create a new object in the model for the pages and add in the default dashboard page...                                                                         
    model.pages = [
       {
          label: msg.get("page.siteDashboard.title"),
          targetUrl: "site/" + url.templateArgs.shortname + "/dashboard"
       }
    ]
    
    // Call the "getSitesPages" function imported from the "share-header.lib.js" file...                                                                               
    // Iterate over the configured pages and add the details to the model...                                                                                           
    var pages = getSitePages();
    if (pages != null)
    {
       for (var i=0; i<pages.length; i++)
       {
          model.pages.push({
             label: (pages[i].sitePageTitle) ? pages[i].sitePageTitle : pages[i].title,
             targetUrl: "site/" + url.templateArgs.shortname + "/" + pages[i].pageUrl
          });
       }
    }
    
    // Finally push in the "site-members" page (the other default page)...                                                                                             
    model.pages.push({
       label: msg.get("page.siteMembers.title"),
       targetUrl: "site/" + url.templateArgs.shortname + "/site-members"
    });
                            
                            
                        
    ```

10. Create a new file in the same folder called site-pages.get.json.ftl, with the following content:

    ```
    
                            
    <#escape x as jsonUtils.encodeJSONString(x)>
    {
       "sitePages":
       [
       <#list pages as page>
          {
             "label": "${page.label}",
             "targetUrl": "${page.targetUrl}"
          }<#if page_has_next>,</#if>
       </#list>
       ]
    }
    </#escape>
                            
                            
                        
    ```

11. In the Package Explorer right-click on the build.xml file and select **Run As** \> **Ant Build**.

    This builds a new JAR file that was already deployed in the previous tutorial.

12. Restart the application server \(for example, Tomcat\).

13. Navigate to the **Sites** menu item. Click a site under **Recent Sites**. You will see that there are now additional menu items including **Site Dashboard**, **Document Library**, and **Site Members**. Click on one of these menu items to test it. For example, if you click on the **Site Members** items you will be taken to the **Site Members** page for that site.


**Parent topic:**[Customizing Share Header Menu](../tasks/dev-extensions-share-tutorials-custom-share-header-menu.md)

