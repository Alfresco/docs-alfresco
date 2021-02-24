---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Site page components

The following sections detail the user permissions for each component.

## Library

Library actions and functionality relating to both folders and content items:

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|View folder/item details page| |X|X|X|X|
|Toggle the Like status| |X|X|X|X|
|Toggle the Favorite status| |X|X|X|X|
|Rename content \(folder, item\)|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Edit basic details|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Edit custom properties|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Copy| |X|X|X|X \(1\)|
|Move|Content created by self|X|X|X| |
| |Content created by other user|X| | | |
|Delete|Content created by self|X|X|X| |
| |Content created by other user|X| | | |
|Manage permissions|Content created by self|X|X|X| |
| |Content created by other user|X| | | |
|Manage aspects|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Change type|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Copy page URL| |X|X|X|X|
|Add comment| |X|X|X| |
|Edit comment|Content created by self|X|X|X| |
| |Content created by other user|X| | | |
|Delete comment|Content created by self|X|X|X| |
| |Content created by other user|X| | | |

**Note:** \(1\) A user with the role Consumer can copy a folder or content item to another site as long as the user performing the action has the role of Manager, Collaborator, or Contributor in the target site.

**Tip:** Consumers who previously held a site role where they were able to add content retain their previously held permissions for any content they have added.

Library actions and functionality relating only to folders:

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create folder| |X|X|X| |
|Locate folder| |X|X|X|X|
|Manage rules|Folder created by self|X|X|X| |
| |Folder created by other user|X| | | |
|View in Alfresco Explorer| |X|X|X|X|

Library actions and functionality relating only to content items:

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create content| |X|X|X| |
|Upload content| |X|X|X| |
|Download content| |X|X|X|X|
|View in browser| |X|X|X|X|
|Upload new version|Content created/added by self|X|X|X| |
| |Content created/added by other user|X|X| | |
| |Content locked by other user| | | | |
|Edit online|Content created/added by self|X|X|X| |
| |Content created/added by other user|X|X| | |
|Edit inline|Content created/added by self|X|X|X| |
| |Content created/added by other user|X|X| | |
|Edit offline|Content created/added by self|X|X|X| |
| |Content created/added by other user|X|X| | |
|Publish| |X|X|X| |
|Unpublish| |X|X|X| |
|Check out to Google Docs|Content created by self|X|X|X| |
| |Content created by other user|X|X| | |
|Check in from Google Docs|Content locked by self|X|X|X| |
| |Content locked by other user| | | | |
|Cancel editing|Content locked by self|X|X|X| |
| |Content locked by other user|X| | | |
|View original version| |X|X|X|X|
|View working copy| |X|X|X|X|
|View in Google Docs| |X|X|X|X|
|Start workflow| |X|X|X|X|
|Locate file| |X|X|X|X|
|Download previous version| |X|X|X|X|
|Revert to previous version| |X| | | |

## Calendar

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|View event| |X|X|X|X|
|Create new event| |X|X|X| |
|Edit event|Event created by self|X|X|X| |
| |Event created by other user|X|X| | |
|Delete event|Event created by self|X|X|X| |
| |Event created by other user|X| | | |

## Wiki

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create new page| |X|X|X| |
|Edit page|Page created by self|X|X|X| |
| |Page created by other user|X|X| | |
|Rename page|Page created by self|X|X|X| |
| |Page created by other user|X|X| | |
|Delete page|Page created by self|X|X|X| |
| |Page created by other user|X| | | |
|Edit main page| |X|X| | |
|Rename main page| |X|X| | |
|Delete main page| |X| | | |
|View page details| |X|X|X|X|
|View previous version of a page| |X|X|X|X|

## Discussions

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create new topic| |X|X|X| |
|Edit topic|Topic created by self|X|X|X| |
| |Topic created by other user|X| | | |
|Delete topic|Topic created by self|X|X|X| |
| |Topic created by other user|X| | | |
|View discussions| |X|X|X|X|
|Add reply| |X|X|X| |
|Edit reply|Reply created by self|X|X|X| |
| |Reply created by other user|X|X| | |

## Blog

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create new post| |X|X|X| |
|Edit post|Post created by self|X|X|X| |
| |Post created by other user|X| | | |
|Delete post|Post created by self|X|X|X| |
| |Post created by other user|X| | | |
|View blog post| |X|X|X|X|
|Publish post externally|Post created by self|X|X|X| |
| |Post created by other user|X|X| | |
|Update external post|Post created by self|X|X|X| |
| |Post created by other user|X|X| | |
|Remove external post|Post created by self|X|X|X| |
| |Post created by other user|X|X| | |
|Create comment| |X|X|X| |
|Edit comment|Comment created by self|X|X|X| |
| |Comment created by other user|X| | | |
|Delete comment|Comment created by self|X|X|X| |
| |Comment created by other user|X| | | |
|Configure the external blog| |X|X| | |

## Links

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create new link| |X|X|X| |
|Edit link|Link created by self|X|X|X| |
| |Link created by other user|X|X| | |
|Delete link|Link created by self|X|X|X| |
| |Link created by other user|X| | | |
|View link details| |X|X|X|X|
|Create comment| |X|X|X| |
|Edit comment|Comment created by self|X|X|X| |
| |Comment created by other user|X| | | |
|Delete comment|Comment created by self|X|X|X| |
| |Comment created by other user|X| | | |

## Data Lists

|Action| |Manager|Collaborator|Contributor|Consumer|
|------|--|-------|------------|-----------|--------|
|Create list| |X|X|X| |
|Edit list|List created by self|X|X|X| |
| |List created by other user|X|X| | |
|Delete list|List created by self|X|X|X| |
| |List created by other user|X| | | |
|Add list item|List created by self|X|X|X| |
| |List created by other user|X|X|X| |
|Edit list item|List created by self|X|X|X| |
| |List created by other user|X|X| | |
|Duplicate list item|List created by self|X|X|X| |
| |List created by other user|X|X|X| |
|Delete list item|List created by self|X|X|X| |
| |List created by other user|X| | | |

**Parent topic:**[User roles and permissions](../references/permissions_share.md)

