---
title: Upgrade Governance Services
---

To upgrade Alfresco Governance Services you need to make sure you're running the correct version of Alfresco Community Edition.

1. Ensure that your current production environment is running a version that is supported for upgrading.

2. Download Alfresco Community Edition and the Records Management AMP zip.

3. Upgrade Alfresco Community Edition.

    For more information about upgrading Alfresco Community Edition, see [Upgrading Alfresco]({% link content-services/latest/upgrade/index.md %}).

    You can start the server at this point to verify that the upgrade was successful.

4. Apply the Alfresco Governance Services to the upgraded Alfresco Community Edition installation.

    Follow the instructions in [Install using the distribution ZIP]({% link governance-services/community/install/zip.md %}).

5. Restart the Alfresco Community Edition server, if it is already running.

6. Log in to Alfresco Share to view the Records Management data.

Your existing Records Management data is migrated to Alfresco Community Edition.

When you upgrade from a previous version of Records Management to the Alfresco Records Management install, any existing Records Management data is preserved (it is 'patched' in the same way as updated data in the server). The File Plan structures will appear as they did in 1.0 and the previous Records Management site is migrated. Therefore, you do not need to create the Records Management site again.

From Records Management 2.0 onwards you cannot create a record series; instead you create a record category with no retention schedule. The record series is retained as a deprecated model construct to be used when migrating existing record series from a 1.0 installation. This means that any previously created record series will appear and behave as record categories in 2.2, but will be of the deprecated type record series (directly extended from record category). If any custom data was defined for record series in 1.0, this will still appear in the Records Management site, but only for the migrated record series.

Note also that any pre-configured saved searches from your previous version are not available after an upgrade.
