---
title: Using Mobile Workspace
---

## Searching

* You can search globally from all of the main/top level screens which means you can search at any time.
* The Mobile Workspace keeps a recent history of search terms so that previous searches can be quickly repeated.
* Contextual search is available within folders. This search mode will only search within that folder but can be converted to a global search using the quick filter. You can also filter by files and folders within the contextual folder search.

**Recent Files**

The Recent Files view shows all the files that have been created or modified within the last 30 days by the logged in user. The Search API is used to query for changes made by you and includes an extra column to display where the file is located in the content repository.

**Favorites**

The Favorites view shows all files and folders from the content repository that have been marked as a favorite by the logged in user.

**Offline**

Offline is a collection of content that is individual to a user and is available when offline.
The Mobile Workspace will attempt to keep this collection updated with the latest version wherever possible.

**Browse**

Browse contains the rest of the navigation structure. You can access your libraries, personal files, shared files and discarded files from this screen.

* Personal Files retrieves all content from the logged in user's home area `/User Homes/<username>/` in the repository. If the user is an administrator who does not have a home folder then the repository root folder is shown.

* File Libraries retrieves all the sites that the user is a member of, either public, moderated or private. File Libraries is the Libraries component, using the Sites API.

* The Shared Files view aggregates all files that have been shared using the QuickShare feature in the content repository.

* The Trash view shows all the items that a user has deleted. An administrator can see items deleted by all users. The actions available in this view are **Restore** and **Permanently Delete**.
