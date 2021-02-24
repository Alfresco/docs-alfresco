---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Properties for backwards compatibility

You may need to configure a number of optional properties for the S3 Connector 2.0 to ensure backwards compatibility with S3 Connector 1.x and behavior.

-   **dir.contentstore**

    The `dir.contentstore` property provides backwards compatibility with S3 Connector 1.x.

    **S3 Connector 1.x**

    S3 Connector 1.x doesn't create S3 object IDs \(or paths\) that are ideal for high-scale S3 read and write request rates. To help achieve this, `dir.contentstore` should be ignored except for backwards compatibility reads of existing content stored in Alfresco Content Services.

    When using S3 Connector 1.x the format of the S3 path is:

    ```
    /{contentRoot}/{tenant}/[datepath/]{guid}.bin
    ```

    When `s3.flatRoot=true` the s3 path format is:

    ```
    /{contentRoot}/{tenant}/{guid}.bin
    ```

    **S3 Connector 2.0**

    Starting from S3 Connector 2.0 `dir.contentstore` is ignored except for backwards compatibility reads.

    When `flatRoot=true` the s3 path format is:

    ```
    /{tenant}/{guid}.bin
    ```

    When `flatRoot=false` the s3 path format is:

    ```
    /{tenant}/{datepath}/{guid.bin}
    ```

    **Note:** The behaviour of existing properties `s3.flatRoot` and `dir.contentstore.deleted` is maintained. You can apply the S3 Connector v2.0 to an existing installation where S3 Connector v1.x was previously used without affecting the running of the system. This means existing paths remain as they are, and new paths are generated based on your configuration.

-   **s3.useTenantDomainInPath**

    Added in S3 Connector v2.0. When the property value is set to `true` the tenant domain is added to the S3 path. This was the default behaviour in S3 Connector v1.x. The change in the default property value is required to achieve an optimal path for high throughput reads and writes where:

    ```
    s3.useTenantDomainInPath=false
    dir.contentstore=
    s3.flatRoot=true
    ```

    **Note:** For a multi-tenant system you can also set `s3.useTenantDomainInPath=false`, however content from different tenants is co-mingled. For more details, see [Setting up multi-tenancy](http://docs.alfresco.com/5.2/concepts/mt-intro.html).

    You can apply S3 Connector 2.0 to an existing installation where S3 Connector 1.x was previously used without affect to the running of the system. This means that existing paths remain as they are, and new paths are generated based on your configuration.

    **Example 1:**

    When `s3.useTenantDomainInPath=false` and `s3.flatRoot=true` the s3 path format is:

    ```
    /{guid}.bin
    ```

    **Example 2:**

    When `s3.useTenantDomainInPath=false` and `s3.flatRoot=false` the s3 path format is:

    ```
    /{datepath}/{guid.bin}
    ```


**Parent topic:**[Configuring the S3 Connector](../tasks/s3-contentstore-config.md)

