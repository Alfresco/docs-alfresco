---
title: Working with Amazon S3 WORM
---

You can use the Amazon S3 WORM storage by creating a Rule and an Action in Governance Services.

WORM storage (Object Lock in Amazon S3) is an Amazon S3 capability that allows you to store objects using the write once, 
read many (WORM) model. Records moved to WORM storage use an Amazon S3 bucket that is configured to support object locking 
in compliance mode. The movement of records is controlled through record folder rules and actions. You use the WORM model 
where it is a requirement that your data is not changed once it has been written to disk. This may be a requirement of 
yours due to regulatory compliance in the governmental, financial or healthcare sectors.

The movement of records to WORM storage and through to disposition can be fully automated. A folder rule is configured 
to test records for the classification that requires WORM storage. This may be based on when a records enters a folder 
or complex meta data conditions. When triggered the rule causes the Object Lock action to be initiated in Amazon S3. 
This action is configured with the required WORM retention period in days. For records that are moved to WORM locked 
storage any retention schedules that may have been applied are interrupted. At the end of the required retention period 
in WORM storage the records are automatically returned to the original default S3 bucket to allow normal record operations 
to re-commence, including the application of retention schedules and disposition.

While retained in WORM storage additional controls are applied to prevent any user including administrators from deleting 
the records. Adding records to one or more legal holds during the WORM storage retention period causes the Amazon S3 legal 
hold flag to be set on the record in Amazon S3. This prevents deletion or editing of the record in Amazon S3 even if the 
WORM retention period has expired. Once the record has been removed from all legal holds it was added to the legal hold 
flag is cleared and the record can be removed from the WORM bucket once the retention period has expired.

There is some configuration required before you can use this feature, for more see 
[Creating a bucket in Amazon S3 for use as WORM storage](#createbucketforworm).

Once you have created the bucket in Amazon S3 for use as Worm storage you can use it as storage, for more see 
[Using WORM storage](#usingworm).

Although the content of a WORM-locked record will be protected against modifications, any copies of WORM-locked records 
in other record folders will be stored using the rules for that folder. Consequently, copies of records may not be protected 
by the same restrictions.

You are unable to reject a Record that is stored in WORM storage and you can't move Records that are stored in WORM storage.

## Creating a bucket in Amazon S3 for use as WORM storage {#createbucketforworm}

These steps describe how to use the AWS Management Console to create a bucket for use as WORM storage 
(Amazon S3 Object Lock) in Amazon S3. Once you have created the bucket you can create rules for a category or folder to 
store your data using WORM storage.

For more on creating rules see [Creating a rule]({% link governance-services/7.4/using/automate-fileplan.md %}#creating-a-rule).

> **Note:** Ensure you have the required AWS login credentials before you begin.

This task assumes you have:

* Installed Alfresco Content Services 7.0 and above.
* Installed Alfresco Content Connector for AWS S3 3.1 with multiple bucket support enabled. For more see [Configuring multiple buckets using S3 Connector]({% link aws-s3/latest/config/index.md %}#multibucketconfig).
* Set the following properties in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

    |Property|Description|
    |--------|-----------|
    |s3.worm.contentstore|This property is the key of the content store that has a WORM bucket.|
    |s3.worm.retentionPeriod|This property controls the default retention period. It is specified in days and the default value is 2192 which is six years.|
    |connector.s3.store2.retentionPeriodProperty|This property passes the AGS property which stores the unlock date of an object to Content Connector for AWS S3. You must enter this value: `{http://www.alfresco.org/model/recordsmanagemententerprise/1.0}wormUnlockDate`|
    |rm.wormUnlockRecords.cronExpression|This cron expression is used to specify how often the unlock job should run in Governance Services. The default is 15 minutes.|

1.  Log in to your AWS Management Console.

2.  Expand **All services** and under the Storage heading select **S3**.

3.  In the S3 buckets window, click **Create bucket**.

4.  Enter a name for the Bucket and select the required Region and then click **Next**.

5.  Under the Versioning heading, select **Keep all versions of an object in the same bucket** check box.

    To enable Object Lock you must select this check box.

6.  Expand **Advanced Settings** and under the Object Lock heading select **Permanently allow objects in this bucket to be locked** and click **Next**.

    **Note:** You must have Object Lock enabled in order to use Governance Services with WORM storage. For more on Object Lock see [S3 Object Lock overview](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lock-overview.html){:target="_blank"}.

7.  Ensure **Block all public access** is selected and click **Next**.

8.  Click **Create bucket**.

    You are now back at the S3 buckets window.

9.  Select the check box next to the bucket you have just created and click **Properties**.

10. Under the Advanced settings heading click the **Object lock** tile.

11. Select **Enable compliance mode**.

12. Enter a Retention period in Days and click **Save**.

    This retention period must match the retention period you configured in the Alfresco Global Properties file for property `s3.worm.retentionPeriod`.

    To use this bucket as WORM storage you must now create rules for a category or folder in Governance Services using the **WORM lock** action. If you use the REST API you can use the action without a rule.

## Using WORM storage {#usingworm}

These steps describe how to use WORM storage with Governance Services and how to use WORM storage when you specify a 
retention period and when you use Legal Hold.

This task assumes you have:

* Created a bucket in Amazon S3 for use as WORM storage, for more see [Creating a bucket in Amazon S3 for use as WORM storage](#createbucketforworm).
* Familiarised yourself with how to create rules in Governance Services, for more see [Creating a rule]({% link governance-services/7.4/using/automate-fileplan.md %}#creating-a-rule).

1.  Log in to Governance Services.

2.  (Optional) Click **More** and then **Add to Hold** if you want to use a Legal Hold for your new rule.

3.  (Con't Optional) Select the Hold you want to add the folders or categories to and click **OK**.

4.  Click **More** and then **Manage Rules** for the folder or category you want to set rules for.

    **Note:** If you have selected a Hold then you will need specific IAM permissions on your AWS account to delete the record after the WORM-lock has expired.

5.  Click **Create Rules**.

6.  Enter a name for the new rule.

7.  Define the rule.

8.  Select **WORM lock** from the **Perform Action** drop down list.

9.  Enter a retention period. In days.

    If you don't enter a retention period the default period used is the one you set for this property `s3.worm.retentionPeriod` in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file.

    **Note:** When using the WORM Lock action you must select **Run in Background** when creating rules for your categories or folders.

10. Click **Create**.
