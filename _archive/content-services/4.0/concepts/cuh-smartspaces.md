---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Working with smart spaces and content rules

One of the key benefits of Alfresco is the ability to define rules that affect content within a space. A space with one or more defined content rules is called a *smart space*.

A content rule is made up of three main elements:

-   The conditions on the content for the rule to match
-   The actions that are performed on the content
-   The rule type, which indicates the event that triggers the rule

A rule can be triggered by one of the following events:

-   Content arrives in the space
-   Content leaves the space because it is moved or deleted
-   Content is modified

There is no limit to the number of conditions that can be applied to each rule.

You can define rules to provide creative solutions to automation and management of content. Rules are applied when content moves in or out of a space and may also apply to content directly in the space or in sub spaces. For example, you could set up rules to manage content in the following ways:

-   All content items placed in the Drafts space are versioned
-   All content items placed in the Drafts space become part of a simple workflow \(see [Implementing a simple workflow](../tasks/tuh-workflow-simple.md)\)
-   All presentation documents placed in the Published space will be transformed to Flash and copied to the Assets space

When a rule is created for a space, it applies to all files that are added to the space after the creation of the rule. Files residing in the space before the rule was created are not affected by the rule.

-   **[Creating a content rule](../tasks/tuh-contentrule-create.md)**  
Create a content rule to automatically perform actions on content items within the space that meet certain conditions.
-   **[Deleting a content rule](../tasks/tuh-contentrule-delete.md)**  
If you no longer need an existing content rule, you can delete it.
-   **[Editing a content rule](../tasks/tuh-contentrule-edit.md)**  
You can edit a content rule unless it is inherited from a parent space.
-   **[Viewing content rules](../tasks/tuh-contentrule-view.md)**  
You can view rules in a space based on where they have been created.
-   **[Managing content rules](../concepts/cuh-rules-manage.md)**  
Content rules can be applied directly to a space or they can be inherited from a parent space. You manage the content rules at the space level.

**Parent topic:**[Using Alfresco](../concepts/cuh-usingapplication.md)

