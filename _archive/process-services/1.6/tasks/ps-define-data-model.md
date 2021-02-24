---
author: Alfresco Documentation
---

# Defining folder entity data models

Once you've configured the data source you can define folder entity data models.

1.  Select the **Alfresco** Data Model type.

    This loads the repository source menu.

2.  Select **Repository source** then click **Add entity** to add an entity that maps to custom folder node in the repository.

3.  Give the entity a name, such as Custom Folder.

4.  Specify the node type, including any aspects that should be applied. In this example select **TODO**. This is an instruction to create the folder with a custom type.

    **Tip:** Use commas to separate type and aspects.

    **Note:** Use the F: prefix for the type as it's a custom type.

5.  Specify any custom aspects to apply and any out-of-the-box aspects if needed, for example *cm:titled*\).

    **Note:** These are also referred to as secondary types in the CMIS standard.

6.  After you've entered the type and aspects definitions, specify all other relevant properties. There following properties are mandatory:

    -   *cmis:name* \(or *cm:name*\) - used to specify the name of the new node
    -   *cmis:parentId* - used to specify what parent node the new node should be created under
    When creating a new entity the Data Model designer automatically creates the required fields as well as the most commonly used attributes:

    |Attribute Name|Alfresco Content Services Property|Entity Time|
    |--------------|----------------------------------|-----------|
    |`ID`|`sys:node-uuid`|string|
    |`Name`|`cm:name`|datasource.driverstring|
    |`Title`|`cm:title`|datasource.urlstring|
    |`Created`|`cm:created`|date|
    |`Creator`|`cm:creator`|string|
    |`Modified`|`cm:modified`|date|
    |`Modifier`|`cm:modifier`|string|
    |`Parent`|`cm:parentId`|string|

    All folder entities require at least one attribute that maps to the *cm:name*property. It can also map to the `cmis:name` property, if you prefer to use CMIS property names.

7.  After the entity and the default attributes are generated, click **Add Attribute** to add entities to map the remaining folder properties.

8.  When you're done, click **Save**.


**Parent topic:**[Creating data models for folders](../concepts/ps-create-datamodel.md)

