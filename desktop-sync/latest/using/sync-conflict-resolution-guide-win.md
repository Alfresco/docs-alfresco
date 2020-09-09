---
title: Resolve sync conflicts on Windows
---

## Resolve sync conflicts on Windows

Whilst Desktop Sync ensures that content is kept up to date silently, 
under normal operation there may be circumstances where Desktop Sync can't resolve 
differences between a file stored on your desktop and the corresponding file in Alfresco. 

When the sync changes can't be updated automatically you are asked to resolve the conflict manually. 
This happens when a file has changed in both locations since its last sync, making it difficult to determine which changes to save.

For example, a conflict occurs when you update a file in your Alfresco sync folder and an update to the same file 
has happened on the server since the last sync. Desktop Sync will give you a choice of resolving the sync conflict by 
either choosing to keep your changes, or discarding your changes in favor of the latest copy from Alfresco.

Use the following information to resolve and manage Desktop Sync conflicts.

A conflict may either be resolved automatically by Desktop Sync or may require you to do something.

### User action needed

|Alfresco action|Desktop Sync action|Result|Resolution|
|---------------|-------------------|------|----------|
|Update|Update|![]({% link desktop-sync/images/cross.png %})|Select either the desktop version or the Alfresco version. If you select the desktop version, that version is uploaded in Alfresco. If you select the Alfresco version, that version is applied on the desktop. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open) the conflicts and pending syncs dialog for information on resolving the conflict.|
|Rename|Rename|![]({% link desktop-sync/images/cross.png %})|Select either the desktop version rename or the Alfresco version rename.If you select the desktop renamed file, the Alfresco version rename is discarded. If you select the Alfresco renamed file, the desktop version rename is discarded. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open) the conflicts and pending syncs dialog for information on resolving the conflict.|
|Move|Move|![]({% link desktop-sync/images/cross.png %})|Select either the desktop action or the Alfresco action.If you select the desktop move, the Alfresco move of the file is cancelled and the desktop move is replicated in Alfresco. If you select the Alfresco move, desktop move of the file is cancelled and the Alfresco move is replicated on your desktop. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open) the conflicts and pending syncs dialog for information on resolving the conflict.|
|Delete|Update|![]({% link desktop-sync/images/cross.png %})|Select either the desktop update action or the Alfresco delete action. If you select the desktop action, the updated desktop file is restored in Alfresco. If you select the Alfresco delete action, the file on your desktop is deleted and the update is discarded. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open) the conflicts and pending syncs dialog for information on resolving the conflict.|
|Delete|Rename|![]({% link desktop-sync/images/cross.png %})|Select either the desktop rename action or the Alfresco delete action. If you select the desktop action, the desktop renamed file is restored in Alfresco with the new name. If you select the Alfresco delete action, the file on your desktop is deleted and rename is discarded. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open) the conflicts and pending syncs dialog for information on resolving the conflict.|
|Delete|Move|![]({% link desktop-sync/images/cross.png %})|Select either the desktop move action or the Alfresco delete action. If you select the desktop action, the file is recreated on your desktop at the new location. If you select the Alfresco delete action, the file is deleted from its new location on your desktop. [Open]({% link desktop-sync/latest/using/app-menu-taskbar.md %}#open)  the conflicts and pending syncs dialog for information on resolving the conflict.|

where ![]({% link desktop-sync/images/cross.png %}) indicates a conflict.

### No user action needed

|Alfresco action|Desktop Sync action|Result|Resolution|
|---------------|-------------------|------|----------|
|Update|Rename|![]({% link desktop-sync/images/tick.png %})|File is renamed and updated|
|Update|Move|![]({% link desktop-sync/images/tick.png %})|File is moved and updated|
|Update|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version to your desktop.|
|Update|Delete parent|![]({% link desktop-sync/images/tick.png %})|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version of the parent file to your desktop.|
|Rename|Update|![]({% link desktop-sync/images/tick.png %})|File is renamed and updated|
|Rename|Move|![]({% link desktop-sync/images/tick.png %})|File is moved and updated|
|Rename|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring Alfresco version to your desktop.|
|Rename|Delete parent|![]({% link desktop-sync/images/tick.png %})|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version of the parent file to your desktop.|
|Move|Update|![]({% link desktop-sync/images/tick.png %})|File is moved and updated|
|Move|Rename|![]({% link desktop-sync/images/tick.png %})|File is renamed and moved|
|Move|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring the file in a new location on your desktop.|
|Move|Delete parent|![]({% link desktop-sync/images/tick.png %})|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the parent file in a new location on your desktop.|
|Move out of synced site|Update|![]({% link desktop-sync/images/tick.png %})|File moved to a new location in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Move out of synced site|Rename|![]({% link desktop-sync/images/tick.png %})|File moved to a new location in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Move out of synced site|Move|![]({% link desktop-sync/images/tick.png %})|File moved to a new location in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Move out of synced site|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File deleted|
|Move out of synced site|Delete parent|![]({% link desktop-sync/images/tick.png %})|File deleted|
|Delete|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File deleted|
|Delete|Delete parent|![]({% link desktop-sync/images/tick.png %})|File deleted|
|Delete parent|Update|![]({% link desktop-sync/images/tick.png %})|Parent folder is deleted in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Delete parent|Rename|![]({% link desktop-sync/images/tick.png %})|Parent folder is deleted in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Delete parent|Move|![]({% link desktop-sync/images/tick.png %})|Parent folder is deleted in Alfresco. On your desktop, the file is moved to `C:\Users\<username>\Alfresco\orphaned` as it can't be saved in Alfresco.|
|Delete parent|Delete/Move out of synced site|![]({% link desktop-sync/images/tick.png %})|File deleted|
|Delete parent|Delete parent|![]({% link desktop-sync/images/tick.png %})|File deleted|

where ![]({% link desktop-sync/images/tick.png %}) indicates no conflict.