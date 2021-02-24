---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: upgrade configure
---

# Configuring an upgrade

This section describes how to configure an upgraded installation of Alfresco.

Before running the server for the first time, check the database connection details and Alfresco data folder locations, and set them according to the environment in which the server is running.

By default, the server creates a data folder for storing content binaries and indexes at a location relative to the caller's location when the server starts. This is appropriate for quick previews and tests, but should be changed when running a server that will be storing long-lived data.

1.  Locate the distribution's configuration files and samples.

2.  Reapply any configuration changes to the new installation in the <extension\> directory.

3.  Open the alfresco-global.properties file. 

4.  Choose a root location for the storage of content binaries and index files.

5.  Adjust the properties to change the database connection details.

6.  Note the choice of JDBC driver used with each connection type.

7.  Choose a Hibernate schema most appropriate to your database.

8.  Save the file.

9.  If you have any customizations \(AMPs, patches, and so on\) in your existing Alfresco installation, do the following:

    1.  Recompile all Java code against the new version of Alfresco and regression test against the new version of Alfresco \(this is best done prior to the upgrade itself, since it could be a lengthy exercise\).

    2.  Reinstall all customizations into the new Alfresco instance.

10. Start the server.


The configuration overrides will ensure that the server immediately directs data to the appropriate locations.

**Parent topic:**[Upgrading](../concepts/ch-upgrade.md)

