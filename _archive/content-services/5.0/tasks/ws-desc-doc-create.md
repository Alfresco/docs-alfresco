---
author: Alfresco Documentation
---

# Creating a description document

This task creates a web script description document for a Folder Listing web script.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary \> Web Scripts Extensions \> org \> example**.

4.  Create a web script description document for the Folder Listing example:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field: `dir.get.desc.xml`

    3.  Type the following in the content box:

        ```
        <webscript> 
          <shortname>Folder Listing Utility</shortname> 
          <description>Sample demonstrating the listing of folder contents</description>
          <url>/dir/{folderpath}?verbose={verbose?}</url> 
          <format default="html">extension</format> 
          <authentication>user</authentication> 
        </webscript>
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.


You now have a web script package named`/org/example` where you will place all your component files for the Folder Listing web script. You have already placed the description document there, which is named `dir.get.desc.xml`.

Your Folder Listing web script defines the following short name and description:

`<shortname>Folder Listing Utility</shortname>`

`<description>Sample demonstrating the listing of folder contents</description>`

As the Folder Listing web script queries the Alfresco content repository, you must ensure that only authenticated users have access. This means the web script will only return folder contents that the authenticated user has permission to see.

Your Folder Listing web script defines the following level of authentication: `<authentication>user</authentication>`

**Parent topic:**[Developing a Folder Listing web script](../concepts/ws-folderListing-intro.md)

