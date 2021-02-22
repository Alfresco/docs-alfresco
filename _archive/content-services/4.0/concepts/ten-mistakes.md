---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: reference
---

# Common mistakes made by Alfresco administrators

This section lists the most common mistakes to avoid when administering an Alfresco environment.

1.  Not copying the Enterprise license. Administrators often forget to do this before the trial period expires, resulting in a system that goes into read-only mode.
2.  Not keeping extended configurations and customizations separate in the shared directory. Do not put them in the configuration root. If you do, you will lose them during upgrades.
3.  Not ensuring that the database driver is copied to the application server lib directory when installing.
4.  Not testing the backup strategy.
5.  Making changes to the system without testing them thoroughly on a test and pre-production machine first.
6.  Failing to set the `dir.root` property to an absolute path location.
7.  Not fully shutting down a running instance of Alfresco, so the next time you try and start it, Alfresco says: Address already in use: JVM\_Bind:8080 \(especially on Linux\).

**Parent topic:**[Administrator best practices](../concepts/admin-best-practice.md)

