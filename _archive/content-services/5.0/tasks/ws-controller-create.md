---
author: Alfresco Documentation
---

# Creating a controller script

The description document describes the Folder Listing web script and a JavaScript controller script implements its behavior. The controller establishes the folder to list from the invoked URI and query the Alfresco content repository for that folder ensuring error conditions are catered for.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

3.  Create a web script controller script for your Folder Listing example:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name for the web script in the Name field: `dir.get.js`

    3.  Type the following in the content box:

        ```
        
        
        // extract folder listing arguments from URI
        var verbose = (args.verbose == "true" ? true : false);
        var folderpath = url.templateArgs.folderpath;
        
        // search for folder within Alfresco content repository
        var folder = roothome.childByNamePath(folderpath);
        
        // validate that folder has been found
        if (folder == undefined || !folder.isContainer) {
           status.code = 404;
           status.message = "Folder " + folderpath + " not found.";
           status.redirect = true;
        }
        
        // construct model for response template to render
        model.verbose = verbose;
        model.folder = folder; 
        
        
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.


The component script file name `dir.get.js` adheres to the naming convention defined by the Web Script Framework. Your Folder Listing example now comprises the following two component files:

1.  /org/example/dir.get.desc.xml
2.  /org/example/dir.get.js

    The Web Script Framework knows that both these files are related to the same web script, as they share web script package, web script ID, and HTTP method.


**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

