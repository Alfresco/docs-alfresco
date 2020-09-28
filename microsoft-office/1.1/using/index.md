---
title: Using Alfresco from Microsoft Office
---
When using Alfresco Office Services (AOS) you can access your files from Content Services directly from your Microsoft Office applications.

This means that you can browse, open, and save Microsoft Office files (Word, PowerPoint, and Excel) in Content Services without the need to go through Chrome, Firefox, or another web browser.

You can also browse Content Services from Windows Explorer, or you can map a network drive.

This is done by entering a web address for Content Services from Microsoft Office applications, with an AOS-specific ending.

To connect to Content Services, the URL needs to end in `/alfresco/aos`, so if your Alfresco address is `https://mycompany.com` then you'd enter `https://mycompany.com/alfresco/aos/`.

Depending on whether you're using Windows or Mac, there are a few differences to how you do this, and you'll need to be online.

> **Note:** Alfresco administrators can find out more about [installing AOS]({% link microsoft-office/1.1/install/index.md %}).

There are lots of ways that using Alfresco from Microsoft Office will help you to work more efficiently, so here are a few examples.

![AOS properties]({% link microsoft-office/images/save-dialog.png %})

## Opening Content Services files from Microsoft Office (Windows users)

You can open files stored in Content Services directly from Microsoft Office applications.

1. Open a Microsoft Office application, such as Word, PowerPoint, Visio, or Excel.

2. Click **File** then **Open**.

3. Enter the Content Services address URL where the file is stored. The URL needs to end in `/alfresco/aos`, so if your Alfresco address is `https://mycompany.com` then you'd enter `https://mycompany.com/alfresco/aos/`.

    You can enter URLs that are specific to a site, folder, or file, for example, `https://mycompany.com/alfresco/aos/Sites/sitename/documentLibrary/foldername/filename`.

    * Site or folder-specific URL - browse through the site or folder to find the file you want
    * File-specific URL - open the file directly
4. Browse through the structure to find the file you want to open and click **Open**.

    > **Note:** You might also need to select **Enable Editing**.

    The file opens and you can work with it as you would with any other Microsoft Office file. It's locked to other Alfresco users until you close it, and every time you save it a new version number is created in Alfresco.

    > **Note:** Once you've opened a file you can quickly access it again by selecting **Open** then **Recent Places**.

## Mapping a network drive to Alfresco (Windows users)

You can map a network drive to Alfresco so that you always have easy access to your files.

Make sure that you have an internet connection and the Alfresco URL. These instructions also require HTTPS to be set up by your administrator.

> **Note:** There are various ways to map a network drive, which may vary slightly depending on which version of Windows you're using.

1. In Windows Explorer, select **Map network drive** using your preferred method.

2. Enter the Alfresco address as the folder or target. Make sure that the address ends in `/alfresco/aos`.

3. When prompted enter your Alfresco user name and password and click **Finish**.

You can now browse Alfresco and work with files through Windows Explorer without the need to access Alfresco through Chrome, Firefox, or another web browser. You can also create new files and save them to Alfresco through the mapped network drive.

## Opening Alfresco files from Windows Explorer (Windows users)

You can open files stored in Alfresco directly from Windows Explorer.

You can do this by either mapping a network drive to Alfresco or by entering a modified URL into the Windows Explorer address bar.

1. Open Windows Explorer and in the address bar, enter the Alfresco URL where the file is stored. This needs to be entered in a different way to when you're mapping a network drive or opening a file from Microsoft Office.

    If your Alfresco address is

    ``` html
    https://mycompany.com`
    ```

    then you'd enter

    ``` html
    \\\\mycompany.com@SSL\\DavWWWRoot\\alfresco\\aos
    ```

2. If prompted enter your Alfresco user name and password.

You can now browse Alfresco and work with files through Windows Explorer without the need to access Alfresco through Chrome, Firefox, or another web browser.

## Connecting to Alfresco from a Mac (Mac users)

Microsoft Office for Mac has a tool called the Microsoft Document Connection.

Using this Document Connection you can access Alfresco files in just the same way that Windows users can access them from Windows Explorer.

You'll find it with the rest of your Microsoft Office apps in your Applications folder.

> **Note:** You can only connect to Alfresco One or Alfresco Community, not Alfresco Cloud.

1. Open Microsoft Document Connection.

2. Click **Document Connection** on the Mac toolbar then **Preferences**.

3. Select **Enable Basic authentication** then close the Preferences screen.

4. Click **Add Location** in Document Connection then **Connect to a SharePoint site**.

5. Enter the Alfresco address then click **Connect**.

    To connect with Alfresco the URL needs to end in `/alfresco/aos`, so if your Alfresco address is `https://mycompany.com` then you'd enter `https://mycompany.com/alfresco/aos/`.

    You can enter URLs that are specific to a site, folder, or file, for example, `https://mycompany.com/alfresco/aos/Sites/sitename/documentLibrary/foldername/filename`.

    * Site or folder-specific URL - browse through the site or folder to find the file you want
    * File-specific URL - open the file directly
6. Enter your Alfresco User name and Password and click **Connect**.

    > **Note:** Click **Continue** if you see a further message about encrypted passwords.

    This connection is remembered by Document Connection for future use.

    You'll now see all the folders at the top level of your Alfresco repository, and you can drill-down through sites to all your files.

    You can use the Document Connector to read, add, and check files in and out, and even drag and drop them from your desktop or from Finder.

## Alfresco File Properties in Microsoft Office

Files stored in Alfresco can have lots of properties to help identify and track them. In Microsoft Windows, you can see these when you click the **Info** tab when you have a file open in Microsoft Office.

File properties can include things such as who created a file, the file title, and any categories or tags attributed to the file.

Your Alfresco administrator can choose to set up different content types. If they do then when you save a new file to Alfresco you'll be asked to select a content type to assign it to. The content type you select will give you the option to add additional content type-specific properties to the file.

In Microsoft Windows, you can change file properties when you have a file open in Microsoft Office by clicking on a property in the **Info** tab, or by selecting **File** then **Info**, then clicking **Properties** and selecting **Show Document Panel**. This shows the **Document Panel** above the open file, and you can modify file properties as required.

Some content types may require you to enter specific properties before you can even save a file; in these cases you'll receive a warning and a link to open the **Document Panel**.

When you've saved the file you'll be able to see any changes you've made to the properties if you look at the file in Alfresco.

![AOS Alfresco properties]({% link microsoft-office/images/1.1-properties.png %})
