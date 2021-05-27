---
title: Configure SAP Cloud Connector
---

Use this information to configure the SAP Cloud Connector.

## Customize SAP

This section guides you through the configuration steps in the related SAP system to allow the storage of attachments via the CMIS protocol in Content Services.

### Create a new HTTP connection to Content Services {#new-http-connection}

1. Create a new **HTTP Connection to External Server** within the RFC Connection transaction `SM59`.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection.png %}

2. Enter a name and choose **HTTP Connection to External Server** as the Connection type.

    We suggest you use a descriptive destination name, avoiding whitespace and other special characters.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create.png %}

3. As a minimum, add the required values for the fields in the **Target System Settings** area:

    * The host must match the Alfresco server (use port `8080`)
    * Enter the following as the **Path Prefix** (exact match): `/alfresco/api/-default-/public/sapcmis/versions/1.1/browser`

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system.png %}

4. Save the changes and switch to tab **Logon &amp; Security**.

5. Select **Basic Authentication** from the **Login Procedure** section and provide the username and password to login to Content Services.

    If Single Sign-On is enabled, the **Login with Ticket** section might be changed.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system_logon.png %}

6. Save the changes again.

7. Click **Connection Test** in the menu to verify the connection.

    * Content Services should respond with an HTTP `200` response.
    * If not, check whether the module has been installed correctly on Content Services, and if the user and password from the previous step match.

    ![Connection Test]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system_test.png %}

### Create a new Content Repository for CMIS {#new-repo-cmis}

Based on the created HTTP Connection in the previous section, a new CMIS Content Repository must be created with the following steps:

* Go to transaction `OAC0` and create a new Content Repository with the following values:

  * **Content Rep.:** `-DEFAULT-` _Exact match! UPPERCASE, with leading and trailing slash. Name cannot be changed as it is the default setting in Alfresco Content Services for the CMIS repository!_
  * **Document area:** _Leave empty_
  * **Storage type:** `CMIS Content Server`
  * **RFC destination:** `ALF_CMIS_ACS_7` _Select the previously created HTTP Connection._

    ![OAC0 Create Repo]({% link sap-cloud/images/sap_oac0_create_cmis_repo.png %}

#### Outlook (create Logical Repositories)

In addition to the `-DEFAULT-` repository, **Logical Repositories** for **ArchiveLink** can refer to the `-DEFAULT-` repository to provide more flexibility. To do this, create another Content Repository and use the following values:

* **Document Area:** `ArchiveLink`
* **Storage type:** `Logical Repository`
* **Symbolic Rep.:** `-DEFAULT-`

![OAC0 Create Logical Repo]({% link sap-cloud/images/sap_oac0_create_logical_repo.png %}

## Run CMIS setup report

You'll need to run the CMIS report to create the necessary folder structure in Content Services.

1. In transaction `SE38` select the program **CMIS_REPOSITORY_SETUP** and execute it with the following values:

    * **RFC_DEST:** `ALF_CMIS_ACS_7` (the recently created HTTP Connection)
    * **CMIS_REP:** `-DEFAULT-`

    ![SE38]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report.png %}

    > **Note:** The report runtime can take up to 5 minutes.

2. The result should look like below.

    The errors can be skipped because the stated types has been already created by applying the `sap-content-connector-cmis-repo-x.x.x.amp` in the very first step.

    The reason behind the errors is, that Content Services does not support the type creation via CMIS. However, the module takes care about the creation.

    ![SE38]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report_result.png %}

### Verify the folder creation in Content Services

Login to Content Services with administrator privileges and navigate to the **Repository** folder. Here you'll find two new folders:
  
 1. Knowledge Provider
 2. Business Object Types

These folders have a structure that's created along with the report.

    ![View in Content Services]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report_result_acs.png %}

    This is also the proof that the errors in the report above can be skipped, because both folders were mentioned in the error log but they exist.

## Maintain storage category for CMIS

To store documents (attachments) from SAP via CMIS to Content Services, the category **SOFFDB** should point to the `-DEFAULT-` content repository. Change it in transaction `OACT`.

    ![Change SOFFDB category]({% link sap-cloud/images/sap_oact_soffdb_category_to_default.png %}
