---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, server object]
---

# server

The `server` object provides metadata describing the host Alfresco server within which the web script is currently being executed.

Server metadata is accessed through the following properties of the `server` object.

|`versionMajor`|\(Read-only string\) Server major version number; for example 1.2.3|
|`versionMinor`|\(Read-only string\) Server minor version number; for example 1.2.3|
|`versionRevision`|\(Read-only string\) Server revision number; for example 1.2.3|
|`versionLabel`|\(Read-only string\) Server version label; for example, Dev.|
|`versionBuild`|\(Read-only string\) Server build number; for example, build-1|
|`version`|\(Read-only string array\) Server version; for example, major.minor.revision \(label\)|
|`edition`|\(Read-only string\) Server edition; for example, Enterprise|
|`schema`|\(Read-only string\) Server schema; for example, 10|

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

