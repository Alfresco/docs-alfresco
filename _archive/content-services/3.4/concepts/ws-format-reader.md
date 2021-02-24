---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
option: [web script, format reader]
---

# Format readers

The Web Script Framework provides out-of-the-box format readers.

-   **JSON** parses a request of MIME type `application/json` into a root object named `json`
-   **Atom Feed** parses a request of MIME type `application/atom+xml;type=feed` into a root object named `feed` whose type is an `Apache Abdera Feed` object
-   **Atom Entry** parses a request of MIME type `application/atom+xml;type=entry` into a root object named `entry` whose type is an `Apache Abdera Entry` object
-   **Atom** parses a request of MIME type `application/atom+xml` into a root object named either `feed` \(`Apache Abdera Feed`\) or `entry` \(`Apache Abdera Entry`\), depending on the request content

**Parent topic:**[Web Script Framework](../concepts/ws-framework.md)

