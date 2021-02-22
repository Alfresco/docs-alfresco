# Checklist for a new installation

Alfresco Process Services is shipped with the default configuration settings, which can be configured.

For a new installation, you must first configure the connection to the database. See [Database configuration](databaseConfiguration.md) for more details.

By default, Alfresco Process Services users have process editing privileges and can use the scripting language in a variety of ways. However, if misused, this can be a security risk leading to compromise of the application and its underlying operating system. To mitigate this risk, you may want to disable Script Tasks. For more information, see `validator.editor.bpmn.disable.scripttask` in [Disabling tasks](disabling_tasks.md).

Deploy the WAR file into your web server. For Tomcat, drop the WAR file in the webapps folder\) and verify if Alfresco Process Services works properly.

**Additional considerations**:

-   The users and groups are stored by default in database tables. Your company may store users and groups in an LDAP or Active Directory system. See the [External Identity Management \(LDAP/Active Directory\)](externalIdentityManagement.md) section to connect this system with Alfresco Process Services.

-   By default, the system won’t send any emails. See the [Email Server configuration](emailServerConfiguration.md) section to configure the email server settings.

-   By default, uploaded content, script files, and other content are stored on the file system of the same machine as Alfresco Process Services. When using multiple servers, it is important that the location on the file system is actually a mounted shared drive, such that all server nodes can access it. Read the [Content Storage](contentStorageConfig.md) section for configuration options.

-   Elasticsearch is used to store historical information about process execution and to generate reports from it. By default, an embedded Elasticsearch server is used. However, you can switch the modes to connect to cluster of Elasticsearch nodes external to Alfresco Process Services \(for performance or because such a cluster already exists in your organization\). For more information, see the [Elasticsearch configuration](elasticsearch_configuration.md) section.


**Parent topic:**[Administering Alfresco Process Services](../topics/adminGuide.md)

