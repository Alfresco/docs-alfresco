# Call Alfresco Action

The Call Alfresco Action enables you to invoke the standard Alfresco Content Services actions from Alfresco Process Services.

|Property|Description|
|--------|-----------|
|**Details tab**

||
|Name

|The name of the content-specific step.

|
|Description

|A description of this step.

|
|**Target tab**

||
|Content

|Retrieves Alfresco properties for content stored in the form editor or variable based on your selection.

|
|Act as

|Identity of the caller: Process initiator or Specific User. Selecting **Specific User** lets you select a different user.

|
|Repository

|Changes the repository account. For example: Alfresco Content Services, Alfresco in the Cloud.

|
|**Action tab**

||
|Action

|Lists a range of actions specific to Alfresco Content Services. Select the options to make changes to the default name and value depending on your requirement. The options are as follows:

 -   ****extract-metadata****

Extracts embedded metadata from files and added to the file properties. Alfresco Content Services supports Microsoft Office document properties, LibreOffice, and a number of other formats.

-   ****move****

Moves the files and subfolders to the locations of your choices in Share if you edit the following value with the exact location of your document in Share: *workspace://SpacesStore/<ID\>*

-   ****add aspect****

Adds a property aspect to files for additional behaviors or properties.

-   ****specialise-type****

Changes a file’s content type, if applicable. For example, you can changes a standard file into a policy document and adds the appropriate metadata for that content type.

-   ****script****

Runs a custom JavaScript script from the Data Dictionary/Scripts folder. There are a number of sample scripts available. The list can vary depending on how Alfresco Content Services is configured.

-   ****check-in****

Checks in files that are currently checked out. For example, files will be checked in before being moved to another folder. Select the option to indicate whether they will be checked in as minor or major versions.

-   ****transform and copy content****

Action for transforming and copying content. You can add copies of files, in the format of your choice, to another location. For example, you can generate a copy of a Word document in PDF format in a different folder.

-   ****remove-features****

Removes a property aspect from files to remove functionality or properties.

-   ****check-out****

Checks out files automatically with a working copy created in the location of your choice. Select the option to associate a name or type with the file.

-   ****copy****

Creates copies of files in the location of your choice. Set the additional deep-copy and overwrite-copy options to true if you want to copy or overwrite sub-folders and their contents.

-   ****transform-image****

Action for transforming and copying image files in the format of your choice to another location. For example, you can generate a copy of GIF file in PNG format in a different folder.


|
|**Action Parameters**

|View or update parameters of the action selected in the previous field.

|

**Parent topic:**[Content-related steps](../topics/content_related_steps.md)

