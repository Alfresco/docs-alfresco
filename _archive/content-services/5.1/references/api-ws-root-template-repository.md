---
author: Alfresco Documentation
---

# Root objects available in repository tier templates

This information lists root objects that are additionally available to template code running in the repository tier.

The following root objects are additionally available to templates running in the repository tier:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`roothome`|Object|The repository root node \(only available if access has been authenticated\).|
|`companyhome`|Object|The company home folder \(only available if access has been authenticated\).|
|`person`|Object|The person node of the currently authenticated user \(only available if user has been authenticated\).|
|`userhome`|Object|The user home folder \(only available if access has been authenticated\).|

**Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference](API-JS-rootscoped.md).

**Parent topic:**[Web Scripts](../concepts/ws-reference.md)

