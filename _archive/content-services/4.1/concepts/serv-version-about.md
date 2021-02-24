---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Document Management, Services, Versioning]
option: Versioning
---

# Versioning service

The Versioning service manages versions of individual content nodes. To enable versioning behavior, you must apply the `versionable` aspect to the node.

Each version has a version number that is allocated sequentially and follows a similar strategy to Concurrent Versions System \(CVS\) version numbering. Generally, this version number is only used internally; the version label publicly identifies the version. The version label is calculated from the version number and gives a unique label for the version. This label is placed in the versionable aspect to indicate the related current version for a node.

There are various methods relating to the Versioning service:

-   **`Create Version`**

    Create a new version of the referenced node at the end of the appropriate version history. Create a version history as the initial version if the node has none.


-   **`Version History`**

    Get the version history that relates to the referenced node.


-   **`Get Current Version`**

    Get the current version for a referenced node.


-   **`Revert`**

    Revert the state of a referenced node to that of a previous node.


-   **`Restore Version`**

    Restore a previously deleted node from a version in its version history.


-   **`Delete Version History`**

    Delete the version history for a versioned node.


**Parent topic:**[Content repository services](../concepts/serv-repo-about.md)

**Related information**  


[About versioning](../concepts/versioning.md)

[Making all content versionable](../tasks/versionable-make.md)

[Disabling the auto-versioning feature](../tasks/autoversion-disable.md)

