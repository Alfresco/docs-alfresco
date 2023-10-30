---
title: Install Content Connector for AWS S3
---

Use this information to install and configure the Content Connector for AWS S3 as an alternative content store.

Using an Alfresco Module Package (AMP), the connector supplies a new content store which replaces the default file 
system-based implementation for the standard and (optionally) the deleted content stores. 
The content store implementation is responsible for reading and writing content streams (i.e. files) using the S3 API, 
however, in order to improve performance a local Caching Content Store is used which uses the local disk to 
cache recently-used content items.

>**Note:** By default the module configures the caching content store to use a maximum of 50 GB of disk, with no limit on individual file sizes.

Starting from version 3.1, the S3 Connector module provides out of the box content store subsystems, which can easily be 
set up based on the most suitable configuration. The subsystem approach allows a more flexible use of the S3 content store, 
even in conjunction with existing content stores.

You have two options for installing the S3 Connector:

* [Installing the S3 Connector](#installing)
* [Installing the S3 Connector with S3MultipleBuckets subsystem](#installingmultibucket)

The steps for both options are very similar, but the second allows you to add `S3MultipleBuckets` as a third alternative 
for the S3 content store subsystem.

## Prerequisites

There are a number of software requirements for installing Content Connector for AWS S3.

### Alfresco requirements

* Alfresco Content Services.

### Java requirements

* OpenJDK 17.

### AWS related requirements

In order to use the S3 Connector, you will need an AWS account so that you can configure the S3 Connector successfully. This includes having an admin account to set up an S3 bucket, or have access to a bucket that's already set up.

>**Note:** The bucket name must be unique among all AWS users globally. See [S3 bucket restrictions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/BucketRestrictions.html) for more information on bucket naming.

### Summary of features

If you want to use the functionality introduced in S3 Connector 2.0, you can configure the following:

* For IAM roles integration, see [Configuring AWS Identity and Access Management]({% link aws-s3/latest/config/index.md %}#configiam).
* For KMS integration, see [Configuring AWS Key Management Service]({% link aws-s3/latest/config/index.md %}#configkeymgmt).

If you want to use the functionality introduced in S3 Connector 2.1, you can configure the following:

* For S3 Connector on-premises configuration, see [Configuring S3 Connector on-premises]({% link aws-s3/latest/config/index.md %}#onpremconfig).
* For AWS Storage Classes configuration, see [Configuring AWS Storage Classes]({% link aws-s3/latest/config/index.md %}#configstorageclass).

If you want to use the functionality introduced in S3 Connector 3.1, you can configure the following:

* For S3 Connector content store subsystems configuration, see [S3 Connector content store subsystems]({% link aws-s3/latest/config/index.md %}#content-store-subsystems).
* For S3MultipleBuckets subsystem configuration, see [Configuring multiple buckets using S3 Connector]({% link aws-s3/latest/config/index.md %}#multibucketconfig).
* For changes to the S3 Connector configuration, see [Properties reference]({% link aws-s3/latest/config/index.md %}#properties-reference) and [Properties behaviour changes]({% link aws-s3/latest/config/index.md %}#properties-behavior-changes).

## Installing

These steps describe how to install the Content Connector for AWS S3 to an instance of Alfresco Content Services.

The S3 Connector is packaged as an Alfresco Module Package (AMP) file.

>**Note:** Ensure that you don't start Alfresco Content Services before installing the S3 Connector AMP.

1.  Go to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2.  Download the `alfresco-s3-connector-6.0.x.amp` file.

3.  Use the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

4.  Check that the [configuration]({% link aws-s3/latest/config/index.md %}) is set up correctly for your environment.

    >**Note:** For a new clean installation, we recommend that you choose a pure S3 content store. See [S3 Connector content store subsystems]({% link aws-s3/latest/config/index.md %}#content-store-subsystems) and [Properties reference]({% link aws-s3/latest/config/index.md %}#properties-reference) for more details.

5.  Starting from version 3.1, the S3 Connector has the deleted content store disabled by default, since this feature is already present in Amazon's S3 service. For details on how to re-enable it, see [S3 Connector deleted content store]({% link aws-s3/latest/config/index.md %}#enabledeletedcontentstore).

6.  Start Alfresco Content Services.

## Installing with S3MultipleBuckets subsystem {#installingmultibucket}

These steps describe how to install the S3 Connector to an instance of Alfresco Content Services, and how to 
enable the `S3MultipleBuckets` subsystem sample.

The S3 Connector is packaged as an Alfresco Module Package (AMP) file.

>**Note:** Ensure that you don't start Alfresco Content Services before installing the S3 Connector AMP.

1.  Go to [Hyland Community](https://community.hyland.com/){:target="_blank"}.

2.  Download the `alfresco-s3-connector-6.0.x.amp` file.

3.  Use the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

4.  Unzip the `alfresco-s3-connector-6.0.x.amp` file.

5.  Copy the three sample files and rename them by removing the `.sample` extension.

    The sample files are located under:

    ```text
    alfresco-s3-connector-6.0.x.amp/config/alfresco/extension/...
    ```

    They need to be copied to the relevant paths under the following folder:

    ```text
    $CATALINA_HOME/shared/classes/alfresco/extension/...
    ```

    1.  Copy and rename `s3-multiple-buckets-context.xml.sample` to:

        ```text
        s3-multiple-buckets-context.xml
        ```

    2.  Copy and rename `subsystems/ContentStore/S3MultipleBuckets/S3MultipleBuckets/s3-mb-contentstore-context.xml.sample` to:

        ```text
        subsystems/ContentStore/S3MultipleBuckets/S3MultipleBuckets/s3-mb-contentstore-context.xml
        ```

    3.  Copy and rename `subsystems/ContentStore/S3MultipleBuckets/S3MultipleBuckets/s3-mb-contentstore.properties.sample` to:

        ```text
        subsystems/ContentStore/S3MultipleBuckets/S3MultipleBuckets/s3-mb-contentstore.properties
        ```

6.  Check that the configuration is set up correctly for your environment.

    1.  Check the S3 Connector properties for store 1 (for example, `connector.s3.*` or `s3.*`)

        See `s3-mb-contentstore.properties` for the complete list.

        The minimum properties required are:

        ```text
        -Dconnector.s3.accessKey=${AWS_ACCESS_KEY_ID}
        -Dconnector.s3.secretKey=${AWS_SECRET_ACCESS_KEY}
        -Dconnector.s3.bucketName=${S3_BUCKET_NAME}
        -Dconnector.s3.bucketRegion=${S3_BUCKET_REGION}
        ```

    2.  Check the S3 Connector properties for store 2 (for example, `connector.s3.store2.*` or `s3.store2.*`)

        See `s3-mb-contentstore.properties` for the complete list..

        The minimum properties required are:

        ```text
        -Dconnector.s3.store2.bucketName=${S3_BUCKET2_NAME}
        -Dconnector.s3.store2.bucketRegion=${S3_BUCKET_REGION}
        ```

    3.  Set S3 multiple buckets as the default file content store subsystem:

        ```text
        filecontentstore.subsystem.name=S3MultipleBuckets
        ```

7.  Check that any other [configuration]({% link aws-s3/latest/config/index.md %}) is set up correctly for your environment and specifically check the [multiple bucket config]({% link aws-s3/latest/config/index.md %}#multibucketconfig).

8.  Start Alfresco Content Services.
