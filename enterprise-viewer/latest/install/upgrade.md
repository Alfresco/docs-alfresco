---
title: Upgrade Alfresco Enterprise Viewer
---

No data model or breaking updates are required to upgrade versions of Alfresco Enterprise Viewer from version 3.3 to version 3.5. The only significant change in this version from an infrastructure point of view is that the Alfresco Enterprise Video Viewer (AEVV, formerly known as OpenAnnotate Video) is now embedded within the Alfresco Enterprise Viewer web application. In version 3.3, AEVV was deployed as a separate web application in its own context.

Follow these steps to upgrade Alfresco Enterprise Viewer 3.3 to 3.5

* Backup previous WARs, Alfresco and Share web directories.
* Follow standard install steps, replacing/backing up previous installation artifacts as needed.
* Remove OpenAnnotate Video standalone web application (OpenAnnotateVideo.war).
* Start up and verify the application is working as expected.

> **Note:** Video link URLs will now change slightly with the newly embedded AEVV web application. Ensure your network settings or previous direct links are updated if necessary.
