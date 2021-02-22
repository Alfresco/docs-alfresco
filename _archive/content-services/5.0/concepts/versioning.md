---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# About versioning

Versioning allows you to track content history. By default, content that is created in the repository is not versionable. When creating content, users must specify `versionable` on a case-by-case basis.

When content is versionable, the version history is started. The first version of the content is the content that exists at the time of versioning. If you want all content to be versionable at the time of creation, you can modify the definition of that content type in the data dictionary. The definition must include the mandatory aspect `versionable`.

By default, all versionable content has auto-version set to `on`. As a result, when content is updated, the version number is updated.

The auto-version capability can be disabled on a content-by-content basis in the user interface. If you want auto-versioning to be `off` for all content, you can modify the definition of that content type in the data dictionary.

**Note:** Any properties that you set on a file are saved with the current version of a file, and written to the Version History after a major update; for example, when a new file is uploaded. This means that if you save properties in version 1.0, they are saved in the Version History of version 1.1.

To change this behavior, you can set `cm:autoVersionOnUpdateProps` to true. See [VersionHistoryNode API](../references/API-FreeMarker-VersionHistoryNode.md) for more information.

-   **[Making all content versionable](../tasks/versionable-make.md)**  
Edit the contentModel.xml file to enable versioning for all content in the repository.
-   **[Disabling the auto-versioning feature](../tasks/autoversion-disable.md)**  
This section describes how to disable versioning for all content in the repository.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

