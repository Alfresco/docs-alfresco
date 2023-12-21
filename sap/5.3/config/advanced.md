---
title: Advanced configuration
---

This chapter describes all additional configuration options for the SAP Connector to replicate metadata from the SAP Business Object to the document in Content Services.

If a document is stored in SAP via the SAP Content-Server HTTP-Interface on a content server, SAP submits only three additional properties in the HTTP-request (besides the content itself). These are the `SAP Content Repository` (name of the SAP Content Repository), the `SAP Document Id` (unique number created from SAP to identify the object) and the `SAP Component Id` (hidden in the Alfresco Share UI because of non-human readable values). The additional parameters will show up in an aspect with name `SAP Connection Details` at the document.

![sap_conf_aspect_sap-connection-details]({% link sap/images/sap_conf_aspect_sap-connection-details.png %})

However, there may be a lot of additional reasons to have more information from the SAP Business Object in Content Services available than just these few, which are also not very meaningful to a user, by the way.

The SAP Connector offers the capability to make additional metadata available outside SAP already by default. To get additional metadata out of SAP and store it at the document in Content Services, the connection to SAP is done through the SAP Java Connector (JCo). Furthermore, the SAP Connector takes advantage of different ways to trigger an action which results in the metadata replication.

These are mainly Jobs and Behaviors, but also event-based action is possible. The replicated information will be provided in connexas related aspects at the documents in Content Services.

## Enable Alfresco - SAP communication

This chapter basically describes all additional configuration settings for the SAP Connector to replicate metadata from the SAP Business Object to the document in Content Services.

The SAP Connector takes advantage of the SAP JavaConnector to establish the connection from Content Services to the SAP system. The required connection properties must be provided in the `alfresco-global.properties` file. All related properties are already available in this file, but must still be adapted to your SAP system.

The following property keys are required for the connection - see [Configure repository properties]({% link sap/5.3/install/index.md %}#configrepo) for details.

* `integrations.sap.system.1.enabled`
* `integrations.sap.system.1.name`
* `integrations.sap.system.1.host`
* `integrations.sap.system.1.client`
* `integrations.sap.system.1.systemNumber`
* `integrations.sap.system.1.user`
* `integrations.sap.system.1.password`
* `integrations.sap.system.1.language`
* `integrations.sap.system.1.webClient.enabled`
* `integrations.sap.system.1.webClient.url`
* `integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled`
* `integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression`
* `integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled`
* `integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression`
* `integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled`
* `integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression`
* `integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled`
* `integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression`

> **Important:** The properties above are only required to connect from Content Services to SAP. There are still other properties required to specify a valid SAP System Configuration. See [Installing SAP Connector]({% link sap/5.3/install/index.md %}).

1. SAP Content Repositories

    There is no limitation in the number of SAP Content Repositories that can be created and connected to Content Services (only SAP restrictions apply). For one connected SAP system you can use one SAP System Configuration of the SAP Connector in the `alfresco-global.properties`. All SAP Content Repository names can be entered as comma-separated list for the `archiveIds` parameter. Example:

    `integrations.sap.system.1.al.archiveIds = Archive1[,Archive2, ArchiveN]`

2. Using Wildcard

    The usage of a Wildcard (`*`) for parameter `archiveIds` is not recommended anymore. For setting up metadata replication specify each SAP Content Repository by its name in the `archiveIds` parameter.

### Configure jobs

The SAP Connector offers a couple of predefined jobs which accomplishes different tasks. This section describes all available jobs with their purpose and how each of them can be configured.

The jobs connect from Content Services to the SAP system via the SAP Java Connector. Each job invokes a different function module on the SAP side. Values that are returned (except for the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob)), are stored in properties and displayed within a separate aspect on the document.

> **Note:** The CRON trigger beans for all available jobs are disabled by default in the `alfresco-global.properties`.

#### Enable / disable jobs (CRON trigger bean)

The SAP Connector offers the capability to disable the related CRON trigger bean of each job during Content Services startup. This must be done in the `alfresco-global.properties`. Once disabled, the class for the job is never executed, which takes load from the system.

> **Note:** The recommendation is to disable the CRON trigger beans for each job that is not needed.

> **Note:** This affects **all** SAP Content Repositories which are defined for the related SAP System Configuration. Once a CRON trigger bean for a job is disabled in the `alfresco-global.properties`, the related setting at the repository file has no effect.

#### SAP Function Modules

The following table lists the SAP function modules or tables, invoked by the different jobs.

| Job Name | SAP Function Module or Table |
| -------- | ---------------------------- |
| sapContentConnectorReplicate | `ARCHIV_GET_CONNECTIONS` |
| sapContentConnectorPlus | Table `TOAAT` |
| sapContentConnectorBarcode | `BAPI_BARCODE_SENDLIST` |
| sapContentConnectorDirReplicate | `BAPI_DOCUMENT_GETDETAIL2` |

#### Job: sapContentConnectorReplicate {#sapContentConnectorReplicateJob}

The job is responsible for replicating common metadata of the SAP Business Object to make it available at the associated document in Content Services. The job can be enabled and used without any further requirement or prerequisites.

The following table lists all the metadata that's accessible to the standard functional module and that will be replicated:

| Property | Description |
| -------- | ----------- |
| SAP Client | The SAP client that was used to store the document on the SAP side. |
| SAP Object Type | The SAP business object type that's linked to the document. |
| SAP Document Type | The SAP ArchiveLink document type which the document has been stored within SAP. |
| SAP Object Id | The SAP Business Object Id (unique identifier in SAP) that's linked to the document. |
| SAP Reserve | The file extension of the document stored from SAP, e. g. PDF. |
| SAP Archive Date | The date when the current document was stored in Content Services or when an existing document was connected to SAP. |
| SAP Deletion Date | The deletion date that's usually used to save the earliest date that the object can be deleted from the connected archive. This information will only be available if the customization on the SAP side has been done accordingly (i.e. maintains the retention period in transaction `OAC3`). |

The metadata will appear in an aspect `SAP Replicate Details` for the document in Content Services.

![sap_conf_aspect_sap-replicate]({% link sap/images/sap_conf_aspect_sap-replicate.png %})

##### Enable / disable job

The job can be enabled or disabled at the repository file for each SAP Content Repository:

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**.
2. Edit properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})

    1. To disable the job, remove the text `sapContentConnectorReplicate` (including the comma) from the field and save the file.
    2. To enable the job, add the text `**sapContentConnectorReplicate**` to the field and save the file. You may need to add a comma before it to correctly format the comma-separated list. Click the question mark besides the field to show the help text, including a list of all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md%}#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

##### Execution time

The execution time for the job is stored as a value for the following property of the related SAP System Configuration:

```text
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

This value is a CRON expression that provides the most flexible way of executing the job. By default, the job is triggered every full minute.

##### CRON trigger bean

To disable the CRON trigger bean for the `sapConnectorReplicate` job, set the following property key in the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapConnectorReplicate.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is no longer considered and has no effect.

> **Note:** Changing the execution time or enabling/disabling the job requires a restart of Content Services.

#### Job: sapContentConnectorPlus {#sapContentConnectorPlusJob}

The job is responsible for replicating additional metadata of the SAP Business Object to make it available at the associated document in Content Services. The job can be enabled and used without any further requirement or prerequisites.

The following table lists the additional metadata that will be replicated:

| Property | Description |
| -------- | ----------- |
| SAP Creator | The SAP user name who stored the document. |
| SAP File Name | The original filename of the uploaded file. |
| SAP Description | The short description field where the user can enter some brief information in SAP before storing the document. |

The metadata will appear in an aspect `SAP Replicate Plus Details` for the document in Content Services. For example, this information can be used to rename the document in Content Services with its original name (instead of *data*) and / or to provide the description of the SAP Business Object also as description for the document in Content Services.

![sap_conf_aspect_sap-replicate_plus]({% link sap/images/sap_conf_aspect_sap-replicate_plus.png %})

##### Enable / disable job - sapContentConnectorPlus

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})

    1. To disable the job, remove the text `sapContentConnectorPlus` (including the comma) from the field and save the file.
    2. To enable the job, add the text `sapContentConnectorPlus` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

##### Execution time - sapContentConnectorPlus

The execution time for the job is stored as a value for the following property of the related SAP System Configuration:

```text
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression = 0 0/1 * 1/1 * ? *
```

This value is a CRON expression that provides the most flexible way of executing the job. By default, the job is triggered every full minute.

##### CRON trigger bean - sapContentConnectorPlus

To disable the CRON trigger bean for the `sapContentConnectorPlus` job, set the following property key in the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is no longer considered and has no effect.

> **Note:** Changing the execution time or enabling/disabling the job requires a restart of Content Services.

#### Job: sapContentConnectorBarcode {#sapContentConnectorBarcodeJob}

The job is responsible for storing related information from the documents having the `SAP Barcode Details` aspect in the external Barcode table of the SAP system. The job requires the related [Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) as well as SAP customization (see below). The job is implemented for batch processing. This means, all existing Barcode documents in Content Services will be considered and processed as long as they are not already successfully linked.

In Content Services the aspect `SAP Barcode Details` is related to the job. This aspect must be present at the document to be considered as barcode document that should be linked to SAP by the job.

![sap_conf_aspect_sap-barcode]({% link sap/images/sap_conf_aspect_sap-barcode.png %})

If the `SAP Barcode Details` aspect is added to a document, the related [Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) is invoked automatically and will add the required `SAP Connection Details` aspect to the document. Therefore, also the mandatory `SAP Content Repository` of this aspect must be set.

The following table lists the additional data of the aspect required for the job. Both properties are mandatory:

| Property | Description |
| -------- | ----------- |
| SAP Barcode | The barcode. |
| SAP Document Class | The file extension of the document, e.g. PDF. |

##### Enable / disable job: sapContentConnectorBarcode

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_jobs_barcode]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs_barcode.png %})

    1. To disable the job, remove the text `sapContentConnectorBarcode` (including the comma before the name) from the field and save the file.
    2. To enable the job, add the text `sapContentConnectorBarcode` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** Make sure the related behavior with same name is also enabled and therefore available in field for **Enabled Behaviors**.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

##### Execution time - sapContentConnectorBarcode

The execution time for the job is stored as a value for the following property of the related SAP System Configuration:

```text
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression = 0 0/1 * 1/1 * ? *
```

This value is a CRON expression that provides the most flexible way of executing the job. By default, the job is triggered every full minute.

##### CRON trigger bean - sapContentConnectorBarcode

To disable the CRON trigger bean for the `sapContentConnectorBarcode` job, set the following property key in the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is no longer considered and has no effect.

##### SAP customization

To run the `sapContentConnectorBarcode` job, the SAP system requires some customization to set up the barcode scenario.

1. Open transaction `SPRO` then click on **SAP Reference {% include tooltip.html word="SAP_IMG" text="IMG" %}**
2. Navigate though the structure shown below to find all related customization settings for `Bar Code Scenarios` (alternatively, enter the customization section via transaction `OAM1`).

    ![sap_conf_barcode_customization_sap]({% link sap/images/sap_conf_barcode_customization_sap.png %})

3. Proceed with the necessary customization.

> **Note:** Detailed information about the SAP customizing for Barcode scenarios can be found in the SAP ArchiveLink documentation *Storage Scenarios with Integration of Bar Code Technology*.

#### Job: sapContentConnectorDirReplicate

The job is responsible for replicating metadata from a SAP Document Info Record (DIR) and make it available for the associated document in Content Services. It supports metadata replication from the DIR document as well as from the superior document (pre-document), if exists. Furthermore, the `Draft` state of a DIR for documents uploaded through SAP Fiori applications is supported.

The following table lists the metadata that will be replicated from the SAP Document Info Record:

| Property | Description |
| -------- | ----------- |
| Document Type | The document type of the object which is used to identify the document. |
| Document Number | The document number which is used to identify the document. |
| Document Part | Section of a document which is maintained as an independent document. Design departments, for example, can use document parts to divide up large documents such as design drawings into pages. |
| Document Version | The document version. |
| Description | The description from the Document Info Record. |
| SAP User | The user in SAP who has created the document info record. |
| SAP Client | The client in SAP which was used during the document info record creation. |
| Deletion Flag | Shows whether the document is to be deleted during the next reorganization run. |
| CAD Indicator | Shows whether the object (e.g. BOM) was changed in the CAD system (Pro/Engineer, CATIA,..) or not. |
| Document Structure | Shows whether the object is part of a document structure. |
| Document State (internal) | Document status field. |
| Document State (external) | State of the document (language dependent) depending on the underlying status network. |
| Lab/Office | Key for the design office, laboratory, or laboratory worker responsible. |
| Change Number | Number of the change master record which groups together logically linked documents and any other SAP objects (such as bill of material, routing, material). |
| Valid From | Date, from which the change object (for example, document) change is effective with the corresponding change number. |
| Authorization Group | The authorization group which is used to enable protect access. |
| Status Log | The status logs for each status change. |

The following metadata will be replicate from the related superior document, if any:

| Property | Description |
| -------- | ----------- |
| Document Type | The document type of the superior document must not be the same as that of the document you are currently processing. |
| Document Number | The document number of the superior document. |
| Document Part | Section of the document, used as part of the document key identifying the superior document. |
| Document Version | Document version, used as part of the document key identifying the superior document. |

The metadata will appear in aspects `SAP Document Info Record (DIR) Details` and `SAP DIR Superior Document Details` for the document in Content Services.

![sap_conf_aspect_sap-dir]({% link sap/images/sap_conf_aspect_sap-dir.png %})

##### SAP customization prerequisites

To use the SAP Document Info Record replication job, the SAP Content Repository must be set up in a different way than explained earlier in [(1) Create SAP Content Repository](#basic-createsapcontentrepo). The important change must be done in the **Document Area** selection. Instead of `Archivelink` the value `Document Management System` must be selected. Hence, always use a different SAP Content Repository than for Archivelink.

![sap_conf_003_create_repo_values_dms]({% link sap/images/sap_conf_003_create_repo_values_dms.png %})

> **Note:** Always use also a separate SAP System Configuration for SAP Document Management Service (DMS) related scenarios in the `alfresco-global.properties` and disable the CRON trigger bean at least for the [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob) and [Job: sapContentConnectorPlus](#sapContentConnectorPlusJob).

##### Enable `Draft` state

The job also supports the `Draft` state for SAP Document Info Records. This state comes into place if documents are uploaded through SAP Fiori applications. To consider the `Draft` state, a flag must be enabled on the repository file to replicate metadata even if the document is still in `Draft` state.

To enable the `Draft` state:

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > M3**
2. Edit the properties of the file **M3 Repository**.
3. In aspect `SAP Connection Repository Details` enable the flag for `Enable Draft for SAP Document Info Records (DIR)`

    ![sap_conf_aspect_sap-connection_repository_dir_draft]({% link sap/images/sap_conf_aspect_sap-connection_repository_dir_draft.png %})

##### Enable / disable job - sapContentConnectorDirReplicate

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})

    1. To enable the job, add the text `sapContentConnectorDirReplicate` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

    2. To disable the job, remove the text `sapContentConnectorDirReplicate` from the field and save the file.

> **Note:** The job is always **disabled** (different than for the other jobs) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)). Like the other jobs, it the CRON trigger bean in the `alfresco-global.properties` is also disabled by default. This means, you have to enable this job on two places.

##### Execution time - sapContentConnectorDirReplicate

The execution time for the job is stored as a value for the following property of the related SAP System Configuration:

```text
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

This value is a CRON expression that provides the most flexible way of executing the job. By default, the job is triggered every full minute.

##### CRON trigger bean - sapContentConnectorDirReplicate

To disable the CRON trigger bean for the `sapContentConnectorDirReplicate` job, set the following property in the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is no longer considered and has no effect.

> **Note:** Changing the execution time or enabling/disabling the job requires a restart of Content Services.

### Configure behaviors

The SAP Connector offers three behaviors which accomplishes different tasks on updating or creating documents.

The behaviors connect from Content Services to the SAP system via the SAP Java Connector. Each behavior invokes a different function module on the SAP side. In contrast to the Jobs, Behaviors are used to trigger an action on the SAP side rather then replicate metadata. The following behaviors are available:

| Behavior Name | Description |
| ------------- | ----------- |
| sapContentConnectorCreateArchivelink | Connect documents stored in Alfresco to existing SAP Business Objects. |
| sapContentConnectorBarcode | Add the barcode to the SAP external barcode table. |
| sapContentConnectorWorkflow | Start a SAP Workflow for a specified SAP user attaching the current document. |

> **Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

#### Behavior: sapContentConnectorCreateArchivelink {#createArchivelinkBehavior}

The behavior is responsible to connect the current document based on entered metadata to an existing SAP Business Object. Therefore, the `SAP Create Archivelink Aspect` is used. To connect a document to an SAP Business Object, the `SAP Create Archivelink Aspect` must be added and its values must be filled. Along with the `SAP Create Archivelink Aspect` the `SAP Connection Details` aspect will be added automatically.

Once all mandatory properties of the aspects are set and the document is saved, the behavior fires `onUpdateProperties` and invokes a SAP function module which will create the related entries in the SAP tables based on the aspect data. The current document is then available in the attachment list of the related SAP Business Object.

The following table lists the required data of the aspect which are required to connect the SAP Business Object:

| Property  | Description |
| --------- | ----------- |
| SAP Document Type | The document type associated with the current `SAP Object Type`. |
| SAP Client | The SAP client used to store in the SAP tables. |
| SAP Object Id | The object id of the SAP Business Object where the current document should be connected to. |
| SAP Object Type | The object type (e.g. `BKPF`, `EQUI`, `BUS2012`,...). |
| SAP Document Class | Document class (e.g. PDF). |
| SAP Filename | The file name used to display in the attachment list of the SAP Business Object. |
| SAP Description | The description used as short-description for the attachment in the attachment list |
| SAP Creator | The SAP user that should be used in SAP as creator of the attachment. |
| SAP Archive Date | The archive date to be stored in SAP. |

Because the `SAP Connection Details` aspect was automatically added along with the `SAP Replicate Plus Details`,
there is a need to set the mandatory `SAP Content Repository` as well.

The `SAP Replicate Plus Details` and `SAP Connection Details` aspects with example values:

![sap_conf_aspect_sap-createarchivelink]({% link sap/images/sap_conf_aspect_sap-createarchivelink.png %})

##### Enable / Disable behavior - sapContentConnectorCreateArchivelink

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})

    1. To disable the behavior, remove the text `sapContentConnectorCreateArchivelink` (including the comma) from the field and save the file.
    2. To enable the behavior, add the text `sapContentConnectorCreateArchivelink` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)).

> **Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

#### Behavior: sapContentConnectorBarcode {#sapContentConnectorBarcodeBehavior}

This behavior will add the `SAP Connection Details` aspect to each document where the aspect `SAP Barcode Details` was added before. With this, the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob) is able to process the documents.

> **Note:** Always enable/disable the Barcode behavior together with the Barcode job. Just one of both enabled would result that the Barcode scenario is not working.

##### Enable / Disable the behavior - sapContentConnectorBarcode

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})

    1. To disable the behavior, remove the text `sapContentConnectorBarcode` (including the comma) from the field and save the file.

        > **Note:** If disabled, also the related Job with same name in the **Enabled Jobs** field should be disabled.

    2. To enable the behavior, add the text `sapContentConnectorBarcode` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)).

#### Behavior: sapContentConnectorWorkflow {#workflowBehavior}

The behavior will create a new inbox task for a SAP user in his SAP Business Workplace (transaction `SBPW`) in the SAP system. The current document will be attached to this task as a reference link. The inbox task can be related to any SAP Workflow then (depends on SAP customizing). To invoke the behavior, the `SAP Workflow Details` aspect must be added to a document in Content Services. Along with this aspect the required `SAP Connection Details` aspect is added automatically. The mandatory aspect values must be filled and if the properties are saved, the behavior is invoked (`onUpdateProperties`).

The following table lists the required data of the aspect that's required to create the inbox task for the SAP user:

| Property  | Description |
| --------- | ----------- |
| Start SAP Workflow | Whether to create the SAP Workflow inbox task for the `Username` below if the properties are saved. |
| SAP Document Type | The document type customized with the Workflow. |
| SAP Document Class | Document class (e.g. PDF). |
| Userclass | The userclass. |
| Username | The user name of the SAP user which should receive the inbox task. |
| Late Archiving | To use late archiving or not. |

Here's the view from Alfresco Share if the aspects are available:

![sap_conf_aspect_sap-workflow]({% link sap/images/sap_conf_aspect_sap-workflow.png %})

##### Enable / Disable the behavior - sapContentConnectorWorkflow

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1. Navigate to related SAP Content Repository folder **Data Dictionary > SAP Content Connector > SAP Repositories > XX**
2. Edit the properties of the file **XX Repository**.
3. In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector.

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})

    1. To disable the behavior, remove the text `sapContentConnectorWorkflow` (including the comma) from the field and save the file.
    2. To enable the behavior, add the text `sapContentConnectorWorkflow` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        > **Note:** The changes reflects immediately. There is no restart of Content Services required.

> **Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (see [1. Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo)).

> **Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

### SAP Connector content model types

The SAP Connector offers a couple of predefined content model types which accomplishes the different tasks of the available jobs. This section describes all available content model types with their purpose.

The available content model types are closely related to the available SAP Connector jobs ([Configuring jobs](#configure-jobs)) and SAP Connector behaviors ([Configuring behaviors](#configure-behaviors)). The types are already prepared with the necessary aspects.

The SAP Connector offers the following predefined content model types:

* SAP ArchiveLink Document
* SAP Barcode
* SAP Workflow

#### Changing content model types

To change the existing type of the document to a SAP Connector type, follow the Content Services documentation for **Change Type**. The following screenshot shows the available types while executing the **Change Type** action in Alfresco Share:

![sap_conf_types_change_contenttype]({% link sap/images/sap_conf_types_change_contenttype.png %})

> **Note:** A special case for all SAP Connector Content Model types, the `SAP Document Id` in aspect `SAP Connection Details`, is usually created by SAP internally (with a unique number). Because these SAP Connector scenarios all start from Content Services and not from the SAP side, there is a need to create these Ids in Content Services. Therefore, to get a unique number, the SAP Connector uses the UUID of the current document (property `sys:node-uuid`). However, this does not affect the later process.

#### SAP Archivelink Document type {#archivelinktype}

The `SAP Archivelink Document` type allows you to link a document in Alfresco manually to its corresponding business object in SAP. Based on the properties that must be entered during the creation, the connection to the SAP business object will be done automatically.

> **Note:** Make sure you've enabled [Behavior: sapContentConnectorCreateArchivelink](#createArchivelinkBehavior).

To link a document to a corresponding SAP Business Object by the `SAP Archivelink Document` type:

1. Change the type of the document to `SAP Archivelink Document`.
2. Edit the properties of the document and enter all mandatory fields for the `SAP Create Archivelink Details` and `SAP Connection Details` aspects:

    ![sap_conf_types_archivelink_properties]({% link sap/images/sap_conf_types_archivelink_properties.png %})

3. Save the document. Now the [Behavior: sapContentConnectorCreateArchivelink](#createArchivelinkBehavior) will be invoked and call a related SAP function module which will create the necessary table entries.
4. The current document is now available as attachment for the SAP Business Object (matching the aspect values).

> **Note:** To connect a document of any other type, add the `SAP Create Archivelink Details` aspect to that document and provide the related aspect values that match an SAP Business Object.

#### SAP Barcode type

The `SAP Barcode` type allows you to process a document in Alfresco with the barcode scenario (as certified by the SAP HTTP-Content Server). Based on the barcode entered as a value for the related aspect, the SAP Connector invokes an SAP function module which creates the entry in the **External Barcode** table in SAP.

* If the barcode already exists in SAP, the document is available immediately as an attachment for the related SAP Business Object (i.e. Late Archiving).
* If the barcode isn't yet in SAP, the document will be attached to an SAP Business Object when an SAP user enters the barcode (i.e. Early Archiving).

> **Note:** Make sure you've enabled the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob).

To link a document to an SAP Business Object by the `SAP Barcode` type:

1. Change the type of the document to `SAP Barcode`.
2. Edit the properties of the document and enter the mandatory fields for the `SAP Connection Details` and `SAP Barcode Details` aspects:

    ![sap_conf_types_barcode_properties]({% link sap/images/sap_conf_types_barcode_properties.png %})

3. Save the document.

    Depending on the CRON expression of the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob), the job will pick up the document and create the necessary entry in the **External Barcode** table (check transaction `OAM1`) of the SAP system.

    * For Late Archiving, the document is immediately available as an attachment on the related SAP Business Object.
    * For Early Archiving, the document is available as soon as the SAP user manually enters the matching barcode on an SAP Business Object.

> **Note:** To use the barcode with any other Content Services content type, add the `SAP Barcode Details` aspect to a document **and** make sure to have the [Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) **in addition** to the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob) enabled for the current SAP System Configuration.

#### SAP Workflow type

The `SAP Workflow` type allows you to create a new inbox task (SAP Workflow) for a SAP user with the current document attached. The SAP Workflow to be started must be customized in SAP.

> **Note:** Do not confuse **Alfresco Workflow** with **SAP Workflow**.

> **Note:** Related transaction in SAP to view the inbox tasks of a user: `SBWP`.

To create a new inbox task (SAP Workflow) for a SAP user including the current document by the `SAP Workflow` type, proceed with the following steps:

1. Change the type of the document to `SAP Workflow`.
2. Edit the properties of the document and enter all mandatory fields for the `SAP Connection Details` and `SAP Workflow Details` aspects:

    ![sap_conf_types_sapworkflow_properties]({% link sap/images/sap_conf_types_sapworkflow_properties.png %})

3. If the inbox task should be created immediately, make sure to check **Start SAP Workflow**.
4. Save the document. Now the [Behavior: sapContentConnectorWorkflow](#workflowBehavior) will be invoked and call a related SAP function module (`ARCHIV_PROCESS_RFCINPUT`) which will create the inbox task for the user.

    > **Note:** As long as `Check SAP Workflow` is disabled, the behavior will not consider the current document.

5. The current document is now available as attachment (link to the document in Content Services) of an inbox task assigned to the user in SAP.

## Configure GenericXchange

The GenericXchange module is used for flexible data exchange either via a secure Remote Function Call (RFC/SNC) connection or by invoking an Open Data Protocol (OData) service on the related SAP System (either SAP Cloud Essentials or SAP S/4HANA on-premises).

To configure this module, see the Alfresco Content Connector for SAP Cloud documentation, [Configure GenericXchange]({% link sap-cloud/latest/config/genericxchange.md %}){:target="_blank"}.

## Open associated Business Object in SAP {#openassocbusinessobjinsap}

This feature allows you to open the corresponding SAP Business Object that's linked to a document in Alfresco Share. This action is provided in the **Document Actions** menu, and once clicked it opens the SAP Web-GUI and invokes the SAP Business Object in the related transaction.

The feature is available for documents in Content Services that have the `SAP Replicate Details` aspect applied.

A prerequisite is to have the [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob) enabled and running.

> **Note:** To log in to the SAP Web-GUI, an SAP user is required.

### Configuration

Use these steps to configure opening an associated SAP Business Objects in SAP.

1. Before you continue, make sure that the job is enabled: [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob).

    The related document action is only available in Alfresco Share, and only for documents with the **SAP Replicate Details** and **SAP Connection Details** aspects applied.

2. The required properties from these aspects are:

    1. `SAP Content Repository` (aspect `SAP Connection Details`)
    2. `SAP Object Type` (aspect `SAP Replicate Details`)
    3. `SAP Object Id` (aspect `SAP Replicate Details`)

3. Set the following properties in the `alfresco-global.properties` for the desired SAP System Configuration:

    | Property | Description |
    | -------- | ----------- |
    | integrations.sap.system.1.webClient.enabled | Enable or disable the feature for all SAP Content Repositories related to the SAP System Configuration. |
    | integrations.sap.system.1.webClient.url | Specify the base URL to the SAP Web application server. |

    > **Note:** Any property changes require a restart of Content Services.

The following table lists all available `SAP Object Types`, which are supported by default, including their associated `Transaction`. These are used to open the corresponding SAP Business Object. The parameter in the `Field Names in URL` column are automatically filled with the related values from the aspects.

| SAP Object Type | SAP Transaction | Field Names in URL |
| --------------- | --------------- | ------------------ |
| BKPF | FB03 | RF05L-BELNR, RF05L-BUKRS, RF05L-GJAHR |
| BUS1065 | PA40 | RP50G-PERNR |
| BUS1001006 | MM03 | RMMG1-MATNR |
| BUS2010 | ME43 | RM06E-ANFNR |
| BUS2012 | ME23 | RM06E-BSTNR |
| BUS2032 | VA03 | VBAK-VBELN |
| BUS2017 | MB03 | RM07M-MBLNR, RM07M-MJAHR |
| BUS2081 | MIR4 | RBKP-BELNR, RBKP-GJAHR |
| BUS2078 | QM03 | RIWO00-QMNUM |
| BUS2081 | MIR4 | RBKP-BELNR, RBKP-GJAHR |
| BUS2105 | ME53 | EBAN-BANFN |
| EQUI | IE03 | RM63E-EQUNR |
| KNA1 | VD03 | RF02D-KUNNR, RF02D-D0110 |
| LFA1 | MK02 | RF02K-LIFNR, RF02K-D0110 |
| PREL | PA20 | RP50G-PERNR |
| VBRK | VF03 | VBRK-VBELN |

If you need to to call anything other than the default SAP Object Types, refer to the following:

* [Advanced configuration](#OpenBusinessObjectSAPAdvancedConfig).
* [Reference for SAP Object Type Mapping]({% link sap/5.3/admin/reference.md %}#refsapobjecttypemap).

### Advanced configuration {#OpenBusinessObjectSAPAdvancedConfig}

If there is a need to open SAP Business Objects of `SAP Object Types` which are not covered by default, there is a way to override the default settings globally or even for each SAP System Configuration.

As template file to override these settings use file `webClient-config.properties` in the reference section. Alternatively, this template can be found in the exploded web-application in folder `<app-srv_root>/webapps/alfresco/WEB-INF/classes/alfresco/module/sap-content-connector-repo/webClient-config.properties` as well.

#### Override defaults globally

To override the default settings globally, meaning for each available SAP System Configuration:

1. Extend or change the `webClient-config.properties` template according your needs.
2. Upload the file into folder **Data Dictionary→ SAP Content Connector→ Configuration** (create folder **Configuration** if it does not exists). The changes will reflect immediately.

![sap_feature_openinsap_conf_001]({% link sap/images/sap_feature_openinsap_conf_001.png %})

#### Override defaults for individual SAP System Configuration

It's also possible to override the `SAP Object Types` for an individual SAP System Configuration, hence for a dedicated SAP Content Repository / SAP system. This might be important if there are SAP Content Repositories of different SAP systems (having different versions or patch levels) connected to Content Services which requires different parameters to call the transactions.

The basic approach to override the settings is to extend the the **file name** of `webClient-config.properties` with the number of the SAP System Configuration in the following format:

```text
webClient-config.sap.system.<X>.properties
```

> **Note:** The `.sap.system.` in the name is always fixed, and the `X` must be replaced by the number of the SAP System Configuration.

> **Note:** If there is a need to have at least one individual file available, you must create and upload the files for each other SAP System Configuration as well - even if they just contains the default settings!

To override the settings for an SAP System Configuration:

1. Copy the file `webClient-config.properties` and rename it according the above specification, e.g. to `webClient-config.syp.system.1.properties`.
2. Do the same for each SAP System Configuration in the `alfresco-global.properties`.
3. Extend or change the `webClient-config.sap.system.<X>.properties` according your needs.
4. For all other files leave the default content.
5. Upload all files into folder **Data Dictionary→ SAP Content Connector→ Configuration** (create folder **Configuration** if it does not exists). The changes will reflect immediately.

![sap_feature_openinsap_conf_002]({% link sap/images/sap_feature_openinsap_conf_002.png %})

#### Add a new SAP Object Type

To add a new `SAP Object Type` that allows the user to open the associated SAP Business Object in a transaction that's not covered by default:

1. Provide the `webClient-config.properties` (or individual `webClient-config.sap.system.<X>.properties`) as described above.
2. Enter each new `SAP Object Type` as a new line at the end of the file.
3. Split the `SAP Object Type` and the URL by an equals sign.
4. Provide all necessary parameter for the URL required to invoke the transaction via SAP Web-Gui.

The following macros are supported as values for URL parameter, if applicable :

| Macro Name | Description |
| ---------- | ----------- |
| %SAP_CLIENT% | The SAP Client, specified in the `alfresco-global.properties` for the SAP System Configuration. |
| %SAP_OBJECT% | The `SAP Object Type`, read from aspect value `connexasReplicate:sapobject`. For example `BKPF` (see [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob)). |
| %SAP_ARCHIVE_OBJECT% | The `SAP Document Type`, read from aspect value `connexasReplicate:saparchiveobject`. For example `Z_INV_XX`. |
| %SAP_OBJECT_ID% | The `SAP Object Id`, read from aspect value `connexasReplicate:sapobjectid`. |
| %SAP_RESERVE% | The `SAP Reserve`, read from aspect value `connexasReplicate:sapreserve`. For example `PDF`. |

If there is a need to have only a part of the macro value (substring) available for a parameter, the following notation like demonstrated for the `SAP Object Id` below must be used:

```text
%SAP_OBJECT_ID{0:4}%
```

This extracts the substring beginning from 0 to 4. The start index is included while the end index is not included (as usual for Java programming language).

As an example, to override the `SAP Object Type` **BKPF** (opens transaction `FB03`), the following line can be added to the file:

```text
BKPF=?~sap-client=%SAP_CLIENT%**&~transaction=FB03%20RF05LBELNR=%SAP_OBJECT_ID{4:14}%;RF05L-BUKRS=%SAP_OBJECT_ID{0:4}%;RF05LGJAHR=%SAP_OBJECT_ID{14:18}%&~okcode=/00
```
