---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: Knowledge Base
option: knowledge base
---

# Defining a Knowledge Base space

Knowledge Base articles are authored and managed in a Knowledge Base space. An Alfresco space is a container that behaves like a folder, but can include custom business logic and behavior.

You can define a Knowledge Base space as a content type inside your content model and extend it from `cm:folder`, an out-of-the-box content type provided by the Alfresco repository. Inheriting from `cm:folder` provides the Knowledge Base space with what it needs to behave like a folder. You can then plug in additional properties.

-   The following XML defines a Knowledge Base space content type called `kb:space`:

    ```
    <types> 
      <type name="kb:space">
        <title>Knowledge Base Space</title>
        <parent>cm:folder</parent>
      </type> 
    </types>
    ```


Having your own content type for the Knowledge Base space lets you:

-   Add metadata to the Knowledge Base space, such as properties or associations.
-   Plug aspects onto the space so you can add your own Java code to intercept events that occur to the folder, for example, when someone adds content into it.
-   Inform Alfresco Explorer, Share, or your own custom web applications to treat this folder uniquely. For example, you can easily configure Alfresco Explorer to show a different icon for this folder.

**Parent topic:**[Defining a content model for metadata](../tasks/kb-model-define.md)

