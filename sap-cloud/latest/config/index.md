---
title: Configure SAP S/4HANA on-premises
---

Use this information to configure the SAP Cloud Connector for on-premises installations of SAP S4/HANA.

## Customize SAP

This section guides you through the configuration steps in the related SAP system to allow the storage of attachments via the CMIS protocol in Content Services.

### Create new HTTP connection to Content Services {#new-http-connection}

1. Create a new **HTTP Connection to External Server** within the RFC Connection transaction `SM59`.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection.png %})

2. Enter a name and choose **HTTP Connection to External Server** as the Connection type.

    We suggest you use a descriptive destination name, avoiding whitespace and other special characters.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create.png %})

3. As a minimum, add the required values for the fields in the **Target System Settings** area:

    * The host must match the Alfresco server (use port `8080`)
    * Enter the following as the **Path Prefix** (this must be an exact match):

        ```text
        /alfresco/api/-default-/public/sapcmis/versions/1.1/browser
        ```

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system.png %})

4. Save the changes and switch to the **Logon &amp; Security** tab.

5. Select **Basic Authentication** from the **Logon Procedure** section and provide the username and password to log in to Content Services.

    If Single Sign-On is enabled, configure the  **Logon with Ticket** section.

    ![SM 59]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system_logon.png %})

6. Save the changes again.

7. Click **Connection Test** in the menu to verify the connection.

    * Content Services should respond with an HTTP `200` response.
    * If not, check that the module is installed correctly on Content Services, and ensure the username and password from the previous step match.

    ![Connection Test]({% link sap-cloud/images/sap_sm59_create_connection_create_target_system_test.png %})

### Create new Content Repository for CMIS {#new-repo-cmis}

Based on the HTTP Connection created in the previous section, a new CMIS Content Repository must now be created.

1. Go to transaction `OAC0`.
2. Create a new Content Repository with the following values:

    * **Content Rep.:** `-DEFAULT-`

    > **Important: This must be an exact match - written in UPPERCASE with leading and trailing slash.** *The name can't be changed as it's the default setting in Content Services for the CMIS repository* SAP may not allow you to create it with `-DEFAULT-` and might show an error message similar to `The selected key is reserved for SAP`. If this error shows up, hit the Enter key twice.

    * **Document area:** *Leave empty*
    * **Storage type:** `CMIS Content Server`
    * **RFC destination:** `ALF_CMIS_ACS_7` *Select the previously created HTTP Connection.*

![OAC0 Create Repo]({% link sap-cloud/images/sap_oac0_create_cmis_repo.png %})

#### (Optional) Create Logical Repositories

In addition to the `-DEFAULT-` repository, you can create **Logical Repositories** for **ArchiveLink** and reference the `-DEFAULT-` repository to provide more flexibility.

To do this, create another Content Repository and use the following values:

* **Document Area:** `ArchiveLink`
* **Storage type:** `Logical Repository`
* **Symbolic Rep.:** `-DEFAULT-`

![OAC0 Create Logical Repo]({% link sap-cloud/images/sap_oac0_create_logical_repo.png %})

## Run CMIS setup report

You'll need to run the CMIS report to create the necessary folder structure in Content Services.

1. In transaction `SE38` select the program **CMIS_REPOSITORY_SETUP** and execute it with the following values:

    * **RFC_DEST:** `ALF_CMIS_ACS_7` (the recently created HTTP Connection)
    * **CMIS_REP:** `-DEFAULT-`

    ![SE38]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report.png %})

    > **Note:** The report runtime can take up to 5 minutes.

2. The result should look like the following screenshot.

    The errors can be skipped because the stated types have already been created by applying the `sap-content-connector-cmis-repo-x.x.x.amp` in the very first step:

    ![SE38]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report_result.png %})

    > **Note:** The reason behind the errors is that Content Services doesn't support the type creation via CMIS, but the module takes care of this creation.

### Verify folder creation in Content Services

Log in to Content Services with administrator privileges and navigate to the **Repository** folder. Here you'll find two new folders:
  
 1. Knowledge Provider
 2. Business Object Types

These folders have a structure that's created along with the report.

![View in Content Services]({% link sap-cloud/images/sap_se38_cmis_repo_setup_report_result_acs.png %})

This is also the proof that the errors in the report above can be skipped, because both folders were mentioned in the error log even though they exist.

## Maintain storage category for CMIS

To store documents (attachments) from SAP via CMIS to Content Services, the **SOFFDB** and **SOFFHTTP** categories should point to the `-DEFAULT-` content repository. Change it in transaction `OACT`.

![Change SOFFDB and SOFFHTTP categories]({% link sap-cloud/images/sap_oact_soffdb_soffhttp_category_to_default.png %})

## Map Categories for Physical Documents Class

Go to transaction `SKPR08` and map the new category under `SOFFPHIO`.

![Map SOFFDB under new category]({% link sap-cloud/images/sap_skpr08_map_category_to_soffdb.png %})
