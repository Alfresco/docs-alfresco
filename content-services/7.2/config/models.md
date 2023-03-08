---
title: Content models
---

Use this information to create and manage custom models in Alfresco Share using the Model Manager.

> **Note:** A [tutorial]({% link content-services/7.2/tutorial/model.md %}) for using the Model Manager is also available.

## Introduction

The Model Manager is a user-friendly tool that enables you to add custom types, aspects, and properties to your models. Content Services provides several out-of-the-box content models for specifying the core content types in the repository.

The Model Manager is available to users in the `ALFRESCO_MODEL_ADMINISTRATORS` permission group. To create or edit a model you must be a member of this group. By default, the System Administrator is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` group and can create models.

**Note:** The Model Manager does not allow editing existing dynamic models and content models that have been configured in XML and bootstrapped through Spring (static models).

### Models

A model is a fundamental building block of the content repository that provides a foundation for structuring content and working with content. A model has the following characteristics:

* It describes the data being stored.
* It allows the management of content metadata by applying custom types or aspects to the content and folders.
* It is uniquely identified by its defined Namespace, Prefix, and Name.
* It is defined using a small set of building blocks: custom types, aspects, properties, and constraints.

![Content model overview]({% link content-services/images/content-model.png %})

### Custom types

A custom type enumerates the properties and relationships that a file of that type can support. Typically, types represents nodes with support for properties and the ability to inherit the definition of a parent type. `Content` and `Folder` are the two important types defined out-of-the-box.

### Aspects

An [aspect]({% link content-services/7.2/config/repository.md %}#about-aspects) is a collection of properties that can encapsulate both data and behavior, providing a flexible tool for modeling content. Aspects add extra functionality and properties to the models by attaching them to custom types. A file must be of a single type, but may have one or more aspects attached to it. By default, the content repository comprises of some out-of-the-box aspects, such as Classifiable, Versionable, and so on.

### Properties

Properties are metadata which describes the content. For example, `Author` is a property which specifies the person who wrote the content.

### Constraints

Constraints control the input property values. For example, you can specify that the author name must not be more than 40 characters in length.

## Create a content model

You can create new models using the Model Manager.

> **Note:** Field names should not start with a number due to the design of [Solr](https://solr.apache.org/guide/6_6/defining-fields.html#DefiningFields-FieldPropertiess){:target="_blank"}.

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

2. Click **Create Model**.

3. Enter the details for the new model:

    1. Enter a namespace for the model.

        Namespaces provide a way to specify globally unique names for definitions within content models. All custom types, aspects, and properties have names which are made unique across the repository by using a namespace specific to the model. Using namespaces prevents name collisions when the models are shared across repositories. A namespace is composed of a URI and a prefix.

        Only alphanumeric characters or a URI, for example, `http://www.mycompany.com/model/mynamespace/1.0`, are allowed. Do not use spaces or special characters.

        The namespace value **must** be unique within Content Services.

    2. Enter a short prefix for the model.

        A prefix is an abbreviation for the namespace identifier (URI), which is typically quite long. For example, if the namespace URI is `http://example.org/contentmodels` and the associated prefix is `ex`, then the name `ex:customtype` means that `customtype` is a name defined within the namespace  `http://example.org/contentmodels`.

        Only alphanumeric characters, hyphens (-), and underscores (_) are allowed. Do not use spaces.

        The prefix value **must** be unique within Content Services.

    3. Enter a name for the model.

        For example, `Finance`.

        Only alphanumeric characters, hyphens (-), and underscores (_) are allowed. Do not use spaces or special characters.

    4. Specify an optional author for the model.

        If you leave this field blank, it will default to the currently signed in user.

    5. Enter an optional description for the model.

4. Click **Create**.

A newly created model is set as **Inactive**, meaning it cannot be used yet. Set the model to [active](#activate-a-content-model) to start using it.

## Manage content models

Content models can be edited, imported and exported or have their status updated in the **Model Manager**.

Access the **Model Manager** by logging into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

### Edit a content model

Content models can be updated using the **Actions** dropdown against a content model.

To view the actions menu of a content model:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

2. Click the **Actions** dropdown against the content model.

The actions are:

| Action | Description |
| ------ | ----------- |
| Activate | [Activates](#activate-a-content-model) the model. This action can only be performed if the content model is currently **Inactive**. |
| Deactivate | [Deactivates](#deactivate-a-content-model) the content model. This action can only be performed if the content model is currently **Active**. |
| Delete | Delete the content model. This action can only be performed if the content model is currently **Inactive**. |
| Edit | Update the information for a content mode. This action can only be performed if the content model is currently **Inactive**. |
| Export | Downloads the content model as a `.zip` file to upload into another environment or repository. |

### Content model status

Content models have a status of either active or inactive.

* Inactive models indicate the content model is a work in progress and cannot be applied to any content. All content models initially start as inactive when they are first created.

* Active models can be used by end users and any custom types or aspects defined within the model can be applied to content. Active models can only be changed to an inactive state if there are no instances of the model's types or aspects in use within Alfresco Share.

#### Activate a content model

To activate a content model:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

2. Click the **Actions** dropdown against the content model you want to activate and select **Activate**.

The custom types and aspects associated to the content model can now be applied to content.

#### Deactivate a content model

A content model cannot be deactivated if any of its custom types or aspects have been applied to content.

To change a content model from active to inactive make sure that:

* If the content model's custom types have been applied to any files and folders, delete the files or folders that use the type from Alfresco Share **and the trashcan**.

* If the content model's aspects have been applied to a file, remove the aspect from the node.

* If the content model's custom types have been applied to a file, delete the file from Alfresco Share **and the trashcan**.

> **Note:** The **Find Where Used** action against custom types and aspects locates all the nodes an aspect or custom type have been applied to.

To deactivate a content model:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

2. Click the **Actions** dropdown against the content model you want to deactivate and select **Deactivate**.

3. Once you have deactivated a content model, it can optionally be deleted by selecting **Delete** from the **Actions** dropdown.

    > **Note:** If you delete a content model, remember to remove any filters that use it from the [Search Manager]({% link content-services/7.2/using/permissions.md %}#search-manager).

### Import a content model

Content models can be imported into the **Model Manager** if two conditions are met:

* The content model does not have the same name as an existing content model.
* The content model was previously exported from a **Model Manager**.

To import a content model:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager**.

2. Click **Import Model** and select the `.zip` file to import.

The imported content model will appear in the **Custom Models** table once it has been imported.

## Custom types, aspects and properties

Custom types, aspects and properties for content models can all be managed using the **Model Manager**.

### Manage custom types

A content model can have one or more custom types, however each custom type must have a unique name within the content model.

#### Create a custom type

To create a custom type:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to add a custom type to.

2. Click on the **Create Custom Type** button and enter the properties for the custom type:

    | Property | Description |
    | -------- | ----------- |
    | Name | *Required.* The name of the custom type. Only alphanumeric characters, hyphens (-) and underscores (_) are allowed. |
    | Parent type | *Required.* The parent type for the custom type that will be a sub-type of `cm:content` or `cm:folder`. The custom type will inherit the properties and aspects of the parent type. |
    | Display label | *Optional.* The display label for the custom type that will be visible to users. |
    | Description | *Optional.* A description of the custom type. |

3. Click **Create**.

> **Note:** The custom type name will be prefixed with the content model prefix.

#### Edit a custom type

To edit a custom type:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to edit a custom type for.

2. Click **Edit** from the **Actions** dropdown against the custom type to edit.

3. Edit the properties:

    * For [active](#activate-a-content-model) content models the name and parent type cannot be edited.
    * For [inactive](#deactivate-a-content-model) content models, the name cannot be edited.

4. **Save** the changes.

#### Delete a custom type

If a content model is [active](#activate-a-content-model), any nodes using the custom type must be deleted from Alfresco Share **and the trashcan** before the custom type can be deleted.

> **Note:** The **Find Where Used** action against a custom types locates all nodes the custom type has been applied to.

To delete a custom type:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to delete a custom type for.

2. Click **Delete** from the **Actions** dropdown against the custom type to delete.

> **Note:** If a custom type refers to another custom type within the same content model, then the referenced type cannot be deleted until the type that references it has been removed.

### Manage aspects

A content model can have one or more aspects, however each aspect must have a unique name within the content model.

#### Create an aspect

To create an aspect:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to add an aspect to.

2. Click on the **Create Aspect** button and enter the properties for the aspect:

    | Property | Description |
    | -------- | ----------- |
    | Name | *Required.* The name of the aspect. Only alphanumeric characters, hyphens (-) and underscores (_) are allowed. |
    | Parent aspect | *Optional.* The parent aspect for the aspect. The aspect will inherit the properties and aspects of the parent aspect. |
    | Display label | *Optional.* The display label for the aspect that will be visible to users. |
    | Description | *Optional.* A description of the aspect. |

3. Click **Create**.

> **Note:** The aspect name will be prefixed with the content model prefix.

#### Edit an aspect

To edit an aspect:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to edit an aspect for.

2. Click **Edit** from the **Actions** dropdown against the aspect to edit.

3. Edit the properties:

    * For [active](#activate-a-content-model) content models the name and parent aspect cannot be edited.
    * For [inactive](#deactivate-a-content-model) content models, the name cannot be edited.

4. **Save** the changes.

#### Delete an aspect

If a content model is [active](#activate-a-content-model), any nodes using the aspect must be have the aspect removed from them before the aspect can be deleted.

> **Note:** The **Find Where Used** action against an aspect locates all nodes the aspect has been applied to.

To delete an aspect:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to delete an aspect for.

2. Click **Delete** from the **Actions** dropdown against the aspect to delete.

> **Note:** If an aspect refers to another aspect within the same content model, then the referenced aspect cannot be deleted until the aspect that references it has been removed.

### Manage properties

Properties are metadata associated with a particular custom type and/or an aspect. Both custom types and aspects can have one or more properties.

#### Create a property

To create a property:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to add a property for.

2. Click **Create Property** against the custom type or aspect to add a property to.

3. Enter the properties for the new property:

    | Property | Description |
    | -------- | ----------- |
    | Name | *Required.* The name of the property. Property names can only contain alphanumeric characters, hyphens (-) and underscores (_), for example `datePaid`.  |
    | Display label | *Optional.* A display label for the property that will be displayed to users, for example `Date Paid`. |
    | Description | *Optional.* A free text description of what the property is for. For example `The date the invoice  was paid.` |
    | Data type | *Optional.* The data type of the property. |
    | Requirement | *Optional.* Set whether the property is mandatory. |
    | Multiple | *Optional.* Set whether the property can contain multiple values. |
    | Default value | *Optional.* Set a default value for the property. |
    | Constraint | *Optional.* Set a constraint on the values that can be entered for the property, for example `Regular expression`. |
    | Indexing | *Optional.* Set whether the property can be searched on and how it is searchable, for example `Free text`. |

    > **Note:** See the following tables for further details on data types, constraints, multi-values and indexing options and support.

4. Click **Create** or **Create and Start Another** to save the property.

The options for data types of properties are:

{% capture d-text %}

`d:text` is a sequence of characters.

Multi-value properties are supported.

The supported constraints are:

* List of values
* Minimum / maximum length
* Regular expression

{% endcapture %}
{% capture d-mltext %}

`d:mltext` is a multilingual sequence of characters containing localized representations.

Multi-value properties are supported.

The supported constraints are:

* List of values
* Minimum / maximum length
* Regular expression

{% endcapture %}
{% capture d-int %}

`d:int` is a positive whole number.

Single value properties are supported in the Model Manager. Multi-value properties are supported in Alfresco Share.

The supported constraints are:

* List of values
* Minimum / maximum value

> **Note:** `d:int` does not support multiple values with constraints in Alfresco Share.

{% endcapture %}
{% capture d-long %}

`d:long` is a wider ranging number than an integer.

Single value properties are supported in the Model Manager. Multi-value properties are supported in Alfresco Share.

The supported constraints are:

* List of values
* Minimum / maximum value

> **Note:** `d:long` does not support multiple values with constraints in Alfresco Share.

{% endcapture %}
{% capture d-float %}

`d:float` is a float value.

Single value properties are supported in the Model Manager. Multi-value properties are supported in Alfresco Share.

The supported constraints are:

* List of values
* Minimum / maximum value

> **Note:** `d:float` does not support multiple values with constraints, or the list of values constraint in Alfresco Share.

{% endcapture %}
{% capture d-double %}

`d:double` is a double value generally used for decimal values.

Single value properties are supported in the Model Manager. Multi-value properties are supported in Alfresco Share.

The supported constraints are:

* List of values
* Minimum / maximum value

> **Note:** `d:double` does not support multiple values with constraints, or the list of values constraint in Alfresco Share.

{% endcapture %}
{% capture d-date %}

`d:date` is a specific date in the format `DD-MM-YYYY`.

Single value properties are supported.

The list of values constraint is not supported.

{% endcapture %}
{% capture d-datetime %}

`d:datetime` is a specific date and time.

Single value properties are supported.

The list of values constraint is not supported.
{% endcapture %}
{% capture d-boolean %}

`d:boolean` is a value of either `true` or `false`.

Single value properties are supported.

The list of values constraint is not supported.
{% endcapture %}

{% include tabs.html tableid="data-types" opt1="d:text" content1=d-text opt2="d:mltext" content2=d-mltext opt3="d:int" content3=d-long opt4="d:long" content4=d-long opt5="d:float" content5=d-float opt6="d:double" content6=d-double opt7="d:date" content7=d-date opt8="d:datetime" content8=d-datetime opt9="d:boolean" content9=d-boolean %}

The options for constraints of properties are:

| Constraint type | Description |
| --------------- | ----------- |
| Regular expression | Set a regular expression that values must match to be valid for example, a regular expression that matches four letters followed by four digits would be: `/^[A-Za-z]{4}\d{4}$/`. |
| Minimum / maximum length | Set the minimum and maximum number of characters a value for the property can be,for example `0` and `10`. |
| Minimum / maximum value | Set the minimum and maximum values for properties, for example `5`. |
| List of values | Set a list of predefined values the property must be chosen from, for example `payable`,`non-payable`,`unknown`. |
| Java class | Set the fully qualified Java class to use for restricting the values of the property. |

The options for the indexing of properties are:

| Search type | Description |  
| --------- | ----------- |
| None | The property is not searchable. |
| Basic | The property is searchable but the values will not be available in the search result filters. The supported data types are `int`, `long`, `float`, `double`, `date`, `datetime` and `boolean`. |
| Enhanced search | The property can be used in faceting, stats, sort, and range queries. While this option improves query performance and reduces memory usage, it also requires more disk space for the search index. The supported data types are `int`, `long`, `float`, `double`, `date` and `datetime`. |
| Free text | Property is searchable but the values will not be available in the search result filters. The supported data types are `text`, `mltext` and `content`. |
| List of values - whole match | This option enables you to filter on a property in the search results while   searching for the whole term. The supported data types are `text`, `mltext` and `content`. |
| List of values - partial match | This option enables you to filter on a property in the search results while searching the property using wildcard characters. The supported data types are `text`, `mltext` and `content`. |
| Pattern - unique matches | This option enables you to use unique identifiers which are searched on the basis of the full value of the property. The property itself will not be shown as a filter in the search results. The supported data types are `text`, `mltext` and `content`. |
| Pattern - many matches | This option enables you to use identifiers which could be searched on the basis of the full value or via the wild card characters. The property itself will not be shown as a filter in the search results. The supported data types are `text`, `mltext` and `content`. |

> **Note:** Different values can have an impact on the search performance, memory requirement, and disk storage requirement for your installation. For very large repositories, the values can have a significant impact. For most installations the default settings are fine. For properties that will be used for [search filters]({% link content-services/7.2/using/permissions.md %}#search-manager), it is important to use the correct values as shown in the table.

#### Edit a property

To edit a property:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to edit a property for.

2. Click **Edit** from the **Actions** dropdown against the property in the custom types or aspects list.

3. Edit the properties:

    * For [active](#activate-a-content-model) content models the name, data type, required status and multi-value status cannot be edited.
    * For [inactive](#deactivate-a-content-model) content models, the name cannot be edited.

4. **Save** the changes.

#### Delete a property

For custom types, if a content model is [active](#activate-a-content-model) the property can be deleted if it was created after the custom type was applied to a file. Once a property has been applied to a file it cannot be deleted until any nodes using it have been deleted from Alfresco Share **and the trashcan**.

If a content model's custom type is applied to a file, then the associated properties:

* Can be deleted if the user does not edit or save the properties via the **Edit Properties** option in Alfresco Share.
* Can be deleted if the property is created for a custom type which has already been applied to a file.
* Cannot be deleted if the property is created with a default value and the custom type is then applied to a file on Alfresco Share.

For aspects, if a content model is [active](#activate-a-content-model) and the aspect has been applied to a node, but the property has not been used then the property can be deleted. If the property has been used on a node (including in the version history or content in the archive store), then the property cannot be deleted. An administrator should create a new aspect containing only the desired properties and then create a switch to add it to all content using the old aspect and remove the existing one.

> **Note:** Remember to update the [layout designer](#layout-designer) and delete any search filters that may be using that property.

To delete a property:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the content model to delete a property for.

2. Click **Delete** from the **Actions** dropdown against the property in the custom types or aspects list.

## Layout Designer

Use the Layout Designer to define how the properties you create using the Model Manager are displayed on the **Edit Properties** page in Alfresco Share.

The Layout Designer provides a simple, visual representation of your page layout in the editor using horizontal sections and vertical columns. By adding multiple sections with different column configurations you can build quite complex layouts very easily. The Layout Designer consists of a layout area in the center, the layout elements on the top, and the properties arranged vertically on the left of the layout area.

![Layout Designer overview]({% link content-services/images/mm-layout-designer.png %})

### Layout elements

The layout elements render heading text and panel arrangements with one, two or three rows. These elements are reusable and can be used multiple times on the layout area. There are four different options in the layout elements:

* Single column panel
* Double column panel
* Wide left double column panel
* Triple column panel

### Properties in the Layout Designer

The properties are intended for single use only. To use the properties, drag them from the side onto the elements. Once a property is used, it is automatically removed from the left panel.

Properties can also be created in the Layout Designer using the **Create Property** option.

#### Using the Layout Designer

To use the Layout Designer:

1. Log into Alfresco Share as a user that is a member of the `ALFRESCO_MODEL_ADMINISTRATORS` permission group and click **Admin Tools** > **Model Manager** and select the relevant content model.

2. Click **Layout Designer** from the **Actions** dropdown.

    > **Note:** If you do not apply the newly created property to the Layout Designer, then neither the type nor its property will be available for use in Alfresco Share.

3. Drag the required layout elements from the top onto the layout area. Layout elements can be edited, reordered or deleted:

    * **Edit**: To edit the layout elements, click anywhere on the element's top panel showing the element name. This displays the **Edit Properties** window, which enables you to change the column configuration, specify the panel label, and select the panel appearance.

    * **Reorder**: To reorder the layout elements on the layout area, hover over the element's top right corner and select the up or down arrows to move the element up or down a place.

    * **Delete**: To remove the layout element from the layout area, hover over the element's top right corner and click the trashcan.

4. Drag the required properties from the side onto the elements. Properties can be edited, reordered or deleted:

    * **Edit**: Click anywhere on the property to edit it. The attributes that can be managed are:

        * **Form controls** are the type of input fields end-users will see. They differ depending on the data type of the property:

            | Control | Description |
            | ------- | ----------- |
            | Default | Users can enter a value based on the selected data type. For text and integer data types. |
            | Number | Users can enter a number. For integer data types. |
            | Text field | Users have a single line of text. For text data types. |
            | Text area | Users have multiple lines of text. For text data types. |
            | Rich text | Users can format text with options such as bold or italics. For text data types. |
            | Password field | Input characters are masked for users. For text data types. |
            | Mimetype | Identify files by their nature and format. For mimetype data types. |
            | Categories | Categorize content into related groups to form a hierarchy. For `cm:category` data types. |
            | Taggable | Tag content using keywords. For `cm:taggable` data types. |

        * **View mode** sets how the property should be displayed in Alfresco Share:

            | Option | Description |
            | ------ | ----------- |
            | Any | Displays the property on the details page under **Properties** and also on the **Edit Properties** page. |
            | View | Displays the property on the details page under **Properties**. |
            | Edit | Displays the property on the **Edit Properties** page. |

        * **Style** enables formatting options on the property when it is displayed in Alfresco Share, such as `bold`, `underline`, `italics`, `font color` and `background color`.

        * **Style class** enables adding a custom CSS class to the property.

        * **Read only** sets the property as read-only in Alfresco Share.

        * **Force display** ensures the property is visible in view and edit forms even if the type does have the property applied from its aspect.

        * **Hidden** allows the value of the property to be set, but not visible to end-users in Alfresco Share.

    * **Reorder**: To reorder the property on the layout area, hover over the property's top right corner and select the up or down arrows to move it up or down a place.

    * **Delete**: To remove the property from the layout area, hover over the property's top right corner and click the trashcan. The property will reappear in the **Properties** list on the Layout Designer.

5. Click **Save** to save the changes or **Clear** to remove everything from the layout area. To apply the default layout options, click **Apply Default Layout**.

> **Note:** To enable the properties layout design in Alfresco Share, you must activate and apply the relevant content model to file(s) in Alfresco Share.
