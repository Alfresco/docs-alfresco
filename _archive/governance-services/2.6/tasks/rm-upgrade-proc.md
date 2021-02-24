---
audience: 
---

# Upgrading

To upgrade Records Management you need to make sure you're running the correct version of Alfresco Content Services.

Check the [Supported Platforms](http://docs.alfresco.com/5.2/concepts/supported-platforms-ACS.html) and the [Alfresco Content Services upgrade paths](http://docs.alfresco.com/5.2/concepts/upgrade-path.html).

**Note:** If upgrading directly from Alfresco Records Management 2.3.2 ensure you have created an 'rm' site first before upgrading. If you don't do this an error will occur.

When your Alfresco Content Services installation is upgraded, you can apply the new AMP files for Alfresco Records Management.

1.  Ensure that your current Records Management production environment is running an Alfresco version that is supported for upgrading.

2.  Download Alfresco Content Services 5.2.2 and the Records Management AMP zip from the [Support Portal](http://support.alfresco.com).

3.  Download Alfresco Content Services and the Records Management AMP zip.

4.  Upgrade to Alfresco Content Services 5.2.2.

    For more information about upgrading, see [Upgrading Alfresco](http://docs.alfresco.com/5.2/concepts/ch-upgrade.html).

    You can start the Alfresco server at this point to verify that the upgrade was successful.

5.  Upgrade Alfresco Content Services.

    For more information about upgrading Alfresco Content Services, see [Upgrading Alfresco](http://docs.alfresco.com/community/concepts/ch-upgrade.html).

    You can start the Alfresco server at this point to verify that the upgrade was successful.

6.  Apply the Alfresco Records Management to the upgraded Alfresco Content Services installation.

    Follow the instructions in [Applying the Records Management AMP files](rm-amp-install.md).

    **Note:** If you have easy access records \(previously know as in-place records\) that are pre-2.3.0.8 versions of Records Management, then you also need to [run a webscript](rm-upgrade-2308.md) so that easy access records created in pre-2.3.0.8 sites are shown in the search results of users without Records Management permissions.

7.  Restart the Alfresco Content Services server, if it is already running.

8.  Log in to Alfresco Share to view the Records Management data.


Your existing Records Management data is migrated to Alfresco Content Services.

When you upgrade from a previous version of Records Management to the Alfresco Records Management install, any existing Records Management data is preserved \(it is 'patched' in the same way as updated data in the server\). The File Plan structures will appear as they did in 1.0 and the previous Records Management site is migrated. Therefore, you do not need to create the Records Management site again.

From Records Management 2.0 onwards you cannot create a record series; instead you create a record category with no retention schedule. The record series is retained as a deprecated model construct to be used when migrating existing record series from a 1.0 installation. This means that any previously created record series will appear and behave as record categories in 2.2, but will be of the deprecated type record series \(directly extended from record category\). If any custom data was defined for record series in 1.0, this will still appear in the Records Management site, but only for the migrated record series.

Note also that any pre-configured saved searches from your previous version are not available after an upgrade.

-   **[Upgrading easy access records from pre-2.3.0.8 versions](../tasks/rm-upgrade-2308.md)**  
If you upgrade from a pre-2.3.0.8 version of Records Management, then an additional webscript needs to be run so that easy access records \(previously known as in-place records\) created in pre-2.3.0.8 sites are shown in the search results of users without Records Management permissions.

**Parent topic:**[Records Management](../concepts/welcome-rm.md)

