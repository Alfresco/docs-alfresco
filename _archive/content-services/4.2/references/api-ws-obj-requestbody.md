---
author: Alfresco Documentation
---

# requestbody

A root object which encapsulates data posted to the web script.

When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by the web script. To allow access to the request body, the Web Script Framework provides a special root object named `requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access to the request content either as a string or as a content stream.

**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

[Posting data to a web script tutorial.](../tasks/ws-request-process.md)

