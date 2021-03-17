---
author: Alfresco Documentation
---

# server

The `server` object provides metadata describing the host server in which the web script is currently running.

Server metadata is accessed through the following properties of the `server` object.

|`versionMajor`|\(Read-only string\) Server major version number; for example 1.2.3|
|`versionMinor`|\(Read-only string\) Server minor version number; for example 1.2.3|
|`versionRevision`|\(Read-only string\) Server revision number; for example 1.2.3|
|`versionLabel`|\(Read-only string\) Server version label; for example, Dev.|
|`versionBuild`|\(Read-only string\) Server build number; for example, build-1|
|`version`|\(Read-only string array\) Server version; for example, major.minor.revision \(label\)|
|`edition`|\(Read-only string\) Server edition, such as 'Enterprise' or 'Community'|
|`schema`|\(Read-only string\) Server schema; for example, 10|

**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

