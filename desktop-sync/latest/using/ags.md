---
title: Compatibility with Alfresco Governance Services
---

Desktop Sync is fully compatible with Alfresco Governance Services. 
This topic explains how Desktop Sync handles records and classified files.

## Initial content sync

Sites and folders available to synchronize may already include files that have been 
declared as records and/or files that are classified. When synchronization starts, the files are treated as follows:

* **Classified Files** are not synchronized to any users desktops
* **Records** are synchronized as read-only files, which can't be edited on the desktop
* The Records Management File Plan is not available to synchronize

## Content synchronization

Once the initial synchronization is completed, Governance actions are treated in specific ways:

* When a file is **Classified** then it's removed from users desktops
* Files that are **Declared as Records** are synchronized as ready only
* If a Classified file is **Declassified** then synchronization will resume
* If a record is **Rejected**, then its editable state will return where user permissions are sufficient

## Desktop record declaration

Files can be declared as records from within Windows Explorer (Windows) or Finder (Mac).

* Windows: Right-click the file and select **Declare as Record** under **Alfresco Sync**
* Mac: Right-click the file and select **Declare as Record**

>**Note:** **Declare as Record** is not available with Alfresco One 5.1.

## Hidden records

Records that are hidden from a collaboration site are removed from users desktops.
