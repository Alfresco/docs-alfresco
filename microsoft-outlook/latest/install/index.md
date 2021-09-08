---
title: Install Outlook Integration
---

Outlook Integration is an extension to Content Services and Microsoft Outlook that allows you to save and file your emails to Alfresco from within Microsoft Outlook, in a centralized and structured way.

You can drag and drop emails in and out of the repository, and add metadata automatically when an email is filed. Other features include leveraging Alfresco's in-built workflow processing and filtered search capabilities.

Advanced metadata support includes:

* Full support for custom models
* A configurable and dynamic metadata dialog
* The ability to map metadata configuration to a path, folder type, or aspect
* The ability to assign the same metadata to a set of emails in Microsoft Outlook, or a set of files in your file system

You can apply a sorted view to the Alfresco repository (from within Microsoft Outlook), and page through a folder or site if it contains a large number of files.

You can also create new versions of existing documents, review the version history of a versioned document, and revert back to previous versions.

This information helps system administrators to install, configure, and manage Outlook Integration.

The software you need to install Outlook Integration is as follows:

* AMP files that are applied to Alfresco and provide the administration tooling in Alfresco Share
* A server license that is applied in Alfresco Share
* Client licenses that can be applied in Alfresco Share or in Microsoft Outlook
* A zip file that provides an addition to the Microsoft Outlook toolbar, which you unzip and install before you start up Microsoft Outlook

If you plan to use SAML Module for Alfresco Content Services authentication, you need to install and configure the SAML Module for Alfresco Content Services.

If you plan to enable the transformation of MSG and EML files into PDF format, you need to install and configure Alfresco Transform Service.

You can download the Outlook Integration software from the [Alfresco Support Portal](https://support.alfresco.com){:target="_blank"}.

## Prerequisites

There are a number of software requirements for installing Outlook Integration.

You need one of each of the following components:

### Operating system requirements

You can use one of the following operating systems:

* Microsoft Windows 10 with latest updates
* Microsoft Windows 8.1 with latest updates

### Software requirements

You can use one of the following Outlook releases:

* Microsoft Outlook for Office 365 (x86/x64) with latest updates
* Microsoft Outlook 2019 (x86/x64)
* Microsoft Outlook 2016 (x86/x64)
* Microsoft Office 2013 (x86/x64)
* [Visual Studio Tools for Office 4.0 Runtime](https://msdn.microsoft.com/en-us/library/ms178739.aspx){:target="_blank"}
* Microsoft .NET Framework 4.5 or above

### Alfresco requirements

* Alfresco Content Services 6.2.2 or later. See [Supported Platforms]({% link microsoft-outlook/latest/support/index.md %}) for more information.

#### Alfresco Search and Insight Engine 2.0+

If you’re using Alfresco Search and Insight Engine 2.0 and above in combination with Outlook Integration 2.8.1 and above, a property needs to be added into the shared.properties of SOLR. Please refer to the [Alfresco indexing recommendations](https://docs.alfresco.com/insight-engine/latest/config/indexing/#cross-locale) to locate this file. Add the following lines to the config:

```bash
alfresco.cross.locale.property.#={http://www.alfresco.org/model/imap/1.0}messageId
alfresco.cross.locale.property.#={http://www.westernacher.com/alfresco/models/wpsmail-v2}messageId
```
"#" stands for a number not taken already.

> **Note** This change requires a SOLR restart, but no reindex.

### Java requirements

* Java: OpenJDK 11 is recommended. This needs to be installed on the server only (i.e. not the Outlook clients). See the Content Services [Supported Platforms]({% link content-services/latest/support/index.md %}) for more information.

### Access to Docker image

The Docker image that you can use for the Outlook Integration T-Engine is uploaded to a private registry, **Quay.io**. You'll need access to the following image:

```bash
transform-outlook
```

* A [Quay.io](https://quay.io/){:target="_blank"} account is needed to pull Docker images that are needed for Outlook Integration.

> **Note:** Alfresco customers can request Quay.io credentials by logging a ticket at [Alfresco Support](https://support.alfresco.com/){:target="_blank"}. These credentials are required to pull private (Enterprise-only) Docker images from Quay.io.

> **Note:** Make sure that you request credentials for Alfresco Content Services and Alfresco Outlook Integration, so that you can use the additional `transform-outlook-1.0.x` Docker image.

> **Note:** It is recommended that you familiarize yourself with the concepts of [containerized deployment]({% link content-services/latest/install/containers/index.md %}) before working with Docker.

## Install AMPs

There are three steps to installing Outlook Integration:

* Install the Alfresco AMP files (the Alfresco Outlook Server software)
* Apply the licenses
* Install the Microsoft Outlook zip file (the Alfresco Outlook Client software)

Make sure you are running the correct versions of operating system and software before you install the AMP files.

* If you plan to use SAML Module for Alfresco Content Services authentication, check the requirements in [SAML prerequisites]({% link saml-module/latest/install/index.md %}#prerequisites).
* If you plan to transform MSG and EML files into PDF format, check the requirements in [Transform Service prerequisites]({% link transform-service/latest/install/index.md %}#prerequisites).

1. Stop the Alfresco server.

2. Browse to the [Support Portal](https://support.alfresco.com){:target="_blank"}, download and unzip the Outlook Integration zip package:

    `alfresco-outlook-integration-2.8.x.zip`

3. Copy the provided AMP files to the Alfresco `amps` and `amps_share` directories.

    Copy this file to the `amps` directory:

    `alfresco-outlook-repository-2.8.x.amp`

    and this file to the `amps_share` directory:

    `alfresco-outlook-share-2.8.x.amp`

4. To install the AMP files, run the `apply_amps.bat` file from the Alfresco `bin` directory.

    Check the output from the script to ensure that the AMP files have installed successfully.

5. Restart the Alfresco server.

6. Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar to see the Outlook configuration section.

    The URL is: `http://localhost:8080/share/page/console/admin-console/mail-customization-config`

    where `localhost:8080` is your Alfresco server and port number.

If you plan to use SAML SSO, you need to install and configure the Alfresco SAML module. See [Install with Zip]({% link saml-module/latest/install/index.md %}) and [Configure SAML SSO]({% link saml-module/latest/config/index.md %}) for more information.

If you plan to transform MSG and EML files into PDF format, you need to install and configure the Transform Service, and then select an installation method under [Install Transform Engine](#install-transform-engine) for more information.

### Install server and client licenses in Alfresco Share {#installserverclientlicenses}

Use Alfresco Share Admin Tools to install your Outlook Integration server and client licenses.

Ensure that you have applied the Alfresco Outlook Server AMP files ([see Install Outlook Integration AMPs](#install-amps)).

1. Open Alfresco Share, and click **Admin Tools** on the Alfresco toolbar.

    The URL is: `http://localhost:8080/share/page/console/admin-console/mail-customization-config`

    where `localhost:8080` is your Alfresco server and port number.

2. Select Licenses and click **Edit**.

3. Open the server license file in a text editor, and copy and paste the contents into the Server License field.

4. *(Optional)* Open the client license file in a text editor, and copy and paste the contents into the **Outlook Client License** field.

    Alternatively, specify the client license in Microsoft Outlook in **Alfresco Client > Configure > License**.

    >**Note:** There is no Lotus Notes capability, so you do not need to add information in **Lotus Notes Client License**.

5. Click **Save**.

    The server license status, number of current users, maximum users, product version and other information is displayed. Check that the license status is valid.

    >**Note:** If you added a client license, the license key is displayed, with a message to check the **Alfresco Client > Configure > License** tab in Microsoft Outlook (do this check after you have installed Alfresco Outlook Client).

## Install Transform Engine

The Outlook Integration Transform Engine (or T-Engine) enables transformation of MSG and EML files into PDF format when used with the Transform Service. The Outlook Integration T-Engine is available both as a Docker image and as a Web Archive (WAR) file.

### Install T-Engine on Tomcat {#tengine-war}

If you wish to use a Tomcat application server, you can use the WAR bundle to install the Outlook Integration T-Engine

> **Note:** Check the supported Tomcat version based on your version of the [Content Services documentation]({% link content-services/latest/support/index.md %}) before continuing.

1. Install the latest required version of Tomcat, for example, [Tomcat 8.5](https://tomcat.apache.org/download-80.cgi){:target="_blank"} to run as a service.

    See the [Tomcat documentation](https://tomcat.apache.org/tomcat-8.5-doc/index.html){:target="_blank"} for more information about configuring and using a Tomcat server.

    For information about securing Tomcat, see [Tomcat security considerations](https://tomcat.apache.org/tomcat-8.5-doc/security-howto.html).

2. Rename the WAR file from `transform-outlook-webapp-${version}.war` to `transform-outlook.war`.

    You'll find the file, `transform-outlook-webapp-1.0.0.war`, in the distribution zip.

3. Copy the WAR file into your `<TOMCAT_HOME>/webapps` folder.

4. To enable ActiveMQ in the Outlook T-Engine, set the following URL property in `JAVA_OPTS`:

    `-DACTIVEMQ_URL=${activemq.url}`

5. To enable the shared file store in the Outlook T-Engine, set the following URL property in `JAVA_OPTS`:

    `-DFILE_STORE_URL=${shared.file.store.url}`

6. Start the Tomcat service.

7. Test that the T-Engine is running:

    1. Open your browser and access `http(s)://${SERVER}:{PORT}/transform-outlook` to load the T-Engine test page.

    2. Add the following configuration property in `alfresco-global.properties`:

        ```bash
        localTransform.transform-outlook.url=http(s)://${SERVER}:{PORT}/transform-outlook
        ```

### Install T-Engine using Docker Compose {#tengine-docker}

To deploy the Outlook Integration T-Engine with the Transform Service, you'll need to update your Docker Compose file to include the Outlook T-Engine.

> **Note:** While Docker Compose is often used for production deployments, the Docker Compose file provided is recommended for development and test environments only. Customers are expected to adapt this file to their own requirements, if they intend to use Docker Compose to deploy a production environment.

1. Add Outlook Integration T-Engine container to your `docker-compose.yaml` file:

    ```yaml
    transform-outlook:
        image: quay.io/alfresco/transform-outlook:1.0.0
        mem_limit: 2g
        environment:
            JAVA_OPTS: " -Xms256m -Xmx512m"
            ACTIVEMQ_URL: "nio://activemq:61616"
            ACTIVEMQ_USER: "admin"
            ACTIVEMQ_PASSWORD: "admin"
            FILE_STORE_URL: "http://shared-file-store:8099/alfresco/api/-default-/private/sfs/versions/1/file"
        ports:
            - 8091:8090
        links:
            - activemq
    ```

2. Add the following `JAVA_OPTS` property to the `alfresco` container:

    ```yaml
    -DlocalTransform.transform-outlook.url=http://transform-outlook:8090/
    ```

3. If you're using Content Services 6.2.2 (i.e. not 7.x), you'll need to set the following properties in your Docker Compose file:

    ```yaml
    -Dlegacy.transform.service.enabled=false
    -Dlocal.transform.service.enabled=true
    ```

    > **Note:** If these settings are missing for Content Services 6.2.2, the transformation of MSG and EML files to PDFs won't work. You can ignore these settings for Content Services 7, as they're already set by default.

See the Content Services documentation - [T-Engine configuration](https://github.com/Alfresco/acs-packaging/blob/master/docs/creating-a-t-engine.md#t-engine-configuration){:target="_blank"} for more details. For further development, see [Content Transformers and Renditions Extension Points]({% link content-services/latest/develop/repo-ext-points/content-transformers-renditions.md %}).

## Install Alfresco Outlook Client in Microsoft Outlook {#installclient}

Inside the Outlook Integration zip is another zip file that installs the Alfresco Outlook Client into Microsoft Outlook.

You might need local administrator rights to install .NET 4.5 and Microsoft VS Tools for Office Runtime. Ensure you have already installed the required AMP files in your Alfresco instance ([see Install Outlook Integration AMPs](#install-amps)).

>**Note:** If you are distributing Alfresco Outlook Client across an organization, see [Install the Alfresco Outlook Client in unattended mode](#installunattendedmode) for guidance on installing in unattended mode.

1. Extract the contents of the `alfresco-outlook-client-2.8.x.zip` file using a standard unzip tool.

2. Navigate to the directory containing the unzipped content and double click the `install.bat` file.

    The Alfresco Outlook Client installer checks whether the required components already exist on the system. The required files are installed and the Alfresco Outlook Client installer wizard opens.

3. Read the copyright information and click **Next**.

4. Specify the folder where you would like the Outlook Client to be installed and click **Next**.

    Alternatively, accept the default path specified.

5. Click **Next** to confirm that the installation can start.

6. Select your preferred language, and click **Continue**.

    Microsoft Office Primary Interop Assemblies are also installed, if they do not already exist in your version of Microsoft Office.

7. Click **Close** to complete the installation.

8. Open Microsoft Outlook.

    You will see an **Alfresco Client** tab on the toolbar. Click this tab to view options for configuring the Alfresco Outlook Client.

    If you did not enter a client license key in Alfresco Share, you must enter one when you open Microsoft Outlook. Navigate to **Alfresco Client > Configure > License** to enter your key.

### Install Alfresco Outlook Client in unattended mode {#installunattendedmode}

You can automate the Alfresco Outlook Client installation by using the `msiexec` command.

You might need local administrator rights to install .NET 4.5 and Microsoft VS Tools for Office Runtime. Ensure you have already installed the required AMP files in your Alfresco instance ([see Install Outlook Integration AMPs](#install-amps)).

>**Note:** If you plan to use SAML Module for Alfresco Content Services authentication, ensure you have already installed and configured the Alfresco SAML module. See [Install with zip]({% link saml-module/latest/install/index.md %}) and [Configure SAML SSO]({% link saml-module/latest/config/index.md %}) for more information.

1. Extract the contents of the `alfresco-outlook-client-2.8.x.zip` file using a standard unzip tool.

2. Locate `x64/AlfrescoOutlookClient_x64_2.8.x.msi` or `x86/AlfrescoOutlookClient_x86_2.8.x.msi`, depending on whether you are running a 64-bit or 32-bit version of Windows.

3. From a command line, navigate to the `x64` or `x86` directory, and run the `msiexec` command. For example:

    ```bash
    msiexec /i AlfrescoOutlookClient_x86_2.8.x.msi HOST=127.0.0.1:8080 AUTH=basic
    ```

    for an interactive installation:

    ```bash
    msiexec /i AlfrescoOutlookClient_x86_2.8.x.msi HOST=127.0.0.1:8080 AUTH=basic /quiet
    ```

    for an installation with no interaction, or:

    ```bash
    msiexec /i AlfrescoOutlookClient_x86_2.8.x.msi HOST=127.0.0.1:8080 AUTH=saml /quiet
    ```

    for a non-interactive installation with SAML authentication enabled.

    >**Note:** Microsoft Office Primary Interop Assemblies are also installed, if they do not already exist in your version of Microsoft Office.

    Here is a full list of parameters that can be used with the `msiexec` command:

    |Parameter|Values|Description|
    |---------|------|-----------|
    |`HOST`|Format: `<http|https>://<hostname>:<port>`|Sets the Alfresco server URL. Port is optional.|
    |`SHARE`|Default: `share`|Sets context to Alfresco Share.|
    |`ALFRESCO`|Default: `alfresco`|Sets context to the Alfresco repository.|
    |`CULTURE`|`en|de|es|it|fr|ja|ru|zh-cn|pt-br|nl|nb-no|cs|da|fi|pl|sv` Default: `en`|Sets language for Alfresco Outlook Client.|
    |`SHAREALT`|No default|Sets alternative URL for Alfresco Share.|
    |`AUTH`|`basic|windows|saml`|Sets authentication type.|
    |`APPTITLE`|Default: Alfresco Outlook Plugin|Sets a custom title for Alfresco Outlook Client. Format: `"My Custom Title"`|

4. Verify that Alfresco Outlook Client has installed in Microsoft Outlook.

    You will see an **Alfresco Client** tab on the toolbar. Click this tab to view options for configuring the Alfresco Outlook Client.

    If you did not enter a client license key in Alfresco Share, you must enter one when you open Microsoft Outlook. Navigate to **Alfresco Client > Configure > License** to enter your key.

## Uninstall

This section walks through how to uninstall Outlook Integration.

### Uninstall Outlook Integration

To uninstall the Alfresco Outlook files, use the Module Management Tool (MMT). To completely remove Outlook Integration, you must uninstall the Outlook package from Alfresco, as well as from Microsoft Outlook on all Windows clients.

This information provides uninstall directions for Alfresco Content Services.

>**Note:** See [Uninstall Outlook Client](#uninstall-outlook-client) to uninstall the Alfresco Outlook Client.

1. Stop the Alfresco server.

2. Use the information in [Uninstall an Amp file]({% link content-services/latest/install/zip/amp.md %}#uninstall-an-amp-file) to uninstall each AMP file.

    For example, from the Alfresco root directory, you need two commands:

    ```bash
    java -jar bin/alfresco-mmt.jar uninstall com.westernacher.wps.AlfrescoMailIntegrationRepository tomcat/webapps/alfresco.war

    java -jar bin/alfresco-mmt.jar uninstall com.westernacher.wps.AlfrescoMailIntegrationShare tomcat/webapps/share.war
    ```

    Use these commands to check whether the AMP files were removed:

    ```bash
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
                  java -jar bin/alfresco-mmt.jar list tomcat/webapps/share.war
    ```

3. Delete the `tomcat/webapps/alfresco` and `tomcat/webapps/share` folders in the Alfresco installation directory.

    Deleting these directories forces Tomcat to read the edited WAR files when Alfresco is restarted.

4. Restart the Alfresco server.

### Uninstall Outlook Client

Learn how to uninstall the Alfresco Outlook Client.

>**Note:** You can uninstall the Outlook client from your Microsoft Windows machines. Using the standard **Programs > Uninstall Program** feature in Windows. Look for **Alfresco Outlook Client** and uninstall it.

There are two different ways to uninstall the Alfresco Outlook Client for enterprise installations:

1. Use the original `.msi` file to uninstall the client by running a single command.

    ```bash
    msiexec /x <Path_to_msi_file> /q
    ```

    where `/x = uninstall`, `/q = silent`.

2. Use the identifying number.

    The identifying number is tied to a specific version of your Outlook Integration. If your users have different versions installed, you need to find out the product IDs for each version.

    1. Install the Outlook plugin version that was distributed to the machines of your end users.

    2. Run the PowerShell command:

        ```bash
        get-wmiobject Win32_Product | Format-Table IdentifyingNumber, Name, LocalPackage -AutoSize
        ```

    3. Search for Alfresco Outlook Client and copy the identifying number from the first column of the output (including the brackets).

    4. Run the `msiexec` command with administration permissions on the end user machine using the identifying number. For example:

        ```bash
        msiexec /x  {723B7FFD-3B53-4786-9741-D845BC1796A3} /q
        ```

        where `/x = uninstall`, `/q = silent`.

        >**Note:** For more Microsoft msiexec documentation, see [Command-Line Options](https://docs.microsoft.com/en-us/windows/win32/msi/command-line-options){:target="_blank"}.
