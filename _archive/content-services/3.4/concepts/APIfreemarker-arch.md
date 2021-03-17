---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# Template framework architecture

Templates are widespread throughout Alfresco: they are used within the repository core to generate emails and activities, in the Explorer client to build custom views, at the remote REST API layer, and also as the default rendering mechanism for the web script and Surf frameworks.

Multiple template engines are supported, with FreeMarker as the default. The template engine is not tied to any output file format: templates can output entire HTML files as well as snippets of HTML, XML, JSON, or any other format desired. This makes them extremely flexible and appropriate for developing all kinds of solutions with Alfresco.

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/APIfreemarker-intro.md)

