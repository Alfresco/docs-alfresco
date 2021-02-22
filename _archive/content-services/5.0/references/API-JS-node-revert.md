---
author: Alfresco Documentation
---

# `revert`

`revert` reverts node to the specified version.

**Parent topic:**[Modifying and creating API](../references/API-JS-ModifyCreate.md)

## `revert(history, majorVersion, versionLabel)`

`revert(history, majorVersion, versionLabel)` this method reverts the node to the specified version.

The node must have the `cm:versionable` aspect. The node will be checked out if required and will be checked in after the call. This method does not attempt to perform a deep revert of associations.

### Parameters

-   **history**

    A revision history note.

-   **majorVersion**

    If set to true the method will try to save the changes as a major version increment. If false will save as a minor version increment.

-   **versionLabel**

    The version label to revert from.


### Returns

ScriptNode

Returns the original node that was checked out if reverted, or null if the specified version does not exist.

## `revert(history, majorVersion, versionLabel, deep)`

`revert(history, majorVersion, versionLabel, deep)` revert this node to the specified version and potentially all child nodes.

The node must have the aspect `cm:versionable`. The node will be checked out if required, and checked in on completion of the call.

### Parameters

-   **history**

    A revision history note.

-   **majorVersion**

    If set to true the method will try to save the changes as a major version increment. If false will save as a minor version increment.

-   **versionLabel**

    The version label to revert from.

-   **deep**

    If set to true the method will perform a deep revert. If set to false a deep revert will not be performed, and only the current node will be reverted.


### Returns

ScriptNode

Returns the original node that was checked out if reverted, or null if the specified version does not exist.

