---
author: Alfresco Documentation
---

# Creating a simple module

This task demonstrates how you can incorporate your customizations into the all-in-one project and create a simple module that runs on Alfresco.

This task assumes you have completed the tutorial [Using the Alfresco All-in-One archetype](dev-extensions-maven-sdk-tutorials-all-in-one-archetype.md). It is also worthwhile reviewing the following tutorial [Creating a simple module with Ant](dev-extensions-tutorials-simple-module.md), as the web script described there will be included in this project.

You will add a web script customization to the AMP module in the All-in-One project.

1.  From the allinone-project directory, change into the directory ./amp/src/main/amp/config/alfresco.

2.  In ./amp/src/main/amp/config/alfresco, create the directory structure extension/templates/webscripts, this will contain your example web script.

3.  Create the web script files as detailed in [this tutorial](dev-extensions-tutorials-simple-module.md).

4.  Locate these web script files in the directory ./amp/src/main/amp/config/alfresco/extension/templates/webscripts.

    At this point you will have the following files in the ./amp/src/main/amp/config/alfresco/extension/templates/webscripts directory: photo-search.get.desc.xml, photo-search.get.html.ftl, photo-search.get.js. This represents the simple extension you are going to test.

5.  Change to the directory ./amp/src/main/amp.

    This directory contains the module.properties file.

6.  Load module.properties into a text editor. You will set the minimum and maximum versions of Alfresco that your module is compatible with:

    Change the following:

    ```
    
    ﻿# module.repo.version.min=2.0
    # module.repo.version.max=2.1
                        
    ```

    to:

    ```
    
    ﻿module.repo.version.min=4.1
    module.repo.version.max=4.2
                        
    ```

    This will prevent your module from being applied to inappropriate versions of the WAR file.

7.  Run your newly created project by typing:

    ```
    
                
    mvn install -Prun            
                
            
    ```

8.  In your web browser log in to:

    ```
    http://localhost:8080/share/page/user/admin/dashboard
    ```

9.  Create a sample site such as Sample Site, with the URL `sample-site`.

10. Click on the newly created site's Document Library.

11. Load some sample documents, including photos, into the site's document library.

12. Create a new browser tab.

13. In the new browser tab navigate to:

    ```
    http://localhost:8080/alfresco/service/photo-search/sample-site
    ```

    The script will return a list of photos, proving that Alfresco contains your new module.

14. Once you've tested your module you can type CRTL-C in the terminal where Tomcat is running to shut down Tomcat and terminate the build.


**Parent topic:**[Maven Tutorials](../concepts/dev-extensions-maven-sdk-tutorials.md)

