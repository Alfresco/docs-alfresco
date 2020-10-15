---
title: Administer Content Connector for SAP Applications
---

## Administration Console {#sapadminconsole}

This topic shows you how to check the health of the current installation using Alfresco Share.

The SAP Connector Administration Console provides a smart overview of all important settings for the current state of 
the SAP Connector. Having all configuration settings and properties, from different parts of the installation, 
in one screen makes it easy to identify and review the current state.

The SAP Connector Administration Console is only available for Alfresco Share. If Alfresco Share isn't available, 
you can use the SAP Connector Administration Health WebScript to check the status of the SAP Connector. 
See [SAP Connector Administration Health Web Script](#sapadminhealthwebscript) for more.

**Accessing the Administration Console**

The SAP Connector Administration Console is installed as an *Admin Tool*, so you can access it via the **Admin Tools** 
toolbar in Alfresco Share. A new menu item **SAP Integration** is available. 
Click it to open the SAP Connector Administration Console.

![sap_inst_002_adminconsole]({% link sap/images/sap_inst_002_adminconsole.png %})

### Using the Administration Console

This is a deep dive into the different sections of the SAP Connector Administration Console.

#### Header Information

The header section provides a brief overview of the installed SAP Connector version and the build. 
It also displays the current SAP Connector health status based on the three traffic light colors (red, yellow and green). 
Having this, the overall health can be easily reviewed at a glance. 

![sap_inst_002_adminconsole_001_header]({% link sap/images/sap_inst_002_adminconsole_001_header.png %})

|Status Color|Description|
|------------|-----------|
|Green|The SAP Connector is configured properly and is working well. No action required.|
|Yellow|Review the current settings. Immediately action may not be required. <br><br>Examples for this state are:<br><br>* The certificate for a (new) SAP Content Repository is not yet enabled (but exists already).<br><br>* The license or the maintenance period expires soon.|
|Red|This flag requires immediate action.<br><br>Examples are:<br><br>* The license has expired.<br><br>* Properties or values for required parameters are missing.<br><br>* A new SAP Content Repository is available but no certificate has been sent yet.|

#### License Information

All important information regarding the current applied license (including the maintenance period) are displayed 
for the SAP Connector. In this section you can also apply a new license by using the **Upload License** button. 
See [Installing the license]({% link sap/latest/install/index.md %}#installing-the-license) for more.

![sap_inst_002_adminconsole_002_license]({% link sap/images/sap_inst_002_adminconsole_002_license.png %})

#### SAP System Configuration Information

This section displays detailed information of all available SAP System Configurations from the `alfresco-global.properties`. 
Each SAP System Configuration appears in a separate box and contains - besides the configuration settings from 
the `alfresco-global.properties` - also all SAP Content Repositories which are set up for the SAP System Configuration 
along with their settings for Jobs, Behaviors. The next screenshot shows how one SAP System Configuration will be displayed. 
If you have two SAP System Configuration configured, this box displays twice, and so on.

![sap_inst_002_adminconsole_003_sapsystemconfiguration]({% link sap/images/sap_inst_002_adminconsole_003_sapsystemconfiguration.png %})

The following sub-sections explains each area shown in the screenshot above in more detail.

* **Archivelink Settings**

    Display important information used for the basic communication between SAP and Alfresco Content Services. All settings are related to the settings in the `alfresco-global.properties`.

    >**Note:** The password for the user used to login to Alfresco Content Services is never transmitted, hence it is not displayed in the Administration Console.

* **SAP Java Connector Settings**

    Display important information used for the connection from Alfresco Content Services to SAP as well as related information for the [Opening associated Business Object in SAP](TODO:../concepts/sap-connector-open-in-sap.md) feature.

    >**Note:** The password for the SAP system user used to connect to SAP is never transmitted, hence it is not displayed in the Administration Console.

* **SAP Content Repositories**

    List all SAP Content Repositories connect via the current SAP System Configuration. Each SAP Content Repository appears in a new line. The background color of each SAP Content Repository indicates its current state in Alfresco Content Services. The condition is also highlighted with traffic light colors, as the overall health state in the header too. Any other state than Green will affect the overall health state as well, meaning if the state is yellow, then also the overall health state in the header is at least yellow.

    >**Note:** If the state of a SAP Content Repository is highlighted with yellow background, there is a need to activate the certificate (sent from SAP) for that repository. In this case the **Status** column shows a button to activate the certificate.

    |Status Color|Description|
    |------------|-----------|
    |Green|The SAP Content Repository is up and running.|
    |Yellow|The SAP Content Repository exists in Alfresco Content Services and the certificate was also sent already. However, the certificate still needs to be activated to allow the communication. In this case, a button appears in the **Status** column to enable the certificate. Once enabled, the status color will switch to green.|
    |Red|There are two options which leads to this state:<br><br>* The SAP Content Repository was not created yet (refer to [1. Create SAP Content Repository](TODO:../tasks/sap-connector-create-sap-repo.md)).<br><br>* The SAP Content Repository exists but the certificate was not sent yet (refer to [2. Secure connection using a certificate](TODO:../tasks/sap-connector-secure-connection.md)).<br><br>However, the message in the `Status` column in such a case will show the exact reason.|

* **Jobs**

    This table lists all available jobs and the current state of each SAP Content Repository for it along with the CRON expression used to invoke the job. Refer to [Configuring jobs](TODO:../concepts/sap-connector-jobs.md) to learn more about how to enable or disable jobs for SAP Content Repositories.

* **Behaviors**

    Like for the jobs above, this table lists all available behaviors and the current state of each SAP Content Repository for it. Refer to [Configuring behaviors](TODO:../concepts/sap-connector-behaviors.md) to learn more about how to enable or disable behaviors for SAP Content Repositories.

* **Feature: Open corresponding SAP Business Object**

    This section only appears if the [Opening associated Business Object in SAP](TODO:../concepts/sap-connector-open-in-sap.md) feature is used and the default settings was overridden. See [Advanced configuration](sap-connector-open-adv-config.md) for more. It shows the content of related `webClient-config.properties` for the current SAP System Configuration.

    ![sap_inst_002_adminconsole_004_openinsap]({% link sap/images/sap_inst_002_adminconsole_004_openinsap.png %})


#### Additional Settings

This section only appears if there are any of the additional settings which override the standard behavior of the SAP Connector. See [Additional settings (alfresco-global.properties)](TODO: ‘../references/sap-connector-additional-global-propeties-settings.md) for more. These common settings affect the SAP Connector as they're not related to a particular SAP System Configuration.

This section lists all additional settings available in the `alfresco-global.properties` which are used to override core behavior. The **Name** column shows the property key, including the default value (in brackets), and the **Value** column shows the current value used to override the default.

![sap_inst_002_adminconsole_005_additionalsettings]({% link sap/images/sap_inst_002_adminconsole_005_additionalsettings.png %})

## Administration Health Web Script {#sapadminhealthwebscript}

This topic shows you how to check the health of the current installation using a Web Script.

The health Web Script can be used as an alternative way to check the state of the SAP Connector without accessing the 
[SAP Connector Administration Console](#sapadminconsole) in Alfresco Share. It allows to review 
all settings related to a specific SAP Content Repository name (`archiveId`) defined in `alfresco-global.properties`.

>**Note:** Unlike the SAP Connector Administration Console, this Web Script just provides a configuration overview. It's not intended for any action to be executed.

### Accessing the Web Script

The Web Script is available on the repository tier. To access it, log in to the **Alfresco Web Scripts Home** and 
browse to **Content Connector for SAP - Admin** web scripts.

![sap_inst_003_healthwebscript_001]({% link sap/images/sap_inst_003_healthwebscript_001.png %})

In this section, scroll to **Health Check of Content Connector for SAP** where the Web Script is available. 
If you click the link without any modification, the Web Script returns an error. You'll need to change the 
`archiveId` parameter, as shown in the next section.

![sap_inst_003_healthwebscript_002]({% link sap/images/sap_inst_003_healthwebscript_002.png %})

### List all available SAP System Configurations with their SAP Content Repository Names

You call the Web Script with an **empty value** for the `archiveId` parameter to list all SAP System Configurations 
with their related SAP Content Repositories. These parameters are defined in `alfresco-global.properties`:

```html
http://localhost:8080/alfresco/s/com/alfresco/sap/admin/healthcheck?archiveId=
```

In this case, the Web Script returns all settings that affect the global behavior of the SAP Connector (if available). 
See [Additional settings (alfresco-global.properties)](TODO:../references/sap-connector-additional-global-propeties-settings.md) 
for more details. It also lists the `archiveIds` parameter for each available SAP System Configuration, and displays 
the values (which are the SAP Content Repository names).

Click an SAP Content Repository name to show the details of the related SAP System Configuration.

![sap_inst_003_healthwebscript_004]({% link sap/images/sap_inst_003_healthwebscript_004.png %})

### Check SAP Connector health by SAP Content Repository name

You can check the SAP System Configuration for a particular SAP Content Repository by passing the `archiveId` parameter 
with an existing SAP Content Repository name. For example:

```html
http://localhost:8080/alfresco/s/com/alfresco/sap/admin/healthcheck?archiveId=XX
```

This prints all settings for the given `archiveId`. It includes all settings of the related SAP System Configuration, 
and also SAP Connector core settings. See [Additional settings (alfresco-global.properties)](TODO:../references/sap-connector-additional-global-propeties-settings.md) 
for more details. In addition, it may show any detected configuration errors for this `archiveId`.

![sap_inst_003_healthwebscript_003]({% link sap/images/sap_inst_003_healthwebscript_003.png %})
