---
title: Using Intelligence Services
---

You can configure the data to extract using a folder rule in Alfresco Share, and view the data returned by Amazon AI Services (via the AI Transform Engine) in Alfresco Digital Workspace.

## Set up a folder rule

You can use the Intelligence Services components by setting up a folder rule and adding text and images to that folder.

1. In Alfresco Share create a test folder.

2. Select the folder and click **Manage Rules** to create a folder rule.

3. Click **Create Rules**.

4. Enter a name and a description (optional) for the rule.

5. Select when the rule is triggered.

    Choose Items are created or enter this folder, and (optionally) **Items are updated**. Use the + and - icons to add and remove extra criteria.

6. Select when the rule is applied.

    Add **Content of type or sub-type** is **Content**, as shown.

    ![Select criteria for rule]({% link intelligence-services/images/select-criteria.png %})

7. Select a rule action to perform.

    1. First, select **Add aspect**, then add one or more AI aspects. Use the + and - icons to add and remove extra aspects.

        For example, you can add AI Labels, AI Organizations, AI People, and AI Places.

        To extract data using Amazon Rekognition, select **AI Labels**.

        To extract data using Amazon Comprehend, select the remaining **AI *** aspects.

    2. Select **Request AI renditions**.

8. (Optional) Select options **Rule applies to subfolders** and also apply when **Items are updated**.

    This will apply the rule to your test folder and all its subfolders.

9. Click **Create** to save the rule.

    At this point, your rule has been applied to request the AI renditions and add the selected AI aspects.

    ![Example of a completed rule]({% link intelligence-services/images/completed-rule.png %})

    See the Content Services documentation, [Folder rules]({% link content-services/6.1/using/content/rules.md %}) to find out more about applying folder rules.

10. Next, upload content to your test folder.

    For example, choose a text file and a PNG or JPG image.

11. Wait for the renditions to complete.

    As an administrator, you can view the logs for the repository, Transform Router, AI Engine, and ActiveMQ/Amazon MQ to monitor the progress.

    See [Troubleshoot Intelligence Services]({% link intelligence-services/1.0/admin/troubleshoot.md %}) for more.

12. Next, [view the AI properties]({% link intelligence-services/1.0/using/index.md %}#view-ai-properties) in Alfresco Digital Workspace.

## View AI properties

You can view the Intelligence Services properties in Alfresco Digital Workspace.

This example shows you how to view these properties in Digital Workspace.

1. Launch Alfresco Digital Workspace.

2. Locate the demo folder or subfolder, if the folder rule also applies to subfolders, as created in [Set up a folder rule]({% link intelligence-services/1.0/using/index.md %}#set-up-a-folder-rule).

3. Select a file that you uploaded, and click the information icon.

    The Info Drawer shows the AI properties that were extracted by the AI Engine, and saved as AI Data. These are populated by the aspects defined when you created the folder rule in Share.

4. Click **Less information** to show AI Data under the Properties tab, if you can't see it.

5. Expand the AI Data panel to see all the properties that have been added.

    **Searching for content in ADW**

    You can search for content that matches one of the AI aspects, perform a wildcard search (using an asterisk, wildcar*), or phrase match (using double-quotes, "This Phrase").

6. To search for a place in an AI aspect, type `schema:place:<place-name>` in the search field and press **Enter**.

    The search results are displayed.

    Similarly, if you uploaded test images, you can search for `schema:label:<label>`.
