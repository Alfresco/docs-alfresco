---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Applying rules to folders

In the library you can define folder rules to manage your content automatically. You can come up with many creative solutions to make sure specific content processes are automated all without you having to do the work yourself.

Rules dictate how content entering, leaving, or currently residing in a folder is managed.

There are three parts to a content rule:

-   The event that triggers the rule
-   The conditions the content has to meet
-   The action performed on the content

The events that can trigger a rule are:

-   A content item arrives in the folder
-   A content item leaves the folder \(it's moved or deleted\)
-   A content item in the folder is modified

Here are some examples of how you can use rules to automate repetitive tasks:

-   All files placed in the *Drafts* folder are versioned
-   All files placed in the *Drafts* folder become part of a simple workflow
-   All files placed in the *Completed* folder that have the tag *final* will be moved to the folder *Archived*
-   All GIF files placed in the *Images* folder will be transformed to PNG files
-   All presentation documents placed in the *Published* folder will be transformed to Flash and copied to the *Assets* folder

  

-   **[Defining rules for a folder](../tasks/library-folder-rules-define.md)**  
Use folder rules to manage your files automatically. There are two ways to define rules: create your own rules or link to rules already created for a different folder.
-   **[Working with a set of rules](../concepts/library-folder-rules-defined.md)**  
You can easily view and maintain the individual rules that makes up the rule set. You can add, edit, and delete rules, make a rule inactive, and change the run order. You can also manually run rules.
-   **[Working with linked rules](../concepts/library-folder-rules-linked.md)**  
When a folder has linked rules there are less editing options than when it has its own set of rules. You can either link to a different rule set or you can break the link completely.

**Parent topic:**[Alfresco content](../concepts/library-intro.md)

