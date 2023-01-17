---
title: Install additional software
---

You can install the third-party software used by Content Services independently. Some of the software can be installed any time before or after installing Content Services.

## Install TinyMCE language packs

Translations in Content Services use language packs. The supported language packs are:

* English (en)
* German (de)
* Spanish (es)
* French (fr)
* Italian (it)
* Japanese (ja)
* Dutch (nl)
* Norwegian - Bokmål (nb)
* Russian (ru)
* Brazilian Portuguese (pt_BR)
* Simplified Chinese (zh_CN)

The language used switches according to the browser locale. Ensure that your browser is set up to view the relevant locale, which ensures that the special characters display correctly in your installed instance.

The source-localized files are encoded in ASCII, and the special and accented characters are displayed using escape sequences. The source files have been renamed using the corresponding locale for each language. For example, `site-welcome.properties` is called `sitewelcome_ fr.properties` for the French version.

If you wish to use a translation that is not supplied with Content Services, then you must add the appropriate TinyMCE language pack for the translation to work correctly.

1. Browse to the [TinyMCE website](https://www.tiny.cloud/?ctrl=lang&act=download&pr_id=1){:target="_blank"}.

2. Download the required TinyMCE language pack.

    > **Note:** The next step makes configuration changes to the Alfresco Share application to configure the additional language packs for TinyMCE. This step can only be performed after Content Services has been installed.

3. Unpack the language file to `<TOMCAT_HOME>/webapps/share/modules/editors/tiny_mce/langs`.

4. Ensure that the browser cache is cleared or refresh the page.

## Install integrations

Use this information to review the components or modules that integrate Content Services with other applications.

| Name     | Notes |
| -------- | ----- |
| **Services** | |
| Process Services | |
| Governance Services | |
| | |
| **Integrations** | |
| Sync Service | |
| Desktop Sync | |
| Transform Service | |
| Document Transformation Engine | Paid add-on module |
| Search and Insight Engine | Paid add-on module |
| Search Enterprise | |
| Search Services | |
| Federation Services | |
| Identity Service | |
| SAML Module for Alfresco Content Services | |
| Intelligence Services | Paid add-on module |
| Content Connector for AWS S3 | Paid add-on module |
| Content Connector for Azure | Paid add-on module |
| Content Connector for Salesforce | |
| Content Connector for SAP applications | Paid add-on module |
| Content Connector for SAP Cloud | Paid add-on module |
| Collaboration Connector for Microsoft 365 | |
| Collaboration Connector for Teams | |
| Outlook Integration | Paid add-on module |
| Office Services | |
| Google Docs Integration | |
| | |
| **Applications** | |
| Digital Workspace | |

## Test installation

Installation testing checks that Content Services is successfully installed and it's working as expected after installation.

Some of the points that need to be checked prior to testing your installation are:

* Verify the prerequisites you need to install.
* Verify that, after a successful install, the application works as per the specification document and meets user needs.
* On uninstall, check that all previously installed files and registry entries are removed as expected.

### Post-installation checks

Once you've successfully installed Content Services, test and gain familiarity with the core features and functions.

Here are some tips to familiarize yourself.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

* Can you login using your user name and password. See [Signing in]({% link content-services/7.2/using/share.md %}#signing-in).
* Can you create a site. See [Creating a new site]({% link content-services/7.2/using/sites/index.md %}#creating-a-site).
* Can you add new users to the site. See [Adding users to a site]({% link content-services/7.2/using/sites/index.md %}#adding-users-to-a-site).
* Can you add pages to the site. See [Adding pages to a site]({% link content-services/7.2/using/sites/index.md %}#customizesite).
* Can you add content to a site library. See [Adding content items]({% link content-services/7.2/using/content/manage.md %}).
* Can you copy or move content from its current location to another folder or any other site. See [Copying content]({% link content-services/7.2/using/content/manage.md %}#copying-content) and [Moving content]({% link content-services/7.2/using/content/manage.md %}#moving-content).
* Can you update content. See [Updating content]({% link content-services/7.2/using/content/manage.md %}#uploading-files).
* Can you manage permissions for a user or a group for accessing content. See [Managing content permissions]({% link content-services/7.2/using/permissions.md %}).
* Can you add a new rule to a folder in the site library and check if it works. See [Adding a new rule]({% link content-services/7.2/using/content/rules.md %}#createrule).
* Can you schedule events, such as meeting, for your team. See [Scheduling events]({% link content-services/7.2/using/sites/features.md %}#calendar).

### Post-installation checks (clustered environment)

Once you've successfully installed and configured Content Services in a distributed/clustered environment, make sure that the features and customizations you've added work properly.

Here are some of the tips to help you test your customizations.

> **Note:** We recommend that you create a test site for testing purposes, and put all your test data in that site.

* Check that the application server is running.
* Can you login using your user name and password. See [Signing in]({% link content-services/7.2/using/share.md %}#signing-in).
* Check that various components are communicating with each other.
* For a clustered installation, check if when one node is down, the request is forwarded to the next available node.
* Check if clustering is working properly by running the [cluster validation tool]({% link content-services/7.2/admin/cluster.md %}#managecluster) in the Admin Console.
* Check if you are using a clustering-enabled license.
* Change the cluster-related properties in the `alfresco-global.properties` file, and check if all the nodes are up and running.

> **Note:** After you've finished testing, remember to delete the test site or test data in order to clear your database.

## Start and stop server

Use this information to run the Content Services server and Alfresco Share.

### Start server

Once you've installed Content Services using the distribution zip, you can start the server. The server must be running before you can use Alfresco Share.

1. Navigate to the installation directory for your database and start the server.

2. Navigate to the Tomcat `/bin` directory and start the server:

    For example: (Linux)

    ```bash
    ./startup.sh
    ```

    For example: (Windows)

    ```bash
    startup
    ```

    You need administrator rights to run this command.

3. Browse to the location of your Content Services installation:

    For example, `http://<your-host>:8080/alfresco`.

### Stop server

Use this information to stop the server.

1. Navigate to the Tomcat `/bin` directory then choose one of these options to stop the server:

    For example: (Linux)

    ```bash
    ./shutdown.sh
    ```

    For example: (Windows)

    ```bash
    shutdown
    ```

    You need administrator rights to run this command.

2. Navigate to the installation directory for your database and stop the server.

### Start Alfresco Share

Once you've started Content Services, you can start Alfresco Share using a browser.

1. Browse to the location of your installation.

    For example, `http://<your-host>:8080/share`.

    Alfresco Share opens in a browser.

2. Sign in using a user name and password.

    The default administrator user name is `admin`.
