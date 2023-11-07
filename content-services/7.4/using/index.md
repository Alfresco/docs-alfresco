---
title: Overview of using Content Services
---

The using sections covers the basics of using Content Services and the Alfresco Share user interface.

> **Note:** If you prefer to use the Alfresco Digital Workspace instead of Alfresco Share, see the [Digital Workspace documentation]({% link digital-workspace/latest/index.md %}). The Digital Workspace is a content management application built using the [Alfresco Application Development Framework (ADF)](https://www.alfresco.com/abn/adf/docs/){:target="_blank"}. Digital Workspace offers a simplified experience for working with content and more comprehensive extensibility for developers.

There are also several ways to access and use content without being in Alfresco Share:

* **Microsoft Office**: You can open, edit, and save files directly from Microsoft Office apps such as Word and Excel. This same functionality also lets you open files from Windows Explorer, as well as the option to map a network drive to Content Services.
* **Microsoft Outlook**: With Alfresco Outlook Integration you can save and file your emails to Content Services from within Microsoft Outlook. You can drag and drop emails in and out of Alfresco Share, and add properties automatically when an email is filed. Other features full search, tagging, metadata support, and workflow capabilities.
* **Windows Explorer shortcuts**: There are also some shortcuts available that your Alfresco administrator can enable so you can work with files from Windows Explorer or from your desktop.

## Using Content Services from Microsoft Office

With Alfresco Office Services (AOS) you can access content directly from your Microsoft Office applications.

This means that you can browse, open, and save Microsoft Office files (Word, PowerPoint, and Excel
) in Content Services without the need to access Alfresco Share through Chrome, Firefox, or another web browser.

You can also browse content from Windows Explorer, or map a network drive.

 See [Alfresco Office Services]({% link microsoft-office/latest/index.md %}) for more information.

## Using Content Services from Microsoft Outlook

With Alfresco Outlook Integration you can use email and repository management without leaving Microsoft Outlook.

You can directly archive emails into Alfresco Share, use the full metadata support, full search, tagging and workflow capabilities, and attach files and view archived emails in your inbox.

See [Alfresco Outlook Integration]({% link microsoft-outlook/latest/index.md %}) for more information.

## Using the Windows Explorer shortcuts

You can work with files without actually being in the Alfresco Share interface.

Your administrator can map the repository so that you can access your content using Windows Explorer or a desktop shortcut. If you are working in this way, then there will be up to three additional files shown on each level of the Content Services file structure:

* `__CheckInOut.exe`
* `__ShowDetails.exe`
* `__Share.url`

> **Note:** The `Share.url` is only available within site folders, rather than everywhere in the repository.

You can use these files to add content to the repository, check documents in and out, view document details, and open Alfresco Share in a browser window.

> **Note:** These options only function when you are working in a Windows environment.

### Add a file from outside Alfresco Share

You can easily drag and drop content to the repository from outside Share.

> **Note:** This functionality is available in a Windows environment if the Content Services repository has been mapped by your administrator, so that you can access it from Windows Explorer.

1. Select a file in Windows Explorer or your desktop.

2. Drag the file onto the location in the repository that you want to add it to.

    The file is added to the selected location in the repository.

### Check out files from outside Alfresco Share

You can use the `CheckInOut.exe` to check content out so that you can work on it securely.

> **Note:** The `CheckInOut.exe` is available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. In Windows Explorer, drag a file from the mapped repository onto the `CheckInOut.exe` icon.

    > **Note:** There is a copy of the `CheckInOut.exe` at each level of the repository.

2. Click **OK** when the Run check in/out action dialog box displays.

3. Click **OK** when a message displays that the file has been checked out.

    A copy of your file is created in the same location as the original file with (Working Copy) appended to the title. The original file is now locked, so you can work on the (Working Copy) file and other users cannot edit it until you check it back in.

4. When you have finished working on the file and saved your changes, drag the (Working Copy) file onto the `CheckInOut.exe` icon.

5. Click **OK** when the Run check in/out action dialog box displays.

    The (Working Copy) file is removed and any updates made while it was checked out are applied to the original file.

### View item details from a mapped drive

You can use the `ShowDetails.exe` to view item details and properties.

> **Note:** The `ShowDetails.exe` is available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. Select a file in the mapped repository in Windows Explorer or your desktop.

2. Drag the file from the mapped repository onto the `ShowDetails.exe`.

    > **Note:** There is a copy of the `ShowDetails.exe` at each level of the repository.

    A new browser window opens showing the Alfresco Share file preview, where you can see a preview of the file and its properties.

### Open Alfresco Share in a browser window

You can use the `Share.url` to open the Share in a browser window.

The `Share.url` is a shortcut to Share. It's available in a Windows environment if the Content Services repository has been mapped by your administrator so that you can access it from Windows Explorer.

1. In Windows Explorer go to the location in the repository that you want to open.

    > **Note:** The `Share.url` is only available within site folders, rather than everywhere in the repository.

2. Double-click the `Share.url`.

    > **Note:** There is a copy of the `Share.url` at each level of the repository.

    Alfresco Share will open in a browser window, showing the location where you clicked on `Share.url`.
