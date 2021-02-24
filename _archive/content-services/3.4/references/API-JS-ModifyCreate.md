---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [JavaScript, API/Script]
keyword: [JavaScript API, Scripting]
---

# Modifying and creating API

Most of the available ScriptNode API return read-only values, however, the Scripting API also supports writable objects and access to Alfresco repository services.

The `ScriptNode` object lets you modify and add properties, add aspects, create new files, folder, and custom type nodes, and update and set the text content stream for a node. You can also delete nodes, transform content, execute templates, and modify the associations for a node.

**Remember:** JavaScript objects are different to native repository Java objects. Property values in the repository must be the correct object type as defined in the Data Dictionary and exposed by the content model. This means that a string property value expects a Java string, and a multi-valued property expects a list. The Alfresco JavaScript API converts most object types between JavaScript and Java for you such as Array \(for a multi-value property\), numbers, dates, Boolean, and strings. The conversion code handles all common type conversions and recursive lists of those types.

|Type|Description|
|----|-----------|
|`properties`|Property array \(can be modified for updating or adding new properties\)Example:

`// change the name of this document document.properties.name = "Backup of " + document.properties.name; // add a new property string document.properties["cm:locale"] = mylocalenode; // save the property modifications document.save();`The `node.save()`API call is required to persist the property modifications. All other modifications made using the API, such as content or adding aspects, take immediate effect.

|
|`content`|A property to modify the text content of a node Example: `mynode.content = mynode.content + "append some text";`

|
|`name`|A helper property \(a shortcut for `properties.name`\) to get/set the name|

-   **[createFolder](../references/API-JS-createFolder.md)**  

-   **[createFile](../references/API-JS-createFile.md)**  

-   **[createNode](../references/API-JS-createNode.md)**  

-   **[addNode](../references/API-JS-addNode.md)**  

-   **[removeNode](../references/API-JS-removeNode.md)**  

-   **[createAssociation](../references/API-JS-createAssoc.md)**  

-   **[removeAssociation](../references/API-JS-removeAssoc.md)**  

-   **[remove](../references/API-JS-remove.md)**  

-   **[copy](../references/API-JS-copy.md)**  

-   **[move](../references/API-JS-move.md)**  

-   **[addAspect](../references/API-JS-addAspect.md)**  

-   **[removeAspect](../references/API-JS-removeAspect.md)**  


**Parent topic:**[Scripting API](../references/API-JS-Scripting-API.md)

