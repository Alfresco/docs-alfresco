---
title: Working with Azure Immutable Blob (WORM) Storage
---

You can use the Azure Immutable Blob (WORM) Storage by creating a Rule and an Action in Governance Services.

WORM storage (Immutable Blob Storage) is an Azure Blob Storage capability allows you to store objects using the write once, 
read many (WORM) model. Records moved to WORM storage use an Azure Blob Storage Container that is configured to support object locking . 
The movement of records is controlled through record folder rules and actions. You use the WORM model 
where it is a requirement that your data is not changed once it has been written to disk. This may be a requirement of 
yours due to regulatory compliance in the governmental, financial, or healthcare sectors.

The movement of records to WORM storage and through to disposition can be fully automated. A folder rule is configured 
to test records for the classification that requires WORM storage. This may be based on when a records enters a folder 
or complex meta data conditions. When triggered the rule causes the Object Lock action to be initiated in Azure Blob Storage. 
This action is configured with the required WORM retention period in days. For records that are moved to WORM locked 
storage any retention schedules that may have been applied are interrupted. At the end of the required retention period 
in WORM storage the records are automatically returned to the original default Azure Blob container to allow normal record operations 
to re-commence, including the application of retention schedules and disposition.

While retained in WORM storage additional controls are applied to prevent any user including administrators from deleting 
the records. Adding records to one or more legal holds during the WORM storage retention period causes the Azure Blob Storage legal 
hold flag to be set on the record in Azure Blob Storage. This prevents deletion or editing of the record in Azure Blob Storage even if the 
WORM retention period has expired. Once the record has been removed from all legal holds it was added to, the legal hold 
flag is cleared and the record can be removed from the WORM container once the retention period has expired.

There is some configuration required before you can use this feature. For more see 
[Creating a container in Azure Blob Storage for use as WORM storage](#createcontainerforworm).

Once you have created the container in Azure Blob Storage for use as WORM storage you can use it as storage. For more see 
[Using WORM storage](#usingworm).

Although the content of a WORM-locked record will be protected against modifications, any copies of WORM-locked records 
in other record folders will be stored using the rules for that folder. Consequently, copies of records may not be protected 
by the same restrictions.

You are unable to reject a Record that is stored in WORM storage and you can't move Records that are stored in WORM storage.

## Configuring a storage account and creating a storage container in Azure for use as WORM storage {#createcontainerforworm}

These steps describe how to use the Azure Portal to create a storage container for use as WORM storage 
(Azure Blob Level Immutability) in Azure. Once you have created the container you can create rules for a category or folder to 
store your data using WORM storage.

For more on creating rules see [Creating a rule]({% link governance-services/latest/using/automate-fileplan.md %}#creating-a-rule).

> **Note:** Ensure you have the required Azure login credentials before you begin.

* Installed Alfresco Content Services 23.2 (or above).
* Installed Alfresco Content Connector for Azure 5.0.0 (or above) with multiple container support enabled.
  * For more see [Configuring multiple storage containers in Azure Connector]({% link microsoft-azure/latest/config/index.md %}#configuring-multiple-storage-containers).
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    | Property                                    | Description                                                                                                                                                                                                                |
    |---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | worm.contentstore                           | This property is the key of the content store that has a WORM container.                                                                                                                                                   |
    | worm.retentionPeriod                        | This property controls the default retention period. It is specified in days and the default value is `2192` which is six years.                                                                                             |
    | connector.az.store2.retentionPeriodProperty | This property passes the AGS property which stores the unlock date of an object to Content Connector for Azure. You must enter this value: `{http://www.alfresco.org/model/recordsmanagemententerprise/1.0}wormUnlockDate`. |
    | rm.wormUnlockRecords.cronExpression         | This cron expression is used to specify how often the unlock job should run in Governance Services. The default is 15 minutes.                                                                                             |
    | connector.az.store2.blobImmutabilityPolicy  | This property controls immutability policy type at single blob level. Possible values: `Unlocked`(default)/`Locked`                                                                                                        |

1. Log in to your Azure Portal.

    You can only enable Blob immutability policy on the creation level, so you must create a new Storage Account to enable WORM feature.

2. Click **Create resource** and type **storage account** in the search field.

3. Once the **Storage account** tile is displayed, expand the **Create** dropdown at the bottom of the tile and choose **Storage account**.

4. On the first screen choose the desired subscription, resource group, enter a name for the storage, select the required Region, and then click **Next**. You can keep all other options default.

5. Under the next two tabs, you can leave all options default or change them at your convenience.

6. Under the **Data protection** tab you must select the **Enable versioning for blobs** and **Enable version-level immutability support** checkboxes.

    It is recommended to set `Keep all versions` under **Enable versioning for blobs**.

7. You can leave the next two tabs with default values or modify them at your convenience and go to **Review** tab where you should click **Create** button.

8. Under your storage account with versioning and version-level immutability support you need to create a storage container which is WORM capable.

9. Under your newly created Storage Account go to the **Containers** tab and click **+Container** (create container).

    Type in the container name. Under **Advanced** section select **Enable version-level immutability support** and click **Create**

10. You may want to set default retention based immutability policy for your container.

    To do so, go to the **Containers** tab, click the ellipsis (3 dots) for your container and choose **Access policy**.

11. Under the **Immutable blob storage** section choose add policy.

    1. Choose `Time-based retention` policy type and type in the desired number of days in `Set retention period for` field and click **Save**.

        This retention period must match the retention period you configured in the Alfresco Global Properties file for the `worm.retentionPeriod` property.

    2. To use this bucket as WORM storage you must now create rules for a category or folder in Governance Services using the **WORM lock** action. If you use the REST API you can use the action without a rule.

## Using WORM storage {#usingworm}

These steps describe how to use WORM storage with Governance Services, how to use WORM storage when you specify a 
retention period, and when you use Legal Hold.

This task assumes you have:

* Created a container in Azure Blob Storage for use as WORM storage.
  * For more see [Creating a container in Azure Blob Storage for use as WORM storage](#createcontainerforworm).
* Familiarised yourself with how to create rules in Governance Services.
  * For more see [Creating a rule]({% link governance-services/latest/using/automate-fileplan.md %}#creating-a-rule).

1. Log in to Governance Services.

2. (Optional) Click **More** and then **Add to Hold** if you want to use a Legal Hold for your new rule.

    Select the Hold you want to add the folders or categories to and click **OK**.

3. Click **More** and then **Manage Rules** for the folder or category you want to set rules for.

    > **Note:** If you have selected a Hold then you will need specific IAM permissions on your AWS account to delete the record after the WORM-lock has expired.

4. Click **Create Rules**.

5. Enter a name for the new rule.

6. Define the rule.

7. Select **WORM lock** from the **Perform Action** drop-down list.

8. Enter a retention period in days.

    If you don't enter a retention period, the default period used is the one you set for the `worm.retentionPeriod` property in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file.

    > **Note:** When using the WORM Lock action you must select **Run in Background** when creating rules for your categories or folders.

9. Click **Create**.
