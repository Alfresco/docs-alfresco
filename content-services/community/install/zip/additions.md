---
title: Install additional software
---

You can install the third-party software used by Community Edition independently. Some of the software can be installed 
any time before or after installing Community Edition.

## Install TinyMCE language packs

Translations in Community Edition use language packs. The supported language packs are:

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

If you wish to use a translation that is not supplied with Community Edition, then you must add the appropriate TinyMCE language pack for the translation to work correctly.

1. Browse to the [TinyMCE website](http://tinymce.moxiecode.com/download_i18n.php){:target="_blank"}.

2. Download the required TinyMCE language pack.

    > **Note:** The next step makes configuration changes to the Alfresco Share application to configure the additional language packs for TinyMCE. This step can only be performed after Community Edition has been installed.

3. Unpack the language file to `<TOMCAT_HOME>/webapps/share/modules/editors/tiny_mce/langs`.

4. Ensure that the browser cache is cleared or refresh the page.

## Install integrations

Use this information to review the components or modules that integrate Community Edition with other applications.

### Integrations

| Integrations | Notes |
| ------------ | ----- |
| Search Services | |
| Office Services | |
| Google Docs Integration | |

## Test installation

Installation testing checks that Community Edition is successfully installed and it's working as expected after installation.

Some of the points that need to be checked prior to testing your installation are:

* Verify that, after a successful install, the application works as expected and meets user needs.
* On uninstall, check that all previously installed files and registry entries are removed as expected.

### Post-installation checks

Once you've successfully installed Community Edition, test and gain familiarity with the core features and functions.

Here are some tips to familiarize yourself.

> **Note:** We recommend that you create a test site for testing purpose and put all your test data in that site.

* Can you login using your user name and password. See [Logging in]({% link content-services/community/using/share.md %}#signing-in).
* Can you create a site. See [Creating a new site]({% link content-services/community/using/sites/index.md %}#creating-a-site).
* Can you add new users to the site. See [Adding users to a site]({% link content-services/community/using/sites/index.md %}#adding-users-to-a-site).
* Can you add pages to the site. See [Adding pages to a site]({% link content-services/community/using/sites/index.md %}#customizesite).
* Can you add content to a site library. See [Adding content items]({% link content-services/community/using/content/manage.md %}).
* Can you copy or move content from its current location to another folder or any other site. See [Copying content]({% link content-services/community/using/content/manage.md %}#copying-content) and [Moving content]({% link content-services/community/using/content/manage.md %}#moving-content).
* Can you update content. See [Updating content]({% link content-services/community/using/content/manage.md %}#uploading-files).
* Can you manage permissions for a user or a group for accessing content. See [Managing content permissions]({% link content-services/community/using/permissions.md %}).
* Can you add a new rule to a folder in the site library and check if it works. See [Adding a new rule]({% link content-services/community/using/content/rules.md %}#createrule).
* Can you schedule events, such as meeting, for your team. See [Scheduling events]({% link content-services/community/using/sites/features.md %}#calendar).

## Start and stop server

Use this information to run the Community Edition server and Alfresco Share.

### Start server

Once you've installed Community Edition using the distribution zip, you can start the server. The server must be running before you can use Alfresco Share.

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

3. Browse to the location of your Community Edition installation:

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

Once you've started Community Edition, you can start Alfresco Share using a browser.

1. Browse to the location of your installation.

    For example, `http://<your-host>:8080/share`.

    Alfresco Share opens in a browser.

2. Sign in using a user name and password.

    The default administrator user name is `admin`.
