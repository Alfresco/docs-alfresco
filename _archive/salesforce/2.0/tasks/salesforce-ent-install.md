---
author: Alfresco Documentation
source: 
audience: [, ]
---

# 1. Installing Content Connector AMP files

Download and install the AMP files to connect to Salesforce.

Make sure you are running the correct versions of operating system and software before you install the AMP files. See [Prerequisites for Alfresco Content Connector for Salesforce](../concepts/salesforce-ent-prereqs.md) for more information.

1.  Stop the Alfresco server.

2.  Browse to the [Alfresco Support Portal](http://support.alfresco.com), and download and unzip the Salesforce zip package.

3.  Copy the provided AMP files to the Alfresco amps and amps\_share directories.

    Copy this file to the amps directory:

    -   alfresco-content-connector-for-salesforce-repo-2.0.2.x.amp
    Copy this file to the amps\_share directory:

    -   alfresco-content-connector-for-salesforce-share-2.0.2.x.amp
4.  To [install the AMP](http://docs.alfresco.com/5.2/tasks/amp-install.html) files, run the apply\_amps.bat file from the Alfresco bin directory.

    Check the output from the script to ensure that the AMP files have installed successfully.

5.  Restart the Alfresco server.

6.  If you are running Alfresco One 5.1 or later, check for any Aikau \* Module Config.xml files, and delete them.

    Use the Node Browser \(http://host:port/alfresco/s/enterprise/admin/admin-nodebrowser for Alfresco One 5.0 and http://host:port/alfresco/s/admin/admin-nodebrowser for Alfresco One 5.1\) using this `xpath`:

    ```
    /app:company_home/st:sites/cm:surf-config/cm:module-deployments
    ```

7.  Locate the share-config-custom.xml.sample file.

    This sample configuration file is shipped with in Salesforce zip file and shows the required rules \(and properties\) that need to be added to the CSRFPolicy to allow Salesforce logouts.

    1.  If you are using Alfresco Share as your service provider, and you have custom CSRFPolicy configurations in your installation, copy and paste the *SALESFORCE SPECIFIC CONFIG* section of the sample file into your custom CSRFPolicy filter, and save.

    2.  If you have a share-config-custom.xml file in your Alfresco Share installation, merge the contents of share-config-custom.xml.sample into your share-config-custom.xml file, and save.

    3.  Alternatively, if you do not have a share-config-custom.xml in your Alfresco Share installation, rename share-config-custom.xml.sample to share-config-custom.xml.

    4.  Review the details in the `CSRFPolicy` section for accuracy.

8.  Test that the AMPs have been applied successfully.

    Using your administrator logon, go to:

    ```
    http://localhost:8080/alfresco/s/enterprise/admin/admin-salesforce
    ```

    where `localhost` is your Alfresco host name, and `8080` is your port number. You'll see the Salesforce settings that you will need to link Alfresco to Salesforce.

9.  Create a new site to hold your Salesforce content.

    Log on to Alfresco:

    ```
    http://localhost:8080/share
    ```

    where `localhost` is your Alfresco host name, and `8080` is your port number. Follow these instructions: [Creating sites](http://docs.alfresco.com/5.2/tasks/sites-create.html). You can use this as your default site for Salesforce.


**Parent topic:**[Installing and configuring Alfresco Content Connector for Salesforce](../concepts/salesforce-ent-install-oview.md)

