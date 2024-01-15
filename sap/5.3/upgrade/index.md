---
title: Upgrade SAP Connector
---

Use this information to upgrade the SAP Connector from the previous version Connexas 4.2 to Alfresco Content Connector for SAP applications 5.x.

This guide only covers the upgrade from the previous version Connexas 4.2 to the rebranded SAP Connector version.

> **Important:** If you're running on a Connexas version below 4.2, contact the support. There is a need to follow a sequential upgrade from any previous version to Connexas 4.2 before you can proceed with the upgrade to the SAP Connector.

> **Important:** If you've implemented any custom module or any code relying on the current SAP integration *connexas*, make sure to adapt the code to the new SAP Connector structure before.

> **Important:** If you're planning to upgrade your current Content Services version as well to the next available major version (e.g. from 5.2 to 6.x), we recommend to upgrade the SAP Connector first, then upgrade Content Services in the second step.

## 1. Preparation & prerequisites

These are the necessary preparations and prerequisites to upgrade to the SAP Connector.

Before starting the upgrade, check whether your current installation is working without issues.

To verify this:

1. Login to Alfresco Share.
    * Alternatively, check with the Health Web Script.
2. Access the **connexas Administration Panel**: menu **Admin Tools > connexas**.

**CAUTION:**

If the Overall-Health-Status is not OK, fix the issues before proceeding with the upgrade.

If the installed core is not *connexas 4.2.x*, contact Support.

![sap_upgrade_connexasadminpanel]({% link sap/images/sap_upgrade_connexasadminpanel.png %})

### Prerequisites

Make sure you've fulfilled all prerequisites for the SAP Connector, as described in [Prerequisites]({% link sap/5.3/install/index.md %}#prerequisites) and [Supported Platforms]({% link sap/5.3/support/index.md %}).

For the technical upgrade, follow the steps below. Due to the product rebranding from *connexas* to the SAP Connector, the most important part of the upgrade needs to be done in the `alfresco-global.properties` and in the Content Services repository.

> **Important:** All customer specific enhancements (such as additional Jobs or Behaviors connecting to SAP via the current *framexas* framework of *connexas*) need to be modified separately to match the SAP Connector in order to continue working. Either change the modules before proceeding with the technical upgrade or skip it for now.

### Technical upgrade

Use the following steps to proceed with the technical upgrade of the software modules:

1. Stop the Content Services server.
2. Back up any custom folders and files that you have created.
3. Back up the current exploded web application folders for the repository and Alfresco Share.
4. Back up the database used for the repository.
5. Remove the former *connexas* modules from the `amps` and `amps_share` folders.
6. Download the new SAP Connector {% include tooltip.html word="AMP" text="AMP" %} files from [Hyland Community](https://community.hyland.com/){:target="_blank"}.

    Follow the instructions in the [Install SAP Connector]({% link sap/5.3/install/index.md %}#installsapconnamps) page. After applying the {% include tooltip.html word="AMP" text="AMP" %} files, verify the new SAP Connector version:

    ![sap_upgrade_modules]({% link sap/images/sap_upgrade_modules.png %})

7. Clean up all log files, temp and work folders on the Content Services server.
8. **Do not start** the Content Services server yet.

    > **Important:** You need to update the related property keys in `alfresco-global.properties`.

## 2. Modify Alfresco repository properties

Due to the product rebranding, the names of the property keys used for the SAP connection in the `alfresco-global.properties` have changed. These need to be updated before restarting the Content Services server.

### Rename property keys

Within the *connexas* version, the related property keys started with prefix `pernexas.*`.

For the SAP Connector, the prefix has changed to `integrations.*`. You need to search for all instances of `pernexas` and replace them with `integrations`, for each SAP System Configuration that's available in the `alfresco-global.properties`.

To complete the replacement, in an error-proof way, the recommendation is to search for `pernexas.sap.system` and replace it with `integrations.sap.system` as shown:

![sap_upgrade_globalprops_searchreplace]({% link sap/images/sap_upgrade_globalprops_searchreplace.png %})

### Rename jobs

After renaming the property keys with the new prefix, you also need to rename the jobs in a second step.

The table below lists the mapping of the former names in *connexas* and the new names used from now in the SAP Connector:

| Previous Name (in *connexas*) | New Name |
| ----------------------------- | -------- |
| replicateSap | sapContentConnectorReplicate |
| connexasPlus | sapContentConnectorPlus |
| barcode | sapContentConnectorBarcode |
| dirReplicate | sapContentConnectorDirReplicate |

To rename the jobs, search for the previous name and replace it with the new name. For each job there are two property keys affected - `enabled` and `conExpression`. Again, this must be done for each available each SAP System Configuration.

### Results

Once both steps above has been completed, the content of the `alfresco-global.properties` file for one SAP System Configuration should look similar to the example below.

> **Note:** Note the new prefix and the new names for the jobs.

![alfresco_upgrade_gp_after]({% link sap/images/alfresco_upgrade_gp_after.png %})

Next, restart Content Services and login to Alfresco Share.

## 3. Cross check & install new license {#crosscheckinstallnewlic}

Cross check whether the technical upgrade of the module has been successful and install the new license.

### Cross check via SAP Connector Administration Console

Once the previous steps have been completed and Content Services is up and running again, the first point to review is whether the modification of the property keys in the `alfresco-global.properties` was successful.

Open the SAP Connector Administration Console:

1. Login to Alfresco Share with administrator privileges.
2. Navigate to **Admin Tools > SAP Integration**.
    * Note that this menu item was previously shown as *connexas* before the upgrade.

The structure of the UI is similar to what was available in previous releases, with a few changes. See [SAP Connector Administration Console]({% link sap/5.3/admin/index.md %}#sapadminconsole) for more details.

> **Note:** At this point, the Overall-Health-Status should appear red. This is nothing to worry about at this point.

### Check for missing properties in any SAP System Configuration

To check whether the changes to `alfresco-global.properties` was successful, review each available SAP System Configuration.

If there are any SAP System Configuration sections that are highlighted in red with an error message (as shown), it indicates that at least one required property is missing. Review the recently updated settings in `alfresco-global.properties` and make sure the renaming was done for all properties.

> **Important:** Ensure that all configuration are valid (i.e. with no error messages), otherwise you can't proceed to the next step.

![alfresco_adminpanel_sapconnector_missing_props]({% link sap/images/alfresco_adminpanel_sapconnector_missing_props.png %})

If there are no issues, you can now apply the license.

### Install new license

Install the license via the **License Information** section. See [Installing the license]({% link sap/5.3/install/index.md %}#installing-the-license) for more.

> **Important:** The SAP Connector requires a new license. You can't use the license file of the previous *connexas* version. Contact Support, if you don't have a new license file available.

## 4. Modify SAP Content Repositories

On the SAP side, the SAP Content Repositories connected to Content Services must be recreated.

> **Important:** To execute this step successfully, the license for the SAP Connector must be installed and valid (see [3. Cross check & install new license](#crosscheckinstallnewlic)).

### Modify HTTP-Script

The product rebranding of *connexas* to the SAP Connector has also caused a new package structure for the Web Script which is called from the SAP side. Therefore, for **each** SAP Content Repository that's connected to Content Services the value for `HTTP Script` must be changed.

1. Login to SAP and open transaction `OAC0`.
2. For each affected SAP Content Repository connected to Content Services:
    1. Edit the SAP Content Repository.
    2. Change the value for `HTTP Script`:

        | Current Value | New Value |
        | ------------- | --------- |
        | alfresco/service/com/pernexas/archivelink | alfresco/service/com/alfresco/sap/http |

        ![sap_upgrade_oac0_httpscript]({% link sap/images/sap_upgrade_oac0_httpscript.png %})

    3. Save the SAP Content Repository.
    4. Go to the next SAP Content Repository.

### Recreate SAP Content Repositories and send the Certificates

Due to the product rebranding, the folder structure has also changed how the SAP Connector handles the SAP Content Repository files and certificates.

Previously, the SAP Content Repository files and certificates were stored in the `connexas` folder of the `Data Dictionary`. Now, the SAP Connector stores the files in the `SAP Content Connector` folder of the `Data Dictionary`.

To recreate the SAP Content Repositories and their certificates, follow the steps in [(1) Create SAP Content Repository]({% link sap/5.3/config/index.md %}#basic-createsapcontentrepo) starting from **step 3**. Make sure you follow each required step including the functional test.

Once created, the folder structure in the **Data Dictionary** should look like the following screenshot.

**CAUTION:**

The **Data Dictionary** still contains the former *connexas* folder structure but also the new SAP Connector structure. Both should have the same SAP Repositories. Do not delete the *connexas* folder for now. It will be required to identify customer specific settings for Jobs and Behaviors (if there are any). Continue with the following steps - the deletion of the *connexas* folder is done in the Cleanup section.

![sap_upgrade_datadictionary]({% link sap/images/sap_upgrade_datadictionary.png %})

## 5. Modify Jobs, Behavior and Draft for SAP DIR

The configuration for Jobs and Behaviors must be mapped from existing SAP Content Repositories to newly created SAP Content Repositories.

Since all the files in the SAP Content Repository have been recreated in the previous step, each SAP Content Repository now has the default settings for Jobs, Behaviors and the Draft mode for SAP {% include tooltip.html word="SAP_DIR" text="DIR" %}. However, these settings can be customized. Therefore, the settings have to be mapped from the old SAP Content Repository files to the new ones, in order to achieve the same behavior and functionality as before.

The image below shows the affected properties with the default values of the former *connexas* installation versus the SAP Connector of a SAP Repository file.

![sap_upgrade_repofilesettings]({% link sap/images/sap_upgrade_repofilesettings.png %})

### Modify Job settings

To change the job configuration, the values for the **Enabled Jobs** property of the `SAP Connection Repository Details` aspect in each SAP Content Repository file must be compared with it's counterpart. This comparison should between folders **Data Dictionary > connexas > SAP Repositories** and **Data Dictionary > SAP Content Connector > SAP Repositories**.

> **Important:** Do not Copy & Paste the values as the Job names have changed in the SAP Connector. Use the mapping table below.

| Previous Name (in *connexas*)|New Name |
| -------------------------------|-------- |
| connexasReplicate | sapContentConnectorReplicate |
| connexasPlus | sapContentConnectorPlus |
| connexasBarcode | sapContentConnectorBarcode |
| connexasDirReplicate | sapContentConnectorDirReplicate |

**CAUTION:**

Any additional value besides the default requires special attention, because this indicates a customer specific job based on the former *connexas* installation. Make sure that the underlying module for the custom job works as expected with the new SAP Connector.

### Modify Behavior settings

To change the behavior configuration, the values for the **Enabled Behaviors** property of the `SAP Connection Repository Details` aspect in each SAP Content Repository file must be compared with it's counterpart. This comparison should between folders **Data Dictionary > connexas > SAP Repositories** and **Data Dictionary > SAP Content Connector > SAP Repositories**.

> **Important:** Do not copy & paste the values as the behavior names have changed in the SAP Connector. Use the mapping table below.

| Previous Name (in *connexas*) | New Name |
| ----------------------------- | -------- |
| connexasCreateArchivelink | sapContentConnectorCreateArchivelink |
| connexasWorkflow | sapContentConnectorWorkflow |
| connexasBarcode | sapContentConnectorBarcode |

**CAUTION:**

Any additional value besides the default requires special attention, because this indicates a customer specific behavior based on the former *connexas* installation. Make sure that the underlying code for the custom behavior works as expected with the new SAP Connector.

### Modify Draft for SAP DIR

To change the Draft mode for SAP {% include tooltip.html word="SAP_DIR" text="DIR" %}, the option for `Enable Draft for SAP DIR` in aspect `SAP Connection Repository Details` of each SAP Content Repository file must be compared with it's counterpart. This comparison should be between folders in folder **Data Dictionary > connexas > SAP Repositories** and **Data Dictionary > SAP Content Connector > SAP Repositories**.

## 6. Modify additional configuration

Change any additional configurations, such as for the *Open associated Business Object in SAP* feature.

### Modify Open associated Business Object in SAP feature

If there's an advanced configuration for [Opening associated Business Object in SAP]({% link sap/5.3/config/advanced.md %}#openassocbusinessobjinsap), this must also be merged into the new SAP Connector structure in the **Data Dictionary**. In order to do so, follow these step-by-step instructions:

1. In Alfresco Share navigate to folder **Data Dictionary > connexas > Configuration**.

    > **Note:** If the **Configuration** folder does not exist, you don't have any additional configuration. You can skip these steps.

2. Identify all necessary files used to enhance the feature (see [Advanced configuration]({% link sap/5.3/config/advanced.md %}#OpenBusinessObjectSAPAdvancedConfig) for more info).
3. Create a new **Configuration** folder under **Data Dictionary > SAP Content Connector** .
4. Copy (or move) all files from **Data Dictionary > connexas > Configuration** to **Data Dictionary > SAP Content Connector > Configuration**.

### Recreate "Perform Action" section for SAP related rules

This section may be of interest if there are rule scripts in place that move the documents from SAP to a final folder structure and/or rename the files according the SAP original file name.

If there are Alfresco rules in place that rely on rule scripts used to react on SAP replicated metadata (such as to move / rename documents), you'll need to redefine the rule action script. In the former *connexas* versions, a special **Patched Execute Script** action was required to execute the related JavaScript. The **Patched Execute Script** selection has been removed since the product rebranding, so the underlying Id has changed. With this change, the selected JavaScript to be executed has also been removed. This means, the rule doesn't execute the selected script anymore.

The **Patched Execute Script** is still available in the new SAP Connector version, but it has a new internal Id.

> **Note:** You'll need to edit each affected rule to re-apply the required action.

1. Identify the affected rules.

    They're usually found in the folder for all incoming SAP documents (which may be defined by the property `sap.system.1.al.documentRoot` in `alfresco-global.properties`), as well as in the folder where the documents finally end up after moving them to the desired structure.

2. Select the folder, click on action **Manage Rules**, then select the affected rule.

    The **Perform Action** section is empty, which means nothing will happen. Also, this is not a valid state:

    ![sap_upgrade_connexas_rule_1]({% link sap/images/sap_upgrade_connexas_rule_1.png %})

3. Click **Edit** to start editing the rule.
4. Scroll down to the **Perform Action** section, and select **Patched Execute Script** in the list. Finally, select the related JavaScript:

    ![sap_upgrade_connexas_rule_2]({% link sap/images/sap_upgrade_connexas_rule_2.png %})

5. **Save** the rule and test it.
6. Repeat these steps for all affected rules.

## 7. Perform extensive testing

To verify the successful upgrade from *connexas* to the SAP Connector, perform extensive testing of all scenarios used with the SAP Connector.

### Functional tests

Perform the functional (technical) testing of each recreated SAP Content Repository, as described in the [Basic configuration]({% link sap/5.3/config/index.md %}#basic-configuration).

### Accessibility tests

Make sure that existing documents are still accessible from the attachment list of the SAP Business Objects.

### Scenario tests

Do intensive testing of all scenarios used with the SAP Connector (such as store documents, test barcode, start SAP Workflow, etc.). Make sure the behavior for new as well as existing documents is still as expected, for example for all Jobs and Behaviors.

## 8. Cleanup

This cleanup section removes all former *connexas* files after the successful upgrade to the SAP Connector.

### Delete folder in Data Dictionary

If all SAP Content Repositories are available under **Data Dictionary > SAP Content Connector > SAP Repositories** *and* all related settings of the previous chapters have been merged, you can safely delete the folder: **Data Dictionary > connexas**.

Make sure you delete it from the **Trash** of the administrator user as well.

### Delete old license file

Delete the former *connexas* license, as it's invalid. The license is stored on the Content Services server, in the folder specified by the `dir.license.external` property in the `alfresco-global.properties`. See [Installing the license]({% link sap/5.3/install/index.md %}#installing-the-license) for more.

The name of the former license file is `connexas.l4j`. You can safely delete it.

You can also safely delete any backup files for the previous *connexas* version (such as `connexas2019-10-21_13-10-23.l4j`).
