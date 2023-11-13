---
title: Configure SAP Connector
nav: false
---

Use this information to configure the SAP Connector. Check the following SAP access privileges in order to continue with the configuration.

To configure the SAP Connector properly on the SAP side, an **SAP dialog user** is required who has access to the following SAP transactions:

| Transaction | Description |
| ----------- | ----------- |
| `OAC0` | Define and maintain SAP Content Repositories which includes the storage system (Alfresco) for the documents. |
| `OAC2` | Define global document types and assign document classes. Required for end-user testing. |
| `OAC3` | Link SAP Content Repositories, document types and SAP object types. Assign retention periods. Required for end-user testing. |
| `SE38` | Run and edit SAP function modules ({% include tooltip.html word="SAP_ABAP" text="ABAP" %} programs). Required for functional testing (RSCMST). |

## Basic configuration

In this section, you'll create and configure a new SAP Content Repository where the "Content Server" is Content Services. In addition, the connection between the SAP Content Repository and Content Services is secured by a certificate and tested.

### 1. Create SAP Content Repository {#basic-createsapcontentrepo}

Create a new SAP Content Repository which points to Content Services.

The maintenance screen for creating new SAP Content Repositories can be accessed with transaction `OAC0`.

1. In the SAP Content Repository overview, click **Display/change** (**CTRL+F4**).

    Another icon appears: **Create** (**F5**). Click on it to create a new SAP Content Repository.

    ![sap_conf_001_0ac0]({% link sap/images/sap_conf_001_0ac0.png %})

2. Enter mandatory values for the new repository.

    See the following table to choose the correct settings.

    * Values in **bold** must match the values given in the table exactly.
    * Values in _italics_ are customer specific and need to be adapted according to your environment.

    ![sap_conf_002_create_repo_initial]({% link sap/images/sap_conf_002_create_repo_initial.png %})

    | Field | Description |
    | ----- | ----------- |
    | Content Rep. | The name of the new repository. Remember the SAP naming conventions (only 2 characters allowed for Archivelink). <br>Value: _XX_ |
    | Description | A brief description for the repository (max 50 characters). <br>Value: _Alfresco Content Services via SAP Connector_ |
    | Document Area | The document area for the documents. <br>Value: **Archivelink** |
    | Storage Type | The storage type of the repository <br>Value: **HTTP content server** |
    | Version no. | Number of the current SAP content server version. For content server version 4.7 enter 0047. <br>Value: _0047_ |
    | HTTP Server | The IP address of the Content Services server - or the Load Balancer. <br>Value: _85.112.116.117_ |
    | Port Number | The port number where the Content Services is listening - usually 8080. <br>Value: _8080_ |
    | SSL Port Number | The port number for secure layer. Only required for [Communication via HTTPS]({% link sap/latest/admin/reference.md %}#securecomms). <br>Value: For now, leave empty. |
    | HTTP Script | The Web Script location in Content Services where all requests from SAP are processed. <br>Value: **alfresco/service/com/alfresco/sap/http** |
    | Transfer drctry | For some ArchiveLink scenarios, files have to be created in a transfer directory (on SAP side) before sending it to the content server. Maintain it, if the default value does not match your company standard. |

3. Click either on icon **Test connection** or on icon **Status information**.

    In both cases, a message appears saying the content repository does not exist.

    > **Note:** Any other message than *Content repository XX does not exist* indicates an issue with the network connection between the SAP server and the Alfresco server. In such a case, double-check the login credentials for Alfresco (`alfresco-global.properties`) and make sure Alfresco is available.

    ![sap_conf_004_create_repo_values_with_check]({% link sap/images/sap_conf_004_create_repo_values_with_check.png %})

4. Save the current repository configuration (click **Save** on the bottom line) before proceeding with the next steps.

5. To create the repository on the content server click on icon **CS Admin** (**C**ontent **S**erver **Admin**istration) in the middle of the screen, besides the **Test connection** icon.

    ![sap_conf_005_cs_admin]({% link sap/images/sap_conf_005_cs_admin.png %})

6. In the administration area, the repository has to be created by the **Create repository** icon on the left. It is available in section **Create**.

    ![sap_conf_006_create_repo_cs_admin]({% link sap/images/sap_conf_006_create_repo_cs_admin.png %})

7. If the repository has been created successfully, you'll be redirected to the **Details** section. At the bottom of this screen, you'll see already some basic repository information coming "live" from Content Services.

    ![sap_conf_007_create_repo_cs_admin_done]({% link sap/images/sap_conf_007_create_repo_cs_admin_done.png %})

8. Click the **Save** (**CTRL + S**) button in the bottom bar to save the changes again.

    After saving, the screen can be closed by clicking on **Exit** button in the top right toolbar.

### 2. Secure connection using a certificate {#basic-secureconnwithcert}

Create a certificate in SAP that will be stored in Content Services to allow only authorized requests from the SAP Content Repository.

By default, all HTTP(S)-requests coming from the SAP Content Repository and arriving via the SAP Connector in Content Services are dropped until a certificate is available and active (you can disable the certificate check in the `alfresco-global.properties` file).

> **Important:** We strongly recommend securing the connection between SAP and Alfresco at all times.

1. Open the newly created SAP Content Repository for editing in transaction `OAC0` again.

2. Navigate to the Content Server Administration by clicking the **CS Admin** button.

3. Switch to section **Certificates** and refer to the **Certificates Properties** table at the bottom (which is still empty).

4. Click the button **Send certificate** (mail icon) to send a certificate to the SAP Content Repository.

    ![sap_conf_008_create_repo_cs_admin_certificate]({% link sap/images/sap_conf_008_create_repo_cs_admin_certificate.png %})

5. The certificate is sent to Content Services. It appears in the table **Certificates Properties** but it's not yet active (since the checkbox in the **Active** column isn't selected).

    ![sap_conf_009_create_repo_cs_admin_certificate_created]({% link sap/images/sap_conf_009_create_repo_cs_admin_certificate_created.png %})

    > **Note:** From the SAP HTTP-Content Server protocol specification, the certificate can only be activated from the content repository side. This is an additional security step. Therefore, no additional action is required in SAP. Switch to Content Services and proceed with the activation in the next step.

### 3. Enable security by activating the certificate

Activate the certificate in Content Services to process authorized requests only.

There are two options for activating the recently sent certificate. Either activate it in the SAP Connector - Administration Console (recommended and preferred way) or manually edit the related property at the certificate document in the Alfresco repository.

1. **Activation via SAP Connector - Administration Console:**

    1. Log in to Alfresco Share and navigate to the SAP Connector - Administration Console (via menu *Admin Tools* > *SAP Integration*).

    2. Scroll down to the related SAP System Configuration where the recently created SAP Content Repository belongs to.

    3. Click the **Enable certificate for content repository XX** button.

        ![sap_conf_010_share_certificate_before]({% link sap/images/sap_conf_010_share_certificate_before.png %})

    4. The connection is now secured by the certificate.

        ![sap_conf_010_share_certificate_after]({% link sap/images/sap_conf_010_share_certificate_after.png %})

2. **Activation by manually editing the certificate properties:**

    1. Log in to Alfresco Share and navigate to the following (new) folder structure in the Alfresco repository to find the recently created certificate document: **Repository > Data Dictionary > SAP Content Connector > SAP Repositories > XX**.

    2. Within the **XX** folder two files are available. The repository file (with name `XX Repository`) and the certificate document (contains the common name of the SAP system in the document name).

        ![sap_conf_011_share_certificate_in_repo]({% link sap/images/sap_conf_011_share_certificate_in_repo.png %})

    3. Edit the properties of the certificate document, and select checkbox **Certificate Active** and **save** the document.

        ![sap_conf_012_share_certificate_properties]({% link sap/images/sap_conf_012_share_certificate_properties.png %})

        The connection is now secured by the certificate.

### 4. Check certificate in SAP

Use this information to confirm that the certificate activation in Content Services reflects in the SAP system for the SAP Content Repository.

To prove that the activation of the certificate from the previous step reflects immediately for the SAP Content Repository, check the certificate section of the SAP Content Repository.

1. In the SAP system, open the created SAP Content Repository in transaction `OAC0` again.

2. Click button **CS Admin**.

3. Switch to **Certificates** section and refer to table **Certificate Properties**.

4. In column **Active** the checkbox is now selected.

    ![sap_conf_013_sap_certificate_active]({% link sap/images/sap_conf_013_sap_certificate_active.png %})

### 5. Functional test

This page describes how the SAP Connector, and therefore the ArchiveLink interface, can be tested. The testing requires some additional SAP fundamentals, and is based on the same procedure used by SAP to certify the SAP Connector content ArchiveLink interface.

> **Note:** In order to successfully complete these tests, all the mandatory steps described in the Basic configuration section should have been completed.

1. In SAP, open the **ABAP** editor with transaction `SE38`.

2. Enter `RSCMST` as report name in the **Program** field and execute it. You can click **Execute** in the toolbar or press **F8** to execute it.

    ![sap_conf_014_sap_rscmst_1]({% link sap/images/sap_conf_014_sap_rscmst_1.png %})

3. In the **Repository** field, enter the name of the recently created SAP Content Repository and click **Execute** in the toolbar (or press **F8**).

    ![sap_conf_014_sap_rscmst_2]({% link sap/images/sap_conf_014_sap_rscmst_2.png %})

4. In the next screen, all sub-reports are listed that could be executed against the repository.

    ![sap_conf_014_sap_rscmst_3]({% link sap/images/sap_conf_014_sap_rscmst_3.png %})

5. The most important report is `RSCMSTH0`. This will test the basic communication like `create`, `info`, `search`, `update` or even `delete` commands via HTTP against the repository. Click the **Execute** icon for the report.

6. The report returns successfully if the SAP Content Repository is properly configured, and hence the SAP Connector is working.

    ![sap_conf_014_sap_rscmst_4]({% link sap/images/sap_conf_014_sap_rscmst_4.png %})

7. (Optional) If you’re interested in more technical details of the test, then click the **Details** icon near the green result.

    In this screen, each function call with its parameter is logged that was sent to Alfresco. Scroll down to the end of the detail page and find a summary of the functions which was tested including times.

    ![sap_conf_014_sap_rscmst_6]({% link sap/images/sap_conf_014_sap_rscmst_6.png %})

8. (Optional) You can execute some further test reports against the repository.

    This will test additional functionality of the HTTP interface. The additional available test reports are: `RSCMSTH1`, `RSCMSTH2` and `RSCMSTH3`.

    ![sap_conf_014_sap_rscmst_5]({% link sap/images/sap_conf_014_sap_rscmst_5.png %})

    > **Note:** For SAP BASIS component 740 up to (at least) 752 there is a known bug in the `RSCMSTH2` report. If the report returns with a lot of issues regarding document protection like `DOC_P[rc]`, refer to the following SAP {% include tooltip.html word="SAP_OSS" text="OSS" %} notes: 2371386, 2198970. Skip this report unless the notes are implemented.
