---
title: Alfresco Autofiling
---

## Configuring Autofile

### Configuration Folder

**Location must be created in Alfresco:** `/Company Home/Data Dictionary/Autofile Configuration`

The `EVERYONE` authority must have Consumer permissions on this folder in order to be able to read the autofile configuration.

### Configuration Parameters

* **name** (String, required) – name for the auto-file configuration object. Can be anything, but must be unique.

* **rootPath** (String, required) – path to the root Alfresco folder where auto-filed content will be stored
* **types** (List, required) – list of content types that the auto-file configuration applies to (must be in QName format, e.g. `{http://www.alfresco.org/model/content/1.0}content`)

* **propertiesList** (List, optional) – list of metadata properties that determines the folder path that content will be auto-filed into. For example, if you wanted to file documents by 2 metadata fields, "Project Name" and "Document Type", you’d configure auto-filing for these two properties, and then new content would be filed into the folder, `/{Root Path}/{Project Name}/{Document Type}` (must be in QName format, e.g. `{http://www.alfresco.org/model/content/1.0}content`). Property values can be split by adding a substring transformer as a prefix followed by the indexes in the format `~0~4` to the end of the declaration (e.g. `xSubstringBetweenTransformer~{http://www.alfresco.org/model/content/1.0}name~0~4`). If the `cm:name` was originally "Content Name", the property used for filing will be "Cont". If the properties list is empty or null, document will be autofiled into the rootPath.

* **autoCreateFolders** (Boolean, optional – default true) – indicates whether folders should be automatically created if they don’t already exist in the repository

* **autoCreateFolderType** (String, required if autoCreateFolders is true) – if folders are to be automatically created, this property is used to configure the content type that new folders will be created as (must be in QName format, e.g. `{http://www.alfresco.org/model/content/1.0}folder`)

* **inheritDocPropertiesList** (String, optional) - if folders will be autocreated, properties on the folder can be set based on common properties with the autofiled document. To enable this, set this list of properties to the properties you'd like to inherit to the folder using the same format as `propertiesList`. The properties will only be set if the folder is being created. If a document is autofiled to an existing folder, properties are not updated. You must ensure that any property you place in this list must actually exist on the `autoCreateFolderType`.

* **autoRenameDuplicates** (Boolean, optional – default true) – this flag tells the system whether or not to automatically rename a document if a document with the same name already exists in the target folder during auto-filing

* **dateFormat** (String, optional – default "MM-dd-yyyy") – if you will need to autofile by a date string property, you have the option to set the date format here. If your date format contains forward slashes (/), separate folders will be created based on the slashes.

* **criteriaProperties** (List, optional) - list of properties that will be checked against regexes to determine if the autofile config should be used. If the value of the properties match the corresponding regexes, the config will be used. If one or more properties doesn't match its corresponding regex, then the config will not be used, and additional configs will be tested in priority order.

* **criteriaRegexes** (List, optional) - list of regexes that will be checked determine if the autofile config should be used. If the value of the criteriaProperties match the corresponding regexes, the config will be used. If one or more criteriaProperties doesn't match its corresponding regex, then the config will not be used, and additional configs will be tested in priority order.

* **priority** (Integer, optional) - the priority given to the autofile config. If there are multiple autofile configs for a type, then the configs will be tested for a match in priority order. The lower the priority number, the higher the priority (i.e. a priority of 1 is the highest priority and is tested first.

* **sanitizePropValueRegex** (String, optional) - a regex that will be used to sanitize property values that will be used for Autofiling. Any property pulled from an object will run through the regex and a matching string will be used for filing.

### REST Call to Configure Autofiling
Autofiling can be configured using the POST and GET methods.

### Sample REST Call to Configure Autofiling
**Method:** POST

**URL:**
```bash
http://{server}:{port}/alfresco/service/tsgrp/autofile/createAutofileConfig
```
**Body Content:**
```bash
{"name":"Department - Region","rootPath":"Company Home/Sites/tsg-add-ons-demo/documentLibrary/Autofiling","types":["{http://www.tsgrp.com/model/tao/1.0}content"],
"propertiesList":[
"{http://www.tsgrp.com/model/tao/1.0}department",
"{http://www.tsgrp.com/model/tao/1.0}region"
],
"autoCreateFolders":"true",
"autoCreateFolderType":"{http://www.alfresco.org/model/content/1.0}folder",
"autoRenameDuplicates":"true",
"priority":"1",
"criteriaProperties":["{http://www.alfresco.org/model/content/1.0}title",
"{http://www.alfresco.org/model/content/1.0}description"],
"criteriaRegexes":["A","B"]}
```

**Method:** GET
```bash
http://{server}:{port}/alfresco/service/tsgrp/autofile/createAutofileConfig?params={"name":"Department - Region","rootPath":"Company Home/Sites/tsg-add-ons-demo/documentLibrary/Autofiling","types":["{http://www.tsgrp.com/model/tao/1.0}content"],
"propertiesList":[
"{http://www.tsgrp.com/model/tao/1.0}department",
"{http://www.tsgrp.com/model/tao/1.0}region"
],
"autoCreateFolders":"true",
"autoCreateFolderType":"{http://www.alfresco.org/model/content/1.0}folder",
"autoRenameDuplicates":"true",
"priority":"1",
"criteriaProperties":["{http://www.alfresco.org/model/content/1.0}title",
"{http://www.alfresco.org/model/content/1.0}description"],
"criteriaRegexes":["A","B"]}
```

> **Note:** Authorization for an admin user must be included. In Postman, switch to the `Authorization` tab. In the `TYPE` dropdown, select `Basic Auth` and then enter in an admin user's credentials. The recommended approach is to use a POST call.

## Utilizing Autofile

The autofiled aspect, `af:autofiled`, must be applied to content in order for it to be autofiled. The easiest way to do this is to make the autofiled aspect mandatory for any content types that are to be autofiled. The aspect can also be applied manually.

## Disabling Autofile for Specific Aspects

To disable autofile for a specific aspect, override the following configuration in the Alfresco global properties:

```text
tsgrp.autofile.disableForAspects=
```

Set this to a comma delimited list of QNames in a String format (for example, `{http://www.alfresco.org/model/content/1.0}taggable`).
