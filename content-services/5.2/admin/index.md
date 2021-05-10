---
title: Overview
---

When using the Alfresco Content Services documentation, there are a number of conventions for common system paths.

## System path conventions

-   Explicit Linux paths use forward slashes: `/srv/adirectory`

-   Explicit Windows paths use back slashes: `C:\Adirectory`

-   Where you see forward slashes, the same path can apply in both Linux or Windows environments: `/adirectory/`

### Alfresco Content Services installation location

The installation directory is referenced throughout this guide as `<installLocation>`.

### <classpathRoot> directory (Linux)

The `<classpathRoot>` is a directory whose contents are automatically added to the start of your application server classpath. The location of this directory varies depending on your application server. For example:

    (Tomcat) `tomcat/shared/classes/`

### <classpathRoot> directory (Windows)

The `<classpathRoot>` is a directory whose contents are automatically added to the start of your application server classpath. The location of this directory varies depending on your application server. For example:

    (Tomcat) `C:\Alfresco\tomcat\shared\classes`

### alfresco-global.properties file

The `alfresco-global.properties` file is where you store all the configuration settings for your environment. The file is in Java properties format, so backslashes must be escaped. The file should be placed in `<classpathRoot>`. When you install using the setup wizard, an `alfresco-global.properties` file is created, which contains the settings that you specified in the setup wizard. An `alfresco-global.properties.sample` file is supplied with the setup wizard and also with the WAR zip file. This `.sample` file contains examples of common settings that you can copy into your `alfresco-global.properties` file.

### <extension> directory

The `<extension>` directory is where you store Spring configuration files that extend and override the system configuration. This directory can be found at `<classpathRoot>/alfresco/extension`.

### <web-extension>

The `<web-extension>` directory is where you store Spring configurations that extend and override the system Share configuration. This directory can be found at `<classpathRoot>/alfresco/web-extension`.

### <solrRootDir>

The `<solrRootDir>` directory is the Solr home directory which contains the Solr core directories and configuration files. This directory can be found at `<ALFRESCO_HOME>/solr4`.

### <configRoot>

The `<configRoot>` directory contains the default application configuration. For example, for Tomcat, `<configRoot>` is `<TOMCAT_HOME>/webapps/alfresco/WEB-INF`.

### <configRootShare>

The `<configRootShare>` directory contains the default application configuration for Share. For example, for Tomcat, `<configRootShare>` is `<TOMCAT_HOME>/webapps/share/WEB-INF`.


-   **[Starting and stopping Alfresco Content Services](#starting-and-stopping-alfresco-content-services)**  
Use this information to understand how to run the Alfresco Content Services server and Alfresco Share.

-   **[Using the Admin Console]({% link content-services/5.2/admin/admin-console.md %})**  
The Admin Console application that gives you control over the management and settings of the Alfresco Content Services environment.
-   **[Using the Alfresco Share Admin Tools]({% link content-services/5.2/admin/share-admin-tools.md %}#using-the-alfresco-share-admin-tools)**  
Share Admin Tools help you to manage your administration operations.
-   **[Managing Alfresco Share features]({% link content-services/5.2/admin/share-admin-tools.md %}#managing-alfresco-share-features)**  
Use the Admin Tools to manages features of Alfresco Share such as look and feel, tagging, categories, and sites.
-   **[Managing users and groups]({% link content-services/5.2/admin/users-groups.md %}#managing-users-and-groups)**  
Use this information to administer your users and groups in Alfresco Content Services.
-   **[Working with licenses]({% link content-services/5.2/admin/license.md %}#working-with-licenses)**  
Access to Alfresco Content Services is licensed on a per user basis.
-   **[Setting up authentication and security]({% link content-services/5.2/admin/security.md %})**  
Use this information to manage authentication in Alfresco Content Services, and to configure keystores for repository encryption.
-   **[Managing search services]({% link content-services/5.2/admin/search.md %})**  
Use this information to configure and manage the search services for Alfresco Content Services 5.2.7.
-   **[Setting up clustering]({% link content-services/5.2/admin/index.md %}#setting-up-clustering)**  
You can implement multiple Alfresco Content Services instances in a clustered environment.
-   **[Setting up multi-tenancy]({% link content-services/5.2/admin/multi-tenancy.md %}#setting-up-multi-tenancy)**  
Alfresco Content Services supports a single-instance, single-tenant (ST) environment where each tenant (for example, customer, company, or organization) runs a single instance that is installed on one server or across a cluster of servers.
-   **[Creating and managing workflows]({% link content-services/5.2/admin/workflows.md %})**  
Alfresco Content Services comes with a set of predefined workflow definitions which can be used right out of the box. For more complex requirements, you can also create, deploy, and manage your own workflows.
-   **[Managing transformations]({% link content-services/5.2/admin/transformations.md %})**  
When you are working with transformations, it is important to understand how file types map to one another and the transformation formats that each file type supports.
-   **[Setting up content stores]({% link content-services/5.2/admin/content-stores.md %}#setting-up-content-stores)**  
A content store provides low-level access to stored binaries ensuring that, for every write, a new binary storage location is made available. This information gives an overview on the content stores, their types, and configuration details with examples.
-   **[Setting up and managing content replication]({% link content-services/5.2/admin/replication.md %})**  
 You can automatically replicate folders and content between repositories using replication jobs. These jobs are controlled by the replication service, which finds content that needs to be replicated and then calls the transfer service to carry out the replication. Replication suits an environment where you are running multiple, separate instances of Alfresco Content Services and then replicating a subset of the content between these servers.
-   **[Importing and transferring files]({% link content-services/5.2/admin/import-transfer.md %})**  
Use this information to import files using the Bulk Import Tool, or transfer files using the File System Transfer Receiver (FSTR).
-   **[Migrating]({% link content-services/5.2/admin/migration.md %})**  
You can perform various migration procedures for Alfresco Content Services servers and databases.
-   **[Support Tools]({% link content-services/5.2/admin/support-tools.md %}#support-tools)**  
With the Support Tools you can monitor your Alfresco Content Services system and diagnose performance, communication, and memory issues.
-   **[Backing up and restoring]({% link content-services/5.2/admin/backup-restore.md %}#backing-up-and-restoring)**  
This information describes the process for backing up the content repository only. It assumes that components other than the data residing in Alfresco Content Services (operating system, database, JRE, application server, binaries and configuration, etc.) are being backed up independently.
-   **[Auditing]({% link content-services/5.2/admin/audit.md %}#Auditing)**  
Alfresco Content Services provides the ability to audit activity. The auditing system is disabled by default, as it has the potential to impact performance, but the auditing system is highly configurable, so that you only need generate data for those events of particular interest.

## Starting and stopping Alfresco Content Services

Use this information to understand how to run the Alfresco Content Services server and Alfresco Share.

-   **[Starting the Alfresco Content Services server](#starting-the-alfresco-content-services-server)**  
The server must be running before you can use Alfresco Share. When you install using the setup wizard, the server is automatically installed and started as a service.
-   **[Stopping the Alfresco Content Services server](#stopping-the-alfresco-content-services-server)**  
Choose one of these options to stop the server.
-   **[Starting Alfresco Share](#starting-alfresco-share)**  
Once you have installed Alfresco Content Services, you can start Alfresco Share using a browser.

### Starting the Alfresco Content Services server

The server must be running before you can use Alfresco Share. When you install using the setup wizard, the server is automatically installed and started as a service.

-   If you installed as a service, from the **Start** menu select **All Programs > Alfresco Content Services > Start Alfresco Content Services services**.

-   Alternatively, from a command prompt, navigate to the Alfresco installation directory (C:/Alfresco) and run `servicerun START`.

    You need administrator rights to run this command.

    These services are also available from the **Start** menu under **Control Panel > System and Security > Administrative Tools > Services**.

-   If you installed as a service, double click the Application Manager tool in the Alfresco Content Services root directory and start the `PostgreSQL Database` and `Tomcat Server` services.

-   Alternatively, browse to `/opt/alfresco/` and run `./alfresco.sh` start as an administrator.

    > **Important:** If you installed using the setup wizard, the alfresco.sh script included in the installation disables the Security-Enhanced Linux (SELinux) feature across the system.

    > **Note:** The default shell for this script is sh. You can edit the alfresco.sh file to change to your preferred shell. For example, change the `#!/bin/sh` line to `#!/bin/bash`.

### Stopping the Alfresco Content Services server

Choose one of these options to stop the server.

-   (Windows)

    -   Open the Control Panel Services window and stop the following services:
        -   `alfrescoPostgreSQL`
        -   `alfrescoTomcat`
    -   Click the **Start** menu, and select **All Programs > Alfresco Content Services > Stop Alfresco Content Services services**.
    The command prompt that opened during startup closes. Alfresco Content Services has now stopped.

-   (Linux) Browse to `/opt/alfresco/`, and run `./alfresco.sh` stop.

### Starting Alfresco Share

Once you have installed Alfresco Content Services, you can start Alfresco Share using a browser.

1.  Browse to the location of your installation.

    For example, `http://<your-host>:8080/share`.

    In Windows, alternatively, you can click the **Start** menu, and select **All Programs > Alfresco One > Alfresco Share**.

    Alfresco Share opens in a browser.

2.  Sign in using a user name and password.

    If you are logging on as the administrator who installed Alfresco Content Services, use the credentials that you set during installation. The default administrator user name is `admin`.

## Administrator best practices

Best practice guidelines for Alfresco Content Services administrators.

-   **[Tips for getting the most out of Alfresco Content Services](#tips-for-getting-the-most-out-of-alfresco-content-services)**  
Use these tips to improve your experience of Alfresco Content Services.
-   **[Common mistakes made by administrators](#common-mistakes-made-by-administrators)**  
Avoid these common mistakes when administering an Alfresco Content Services environment.
-   **[Tips for Alfresco Content Services administrators](#tips-for-alfresco-content-services-administrators)**  
If you're an administrator, use these tips to help you manage your environment.

### Tips for getting the most out of Alfresco Content Services

Use these tips to improve your experience of Alfresco Content Services.

1.  Allow sufficient time to plan your project and identify the most optimal path for you.
2.  Benchmark the system you want to use to ensure you can tune it for best performance and high availability before you go live.
3.  Ensure customizations occur using the `<extensions>` and `<web-extensions>` directories, and/or AMP files to help smooth upgrade and debugging processes.
4.  Discover more about FreeMarker templates. You can create custom views for your spaces, and email templates to fit your organization, among other things.
5.  Discover more about web scripts. This requires some, but not extensive, technical knowledge, and is very powerful.
6.  Use a space template to create reusable components and enable business processes.
7.  Leverage the CIFS interface to easily integrate with existing applications using drag and drop.
8.  Microsoft Office integration makes adoption of Alfresco Content Services seamless.
9.  Email integration provides simple and safe way to store emails inside the repository.
10. Coordinate with Alfresco on short-term consulting. This allows you and/or your System Integrator to work with Alfresco on architecture and planning.
11. Take advantage of the support for multiple security protocols, which makes it suitable for large enterprises.
12. Use the [Support Portal](https://support.alfresco.com){:target="_blank"}, a subscription site that provides downloads, further documentation, and a Knowledge Base.
13. Take advantage of Alfresco Content Services training. Get the knowledge and information you need to make your implementation successful.

### Common mistakes made by administrators

Avoid these common mistakes when administering an Alfresco Content Services environment.

1.  Not keeping extended configurations and customizations separate in the shared directory. Do not put them in the configuration root. If you do, you will lose them during upgrades.
2.  Not ensuring that the database driver is copied to the application server lib directory when installing.
3.  Not testing the backup strategy.
4.  Making changes to the system without testing them thoroughly on a test and pre-production machine first.
5.  Failing to set the `dir.root` property to an absolute path location.
6.  Not fully shutting down a running instance of Alfresco Content Services, so the next time you try and start it, Alfresco Content Services says: `Address already in use: JVM_Bind:8080 (especially on Linux)`.

### Tips for Alfresco Content Services administrators

If you're an administrator, use these tips to help you manage your environment.

1.  Make sure you use a transactional database.
2.  Keep your Search indexes on your fastest local disk.
3.  Version only what and when you need to.
4.  If you find yourself constantly creating the same space hierarchy as well as rules and aspects to them, consider creating a Space template instead.
5.  Increase the database connection pool size for large numbers of concurrent users or sessions.
6.  Use the System Information to view system properties, such as schema and server versions.
7.  Use the Node Browser (searchable by node reference, xpath, or lucene) to view all properties, parent and child nodes, aspects applied, permissions, and associations.
