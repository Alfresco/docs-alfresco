---
title: Configure SAP Connector
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
|`SE38`|Run and edit SAP function modules ({% include tooltip.html word="SAP_ABAP" text="ABAP" %} programs). Required for functional testing (RSCMST).|

## Basic configuration

In this section, you'll create and configure a new SAP Content Repository where the (Content Server) is 
Alfresco Content Services. In addition, the connection between the SAP Content Repository and Alfresco Content Services 
is secured by a certificate and tested.

### 1. Create SAP Content Repository {#basic-createsapcontentrepo}

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
    |SSL Port Number|The port number for secure layer. Only required for [Communication via HTTPS](#securecomms). For now, leave empty!| |
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

### 2. Secure connection using a certificate {#basic-secureconnwithcert}

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

### 5. Functional test

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

    >**Note:** For SAP BASIS component 740 up to (at least) 752 there is a known bug in the `RSCMSTH2` report! If the report returns with plenty issues regarding document protection like `DOC_P[rc]`, refer to the following SAP {% include tooltip.html word="SAP_OSS" text="OSS" %} notes: 2371386, 2198970. Skip this report unless the notes are implemented.

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
to the SAP system. The required connection properties must be provided in the `alfresco-global.properties`. 

All related properties are already available in the file (refer to 
[Configure Alfresco Repository properties]({% link sap/latest/install/index.md %}#configrepo)) but must still be adapted to your SAP system. 

The following property keys are required for the connection (for description of each refer to 
[Configure Alfresco Repository properties]({% link sap/latest/install/index.md %}#configrepo)).

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

    The usage of a Wildcard (`*`) for parameter `archiveIds` is not recommended anymore. For setting up metadata replication specify each SAP Content Repository by its name in the `archiveIds` parameter.

#### Configure jobs

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
        
>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

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

>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

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

        >**Note:** Make sure the related behavior with same name is also enabled and therefore available in field for **Enabled Behaviors**.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The job is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)). In contrast the CRON trigger bean in the `alfresco-global.properties` is always disabled by default.

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

1.  Open transaction `SPRO` then click on **SAP Reference {% include tooltip.html word="SAP_IMG" text="IMG" %}**
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
than explained earlier in [(1) Create SAP Content Repository](#basic-createsapcontentrepo). 
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

>**Note:** The job is always **disabled** (different than for the other jobs) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)). Like the other jobs, it the CRON trigger bean in the `alfresco-global.properties` is also disabled by default. This means, you have to enable this job on two places.

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

#### Configure behaviors 

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

##### Behavior: sapContentConnectorCreateArchivelink {#sapContentConnectorCreateArchivelinkBehavior}

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
3.  In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})
    
    1.  To disable the behavior, remove the text `sapContentConnectorCreateArchivelink` (including the comma) from the field and save the file.
    2.  To enable the behavior, add the text `sapContentConnectorCreateArchivelink` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)).

>**Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

##### Behavior: sapContentConnectorBarcode {#sapContentConnectorBarcodeBehavior}

This behavior will add the `SAP Connection Details` aspect to each document where the aspect `SAP Barcode Details` 
was added before. With this, the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob) is able to 
process the documents.

>**Note:** Always enable/disable the Barcode behavior together with the Barcode job. Just one of both enabled would result that the Barcode scenario is not working.

**Enable / Disable the behavior**

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})
    
    1.  To disable the behavior, remove the text `sapContentConnectorBarcode` (including the comma) from the field and save the file.

        >**Note:** If disabled, also the related Job with same name in the **Enabled Jobs** field should be disabled.

    2.  To enable the behavior, add the text `sapContentConnectorBarcode` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)).

##### Behavior: sapContentConnectorWorkflow {#sapContentConnectorWorkflowBehavior}

The behavior will create a new inbox task for a SAP user in his SAP Business Workplace (transaction `SBPW`) in the 
SAP system. The current document will be attached to this task as a refernce link. The inbox task can be related to 
any SAP Workflow then (depends on SAP customizing). To invoke the behavior, the `SAP Workflow Details` aspect must be 
added to a document in Alfresco Content Services. Along with this aspect the required `SAP Connection Details` aspect 
is added automatically. The mandatory aspect values must be filled and if the properties are saved, the behavior is 
invoked (`onUpdateProperties`).

The following table lists the required data of the aspect which are required to create the inbox task for the SAP user:

|Property Name|Description|
|-------------|-----------|
|Start SAP Workflow|Whether to create the SAP Workflow inbox task for the `Username` below if the properties are saved.|
|SAP Document Type|The document type customized with the Workflow.|
|SAP Document Class|Document class (e.g. PDF).|
|Userclass|The userclass.|
|Username|The user name of the SAP user which should receive the inbox task.|
|Late Archiving|To use late archiving or not .|

How it looks like in Alfresco Share if the aspects are available: 

![sap_conf_aspect_sap-workflow]({% link sap/images/sap_conf_aspect_sap-workflow.png %})

**Enable / Disable the behavior**

The behavior can be enabled or disabled at the repository file for each SAP Content Repository.

1.  Navigate to related SAP Content Repository folder **Data Dictionary → SAP Content Connector → SAP Repositories → XX**
2.  Edit the properties of the file **XX Repository**.
3.  In aspect `SAP Connection Repository Details`, there is text-field **Enabled Behaviors** available containing a list of all behaviors of the SAP Connector. 

    ![sap_conf_aspect_sap-connection_repository_behavior]({% link sap/images/sap_conf_aspect_sap-connection_repository_behavior.png %})
    
    1.  To disable the behavior, remove the text `sapContentConnectorWorkflow` (including the comma) from the field and save the file.
    2.  To enable the behavior, add the text `sapContentConnectorWorkflow` to the field (there might be a need to add a comma before as this is a comma-separated list) and save the file. Click the question mark besides the field to show a help including all possible values.

        >**Note:** The changes reflects immediately. There is no restart of Alfresco Content Services required.

>**Note:** The behavior is always enabled (present as list value in this field) by default, once a new SAP Content Repository is created (refer to [(1) Create SAP Content Repository](#basic-createsapcontentrepo)).

>**Important:** Check with your SAP sales representative if the behavior triggered remote access to SAP is covered by the existing SAP license of your company.

#### SAP Connector content model types

The SAP Connector offers a couple of predefined content model types which accomplishes the different tasks of the 
available jobs. This section describes all available content model types with their purpose.

The available content model types are closely related to the availble SAP Connector jobs ([Configuring jobs](#configure-jobs)) 
and SAP Connector behaviors ([Configuring behaviors](#configure-behaviors)). The types are already prepared 
with the necessary aspects.

**Predefined content model types**

The SAP Connector offers the following predefined types:

* SAP ArchiveLink Document
* SAP Barcode
* SAP Workflow

**Changing content model types**

To change the existing type of the document to a SAP Connector type, follow the Alfresco Content Services documentation 
for **Change Type**. The following screenshot shows the available types while executing the **Change Type** action 
in Alfresco Share:

![sap_conf_types_change_contenttype]({% link sap/images/sap_conf_types_change_contenttype.png %})

>**Note:** A special case for all SAP Connector Content Model types: The `SAP Document Id` in aspect `SAP Connection Details` is usually created by SAP internally (unique number). Because these SAP Connector scenarios are starting all from Alfresco Content Services side and not from SAP side, there is a need to create these ids in Alfresco Content Services. Therefore, to get a unique number, the SAP Connector uses the UUID of the current document (property `sys:node-uuid`). However, this does not affect the further process.

##### SAP Archivelink Document type {#sapconnarchivelinktype}

The `SAP Archivelink Document` type allows you to link a document in Alfresco manually to its corresponding 
business object in SAP. Based on the properties that must be entered during the creation, the connection to the 
SAP business object will be done automatically.

>**Note:** Make sure to have the [Behavior: sapContentConnectorCreateArchivelink](#sapContentConnectorCreateArchivelinkBehavior) enabled.

**Process Flow**

To link a document to a corresponding SAP Business Object by the `SAP Archivelink Document` type, 
proceed with the following steps:

1.  Change the type of the document to `SAP Archivelink Document`.
2.  Edit the properties of the document and enter all mandatory fields for the `SAP Create Archivelink Details` and `SAP Connection Details` aspects:

    ![sap_conf_types_archivelink_properties]({% link sap/images/sap_conf_types_archivelink_properties.png %})

3.  Save the document. Now the [Behavior: sapContentConnectorCreateArchivelink](#sapContentConnectorCreateArchivelinkBehavior) will be invoked and call a related SAP function module which will create the necessary table entries.
4.  The current document is now available as attachment for the SAP Business Object (matching the aspect values).

>**Note:** To connect a document of any other type, add the `SAP Create Archivelink Details` aspect to that document and provide the related aspect values that matches a SAP Business Object.

##### SAP Barcode type

The `SAP Barcode` type allows you to process a document in Alfresco with the barcode scenario 
(as certified by SAP HTTP-Content Server). Based on the barcode entered as value for the related aspect, 
the SAP Connector invokes a SAP function module which creates the entry in the **External Barcode** table in SAP. 
Does the barcode already exists in SAP, the document is available immediately as attachment for the related 
SAP Business Object (Late Archiving). Does the barcode not yet exists, the document will be attached to a 
SAP Business Object at the time a SAP user enters the barcode (Early Archiving).

>**Note:** Make sure to have the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob) enabled.

**Process Flow**

To link a document to a SAP Business Object by the `SAP Barcode` type, proceed with the following steps:

1.  Change the type of the document to `SAP Barcode`.
2.  Edit the properties of the document and enter the mandatory fields for the `SAP Connection Details` and `SAP Barcode Details` aspects:

    ![sap_conf_types_barcode_properties]({% link sap/images/sap_conf_types_barcode_properties.png %})

3.  Save the document. Now, depening on the CRON expression of the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob), the job will pick up the document and create the necessary entry in the **External Barcode** table (check transaction `OAM1`) of the SAP system.
4.  For Late Archiving, the document is immediately available as attachment on the related SAP Business Object, for Early Archiving, the document is available as soon as the SAP user manually enters the matching barcode on a SAP Business Object.

>**Note:** To use the barcode with any other Alfresco Content Services content type, add the `SAP Barcode Details` aspect to a document **and** make sure to have the [Behavior: sapContentConnectorBarcode](#sapContentConnectorBarcodeBehavior) **in addition** to the [Job: sapContentConnectorBarcode](#sapContentConnectorBarcodeJob) enabled for the current SAP System Configuration.

##### SAP Workflow type

The `SAP Workflow` type allows you to create a new inbox task (SAP Workflow) for a SAP user with the current 
document attached. The SAP Workflow to be started must be customized in SAP.

>**Note:** Do not confuse **Alfresco Workflow** with **SAP Workflow**.

>**Note:** Related transaction in SAP to view the inbox tasks of a user: `SBWP`.

**Process Flow**

To create a new inbox task (SAP Workflow) for a SAP user including the current document by the `SAP Workflow` type, 
proceed with the following steps:

1.  Change the type of the document to `SAP Workflow`.
2.  Edit the properties of the document and enter all mandatory fields for the `SAP Connection Details` and `SAP Workflow Details` aspects:

    ![sap_conf_types_sapworkflow_properties]({% link sap/images/sap_conf_types_sapworkflow_properties.png %})

3.  If the inbox task should be created immediately, make sure to check **Start SAP Workflow**.
4.  Save the document. Now the [Behavior: sapContentConnectorWorkflow](#sapContentConnectorWorkflowBehavior) will be invoked and call a related SAP function module (`ARCHIV_PROCESS_RFCINPUT`) which will create the inbox task for the user.

    >**Note:** As long as `Check SAP Workflow` is disabled, the behavior will not consider the current document.

5.  The current document is now available as attachment (link to the document in Alfresco Content Services) of an inbox task assigned to the user in SAP.

### Opening associated Business Object in SAP {#openassocbusinessobjinsap}

On a document in Alfresco Share this feature allows the user to open the corresponding SAP Business Object linked to 
the document. Therefore, a new action is available in the document action menu. On click, it will open the 
SAP Web-GUI and invokes the SAP Business Object in the related transaction.

The feature is available for documents in Alfresco Content Services that have the `SAP Replicate Details` aspect available. 
Therefore, the requirement is to have the [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob) enabled and running.

>**Note:** To login to the SAP Web-GUI a SAP user is required.

#### Configuration

In order to use this feature, the following configuration is required:

1.  The [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob) must be enabled

2.  The document action is only available in Alfresco Share.

3.  The document action is only available for documents having the `SAP Replicate Details` and the `SAP Connection Details` available.

    The required properties from these aspects are:

    1.  `SAP Content Repository` (aspect `SAP Connection Details`)
    2.  `SAP Object Type` (aspect `SAP Replicate Details`)
    3.  `SAP Object Id` (aspect `SAP Replicate Details`)
    
4.  The following properties must be set in the`alfresco-global.properties` for the desired SAP System Configuration:

    |Property Key|Description|
    |------------|-----------|
    |integrations.sap.system.1.webClient.enabled|Enable or disable the feature for all SAP Content Repositories related to the SAP System Configuration|
    |integrations.sap.system.1.webClient.url|Specify the base URL to the SAP Web application server.|

    >**Note:** Any changes of the properties requires a restart of Alfresco Content Services.

The following table lists all available `SAP Object Types` which are supported by default including their associated 
`Transaction` used to open the corresponding SAP Business Object. The parameter in `Field Names in URL` will be 
automatically filled with the related values from the aspects.

|SAP Object Type|SAP Transaction|Field Names in URL|
|---------------|---------------|------------------|
|BKPF|FB03|RF05L-BELNR, RF05L-BUKRS, RF05L-GJAHR|
|BUS1065|PA40|RP50G-PERNR|
|BUS2010|ME43|RM06E-ANFNR|
|BUS2012|ME23|RM06E-BSTNR|
|BUS2032|VA03|VBAK-VBELN|
|BUS2017|MB03|RM07M-MBLNR, RM07M-MJAHR|
|BUS2081|MIR4|RBKP-BELNR, RBKP-GJAHR|
|BUS2078|QM03|RIWO00-QMNUM|
|BUS2081|MIR4|RBKP-BELNR, RBKP-GJAHR|
|BUS2105|ME53|EBAN-BANFN|
|EQUI|IE03|RM63E-EQUNR|
|KNA1|VD03|RF02D-KUNNR, RF02D-D0110|
|LFA1|MK02|RF02K-LIFNR, RF02K-D0110|
|PREL|PA20|RP50G-PERNR|
|VBRK|VF03|VBRK-VBELN|

If there is a need to call other than the default SAP Object Types, refer to the 
[Advanced configuration](#OpenBusinessObjectSAPAdvancedConfig). Also, refer to 
[Reference for SAP Object Type Mapping](#refsapobjecttypemap).

#### Advanced configuration {#OpenBusinessObjectSAPAdvancedConfig}

If there is a need to open SAP Business Objects of `SAP Object Types` which are not covered by default, there is a way 
to override the default settings globally or even for each SAP System Configuration.

As template file to override these settings use file `webClient-config.properties` in the reference section. 
Alternatively, this template can be found in the exploded web-application in folder 
`<app-srv_root>/webapps/alfresco/WEB-INF/classes/alfresco/module/sap-content-connector-repo/webClient-config.properties` as well.

**Override defaults globally**

To override the default settings globally, meaning for each available SAP System Configuration, 
proceed with the following steps:

1.  Extend or change the `webClient-config.properties` template according your needs.
2.  Upload the file into folder **Data Dictionary→ SAP Content Connector→ Configuration** (create folder **Configuration** if it does not exists). The changes will reflect immediately.

![sap_feature_openinsap_conf_001]({% link sap/images/sap_feature_openinsap_conf_001.png %})

**Override defaults for individual SAP System Configuration**

It's also possible to override the `SAP Object Types` for an individual SAP System Configuration, hence for a 
dedicated SAP Content Repository / SAP system. This might be important if there are SAP Content Repositories of 
different SAP systems (having different versions or patch levels) connected to Alfresco Content Services which requires 
different parameters to call the transactions.

The basic approach to override the settings is to extend the the **file name** of `webClient-config.properties` with 
the number of the SAP System Configuration in the following format:

```text
webClient-config.sap.system.<X>.properties
```

>**Note:** The `.sap.system.` in the name is always fixed, and the `X` must be replaced by the number of the SAP System Configuration.

>**Note:** If there is a need to have at least one individual file available, you must create and upload the files for each other SAP System Configuration as well - even if they just contains the default settings!

To override the settings for a SAP System Configuration, proceed with the following steps:

1.  Copy the file `webClient-config.properties` and rename it according the above specification, e.g. to `webClient-config.syp.system.1.properties`.
2.  Do the same for each SAP System Configuration in the `alfresco-global.properties`.
3.  Extend or change the `webClient-config.sap.system.<X>.properties` according your needs.
4.  For all other files leave the default content.
5.  Upload all files into folder **Data Dictionary→ SAP Content Connector→ Configuration** (create folder **Configuration** if it does not exists). The changes will reflect immediately.

![sap_feature_openinsap_conf_002]({% link sap/images/sap_feature_openinsap_conf_002.png %})

**Add a new SAP Object Type**

To add a new `SAP Object Type` which allows the user to open the associated SAP Business Object in a transaction 
that is not covered by default, proceed with the following steps:

1.  Provide the `webClient-config.properties` (or individual `webClient-config.sap.system.<X>.properties`) as described above.
2.  Enter each new `SAP Object Type` as a new line at the end of the file.
3.  Split the `SAP Object Type` and the URL by an equals sign.
4.  Provide all necessary parameter for the URL required to invoke the transaction via SAP Web-Gui.

The following macros are supported as values for URL parameter, if applicable :

|Macro Name|Description|
|----------|-----------|
|%SAP_CLIENT%|The SAP Client, specified in the `alfresco-gloabl.properties` for the SAP System Configuration.|
|%SAP_OBJECT%|The `SAP Object Type`, read from aspect value `connexasReplicate:sapobject`. For example `BKPF` (refer to [Job: sapContentConnectorReplicate](#sapContentConnectorReplicateJob)).|
|%SAP_ARCHIVE_OBJECT%|The `SAP Document Type`, read from aspect value `connexasReplicate:saparchiveobject`. For example `Z_INV_XX`.|
|%SAP_OBJECT_ID%|The `SAP Object Id`, read from aspect value `connexasReplicate:sapobjectid`.|
|%SAP_RESERVE%|The `SAP Reserve`, read from aspect value `connexasReplicate:sapreserve`. For example `PDF`.|

If there is a need to have only a part of the macro value (substring) available for a parameter, the following notation 
like demonstrated for the `SAP Object Id` below must be used:

```text
%SAP_OBJECT_ID{0:4}%
```

This extracts the substring beginning from 0 to 4. The start index is included while the end index is not included 
(as usual for Java programming language).

As an example, to override the `SAP Object Type` **BKPF** (opens transaction `FB03`), 
the following line can be added to the file:

```text
BKPF=?~sap-client=%SAP_CLIENT%**&~transaction=FB03%20RF05LBELNR=%SAP_OBJECT_ID{4:14}%;RF05L-BUKRS=%SAP_OBJECT_ID{0:4}%;RF05LGJAHR=%SAP_OBJECT_ID{14:18}%&~okcode=/00
```

#### Reference for SAP Object Type Mapping {#refsapobjecttypemap}

This is the reference for all supported `SAP Object Types` that are available by default in Alfresco Share to open the 
associated SAP Business Object along with their related transaction within the SAP Web-GUI.

Refer to the [Opening associated Business Object in SAP]({% link sap/latest/config/index.md %}#openassocbusinessobjinsap) feature to 
learn how to enable and how to customize it.

>**Note:** Because the SAP Object Types `BKPF` and `BUS2081` requires a split of the replicated `SAP Object Id` into at least 2 separate parameters, the URL of both SAP Object Types should never be changed (not even the order).

|SAP Object Type|SAP Transaction|Description|URL parameter attached to the SAP Web-GUI|
|---------------|---------------|-----------|-----------------------------------------|
|BKPF|FB03|Accounting Document Header|?~transaction=FB03%%20RF05L-BELNR=%s;RF05L-BUKRS=%s;RF05LGJAHR=%s&~okcode=/00|
|BUS1065|PA40|Personnel Actions|?~transaction=PA40%%20RP50G-PERNR=%s&~okcode=/00|
|BUS2010|ME43|Request For Quotation|?~transaction=ME43%%20RM06E-ANFNR=%s&~okcode=/00|
|BUS2012|ME23|Purchase Order|?~transaction=ME23%%20RM06E-BSTNR=%s&~okcode=/00|
|BUS2017|MB03|Material Document|?~sap-client=%SAP_CLIENT%&~transaction=MB03%20RM07M-MBLNR=%SAP_OBJECT_ID{1:10}%;RM07M-MJAHR=%SAP_OBJECT_ID{11:14}%&~okcode=/00|
|BUS2032|VA03|Sales Order|?~transaction=VA03%%20VBAK-VBELN=%s&~okcode=/00|
|BUS2078|QM03|Quality Notification|?~sap-client=%SAP_CLIENT%&~transaction=QM03%20RIWO00-QMNUM=%SAP_OBJECT_ID%&~okcode=/00|
|BUS2081|MIR4|MIRO - Change Status|?~transaction=MIR4%%20RBKP-BELNR=%s;RBKP-GJAHR=%s&~okcode=/00|
|BUS2105|ME53|Purchase Requisition|?~transaction=ME53%%20EBAN-BANFN=%s&~okcode=/00|
|EQUI|IE03|Equipment|?~sap-client=%SAP_CLIENT%&~transaction=IE03%20RM63E-EQUNR=%SAP_OBJECT_ID%&~okcode=/00|
|KNA1|VD03|Customer (Sales)|?~sap-client=%SAP_CLIENT%&~transaction=VD03%20RF02D-KUNNR=%SAP_OBJECT_ID%&RF02D-D0110=true&~okcode=/00|
|LFA1|MK03|Vendor Master|?~sap-client=%SAP_CLIENT%&~transaction=MK03%20RF02K-LIFNR=%SAP_OBJECT_ID%&RF02K-D0110=true&~okcode=/00|
|PREL|PA20|HR Master Data|?~sap-client=%SAP_CLIENT%&~transaction=PA20%20RP50G-PERNR=%SAP_OBJECT_ID{0:8}%&~okcode=/00|
|VBRK|VF03|Billing Documents|?~sap-client=%SAP_CLIENT%&~transaction=VF03%20VBRK-VBELN=%SAP_OBJECT_ID%&~okcode=/00|

## Example configurations {#examplesapsysconfigs}

This section gives examples of different types of system configurations.

### One SAP system configuration with Archivelink only {#examplesapsysconfig1}

This is an example for one *SAP System Configuration* with one connected SAP Content Repository, using pure 
Archivelink (metadata replication is off).

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the 
values in **bold** according your specifications.

>**Note:** Do not remove unused property keys.

```text
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**false**
integrations.sap.system.1.name=${sap.system.1.name} 
integrations.sap.system.1.host= ${sap.system.1.host} 
integrations.sap.system.1.client= ${sap.system.1.client} 
integrations.sap.system.1.systemNumber= ${sap.system.1.systemNumber} 
integrations.sap.system.1.user= ${sap.system.1.user} 
integrations.sap.system.1.password= ${sap.system.1.password} 
integrations.sap.system.1.language= ${sap.system.1.language} 
integrations.sap.system.1.webClient.enabled=false
integrations.sap.system.1.webClient.url=https://sapserver:port/sap/bc/gui/sap/its/webgui

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression = 0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled = false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression = 0 0/1 * 1/1 * ? *
```

### One SAP system configuration with metadata replication

This is an example for one *SAP System Configuration* with one connected SAP Content Repository, using default and 
additional metadata replication. It also enables the *Open corresponding business object in SAP* feature in Alfresco Share.

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the 
values in **bold** according your specifications.

>**Note:** Do not remove unused property keys.

```text
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**true**
integrations.sap.system.1.name=**SAP Finance (NSP)** 
integrations.sap.system.1.host=**192.168.112.112** 
integrations.sap.system.1.client=**800**
integrations.sap.system.1.systemNumber=**01**
integrations.sap.system.1.user=**ALFRESCO**
integrations.sap.system.1.password=**t0ps3cR3tP@Ssw0rD** 
integrations.sap.system.1.language=**EN** 
integrations.sap.system.1.webClient.enabled=**true**
integrations.sap.system.1.webClient.url=**https://192.168.112.112:8021/sap/bc/gui/sap/its/webgui**

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
```
### Two SAP system configurations with metadata replication

This is a more complex example with two *SAP System Configurations*, different SAP Content Repositories having a mix of 
properties enabled and disabled.

Copy and paste the *SAP System Configuration* code snippet below to your `alfresco-global.properties` and replace the 
values in **bold** according your specifications.

>**Note:** Do not remove unused property keys.

In this example, the first *SAP System Configuration* uses plain-text passwords while the second *SAP System Configuration* 
uses encrypted passwords (see [Encrypting passwords](#encryptpwd) for more). 
It also has two connected SAP Content Repositories and uses a different site to store the documents. 
It doesn't have the SAP Web-GUI enabled, and the metadata replication jobs are invoked every 5 minutes instead running 
each minute like in the first *SAP System Configuration*.

```text
// SAP System Configuration 1
integrations.sap.system.1.al.alfrescoUser=**admin**
integrations.sap.system.1.al.alfrescoPassword=**t0ps3cR3t**
integrations.sap.system.1.al.archiveIds=**M1**
integrations.sap.system.1.al.documentRoot=**/app:company_home/st:sites/cm:sap/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.1.al.checkSignature=**true**
integrations.sap.system.1.al.checkExpiration=**true**

integrations.sap.system.1.enabled=**true**
integrations.sap.system.1.name=**SAP Finance (NSP)** 
integrations.sap.system.1.host=**192.168.112.112** 
integrations.sap.system.1.client=**800**
integrations.sap.system.1.systemNumber=**01**
integrations.sap.system.1.user=**ALFRESCO**
integrations.sap.system.1.password=**t0ps3cR3tP@Ssw0rD** 
integrations.sap.system.1.language=**EN** 
integrations.sap.system.1.webClient.enabled=**true**
integrations.sap.system.1.webClient.url=**https://192.168.112.112:8021/sap/bc/gui/sap/its/webgui**

integrations.sap.system.1.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorReplicate.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.1.jobs.sapContentConnectorPlus.cronExpression=**0 0/1 \* 1/1 \* ? \***
integrations.sap.system.1.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.1.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
  
// SAP System Configuration 2
integrations.sap.system.2.al.alfrescoUser=**sapinteg**
integrations.sap.system.2.al.alfrescoPassword=**ENC(XbfE4Z112==)**
integrations.sap.system.2.al.archiveIds=**K2,Z1**
integrations.sap.system.2.al.documentRoot=**/app:company_home/st:sites/cm:sap_hr/cm:documentLibrary/cm:SAP_Documents**
integrations.sap.system.2.al.checkSignature=**true**
integrations.sap.system.2.al.checkExpiration=**true**

integrations.sap.system.2.enabled=**true**
integrations.sap.system.2.name=**SAP HR (S4H)** 
integrations.sap.system.2.host=**192.168.1.110** 
integrations.sap.system.2.client=**100**
integrations.sap.system.2.systemNumber=**00**
integrations.sap.system.2.user=**ALF_HR**
integrations.sap.system.2.password=**ENC(RET45324GFDSFfsf43ZEr4rfer45)** 
integrations.sap.system.2.language=**EN** 
integrations.sap.system.2.webClient.enabled=**false**
integrations.sap.system.2.webClient.url=https://sapserver:port/sap/bc/gui/sap/its/webgui

integrations.sap.system.2.jobs.sapContentConnectorReplicate.enabled=**true**
integrations.sap.system.2.jobs.sapContentConnectorReplicate.cronExpression=**0 0/5 \* 1/1 \* ? \***
integrations.sap.system.2.jobs.sapContentConnectorPlus.enabled=**true**
integrations.sap.system.2.jobs.sapContentConnectorPlus.cronExpression=**0 0/5 \* 1/1 \* ? \***
integrations.sap.system.2.jobs.sapContentConnectorBarcode.enabled=false
integrations.sap.system.2.jobs.sapContentConnectorBarcode.cronExpression=0 0/1 * 1/1 * ? *
integrations.sap.system.2.jobs.sapContentConnectorDirReplicate.enabled=false
integrations.sap.system.2.jobs.sapContentConnectorDirReplicate.cronExpression=0 0/1 * 1/1 * ? *
```

## Additional Alfresco Repository Config {#additionalrepoconifig}

The following table lists additional settings that can be provided in the `alfresco-global.properties` file to override 
the standard behavior of the SAP Connector. These settings are not related to a particular SAP System Configuration, 
but they will affect the basic functionality and should be used with caution.

>**Important:** The recommendation is to always consult Alfresco Support before overriding SAP Connector standard behavior with any of the settings below.

|Additional Property Key|Default Value|Description|
|-----------------------|-------------|-----------|
|integrations.sap.configuration.attributeService.enabled|`false`|Use the SAP Connector internal `AttributeService` to find documents from SAP, across multiple nodes in high availability systems.Only required if the *Alfresco Full Text Search* within the *Transactional Query Options* was set to `**Never use Database**` in the Alfresco Admin Console.|
|integrations.sap.configuration.defaultDocProtection|`rcdu`|Override the default setting for the `SAP DocProtection` (property `connexasArchivelink:docprot`). If no `docProt` parameter is transferred or an [SAP Archivelink Document](#sapconnarchivelinktype) is created, this value will be used to override the default.|
|integrations.sap.configuration.chunkSize|`65536 (byte)`|Chunk size that is used to read the payload of the HTTP request. Usually there is no need to change this setting.|
|integrations.sap.configuration.postFilter.enabled|`false`|If `true`, the SAP Connector queries the database only for `docId` instead of `docId`, `compId` and `archiveId`.In this case, `compId` and `archiveId` will be filtered in a second step. Recommended if the database execution plan prioritizes `compId` and `archiveId` (both not unique) over the `docId` (unique) and therefore get an huge result set.|
|integrations.sap.configuration.doubleSearch.enabled|`false`|If `true`, the query used for finding documents requested by SAP is first executed against Solr. If we don't find the desired document, we search again, but against the database using transactional metadata queries (TMQ). In some situations, especially large databases, this can improve speed.|

## Additional SAP JavaConnector properties {#sapjavaconprops}

This reference lists the additional properties (such using Logon Groups) for the SAP JavaConnector that are supported 
for each available SAP System Configuration.

See [Configure Alfresco Repository properties]({% link sap/latest/install/index.md %}#configrepo) and the 
[example configurations](#examplesapsysconfigs). The properties in the table below use 
[SAP system configuration with Archivelink only](#examplesapsysconfig1) as an example.

>**Note:** Refer to the SAP JavaConnector documentation to learn more about the available properties and their behaviors in detail.

|Property Key|Description|
|------------|-----------|
|integrations.sap.system.1.destination.auth_type|The authentication type - configured user or current user.|
|integrations.sap.system.1.destination.auth_type|The authentication type - configured user or current user.|
|integrations.sap.system.1.configured_user|The destination configured for the specified user only.|
|integrations.sap.system.1.current_user|The connection created using this destination belongs to the current user.|
|integrations.sap.system.1.alias_user|Logon user alias, can be used instead of logon user.|
|integrations.sap.system.1.codepage|Initial logon codepage in SAP notation.|
|integrations.sap.system.1.pcs|Initial logon codepage type (`1`: non-Unicode or `2`: Unicode enabled, optional).|
|integrations.sap.system.1.mshost|SAP message server host.|
|integrations.sap.system.1.msserv|SAP message server service or port number (optional).|
|integrations.sap.system.1.r3name|System ID of the SAP system, the so-called SID.|
|integrations.sap.system.1.group|Logon group name of SAP application servers (optional, default is PUBLIC).|
|integrations.sap.system.1.saprouter|SAP router string to use for networks being protected by a firewall.|
|integrations.sap.system.1.mysapsso2|SAP Cookie Version 2 as logon ticket.|
|integrations.sap.system.1.getsso2|Get/don't get an SSO ticket after logon (`1` or `0`).|
|integrations.sap.system.1.x509cert|X.509 certificate as logon ticket.|
|integrations.sap.system.1.extid_data|External identification user logon data.|
|integrations.sap.system.1.extid_type|Type of the external identification user logon data.|
|integrations.sap.system.1.lcheck|Enable/disable logon check at open time (`1`: enable [default] or `0`: disable).|
|integrations.sap.system.1.delta|Enable/disable table parameter delta management (`1`: enable [default] or `0`: disable).|
|integrations.sap.system.1.snc_partnername|SNC name of the communication partner server. For example: p:CN=SID, O=ACompany, C=EN.|
|integrations.sap.system.1.snc_qop|SNC quality of protection; valid values: `1`, `2`, `3`, `8` (default), `9`.|
|integrations.sap.system.1.snc_myname|Own SNC name of the caller (optional). Overrides the default SNC name. For example: p:CN=MyUserID, O=ACompany, C=EN.|
|integrations.sap.system.1.snc_mode|Secure Network Communications (SNC) mode; `1`: on, `0`: off (default).|
|integrations.sap.system.1.snc_sso|Turn on/off the SSO mechanism of SNC. If set to `0`, use alternative credentials like user/password instead. Valid values are `1` (yes, default) and `0` (no).|
|integrations.sap.system.1.snc_lib|Full path to the library which provides the SNC service. Default: value from {% include tooltip.html word="SAP_JCo" text="JCo" %} middleware property `jco.middleware.snc_lib`.|
|integrations.sap.system.1.destination.peak_limit|Maximum number of active connections that can be created for a destination simultaneously.|
|integrations.sap.system.1.destination.pool_capacity|Maximum number of idle connections kept open by the destination. A value of `0` provides no connection pooling, i.e. connections will be closed after each request.|
|integrations.sap.system.1.destination.expiration_time|Time in milliseconds (ms) after that the connections held by the internal pool can be closed.|
|integrations.sap.system.1.destination.expiration_check_period|Interval in milliseconds (ms) with which the timeout checker thread checks the connections in the pool for expiration.|
|integrations.sap.system.1.destination.max_get_client_time|Maximum time in milliseconds (ms) to wait for a connection, if the maximum allowed number of connections is allocated by the application.|
|integrations.sap.system.1.destination.repository_destination|Specifies which destination should be used for repository queries.|
|integrations.sap.system.1.destination.repository.user|Optional: If repository destination is not set, and this property is set, it will be used as user for repository queries. This allows using a different user for repository lookups and restrict the permissions accordingly.|
|integrations.sap.system.1.destination.repository.passwd|The password for a repository user. Mandatory, if a repository user should be used. Enter as plain-text or use encrypted password. For latter, the value must be enclosed with string `ENC()`.|
|integrations.sap.system.1.destination.repository_scn_mode|Optional: If SNC is used for this destination, it is possible to turn it off for repository connections, if this property is set to `0`. Defaults to the value of `jco.client.snc_mode`.|
|integrations.sap.system.1.destination.repository_roundtrip_optimization|`1`: forces the usage of RFC_METADATA_GET in {% include tooltip.html word="SAP_ABAP" text="ABAP" %} System, `0`: deactivates it. If the property is not set, the destination will initially do a remote call to check whether RFC_METADATA_GET is available. If it's available, then it'll use it.|
|integrations.sap.system.1.cpic_trace|Enable/disable CPIC trace (`-1`: take over environment value CPIC_TRACE, `0`: no trace, `1,2,3` - different trace levels).|
|integrations.sap.system.1.trace|Enable/disable RFC trace (`0` or `1`).|
|integrations.sap.system.1.gwhost|SAP gateway host.|
|integrations.sap.system.1.gwserv|SAP gateway service or port number.|
|integrations.sap.system.1.tphost|Host on which to start an external RFC server executable program.|
|integrations.sap.system.1.tpname|Registered RFC server program ID / External RFC server executable program name.|
|integrations.sap.system.1.type|Connection type (optional).|
|integrations.sap.system.1.use_sapgui|Start a SAP GUI and associate with the connection (`0`: do not start [default], `1`: start GUI, `2`: start GUI and hide if not used).|
|integrations.sap.system.1.deny_initial_password|Deny usage of initial passwords (`0` [default] or `1`).|

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

To import the certificate to the SAP {% include tooltip.html word="SAP_PSE" text="PSE" %} follow these steps:

1.  Open transaction `STRUST`.

2.  Check whether a `SSL Client (Standard)` {% include tooltip.html word="SAP_PSE" text="PSE" %} exists.

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

Make sure the certificate from the Alfresco Content Services webserver was successfully imported in SAP {% include tooltip.html word="SAP_PSE" text="PSE" %}.

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

1.  Go to the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

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
