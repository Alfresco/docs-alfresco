---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Creating web content

Within a web project, you can create XML, HTML, and Plain Text web content.

Use a web form associated with the project to create XML web content using the Create Web Content Wizard. The resulting content is saved to a path specified within the web form configuration.

If you override the web form selection to create HTML or Plain Text content, the resulting file will be saved to the root directory of the web project.

1.  Navigate to the Sandbox view of the web project you want to work with.

2.  In your user sandbox \(**My Sandbox**\), open the Create Web Content Wizard in one of the following two ways:

    -   Click ![Expand](../images/im-expand.png) to expand the **Web Forms** list, which displays the available web forms. Click **Create Content**for the web form you want to use to create the content.
    -   Click ![Browse Website](../images/im-browsewebsite.png) or **Browse Website** to display the sandbox contents. In the **Create** menu, click **Create Web Content**.
    The Create Web Content Wizard opens.

3.  In Step One, Web Content Details, enter the general properties for the web content being created.

    1.  Enter a name for the file in the **Name** box.

    2.  Leave the **Type** as **Content**.

    3.  In the **Content Type** list, select the type of content you want to create: **HTML**, **Plain Text**, or **XML**.

        If there is no web form associated with the web project, only the options **HTML** and **Plain Text**are available.

        If a web form is associated with the project, selecting **HTML** or **Plain Text** overrides the web form selection. The resulting file does not follow workflow rules configured for the specified web form and the file is saved to the root project directory.

    4.  In the **Web Form** list, select the web form to use to create/generate the web content.

        The message **No Web Forms available** is displayed if web forms have not been specified for this web project.

        When you start the **Create Web Content Wizard** from the **Web Forms** list in the Sandbox view, the **Web Form** list defaults to the selected web form and is not editable.

4.  Click **Next**.

5.  In Step Two, Author Web Content, enter your content.

    The fields and controls presented in this step are dictated by the selected web form. If a web form is not available, enter your content in the editing area provided.

    The symbol ![Required Field](../images/im-required.png) indicates that an entry is required.

    Some controls display a set of icons along the bottom edge of their panel. Use these controls as follows:

    -   **![Add Field](../images/im-addfield.png)**

        add a duplicate empty field immediately beneath the current one

    -   **![Previous Field](../images/im-previousfield.png)**

        move the content from the current field to the one immediately above

    -   **![Next Field](../images/im-nextfield.png)**

        move the content from the current field to the one immediately below

    -   **![Remove Field](../images/im-removefield.png)**

        delete the field, including its contents

6.  Click **Next**.

7.  In Step Three, Summary, select **Submit \[content name\] when wizard finishes** if you no longer intend to work on this content item and wish to immediately submit it.

    When workflow is defined, selecting this option submits the content for review. In this case, the content is available only for preview until approved or rejected. If workflow is defined for both the form and the project, the form workflow is followed. When no workflow is defined, the content is submitted to the Staging Sandbox.

    If you choose not to submit the content as part of the edit process, you can initiate the submit process separately. See [Submitting content items](tuh-wcm-content-submit.md).

    To view the new content before finalizing the task, click ![Preview](../images/im-preview.png).

8.  Click **Finish**.

    If you clicked the **Submit** check box on the Summary page, the Submit Items page is displayed. See [Submitting content items](tuh-wcm-content-submit.md) for details on completing this page.

    When the submit action is not selected, you return to the Sandbox view. The **Modified Items** list in **My Sandbox** displays the newly created web content.


**Parent topic:**[Adding content to a web project](../concepts/cuh-wcm-content-add.md)

