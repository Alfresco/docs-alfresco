---
title: Administer SAP Connector
---

This page shows you how to check the health of the current installation using Alfresco Share, and troubleshooting.

## Administration Console {#sapadminconsole}

The SAP Connector Administration Console provides a smart overview of all important settings for the current state of the SAP Connector. Having all configuration settings and properties, from different parts of the installation,  in one screen makes it easy to identify and review the current state.

The SAP Connector Administration Console is only available for Alfresco Share. If Alfresco Share isn't available, you can use the SAP Connector Administration Health WebScript to check the status of the SAP Connector.
See [SAP Connector Administration Health Web Script](#sapadminhealthwebscript) for more.

### Accessing the Administration Console

The SAP Connector Administration Console is installed as an *Admin Tool*, so you can access it via the **Admin Tools** toolbar in Alfresco Share. A new menu item **SAP Integration** is available. Click it to open the SAP Connector Administration Console.

![sap_inst_002_adminconsole]({% link sap/images/sap_inst_002_adminconsole.png %})

### Using the Administration Console

This is a deep dive into the different sections of the SAP Connector Administration Console.

#### Header Information

The header section provides a brief overview of the installed SAP Connector version and the build. It also displays the current SAP Connector health status based on the three traffic light colors (red, yellow and green). Having this, the overall health can be easily reviewed at a glance.

![sap_inst_002_adminconsole_001_header]({% link sap/images/sap_inst_002_adminconsole_001_header.png %})

| Status Color | Description |
| ------------ | ----------- |
| Green | The SAP Connector is configured properly and is working. No action required. |
| Yellow | Review the current settings. Immediate action may not be required. Examples for this state are:{::nomarkdown}<ul><li>The certificate for a (new) SAP Content Repository is not enabled yet (but exists already).</li><li>The license or the maintenance period expires soon.</li></ul>{:/} |
| Red | This flag requires immediate action. Examples are:{::nomarkdown}<ul><li>The license has expired.</li><li>Properties or values for required parameters are missing.</li><li>A new SAP Content Repository is available but no certificate has been sent yet.</li></ul>{:/} |

#### License Information

All important information regarding the current applied license (including the maintenance period) are displayed for the SAP Connector. In this section you can also apply a new license by using the **Upload License** button. See [Installing the license]({% link sap/5.2/install/index.md %}#installing-the-license) for more.

![sap_inst_002_adminconsole_002_license]({% link sap/images/sap_inst_002_adminconsole_002_license.png %})

#### SAP System Configuration Information

This section displays detailed information of all available SAP System Configurations from the `alfresco-global.properties`. Each SAP System Configuration appears in a separate box and contains - besides the configuration settings from the `alfresco-global.properties` - also all SAP Content Repositories which are set up for the SAP System Configuration along with their settings for Jobs, Behaviors. The next screenshot shows how one SAP System Configuration will be displayed. If you have two SAP System Configuration configured, this box displays twice, and so on.

![sap_inst_002_adminconsole_003_sapsystemconfiguration]({% link sap/images/sap_inst_002_adminconsole_003_sapsystemconfiguration.png %})

The following sub-sections explains each area shown in the screenshot above in more detail.

* **Archivelink Settings**

    Display important information used for the basic communication between SAP and Content Services. All settings are related to the settings in the `alfresco-global.properties`.

    > **Note:** The password for the user used to login to Content Services is never transmitted, hence it is not displayed in the Administration Console.

* **SAP Java Connector Settings**

    Display important information used for the connection from Content Services to SAP as well as related information for the [Opening associated Business Object in SAP]({% link sap/5.2/config/advanced.md %}#openassocbusinessobjinsap) feature.

    > **Note:** The password for the SAP system user used to connect to SAP is never transmitted, hence it is not displayed in the Administration Console.

* **SAP Content Repositories**

    List all SAP Content Repositories connect via the current SAP System Configuration. Each SAP Content Repository appears in a new line. The background color of each SAP Content Repository indicates its current state in Content Services. The condition is also highlighted with traffic light colors, as the overall health state in the header too. Any other state than Green will affect the overall health state as well, meaning if the state is yellow, then also the overall health state in the header is at least yellow.

    > **Note:** If the state of a SAP Content Repository is highlighted with yellow background, there is a need to activate the certificate (sent from SAP) for that repository. In this case the **Status** column shows a button to activate the certificate.

    | Status Color | Description |
    | ------------ | ----------- |
    | Green | The SAP Content Repository is up and running. |
    | Yellow | The SAP Content Repository exists in Content Services and the certificate was also sent already. However, the certificate still needs to be activated to allow the communication. In this case, a button appears in the **Status** column to enable the certificate. Once enabled, the status color will switch to green. |
    | Red | There are two options which lead to this state:<br><br>1. The SAP Content Repository was not created yet (see [1. Create SAP Content Repository]({% link sap/5.2/config/index.md %}#basic-createsapcontentrepo)).<br>2. The SAP Content Repository exists but the certificate was not sent yet (see [2. Secure connection using a certificate]({% link sap/5.2/config/index.md %}#basic-secureconnwithcert)).<br><br>However, the message in the `Status` column in such a case will show the exact reason. |

* **Jobs**

    This table lists all available jobs and the current state of each SAP Content Repository for it along with the CRON expression used to invoke the job. See [Configuring jobs]({% link sap/5.2/config/index.md %}#configure-jobs) to learn more about how to enable or disable jobs for SAP Content Repositories.

* **Behaviors**

    Like for the jobs above, this table lists all available behaviors and the current state of each SAP Content Repository for it. See [Configuring behaviors]({% link sap/5.2/config/index.md %}#configure-behaviors) to learn more about how to enable or disable behaviors for SAP Content Repositories.

* **Feature: Open corresponding SAP Business Object**

    This section only appears if the [Opening associated Business Object in SAP]({% link sap/5.2/config/advanced.md %}#openassocbusinessobjinsap) feature is used and the default settings was overridden. See [Advanced configuration]({% link sap/5.2/config/advanced.md %}#OpenBusinessObjectSAPAdvancedConfig) for more. It shows the content of related `webClient-config.properties` for the current SAP System Configuration.

    ![sap_inst_002_adminconsole_004_openinsap]({% link sap/images/sap_inst_002_adminconsole_004_openinsap.png %})

#### Additional Settings

This section only appears if there are any of the additional settings which override the standard behavior of the SAP Connector. See [Additional repository settings]({% link sap/5.2/admin/reference.md %}#additionalrepoconfig) for more. These common settings affect the SAP Connector as they're not related to a particular SAP System Configuration.

This section lists all additional settings available in the `alfresco-global.properties` which are used to override core behavior. The **Name** column shows the property key, including the default value (in brackets), and the **Value** column shows the current value used to override the default.

![sap_inst_002_adminconsole_005_additionalsettings]({% link sap/images/sap_inst_002_adminconsole_005_additionalsettings.png %})

## Administration Health Web Script {#sapadminhealthwebscript}

This topic shows you how to check the health of the current installation using a Web Script.

The health Web Script can be used as an alternative way to check the state of the SAP Connector without accessing the [SAP Connector Administration Console](#sapadminconsole) in Alfresco Share. It allows to review all settings related to a specific SAP Content Repository name (`archiveId`) defined in `alfresco-global.properties`.

> **Note:** Unlike the SAP Connector Administration Console, this Web Script just provides a configuration overview. It's not intended for any action to be executed.

### Accessing the Web Script

The Web Script is available on the repository tier. To access it, log in to the **Alfresco Web Scripts Home** and browse to **Content Connector for SAP - Admin** web scripts.

![sap_inst_003_healthwebscript_001]({% link sap/images/sap_inst_003_healthwebscript_001.png %})

In this section, scroll to **Health Check of Content Connector for SAP** where the Web Script is available. If you click the link without any modification, the Web Script returns an error. You'll need to change the `archiveId` parameter, as shown in the next section.

![sap_inst_003_healthwebscript_002]({% link sap/images/sap_inst_003_healthwebscript_002.png %})

### List all available SAP System Configurations with SAP Content repository names

You call the Web Script with an **empty value** for the `archiveId` parameter to list all SAP System Configurations with their related SAP Content Repositories. These parameters are defined in `alfresco-global.properties`:

```html
http://localhost:8080/alfresco/s/com/alfresco/sap/admin/healthcheck?archiveId=
```

In this case, the Web Script returns all settings that affect the global behavior of the SAP Connector (if available). See [Additional repository settings]({% link sap/5.2/admin/reference.md %}#additionalrepoconfig) for more details. It also lists the `archiveIds` parameter for each available SAP System Configuration, and displays the values (which are the SAP Content Repository names).

Click an SAP Content Repository name to show the details of the related SAP System Configuration.

![sap_inst_003_healthwebscript_004]({% link sap/images/sap_inst_003_healthwebscript_004.png %})

### Check SAP Connector health by SAP Content repository name

You can check the SAP System Configuration for a particular SAP Content Repository by passing the `archiveId` parameter with an existing SAP Content Repository name. For example:

```html
http://localhost:8080/alfresco/s/com/alfresco/sap/admin/healthcheck?archiveId=XX
```

This prints all settings for the given `archiveId`. It includes all settings of the related SAP System Configuration, and also SAP Connector core settings. See [Additional repository settings]({% link sap/5.2/admin/reference.md %}#additionalrepoconfig) for more details. In addition, it may show any detected configuration errors for this `archiveId`.

![sap_inst_003_healthwebscript_003]({% link sap/images/sap_inst_003_healthwebscript_003.png %})

## Troubleshoot SAP Connector

Your problem may be related to any one of the following issues:

### License not valid

If you can't apply the SAP Connector license you've received successfully, make sure you've provided the correct details of your landscape (such as *Is Alfresco Content Services running in a virtual machine?*) which are important to issue the license.

### Error during connection test setting up a secure connection (HTTPS) in OAC0

If you receive an error during the connection test in `OAC0` for the SAP Content Repository, make sure you've removed the `Port Number`. Only provide the `SSL Port Number` in this case.

### Payment required (HTTP Response code 402)

If the SAP Connector license becomes invalid or is missing, the SAP user will get a popup which states "Payment required", along with a 402 HTTP response code once they try to store a document in Content Services. In this case, check the SAP Connector license. See [Installing the license]({% link sap/5.2/install/index.md %}#installing-the-license) for more.

### Content Services fails to start

Before applying the provided SAP Connector AMP files, the native SAP Java Connector libraries must be merged into the delivered SAP Connector repository AMP file. If you don't do this, then Content Services fails to start.

In this case, the related error message in the log file looks similar to:

```java
**java.lang.UnsatisfiedLinkError: no sapjco3 in java.library.path: \[/usr/local/tomcat/native-jni-lib, /usr/java/packages/lib, /usr/lib64, /lib64, /lib, /usr/lib\]**
        at java.base/java.lang.ClassLoader.loadLibrary(ClassLoader.java:2660)
        at java.base/java.lang.Runtime.loadLibrary0(Runtime.java:829)
        at java.base/java.lang.System.loadLibrary(System.java:1867)
        at com.sap.conn.jco.rt.DefaultJCoRuntime.loadJCoLibrary(DefaultJCoRuntime.java:898)
```

> **Note:** The same message also appears if the wrong native files (related to the Content Services target system) of the SAP Java Connector have been applied.

To solve this issue, follow the steps in [Installing SAP Connector]({% link sap/5.2/install/index.md %}).
