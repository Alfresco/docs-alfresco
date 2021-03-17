---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring AWS Identity and Access Management

AWS Identity and Access Management \(IAM\) enables you to securely control access to AWS services and resources for your users. Using IAM, you can create and manage AWS users and groups, and use permissions to allow and deny their access to AWS resources. The S3 Connector uses AWS IAM's roles to ensure fine-grained control over access to the content stored in the S3 bucket.

In order to use IAM roles, instead of AWS secret and access keys, a new policy must be created that will be used by the IAM role. Policies are used to grant permissions to groups. If there isn't a policy already in place for S3 access, a new policy must be created.

1.  Create a new policy.

    Follow the steps from the AWS site to [Create a New Policy](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_create.html).

2.  Use the policy simulator to test the new IAM policy.

    Follow the steps from the AWS site to [Test IAM Policies](http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html).

3.  Create a new role. You can attach up to 10 policies to each role.

    Follow the steps from the AWS site to [Create IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create.html).

    If an Amazon EC2 configuration is already in place, the new policy that you created is attached to the existing role used on the EC2 instance. Follow the steps from the AWS site to [Manage IAM Roles](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_manage.html).

4.  Attach the role to the EC2 instance where Alfresco Content Services is running.

    Note that one single role can be applied to an EC2 instance.

5.  Edit `alfresco-global.properties` to remove the `s3.accessKey` and `s3.secretKey` properties.

    By removing these properties, the IAM role that's attached to the EC2 instance takes over the responsibility of accessing the S3 bucket.

    You are now ready to start Alfresco Content Services.


**Parent topic:**[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)

