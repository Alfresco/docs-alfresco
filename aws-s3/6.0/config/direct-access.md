---
title: Direct Access URLs
---

The main purpose of Direct Access URLs (or DAUs) is to accelerate the local download of content by allowing you to have direct content URLs for your binary content that can help with distributed content repositories in customer environments, and cloud deployments.

AWS S3 provides a way of generating [pre-signed URLs](https://docs.aws.amazon.com/AmazonS3/6.0/userguide/ShareObjectPreSignedURL.html){:target="_blank"} for sharing objects. This feature is a perfect candidate for implementing direct access to your content.

> **Note:** The AWS S3 pre-signed URLs are temporary links with an expiration time.

The Alfresco repository infrastructure now supports direct access URLs. This includes the `ContentService` and the `ContentStore` interface for which default methods have been provided so that `ContentStore` implementations for older versions of this interface throw a `Not Supported` exception. The new methods are auditable using the node reference and time (in seconds) for which the DAU is valid as the parameters.

ReST API endpoints can be used for requesting a new DAU (i.e. a direct download link) for a specific file in the content repository.

Access to direct URLs is strictly controlled. Their expiration date is set/restricted by configurations in the repository using global and content store specific properties.

* Values in the content store properties, **default expiry time** and **maximum expiry time**, are used in preference to the system-wide properties, if valid.
* If invalid, an attempt is made to default to the system-wide properties.
* However, if that still doesn't result in a valid configuration, the DAUs for that specific content store are disabled.

## Default configuration

Direct access URLs are disabled by default. This means the following configuration properties are `false`:

* `system.directAccessUrl.enabled`
* `restApi.directAccessUrl.enabled`
* `connector.s3.directAccessUrl.enabled`

## System-wide configuration

Below are the system-wide configuration settings required in Content Services.

| Property | Description |
| -------- | ----------- |
| system.directAccessUrl.enabled | Controls whether this feature is available, system-wide (for example `false`). <br><br>For DAUs to work, the feature needs to be enabled both system-wide and on the individual Content Store. |
| system.directAccessUrl.defaultExpiryTimeInSec | Sets the default expiry time for the DAU across all Content Stores (for example `30`). <br><br>Its value cannot exceed the system-wide maximum expiry time (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise all DAUs are disabled). <br>**Note:** This property is **mandatory** if DAUs are enabled system-wide - (otherwise all DAUs are disabled). |
| system.directAccessUrl.maxExpiryTimeInSec | Sets the upper limit for the DAUs expiry time in seconds (for example `300`, i.e. `5 minutes`). <br><br>This means that a Content Store will be able to override this value but not exceed it, and the same goes for the clients. A service (Java Interface) client will be able to request a DAU for a custom expiry time but that time can't exceed this value. If the requested time exceeds the maximum value, the expiry time reverts to the default configured one. <br>**Note:** This property is **mandatory** if DAUs are enabled system-wide - (otherwise all DAUs are disabled). |

## ReST API configuration

The ReST API configuration only affects the ReST layer in Content Services.

| Property | Description |
| -------- | ----------- |
| restApi.directAccessUrl.enabled | Enables/disables DAU requests via the ReST API (for example `false`). |
| restApi.directAccessUrl.defaultExpiryTimeInSec | Sets the expiry time in seconds for all the DAUs requested via a ReST call (for example `30`). DAU ReST API calls cannot request an explicit expiry time - unlike the service layer calls).<br><br>Its value cannot exceed the system-wide maximum expiry time configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal to or lower (otherwise the ReST API DAUs are disabled).<br><br>If it's not set, the default system-wide property is used (`system.directAccessUrl.defaultExpiryTimeInSec`). |

## Storage connector content store

In the example of the S3 Connector, each content store (i.e. "final" content store, one that provides actual storage, as opposed to a caching content store), should have dedicated configuration options:

| Property | Description |
| -------- | ----------- |
| connector.s3.directAccessUrl.enabled | Controls whether DAUs are enabled on this specific content store (for example `false`). |
| connector.s3.directAccessUrl.defaultExpiryTimeInSec | Sets the expiry time in seconds for the DAU in this store, by overriding the global configuration (for example `30`). <br><br>If this value exceeds the content store limit (described below) or the global limit it should fallback to the global configuration. Its value cannot exceed the system-wide maximum expiry time configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise DAUs for the specific content store will be disabled). <br><br>If it's not set, the default system-wide setting is used (`system.directAccessUrl.defaultExpiryTimeInSec`). |
| connector.s3.directAccessUrl.maxExpiryTimeInSec=300 | The maximum expiry time interval that can be requested by clients - content-store specific setting. <br><br>Its value cannot exceed the system-wide configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise DAUs for the specific content store will be disabled). <br><br>If it's not set, the default system-wide setting is used (`system.directAccessUrl.maxExpiryTimeInSec`). |

> **Note:** Callers within the platform (i.e. Java interfaces) can either request a specific expiry time or rely on the default value.

> **Note:** When multiple S3 buckets are used for storage in Alfresco, each S3 Content Store can be configured with either the default (common) S3 Connector-specific properties (i.e. `connector.s3.directAccessUrl.enabled` etc.), or new separate properties can be defined for each and every store (i.e. `connector.s3store1.directAccessUrl.enabled`, `connector.s3store2.directAccessUrl.enabled`, etc.).

## Configuration priorities

For DAUs to be usable on the service-layer, the feature must be enabled both system-wide and on the content-store(s). 
For the feature to be usable through ReST (outside the JVM) the *rest-api configuration* must also be enabled.

The `system.directAccessUrl.enabled` property is the main switch for this feature. If this is set to false, then **all** 
DAUs are disabled.

The next configuration that controls specific DAUs is the one for the content store. The `connector.s3.directAccessUrl.enabled` 
property controls whether DAUs are enabled for that specific store.

Whether a client can request a DAU by using a ReST endpoint is controlled by the `restApi.directAccessUrl.enabled` 
property. If the ReST endpoint is disabled, but the feature is enabled system-wide and on the content-store, then the 
DAUs will only be usable by Java clients (i.e. only service-level requests will be possible).

## APIs
The ReST API.

### ReST endpoints

The following endpoints can be used to send requests to obtain DAUs in Content Services:

* `POST /nodes/{nodeId}/request-direct-access-url`
* `POST /nodes/{nodeId}/renditions/{renditionId}/request-direct-access-url`
* `POST /nodes/{nodeId}/versions/{versionId}/request-direct-access-url`
* `POST /nodes/{nodeId}/versions/{versionId}/renditions/{renditionId}/request-direct-access-url`
* `POST /deleted-nodes/{nodeId}/request-direct-access-url`
* `POST /deleted-nodes/{nodeId}/renditions/{renditionId}/request-direct-access-url`

Optionally, the POST body can specify an `attachment` flag. A value of `true` indicates that a download link is required; `false` indicates an embedded link is required. This defaults to `true` if it's not specified.

The endpoints return the following type of response for the S3 connector:

```json
{
  "entry": {
    "contentUrl": "https://<bucket_name>.s3.<region_name>.amazonaws.com/<binary_name>.bin?response-content-disposition=attachment%3B%20filename%20%3D%22graph.JPG%22&response-content-type=image%2Fjpeg&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJGMEQCIDmc%2Fb1e55l4sQjKGG3%2Fr1CU0gtzOOqFnr0Q%2BuXoNa%2BXAiB5oSPGJI1%2FZORobOtV%2BUmiim6GMQJxoKT9I%2Fn6t9ANvir6AwgUEAMaDDE3NTEyNTQyOTQ0MiIMA1qC5mzeuQyHnfd%2BKtcDgAHmPq1MEq5lrb2ggn7Ev%2FSJ%2FQgMVB33Y7NyfsD4BTB3Cn7e1uH17uIH8SkHX6tA9cjBOKx6Sym3gzzP2kTdKSPimQ1UOXMw4uhtaI0f%2FkqnI%2BhMh6GZXT6lOfqDE%2Fkz9nM3QuBxaNI2b8Nb71lP0KPmq7bzBagJOIccf2%2BK3VW3en5gS%2FVAoU2Wx8j1HEQJuk%2FS1whspl970hPFXKIFGIbedO5H8P66wOYdb9LKiHVxvNK7cAJfrVT6jnmqf1L6GyRJa01xgOqgUw1LvsqGsf8kkw%2FkWwJz25StcmJLtpLcWsmZ0x8aHmDNi8SHixteB5XXKJ9Bv8Ex0iIMH3%2Bs8uWmBFssu9il6u8GyV%2FlaIhKYcZLLpIFSTtVudWe60UpQhFPqyHZ6gqqi4e%2BZZfGqqhUNbZucqMvc31V76NbvwdHxI%2F0H0I8fVqCtIatO655qtq6sy%2B29qYymE7RLI9Vnrotkz%2FJafHt4LDIOjX3aDcHS0%2FTxr4QmyJbh%2B%2F0JKsSlqyoosUgzi0mqzw0B8zsTlrkfR9dPkQTNntxZoARaddEIA4Q8QRryQLFe8FITeHSFhUpdPXei3ZEmguSUpkqUQroUdQm8W3C2aoV%2F0A%2BS80IaffqNUY6MPawjpAGOqYBSMI0t5Xt7oW8QqGQrDSMllhX18T0UoxNEvYBii6vFzjuKKasQV5WaGtOMhcg8B5Ee7AxXTCl06FSPhmrQ3f%2FtFTqYtbd8FR8QTK0ZJekBMoM5thzFJ4EztnCYrkAnDo1oDUDOuBQxVho8w5llTEaKLo1SgomysnvpRFshJdBl%2BKXuFVM6Q2tmqSCY%2Bmm%2BVVte%2Bt8Yc4Ulg5eZpkkt3g2HOBaI0cnOw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220209T115428Z&X-Amz-SignedHeaders=host&X-Amz-Expires=30&X-Amz-Credential=ASIASRRSJ7TBNPZVGWOY%2F20220209%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=6b240b52024eca8a07e47dfad6970f84a75de049a1ae7af5855ed8c655f76cda",
    "attachment": true,
    "expiryTime": "2022-02-09T11:54:58.700+0000"
  }
}
```

The length of time for which a direct access URL is valid defaults to `30` seconds if not configured otherwise in `alfresco-global.properties`.

**Method:** `POST`

**Response:**

Link to the resource wrapped in a JSON Object which also contains an attachment flag and the DAU expiration date.

**Error codes:**

If there's no DAU provider installed in Alfresco (such as the S3 Connector), or DAUs aren't enabled, then a `501` HTTP status code is returned.

**Parameters:**

* `attachment` is an optional flag which controls the download method (attachment URL vs. embedded URL). Defaults to `true` when not specified, which means the value of the [Content-Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition){:target="_blank"} response header will be attachment.
* The `filename` part of the `Content-Disposition` header will be set in the service layer logic, and can't be controlled by the DAU client.

### Discovery API

The Discovery API provides status information about the DAUs feature (enabled/disabled) via a new field:

* `RepositoryInfo > StatusInfo > isDirectAccessUrlEnabled`

For example:

```json
"status": {
        "isReadOnly": false,
        "isAuditEnabled": true,
        "isQuickShareEnabled": true,
        "isThumbnailGenerationEnabled": true,
        "isDirectAccessUrlEnabled": true
      },
```

This field is `true` only when **all** of the following conditions are met:

* DAUs are enabled system-wide.
* DAUs are enabled on the ReST API.
* If there's at least one ContentStore that's configured and has DAUs enabled.

#### **S3 Connector**

The [AWS Java S3 SDK](https://docs.aws.amazon.com/AmazonS3/6.0/dev/ShareObjectPreSignedURLJavaSDK.html){:target="_blank"} is used to generate the pre-signed DAUs with the configured duration (see the configuration settings for the repository and Content Store expiry times). The pre-signed request generates a download for the remote content.

**Known limitations:**

DAU generation on AWS S3 depends on the security credentials used - see [Sharing an object with a presigned URL](https://docs.aws.amazon.com/AmazonS3/6.0/dev/ShareObjectPreSignedURL.html){:target="_blank"} for more details.

See the [GitHub project documentation](https://github.com/Alfresco/acs-packaging/blob/master/docs/direct-access-urls.md#main-flows){:target="_blank"} for a detailed view of the main flows and other parts of the implementation.
