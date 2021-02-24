---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Versioning, Document Management]
option: extended services versioning
---

# About versioning

Versioning allows you to track content history. By default, content that is created in the repository is not versionable. When creating content, users must specify *versionable* on a case-by-case basis.

When content is versionable, the version history is started. The first version of the content is the content that exists at the time of versioning. If you want all content to be versionable at the instant of creation, you can modify the definition of that content type in the data dictionary. The definition must include the mandatory aspect *versionable*.

By default, all versionable content has auto-version *on*. As a result, when content is updated, the version number is updated. The auto-version capability can be turned off on a content-by-content basis in the user interface. If you want auto-versioning to be *off* for all content, you can modify the definition of that content type in the data dictionary.

-   **[Making all content versionable](../tasks/versionable-make.md)**  
This section describes enabling versioning for all content in the repository.
-   **[Disabling the auto-versioning feature](../tasks/autoversion-disable.md)**  
This section describes how to disable versioning for all content in the repository.

**Parent topic:**[Configuring the repository](../concepts/intro-core.md)

**Related information**  


[Making all content versionable](../tasks/versionable-make.md)

[Disabling the auto-versioning feature](../tasks/autoversion-disable.md)

