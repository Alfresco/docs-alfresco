---
title: Configure Smart Folders
---

Smart Folders organize your content so that you can store files across your organization, but view them based on information requirement, not location.

Stored searches are shown in a folder tree, so that when a user opens a folder, a query is run and the results are displayed in a list. Files are also automatically classified when they are uploaded.

Smart Folders are installed as a core part of Alfresco Content Services, so there is no separate AMP file to install or upgrade. The Smart Folders function is disabled by default, and can be enabled in your alfresco-global.properties file by specifying `smart.folders.enabled=true`.

Folders are differentiated by icon:

* Physical folder: ![Physical folder icon]({% link content-services/images/folder.png %})
* Smart folder: ![Folder with a magnifying glass representing a Smart Folder]({% link content-services/images/sf.png %})

Using Smart Folders in this way helps you to manage your information; for example, where you've a number of sources of information, in a variety of folders. Content that might be related to, but not directly involved in your work is also retrieved, depending on the search criteria.

The Smart Folder structure is created by associating a Smart Folder Template with an Alfresco Content Services physical folder. Multiple Smart Folder structures can be defined in a single template. For every Smart Folder, the template defines a folder name, search, and filing criteria, along with other properties. New templates are typically defined and added by business analysts, and created by administrators.

The folder structure can be personalised by user, for example, if you create a folder called My Files, you can populate it with files relevant to each user.

Take a look at the videos to learn more: [Smart Folders videos]({% link content-services/7.2/tutorial/video/content.md %}#smart-folder-overview)

## What's a Smart Folder? {#sf-whatis}

Use this information to understand the structure of Smart Folders.

This information is primarily aimed at business analysts, and system administrators.

A Smart Folder displays the results of a query in a folder format. It is “smart”, because there is no physical folder to represent it in the repository and the results are created dynamically. For example, a Smart Folder called My video files might be created to contain all files that I created that have a video format. Every time I open the My video files folder, the search query is run, and all my video files are available in that folder, wherever in the repository I have created them.

The diagram shows a physical file system, and how a Smart Folder structure is created to contain files relevant to a particular customer:

![Smart Folder structure]({% link content-services/images/sf-mapping.png %})

The repository is shown on the left with folders and files that relate to a customer. These are brought together into a new Smart Folder structure in Content Services.

Smart Folders are created when a Smart Folder Template is run. The Smart Folder Template contains:

* A folder name
* The query to be executed, when the folder is accessed by a user
* An optional filing rule, so that a user can add a file to the Smart Folder (and the file is filed according to the query for that folder)
* An optional list of properties that can be inherited by files or used for value propagation

Smart Folders have a limited set of actions:

* Add/ Create: You can add files to a Smart Folder. The file is put into a physical folder, as specified by the filing rule.
* Update: You can update files in a Smart Folder. Updating a property might result in a file being removed from the current Smart Folder (because it no longer meets the query criteria).
* Delete, Edit Properties, Unzip To, Sync, Locate To, Move, and Copy actions for files aren't supported.

The Smart Folder itself can't be edited in Alfresco Content Services, except through the Smart Folder Template.

Physical folders can be displayed inside Smart Folders as long as the physical folder matches the query criteria.

### Smart Folders terminology

Special terms used to describe Smart Folders.

* **Filing rule**

    A filing rule is specified in a Smart Folder Template and defines where a new file is stored in the repository, when it is uploaded to a Smart Folder. The filing rule also specifies the type and aspects that are applied to the new file, along with its property values.

* **Smart Folder**

    A Smart Folder displays the results of a query in a folder format. It is “smart”, because there is no physical folder to represent it in the repository and the results are created dynamically. A Smart Folder can also contain a hierarchy of Smart Folders.

* **Smart Folder Template**

    A Smart Folder Template is a JSON file that is stored in Alfresco Content Services in **Repository > Data Dictionary > Smart Folder Templates**. When the template is run in a physical folder, a Smart Folder structure is created.

## Prerequisites for using Smart Folders

There are a number of prerequisites for using Smart Folders.

* Smart Folders are provided as part of the standard installation with Alfresco Content Services.
* Change the Smart Folders property setting in the `<tomcat>/shared/classes/alfresco-global.properties` file to `true`:

    ```bash
    smart.folders.enabled=true
    ```

    > **Note:** By default, the `smart.folders.enabled=false` property setting is at the end of the `alfresco-global.properties` file. Set this property to `true` to enable Smart Folders, rather than adding a new `smart.folders.enabled=true` property setting to the file, which will cause the Smart Folder example not to work.

* To define a query for a Smart Folder, Alfresco Full Text Search (AFTS) must be used.
* Ensure that your system administrator has configured Alfresco Content Services to use either Solr 4 or Alfresco Search Services with `Solr 6` as a search service. The Alfresco Full Text Search should also be configured to either `Always use Database` or `Use Database if possible`.

## Plan and implement Smart Folders {#plan}

This information is primarily for business analysts, who are responsible for creating and defining the business scenario that requires Smart Folders.

Before you use Smart Folders, consider the use cases and scenarios that are appropriate to your business problem. Then you can:

* Define a custom content model

    To get you started, you can use the example model that is provided with the [Smart Folders tutorial]({% link content-services/7.2/tutorial/smart.md %}) for more information. See [Content modeling with Model Manager]({% link content-services/7.2/config/models.md %}) for more information on content models.

* Create a Smart Folder Template

    This defines the queries and filing rule for your Smart Folder structure, and property propagation rules for file uploads. The Smart Folder Template is a JSON file. See [Smart Folder Template syntax](#sf-syntax) for more information.

* Choose Type-based, System, or Custom Smart Folders to associate a Smart Folder Template with a physical repository folder.

    See [Type-based, System, and Custom Smart Folders](#sf-type) for more information.

* In an advanced setup, you might need to:
  * Enable Share actions in the `share-config-custom.xml` file. <!--DEV GUIDE: See [Configure Share Actions with Smart Folders](#sf-share-actions.md) for more information.-->
  * Configure other Smart Folders properties in the `alfresco-global.properties` file. See [Smart Folders global properties settings](#sf-props) for more information.

You can then test and deploy your solution. Use the [Smart Folders tutorial]({% link content-services/7.2/tutorial/smart.md %}) to understand more about the basic Smart Folders setup.

This diagram shows the recommended workflow:![Diagram showing four steps - create use cases, define content model, implement Smart Folder and Type, then test. Four arrows specifying implement, deploy, test and adopt.]({% link content-services/images/sf-workflow.png %})

## Enable Smart Folders

As an admin user, you must enable Smart Folders, and specify a Smart Folder Template for use.

A predefined template is available by selecting the System Smart Folder aspect. You can add other customized templates, and if they are uploaded to **Repository > Data Dictionary > Smart Folder Templates**, they are then available by selecting the System Smart Folder aspect. If you store templates anywhere else in your repository, you can use them by selecting the Custom Smart Folder aspect.

1. Stop Alfresco Content Services, and edit your `<tomcat>/shared/classes/alfresco-global.properties` file to enable Smart Folders:

    ```bash
    smart.folders.enabled=true
    ```

    Advanced Smart Folders settings are provided in the `<tomcat>/shared/classes/alfresco-global.properties.sample` file.

2. Restart Alfresco Content Services.

3. If you're using the default Smart Folder template, you're ready to go.

    If you want to check the template, or upload your own template, follow step 4.

4. In Alfresco Content Services, go to the **Repository > Data Dictionary > Smart Folder Templates** directory.

    The default Smart Folders Template is visible: `smartFoldersExample.json`. You can upload your own template here, and can see any other templates that you've already added.

    If you use your own template, make sure that you change the type to Smart Folder Template. See [Apply multiple templates]({% link content-services/7.2/tutorial/smart.md %}#sf-tutorial-6) for more information.

    If you store templates anywhere else in your repository, navigate to the template and select it. You can use them later by selecting the Custom Smart Folder aspect.

    There's no need to restart Alfresco Content Services. When you edit properties on nodes that have the Custom Smart Folder aspect applied, the new Smart Folder is included in the Smart Folder Template menu.

    If you need to customize the template, see [Applying a Smart Folder Template]({% link content-services/7.2/using/smart-folders.md %}) for information on the sample file structure, and [Smart Folder Template syntax](#sf-syntax) for guidance on the Smart Folder Template JSON format.

## Type-based, System, and Custom Smart Folders {#sf-type}

There are three ways to attach Smart Folders to physical folders.

Each method assigns a Smart Folder Template to a physical folder, which is then immediately available to all users.

### Type-based Smart Folders {#sf-folder-type}

Type-based Smart Folders replicate a Smart Folder structure and apply it to many folders of a specific type, or carrying a specific aspect.

These are the key elements of Type-based Smart Folders:

* Best used to replicate a Smart Folder structure on multiple objects
* Allows you to configure new sections that are automatically embedded into folder and file properties
* Allows you to associate a Smart Folder Template with a specific type or an object that has a specific aspect
* New templates can be added in **Repository > Data Dictionary > Smart Folder Templates**
* Names must match. For example, in our tutorial the Smart Folder Template `clex_claimFolder.json` matches the Claim Folder (`clex:claimFolder`) type
* Additional `alfresco-global.properties` settings required to enable this method. You could use any of these examples:

    ```bash
    smart.folders.config.type.templates.qname.filter=*
    smart.folders.config.type.templates.qname.filter=clex:claimFolder,dam:*
    smart.folders.config.type.templates.qname.filter=none
    ```

The `smart.folders.config.type.templates.qname.filter` property can be set to one of the following:

* `none` for no types or aspects
* `*` for all types and aspects
* `<prefix>:*` for all types and aspects that are defined within a specified namespace
* `<prefix>:<name>` for a type or aspect with the specified name

Advanced Smart Folders settings are provided in the `<tomcat>/shared/classes/alfresco-global.properties.sample` file.

The setup of Type-based Smart Folders is somewhat complex, but is explained in detail in the tutorial. See [Configure claims management]({% link content-services/7.2/tutorial/smart.md %}#sf-tutorial-2) and [Create a new claim]({% link content-services/7.2/tutorial/smart.md %}#sf-tutorial-4) for more information.

### System Smart Folders {#sf-folder-system}

System Smart Folders are best used when you want to see content (that is distributed across the repository) in context; for example, all my files, or all files that are tagged as confidential.

These are the key elements of System Smart Folders:

* Best used to apply multiple taxonomies to find content in context
* Loaded using the System Smart Folder (`smf:systemConfigSmartFolder`) aspect
* Default template selected using the Smart Folder Template called `smartFoldersExample.json`
* New templates can be added in **Repository > Data Dictionary > Smart Folder Templates**.

    > **Note:** When you add a template to **Repository > Data Dictionary > Smart Folder Templates**, select **Change Type** and choose the Smart Folder Template type, to ensure that the new template is displayed in the list in **Repository > Data Dictionary > Smart Folder Templates**.

Advanced Smart Folders settings are provided in the `<tomcat>/shared/classes/alfresco-global.properties.sample` file. See [Apply a Smart Folder Template]({% link content-services/7.2/using/smart-folders.md %}) for more information.

### Custom Smart Folders {sf-folder-custom}

Custom Smart Folders are similar to System Smart Folders, except that you select the template from anywhere in your repository.

These are the key elements of the Custom Smart Folder:

* Best used to apply multiple taxonomies to find content in context
* Allows use of Smart Folder Templates that are located anywhere in the repository
* Loaded using the Custom Smart Folder (smf:customConfigSmartFolder) aspect
* Selected using the Smart Folder Template specific to your custom template

Advanced Smart Folders settings are provided in the `<tomcat>/shared/classes/alfresco-global.properties.sample` file. See [Enable Smart Folders](#enable-smart-folders) and [Apply multiple templates]({% link content-services/7.2/tutorial/smart.md %}#sf-tutorial-6) for more information.

## Metadata inheritance

You can set files and folders to inherit metadata using Smart Folders.

One of the most useful features of Smart Folders is the ability to automatically classify new files and inherit or map metadata to the file itself. This is possible by using Type-based Smart Folders, so that when you drag and drop files into your Smart Folder structure, they inherit any properties that you've set up in the Smart Folder Template.

Use the [Smart Folders tutorial]({% link content-services/7.2/tutorial/smart.md %}) to set up a Smart Folder framework using Type-based Smart Folders, and in [Adding new claim files]({% link content-services/7.2/tutorial/smart.md %}#sf-tutorial-5) you'll see metadata inheritance in action.

Take a look at the [Metadata Inheritance video]({% link content-services/7.2/tutorial/video/content.md %}#smart-folder-metadata), and [Type-based Smart Folders](#sf-type) for more information.

## Smart Folder Template syntax {#sf-syntax}

You can build your own Smart Folder Template using these guidelines.

A Smart Folder Template is a configuration file that contains one or more queries to define the nodes of a hierarchical tree of "smart" folders. It's a JSON (Java Script Object Notation) file that defines one node object for every Smart Folder.

You can customize a copy of the `smartFoldersExample.json` template, which is available from **Repository > Data Dictionary > Smart Folder Templates** in Alfresco Share. The [Smart Folders tutorial]({% link content-services/7.2/tutorial/smart.md %}) also provides links to a variety of examples.

For more information about Alfresco Full Text Search (AFTS), see [Alfresco Full Text Search reference]({% link search-services/latest/using/index.md %}).

A node is defined by the following properties:

| Property | Description |
| -------- | ----------- |
| name | Mandatory folder name. |
| id | Optional ID or number that is unique for the node in the template. This property is optional, however it is recommended as specifying an ID generates a much shorter (and permanent) noderef for the Smart Folder. |
| description | Optional description, displayed in the detailed view. |
| nodes | Optional collection of sub nodes (sub folders). |
| search | Mandatory query defined using Alfresco FTS (full text search) language. The search is run when a Smart Folder is accessed by a user. |
| language | Mandatory property, set to `fts-alfresco`. |
| query | Mandatory FTS query that defines the folder content. |
| filing | Optional rule that defines the filing action for a new file when it is uploaded to the Smart Folder. If no filing rule is defined, files can't be uploaded to that folder. Parameters include: {::nomarkdown}<ul><li>path: path where a document is physically stored</li><li>classification: type and aspects assigned to the new file</li><li>properties: property values attributed to the new file</li></ul>{:/} |
| path | Mandatory property in a filing rule. Path to store new documents. This is the [ISO9075](https://github.com/Alfresco/alfresco-community-repo/tree/release/7.0.0/data-model/src/main/java/org/alfresco/util){:target="_blank"} encoded `QName`. |
| classification | Mandatory property in a filing rule. Type and aspects of the new object. |
| properties | Optional property. Defines property values and inheritance. |

Here are some tips on notation:

* Use percent (%) signs to use predefined placeholders in queries and filing rules
* For repository path expressions use QNames, for example; `/app:company_home/st:sites/cm:swsdp/cm:documentLibrary`.
* Special characters and whitespace are [ISO9075](https://github.com/Alfresco/alfresco-community-repo/tree/release/7.0.0/data-model/src/main/java/org/alfresco/util){:target="_blank"} encoded. Use this notation to encode special characters in repository path names. For example, use `_x0020_` for the whitespace character.

| Placeholder | Description |
| ----------- | ----------- |
| %ACTUAL_PATH% | [ISO9075](https://github.com/Alfresco/alfresco-community-repo/tree/release/7.0.0/data-model/src/main/java/org/alfresco/util){:target="_blank"} encoded repository path of the physical parent folder. Only the physical parent folder (or next physical folder up the folder tree) can use `%ACTUAL_PATH%`. |
| %CURRENT_USER% | Account name of the user. |
| \_x0020\_ | [ISO9075](https://github.com/Alfresco/alfresco-community-repo/tree/release/7.0.0/data-model/src/main/java/org/alfresco/util){:target="_blank"} encoded whitespace character. |
| <> | Use angle brackets, for example, `<cm:name>`, to inherit property values from the physical parent folder. Used for inheritance in a filing rule and in a query. |

The following code fragments give more information about these properties.

### Nested nodes

These define a Smart Folder structure inside another Smart Folder structure, for example:

```json
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

### Search queries

Information is populated by running a search query:

```json
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

```json
"query":"+ASPECT:'ins:claimFolder'"
"query":"+TYPE:'cm:folder'"
```

You can use `%CURRENT_USER%` to limit the search to documents relevant to the signed in user, for example:

```json
"query":"cm:modifier:%CURRENT_USER% or cm:creator:%CURRENT_USER%"
```

### Filing rules {#filing}

These define the path where a document uploaded to a Smart Folder should be created, as well as the type and aspects of the new file, and its property values:

```json
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

* `path`

  The path can be an existing folder location, for example:

  * Using an XPath expression, and ensuring the expression is [ISO9075](https://github.com/Alfresco/alfresco-community-repo/tree/release/7.0.0/data-model/src/main/java/org/alfresco/util){:target="_blank"} encoded:

    ```json
      "path":"/app:company_home/cm:Claims_x0020_Pool"
    ```

  * Using the parent folder, by specifying the placeholder `%ACTUAL_PATH%`.

      The path variable can also be used in a query to restrict the search to a certain folder:

      ```json
      "query":"PATH: '/app:company_home/st:sites/cm:legal-documents/'"
      ```

      or in a filing rule to store new objects:

      ```json
      "path":"/app:company_home/cm:Insurance/*"
      ```

* `classification`

You can define the type for content that populates a Smart Folder, and which aspects should be associated to them. In the [code example](#filing), each new document shown in the "Correspondence" folder is of type `"cm:content"` with aspect `"cmg:claim-document"`.

* `properties`

  You can assign property values. These can be fixed, or a placeholder `"<[property_name]>"` that uses the value of the parent folder property.

  In a Smart Folder, you can map the value of the parent folder or object to that of a new object as variables:

    ```json
    "[new_obj_prop_name]":"<[existing_obj_prop_name]>"
    ```

    For example, `"cmg:claimDocumentId":"<cmg:claimId>"`

    or as names:

    ```json
    "[new_obj_prop_name]":"[literal]"
    ```

    For example, `"cmg:claimDocumentType":"Correspondence"`

    You can also use the value of the parent folder or object in a search query, for example:

    ```json
    "query":"=cmg:claimDocumentType:Correspondence and cmg:claimDocumentId:<cmg:claimId>"
    ```

## Smart Folders global properties settings {#sf-props}

Use this information to understand the full list of `alfresco-global.properties` settings available for Smart Folders.

Settings for Smart Folders are listed in the `<tomcat>/shared/classes/alfresco-global.properties.sample` file:

```bash
#Smart Folders Config Properties

smart.folders.enabled=true
smart.folders.model=alfresco/model/smartfolder-model.xml
smart.folders.model.labels=alfresco/messages/smartfolder-model

#Smart reference config

#smart.reference.classpath.hash=${smart.folders.config.vanilla.processor.classpath}->1,${smart.folders.config.system.templates.classpath}->2

#Smart store config

#Company home relative download associations of smart entries
#smart.download.associations.folder=${spaces.dictionary.childname}/${spaces.smartdownloads.childname}

#Generic virtualization methods config

#Vanilla JSON templates javascript processor classpath. A java script processor used to
#covert JSON templates to internal smart folder definitions.

#smart.folders.config.vanilla.processor.classpath=/org/alfresco/repo/virtual/node/vanilla.js

#System virtualization method config

#System virtualization method aspect.
#smart.folders.config.system.aspect=smf:systemConfigSmartFolder
#System virtualization method aspect defined template location property.
#smart.folders.config.system.aspect.template.location.property=smf:system-template-location
#Classpath to be explored for *.json entries defining system templates.
#smart.folders.config.system.templates.classpath=/org/alfresco/repo/virtual/node
#A company home relative name or qname path location of repository system templates.
#smart.folders.config.system.templates.path=${spaces.dictionary.childname}/${spaces.smartfolders.childname}
#Content sub type of repository system templates.
#smart.folders.config.system.templates.template.type=smf:smartFolderTemplate

#Custom virtualization method config

#Custom virtualization method aspect.
#smart.folders.config.custom.aspect=smf:customConfigSmartFolder
#Custom virtualization method aspect template content association.
#smart.folders.config.custom.aspect.template.association=-template-association


#Type virtualization method config

#A company home relative name or qname path location of the type mapped templates.
#smart.folders.config.type.templates.path=${spaces.dictionary.childname}/${spaces.smartfolders.childname}
#Type and aspect qname regular expression filter.
#smart.folders.config.type.templates.qname.filter=none
```

The different sections are used in the following ways:

1. Smart Folders config properties: these are the basic mandatory settings for Smart Folders.

    ```bash
    smart.folders.enabled=false
    ```

    This is the default setting, and must be set to `true` to enable Smart Folders.

2. Smart reference config: reduces the length of NodeRefs.
3. Smart store config: If you use the **Download as Zip** function in Share for a folder that contains Smart Folders, a temporary file is created in the **Data Dictionary > Smart Folder Downloads** folder that contains information about the Smart Folder contents (an association folder). Use this variable to change where the association folder lives.
4. Generic virtualization methods config: defines overall Smart Folder Template classpath. By default, templates live in `<configRootShare>\classes\org\alfresco\repo\virtual\node`.
5. System virtualization method config: defines the configuration for System Smart Folders. See [System Smart Folders](#sf-folder-system) for more information.
6. Custom virtualization method config: defines the configuration for Custom Smart Folders. See [Custom Smart Folders](#sf-folder-custom) for more information.
7. Type virtualization method config: defines the configuration for Type-based Smart Folders. See [Type-based Smart Folders](#sf-folder-type) for more information.

## Best practices for Smart Folders {#best-practice}

There are a number of best practices when using Smart Folders.

Server Configuration and Alfresco Search Services:

* Ensure that your system administrator has configured Alfresco Content Services to use Alfresco Search Services with `Solr 6` as a search service.
* Configure transactional queries in the Search Service to use the database always, or if possible.
* When you define a search query, restrict the query to certain types or aspects (using +TYPE or +ASPECT), otherwise the query will search for all content.
* When defining a filing rule for a Smart Folder, use a transactional query for that folder where possible, otherwise uploaded files will not appear immediately. See [Transactional metadata queries supported by database]({% link search-services/latest/config/transactional.md %}) for more information.

Smart Folder Templates:

* Use the FTS query language (this is mandatory for Smart Folders). All other languages are experimental and do not allow creation or upload of new objects into a Smart Folder.
* If you're using WebDAV, only `cm:folder` types are supported for a folder. Do not use a sub type of `cm:folder`; instead use aspects to apply properties to a folder.
* Don't create filing rules that don't match the query criteria for the folder.
* Don't use folder types in a filing rule (creating physical folders in Smart Folders is not supported).

General guidance:

* Use the optional `id` property for every folder node to shorten the `noderef` for a Smart Folder (the length of noderefs can become critical). The ID must be unique in a template.
* We recommend uploading content through Alfresco Share or the CMIS APIs. File system protocols such as WebDAV or IMAP are unsupported.
* When you create a model, don't use the `-` (dash) character in a type, aspect, or property name. A better method is to used mixed case in your names. If you've used the `-` character in a property name, you must escape the property name in a Smart Folder Template, using `\\`; for example, `mod:first-name` must be escaped to `mod:first\\-name`.
