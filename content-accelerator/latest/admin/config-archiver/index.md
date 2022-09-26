---
title: Config Archiver
---

> The Config Archiver makes moving ACA config files to, from, and between any OpenContent repository easy. It is located in the "Tools" section within ACA admin. 

# Exporting Configs
Use the export config section to export the current ACA configurations as a zip file.  When exporting configs, all Trac user preferences files are automatically archived since these files contain public saved searches.  By default, the archiver does not include individual user's preferences files in the archive, but this can be controlled by the `Include User Preferences` slider.

Clicking the export button will begin the export.  The name of the zip that is downloaded will be name as the name of the current ACA application ID.  The application ID can be found at the bottom of the Application Config (the default is `default`.

Note that the name of the archive file is important - the import tool assumes the following format: `{aca-app-id}.zip`.

# Importing Configs
To import configs, simply access the Import section of the Config Archiver and drag the zip file containing the archived configs into the drop zone and click the `Import` button.

Remember that the system will assume that the name of the zip file (minus the extension) is the ACA application ID.  The import will handle this in one of two ways:

1. If the application ID already exists, any existing config files will be versioned
1. If the application ID does not exist, the application ID will be created and all configs in the zip will be placed into this application ID.

Based on the above, the Config Archiver can be used to archive and update configs as well as generate a new application ID.  For example, you could export `default.zip`, rename the zip file to `hpiForClaims.zip` and then use this zip file to create a new `hpiForClaims` application ID.

## Application ID Creation - Set Security
If during the Import, you are creating an application ID that does not yet exist, you must follow some manual steps to update the configuration security.  This extra step was not included in the Import utility due to the differences in security across ECM systems.  In the future, the following steps could be automated.

### Alfresco
Login to Alfresco Share as `admin`.  Review the security settings for the `/hpi/default/configs` and `/hpi/default/user` folders or the [documentation here](https://github.com/tsgrp/HPI/wiki/Configuring-a-new-instance#alfresco) if no configs exist.  Set permissions on the corresponding folders for the new application ID to match.  For example, with the default setup, you will need to:

1. Edit permissions for `/hpi/{the-app-id}/configs`.  Remove permission inheritance and update to match `/hpi/default/configs`
1. Edit permissions for `/hpi/{the-app-id}/user`.  Remove permission inheritance and update to match `/hpi/default/user`