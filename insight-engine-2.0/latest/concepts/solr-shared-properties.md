---
author: Alfresco Documentation
source: 
---

# About shared.properties file

The <ALFRESCO\_HOME\>/alfresco-insight-engine/solrhome/conf/shared.properties file is used to set configuration that applies to all the cores in a Solr instance.

Most of these settings need to be replicated across all the Solr instances that are a part of the sharded index. However, there are some properties related to dynamic shard registration, such as host and port, which can be set for each machine.

These Solr instance specific settings can be omitted but you may have to define the correct host that the repository will use to communicate to Solr, for example, using an internal IP address in a cloud environment. By default, the host is detected by Java, the port will default to 8080, and the tomcat port is either determined by JMX or that explicitly defined in the shared.properties file.

The shared.properties file defines the:

-   properties that are treated as identifiers
-   properties that are used to generate suggestions
-   data types that support cross locale/word splitting/token pattern
-   properties that support cross locale/word splitting/token pattern
-   `solr.host` property
-   `solr.port` property

**Properties defined in the shared.properties file**

You can define which properties are treated as identifiers, regardless of how they are defined in the model. These properties must not be tokenised. If this list is changed, a reindex is required. You can also reindex by query. For more information, see [Reindex documents by query](reindex-query.md).

If you rename the shared.properties.sample file to shared.properties, it will use the same set of identifier properties that are used in Alfresco One 5.0.

```
# Properties treated as identifiers when indexed

alfresco.identifier.property.0={http://www.alfresco.org/model/content/1.0}creator
alfresco.identifier.property.1={http://www.alfresco.org/model/content/1.0}modifier
alfresco.identifier.property.2={http://www.alfresco.org/model/content/1.0}userName
alfresco.identifier.property.3={http://www.alfresco.org/model/content/1.0}authorityName
alfresco.identifier.property.4={http://www.alfresco.org/model/content/1.0}lockOwner 
```

You can define which properties are used for suggestion.

```
# Suggestable Properties

#alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
#alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
#alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
#alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
```

Suggestion can also be configured for the search subsystem and for any SOLR core using properties. If the shared.properties file is missing in Alfresco Content Services 6.2, suggestion will be configured as it is in Alfresco One 5.0.

You can define which properties are used for tokenisation with the Solr word delimiter factory.

```
# Data types that support cross locale/word splitting/token patterns if tokenised

alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}name
alfresco.cross.locale.property.1={http://www.alfresco.org/model/content/1.0}lockOwner
```

You can define which property types are used for tokenisation with the Solr word delimiter factory.

```
# Data types that support cross locale/word splitting/token patterns if tokenised

# alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
# alfresco.cross.locale.datatype.1={http://www.alfresco.org/model/dictionary/1.0}content
# alfresco.cross.locale.datatype.2={http://www.alfresco.org/model/dictionary/1.0}mltext
```

**Support for cross-language search**

The cross core configuration options to use specific locales for cross-locale searches are set in the shared.properties file. Cross language search uses the appropriate stemmed tokens for all locales.

For backward compatibility, this file is absent in Alfresco Content Services 6.2 to provide options equivalent to Alfresco One 5.0.

To configure cross-language search, follow the steps below:

1.  Open the <ALFRESCO\_HOME\>/alfresco-insight-engine/solrhome/conf/shared.properties.sample file.
2.  Set the following properties:

    ```
    alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.cross.locale.property.1=...
    ```

    This sets the properties that should be dual tokenised.

    The cross-language search in Alfresco One 5.0 is now only used to provide support to split tokens (based on case and numbers) to generate `in word` tokens. The `in word` tokenisation is mainly used for name. For example, find `RedDog12` by `Red`, `Dog`, or `12`, `Dog12`, and so on. This property must be indexed and tokenised.

3.  To specify the same behaviour based on the data type, set the following properties:

    ```
    alfresco.cross.locale.datatype.0={http://www.alfresco.org/model/dictionary/1.0}text
    alfresco.cross.locale.datatype.1=...
    ```


**Query time expansion of locales**

Query time expansion of locales can be defined in the solrconfig.xml file as part of the query language definition.

|Locale parameter|What is it?|
|----------------|-----------|
|`autoDetectQueryLocale`|If true, this uses the query typed in by the user to detect the locale.|
|`autoDetectQueryLocales`|This specifies a set of locales. One of these may be used in executing the query if `autoDetectQueryLocale=true`.|
|`fixedQueryLocales`|This specifies a fixed set of locales always used by the query.|

What locales are used?

-   The locale for the current session is always used.
-   If the `autoDetectQueryLocale` parameter is used, then the best match from `autoDetectQueryLocales` is used. If no parameter is set, then all the possible locales are used.
-   All `fixedQueryLocales` are used.

Here are some example entries in the solrconfig.xml file:

```
<queryParser name="afts" class="org.alfresco.solr.query.AlfrescoFTSQParserPlugin">
    <str name="rerankPhase">QUERY_PHASE</str>
    <str name="autoDetectQueryLocale ">true</str>
    <str name="autoDetectQueryLocales ">en,fr,de</str>
</queryParser>
```

```
<queryParser name="afts" class="org.alfresco.solr.query.AlfrescoFTSQParserPlugin">
    <str name="rerankPhase">QUERY_PHASE</str>
    <str name="fixedQueryLocales">en,fr,de</str>
</queryParser>
```

These are query time options and do not require a reindex. Currently, these values cannot be set in the solrcore.properties file.

**Enabling path queries**

The property alfresco.cascade.tracker.enabled provides Index fields that are required for path-based queries when set to true (the default is `true`). Disabling support for path queries (i.e. setting this to `false`) can speed up indexing in sharded systems.

Updating this property from the default setting will result in path-based fields not being populated. Consequently it should not be changed after the initial startup of the server.

> **Note:** If `alfresco.cascade.tracker.enabled` is set to false and Solr is restarted, cascaded updates are disabled.

-   **When you disable cascade tracking and do not index fields that are updated on cascaded updates:**

    This is the default setting when cascade tracking is disabled and as a result many search queries will not work, even for users with an environment where parent entries are not updated (e.g when a parent node has been renamed), such as `SITE:swsdp`.

    This approach ensures search queries affected by disabling cascade tracking will not work, rather than risking inconsistent query results.

    Review how the following services are affected:

    -   CMIS
        -   `IN_TREE`, `PATH`, `PARENT`, `ANCESTOR` queries will not work.
    -   Search API
        -   Faceted Search (Facet Fields, Pivot Facet, Facet Range), PATH, NPATH, Secondary Association, Cascade Updates, Search with Sort queries will not work.
    -   SQL API
        -   There are at least 70 less fields found in the Solr schema.
        -   SITE, PATH: fields are not indexed and SQL queries based on these fields will return null values.
        -   Queries will not be successful with these fields being used in predicates, for example queries with `<select * from alfresco where Site = ‘swsdp’>`.
    -   Share
        -   Category Manager http://localhost:8081/share/page/console/admin-console/category-manager can't be used.
        -   TAGs can't be created or browsed.
        -   Your site can be defined as a Facet for Search Results (via Search manager) but it will not work.
        -   Searching within a site (or within a folder) returns a list of content within the site. This will not work, for example using `SITE:swsdp` syntax or via node browser using PATH queries.
        -   Node browser default PATH query doesn’t list system and category roots and PATH queries.
    If `alfresco.cascade.tracker.enabled` is set to false and Solr is restarted cascaded updates will be disabled. To avoid inconsistencies in the results, by default the fields that are updated on cascade updates are not indexed.

    When parent paths have been updated or renamed, path queries are affected because the correct parent paths are available in the database but the Solr indexes for any children are not updated. The result of this can be inconsistent results for path queries and queries where parent/path are used.

    These types of results will affect users when their environment allows for cascaded changes. The results of a search query that use the database and search/SQL, including the index, may not always match, if the parent path is updated (only in case of renaming a parent).


**Parent topic:**[Creating Solr shards manually](../tasks/solr-hash-shard.md)

