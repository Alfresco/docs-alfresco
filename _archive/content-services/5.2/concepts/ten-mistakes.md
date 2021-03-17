---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: reference
---

# Common mistakes made by administrators

Avoid these common mistakes when administering an Alfresco Content Services environment.

1.  Not keeping extended configurations and customizations separate in the shared directory. Do not put them in the configuration root. If you do, you will lose them during upgrades.
2.  Not ensuring that the database driver is copied to the application server lib directory when installing.
3.  Not testing the backup strategy.
4.  Making changes to the system without testing them thoroughly on a test and pre-production machine first.
5.  Failing to set the `dir.root` property to an absolute path location.
6.  Not fully shutting down a running instance of Alfresco Content Services, so the next time you try and start it, Alfresco Content Services says: Address already in use: JVM\_Bind:8080 \(especially on Linux\).

**Parent topic:**[Administrator best practices](../concepts/admin-best-practice.md)

