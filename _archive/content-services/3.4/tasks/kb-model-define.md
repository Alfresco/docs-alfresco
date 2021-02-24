---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: [knowledge base, content model]
---

# Defining a content model for metadata

A content model for Knowledge Base metadata requires a namespace URI and prefix.

1.  Define a namespace URI.

    For example:

    http://www.alfresco.org/model/knowledgebase/1.0

2.  Define a prefix to use.

    For example:

    `kb`

    The prefix must be unique and should be short.


With a URI and prefix, you can reference anything you define in the model using the `kb` prefix. This lets you define things inside the model, such as Knowledge Base spaces and articles.

-   **[Defining a Knowledge Base space](../tasks/kb-space-define.md)**  
 Knowledge Base articles are authored and managed in a Knowledge Base space. An Alfresco space is a container that behaves like a folder, but can include custom business logic and behavior.
-   **[Defining Knowledge Base articles](../tasks/kb-article-define.md)**  
A Knowledge Base article is a document, such as a Word document, PDF, or text file submitted by a knowledge expert. You can define metadata to wrap this Knowledge Base article for storing things on the document that are not part of the document’s internal representation, such as an internal representation of the lifecycle state \(draft, pending approval, and so on\), or a field that indicates the type of document.
-   **[Applying property constraints](../tasks/kb-constraints-apply.md)**  
Property constraints let you specify checks that must pass before the property value is considered valid and safe for persistence. Constraints fire when the property values change. A content item must have all of its constraints pass before it can be created or saved.

**Parent topic:**[Getting started](../concepts/kb-about.md)

