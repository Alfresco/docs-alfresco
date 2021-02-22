---
author: Alfresco Documentation
---

# `remove`

`remove()` this method deletes the node.

Note: Any unsaved property changes will be lost when this method is called. To preserve property changes call [save\(\)](API-JS-node-save.md) first.

## Returns

Returns true on success, or false otherwise.

## Example

Any variable or references to the ScriptNode should be discarded. For example:

`mynode.remove();`

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

