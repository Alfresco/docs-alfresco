---
author: Alfresco Documentation
---

# What's new in Desktop Sync

Read about the latest features in this release.

Desktop Sync 1.1 includes the following new features:

-   [Check Out / In](whats-new.md#1)
-   [Permissions](whats-new.md#2)
-   [Records and classified files](whats-new.md#3)

![](../images/hr.png)

**Check Out / In**

For files that are synchronized to your computer, the current checked out status from the server is replicated in your desktop. You can check files out by simply using a right-click action. This locks the file on the server to prevent other users from editing it. When another user checks a file out, you're prevented from making local changes; the application will notify you when the status is changed and the file is available for editing.

See [Working with Desktop Sync](../concepts/ds-working.md) \(Windows\) and [Working with Desktop Sync](../concepts/ds-working-mac.md) \(Mac\) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Permissions**

The permission granted to you for all content that you synchronize is now reflected on your computer.

For example, if you have the role of a Consumer in a site that you sync, then you'll have read-only permissions on the desktop. Any changes to permissions for content you sync is automatically updated by the Desktop Sync application.

See [Permissions](../concepts/ds-permissions.md) for more.

[back to top](whats-new.md#)

![](../images/hr.png)

**Records and classified files**

Support is provided for records and classified files where the Alfresco Governance Services module is installed. Any synced file that's declared as a record will be set to read-only, preventing users from editing it locally. Files can also be declared as a record via the right-click actions menu. Classified files are not synced to users' desktops, and are automatically removed when classification is applied retrospectively.

See [Governance Services support](../concepts/ds-governance.md) for more.

[back to top](whats-new.md#)

**Parent topic:**[Alfresco Desktop Sync](../concepts/ds-overview.md)

