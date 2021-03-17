---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Connecting to Alfresco from a Mac \(Mac users\)

Microsoft Office for Mac has a tool called the Microsoft Document Connection.

Using this Document Connection you can access Alfresco files in just the same way that Windows users can access them from Windows Explorer.

You'll find it with the rest of your Microsoft Office apps in your Applications folder.

**Note:** You can only connect to Alfresco One or Alfresco Community, not Alfresco Cloud.

1.  Open Microsoft Document Connection.

2.  Click **Document Connection** on the Mac toolbar then **Preferences**.

3.  Select **Enable Basic authentication** then close the Preferences screen.

4.  Click **Add Location** in Document Connection then **Connect to a SharePoint site**.

5.  Enter the Alfresco address then click **Connect**.

    To connect with Alfresco the URL needs to end in "*/alfresco/aos*", so if your Alfresco address is

    *https://mycompany.com*

    then you'd enter

    *https://mycompany.com/alfresco/aos/*

    You can enter URLs that are specific to a site, folder, or file, for example, *https://mycompany.com/alfresco/aos/Sites/sitename/documentLibrary/foldername/filename*.

    -   Site or folder-specific URL - browse through the site or folder to find the file you want
    -   File-specific URL - open the file directly
6.  Enter your Alfresco User name and Password and click **Connect**.

    **Note:** Click **Continue** if you see a further message about encrypted passwords.

    This connection is remembered by Document Connection for future use.

    You'll now see all the folders at the top level of your Alfresco repository, and you can drill-down through sites to all your files.

    You can use the Document Connector to read, add, and check files in and out, and even drag and drop them from your desktop or from Finder.


**Parent topic:**[Using Alfresco from Microsoft Office](../concepts/aos-user.md)

