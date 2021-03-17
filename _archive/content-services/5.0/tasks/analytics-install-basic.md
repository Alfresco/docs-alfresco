---
author: Alfresco Documentation
source: 
audience: 
---

# Step 1. Initial installation of Alfresco Analytics

Download and unzip the Alfresco Analytics package and perform basic setup tasks before proceeding with the rest of the Analytics installation.

See [Prerequisites for using Alfresco Analytics](../concepts/analytics-prereqs.md) for information on what you require before you start the installation.

1.  Make sure you have the following information:

    -   Analytics server IP address \(you might have different URLs for public and internal access\)
    -   Alfresco Share and repository URLs
    -   Location of ActiveMQ. If you are using the recommended architecture [here](../concepts/analytics-architecture.md), this will be your Alfresco server
    -   MySQL Server or PostgreSQL database user administration ID and password, depending on which database you have decided to use
    -   Analytics license files: contact your Support representative to obtain your licenses
2.  If you are using MySQL Server, you must have a basic configuration of MySQL Server installed.

    See the Alfresco instructions for setting up MySQL: [Using MySQL](../concepts/alfresco-sdk-tutorials-mysql-intro.md) and the MySQL Community site: [MySQL Community Server download](http://dev.mysql.com/downloads/mysql/).

    If you are using PostgreSQL, instructions to set this up are here: [Installing PostgreSQL](analytics-install-postgres.md).

3.  Alfresco Analytics is memory intensive. Review your database working memory settings to ensure performance is not degraded.

    Increasing your working memory increases performance and allows the database to perform larger in-memory sorting.

4.  Browse to the Alfresco Support Portal: [Support Portal](http://support.alfresco.com) and download alfresco-analytics-1.1.0.1-alfresco.zip to your Alfresco server and alfresco-analytics-1.1.0.1.zip to your Analytics server.

    For more information on the recommended server architecture for Alfresco Analytics, see [Analytics architecture](../concepts/analytics-architecture.md).

5.  On the Alfresco server, unzip alfresco-analytics-1.1.0.1-alfresco.zip into a system directory; for example, opt/.

    We will refer to this new directory \(opt/alfresco-analytics-1.1.0.1\), as the *Analytics installation directory*. In this directory you will see these folders:

    -   activemq: contains ActiveMQ software
    -   amps: contains the two AMP files to be applied to Alfresco and the MMT \(Module Management Tool\) for installing the AMP files
6.  On the Analytics server, unzip alfresco-analytics-1.1.0.1.zip into a system directory; for example, opt/.

    We will refer to this new directory \(opt/alfresco-analytics-1.1.0.1\), as the *Analytics installation directory*. In this directory you will see these folders:

    -   ba-server: contains the Analytics server setup files and Tomcat instance
    -   bin: contains SSL keystore script
    -   data-integration: contains data integration scripts
    -   event-listeners: contains message listener software
    -   license-installer: contains the license installer script and is used to store the Analytics server license files
    -   postgresql: contains the installation scripts for PostgreSQL
7.  When you have obtained your [licenses](analytics-install-basic.md#license), navigate to the license-installer Analytics installation directory, and run the install\_license script for all licenses included in the directory; for example:

    ```
    cd license-installer
    ./install_license.sh install license1.lic license2.lic licensex.lic
    ```

    where `license1`, `license2`, and `licensex` are the names of the license files.

    Check that the licenses are correctly installed by viewing the `.installedLicenses.xml` file in the Analytics installation directory:

    ```
    ls -a ../.installedLicenses.xml
    ```

    **Note:** If you are renewing your license, see the instructions here: [Renewing Alfresco Analytics licenses](analytics-license-renew.md)


