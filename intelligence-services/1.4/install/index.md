---
title: Install Intelligence Services
---

The AI capability in Alfresco Intelligence Services is delivered as a distribution zip and Docker image. The zip contains the AIS extensions as repository and Share AMP files, and a number of configuration files. The Docker image provides an AI T-Engine for connecting with Amazon AI Services.

In this section you'll install and set up everything you need to run Intelligence Services. To get started:

* Review the prerequisites
* Set up services in AWS
* Install with distribution zip

## Prerequisites

* Make sure that you've tested your deployment with non-AI transforms and everything is working
* See [Supported platforms]({% link intelligence-services/1.4/support/index.md %}) for more

### Access to Docker images

Some of the Docker images that are used by the Intelligence Services module are uploaded to a private registry, **Quay.io**. Since the Intelligence Services module adds AI capabilities to Alfresco Transform Service (see [Transform Service install overview]({% link transform-service/latest/admin/index.md %}#docker-images-overview)), you'll also need access to the following image:

```bash
alfresco/alfresco-ai-docker-engine
```

See [Install Intelligence Services]({% link intelligence-services/1.4/install/index.md %}) and [Configure Intelligence Services]({% link intelligence-services/1.4/config/index.md %}) for more.

* A [Quay.io](https://quay.io/){:target="_blank"} account is needed to pull Docker images that are needed for Intelligence Services.

> **Note:** Alfresco customers can request Quay.io credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

> **Note:** Make sure that you request credentials for Alfresco Content Services and Alfresco Intelligence Services, so that you can use the additional `alfresco-ai-docker-engine-1.4.x` Docker image.

### AWS related requirements

To use Alfresco Intelligence Services, you need:

* An AWS account so that you can configure the Amazon AI services
* [Set up services in AWS]({% link intelligence-services/1.4/install/index.md %}#set-up-services-in-aws)

### Limitations

* [Amazon Comprehend](https://aws.amazon.com/comprehend/faqs/){:target="_blank"} supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Comprehend Pricing](https://aws.amazon.com/comprehend/pricing/){:target="_blank"}.
* [Amazon Rekognition](https://aws.amazon.com/rekognition/faqs/){:target="_blank"} supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Rekognition Pricing](https://aws.amazon.com/rekognition/pricing/){:target="_blank"}.
* [Amazon Textract](https://aws.amazon.com/textract/faqs/) supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html){:target="_blank"}. For cost information, see [Amazon Textract Pricing](https://aws.amazon.com/textract/pricing/){:target="_blank"}.
* [Amazon Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/limits-guidelines.html){:target="_blank"} supports the following [Regions and Endpoints](https://docs.aws.amazon.com/general/latest/gr/transcribe.html#transcribe_region){:target="_blank"}. For cost information, see [Amazon Transcribe Pricing](https://aws.amazon.com/transcribe/pricing/){:target="_blank"}.  

You can also check the [AWS Region Table](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/){:target="_blank"} for all AWS global infrastructure.

> **Important:** Choose a common region that supports the Amazon AI Services that you wish to use.

### S3 buckets

You'll need to create a separate S3 bucket to use with the Amazon AI Services. It also needs to be in a common region that's supported by all the Amazon AI Services that you intend to use.

If you have an existing deployment that uses Alfresco Content Connector for AWS S3, it's recommended that you create a separate S3 bucket to use with Intelligence Services.

> **Important:** Create the AI S3 bucket in the same region as you intend to deploy Intelligence Services.

## Set up services in AWS

Use this information to set up the required services in AWS before you install Intelligence Services.

### Configure AWS Identity and Access Management

AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for your users. With IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. Intelligence Services uses AWS IAM roles to ensure fine-grained control over access to the AI services and content stored in the S3 bucket.

Access to AWS services, such as Amazon Comprehend, requires that you provide credentials when you access them. The best way to provide those credentials is through IAM.

1. Follow the steps in [Creating your first IAM admin user and group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html){:target="_blank"} to create and configure an IAM user.

2. Next, [create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html){:target="_blank"} to use with the Amazon AI Services.

    > **Note:** If you have an existing deployment that uses Alfresco Content Connector for AWS S3, it's recommended that you create a separate S3 bucket to use with Intelligence Services. Make sure that it's in the same region as you intend to deploy Alfresco Intelligence Services.

    > **Note:** The bucket name must be unique among all AWS users globally. See [S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html){:target="_blank"} for more information on bucket naming.

    See [Clean up in S3]({% link intelligence-services/1.4/install/index.md %}#clean-up-in-s3) for guidance.

3. Go to the **AWS Console** and open the **IAM** console.

4. Select **Policies** from the menu and click **Create policy**.

5. Switch to the **JSON** tab to create the policy using JSON syntax.

6. Copy the following content, replace the bucket name, `alfrescoai`, with your AI bucket name:

    ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": "s3:GetObject",
                "Resource": [
                    "arn:aws:s3:::alfrescoai/*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": "s3:ListBucket",
                "Resource": [
                    "arn:aws:s3:::alfrescoai"
                ]
            },
            {
                "Effect": "Allow",
                "Action": "s3:PutObject",
                "Resource": "arn:aws:s3:::alfrescoai/*"
            }
        ]
    }
    ```

7. Click **Review policy**.

8. Type a name for your policy and click **Create policy**.

    For example, `ComprehendAsyncJobs`.

    > **Note:** The policy name must be unique across your organization.

9. Select **Roles** from the menu and click **Create role**.

    Next, you'll select the type of trusted entity (for example, an AWS service, another AWS account, etc.). Since Amazon Comprehend isn't an available AWS service, you can select EC2 and change the Trust Relationship later.

10. Choose **EC2** and click **Next: Permissions**.

11. Choose one or more policies to attach to your new role (including the one you created in step 8.

12. Click **Next** until you reach the **Review** page.

13. Type a name for the role and click **Create role**.

    For example, `ComprehendAsyncJobs`.

    > **Note:** The role name must be unique across your organization.

14. Select the role you just created, and copy the `Role ARN` field.

    The Amazon Resource Name (ARN) is a unique identifier for this AWS resource. You'll use this later when configuring environment variables.

    Next, change the Trust Relationship to Amazon Comprehend instead of EC2.

15. Switch to the **Trust Relationship** tab, and select **Edit Trust Relationship**.

16. Replace `ec2.amazonaws.com` in the policy document:

    ```json
    "Service": "comprehend.amazonaws.com"
    ```

17. Click **Update Trust Policy** to complete this stage.

    Now that the role has been created, the IAM user needs to be given the ability to assign this role to Amazon Comprehend. You have two options:

    * Give the IAM user full ability to assign any role using [Role-Based Permissions Required for Asynchronous Operations](https://docs.aws.amazon.com/comprehend/latest/dg/access-control-managing-permissions.html#auth-role-permissions){:target="_blank"}.
    * Alternatively, you can give the IAM user only access to the role you created. Here's an example:

        ```json
        {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": "Allow",
                    "Action": [
                        "iam:GetRole",
                        "iam:PassRole"
                    ],
                    "Resource": "arn:aws:iam::XXXXXXXXXXXX:role/ComprehendAsyncJobs"
                }
            ]
        }
        ```

Now you can use asynchronous operations by configuring the `ROLE_ARN` property with the ARN of this configured role. The Transform Engine can now split input documents larger than 125KB, upload the chunks to the configured S3 bucket, start the job, and poll the result until it finishes. The chunks are deleted after the process is completed.

## Set up Amazon AI services

Use this information to set up Amazon AI services (Amazon Comprehend, Amazon Rekognition, and Amazon Textract). Before continuing, make sure that you've already [set up an IAM user](#configure-aws-identity-and-access-management).

### Roles and permissions

Review the permission requirements for each Amazon AI Service that you intend to use.

{% capture comprehend %}

In order to use IAM roles, a new policy must be created that'll be used by the IAM role. Policies are used to grant permissions to groups. If there isn't a policy already in place for Amazon Comprehend access, a new policy must be created. The credentials associated with your IAM user must have permissions to [access Amazon Comprehend actions](https://docs.aws.amazon.com/comprehend/latest/dg/auth-and-access-control.html){:target="_blank"}. These permissions are customized through roles associated with your IAM user.

In order to use Amazon Comprehend, you'll need to create a new IAM role, and [configure a policy](https://docs.aws.amazon.com/comprehend/latest/dg/access-control-managing-permissions.html){:target="_blank"} to access the desired services within Comprehend. You can use one of the predefined policies, `ComprehendFullAccess` or `ComprehendReadOnly`. Both grant you full access to Amazon Comprehend, but the second one doesn't allow you to use asynchronous jobs.

> **Note:** You must grant Amazon Comprehend access to the Amazon S3 bucket (i.e. AI S3 bucket) that contains your document collection. You can do this by creating a data access role in your account to trust the Amazon Comprehend service principal.

{% endcapture %}

{% capture rekognition %}

The credentials associated with your IAM user must have permissions to [access Amazon Rekognition actions](https://docs.aws.amazon.com/rekognition/latest/dg/security-iam.html){:target="_blank"}. These permissions are customized through roles associated with your IAM user.

In order to use Amazon Rekognition, you'll need to create a new IAM role, and [configure a policy](https://docs.aws.amazon.com/rekognition/latest/dg/security_iam_id-based-policy-examples.html){:target="_blank"} to access the desired services within Rekognition. You can use one of the predefined policies, `AmazonRekognitionFullAccess` or `AmazonRekognitionReadOnlyAccess`. Both grant you full access to Amazon Rekognition, but the second one doesn't allow you to create or delete collections.

When analyzing images larger than 5MB (and up to 15MB), they'll first be uploaded to an S3 bucket. Make sure that you setup a bucket in the same region as you intend to deploy Intelligence Services.

> **Note:** You must grant Amazon Rekognition access to the S3 bucket used above.

{% endcapture %}

{% capture textract %}

The credentials associated with your IAM user must have permissions to access Amazon Textract actions. These permissions are customized through roles associated with your IAM user.

In order to use Amazon Textract, you'll need to create a new IAM role and configure a policy to access the desired services within Textract. The easiest way to do this is to attach the AWS managed policy `AmazonTextractFullAccess` to the IAM role.

> **Note:** You must grant Amazon Textract access to the S3 bucket used above.

{% endcapture %}

{% capture transcribe %}

The credentials associated with your IAM user must have permissions to access Amazon Transcribe actions. These permissions are customized through roles associated with your IAM user.

In order to use Amazon Transcribe, you'll need to create a new IAM role and configure a policy to access the desired services within Transcribe. The easiest way to do this is to attach the AWS managed policy `AmazonTranscribeFullAccess` to the IAM role.

> **Note:** You must grant Amazon Transcribe access to the S3 bucket used above.

{% endcapture %}

{% include tabs.html tableid="permissions" opt1="Comprehend" content1=comprehend opt2="Rekognition" content2=rekognition opt3="Textract" content3=textract opt4="Transcribe" content4=transcribe %}

### Configure minimum confidence level

There's a setting for the level of confidence that each AWS AI service has in the accuracy of the extracted content. This is defined as the minimum confidence level and has a default value of 80% (i.e. `0.8`). Here are the settings in `alfresco-global.properties`:

```bash
#################################
# Alfresco-AI Parameters        #
#################################

ai.transformations.aiLabels.minConfidence=0.8
ai.transformations.aiFeatures.minConfidence=0.8
ai.transformations.aiTextract.minConfidence=0.8
ai.transformations.aiPiiEntities.minConfidence=0.8
ai.transformations.aiSpeechToText.minConfidence=0.8
```

### Clean up in S3

Whenever files are written to S3 for processing, they're removed once processing finishes or an exception is encountered. However, if the service is stopped or an uncaught exception is thrown, it's possible that files may be left in S3. It's recommended that you set up a policy on the S3 bucket so that objects that are older than a day are removed from the bucket.

To do this, you can create a lifecycle rule that expires all versions of objects after 1 day, and then permanently deletes them one day after that.

See the AWS site for more details on [Object lifecycle management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html){:target="_blank"}.

## Install with zip

Use these instructions to install the Intelligence Services AMP files to an instance of Content Services.

The Intelligence Services distribution zip file, `alfresco-ai-distribution-1.4.x.zip`, includes all the files required to provide Intelligence Services. Ensure that you've installed the required software and completed the AWS set up before installing Intelligence Services.

1. Download the Intelligence Services distribution zip file.

2. Extract the `alfresco-ai-distribution-1.4.x.zip` file into a system directory; for example, `<installLocation>/`.

    In this directory you'll see the following content:

    * `alfresco-ai-repo-1.4.x.amp`: AMP to be applied to the Content Services repository
    * `alfresco-ai-share-1.4.x.amp`: AMP to be applied to Alfresco Share
    * `ai-pipeline-routes.json`: custom Transform Router configuration properties
    * `ai-view.extension.json`: custom extension file for Alfresco Digital Workspace

3. Stop the Content Services server.

4. Copy the provided AMP files to the Alfresco `amps` and `amps_share` directories.

    Copy the repository AMP file to the `amps` directory:

    * `alfresco-ai-repo-1.4.x.amp`

    Copy the Share AMP file to the `amps_share` directory:

    * `alfresco-ai-share-1.4.x.amp`

5. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the Content Services installation directory.

6. Navigate to the `bin` directory to run the Module Management Tool (MMT) file to install the AMP files into the relevant WAR file:

    1. For the Content Services repository:

        ```java
        java -jar <alfrescoInstallLocation>/bin/alfresco-mmt.jar install <installLocation>/amps-repository/alfresco-ai-repo-1.4.x.amp <installLocation>/tomcat/webapps/alfresco.war
        ```

    2. For Alfresco Share:

        ```java
        java -jar <alfrescoInstallLocation>/bin/alfresco-mmt.jar install <installLocation>/amps-share/alfresco-ai-share-1.4.x.amp <installLocation>/tomcat/webapps/share.war
        ```

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-mmt) and [Installing an Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

    Check the output to ensure that the AMP files have installed successfully.

7. Check that the [configuration]({% link intelligence-services/1.4/config/index.md %}) is set up correctly for your environment.

8. Restart the Content Services server.
