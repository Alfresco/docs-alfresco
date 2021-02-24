---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Supported Use Cases for Enterprise to Cloud Sync

Enterprise to Cloud Sync enables simple synchronization of content between an on-premise repository and an associated network in Alfresco in the cloud \(hosted at https://my.alfresco.com\). In this way, selected content can be shared across corporate firewalls so that it can be accessed by users external to an organization, and teams can collaborate across corporate boundaries without giving external users access to internal systems. After the need for collaboration has passed, the synchronization can be deleted and the content will be removed from Alfresco in the cloud but will remain archived in the on-premise repository.

Cloud Sync functionality is built into Alfresco One. Synchronized content is selected in Share, and these “Sync Sets” are transferred by the repository to Alfresco in the cloud. A folder, a document, or a group of multiple documents can be synchronized. Synchronization is triggered by any change on a member of a Sync Set, regardless of the interface that triggered the change \(Share, CMIS, REST, WebDAV, FTP\). A small number of non-configurable content properties will also be synchronized.

**Sync to Cloud**

A user who has an account on an on-premise source system and also an account at my.alfresco.com can setup one or more sync sets.

The sync set can be for an individual document, a selection of multiple documents, or a folder within a site's Document Library. Cloud Sync does not support synchronizing the Document Library folder itself, or any other folders outside of a site’s Document Library.

When setting up the synchronization on the on-premise source system, the user is asked to connect to my.alfresco.com to select a target folder. At this point the user can also create a new folder in my.alfresco.com to be the synchronization target.

Options when creating a sync set for one or more documents:

-   Lock the 'on-premise' copy \(default: false\)
-   Allow content to be deleted on the cloud target \(default: true\)

    **Note:** If you are using the Share 'Delete Dialog', the user will be prompted again.

-   Delete content 'on-premise' if it is deleted on the cloud target \(default: false\)

Options when creating a sync set for a folder:

-   Include subfolders \(default: true\)
-   Lock the 'on-premise' copy \(default: false\)
-   Allow content to be deleted on the cloud target \(default: true\)

    **Note:** If you are using Share 'Delete Dialog', the user will be prompted again.

-   Delete content 'on premise' if it is deleted on cloud target \(default: false\)

Synchronizations could fail for a number of reasons including:

-   users being removed from the system
-   folders being removed resulting in a missing destination
-   name clashes
-   permission changes causing a permission violation during a synchronization
-   user quota and size limits being exceeded
-   authentication changes

The Share user interface provides built-in searches for "Synced content" and "Synced with Errors" under the "Documents" header at the top of the left-pane.

**Unsync from cloud**

"Unsync from Cloud" will stop the synchronization and remove the sync set from the on-premise system and my.alfresco.com. The folders and documents will remain in the target unless the user explicitly chooses the option to "remove \[the folder\] and any content under it from the cloud".

**Synchronizing one or more selected documents**

After creating a sync set containing a single document, the document will be pushed to the target. Subsequent updates to the source document, including changes to the content or the metadata shared between the systems, will continue to be pushed to the target system. Similarly, updates to the target document will be pulled back to the source document.

Similarly, users can select multiple documents to be synchronized in the same sync set. Under-the-hood, a single sync set definition is created, rather than one per individual document. The individual documents can be moved into other folders. Though each document can be individually unsynced, it is not possible to add more nodes to the sync set definition.

Once a sync set containing individual documents is created, its contents cannot be changed. In order to add more documents to a sync set, it must be removed and re-created.

If both sides of a synchronization are updated at the same time, a conflict is created. To resolve the conflict, the changes on the synchronization target \(my.alfresco.com\) will override the changes to the on-premise source system.

**Synchronizing a folder**

After creating a folder sync, the folder will be pushed to the target including any documents contained within it. Sub-folders will also be synchronized to the target, unless the option is selected to not include sub-folders in the synchronization. The folder contents are indirectly synchronized, and so the behavior of the synchronization for these folder contents differs from that for directly synchronized content.

Indirectly synchronized folder contents cannot be individually unsynced, but they will stop being synchronized if they are moved outside of the synchronized folder hierarchy or if they are deleted. It is possible to add more content to the sync set by uploading or moving items into the folder hierarchy.

Subsequent updates to the source folder and its contents, including document contents and common metadata, will continue to be pushed to the folder on the target system. Updates to the target folder and its contents will be pulled back to the folder on the source system.

Similarly to when individual documents are synchronized, conflicts are resolved by having my.alfresco.com overwrite the on-premise system.

**What gets synchronized**

Changes to the content within a synchronization set are tracked in order to be included in the next synchronization push. Changes are tracked irrespective of which user interface or API is used to upload, edit, or delete folders and documents. This includes Alfresco Share, CMIS APIs, REST APIs, WebDAV or other protocols such as CIFS or FTP.

The document's binary content will be synchronized. Metadata which is shared between the on-premise source system and my.alfresco.com will be synchronized. The list of metadata that will be synchronized is:

-   `cm:name`
-   `sys:locale`
-   `cm:author.*`
-   `cm:geographic.*`
-   `cm:titled.*`
-   `exif:exif.*`

The auditable properties of cm:modifier, cm:modified, cm:creator, cm:created are not synchronized. The timestamps will reflect the time the sync occurred and the userid \(and display name\) will reflect that of the sync set creator, that is, the Cloud account used to setup and create the sync set definition.

The version history, renditions and similar document properties are not synchronized. The version history is maintained separately in the source document and the target document, which may allow the user to manually resolve a conflict either by making a subsequent update or by reverting a change to a document \(that is, promoting an old version to become the new current version\).

**Synchronized file operations**

-   **Rename**

    The name of a folder or document is part of the 'common metadata', and so the system will attempt to synchronize rename operations. If another file already exists in the given parent folder on either side of the synchronization, then the sync will be marked as failed.

-   **Move**

    The sync pairing will be maintained even if a directly synchronized document or folder is moved within the Site’s document library on the source system, the target system, or both systems. When a folder is synchronized, the contents of the folder can be moved within the folder and that move will be synchronized. Moving content out of a synchronized folder, or deleting it, will cause the content to be removed from the synchronization. Moving content into a synchronized folder will cause it to be added to the synchronization. Synchronization will also correctly occur with content that is moved from one synchronized folder to a different synchronized folder.

-   **Copy**

    Synchronized folders and documents can be copied, but the copies will not be synchronized unless they are copied within a folder hierarchy that is synchronized and thus become indirectly synced themselves.

-   **Delete**

    When deleting synchronized content, the behavior is determined by the options selected when the synchronization was created or by the user directly in the deletion dialog provided by the Share user interface. The options selected when creating the sync set apply when content is managed outside of Share, but the preferences of the user as specified in the Share delete dialog override these options. If a synced document or folder is deleted in the Cloud and it was not setup to delete 'on-premise', then the document will still remain on the source system. If the source document is updated, then the next sync will fail since the target node no longer exists. At this point, the user can choose to "Request Sync", which will recreate the newly updated document by pushing it again to the Cloud. If the target was moved in the cloud before the deletion, the document will be pushed to the original target folder location. In the case of a directly synced document, the user can also choose to "Unsync" which will remove the failing sync set.


**Rules**

A rule can trigger due to a synchronization event, either in the foreground \(as part of the synchronized transaction\) or in the background. In other words, a rule can trigger due to a document being created or updated through synchronization in the same way as if a user explicitly performed such an action. If a foreground rule causes an in-transaction failure \(during the sync\) then the sync will be marked as failed in the Share interface. If a background rule fails then it will not affect the sync transaction.

**Google Docs Integration**

The file can be edited in Google Docs on the on-premise or on the cloud server and the changes will be synced to the other server once the files are not locked for editing in Google Docs anymore. The same happens when the existing synced Google doc is edited using Google Docs on premise or cloud. It is also possible to create new Google Docs on premise and on cloud in synced folders and subfolders.

![](../images/hr.png)

**Unsupported Use Cases and Limitations**

Use cases not listed above are unsupported.

The following scenarios are not supported, even though they are permitted by the user interface:

-   It is possible to use Share to create sync sets for folders and documents within "My Files" or within "Shared Files", but these sync sets are not supported.
-   Hybrid workflow is no longer supported.
-   Cloning an Alfresco on-premise environment with Cloud Sync configured is not supported, as the two systems will share the repository identifier and the synchronization jobs will conflict. If you currently have more than one Alfresco on premise instance using Cloud Sync, we recommend that you open an Alfresco Support ticket for assistance.
-   It is not currently possible to backup and restore sync set definitions. Should an on-premise repository need to be recovered, the sync set definitions should be removed and re-created manually.
-   The internal Cloud Sync APIs should not be called directly, eg. via external scripts or other custom clients.
-   Except as noted above, moving synchronized content is not supported. Moving files into newly created sub-folders whilst a synchronization move is in-progress or moving a file into a dynamically created sub-folder as part of a rule will both have unpredictable behavior. It is recommend that you remove the synchronization before moving content, and create it again after the move is completed.
-   Cloud Sync is not supported with a multi-tenant on-premise Alfresco instance.
-   Synchronizing via Cloud Sync a folder that is shared using Desktop Sync is not supported and will have unpredictable behavior.
-   Documents should not be simultaneously checked out and locked for editing on both sides of a synchronization. In this case, a check-in on one side will cause that change to be synced even though the document is locked on the other side. In this scenario, the last check-out to have a new version uploaded will be synchronized across both ends of the sync. No sync failure occurs on either check-in to indicate a conflict may have occurred.
-   Synchronizing a short-cut or creating a short-cut link in a synchronized folder is not supported.

Other limitations:

-   The version history is not synchronized.
-   Renditions and thumbnails are not synchronized, but are re-generated on the destination side of the synchronization and so might differ.
-   Associations such as comments, tags, and categories are not synchronized.
-   Alfresco in the cloud does not support custom models, so where the source system has custom types that extend either 'cm:content'' or 'cm:folder'', the cloud sync integration will attempt to push the node as the corresponding "cm" super type.
-   Custom metadata is not synchronized.
-   It is not possible to synchronize Smart Folders.
-   The Cloud Sync integration supports sync of folders and documents within a Site's DocLib but not the "documentLibrary" folder itself.
-   Documents declared as a record upon creation in Alfresco Share have no option to sync to cloud. Files created in synced folders have no option to declare as record. If a folder with file declared as record is synced to cloud, sync of the record will fail. For the folders with declare as record rule for files that are created or enter folder, syncing will always fail.

-   **[Enterprise to Cloud Sync performance](../concepts/cloud-sync-performance.md)**  
Enterprise to Cloud Sync does not have any specific limits. However, some usage patterns might affect perceived performance and also impact usability due to potentially conflicting actions.
-   **[Enterprise to Cloud Sync error scenarios](../concepts/cloud-sync-error-scenarios.md)**  
These are examples of typical error scenarios for Enterprise to Cloud Sync.

**Parent topic:**[Enterprise to Cloud Sync overview](../concepts/cloud-sync-arc-overview.md)

