---
title: Generate document
---

The generate document service is used to create DOCX and PDF files using a template. The generated document is then saved to the Content Services repository and can be reused throughout the process.

A generate document task is displayed as a stack of documents on the process diagram.

## Create a generate document task

The generate document service is stored in the palette separate from other connectors. To create a generate document task:

1. Sign into the Modeling Application and open a project and process.

2. Click the stack of documents in the tool palette.

3. The option to use an existing instance of the connector or create a new one will display.

    * **Create a new instance** if it is the first time using the generate document service within the project, and give it a name.

    * Select an existing instance if the generate document service has already been used within the project.

4. Drag the task onto the diagram canvas and fill in the properties.

> **Note**: The generate document service does not have any [configuration parameters]({% link process-automation/latest/model/connectors/index.md %}#configuration-parameters) as it connects directly to the Content Services repository. This means that only a single instance of the connector is required per project.

## Properties

The generate document service is implemented as a [service task]({% link process-automation/latest/model/processes/bpmn.md %}#service-task). All the properties available to a service task are those required by the generate document service. The three most important ones to understand for the generate document service are:

| Property | Description |
| -------- | ----------- |
| Implementation | *Required.* Displays the name of the connector the task is using. This will be the name chosen when creating a connector instance. |
| Action | *Required.* Selects which action the connector task should execute, for example `GENERATE`. |
| Mapping type | *Required.* Sets how data should be passed between the connector and the process by mapping the [input and output parameters]({% link process-automation/latest/model/processes/index.md %}#process-variable-mapping). For example, setting the details of the file to select and which process variable will store it. |

## Generate

The **GENERATE** action is used to create a new document using a template, store it in the repository and create it as a variable for reuse within the process.

The input parameters to generate a document are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| template | File | *Required.* The [template](#template) to use for generating the file stored as a file variable. |
| metadata | JSON | *Optional.* Metadata to be used by the `template` when generating the file to include [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) in the output. |
| outputFileName | String | *Optional.* The name of the generated file, for example `onboarding-form`. |
| outputFormat | String | *Optional*. The file type for the generated document. Possible values are DOCX and PDF. The default value if PDF. |
| targetFileMetadata | Content-Metadata | *Optional.* Metadata to store the file with. This is a JSON object of key value pairs. See below for an example. |
| underscoreMetadata | Boolean | *Optional.* If set to `true`, the input `targetFileMetadata` can have its namespace prefixes written with `_` instead of `:`, for example `cm_title` instead of `cm:title`. This allows the JSON to be used in an expression, for example `${metadata.cm_title}`, whereas `${metadata.cm:title}` is not valid. |
| targetFileType | Content-Type | *Optional.* The type to set for the generated file, for example `fin:invoice`. |
| targetFile | File | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type file that should be updated. |
| targetFolder | Folder | *Requires one.* A [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables) of type folder to store the new file in. |
| targetFolderId | String | *Requires one.* The nodeId of the folder to store the new file in. For example `775a8f2d-8123-49a7-ae1f-f3f49d4eae20`. |
| targetFolderPath | String | *Requires one.* The location path or relative path of the folder to store the new file in. For example, a location path: `/app:company_home/app:user_homes/cm:hruser` and a relative path: `/User Homes/hruser`. |

> **Note**: `underscoreMetadata` can be set to `true` and the `targetFileMetadata` input can still use `:` with the connector successfully executing the action. If `underscoreMetadata` is set to `false` and `targetFileMetadata` uses `_` then the connector will fail to execute the action.

An example of the `targetFileMetadata` that can be stored with the document is:

```json
{
"ahr:contract-type": "Full Time",
"ahr:full-name": "John Doe",
"ahr:role": "Developer"
}
```

The output parameters from generating a document are:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| file | File | *Optional.* The generated document available to be mapped to a [variable]({% link process-automation/latest/model/processes/index.md %}#process-variables). |

## Template

A template is used to generate a document. Optional metadata can also be used with the template to insert values from [process variables]({% link process-automation/latest/model/processes/index.md %}#process-variables) into the document template.

An example of the `metadata` that can be used by the template is:

```json
{
"iceCream": {
	"flavor":"Mint"
	},
"timeOfYear": {
	"season":"Summer"
	}
}
```

An example of how the template can import values from the `metadata` is:

```bash
Current season: <<[timeOfYear.get("season")]>>
Flavor of the month: <<[iceCream.get("flavor")]>>
```

In the generated document this would display as:

```text
Current season: Summer
Flavor of the month: Mint
```

## Errors

The possible [errors]({% link process-automation/latest/model/connectors/index.md %}#errors) that can be handled by the generate document service are:

| Error | Description |
| ----- | ----------- |
| MISSING_INPUT | A mandatory input variable was not provided. |
| INVALID_INPUT | The input variable has an invalid type. |
| INVALID_RESULT_FORMAT | The REST service result payload cannot be parsed. |
| TEMPLATE_READ_ERROR | Cannot read the document template. |
| UNKNOWN_ERROR | Unexpected runtime error. |
| BAD_REQUEST | The server could not understand the request due to invalid syntax. |
| UNAUTHORIZED | The request has not been applied because it lacks valid authentication. |
| FORBIDDEN | The server understood the request but refuses to authorize it. |
| NOT_FOUND | The server could not find what was requested. |
| METHOD_NOT_ALLOWED | The request method is known by the server but is not supported. |
| NOT_ACCEPTABLE | The server cannot produce a response matching the list of acceptable values. |
| REQUEST_TIMEOUT | The server would like to shut down this unused connection. |
| CONFLICT | The request conflicts with current state of the server. |
| GONE | No longer available. |
| UNPROCESSABLE_ENTITY | The server understands the content type of the request entity, and the syntax of the request entity is correct, but it was unable to process the contained instructions. |
| LOCKED | The resource that is being accessed is locked. |
| FAILED_DEPENDENCY | The request failed due to failure of a previous request. |
| INTERNAL_SERVER_ERROR | The server has encountered a situation it doesn't know how to handle. |
| NOT_IMPLEMENTED | The request method is not supported by the server and cannot be handled. |
| BAD_GATEWAY | The server got an invalid response. |
| SERVICE_UNAVAILABLE | The server is not ready to handle the request. |
| GATEWAY_TIMEOUT | The server is acting as a gateway and cannot get a response in time. |
