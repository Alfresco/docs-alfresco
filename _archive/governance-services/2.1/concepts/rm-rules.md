---
author: Alfresco Documentation
audience: [, ]
category: 
option: 
---

# Automating the File Plan

In the File Plan you can define category and folder rules to manage your content automatically. You can come up with many creative solutions to make sure specific content processes are automated so you don't have to do the work yourself.

Rules dictate how content entering, leaving, or currently residing in a category or folder is managed.

There are three parts to a content rule:

-   The event that triggers the rule
-   The conditions the content has to meet
-   The action performed on the content

The events that can trigger a rule are:

-   A content item arrives in the folder
-   A content item leaves the folder \(it's moved or deleted\)
-   A content item in the folder is modified

Here are some examples of how you can use rules to automate repetitive tasks:

-   All records without a record type placed in a category are associated with a specific record type
-   All incomplete records placed in a folder are completed
-   All records that are cutoff in a folder have the event Case Closed completed
-   All folders created in a specific category are set to frozen

-   **[Defining rules for a category or folder](../concepts/rm-rules-define.md)**  
Use rules to manage your File Plan content automatically. There are two ways to define rules: create your own rules or link to rules already created for a different category or folder.
-   **[Working with a set of rules](../concepts/rm-rules-defined.md)**  
You can easily view and maintain the individual rules that makes up the rule set. You can add, edit, and delete rules, make a rule inactive, and change the run order. You can also manually run rules.
-   **[Working with linked rules](../concepts/rm-rules-linked.md)**  
When a category or folder has linked rules there are less editing options than when it has its own set of rules. You can either link to a different rule set or you can break the link completely.

**Parent topic:**[Using Records Management](../concepts/rm-intro.md)

