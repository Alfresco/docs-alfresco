---
title: Configure Glacier Connector
---

You can configure rules in Alfresco Content Services and Alfresco Governance Services that archive or restore your files when using Amazon S3 Glacier.

## Creating a rule for archiving files

To archive files to Amazon S3 Glacier, you need to create a rule for your archive folder in Alfresco Content Services or Alfresco Governance Services that indicates you want to archive its content.

> **Note:** Once a file has been archived to Amazon S3 Glacier, the only information available to you in Alfresco Content Services or Alfresco Governance Services is the metadata of the file. You will receive a message that informs you that the content is being archived. Only when a file has been restored does it become available again.

1. Login to Alfresco Content Services.

2. Create a folder that you can use as your archive folder.

    Anything moved here will be archived to Amazon S3 Glacier.

    > **Note:** Creating an archive folder for a Records Management site in Alfresco Governance Services has a minor limitation. See [Glacier Connector FAQs]({% link aws-glacier/2.0/using/index.md %}) for more details.

3. Select **More** for the new folder and then click **Manage Rules**.

4. Click **Create Rules**.

5. Enter a name for the new rule.

6. Define your rule and select **Archive to AWS Glacier** from the **Perform Action** list.

     For more information see the Alfresco Content Services documentation, [Creating a rule]({% link content-services/6.2/using/content/rules.md %}).

7. Select **Run rule in background**.

8. Click **Create**.

## Creating a rule for restoring files

To restore files from Amazon S3 Glacier, you need to create a rule for your restore folder in Alfresco Content Services or Alfresco Governance Services. When the file is restored you will see the content of the file, otherwise you will see a message stating the file is being archived or pending restoration.

1. Log in to Alfresco Content Services.

2. Create a folder that you can use as your restore folder.

    Anything you request to be restored will be moved here.

    > **Note:** Creating a restore folder for a Records Management site in Alfresco Governance Services has a minor limitation. See [Glacier Connector FAQs]({% link aws-glacier/2.0/using/index.md %}) for more details.

3. Select **More** for the new folder and then click **Manage Rules**.

4. Click **Create Rules**.

5. Enter a name for the new rule.

6. Define your rule and select **Restore from AWS Glacier** from the **Perform Action** list.

    For more information see the Alfresco Content Services documentation, [Creating a rule]({% link content-services/6.2/using/content/rules.md %}).

7. Select **More** for the new folder and then click **Manage Rules**.

8. Click **Create Rules**.

9. Enter a name for the new rule.

10. Define your rule and select **Restore from AWS Glacier** from the **Perform Action** list.

11. Select your restoration tier.

    For more information on tiers see [Amazon S3 Glacier retrieval tiers]({% link aws-glacier/2.0/index.md %}#retrieval-tiers).

12. Enter a number of days in the **Expiration in days** field.

    Enter how many days you want access to a restored file for, once it has been restored.

13. Select **Run rule in background**.

14. Click **Create**.
