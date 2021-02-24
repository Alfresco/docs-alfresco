---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, Alfresco Share]
option: [knowledge base, space template]
---

# Setting up content rules

Adding content rules to your Knowledge Base space template provides pre-wired behavior behind the space.

1.  Make sure you are in the Knowledge Base Project template space. The Archived space should display.
2.  Click More Actions, and select Manage Content Rules from the list. The Content Rules page displays all the rules set up for this space. You will create three rules.

This adds three business rules to your Knowledge Base space template.

**Parent topic:**[Creating a Knowledge Base space template](../tasks/kb-space-template-create.md)

## Rule 1: Apply KB Article Aspect and Tag Draft

This rule automatically applies the `kb:article` aspect to any document that arrives into the Knowledge Base space. It also executes a server-side JavaScript that updates tags on the new content.

1.  In the Content Rules window, click Create Rule.

2.  In Step One - Select Conditions:

    1.  In the Select a condition list, choose All Items.

    2.  Click Add to List.

    3.  Click Next.

3.  In Step Two - Select Actions:

    1.  In the Select a condition list, choose Add aspect to item.

    2.  Click Set Values and Add.

    3.  In the Set action values list, select Knowledge Base Article.

    4.  Click OK.

        The Add aspect Knowledge Base Article is now under Summary in the Selected Rule Actions area.

    5.  In the Select a condition list, choose Execute a script.

    6.  Click Set Values and Add.

    7.  In the Set action values list, select add-and-update-knowledge-base-tags.js.

    8.  Click OK and click Next.

4.  In Step Three - Enter Details:

    1.  In the Type list, select Inbound.

    2.  In the Title field, type Apply KB Article Aspect and Tag draft.

    3.  In the Other Options area, select Apply rule to subspaces.

    4.  Click Finish.


## Rule 2: Apply Move Archived Documents to Archived Folder

This rule automatically moves some items into the Archived folder where the `kb:status` property value is equal to “Archived”.

1.  In the Content Rules window, click Create Rule.

2.  In Step One - Select Conditions:

    1.  In the Select a condition list, choose Items with a specific text value in property.

    2.  Click Set Values and Add.

    3.  In the Property name field, type kb:status.

    4.  Set the Operation to Equals To.

    5.  For the Value field, type Archived.

    6.  Click OK, and then click Next.

3.  In Step Two - Select Actions:

    1.  In the Select a condition list, choose Move item to a specific space.

    2.  Click Set Values and Add.

    3.  Click the link to select a destination, and then click Add \(green icon resembling plus ‘+’ sign\) in the same row as Archived.

    4.  Click OK, and then click Next.

4.  In Step Three - Enter Details:

    1.  In the Type list, select Update.

    2.  In the Title field, type Apply Move Archived Documents to Archived Folder.

    3.  In the Other Options area, select Apply rule to subspaces.

    4.  Click Finish.


## Rule 3: Update Status Tag

This rule automatically executes the server-side JavaScript responsible for updating tags on a document if a document is updated while in the Knowledge Base space.

1.  In the Content Rules window, click Create Rule.

2.  In Step One - Select Conditions:

    1.  In the Select a condition list, choose All Items.

    2.  Click Add to List.

    3.  Click Next.

3.  In Step Two - Select Actions:

    1.  In the Select an action list, choose Execute a script.

    2.  Click Set Values and Add.

    3.  In the Set action values list, select add-and-update-knowledge-base-tags.js.

    4.  Click OK, and then click Next.

4.  In Step Three - Enter Details:

    1.  In the Type list, select Update.

    2.  In the Title field, type Update Status Tags.

    3.  In the Other Options area, select Apply rule to subspaces.

    4.  Click Finish.

    You have created three business rules and wired them in behind your Knowledge Base space template. Now, whenever you work with content inside a Knowledge Base space these rules will be triggered automatically.


