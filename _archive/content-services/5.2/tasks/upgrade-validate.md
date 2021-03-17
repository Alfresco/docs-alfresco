---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Validating an upgrade

Once you have upgraded, follow these steps to validate the new installation.

1.  Restart the Alfresco Content Services server.

    The configuration overrides ensure the server immediately directs data to the appropriate locations.

2.  Monitor the startup log messages for information on the status of the upgrade.

3.  Validate the new installation using a blank repository.

4.  Configure the new installation with a new repository \(not the existing one\).

5.  Verify the database connection details and data folder locations are set according to the environment in which the server is running.

6.  Start Alfresco Content Services and validate the system works correctly.

7.  Shut down Alfresco Content Services.

8.  When you are certain the new installation is thoroughly validated, remove the old installation and repository.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

