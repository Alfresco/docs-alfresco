---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Sync conflict resolution matrix

Use this information to resolve and manage Desktop Sync conflicts.

A conflict may either be resolved automatically by Desktop Sync or may require you to do something.

**User action needed**

|Alfresco action|Desktop Sync action|Result|Resolution|
|---------------|-------------------|------|----------|
|Update|Update|![](../images/cross.png)|Select either the desktop version or the Alfresco version. If you select the desktop version, that version is uploaded in Alfresco. If you select the Alfresco version, that version is applied on the desktop.

See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|
|Rename|Rename|![](../images/cross.png)|Select either the desktop version rename or the Alfresco version rename.If you select the desktop renamed file, the Alfresco version rename is discarded. If you select the Alfresco renamed file, the desktop version rename is discarded.

See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|
|Move|Move|![](../images/cross.png)|Select either the desktop action or the Alfresco action.If you select the desktop move, the Alfresco move of the file is cancelled and the desktop move is replicated in Alfresco. If you select the Alfresco move, desktop move of the file is cancelled and the Alfresco move is replicated on your desktop.

See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|
|Delete|Update|![](../images/cross.png)|Select either the desktop update action or the Alfresco delete action. If you select the desktop action, the updated desktop file is restored in Alfresco. If you select the Alfresco delete action, the file on your desktop is deleted and the update is discarded.

See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|
|Delete|Rename|![](../images/cross.png)|Select either the desktop rename action or the Alfresco delete action.

 If you select the desktop action, the desktop renamed file is restored in Alfresco with the new name. If you select the Alfresco delete action, the file on your desktop is deleted and rename is discarded.

 See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|
|Delete|Move|![](../images/cross.png)|Select either the desktop move action or the Alfresco delete action.

 If you select the desktop action, the file is recreated on your desktop at the new location. If you select the Alfresco delete action, the file is deleted from its new location on your desktop.

 See [Conflicts and Pending Syncs...](../references/ds-taskbar.md#conflict) for information on resolving the conflict.

|

where ![](../images/cross.png) indicates a conflict.

**No user action needed**

|Alfresco action|Desktop Sync action|Result|Resolution|
|---------------|-------------------|------|----------|
|Update|Rename|![](../images/tick.png)|File is renamed and updated|
|Update|Move|![](../images/tick.png)|File is moved and updated|
|Update|Delete/Move out of synced site|![](../images/tick.png)|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version to your desktop.

|
|Update|Delete parent|![](../images/tick.png)|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version of the parent file to your desktop.

|
|Rename|Update|![](../images/tick.png)|File is renamed and updated|
|Rename|Move|![](../images/tick.png)|File is moved and updated|
|Rename|Delete/Move out of synced site|![](../images/tick.png)|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring Alfresco version to your desktop.

|
|Rename|Delete parent|![](../images/tick.png)|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the Alfresco version of the parent file to your desktop.

|
|Move|Update|![](../images/tick.png)|File is moved and updated|
|Move|Rename|![](../images/tick.png)|File is renamed and moved|
|Move|Delete/Move out of synced site|![](../images/tick.png)|File not deleted as it was updated in Alfresco.Conflict is resolved by restoring the file in a new location on your desktop.

|
|Move|Delete parent|![](../images/tick.png)|Parent file not deleted as it was updated in Alfresco.Conflict is resolved by restoring the parent file in a new location on your desktop.

|
|Move out of synced site|Update|![](../images/tick.png)|File moved to a new location in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Move out of synced site|Rename|![](../images/tick.png)|File moved to a new location in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Move out of synced site|Move|![](../images/tick.png)|File moved to a new location in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Move out of synced site|Delete/Move out of synced site|![](../images/tick.png)|File deleted|
|Move out of synced site|Delete parent|![](../images/tick.png)|File deleted|
|Delete|Delete/Move out of synced site|![](../images/tick.png)|File deleted|
|Delete|Delete parent|![](../images/tick.png)|File deleted|
|Delete parent|Update|![](../images/tick.png)|Parent folder is deleted in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Delete parent|Rename|![](../images/tick.png)|Parent folder is deleted in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Delete parent|Move|![](../images/tick.png)|Parent folder is deleted in Alfresco. On your desktop, the file is moved to C:\\Users\\<username\>\\Alfresco\\orphaned as it can't be saved in Alfresco.|
|Delete parent|Delete/Move out of synced site|![](../images/tick.png)|File deleted|
|Delete parent|Delete parent|![](../images/tick.png)|File deleted|

where ![](../images/tick.png) indicates no conflict.

**Parent topic:**[Working with Desktop Sync](../concepts/ds-working.md)

