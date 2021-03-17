---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Rule actions

When you're setting up a rule in Alfresco Share there are lots of default actions available.

Selected actions are performed on files that meet the criteria of the event and conditions that you've selected.

Actions don't apply to files in subfolders, unless the **Rule applies to subfolders** option is selected before a rule is created.

**Note:** Additional rule actions are available with modules such as Alfresco Records Management, or if they've been set up by your Alfresco administrator.

|Action|What the action does|
|------|--------------------|
|**Execute script**|Runs a custom JavaScript script from the Data Dictionary/Scripts folder. There are a number of sample scripts available. The list can vary depending on how Alfresco Content Services is configured for your organization.|
|**Copy**|Creates copies of files in the location of your choice. Select the additional **Deep Copy** option if you want to also copy sub-folders and their contents.|
|**Move**|Moves all files and subfolders to the location of your choice.|
|**Check in**|Files that are currently checked out will be checked in. For example, they will be checked in before being moved to another folder. Select **Options** to choose whether they will be checked in as minor or major versions.|
|**Check out**|Checks out files automatically, with a working copy created in the location of your choice.|
|**Link to category**|Links files or folders to a category of your choice, such as a region or classification. See [Tagging and categorizing content](../tasks/site-content-tag.md) for more.|
|**Add aspect**|Adds a property aspect to files, to give it additional behaviours or properties. See [About Aspects](../concepts/aspect-about.md) for more.|
|**Remove aspect**|Removes a property aspect from files, to remove functionality or properties. See [About Aspects](../concepts/aspect-about.md) for more.|
|**Add simple workflow**|Adds files to a workflow. By default there is an approval task. You can also click to add a reject task. **Note:** You can click on **Approve** and **Reject** to rename the steps and to select a location to copy and move approved/rejected files to.

See [Tasks and workflows](../tasks/library-folder-rules-simpleworkflow.md) for more.

|
|**Send email**|When files and subfolders are added you can select to send notifications by email. Click **Message** to select recipients and add the message of your choice.|
|**Transform and copy content**|When applicable, add copies of files, in the format of your choice, to another location. For example you can generate a copy of a Word document in PDF format in a different folder.|
|**Transform and copy image**|When applicable, add copies of image files, in the format of your choice, to another location. For example you can generate a copy of a GIF file in PNG format in a different folder.|
|**Extract common metadata fields**|Embedded metadata is extracted from files and added to the file properties. Microsoft Office document properties, LibreOffice, and a number of other formats are supported.|
|**Import**|ZIP and ACP files are automatically unpacked. Select a location where the unpacked files will be placed.|
|**Specialise type**|When applicable, changes a file's content type. For example, changes a standard file into a policy document and adds the appropriate metadata for that content type. See [Changing the content type](../tasks/library-item-change-type.md) for more.|
|**Increment Counter**|Automatically increments the value of a number \(integer\) property. This will generally only be used by Alfresco administrators.|
|**Set property value**|Select a property and then enter a default value. Files with that property will have it changed to the entered value.|
|**Embed properties as metadata in content**|Embeds file properties directly into the binary file as metadata. The information contained in those files can help in searching and workflows.|

**Parent topic:**[Defining rules for a folder](../tasks/library-folder-rules-define.md)

