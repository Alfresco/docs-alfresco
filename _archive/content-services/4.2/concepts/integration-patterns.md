---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Integration]
keyword: [integration, patterns]
---

# Content management integration patterns

Applications that use Alfresco can use a set of common patterns to access content. This list of suggested patterns is provided to help you manage your application development.

-   **[Content Service Mappers](../concepts/integration-mappers.md)**  
Not all applications work exclusively with Alfresco APIs. Sometimes there are standardized Service Provider Interfaces to which a content management system provides an implementation. These are often protocol-based services to provide language neutrality and to naturally balance the load between the application and the CMS. Services typically include authentication, query, folder navigation, CRUD \(Create, Read, Update, Delete\) operations, content transfer, and versioning. These services are abstract and mapped onto the Alfresco native APIs.
-   **[Property View](../concepts/integration-propview.md)**  
A Property view is a building block of any Alfresco application. A Property view presents information about a content object based on the content object’s ID.
-   **[Article](../concepts/integration-article.md)**  
An article pattern is a single content object used in relation to the context of an application or website to present relevant and rich information to the user.
-   **[Query view](../concepts/integration-query.md)**  
A Query view is a general-purpose pattern that generates very application-specific views for accessing sets of content and presenting a consistent set of metadata about that set.
-   **[Browser view](../concepts/integration-browser.md)**  
A Browser view generates a file system explorer–like view on top of the repository.
-   **[Librarian](../concepts/integration-librarian.md)**  
A Librarian is a specialized browser that controls the content in a hierarchical view. Because the primary context for content in an Alfresco repository is the folder/space hierarchy, the Browser view is the natural place to put library type controls.
-   **[Catalog view](../concepts/integration-catalog.md)**  
A Catalog view is a Query view or a specialized Browser view used to present a list of items to act upon, such as purchasing the item being presented.
-   **[Attachment](../concepts/integration-attachment.md)**  
An attachment is a document logically attached to a business object in an application, such as an invoice, a contract, or a quality control report. The attachment is important in the process in which the business object is involved, providing documentation such as transactional information or quality data. The attachment may be added outside the application, such as in Alfresco Share with a Share extension, or it may be added by the application, either by adding the content directly or using a browser to find existing content. The attachment is generally available when users access or browse the business object.
-   **[Annotation](../concepts/integration-annotation.md)**  
An annotation is a piece of user-generated content that annotates an object, such as a document, web page, or article, with information or comments regarding that object.
-   **[Archive](../concepts/integration-archive.md)**  
An archive is a repository for the long-term storage and control of information that must be retained for operational or regulatory reasons.
-   **[Project Space](../concepts/integration-projectSpace.md)**  
A Project Space is a place for users of an application to share ideas, comments, documents, emails, and other information.
-   **[Review and Approval workflow](../concepts/integration-workflow.md)**  
A Review and Approval workflow is similar to a Project Space but is focused on tracking the review of critical documents in a review process.
-   **[Feed](../concepts/integration-feed.md)**  
Some applications can access or track content using RSS feeds. Some examples are mail clients, feed readers, or portals that have feed readers built in.
-   **[Portlet view](../concepts/integration-portlet.md)**  
Many Alfresco installations use Alfresco in conjunction with portals, such as Liferay. Portals provide a page view composed of individual windows called portlets, which aggregate and assemble information according to a user’s preference. Content from content management systems is often some of the most important information that comes through a portal in the form of corporate news, key business decisions, changes in plans or products, or policies and procedures.

**Parent topic:**[Alfresco Integration](../concepts/integration-options.md)

