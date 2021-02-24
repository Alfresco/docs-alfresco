---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade validate
---

# Validating an upgrade

Once you have upgraded, follow these steps to validate the new installation.

1.  Restart the Alfresco server.

    The configuration overrides ensure the server immediately directs data to the appropriate locations.

2.  Monitor the startup log messages for information on the status of the upgrade.

3.  Validate the new installation using a blank repository.

4.  Configure the new installation with a new repository \(not the existing one\).

5.  Verify the database connection details and Alfresco data folder locations are set according to the environment in which the server is running.

6.  Start Alfresco and validate the system works correctly.

7.  Shut down Alfresco.

8.  When you are certain the new installation is thoroughly validated, remove the old Alfresco installation and repository.


**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

