---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Opening Alfresco files from Microsoft Office \(Windows users\)

You can open files stored in Alfresco directly from Microsoft Office apps.

All you need is to have an internet connection and the Alfresco URL where the file is stored.

1.  Open a Microsoft Office application, such as Word, PowerPoint, Visio, or Excel.

2.  Click **File** then **Open**.

3.  Enter the Alfresco address as the File name.

    There are two ways to enter this depending on if you're connecting to an Alfresco server or Alfresco Cloud; check with your Alfresco administrator if you need more information.

    **Alfresco server**

    To connect with Alfresco the URL needs to end in "*/alfresco/aos*", so if your Alfresco address is

    *https://mycompany.com*

    then you'd enter

    *https://mycompany.com/alfresco/aos/*

    **Alfresco Cloud**

    To connect with Alfresco you need to add "*sp*" to the URL, so if your Alfresco address is

    *https://my.alfresco.com/mycompany.com/sitename/*

    then you'd enter

    *https://sp.alfresco.com/mycompany.com/sitename/*

    For Alfresco Cloud you always need to enter a site name. For both Alfresco server and Alfresco Cloud you can enter URLs that are specific to a site, folder, or file, for example, *https://mycompany.com/alfresco/aos/Sites/sitename/documentLibrary/foldername/filename* for Alfresco server and *https://sp.alfresco.com/mycompany.com/sitename/foldername/filename* for Alfresco Cloud.

    -   Site or folder-specific URL - browse through the site or folder to find the file you want
    -   File-specific URL - open the file directly
4.  Browse through the Alfresco structure to find the file you want to open and click **Open**.

    **Note:** You might also need to select **Enable Editing**.

    The file opens and you can work with it as you would with any other Microsoft Office file. It's locked to other Alfresco users until you close it, and every time you save it a new version number is created in Alfresco.

    **Tip:** Once you've opened a file you can quickly access it again by selecting **Open** then **Recent Places**.


**Parent topic:**[Using Alfresco from Microsoft Office](../concepts/aos-user.md)

