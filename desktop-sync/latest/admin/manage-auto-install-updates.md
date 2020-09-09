---
title: Manage automatic installation updates
---

## Manage automatic installation updates

If you're an IT administrator, you can upload new installation files into the repository to automatically update 
all users with Desktop Sync clients.

This ensures users with Desktop Sync clients are always up to date with minimal manual intervention.

1. Create a **Desktop Sync** folder in the Alfresco Content Services repository path: `/Data Dictionary/`
2. Upload the latest installer files for Windows and Mac clients to this location.

    >**Note:** Don't rename the files, otherwise the client upgrade won't work.

    Once the installer files are uploaded, users receive a notification telling them that an update is available and a 
    new installation file has been downloaded.

    Users will have to restart Desktop Sync to apply the new installation file.

    See [Updating Desktop Sync]({% link desktop-sync/latest/upgrade/index.md %}) for more information about how an update is applied.

