---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Installing Alfresco One in an unattended mode

Alfresco distributes binary all-in-one installers which include a setup wizard built with Bitrock technology. You can automate the installation process by running the installers in an unattended mode.

These installers contain all the dependencies that you need to quickly get Alfresco up and running. For example, the Alfresco installers install and configure all the necessary software, such as Java, Apache Tomcat, a PostgreSQL database, LibreOffice, and ImageMagick. The resulting install is optimized for demonstration and initial evaluation. The installer configures an Alfresco service on Windows and Linux \(if run as root\) for easier startup.

**Note:** There is no support for installing on the Mac platform in unattended mode.

To automate the installation process and customize it for your environment, you can run the install wizard in an **unattended mode** and provide an option file. The available options can be listed by calling the installer executable on the command line and passing it the `--help` flag. You can pass an option file called install\_opts to the installer using a command, for example:

For Unix:

```
sudo ./alfresco-one-installer-5.1.5-linux-x64.bin --optionfile install_opts
```

For Windows:

```
alfresco-one-installer-5.1.5-win-x64.exe --optionfile install_opts
```

either as an administrator, or by clicking yes on User Account Control window that pops up.

This is an example option file, which installs most components, uses an external database, and does not install the start-up scripts:

```
mode=unattended
enable-components=javaalfresco,alfrescowcmqs,libreofficecomponent
disable-components=postgres

# Use JDBC settings for an existing database
jdbc_url=jdbc:postgresql://localhost/alfresco
jdbc_driver=org.postgresql.Driver
jdbc_database=alfresco
jdbc_username=alfresco
jdbc_password=alfresco

# Install location
prefix=/opt/alfresco_51

alfresco_admin_password=admin

# Don't install init scripts
baseunixservice_install_as_service=0
```

The full list of options available are listed:

|Option|Information|
|------|-----------|
|`--help`|Displays the list of valid options|
|`--version`|Displays the product version and information|
|`--unattendedmodeui <option>`|Unattended Mode User Interface. Default is `none`. Options are `none`, `minimal`, `minimalWithDialogs`|
|`--optionfile <option>`|Installation option file|
|`--debuglevel <option>`|Debugging information. Default is `2`. Options are `0`, `1`, `2`, `3`, `4`.|
|`--mode <option>`|Installation mode. Default is `gtk`. Options are `gtk`, `xwindow`, `text`, `unattended`.|
|`--debugtrace <option>`|Debugging file name|
|`--enable-components <option>`|Comma-separated list of components. Default is `javaalfresco,postgres,alfrescosolr4,alfrescogoogledocs,libreofficecomponent` Options are `javaalfresco`, `postgres`, `alfrescosolr`, `alfrescosolr4`, `alfrescowcmqs`, `alfrescogoogledocs`, `libreofficecomponent`|
|`--disable-components <option>`|Comma-separated list of components. Default is `alfrescosolr,alfrescowcmqs` Options are `javaalfresco`, `postgres`, `alfrescosolr`, `alfrescosolr4`, `alfrescowcmqs`, `alfrescogoogledocs`, `libreofficecomponent`|
|`--installer-language <option>`|Language selection. Default is `en`. Options are `en`, `fr`, `es`, `it`, `de`, `ja`, `nl`, `ru`, `zh_CN`, `no`, `pt_BR`|
|`--prefix <option>`|Select a folder|
|`--jdbc_url <option>`|JDBC URL identifier. Default is `jdbc:postgresql://localhost/alfresco`|
|`--jdbc_driver <option>`|JDBC driver. Default is `org.postgresql.Driver`|
|`--jdbc_database <option>`|Database name. Default is `alfresco`|
|`--jdbc_username <option>`|User name|
|`--jdbc_password <option>`|Password|
|`--postgres_port <option>`|Database server port. Default is `5432`|
|`--tomcat_installation_type <option>`|Tomcat installation typeSetting `tomcat_installation_type=existing` prevents the tomcat binaries from being installed.

|
|`--tomcat_server_domain <option>`|Web server domain|
|`--tomcat_server_port <option>`|Tomcat server port. Default is `8080`|
|`--tomcat_server_shutdown_port <option>`|Tomcat shutdown port. Default is `8005`|
|`--tomcat_server_ssl_port <option>`|Tomcat SSL port. Default is `8443`|
|`--tomcat_server_ajp_port <option>`|Tomcat AJP port. Default is `8009`|
|`--libreoffice_port <option>`|LibreOffice server port. Default is `8100`|
|`--alfresco_ftp_port <option>`|FTP port. Default is `21`|
|`--alfresco_rmi_port <option>`|RMI port. default is `50500`|
|`--alfresco_admin_password <option>`|Admin password|
|`--baseunixservice_install_as_service <option>`|Option to install Alfresco as a service. Default is `1`|
|`--baseunixservice_script_name <option>`|Service script name. Default is `alfresco`|
|`--alfrescocustomstack_services_startup <option>`|Option to automatically start up Alfresco custom services. Default is `demand`. Options are `demand`, `auto`|

**Important:** After installation, you must generate and install your own certificates to secure the installation. For more information, see [Generating Secure Keys for Solr 4 Communication](../tasks/generate-keys-solr4.md).

**Parent topic:**[Installing Alfresco using setup wizards](../concepts/installs-eval-intro.md)

