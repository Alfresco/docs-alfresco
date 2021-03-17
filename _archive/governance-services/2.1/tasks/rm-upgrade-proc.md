---
audience: 
---

# Upgrading Records Management

This section describes the procedure for upgrading your Enterprise Records Management installation.

The recommended path for upgrading Records Management is from Version 4.1.x to Version 4.2.2.

Once you are running version 4.1.x, use the standard upgrade process for Alfresco to upgrade to 4.2.2, and then when the Alfresco installation is upgraded, you can apply the new AMP files for Records Management 2.1.

1.  Ensure that your current Records Management production environment is running an Alfresco version that is supported for upgrading.

2.  Download Alfresco Version 4.2.2 and the Records Management AMP zip from the [Support Portal](http://support.alfresco.com).

3.  Upgrade to Alfresco Enterprise 4.2.2.

    You may wish to start the Alfresco server at this point to verify that the upgrade was successful.

4.  Apply the Records Management 2.1 AMPs to the upgraded Alfresco installation.

    Follow the instructions in [Applying the Records Management AMP files](rm-amp-install.md)

5.  Restart the Alfresco server, if it is already running.

6.  Log in to Share to view the Records Management data.


Your existing Records Management data is migrated to 4.2.2.

When you upgrade from a previous version of Records Management to the Version 2.1 install, any existing Records Management data is preserved \(it is 'patched' in the same way as updated data in the server\). The File Plan structures will appear as they did in 1.0 and the previous Records Management site is migrated. Therefore, you do not need to create the Records Management site again.

In 2.1 you cannot create a record series; instead you create a record category with no disposition schedule. The record series is retained as a deprecated model construct to be used when migrating existing record series from a 1.0 installation. This means that any previously created record series will appear and behave as record categories in 2.1, but will be of the deprecated type record series \(directly extended from record category\). If any custom data was defined for record series in 1.0, this will still appear in the Records Management site, but only for the migrated record series.

Note also that any pre-configured saved searches from your previous version are not available after an upgrade.

**Parent topic:**[Installing Records Management](../tasks/rm-install-proc.md)

