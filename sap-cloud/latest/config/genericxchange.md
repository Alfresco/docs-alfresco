---
title: Configure GenericXchange
---

Use this information to configure the GenericXchange module used for flexible data exchange either RFC/SNC connection or by invoking an OData service on the related SAP System (either SAP Cloud Essentials or SAP S/4HANA on premises).

## Preface
The `GenericXchange` (short `GX`) is a powerful module that allows to exchange any metadata between SAP and Content Services by using a Low Code approach. This means, the configuration is done in a JSON file that must be uploaded to Content Services. Once uploaded, the changes are reflected immediately, no restart of the application server required. The module can either invoke any OData service in SAP Cloud Essentials as well as in an SAP S/4HANA on premise system or it can also be used to call any remote enabled function module on SAP S/4HANA on premise using RFC via SAP JavaConnector.

## Basic Configuration {#gx_basic}

If the module was successfull installed, there is a need to apply some basic settings in the `alfresco-global.properties`. The changes requires a restart of the application server afterwards.

### Settings for OData {#gx_basic_odata}
If the data exchange should happen via OData services, the properties in the below table must be added.

> **Note:** In general, any Rest service can be invoked by the Content Connector for SAP Cloud. As the primarily connection is intended is to connect to an SAP Cloud system, this documention will use the word OData in the further course. 

| Property Key        | Description           |
| ------------- |-------------|
| `genericXchange.rest.sap.system.1.job.enabled`| Whether data exchange should be enabled for the configuration (`1`) or not. Example value: `true` or `false` (default) |
| `genericXchange.rest.sap.system.1.job.cronExpression`| The CRON expression used for the job. Example value: `0 0/1 * 1/1 * ? *`|


It is possible to have up to 100 different Jobs, where each can invoke a separate OData service. This can be accomplished by duplicating the both properties and increasing the number within the key names.

### Settings for RFC/SNC {#gx_basic_rfc}
If the data exchange should happen via RFC/SNC by calling a SAP function module with the SAP JavaConnector, the properties in the table must be added.

> **Note:** To invoke function modules with the SAP JavaConnector, there is a need to have the required native libraries from SAP available. This must be [downloaded from the SAP Support portal](https://docs.alfresco.com/sap/latest/install/#download-files) for the current system architecture.  

| Property Key|Description|
| -------------|-------------|
| `genericXchange.rfc.sap.system.1.job.enabled`|Whether data exchange for a [Job](#gx_job) should be enabled for the configuration (`1`) or not. In case of [Behaviour](#gx_behaviour) usage, this setting has no effect. Example value: `true` or `false` (default) |
| `genericXchange.rfc.sap.system.1.job.cronExpression`|The CRON expression used for the job. Example value: `0 0/1 * 1/1 * ? *`|
|`genericXchange.rfc.sap.system.1.name`|An arbitrary value for the current configuration. Should not contain special characters. Must be unique across all available configurations. Recommendation: Should contain the name of the connected SAP system. Example value: `NSP SAP System` or `SAP Cloud System`.| 
|`genericXchange.rfc.sap.system.1.host`|The IP address of the SAP server or the SAP Router string. Example value: `192.168.112.112` or `sap.mydomain.com` or `/H/80.112.112.112/H/192.168.112.112/S/3201`|
|`genericXchange.rfc.sap.system.1.systemNumber`|The SAP system number. Example value: `00` or `01`|
|`genericXchange.rfc.sap.system.1.client`|The SAP client used to log in to the SAP system. Example value: `100` or `800`|
|`genericXchange.rfc.sap.system.1.user`|SAP system user used for the login. Example value: `ALFR3SC0`|
|`genericXchange.rfc.sap.system.1.password`|Password for the SAP user. Either plain-text or use encrypted password. [See Encrypting passwords for more](https://docs.alfresco.com/sap/latest/admin/reference/#encryptpwd). Example value: `H3ll0W0rlD112!` or `ENC(XbfE4Z112==)`|
|`genericXchange.rfc.sap.system.1.language`|The SAP system language used to login Example value: `EN` or `DE`|


> **Note:** For both, OData and RFC/SNC, it is possible to have up to 100 separate configurations, where each can invoke a separate configuration file in Content Services. This can be accomplished by duplicating all properties above and increasing the number within the key names.

### Prepare Content Services {#gx_basic_prepare_acs}
Once the related settings in the `alfresco-global.properties` are applied, check whether the following folder exists in Content Services: 
> `Data Dictionary` -> `SAP Content Connector` -> `genericXchange`

If the folder (structure) does not exists, create it. Pay attention to correct spelling (uppercase/lowercase, spaces). 

This is the folder to upload all JSON configuration files that are responsible for data exchange. 

### Job Approach and Behaviour Approach {#gx_basic_job_behaviour}
The data exchange can be scheduled on a periodic basis (`Job`) or based on a particular action on the document/folder (`Behaviour`) in Content Services. Each way requires a slightly different JSON notation.

> **Note:** The recommendation is to always use the `Job` approach whenever possible. 

 Approach | Pros | Cons
------------ | ------------- | ------------
Job<br/>`preferred` | Queue is available, this means that in any error case the document(s) could be picked up again in the next Job execution based on the document state.  | Execution does not happen immediately.
Behaviour | Execution happens immediately after related action. |A separate paid SAP (system) user is required (otherwise this approach infringes the SAP Terms & Conditions). Ask your SAP representative.<br/>There is no queue.

## Behaviour Approach {#gx_behaviour}

> **Note:** Using this approach requires a separate SAP (system) user.  


## Job Approach {#gx_job}

> **Note:** You must set a exclusion criterion in the mandatory `query` of the [`filter` property](#gx_prop_filter) of the JSON. To set a flag after the SAP function module has successfully processed the document, use the `success` property. The `success` property can set any property to an arbitrary value at the Alfresco document. Then, use this property value for the exclusion criterion in the `query`. If there is no exclusion criterion set, the document(s) will be picked up again in the next Job execution, and again, and again...

## Mapping {#gx_mapping}
The mapping between the settings part in the ```alfresco-global.properties``` (Refer to the [Basic Configuration](#gx_basic)) and the related JSON file uploaded to Content Services is done via filename of the JSON file and is different for OData and RFC/SNC usage.

### Mapping for OData Services {#gx_mapping_odata}
A JSON file with name `restJob.`**1**`.json` is mapped to keys `genericXchange.rest.sap.system.`**1**`.job.enabled` and `genericXchange.rest.sap.system.`**1**`.job.cronExpression` in the `alfresco-global.properties`.

### Mapping for RFC/SNC invoked by Job {#gx_mapping_rfc_job}
A JSON file with name `rfcJob.`**1**`.json` is mapped to all keys starting with `genericXchange.rfc.sap.system.`**1**`.*` (Refer to [Settings for RFC/SNC](#gx_basic_rfc)) in the `alfresco-global.properties`. 

### Mapping for RFC/SNC invoked by Behaviour {#gx_mapping_rfc_behaviour}
A JSON file with name `rfcBehaviour.`**1**`.json` is mapped to all keys starting with `genericXchange.rfc.sap.system.`**1**`.*` (Refer to [Settings for RFC/SNC](#gx_basic_rfc)) in the `alfresco-global.properties`. In addition, the value of `genericXchange.rfc.sap.system.`**1**`.name` must match the value of key `sapName` in the related JSON file.
> **Note:** Value for `genericXchange.rfc.sap.system.`**1**`.name` (and therefore even the value for `sapName` in the JSON) should only consists of characters (a-z A-Z) and/or numbers (0..9). No whitespaces, special characters or any character beyond 128 in the ASCII table.

## Configuration {#gx_job_config}
Configuration options for the Jobs JSON file(s).

### Job JSON {#gx_job_json}
The following table lists all available settings for the `restJob.1.json` (= OData) respective `rfcJob.1.json`. The column **`Required For`** specifies for which type (either OData or RFC or All) the setting must be present in the JSON configuration file.

Property | Type | `Required For` |Value(s) | Description
------------ | ------------- | :-------------: | ------------ | ------------
**`enabled`** | Boolean | All| `true` or<br/>`false` | Whether the Job is enabled or not. Also remember that there exists a property called `genericXchange.rest.sap.system.1.job.enabled` in the `alfresco-global.properties`! If this is `false` then the related setting in the JSON does have no effect, regardless of its value.
**`filter`** | Object |All| ***[Refer to Property `filter`](#gx_prop_filter)*** | Define the AFTS query to find the desired documents to be processed in Content Services. It also holds a threshold value which is responsible for the termination criterion. The threshold defines the maximum number tries to process a document until it will be excluded.|
**`mandatoryProperties`**|Array| All|*cm:title,<br/>cm:description*|A list of mandatory properties that must be present on the documents which are returned by the `filter` to be considered for processing.|
**`createALFolder`** | Boolean |RFC| `true` or<br/>`false` | ***Not required for Content Connector for SAP Cloud  (may only be used for with [Content Connector for SAP Applications](https://docs.alfresco.com/sap/latest))*** If `true`, the parent folder for the current document will be created and the required SAP ArchiveLink related aspects will be applied to it. This is to match the SAP ArchiveLink protocol specification.|
**`mode`**| String |RFC| *standard* or<br/>*chain* or<br/>batch | The mode, how the module handles the specified function modules.<br/>***standard:*** Invoke one function module for the current document.<br/>***chain:*** Invoke multiple function modules in the given order for the current document.<br/>***batch:*** Invoke one function module with a bunch of Alfresco documents.|
**`functionModule`** / **`functionModules`**| Object | RFC | ***[Refer to Property `functionModule`](#gx_rfc_prop_functionmodule)*** | Specifiy SAP function module(s) including all required parameter.|
**`request`**| Object |OData| ***[Refer to Property `request`](#gx_odata_prop_request)*** | Defines the request to call the OData service with all necessary parameter.|
**`response`**| Object |OData| ***[Refer to Property `response`](#gx_odata_prop_request)*** | Defines the mapping between each property of the OData call result and the property in Content Services.|
**`error`** | Object<br/> |All| ***[Refer to Property `error`](#gx_prop_error)*** | ***Optional Property.*** Handles the errors which might be returned by the `request` or `functionModule`.|
**`success`** | Object |All| ***[Refer to Property `success`](#gx_prop_success)*** | ***Optional Property.*** Handles the success messages which might be returned by the `request`or `functionModule`.|

### Behaviour JSON {#gx_behaviour_json}

> **Note:** 
  * Make sure to have all [required RFC related settings](#gx_basic_rfc) present in the `alfresco-global.properties`.
  * Make sure to use always a separate paid SAP (system) user for the connection.

> **Important:** Each change in the JSON configuration file for a Behaviour requires to reload the script on all Content Services nodes (or by restarting each Content Services node). To reload the Behaviour JSON file, a Webscript with name `genericXchange Reload` is provided. This Webscript is part of the `Content Connector for SAP - genericXchange` Webscript family which can be accessed in the `Alfresco WebScripts Home`. 

The following table lists all available settings for the `rfcBehaviour.1.json` (there are no OData calls along with an Alfresco Behaviour possible). All the settings below must be present in the JSON configuration file. 

Property | Type | Value(s) | Description
------------ | ------------- | ------------ | ------------
**`enabled`** | Boolean | `true` or<br/>`false` | Whether the Behaviour is enabled or not.|
**`sapName`** | String | *GX_Behaviour_S4H* | Define the mapping to the related SAP system configuration in the `alfresco-global.properties`. For example, must match the value of key `genericXchange.rfc.sap.system.`**1**`.name`.|
**`mode`** | String | *standard* or<br/>*chain* | The mode, how the module handles the specified function modules.<br/>***standard:*** Invoke one function module for the current document.<br/>***chain:*** Invoke multiple function modules in the given order for the current document.|
**`behaviour`** | String | `onUpdateProperties` or<br/> `onAddAspect` or<br>see NodePolicy list | Any behaviour from the [NodeServicePolicies interface](https://dev.alfresco.com/resource/docs/java/org/alfresco/repo/node/NodeServicePolicies.html) of the Alfresco Public API.
**`notificationFrequency`** | String| `TRANSACTION_COMMIT` or<br/>`EVERY_EVENT` or<br/>`FIRST_EVENT` | Define where in the transaction event the handler is invoked. Refer to the [Alfresco documentation](https://docs.alfresco.com/6.2/references/dev-extension-points-behaviors.html).
**`listeningOn`** | String | *cm:summarizable*  | The aspect which must be available on the document to invoke the behaviour. Must be entered with namespace prefix.
**`mandatoryProperties`** | Array | *cm:summary* | List of all mandatory properties on the document which must be set to invoke the behavior (can’t be empty or null). **Note:** Only if all specified properties has changed their values, the behaviour is invoked. It is not enough just to have the property available and filled, it also must be changed.|
**`aspects`** | Array |  *cm:titled* | List of all aspects which must be available at the document to invoke the behaviour.
**`noAspects`** | Array |  *cm:taggable* | List of all aspects which should not be present at the document to invoke the behaviour. If at least one aspect in this list available at the document, the behaviour does not fire.
**`values`** | Object | *[<br/>"cm:title": "Alfresco"<br/>]* | A list of objects with property names and defined values which must be available to invoke the behaviour. Here it’s possible to trigger the behaviour only for specified values of a property. For a list of defined property/value pairs all must match to invoke the behaviour. **Note:** The value must exact match the defined value (case sensitive, no wildcards)! A list of possible values can also be defined (see exapmle for `noValues`). Referring to the example column: The behaviour would only be invoked if `cm:title` exact matches the word *`Alfresco`*. |
**`noValues`** | Object | *[<br/>"cm:title": "Alfresco",<br/>* *"cm:summary": ["Happy" , "Day"]<br/>]* | A list of objects with property names having defined values which are not allowed to invoke the behaviour. Here it’s possible to prevent the execution of the behaviour for properties having specified values. **Note:** The value must exact match the defined value (case sensitive, no wildcards)! Referring to the example column: The behaviour would only be invoked if `cm:summary` exact matches either the word *`Happy`* **OR** the word *`Day`* **AND** `cm:title` matches the word *`Alfresco`*.|
**`detachBehaviour`** | Boolean | `true` or<br/>`false` | If `true` the RFC call (see parameter `functionModule`/`functionModules` below) will be fired after the behaviour has been finished. 
**`asyncRfc`** | Boolean | `true` or<br/>`false` | Whether to invoke the behaviour asynchron or synchron.
**`createALFolder`** | Boolean | `true` or<br/>`false` | If `true`, the parent folder for the current document will be created and the required SAP ArchiveLink related aspects will be applied to it. This is to match the SAP ArchiveLink protocol specification.|
**`functionModule`** / **`functionModules`**| Object | ***[Refer to Property `functionModule`](#gx_rfc_prop_functionmodule)*** | Specifiy SAP function module(s) including all required parameter.|
**`error`** | Object<br/> | ***[Refer to Property `error`](#gx_prop_error)*** | ***Optional Property.*** Handles the errors which might be returned by the `request` or `functionModule`.|
**`success`** | Object | ***[Refer to Property `success`](#gx_prop_success)*** | ***Optional Property.*** Handles the success messages which might be returned by the `request`or `functionModule`.|


#### Property Specification {#gx_property_specification}
This section contains the detailed Object definitions for the *Value(s)* column of the [tables above]({#gx_job_json}).

##### ***Property `success`*** {#gx_prop_success}
> **Note:** This is an optional property.

This property is responsible to store a defined text (key `state`) in any available property at the Alfresco document (key `alfProp`) once the SAP function module returned successfully (to handle errors, refer to property [**error**](#gx_prop_error).

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
##### ***Property `filter`*** {#gx_prop_filter}
This property is responsible to query all documents in the repository for processing based on the given `query`. It also specifies the maximum number of tries where the files will be picked up for processing until it will be excluded (e.g. in case of errors). For RFC/SNC calls (but not for OData), there is an additional parameter `archiveIds` available.

> **Note:** Do not forget to specify an exclusion criterion for the documents in the `query`.


Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`query`** | String | *TYPE:\"cm:content\" AND NOT ASPECT:\"cm:titled\"* | Define the AFTS query to find content for processing.|
**`errorThreshold`** | Number | *10* | Maximum number of tries to process the document until it will be excluded.|
**`archiveIds`** | Array | *D1* | ***Optional Property.*** Define the archiveIds that must be available on the document in property *connexas:archiveId*.|

Example:
```
  "filter": {
    "query": "TYPE:\"cm:content\" AND NOT ASPECT:\"cm:titled\"",
    "errorThreshold": 10,
    "archiveIds": [ "D1" ]
  },
```

##### ***Property `request`*** {#gx_odata_prop_request}
This property defines all required data to call an OData service.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`method`** | String | *get* | Define the HTTP method for the OData service.|
**`validateCertificate`** | Boolean | *true* | To deactivate/activate the `https` certificate check.|
**`baseUrl`** | Object |  | The url to the OData enpoints of the SAP system.|
**`endpoint`** | Object | ***[Refer to Property `endpoint`](#gx_odata_prop_request_endpoint)*** | Specifies the OData service enpoint. |
**`headers`** | Object |  | Headers for `method`, such as PUT, POST, UPDATE or DELETE.|
**`body`** | Object |  | The body content for `method`, such as PUT, POST, UPDATE or DELETE. Dependend on the OData service.|
**`credentials`** | Object |  | Username and Passwort to login to the SAP Cloud.|

##### ***Property for `endpoint`*** {#gx_odata_prop_request_endpoint} 
This property is a child element of [`request`](#gx_odata_prop_request).

> **Note:** Only OData services are supported that can return a JSON response.

Properties for `endpoint` | Type | Example Value(s)| Description
------------ | ------------- | ------------- | ------------
**`url`** | String | *\<mysapcloud\>.com/sap/opu/odata/sap/* | The name of the OData service endoint. To pass values from the current document in Content Services, use placeholders such as `{1}`, `{2}`,... These placeholders will be subsituted with the values of the defined property specified in `substitutions`. Refer to example below.|
**`substitutions`** | Object | *"alfProp": "sapbo:Product:Product"* |Substitutions for the placeholder used in the `url` above. **Note:** It starts with index = 1 and they are replaced in the given order!|

Example for property ```request``` [Return Product Master Records](https://api.sap.com/api/API_PRODUCT_SRV/resource):
```
"request": {
	"method": "get",
	"validateCertificate": true,
	"baseUrl": "https://mysapcloud-api.s4hana.ondemand.com/sap/opu/odata/sap/",
	"endpoint": {
		"url": "API_PRODUCT_SRV/A_Product('{1}')?$format=json",
		"substitutions": [
			{
				"alfProp": "sapbo:Product:Product"
			}
		]
	},
	"headers": {
	},
	"body": {
	},
	"credentials": {
		"user": "USERNAME",
		"password": "PASSWORD"
	}
},
```

##### ***Property `response`*** {#gx_odata_prop_response}

> **Note:** Only OData services are supported that can return a JSON response.

This property defines how the values in the response of the OData call are mapped to the data-model properties of Content Services. The content is a list of *key*-*value* pairs. The *key* defines the name of the data-model property in Content Services where the *value* should be stored. The *value* for the *key* in turn specifies the path to the desired element in the JSON map which holds the value. It can be accessed by using the format `$.d.KeyName`.

Example:
```
"response": {
	"cm:name": "$.d.Product",
	"cm:title": "$.d.Language",
	"cm:description": "$.d.ProductDescription"
},
```

##### ***Property `functionModule` / `functionModules`*** {#gx_rfc_prop_functionmodule}

> **Note:** Only required for RFC/SNC calls. Refer to [overview table above](#gx_job_json).

This parameter holds the specification of the function modules which will be invoked by the job. If the `mode` parameter is set to `chain`, this section requires a list of objects and therefore the parameter name ***must*** be set to `functionModules` (plural), meaning the *SAP Function Modules* in this list will be invoked in the given order. If `mode` is set to `standard` or `custom`, the parameter name must be `functionModule` (singular) only. The table below will break-down the structure required to fill this parameter.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`name`** | String | *ARCHIV_GET_CONNECTIONS* | The name of the RFC enabled function module in SAP.
**`importParams`** | Object | ***[Refer to property `importParams`](#gx_rfc_prop_functionmodule_importparams)*** | List of import parameter that should be used. 
**`exportParams`** | Object | ***[Refer to property `exportParams`](gx_rfc_prop_functionmodule_exportparams)*** | List of export parameter from the function module that should be used to store its values in Content Services.

##### ***Property `importParams`*** {#gx_rfc_prop_functionmodule_importparams}
This property is a child element of [`functionModule` / `functionModule`](#gx_rfc_prop_functionmodule) and is an array which holds a list of objects with all required import parameter of the *SAP Function Module* that should be used. 

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`paramType`** | String | `struct` or<br/>`parameter` or<br/> `table` | The type of the import parameter.
**`name`** | String | *ARCHIV_ID* | The name of the import parameter of the SAP Function Module. 
**`content`** | Object | ***[Refer to property `content`](#gx_rfc_prop_functionmodule_importparams_content)*** | Dependend on the value of property `paramType` above, this property defines which property in Content Services should be used for the current import parameter.

##### ***Property `content`*** {#gx_rfc_prop_functionmodule_importparams_content}
The structure of property `content` depends on the value set in property `paramType`.

##### ***Property `content` when `paramType = struct`*** {#gx_rfc_prop_functionmodule_importparams_content_struct}
This property is an array of parameters. Each parameter can be of type `struct`, `parameter` or `table`. 

Example:
```
{
    "paramType": "struct",
    "name": "DATA_GENERAL_EXP",
    "content": [
        {
            "sapProp": "DESCRIPT",
            "alfProp": "cm:description",
            "type": "string"
        }
    ]
}
```

##### ***Property `content` when `paramType = parameter`*** {#gx_rfc_prop_functionmodule_importparams_content_parameter}
This property is an object containing the following keys which are responsible to pass the desired values from the document in Content Services to the current SAP import parameter.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`alfProp`** | String | *connexasArchivelink:archiveid* | The name of the property in Content Services where its value will be used for the import parameter in SAP.
**`type`** | String | `string` or<br/>`date` or<br/> `int` or<br/> `datetime` or<br/> `boolean` or<br/> `const`| The Content Services type for `alfProp`. 

Example:
 ```
{
    "paramType": "parameter",
    "name": "QUERY_TABLE",
    "content": {
        "alfProp": "cm:created",
        "type": "date",
        "format": "ddmmYY"
    }
}
 ```

##### ***Property `content` when `paramType = table`*** {#gx_rfc_prop_functionmodule_importparams_content_table}
This property is a list of SAP table rows which contains a list of SAP table columns. Each cell has the following properties.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`sapProp`** | String | *TEXT* | The name of the SAP table column.
**`alfProp`** | String | *connexasArchivelink:sapid* | The name of the property in Content Services where its value will be used for the import parameter in SAP.
**`type`** | String | `string` or<br/>`datetime` or<br/> `int` or<br/> `date` or<br/> `boolean` or<br/> `const`| The Content Services type for `alfProp`. 
**`format`** | String | *ddmmYY* | Optional. If `type` is `date` this can be used to format the date (use Java date format strings). 

Example:
```
{
    "paramType": "table",
    "name": "OPTIONS",
    "content": 
    [
        [
            {
                "sapProp": "TEXT",
                "alfProp": "ARC_DOC_ID = '${connexasArchivelink:sapid}'",
                "type": "string"
            }
        ]
    ]
}
```
##### ***Property `exportParams`*** {#gx_rfc_prop_functionmodule_exportparams}
This property is a child element of [`functionModule` / `functionModule`](#gx_rfc_prop_functionmodule) and is an array which holds a list of objects with all export parameter provided by the *SAP Function Module*. 

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`paramType`** | String | `struct` or<br/>`parameter` or<br/>`dynamicExportTable` or<br/>`exportTable` | The type of the export parameter.
**`name`** | String | *DATA* | The name of the export parameter in the SAP Function Module. 
**`content`** | Object | | Dependend on the value of property `paramType` above, this property defines to which property in Content Services the return value should be stored.<br/>**[Refer to `content` when `paramType=struct`](#gx_rfc_prop_functionmodule_exportparams_content_struct)**<br/>**[Refer to `content` when `paramType=parameter`](#gx_rfc_prop_functionmodule_exportparams_content_parameter)**<br/>**[Refer to `content` when `paramType=dynamicExportTable`](#gx_rfc_prop_functionmodule_exportparams_content_dynamicexporttable)**<br/>**[Refer to `content` when `paramType=exportTable`](#gx_rfc_prop_functionmodule_exportparams_content_exporttable)**


##### ***Property `content` when `paramType = struct`*** {#gx_rfc_prop_functionmodule_exportparams_content_struct}
This property holds an array of parameters. Each parameter can be of type `struct`, `parameter` or `dynamicExportTable` or `exportTable`.

Example:
```
{
    "paramType": "struct",
    "name": "DATA_GENERAL_EXP",
    "content": [
        {
            "sapProp": "DESCRIPT",
            "alfProp": "cm:description",
            "type": "string"
        }
    ]
}
```
##### ***Property `content` when `paramType = parameter`*** {#gx_rfc_prop_functionmodule_exportparams_content_parameter}
This property is an object containing the following keys which are responsible to store the return value from the SAP export paramter to the Alfresco document.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`alfProp`** | String | *connexasArchivelink:archiveid* | The name of the property in Alfresco where its value will be used for the export parameter in SAP.
**`type`** | String | `string` or<br/>`date` or<br/> `int` or<br/> `datetime` or<br/> `boolean` or<br/> `const`| The Alfresco content model type for `alfProp`. 
**`format`** | String | *ddmmYY* | Optional. If `type` is `date` or `datetime` this can be used to convert a string (returned from SAP) to a date (use Java date format strings) that is stored in the Alfresco content model. 

Example:
 ```
{
    "paramType": "parameter",
    "name": "QUERY_TABLE",
    "content": {
        "alfProp": "connexasArchivelink:creationdate",
        "type": "datetime",
        "format": "yyyy-MM-dd HH:mm:ss"
    }
}
 ```
##### ***Property `content` when `paramType = dynamicExportTable`*** {#gx_rfc_prop_functionmodule_exportparams_content_dynamicexporttable}

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`alfProp`** | String | *cm:name* | The name of the property in Alfresco where its value will be used for the export parameter in SAP.|
**`type`** | String | `string` or<br/>`date` or<br/> `int` or<br/> `datetime` or<br/> `boolean` | The Alfresco content model type for `alfProp`.| 
**`sapPropStart`** | int | *123* | Begin index to read the value from the SAP cell.|
**`sapPropEnd`** | int | *145* | End index for the value.|
**`format`** | String | *ddmmYY* | Optional. If `type` is `date` this can be used to format the date (use Java date format strings).|

Example:
```
{
    "paramType": "dynamicExportTable",
    "name": "DATA",
    "content": [ {
            "alfProp": "cm:name",
            "type": "string"
            "sapPropStart": 123,
            "sapPropEnd": 145,
        }
    ]
}
```

##### ***Property `content` when `paramType = exportTable`*** {#gx_rfc_prop_functionmodule_exportparams_content_exporttable}
This property is an object containing the following keys which are responsible to store the defined columns of the first row returned from the SAP export table.

Property | Type | Example Value(s) | Description
------------ | ------------- | ------------ | ------------
**`sapProp`** | String | *OBJECT_ID* | The name of the SAP table column.
**`alfProp`** | String | *connexasReplicate:sapobjectid* | The name of the property in Alfresco where its value will be used for the export parameter in SAP.
**`type`** | String | `string` or<br/>`date` or<br/> `int` or<br/> `datetime` or<br/> `boolean` or<br/> `const`| The Alfresco content model type for `alfProp`. 
**`format`** | String | *yyyy-MM-dd* | Optional. If `type` is `date` or `datetime` this can be used to convert a string (returned from SAP) to a date (use Java date format strings) that is stored in the Alfresco content model. 

Example: 
```
{
    "paramType": "exportTable",
    "name": "CONNECTIONS",
    "content": [
        {
            "sapProp": "OBJECT_ID",
            "alfProp": "connexasReplicate:sapobjectid",
            "type": "string"
        },
        {
            "sapProp": "AR_OBJECT",
            "alfProp": "connexasReplicate:saparchiveobject",
            "type": "string"
        },
        {
            "sapProp": "AR_DATE",
            "alfProp": "connexasReplicate:archiveDate",
            "type": "date",
            "format": "yyyy-MM-dd"
        }
    ]
}
```