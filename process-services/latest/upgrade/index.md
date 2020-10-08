---
title: Upgrade Process Services
---

You can upgrade from earlier versions to Process Services.

>**Note:** Before upgrading, you should back up your database and properties files, such as `activiti-app.properties`.

There are two methods for upgrading:

* Using the Process Services installation wizard
* Using the WAR file distribution

>**Important:** If you integrate Process Services with Alfresco Content Services then be aware that from version 1.11 only repositories on version 5.2 and later are supported. Upgrade to a later version of Alfresco Content Services before updating Process Services to continue using this functionality.

## Upgrading using the Process Services installer

You can use the Process Services installation wizard to upgrade to the latest version. The process is similar to 
installing for the first time. For more details, see the [Installing using setup wizards]({% link process-services/latest/install/index.md %}#install-using-setup-wizards) section.

Follow these steps to upgrade:

1. Double-click the Process Services installation wizard.
2. Follow the instructions to install the latest version of Process Services.
3. After the installation is complete, copy the `activiti.lic` file to the Process Services installation directory: `<Install>/tomcat/lib` folder.

Alternatively, copy the license to your home directory using the terminal (OSX) or command prompt (Windows):

```bash
 ~/.activiti/enterprise-license/
or
C:\.activiti\enterprise-license
```

>**Tip**: You can also upload a license from the user interface. See the [Uploading a license file]({% link process-services/latest/install/index.md %}#install-license) section for more details.

## Upgrading using the WAR file

You can upgrade using the WAR file in your application server distribution. These instructions use the WAR file from 
the Apache Tomcat based distribution, however you can choose from different distributions for various application servers.

Review the [Supported Stacks]({% link process-services/latest/support/index.md %}) list to see what’s supported.

Follow these steps to upgrade using the War file:

1.  Stop the web server running the application.
2.  Deploy the new WAR file in your web server by placing it in the `/webapps` folder in Tomcat.
3.  Boot up the web server and start Process Services to check if it’s working as expected.

Any database upgrade changes should have now been applied.

>**Note:** See the [Installing manually]({% link process-services/latest/install/index.md %}#install-manually) section for more details.

