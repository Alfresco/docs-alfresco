---
title: Files and folders
---

Once files are added to a site, site members can access and work with them. In addition to adding more files, members can view, download, edit, and delete files.

## Editing files

There are multiple ways to edit content. These options are available whenever suitable for a file type.

The **Edit Offline** action lets you download a file to your computer so you can edit it there. This locks the file in the library to prevent others from editing it simultaneously. It's available for every file.

The **Edit in Microsoft Office** action lets you edit a file in the appropriate MS Office program. The file is locked in Alfresco Share while it's being edited. It's available only for Microsoft Office 2003 or later files.

The **Edit in Alfresco Share** action lets you edit plain text, HTML, or XML files directly in the document library. It's available for these file types, which can all be created with the **Create** feature in the library.

The **Edit in Google Docs** action lets you work with files in Google Docs. The file is locked in Alfresco Share while it's being edited. It's available for supported document, presentation, and spreadsheet formats.

You can also edit the properties of a file, or upload content as a new version of an existing file.

### Editing files offline

When you edit a file offline it's downloaded to your computer and locked in the library, so that other users can't overwrite it while you make changes offline.

1. Hover over a file and click **More** then **Edit Offline**.

    The prompts that follow vary between browsers.

2. Follow the prompts. When asked to open or save the file, save it to your computer.

    > **Note:** Depending on your browser settings, the file might be saved automatically to a default location on your computer.

    The file is added to the **I’m Editing** view (on the left side of the library). The original file is still in its original location in the library. An icon indicates to users that the file is locked by you for editing.

3. Now you can open and edit the version you've downloaded.

    When you're done, click **Upload New Version** to upload the edited version to Alfresco Share.

    You can click **Cancel Editing** to unlock the file without making changes.

### Editing files in Alfresco Share

You can edit plain text, HTML, and XML files directly in Alfresco Share.

> **Note:** This action is also available for files configured with the `Inline Editable` aspect.

1. Hover over a file and click **More** then **Edit in****Alfresco Share**.

    The Edit Content page appears.

2. Edit the file details and content as required.

    The **Name** does not support the following special characters: `* " < > \ / . ? : and |`. When the name contains a disallowed character the **Save** button is disabled.

    > **Note:** The folder name *can* include a period as long as it is not the last character. This lets you add an extension (for example, `.txt`, `.html`, or `.xml`).

3. Click **Save**.

### Editing files in Microsoft Office

You can edit Microsoft Office files directly from Alfresco Share. When you're editing a file it's locked in Share until you finish editing it.

> **Note:** If you're working on a Mac then make sure you've updated to the latest minor version number of Microsoft Office. If you have an older version installed then you might have problems opening documents.

1. Hover over a file and click **More** then **Edit in Microsoft Office**.

    A message asks you to make sure you can trust the content.

    The file opens in a separate window. In Share the file will be shown as locked.

    > **Note:** You might get a further request to enter your Share login details and **Enable Editing**.

2. You can now edit the file.

    The minor version number in Share is updated each time you save the file. All standard Microsoft Office functionality is available.

3. When you're done, save and close the file.

### Editing files in Google Docs

The **Edit in Google Docs** action is available for any file that can be edited in Google Docs. Common document, presentation, and spreadsheet formats are supported.

Files you edit are temporarily stored in Google Docs, then removed from Google Docs once they've been checked back in to Alfresco Share.

1. Hover over file and click **More** then **Edit in Google Docs**.

    If prompted, authorize Share to access your Google Docs account. If you have a Google Username in your Alfresco Share profile then it will be used as the default account.

    > **Note:** If your browser asks you to allow popups for Google Docs then go ahead and do so. If you're using Safari you won't be able to use Google Docs until you enable all popups in the settings, so for security reasons you may prefer to use a different browser. If you previously locked the file for editing and are returning to it, you'll have the action **Resume Editing in Google Docs**.

    The file opens in Google Docs in a new browser tab. It's locked in Share so that other users can't edit it while you're working on it. The file stays locked until you either discard or save your changes.

2. Edit the content.

3. When you're done, close the Google Docs browser tab.

    In Alfresco Share you'll see the file displays the ![Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}) icon to show that it's open in Google Docs.

4. In Alfresco Share, click **More** then **Check In Google Doc**.

    You can also select **Resume Editing in Google Docs** to carry on editing, and **Cancel Editing in Google Docs** to discard the editing session and any changes made.

5. On the Version Information dialog box, indicate if the revision is major or minor, then add any information that might be relevant to the updates you made.

6. Click **OK**.

    This saves the file to Alfresco Share and unlocks the file.

    > **Note:** See [Google Docs FAQs](#googledocsfaq) for more on working with Google Docs.

### Sharing Google Docs files

You can share Google Docs files while you are editing them so multiple users can work with a document at the same time.

1. Hover over a file and click **More** then **Edit in Google Docs**, or select this option from the file preview screen.

    If prompted, authorize Alfresco Share to access your Google Docs account.

    > **Note:** If you previously locked this file for editing and are returning to it, you'll be clicking the action **Resume Editing in Google Docs**.

    The file opens in Google Docs. It will be locked in Share so that other users can't edit it while you're working on it. The file stays locked until you either discard or save your changes.

2. Click **Share**.

3. Type the email addresses of the people you want to share with in the text box below "Add people." You can add a single person, a mailing list, or choose from your contacts.

4. Choose the access level from the menu next to each collaborator: **Can view**, **Can comment**, or **Can edit**.

5. Click **Done**.

    All users you've shared the document with will receive an email with a link to the file. When they click the link they'll be able to view and edit the file while you're in your editing session. When you save the file back to Share or discard the changes they won't be able to edit it any further until you repeat the steps above.

6. When you've finished your editing close the Google Drive tabs and in your Share editing session click **Save to Alfresco Share**.

### Google Docs FAQs {#googledocsfaq}

If you have any problems working with files in Google Docs, have a look through the list to see if there is a way to resolve your issue.

| Question | Solution |
|----------|----------|
|An error is shown when using Google Docs in Internet Explorer (IE) | Google Drive/Google Editor only support the two most recent versions of IE (11 & 10). All other versions will see a message indicating that their browser is outdated. (The same applies to Safari (not supported on Windows), Firefox, and Google Chrome – only the last two versions are supported.) |
| Is the Share button now available in Google Docs? | The Share button is fully functional.|
| A blank screen or a warning that you need permission to access an item is displayed | There maybe a conflict between the Google OAuth credentials set on your Alfresco Share account and those you have attempted to open the document with or that you are currently signed into Google with. Sign out of your Google account and sign back into the original account used to edit the document.|
| Your document will be "downgraded" | When you try to edit a document that can be imported into Google Docs but Google does not allow you to export it in the same format, you see a message to indicate that your document will be downgraded. This should read "upgraded" rather than downgraded. |
| Documents discarded or saved to Alfresco Share are still visible in Google Drive | Improvements have been made by Google so that this should no longer be an issue. |
|  The Edit in Google Docs option is not available | In some circumstances, the **dit in Google Docs** option is not available. For example, when trying to edit documents or spreadsheets larger than 2MB and presentations larger than 50MB, or the file type is not supported for editing. You will not see the option when you do not have write permission to the document. The **Edit in Google Docs** option is also not available when using IE8. |
| Google Docs spreadsheets appear to be truncated | When creating a spreadsheet in Google Docs, and then saving it to Alfresco Share, when editing it again in Google, the rows and columns may appear to be truncated. The spreadsheet is still fully functional and you can add new rows and columns in Google Docs. If you open the document in Excel, you will see that there are no truncation issues. The issue is caused by Google optimizing the file internals to a minimum so that it can be transferred as a smaller file size. |
| Why wasn't the Document Title updated after I checked the document back in? | There is a lag between the save time of the title and when it is available through the Google API. So, if you quickly save the document after changing the title, this may result in the title not being updated in Alfresco Share when you check the document back in. |
| Messages saying "something went wrong... please reload" and "sorry the file does not exist" | When you edit or view a Google Doc from Alfresco Share, it's temporarily stored in Google Docs. If it's checked in or the editing is cancelled from in Share, then this temporary version is removed from Google Drive and is no longer available. The file can be accessed from Share. |

### Editing file and folder properties

Edit the basic details of a folder or file to change its name, description, and tags. These properties are also referred to as *metadata*.

> **Note:** If the selected folder or file has the `Classifiable` aspect applied, there will be an additional **Categories** option available.

1. Hover over a file or folder and click **Edit Properties**.

    The Edit Properties dialog box displays the basic metadata for the item. The **All Properties** link in the upper right corner will display the full set of properties available for the item.

2. Edit the details.

    The **Name** doesn't support the following special characters: `* " < > \ / ? : and |`.

    > **Note:** The name can include a period as long as it is not the last character.

3. Click **Select** beneath the **Tags** label to edit the tag associations. You can add and remove existing tags, and create new tags.

    On the Select page the left column lists the tags being used in this network. The right column displays the tags already associated with the folder or item.

    1. **Create a new tag:** Type the tag name and click the ![Create Tag icon]({% link content-services/images/ico-create-tag.png %}) Create new item icon (or press ENTER). Create one tag at a time. The tag can be a single word or a string of words.

    2. **Add an existing tag:** Find a tag in the left column and click the ![Add Tag icon]({% link content-services/images/ico-add-tag.png %}) Add icon to associate it with the current folder or item.

    3. **Remove an existing tag:** Find a tag in the right column and click the ![Remove Tag icon]({% link content-services/images/ico-remove-tag.png %}) Remove icon.

    4. Click **OK** to save the changes.

    > > **Note:** You can add, edit, and delete tags by hovering over existing tags or the **No Tags** description in the document library.

### Uploading new versions

You can upload content from your computer to update a file.

Doing this to a file you've locked updates the content and removes the lock at the same time. You can also do this to an unlocked file to update it without first downloading it to your computer.

1. Find the file you want to update.

    > **Note:** The **I'm Editing** view shows the files locked by you for editing.

2. Hover over the file and click **More** then **Upload New Version**.

3. Click **Select files to upload** on the Update File dialog box.

4. Find and select the file that you want to upload from your computer.

    > **Note:** If you select a file with a different name or file type then this will be shown. You can continue as in the next step, cancel, or select a different file to upload. If you continue then the uploaded file name and/or file type will be used.

5. Indicate if the revision is minor or major.

6. In the **Comments** box, add any information that is relevant to the update.

7. Click **Upload**.

8. When the progress bar shows that the upload is complete, click **OK**.

    Updating a locked file unlocks it and removes it from the **I'm Editing** view.

## Downloading files

You can quickly download files from Alfresco Share so that you have a local copy.

>**Important:** When you select a locked file you're actually downloading the last version that was added to Share, which might be out of date. The user who locked it for editing might have a more recent version of it outside Share.

1. Hover over a file/folder and click **Download** / **Download as Zip**.

    You are prompted to open or save the file. Depending on your browser settings, the file might be saved automatically to a default location on your computer.

    > **Note:** Download as Zip cannot create zip files larger than 4GB.

2. Save the file to your computer.

    > **Note:** You can also select multiple files and/or folders and **Download as Zip** from the **Selected Items** menu. If a file is a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can also **Download** it in its original format or as a PDF on the file preview screen.

## Sharing files

You can easily share an file - even with people who don't have an Alfresco Share account. Clicking the **Share** action generates a URL that you can send by email or publish using social networking websites.

People with access to the URL can view the file. Those with an Share account have the option of signing in; those without an account can create one.

This option is available in the Document Library Detailed view and on the file preview screen. In the Document Library graphical views click ![Information icon]({% link content-services/images/ico-information.png %}) to see the option.

1. In the **Document Library** find the file you want to share.

    You can only share files, not folders.

2. Click ![Share icon]({% link content-services/images/ico-share.png %}) **Share**.

    A window appears displaying the URL for this file.

    > **Note:** The **View** action lets you preview the file to ensure it is the content you want to share.

3. Click the icon that represents how you want to share the link.

    > **Note:** You can also copy the link and paste it wherever you like, such as an email or document.

    When you select a sharing option, a page relevant to your selection displays.

4. Complete the details on the page provided and share the link.

    * **Email**: The email subject and body are pre-populated for you. Add a recipient and edit the message as necessary, then send.
    * **Facebook**: Write a comment to post with the link and select how you want to share it. Click **Share Link**.
    * **Twitter**: Edit the message as necessary and click **Tweet**.
    * **Google+**: Write a comment to post with the link and specify who you want to share it with. Click **Share**.

    > **Note:** If an file is a Microsoft Office, PDF, or other text-based file type (not an image or video) then you can also click ![Advanced Search icon]({% link content-services/images/ico-link.png %}) on the file preview to share a link to the item, and even select to **Link to current page**.

When you don’t want your publicly shared file to be available anymore, you can break the link. Once you make the link invalid, anyone who tries to access it will be unable to reach the public page.

1. Find the file you previously shared.

2. Click **Shared**. The window displaying the item's URL appears.

3. Click **Unshare**.

## Applying aspects {#applyaspects}

You can use aspects to add extra functionality, properties, or options to files. Alfresco Share provides you with a list of default aspects.

For a detailed list of aspects available and what they do, see [About aspects]({% link content-services/7.2/config/repository.md %}#about-aspects).

1. Select a file to view it in the file preview screen.

2. In the **Document Actions** list click **Manage Aspects**.

3. In the **Available to Add** list click ![Add icon]({% link content-services/images/ico-add.png %}) next to the aspects you want to add to the file.

    Click ![Delete icon]({% link content-services/images/ico-delete.png %}) to remove any existing aspects from the **Currently Selected** list.

4. Click **Apply changes**.

    The selected aspects are applied to the file. Additional properties added to the file are displayed on the file preview screen. You can edit these properties using **Edit Properties** under **Document Actions**.

## Managing file and folder permissions

You can override the default site permissions for any content you add to the document library. This lets you control what site members can see and do with your content.

Each user has an assigned role in the site - Manager, Collaborator, Contributor, or Consumer - and each role has a default set of permissions. This controls the actions site members can [perform in the site]({% link content-services/7.2/using/permissions.md %}).

> **Note:** In Content Services 6.2.2 and above changing permissions on a node with no explicit permissions (i.e. all permissions are inherited from a parent) has a time limit for the ACL propagation on children. This is needed for large node-trees where changes cannot be performed synchronously in one transaction due to resource limitations. In these cases the updates to the nodes will be scheduled for asynchronous processing which will be used for all changes that could not be completed within the set time limit. The limit can be configured by changing the `system.fixedACLs.maxTransactionTime` property in the `\tomcat\shared\classes\alfresco-global.properties` file. The processing is handled by the `fixedACLsUpdater` job which can be scheduled to run by changing a CRON expression in the property: `system.fixedACLsUpdater.cronExpression`.

The Manage Permissions feature goes beyond the site permissions. It lets you override a user's site role for a particular content item or folder. This means you can give a site member either more or less access to specific content compared to what they can do with other content in the library.

This can be really useful to hide and restrict content to only a set group of site members.

> **Note:** Remember to keep your content secure. If you give someone access to a file or folder then they'll see the breadcrumb path to it, even when they don't have access to it's parent folder.

![Local permissions privacy]({% link content-services/images/local-permissions-privacy.png %})

> **Note:** Don't give permissions to users who aren't a member of the site, as this can cause problems with the document library.

1. Hover over a file/folder in the library and click **More** then **Manage Permissions**.

2. Manage the inherited permissions:

    * ![Inherit Permissions On]({% link content-services/images/ico-enabled-on.png %}) **Inherit Permissions** shows that permissions are being inherited from the parent folder. Click this button to ignore the inherited permissions.
    * ![Inherit Permissions Off]({% link content-services/images/ico-enabled-off.png %}) **Inherit Permissions** shows that permissions are not being inherited from the parent folder.Click this button to inherit the permissions.

3. Manage the local permissions:

    1. Click **Add User**.

    2. Search for the user you want to define permissions for.

    3. Click **Search** or press ENTER.

        The search returns a list of users.

    4. Click **Add** to place a user in the Locally Set Permissions table. The user is given the role Consumer.

    5. Change the role as needed.

    6. Repeat this step to add more users and set their permissions for the same content.

        > **Note:** To revoke the permissions for a user, click **Delete** in the Actions column.

4. Click **Save**.

## Becoming content owner

You can take ownership of files and folders from other users.

You may need to do this if someone who owned a file or folder has left your company and you need to take responsibility for it.

> **Note:** You need to be a Site Manager or have permission to delete a file or folder to become its owner, see [User roles and permissions]({% link content-services/7.2/using/permissions.md %}).

1. Click on a file to open the file preview.

    > **Note:** If you're taking ownership of a folder you need to hover over it then select **View Details**.

2. Click **Become Owner** and select **OK**.

    You now have full ownership rights of the file / folder.

## Changing the content type {#changetype}

You can change an file's content type from its default to a more specific value.

You can only change the content type if your Alfresco administrator has configured content type properties so that you can enhance a file by giving it a type (for example, changing a standard document to a policy document).

1. Click on a file to view it in the file preview screen.

2. In the **Document Actions** list click **Change Type**.

    The Change Type dialog box appears.

3. Select the required type.

    > **Note:** The **New Type** list is empty until types are defined by an Alfresco administrator.

4. Click **OK**.

    When you give a file a type property it is shown on both the file preview screen and the Edit Properties screen for the file.

## Replicated content

Content Services administrators can configure Content Services systems so that content is replicated across multiple repositories. Files and folders created as the result of a replication job display the **Transferred from another Repository** icon in the file list.

This icon indicates that this is replicated, not original, content. Depending on the transfer configuration, the content can be read-only.

Content marked with this icon also displays the action **View in Source Repository**. Select this action to display the file preview screen for the related *original* content file or folder.
