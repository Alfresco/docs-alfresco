---
title: Using Intelligence Services
---

You can configure the data to extract using a folder rule in Alfresco Share, and view the data returned by Amazon AI Services (via the AI Transform Engine) in Alfresco Digital Workspace.

To use the default (i.e. out-of-the-box) configuration of Intelligence Services, follow the **default configuration** steps.

If you plan to use custom recognizers and custom classifiers to enrich your content with custom metadata, follow the **default configuration**, and then the **custom configuration** steps.

> **Note:** Before you can use a custom rendition, make sure that you've trained a custom model, deployed and configured one of the custom implementations listed in [Configure Intelligence Services]({% link intelligence-services/1.4/config/index.md %}).

## Set up a folder rule

You can use the Intelligence Services components by setting up a folder rule and adding text and images to that folder.

### Default configuration: Requesting default AI renditions

Follow these steps to use the default (i.e. out-of-the-box) configuration of Intelligence Services.

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

    1. Select **Request AI renditions**.

    2. Enter one or more renditions in the text field, separated by commas.

        For example, you can add any of the default renditions:

        ```bash
        aiFeatures, aiLabels, aiTextract, aiSpeechToText, webvtt, aiPiiEntities 
        ```

        > **Note:** If you leave the text field empty all of the default renditions will be requested.

8. (Optional) Select options **Rule applies to subfolders** and also apply when **Items are updated**.

    This will apply the rule to your test folder and all its subfolders.

9. Click **Create** to save the rule.

    At this point, your rule has been applied to request the AI renditions and add the selected AI aspects.

    See the Content Services documentation, [Folder rules]({% link content-services/latest/using/content/rules.md %}) to find out more about applying folder rules.

10. Next, upload content to your test folder.

    For example, choose a text file and a PNG or JPG image.

11. Wait for the renditions to complete.

    As an administrator, you can view the logs for the repository, Transform Router, AI Engine, and ActiveMQ/Amazon MQ to monitor the progress.

    See [Troubleshoot Intelligence Services]({% link intelligence-services/1.4/admin/troubleshoot.md %}) for more.

12. Next, [view the AI properties]({% link intelligence-services/1.4/using/index.md %}#view-ai-properties) in Alfresco Digital Workspace.

### Custom configuration: Requesting custom AI renditions

If you're planning to use custom recognizers, custom classifiers, or custom metadata extraction, start by following the steps in the default configuration, and then modify step 7.

1. Add a rule on the folder to request custom AI renditions and extract custom metadata.

    Choose Items are created or enter this folder.

2. Select a rule action to perform.

    1. Add custom AI aspects, for example:

        ![Add configured custom AI aspects]({% link intelligence-services/images/cust-aspects.png %})

        See [Custom AI content model]({% link intelligence-services/1.4/config/comprehend.md %}#custom-ai-content-model) for configured aspects.

    2. Request custom AI renditions, for example:

        ![Request configured custom AI renditions]({% link intelligence-services/images/cust-renditions.png %})

        See [Custom AI rendition definitions]({% link intelligence-services/1.4/config/comprehend.md %}#custom-ai-rendition-definitions) for configured renditions.

    3. For custom metadata extraction (using Textract), request a rendition and add custom AI aspects. For example:

        * Request AI rendition: `aiTextract`
        * Add aspect: `AI Text Lines`
        * Add aspect: `Applicant Info`
        * Add aspect: `w9form`

        See [Custom AI content model (Textract)]({% link intelligence-services/1.4/config/textract.md %}#custom-ai-content-model) for configured aspects.

    > **Note:** The new input field for the `Request AI renditions` action adds the ability to request custom renditions as comma separated rendition names. When left blank, the three default renditions are requested - (i.e. `aiFeatures`, `aiLabels`, and `aiTextract`). This allows you to configure a rule using various combinations, such as:
    >
    > ```bash
    > aiFeatures, aiBusinessCustom, aiBusinessSport
    > ```

## View AI properties

You can view the Intelligence Services properties in Alfresco Digital Workspace.

This example shows you how to view these properties in Digital Workspace.

1. Launch Alfresco Digital Workspace.

2. Locate the demo folder or subfolder, if the folder rule also applies to subfolders, as created in [Set up a folder rule]({% link intelligence-services/1.4/using/index.md %}#set-up-a-folder-rule).

3. Select a file that you uploaded, and click the information icon.

    The Info Drawer shows the AI properties that were extracted by the AI Engine, and saved as AI Data. These are populated by the aspects defined when you created the folder rule in Share.

4. Click **Less information** to show AI Data under the Properties tab, if you can't see it.

5. Expand the AI Data panel to see all the properties that have been added.

    **Searching for content in ADW**

    You can search for content that matches one of the AI aspects, perform a wildcard search (using an asterisk, wildcar*), or phrase match (using double-quotes, "This Phrase").

6. To search for a place in an AI aspect, type `schema:place:<place-name>` in the search field and press **Enter**.

    The search results are displayed.

    Similarly, if you uploaded test images, you can search for `schema:label:<label>`.

    **Searching for custom properties in ADW**

7. To search by a custom property, type `schema:<category>:<content>` in the search field and press **Enter**.

    For example, enter `schema:sport:runner`

## View Transcription

When configured, transcripts of your audio and video files are generated automatically within the Digital Workspace, including indexing and metadata generation which allows you to search their content easier. Captions of the transcripts can be automatically placed on top of the audio and video content, see the images below. For information on how to configure this in the Digital Workspace see [Set up a folder rule]({% link intelligence-services/1.4/using/index.md %}#set-up-a-folder-rule).

**Transcription**
![transcript]({% link intelligence-services/images/text-transcript.png %})

**Caption**
![caption]({% link intelligence-services/images/transcript-caption.png %})

## View PII information

You can detect PII in documents and tag it automatically which enables easier privacy management to comply
with data protection regulations such as General Data Protection Regulation (GDPR). You can also generate metadata automatically to flag PII entities, see the image below. For information on how to configure this in the Digital Workspace see [Set up a folder rule]({% link intelligence-services/1.4/using/index.md %}#set-up-a-folder-rule).

**PII**
![pii]({% link intelligence-services/images/pii.png %})