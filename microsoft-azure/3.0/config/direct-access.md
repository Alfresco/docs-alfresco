---
title: Direct Access URLs
---

The main purpose of Direct Access URLs (or DAUs) is to accelerate the local download of content by allowing you to have 
direct content URLs for your binary content that can help with distributed content repositories in customer environments, 
and cloud deployments.

Azure Blob Storage provide [Shared Access Signature (SAS) tokens](https://docs.microsoft.com/en-us/rest/api/storageservices/delegate-access-with-shared-access-signature){:target="_blank"}, 
which as a part of the object's URL can be used for sharing objects. This feature is a perfect candidate for implementing 
direct access to your content.

> **Note:** The Azure SAS tokens are temporary with an expiration time.

The Alfresco repository infrastructure now supports direct access URLs. This includes the `ContentService` and the 
`ContentStore` interface for which default methods have been provided so that `ContentStore` implementations for older 
versions of this interface throw a `Not Supported` exception. The new methods are auditable using the node reference and 
time (in seconds) for which the DAU is valid as the parameters.

ReST API endpoints can be used for requesting a new *Direct Access URL* (i.e. a direct download link) for a specific 
file in the content repository.

The access to direct access URLs is strictly controlled. Their expiration date is set/restricted by configurations in 
the repository using global and content store specific properties.

* Values in the content store properties, **default expiry time** and **maximum expiry time**, are used in preference to the system-wide properties, if valid.
* If invalid, an attempt is made to default to the system-wide properties.
* However, if that still doesn't result in a valid configuration, the DAUs for that specific content store are disabled.

## Default configuration
Direct access URLs are disabled by default:

```text
system.directAccessUrl.enabled=false
restApi.directAccessUrl.enabled=false
connector.az.directAccessUrl.enabled=false
```

## System-wide configuration
Below are the system-wide configuration settings required in Content Services.

| Property | Description |
| -------- | ----------- |
| `system.directAccessUrl.enabled` | Controls whether this feature is available, system-wide (for example `false`). <br><br>For DAUs to work, the feature needs to be enabled both system-wide and on the individual Content Store. |
| `system.directAccessUrl.defaultExpiryTimeInSec` | Sets the default expiry time for the DAU across all Content Stores (for example `30`). <br><br>Its value cannot exceed the system-wide maximum expiry time (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise all DAUs are disabled). <br>**Note:** This property is **mandatory** if DAUs are enabled system-wide - (otherwise all DAUs are disabled). |
| `system.directAccessUrl.maxExpiryTimeInSec` | Sets the upper limit for the DAUs expiry time in seconds (for example `300`, i.e. `5 minutes`). <br><br>This means that a Content Store will be able to override this value but not exceed it, and the same goes for the clients. A service (Java Interface) client will be able to request a DAU for a custom expiry time but that time can't exceed this value. If the requested time exceeds the maximum value, the expiry time reverts to the default configured one. <br>**Note:** This property is **mandatory** if DAUs are enabled system-wide - (otherwise all DAUs are disabled). |

## ReST API configuration
The ReST API configuration only affects the ReST layer in Content Services.

| Property | Description |
| -------- | ----------- |
| restApi.directAccessUrl.enabled | Enables/disables DAU requests via the ReST API (for example `false`). |
| restApi.directAccessUrl.defaultExpiryTimeInSec | Sets the expiry time in seconds for all the DAUs requested via a ReST call (for example `30`). DAU ReST API calls cannot request an explicit expiry time - unlike the service layer calls).<br><br>Its value cannot exceed the system-wide maximum expiry time configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal to or lower (otherwise the ReST API DAUs are disabled).<br><br>If it's not set, the default system-wide property is used (`system.directAccessUrl.defaultExpiryTimeInSec`). |

## Storage connector content store
In the example of the Azure Connector, each content store (i.e. "final" content store, one that provides actual storage, 
as opposed to a caching content store), should have dedicated configuration options:

| Property | Description |
| -------- | ----------- |
| `connector.az.directAccessUrl.enabled` | Controls whether DAUs are enabled on this specific content store (for example `false`). |
| `connector.az.directAccessUrl.defaultExpiryTimeInSec` | Sets the expiry time in seconds for the DAU in this store, by overriding the global configuration (for example `30`). <br><br>If this value exceeds the content store limit (described below) or the global limit it should fallback to the global configuration. Its value cannot exceed the system-wide maximum expiry time configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise DAUs for the specific content store will be disabled). <br><br>If it's not set, the default system-wide setting is used (`system.directAccessUrl.defaultExpiryTimeInSec`). |
| `connector.az.directAccessUrl.maxExpiryTimeInSec=300` | The maximum expiry time interval that can be requested by clients - content-store specific setting. <br><br>Its value cannot exceed the system-wide configuration (`system.directAccessUrl.maxExpiryTimeInSec`) - it can only be equal or lower (otherwise DAUs for the specific content store will be disabled). <br><br>If it's not set, the default system-wide setting is used (`system.directAccessUrl.maxExpiryTimeInSec`). |

> **Note:** Callers within the platform (i.e. Java interfaces) can either request a specific expiry time or rely on the 
> default value.

> **Note:** When multiple Azure blob containers are used for storage in Alfresco, each Azure Content Store can be 
> configured with either the default (common) Azure Connector-specific properties (i.e. `connector.az.directAccessUrl.enabled` etc.), 
> or new separate properties can be defined for each and every store (i.e. `connector.az.store1.directAccessUrl.enabled`, 
> `connector.az.store2.directAccessUrl.enabled`, etc.).

## Configuration priorities
For DAUs to be usable on the service-layer, the feature must be enabled both system-wide and on the content-store(s). 
For the feature to be usable through ReST (outside the JVM) the *rest-api configuration* must also be enabled.

The `system.directAccessUrl.enabled` property is the main switch for this feature. If this is set to false, then **all** 
DAUs are disabled.

The next configuration that controls specific DAUs is the one for the content store. The `connector.az.directAccessUrl.enabled` 
property controls whether DAUs are enabled for that specific store.

Whether a client can request a DAU by using a ReST endpoint is controlled by the `restApi.directAccessUrl.enabled` property. 
If the ReST endpoint is disabled, but the feature is enabled system-wide and on the content-store, then the DAUs will 
only be usable by Java clients (i.e. only service-level requests will be possible).

## API
The ReST API.

### ReST endpoints
The following endpoints can be used to send requests to obtain DAUs in Content Services:

* `POST /nodes/{nodeId}/request-direct-access-url`
* `POST /nodes/{nodeId}/renditions/{renditionId}/request-direct-access-url`
* `POST /nodes/{nodeId}/versions/{versionId}/request-direct-access-url`
* `POST /nodes/{nodeId}/versions/{versionId}/renditions/{renditionId}/request-direct-access-url`
* `POST /deleted-nodes/{nodeId}/request-direct-access-url`
* `POST /deleted-nodes/{nodeId}/renditions/{renditionId}/request-direct-access-url`

Optionally, the POST body can specify an `attachment` flag. A value of `true` indicates that a download link is required; 
`false` indicates an embedded link is required. This defaults to `true` if it's not specified.

The endpoints return the following type of response for the Azure connector:

```json
{
    "entry": {
        "contentUrl": "https://<storage_account_name>.blob.core.windows.net/<container_name>/<blob_name>?sv=2020-10-02&spr=https&se=2022-02-09T04%3A09%3A40Z&sr=b&sp=r&sig=LkznZiG6u2BUDprdKyk0Hm9XkURG%2BZZp0qy0Ls3kgVY%3D&rscd=attachment%3B%20filename%20%3D%22graph.JPG%22&rsct=image%2Fjpeg",
        "attachment": true,
        "expiryTime": "2022-02-09T04:09:40.638+0000"
    }
}
```

The length of time for which a direct access URL is valid defaults to `30` seconds if not configured otherwise in 
`alfresco-global.properties`.

**Method:** `POST`

**Response:**

Link to the resource wrapped in a JSON Object, which also contains an attachment flag, and the DAU expiration date.

**Error codes:**

If there's no DAU provider installed in Alfresco (such as the Azure Connector), or DAUs aren't enabled, then a `501` HTTP 
status code is returned.

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

#### Azure Connector
Several Azure Java SDK objects (see [BlobSasPermission](https://docs.microsoft.com/en-us/java/api/com.azure.storage.blob.sas.blobsaspermission?view=azure-java-stable){:target="_blank"} and [BlobServiceSasSignatureValues](https://docs.microsoft.com/en-us/java/api/com.azure.storage.blob.sas.blobservicesassignaturevalues?view=azure-java-stable){:target="_blank"}), 
are used to generate SAS (Shared Access Signature), which is then used to generate direct access URLs with the configured 
duration (see Repository and Content Store expiry times configurations).

The pre-signed request generates a download for the remote content.

>**Known Limitations:** SAS generation on Azure Blob depends on the authorization type used (only valid for Azure AD or 
> shared key authorization), see: [https://docs.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas](https://docs.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas){:target="_blank"}

See also the [GitHub project documentation](https://github.com/Alfresco/acs-packaging/blob/master/docs/direct-access-urls.md#main-flows){:target="_blank"} for a detailed view of the main flows and other parts of the implementation.
