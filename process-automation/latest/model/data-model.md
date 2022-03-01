---
title: Data Models
---

A data model allows you to represent complex objects your application is handling. A data model allows you to define the standard data structure you will use in your application using JSON schema. The data model editor allows you to visually create the JSON schema and the JSON editor allows you to see the JSON output. When you use a data model it provides auto-completion in your scripts and expressions. You can also map a data model with your process variables and connector properties. You can use the Upload button to upload a previously defined JSON schema.

Mention download 
Mention go global, how do you turn that off. What does this mean? 


How to create a data model (add, edit, delete its elements).

How to use a data model in the app.

![Data model]({% link process-automation/images/data-model.png %})

## Properties

The properties of a data model are:

| Property | Description |
| -------- | ----------- |
| Data model name | *Required.* The name of the data model. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `finance`. |
| Type | *Required.* Use the Type field to select the JSON schema type you want to use, for example. You can select more than one JSON schema, but only one of the others. |
| Upload | *Optional.* You can upload a predefined  . |
| Data model description | *Optional.* A free text description of what the data model is for, for example `A data model for recording financial accounts records.` |

## Create a Data Model

The following example creates a data model that represents

What’s the purpose of this data model, what needs does this data model meet or what problems does it solve.

### Create a global data model

To create a global data model:

1. Sign into the Modeling Application and click on **Data Models**.

2. Click the **NEW** dropdown.

3. Select **Data Model** and enter a name and optional description.

To use a global data model within a specific project:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. Select **Import > Data Model** and choose the model to import.

### Create a data model in a project

To create a data model in a project:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

3. Select how to create the data model:

    * **Create > Data Model** creates a new, empty form.

    * **Upload > Data Model** allows for uploading an existing data model `.xml` file into the Modeling Application.

    Alternatively use the **+** or **Upload** buttons next to **Data Models** in the left-hand menu.

4. Enter a name and optional description.

## Data model modeling

Data models are created within a project and are exclusive to that project unless the data model scope is changed to global. Once a data model is global it will appear at the same level as projects in the modeling application and can be imported into other projects.

Use the **Turn global** option under [actions](#actions) when a data model is selected to change the scope to global.

> **Note**: It is not possible to change the scope back to a single project once the **Turn global** option has been used. The data model will need to be removed from the project and either recreated, or reimported.

### Custom types

Custom types set the properties and relationships that a file of that type can support. Custom types can inherit the properties of a parent type. `Content` and `Folder` are two example types that are already defined in Alfresco Content Services.

The properties of a custom type are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the custom type. Custom type names can only contain alphanumeric characters, hyphens and underscores, for example `supplier-invoice`. |
| Parent type | *Required.* A parent type for the custom type. All properties and aspects assigned to the parent are inherited by the child, for example `cm:content`. |
| Title | *Optional.* A display label for the custom type that will be displayed to users, for example `Supplier Invoice`. |
| Description | *Optional.* A free text description of what the custom type is for, for example `An invoice received from a supplier.` |

Custom types are stored as JSON, for example:

```json
{
  "parentName": "cm:content",
  "name": "supplier-invoice",
  "prefixedName": "finance:supplier-invoice",
  "description": "An invoice received from a supplier.",
  "title": "Supplier Invoice",
  "properties": []
}
```

### Aspects

Aspects are a collection of properties that can be used to describe data and behavior. A file must be of one type, however it can have multiple aspects attached to it. `Classifiable` and `Versionable` are two example aspects that are already defined in Alfresco Content Services.

The properties of an aspect are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the custom aspect. Custom aspect names can only contain alphanumeric characters, hyphens and underscores, for example `isArchivable`. |
| Title | *Optional.* A display label for the custom aspect that will be displayed to users, for example `Archivable`. |
| Description | *Optional.* A free text description of what the custom aspect is for, for example `The status of the document for archiving purposes.` |

Aspects are stored as JSON, for example:

```json
{
  "name": "isArchivable",
  "prefixedName": "finance:isArchivable",
  "description": "The status of the document for archiving purposes.",
  "title": "Archivable",
  "properties": []
}
```

### Properties

Properties are the metadata that describe content. `Author` is an example property that is already defined in Alfresco Content Services used for specifying who wrote the content.

Properties can be assigned to a custom type or an aspect. Select which type or aspect to create the property under before creating it.

The properties of properties are:

| Property | Description |
| -------- | ----------- |
| Name | *Required.* The name of the property. Property names can only contain alphanumeric characters, hyphens and underscores, for example `datePaid`.  |
| Title | *Optional.* A display label for the property that will be displayed to users, for example `Date Paid`. |
| Description | *Optional.* A free text description of what the property is for. For example `The date the invoice was paid.` |
| Data type | *Optional.* The data type of the property. See the following table for a list of data types, for example `d:date`. |
| Mandatory | *Optional.* Set whether the property is mandatory, for example `false`. |
| Multiple | *Optional.* Set whether the property can contain multiple values, for example `false`. |
| Default value | *Optional.* Set a default value for the property. |
| Constraint | *Optional.* Set a constraint on the values that can be entered for the property, for example `Regular expression`. |
| Indexing | *Optional.* Set whether the property can be searched on and how it is searchable, for example `Free text`. |

The options for data types of properties are:

| Data type | Description |  
| --------- | ----------- |
| d:text | A sequence of characters |
| d:mltext | A multilingual sequence of characters containing localized representations |
| d:int | A positive whole number |
| d:float | A float value |
| d:double | A double value generally used for decimal values |
| d:date | A specific date in the format `DD-MM-YYYY` |
| d:datetime | A specific date and time |
| d:boolean | A value of either `true` or `false` |

The options for constraints of properties are:

| Constraint type | Description |
| --------------- | ----------- |
| Regular expression | Set a regular expression that values must match to be valid for example, a regular expression that matches four letters followed by four digits would be: `/^[A-Za-z]{4}\d{4}$/` |
| Minimum / maximum length | Set the minimum and maximum number of characters a value for the property can be, for example `0` and `10`. |
| Minimum / maximum value | Set the minimum and maximum values for properties, for example `5`. |
| List of values | Set a list of predefined values the property must be chosen from, for example `payable`,`non-payable`,`unknown`. |
| Java class | Set the fully qualified Java class to use for restricting the values of the property. |

The index options of properties are:

| Search type | Description |  
| --------- | ----------- |
| None | The property is not searchable. |
| Free text | Property is searchable but the values will not be available in the search result filters. |
| List of values - whole match | This option enables you to filter on a property in the search results while searching for the whole term. |
| List of values - partial match | This option enables you to filter on a property in the search results while searching the property using wildcard characters. |
| Pattern - unique matches | This option enables you to use unique identifiers which are searched on the basis of the full value of the property. The property itself will not be shown as a filter in the search results. |
| Pattern - many matches | This option enables you to use identifiers which could be searched on the basis of the full value or via the wild card characters. The property itself will not be shown as a filter in the search results. |

Properties are stored as JSON, for example:

```json
{
  "name": "datePaid",
  "prefixedName": "finance:datePaid",
  "title": "Date Paid",
  "description": "The date the invoice was paid.",
  "dataType": "d:date",
  "facetable": "UNSET",
  "indexTokenisationMode": "TRUE",
  "multiValued": false,
  "mandatoryEnforced": false,
  "mandatory": false,
  "indexed": true
}
```

## Actions

The actions that can be run against a data model are:

| Action | Description |
| ------ | ----------- |
| Download data model | Download the XML for the data model. |
| Validate | Run validation against the data model. Any errors can be seen in the log history at the bottom of the Modeling Application and are flagged in a pop-up box. |
| Save | Save any changes made to the data model. |
| Turn global | Changes the data model to have a global scope, so it can be imported into multiple projects. This action is only available if the data model is not already of global scope. |
| Remove from project | Removes the data model from the project. This action is only available if the data model is already set to global scope. |
| Delete | Delete the data model. |
