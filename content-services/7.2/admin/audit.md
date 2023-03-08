---
title: Set up auditing
---

Content Services provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

## Overview

Auditing in Content Services is highly configurable. There are a number of components that interact with each other so that only the specific events that need to be audited are logged. This reduces the performance impact should auditing be required. The key components of the auditing system are described here.

The following diagram provides a basic overview of the auditing system:

![auditing-arch]({% link content-services/images/auditing-arch.png %})

Each of the components in the diagram are described in the following sections.

### Data Producer

A data producer generates data that can potentially be audited. Data is generated from repository services and methods and sent to the Audit Component by calling its `AuditComponent.recordAuditValues()` method. The only requirement is that each packet of data is a Map of values keyed by logical path names, relative to a specified root path. These paths are specific to the producers and thus identify the unique data producer. There are three main data producers:

1. `alfresco-api` - all low-level events such as workflow actions, user creations and deletions. It records all values before and after the method invocation for all services/methods using `org.alfresco.repo.audit.AuditMethodInterceptor`.

    The values passed to the audit component (assuming auditing is enabled) are:

    ```text
      /alfresco-api
         /pre
            /<service>
               /<method>
                  /args
                     /<arg-name>=<value>
                     /<arg-name>=<value>
                     ...
            /service
         /post
            /<service>
               /<method>
                  /args
                     /<arg-name>=<value>
                     /<arg-name>=<value>
                     ...
                  /result=<value>
                  /error=<value>
                  /no-error=<null>
    ```

2. `alfresco-access` - all content related actions, such as node create, move, delete, aspect add and remove, content read, content update, check in, check out, cancel, and so on. The class is `org.alfresco.repo.audit.access.AccessAuditor`. It creates high level audit records on the creation, deletion, modification and access of content and folders. Lower level events are grouped together by transaction and node.

    Node and Content changes generate the following audit structure. Elements are omitted if not changed by the transaction. The `/sub-action/<sequence>` structure holds details of each sub-action, but are only included if the global property `audit.alfresco-access.sub-actions.enabled=true`.

    ```text
      /alfresco-access
        /transaction
          /action=<actionName>
          /sub-actions=<sub action list>
          /path=<prefixPath>
          /type=<prefixType>
          /node=<nodeRef>
          /user=<user>
          /copy
            /from
              /node=<nodeRef>
              /path=<prefixPath>
              /type=<prefixType>
          /move
            /from
              /node=<nodeRef>
              /path=<prefixPath>
              /type=<prefixType>
          /properties
             /from=<mapOfValues>
               /<propertyName>=<propertyValue>
             /to=<mapOfValues>
               /<propertyName>=<propertyValue>
             /add=<mapOfValues>
               /<propertyName>=<propertyValue>
             /delete=<mapOfValues>
               /<propertyName>=<propertyValue>
           /aspects
             /add=<mapOfNames>
               /<aspectName>=null
             /delete=<mapOfNames>
               /<aspectName>=null
           /version-properties=<mapOfValues>
           /sub-action/<sequence>
             /action=<actionName>
             /move
               ...
             /properties
               ...
             /aspects
               ...
     Example data:
       /alfresco-access/transaction/action=MOVE
       /alfresco-access/transaction/node=workspace://SpacesStore/74a5985a-45dd-4698-82db-8eaeff9df8d7
       /alfresco-access/transaction/move/from/node=workspace://SpacesStore/d8a0dfd8-fe45-47da-acc2-fd8df9ea2b2e
       /alfresco-access/transaction/move/from/path=/app:company_home/st:sites/cm:abc/cm:documentLibrary/cm:folder1/cm:Word 123.docx
       /alfresco-access/transaction/move/from/type=cm:folder
       /alfresco-access/transaction/path=/app:company_home/st:sites/cm:abc/cm:documentLibrary/cm:folder2/cm:Word 123.docx
       /alfresco-access/transaction/sub-actions=moveNode readContent
       /alfresco-access/transaction/type=cm:content
       /alfresco-access/transaction/user=admin
       /alfresco-access/transaction/sub-action/00/action=moveNode
       /alfresco-access/transaction/sub-action/00/move/from/node=workspace://SpacesStore/d8a0dfd8-fe45-47da-acc2-fd8df9ea2b2e
       /alfresco-access/transaction/sub-action/00/move/from/path=/app:company_home/st:sites/cm:abc/cm:documentLibrary/cm:folder1/cm:Word 123.docx
       /alfresco-access/transaction/sub-action/00/move/from/type=cm:folder
       /alfresco-access/transaction/sub-action/01/action=readContent
    ```

    The trace output from this class may be useful to developers as it logs method calls grouped by transaction. The debug output is of the audit records written and full inbound audit data. However, for developers, trace will provide a more readable form. Set the following `dev-log4j.properties`:

    ```text
    log4j.appender.File.Threshold=trace
    log4j.logger.org.alfresco.repo.audit.access.AccessAuditor=trace
    ```

3. `alfresco-node` - used to audit/track `beforeDeleteNode` policy. The class is `org.alfresco.repo.node.NodeAuditor`.

### Audit Component

Receives data sent by the data producers. Data producers call the `AuditComponent.recordAuditValues()` method, passing in data. There are two main pieces of information passed in:

* Root path - a base path. This can be combined with the keys of the map (the other input) to create a full identifying path for the audit data.
* A map (keys and values) - the map passed in by the data producer. The map keys are paths (relative to the root path) and their values are the audit data. Note that if a value in the map has been rejected by an audit filter, then the whole map will be rejected.

    So, for an example root path of `/alfresco-access/transaction`, the map might be:

    |Key|Value|
    |---|-----|
    |action|MOVE|
    |node|workspace://SpacesStore/90a398d1-8e0d-462a-8c3b-f0b17a2d1143|
    |move/from/node|workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310|
    |move/from/path|/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1|
    |move/from/type|cm:folder|
    |move/to/node|workspace://SpacesStore/517bd4d0-99bc-47ad-8cd7-5d425f94c7db|
    |move/to/path|/app:company_home/st:sites/cm:fred/cm:documentLibrary|
    |move/to/type|cm:folder|
    |path|/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx|
    |sub-actions|moveNode readContent|
    |type|cm:content|
    |user|admin|

The `AuditComponent.recordAuditValues()` method creates an audit entry. The returned audit entry is a map with the key representing the full path to the value that represents the corresponding audit data.

To see an example of the map returned by `recordAuditValues()` consider the following example.
Given the root path and map shown:

```text
Root path:
   /alfresco-api/post/NodeService/createStore
Map:
   args/protocol = "workspace"
   args/identifier = "SpacesStore"
   result = StoreRef[workspace://SpacesStore]
```

The method would return a map as follows:

```text
Map:
   /alfresco-api/post/NodeService/createStore/args/protocol = "workspace"
   /alfresco-api/post/NodeService/createStore/args/identifier = "SpacesStore"
   /alfresco-api/post/NodeService/createStore/result = StoreRef[workspace://SpacesStore]
```

### Audit Service

The Audit Service provides a public Java API for interacting with the Audit Component. The JavaDoc (generated from the Java source code) for the AuditService API can be found [here](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/audit/AuditService.html){:target="_blank"}.

The AuditService is also exposed via a REST API. This is documented in more detail in the [Using the auditing REST API documentation](#usingauditrestapi).

### Audit Filters

Audit Filters filter the raw audit data so that only the required data proceeds further in the pipeline. While some audit filters are [provided by default](#auditconfigdefaults), you can override these default filters and create new audit filters by editing alfresco-global.properties. Audit Filters are described in more detail in the [Audit Filter documentation](#auditfilters).

### Data Extractor

Data Extractors extract the target information for the raw audit data packet - in other words they extract values from the raw data. Typically, given a node ref, the data extractor could extract data such as `siteName` (via a call to `SiteService`), node name, node type, and node properties. Out of the box data extractors provided include:

* Node Name
* Node Type
* Null
* Transparent (which returns the same value as it gets)

The classes in the source code are:

* `AbstractDataExtractor.java`
* `DataExtractor.java`
* `NodeNameDataExtractor.java`
* `NodeTypeDataExtractor.java`
* `NullValueDataExtractor.java`
* `SimpleValueDataExtractor.java`

See the source code here for details of data extractors provided out of the box `./projects/repository/source/java/org/alfresco/repo/audit/extractor/`.

### Data Generator

Unlike Data Extractors, which require an input (typically a node ref) to work with, Data Generators do not require an input. They are activated when an inbound mapped path is present, but they're not dependent on the value on that path. They can generate data purely from the system state and thread context. Out of the box data generators include:

* Authenticated Person
* Authenticated User
* System Time
* Transaction ID

The classes in the source code include:

* `AbstractDataGenerator.java`
* `AuthenticatedUserDataGenerator.java`
* `SystemTimeDataGenerator.java`
* `AuthenticatedPersonDataGenerator.java`
* `TransactionIdDataGenerator.java`
* `DataGenerator.java`

See the source code in directory `./projects/repository/source/java/org/alfresco/repo/audit/generator/` for out of the box data generators.

### Audit Configuration

Audit Configuration defines the Audit Application. The configurations define the data extractors, data generators, path mappings, and application configuration. You can see the [Audit Configuration documentation](#auditconfig) for more information.

### Audit Application

Multiple Audit Applications can be defined. Each audit application might handle the same raw audit data differently. For example, you might have some raw data that consists of a Node Ref, node properties, and an action. You might then have two Audit Applications, a `LoginAuditApplication` and a `SiteAuditApplication`. Audit Applications have recorded values as their output. So given the same initial event, the `LoginAuditApplication` would produce username and action as recorded values, whereas the SiteAuditApplication would produce site name and action as recorded values. So, the same raw data can be processed in different ways by different Audit Applications. An overview of this is provided in the following diagram:

![audit_details]({% link content-services/images/audit_details.png %})

### Data Storage

The final destination for the audit data - database tables.

**Summary of data flow**:

*Data stage*: Audit data passed to `AuditComponent.recordAuditValues()`

*Example*:

```text
Root path:
   /alfresco-api/post/NodeService/createStore
Map:
   args/protocol = "workspace"
   args/identifier = "SpacesStore"
   result = StoreRef[workspace://SpacesStore]
```

*Data stage*: If the root path passes the initial filtration phase - there is at least one component interested in auditing the information - then the map is expanded.

*Example*:

Expanded audit data:

```text
Map:
   /alfresco-api/post/NodeService/createStore/args/protocol = "workspace"
   /alfresco-api/post/NodeService/createStore/args/identifier = "SpacesStore"
   /alfresco-api/post/NodeService/createStore/result = StoreRef[workspace://SpacesStore]
```

*Data stage*: The filtered data is then passed through the path mappings, generating a new Map of data for each application.

*Example*:

Path-mapped audit data:

```text
Map:
   /MyApp/createStore = StoreRef[workspace://SpacesStore]
```

*Data stage*: This data is then passed to any extractors and generators to produce a final Map of data that will be persisted.

*Example*:

Persisted audit data:

```text
Map:
   /MyApp/createStore/value = StoreRef[workspace://SpacesStore]
   /MyApp/createStore/rootNode = NodeRef[workspace://SpacesStore/fd123...]
```

## Key tools and files {#keytoolsandfiles}

Some initial information on key tools and files to get you started.

### Content Services log file

The log file, alfresco.log, is found in the directory where Content Services is installed. Viewing audit log entries provides a useful way to get a feel for the auditing process.

### Global auditing configuration properties

Auditing configuration properties can be set in the `tomcat/shared/classes/alfresco-global.properties` file (requires server restart for properties to be applied).

### Log4J configuration

Log4J settings can be added in a file `tomcat/shared/classes/alfresco/extension/audit-log4j.properties` (you could copy `./tomcat/shared/classes/alfresco/extension/custom-log4j.properties.sample` and remove the `.sample`, or create the file from scratch).

To see what information is available to audit, enable the following logging:

```text
log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
```

This would generate logging (in alfresco.log) such as:

```text
15:55:26,590 User:admin DEBUG [repo.audit.inbound]
Inbound audit values:
    /alfresco-node/beforeDeleteNode/node=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79
15:55:26,748 User:admin DEBUG [repo.audit.inbound]
Inbound audit values:
    /alfresco-api/post/NodeService/deleteNode/no-error=null
    /alfresco-api/post/NodeService/deleteNode/args/nodeRef=workspace://SpacesStore/c4728f24-4a11-40f7-9062-315edf959d79
```

Example from copying a file:

```text
Inbound audit values:
    /alfresco-access/transaction/type=cm:content
    /alfresco-access/transaction/properties/add/cm:content=contentUrl=store://2015/12/7/16/30/b1bbb8ce-5d5f-47dc-be1d-1fa1542b2b60.bin|mimetype=application/pdf|size=381778|encoding=UTF-8|\
locale=en_US_|id=267
    /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf
    /alfresco-access/transaction/action=COPY
    /alfresco-access/transaction/properties/add/cm:name=Copy of Project Contract.pdf
    /alfresco-access/transaction/sub-actions=createNode createContent updateNodeProperties addNodeAspect copyNode createVersion
    /alfresco-access/transaction/copy/from/node=workspace://SpacesStore/1a0b110f-1e09-4ca2-b367-fe25e4964a4e
    /alfresco-access/transaction/aspects/add/cm:copiedfrom=null
    /alfresco-access/transaction/aspects/add/cm:titled=null
    /alfresco-access/transaction/version-properties/versionType=MAJOR
    /alfresco-access/transaction/version-properties={versionType=MAJOR}
    /alfresco-access/transaction/node=workspace://SpacesStore/6dd0021c-1e36-461c-9451-7e5ebfba00a1
    /alfresco-access/transaction/properties/add/cm:creator=admin
    /alfresco-access/transaction/properties/add/sys:store-identifier=SpacesStore
    /alfresco-access/transaction/properties/add/cm:modified=Tue Dec 15 12:42:54 GMT 2015
    /alfresco-access/transaction/properties/add/sys:locale=en_GB
    /alfresco-access/transaction/properties/add/sys:store-protocol=workspace
    /alfresco-access/transaction/properties/add/cm:autoVersion=true
    /alfresco-access/transaction/properties/add/cm:autoVersionOnUpdateProps=false
    /alfresco-access/transaction/properties/add/cm:modifier=admin
    /alfresco-access/transaction/copy/from/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Project Contract.pdf
    /alfresco-access/transaction/properties/add/cm:author=Alice Beecher
    /alfresco-access/transaction/properties/add/cm:initialVersion=true
    /alfresco-access/transaction/aspects/add/cm:versionable=null
    /alfresco-access/transaction/properties/add/sys:node-dbid=881
    /alfresco-access/transaction/properties/add={
        {http://www.alfresco.org/model/content/1.0}autoVersionOnUpdateProps=false,
        {http://www.alfresco.org/model/content/1.0}created=Tue Dec 15 1 2:42:54 GMT 2015,
        {http://www.alfresco.org/model/content/1.0}title={en_US=Project Contract for Green Energy},
        {http://www.alfresco.org/model/content/1.0}description={en_US=Contract for the Green Energy project},
        {http://www.alfresco.org/model/content/1.0}creator=admin,
        {http://www.alfresco.org/model/system/1.0}node-uuid=6dd0021c-1e36-461c-9451-7e5ebfba00a1,
        {http://www.alfresco.org/model/content/1.0}name=Copy of Project Contract.pdf,
        {http://www.alfresco.org/model/system/1.0}store-protocol=workspace,
        {http://www.alfresco.org/model/content/1.0}content=contentUrl=store://2015/12/7/16/30/b1bbb8ce-5d5f-47dc-be1d-1fa1542b2b60.bin|mimetype=application/pdf|size=381778|encoding=UTF-8|locale=en_US_|id=267,
        {http://www.alfresco.org/model/system/1.0}store-identifier=SpacesStore,
        {http://www.alfresco.org/model/system/1.0}node-dbid=881,
        {http://www.alfresco.org/model/system/1.0}locale=en_GB,
        {http://www.alfresco.org/model/content/1.0}versionLabel=1.0,
        {http://www.alfresco.org/model/content/1.0}modifier=admin,
        {http://www.alfresco.org/model/content/1.0}modified=Tue Dec 15 12:42:54 GMT 2015,
        {http://www.alfresco.org/model/content/1.0}autoVersion=true,
        {http://www.alfresco.org/model/content/1.0}initialVersion=true,
        {http://www.alfresco.org/model/content/1.0}author=Alice Beecher
    }
    /alfresco-access/transaction/properties/add/cm:description={en_US=Contract for the Green Energy project}
    /alfresco-access/transaction/aspects/add/cm:author=null
    /alfresco-access/transaction/properties/add/cm:versionLabel=1.0
    /alfresco-access/transaction/copy/from/type=cm:content
    /alfresco-access/transaction/properties/add/sys:node-uuid=6dd0021c-1e36-461c-9451-7e5ebfba00a1
    /alfresco-access/transaction/properties/add/cm:created=Tue Dec 15 12:42:54 GMT 2015
    /alfresco-access/transaction/properties/add/cm:title={en_US=Project Contract for Green Energy}
    /alfresco-access/transaction/user=admin
    /alfresco-access/transaction/aspects/add=[{http://www.alfresco.org/model/content/1.0}versionable, {http://www.alfresco.org/model/content/1.0}copiedfrom, {http://www.alfresco.org/model\
/content/1.0}author, {http://www.alfresco.org/model/content/1.0}titled]
```

> **Note:** A large number of log entries will be generated in `alfresco.log`.

To see which data is being produced, rejected or recorded, switch DEBUG for:

```text
log4j.logger.org.alfresco.repo.audit.AuditComponentImpl=DEBUG
```

This will result in entries such as:

```text
2015-12-15 12:50:39,476 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-8]
Extracted audit data:
    Application:    AuditApplication[ name=AuditExampleLogin1, id=4, disabledPathsId=3317]
    Values:
        /auditexamplelogin1/loginAsGuest/args=null
        /auditexamplelogin1/loginAsGuest/no-error=null

    New Data:

2015-12-15 12:50:39,476 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-8]
Nothing audited:
    Application ID: 4
    Entry ID:       null
    Values:
        /auditexamplelogin1/loginAsGuest/args=null
        /auditexamplelogin1/loginAsGuest/no-error=null

2015-12-15 12:50:41,092 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
New audit entry:
    Application ID: 6
    Entry ID:       127
    Values:
        /alfresco-access/login=null
        /alfresco-access/loginUser=admin

    Audit Data:
        /alfresco-access/login/user=admin

2015-12-15 12:50:41,095 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
Extracted audit data:
    Application:    AuditApplication[ name=AuditExampleLogin2, id=5, disabledPathsId=3318]
    Values:
        /auditexamplelogin2/login=null

    New Data:

2015-12-15 12:50:41,100 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-9]
New audit entry:
    Application ID: 5
    Entry ID:       128
    Values:
        /auditexamplelogin2/login=null

    Audit Data:
        /auditexamplelogin2/login/user=Administrator
...

2015-12-15 12:50:49,724 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-2]
Extracted audit data:
    Application:    AuditApplication[ name=alfresco-access, id=6, disabledPathsId=3431]
    Values:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/node=workspace://SpacesStore/50574108-d6a1-4b5c-9378-c14b696787a7
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib
        /alfresco-access/transaction/user=admin

    New Data:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/user=admin
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib

...

2015-12-15 12:50:49,739 DEBUG [org.alfresco.repo.audit.AuditComponentImpl] [http-bio-8080-exec-2]
New audit entry:
    Application ID: 6
    Entry ID:       130
    Values:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/node=workspace://SpacesStore/50574108-d6a1-4b5c-9378-c14b696787a7
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib
        /alfresco-access/transaction/user=admin

    Audit Data:
        /alfresco-access/transaction/sub-actions=readContent
        /alfresco-access/transaction/action=READ
        /alfresco-access/transaction/type=cm:thumbnail
        /alfresco-access/transaction/user=admin
        /alfresco-access/transaction/path=/app:company_home/st:sites/cm:swsdp/cm:documentLibrary/cm:Agency Files/cm:Contracts/cm:Copy of Project Contract.pdf/cm:doclib

...
```

### View the available web scripts and details

Use the following scripts:

* Script index:

    ```http
    http://localhost:8080/alfresco/service/
    ```

* Audit scripts:

    ```http
    http://localhost:8080/alfresco/service/index/package/org/alfresco/repository/audit
    ```

### HTTP client

`curl` will be used as the HTTP client in this section of the documentation. This provides an easy way to explore the auditing REST API.

### Sample files

Audit sample files are distributed in the `tomcat/shared/classes/alfresco/extension/audit` directory. Activate the sample files by removing the .sample extension and restarting the server.

### Test source code (can provide a useful set of examples)

For JUnit code, the unit test code demonstrates use of the Audit APIs and configuration:

```text
org.alfresco.repo.audit.AuditComponentTest
```

* `alfresco-audit-test-authenticationservice.xml`: This is used by the test to capture both successful and unsuccessful login attempts in the audit data.
* `testAuditAuthenticationService`: This demonstrates the use of the `auditSearch` method.

### Alfresco Records Management auditing code

For Alfresco Records Management (DOD5015) and auditing, the module pulls in audit data from the `AuthenticationService` but adds more data around the individual actions that take place during Alfresco Records Management processes.

```text
org.alfresco.module.org_alfresco_module_dod5015.audit.*
```

* `RecordsManagementAuditServiceImpl$RMAuditTxnListener`: This transaction listener generates Alfresco Records Management-specific data for events (it is a `Data Producer`). It generates node property deltas.
* `config/alfresco/module/org_alfresco_module_dod5015/audit/rm-audit.xml`: This defines how the data produced by the `AuthenticationService` and the Alfresco Records Management module is persisted. There are some custom `DataGenerator`s and `DataRecorder`s.
* `RecordsManagementAuditServiceImpl.getAuditTrailImpl`: This method demonstrates how the Alfresco Records Management use-case searches the audit data. Further query extensions are required to extend the search filters available using the `auditQuery` API.

## How to enable auditing {#enableauditing}

Generation of audit data is disabled by default as it can potentially impact the performance of Content Services. To enable auditing, configuration must be added to the Content Services global properties file.

The `audit.enabled` property (which is set to `true` by default) provides a way to globally enable or disable the auditing framework. However, enabling this property does not necessarily result in the generation of audit data. To enable generation of audit data that you can view in Alfresco Share or the log files, you'll need to enable the `audit.alfresco-access.enabled` property.

To enable auditing add the following settings to the `tomcat/shared/classes/alfresco-global.properties` file:

```text
### Auditing config

audit.enabled = true
audit.alfresco-access.enabled=true

### Enabling sub-actions

# Enable the auditing of sub-actions. Normally disabled as these values are
# not normally needed by audit configurations, but may be useful to
# developers
#audit.alfresco-access.sub-actions.enabled=true
```

Once changes to the global properties file have been saved, you'll need to restart the server, for auditing to be fully enabled.

## How to check audit status

It is useful to check the current audit status of a Content Services installation. You can do this via the AuditService Java API, but this can also be done via the ReST API, which can be accessed via a command line client such as **Curl**.

You can check the status of auditing conveniently from the command line by using a tool such as `curl` to access the Audit Applications ReST endpoint.

For more information about `curl` and where to find it see this [page]({% link content-services/7.2/develop/rest-api-guide/install.md %}#http).

To check the global status of auditing, such as what audit applications that are enabled, see this [page]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#listauditapps).

While this does return the global status of the auditing framework, audit data will only be generated if the `audit.alfresco-access.enabled` property is `true`.

Auditing can also be globally enabled or disabled for Audit applications, see this [page]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#enabledisableapp) for more info.

## Using JMX to control auditing

A JMX client can be used to access global properties. The properties can be modified using the JMX client. A server restart will be required for changes to properties to take effect.

## How to use the auditing sample files {#how2useauditsamplefiles}

Auditing sample files are distributed in the `./tomcat/shared/classes/alfresco/extension/audit` directory. You can enable them in order to explore auditing.

There are two sample files in `./tomcat/shared/classes/alfresco/extension/audit`:

* `alfresco-audit-example-extractors.xml.sample`
* `alfresco-audit-example-login.xml.sample`

In order to use a sample file, remove the `.sample` extension. It is also assumed you've [enabled auditing](#enableauditing). You will also need to restart the server so the examples are loaded.

Once the sample files are enabled you can check that the new example audit applications are enabled via the ReST API, see this [page]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}#listauditapps) for more information.

You should see that the *AuditExampleExtractors* and *AuditExample Login* applications have been enabled.

## Using the auditing ReST API {#usingauditrestapi}

You can use the ReST API to control auditing and also run queries against the audit data for specific audit applications. It is also possible to clear auditing data using the API.

The Audit ReST API covers most of the audit functionality, check it out here in the [user guide]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}).

## Default auditing global properties {#auditconfigdefaults}

When Content Services is installed it has a set of default auditing properties you should be aware of.

The following default global properties (set in `repository.properties` of the source code) is:

```text
# Audit configuration
audit.enabled=true
audit.tagging.enabled=true
audit.alfresco-access.enabled=false
audit.alfresco-access.sub-actions.enabled=false
audit.cmischangelog.enabled=false
audit.dod5015.enabled=false

# Setting this flag to true will force startup failure when invalid audit configurations are detected
audit.config.strict=false

# Audit map filter for AccessAuditor - restricts recorded events to user driven events
audit.filter.alfresco-access.default.enabled=false
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content;st:site
audit.filter.alfresco-access.transaction.path=~/sys:archivedItem;~/ver:;.*
```

These defaults can be overriden in `alfresco-global.properties`, or using the APIs as required.

The default [audit filter](#auditfilters) discards events where the user is `null` or `System`, the content or folder path is under `/sys:archivedItem` or under `/ver:`. The filter also rejects node types other than `cm:folder`, `cm:content` or `st:site`.

In addition, there are some more global properties (set in `repository.properties`) that can be overridden in `alfresco-global.properties`:

```text
# DEPRECATED: Use 'system.auditableData.preserve'

system.preserve.modificationData=false
# The default to preserve all cm:auditable data on a node when the process is not directly driven by a user action
system.auditableData.preserve=${system.preserve.modificationData}
# Specific control of how the FileFolderService treats cm:auditable data when performing moves
system.auditableData.FileFolderService=${system.auditableData.preserve}
# Specific control of whether ACL changes on a node trigger the cm:auditable aspect
system.auditableData.ACLs=${system.auditableData.preserve}
```

These properties were introduced in Content Services 4.2.4.

## Audit filters {#auditfilters}

Audit data can be controlled by using audit filters. Audit filters provide a fine grain of control over which events are audited.

**Audit data producers** call `AuditComponent.recordAuditValues(rootPath, auditMap)` once for each event to be audited. Filters are applied to reject events so that their values are never used by **audit configurations**. The `rootPath` identifies the data producer and the `auditMap` is the event data. The `rootPath` value and keys in the map represent a tree structure.

If you're using the Tomcat web application server, add the additional properties (audit filters) to the `./tomcat/shared/classes/alfresco-global.properties` file.

### Creating new audit filters

Audit filters are essentially global properties that specify a way of filtering audit events by specifying regular expression to include or exclude audit events. Audit filters are typically added to `alfresco-global.properties`.

The format of an audit filter is as follows:

```text
audit.filter.<data_producer>.<path>
```

> **Note:** It is important to note that it is the **data producer** that is specified and *not* the name of the audit application.

First look at the default audit filters:

```text
# Audit map filter for AccessAuditor - restricts recorded events to user driven events
audit.filter.alfresco-access.default.enabled=false
audit.filter.alfresco-access.transaction.user=~System;~null;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content;st:site
audit.filter.alfresco-access.transaction.path=~/sys:archivedItem;~/ver:;.*
```

> **Note:** In the above syntax of the filter `alfresco-access` is the **data producer** *not* the audit application name. The filter path is the actual mapped path value to filter against.

When setting up an audit filter, you need to enable (or disable) the filter at the service level first or globally. In the above example this is done via `audit.filter.alfresco-access.default.enabled=false`. This switches off audit events for the `alfresco-access` data producer.

Then establish your more granular `rootPath` mapped filters for that data producer path and event. Each property value you set the filter equal to, defines a list of regular expressions that will be used to match the actual full path mapped value in your audit application.

For any filters to be applied to an event action, that action's filters must be enabled with an `enabled` property set to `true`.

Property names have an `audit.filter.*` prefix and use '.' as a separator where as components of `rootPath` and keys in the audit map use `/`.

Lists are evaluated from left to right allowing flexibility to accept or reject different combinations of values. If no match is made by the end of the list the value is rejected. If there is not a property for a given value or an empty list is defined any value is accepted.

Each regular expression in the list is separated by a semicolon (`;`). Expressions that include a semicolon can be escaped using a `\`.

An expression that starts with a `~` indicates that any matching value should be rejected. If the first character of an expression needs to be a `~`, it can be escaped with a `\`.

A property value can be a reference to another property, which saves having multiple copies of the same regular expression. This is indicated by a `$` as the first character of the property value. If the first character of an expression needs to be a `$` it can be escaped with a `\`.

You can use the default audit filters as a starting point to create your own custom audit filters, or override these defaults.

### Example 1

Here is an example of filter for data produced by the `alfresco-api` data producer:

```text
audit.filter.alfresco-api.post.AuthenticationService.authenticate.args.userName=~System;~null;~admin;.*
```

This example filter illustrates **not** recording on a post authenticating `userName` produced by the `alfresco-api` producer that is equal to System, null or admin.

### Example 2

```text
audit.filter.alfresco-access.default.enabled=true
audit.filter.alfresco-access.transaction.user=~System;.*
audit.filter.alfresco-access.transaction.type=cm:folder;cm:content
audit.filter.alfresco-access.transaction.path=/app:company_home/.*
audit.filter.alfresco-access.login.user=jblogs
...
```

In this example, events created by any user except for the internal user `System` will be recorded for all event actions.

### Redirected properties

It is possible for one property to reference another property.

A property value may be a reference to another property, which saves having multiple copies of the same regular expression. This is indicated by a `$` as the first character of the property value. If the first character of an expression needs to be a `$` it too may be escaped with a `\`. An example of this is shown below:

```text
audit.filter.alfresco-access.transaction.type=$transaction.content.types

transaction.content.types=$general.content.types
general.content.types=cm:folder;cm:content
```

### Debug audit filters

The `PropertyAuditFilter` provides log4j debug information (in the `alfresco.log` file) when it rejects values. Turning on this debugger can generate large volumes of output.

#### Enable debug

```text
# Change file appender to include debug from any source
log4j.appender.File.Threshold=debug

# Enable debug from the PropertyAuditFilter
log4j.logger.org.alfresco.repo.audit.PropertyAuditFilter=debug
```

## Audit configuration {#auditconfig}

The most common reason to customize the audit configuration is if there is a need to extract individual property or aspect values that have special meaning to a particular Content Services installation.

For example, a security clearance level has been added to content and it is important to include that clearly in the persisted audit data, rather than having to find it deep within a map of all properties. The default configuration includes an example. It extracts the `name` property. It is generally a good idea to create a new audit configuration file that includes a mapped path to avoid confusion with the default. If running under Tomcat place the audit configuration file in the `tomcat/shared/classes/alfresco/extension/audit` directory. The following example is simply a cut down version of the default with the path mapped to a new value.

An example configuration file, `myApp.xml`, is shown here:

```text
<?xml version="1.0" encoding="UTF-8"?>
<Audit xmlns="http://www.alfresco.org/repo/audit/model/3.2"
     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
     xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2
    alfresco-audit-3.2.xsd">

  <DataExtractors>
    <DataExtractor name="simpleValue"
        registeredName="auditModel.extractor.simpleValue"/>
  </DataExtractors>

  <PathMappings>
    <PathMap source="/alfresco-access" target="/my-app" />
  </PathMappings>

  <Application name="my-app" key="my-app">
    <RecordValue
        key="action" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/action"
        dataTrigger="/my-app/transaction/action" />
    <RecordValue
        key="user" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/user"
        dataTrigger="/my-app/transaction/user" />
    <RecordValue
        key="path" dataExtractor="simpleValue"
        dataSource="/my-app/transaction/path"
        dataTrigger="/my-app/transaction/path" />
  </Application>

</Audit>
```

The following shows the `AccessAuditor` debug for a move action.

```text
Audit data:
    /my-app/action=MOVE
    /my-app/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx
    /my-app/user=admin

Inbound audit values:
    /alfresco-access/transaction/action=MOVE
    /alfresco-access/transaction/node=workspace://SpacesStore/90a398d1-8e0d-462a-8c3b-f0b17a2d1143
    /alfresco-access/transaction/move/from/node=workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310
    /alfresco-access/transaction/move/from/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1/cm:Word 123.docx
    /alfresco-access/transaction/move/from/type=cm:folder
    /alfresco-access/transaction/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:Word 123.docx
    /alfresco-access/transaction/sub-action/00/action=moveNode
    /alfresco-access/transaction/sub-action/00/move/from/node=workspace://SpacesStore/a82446e9-4dca-49d2-9ce0-4526687fb310
    /alfresco-access/transaction/sub-action/00/move/from/path=/app:company_home/st:sites/cm:fred/cm:documentLibrary/cm:folder1/cm:Word 123.docx
    /alfresco-access/transaction/sub-action/00/move/from/type=cm:folder
    /alfresco-access/transaction/sub-action/01/action=readContent
    /alfresco-access/transaction/sub-actions=moveNode readContent
    /alfresco-access/transaction/type=cm:content
    /alfresco-access/transaction/user=admin
```

### Audit configuration files

Location and basic structure of the audit configuration files.

The XML schema is located at [alfresco-audit-3.2.xsd](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/audit/alfresco-audit-3.2.xsd).

The configuration file structure is divided into four basic sections:

#### DataExtractors

DataExtractors are declared for use in the `<Application>` sections of the configuration files. A `DataExtractor` is a component that uses input data to produce some output, either transforming the data or outputting the data verbatim. The simplest extractor is the `SimpleValueDataExtractor`, which returns whatever data is passed in. A more complex extractor is the `NodeNameDataExtractor`, which is able to produce the `cm:name` value of a node, assuming the data passed in is a NodeRef. For the complete set of built-in generators, see the `org.alfresco.repo.audit.extractor` package, or the `auditModel.extractor.*` beans, which are declared in [audit-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/audit-services-context.xml).

The extractors can be declared in-line, for example:

```xml
<DataExtractors>
   <DataExtractor name="simpleValue" class="org.alfresco.repo.audit.extractor.SimpleValueDataExtractor"/>
   ...
</DataExtractors>
```

Or they can be declared in Spring configuration and referenced in the audit configuration (see the [audit-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/audit-services-context.xml) file), for example:

```xml
<DataExtractors>
   <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
   ...
</DataExtractors>
```

#### DataGenerators

DataGenerators are declared for use in the `<Application>` sections of the configuration files. A `DataGenerator` is a component that produces data without any input, that is, data is produced when a data path is active, but is independent of the values at that path. Examples of generators are the `AuthenticatedUserDataGenerator` component, which produces the name of the currently-authenticated user (user in context) and the `AuthenticatedPersonDataGenerator` component, which produces the full name of the currently-authenticated user (person in context). For the complete set of built-in generators, see the `org.alfresco.repo.audit.generator` package or the `auditModel.generator.*` beans, which are declared in the [audit-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/audit-services-context.xml) file.

The generators can be declared in-line, for example:

```xml
<DataGenerators>
   <DataGenerator name="currentUser" class="org.alfresco.repo.audit.generator.AuthenticatedUserDataGenerator"/>
   <DataGenerator name="personFullName" class="org.alfresco.repo.audit.generator.AuthenticatedPersonDataGenerator"/>
</DataGenerators>
```

Or they can be declared in Spring configuration and referenced in the audit configuration (see the [audit-services-context.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/audit-services-context.xml) file), for example:

```xml
<DataGenerators>
   <DataGenerator name="currentUser" registeredName="auditModel.generator.user"/>
   <DataGenerator name="personFullName" registeredName="auditModel.generator.personFullName"/>
</DataGenerators>
```

#### PathMappings

The expanded map coming from the Data Producers is passed through the path mappings. This is a raw remapping of the input data based on the path names in the data map.

```xml
<PathMappings>
  <PathMap source="/DOD5015" target="/DOD5015"/>
  <!-- Force the fullName generator to trigger -->
  <PathMap source="/DOD5015/event/node" target="/DOD5015/event/person"/>
  <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/DOD5015/login"/>
</PathMappings>
```

In this example, all paths starting with `/DOD5015` are mapped verbatim, but without the declaration, the data paths starting with `/DOD5015` are discarded. A small subset of the Content Services API data is used (only the `AuthenticationService.authenticate` call) by mapping all values starting with that path to `/DOD5015/login`.

#### Application

This information defines how the mapped data is to be used by `DataGenerators` or by `DataExtractors`.

```xml
<Application name="DOD5015" key="DOD5015">
    <AuditPath key="login">
        <AuditPath key="args">
            <AuditPath key="userName">
                <RecordValue key="value" dataExtractor="simpleValue"/>
            </AuditPath>
        </AuditPath>
        <AuditPath key="no-error">
            <GenerateValue key="fullName" dataGenerator="personFullName"/>
        </AuditPath>
        <AuditPath key="error">
            <RecordValue key="value" dataExtractor="nullValue"/>
        </AuditPath>
    </AuditPath>
</Application>
```

### Audit application

Audit Applications provide a way to create different ways of processing the same audit data. They define data producers, generators and extractors, as well as path mappings.

Data producers have no knowledge of how or whether data will be stored. Different use cases will need to store or modify inbound data independently, therefore the use cases are separated into **Audit Applications**. Each application defines how data is mapped, extracted, and recorded without affecting data required by other applications.

For example, the Records Management module records before-and-after values when specific nodes are modified,
whereas the CMIS standard requires a slightly different set of data to be recorded. Additionally, each of the audit logs can be enabled and disabled independently within the same server. Usually, each Audit Application is defined in its own configuration file, but for demonstration purposes, multiple Application definitions can sometimes be defined in one configuration file.

### Deconstruct sample files

The Sample Files provide a useful starting point for creating your own audit applications. There are two Audit Application sample files in `./tomcat/shared/classes/alfresco/extension/audit`:

* `alfresco-audit-example-login.xml.sample`
* `alfresco-audit-example-extractors.xml.sample`

See the documentation on [Using the auditing sample files](#how2useauditsamplefiles).

> **Note:** It is usual to put each audit application in its own file. The sample files however do combine more applications for ease of reference.

The following sections deconstruct the contents of the sample files.

#### Login example

The login example is provided in `alfresco-audit-example-login.xml.sample`.

##### Configuration

The Audit Configuration section the Audit Configuration:

```xml
<Audit
    xmlns="http://www.alfresco.org/repo/audit/model/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd"
    >
    ...
</Audit>
```

##### Data Extractors

The data extractor section describes any data extractors to be used to extract the value from the audit data. In this case the `SimpleValue` extractor provided out of the box:

```xml
<DataExtractors>
    <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
</DataExtractors>
```

##### Data Generators

This section of the configuration defines the data generator to be used. In this case the `personFullName` generator is specified. This will activate when an inbound mapped path is present, but is not dependent on the value on that path. For example, `AuditExampleLogin2` triggers the `personFullName` generator when the `authenticate/no-error` path is present; this records the full name of the currently-authenticated user even though the inbound data for `authenticate/no-error` is `null`:

```xml
<DataGenerators>
   <DataGenerator name="personFullName" registeredName="auditModel.generator.personFullName"/>
</DataGenerators>
```

##### Path Mappings

This section defines the Path Mappings. Path Mappings map events into applications. The `source` event is linked to the audit application key specified in the `target` attribute. In effect the format for target is `<application_key/audit_path_key>`. So, taking the first path mapping, `/alfresco-api/post/AuthenticationService/authenticate` events are mapped to the `login` audit path key of the `auditexamplelogin1` application (the applications are specified next in the file and you'll need to examine these in order to understand path mappings). If you look at the definition of `AuditExampleLogin1` you'll see it has the audit path key "login" (`<AuditPath key="login">`).

Now, the source event `/alfresco-api/post/AuthenticationService/authenticate` may have "sub events" such as `error` and `no-error`, for example: `/alfresco-api/post/AuthenticationService/authenticate/error`. What this means is that for the application `AuditExampleLogin1` it'll record the username for both successful and unsuccessful logins. Notice however, that the path mapping for `AuditExample2` is different. The source is `/alfresco-api/post/AuthenticationService/authenticate/no-error`, so only this event will be mapped into the application, specifically to the audit path with the key "login". The effect of this is that only successful logins will be recorded.

```xml
<PathMappings>
    <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/auditexamplelogin1/login"/>
    <PathMap source="/alfresco-api/post/AuthenticationService/authenticate/no-error" target="/auditexamplelogin2/login"/>
</PathMappings>
```

##### Audit Application 1

Here, one or more audit applications are defined. See also the previous section for discussion on Path Mappings. Path Mappings are important to understanding how applications work. This audit application will record username for successful and failed logins.

```xml
<Application name="AuditExampleLogin1" key="auditexamplelogin1">
    <AuditPath key="login">
        <AuditPath key="no-error">
            <RecordValue key="user" dataExtractor="simpleValue" dataSource="/auditexamplelogin1/login/args/userName"/>
        </AuditPath>
        <AuditPath key="error">
            <RecordValue key="user" dataExtractor="simpleValue" dataSource="/auditexamplelogin1/login/args/userName"/>
        </AuditPath>
    </AuditPath>
</Application>
```

##### Audit Application 2

Another audit application definition. See also the previous section for discussion on Path Mappings. This audit application will record full name for only successful logins.

```xml
<Application name="AuditExampleLogin2" key="auditexamplelogin2">
    <AuditPath key="login">
        <GenerateValue key="user" dataGenerator="personFullName"/>
    </AuditPath>
</Application>
```

#### Data extractors sample

The data extractors sample is provided in `alfresco-audit-example-extractors.xml.sample`.

```xml
<?xml version='1.0' encoding='UTF-8'?>

<!-*

    An example of how user login details can be captured.

-->

<Audit
    xmlns="http://www.alfresco.org/repo/audit/model/3.2"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd"
    >

    <DataExtractors>
       <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
       <DataExtractor name="nullValue" registeredName="auditModel.extractor.nullValue"/>
       <DataExtractor name="nodeNameValue" registeredName="auditModel.extractor.nodeName"/>
       <DataExtractor name="nodeTypeValue" registeredName="auditModel.extractor.nodeType"/>
    </DataExtractors>

    <PathMappings>
        <PathMap source="/alfresco-api/post/NodeService/createNode" target="/auditexampleextractors"/>
    </PathMappings>

    <Application name="AuditExampleExtractors" key="auditexampleextractors">
        <AuditPath key="create">
            <AuditPath key="in">
                <RecordValue key="a" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="b" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/nodeTypeQName" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="c" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/assocTypeQName" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="d" dataExtractor="simpleValue" dataSource="/auditexampleextractors/args/assocQName" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
            <AuditPath key="out">
                <RecordValue key="a" dataExtractor="simpleValue" dataSource="/auditexampleextractors/result" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
            <AuditPath key="derived">
                <RecordValue key="parent-node-null" dataExtractor="nullValue"     dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="parent-node-name" dataExtractor="nodeNameValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
                <RecordValue key="parent-node-type" dataExtractor="nodeTypeValue" dataSource="/auditexampleextractors/args/parentRef" dataTrigger="/auditexampleextractors/no-error"/>
            </AuditPath>
        </AuditPath>
    </Application>

</Audit>
```

## Audit Tutorials

The [Audit ReST API User Guide]({% link content-services/7.2/develop/rest-api-guide/audit-apps.md %}) contains a lot of example tutorials.

### Understanding PathMappings

To create an audit configuration file, it is necessary to know which data can be audited and how the data is mapped onto your application.

1. Turn on debugging for the inbound data. For a better understanding, you can turn on debug logging for the mapping components as well, although this is more verbose.

    ```text
    $cat tomcat/shared/classes/alfresco/extension/audit-log4j.properties
    log4j.logger.org.alfresco.repo.audit.AuditComponentImpl=DEBUG
    log4j.logger.org.alfresco.repo.audit.inbound=DEBUG
    ```

2. Tail the log file and examine the output.

3. Log in as `admin`:

    ```text
    16:47:37,434  DEBUG [repo.audit.inbound]
    Inbound audit values:
        /alfresco-api/pre/AuthenticationService/authenticate/args/userName=admin
    16:47:37,443 User:admin DEBUG [repo.audit.inbound]
    Inbound audit values:
        /alfresco-api/post/AuthenticationService/authenticate/no-error=null
        /alfresco-api/post/AuthenticationService/authenticate/args/userName=admin
    ```

4. From the inbound values (and if you have the `AuditComponentImpl` debugging on):

    ```text
    16:47:37,445 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data:
       Application: AuditApplication[ name=AuditExampleLogin2, id=7, disabledPathsId=7]
       Raw values:  {/auditexamplelogin2/login=null}
       Extracted:   {}
    16:47:37,447 User:admin DEBUG [repo.audit.AuditComponentImpl] New audit entry:
       Application ID: 7
       Entry ID:       130
       Values:         {/auditexamplelogin2/login=null}
       Audit Data:     {/auditexamplelogin2/login/user=Administrator}
    16:47:37,447 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data:
       Application: AuditApplication[ name=AuditExampleLogin1, id=6, disabledPathsId=6]
       Raw values:  {/auditexamplelogin1/login/no-error=null, /auditexamplelogin1/login/args/userName=admin}
       Extracted:   {/auditexamplelogin1/login/no-error/user=admin}
    16:47:37,449 User:admin DEBUG [repo.audit.AuditComponentImpl] New audit entry:
       Application ID: 6
       Entry ID:       131
       Values:         {/auditexamplelogin1/login/no-error=null, /auditexamplelogin1/login/args/userName=admin}
       Audit Data:     {/auditexamplelogin1/login/no-error/user=admin}
    ```

    You can see that the `AuthenticationService.authenticate` method generate two sets of "inbound" data: the `/alfresco-api/**pre**/AuthenticationService/authenticate` data is passed through before the service call is processed; the `/alfresco-api/**post**/AuthenticationService/authenticate` data is passed through after the service call has been processed. When logging in successfully, the post-call data is generated with a `no-error` path.

5. Perform a failed login with user `joe`.

    ```text
    17:02:09,697  DEBUG [repo.audit.inbound]
    Inbound audit values:
        /alfresco-api/pre/AuthenticationService/authenticate/args/userName=joe
    17:02:09,704  DEBUG [repo.audit.inbound]
    Inbound audit values:
        /alfresco-api/post/AuthenticationService/authenticate/error=08200014 Failed to authenticate
       Started at:
          org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
          ...
    ```

    This is translated and recorded:

    ```text
    17:02:09,704 User:System DEBUG [repo.audit.AuditComponentImpl] Extracted audit data:
       Application: AuditApplication[ name=AuditExampleLogin1, id=6, disabledPathsId=6]
       Raw values:  {/auditexamplelogin1/login/error=08200014 Failed to authenticate
       Started at:
          org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
          ...
    17:02:09,704  DEBUG [repo.audit.AuditComponentImpl] New audit entry:
       Application ID: 6
       E6try ID:       135
       Values:         {/auditexamplelogin1/login/error=08200016 Failed to authenticate
       Started at:
          org.alfresco.repo.security.authentication.AbstractChainingAuthenticationService.authenticate(AbstractChainingAuthenticationService.java:188)
          ...
       Audit Data:     {/auditexamplelogin1/login/error/user=joe}
    ```

6. Notice that the failed log in did not generate any data for audit application `AuditExampleLogin2`. To understand this, look at the `PathMappings` section of the example:

    ```xml
    <PathMappings>
      <PathMap source="/alfresco-api/post/AuthenticationService/authenticate" target="/auditexamplelogin1/login"/>
      <PathMap source="/alfresco-api/post/AuthenticationService/authenticate/no-error" target="/auditexamplelogin2/login"/>
    </PathMappings>
    ```

    Before any data is considered for persistence, the inbound data paths are remapped using the `PathMappings` configuration. The `/auditexamplelogin2/login` path is mapped onto `.../no-error` only, so failed logins were not recorded for the `AuditExampleLogin2` audit application, while the `AuditExampleLogin1` application recorded both successful and failed logins.

### Using values that have changed in a post method call

When using the `org.alfresco.repo.audit.AuditMethodInterceptor` Data Producer, which generates audit data for all public service API calls, it is sometimes useful to be able to audit before and after values in a 'post' call application, or to include values from before the call.

For example, the `nodeName` data extractor can only be called on a node that exists, so calling it after a delete has no effect.

The output of 'pre' call applications is available to 'post' call applications, which can be seen in the following example. The example shows auditing the deletion of nodes and includes the node name. The `nodeName` is evaluated in the 'pre' call application and copied in the 'post' call application.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<Audit
  xmlns="http://www.alfresco.org/repo/audit/model/3.2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.alfresco.org/repo/audit/model/3.2 alfresco-audit-3.2.xsd" >

  <DataExtractors>
    <DataExtractor name="simpleValue" registeredName="auditModel.extractor.simpleValue"/>
    <DataExtractor name="nodeNameValue" registeredName="auditModel.extractor.nodeName"/>
  </DataExtractors>

  <PathMappings>
    <PathMap source="/alfresco-api/pre/NodeService/deleteNode" target="/preDelete" />
    <PathMap source="/alfresco-api/post/NodeService/deleteNode" target="/postDelete" />
  </PathMappings>

  <Application name="PreCallDataDelete" key="preDelete">
    <RecordValue key="nodeName" dataExtractor="nodeNameValue" dataSource="/preDelete/args/nodeRef" dataTrigger="/preDelete/args/nodeRef" />
  </Application>

  <Application name="PostDelete" key="postDelete">
    <RecordValue key="error" dataExtractor="simpleValue" dataSource="/postDelete/error" dataTrigger="/postDelete/error" />
    <AuditPath key="deleteDetails">
      <RecordValue key="deletedNodeRef" dataExtractor="simpleValue" dataSource="/postDelete/args/nodeRef" dataTrigger="/postDelete/args/nodeRef" />
      <RecordValue key="nodeName" dataExtractor="simpleValue" dataSource="/postDelete/preCallData/preDelete/nodeName" dataTrigger="/postDelete/preCallData/preDelete/nodeName" />
    </AuditPath>
  </Application>

</Audit>
```

> **Note:** The `dataSource` attribute of the final `<RecordValue>` element includes the output path of the 'pre' call application ("`preDelete/nodeName`"). This is prefixed by `preCallData/` much like the `args/` prefix for method arguments. To avoid 'pre' call applications from generating audit records themselves, rather than just generating output for the 'post' call applications, give them a name that starts with `PreCallData`.
