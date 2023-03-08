---
title: Overview
---

There are a number of processes and procedures for maintaining and administering a Content Services production environment.

## System paths convention

When using the Content Services documentation, there are a number of conventions for common system paths.

>**Note:**
>
>* Explicit Linux paths use forward slashes:
>
>    `/srv/some-directory`
>
>* Explicit Windows paths use back slashes
>
>    `C:\some-directory`
>
>* Where you see forward slashes, the same path can apply in both Linux or Windows environments:
>
>    `/some-directory/`

### Content Services installation directory

The installation directory is referenced throughout this guide as `<installLocation>`.

For example:

* (Linux): `/opt/alfresco`
* (Windows): `C:\alfresco`

### \<classpathRoot> directory

The `<classpathRoot>` is a directory whose contents are automatically added to the start of your application server classpath. The location of this directory varies depending on your application server.

For example:

* (Linux): `<installLocation>/tomcat/shared/classes/`
* (Windows): `<installLocation>\tomcat\shared\classes`

### alfresco-global.properties file

The `alfresco-global.properties` file is where you store all the configuration settings for your environment. The file is in Java properties format, so backslashes must be escaped. The file should be placed in `<classpathRoot>`. An `alfresco-global.properties.sample` file is supplied with the WAR distribution zip file. This `.sample` file contains examples of common settings that you can copy into your `alfresco-global.properties` file.

### \<extension> directory

The `<extension>` directory is where you store Spring configuration files that extend and override the Repository (i.e. `alfresco.war`) system configuration. This directory can be found at `<classpathRoot>/alfresco/extension`.

### \<web-extension> directory

The `<web-extension>` directory is where you store Spring configurations that extend and override the system Share (i.e. `share.war`) configuration. This directory can be found at `<classpathRoot>/alfresco/web-extension`.

### \<solrRootDir> directory

The `<solrRootDir>` directory is the Search Services home directory which contains the Solr core directories and configuration files. This directory can be found at `<SOLR_HOME>`.

### \<configRoot> directory

The `<configRoot>` directory contains the default Repository (i.e. `alfresco.war`) configuration.

For example, for Tomcat, `<configRoot>` is `<installLocation>/tomcat/webapps/alfresco/WEB-INF`.

### \<configRootShare> directory

The `<configRootShare>` directory contains the default application configuration for Share (i.e. `share.war`).

For example, for Tomcat, `<configRootShare>` is `<installLocation>/tomcat/webapps/share/WEB-INF`.

## Heartbeat feature

Content Services can send a 'heartbeat' to Alfresco. The heartbeat contains anonymous information that can help Alfresco to understand product usage and to better meet the needs of your organization. Our aim is to use the anonymous information to help us make decisions about product development so that our investment benefits as many users as possible.

### Disable the Heartbeat

The Heartbeat feature is set to `true` by default:

```text
heartbeat.enabled=true
```

If you're using Content Services it's not possible to change the value of the `heartbeat.enabled` property because the default license supersedes the property. If you're unable to share this anonymous data with us you can request a license from Alfresco Support with Heartbeat already disabled. Contact [Alfresco Support](mailto:support@alfresco.com) for more information.

### Transmitted data

The anonymous data transmitted by the repository includes the Content Services version number, number of items in the repository, the size of a cluster, and the number of active users. Information about feature usage including content models, workflows, Smart Folders, and APIs are also sent. Other products will also share anonymous data necessary for Alfresco to understand their usage.

To see the data that's sent to Alfresco, see the following logs:

```text
log4j.logger.org.alfresco.heartbeat.datasender.internal.HBDataConsumer=DEBUG
```

## Best practices

Here are some best practice guidelines for Content Services administrators. Use these tips to improve your experience of Content Services:

1. Allow sufficient time to plan your project and identify the most optimal path for you.
2. Benchmark the system you want to use to ensure you can tune it for best performance and high availability before you go live.
3. Ensure customizations occur using the `<extensions>` and `<web-extensions>` directories, and/or AMP files to help smooth upgrade and debugging processes.
4. Discover more about FreeMarker templates. You can create custom views for your spaces, and email templates to fit your organization, among other things.
5. Discover more about web scripts. This requires some, but not extensive, technical knowledge, and is very powerful.
6. Use [File and Folder Templates]({% link content-services/7.2/admin/templates.md %}) to create reusable components and enable business processes.
7. Microsoft Office integration makes adoption of Content Services seamless.
8. Email integration provides simple and safe way to store emails inside the repository.
9. Coordinate with Alfresco on short-term consulting. This allows you and/or your System Integrator to work with Alfresco on architecture and planning.
10. Take advantage of the support for multiple security protocols, which makes it suitable for large enterprises.
11. Use [Hyland Community](https://community.hyland.com/){:target="_blank"}, a subscription site that provides downloads, further documentation, and a Knowledge Base.
12. Take advantage of Content Services training. Get the knowledge and information you need to make your implementation successful.

Also, use these tips to help you manage your environment:

1. Make sure you use a transactional database.
2. Keep your Search indexes on your fastest local disk.
3. Version only what and when you need to.
4. If you find yourself constantly creating the same space hierarchy as well as rules and aspects to them, consider creating [File and Folder Templates]({% link content-services/7.2/admin/templates.md %}) instead.
5. Increase the database connection pool size for large numbers of concurrent users or sessions.
6. Use the System Information to view system properties, such as schema and server versions.
7. Use the Node Browser (searchable by node reference, xpath, or lucene) to view all properties, parent and child nodes, aspects applied, permissions, and associations.

### Common mistakes

Avoid these common mistakes when administering a Content Services environment.

1. Not keeping extended configurations and customizations separate in the `shared` directory. Do not put them in the configuration root. If you do, you'll lose them during upgrades.
2. Not ensuring that the database driver is copied to the application server `lib` directory when installing.
3. Not testing the backup strategy.
4. Making changes to the system without testing them thoroughly on a test and pre-production machine first.
5. Failing to set the `dir.root` property to an absolute path location.
6. Not fully shutting down a running instance of Content Services, so the next time you try and start it, Content Services says: `Address already in use: JVM_Bind:8080` (especially on Linux).
