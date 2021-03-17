---
audience: 
---

# Upgrading Records Management

Use this information to upgrade your Records Management installation.

The recommended path for upgrading Records Management is from Version 4.1.x to Version 5.2.

Once you are running version 4.1.x, use the standard upgrade process for Alfresco to upgrade to 5.2, and then when the Alfresco installation is upgraded, you can apply the new AMP files for Alfresco Records Management 2.5.

**Note:** If upgrading directly from Alfresco Records Management 2.3.2 ensure you have created an 'rm' site first before upgrading. If you don't do this an error will occur.

1.  Ensure that your current Records Management production environment is running an Alfresco version that is supported for upgrading.

2.  Download Alfresco Version 5.2 and the Records Management AMP zip from the [Support Portal](http://support.alfresco.com).

3.  Download Alfresco Version 5.2 and the Records Management AMP zip.

4.  Upgrade to Alfresco 5.2.

    For more information about upgrading, see [Upgrading Alfresco](http://docs.alfresco.com/5.2/concepts/ch-upgrade.html).

    For more information about upgrading Alfresco Community, see [Upgrading Alfresco](http://docs.alfresco.com/community/concepts/ch-upgrade.html).

    You can start the Alfresco server at this point to verify that the upgrade was successful.

5.  Apply the Alfresco Records Management 2.5 to the upgraded Alfresco installation.

    Follow the instructions in [Applying the Records Management AMP files](rm-amp-install.md).

    **Note:** If you have easy access records \(previously know as in-place records\) that are pre-2.3.0.8 versions of Records Management, then you also need to [run a webscript](rm-upgrade-2308.md) so that easy access records created in pre-2.3.0.8 sites are shown in the search results of users without Records Management permissions.

6.  Restart the Alfresco server, if it is already running.

7.  Log in to Share to view the Records Management data.


Your existing Records Management data is migrated to 5.2.

When you upgrade from a previous version of Records Management to the Alfresco Records Management 2.5 install, any existing Records Management data is preserved \(it is 'patched' in the same way as updated data in the server\). The File Plan structures will appear as they did in 1.0 and the previous Records Management site is migrated. Therefore, you do not need to create the Records Management site again.

From Records Management 2.0 onwards you cannot create a record series; instead you create a record category with no retention schedule. The record series is retained as a deprecated model construct to be used when migrating existing record series from a 1.0 installation. This means that any previously created record series will appear and behave as record categories in 2.2, but will be of the deprecated type record series \(directly extended from record category\). If any custom data was defined for record series in 1.0, this will still appear in the Records Management site, but only for the migrated record series.

Note also that any pre-configured saved searches from your previous version are not available after an upgrade.

-   **[Upgrading easy access records from pre-2.3.0.8 versions](../tasks/rm-upgrade-2308.md)**  
If you upgrade from a pre-2.3.0.8 version of Records Management, then and additional webscript needs to be run so that easy access records \(previously known as in-place records\) created in pre-2.3.0.8 sites are shown in the search results of users without Records Management permissions.

**Parent topic:**[Alfresco Records Management](../concepts/welcome-rm.md)

