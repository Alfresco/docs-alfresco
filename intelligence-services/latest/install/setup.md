---
title: Set up services in AWS
---

Use this information to set up the required services in AWS before you install Intelligence Services.

## Configure AWS Identity and Access Management

AWS Identity and Access Management (IAM) enables you to securely control access to AWS services and resources for your users. With IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. Intelligence Services uses AWS IAM roles to ensure fine-grained control over access to the AI services and content stored in the S3 bucket.

Access to AWS services, such as Amazon Comprehend, requires that you provide credentials when you access them. The best way to provide those credentials is through IAM.

1. Follow the steps in [Creating your first IAM admin user and group](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html){:target="_blank"} to create and configure an IAM user.

2. Next, [create an S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/gsg/GetStartedWithS3.html){:target="_blank"} to use with the Amazon AI Services.

    > **Note:** If you have an existing deployment that uses Alfresco Content Connector for AWS S3, it's recommended that you create a separate S3 bucket to use with Intelligence Services. Make sure that it's in the same region as you intend to deploy Alfresco Intelligence Services.

    > **Note:** The bucket name must be unique among all AWS users globally. See [S3 bucket restrictions and limitations](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html){:target="_blank"} for more information on bucket naming.

    See [Clean up in S3]({% link intelligence-services/latest/install/setup.md %}#clean-up-in-S3) for guidance.

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

Review the permission requirements for each Amazon AI Service that you wish to use.

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

{% include tabs.html tableid="permissions" opt1="Comprehend" content1=comprehend opt2="Rekognition" content2=rekognition opt3="Textract" content3=textract %}

### Configure minimum confidence level

There's a setting for the level of confidence that each AWS AI service has in the accuracy of the extracted content. This is defined as the minimum confidence level and has a default value of 80% (i.e. `0.8`). Here are the settings in `alfresco-global.properties`:

```bash
#################################
# Alfresco-AI Parameters        #
#################################

ai.transformations.aiLabels.minConfidence=0.8
ai.transformations.aiFeatures.minConfidence=0.8
ai.transformations.aiTextract.minConfidence=0.8
```

### Clean up in S3

Whenever files are written to S3 for processing, they're removed once processing finishes or an exception is encountered. However, if the service is stopped or an uncaught exception is thrown, it's possible that files may be left in S3. It's recommended that you set up a policy on the S3 bucket so that objects that are older than a day are removed from the bucket.

To do this, you can create a lifecycle rule that expires all versions of objects after 1 day, and then permanently deletes them one day after that.

See the AWS site for more details on [Object lifecycle management](https://docs.aws.amazon.com/AmazonS3/latest/dev/object-lifecycle-mgmt.html){:target="_blank"}.
