---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# About shared.properties file

The <ALFRESCO\_HOME\>/solr4/conf/shared.properties file is used to set configuration that applies to all the cores in a Solr instance.

Most of these settings need to be replicated across all the Solr instances that are a part of the sharded index. However, there are some properties related to dynamic shard registration, such as host and port, which can be set for each machine.

These Solr instance specific settings can be omitted but you may have to define the correct host that the repository will use to communicate to Solr, for example, using an internal IP addresses in a cloud environment. By default, the host is detected by Java, the port will default to 8080, and the tomcat port is either determined by JMX or that explicitly defined in the shared.properties file.

The shared.properties file defines the:

-   properties that are treated as identifiers
-   properties that are used to generate suggestions
-   data types that support cross locale/word splitting/token pattern
-   properties that support cross locale/word splitting/token pattern
-   `solr.host` property
-   `solr.port` property

**Properties defined in the shared.properties file**

You can define which properties are treated as identifiers, regardless of how they are defined in the model. These are properties must not be tokenised. If this list is changed, a reindex is required. You can also reindex by query. For more information, see [Reindex documents by query](reindex-query.md).

If you rename the shared.properties.sample file to shared.properties, it will use the same set of identifier properties that are used in Alfresco Content Services 5.0.

```
# Properties treated as identifiers when indexed

alfresco.identifier.property.0={http://www.alfresco.org/model/content/1.0}creator
alfresco.identifier.property.1={http://www.alfresco.org/model/content/1.0}modifier
alfresco.identifier.property.2={http://www.alfresco.org/model/content/1.0}userName
alfresco.identifier.property.3={http://www.alfresco.org/model/content/1.0}authorityName 
```

You can define which properties are used for suggestion.

```
# Suggestable Properties

#alfresco.suggestable.property.0={http://www.alfresco.org/model/content/1.0}name
#alfresco.suggestable.property.1={http://www.alfresco.org/model/content/1.0}title
#alfresco.suggestable.property.2={http://www.alfresco.org/model/content/1.0}description
#alfresco.suggestable.property.3={http://www.alfresco.org/model/content/1.0}content
```

Suggestion can also be configured for the search subsystem and for any SOLR core using properties. If the shared.properties file is missing in Alfresco Content Services 5.2.7, suggestion will be configured as it is in Alfresco Content Services 5.0.

You can define which properties are used for tokenisation with the Solr word delimiter factory.

```
# Data types that support cross locale/word splitting/token patterns if tokenised

alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}name
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

For backward compatibility, this file is absent in Alfresco Content Services 5.2.7 to provide options equivalent to Alfresco Content Services 5.0.

To configure cross-language search, follow the steps below:

1.  Open the <ALFRESCO\_HOME\>/solr4/conf/shared.properties.sample file.
2.  Set the following properties:

    ```
    alfresco.cross.locale.property.0={http://www.alfresco.org/model/content/1.0}name
    alfresco.cross.locale.property.1=...
    ```

    This sets the properties that should be dual tokenised.

    The cross-language search in Alfresco Content Services 5.0 is now only used to provide support to split tokens \(based on case and numbers\) to generate `in word` tokens. The `in word` tokenisation is mainly used for name. For example, find `RedDog12` by `Red`, `Dog`, or `12`, `Dog12`, and so on. This property must be indexed and tokenised.

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

**Parent topic:**[Creating Solr shards manually](../tasks/solr-hash-shard.md)

