---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Smart Folder Template syntax

You can build your own Smart Folder Template using these guidelines.

A Smart Folder Template is a configuration file that contains one or more queries to define the nodes of a hierarchical tree of “smart” folders. It is a JSON \(Java Script Object Notation\) file that defines one node object for every Smart Folder.

You can customize a copy of the `smartFoldersExample.json` template, which is available from Repository/Data Dictionary/Smart Folder Templates in Alfresco Share. The tutorial also provides links to a variety of examples; see [Smart Folders tutorial](../tasks/sf-tutorial.md) for more information.

For more information about Alfresco Full Text Search \(AFTS\), see [Alfresco Full Text Search Reference](rm-searchsyntax-intro.md).

A node is defined by the following properties:

|Node property|Property description|
|-------------|--------------------|
|`name`|Mandatory folder name|
|`id`|Optional ID or number that is unique for the node in the template. This property is optional, however it is recommended as specifying an ID generates a much shorter \(and permanent\) noderef for the Smart Folder|
|`description`|Optional description, displayed in the detailed view|
|`nodes`|Optional collection of sub nodes \(sub folders\)|
|`search`|Mandatory query defined using Alfresco FTS \(full text search\) language. The search is run when a Smart Folder is accessed by a user.|
|`language`|Mandatory property, set to `fts-alfresco`|
|`query`|Mandatory FTS query that defines the folder content|
|`filing`|Optional rule that defines the filing action for a new file when it is uploaded to the Smart Folder. If no filing rule is defined, files are not permitted to be uploaded to that folder. Parameters include:-   `path`: path where a document is physically stored
-   `classification`: type and aspects assigned to the new file
-   `properties`: property values attributed to the new file

|
|`path`|Mandatory property in a filing rule. Path to store new documents. This is the [ISO9075](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/data-model/source/java/org/alfresco/util/) encoded QName.|
|`classification`|Mandatory property in a filing rule. Type and aspects of the new object.|
|`properties`|Optional property. Defines property values and inheritance.|

The following code fragments give more information about these properties.

Here are some additional tips on notation:

-   Use percent \(%\) signs to use predefined placeholders in queries and filing rules
-   For repository path expressions use QNames, for example; /app:company\_home/st:sites/cm:swsdp/cm:documentLibrary.
-   Special characters and whitespace are [ISO9075](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/data-model/source/java/org/alfresco/util/) encoded. Use this notation to encode special characters in repository path names. For example, use `_x0020_` for the whitespace character.

|Placeholder|Description|
|-----------|-----------|
|`%ACTUAL_PATH%`|[ISO9075](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/data-model/source/java/org/alfresco/util/) encoded repository path of the physical parent folder. Only the physical parent folder \(or next physical folder up the folder tree\) can use `%ACTUAL_PATH%`.|
|`%CURRENT_USER%`|Account name of the user|
|`_x0020_`|[ISO9075](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/data-model/source/java/org/alfresco/util/) encoded whitespace character|
|`<>`|Use angle brackets, for example, `<cm:name>`, to inherit property values from the physical parent folder. Used for inheritance in a filing rule and in a query.|

1.  **Nested nodes**: define a Smart Folder structure inside another Smart Folder structure, for example:

    ```
    {
        "id : "1",
        "name":"Documents",
        "nodes":[
            {
                "name":"Correspondence",
                "description":"Smart Folder - documents from type 'Correspondence'",
                "nodes":[
                {
                   "name":"High Prio",
                    ...
                },
                {
                    ...
                }
            },
            {
                "name":"Assessment",
                "description":"Smart Folder - documents from type 'Assessment'"
            },
            {
                "name":"Pending approvals",
                "description":"Smart folder - pending approvals documents"
            }
        ]
    }
    ```

2.  **Search queries**: information is populated by running a search query:

    ```
    {
        "id : "1",
        "name":"Documents",
        "nodes":[
            {
                "name":"Correspondence",
                ...
                
                "search":{
                    "language":"fts-alfresco",
                    "query":"=cmg:claimDocumentType:Correspondence and cmg:claimDocumentId:<cmg:claimId>"
                }
            },
            {
                ...  
            }
        ]
    }
    ```

    The query is run when the Smart Folder is opened, and the results displayed as the folder contents.

    You can limit the query to specific types or aspects, for example:

    ```
    "query":"+ASPECT:'ins:claimFolder'"
    "query":"+TYPE:'cm:folder'"
    ```

    You can use `%CURRENT_USER%` to limit the search to documents relevant to the signed in user, for example:

    ```
    "query":"cm:modifier:%CURRENT_USER% or cm:creator:%CURRENT_USER%"
    ```

3.  **Filing rules**: define the path where a document uploaded to a Smart Folder should be created, as well as the type and aspects of the new file, and its property values:

    ```
    {
        "id : "1",
        "name":"Documents",
        "nodes":[
            {
                "name":"Correspondence",
                ...
                "filing":{
                    "path":"%ACTUAL_PATH%",
                    "classification":{
                        "type":"cm:content",
                        "aspects":[
                            "cmg:claim-document"
                        ]
                    },
                    "properties":{
                        "cmg:claimDocumentType":"Correspondence",
                        "cmg:claimDocumentId":"<cmg:claimId>"
                    }
                }           
            },
            {
                ... 
            }
        ]
    }
    ```

    -   **"path"**: The path can be an existing folder location, for example:

        -   ```
"path":"/app:company_home/cm:Claims_x0020_Pool"
```

            using an XPath expression, and ensuring the expression is [ISO9075](https://svn.alfresco.com/repos/alfresco-open-mirror/alfresco/HEAD/root/projects/data-model/source/java/org/alfresco/util/) encoded

        -   or the parent folder, by specifying the placeholder `%ACTUAL_PATH%`.

            The path variable can also be used in a query to restrict the search to a certain folder:

            ```
            "query":"PATH: '/app:company_home/st:sites/cm:legal-documents/'"
            ```

            or in a filing rule to store new objects:

            ```
            "path":"/app:company_home/cm:Insurance/*"
            ```

    -   **"classification"**: You can define the type for content that populates a Smart Folder, and which aspects should be associated to them. In the [code example](sf-ref-template-guidance.md#filing), each new document shown in the "Correspondence" folder is of type `"cm:content"` with aspect `"cmg:claim-document"`.

    -   **"properties"**: You can assign property values. These can be fixed, or a placeholder `"<[property_name]>"` that uses the value of the parent folder property.

        In a Smart Folder, you can map the value of the parent folder or object to that of a new object as variables:

        ```
        "[new_obj_prop_name]":"<[existing_obj_prop_name]>"
        ```

        For example, `"cmg:claimDocumentId":"<cmg:claimId>"`

        or as names:

        ```
        "[new_obj_prop_name]":"[literal]"
        ```

        For example, `"cmg:claimDocumentType":"Correspondence"`

        You can also use the value of the parent folder or object in a search query, for example:

        ```
        "query":"=cmg:claimDocumentType:Correspondence and cmg:claimDocumentId:<cmg:claimId>"
        ```


**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

