---
title: Configure Federation Services
---

## Overview

[Connectors](#connectors) are the 1st step in the integration process. They represent how Federation Services connects to other systems.

Connections are instances of connectors which the user configures. There are 5 types of connections: Authentication, Discovery, Integration, Content Service, and Content Search.

The Federation Services Wizards will help you quickly create all the connections needed for your data integration.
Available Wizards: [Quick Build](#quick-build-wizard), [Integration](#integration-wizard), [Federation](#federation-wizard)

### Connection Wizards

Federation Services wizards allow users to easily create connections and jobs by simply selecting the software connectors you want to use enter the required configurations and let Federation Services do the rest.

#### Quick Build Wizard

To use the Quick Build Wizard follow the steps below:

1. Begin by selecting wizards from the navigation menu on the left.
2. Select **Quick Build**
3. Name your connection prefix. Your connection type will be added to the end of the connector name you chose.
4. Click **Build Connections**

The wizard will create all the connections needed for your integration.

Clicking on the links for your new connections will open them in a new tab for you to add more configurations if needed and gives you the option to test your connections before continuing with your integration.

If you have made a mistake in naming or choice of connector you can click **Undo and Restart** to begin the process again.

#### Integration Wizard

With the Integration Wizard you can create source and target repository connections step by step. This wizard will then create a job with some configuration options along the way. Follow the example below to use the Integration Wizard

**Step 1: Connection Type**

1. Name your repository connection
2. Choose your repository from the drop-down
3. Click **Next Authentication**

**Step 2: Authentication**

1. If there is already an authentication connection it will show up in the Authentication Drop-down to choose.
2. You can either choose the one already in the system by clicking the option Use selected Authentication or create a new one.
3. To create a new one choose the Authentication Connection type from the drop-down and ensure the slider is set to Create New authentication Connection.
4. Click the Fill Authentication Fields to configure any additional fields. Connection
5. Click **Next**: Source Options to continue

**Step 3: Additional Options**

In step 3 you will be given additional options to configure depending on the connections available for the software chosen. For example:

* Create a Discovery Instance
* Create a Content Service Connection

Repeat Steps 1-3 for your Output Repository.

If the software doesn't require authorization the wizard will skip step 2

Click **Next Output**

As each connection is built they will be listed in separate boxes on the left. Click on the links to open the connections in a separate tab to view or edit the connections.

The system will use the repository and output integration connections and build an Integration Job

Click on **View Completed Job** to fill out any additional mappings and / or configurations to the job specifications.

#### Federation Wizard

The Federation Wizard is a more specific type of migration, meant to index content into Elasticsearch, Solr, or MongoDB

Following are step-by-step instructions on using the Federation Wizard.

**Input Connection**
**Step 1: Connection Type**

1. Name your repository connection
2. Choose your repository from the drop-down
3. Click **Next Authentication**

**Step 2: Authentication**

1. If there is already an authentication connection it will show up in the Authentication Drop-down to choose.
2. You can either choose the one already in the system by clicking the option Use selected Authentication or **create a new one**.
3. To create a new one choose the Authentication Connection type from the drop-down and ensure the slider is set to **Create new authentication Connection**.
4. Click the **Fill Auth Fields** to configure any additional fields. Connection
5. Click **Next: Source Options** to continue

**Step 3: Additional Options**

Yes is selected to create the content service connection

Click **Next: Output**

Repeat the above steps to set up your Content Service Connection.

As each connection is built they will be listed in separate boxes on the left. Click on the links to open the connections in a separate tab to view or edit the connections.

The system will use the repository and output integration connections and build an Integration Job

### Connection Types

#### Authentication

These are used to authenticate to outside systems and need certain authentication fields like passwords, access tokens or refresh tokens. Authentication is needed for sources such as Google Docs, Office 365, and Salesforce.

Authentication connections are used by [Integration Connections](#integration-connections) to connect to the source repositories.

Authentication connectors are reusable. Instead of writing the auth configuration into every repository / output connector, we can set the authentication configuration in one authentication connector and use it with multiple connectors. For more information on specific Authentication connectors, click the link for the software below that you want to connect to.

##### New Authentication Connection

1. Click on **Authentication Connectors** to create an authentication connector.
2. At the bottom of the Authentication Connections page click " **CREATE A NEW AUTH CONNECTION** ".
3. The Connection Type drop-down is searchable. Repeat this step for other systems.

##### Configuration Fields

**Name**: Unique Name for the Auth Connection to identify it in the UI.

**Connection Type**: The Connection Type refers to the type of the connection (i.e. Box OAuth Connector, CMIS Auth Connector, SharePoint Auth Connector, etc.)

#### Discovery

Discovers schemas on the remote system. These are tables, columns, object types, aspects, categories, content types, index fields, etc... Basically the types and metadata associated for any given system. Federation Servicestion Services unifies all of this into a Schema for easier mapping. Discovery makes mapping to and from your sources easier for data migration and ensures the data gets connected to the right fields.

Discovery connectors are responsible for discovering the schema, or the metadata about the repository. This will include content types and their associated properties.

A discovery schema can then be used to aid in creating Job Mappings or to simply find out what's in the repository. Running a discovery instance will create a new version of the schema. Whatever version you select will be used when creating mappings.

##### Schema Instances

Viewing the schema instances will show you a table of all available Discovery Instances, this table can be sorted by Name, Type, and Available Versions.

Here you can view the most recently created schema instances as well as created new ones.

* Name: Unique Name for the Discovery Connection to identify it in the UI.
* Type: The Discovery Type refers to the type of the repository (i.e. CMIS, SharePoint, Documentum etc.).
* Version: Each Discovery Schema can have multiple versions. Selecting this version will set which is used in Job Mappings as well as which schema will be shown when examining a schema.

##### New Discovery Connection Instance

To create a new Discovery Connection, click the **Create New Discovery** Instance button at the bottom of the Schema Instances Page. Fill in the following fields.

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Discovery Type**: The Discovery Type refers to the type of the repository
* **Authentication Connection**: A predefined connection for authentication.
* **Ignore Types**: Comma delimited list of types to ignore.
* **Additional Fields**: Some connections require additional information to search for types. Click on a link in the table below for more details on setting up the Discovery Connection for a particular software.

##### Discovery Schema View

Once Discovery finishes running Federation Services will store the information. Discovery only needs to be run once, unless the schema of the source repository is changed.

To view the report, click the document icon to the left of the instance. You can click into each attribute section by category.

#### Integration Connections

These connections retrieve data from the source system. Their job is to query or crawl remote systems for files, folders, metadata, versions, and renditions. They also add source-specific configuration to job in the form of Specification Tabs. Integrate your Alfresco or FileNet servers for example for better document management.

As a general rule, Connectors do not delete documents. It only copies and writes them.

Most Integration Connections can act in both repository (read) and output (write) modes. If it can't, it will not appear as an option when creating or editing a job.

##### Output (Write) Mode

In Output mode, connectors push content and metadata. Many of them can also build version series' from the source systems.

###### Versions

If a connector retrieves versions, they will be queued as a series in the order of oldest to youngest and the writing connection (if it supports versioning) will attempt to write them in that order. Some connectors, such as Box, and SharePoint REST, can be configured to roll back any documents in a version series, should any of the documents in the series fail to upload

##### Repository (Read) Mode

In Repository Mode, connectors will generate a query, or use one provided, to retrieve unique ids for documents. It will then use this list to query individual documents to extract metadata, version information, and copy content for processing.

###### Folders

If a connector retrieves folders, they will be processed much like a document would be. The writing connection should know what to do with them.

#### Content Service Connections

These connections provide a full ECM API for interacting with files, folders, metadata, versions, and renditions. This includes functionality like check- in/out, upload new files, modify metadata, upload new versions, create folders, redact documents etc.

Content Service Connections offer public REST endpoints that allow for integration with external applications. Actions in the Content Services API or the Discovery web application perform actions against specific repositories through these connectors.

##### Commonly Supported Operations

> **Note**: The capabilities of each Content Service Connector is limited to operations allowed by the repository. Additionally, not all methods are available for all connectors. View individual connector pages for a list of capabilities.

* Creating content

* Retrieving file content

* Showing content properties

* Listing folder items
* Listing file versions
* Updating file content and properties
* Deleting files and folder
* Showing repository capabilities
* Retrieving the Root Folder ID
* Managing Permissions

##### Basic Configuration

> **Tip**: Connector ids are how Federation Services identifies the individual connector when receiving calls from other sources. This value must be usable as part of url. Use the description field if you need more than a few letters/numbers to describe the connection. The description shows up with its connector ID across the product.

* Connector ID: A unique identifier for this connection (Alphanumeric, dashes and underscore characters only)
* Description: The text that will be displayed on drop-downs etc. to identify this connection.
* Type: The type of Search Connection (Solr, Mongo, Elastic etc.)
* Keep Connection Alive: Federation Services will cache the connection for a given amount of time before discarding it.
* Keep Alive in Milliseconds: How long to keep the connection alive before discarding it (300000 is 5 minutes)
* Security Mode: This is how to authenticate with the back-end search.
  * Authentication Connection: The most common method is to use the appropriate authentication connection
  * User Pass-through Credentials: Users the authenticates with whatever authentication they used for Federation Services. Only supported in rare cases.
  * None: Only usable with the Filesystem Content Service Connector

##### Connection Configuration

Different connectors might require additional configuration. These values will populate after selecting a Type.

##### Content Service Mapping

You can also add mappings or mapping groups to your Content Service Connections which will allow you to map custom parameters to properties in the destination system.

##### Add Mappings to a Content Service Connector

1. Create a mapping.
    * (Optional) Add your mappings (and other mappings) to a Mapping Group.
2. Click the edit icon for your Content Service connector.
3. In the drop-down under Mapping Type select Single Mapping or Group Mapping
4. In the drop-down under the mapping type you chose, select the Mapping or Mapping Group you want to add to this connection.
5. Save the Content Service connector.

##### Creating Mappings for Content Services

Content Service mappings will use the source as the **parameter name** for the content service call. The target field should match a field name in the destination repository. For easier use, you can leverage the schema discovery for your connectors to populate the output field names when mapping.

##### Creating A Content Service Connection

Following is an example of how to create a new content service connection.

**Step 1: New Connection**

To create a content service connector instance select the Content Service Connections under the Connections header. Click **Create New Content Service Connection**

You will be brought to the generic Content Connection page.

**Step 2: Basic Configuration**

* **Connector ID**: This uniquely identifies this instance of the connector. This must be unique and will be used when you index content and metadata.
* **Description**: Describe your connection. Be descriptive as you may not be the only one using this connection.
* **Type**: Select from a drop-down list of Content Service Connectors installed in your instance of Federation Services. Once you select a connector type you will be presented with further options which will be documented on the connector page for that type. Don't see your connector listed here? Contact your Federation Servicestion Services Administrator or Federation Services Support.
* **Keep Connection Alive**: If checked then we will cache the connection object so the user doesn't have to re-connector for every action they want to perform. If unchecked each API action will result in a login to the third-party system.
* **Keep Alive in Milliseconds**: How long to keep the session in cache.
* **Connection URL**: The URL or Path to connect to.
* **Security Mode**: Authentication Connection: This uses an authentication connector. An example may be a Box OAuth Connector. These can be a little more complex than the first 3 options and provides customizations by allowing you to create your own auth connectors.

**Step 3: Connection Configuration**

**Add Configuration Parameter (Button)**: Some connectors allow for optional parameters than can be passed via key/value pairs. Most of the time you'll have a form to fill out, but for more advanced features that are situational adding a key/value pair makes sense as it won't clutter up the user interface.

#### Content Search

Provide a search interface to the Content Services API. These connections implement the Federation Services search API and query language, both of which mimic Apache Solr.

Content View Connectors or Content Search Connector allow you to search content and then take action against the results. They are used by Content Views in Federation to populate results and update indexes as needed.

##### Basic Configuration

###### Connector ID

Connector ids are how Federation Services identifies the individual connector when receiving calls from other sources, such as Federation Service. This value must be usable as part of url. Use the description field if you need more than a few letters/numbers to describe the connection. The description shows up with its connectorId across the product.

* **Connector ID**: A unique identifier for this connection i.e. simflofy_demo (Alphanumeric, dashes and underscore characters only)
* **Description**: The text that will be displayed on drop-downs etc. to identify this connection.
* **Type**: The type of Search Connection (Solr, Mongo, Elastic etc.)
* **Keep Connection Alive**: Federation Services will cache the connection for a given amount of time before discarding it.
* **Keep Alive in Milliseconds**: How long to keep the connection alive before discarding it (300000 is 5 minutes)
* **Security Mode**: This is how to authenticate with the back-end search.
* **Authentication Connection**: The most common method is to use the appropriate authentication connection
* **User Pass-through Credentials**: Users the authenticates with whatever authentication they used for Federation Services. Only supported in rare cases.

##### Result Links

Result Links are under the **Search Configuration** tab, but work universally.

If **Download** is selected, the file names in your view will call a document download, much like the Widget

If **External** is selected, you will need to add **Result Links**. When you click the Result Links button a modal should appear. It takes three arguments:

* **Content Service Connector**: External link configurations are grouped by content service connector.
  * This allows documents from different repositories to form different links
* **Link Field**: The document field that contains relevant information for building the link.
* **Link Url**: The content of the link field will be appended to this url to create the link.

Due to how certain ids with versions are handled, the value of the link field will be cut off after the first instance of a semicolon(;).

##### Search Configuration

Refer to the documentation for each connector to see which fields are available.

##### Search Security

* Filter:

The authenticated user's group ids and login will be added to each search request. Requires content to be indexed using the Index User Group Task (used to index user and group information onto each document; adds two metadata fields to each document in order to restrict or allow access to documents indexed through this task).

* Restrict:

Only users from the selected groups will be able to use this search connection, regardless of role. If this connection in used as part of a Content View, users outside these groups will not be able to see it in their View List in Discovery.

##### Connection Configuration

Individuals connectors might have specific fields here that were not general enough to be in Search Configuration

Additionally, this is where you can use the "Add Custom Parameter" button to set any default query values for the connection.

A query_fq configuration param lets you define facet queries behind the scene. This is done to provide limited views or subsets of data in the search. Essentially you could create any number of views on the same date but each view would display different results. This can also be used in a role base system where you have views setup for specific user roles.Unless the fq is already encoded, you will need to wrap it in the encode() function where it will be URLEncoded UTF-8.

The syntax is:

```text
query_fq for the first one
query_fq1 for the second
etc.
```

### Connectors

#### Recommended Connectors

The following connectors are recommended and supported by the latest version of Federation Services.

| Software Connector | Description |
| [Objective ECM/Nexus](#objective-ecmnexus) | Can be used as an output connector for Manage in Place |
| [Elasticsearch](#elasticsearch) | Can be used as a content search connector for Manage in Place |
| [MongoDB](#mongodb), [MongoDB GridFS](#mongodb-gridfs) | Can be used as a content search connector for Manage in Place |
| [Alfresco](#alfresco) | Can be used as an output connector for Manage in Place |
| [Google Drive and Gmail](#google-drive-and-gmail) | Index files and emails from Google Drive and Gmail |
| [Microsoft Graph](#microsoft-graph) | This includes OneDrive, SharePoint, Outlook, and Teams |
| [File System](#file-system) | Index files straight from your computer or server |
| [Reporting](#reporting) | Used to gather data on other repositories |

Additional Connectors:

* [Amazon Glacier](#amazon-glacier)
* [Amazon S3](#amazon-s3)
* [Apache Kafka](#apache-kafka)
* [Apache Solr](#apache-solr)
* [Aprimo](#aprimo)
* [Azure Blob](#azure-blob)
* [Batch Parser](#batch-parser)
* [Bootstrap](#bootstrap)
* [Box Cloud](#box)
* [BFS](#bulk-file-system)
* [Centera](#centera)
* [CMIS](#cmis)
* [CSV](#comma-separated-value-csv)
* [Documentum](#documentum)
* [DocuShare](#docushare)
* [DocuWare](#docuware)
* [Dropbox](#dropbox)
* [Email](#email)
* [Ephesoft](#ephesoft)
* [FTP](#file-transfer-protocol-ftp)
* [IBM CMOD](#ibm-cmod-odwek)
* [IBM Filenet](#ibm-filenet)
* [iManage](#imanage)
* [Infor](#infor)
* [JDBC](#jdbc)
* [Jira Cloud and On Premise](#jira-cloud-and-on-premise)
* [Meridio](#meridio)
* [Mobius](#mobius)
* [Nuxeo](#nuxeo)
* [OpenText](#opentext-content-server)
* [Oracle](#oracle)
* [Salesforce](#salesforce)
* [ServiceNow](#servicenow)
* [Twitter](#twitter)
* [WebDav](#webdav)
* [Zendesk](#zendesk)

##### Objective ECM/Nexus

A logical, intuitive UX. Informative dashboards. Powerful business process capabilities. Focus on outcomes as well as information management.

###### Authentication Connections

> **Note**: Passthrough authentication currently only works for ECM content service:
Objective Basic Authentication Connector: passthrough username and password
Objective OAuth Connector: only passthrough username

**Objective Basic Authentication**

> **Note**: Objective Basic auth connector does not work for ECM Nexus

* **Connection Name**: Unique Name for the Auth Connection to identify it in the UI.
* **Username**: The username to authenticate with the repository if applicable.
* **Password**: The password to authenticate with the repository if applicable.
* **Server URL**: The URL to your Objective server

**Objective OAuth Connection**

> **Note**: Minimum required version of ECM/Nexus is 11.2 for OAuth connections

* **Name**: Connector Name
* **Server URL**: Server URL e.g https://myserver.objective.com
* **User Id**: User Id with permissions to execute API calls
* **Client Id**: Client Id generated when setting up the client application
* **Client Secret**: Client secret generated when setting up the client application

###### Discovery Connector

**Discovery Instance Configuration Fields**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: Your Objective Authentication Connection
* **Ignore Types**: Comma delimited list of types to ignore.

###### Integration Connection

Also known as input an output connections. Their job is to query or crawl remote systems for files, folders, metadata, versions, and renditions.

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better
* **Authentication Connection**: Your Objective Auth Connection

###### Job Configuration

**Repository**

Comma delimited list of folders to crawl: ** For this field use FolderIds

**Output Specification**

* **Output Folder Path**: Folder ID to start output. Note that the path from the source will be duplicated in the output and subsequent folders will be created as needed.

> **Note**: The Objective connector uses the job's Repository Time Zone field for time zone conversion. The output Time Zone field is ignored, since Federation Services always sends ECM a UTC DateTime.

**Duplication Check Task**

Given the ECM connector is the source repository, when there are two of the same documents in the source repository with different paths; and if documents are pptx, docx, xlsx files, the ECM seems to change these documents and their MD5 code are different. Therefore, when the job for ECM to ECM has a duplication check task with a field to compare as file content hash, it will create a new version for these types of documents.

When the duplication check task field to Compare is set as File content hash, and there are two emails with the same content and the same subject, the MD5 codes will still be different for these two emails. Because of this, Federation Services cannot use duplication check task to skip one of them.

> **Note**: Only new files greater than 100MB are up chunked and uploaded.
Chunked uploads do not take place if the file already exists in the Objective folder specified.
Linked documents and version updates are not currently supported by this feature.

###### Mapping

> **Note**: When adding job mapping, the type mapping and aspect mapping should be added first and then add the calculate mapping and field mapping.

When "Field Mapping" from ECM connector, make sure fields do not have "document." prefix. For example, "document.dateUpdated" must be written as "dateUpdated" Remove the "document." prefix added by schema instance.

SharePoint Connection: When mapping "Modified by" field of SharePoint, schema instance will add it as "Document.Modified By", but it must be manually changed to "Document.simflofy_last_modified_by".

###### EMail Integrations

*For the MS Graph Mail connector and the Exchange Email connectors

In a job MS Graph Mail connector / Exchange Email connector to ECM with the job type set as manage in place, if the user changes the object type to E-Mail Message type through mapping, then when running the job, the external records will generate in ECM with object type as E-Mail Message and the default metadata fields set in the E-Mail Message will not get a value.

###### Content Service Connection

**Supported Methods**

* Create Folder
* Get File Content
* Get Object Properties
* Delete Object By id
* List Folder items

###### Manage In Place

For Objective ECM Version 11.3+

Manage in Place (MIP) is intended for organisations who have their content spread out across multiple repositories (file shares, M365 sources like SharePoint, Exchange, OneDrive, or other line of business applications) and wish to centrally govern the content while meeting the records compliance needs. It allows users to manage their content's lifecycle through Objective ECM without the need to transfer it from its original location.

##### Elasticsearch

Elasticsearch is a search engine based on the Lucene library. It provides a distributed, multi-tenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents. Elasticsearch is developed in Java.

* **Version Support**: Federation Services currently only supports version 7.15 of Elasticsearch and does not support version 8
* **AWS Compatibility**: As of September 2021 this connector will not work with AWS instances of ElasticSearch. AWS has its own version, now called OpenSearch, which is incompatible with current Elasticsearch libraries.

> **Note**: To configure Elasticsearch to handle larger file sizes:
In installed elasticsearch/config/elasticsearch.yml
Set http.max_content_length to a value greater than 100MB
See [here](https://www.elastic.co/guide/en/elasticsearch/reference/7.17/modules-network.html){:target="_blank"} for more options

###### Authentication Connection

* **Name**: Unique connection name
* **Username**: Username for Authentication or blank when no auth needed.
* **Password**: Password for Authentication or blank when no auth needed.
* **Server URL**: Server URL with protocol, host and port http://127.0.0.1:9200/
* **Socket Timeout in milliseconds**: How long to wait before requests fail

###### Integration Connection

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: Your FileNet Auth Connector

###### Job Configuration

ID ENCODING
Federation Services uses the source repository id of a document as a default value for the id in ElasticSearch. These can sometimes contain illegal characters, especially if they are file paths, such as from a Filesystem or Amazon S3. As part of the indexing process, the value of this field will be encoded to ensure its validity. Currently, only slashes, spaces and apostrophes are encoded, but this will likely change to full encoding in the future to better support non-standard character sets.
FILE CONTENT
If `Include Binaries` is checked in the Details tab, the connector will convert it to a base64 encoded String and store it in the `binaryData` field
 
Note: ElasticSearch does not support writing of multiple versions of a document and will only write the latest one picked up in a migration. All other versions will be ignored instead of being audited and will not be counted as Skipped

* **ID Attribute**: The field that will be used to set the document id
* **Index Name**: The name of the collection where the indexes will be created.
  * If the collection already exists and does not have the required mappings, Federation Services will attempt to update the mappings
* **Batch size**: The number of documents to generate before sending a request.
* **Out Renditions as array to the `renditionData` field**: If there are multiple renditions, they will be stored as a list of base64 encoded strings.
* **Term Vectors**: Term vectors increase the size of an index but are required for highlighting and More Like This searches.
  * All text based default Federation Services fields are included by default
  * Term vectors can only be applied to text fields.
  * Term vectors will be enabled for any custom text field added to mappings

###### Content Search Connection

###### Content Search Configuration

A Content View Connector defines the who, what and how of search. A better term may be "Data Set" because the data you search and find is based on the configuration of the Content View Connection. More info

**ElasticSearch Specific Parameters**

* **Default Query**: (3.1.1+) This is field allows you to add a query, which will become a [Wrapper Query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-wrapper-query.html){:target="_blank"}, that will be added to all other search parameters made against this connection. For example, if you wish to only ever see content created between specific dates you would use the following:

```text
{
"range": {
"simflofy_created": {
"gte": "2018-12-22T10:39:00",
"lte": "2021-12-26T10:39:00"
}
}
}
```

Note that the usual `{"query":{}}` wrapper is not present. Including it will cause an error on search.

* **elastic_q**: This parameter, added by clicking **Add Custom Parameter**, allows a user to pass in a JSON formatted query to the elastic search server. When using this query method you must replace double quotes with single quote characters.
Here is an example query:

`{'bool':{'must':[{'match':{'document_type':'accounting'}},{'match':{'account_type':''}}]}}`
Run your query (with proper double quotes) directly against your elastic index using a rest call to test before adding it to configuration.

Response Buffer Size:

Memory (in bytes) used to process responses from ElasticSearch. This memory is allocated per search, so use caution when raising it. Default value is 150MB, minimum is 25MB, maximum is 250MB.

**Search Configuration**

Legacy Fields: All other fields in this tab are legacy features used for the Solr Search Connection and will be removed in future releases.

* **Collection**: The name of the collection to query against. Elasticsearch refers to these and "Indexes", but for our purposes they are collections.
* **Sort Field/Order**: Will contain the values in your field list. Allows you to choose which field to sort on and whether to sort ascending or descending.
* **Facet Fields**: Facet fields are simply occurrence counts for the entered fields. Content type counting is the most common example. Facet fields are required for a number of sidebar widgets.
* **Field List**: The field values to return in a result set. Similar to the **SELECT** Field1, Field2 clause in SQL.
* **Result Link**: Used on the Discovery UI to determine what to do when a user clicks on the link to the document.
* **Facet Limit**: Maximum number of facet values to return.
* **Highlight:Yes** if you want contextual highlighting, **No** otherwise.
* **Highlighted Fields**: Comma delimited list of fields for highlighting (i.e. content).
* **Highlight Field Length**: The maximum number of characters to highlight.
* **External Links**: Setup external links for the search results. The widget is not

**Search Security**

Only one of these options may be selected at a time

* **Filter**: The authenticated user's group id is added to each search request. Used in tandem with the User group index task to only allow specified ids to search indexed content
* **Restrict**: The restricted users or groups cannot use this connector. Views that use it will not be visible to them, and they will not be able to use it through the Search APIs

###### Indexing Content into Elasticsearch for Federation

> **Note**: PREREQUISITES AND THE FEDERATION WIZARD
These steps can be performed automatically by using the Federation Wizard, but will still require job configuration. If you use the wizard, skip steps 1 and 2.

For indexing content you will need:

* A working Authentication Connection for your source system
* An Integration Connection for your source system
* A Content Service Connection for your source system
* A working Authentication Connection for Elasticsearch
* An Integration Connection for Elasticsearch

1. Create a job using your two connections
2. In the **Details** tab Set the source repository's content service connection directly below the job name.
3. In the **Details** tab make sure the start and end times are set to a wide enough range to capture all the data you wish to index
4. In the **Tasks** tab, select the Tika Extractor Task.
5. This task will extract the content from a file and set it as a field on the document for indexing
6. In the **Mappings** tab, select "Basic Elasticsearch Mapping" from the Additional Mappings drop-down
  If this is not present, simply add the field you set on the task in step 2 as a field mapping.
    The default is *content* so the mapping would be `content ----Field Mapping----> content`
  **(optional)** Add any additional mappings. The target fields will be created and mapped dynamically as part of the migration
7. In the Output Specification, select your id attribute (or leave it as the default) and pick what collection to index to.
8. **(optional)** If you wish to enable highlighting and your extracted content is not in the "content" field, place the name of your content field from your Tika task in Term Vector field.
9. **(optional)** If you wish to use the More Like This (MLT) to search on custom fields, add them to the Term Vector field.

**Viewing Indexed Content**

1. Create a Search Connection for Elasticsearch if you have not already. Use the authentication connection you used for indexing
2. Using the configuration section above, pick the fields you wish to see and get counts for.
  You can add the basic Federation Services metadata by clicking **Add All Default Fields**
3. Under the Federation Menu > Content Views, Create A New Content View.

###### Content Service Connector

This section covers the specific configuration of the Content Service Connector.

**Supported Method**:

* Create File
* Create Folder
* Delete Object By Id
* Get File Content
* Get Id By Path
* Get Object Properties
* Get Types
* List Folder Items
* List Versions
* Update File

##### MongoDB

Can be used as a content search connector for Manage in Place

MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

> **Note**: This page is only meant to cover using MongoDB without [GridFS](#mongodb-gridfs). The common use case for MongoDB without GridFS is to act as an indexing engine, like [Elasticsearch](#elasticsearch)

###### Authentication Connection

Authentication Configuration Fields:

* **Name**: Unique name for this auth connector.
* **Username**: The Username of the user to authenticate with to the Mongo DB Instance.
* **Password**: The password associated with the above username.
* **Mongo URI**: The Full mongodb connection URI to connect to. See this document for additional info on URI construction.
* **Database**: The database to authorise to.
* **Use MongoDB GridFS Services**: Using MongoDB GridFS Services. Leave unchecked for regular MongoDB

MONGO URI
Federation Services inserts the username and password into the connection string. In order to include them as part of the uri we use `[[USER]]:[[PASS]]`

###### Discovery Connector

Discovery Instance Configuration Fields:

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery
* **Database**: The name of the Mongo database to read data from.
* **Server And Port**: The port used to connect to your Mongo database.

###### Integration Connection

Integration Connection Fields:

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.

###### Job Configuration

Output Specification:

* **Collection**: The name of the collection to create/write to. Federation Services will handle the "files" and "chunks" collections internally
* **Insert Federation Services Metadata**: Required for Federation. Write Federation Services metadata onto objects. Automatically included if GridFS is enabled in auth connection.
* **Use bulk write operations (MongoDB only)**: Federation Services will use bulk write operations for better performance.
* **Number of documents to write per bulk operations**: Number of documents to send per bulk write
* **Include Un-Mapped Properties**: Add all metadata on the document

Advanced Options:

* **Drop and Build Indexes**: [Indexes](https://www.mongodb.com/docs/manual/indexes/){:target="_blank"} are created to speed up searches. This will rebuild them entirely. This can be a lengthy process and should only ever be performed on the initial run
* **Index Keys**: A comma delimited list of field keys to index. For multiple collections use key1:collection1,key2:collection2.
* **Upsert Key**: 'Upserting' is simply means "Update if exists". This key will be checked to see if the document already exists. Leave blank to use Federation Services source repository key. If not set and Insert Federation Services Metadata is not checked, then only creates will be called.
* **MongoDB Write Concern**: [Write concern](https://www.mongodb.com/docs/manual/reference/write-concern/){:target="_blank"} describes the level of acknowledgement requested from MongoDB for write operations
* **File Store Connector ID**: Connector ID of Content Service Connector to use as the File Store. Or leave blank to use native GridFS. This field is only used if MongoDB GridFS is Enabled in the Authentication Connector.

Mango Repository:

* **Comma delimited list of collections to crawl**: As the name says.
* **Select what field will act as the source id for the document**: The field which will appears as the "source_repository_id" field in the output document
* **Query**: A Mongo [Query](https://www.mongodb.com/docs/v4.2/tutorial/query-documents/){:target="_blank"}. If left blank the query will be "{}", or "get all"

###### Content Service Connection

This mode of connector does not interact with content stored in MongoDB. Use the GridFS mode.

###### Content Search Connection

**Default Query**: (3.1.1+) This field allows you to add a default mongodb query to all incoming queries. The query in this box will be wrapped in an $and clause with all other search parameters.

**Get all versions and display versions on file name**: Only used in GridFS Mode

###### Indexing Document Level Permissions

Federation Services content views offer a number of security layers. Using the JavaScript processor permissions can be added to each document, which can restrict widget usage and the ability to search for the document.

**Repository Document ACLS**

Each document, whether it has source permissions or not, will have an Allow and Deny ACL (Access Control List). Both lists exist as a list of strings (String []) on the document, and can be access through JavaScript. In order to apply document level permissions to documents, permissions will need to take the form

`action=principal1,principal2,principal3`

Where action can be `Search`, or the id of a Widget Definition The principals are Federation Services user logins, or User Group names.

LIMITATIONS
Only the `Search` permission is checked at the API level. Meaning, that a user can still access documents directly through the Content Services API. These permissions simply alter content views to prevent them from performing these actions via Widgets.

```text
{
"allow": true,
"action": "Search",
"principals": [
"everyone"
]
}
```

Here is an example of some JavaScript that will prevent users in `group1` from downloading documents through Discovery. It will also stop `user1` from searching for the document.

```text
var deny = ['DownloadWidget=group1', 'Search=user1'];
rd.setDenyAcl(deny);
```

##### MongoDB GridFS

Can be used as a content search connector for Manage in Place

> **Note**: In Federation Services, the GridFS is just a mode of the MongoDB connector.

GridFS is the MongoDB specification for storing and retrieving large files such as images, audio files, video files, etc. It is kind of a file system to store files but its data is stored within MongoDB collections. GridFS has the capability to store files even greater than its document size limit of 16MB.

GridFS divides a file into chunks and stores each chunk of data in a separate document, each of maximum size 255k.

GridFS by default uses two collections, [collection].files and [collection].chunks to store the file's metadata and the chunks. Each chunk is identified by its unique _id ObjectId field. The [collection].files serves as a parent document. The files _id field in the [collection].chunks document links the chunk to its parent.

[More info on MongoDB GridFS](https://www.mongodb.com/docs/manual/core/gridfs/){:target="_blank"}

###### GridFS Authentication Connection

* **Name**: The name of your auth connector.
* **Username**: The username of the MongoDB admin user you want to authenticate as.
* **Password**: The password of the MongoDB admin user you want to authenticate as.
* **Mongo URI**: The URI to your MongoDB. For example:mongodb://localhost:27017 will connect to a Mongo database hosted locally (relative to Federation Services), with the port 27017.
* **Database**: The name of the database that you want to authenticate against.
* **Use MongoDB GridFS Services?**: Required for binary storage. This checkbox enables GridFS services

MONGO URI
Federation Services inserts the username and password into the connection string. In order to include them as part of the uri we use `[[USER]]:[[PASS]]`.

###### Integration Connection

The Federation Services MongoDB Connector allows organisations to read/write from/toa Mongo Database using GridFS. This means that using Federation Services and your MongoDB Instance of choice, you can connect to, retrieve data, and content from these instances.

###### Job Configuration

Output Specification:

* **Collection**: The name of the collection to create/write to. Federation Services will handle the "files" and "chunks" collections internally
* **Insert Federation Services Metadata**: Required for Federation. Write Federation Services metadata onto objects. Automatically included if GridFS is enabled in auth connection.
* **Use bulk write operations (MongoDB only)**: Ignore for GridFS
* **Number of documents to write per bulk operations**: Ignore for GridFS
* **Include Un-Mapped Properties**: Add all metadata on the document to the metadata object in [collections].files

Advanced Options:

* **Drop and Build Indexes**: Indexes are created to speed up searches. This will rebuild them entirely. Should always be checked for the first run for Federation, so you can include a text index for full text search.
* **Index Keys**: A comma delimited list of field keys to index. For multiple collections use key1:collection1,key2: collection2.
* **Test Index Keys**: Text index keys for full-text searching (comma delimited). Full text search will fail if this is not defined. For multiple collections use key1:collection1,key2:collection2.
* **Upsert Key**: 'Upserting' is simply means "Update if exists". This key will be checked to see if the document already exists. Leave blank to use Federation Services source repository key. If not set and Insert Federation Services Metadata is not checked, then only creates will be called.
* **MongoDB Write Concern**: Write concern describes the level of acknowledgement requested from MongoDB for write operations
* **File Store Connector ID**: Connector ID of Content Service Connector to use as the File Store. Or leave blank to use native GridFS. This field is only used if MongoDB GridFS is Enabled in the Authentication Connector.

Repository Configuration:

* **Comma delimited list of collections to crawl**: Do not append ".files" or ".chunks".
* **Select what field will act as the source id for the document**: The field which will appears as the " source_repository_id" field in the output document
* **Query**: A Mongo [Query](https://www.mongodb.com/docs/v4.2/tutorial/query-documents/){:target="_blank"}. If left blank the query will be "{}", or "get all"

###### Content Service Connection

Source repository for GridFS are a compound ID take the form of:

`[collection]:[mongodbId]:[version]`

As an example

`demo:61684139dc5eb835dbf0a0c2:1`

* **Insert Federation Services Metadata**: Uses Federation Services specific metadata with objects. File Store Connector ID is only used if this is enabled. Check-in and check-out functionality is only used if this is enabled.
* **GridFS Bucket for file uploads**: Name of a single collection
* **File Store Connector ID**: Connector ID of Content Service Connector to use as the File Store. Or leave blank to use native GridFS. This field is only used if MongoDB GridFS is Enabled in the Authentication Connector.
* **File Store Root Folder ID**: If using a File Store, this value is required. This field is only used if MongoDB GridFS is Enabled in the Authentication Connector.

Supported Methods:

* Check In *
* Check Out *
* Create File *
* Create Folder (id = bucket name to create)
* Delete Folder (id = bucket name to delete)
* Delete Object By ID
* Get File Content
* Get Version Content
* Get Object Properties
* Get Version Properties
* List Versions
* Update File Content
* Update File Properties
* Get Object ID By Path (**folderPath** will be the bucket in this case)

###### Content Search Connection

**Default Query**: (3.1.1+) This field allows you to add a default mongodb query to all incoming queries. The query in this box will be wrapped in an $and clause with all other search parameters. Adding the "metadata" prefix is required for all fields, except the following

* length
* filename
* chunkSize
* uploadDate
* md5

To add a default query which filters out all `.txt` documents:

```text
{
"metadata.simflofy_content_type": {
"$not": {
"$eq": "text/plain"
}
}
}
```

**Get all versions and display versions on file name**: As the name says, search will now retrieve all versions of documents and label them

##### Alfresco

Can be used as an output connector for Manage in Place

The Alfresco connector only operates in write mode. For read operations from Alfresco, use the CMIS connector.

BATCH API REQUIRED
This connector was built to work in tandem with the Federation Servicestion Services Batch API to offer a more performant migration.

If you're planning to use the Transparent Content Services for Manage In Place, this API is already included in that module. However, it can be installed separately for standard migrations.

###### Alfresco Authentication

**Alfresco Webscript Auth Connector**
This connector uses basic authentication to retrieve a ticket from Alfresco. That ticket will be used to perform operations. The authenticating user will need the rights to access the folder you're attempting to write to.

* **Name**: The name of the authentication connection
* **Username**: Name of the authenticating user
* **Password**: Password of the authenticating user
* **Service URL**: URL to contact Alfresco. Takes the form `(Alfresco)/alfresco/service`

###### Discovery Connector

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: The authentication connection you want to search for
* **Ignore Types** (comma delimited list): Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you will enter(.)workflow(.) into the ignore types text box.
* **Alfresco Ticket Key**: The ticket key is used to generate credentials.

###### Integration Connection

**Batching**

The Alfresco Connector requires batching, meaning it will batch up documents before attempting to upload them. Batch size is set under the **Advanced Options** under the **Details** job tab. When using a connector that requires batching, the value will be automatically set to 50.

When batching is on, batch ids will be generated based on the job run id, which is the job id plus the timestamp of the current run. The batch number will then be added to that. Batch IDs will be prepended to parent folders of each document in a batch leading to the following:

`/1612814334091_1624028461422_1/parentFolder/myfile.txt`

**Configuration**

* Connection Name: Name the Connector
* Description: Add a description for the connector
* Authentication Connection: Alfresco Auth connector
* Secondary Auth Connection: For Alfresco, the secondary authentication will route the file content to different stores. Available Options are:
  * Amazon S3: Requires Alfresco instance with the Amazon S3 Module
  * Azure Blob: Requires Alfresco instance with the Azure Blob Connector
  * None: Binaries will be output to the filesystem if Include Binaries in the Details tab is checked.

###### Job Configuration

* **Alfresco Path**: The output folder path in your alfresco repository.
* **Binary Output Path**: Binary Output Path for Azure or S3. If populated and no Secondary Auth Connection is present, will output to the filesystem.
* **Create Content URL Always**: Only used for Manage In Place (MIP). Federation Services will generate an Alfresco Content Url based on a number of configuration:

Be aware that these are checked in order

* If the content service connector is set in the **Details** tab the content url will be `connectorId://documentId`
* If the document has the metadata field **simflofy.contenturl**. It will be checked for validity and used.
* If the secondary auth connection is for Amazon S3 the content url will be `s3v2://documentId`
* If the secondary auth connection is for Azure Blob the content url will be `azb://documentId`
* If none of these are true, the content url will be `store://documentId`

**Advanced Settings**

* **Included Un-Mapped properties**: Add all properties from the source to the target metadata. If unchecked, only mapped properties will be added
* **Do not convert metadata keys to lowercase**: Federation Services converts all type and field values to lowercase by default. If this is checked all fields will keep their original case
* **Debug mode**: Each document's metadata will be output as json file to a specified location
* **Debug Path**: Appears when debug mode is active. A path on the filesystem where the debug JSONs will go.
* **Alternative Thread Count**: If using a secondary auth connections, this will control the number of worker threads. Should never be set to 0, or the job will fail
* **Multi-Value Separator**: Multi-value fields will be combined into a list using this separator
* **Replace Existing Content**: If a document already exists at the output location, it will be overwritten
* **Use File Hash**: If checked, the file keys for documents will be an SHA Hash of their parent path + file name + modified date plus the extension '.sim'
* **Process ACLS**: Requires the use of the ACL Mapper or ACL Conversion Task.
  * Will transform the product of these tasks into Alfresco's format for processing
* **Inherit ACLS**: If processing ACLs, the parent folder's permissions will be merged into the list of acls.
* **Include Aspects with no Field Mappings**: Mapped aspects will be applied even if none of the aspect's fields are present
* **Aspect Remove Field Mapping**: Takes a JSON string. Remove aspects if the listed fields are not present. The example of the UI:

`{"myaspect:two":["field1","field2"],"myaspect:one":["field1","field2"]}`
Meaning that if field 1 or field 2 is not present, do not add the aspects.

* **Date Format**: Date field mappings will be formatted this way.
* **Date Time Format**: Date/Time field mappings will be formatted this way.

##### Google Drive and Gmail

Index files and emails from Google Drive and Gmail

> **Tip**: Google Drive folders usually display the ID in the url while looking at them in the browser. The root folder ("My Drive") does not show its ID, however. In order to retrieve it, you will need to create a Content Service Connection and use it to retrieve the id using the following url in your browser. If the root folder id it set on the content service connection, that folder's information will be returned. If blank, the My Drive folder's information will be returned.
`3sixty-admin/api/repo/{googleConnectorId}/rootfolderid`

###### Authentication Connection

There are currently two ways to connect to Google Drive. OAuth and Java Web Token. Both require creating a project and enabling the Google Drive API for that project.

###### Enabling Google APIS

Navigate to [Google Cloud Console](https://console.cloud.google.com/){:target="_blank"} and sign in with your organisational Google account.

Type in the name of your project such as "Federation Services". Then click Create

**Enabling APIs**

Go to the following link and click select for your project from the drop-down, then click Continue.

Next, click on libraries. Then select APIs.

In the next screen, search for "Google Drive" and click "Google Drive API" from the search results.

Then, click Enable.

###### Google Drive OAuth Connector

Use this method if you wish to authenticate as a specific user to access files and folders.

  1. Navigate to the [Google Cloud Console](https://console.cloud.google.com/){:target="_blank"}and sign in with your organisational Google account,
  2. Select your project from the list.
  3. Click APIs and Services in the sidebar.

You will now need to create an OAuth Consent Screen that will display when users attempt to authenticate using the app:

**Setting up the OAuth Consent Screen**

1. Click OAuth consent screen in the sidebar
2. Set user type to External
3. Set your app name. It can be whatever you wish unless...
  1. If you intend to use the Google Vision Text Extractor name the application **Federation Services-VisionTextExtractor/1.0** as that will affect the outcome of the vision tasks (Though those will only work if your project has a linked billing account and billing enabled).
4. Set the support email as the one you used to log in
5. At the bottom, fill in the support email address.
  1. The support email will be the email the user is directed to when they're directed to authorise Federation Services to transfer data.
6. Click **Save and Continue**
7. Set up scopes:

Click **Add Scope** and check

`.../auth/drive`

**Creating OAuth Credentials**

1. Return to the [APIs and Services Dashboard](https://console.cloud.google.com/apis/dashboard){:target="_blank"}
2. Click **Credentials**
3. Click **Create Credentials**
4. Click OAuth Client Id
5. On the next screen, select **Web Application**
6. Give the credentials a name
7. Under **Authorised Redirect URIs**, add the following

`http://{SIMFLOFY_SERVER}/3sixty-admin/authconn/oauthcb`

Example. If you're running Federation Services on a local machine

`http://localhost:8080/3sixty-admin/authconn/oauthcb`

**Important:** For Manage In Place the domain server has to be public server since Google Drive only supports public server or localhost
**Tip:** 127.0.0.1 will not work, but **localhost** will

8. Click **Create**
9. Your new credentials will appear under **OAuth 2.0 Client IDs**. Click the Download button on the right and retrieve the Client ID and Client Secret from the downloaded json file.

**Creating your connector in Federation Services**

1. Go to Connections > Authentication
2. Click **Create New Authentication Connection**
3. Select **Google OAuth Connector**
4. Fill in your client id and secret, then click **Authenticate**
5. You will be taken to the OAuth Consent Screen you set up earlier, click **Allow**
6. You will be returned to Federation Services, click **Save**

**Completed Checklist**

Ensure that you have all the following with your Google project:
* A Google Drive API listed in your dashboard under APIs and Services
* If using Vision Tasks: A Cloud Vision API listed in your dashboard under APIs and Services
* A Web Application OAuth 2.0 Client, listed under Credentials of your project.
  * This should have an authorised redirect URI with the following format: **{SIMFLOFY_SERVER}/3sixty-admin/authconn/oauthcb**
* A filled out OAuth consent form page with:
  * The ApplicationName " **3Sixty-VisionTextExtractor/1.0**" if using Vision Tasks
  * A support email to be used on the consent screen
  * The email, profile, openid, `../auth/drive`
    * If using Vision Tasks `../auth/cloud-vision`, `../auth/cloud-platform`
* In Federation Services, a Google OAuth Connector using the secret key and ID from your credentials you created, and the token fields are now populated.

https://developers.google.com/identity/protocols/oauth2#expiration

Our app is in testing status, thus refresh token expires in 7 days and need to re-authenticate again!

Production status apps will not have refresh token expiry!

https://stackoverflow.com/questions/71777420/i-want-to-use-google-api-refresh-tokens-forever

###### Google Drive JWT Connector

Use this method if you wish to create a service user to interact with the data.

**Creating The Service Account**

1. Go to the [APIs and Services Dashboard](https://console.cloud.google.com/apis/dashboard){:target="_blank"}
2. Click **Credentials**
3. Click Create Credentials
4. Select Service Account
5. You will be asked you to assign roles to the account. Since we need wide-ranging access for now, we should choose Owner. This can be changed later.
6. The final screen invites other users to access this service account through their own service account portals. Use as needed for your organization.
7. Click **DONE**. You will be taken back to the service account list for the project.
**Tip:** Make note of the email address of this user. Any folders or Shared Drives you wish to migrate will need to be shared with this user.
8. Click on the three dots under Actions, then click **Manage Keys**
9. Click **ADD KEY **then **Create New Key**, then select **JSON**
10. Click **Create**. You will download a json file to be used in the next step.

###### Creating your JWT Auth Connector in Federation Services

1. Go to Connections > Authentication
2. Create a **Google JWT Auth Connector**
3. Paste the content of that json file into the text box.
4. Click **Save**.

###### Discovery Connector

* **Authentication Connection**: The Google Drive authentication connection you want to use.
* **Folder ID**: The ID of the folder you wish to crawl.
* **Shared Drive ID**: If this is a shared drive, put the ID here.

###### Integration Connection

This is used to store and write content alongside its metadata to Google Drive.

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Your Google Drive Auth Connection

###### Job Configuration

**Query (Repo)**

* **Query**: A query written using [Google Drive's query language](https://developers.google.com/drive/api/v3/ref-search-terms){:target="_blank"}
  * Not compatible with Folder ID list
* **Crawl Queried Folders**: If a queried object is a folder, crawl it.
* **Folder / File Id's**: A comma delimited list of IDs to retrieve or crawl
  * Completely overrides query
* **This is a Shared Drive**: Check if this is a shared drive in a Google Workspace
* **The id of the shared drive**: Required to crawl the drive. Can be found in the URL at the root of the drive
* **Process Folders**: Add folders to the document queue for processing
* **Get Versions**: Will retrieve available revisions. Note that Google Drive does not keep all revisions of a document. Get versions only works for documents created in Google drive. It will not work for documents uploaded to Google Drive.
* **Get Permissions**: Will retrieve permissions for each object, where available.

**Output Specification**

* **Output Folder ID**: ID of the target folder, can be retrieved through the Google Drive UI
* **Include Un-Mapped Properties**: If selected, all available properties will be added output file. Otherwise, only mapped properties will be included.
* **This is a Shared Drive**: Check if this is a shared drive in a Google Workspace
* **The id of the shared drive**: Required to crawl the drive. Can be found in the URL at the root of the drive
* **Do not update property values if file already exists**: Since there is only one set of metadata per document (not per revision), this will allow you to skip mappings if the document already exists
* **Process permissions**: Will take the ACL list of the document and attempt to apply these permissions in Google Drive.
* **Notify users via email when they are added to a file**: If a permission is successfully added, an email will be sent to the user.

Already supported ones from before: google docs, slide, spreadsheet, drawing

Not exportable: google form, google map

Added new ones which have export link/format available: 

google jamboard - pdf

google script - json

google site - txt

However, these new ones don't seem to support revisions so we can't get the revisions when getVersion is checked!

**Tip:** If a document of the same name exists within a parent folder, the connector will attempt to create a new revision of the document, instead of uploading a new one. These revisions have the `keepRevisionForever` flag set to `true`, meaning Google Drive will not delete them automatically, as it does with most revisions. A document can have a maximum of 200 revisions.

###### Run and Monitor Jobs

When you run a job with Google Drive as the source repository:

These content types will be transferred as is: google docs, slide, spreadsheet, drawing

These content types will be skipped and not transferred: google form, google map

These content types will be converted to the corresponding types and will not be supported by getVersions:

* google jamboard - pdf
* google script - json
* google site - txt

###### Permissions

If the permission list is set on a document by the repository connection, Drive will attempt to set these permissions. It expects these permissions in the form `principal=permissions`. The principal must be an email address, and the allowed values for permissions are as follows:

Available for files:

* owner
* writer
* commenter
* reader

To manipulate this list, use a JavaScript task. For more information on the ACL document field and the JavaScript task.

Here is an example of mapping permissions from Box to Google Drive

```java
if (rd.getACL() != null) {  
var newAcl = [];  
for (var i in rd.getACL()) {  
var acl = rd.getACL()[i];  
var split = acl.split('=');  
var nRole = ''  
if (split[0] != 'AutomationUser_AAAAAAAAAA@boxdevedition.com') {//This is the service user for Box, so we'll skip it  
if (split[1] === 'editor') {  
nRole = 'writer';  
} else if (split[1] === 'owner') {  
nRole = 'owner';  
} else if (split[1] === 'previewer') {  
nRole = 'reader';  
} else if (split[1] === 'uploader') {  
nRole = 'writer';  
} else if (split[1] === 'previewer uploader') {  
nRole = 'reader';  
} else if (split[1] === 'viewer uploader') {  
nRole = 'reader';  
} else if (split[1] === 'co_owner') {  
nRole = 'writer';  
} else {  
nRole = 'reader';  
}  
newAcl.push(split[0] + '=' + nRole);  
}  
}  
rd.setACL(newAcl);  
}
```

###### Content Services Connector

**Connection Configuration**
**Root Folder ID:** The root folder you wish to use for uploads using the connection

**Supported Methods**

* Create File
* Create Folder
* Update File
* Update Properties
* Get File Content
* Get File Item
* Get Content
* Get Types
* Get Properties
* Get Root Folder ID
* List Folder Items
* Delete File
* Delete Folder
* Get ACL - User email addresses only
* Edit ACL - User email addresses only
* Delete ACL - Use GET to retrieve permission id for aclId parameter
* Check In
* Check Out
* Create Version
* Delete Version
* Get Version Properties
* Get Version Content
* List Versions
* Revert Version

###### Interacting with Shared Drives (3.1.2+)

**Tip:** These cases assume that you are working with a Google Workspace and the credentials you supply are allowed to view / access Shared Drive information.

**Get a Shared Drive Id**

The idbypath endpoint can be used to retrieve the id of a Shared Drive in a Google Workspace. In order to do this the folderPath argument should be the name of the Shared Drive. Additionally, the argument isDrive should be included with the call with a value of true.

**Shared Drive Permissions**

Passing a shared drive id to the **Get ACL** method should produce a list of Shared Drive Members with their respective roles.

**JWT Connector**

If using a JWT of service account, the service account email needs to be added as a member of Shared drive and be given Manager role.

##### Microsoft Graph

This includes OneDrive, SharePoint, Outlook, and Teams

Microsoft Graph is the API for Microsoft 365. Connect to Office, Windows 10, and Enterprise Mobility + Security to empower creativity and collaboration. Federation Services has 3 Microsoft Graph based connectors which all use the same authentication connection. Their features implementations vary based on systems. For specifics of each implementation, see the following:

* [MS Graph SharePoint](#microsoft-graph-sharepoint)
* [MS Graph Teams](#microsoft-graph-teams)
* [MS Graph OneDrive](#microsoft-graph-onedrive)
* [MS Graph Mail](#microsoft-email-exchange)

###### Connector Capability Support

| Connector | Read | Write | Discovery | Content Services |
| MS Graph SharePoint | Yes | Yes | Yes | Yes |
| MS Graph Teams | Yes | No | No | Yes |
| MS Graph One Drive | Yes | No | No | Yes |
| MS Graph Mail	| Yes | No | No | No |

###### Authentication Connection

Federation Services Uses the Microsoft Identity Platform to communicate via the Graph API. You will need to register the Federation Services application with Azure active directory: [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app){:target="_blank"}

Set up your application for access: [Auth v2 Service - Authentication and Authorisation Steps](https://learn.microsoft.com/en-us/graph/auth-v2-service?tabs=http#authentication-and-authorization-steps){:target="_blank"}

And finally grant Application Permissions via the [App registration](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade){:target="_blank"}. Delegated permissions will not work.

Once you have set up your App in Azure, you can now configure your Federation Services auth connector for Graph.

The Tenant, Client ID, and Client Secret, are all provided to you during your App registration from above.

* **Tenant**: The directory tenant the application plans to operate against, in GUID or domain-name format.
* **Client ID**: The directory tenant the application plans to operate against, in GUID or domain-name format.
* **Client Secret**: The directory tenant the application plans to operate against, in GUID or domain-name format.

##### Microsoft Graph SharePoint

###### Authentification Connection

> **Tip**: Tip:  Its recommended that OAuth be used for Migration only. And Client / Secret Auth be used for Content Service

This connector requires a standard [Microsoft Graph](#microsoft-graph) Authentication Connection.

The application will require the following permissions:

* **Repository**: Sites.Read.All
* **Output**" Sites.Manage.All

###### Discovery Connector

Discovery Connection Configuration

* **Tenant Name**: The name of the tenant. All O365 SharePoint instances use the structure [tenant].sharepoint.com. We use this to construct urls and gather siteIds.
* **Sites to Crawl**: The base sites to crawl. Root will crawl your Team site
* **Crawl Subsites**: If the site has any subsites, crawl them as well. For example, if you leave the list above as root, but there is a subsite ([tenant].sharepoint.com/mySite), it will not be crawled unless this box is checked.

###### Integration Connector

RUNNING ERRORS
As of the 3.1.1 release, MSGraph connectors cannot rerun errored documents. We are aware of the issue, and it will be addressed in the next release.

WARNING
The Microsoft Graph APIs throttle connections that make what it considers excessive api calls. They have not shared these metrics, and they are determined dynamically based on previous usage and presumably account type. See [here](https://learn.microsoft.com/en-us/sharepoint/dev/general-development/how-to-avoid-getting-throttled-or-blocked-in-sharepoint-online#why-cant-you-just-tell-me-the-exact-throttling-limits){:target="_blank"} for more details.

Due to how SharePoint handles metadata, the document and its metadata will be uploaded separately.

Documents with Metadata: This process is done by batching the document with its metadata, with the metadata write contingent on the success of the upload. In this case a document is complete if both the metadata and document successfully upload. If either fails due to a 429 (throttling) response, the missing piece will be attempted a number of times after waiting.

Documents without Metadata: If a document has no metadata (no mappings), a non- batch upload will be performed. The same retry logic will take place but only for the file content.

Recommended Settings to avoid Throttling: Details Tab Advanced Options Max Queue Size = 500 Output Threads = 5 Output Specification Number of retries = 10

###### Job Configuration

Configuration

* **Site List**: Comma delimited list of tenants sites to crawl for content types. Use 'root' for main site.
* **Library List**: Libraries to Crawl. List names do not require their parent sites (ex. 'Documents' not 'sites/Test/Documents')
* **Crawl Subsites**: If the site has any subsites, crawl them as well. For example, if you leave the list above as root, but there is a subsite ([tenant].sharepoint.com/mySite), it will not be crawled unless this box is checked.
* **Process Folders**: Process folders as well as documents.
* **Get Versions**: Retrieve document versions.

CASE SENSITIVITY
Site and Library names are case-sensitive. If the case is wrong, the job will complete successfully, but no documents will be picked up.

**Output Specification**

* **Tenant Name**: The name of the tenant. All O365 SharePoint instances use the structure [tenant].sharepoint.com. We use this to construct urls and gather site IDs.
* **Output Folder Path**: The folder where the files will be stored. Do not include the library root folder in this path. If left blank, documents will be written to the library root (ex. Documents will write directly to the Shared Documents folder)
* **Output Site**: The tenant (sites/mySite) or subsite (/mySite) where the documents will be written. Defaults to root
* **Output List**: The name of the library within the site. Defaults to Documents
* **Check documents for a value to override destination site**: Each document will have its metadata checked for a new subsite or tenant site.
* **Field to check for site override value**: If checking for site overrides, this field will be checked for the new site path. If present, the document will be uploaded to that site. The default is 'site'. If this value is set and no list override is present, the files will upload to 'Documents' on the new site.
* **Check documents for a value to override destination list**: Each document will have its metadata checked for a new list name.
* **Field to check for list override value**: If checking for list overrides, this field will be checked for the new list name. If present, the document will be uploaded to that list. The default is 'list'. This can be combined with a site override.
* **Retry Attempts**: The number of times to try completing a document upload before failing.
* **Roll Back files**: There are instances where a document may be uploaded but its metadata will exceed the allowed number of upload attempts. If this flag is checked, that document will be deleted (and will be noted in the Removed column in the job status screen).
* **Set Permissions**: Set ACLs for documents when available. Expected format is "(email)=writer" or "(email)=reader"

###### Content Service Connector

**Configuration**

* **Tenant Name**: The name of the tenant. All O365 SharePoint instances use the structure [tenant].sharepoint.com. We use this to construct urls and gather site IDs.
* **Site Name**: The path to the target site as it would appear in the SharePoint url.
* **List Name**: The name of the library, as seen on the sites' sidebar.
* **SiteId**: After configuring the connection the first time this can be populated using the REST APIs. See the Root Folder example below.

**Examples**

Document and folder ids will look like this.

01WNAC6ZYYYWDZOWH2DFH3LRHT7MWF5L2R

As SharePoint is actually backed by OneDrive, all the ids are actually OneDrive Ids as well.

**Routing document**

Following are simple examples of routing documents of different file types to different locations within your tenant.

These examples assume you are using the default override field names.

```java
if(rd.getMimeType() === 'application/pdf'){
  rd.addSingleField('site','sites/Simflofy');
  rd.addSingleField('list','Documents');
}
```

```java
if(rd.getMimeType() === 'text/plain'){
  rd.addSingleField('list','Test Lib')
}
```

###### Content Service Examples

Assume the connector ID in these examples will be `graph`

###### Root Folder

`GET /3sixty-admin/api/repo/graph/rootfolderid`

You should receive the following:

```text
{
"success": true,
"results": {
"folderPath": "/Shared Documents",
"additionalInfo": {
"siteId": "simflofy.sharepoint.com,bfc93f6e-6eed-4f27-8aa8-72509a410d3b,a357fae5-24f9-464c-8087-cc1594eed1d4"
},
"folderName": "Shared Documents",
"folderId": "b!bj_Jv-1uJ0-KqHJQmkENO-X6V6P5JExGgIfMFZTu0dSZbZes5ncJT7CQyPGcAqVS"
}
}
```

It should be noted that this is not the common form a folder Id will take. MSGraph treats the root folder of each Library as a drive, so this is actually a Drive ID.

###### Upload a File

`POST /api/repo/graph/file?folderId=01WNAC6Z4BAYBXXIMILVBLXKCZ6K3VVNHJ&fileName=newfile.txt&type=MetaDocument`

Note: The file content needs to be set as part of a multi-part form (EDITING NOTE link testing with postman here)

Note: The folderId can be a path off of the root library. Such as /test.

```text
{
"success": true,
"results": {
"id": "01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7"
}
}
```

###### Get ID By Path

`GET api/repo/graph/idbypath?fileName=newfile.txt&folderPath=/tester`

```text
{
"success": true,
"results": "01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7"
}
```

###### Update File Content

`PUT /api/repo/graph/updateContent?fileId=01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7`

Note: Set the new content as the request body

```text
{
"success": true,
"results": {
"id": "01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7"
}
}
```

###### Get File Properties

`GET /api/repo/graph/properties?id=01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7`

```text
{
"success": true,
"results": {
"Modified": {
"queryName": "Modified",
"value": "2021-09-14T17:29:46Z",
"displayName": "Modified"
},
"LinkFilename": {
"queryName": "LinkFilename",
"value": "newfile.txt",
"displayName": "LinkFilename"
},
"ContentType": {
"queryName": "ContentType",
"value": "MetaDocument",
"displayName": "ContentType"
},
...
}
```

###### Update Files Properties

`PUT /api/repo/graph/updateProperties?fileId=01WNAC6ZYYYWDZOWH2DFH3LRHT7MWF5L2R&3SixtyText=metafield`

Note: Each field will be passed as a separate parameter

```text
{
"success": true,
"results": {
"id": "01WNAC6Z2N7DMHZUXP7FGKZ6HS737U7AGD"
}
}
```

###### Folder Items

`PUT /api/repo/graph/folderitems?id=01WNAC6Z4BAYBXXIMILVBLXKCZ6K3VVNHJ`

```text
{
"success": true,
"results": {
"01WNAC6Z64FFID4E5VJBD354DSN7TZLVGY": {
"ParentId": "01WNAC6Z4BAYBXXIMILVBLXKCZ6K3VVNHJ",
"LastModifiedDateTime": "2021-09-10T15:32:14Z",
"ContentType": "text/plain",
"WebUrl": "https://simflofy.sharepoint.com/sites/Dev/Shared%20Documents/tester/FileB.txt",
"eTag": "\"{3E5029DC-B513-4748-BEF0-726FE795D4D8},1\"",
"Id": "01WNAC6Z64FFID4E5VJBD354DSN7TZLVGY",
"CreatedDateTime": "2021-09-10T15:32:14Z",
"Name": "FileB.txt"
},
"01WNAC6Z2N7DMHZUXP7FGKZ6HS737U7AGD": {
"ParentId": "01WNAC6Z4BAYBXXIMILVBLXKCZ6K3VVNHJ",
"LastModifiedDateTime": "2021-09-13T20:01:27Z",
"ContentType": "text/plain",
"WebUrl": "https://simflofy.sharepoint.com/sites/Dev/Shared%20Documents/tester/newfile.txt",
"eTag": "\"{7CD8F84D-EFD2-4CF9-ACF8-F2FEFF4F80C3},2\"",
"Id": "01WNAC6Z2N7DMHZUXP7FGKZ6HS737U7AGD",
"CreatedDateTime": "2021-09-13T20:01:27Z",
"Name": "newfile.txt"
},
"01WNAC6Z3BPNL7PIMLUBFK57GX23WAMLK7": {
"ParentId": "01WNAC6Z4BAYBXXIMILVBLXKCZ6K3VVNHJ",
"LastModifiedDateTime": "2021-09-09T19:49:55Z",
"ChildCount": "1",
"WebUrl": "https://simflofy.sharepoint.com/sites/Dev/Shared%20Documents/tester/10k",
"eTag": "\"{F7577B61-8BA1-4AA0-AEFC-D7D6EC062D5F},1\"",
"Id": "01WNAC6Z3BPNL7PIMLUBFK57GX23WAMLK7",
"CreatedDateTime": "2021-09-09T19:49:55Z",
"Name": "10k"
}
}
}
```

###### Create Folder

`POST /api/repo/graph/folder?path=/testfolder`

```text
{
"success": true,
"results": {
"id": "01WNAC6Z6RFRXOGYJCYBDIU3TPKQQNDBB6"
}
}
```

###### Delete a file or folder

`DELETE /api/repo/graph/delete?id=01WNAC6Z6RFRXOGYJCYBDIU3TPKQQNDBB6`

```text
{
"success": true
}
```

###### Get Permissions

`GET /api/repo/graph/properties?acls=01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7`

```text
{
"success": true,
"results": [
"Dev Owners:owner",
"Dev Visitors:read",
"Dev Members:write",
"Dev:owner"
]
}
```

Note: Only available acls for SharePoint through MSGraph are read, write, and owner

###### Change Permissions

Requires a JSON as a request body in the following format:

`{"Dev Members":"read"}`

`POST /api/repo/graph/properties?acls=01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7`

```text
{
"success": true,
"results": [
"Dev Owners:owner",
"Dev Visitors:read",
"Dev Members:read",
"Dev:owner"
]
}
```

###### Delete Permissions

`DELETE /api/repo/graph/properties?acls=01WNAC6Z32P4QVKHLA7ZC2SZH7IYTSDON7&aclId=Dev Visitors`

The DELETE endpoint will not return any additional information, but a further call to retrieve the permissions should show the following.

```text
{
"success": true,
"results": [
"Dev Owners:owner",
"Dev Members:read",
"Dev:owner"
]
}
```

###### Get Library Types

Example response and ids are truncated for readability

`GET /api/repo/graph/types`

```text
{
"success": true,
"results": {
....
"Task": "0x0108",
"Invoice": "0x0101006248104F6C684C46B570A09939521E3A",
"Issue": "0x0103",
"MetaFolder": "0x012000AB92FFACCC027F4289957CAC503C4F63",
"Workflow Task": "0x010801",
"Timecard": "0x0100C30DDA8EDB2E434EA22D793D9EE42058",
"Holiday": "0x01009BE2AB5291BF4C1A986910BD278E4F18",
"MetaDocument": "0x0101009BF5E42EF312544B9224A53A7FF98D60…..",
"Schedule": "0x0102007DBDC1392EAF4EBBBF99E41D8922B264",
...
}
}
```

###### Get Type Columns

`GET /api/repo/graph/typeDef?typeId=MetaDocument`

or

`GET /api/repo/graph/typeDef?typeId=0x0101009BF5E42EF312544B9224A53A7FF98D60`

```text
{
"success": true,
"results": {
"siteId": "simflofy.sharepoint.com,bfc93f6e-6eed-4f27-8aa8-72509a410d3b,a357fae5-24f9-464c-8087-cc1594eed1d4",
"parentId": "0x0101009BF5E42EF312544B9224A53A7FF98D60",
"properties": [
{.....},
{
"Display Name": "3SixtyDate",
"Min Value": 0,
"Options": [],
"Max Value": 0,
"Description": "",
"Property Type": "DATETIME",
"Value": "",
"Id": "3SixtyDate",
"Is Required": false,
"Is Read Only": false
},
{
"Display Name": "3SixtyNumber",
"Min Value": 0,
"Options": [],
"Max Value": 0,
"Description": "",
"Property Type": "LONG",
"Value": "",
"Id": "3SixtyNumber",
"Is Required": false,
"Is Read Only": false
},
{
"Display Name": "3SixtyText",
"Min Value": 0,
"Options": [],
"Max Value": 0,
"Description": "",
"Property Type": "TEXT",
"Value": "",
"Id": "3SixtyText",
"Is Required": false,
"Is Read Only": false
}
]
}
}
```

##### Microsoft Graph Teams

> **Important**: Due to the potentially sensitive nature of Teams' content, Microsoft has restricted the usage of APIs that can retrieve chat messages. In order to use these APIs, an additional approval process is required. The form is found [here](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR1ax4zKyZjVBmutzKVo1pVtUQ1VJMlNTNUdJV1FKTzVZSVU4MlMwTTdOTSQlQCN0PWcu){:target="_blank"}. The response will usually take 1 to 2 business days.

> **Important**: In order to retrieve private chat messages, a payment model is required after a certain number of messages. See [this link](https://learn.microsoft.com/en-us/graph/teams-licenses#evaluation-mode-default-requirements){:target="_blank"}. Federation Services uses the Get messages across all chats for user method.

> **Note**: Microsoft Teams file storage for a team is actually just a SharePoint site, with each channel being a folder in the `Documents` library. You can view your teams files in SharePoint by going to https://[tenant].sharepoint.com/sites/[teamName].

###### Authentication Connection

This connector requires a standard [Microsoft Graph](#microsoft-graph) Authentication Connection.

The application will require the following permissions:

* TeamSettings.Read.Group
* Channel.ReadBasic.All
* User.Read.All
* File.Read.Group
* ChannelMessage.Read.All
* Chat.ReadBasic.All

###### Discovery Connector

The Teams connector has some static content types. The Teams Discovery connector does not require authenticating to the service, so you can simply create the schema instance and hit Run. The three types are:

* **Chat Message**: Represents any message sent privately or in a channel
* **Attachment**: Represents a file associated with chat messages
* **Chat Log**: A chat log generated by Federation Services which contains all messages sent in a channel during a time period.

###### Integration Connector

RUNNING ERRORS
As of the 3.1.1 release, MSGraph connectors cannot rerun errored documents. We are aware of the issue, and it will be addressed in the next release.
The Teams connectors has two modes of operation. Public Chats and Private The first mode allows you to export a teams files, but crawling the backing SharePoint site. It also lets you extract messages from the public channels

The second mode allows you to pull the private chats for a user.

###### Job Configuration

* **Team Name**: Required for either mode. The name of the team.
* **What would you like to retrieve?** This will select the mode, and will change available options.

**Team Chats or Files**

* **Channels to migrate**: Tag input to list channels to migrate.

* **Retrieve files associated with the team (will retrieve files for all channels)**: This is essentially identical to migrating the `Documents` library of the team's SharePoint site. These files will appear in their SharePoint folder structure, `sites/<TeamName>/Shared Documents/<Channelname>`
* **Get messages from listed channels from between configured times**: Retrieve chat messages in the form of a single text file. The chat log will be in `/<TeamName>/<Channelname>/ChatLog`
* **Break down each chat message into an individual document**: Instead of a single chat log, each message and its direct replies will become an html document. Attachments will be added to the document as additional binaries, if they are being retrieved.
* **Select a format for chat messages**: If you are breaking down chat messages, this will determine the format. There are two options:
* **Plain Text**: Each message will be a simple text file with no additional formatting. See below for export structure
* **HTML**: Each message and its direct replies will become an html document. Attachments will be added to the document as additional binaries, if they are being retrieved.
* **Only retrieve chats from the listed users. Leave blank to retrieve all messages**: Will filter chat messages based on the sender. Use the same as it would appear in the 'from' line of a message.
* **Retrieve attachments attached to chat logs**: If only retrieving a single chat log the attachments will appear in `/<TeamName>/<ChannelName>/ChatLog/Attachments`. See the export structure below for how they are handled when retrieving individual chats

###### Plain Text Exposure Structure

```text
<ChannelName>/
├─ <MessageId>/
│ ├─ <MessageId>.txt
│ ├─ attachments/
│ │ ├─ attachment.pdf
│ ├─ replies/
│ │ ├─ <ReplyId>/
│ │ │ ├─ attachments/
│ │ │ │ ├─ replyattachment.pdf
│ │ ├─ <ReplyId1>.txt
│ │ ├─ <ReplyId2>.txt
```

**Get Private Chat**

* The display name of user's whose chats to pull: List of user's to pull. Each private chat thread will be output under its own folder.
* Preferred licensing and payment requirement model. The API used to retrieve private messages has limited usage. Usage beyond certain amounts require payment. For testing, stick to the default, but note that you will run out after 500 messages.
* Retrieve attachments attached to chat logs: Will attach documents as additional binaries for each message.

> **Note**: If you wish to process a message via push event, there are some restrictions.

* Private Chats are not available. Attempting to execute the push event against private chats will cause an error.
* The output for an event chat will always be in html format.
* If attachments are included, they will be additional binaries on the document.

###### Content Service Connector

The Content Service Connector for Teams is an extension of the one for [SharePoint](#microsoft-graph-sharepoint). The configuration simply points the connector at the team you wish to manage. Alternatively you can use the SharePoint connector with a site path of `sites/[teamName]` and a list name of `Documents`. Not that Content services cannot update, create or change chat messages at this time.

**Configuration**

* **Tenant Name**: The name of the tenant. All O365 SharePoint instances use the structure [tenant].sharepoint.com. We use this to construct urls and gather site IDs. If you do not know your tenant follow the steps below about retrieving your tenant name.
* **Team Name**: The name of the team you wish to manage with this connector.

###### Retrieving your tenant name

If you do not know your tenant name (it's usually your organisations name), you can retrieve it in teams.

* Go to **Files**
* Click the ellipses `...` next to any file
* Click **Copy Link**
* This will produce a SharePoint url in the format https://[tenant].sharepoint.com

##### Microsoft Graph OneDrive

Microsoft OneDrive is a file hosting service and synchronisation service operated by Microsoft as part of its web version of Office.
Federation Services supports 3 types of OneDrive:

1. Personal Drive
2. Business Drive
3. "SharePoint" Drive - (Document library within a SharePoint site)

###### Authentication Connection

**Standard Authentication Configuration**

Use this authentication connector when accessing a "SharePoint" Drive. For more information see [Microsoft Graph](microsoft-graph.htm) Authentication Connection.

The application will require the following permissions:

* **Repository**: Sites.Read.All

**oAuth Authentication Configuration**

Use this authentication connector when accessing a Personal or Business Drive.
The name of this connector is **Microsoft Graph oAuth Connector**

**Configuration Fields**

* **Service URL**: This should be set to : [https://login.microsoftonline.com](https://login.microsoftonline.com/)
* **Scope**: These are the permissions required to access OneDrive files. Multiple permissions are separated by a space. Default scope: user.read files.readwrite.all
* **Tenant**: The directory tenant the application plans to operate against, in GUID or domain-name format. **Note**: When accessing a personal drive replace the guid with the word "common".
* **Client ID**: The client id of the application.
* **Client Secret**: The client secret for the application.

###### Discovery Connector

Documents retrieved from OneDrive will have the same metadata as those read from [SharePoint](#microsoft-graph-sharepoint).

###### Integration Connection

> **Caution**:As of the 3.1.1 release, MSGraph connectors cannot rerun errored documents. We are aware of the issue, and it will be addressed in the next release.

> **Important**: The Microsoft Graph APIs throttle connections that make what it considers excessive api calls. They have not shared these metrics, and they are determined dynamically based on previous usage and presumably account type. [See this link for more details](https://docs.microsoft.com/en-us/sharepoint/dev/general-development/how-to-avoid-getting-throttled-or-blocked-in-sharepoint-online#why-cant-you-just-tell-me-the-exact-throttling-limits){:target="_blank"}

###### Job Configuration

Works with Business and SharePoint OneDrive. Personal drives not supported at this time.

**Repository Configuration Fields**

* **Site Names**: A list of sites to crawl. **Only applicable if accessing a SharePoint Drive via a standard authenication connection**
* **Query**: A query to run against each drive. For a Business drive, leave blank to retrieve all items in the drive. For a Personal drive you must enter at least one search term.
* **Process Folders**: Process folders as well as documents. **Note: Empty folders will be processed.**
* **Get Versions**: Retrieve document versions.
* **Include Permissions**: Include the folder/document permissions.

###### Content Services Connection

This section covers the OneDrive specific configuration of the Content Service Connector.

The only configuration required for this connector is the OneDrive Authentication Connector.

Works with Personal, Business, and SharePoint OneDrive.

**Supported Methods**

* Create File
* Create Folder
* Check In - Does not work for personal drives.
* Check Out / Cancel Check Out - Does not work for personal drives.
* Delete Folder
* Delete Object By Id
* Get ACLs
* Set ACLs
* Delete ACLs
* Get Root Folder
* Get File Content
* Get Object Id By Path
* Get Object Properties
* List Versions
* List Folder Items
* Update File
* Update Properties

##### Microsoft Email Exchange

The Federation Servicestion Services Exchange Connector allows organisations to read from and move email records from Microsoft Exchange for archiving, integration, indexing etc. Emails may be obtained by crawling Active Directory based on search values (i.e. a* for all users that start with the letter a) and then subsequently crawl Exchange for each email returned by Active Directory. Users may also enter emails in manually to be crawled.

Emails are queried using the date range given by the Federation Services Job allowing only new emails to be processed. Jobs can be run every x minutes/hours or days. Using Federation Services tasks, emails can be included or excluded based on certain metadata fields. Calculated fields may also be used to clean and normalise email metadata fields.

###### Authentication Connection

**Authentication Connection Configuration**

**Connection**

* **Exchange Master Email**: Email address of a user that has access to the email addresses that need to be crawled.
* **Exchange Master Password**: The password of the Exchange Master Email address. (Note: password is encrypted and never displayed in the input form after the Save button is pressed)
* **Exchange Master Domain**: Domain of the Exchange server to authenticate with if different from the email address. This is usually left blank.
* **Exchange URL**: URL of Exchange Web Services to query and retrieve emails from. This can be left blank to auto-detect the best server to use.
* **Exchange Version**: Version of the Exchange Server. For Office 365 use the default value

**LDAP Configuration**

Only fill this is if your Exchange server uses LDAP Authentication

* **LDAP Username**: Username to authenticate with and query LDAP.
* **LDAP Password**: Password for the LDAP Username. (Note: password is encrypted and never displayed in the input form after the Save button is pressed)
* **LDAP Domain**: Domain of the LDAP server.
* **LDAP Base Filter**: The base filter to search for your ldap user. Defaults to (&(&(objectCategory=Person)(objectClass=User)))

##### Discovery Connector

Normally Federation Services Discovery is used to discovery the metadata models of underlying repository. In the case of Microsoft Exchange the Exchange Web Services (EWS) API provides us with the models as things such as Email Message and Calendar Event are static models depending on which version of the EWS you are using.

It is still necessary to run Discovery in order to do Job mappings. You would only need to run Exchange Discovery Once and then use that Discovery for any Exchange Jobs. Using the Exchange Discovery, you can map Email Message fields to the output fields.

**Discovery Instance Configuration Fields**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

The Exchange Integration Connector only support repository mode

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: The Exchange Authentication connection

###### Job Configuration

Job specification includes Job run setting like number of worker threads and batch size, as well as how to query LDAP for email addresses. Job Specification settings are used so different Jobs can use the same Repository Connection Configuration but query and processes emails differently. Click here for details on how to set up an integration job.

**Output Configuration Fields**

* **Batch Size**: How many emails returned by Exchange per request (page size). Default is 50. Depending on network speed, average size of the email body etc. (Note: Exchange allows a max page size of 1000. Anything over 1000 and Exchange will lower 1000).
* **Folder to Start Crawl**: The starting folder of the Crawl. This is typically set to Inbox, however if you want to crawl the entire email account you can set to Root.
* **Cleanse Path**: Check this box to cleanse the email file path. It replaces anything that isn't alphanumeric with an underscore and coverts all letters to lowercase.
* **LDAP Search By**: You can search by LDAP User name or LDAP Email Address.
* **LDAP Search Value**: Value to search on, allows wild card . Example would be if you wanted all Users that start with the letter a then you would enter a
* **LDAP Search Base**: Domain location to query for users (i.e. DC=3Sixty,DC=com) for 3Sixty.com domain. If left blank, the LDAP Domain from the configuration will be used to generate the search base.
* **Email Address List**: Comma delimited list of email addresses to process. If there is a value in this field, it will override the LDAP search and just process the emails in the text box. This is commonly used for testing or if a small set of email addresses need to be processed.
* **Microsoft EWS API max calls**: The maximum amount of API calls to EWS before failing the document being written. Defaults to 5 with a minimum input value of 0. 

> **Info:** If the job, or PII scan, often throws errors, it is recommended to increase the API max calls value to let the job/PII scan run longer.

###### Content Service Connection

The source repository ids for exchange are a compound id in the form of

sourceEmail_SID_exchangeUniqueId

**Supported Methods**

* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Properties
* List Folder items

##### File System

File system connectors give you access to the files on your local workstation or a mounted drive. It requires not authentication connection, but the user running Federation Services must have access to the files you wish to read.

There is no Authentication connection needed for File System connections.

###### Discovery Connector

* Name: Unique Name for the Discovery Connection to identify it in the UI.
* Ignore Types: (Optional) A comma delimited list of types to ignore.
* Properties File Path: location of your properties file

The properties take the format:

`type.field=FieldType`

Here are some examples:

```text
document.name=TEXT
document.description=TEXTAREA
document.createddate=DATETIME
folder.name=TEXT
folder.isversion=CHECKBOX
```

SPACES
If a type has a space in it, replace it with the value \u0020. As an example:
`Historical\u0020Documents.field=CHECKBOX`

Here is a list of available field types

`CHECKBOX,DATETIME,TEXT,TEXTAREA,INTEGER,LONG,DECIMAL,DOUBLE,URI,READONLY,BINARY`

###### Integration Connection

For retrieving content and its associated metadata from the specified filesystem directory. Also designed to write content, and it's associated metadata into a specified filesystem location.The Filesystem Integration Connection gives you easy access that allows you to crawl and output files and folder to a local file system or a mounted network drive (NAS, SAN).

**Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connection

###### Job Configuration

**Paths (Repo)**

Click the green plus sign below the paths to add more than one File Path

Click the red minus sign next to a file path to remove it.

Manage In Place does not support multiple paths for the Filesystem Connector

* **File Path**: The path of a folder to crawl.
* **Convert to URI**: For Windows filesystems, converts backslashes to forward slashes and removes drive identifiers
* **Process Folders**: Folders will be processed as well as files
* **Include Hidden Files**: Hidden files will be processed
* **Include Empty Folders**: Requires **Process Folders** to be checked. Empty folders will be processed

**Output Path**

* **Output Folder Path**: Where to output the processed files and folders

###### Content Service Connection

The methods currently supported for this connector are:

* Delete Folder
* List Folder items
* Create a File
* Get Object Properties
* Create a Folder
* Get File Content
* Get ID by Path
* Update File
* Delete Object By Id
* Get Types
* Get File Item

**Connection Configuration**

* **Root Path**: The location of your folders and files that you want Federation Services to access. Will be prepended to the id on all calls to the connection
* Note: For a content service connection make sure the Root folder in the content service connection is the same as the root folder in the job properties. 

IDS  
Filesystem content services uses the files or folder's path as an ID. The connection will attempt to prepend the configured root folder on all calls.

##### Reporting

Used to gather data on other repositories

There may be a need to identify duplicate documents in your enterprise and Federation Servicestion Services allows you to identify these duplicate documents in a variety of ways.

One way to identify duplicate documents is by using the Duplication Check Job Task which allows you to log, skip or fail documents that are duplicates. This works well for large scale integrations when combining a number of legacy source systems into one new enterprise content management system.

Another way to identify duplicate documents would be by leveraging Federation Services's Reporting Output Connector. Using the reporting output connector you can read content in from any source system Federation Servicestion Services supports and report on the content that is found. One of these reports is a hash of each document seen. Using this hash plus MongoDB's aggregation framework we can generate a CSV or JSON reports of all duplicate records. You can obtain the hash of a document by including the Hash Generator Job Task in your Job Tasks.

After crawling your source system and outputting to the Federation Services Reporting Connector you can now run the following commands against MongoDB. Start my typing mongo in your terminal:

Depending on how many documents you found during the crawl > 100,000, you may need to add docHash index.

`db.tsRecordProcessed.createIndex( { docHash: 1 } )`

Next we group by docHash and output to a new collection named duplicates (You can name the new output collection to anything you like).

`db.tsRecordProcessed.aggregate([{$group:{_id:"$docHash",docs:{$push:"$doc_id"},doc_names:{$push:"$doc_name"}}},{$project:{docs:1,doc_names:1,numDocs:{$size:"$docs"}}},{$match:{numDocs:{$gt:1}}},{$out:"duplicates"}])`

You can now export de-dupes collection to CSV or JSON using mongoexport

```text
mongoexport --db simflofy --collection duplicates --fields _id,docs,doc_names
--username user --password "pass" --type=csv --out duplicates.csv
```

#### Additional Connectors

##### Amazon Glacier

Amazon Glacier is an online file storage web service that provides storage for data archiving and backup.

[More info on Amazon Glacier](https://aws.amazon.com/pm/s3-glacier/){:target="_blank"}

###### Authentication Connection

**Configuration**

* **Name**: Unique name for this auth connector.
* **Client ID**: The Access Key to connect to the client. For more information about AWS Access Keys, please visit this [link](https://docs.aws.amazon.com/AmazonS3/latest/dev/RESTAuthentication.html#RESTAuthenticationExamples){:target="_blank"}.
* **Client Secret**: The Secret key associated with the above Access Key.
* **S3 Region**: The AWS Region where your instance is located, It will be in the AWS console. default is us-east-1
* **Glacier End Point**: Glacier end point where the vault exists. e.g. https://glacier.us-east-1.amazonaws.com

**Proxy Fields**

* **Proxy User**: The proxy user to use. (Optional)
* **Proxy Password**: The password for the proxy user. (leave blank if no proxy)
* **Proxy Protocol**: The HTTP(S) Protocol to use to connect to the proxy.
* **Full Proxy Url**: The Proxy Host (leave blank if no proxy).
* **Proxy Port**: The port to connect to on the proxy. (Optional)
* **Proxy Domain**: The Domain for the proxy.
* **Proxy Workstation**: The workstation to use.

###### Integration Connection

**Configuration**

* **Description**: Description for this connection
* **Authentication Connection**: Your Amazon Glacier Auth connector

###### Job Configuration

If you are using Amazon Glacier as an Output Connection you will need to fill out the following fields when setting up the integration job.

**Output Specifications**

* **Output Folder Path** : Path where archive zip file is created before sending to Glacier.
* **Glacier End Point** : Glacier end point where the vault exists. e.g. https://glacier.us-east-1.amazonaws.com
* **Glacier Vault** : Name of the vault to store archive files.

###### Content Service Connection

This section covers the Glacier specific configuration of the Content Service Connector. For a description of how to set up a content services connector generically see Content Service Connectors.

**Configuration**

This section covers the Glacier specific configuration of the Content Service Connector.

* **End Point**: Glacier end point where the vault exists. e.g. https://glacier.us-east-1.amazonaws.com
* **Vault Name**: Name of the vault to store archive files.

**Supported Methods**

* **Create File** : use vault name as the `folderId` parameter. If `folderId` is left blank, will use vault name in the configuration. Returns archive ID.
* **Get File Content** : use the archive ID as the `fileId` parameter. Optional `fileName` parameter can be used to name the downloaded archive.

Get File Content waits until the archive is available from Amazon. This could take up to many hours depending on the archive policy.

##### Amazon S3

Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface. Amazon S3 uses the same scalable storage infrastructure that Amazon.com uses to run its global e-commerce network.

[More Info on Amazon Web Service](https://aws.amazon.com/s3/){:target="_blank"}

###### Authentication Connection

Authentication connectors are used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Configuration**

* **Name**: Unique name for this auth connector.
* **Client ID**: The Access Key to connect to the client. For more information about AWS Access Keys, [please visit this link](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html){:target="_blank"}.
* **Client Secret**: The Secret key associated with the above Access Key.
* **S3 Region**: The AWS Region where your instance is located, It will be in the AWS console. default is us-east-1
* **End Point**: If using Amazon Glacier, set your instances' url here. It will override the region.
* **Connection Timeout**: Set the connection timeout. Higher values may be needed when moving large files.

> **Tip:** INSTALLED AWS CREDENTIALS  
If you leave the Client ID and Client Secret empty, Federation Services will attempt to authenticate with your installed AWS credentials

**Proxy Information**

This tab is for if you're connecting through a proxy, and is optional.

* **Proxy User**: The proxy user to use. (Optional)
* **Proxy Password**: The password for the proxy user. (leave blank if no proxy)
* **Proxy Protocol**: The HTTP(S) Protocol to use to connect to the proxy.
* **Full Proxy Url**: The Proxy Host (leave blank if no proxy).
* **Proxy Port**: The port to connect to on the proxy. (Optional)
* **Proxy Domain**: The Domain for the proxy.
* **Proxy Workstation**: The workstation to use.

###### Integration Connection

Most Integration Connections can act in both repository (read) and output (write) modes. If it can't, it will not appear as an option when creating or editing a job. This connection can only be used as a repository connection.

**Configuration**

* **Description**: Description for this connection
* **Authentication Connection**: Your Amazon Auth connector

###### Job Configuration

**Folders (Repo)**

Specification Tab: S3 Folders (Repo)

* **List of S3 Keys**: A comma delimited keys of s3 keys (folders) to crawl.
* **Bucket Name**: The bucket where the keys are located
* **Retrieve File Tags**: File tags will be added as metadata with prefix "tag."

**Basic Configuration (Output)**

**Specification Tab: S3 Basic Configuration (Output)**

> **Tip:** There are no actual folders in S3. All files in S3 have a "key", which includes their entire path. The folder path and bucket properties simply prepend these values to each files' keys

* **Output Folder Path**: Output folder key. Will be prepended to all document parent paths to make keys.
* **Bucket Name**: The bucket name that will be prepended to all keys.
* **Includes Unmapped Properties**: Will apply all metadata on the document without mapping
* **Use GZip**: Sets whether gzip decompression should be used when receiving HTTP responses.
* **Do not generate XML when Outputting to S3**: Like the BFS Connector, the S3 Connector outputs metadata as separate files in the for of [filename].metadata.properties.xml. Check this box if you wish for it to only output files.
* **Use Transfer Manager**: If migrating larger files, the S3 APIs offer a transfer manager to ensure more stable uploads
* **Stage Binary to Filesystem**: To avoid issues with disconnects from the source, this will temporarily store file content in the Tomcat temp folder before uploading it.
* **Date/DateTime Format**: How to format the mapped fields of this type before upload.

> **Important:**  If **migrating large** files to S3 it is recommended that you check **Use Transfer Manager AND Stage Binary to Filesystem**. If you use the Transfer Manager without staging the file, all file uploads will be single threaded by the Transfer Manager.

**Advanced Configuration (Output)**

**Specification Tab: S3 Advanced Configuration (Output)**

* **Max Connections**: The maximum number of connections the client can open. Adjusting this can cause changes in performance
* **Multi-value Separator**: Some documents have fields that contain multiple values.S3 does not support this, and will use this separator to form a list of these values as a string before upload.
* **Encrypt Object Server Side**: Will encrypt uploaded files using AES 256 Encryption
* **Disable Chunked Encoding**: Will remove the **transfer-encoding:chunked** header from all requests
* **Set Path Style Access**: Refer to [Amazon's page](https://docs.aws.amazon.com/AmazonS3/latest/userguide/VirtualHosting.html#path-style-access){:target="_blank"} for more information on this option
* **Object Metadata Fields**: A Comma delimited list of fields to add to the S3 Object as User Metadata.

###### Content Service Connection

This section covers the S3 specific configuration of the Content Service Connector.

**Configuration**

This section covers the S3 specific configuration of the Content Service Connector.

> **Tip:** S3 file ids always take the form of /bucket/(key).

* **Bucket Name**: The target bucket for creating a file.
* **Output Folder Path**: The key of the folder to target when creating a file.
* **ACL Name**: [Canned ACL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html#canned-acl){:target="_blank"} to add to all new content uploaded via this connection.
* **Content Disposition**: Default [Disposition](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition){:target="_blank"} of any content added via this connection. Will be added to objects metadata

**Supported Method**

* Create File - Will take full /bucket/key as folderId parameter to bucket and folder configuration
* Delete Object by ID
* Get File Content
* Get Object Properties
* Update File
* Update Properties
* List Folder Items (3.1.1+)
* Get ACLs
* Set ACLs - Special(see below)
* Delete ACL

> **Tip:** S3 ACCESS CONTROL  
See this page for information on grantees and permissions.

###### ACL Examples (3.1.1+)

###### Get Permissions

`GET /api/repo/s3/acls?id=/test-bucket/archive/testdoc.txt`

```text
{
"success": true,
"results": [
"7cfbdbb50b0682227896f2b416777d4d74906ded4df472db3ace75768962c134:(adminuser):FULL_CONTROL"
]
}
```

###### Set Permissions

`POST /api/repo/s3/acls?id=/test-bucket/archive/testdoc.txt`

To add a user to a document, you can use their canonical id or email

Requires a JSON as a request body in the following format:

`{"7cfb11150b0682227896f2b416777d4d74906ded4df472db3ace75769062c134":"READ"}`

or

`{"testuser@gmail.com":"READ"}`

which will result in

```text
{
"success": true,
"results": [
"7cfbdbb50b0682227896f2b416777d4d74906ded4df472db3ace75768962c134:(adminuser):FULL_CONTROL",
"7cfb11150b0682227896f2b416777d4d74906ded4df472db3ace75769062c134:(testuser):READ"
]
}
```

To add a group, you'll need the group's URI, such as:

`{"http://acs.amazonaws.com/groups/s3/LogDelivery":"WRITE"}`

resulting in

```text
{
"success": true,
"results": [
"7cfbdbb50b0682227896f2b416777d4d74906ded4df472db3ace75768962c134:(adminuser):FULL_CONTROL",
"http://acs.amazonaws.com/groups/s3/LogDelivery:(Group):WRITE"
]
}
```

###### Delete Permissions

`DELETE /api/repo/s3/acls?id=/test-bucket/archive/testdoc.txt&aclId=7cfb11150b0682227896f2b416777d4d74906ded4df472db3ace75769062c134`

The aclId parameter can either be the Canonical ID of a user, or the url of the group.

The return will simply be the aclId, but a follow up GET call will produce

```text
{
"success": true,
"results": [
"7cfbdbb50b0682227896f2b416777d4d74906ded4df472db3ace75768962c134:(adminuser):FULL_CONTROL"
]
}
```

The items before the semicolon is called the canonical ID of the user. It can be used to remove or update permissions for the user.

Groups use a url instead of a Canonical ID. Such as `http://acs.amazonaws.com/groups/global/AllUsers`. They will appear as `<url>:(Group):<Permission>`

##### Apache Kafka

Apache Kafka is an open-source stream-processing software platform developed by the Apache Software Foundation, written in Scala and Java.

The project aims to provide a unified, high-throughput, low-latency platform for handling real- time data feeds.

[More info on Apache Kafka](https://kafka.apache.org/){:target="_blank"}

###### Authentication Connection

The Apache Kafka Authentication Connector allows you to read from an Apache Kafka Topic as a consumer or post to a topic as a producer.

**Apache Kafka Authentication Connection Fields**

* **Name**: Unique name for the connection
* **Bootstrap Servers**: Comma Delimited list of servers (in host:port format) to consume from/publish to. Required.
* **Topic Name**: Topic name to publish to or read from. Required
* **SASL Protocol**: The security.protocol config option to set. Will not do anything if SASL Mechanism and SASL JAAS Config Fields are empty. Optional.
* **SASL Mechanism**: The sasl.mechanism config option to set. Will not do anything if Security Protocol and SASL JAAS Config Fields are empty. Optional.
* **SASL JAAS Config**: The sasl.jaas.config config option to set. Will not do anything if Security Protocol and SASL Mechanism Fields are empty. Optional.

###### Integration Connection

Most Integration Connections can act in both repository (read) and output (write) modes. If it can't, it will not appear as an option when creating or editing a job.

**Integration Connection Fields**

* Connection Name
* Description
* Connector Type
* Connector Class
* Authentication Connection (Required)
* Secondary Auth Connection

###### Job Configuration

A Federation Services Job is the process of moving or syncing content(including versions, ACL's, metadata) from one CMS (content management system) to another.

**Repository Configuration**: No additional job configurations needed to set up Kafka as a repository source
**Output Configuration**: No additional job configurations needed to set up Kafka as an output source

##### Apache Solr

Solr is an open-source enterprise-search platform, written in Java, from the Apache Lucene project. Its major features include full-text search, hit highlighting, faceted search, real-time indexing, dynamic clustering, database integration, NoSQL features and rich document handling.
> **Important:** While Federation Servicestion Services still supports Solr for some basic federation cases it will not receive any further enhancements beyond its current state.

[More info on Apache Solr](https://solr.apache.org/){:target="_blank"}

###### Authentication Connection

Authentication connectors are used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens. Click here for more information on setting up an Authentication Connection.
> **Important:** Federation Services has no way of creating a Solr core or generating a Solr schema. The configured Solr core must already exist. For the simplest case, go to your Silurian directory and execute the command `solr -c create _core-name_`. Any attempts to authenticate without a valid core will fail.

**Configuration** 

* **Name:** The name of the connection
* **Host:** The location of the Solr server. Can support multiple urls, comma delimited, if using Solr Cloud
* **Solr Core Name:** The name of the Solr core (collection) to authenticate to.
* **Username:** (Optional) The username, if security is enabled
* **Password:** (Optional) The password, if security is enabled
* **Use SolrCloud:** A special high-availability set up for clustered Solr servers.
* **Use ZooKeeper:** Another Apache product used for clustering servers.

###### Integration Connection

The Solr Integration Connection is designed to index content into a Solr core

**Configuration** 

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.

###### Job Configuration

A Federation Servicestion Services Job is the process of moving or syncing content (including versions, ACL's, metadata) from one CMS (content management system) to another.

**Solr Output Specifications**

* **Solr Core Name:** The name of the Solr core to write to.
* **ID Attribute:** The attribute to be used for the id field
* **Autocommit:** Federation Services will not send a commit command and will let the server decide when to commit new documents. Committing can affect server performance
* **Enable Wait Flush:** Part of a manual commit call. From Solr’s' documentation: Block until index changes are flushed to disk
* **Enable Wait Searcher:** Part of a manual commit call. From Solr’s' documentation: Block until a new searcher is opened and registered as the main query searcher, making the changes visible
* **Enable Soft Commit:** Part of a manual commit call. From Solr’s' documentation: Makes index changes visible while neither fsync-ing index files nor writing a new index descriptor
* **Commit Frequency:** If not auto-committing, how many documents to send before making a commit call. Default (-1) will be set to 100.
* **Solr Cloud Queue Size:** If using Solr Cloud, the size of the queue.
* **Term Vector Field:** Required for More Like This searches.

**Repository Specifications** 

Solr Cannot be set up as a repository source.

###### Mappings

Federation Services uses Solr’s "schemaless" mode, which update a core's schema automatically based on the first occurrence of a field. We use suffixes to tell Solr what type of field should be mapped. Use the table below as a guide.

If you wish to not append suffixes to your field names, you will need to update the core's schema.xml file inside the Solr application.

Suffix (Single) | Suffix (multi) | Type | Description  
---|---|---|---  
_t | _txt | text_general | Indexed for full-text search so individual words or phrases may be matched. |
_s | _ss | string | A string value is indexed as a single unit. This is good for sorting, faceting, and analytics. It’s not good for full-text search. |
_i | _is | int | a 32-bit signed integer |  
_l | _ls | long | a 64-bit signed long |
_f | _fs | float | IEEE 32 bit floating point number (single precision) |
_d | _ds | double | IEEE 64 bit floating point number (double precision) |
_b | _bs | boolean | true or false |
_dt | _dts | date | A date in Solr’s date format |
_p | NA | location | A latitude and longitude pair for geo-spatial search |

###### Content Search Connector

Search connectors are also called View Connectors. You can manage them in the Content Service menu by clicking on Content View Connections. When creating a content view, select the Solr Content View Connector.

**Search Configuration** 

* **Collection**: Name of the Solr core (collection) you are connecting to.
* **Result Link**: Edit, External Link, Download, Inline.
* **Face Fields**: List of fields that will be used for faceted search
* **Search for default metadata fields**: 
* **Field List**: List of fields to be part of search
* **Facet Limit**: 0 means let Solr decide. Otherwise, set to 1 or more. Default is typically 20, but check your Solr server to be sure.
* **Facet Minimum Count**: Minimum facets needed to return a result.
* **Facet Date Field**: Date field used for Facets
* **Facet Date Start**: Start Date for Facets
* **Facet Date End**: End Date for Facets
* **Facet Date Gap**: [Simple Facet Parameters](https://wiki.apache.org/solr/SimpleFacetParameters#facet.range.gap){:target="_blank"}
* **Highlight**: Yes or No to turn off or on highlighting.
* **Highlight Fields**: Which fields will we return with highlights?
* **Highlight Field Length**: The length of the highlighted field result. Default is 300, but many users like to set this to 500 or more.
* **Stats**: Gather usage stats for this connector?
* **Public Search:** Is this a public search page or behind an authentication wall?

EXTERNAL LINKS

If you choose External Link for the Result Link, you'll need to configure the URL by clicking the "Add External Link" button at the bottom of the page  

**Content Service Connector:** The unique name of the content service connector this is associated with. You typically have an External Link per content service that is part of the index.

**Link Field:** The field that will be appended to the URL  
**Link URL:** The URL that will be used. The Link Field will be appended to this field for each result.

##### Aprimo

Aprimo provides content operations and digital asset management software that helps marketing teams deliver personalized omnichannel experiences at scale.

[More info on Aprimo](https://www.aprimo.com/){:target="_blank"}

###### Authentication Connection

Aprimo connections require an Aprimo Auth Connection to function. Authentication connectors are used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Configuration**

* **Name**: Name of your Aprimo Auth Connector
* **Aprimo Client ID**: The client ID obtained from your Aprimo environment
* **Aprimo User ID**: The user ID for authenticating to Aprimo
* **Aprimo User Token**: The user token obtained from your Aprimo environment
* **Aprimo Sub Domain Name**: The subdomain name of your Aprimo environment. Note: This is the subdomain only and not the full URL
* **Aprimo Classification ID**: The ID of the classification that the assets will be assigned to. If left blank then the assets will remain in the 'My Uploads' section until they are manually assigned a classification
* **Include Un-Mapped Properties**: If selected, all available properties will be included. If not selected, only mapped properties will be included

###### Discovery Connector

**Configuration**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

The Aprimo Integration Connection has no configuration as we use a Federation Servicestion Services Auth Connector for authentication parameters. You will just need to apply your pre-configured Aprimo Auth Connector to the Aprimo Output Connector.

**Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: The Aprimo Authentication connection that you want to use.

###### Job Configuration

A Federation Services Job is the process of moving or syncing content (including versions, ACL's, metadata) from one CMS (content management system) to another.

* **Repository Connection Configuration**: Aprimo cannot be used as a Repository Connection
* **Output Connection Configuration**: No additional configuration needed to use Aprimo as an Output source

##### Azure Blob

Azure Blob storage is Microsoft's object storage solution for the cloud. Blob storage is optimised for storing massive amounts of unstructured data. 

Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data.

[More info on Azure Blob](https://azure.microsoft.com/en-us/products/storage/blobs){:target="_blank"}

###### Authentication Connection

The Azure Blob Auth Connector allows three different methods of authentication on the same connection. The field descriptions will tell you which to leave blank for your particular method.

All of these keys generated in the Azure portal.
**Azure Key**: **Security + networking > Access Keys**
**SAS Token**: Security + networking > Shared access signature
**Application Credentials (Client ID/Secret)**: Follow [Microsoft's instructions](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal){:target="_blank"} to generate these values

**Configuration**

* **Name**: Name of the Azure Blob Auth Connector
* **Azure Account Name**: Name of the account associated with your blob storage
* **Azure Key**: Azure authentication key. This can be obtained within your Azure portal
* **Azure Container Name**: Name of the container within your azure blob storage. Leave blank for root
* **Use SAS Token**: Tells the connection to look for a configured SAS token
* **SAS Token**: Hidden unless above is checked. Put your SAS token here
* **Use Application Credentials**: Tells connection to look for application credentials
* **Azure Storage Client ID**: Leave blank if using SAS or Azure Key Auth
* **Azure Storage Client Secret**: Leave blank if using SAS or Azure Key Auth
* **Azure Storage Tenant Id**: Leave blank if using SAS or Azure Key Auth
* **Number of seconds for each attempt to upload**: Default is 60s. Multiplying by the average MB per file is recommended. Must be between 1 and 2147483647.
* **Url to use instead of https://[account].blob.core.windows.net**.: Only used in cases where some custom url has been configured. Leave blank to use default url.

**Proxy Information**

* **ProxyURL**: The URL of the proxy server
* **ProxyPort**: The port of the proxy server
* **ProxyUsername**: (Optional) The username to authenticate to the proxy server
* **ProxyPassword**: (Optional) The password to authenticate to the proxy server

###### Integration Connection

The Azure Blob Connector supports repo and output modes. Repo mode will require no additional configuration on the job, as it will simply crawl the entire configured container on the auth connection.

In output mode, the connector will output documents in the same fashion as the [BFS Connector](#bulk-file-system). The binaries will have a matching xml metadata file.

**Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: The Azure connection that you want to use

###### Job Configuration

A Federation Services Job is the process of moving or syncing content (including versions, ACL's, metadata) from one CMS (content management system) to another.

**Output Specification Fields** 

* **Output Folder Path**: The path of the root folder. This field must either be left empty, start with “/”, or start with “\\\”.
* **Include Batch ID in Output Path**: If using a batch migration, the batch ID will be included in the output path.
* **Include Un-Mapped Properties**: If selected, all available properties will be included in the metadata output file. If not selected, only mapped properties will be included in the metadata output.
* **Object Metadata Fields**: A Comma delimited list of fields to add to the Azure Blob file as metadata. By default, metadata will only be written to the xml metadata file.
* **Object Headers** : A comma-delimited list of header mappings to add to the Azure Blob file as metadata. Currently supported, and case-sensitive, headers: Content-Type, Cache-Control, Content-Encoding, Content-Language, Content-Disposition.

e.g. `Content-Disposition=content_disposition, Content-Type=content_type`

* **Perform MD-5 Integrity Check** : This check uses MD5 to verify authenticity and integrity of the data transfer. This requires an MD5 Hash Value Generator task to perform.
* **Aspect Remove Field Mapping**: Currently not in use
* **Multi-value field separator**: Some documents have fields that contain multiple values. Azure Blob does not support this, and will use this separator to form a list of these values as a string before upload.

**DateTime Config (Output) Configuration Fields**

* **Date Format**: Date mappings will be converted to this ISO format
* **Date Time Format**: DateTme mappings will be converted to this ISO format

**Repository Specifications** 

* **Root Folders**: Which root folders in the container to crawl. Leave blank to crawl all folders in the container.
* **Timeout in Second**: The number of seconds before hitting a timeout and failing the document. Timeouts below 60 seconds might cause read issues.

###### Content Service Connection

Content Service Connections define connections to specific repositories. Actions in the Content Services API or the Discovery web application perform actions against specific repositories.

**Basic Configuration**

* **Connector ID**: Give your connector a unique name
* **Description**: Provide a description for this connection
* **Type**: Select your DocuWare connector
* **Keep Connection Alive**: Keep this connection active
* **Keep alive in Milliseconds (300000 is 5 minutes)**: How long until connection expires if unused
* **Connection URL**: The web address for your connection
* **Security mode**: Select your preferred type of security credential access(Service Provided, User Pass through or Authentication Connector)
* **Mapping Type**: Choose a single map or group mapping.

**Connection Configuration**

* **Content Disposition**: The content disposition to apply to metadata when updated from the content service connector.
* Extra parameters can be passed to the content service connection and vary by connection.
**Supported Method** 
* Create File
* Delete Object By Id
* Get File Content
* Get Object Properties
* Update File
* Update Properties

##### Batch Parser

Batch parser is for picking up batch exports from the file system. The typical use case is picking up batches from scanners.

###### Integration Connection

**Configuration** 

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Leave blank. This connection does not require authentication

###### Job Configuration

**Batch Parser**

* **Ingestion Location**: Location to pick up files.
* **This can be a file path**: `/mnt/drop` or a URI `/service/pickup`
* **File Pattern**: Pattern for file matcher.
  * Example `*.xml`
* **Parser (Required)**: Select a parser type.
* **Pre Parse Commands**: Command to be run before parsing the document.
  * This is meant for cases where you have zip files and need to decompress before processing.
* **Server And Port**: Server and port for REST content retrieval.
* **Username**: Username for REST content.
* **Password**: Password for REST content.

**Parser Formats**

XML

```xml
<ROOT>
  <INFO>
    <DOCUMENT_NAME>5012421.pdf</DOCUMENT_NAME>
    <COURIER_NAME>M2M_DHR_20190703121505</COURIER_NAME>
  </INFO>
  <DOCUMENT DOCUMENT_DATE="03/04/2019">
    <INDEX_FIELDS>
      <FIELD NAME="DOCUMENT_NUMBER" VALUE="501242"/>
      <FIELD NAME="ID_M3M" VALUE="DLP_501242_2019"/>
    </INDEX_FIELDS>
  </DOCUMENT>
</ROOT>
```

##### Bootstrap

The Bootstrap Repository Connector is used for quickly generating dummy files and metadata to test things such as mappings and tasks.

The basic setup gives a number of ranges for specific metadata fields for each file.

Files generated by this connector will have the following metadata:

* Document Length
* Document Mimetype (Content Type)
* A Parent folder path
* A Last Modified Date
* A Created Date
* If Include Binaries is checked under Advanced Settings, a fake binary within the configured size range will be attached to the metadata.
* Files will have a randomised name of letters and numbers and will be of a randomized mimetype from the supported list of [extensions](#extension-list).

###### Integration Connection

Most Integration Connections can act in both repository (read) and output (write) modes. If it can't, it will not appear as an option when creating or editing a job. This connection can only be used as a repository connection.

**Configuration** 

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.

###### Job Configuration

When the Bootstrap connector has been selected as the repository connector of a given job, additional configurations will need to be provided within the Job.

**Basic Configuration**

Use this when you need to quickly generate files

FILE CONTENT

If **Include Binaries** in the **Details** tab is checked, the dummy files will include a file which matches the size on the metadata. The content of the file will not be particularly useful.

* **Number of files to generate**: This is a count of individual files, not batches of files.
* **Parent path base**: Sets the parent path metadata for the files being generated.
* **Creation Date Range Start **: The first possible date for the Created Date metadata
* **Creation Date Range End **: The last possible date for the Created Date metadata
* **Last Modified Date Range Start **: The first possible date for the Last Modified Date metadata
* **Last Modified Date Range End **: The last possible date for the Last Modified Date metadata
* **Size Range Start (Bytes)**: The minimum size of the document
* **Size Range End (Bytes)**: The maximum size of the document
* **Allow for non standard mimetypes**: Expands the list of mimetypes (200+)

**Advanced Configuration** 

* **Config File Location**: This is the location where the config/properties file resides
* **File Generator**: Type of file generator (Random or Linear)

**Advanced Configuration Properties** 

* **outputRootDir (string**): The root output folder for each document's parent
* **path.templateDir (string)**: folder which contains template files to use as content
* **numberOfFiles (int)**: number of files to create per repository thread
* **maxFilesInTree(int)**: Limits number of files per folder tree
* **folderPattern(string)**: A pattern using date parts that will create a parent based on the current date and pattern. Default pattern is /yyyy/M/dd/kk/mm/ss/(kk is hours)
* **File Names(String)**: File names will take the format[name.first][name.middle][name.last].

Each of the following properties should be a path to a text file with a list of options for file names.

* **name.first.file** 
* **name.middle.file** 
* **name.last.file** 

###### Extension List

* eml
* png
* csv
* xls
* ppt
* mp3
* mp4
* eml
* mpeg
* zip
* txt
* css
* html
* doc
* pdf
* xml

##### Box

Box, Inc.The company focuses on cloud content management and file sharing service for businesses. Official clients and apps are available for Windows, macOS, and several mobile platforms.

Before you can set up your Box Cloud Connection you must first create the necessary Authorisations via the Box App. Follow this link for steps on Box App Creation and Authorisation. Once created return to this page to begin setting up your connections in Federation Services.

###### Box Authentication

**Creating a Box App**

> **Tip:** We recommend using the Java Web Token (JWT) Authentication Connection, as it offers the best performance options

**JWT Application Creation**

* If using Java 8, JWT Authentication requires the installation of the Java Cryptography Extension.
* Ensure your account has 2-step verification enabled.
* Navigate to the Developers Console (link)
* Choose Create New App
* Select Custom App
* Box Cloud Custom App
* Select Server Authentication (with JWT).
* NOTE
* Box removed the ability to change this selection early in 2021, so this choice is permanent.
* Box Cloud Authentication Method
* TIP
* In your applications you should see Service Account Info. The Service Account ID is the service user's email address and must be a collaborator on any folder you wish to migration
* Under the Configuration tab in App Access Level, select the enterprise setting
* Box Cloud App Access Level
* In Application Scopes make sure both Content Actions are checked
* In Advanced Features, check both options
* Box Cloud App Advanced Features
* Click on Generate a Public/Private Key pair
* Open the file provided. It should take the following form
* {
* "boxAppSettings": {
* "clientID": "",
* "clientSecret": "",
* "appAuth": {
* "publicKeyID": "",
* "privateKey": "",
* "passphrase": ""
* }
* },
* "enterpriseID": ""
* }
* Take the entire value of the private key and save it to a separate file. This will be your private key file.
* The information in this config file can be used to fill in the fields of aBox Integration Connection.
* Alternatively, you can use the file to create a JWT Authentication Connector.
* To authorise your app follow Box's instructions. Pay particular attention to the App Approval section.
* Logging in as the Service User
* Navigate to your account's admin console ( yourapp.app.box.com/master )
* Click Content
* Select User(s) to view their content
* If you right-click, you can select "Log in to users account"
* This gives you the standard Box application view, allowing you to gather Folder Ids, etc. while in the view of the user.

**OAuth Application Creation**

> **Important:** This requires tomcat to be running using the 'https' protocol. Box will not accept 'http://' addresses. Tomcat will need to be configured to use SSL/TLS.

Creating a Box OAuth Application requires you to choose the **Standard OAuth 2.0 Authentication Method** in the **Create a New App** screen.

* In The **Configuration** tab of your app, retrieve the clientId and clientSecret.
* In **App Access Level**, select the enterprise setting
  Box Cloud App Access level
* In Application Scopes make sure both Content Actions are checked
* In Advanced Features, check both options
  Box Cloud App Advanced Features
`https://[simflofyUrl]/3sixty-admin/authconn/oauthcb`

**Creating Authentication Connections**

Each app type has its own Authentication Connection

**Box JWT Authentication Connection**

Connection
Proxy Information
Logging
Example
Preview
Name: Name of this connection.
JWT JSON Key File:If you have downloaded the JWT key file from the Box Admin Console, and it is on the same file system as Federation Services, then you can refer to it here (i.e. C:/Users/3Sixty/mykeyfile.json).
JWT JSON: Alternatively you can copy the contents of the JWT key file and paste it in this text area.
App Users Count: While in Output mode, the Federation Services Box Connector allows you to create Box App Users to do bulk uploads to Box. This is an advanced setting and is only recommended for large integrations since there is a start-up cost in creating the app users in Box. Set to 0 to not use app users.
Base name of the app users: Base name that will be used for each app user.
The ID of the managed user you wish to act as: The connection will act as the user id for all actions.
Box Connection Timeout: Connection timeout interval.
Box Read Timeout: Read timeout interval.

**Box OAuth Authentication Connection**

Connection

Proxy Information

Logging

Name: Unique name for this auth connector.

Box Developer Token: (Optional) Developer Token to be used instead of clientId and secret. Developer tokens expire 60 minutes after creation

Box Client ID: Client ID box will give you once you've set up the Application in Box.

Box Secret Key: Secret Key Box will generate for you as part of the Application Setup in Box.

AUTHENTICATION

After filling in your client id and secret. Hit the "Authenticate" button. You will be redirected to a screen in Box asking you to confirm the application permissions. You should be returned to Federation Services after accepting. If you receive an error, your redirect uri in the Box Application config may not be correct.

###### Discovery Connector

The Box Discovery Connector requires a working authentication connection. It will gather all metadata templates and their associated fields. However, there is one type of metadata, known as "Custom Metadata" that is applied to individual documents, but not part of a global template.

In order to find Custom Metadata, you will need to supply the id of a folder to crawl for documents. The id of a folder is visible in its URL.

Federation Services will attempt to extract the custom metadata elements of any folder or file it finds, adding it to the schema.

The values will have a type of "properties" for the purposes of mappings.

###### Box Job Configuration

###### Job Configuration (Repository)

COMMON ISSUE: PKIX PATH BUILDING FAILED  

This is a common issue when attempting to download files from box.  

The full error will look like this in the logs:

```text
Caught exception: Couldn't connect to the Box API due to a network error.  
com.box.sdk.BoxAPIException: Couldn't connect to the Box API due to a network error.  
...(About fifteen lines of stacktrace)...  
Caused by: javax.net.ssl.SSLHandshakeException: PKIX path building failed:  
sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
```

In order to fix this, first, attempt to install Box's ssl certificate in your Java keystore.

If that does not work, you can also download the Java Cryptography Extension (JCE) Unlimited Strength from Oracle and install the files in <JAVA_HOME>/jre/lib/security.

**Box Query**

This tab gives you three ways to retrieve data from Box. They construct a query using [Box's Search API](https://developer.box.com/reference/get-search/){:target="_blank"} and can be mixed and matched as needed

* **Box Query**: Used as a [query parameter](https://developer.box.com/guides/search/){:target="_blank"}
* **Folder ID's (comma delimited)**: A comma delimited list of folder ids to restrict the search
* **Content Types (comma delimited)**: Available options are:
  * file - Limits the search results to files
  * folder - Limits the search results to folders
  * web_link - Limits the search results to web links, also known as bookmarks

**Repository Crawl**

**Retrieve Folders**: Folders will be retrieved as repository documents.
**Retrieve Files**: Checked by default, files will be retrieved.
**Retrieve only listed folderIds**: The connector will only collect the documents and folders configured in the Box Query tab, and will not crawl.
**Retrieve Collaborations**: Will retrieve collaborations in the format [user]=[role].
**Truncate parent paths to exclude folders above specified folders**:

As a default, the parent paths of files are absolute, and will include the root folder All Files as well as any folders above the configured ones. When this box is checked, only folder paths up to the "crawled" folders will be included.

> **Tip:** If we have the file `/AFolder/subfolder/testfile.txt` at our root in Box, and we migrate `subfolder`, the file's final parent path will be `/All Files/AFolder/subfolder/`. With the truncate option checked, it will be `/subfolder/testfile.txt`

###### Job Configuration (Output)

> **Tip:** The upload APIs for box are different from most others used by Federation Services. Make sure your firewall is set to `allow upload.box.com`, or you will receive the error: `Error while uploading file <filename>.pdf Extended Response is: Couldn't connect to the Box API due to a network error`.

**Output Specification**

**Output Folder Path**:  
The root folder to output too. Your repository folder structure will be replicated under this directory
**Output Folder ID**:  
Another option for selecting the output folder. Folder Ids can be retrieved from the url when viewing the folder in a browser. This will take precedence over path if supplied
**Include Un-Mapped Properties**
All metadata will be output, even if no mappings are supplied. These values will be applied as global properties to the file.
**Date/Date-Time Format**
Output format for the date. Box is restrictive on this, so changing either is not recommended.

**Collaborations**

**Add Collaborations**:  
Add collaborations to files written. Collaborations will need to be added as part of a task in the format of [email]=role. The JavaScript task is useful for this.
**Strip Collaborations**:  
Will remove all collaborations before adding them.
**Collaborators Can View Path**:  
Sets the option to true on a collaboration. The collaborator can see the parent path of the document.
**Notify Collaborators on Add**:  
Collaborators will receive an email (not recommended).
**User ID to add Collaborations (Group Only)**:  
Use a group id instead of an email.

**Data**

**Remove document and previous versions if it fails to fully upload**:  
Used when outputting versions to Box. If a document is a version series fails to upload, Federation Services will delete the previously uploaded versions as well. They will be counted in the Removed column in the job status page
**Milliseconds to wait in response eto rate limit errors (multiplies times retries)**:  
Box has a very strict rate limit and will return an error code 429 (Too Many Requests) fairly often. This tells Federation Services how long to wait before automatically retrying the call that failed.
**Number of retries to attempt before failing a document**:  
The name says it all.
**If a file with the name already exists in the parent folder, create a new version**:  
If unchecked, documents with the same name will fail if a document already in the target folder has the same name
**Move Files Instead of Write (Box to Box only)**:  
Box has special methods for moving files within the same box organization. If this is checked, Federation Services will use those methods instead of reading and writing content. To do this you will need a task to manipulate the parent path of the document in order to rehome it.
**Copy Files Instead of Write (Box to Box only)**:  
Same as moving, but box will copy the files to their new location, instead of move them.
**Pre Cache Folder Structure(experimental)**:  
Federation Services will recursively walk the structure below the target folder and cache their paths and ids. This can take a long time and is not really of use unless there is already content under the target folder.
**Use Large Files Method on Files over 20 MB**:  
Will use Box's large file APIs to more reliably upload large files
> **Important:** This method is currently bugged and will cause an error if called by a Service User account. If you use JWT Authentication, leave this unchecked
**Only Create Folders**:  
Works in tandem with pre caching. Prebuild the folder structure, then use a different job that pre-caches to reduce overall times needed to move the content (experimental)
**Only add template metadata if all listed fields are present**:  
This field allows you to regulate what fields are allowed to be empty for documents receiving a metadata template

###### Box Content Service Connector

###### Managing Permissions

The API supports GET, POST, and DELETE calls. All the endpoints take the "id" parameter, which takes the form of a number. Ex.77411856592. 

A guide to available box roles can be found [here](https://support.box.com/hc/en-us/articles/360044196413-Understanding-Collaborator-Permission-Levels){:target="_blank"}

**Read Permissions (ACLs)**

**Request:**

`GET /repo/(connectorId)/acls?id=(id)&isFolder=(isFolder)`

**Description:**

Retrieves a list of in the format of ["UserName(UserId):Role",..... ]
You will need to extract the UserId or Name from each item for use in POST/DELETE request.

**Path Parameters:**

connectorId: The connector ID of your content service connector

**Query Parameters:**

id: The repository id of the item.

**Optional Parameters:**

isFolder: Is the item a folder? Default is false.

GET repo/box/acls?id=77411856592&isFolder=true

**Returns:**

{

"results": [ "M Lugert(77567866603):EDITOR", "JLipton(77422856603):VIEWER" ],

"success": true

}

**Example With CURL**

curl -u admin:admin "localhost:8081/3sixty-admin/api/repo/**box/acls?id=77411856592 &isFolder=true**" | json_pp

**Write Permssions (ACLs)**

**Request:**

POST /repo/(connectorid)/acls?id=(id)&acls=(acls)&isFolder=(isFolder)&viewPath=(viewPath)&notify=(notify)&isGroup=(isGroup)

**Description:**

Adds acls to the selected document.
It is important to note that Box collaborations are inherited from the parents. The parent of the item must also have the collaboration being added or a 403 response will occur.

**Path Parameters:**

connectorid: The connector id of your content service connector

**Query Parameters:**

id: The repository id of the item.
acls: A JSON Object in the format {"User1":"Permission1","User2":"Permission2"}
Optional Parameters: Applied for each pair in acls
isFolder: Is the item a folder? Default is false.
viewPath: Dictates whether the collaborator can view the parent path of the item. Default true.
notify: If true, will send a notification for each collaboration created. Default false.
isGroup: If true, will attempt use the supplied id to add collaboration for a group. Default false

This will not work with an email address as groups don't have them

**Example from Postman**

POST repo/box/acls?id=77411856592&acls={"testuser@box.com":"EDITOR"}&notify=true&isFolder=true

**Returns:**

{

"results": [

"M Lugert(77567866603):EDITOR",

"J Lipton(77422856603):VIEWER",

"testuser@box.com(77427777603):EDITOR"

],

"success": true

}

**Example With CURL**

curl -u admin:admin -X POST "localhost:8081/3sixty-admin/api/repo/**box/acls?id=77411856592&acls={"testuser@box.com":"EDITOR"}&notify=true&isFolder=true**" | json_pp

**Delete Permissions (ACLs)**

**Request:**

DELETE /repo/(connectorid)/acls?id=(id)&aclId=(aclId)&isFolder=(isFolder)

**Description:**

Removes the permissions for the supplied User or Group IDs from and item.

**Path Parameters:**

connectorid: The connector id of your content service connector

**Query Parameters:**

id: The repository id of the item.

aclId: A comma delimited list of User or Group Ids to remove from the item

**Optional Parameters:**

isFolder: Is the item a folder? Default is false.
DELETE repo/box/acls?id=77411856592&isFolder=true&aclId=testuser@box.com,77422856603

**Returns:**

{

"success": true

}

The following GET call should produce:

{

"results": [

"M Lugert(77567866603):EDITOR"

],

"success": true

}

**Example With CURL**

curl -u admin:admin "localhost:8081/3sixty-admin/repo/box/acls?id=77411856592&isFolder=true&aclId=testuser@box.com,77422856603" | json_pp

###### Content Service Methods

The methods currently supported for this connector are:

* Create Folder
* Create File
* Update File
* Create File from Item
* Get Object by path
* Update Properties
* Get File Content
* Get Object Properties
* Delete Folder
* Get Root Folder Id
* List Folder Items
* Delete Object by ID
* Get Types
* Get File Item
* Get ACLs
* Set ACLs
* Delete ACL

##### Bulk File System

The BFS Connector is useful for outputting files and their metadata as separate entities. File binaries will be output with their metadata in a file with the format. It can also read in these files for export to other systems.

`[filename].metadata.properties.xml`

###### Integration Connection

Most Integration Connections can act in both repository (read) and output (write) modes. If it can't, it will not appear as an option when creating or editing a job. This connection can only be used as a repository connection.
**Configuration** 

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connection.

###### Job Configuration

**Repository Specification**

* **Source Directory**: The directory to begin crawling for BFS files.
* **Do not convert metadata keys to lowercase**: Federation Services converts all type and field values to lowercase by default. If this is checked all fields will keep their original case
* **Process Folders**: Tells the job to process to folders. If checked and the job is rerun for errors, folders will be processed again.
* **Process Files**: Tells the job to process files. Check by default
* **Check for multi-valued fields**: Will check for commas in field values. If present, they will be added as multivalued fields to the metadata

**Output Specification**

* **Name**: Name of your BFS Auth Connector
* **Output Folder Path**: The output directory location where your BFS files will be stored
* **Multi-Value Separator**: Multi-value fields will be combined into a list using this separator
* **Include Un-Mapped Properties**: If selected, all available properties will be included in the metadata output file. If not selected, only mapped properties will be included in file
* **Inherit ACLs**: If selected, inherited ACL properties will be included in the metadata output file.
* **Metadata as XML**: Creates a metadata XML file. If not selected, metadata will be stored in a properties file
* **Zip Output**: If selected, output will be created as zip files. This option can only be used with batch migrations (i.e. batch size must be greater than 0).
* **Aspect Remove Field Mapping**: Takes a JSON string. Remove aspects if the listed fields are not present.

The example of the UI:

`{"myaspect:two":["field1","field2"],"myaspect:one":["field1","field2"]}`

Meaning that if field 1 or field 2 is not present, do not add the aspects.

**DateTime Config (Output)**

> **Note:** BFS as an output repository now uses the job's Repository Time Zone and Output Time Zone fields for time zone conversion

* Date Format: Date mappings will be converted to this ISO format
* Date Time Format: DateTme mappings will be converted to this ISO format

###### Version History Files

The import tool also supports loading a version history for each file. To do this, create a file with the same name as the main file, but append it with a v# extension. For example:

```text
IMG_1967.jpg.v1 <- version 1 content IMG_1967.jpg.v2 <- version 2 content IMG_1967.jpg <- "head" (latest) revision of the content This also applies to metadata files if you want to capture metadata history as well. For example:
IMG_1967.jpg.metadata.properties.xml.v1 <- version 1 metadata
IMG_1967.jpg.metadata.properties.xml.v2 <- version 2 metadata
IMG_1967.jpg.metadata.properties.xml <- "head" (latest) revision of the metadata
```

Additional notes on version history loading:

You can’t create a new node based on a version history only. You must have a head revision of the file. Version numbers do not have to be contiguous. You can number your version files however you want, provided you use whole numbers (integers). The version numbers in your version files won’t be used in Content Services. The version numbers in Content Services will be contiguous, starting at 1.0 and increasing by 1.0 for every version (so 1.0, 2.0, 3.0, and so on). Content Services doesn’t allow version labels to be set to arbitrary values, and the bulk import doesn’t provide any way to specify whether a given version should have a major or minor increment. Each version can contain a content update, a metadata update or both. You are not limited to updating everything for every version. If not included in a version, the prior version’s content or metadata will remain in place for the next version. The following example shows all possible combinations of content, metadata, and version files:

```text
IMG_1967.jpg.v1 <- version 1 content
IMG_1967.jpg.metadata.properties.xml.v1 <- version 1 metadata
IMG_1967.jpg.v2 <- version 2 content
IMG_1967.jpg.metadata.properties.xml.v2 <- version 2 metadata
IMG_1967.jpg.v3 <- version 3 content (content only version)
IMG_1967.jpg.metadata.properties.xml.v4 <- version 4 metadata (metadata only version)
IMG_1967.jpg.metadata.properties.xml <- "head" (latest) revision of the metadata
IMG_1967.jpg <- "head" (latest) revision of the content
```

##### Centera

Centera is an archiving system that uses objects as storage elements with the application or the Centera Universal Access server storing the objects using an Ethernet interface.

###### Authentication Connection

* Authentication Fields
* Application name: The application name registered with Centera
* Application Version: Version of Centera being connected to
* Cluster address: The Centera cluster being connected to

###### Repository Connection

Also known as an input connection. It's job is to query or crawl remote systems for files, folders, metadata, versions, and renditions.

**Repository Connection Fields**

* Connection Name: This is a unique name given to the connector instance upon creation.
* Description: A description of the connector to help identify it better.
* Connector Type: The type of connector.
* Connector Class: The class of this connector that implements the IOutputConnector interface. You may have different connector types that write to the same type of repository
* Authentication Connection: None needed for this connection

###### Content Service Connection

**Content Service Connection Fields**

* Connector ID: Give your connector a unique name
* Description: Provide a description for this connection
* Type: Select the Filesystem Content Service Connector
* Keep Connection Alive: Keep this connection active
* Keep alive in Milliseconds (300000 is 5 minutes): How long until connection expires if unused
* Connection URL: The web address for your connection
* Security Mode: None needed for this connection
* Mapping Type: Choose single map or group mapping if you are using mapping for jobs

##### CMIS

Content Management Interoperability Services (CMIS) is an open standard that allows different content management systems to interoperate over the Internet. Specifically, CMIS defines an abstraction layer for controlling diverse document management systems and repositories using web protocols.

If going from CMIS to CMIS, associations are only included if job type mappings are included

###### Authentication Connection

* **Name**: The name of your CMIS authentication connector
* **Username**: Username to authenticate with.
* **Password**: Password to authenticate with.
* **URL**: The full URL leading to your CMIS endpoint
* **Binding**: AtomPub or Web Services. AtomPub is the default and most common choice.
* **Repository ID**: You can specify a specific repository to query.
* **Vendor (CMIS 1.0 Only)**: No vendor, Alfresco, or FileNet

###### Discovery Connector

The CMIS Discovery Connector requires a CMIS Authentication Connection

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery
* **Repository ID**: You can specify a specific repository to discovery if supported by your specific CMS. The CMIS Discovery Connector will discover all content models including their metadata and properties.

###### Integration Connection

Utilising the CMIS Query Language, the CMIS Integration Connection allows the user to query the CMS system for content and metadata. It is also designed to write content, and it's associated metadata into a CMIS compliant Content Management System (CMS). This connector leverages the Apache OpenCMIS API v1.1.

To set up the CMIS Integration Connection fill in the following fields:

* **Connection Name**: Name the Connector
* **Description**: Add a description for the connector
* **Authentication Connection**: Select the Auth connector
* **Secondary Auth Connection**: Not used for CMIS

###### Job Configuration

###### CMIS Query

A query to run against the source system using The [CMIS Query Language](https://hub.alfresco.com/t5/alfresco-content-services-hub/cmis-query-language/ba-p/289736){:target="_blank"}. Must begin with

`select * from cmis:document d`

from there you can perform any type of query needed to collect the specific documents or types you wish. Most commonly, we walk a file tree using the root folder's node reference like so:

`select * from cmis:document d WHERE in_tree('workspace://SpacesStore/3144f53f-55b9-478e-9ad8-bca477a54238')`

As with most query based repo connections, we append the start and end times from the Details tab of the job to restrict the documents based on their last modified date

This appends the following to the query:

`d.cmis:lastModificationDate >= TIMESTAMP (Your Configured Start Time) AND d.cmis:lastModificationDate <= TIMESTAMP (Your Configured End Time)`

CMIS Query Order By:

The field and ordering in the form of (Field) [ASC/DESC]. This will be added as an ORDER BY clause

If left blank, the following will be added to the query, after the modified time clause

`cmis:lastModificationDate DESC`

**Version Depth**:
How many versions of a document to retrieve, going backwards. If the value is five, then the connector will attempt to retrieve the current document and its five most recent versions, if they exist.

**Search All Versions**:
Must be true if connecting to a Nuxeo repository. Must be false if connecting to an Alfresco repository.

**Process Relationships**:
Supported in most Alfresco systems. This will attach any relationships found as metadata, similar to version information.

> **Important:** If you are running with process relationships checked, and the source system does not support it, there will be an error in the logs, but the document should continue processing without error.

###### CMIS Server

**Output Folder Path**: The folder where you wish the files to be written. This folder will be created if it does not exist.

> **Tip:** To write to a site, prepend 'site/[shortname]/' to the path

**Strict Version Mode**: Required to be true for most ECM systems. This simply means that if a document is retrieved by ID, it will retrieve that object, and not attempt to retrieve the latest version.
**CMIS Cache Enabled**: A setting for the cmis session. All retrieved objects will be cached for quicker lookup later. If false, the connector will search the source system each time for a document for folder.
**Add ACLs**: Requires a task to set the transformedPermissions field on a repository document before output. The acls should take the form of map with principals as the keys and sets of permissions as the values. Example:

```text
{
"principal1": ["read","write"],
"principal2": ["read"]
}
```

**Include Aspects With No Field Mappings**: Aspects will be applied to documents even if the data for their fields is missing or unmapped.
**Aspect Remove Field Mapping**: Takes a JSON string. Remove aspects if the listed fields are not present. The example of the UI:

`{"myaspect:two":["field1","field2"],"myaspect:one":["field1","field2"]}`

Meaning that if field 1 or field 2 is not present, do not add the aspects.

**CMIS Update Query**: If populated, this query will be run, for every document, before any other attempt to upload the document. Any document ids which are returned by this query will be updated using the metadata and content from the document being processed.
**Check in In/Check Out on Updates**: If using an update query, the documents being updated will be checked out, have updates to metadata applied, and then be checked back in.
**Update Binary on Updates**: If using an update query, the document's content will be updated in addition to metadata.

###### Content Service Connector

This section covers the CMIS specific configuration of the Content Service Connector.

###### Managing Permissions

The API supports GET, POST, and DELETE calls.

All the endpoints take the "id" parameter, which takes the form of a string.

`Ex. 5dba1525-44a6-45ed-a42e-4a155a3f0539`

**Read Permissions (ACLs)**

Request:

`GET /api/repo/(connectorid)/acls?id=(id)`

Description:

Retrieves a list of in the format of ["principalID:permission1,permissions2",..... ]

Path Parameters:

**connectorid**:The connector id of your content service connector

Query Parameters:

**id**:The repository id of the item.

GET /api/repo/cmis/acls?id=5dba1525-44a6-45ed-a42e-4a155a3f0539

Returns:

```text
{
"results": [
"user@alfresco.com:cmis:all"
],
"success": true
}
```

**Example With CURL** 

`curl -u admin:admin "localhost:8081/3sixty-admin/api/repo/cmis/acls?id=5dba1525-44a6-45ed-a42e-4a155a3f0539" | json_pp`

**Write Permissions (ACLs)**

Request:

`POST /repo/(connectorid)/acls?id=(id)&acls=(acls)`

Description:

Adds a principal to an object with the specified permissions. If the object exists, replace its permissions with those supplied.

Path Parameters:

**connectorid**:The connector id of your content service connector

Query Parameters:

**id**:The repository id of the item.
**acls**: A JSON String in the format of {"principalID":"permission1,permission2",....}

`POST /api/repo/cmis/acls?id=5dba1525-44a6-45ed-a42e-4a155a3f0539&acls={"newuser@alfresco.com":"cmis:read,cmis:write"}`

**Returns:**

```
{
"results": [
"user@alfresco.com:cmis:all",
"newuser@alfresco.com:cmis:read,cmis:write"
],
"success": true
}
```

**Delete Permissions (ACLs)**

**Request:**

`DELETE /repo/(connectorid)/acls?id=(id)&acls=(acls)`

**Description:**

Remove a principle from an object.

**Path Parameters:**
**connectorid**: The connector id of your content service connector

Query Parameters: **id**:The repository id of the item.
**aclId**:a comma delimited link of principal Ids to remove from the target document.

`DELETE /api/repo/cmis/acls?id=5dba1525-44a6-45ed-a42e-4a155a3f0539&aclId=newuser@alfresco.com`

**Returns:**

```text
{
"success": true
}
```

And the following GET call should return:

```text
{
"results": [
"user@alfresco.com:cmis:all"
],
"success": true
}
```

**Example With CURL** 

`curl -u admin:admin -X DELETE "localhost:8081/3sixty-admin/repo/fn/acls?id=5dba1525-44a6-45ed-a42e-4a155a3f0539&aclId=newuser@alfresco.com| json_pp`

###### Supported Methods

* Check In
* Check Out
* Create Folder
* Create File
* Create Relationship
* Update File
* Create File from Item
* Get Document by path
* Update Document Properties
* Get File Content
* Get Document Properties
* Delete Folder
* Get Root Folder ID
* List Folder Items
* Delete Object by ID
* Get Types
* Get ACLs
* Post ACLs
* Delete ACL

##### Comma Separated Value (CSV)

No authentication connection is needed to set up CSV connectors, as it reads from the local filesystem. CSV cannot be used as an output connector nor a Content Service Connection.

###### Discovery Connector

Viewing the discovery schema instances will show you a table of all available Discovery Instances, this table can be sorted by Name, Type, and Collection.

**Discovery Instance Fields**

* **Name**: Instance Name
* **Ignore Types**: List of types to ignore, not used for CSV
* **CSV File Path**: Full path to the CSV File.
* **CSV Type**: If blank, the type on the fields will be csv file name with periods replaced with '_'

###### Job Configuration

**Repository Connection Configuration**

All of these fields will appear in a Job Specification where the CSV connector is the repository.

**CSV File Info** 

* **CSV File Path**: Path to the CSV file
* **CSV Type**: CSV Type. Will be prepended to all properties. If blank, the type will be the (filename)_csv
* **Separator Character**: The character that separates each field value, also called a delimiter. Default is comma (,)
* **Escape Character**: The value used to escape values such as slashes and quotes. Default is backslash (\\)
* **Quote Character**: The character used to denote fields. Default is double quotes (")
* **Document Type**: Sets the base type for the migrated files to either documents or folders
* **Maximum number of rows**: Including the header. Set to 0 or leave blank to read the entire csv

**File Field Mapping** 

* **Path Field**: The header under which file paths are stored
* **Path Includes Files**: If checked, Federation Services will extract the filename from the value found in the Path Field. Only checked if Path Field is populated
* **File Field**: The header under which file names are stored
* **Id Field**: Field which contains the source document Id. If blank, the id will be `(csvfilepath):(row)`
* **Created Date Field**: The field that stores the date the file was created
* **File Length Field**: The field that stores the file length
* **Modified Date Field**: The field that stores the date the file was modified
* **Path to Files**: If set, the connector will prepend this to the file path and search for a file at that location. **Include Binaries** must also be checked

##### Documentum

Documentum is an enterprise content management platform. Its functionality is made available through application programming interfaces (API).

Most of the customisation in the basic product is done using the DFC (Documentum Foundation Classes), a comprehensive collection of Java APIs. Customisation can be done via configuration, particularly through the extension products D2 and xCP. These additions aim to provide faster ways of building applications based on document types and metadata, and business processes, respectively.

###### Authentication

**Configuration**

* **Name**: Unique name for connection
* **Username**: Username to authenticate with
* **Password**: Password to authenticate with
* **Collection**: The default collection name
* **Doc Broker**: Documentum Doc Broker
* **Doc Base**: Documentum Doc Base
* **Server Port**: Port number

###### Discovery Instance

**Configuration**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: A predefined connection for authentication.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.
* **Doc Base**: Documentum Doc Base
* **Server Port**: Port number
* **Doc Broker**: Documentum Doc Broker

###### Integration Connection

The Documentum DFC (Documentum Foundation Classes) Integration Connection is for retrieving content, and it's associated metadata from a Documentum Repository based on root folder, content type and document type. Federation Servicestion Services is currently compatible with Documentum v5 and higher.The Documentum Integration Connection utilises the DFC library along with DQL (Documentum Query Language) to sync/integrate content, and it's associated metadata to Documentum. Federation Services is currently compatible with Documentum v5 and higher.

**Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Connector Class**: The class of this connector that implements the IOutputConnector interface. You may have different connector types that write to the same type of repository.

###### DFC Query Repository Connector

There is a new Documentum connector called the DFC Query Connector it's query based, not folder crawl based

* **Query**: this is how you get docs, needs to be a full query that works in Documentum.
  * You need the i_chronicle_id, and it should be unique, so DISTINCT i_chronicle_id
  * If you want to track links as relationships you can add this to the select part of the query: i_reference_cnt
* **Worker Count**: number of workers. These will go and get each document, and it's versions, metadata, renditions, permissions, etc... essentially think of a worker as a concurrent user, though because of queries that need to be run it could result in more than one connection to Documentum.
* **Document Queue Size**: the internal queue we use for documents. These will just be document ids that will be picked up by workers and then resolved
  * If there are a lot of files in folders this will speed things up a lot to have folders in cache, but you don't want the cache too big, or it will take up a lot of memory. We suggest 1000-10000 as the optimal number depending on your system.
* **Cache Options Tab**: Number of Items in Cache: this is a folder cache where we keep the properties and info for folders this is used to get the document path and to get folder properties if that option is checked

###### Job Configuration

###### Output Configuration

* Version Label Field: Source field containing version label
* Root Path: This is the root path / cabinet to start writing content to. Note that any subsequent folders that do not exist will be created. Defaults to "/"
* Content Type Rule: This is the DQL to find the Documentum Content Type (dm_format object) for a given extension and or mime type using content specific parameters. This is done as Documentum may have more than one content type per extension and or mimetype. If more than one dm_format is returned in the DQL result, then the first one will be used.
  * dos_extension --> Query Parameter: ${extension}
    * Example: select name from dm_format where dos_extension = '${extension}'
  * mime_type --> Query Parameter: ${mimeType}
    * Example: select name from dm_format where mime_type= '${mimeType}'
  * is_hidden
    * Example: select name from dm_format where mime_type= '${mimeType}' and dos_extension = ${extension} and is_hidden = false
  * can_index
    * Example: select name from dm_format where mime_type= '${mimeType}' and dos_extension = ${extension} and can_index = true

###### Repository Run Options

* **Query**: this is how you get docs, needs to be a full query that works in Documentum.
  * You need the i_chronicle_id, and it should be unique, so DISTINCT i_chronicle_id
  * If you want to track links as relationships you can add this to the select part of the query: i_reference_cnt
* **Content Max Length**: Max Document Size Allowed, set to 0 to allow any sized document.
* **Document Queue Size**: the internal queue we use for documents. These will just be document ids that will be picked up by workers and then resolved
  * If there are a lot of files in folders this will speed things up a lot to have folders in cache, but you don't want the cache too big, or it will take up a lot of memory. We suggest 1000-10000 as the optimal number depending on your system.
* **Max Document Retries**: How many times to attempt a document before erring.
* **BFS Integration**: Check if output connector is BFS (Bulk File System).
* **Include Parent Folder Properties**: Check to include
* **Parent Folder Properties**: The number of levels of parent properties you want. 1 is the parent, 2 is the parent and grandparent, etc...
* **Include ACLs**: Check box to include
* **dctm.includeFoldersDesc**: Check box to include the folder description.
* **Filesystem Staging Location**: Enter a location on the filesystem to stage documents or leave blank to use in-memory staging.
* **Use Mounted Drive for Binary**: Check to use a mounted drive to retrieve binary using getPath on DFC Document.
* **All versions**: Check to retrieve all versions of a Document.
* **Use Renditions**: Check to retrieve the renditions of the document.
* **Ignore Use Renditions Mime Types**: Comma delimited list of mime types to ignore using renditions.
* **Use First Matching Rendition as Binary**: Check to use the first Rendition that matches as the Document Binary (Include Binaries and Use Renditions also have to be checked)
* **First Rendition MimeType to match and use as Binary**:
  * If the Use First Rendition as Binary box is checked, this field is the MimeType of the Rendition to match (defaults to application/pdf if left blank or fed invalid value).
  * If ANY MimeType to Match is acceptable EXCEPT a specific MimeType. Use: NOT(mimetype) where mimetype is the mimetype you would like to only have a rendition and NOT the binary
  * (e.g. NOT(application/pdf) will use the first rendition that is NOT of the mimetype application/pdf.)

**Repository Cache Options**

Max Number of Items in Cache:Maximum number of folders to keep cached

###### Troubleshooting

**Detecting Resource Leaks**

In a case of Troubleshooting the Documentum DFC Connector, there may be the need to look for resource leaks. To detect these leaks, a property will need to be added to your dfc.propertiesfile. If you do not have adfc.propertiesfile, create one in the web application'sWEB-INF/classes directory with the single entry. This will allow for the detection of the leaks and provide a statement about the cause of the leak in your log files. The entry to add to your log file isdfc.diagnostics.resources.enable=true

**Documentum DFC External Dependencies**

Federation Services comes pre-packaged with some required dependencies for Documentum. If you experience errors related to missing classes or any errors stemming from the DFC connector classes you may need to replace existing DFC dependencies with files from your targeted Documentum server. Federation Services is currently compatible with Documentum v5 and higher.

1. Locate the following jars on your Documentum server:

* **dfc.jar**
* **configservice-api.jar**
* **configservice-impl.jar**

2. Copy those jars to your Federation Services server
3. **Delete** the **dfc-1.0.jar** file from the **tomcat/webapps/3sixty-admin/WEB-INF/lib** directory.
4. Place Documentum jars in the **tomcat/webapps/3sixty-admin/WEB-INF/lib** directory.
5. **Restart** Federation Services.

Note: There are known compatibility issues with the external DFC dependencies and Java 11. If you are using Java 11and experience start-up errors after adding the external dependencies, please consider using Java 8.

###### Content Service Connector

**Note:** An Auth connector is not needed for the Documentum DFC content service connector. For Security Mode, choose **Service Provided Credentials**

**Managing Permissions with Documentum DFC Content Services**

As of Version 2.7.6, this connector also offers permissions support using the /acls content service endpoint.
The API supports GET, POST, and DELETE calls.
All the endpoints take the "id" parameter, which takes the form of a string.
The methods currently supported for this connector are:

* Create Folder
* Create File
* Update File
* Get Object by path
* Update Properties
* Get File Content
* Get Object Properties
* Delete Folder
* Get Root Folder ID
* List Folder Items
* Delete Object by ID
* Get Types

##### DocuShare

A content management system developed by Xerox Corporation. Federation Servicestion Services supports connection to DocuShare versions 7.0 and newer.

###### Connecting to DocuShare

When setting up DocuShare, make sure you open all the rmi access ports for the DocuShare server. RMI will establish communication via the server port configured (defaults to 1099), however continued transmission takes place on random high number ports.

> **Tip:** If you suspect a firewall is causing connection issues, open all ports and use ip restrictions to the Federation Services server in order to restrict unwanted access.

**Encrypted Content**

If you are using encryption on content in your environment you will need to add the **cryptoContent.jar** from your DocuShare class path to Federation Servicestion Services's class path.

**Access and Permissions**

When accessing content with a system user, the user assigned should be a Content Administrator. This will ensure you have the appropriate access to read all content and all collections. You can add your system user to the Content Administrators group to give them the appropriate level of access.

**Other Resources for Developers**

Download API documentation and other developer resources by signing up here: [Xerox DocuShare](https://docushare.xerox.com/dsdn/dsweb/HomePage){:target="_blank"}

###### Authentication Connection

Used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Authentication Connection Fields**

* **Name**: This is a unique name given to the connector instance upon creation.
* **Username**: The username of a user with privileges to access targeted content
* **Password**: The user's password.
* **Server URL**: The host url without protocol. (RMI is used, no protocol is necessary)
* **Server Port**: The port to use when establishing an RMI connection with DocuShare. Defaults to 1099. The port used to establish the initial communication to DocuShare may not be the same port used to execute requests.
* **Domain**: The domain for the target directories. Out-of-the-box this is set to **DocuShare**

###### Discovery Connector

Discovery is the 2nd step in the integration process. Create an instance, select a connector and a schema will be produced based on the connector's configuration. Includes a list of all object types as well as attributes stored in each. This function discovers schemas on the remote system. These are tables, columns, object types, aspects, categories, content types, index fields, etc...

**Discovery Instance Configuration Fields**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

The DocuShare Integration Connection must include a DocuShare Authentication Connector in order to connect. Once added to a job, you will be able to configure the location of your DocuShare data in the Job Specification.

**DocuShare Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Connector Class**: The class of this connector that implements the connector interface. The connector class helps identify the current connector.
* **Authentication Connection**: The Authentication connection that you want to use.

###### Job Configuration

**DocuShare Object Selection Job Configuration**

* **DocuShare Query**: (Optional) - Text that will be used as part of a search against the docuShare repo. When used, folder crawling does not take place.
* **Root Folders**: A comma delimited list of directories to crawl.
* **Workspaces**: A comma delimited list of workspaces to crawl.
* **Crawl User Personal Collections**: When checked, Federation Services will crawl all directories in user personal collections.
* **Process Collections**: A collections (folders) to the document queue for processing.
* **Include Message Attachments** 
* **The rate in MBs to read DocuShare binaries**: (0 to read the file all at once)

###### Content Service Connector

###### Retrieving Object Permissions

Retrieving ACLs follows the standard format. You will need to send Federation Services the Document id for the target document or collection. The document id is the .getHandle().toLongString(). This means the id includes a reference to the host location: **Document-54:ec2-34-228-158-26.compute-1.amazonaws.com**

**Example**:
**CURL** 

```text
curl -X GET -u admin:admin 'http://localhost:8081/simflofy-
admin/repo/ds/acls?id=Document-54:ec2-34-228-158-26.compute-1.amazonaws.com'
```

**Output** 

```text
{
"results": [
"test[User-11:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search",
"admin[User-2:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search",
"Content Administrators[Group-2:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search"
],
"success": "true"
}
```

The returned result is in the formation of "userName[user- handle]:permission1,permission2...". The user handle is the user's ID for DocuShare and can be used to update permissions.

###### Setting Object Permissions

When updating permissions of an object you will need to send an **encoded** JSON string as the **acls** argument that includes the handle (id) of the authority you want to change.

**Permission Options**

* all
* read_all
* write_all
* manage
* write_object
* write_linked
* read_object
* read_linked
* read_history
* search

**Example**:

Update a single user's permissions

`{"User-11:ec2-34-228-158-26.compute-1.amazonaws.com":"read_object,read_linked,read_history,search"}`

Update a group's permissions

`{"Group-7:ec2-34-228-158-26.compute-1.amazonaws.com":"read_all"}`

**CURL**

```text
curl -u admin:admin -X POST 'http://localhost:8081/simflofy-
admin/repo/ds/acls?id=Document-54:ec2-34-228-158-26.compute-1.amazonaws.com&acls=%7B%22User-11%3Aec2-34-228-158-26.compute-1.amazonaws.com%22%3A%22manage%2Cwrite_object%2Cread_object%2Cread_linked%2Cwrite_linked%2Cread_history%2Csearch%22%7D'
```

**Output:**

```text
{
"results": [
"test[User-11:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search",
"admin[User-2:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search",
"Content Administrators[Group-2:ec2-34-228-158-26.compute-1.amazonaws.com]:manage,write_object,read_object,read_linked,write_linked,read_history,search"
],
"success": "true"
}
```

**Error Output:**

```text
{
"message": "Exception while setting access controls for id Document-54:ec2-34-228-158-26.compute-1.amazonaws.com and connector with id ds",
"error": "In three-bit permission mode, all of the read bits must be the same value as each other and all of the write bits must be the same value as each other",
"success": false
}
```

In the above error, you are attempting to use an illegal combination of permissions.

```text
{
"message": "Exception while setting access controls for id Document-54:ec2-34-228-158-26.compute-1.amazonaws.com and connector with id ds",
"error": "Could not find connection with id ds",
"success": false
}
```

In the above error, we used a connector ID that does not exist in Federation Services.

###### Deleting Object Permissions

When deleting permissions of an object you will need to send an encoded comma separated string as the aclsid argument. This will be a list of principal handles to be deleted.
**Example**: Delete a single principal Group-6:msedgewin10.local
**CURL** 

```text
curl -u admin:admin -X POST 'http://localhost:8081/simflofy-
admin/repo/ds/acls?id=Document-54:ec2-34-228-158-26.compute-1.amazonaws.com&aclId=Group-6%3Amsedgewin10.local
```

**Output**

```text
{
"success": true,
"results": "Group-6:msedgewin10.local"
}
Error (invalid principal)
{
"message": "Error while deleting access controls [id:Document-141] [permissions:1Group-6:msedgewin10.local] for connection docushare-test Error: modifyAclEntries; nested exception is: \n\tcom.xerox.docushare.db.DatabaseException: This class does not exist: 1Group",
"error": "modifyAclEntries; nested exception is: \n\tcom.xerox.docushare.db.DatabaseException: This class does not exist: 1Group",
"success": "false"
}
```

###### Supported Methods

The methods currently supported for this connector are:

* Create Folder
* Get Object by path
* Update Properties
* Get File Content
* Get Object Properties
* Delete Folder
* Get Root Folder ID
* List Folder Items
* Delete Object by ID
* Get Types
* Get Type Definition
* Get File Item
* Get ACLs
* Set ACLs
* Delete ACL
* Delete Version
* Get Version Properties
* Get Version Content
* List Versions
* Revert Version (makes the version the preferred version)
* Check In (unlocks the file, does not create a new version)
* Check Out (locks the file)

##### DocuWare

DocuWare provides cloud document management and workflow automation software that enables you to digitise, secure and work with business documents, then optimise the processes that power the core of your business. [https://start.docuware.com/](https://start.docuware.com/){:target="_blank"}

###### Authentication Connection

**Configuration**

* **Name**: This is a unique name given to the connector instance upon creation.
* **Username**: The username of a user with privileges to access targeted content
* **Password**: The user's password.
* **Server URL**: The host url without protocol.
* **Default File Cabinet**: DocuWare Document location
* **Organization Name**: Used within the Federation Services platform for multi-tenancy.
* **Domain**: The domain for the target directories.

###### Discovery Instance

**Configuration**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: The Authentication connection that you want to use.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.

###### Integration Connection

**Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Connector Type**: The type of connector. In the screenshot above you can see that it's a CMIS Output Connector type.
* **Connector Class**: The class of this connector that implements the IOutputConnector interface. You may have different connector types that write to the same type of repository.
* **Authentication Connection**: None needed for this connection

###### Job Configuration

**Repository Configuration**

* **Cabinet List**: List of Docuware file cabinets

**Output Configuration**

* **Date Time Configuration**: When setting up your migration job using DocuWare you have the option to configure the date and time using the DateTime Config tab.

###### Content Service Connection

**Basic Configuration**

* **Connector ID**: Give your connector a unique name
* **Description**: Provide a description for this connection
* **Type**: Select your DocuWare connector
* **Keep Connection Alive**: Keep this connection active
* **Keep alive in Milliseconds (300000 is 5 minutes)**: How long until connection expires if unused
* **Connection URL**: The web address for your connection
* **Security mode**: Select your preferred type of security credential access(Service Provided, User Pass through or Authentication Connector)
* **Mapping Type**: Choose a single map or group mapping

**Connection Configuration**

* Extra parameters can be passed to the content service connection and vary by connection.

**Supported Methods**

The methods currently supported for this connector are:

* Delete Object By Id
* Get Object Properties
* Get Types
* List Folder Items
* Update Properties

##### Dropbox

Dropbox is a file hosting service operated by the American company Dropbox, Inc., head quartered in San Francisco, California, that offers cloud storage, file synchronisation, personal cloud, and client software.

With Dropbox bring Your Files & Cloud Content With the Tools Your Team Wants To Use. Easily Access Your Teams Work From Your Computer, Mobile Device, or Any Web Browser. Password-Protected Links. Extended File Recovery.

There are 3 ways to connect to Dropbox:

**Regular Dropbox OAuth**: This allows us to connect to the Dropbox API. This authenticates with only one user, and any content must be able to be accessed by that user.
**Dropbox for Business OAuth**: This allows us to connect to the Dropbox For Business API. This will require an Admin to login for a Dropbox for Business
**Developer Token**: These last about 1 hour and are good for testing or providing temporary access.

###### Application Setup

First, you'll need Dropbox account.

Then go to: [Dropbox Developer Apps](https://www.dropbox.com/developers/apps){:target="_blank"}.

* Click the Create app button
* Create your app under My Apps
* Select the Scoped access permission model
* Select Full Dropbox for the access type
* Name your app
* Check the I agree box
* Click the Create app button

Now, you should be able to go to your app control panel. You have two options Add the following to the redirect uri:

https://{simflofy instance}/3sixty-admin/authconn/oauthcb

**Use the Access Code**

Hit "Generate Access Token" and copy the code. That's it!

Back in Federation Services, create or edit your authentication connection and enter the auth code in **Client Auth**

**Key and Secret**

Now, grab your App key and secret. Make sure, if you copy them, you didn't grab any extra spaces.

Back in Federation Services, create or edit your authentication connection and enter your app key and secret and hit "Authenticate". If this is a business application, check the "Use Business API" checkbox first.

You will be asked to log into your Dropbox account and give your app access permission. You will then be returned to Federation Services and you can save your access tokens.

For a business connection, you will have a drop-down for team members in the connection upon editing the connection again. Any action taken with this auth connection will be performed as that member.

###### Authentication Connection

**Important:** REQUIREMENTS 

Federation Services must be running with SSL (https://).

* **Name**: Unique name for this auth connector.
* **Dropbox App Key**: Client ID Dropbox will give you once you've set up the Application in Dropbox.
* **Dropbox Secret Key**: Secret Key Dropbox will generate for you as part of the Application Setup in Dropbox.
* **Dropbox Client Auth Code**: Optional Developer Token to be used instead of requiring users to login.
* **Business API**: Optional Flag for whether to use the Dropbox For Business API (Checked)or the regular Dropbox API (Unchecked).

###### Discovery Connector

Dropbox only has two core types, Files and Folders. Custom metadata takes the form of templates. These templates have names and field groups. These templates will appear as a type in the discovery report.

**Discovery Instance Fields**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: The Authentication connection that you want to use.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.
* **Folder Path**: The directory location where your files are stored.

###### Integration Connector

The Dropbox Integration Connection is designed to write content, and it's associated metadata into a specified Dropbox location. It is also for retrieving content, and it's associated metadata from Dropbox. Utilising the Dropbox Java SDK and Dropbox APIs, the Dropbox Integration Connection allows the user to obtain content and metadata from their specified Dropbox Location.

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: Your FileNet Auth Connector

###### Job Configuration

**Repository**

* **Repository Folders**: Comma delimited list of folder paths to crawl
* **Get Folders**: Process Folders

**Output Specification**

* **Target Folder**: The path of the target folder
* **Max Retries before failing a document**: Dropbox retries uploads automatically if they fail. This will set the number of retries.
* **Generate Templates**: Federation Services will attempt to generate metadata templates based on mappings.

**GENERATING TEMPLATES AND JOB MAPPINGS**   
You can use a calculated field to map to a property template. You may either use the Output Type and Target drop-downs. If you would like to dynamically create these templates, create a calculated field mapping with the output as `[template].[field]`.  
  
If the "Generates Templates" checkbox is set on the output, the connector will generate a template (if it doesn't already exist) using any fields with the same template name.

###### Content Service Connector

This section covers the Dropbox specific configuration of the Content Service Connector.

**Basic Configuration Fields**

* **Connector ID**: Give your connector a unique name
* **Description**: Provide a description for this connection
* **Type**: Select your DocuWare connector
* **Keep Connection Alive**: Keep this connection active
* **Keep alive in Milliseconds (300000 is 5 minutes)**: How long until connection expires if unused
* **Connection URL**: The web address for your connection
* **Security mode**: Select your preferred type of security credential access(Service Provided, User Pass through or Authentication Connector)
* **Mapping Type**: Choose a single map or group mapping

**Connection Configuration**

* Extra parameters can be passed to the content service connection and vary by connection.

**Supported Method**

* Create File
* Create Folder
* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Id By Path
* Get Object Properties
* Get Types
* List Folder Items
* List Versions
* Update File

##### Email

These connections can be used to integrate data from your email servers with a few easy steps.

###### Authentication Connection

Used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Configuration**

* **Connection Name**: Unique Name for the Auth Connection to identify it in the UI.
* **Username**: The username to authenticate with the repository if applicable.
* **Password**: The password to authenticate with the repository if applicable.
* **Server URL**: URL of the email service location.
* **Server port**: The port number that your email server is listening on.
* **Protocol**: The email protocol type being used (IMAP, IMAPS, POP3, GIMAP, PST)

###### Discovery Connector

**Schema Instance Configuration**

* **Name**
* **Authentication Connection**
* **Ignore Types**

###### Integration Connection

Also known as input and output connections. Their job is to query or crawl remote systems for files, folders, metadata, versions, and renditions.

**Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Your email auth connection

###### Job Configurations

**Email Repository Job Specification**

* **Max Emails Returned**
* **Email Folder**
* **Search Terms**

###### Content Service Connections

**Supported Methods**
* Create File
* Update File
* Update Properties
* Get File Content
* Get Object Properties
* Get Edit Properties
* Get Content
* Get Root Folder ID
* List Folder Items
* Delete Object by ID

##### Ephesoft

Ephesoft offers a suite of Smart Capture Document Scanning Software Products that automatically classify, separate, sort, and extract data from paper, fax, and electronic documents.

###### Discovery Connector

Federation Servicestion Services's Ephesoft Discovery Connector can be used to discover the metadata of your Ephesoft repository. This will include content types and their associated properties.

Viewing the schema instances will show you a table of all available Discovery Instances, this table can be sorted by Name, Type, and Available Versions.

From the Discovery Connector page you can view the most recently created schema instances as well as created new ones.

To create a new Discovery Connection, click the Create New Discovery Instance button at the bottom of the Schema Instances Page. Fill in the following fields.

**Discovery Schema Instance Configuration**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with workflow in the name, you would enter (.)workflow(.) into the ignore types text box.
* **Batch Path**: The path to the batch folder

##### File Transfer Protocol (FTP)

Configuration for the FTP connectors can be applied in the Server tab of the connector edit page.

###### Authentication Connection

**Connection**

**Authentication Fields**

* **Username**: The username to authenticate with the repository if applicable.
* **Password**: The password to authenticate with the repository if applicable.
* **Server URL**: Full URL of the ftp server.
* **Server Port**: The port of the ftp server. Default is 23.
* **Is Implicit**: Is Implicit security mode. Your server will most likely dictate which to use.
* **Use FTPS**: This is SSL(TLS) based FTP

**Proxy Information**

**iManage Auth Proxy Information**

* **Full Proxy Url**: The proxy host.
* **Proxy Port**: The proxy port
* **Proxy User**: Proxy User
* **Proxy Password**: ProxyPassword

###### Integration Connection

Also known as input and output connections. Their job is to query or crawl remote systems for files, folders, metadata, versions, and renditions.

**Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Connector Type**: The type of connector. In the screenshot above you can see that it's a CMIS Output Connector type.
* **Connector Class**: The class of this connector that implements the IOutputConnector interface. You may have different connector types that write to the same type of repository
* **Authentication Connection**: None needed for this connection

###### Job Configurations

**Email Repository Job Specification Fields**

* **File Path**: The location of your folders and files that you want Federation Services to access

**Output Configuration**

This connection cannot be used as an output source

###### Content Service Connector

**Basic Configuration Fields**

* **Connector ID**: A unique identifier for this connection i.e. FTP Content Service Connector (Alphanumeric, dashes and underscore characters only)
* **Description**: The text that will be displayed on drop-downs etc. to identify this connection.
* **Connector ID**: Give your connector a unique name
* **Description**: Provide a description for this connection
* **Type**: Select the Filesystem Content Service Connector
* **Keep Connection Alive**: Keep this connection active
* **Keep alive in Milliseconds (300000 is 5 minutes)**: How long until connection expires if unused
* **Connection URL**: The web address for your connection
* **Security Mode**: None needed for this connection
* **Mapping Type**: Choose single map or group mapping if you are using mapping for jobs

**Connection Configuration**

* **Root Folder** 
* **Encrypt Data** 
* **EPSV With IPV4** 
* **Add Custom Parameters** 

The methods currently supported for this connector are:

* Create File
* Create Folder
* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Id By Path
* Get Object Properties
* Get Types
* List Folder items
* Update File

##### IBM CMOD ODWEK

IBM Content Manager OnDemandWeb Enablement Kit allows users to access data that is stored in an IBM Content Manager OnDemand server with IBM Content Navigator or a user-written program.

There is no Discovery Instance or Content Service Connection available for IBM Content Manager on Demand.

###### Authentication Connection

**Connection Fields**

* Name
* Username
* Password
* Server URL
* Server Port
* Application Name ( Optional)
* DB2 Server
* DB2 Port
* DB2 Database
* DB2 User
* DB2 Password

###### Integration Connection

**Connection Fields**

* **Connection Name**
* **Connector Type**
* **Connector Class**

###### Federation Services Setup

This setup is for CMOD ODWek version 9.5 (64 bit). Other versions of ODWek can also be used with Federation Services but the supporting libraries in this setup are located in different places depending on the version of CMOD/ODWek you are using.

1. In **3sixty-admin/WEB-INF/classes** create the following folder structure: com/ibm/edms/od
2. Copy **ArsSVTInterface.class** from C:/Program Files/IBM/OnDemand/V9.5/www/servlets into the folder created in step 1
3. Copy C:/Program Files/IBM/OnDemand/V9.5/www/servlets/ArsWWWServlet.jar to 3sixty-admin/WEB-INF/lib
4. Copy C:/Program Files/IBM/OnDemand/V9.5/www/api/ODApi.jar to 3sixty-admin/WEB-INF/lib
5. Copy C:/Program Files/IBM/OnDemand/V9.5/www/ars3wapi64.dll into C:/Program Files/IBM/OnDemand/V9.5/bin
6. Add the following directory to your Windows PATH C:/Program Files/IBM/OnDemand/V9.5/bin
7. Restart/Start the Tomcat instance that Federation Services is installed on and setup is complete.

###### Job Configuration

A Federation Services Job is the process of moving or syncing content (including versions, ACL's, metadata) from one CMS (content management system) to another.

**Repository Configuration Fields**

* Folder Search Criteria
* Document SQL Search
* Process Folders

**Output Configuration Fields**

* Output Folder Path
* Include Un-Mapped Properties

##### IBM FileNet

IBM FileNet Content Manager is a flexible, full-featured content management solution that provides the foundation for the IBMCloud Pack for Business Automation. Use it to create innovative business applications on any cloud and more effectively manage all your content, from any source.

###### Authentication Connection

An Authentication Connector is required to connect to any FileNet instance. Click here for more information on setting up an Authentication Connection.

**Authentication Connection Configuration**

* **Name**: The Authentication connector name.
* **Username**: The username
* **Password**: The password
* **Host**: The URL or Path to connect to.
* **Server Port**: The connection port (defaults to 9080)
* **Protocol**: Choose between http or https (for SSL).
* **Repository Name**: The name of the repository you're attempting to connect to. This is not the ID.
* **Connection Timeout**: Time to wait for a connection. A value of zero waits for infinity

FILENET API  
Federation Services currently leverages the FileNet P8 API v5.2.0

**Example**

* **Name**: FileNet Demo Authentication Connection
* **Username**: Admin
* **Password**: Password
* **Host**: http://ec2-52-4-181-197.compute-1.amazonaws.com
* **Server Port**: 9080
* **Protocol**: HTTP
* **Repository Name**: P8G6ObjectStore
* **Connection Timeout**: 30000

###### Discovery Connector

**Discovery Instance Fields**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connector**: Select your FileNet Authentication Connector
* **Ignore Types**: (Optional) A comma delimited list of types to ignore.

###### Integration Connector

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: Your FileNet Auth Connector

###### Job Configuration

**FileNet Repository Job Configuration**

* **FileNet Query**: This query will gather the document Ids to be transferred.
  * Sample Document Query: `Document d WHERE d.[Creator] = "jsmith"`
  * Sample Folder Query: `Folder f WHERE f.This INSUBFOLDER '\4523'`
  * See FileNet Query Documentation [here](https://www.ibm.com/docs/en/filenet-p8-platform/5.5.x?topic=reference-query-syntax){:target="_blank"}.
* **Process Folders** Tells Federation Services you are using a folder query. This will treat folders as documents, allowing you to extract metadata and transform folders in the process.

**Note:** When choosing to **process folders** make sure you apply a **Folder** query.

* **Name Property**: The property to check to set the Filename. Will default to DocumentTitle if prop is empty. (Document queries only.)
* **Query Limit**: When populated, will set a limit on the number of IDs returned from a Repository query. If blank, the server default values will be used.
* **Page Size**: Sets the page size for the FileNet query. Default value is 200
* **Get Versions**: Retrieve document version numbers
* **Documents have multiple binaries**: Check to include
* **Get Annotations**: Check to include
* **Filesystem Staging Location**
* **Filesystem Staging Timeout (Seconds)**

**FileNet Output Job Configuration**

* **Output Folder Path** Cannot be root folder (/)
* **Do Not File new Documents**: Output Path will be ignored, no new paths will be generated
* **Do not check if document is filed before adding it to a folder**: Will version if the file already exists.

###### Content Services Connector

The only configuration required for this connector is the FileNet authentication connection.

**Supported Methods**

* Create File
* Create Folder
* Update File
* Update Document Properties
* Get File Content
* Get Document Properties
* Delete Folder
* List Folder Items
* Delete Document
* Get Permissions
* Set Permissions
* Delete Permissions
* Check In
* Check Out
* Create Version
* Delete Version
* Get Version Properties
* Get Version Content
* List Versions
* Revert Version

**Content Services Basic Configuration**

* **Connector ID**: A unique identifier for this connection i.e. simflofy_demo(Alphanumeric, dashes and underscore characters only)
* **Description**: The text that will be displayed on drop-downs etc. to identify this connection.
* **Type**: The type of Search Connection (Solr, Mongo, Alfresco Faceted etc.)
* **Keep Connection Alive**: How long until connection is expired if unused.
* **Keep Alive in Milliseconds**: How long until connection is expired if unused.
* **Security Mode**
* **Authentication Connection**
* **Pass-through Credentials**
* **Mapping Type**

###### Managing Permissions

As of Version 2.7.6, this connector also offers permissions support using the [/acls](https://api.simflofy.com/#/Content%20Service/getAccessControlsUsingGET){:target="_blank"} content service endpoint.

* The API supports `GET`, `POST`, and `DELETE` calls.
* All endpoints require an **id** parameter. Ex. id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8
* All endpoints also take the **isFolder** parameter, which tells the API whether the item is a file or folder. Default to false.

Federation Services has a number of default access templates for FileNet. They were created using the following tables:

**Folders**: [Folder security levels](https://www.ibm.com/support/knowledgecenter/SSGLW6_5.2.0/com.ibm.p8.security.doc/p8psa046.htm){:target="_blank"}
**Files**: [Document security levels](https://www.ibm.com/support/knowledgecenter/SSGLW6_5.2.0/com.ibm.p8.security.doc/p8psa044.htm){:target="_blank"}

**Templates:**

* MODIFY_PROPERTIES
* VIEW_PROPERTIES
* FULL_CONTROL
* PUBLISH_DOCUMENT
* MAJOR_VERSIONING
* MINOR_VERSIONING
* ADD_TO_FOLDER
* MODIFY_FOLDER_PROPERTIES

###### Read Permissions (ACLs)

**Request**

`GET /api/repo/<connectorid>/acls?id=<id>&listAll=<listAll>&isFolder=<isFolder>`

Description:

Retrieves a list of in the format of `["Grantree:Access1,Access2",..... ]`

Path Parameters:

* **connectorid**: The connector id of your content service connector

Query Parameters:

* **id**: The repository id of the item.

Optional Parameters:

**listAll**: Boolean value. If the access lists falls under a default permissions sets and this is true, will list all permissions instead of template names. Default false,
**isFolder**: Is the item a folder? Default false.

**Example**

`GET /api/repo/fn/acls?id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8`

Returns:

```text
{
"results": [
"cn=P8User,O=SAMPLE:FULL_CONTROL",
"cn=P8Viewer,O=SAMPLE:VIEW_PROPERTIES"
],
"success": "true"
}
```

Example With CURL

`curl -u admin:admin "localhost:8081/3sixty-admin/api/repo/fn/acls?id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8" | json_pp`

###### Write Permissions (ACLs)

Request: `POST /api/repo/<connectorid>/acls?id=<id>&isFolder=<isFolder>`

Description:

Adds or replaces permissions for a user/group/grantee

Preset template and the breakdown for each is found above.

If the grantee already exists, their list will be replaced with the posted access rights.

Path Parameters:

**connectorid**: The connector id of your content service connector

Query Parameters:

**id**: The repository id of the item.

Request Body:

A JSON in the format `{"Grantee":"Template1,Access1,..."}`

Optional Parameters:

**isFolder**: Is the item a folder? Default false.

**Example** 

`POST /api/repo/fn/acls?id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8`

Body: `{"cn=TESTUser,0=SAMPLE":"READ_ACL,VIEW_CONTENT,WRITE_ACL"}`

Returns:

```text
{
"results": [
"cn=P8User,O=SAMPLE:FULL_CONTROL",
"cn=P8Viewer,O=SAMPLE:VIEW_PROPERTIES",
"cn=TESTUser,0=SAMPLE:READ_ACL,VIEW_CONTENT,WRITE_ACL"
],
"success": "true"
}
```

###### Delete Permissions (ACLs)

Request:

`DELETE /api/repo/<connectorid>/acls?id=<id>&aclId=<aclId>&isFolder=<isFolder>`

Description:

Removes a grantee from the item.

Path Parameters:

connectorid : The connector id of your content service connector

Query Parameters: id: The repository id of the item.

aclId: A pipe (|) delimited list of grantees to remove.

Optional Parameters: isFolder: Is the item a folder? Default is false.

`DELETE /api/repo/fn/acls?id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8&aclId=cn%3DTESTUser,0%3DSAMPLE|cn%3DTESTUser2,0%3DSAMPLE`

Returns:

```text
{
"success": "true"
}
```

A GET call should not return:

```text
{
"results": [
"cn=P8User,O=SAMPLE:FULL_CONTROL"
],
"success": "true"
}
```

Example With cURL

`curl -u admin:admin -X DELETE "localhost:8081/3sixty-admin/api/repo/fn/acls?id=6385C1A5-EF01-45F1-86C3-FDC3C4E3B6A8&aclId=cn%3DTESTUser,0%3DSAMPLE|cn%3DTESTUser2,0%3DSAMPLE" | json_pp`

###### Retrieving Annotations

**3.0 and 3.1**

While annotations can be gathered from the queried documents, accessing the annotations requires a JavaScript task to allow them to be exported as document fields. This will change in future versions.

The following code will retrieve the annotations for each document and add each as a field

```text
var rp = rd.getExtendedProperties().toString();
rp = rp.replace('[','').replace(']','');
print(rp);
var split = rp.split(',');
var i = 0;
for each (var r in split){
rd.addSingleField('annotation'+i,r);
i++;
}
```

**3.1.1+**

Annotations will be added as fields to the document with the name annotationX, where X is an integer.

##### iManage

iManage is a system to store, Organize and manage documents email and related content. You create top-level spaces called projects, each project can hold documents, emails, folders and so forth.  
[imanage.com](http://imanage.com/){:target="_blank"}

###### Authentication Connection

The iManage Auth Connector is designed to capture the required authentication credentials for an iManage System. Used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Connection Fields**

* **Connection Name**: Unique Name for the Auth Connection to identify it in the UI.
* **Username**: The username to authenticate with the repository if applicable.
* **Password**: The password to authenticate with the repository if applicable.
* **Server URL**: URL of the service.
* **iManage Database**
* **iManage Default Workspace ID (Client Matter ID)**
* **Security**: default is public

**iManage Auth Proxy Information**

* **Full Proxy Url**: The proxy host.
* **Proxy Port**: The proxy port
* **Proxy User**: Proxy User
* **Proxy Password**: Proxy Password

###### Discovery Connector

Every Discovery Connector can define custom fields that it needs to be able to connect to and discover the repository.
**Instance Connection Fields**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: A predefined connection for authentication.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.

###### Integration Connection

Also known as input an output connections. Their job is to query or crawl remote systems for files, folders, metadata, versions, and renditions.

**Integration Connection Configuration Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Your iManage auth connection

###### Job Configuration

**iManage Output Job Configuration**

* **Output Folder Path**
* **Include Un-Mapped Properties**

**iManage Repository Job Configuration**

* **Folders to Crawl**: Comma Delimited
* **Client IDs**: (Comma delimited. If entered, client ID's will take precedence over folders)
* **Get Versions?**

###### Content Service Connection

**Content Service Connection Fields**

* **Connector ID**: Give your connector a unique name
* **Description**: Provide a description for this connection
* **Type**: Select the Filesystem Content Service Connector
* **Keep Connection Alive**: Keep this connection active
* **Keep alive in Milliseconds (300000 is 5 minutes)**: How long until connection expires if unused
* **Connection URL**: The web address for your connection
* **Security Mode**: None needed for this connection
* **Mapping Type**: Choose single map or group mapping if you are using mapping for jobs

**Supported Methods**

* Create a File
* Create a Folder
* Get File Content
* Get Object Properties
* Get ID by Path
* Get Types
* Get Type Definition
* List Folder items
* List Versions
* Update File
* Update Properties

##### Infor

ERP Cloud Software Integration - Migrate and Federate with Infor. Infor is an enterprise software company that focuses on business applications for organisations delivered via cloud computing as a service.

###### Authentication Connection

**Infor Authentication Connector Fields**

* **Name**: Give your Infor connection a Unique name
* **Username**: The name of the user to authenticate with your Infor server
* **Password**: The password of the user authenticating with Nuxeo
* **Web Service URL**: The URL to you Infor server location
* **Tenant Name**: The container for accounting entities and locations
* **Organization**: Infor Organization name
* **Organization Code**: Infor Organization Code

###### Discovery Connector

**Discovery Instance Configuration Fields**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

**Infor Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Infor Authentication

###### Job Configuration

* **Infor Query**: When using Infor as a repository during an Integration job you can add a query to the Job to limit the files being integrated.

###### Content Service Connection

**Content Service Connection Fields**

* Delete Object by ID
* Get Object Properties
* Get File Content
* Update Properties

##### JDBC

Java Database Connectivity is an application programming interface for the programming language Java, which defines how a client may access a database. It is a Java-based data access technology used for Java database connectivity. It is part of the Java Standard Edition platform, from Oracle Corporation.

Java Tutorial: [JDBC Basics](https://docs.oracle.com/javase/tutorial/jdbc/basics/index.html){:target="_blank"}

Click the following link to see an example of this set up process using JDBC as the repository connector and BFS as the Output connector. JDBC to BFS Oracle Integration

###### Authentication Connection

This connector works for any Database that accepts JDBC connections. It requires knowledge of which JDBC Driver you will be using, as well as the specific connection parameters to your JDBC Instance. These can vary greatly by system.

**JDBC Authentication Connection Configuration**

* **Name**: Unique name for this auth connector.
* **Username**: The Username of the user to authenticate with to the JDBC DB Instance.
* **Password**: The password associated with the above username.
* **JDBC URL**: The Full JDBC URL to connect to. Required.
* **JDBC Driver**: The JDBC Driver to use, based on the DB you are connecting to.
  * Use the table below to find and retrieve the jar file for your database, and place it in the tomcat/lib folder
  
JDBC is a widely used protocol, and has not been tested with every system on this list.

###### Drivers

| DBMS | Driver class | Library name |
| ---|---|--- |
| PostgreSQL | org.postgresql.Driver | postgresql-42.2.8.jar (exact name depends on the driver version) <https://jdbc.postgresql.org/download.html> |
| Firebird SQL | org.firebirdsql.jdbc.FBDriver | firebirdsql-full.jar <http://www.firebirdsql.org/> |
| H2 Database Engine | org.h2.Driver | h2.jar [http://www.h2database.com](http://www.h2database.com/) |
| HSQLDB | org.hsqldb.jdbcDriver | hsqldb.jar [http://hsqldb.sourceforge.net](http://hsqldb.sourceforge.net/) |
| Apache Derby | org.apache.derby.jdbc.EmbeddedDriver | derby.jar <http://db.apache.org/derby/> |
| IBM DB2 | com.ibm.db2.jcc.DB2Driver | db2jcc4.jar <https://www.ibm.com/support/pages/db2-jdbc-driver-versions-and-downloads> |
| IBM DB2 for iSeries | com.ibm.as400.access.AS400JDBCDriver | jt400.jar <http://jt400.sourceforge.net/> |
| Teradata | com.teradata.jdbc.TeraDriver | terajdbc4.jar <http://www.teradata.com/DownloadCenter/Forum158-1.aspx> |
| SQL Server (Microsoft driver) | com.microsoft.sqlserver.jdbc.SQLServerDriver | mssql-jdbc-6.2.2.jre8.jar (exact name depends on the driver version) <https://github.com/Microsoft/mssql-jdbc> |
| Oracle | oracle.jdbc.OracleDriver | ojdbc8.jar <http://www.oracle.com/technetwork/database/features/jdbc/index-091264.html> |
| MariaDB | org.mariadb.jdbc.Driver | mariadb-java-client-1.3.6.jar (exact name depends on the driver version) <https://downloads.mariadb.org/connector-java/> |
| MySQL | com.mysql.jdbc.Driver | mysql-connector-java-5.1.36-bin.jar (exact name depends on the driver version) <http://www.mysql.com/downloads/connector/j/> |

###### Discovery Connector

**JDBC Discovery Connector Configurations**

* **Name**: A name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: JDBC Authentication Connector
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.
* **Table Types**: Types of tables delimited by comma to retrieve. Normal values are TABLE,VIEW,SYSTEM TABLE,GLOBAL TEMPORARY,LOCAL TEMPORARY,ALIAS,SYNONYM. The default value and the one used mostly is TABLE
* **Driver**: JDBC Driver class (i.e.com.mysql.jdbc.Driver)
* **Catalogue**: Enter text to narrow results or leave blank to not use Catalogue in Discovery.
* **Schema Pattern**: Must match the schema name as it is stored in the database. Enter a single space to discover those without a schema. Leave blank if you do not want to use the schema name to narrow the search.
* **Table Name Pattern**: Enter % to search for all tables or enter text to match against.

###### JDBC Integration Connection

Your JDBC Integration connection allows Federation Services to input and output data to and from your JDBC repository.

The Output Connection will push records, metadata, and permissions into the target repository. They also handle deleting content in sync mode. These connectors output files, folders, metadata, versions and renditions to the output system associated with this connector. Every Output Connector can define custom fields that it needs to be able to connect and write to the repository. These fields are defined during the development of the individual connectors.

The Repository Connector allows organisations to read from Repositories using a Java Database Connectivity (JDBC) technology. This means that using Federation Services and your JDBC Driver of choice, you can connect to many repositories to retrieve data and content.

**JDBC Integration Connection Configuration** 

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it.
* **Authentication Connection**: Your JDBC Auth connection

###### JDBC Job Configuration

**JDBC Processor Config**

The JDBC Connector uses different processors which process results in different ways. Some fields will only function with certain processors.

* **SQL Query**: The SQL Query to run.
* **Failed ID**: Only works for the Failed ID JDBC Processor (See below)
* **ID Field**: The field to use as the source repository id
* **Fetch Size**: Refers to how many rows to fetch from the data source at one time. Default is 10.
* **Input Directory**: This is for processors where metadata is in the database but the binary content files are on the filesystem. This would be the root directory of the files. You can leave blank if not needed.
* **Output Directory**: Some processors needs a place to safely store files while doing conversions and processing. This is such a place. You can leave blank if not needed.
* **Internal Queue Size**: Records to queue before halting read from the data source. Once records fall below the internal queue size, reading will resume.
* **Include Content**: Check to include content or un-check to exclude content and only retrieve metadata.
* **Processor Class**: The Processor Class is a registered Spring Bean and is used to process the ResultSet.

Currently, there are two processors included out of the box:

**Default JDBC Processor**

The default processor runs a query and will convert the table rows into processable documents. It does not use the start and end times configured in the **Details **tab. In order to filter on date fields, you will need your own WHERE clause.

**Failed ID Processor**

The Failed ID processor is used for running errors. It is run for each failed document ID and offers the following parameter to insert the id into your failed ids query.

`${DOC_ID}`

So an example of a failed ID query would be

`SELECT * FROM MYTABLE WHERE OBJECTID = '${DOC_ID}'`

**Output Specification**

* **JDBC Output Table Name**: This field is the name of the table to output items to. Required if not using Auto Create (If not set, and Auto Create is used. The Job Name will be used instead).
* **JDBC Output Key**: The unique key to find/set/update in the table. Required if not using Auto Create.
* **Catalogue**: The Catalogue (Or Domain) of the JDBC Instance to connect to. Required if not using Auto Create.
* **Schema**: The Schema (Or Database/NameSpace) of the JDBC Instance to connect to. Require for Output.
* **Binary Column Name**: The name of the column where document binaries will be sent to if "Include Binaries" is checked in the job configuration.
* **Auto Create**: See below
* **Quote Identifier**: If there are spaces in your table names, catalog names, schema names or column names, enter a quote identifier. For example, SQL Server and Oracle use a double quote ". MySQL uses a backtick `

> **Important:** Use extreme caution when using this field. The Default for this field is False. If Checked it will only use the Table Name, Schema Name, and Binary Column Name fields from this tab.

###### Content Service Connection

This section covers the JDBC specific configuration of the Content Service Connector.

**Configuration Fields**

This section covers the JDBC specific configuration of the Content Service Connector.

* **JDBC Table Name**: Database table name.
* **Schema**: Database schema name.
* **Catalogue**: Database catalog name.
* **ID Field**: The primary key column to use as the unique ID (expecting an auto generated (i.e. auto increment)) field.
* **Name Property**: The column to use as the "document name". This field should not be left blank.
* **Created Date Property**: The column to use as the "document created date". This field should not be left blank.
* **Modified Date Property**: he column to use as the "document modified date". This field should not be left blank.
* **Binary Property**: The column to use as the file content. This field can be left blank.
* **Root Version Id Property**: If the entities in the table track versions, this should provide the column that contains the root version id. This field can be left blank.
* **Is Latest Version Property**: This field is only used if the Root Version Id Field is populated. This field can be left blank only if the Root Version Id Field is also blank. If the entities in the table track versions, this should provide the column that contains whether the version is the latest (as a boolean).
* **Major Version Label Property**: This field is only used if the Root Version Id Field is populated. This field can be left blank. If the entities in the table track versions, this should provide the column that contains the major version portion of a version label.
* **Minor Version Label Property**: This field is only used if the Root Version Id Field is populated. This field can be left blank. If the entities in the table track versions, this should provide the column that contains the major version portion of a version label.
* **Quote Identifier Property**: If there are spaces in your table names, catalog names, schema names or column names, enter a quote identifier. For example, SQL Server and Oracle use a double quote ". MySQL uses a backtick `

**Supported Methods**

* Create File
* Delete Object By Id
* Get File Content
* Get Object Properties
* Update File
* Update Properties

###### Advanced Topic: Connecting to a Microsoft Access Database

To use an Access database you'll need a JDBC Driver [here](http://ucanaccess.sourceforge.net/site.html){:target="_blank"}

You will need to install the jars in the 3sixty-admin web app. [This post](https://stackoverflow.com/questions/21955256/manipulating-an-access-database-from-java-without-odbc/21955257#21955257){:target="_blank"} tells you the jars you will need:

Place them into `3sixty-admin/WEB-INF/lib`

After installing the jars you should be able to start Federation Services and use the JDBC connector as per usual.

**Example JDBC to BFS Oracle Integration**

This process will walk you through setting up an integration from a JDBC Repository to a BFS Output system.

1. **Create a JDBC Auth Connector**:

For Oracle there are a couple of things to note:

* The username must be all caps
* The SID/Schema must be all caps as well
* The username can be different from the Schema name, but obviously needs permissions to that Schema.
* Note the Driver class

2. **Create a JDBC Discovery Connector**:

Set the authentication connector to be the auth connector created above. For Oracle, the above will get all objects in your database.

Trouble Shooting:

Remove any ojdbc jar file from the 3Sixty-admin/WEB-INF/lib directory and put in the ojdbc jar for your Oracle version. For Oracle 12c as an example that would be ojdbc8.jar.

The schema pattern should be set to the schema you want. Oracle seems to hang if you leave that field blank.

Table types can be a comma delimited list of the following:

* TABLE
* VIEW
* SYSTEM TABLE  
* GLOBAL TEMPORARY  
* LOCAL TEMPORARY  
* ALIAS  
* SYNONYM

3. **Create an integration connector for JDBC**:
4. **Create an integration connector for BFS. **NOTE**: BFS does not have an authentication connector.
5. **Create a job with the repo connector** as your jdbc integration connector and the output connector as your BFS integration connector:
6. **Edit the BFS Tab**:
Chose your output folder path that must exist ahead of time. Check the **Include Un-Mapped Properties **check box. Leave the rest as the default like the above picture.
7. **Edit the JDBC Tab**:

::: Configuration Some things to note about this configuration:

  1. You should test your query using SQL Developer. This will allow you to get your query correct before testing it in Federation Services
  2. Notice how ABC_PLAN_id is in quotes in the query? That's because in this instance that field won't work unless its in quotes. Both SQL Developer and Federation Services will throw and error.
  3. The ID Field must be unique and is used as the file name. See the image below to see how this shows up in BFS Output
  4. The query should list the fields you want. Select * is not intended to work.
  5. The query cannot end with a ; or it will fail.
  6. Fetch Size can be modified to improve performance

This is what the BFS Output looks like for this query. It returns one row, and the id was the number 1.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>--No Comment---</comment>
<entry key="ABC_PLAN_id">1</entry>
<entry key="folderpath"></entry>
<entry key="PLAN_YEAR_NBR">12.45</entry>
<entry key="type">cm:content</entry>
<entry key="PLAN_YEAR">2004</entry>
<entry key="separator">,</entry>
</properties>
```

The above xml is an example of the properties that were output for this job.

You'll notice the fields come over as is with no prefix. PLAN_YEAR won't have a type associated with it. When you see this, you can fix it by modifying your query like the following:

select "ABC_PLAN_id" as "mytype.abc_plan_id", plan_year as "mytype.plan_year", plan_year_nbr as "mytype.plan_year_nbr" from abc_plan

The new query results in a xml file that looks like the following:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
<comment>--No Comment---</comment>
<entry key="folderpath"></entry>
<entry key="mytype.plan_year_nbr">12.45</entry>
<entry key="mytype.abc_plan_id">1</entry>
<entry key="type">cm:content</entry>
<entry key="mytype.plan_year">2004</entry>
<entry key="separator">,</entry>
</properties>
```

But the file is named: default_document_name.doc.metadata.properties.xml

This is because we changed the ID Field in the query, but not in the ID Field in the form. Now if we update it like the following:

You'll see the file name is back to: 1.metadata.properties.xml

Now that you have this working with BFS you can create your mappings to match what you want in the output system. You can map mytype in this case to the output type you want. You can then map the mytype fields to the fields of the new type.

8. **Run the JDBC to BFS Job** to finish the integration process

##### Jira Cloud and On Premise

The Jira connector is available for any Jira instance that uses version 2 or 3 of the JiraREST API. There are 2 ways to connector to Jira. However, the authentication method depends on whether you're connecting to an on premise instance of Jira or a cloud based instance of Jira.

There are 2 ways to connector to Jira. However, the authentication method depends on whether you're connecting to an on premise instance of Jira or a cloud based instance of Jira. OAuth Authentication for Cloud Jira requires an app to authenticate and interact with. The other parameters are required to specify the project you plan on interacting with.

###### Jira Cloud App Configuration

Please visit [developer.atlassian.com/apps](https://developer.atlassian.com/){:target="_blank"} to create an app. Once you create your app you'll need to collect a bit of information and do some configuration.

You'll need to configure the Authorisation code grant callback URL to your Federation Servicestion Services instance.

Currently, the Jira connectors only support interactions with one Project at a time. The app must have full/admin level access to the Jira instance. You'll need to add all the APIs listed below in order for this connector to work.

From there you configure the APIs to include all permissions.

###### Authentication Connection

There are 2 ways to connector to Jira. However, the authentication method depends on whether you're connecting to an on premise instance of Jira or a cloud based instance of Jira.

**Jira Cloud OAuth**

JIRA CLOUD  
This Connector is for a Cloud instance of Jira only. It interacts with Jira through the Rest API version 3.O Auth Authentication for Cloud Jira requires an app to authenticate and interact with. Follow the steps above to set up your cloud app.
**Important:**SSL REQUIRED  
You will ALWAYS need to enable SSL on your Federation Services instance in order to use OAuth 2.0 for Authorisation. In this case, you would replace the localhost with your Federation Services server host and replace the 9443 with your port (if you're not using a publicly facing DNS).

**Name**: Unique name for this auth connector.

* **Client ID**: Client ID from the Application you set up in the Atlassian App Management area earlier.
* **Client Secret**: Secret from the Application you set up in the Atlassian App Management area earlier.
* **Cloud Domain**: The Domain of the Jira Cloud instance you wish to connect to without atlassian.net connected to it. The example should help explain.
* **Jira Project Key**: The Project Key associated to the Project in Jira you would like to interact with.

Click **Authenticate** and to complete the process.

**Jira On Premise Basic**

LIMITATIONS  
Currently, the Jira connectors only support interactions with one Project at a time. The user must have full/admin level access to theJira instance.  
  
This Connector is for the on premise instance of Jira only. It interacts with Jira through the Rest API version 2, and was tested on version 7.6.2.

Basic Authentication for on premise Jira just requires a Username and Password to authenticate. The other parameters are required to specify the project you plan on interacting with.

* **Name**: Unique name for this auth connector.
* **Username**: Username of the user Jira will Authenticate with.
* **Password**: Password for the user Jira will Authenticate with.
* **Server Url**: The URL of the On Premise Jira Server to connect to. **Must** include protocol (http or https) in the url.
* **Jira Project Key**: The Project Key associated to the Project in Jira you would like to interact with.

###### Discovery Connector

**Discovery Instance Fields**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: Your Jira Auth connection. Either Cloud or Basic
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well.
  * So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.

###### Integration Connection

The Jira Integration connection is designed to write Issues and their associated metadata into a specified Jira project, and conditionally create the Project if it does not exist. This connection will also allow Federation Services to retrieve Issues and their associated metadata from Jira. Utilising the Jira REST APIs (v2 for On-Premise and v3 for Cloud), the Jira Integration Connection allows the user to obtain Issues, Issue Attachments, Issue Comments, and Issue Components within the project specified in the Authentication connector. Click here for more information on setting up an integration connection.

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: The Authentication connector to use based on your Jira instance type, and will be used to determine Project configuration information.

###### Job Configuration

**Jira JQL Query**
**Jira JQL Query**: The **Optional** JQL Query for narrowing down Issues. For more information on JQL visit this site.

**Output Specification**

* **Create Project in Jira if it doesn't exist?** - This field will allow jobs to know whether to create the project (based on the Project Key provided) in Jira if it does not already exist, and allows you to define values for project creation that are required by Jira.
* **Default Project Name**: The Default Name for Projects created that don't exist for output
* **Default Project Lead**: The Default Username (not user account ID) for Project Lead created that don't exist for output.
* **Default Project Type Key**: The Project type key which dictates the application-specific feature set that don't exist for output
* **Default Project Template Key**: The Project template key which is a prebuilt configuration for a project that don't exist for output

> **Tip:** Type key and Template key must "Match". if You don't know which type/template key to match, we suggest type key "business" and template key "com.atlassian.jira-core-project-templates:jira-core-project-management.

###### Content Service Connection

**Supported Methods**

* Create File
* Delete Object By Id
* Get File Content
* Get Object Properties
* Get Types
* Get Type Definition
* List Folder Items

##### Meridio

Meridio is a worldwide provider of enterprise Document and Records Management (eDRM) software, built for Microsoft .NET platforms.

NOTE  
Content Service Connection is not available for Meridio

###### Authentication Connection

The Meridio Auth Connector is the only way to provide Meridio authentication parameters to your Meridio Repository and Discovery Connector.

**Authentication Fields**

* **Name**: This is a unique name given to the connector instance upon creation.
* **Username**: The username to authenticate with the repository.
* **Password**: The password to authenticate with the repository.
* **WebService URL**: URL of the Meridio DMWS service location. This will typically be **http://(your.meridio.domain)/DMWS/MeridioDMWS.asmx**
* **Workstation Name**: Workstation name to be used with webservice calls

###### Discovery Connector

**Discovery Instance Configuration Fields**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

**Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.

###### Job Configuration

* **File Path**: The folder where the files will are stored
* **Party ID** 

##### Mobius

ASG Mobius Content Services (Mobius) provides you with a modern, scalable content services platform enabling you to improve collaboration, reimagine and automate content-rich business process, eliminate information silos and mitigate compliance risks.

###### Authentication Connection

Mobius connections require a Mobius Auth Connection to function. Authentication connectors are used to authenticate repository/output connections that need certain authentication fields like access tokens or refresh tokens.

**Mobius Authentication Fields**

**Name:** Connection name
**User Name:** Username to authenticate with.
**Password:**Password to authenticate with.
**Server URL:**URL of the Mobius service location
**Admin Username:**Username for Mobius Admin App
**Admin Password:**Password for Mobius Admin App

###### Discovery Connector

**Discovery Instance Configuration Fields**

* **Name**: Unique name for your connector
* **Authentication Connection**: Select the auth connector for this discovery
* **Ignore Types (comma delimited list)**: Chose document types to ignore when running discovery

###### Integration Connection

The Mobius Integration Connection has no configuration as we use a Federation Services Auth Connector for authentication parameters. You will just need to apply your pre-configured Mobius Auth Connector to the Mobius Output Connector.

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: The Mobius Authentication connection that you want to use.

###### Job Configuration

A Federation Services Job is the process of moving or syncing content (including versions, ACL's, metadata) from one CMS (content management system) to another.

* **Repository Connection Configuration**: No additional configuration needed to use Mobius as an Repository source

**Output Specification**

* **Repository Name**: Mobius Repository Name (ie 'Mobius')
* **Include Un-Mapped Properties**: All metadata will be output, even if no mappings are supplied. These values will be applied as global properties to the file.

##### Nuxeo

Nuxeo is a software company making an open source content management system.  
[More info on Nuxeo](https://doc.nuxeo.com/){:target="_blank"}

###### Authentication Connection

The Nuxeo Authentication Connector contains configuration to authenticate with a Nuxeo server for discovery, content sourcing, and content output. The Nuxeo Auth connector, like the other Nuxeo connectors, leverages Nuxeo's Java Client to communicate with your Nuxeo server.

**Configuration Options**

* **Name**: The name of the connector.
* **Nuxeo Username**: The name of the user to authenticate with Nuxeo
* **Nuxeo Password**: The password of the user authenticating with Nuxeo
* **Nuxeo URL**: The url to the **Nuxeo ******endpoint
* **Use Caching**: (required) Should the client use caching when making authentication requests?
* **Session Timeout**: Maximum session timeout in ms
* **Transaction Timeout**: Maximum transaction timeout in ms
* **Nuxeo Provider ID**: The provider ID set in the Nuxeo's configuration for MIP (Manage-in-place/ Content federation).

###### Discovery Connector

**Discovery Configuration with Auth**

If you have created your Nuxeo Authentication Connector you can use it to facilitate Discovery by filling in the following fields.

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connector**: Select yourNuxeo Authentication Connector.
* **Collection**: The name of your Mongo DB collection

###### Integration Connection

The Nuxeo Integration configuration only requires you to set an Authentication connection.

Also note that you can connect to a Nuxeo server using a CMIS repository connector and CMIS authentication connector as well. Provided are links to theCMIS Repository connector documentation and theCMIS Authentication connector documentation.

In the Server settings of the CMIS connector, your server for an Atom binding will look like as follows:(NUXEO_SERVER)/nuxeo/atom/cmis

**Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Nuxeo Authentication

###### Job Configuration

Setting the Nuxeo query is done on a job by job basis. If a job has a Nuxeo repository set, a Nuxeo Query tab will appear at the top of the job for configuration.

###### Content Service Connection

The Nuxeo Content Service Connection provides a full ECM API for interacting with files, folders, metadata, versions, and renditions. This includes functionality like check in, upload new files, modify metadata, upload new versions, create folders, etc...

**Basic Configurations**

* **Connector ID**: A unique identifier for this connection i.e. simflofy_demo (Alphanumeric, dashes and underscore characters only)
* **Description**: The text that will be displayed on drop-downs etc. to identify this connection.
* **Type**: The type of Search Connection (Solr, Mongo, Alfresco Faceted etc.)
* **Connection URL**: Your server's web address
* **Security Mode**: This is how to authenticate with the back-end search
* **Username**: to authenticate with
* **Password**: Password to authenticate with
* **Configuration Parameters**: Extra parameters that can be passed to the content service connection and vary by connection. See the section on extra query parameters below.

**Connection Configuration**

A query_fq configuration param lets you define facet queries behind the scene. This is done to provide limited views or subsets of data in the search. Essentially you could create any number of views on the same date but each view would display different results. This can also be used in a role base system where you have views setup for specific user roles.

The syntax is:

```text
query_fq for the first one
query_fq1 for the second
etc.
```

Unless the fq is already encoded, you will need to wrap it in the encode() function where it will be URLEncoded UTF-8.

**Supported Methods**

* Create File
* Create Folder
* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Id By Path
* Get Object Properties
* Get Types
* Get File Item
* List Folder Items
* Update File
* Update Properties

##### OpenText Content Server

OpenText Content Server is the core content repository and foundational document management technology for the OpenText Enterprise Content Suite, giving control over documents and business content across the enterprise by securing and storing it throughout its life cycle. [More info on OpenText](https://www.opentext.com/){:target="_blank"}

Content Service Connection is not available for OTCS

###### Authentication Connection

* **Name**: The name of your CMIS authentication connector
* **Username**: Username to authenticate with.
* **Password**: Password to authenticate with.
* **Server URL**: URL of the OpenText service location

###### Discovery Connector

**Discovery Instance Configuration**

* **Name**: Unique Name for the Discovery Connection to identify it in the UI.
* **Authentication Connection**: No auth connection needed for OTCS
* **Username**: The username to authenticate with the OTCS repository.
* **Password**: The password to authenticate with the OTCS repository.
* **Collection**: Each discovery connection version will have its own MongoDB collection to store its report, this field will show you the name of that collection.
* **Ignore Types**: Comma delimited list of types to ignore. Note that you can have regex as well. So to ignore all types with "workflow" in the name, you would enter(.)workflow(.) into the ignore types textbox.
* **Collection URL**: The ful lURL leading to your OTCS endpoint

###### Integration Connection

**Integration Connection Fields**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Your OpenText auth connection

###### Job Configuration

**Output Specification**

* **Output Folder Path**: The path of the output root folder

**Repository Paths**

* **File Path**: The path of the root repository folder

##### Oracle

Oracle WCC is a platform that supports digital content management and search across multiple integrated platforms including Microsoft Office and Windows Explorer.

###### Authentication Connection

> **Note:** ACCESS  
The authenticating user will need at least read access to migrate content.

* **Username**: The username of the Oracle WCC user you will be authenticating with
* **Password**: The password of the Oracle WCC user you will be authenticating with
* **CGI URL Path**: The URL to your CGI endpoint for your Oracle WCC server. Here is Oracle’s documentation on obtaining the CGI path.

###### Integration Connection

This connector currently only operates in repository (read) mode

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better
* **Authentication Connection**: Your Objective Auth Connection

###### Job Configuration

* **Oracle WCC Search Query**: The search query to run on WCC and return documents with. This is formatted in the Universal Query syntax. No need to add modified dates as it is applied by the job automatically based on the set job start and end date times. Using the Query Builder Form in Oracle WCC is an easy way to construct these queries.
* **Get Versions**: When checked, additional versions of a document from Oracle WCC will be added to the repository document to be migrated. When unchecked, only the latest version of a document is migrated.

##### Salesforce

Salesforce.com, Inc. is an American cloud-based software company headquartered in San Francisco, California. It provides customer relationship management service and also provides a complementary suite of enterprise applications focused on customer service, marketing automation, analytics, and application development.

###### Authentication Connection

The Authentication connection configuration is simple as it only contains three parts.

* **Username**: User id for the account you're accessing from. This is usually in the form of an email address, but could vary.
  * example: `me@mydomain.com`
* **Password**: Your password is a combination of your normal password and the security token for your account. If you have not created a security token, follow the steps here. The format of your password should be (user password)(token). So if your password is 1234 and my token is `hjdu2983`, you will enter `1234hjdu2983` into the password field.
  * example: `1234hjdu2983`
* **Server URL**: This is the url that points to your instance of Salesforce.
  * example: `https://nt89.salesforce.com`

###### Discovery Connector

The Salesforce Discovery Connector allows a user to connect to their Salesforce domain and extract information about available data types and metadata.

**Discovery Configuration**

* **Name**: Give your connector a name.
* **Authentication Connector**: Select your Salesforce Authentication Connector
* **Ignore Types**: (Optional) A comma delimited list of types to ignore.

###### Integration Connection

The Salesforce Integration Connection allows you to retrieve information and documents using [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm){:target="_blank"}
, Salesforce's object query language.

Federation Services currently supports version **26.0** of the [Salesforce SOAP API](https://developer.salesforce.com/docs/atlas.en-us.api.meta/api/sforce_api_quickstart_intro.htm){:target="_blank"}
.

**Salesforce Integration Connection Configuration**

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: Your FileNet Auth Connector

###### Job Configuration

**Salesforce Repository**

* **Default Name Field **: This field will be used to extract the document name from the columns of data. It should be formatted {type}.{field}.
  * **Example**: `Account.Name` when selection FROM Account
  * **Example**: `ContentVersions.Title` when selecting from ContentVersions
* **SOQL Query**: The query to run against Salesforce. All fields that you intend to extract or map should be included in this query.
  * **Example**: `SELECT AccountNumber,BillingCity,CreatedById,CreatedDate,Id,LastModifiedDate,Name,OwnerId FROM Account`
  * Test your query using the [Salesforce Workbench](https://workbench.developerforce.com/login.php){:target="_blank"} tool.
  * See Salesforce documentation on [SOQL](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm){:target="_blank"}
  

**Salesforce Output**

Salesforce output is not currently supported.

TIME BASED QUERIES  
In order to use the start and end time configured on the jobs, the variables `[starttime]` and `[endtime]` must be included in the query.
*The **ID** for the object is required and must be included in the query.

CONTENT  
Currently, this connector can only retrieve Attachments and ContentVersions. In order to retrieve Content Versions you must query them directly. Here's an example query that will retrieve the standard Federation Services metadata:  
  
`Select Id,ContentDocumentId,ContentUrl,Description,FileType,PathOnClient,Title,ContentModifiedById,ContentModifiedDate,CreatedDate,ContentSize from ContentVersion`

###### Content Services Connection

This section covers the SalesForce specific configuration of the Content Service Connector.

The only configuration required for this connector is the Salesforce Authentication Connector.

**Supported Methods**

* Create File
* Create Folder
* Create Version
* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Id By Path
* Get Object Properties
* Get Type
* Get Type Definition
* Get Version Content
* Get Version Properties
* List Versions

##### ServiceNow

ServiceNow is a platform-as-a-service provider, providing technical management support, such as IT service management, to the IT operations of large corporations, including providing help desk functionality.  
[More info on ServiceNow](https://www.servicenow.com/){:target="_blank"}

> **Info:** Federation Services is compatible with ServiceNow Kingston versions or later.

###### Authentication Connection

* **Name**: Name of your ServiceNow Authentication Connector
* **Username**: The user ID that will be used to access the ServiceNow instance.
* **Password**: The password for the corresponding user.
* **ServiceNow Instance URL**: The URL of your ServiceNow instance.
* **ServiceNow Table**: The name of the ServiceNow table that content will be processed from.

###### Integration Connection

The ServiceNow Integration Connection turn records into Federation Services Repository Documents, or a subclass. This is Federation Services's representation of a record, its metadata, its versions, its binaries, and its permissions. This connector only support repository (read) mode
* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connection**: Your ServiceNow Auth connection

###### Job Configuration

**ServiceNow Query Parameters:**

By default, your job will use the start and end times (located under the **Details** tab) in your ServiceNow Query. If you would like to add additional query parameters, you may do so by entering them in the ServiceNow Query Parameters field. These parameters will be appended to the query that is being used to retrieve content from your ServiceNow instance. You can simply use the ServiceNow name-value pairs to further filter your result set.
**Example**: `&active=true,&state=closed` or `&active=true&assigned_to=john.smith`

###### Content Service Connection

This connector supports the following methods

*Create File*

Get File Content *Get Object Properties

##### Twitter

###### Registering a Twitter App

To use the Twitter API you will need the following:

* A Twitter Account
* A phone number must be added to this account

Get a Developer Account, by [clicking "Sign Up" here](https://developer.twitter.com/){:target="_blank"}
you will be asked to create a project and a development app during this process. Twitter may offer you your API Key, Secret, and Bearer Token as this point. Save them for later. With all that done, you should see a dashboard.

Once that's done, you can gather your Consumer Keys. You can do so by clicking the Key icon next to your app's name. This will take you to a **Keys and tokens** tab.

Click the black button to the right of "API Key and Secret" to generate and retrieve your consumer keys.

Back in the dashboard, you may have noticed where the word **Essential**. This is a new tiered access structure which controls which types of searches your app can perform. You will need to apply for **Elevated **access in order for Federation Servicestion Services to read Tweets. On the right-hand side of the dashboard, you should see an offer to apply for Elevated access. Fill in the required information, and when it asks why you need access, use the following:

We are performing a migration of a user's twitter data, and the tool we use only works with Twitter's v1.1 APIs. So, we will need elevated access in order to retrieve the user's tweets and attached metadata.

Answer "No" to the following questions. Access is usually granted within a few hours, but it may be as long as a day.

###### Authentication Connection

The fields required are the four pieces of information you retrieved while creating your app

* Consumer Key
* Consumer Secret Key
* Access Token
* Access Token Secret

BEARER TOKEN  
While it is not a requirement currently, Federation Services may require it in the future to use certain features of Twitter's APIS

###### Discovery Connector

The Twitter Discovery Connector only supports one type right now and that is a Tweet. No auth connection needed, but you will need to run it the first time to generate the Tweet type.

###### Integration Connection

**Twitter Integration Connection Configuration**

The Twitter Repository Connector only works in repository (read) mode

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector**: Your Twitter Auth Connector

###### Job Configuration

* **Screen Names to Crawl, Comma Delimited**: Include the @ sign before each handle.
* **Max Tweet Pages**: By default, we will get 1 page of tweets from each handle. This should retrieve 20 tweets.
* **Get Tweets**: Enables retrieval of tweets

##### WebDav

WebDAV (Web Distributed Authoring and Versioning) is an extension of the Hypertext Transfer Protocol (HTTP) that allows clients to perform remote Web content authoring operations. WebDAV is defined in RFC 4918 by a working group of the Internet Engineering Task Force.

###### Authentication Connection

The WebDav Authentication connector will be used to connect to your WebDav source repository so that you can integrate your files with other sources.

**WebDav Authentication Fields**
* **Name**: Unique Connection Name
* **Username**: Username to authenticate with
* **Password**: Password to authenticate with
* **Server URL**: The URL of your Webdav Server

###### Integration Connection

Using Federation Services's WebDav authentication connection users can create integration jobs that will filter and move files from your WebDav source to another repository.

**Connection Configuration**
* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.

###### Job Configuration

When using WebDAV as the output connection you will see an additional tab titled Output Specification when setting up your job. This will allow Federation Services to integrate your files from your WebDav source into other sources

**Output Specification**

* **Output Folder Path**: FolderID of where the documents will reside within your WebDAV server

###### Content Service Connection

Content Service Connections define connections to specific repositories. Actions in the Content Services API or the Discovery web application perform actions against specific repositories.

**Basic Configuration Fields**

* Root Path:

**Supported Methods**
* Create File
* Create Folder
* Delete Folder
* Delete Object By Id
* Get File Content
* Get Object Id By Path
* Get Object Properties
* Get Types
* List Folder Items
* Update File

##### ZenDesk

The ZenDesk Connector is available for any ZenDesk instance that uses version 2 of the REST API.

###### Authentication Connection

> **Note:** The user must have full/admin level access to the ZenDesk instance.

There are 2 ways to connect to ZenDesk. However, the authentication method depends on whether you have OAuth enabled for ZenDesk or not. This Connector is for ZenDesk instances. It interacts with ZenDesk through the REST API version 2

* **Username**: Zendesk username
* **Password**: Zendesk password
* **Zendesk Sub Domain**: Zendesk Sub Domain (without the `.zendesk.com` attached (e.g. simflofy.zendesk.com becomes simflofy))

[Here is ZenDesk's document for registering an application](https://support.zendesk.com/hc/en-us/articles/4408845965210-Using-OAuth-authentication-with-your-application){:target="_blank"}. You will generate the ClientId and Secret from this process.

* **Name**: Unique name for this auth connector.
* **Client ID**: App Client ID of the app Zendesk will Authenticate with.
* **Client Secret**: App Client Secret Key for the app Zendesk will Authenticate with.
* **ZenDesk Sub Domain**: Zendesk Sub Domain (without the .zendesk.com attached (e.g. simflofy.zendesk.com becomes simflofy))

###### Discovery Connector

* **Name**: Unique Name for the Discovery Connection to identify it in the UI
* **Authentication Connection**: The Zendesk authentication connection
* **Ignore Types (comma delimited list)**: Not applicable, as the connector only returns tickets

###### Integration Connection

* **Connection Name**: This is a unique name given to the connector instance upon creation.
* **Description**: A description of the connector to help identify it better.
* **Authentication Connector **- The Authentication connector to use based on your Zendesk instance type

###### Job Configuration

The Zendesk connector only has job configuration while in repository (read) mode. In output mode it will push tickets to the authenticated subdomain.

> **Tip:** Do not include date ranges as those are taken in by the start/end date of the Job configuration in the Details tab.

* **ZenDesk Query**: Written in the [Zendesk Query Language](https://support.zendesk.com/hc/en-us/articles/203663226){:target="_blank"}