# Configuring the Search and Insight Engine subsystem

There is a search subsystem and it can be used to connect to Alfresco Search and Insight Engine \(which is based on Solr 6\).

Just like all previous versions of Solr, the activation and configuration of the Search and Insight Engine subsystem can be done by using either the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file or the admin console, see [Configuring Search and Insight Engine using Admin Console](../tasks/adminconsole-searchservice-solr.md).

If you haven't set the following Solr-related properties in the `TOMCAT_HOME>/shared/classes/alfresco-global.properties` file, add these:

```
### Solr indexing ###
index.subsystem.name=solr6
solr.secureComms=https
solr.port=8983
solr.host=<hostname> [The host name where the Solr instance is located]
solr.baseUrl=/solr
```

These configuration properties are used by Alfresco Content Services to talk to Search and Insight Engine.

**Parent topic:**[Installing and configuring Search and Insight Engine](../concepts/solr-install-config.md)

