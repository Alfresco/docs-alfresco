---
title: Configure GenericXchange
---

Use this information to configure the GenericXchange module used for flexible data exchange either RFC/SNC connection or by invoking an OData service on the related SAP System (either SAP Cloud Essentials or SAP S/4HANA on premises).

## Preface
The `GenericXchange` (short `GX`) is a powerful module that allows to exchange any metadata between SAP and Content Services by using a Low Code approach. This means, the configuration is done in a JSON file that must be uploaded to Content Services. Once uploaded, the changes are reflected immediately, no restart of the application server required. The module can either invoke any OData service in SAP Cloud Essentials or can also be used to call any remote enabled function module on SAP S/4HANA using RFC via SAP JavaConnector.

## Basic Configuration {#gx_basic}

If the module was successfull installed, there is a need to apply some basic settings in the `alfresco-global.properties`. The changes requires a restart of the application server afterwards.

### Settings for OData {#gx_basic_odata}
If the data exchange should happen via OData services, the following properties must be added:

| Property Key        | Description           |
| ------------- |-------------|
| `genericXchange.rest.sap.system.1.job.enabled`| Whether data exchange should be enabled for the configuration (`1`) or not. Example value: `true` or `false` (default) |
| `genericXchange.rest.sap.system.1.job.cronExpression`| The CRON expression used for the job. Example value: `0 0/1 * 1/1 * ? *`|


> **Note:** It is possible to have up to 100 different Jobs, where each can invoke a separate OData service. This can be accomplished by duplicating the both properties and increasing the number within the key names.

### Settings for RFC/SNC {#gx_basic_rfc}
If the data exchange should happen via RFC/SNC by calling a SAP function module, the following properties must be added:


| Property Key|Description|
| -------------|-------------|
| `genericXchange.rfc.sap.system.1.job.enabled`|Whether data exchange should be enabled for the configuration (`1`) or not. Example value: `true` or `false` (default) |
| `genericXchange.rfc.sap.system.1.job.cronExpression`|The CRON expression used for the job. Example value: `0 0/1 * 1/1 * ? *`|
|`genericXchange.rfc.sap.system.1.name`|An arbitrary value for the current configuration. Should not contain special characters. Must be unique across all available configurations. Recommendation: Should contain the name of the connected SAP system. Example value: `NSP SAP System` or `SAP Cloud System`.| 
|`genericXchange.rfc.sap.system.1.host`|The IP address of the SAP server or the SAP Router string. Example value: `192.168.112.112` or `sap.mydomain.com` or `/H/80.112.112.112/H/192.168.112.112/S/3201`|
|`genericXchange.rfc.sap.system.1.systemNumber`|The SAP system number. Example value: `00` or `01`|
|`genericXchange.rfc.sap.system.1.client`|The SAP client used to log in to the SAP system. Example value: `100` or `800`|
|`genericXchange.rfc.sap.system.1.user`|SAP system user used for the login. Example value: `ALFR3SC0`|
|`genericXchange.rfc.sap.system.1.password`|Password for the SAP user. Either plain-text or use encrypted password. [See Encrypting passwords for more](https://docs.alfresco.com/sap/latest/admin/reference/#encryptpwd). Example value: `H3ll0W0rlD112!` or `ENC(XbfE4Z112==)`|
|`genericXchange.rfc.sap.system.1.language`|The SAP system language used to login Example value: `EN` or `DE`|


> **Note:** It is also possible to have up to 100 configurations, where each can invoke a separate configuration file in Content Services. This can be accomplished by duplicating all properties above and increasing the number within the key names.

### Prepare Content Services {#gx_basic_prepare_acs}
Once the related settings in the `alfresco-global.properties` are applied, check whether the following folder exists in Content Services: 
> `Data Dictionary` -> `SAP Content Connector` -> `genericXchange`

If the folder (structure) does not exists, create it. Pay attention to correct spelling (uppercase/lowercase, spaces). 

This is the folder to upload all JSON configuration files that are responsible for data exchange. 

### Job Approach and Behavior Approach {#gx_basic_job_behaviour}
The data exchange can be scheduled on a periodic basis (`Job`) or based on a particular action on the document/folder (`Behaviour`) in Content Services. Each way requires a slightly different JSON notation.

> **Note:** The recommendation is to always use the `Job` approach whenever possible. 

 Approach | Pros | Cons
------------ | ------------- | ------------
Job<br/>`preferred` | Queue is available, this means that in any error case the document(s) could be picked up again in the next Job execution based on the document state.  | Execution does not happen immediately.
Behavior | Execution happens immediately after related action. |A separate paid SAP system user is required (otherwise this approach infringes the SAP Terms & Conditions). Ask your SAP representative.<br/>There is no queue.

## Job Approach {#gx_job}

> **Note:** You must set a exclusion criterion in the mandatory `query` property of the configuration JSON. To set a flag after the SAP function module has successfully processed the document, use the `success` property. The `success` property can set any property to an arbitrary value at the Alfresco document. Then, use this property value for the exclusion criterion in the `query`. If there is no exclusion criterion set, the document(s) will be picked up again in the next Job execution, and again, and again...

## Mapping
The mapping between the settings part in the ```alfresco-global.properties``` (Refer to the [Basic Configuration](#gx_basic)) and the related JSON file uploaded to Content Services is done via filename of the JSON file and is different for OData and RFC/SNC usage.

### Mapping for OData Services
A JSON file with name `restJob.`**1**`.json` is mapped to keys `genericXchange.rest.sap.system.`**1**`.job.enabled` and `genericXchange.rest.sap.system.`**1**`.job.cronExpression` in the `alfresco-global.properties`.


### Mapping for RFC/SNC
A JSON file with name `rfcJob.`**1**`.json` is mapped to all keys starting with `genericXchange.rfc.sap.system.`**1**`.*` (Refer to [Settings for RFC/SNC](#gx_basic_rfc)) in the `alfresco-global.properties`. 


## Configuration {#gx_job_config}
Configuration options for the Jobs JSON file(s).

### Job JSON {#gx_job_json}
The following table lists all available settings for the `restJob.1.json` respective `rfcJob.1.json` file.

Property | Type | Value(s) | Description
------------ | ------------- | ------------ | ------------
**`enabled`** | Boolean | `true` or<br/>`false` | Whether the Job is enabled or not. Also remember that there exists a property called `genericXchange.rest.sap.system.1.job.enabled` in the `alfresco-global.properties`! If this is `false` then the related setting in the JSON does have no effect, regardless of its value.
**`filter`** | Object | ***[Refer to Property `filter`](#odata_prop_filter)*** | Define the AFTS query to find the desired documents to be processed in Content Services. It also holds a threshold value which is responsible for the termination criterion. The threshold defines the maximum number tries to process a document until it will be excluded.|
**`createALFolder`** | Boolean | `true` or<br/>`false` | ***Not required for Content Connector for SAP Cloud  (may only be used for with [Content Connector for SAP Applications](https://docs.alfresco.com/sap/latest))*** If `true`, the parent folder for the current document will be created and the required SAP ArchiveLink related aspects will be applied to it. This is to match the SAP ArchiveLink protocol specification.|
**`request`**| Object | ***[Refer to Property `request`](#gx_odata_prop_request)*** | Defines the request to call the OData service with all necessary parameter.|
**`response`**| Object | ***[Refer to Property `response`](#gx_odata_prop_request)*** | Defines the mapping between each property of the OData call result and the property in Content Services.|
**`error`** | Object<br/> | ***[Refer to Property `error`](#gx_prop_error)*** | ***Optional Property.*** Handles the errors which might be returned by the `request` above. [Refer to specification of property `error`](#gx_prop_error).|
**`success`** | Object |  ***[Refer to Property `success`](#gx_prop_success)*** | ***Optional Property.*** Handles the success messages which might be returned by the `request`.|

#### Property Specification
This section contains the detailed property definition of the properties above.

##### ***Property `success`*** {#gx_prop_success}
> **Note:** This is an optional property.

This property is responsible to store a defined text (key `state`) in any available property at the Alfresco document (key `alfProp`) once the SAP function module returned successfully (no error, refer to property [[**error**|conf_error]]).

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`alfProp`** | String | *connexasAdministration:sapstatus* | Define the property at the Alfresco document which holds the success state.
**`state`** | String | *Linked to SAP* | Define the value for `alfProp`.

Example:
```
"success": {
    "alfProp": "connexasAdministration:sapstatus",
    "state": "Linked to SAP"
}
```

##### ***Property `error`*** {#gx_prop_error}
> **Note:** This is an optional property.

If the OData call returns with an error, the returned value of this *error* property can be written to any available property on the current document in Content Services.


Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`alfProp`** | String | *connexasAdministration:sapstatus* | Specify the property at the Alfresco document which holds the error state.
**`state`** | String | *Error* | Define the value for `alfProp`.
**`message`** | Object | *See example below* | Define the property at the document where the error message should be stored. Can be also a list of properties setting different values from the error response (see example below).

Example:
```
	"error": {
		"alfProp": "connexasAdministration:sapstatus",
		"state": "Error",
		"message": {
			"connexasAdministration:saperror": "error.message.value",
			"cm:description": "error.message.statusCode"
		}
	}
```
