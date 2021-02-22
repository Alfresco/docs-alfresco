---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Mapping a network drive to Alfresco \(Windows users\)

You can map a network drive to Alfresco so that you always have easy access to your files.

Make sure that you have an internet connection and the Alfresco URL. These instructions also require HTTPS to be set up by your administrator.

**Note:** There are various ways to map a network drive, which may vary slightly depending on which version of Windows you're using.

1.  In Windows Explorer, select **Map network drive** using your preferred method.

2.  Enter the Alfresco address as the folder or target.

    There are two ways to enter this depending on if you're connecting to Alfresco server or Alfresco Cloud; check with your Alfresco administrator if you need more information.

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

3.  When prompted enter your Alfresco user name and password and click **Finish**.


You can now browse Alfresco and work with files through Windows Explorer without the need to access Alfresco through Chrome, Firefox, or another web browser. You can also create new files and save them to Alfresco through the mapped network drive.

**Parent topic:**[Using Alfresco from Microsoft Office](../concepts/aos-user.md)

