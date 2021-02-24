---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Web Script, API/Script]
keyword: [web script, response template]
---

# Accessing the model

Response templates have access to the model created by the controller script. Each named value added to the model is accessible as a template root object by its respective model name.

Your Folder Listing controller script placed two values into the model: one named folder, a folder object, and the other named verbose, a boolean. Your response template uses these two values to drive the rendered output on the response:

```
...
Contents of folder ${folder.displayPath}/${folder.name}
. . .
<#list folder.children as child>
. . .
<#if verbose>
. . .
</#if>
</#list>
...
```

The `folder` object renders properties of the folder and iterates through its children while the `verbose` flag determines if extra detail should be output.

**Parent topic:**[Creating a response template](../tasks/ws-respTemp-create.md)

