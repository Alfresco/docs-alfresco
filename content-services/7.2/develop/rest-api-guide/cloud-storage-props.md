---
title: Cloud Storage Properties
---

Cloud Storage Properties are represented as a key-value pair (String-String) collection. Mentioned pairs are either directly
retrieved from Cloud Storage Provider APIs, such as AWS or Azure, object headers or derived from their values.

Storage Properties are reflected at the content level and content may (especially when in Cloud Storage) or
may not have at least one such property. **Storage Properties are not persisted as part of the metadata** (or any other way),
so we rely on the `ContentStore` and `ServiceAdapter` implementations to provide the means to retrieve/derive the
storage properties information.

When cloud connectors, such as AWS S3 or Azure Blob Storage, do not provide functionality to retrieve storage properties, 
none will be returned.

This Rest API is used by the newest Cloud storage connectors ([S3 Connector 5.0+]({% link aws-s3/latest/index.md %}) and 
[Azure Connector 3.0+]({% link microsoft-azure/latest/index.md %})). 

>**Note**: This API requires at least one of the Cloud storage connectors to be installed. If not it will return an empty 
> collection of storage properties in the responses, such as: `{"entry":{"storageProperties":{},"id":"cm:content"}}`

The requests below show responses for different storage classes when using Alfresco Content Connector for Amazon S3,
similar responses will be returned when Alfresco Content Connector for Azure Blob is installed, although with some
native storage properties with prefix `x-ms-` instead of `x-amz-`.

## List storage properties for a file
List Cloud storage properties for a content node (e.g. file)  in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/getStorageProperties](http://localhost:8080/api-explorer/#/storage-info/getStorageProperties){:target="_blank"}

The following GET request is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/storage-info/{content-property-qname}`

Here is how to make the call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/storage-info/cm%3Acontent' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1686  100  1686    0     0   4052      0 --:--:-- --:--:-- --:--:--  4052

{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "false"
    },
    "id": "cm:content"
  }
}
```

The above response is when you are running with the Standard Storage class.

Intelligent tiering storage class:

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "false",
      "x-amz-storage-class": "INTELLIGENT_TIERING"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (no restore request ongoing or submitted):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "true",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (restore request ongoing, not completed):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archive-restore-in-progress": "true",
      "x-amz-restore": "ongoing-request="true"",
      "x-alf-archived": "true",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (restore request completed):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archive-restore-in-progress": "false",
      "x-amz-restore": "ongoing-request="false", expiry-date="Fri Nov 26 01:00:00 CET 2021"",
      "x-alf-archive-restore-expiry": "2021-11-26T00:00:00.000Z",
      "x-alf-archived": "false",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

## List storage properties for a file version
List Cloud storage properties for a content node (e.g. file)  version in the repository.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/getVersionStorageProperties](http://localhost:8080/api-explorer/#/storage-info/getVersionStorageProperties){:target="_blank"}

**See also:**

* [Get file version history]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#getfileversionhistory)

The following GET request is used:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/versions/{versionId}/storage-info/{content-property-qname}`

Here is how to make the call:

```bash
$ curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/versions/1.0/storage-info/cm%3Acontent' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  1686  100  1686    0     0   4052      0 --:--:-- --:--:-- --:--:--  4052

{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "false"
    },
    "id": "cm:content"
  }
}
```

The above response is when you are running with the Standard Storage class.

Intelligent tiering storage class:

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "false",
      "x-amz-storage-class": "INTELLIGENT_TIERING"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (no restore request ongoing or submitted):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archived": "true",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (restore request ongoing, not completed):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archive-restore-in-progress": "true",
      "x-amz-restore": "ongoing-request="true"",
      "x-alf-archived": "true",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

Glacier archive storage class (restore request completed):

```json
{
  "entry": {
    "storageProperties": {
      "x-alf-archive-restore-in-progress": "false",
      "x-amz-restore": "ongoing-request="false", expiry-date="Fri Nov 26 01:00:00 CET 2021"",
      "x-alf-archive-restore-expiry": "2021-11-26T00:00:00.000Z",
      "x-alf-archived": "false",
      "x-amz-storage-class": "GLACIER"
    },
    "id": "cm:content"
  }
}
```

## Archive a file
Archive a content node (e.g. file) in the Cloud.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/requestArchiveContent](http://localhost:8080/api-explorer/#/storage-info/requestArchiveContent){:target="_blank"}

**See also:**

* [Upload a file]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfile)
* [Upload a file with custom type]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadfilecustomtype)

The following POST request is used, here the `nodeId` refers to a content node in the Alfresco repository that we want 
to archive in the Cloud:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/storage-info/{content-property-qname}/archive`

The POST body for this call looks like this:

>**Note:** This is currently not supported by any Alfresco Cloud Connector.
 
```json
{
  "archiveParams": {
                "x-amz-storage-class": "GLACIER"
              }
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "archiveParams": { "additionalProp1": "string", "additionalProp2": "string", "additionalProp3": "string" }}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/storage-info/cm%3Acontent/archive' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
```

## Archive a file version
Archive a content node (e.g. file) version in the Cloud.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/requestArchiveVersionContent](http://localhost:8080/api-explorer/#/storage-info/requestArchiveVersionContent){:target="_blank"}

**See also:**

* [Get file version history]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#getfileversionhistory)
* [Upload a new version of a file]({% link content-services/7.2/develop/rest-api-guide/folders-files.md %}#uploadnewversionfile)

The following POST request is used, here the `nodeId` refers to a content node in the Alfresco repository and the 
`versionId` refers to the version identifier of that file that we want to archive in the Cloud:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/versions/{versionId}/storage-info/{content-property-qname}/archive`

The POST body for this call looks like this:

>**Note:** This is currently not supported by any Alfresco Cloud Connector.

```json
{
  "archiveParams": {
                "x-amz-storage-class": "GLACIER"
              }
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{ "archiveParams": { "additionalProp1": "string", "additionalProp2": "string", "additionalProp3": "string" }}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/versions/1.0/storage-info/cm%3Acontent/archive' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
```

## Restore file from archive {#restorefile}
Restore an archived content node (e.g. file) from the Cloud.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/requestRestoreContentFromArchive](http://localhost:8080/api-explorer/#/storage-info/requestRestoreContentFromArchive){:target="_blank"}

The following POST request is used, here the `nodeId` refers to a content node in the Cloud provider storage (i.e. 
AWS S3 or Azure Blob) that we want to restore:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/storage-info/{content-property-qname}/archive-restore`

The POST body for this call has one parameter that specifies the restore priority:

* `High` restore priority translates to 'Expedited' Glacier restore tier in AWS S3 and 'High' rehydrate priority in Azure Blob.
* `Standard` restore priority translates to 'Standard' Glacier restore tier in AWS S3 and 'Standard' rehydrate priority in Azure Blob.

High restore priority request body example:

```json
{
"restorePriority": "High"
}
```

Standard restore priority request body example:

```json
{
"restorePriority": "Standard"
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{  "restorePriority": "Standard"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/storage-info/cm%3Acontent/archive-restore' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
```

## Restore file version from archive
Restore an archived content node (e.g. file) version from the Cloud.

**API Explorer URL:** [http://localhost:8080/api-explorer/#/storage-info/requestRestoreVersionContentFromArchive](http://localhost:8080/api-explorer/#/storage-info/requestRestoreVersionContentFromArchive){:target="_blank"}

The following POST request is used, here the `nodeId` refers to a content node in the Cloud provider storage (i.e.
AWS S3 or Azure Blob) and the `versionId` is the version of it that we want to restore:

`http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/{nodeId}/versions/{versionId}/storage-info/{content-property-qname}/archive-restore`

The POST body for this call has one parameter that specifies the restore priority:

* `High` restore priority translates to 'Expedited' Glacier restore tier in AWS S3 and 'High' rehydrate priority in Azure Blob.
* `Standard` restore priority translates to 'Standard' Glacier restore tier in AWS S3 and 'Standard' rehydrate priority in Azure Blob.

High restore priority request body example:

```json
{
"restorePriority": "High"
}
```

Standard restore priority request body example:

```json
{
"restorePriority": "Standard"
}
```

The call looks like this:

```bash
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' -d '{  "restorePriority": "Standard"}' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/nodes/2b1111e5-c79e-445e-909a-46c989bc3531/versions/1.0/storage-info/cm%3Acontent/archive-restore' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
```