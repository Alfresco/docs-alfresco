---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Configuring the Alfresco S3 Connector with AWS GovCloud

The Alfresco S3 Connector can be configured to use the AWS GovCloud region.

AWS GovCloud is an isolated Amazon Web Services region, that allows US governmental agencies and customers to store content and workload in the cloud while still conforming to regulatory and compliance requirements. Alfresco supports both Federal Information Processing Standard \(FIPS\) compliant and non-FIPS compliant Amazon S3 AWS services. For more information about AWS FIPS compliance, see [AWS GovCloud \(US\) Endpoints](http://docs.aws.amazon.com/govcloud-us/latest/UserGuide/using-govcloud-endpoints.html).

1.  Open the <classpathRoot\>/alfresco-global.properties file.

    Add one of these entries to your configuration, depending on the FIPS compliance status of your organization.

2.  If you are a non-FIPS compliant organization, add the following entry to your <classpathRoot\>/alfresco-global.properties file:

    ```
    s3service.s3-endpoint=s3-us-gov-west-1.amazonaws.com  
    ```

3.  If you are a FIPS compliant organization, add the following entry to your <classpathRoot\>/alfresco-global.properties file:

    ```
    s3service.s3-endpoint=s3-fips-us-gov-west-1.amazonaws.com
    ```

4.  Save the alfresco-global.properties file.


**Parent topic:**[Configuring the Alfresco S3 Connector](../tasks/S3-Content-Store-connection-config.md)

