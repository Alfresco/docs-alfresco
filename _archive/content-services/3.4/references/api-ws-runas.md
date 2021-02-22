---
author: [Alfresco Documentation, Alfresco Documentation]
source: Community web scripts
audience: 
category: [API/Script, Web Script]
option: [web script, run as]
---

# Run As

The `Run As` option allows a web script developer to state that the execution of a web script must run as a particular Alfresco content repository user, regardless of who initiated the web script.

This is useful where the behavior of the web script requires specific permissions to succeed. Due to security concerns, the `Run As` option is only available for web script implementations placed into the Java classpath.

The user to run as is specified through the `runas` attribute of the `<authentication>` element of the web script descriptor. For example:

```
<webscript>
  <shortname>Example Run As Usage</shortname>
  <url>/runas</url>
  <authentication **runas="admin"**>user</authentication>
</webscript>
```

Here, the web script still requires a user to authenticate before execution; however, the web script executes as the `admin` user. Content repository features, such as auditing, still reflect the user who initiated the web script.

**Parent topic:**[Advanced options](../references/api-ws-AdvancedOptions.md)

