---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, description document]
---

# Creating a description document

This task creates a web script description document for a Folder Listing web script.

1.  Log in to Alfresco Explorer:

    1.  Open a web browser and enter the URL: `http://localhost:8080/alfresco`

    2.  If prompted, log in with the user name admin and password admin.

2.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions**.

3.  Create a folder to represent the top-level package structure:

    1.  In the Create menu, click **Create Space**.

    2.  Enter the name for the folder in the Name field, such as: org

    3.  Click **Create Space**.

4.  Create a sub-package:

    1.  Navigate to **Company Home \> Data Dictionary \> Web Scripts Extensions \> org**.

    2.  In the Create menu, click **Create Space**.

    3.  Enter the name for the folder in the Name field, such as: example

    4.  Click **Create Space**.

5.  Create a web script description document for the Folder Listing example:

    1.  In the Create menu, click **Create Content**.

    2.  Enter the name for the web script in the Name field, such as: dir.get.desc.xml

    3.  In the Content Type list, select **XML**.

    4.  Click **Next**.

    5.  Type the following in the Enter Content box:

        ```
        <webscript> 
          <shortname>Folder Listing Utility</shortname> 
          <description>Sample demonstrating the listing of folder contents</description>
          <url>/dir/{folderpath}?verbose={verbose?}</url> 
          <format default="html">extension</format> 
          <authentication>user</authentication> 
        </webscript> 
        ```

    6.  Click **Next**, click **Finish**, and then click **OK**.


You now have a web script package named`/org/example` where you will place all your component files for the Folder Listing web script. You have already placed the description document there, which is named `dir.get.desc.xml`.

Your Folder Listing web script defines the following short name and description:

`<shortname>Folder Listing Utility</shortname>`

`<description>Sample demonstrating the listing of folder contents</description>`

As the Folder Listing web script queries the Alfresco content repository, you must ensure that only authenticated users have access. This means the web script will only return folder contents that the authenticated user has permission to see.

Your Folder Listing web script defines the following level of authentication: `<authentication>user</authentication>`

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

