---
title: Configure Content Connector for SAP Applications
---

Use this information to configure the SAP Connector. Check the following SAP access privileges in order to continue 
with the configuration.

To configure the SAP Connector properly on SAP side, a **SAP dialog user** is required who has access to the following 
SAP transactions:

|SAP Transaction|Description|
|---------------|-----------|
|`OAC0`|Define and maintain SAP Content Repositories which includes the storage system (Alfresco) for the documents.|
|`OAC2`|Define global document types and assign document classes. Required for end-user testing.|
|`OAC3`|Link SAP Content Repositories, document types and SAP object types. Assign retention periods. Required for end-user testing.|
|`SE38`|Run and edit SAP function modules (ABAP programs). Required for functional testing (RSCMST).|

## Basic configuration

In this section, you'll create and configure a new SAP Content Repository where the (Content Server) is 
Alfresco Content Services. In addition, the connection between the SAP Content Repository and Alfresco Content Services 
is secured by a certificate and tested.

### 1. Create SAP Content Repository

Create a new SAP Content Repository which points to Alfresco Content Services.

The maintenance screen for creating new SAP Content Repositories can be accessed with transaction `OAC0`.

1.  In the SAP Content Repository overview, click **Display/change** (**CTRL+F4**).

    Another icon appears: **Create** (**F5**). Click on it to create a new SAP Content Repository.

    ![sap_conf_001_0ac0]({% link sap/images/sap_conf_001_0ac0.png %})

2.  Enter mandatory values for the new repository.

    Refer to the below table to choose correct settings. Values in **bold** must match exactly the values given in the table. The other values are customer specific and needs to be adapted according to your environment. 

    ![sap_conf_002_create_repo_initial]({% link sap/images/sap_conf_002_create_repo_initial.png %})

    |Field|Description|Value|
    |-----|-----------|-----|
    |Content Rep.|The name of the new repository. Remember the SAP naming conventions (only 2 characters allowed for Archivelink).|XX|
    |Description|A brief description for the repository (max 50 characters).|Alfresco Content Services via SAP Connector|
    |Document Area|The document area for the documents.|**Archivelink**|
    |Storage Type|The storage type of the repository.|**HTTP content server**|
    |Version no.|Number of the current SAP content server version. For content server version 4.7 enter 0047.|0047|
    |HTTP Server|The IP address of the Alfresco Content Services server - or the Load Balancer.|85.112.116.117|
    |Port Number|The port number where the Alfresco Content Services is listening - usually 8080.|8080|
    |SSL Port Number|The port number for secure layer. Only required for [Communication via HTTPS](TODO:sap-connector-comms.md). For now, leave empty!| |
    |HTTP Script|The Web Script location in Alfresco Content Services where all requests from SAP are processed.|**alfresco/service/com/alfresco/sap/http**|
    |Transfer drctry|For some ArchiveLink scenarios files has to be created in a transfer directory (SAP side) before sending it to the content server. Maintain it, if the default value does not match your company standard.| |

3.  Click either on icon **Test connection** or on icon **Status information**.

    In both cases, a message appears saying the content repository does not exist.

    >**Note:** Any other message than *Content repository XX does not exist* indicates an issue with the network connection between the SAP server and the Alfresco server. In such a case, double-check the login credentials for Alfresco (`alfresco-global.properties`) and make sure Alfresco is available.

    ![sap_conf_004_create_repo_values_with_check]({% link sap/images/sap_conf_004_create_repo_values_with_check.png %})

4.  Save the current repository configuration (click **Save** on the bottom line) before proceeding with the next steps.

5.  To create the repository on the content server click on icon **CS Admin** (**C**ontent **S**erver **Admin**istration) in the middle of the screen, besides the **Test connection** icon.

    ![sap_conf_005_cs_admin]({% link sap/images/sap_conf_005_cs_admin.png %})

6.  In the administration area, the repository has to be created by the **Create repository** icon on the left. It is available in section **Create**.

    ![sap_conf_006_create_repo_cs_admin]({% link sap/images/sap_conf_006_create_repo_cs_admin.png %})

7.  If the repository has been created successfully, you'll be redirected to the **Details** section. At the bottom of this screen, you'll see already some basic repository information coming "live" from Alfresco Content Services.

    ![sap_conf_007_create_repo_cs_admin_done]({% link sap/images/sap_conf_007_create_repo_cs_admin_done.png %})

8.  Click the **Save** (**CTRL + S**) button in the bottom bar to save the changes again.

    After saving, the screen can be closed by clicking on **Exit** button in the top right toolbar.

### 2. Secure connection using a certificate

Create a certificate in SAP that will be stored in Alfresco Content Services to allow only authorized requests from 
the SAP Content Repository.

By default, all HTTP(S)-requests coming from the SAP Content Repository and arriving via the SAP Connector in 
Alfresco Content Services are dropped until a certificate is available and active (you can disable the certificate 
check in the `alfresco-global.properties` file).

>**Important:** We strongly recommend securing the connection between SAP and Alfresco at all times.

1.  Open the newly created SAP Content Repository for editing in transaction `OAC0` again.

2.  Navigate to the Content Server Administration by clicking the **CS Admin** button.

3.  Switch to section **Certificates** and refer to the **Certificates Properties** table at the bottom (which is still empty).

4.  Click the button **Send certificate** (mail icon) to send a certificate to the SAP Content Repository.

    ![sap_conf_008_create_repo_cs_admin_certificate]({% link sap/images/sap_conf_008_create_repo_cs_admin_certificate.png %})

5.  The certificate was sent to Alfresco Content Services. Therefore, it appears in the table **Certificates Properties** - but it is not yet activated. Checkbox in column **Active** is not selected.

    ![sap_conf_009_create_repo_cs_admin_certificate_created]({% link sap/images/sap_conf_009_create_repo_cs_admin_certificate_created.png %})

    >**Note:** By SAP HTTP-Content Server protocol specification, the certificate can only be activated from content repository side. This is an additional security step. Therefore, no additional action is necessary on SAP side. Switch to Alfresco Content Services and proceed with the activation in the next step.

### 3. Enable security by activating the certificate

Activate the certificate in Alfresco Content Services to process authorized requests only.

There are two options for activating the recently sent certificate. Either activate it in the 
SAP Connector - Administration Console (recommended and preferred way) or manually edit the related property at the 
certificate document in the Alfresco repository.

1.  **Activation via SAP Connector - Administration Console:**

    1.  Login to Alfresco Share and navigate to the SAP Connector - Administration Console (via menu *Admin Tools* → *SAP Integration*).

    2.  Scroll down to the related SAP System Configuration where the recently created SAP Content Repository belongs to.

    3.  Click the **Enable certificate for content repository XX** button. 
    
        ![sap_conf_010_share_certificate_before]({% link sap/images/sap_conf_010_share_certificate_before.png %})

    4.  The connection is now secured by the certificate. 
    
        ![sap_conf_010_share_certificate_after]({% link sap/images/sap_conf_010_share_certificate_after.png %})

2.  **Activation by manually editing the certificate properties:**

    1.  Login to Alfresco Share and navigate to the following (new) folder structure in the Alfresco repository to find the recently created certificate document: **Repository → Data Dictionary → SAP Content Connector → SAP Repositories → XX**.

    2.  Within the **XX** folder two files are available. The repository file (with name `XX Repository`) and the certificate document (contains the common name of the SAP system in the document name).

        ![sap_conf_011_share_certificate_in_repo]({% link sap/images/sap_conf_011_share_certificate_in_repo.png %})

    3.  Edit the properties of the certificate document and select checkbox **Certificate Active** and **save** the document.

        ![sap_conf_012_share_certificate_properties]({% link sap/images/sap_conf_012_share_certificate_properties.png %})

        The connection is now secured by the certificate.

### 4. Check certificate in SAP

Control step to confirm that the certificate activation in Alfresco Content Services reflects in the SAP system for 
the SAP Content Repository.

To proof that the activation of the certificate from the previous step reflects immediately for the 
SAP Content Repository, check the certificate section of the SAP Content Repository.

1.  In the SAP system, open the created SAP Content Repository in transaction `OAC0` again.

2.  Click button **CS Admin**.

3.  Switch to **Certificates** section and refer to table **Certificate Properties**.

4.  In column **Active** the checkbox is now selected.

    ![sap_conf_013_sap_certificate_active]({% link sap/images/sap_conf_013_sap_certificate_active.png %})

### 5. Functional Test

This page describes how the SAP Connector and therefore the ArchiveLink interface can be tested. The testing requires 
some additional SAP fundamentals, and is based on the same procedure used by SAP to certify the SAP Connector 
content ArchiveLink interface.

>**Note:** In order to successfully complete these tests, all mandatory steps described in the Basic configuration section should have been completed.

1.  In SAP, open the **ABAP** editor with transaction `SE38`.

2.  Enter `RSCMST` as report name in the **Program** field and execute it (click **Execute** in the toolbar or press **F8**).

    ![sap_conf_014_sap_rscmst_1]({% link sap/images/sap_conf_014_sap_rscmst_1.png %})

3.  In the **Repository** field enter the name of the recently created SAP Content Repository and click **Execute** in the toolbar or press **F8**.

    ![sap_conf_014_sap_rscmst_2]({% link sap/images/sap_conf_014_sap_rscmst_2.png %})

4.  In the next screen, all sub-reports are listed that could be executed against the repository.

    ![sap_conf_014_sap_rscmst_3]({% link sap/images/sap_conf_014_sap_rscmst_3.png %})

5.  The most important report is `RSCMSTH0`. This will test the basic communication like `create`, `info`, `search`, `update` or even `delete` commands via HTTP against the repository. Click the **Execute** icon for the report.

6.  The report return with success if the SAP Content Repository was properly configured and hence, the SAP Connector is working.

    ![sap_conf_014_sap_rscmst_4]({% link sap/images/sap_conf_014_sap_rscmst_4.png %})

7.  **Optional 1:** If you’re interested in more technical details of the test, then click the **Details** icon near the green result. In this screen, each function call with its parameter is logged that was sent [to Alfresco]. Scroll down to the end of the detail page and find a summary of the functions which was tested including times.

    ![sap_conf_014_sap_rscmst_6]({% link sap/images/sap_conf_014_sap_rscmst_6.png %})

8.  **Optional 2:** You can execute some further test reports against the repository. This will test additional functionality of the HTTP interface. The additional available test reports are: `RSCMSTH1`, `RSCMSTH2` and `RSCMSTH3`.

    ![sap_conf_014_sap_rscmst_5]({% link sap/images/sap_conf_014_sap_rscmst_5.png %})

    >**Note:** For SAP BASIS component 740 up to (at least) 752 there is a known bug in the `RSCMSTH2` report! If the report returns with plenty issues regarding document protection like `DOC_P[rc]`, refer to the following SAP OSS notes: 2371386, 2198970. Skip this report unless the notes are implemented.

## Advanced configuration

This section basically describes all additional configuration options for the SAP Connector to replicate metadata 
from the SAP Business Object to the document in Alfresco Content Services.

If a document is stored in SAP via the SAP Content-Server HTTP-Interface on a content server, SAP submits only 
three additional properties in the HTTP-request (besided the content itself). These are the `SAP Content Repository` 
(name of the SAP Content Repository), the `SAP Document Id` (unique number created from SAP to identify the object) 
and the `SAP Component Id` (hidden in the Alfresco Share UI because of non-human readable values). 
The additional parameters will show up in an aspect with name `SAP Connection Details` at the document.

![sap_conf_aspect_sap-connection-details]({% link sap/images/sap_conf_aspect_sap-connection-details.png %})

However, there may be a lot of additional reasons to have more information from the SAP Business Object in 
Alfresco Content Services available than just these few, which are also not very meaningful to a user, by the way. 

The SAP Connector offers the capability to make additional metadata available outside SAP already by default. 
To get additional metadata out of SAP and store it at the document in Alfresco Content Services, 
the connection to SAP is done through the SAP JavaConnector (JCo). Furthermore, the SAP Connector takes advantage 
of different ways to trigger an action which results in the metadata replication. 

These are mainly Jobs and Behaviors, but also event-based action is possible. The replicated information will be 
provided in connexas related aspects at the documents in Alfresco Content Services.

### Enabling Alfresco - SAP communication

This chapter basically describes all additional configuration settings for the SAP Connector to replicate metadata 
from the SAP Business Object to the document in Alfresco Content Services.

The SAP Connector takes advantage of the SAP JavaConnector to establish the connection from Alfresco Content Services 
to the SAP system. The required connection parameters must be provided in the `alfresco-global.properties`. 
All related parameters are already available in the file (refer to 
[Extending alfresco-global.properties](TODO:sap-connector-extend-props.md)) but must still be adapted to your SAP system. 
The following property keys are required for the connection (for description of each refer to 
[Extending alfresco-global.properties](TODO:sap-connector-extend-props.md)).

|Property Key|
|------------|
|integrations.sap.system.1.enabled|
|integrations.sap.system.1.name|
|integrations.sap.system.1.host|
|integrations.sap.system.1.client|
|integrations.sap.system.1.systemNumber|
|integrations.sap.system.1.user|
|integrations.sap.system.1.password|
|integrations.sap.system.1.language|
|integrations.sap.system.1.webClient.enabled|
|integrations.sap.system.1.webClient.url|
|integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled|
|integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression|
|integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled|
|integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression|
|integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled|
|integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression|
|integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled|
|integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression|

>**Important:** The properties above are only required to connect from Alfresco Content Services to SAP. There are still other properties required to specify a valid SAP System Configuration. Refer to [Installing SAP Connector]({% link sap/latest/install/index.md %}).

1.  SAP Content Repositories

    There is no limitation in the number of SAP Content Repositories that can be created and connected to Alfresco Content Services (only SAP restrictions apply). For one connected SAP system you can use one SAP System Configuration of the SAP Connector in the `alfresco-global.properties`. All SAP Content Repository names can be entered as comma-separated list for the `archiveIds` parameter. Example:

    `integrations.sap.system.1.al.archiveIds = Archive1[,Archive2, ArchiveN]`

2.  Using Wildcard

    CAUTION:

    The usage of a Wildcard (`*`) for parameter `archiveIds` is not recommended anymore. For setting up metadata replication specify each SAP Content Repository by its name in the `archiveIds` parameter.

#### Configuring jobs

The SAP Connector offers a couple of predefined jobs which accomplishes different tasks. This section describes all 
available jobs with their purpose and how each of them can be configured.

The jobs connect from Alfresco Content Services to the SAP system via the SAP Java Connector. Each job invokes a 
different function module on SAP side. Values that are returned (except for the 
[Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob)), are stored in properties and displayed 
within a separate aspect on the document.

>**Note:** The CRON trigger beans for all available jobs are disabled by default in the `alfresco-global.properties`.

**Enable / Disable jobs (CRON trigger bean)**

The SAP Connector offers the capability to disable the related CRON trigger bean of each job during Alfresco Content Services 
startup. This must be done in the `alfresco-global.properties`. Once disabled, the class for the job is never executed, 
which takes load from the system.

>**Note:** The recommendation is to disable the CRON trigger beans for each job that is not needed.

>**Note:** This affects **all** SAP Content Repositories which are defined for the related SAP System Configuration. Once a CRON trigger bean for a job is disabled in the `alfresco-global.properties` the related setting at the repository file has no effect.

**SAP Function Modules**

The following table lists the SAP function modules or tables, invoked by the different jobs.

|Job Name|SAP Function Module or Table|
|--------|----------------------------|
|sapContentConnectorReplicate|`ARCHIV_GET_CONNECTIONS`|
|sapContentConnectorPlus|Table `TOAAT`|
|sapContentConnectorBarcode|`BAPI_BARCODE_SENDLIST`|
|sapContentConnectorDirReplicate|`BAPI_DOCUMENT_GETDETAIL2`|

##### Job: sapContentConnectorReplicate {#sapContentConnectorReplicateJob}

The job is responsible for replicating common metadata of the SAP Business Object to make it available at the 
associated document in Alfresco Content Services. The job can be enabled and used without any further 
requirement or prerequisites.

The following table lists all the metadata that are accessible by the standard function module and that 
will be replicated:

|Property Name|Description|
|-------------|-----------|
|SAP Client|The SAP client that was used to store the document on SAP side.|
|SAP Object Type|The SAP business object type that is linked to the document.|
|SAP Document Type|The SAP ArchiveLink document type which the document has been stored with in SAP.|
|SAP Object Id|The SAP Business Object Id (unique identifier in SAP) that is linked to the document.|
|SAP Reserve|The file extension of the document stored from SAP, e. g. PDF.|
|SAP Archive Date|The date when the current document was stored in Alfresco Content Services or when an existing document was connected to SAP.|
|SAP Deletion Date|The delation date that is usually used to save the earliest date the object can be deleted from the connected archive. This information will only be available if the customizing on the SAP side has been done accordingly (maintain the retention period in transaction `OAC3`).|

The metadata will appear in an aspect `SAP Replicate Details` for the document in Alfresco Content Services. 

![sap_conf_aspect_sap-replicate]({% link sap/images/sap_conf_aspect_sap-replicate.png %})

**Enable / Disable the job**

The job can be enabled or disabled at the repository file for each SAP Content Repository:

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})
    
    1.  To disable the job, remove the text `sapContentConnectorReplicate` (including the comma) from the field and save the file.
    2.  To enable the job, add the text `sapContentConnectorReplicate` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.
        
>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

**Execution time**

The execution time for the job is stored as value for key

```text
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

of the related SAP System Configuration. The value is a CRON expression to provide the most flexible way of executing 
the job. As default value the job is triggered every full minute.

**CRON trigger bean**

To disable the CRON trigger bean for the `sapConnectorReplicate` job, set the following property key in the 
`alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapConnectorReplicate.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is not considered anymore and has no effect.

>**Note:** Changing the execution time or enabling/disabling the job requires a restart of Alfresco Content Services.

##### Job: sapContentConnectorPlus {#sapContentConnectorPlusJob}

The job is responsible for replicating additional metadata of the SAP Business Object to make it available at the 
associated document in Alfresco Content Services. The job can be enabled and used without any further 
requirement or prerequisites.

The following table lists the additional metadata that will be replicated:

|Property Name|Description|
|-------------|-----------|
|SAP Creator|The SAP user name who stored the document.|
|SAP File Name|The original filename of the uploaded file.|
|SAP Description|The short description field where the user can enter some brief information in SAP before storing the document.|

The metadata will appear in an aspect `SAP Replicate Plus Details` for the document in Alfresco Content Services. 
For example, this information can be used to rename the document in Alfresco Content Services with its original name 
(instead of *data*) and / or to provide the description of the SAP Business Object also as description for the document 
in Alfresco Content Services. 

![sap_conf_aspect_sap-replicate_plus]({% link sap/images/sap_conf_aspect_sap-replicate_plus.png %})

**Enable / Disable the job**

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})
    
    1.  To disable the job, remove the text `sapContentConnectorPlus` (including the comma) from the field and save the file.
    2.  To enable the job, add the text `sapContentConnectorPlus` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

**Execution time**

The execution time for the job is stored as value for key:

```text
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression = 0 0/1 * 1/1 * ? *
```

of the related SAP System Configuration. The value is a CRON expression to provide the most flexible way of 
executing the job. As default value the job is triggered every full minute.

**CRON trigger bean**

To disable the CRON trigger bean for the `sapContentConnectorPlus` job, set the following property key in the 
`alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is not considered anymore and has no effect.

>**Note:** Changing the execution time or enabling/disabling the job requires a restart of Alfresco Content Services.

##### Job: sapContentConnectorBarcode {#sapContentConnectorBarcodeJob}

The job is responsible for storing related information from the documents having the `SAP Barcode Details` aspect in 
the external Barcode table of the SAP system. The job requires the related 
[Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) as well as SAP customization (see below). 
The job is implemented for batch processing. This means, all existing Barcode documents in Alfresco Content Services 
will be considered and processed as long as they are not already successfully linked.

In Alfresco Content Services the aspect `SAP Barcode Details` is related to the job. This aspect must be present at 
the document to be considered as barcode document that should be linked to SAP by the job.

![sap_conf_aspect_sap-barcode]({% link sap/images/sap_conf_aspect_sap-barcode.png %})

If the `SAP Barcode Details` aspect is added to a document, the related [Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) 
is invoked automatically and will add the required `SAP Connection Details` aspect to the document. 
Therefore, also the mandatory `SAP Content Repository` of this aspect must be set.

The following table lists the additional data of the aspect required for the job. Both properties are mandatory:

|Property Name|Description|
|-------------|-----------|
|SAP Barcode|The barcode.|
|SAP Document Class|The file extension of the document, e. g. PDF.|

**Enable / Disable the job**

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector. 
    
    ![sap_conf_aspect_sap-connection_repository_jobs_barcode]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs_barcode.png %})
    
    1.  To disable the job, remove the text `sapContentConnectorBarcode` (including the comma before the name) from the field and save the file.
    2.  To enable the job, add the text `sapContentConnectorBarcode` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** Make sure the related behavior with same name is also enabled and therefore available in field for `Enabled Behaviors`.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

**Execution time**

The execution time for the job is stored as value for key

```text
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression = 0 0/1 * 1/1 * ? *
```

of the related SAP System Configuration. TThe value is a CRON expression to provide the most flexible way of executing 
the job. As default value the job is triggered every full minute.

**CRON trigger bean**

To disable the CRON trigger bean for the `sapContentConnectorBarcode` job, set the following property key in 
the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is not considered anymore and has no effect.

**SAP customization**

To run the `sapContentConnectorBarcode` job, the SAP system requires some customization to set up the barcode scenario.

1.  Open transaction `SPRO` then click on **SAP Reference IMG**
2.  Navigate though the structure shown below to find all related customization settings for `Bar Code Scenarios` (alternatively, enter the customization section via transaction `OAM1`).

    ![sap_conf_barcode_customization_sap]({% link sap/images/sap_conf_barcode_customization_sap.png %})

3.  Proceed with the necessary customization.

>**Note:** Detailed information about the SAP customizing for Barcode scenarios can be found in the SAP ArchiveLink documentation *Storage Scenarios with Integration of Bar Code Technology*.

##### Job: sapContentConnectorDirReplicate

The job is responsible for replicating metadata from a SAP Document Info Record (DIR) and make it available for the 
associated document in Alfresco Content Services. It supports metadata replication from the DIR document as well as 
from the superior document (pre-document), if exists. Furthermore, the `Draft` state of a DIR for documents uploaded 
through SAP Fiori applications is supported.

The following table lists the metadata that will be replicated from the SAP Document Info Record:

|Property Name|Description|
|-------------|-----------|
|Document Type|The document type of the object which is used to identify the document.|
|Document Number|The document number which is used to identify the document.|
|Document Part|Section of a document which is maintained as an independent document. Design departments, for example, can use document parts to divide up large documents such as design drawings into pages.|
|Document Version|The document version.|
|Description|The description from the Document Info Record.|
|SAP User|The user in SAP who has created the document info record.|
|SAP Client|The client in SAP which was used during the the document info record creation.|
|Deletion Flag|Shows whether the document is to be deleted during the next reorganization run.|
|CAD Indicator|Shows whether the object (e.g. BOM) was changed in the CAD system (Pro/Engineer, CATIA,..) or not.|
|Document Structure|Shows whether the object is part of a document structure.|
|Document State (internal)|Document status field.|
|Document State (external)|State of the document (language dependend) depending on the underlaying status network.|
|Lab/Office|Key for the design office, laboratory, or laboratory worker responsible.|
|Change Number|Number of the change master record which groups together logically linked documents and any other SAP objects (such as bill of material, routing, material).|
|Valid From|Date, from which the change object (for example, document) change is effective with the corresponding change number.|
|Authorization Group|The authorization group which is used to enable protect access.|
|Status Log|The status logs for each status change.|

The following metadata will be replicate from the related superior document, if any:

|Property Name|Description|
|-------------|-----------|
|Document Type|The document type of the superior document must not be the same as that of the document you are currently processing.|
|Document Number|The document number of the superior document.|
|Document Part|Section of the document, used as part of the document key identifying the superior document.|
|Document Version|Document version, used as part of the document key identifying the superior document.|

The metadata will appear in aspects `SAP Document Info Record (DIR) Details` and `SAP DIR Superior Document Details` 
for the document in Alfresco Content Services. 

![sap_conf_aspect_sap-dir]({% link sap/images/sap_conf_aspect_sap-dir.png %})

**SAP Customization Prerequisites**

To use the SAP Document Info Record replication job, the SAP Content Repository must be set up in a different way 
than explained earlier in [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md). 
The important change must be done in the **Document Area** selection. Instead of `Archivelink` the value 
`Document Management System` must be selected. Hence, use always a different SAP Content Repository than for Archivelink!

![sap_conf_003_create_repo_values_dms]({% link sap/images/sap_conf_003_create_repo_values_dms.png %})

>**Note:** Always use also a separate SAP System Configuration for SAP Document Management Service (DMS) related scenarios in the `alfresco-global.properties` and disable the CRON trigger bean at least for the [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob) and [Job: sapContentConnectorPlus](#sapContentConnectorPlusJob).

**Enable Draft state**

The job also supports the `Draft` state for SAP Document Info Records. This state comes into place if documents are 
uploaded through SAP Fiori applications. To consider the `Draft` state, a flag must be enabled on the repository file 
to replicate metadata even if the document is still in `Draft` state. 

To enable the `Draft` state:

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → M3**
2.  Edit the properties of the file **M3 Repository**.
3.  In aspect `SAP Connection Repository Details` enable the flag for `Enable Draft for SAP Document Info Records (DIR)` 

    ![sap_conf_aspect_sap-connection_repository_dir_draft]({% link sap/images/sap_conf_aspect_sap-connection_repository_dir_draft.png %})

**Enable / Disable the job**

The job can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field `Enabled Jobs` available containing a list of all jobs of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_jobs]({% link sap/images/sap_conf_aspect_sap-connection_repository_jobs.png %})
    
    1.  To enable the job, add the text `sapContentConnectorDirReplicate` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

    2.  To disable the job, remove the text `sapContentConnectorDirReplicate` from the field and save the file.

>**Note:** The job is always **disabled** (different than for the other jobs) by default, once a new SAP Content Repository is created (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)). Like the other jobs, it the CRON trigger bean in the `alfresco-global.properties` is also disabled by default. This means, you have to enable this job on two places.

**Execution time**

The execution time for the job is stored as value for key

```text
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

of the related SAP System Configuration. The value is a CRON expression to provide the most flexible way of executing 
the job. As default value the job is triggered every full minute.

**CRON trigger bean**

To disable the CRON trigger bean for the `sapContentConnectorDirReplicate` job, set the following property key in 
the `alfresco-global.properties` to `false` (remember the desired SAP System Configuration):

```text
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled = false
```

Once the job is disabled, the related setting on the repository file (see above) is not considered anymore and has no effect.

>**Note:** Changing the execution time or enabling/disabling the job requires a restart of Alfresco Content Services.

#### Configuring behaviors

The SAP Connector offers three behaviors which accomplishes different tasks on updating or creating documents.

The behaviors connect from Alfresco Content Services to the SAP system via the SAP Java Connector. Each behavior 
invokes a different function module on SAP side. In contrast to the Jobs, the behaviors are used to trigger an action 
on SAP side rather then replicate metadata. The following behaviors are available:

|Behavior Name|Description|
|-------------|-----------|
|sapContentConnectorCreateArchivelink|Connect documents stored in Alfresco to existing SAP Business Objects.|
|sapContentConnectorBarcode|Add the barcode to the SAP external barcode table.|
|sapContentConnectorWorkflow|Start a SAP Workflow for a specified SAP user attaching the current document.|

>**Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

##### Behavior: sapContentConnectorCreateArchivelink

The behavior is responsible to connect the current document based on entered metadata to an existing SAP Business Object. 
Therefore, the `SAP Create Archivelink Aspect` is used. To connect a document to a SAP Business Object, 
the `SAP Create Archivelink Aspect` must be added and its values must be filled. Along with the 
`SAP Create Archivelink Aspect` the `SAP Connection Details` aspect will be added automatically.

Once all mandatory properties of the aspects are set and the document is saved, the behavior fires `onUpdateProperties` 
and invokes a SAP function module which will create the related entries in the SAP tables based on the aspect data. 
The current document is then available in the attachment list of the related SAP Business Object.

The following table lists the required data of the aspect which are required to connect the SAP Business Object:

|Property Name|Description|
|-------------|-----------|
|SAP Document Type|The document type associated with the current `SAP Object Type`.|
|SAP Client|The SAP client used to store in the SAP tables.|
|SAP Object Id|The object id of the SAP Business Object where the current document should be connected to.|
|SAP Object Type|The object type (e.g. `BKPF`, `EQUI`, `BUS2012`,...).|
|SAP Document Class|Document class (e.g. PDF).|
|SAP Filename|The file name used to display in the attachment list of the SAP Business Object.|
|SAP Description|The description used as short-description for the attachment in the attachment list|
|SAP Creator|The SAP user that should be used in SAP as creator of the attachment.|
|SAP Archive Date|The archive date to be stored in SAP.|

Because the `SAP Connection Details` aspect was automatically added along with the `SAP Replicate Plus Details`, 
there is a need to set the mandatory `SAP Content Repository` as well.

The `SAP Replicate Plus Details` and `SAP Connection Details` aspects with example values: 

![sap_conf_aspect_sap-createarchivelink]({% link sap/images/sap_conf_aspect_sap-createarchivelink.png %})

**Enable / Disable the behavior**

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field `Enabled Behaviors` available containing a list of all behaviors of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})
    
    1.  To disable the behavior, remove the text `sapContentConnectorCreateArchivelink` (including the comma) from the field and save the file.
    2.  To enable the behavior, add the text `sapContentConnectorCreateArchivelink` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)).

>**Important:** **Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.**

##### Behavior: sapContentConnectorBarcode


##### Behavior: sapContentConnectorWorkflow
#### SAP Connector Content Model Types
##### SAP Archivelink Document
##### SAP Barcode
##### SAP Workflow
### Opening associated Business Object in SAP
#### Configuration
#### Advanced configuration


## Communication via HTTPS {#securecomms}

Set up a secure communication between Alfresco Content Services and SAP.

The SAP Connector works well over HTTPS. In general, there is no need to configure the SAP Connector. 
The main part is to prepare the SAP system and Alfresco Content Services with the related certificates 
to use a secure connection.

>**Important:** This chapter only describes the necessary steps to implement the certificate from the Alfresco Content Services web server in SAP and prepare SAP Content Repositories to use HTTPS over HTTP for the communication.

>**CAUTION**: The creation and installation of the certificate on the Alfresco Content Services web server is not part of this section.

### Get current certificate from Alfresco {#getcertfromalfresco}

Get the current certificate from Alfresco.

The current certificate used by the Alfresco Content Services webserver must be known (and imported) in SAP. 
Therefore, export the certificate by following the steps below:

>**Important:** The Alfresco Content Services webserver must be up and running on a secure connection. This documentation does not cover the installation and configuration of the SSL connection on Alfresco Content Services side. It only covers how to get the existing certificate.

1.  Open Alfresco Content Services (either Alfresco Share or Alfresco Digital Workspace login page) in a web-browser and view the details of the current certificate.

    ![sap_inst_004_https_002_alf_certificate]({% link sap/images/sap_inst_004_https_002_alf_certificate.png %})

2.  Export the certificate to the local machine (depending on the browser manufacturer).

    ![sap_inst_004_https_002_alf_certificate_export]({% link sap/images/sap_inst_004_https_002_alf_certificate_export.png %})

3.  Make sure to use `DER encoded binary X.509 (.CER)` as export format.

    ![sap_inst_004_https_002_alf_certificate_export_format]({% link sap/images/sap_inst_004_https_002_alf_certificate_export_format.png %})

4.  Once successfully saved, the file will be required in step [Import Alfresco Certificate in SAP PSE](#importcertinsappse).

Prepare the SAP Content Repository to use a secure connection.

### Prepare SAP Content Repository for HTTPS

Set up SAP Content Repository connection to use a secure connection.

To prepare the SAP Content Repository to use a secure connection, follow these steps:

1.  Open transaction `OAC0`.

2.  Select the desired SAP Content Repository.

3.  Enter `%https` in the transaction code field to show required HTTPS related settings:

    1.  Remove the value for `Port Number`.

    2.  Add the `SSL Port Number`.

    3.  Select choice `HTTPS possible` as value for **HTTPS on frontend**.

    4.  Select choice `HTTPS required` as value for **HTTPs on backend**.

4.  Save the settings for the SAP Content Repository.

![sap_inst_004_https_001]({% link sap/images/sap_inst_004_https_001.png %})

>**Note:** Make sure to remove the non-SSL Port Number, otherwise the connection will fail!

Import the certificate from Alfresco Content Services to the Personal Security Environment (PSE) in SAP.

### Import Alfresco Certificate in SAP PSE {#importcertinsappse}

Import the certificate to the SAP Personal Security Environment.

Make sure to have the certificate from Alfresco Content Services webserver available.

To import the certificate to the SAP PSE follow these steps:

1.  Open transaction `STRUST`.

2.  Check whether a `SSL Client (Standard)` PSE exists.

    >**Note:** If there is no `SSL Client (Standard)` PSE available yet, select `SSL Client (Standard)` entry and use the context menu to create a new PSE. Use default settings, if applicable.

3.  Select the PSE (double-click) for `SSL Client (Standard)` and scroll down on the settings screen. At the bottom there is a button for uploading the certificate.

    ![sap_inst_004_https_003_strust_pse_import_certificate]({% link sap/images/sap_inst_004_https_003_strust_pse_import_certificate.png %})

4.  Upload the certificate previously downloaded from the Alfresco Content Services webserver ([Get current certificate from Alfresco](#getcertfromalfresco)).

5.  Once imported, enter the **Edit** mode (menu **Display ↔ Change**) and click on **Add to Certificate List**.

    ![sap_inst_004_https_003_strust_pse_certificate_add]({% link sap/images/sap_inst_004_https_003_strust_pse_certificate_add.png %})

6.  The certificate should now appear in the **Certificates List** of the screen.

    ![sap_inst_004_https_003_strust_certificate_save]({% link sap/images/sap_inst_004_https_003_strust_certificate_save.png %})

7.  **Save** the changes.

Restart the Internet Communication Server (ICM) to apply the certificate to the SAP system.

### Restart SAP Internet Communication Manager

Restart the SAP Internet Communication Manager (ICM) to apply the newly created certificate.

Make sure the certificate from the Alfresco Content Services webserver was successfully imported in SAP PSE.

To restart the SAP Internet Communication Manager (ICM) proceed with the following steps:

1.  Open transaction `SMICM`.

2.  Restart the SAP Internet Communication Manager (ICM) in menu **More → Administration → ICM**.

    ![sap_inst_004_https_004_smicm_restart]({% link sap/images/sap_inst_004_https_004_smicm_restart.png %})

Test communication via secured connection.

### Testing secured connection

Optional step to test the secured connection from SAP side.

There is a capability to test the secure connection from SAP side: 

1.  Open transaction `SM59`.

2.  Review the current HTTP connections to external servers by expanding the **HTTP Connections to External Server** section. In this section a new entry must be created pointing to Alfresco Content Services.

3.  Create a new RFC Destination via the **Create** icon with connection type `G HTTP connection to external server` and a name, then click **Continue**.

    ![sap_inst_004_https_005_sm59_create]({% link sap/images/sap_inst_004_https_005_sm59_create.png %})

4.  Now, in the **Technical Settings** section, enter the Alfresco Content Services **Host** along with the **SSL Port** and use `/alfresco` as **Path Prefix**.

    ![sap_inst_004_https_005_sm59_create_2]({% link sap/images/sap_inst_004_https_005_sm59_create_2.png %})

5.  Switch to section **Logon & Security** and scroll down to **Security Options → Status of Secure Protocol**. Select `Active` for **SSL** and choose `DEFAULT SSL Client (Standard)` as **SSL Certificate**.

    ![sap_inst_004_https_005_sm59_create_3]({% link sap/images/sap_inst_004_https_005_sm59_create_3.png %})

6.  **Save** the settings.

7.  Click **Connection Test** in the toolbar.

    ![sap_inst_004_https_005_sm59_test]({% link sap/images/sap_inst_004_https_005_sm59_test.png %})

8.  Review the test result. The connection should work and return with HTTP status code `200` .

    ![sap_inst_004_https_005_sm59_testresult]({% link sap/images/sap_inst_004_https_005_sm59_testresult.png %})

9.  The newly created RFC Destination is now available in section **HTTP Connections to External Servers** for transaction `SM59` and can be tested at any time.

The communication via HTTPS should work fine between the SAP system and Alfresco Content Services.

## Using encrypted passwords {#encryptpwd}

Encrypt all passwords used in the `alfresco-global.properties` by the SAP Connector instead of storing it as plain-text.

Make sure the SAP Connector is configured properly and working as expected.

1.  Go to the [Alfresco Support Portal](https://support.alfresco.com).

2.  Download the related JAR file:

    ```text
    sap-content-connector-encryptor-1.0.jar
    ```

3.  Create a public key and private key:

    Navigate to the folder of the downloaded JAR and run the following command to create the key pair in the current path:

    ```bash
    java –jar sap-content-connector-encryptor-1.0.jar init -path .
    ```

    Two files are created:

    * `sapContentConnectorPrivateKey.pri` (private key)
    * `sapContentConnectorPublicKey.pub` (public key)
    
4.  Create an encrypted password:

    ```bash
    java -jar sap-content-connector-encryptor-1.0.jar encrypt -password H3ll0W0rlD112! -publicKey ./sapContentConnectorPublicKey.pub
    ```

    The encrypted password will be printed to the console, for example:

    ```text
    ENC(XbfE4Z112==)
    ```

    Since it's already surrounded by the required `ENC()` function, it can be copied and used as-is.

5.  Upload the private key file to Alfresco Content Services.

    To be able to resolve the password, the previously created private key (`sapContentConnectorPrivateKey.pri`) must be uploaded to the application server root directory (such as `/usr/local/tomcat/sapContentConnectorPrivateKey.pri`).

6.  Provide encrypted password.

    To use the encrypted password, paste it as a value for the required properties in the `alfresco-global.properties` file.

    For example:

    ```text
    integrations.sap.system.1.al.alfrescoPassword = **ENC(XbfE4Z112==)**
    ```

7.  Restart the application server since `alfresco-global.properties` has changed.

The passwords are now encrypted and not plain-text.
