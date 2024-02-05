---
title: Transactional metadata query
---

Alfresco Content Services supports the execution of a subset of the CMIS Query Language (CMIS QL) and Alfresco Full Text Search (AFTS) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query (TMDQ).

TMDQ supports use cases where eventual consistency is not the preferred option.

The Solr subsystem is eventually consistent. A change can take any length of time to be reflected in the index, ranging from a few seconds to several minutes. Solr indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The rate at which the nodes are indexed is mainly determined by the time it takes to transform the content and the rate at which the nodes are being changed.

Some queries can be executed both transactionally against the database or with eventual consistency against the Solr index. Only queries using the AFTS or CMIS query languages can be executed against the database. The Lucene query language cannot be used against the database whereas, `selectNodes` (XPATH) on the Java API always goes against the database, walking and fetching nodes as required.

Improvements to tracking in the Alfresco Solr 6 integration results in less lag to metadata indexing. Metadata updates are impacted less by content indexing or the bulk updates to PATH for `move`, `rename`, `link` and, `unlink` operations.

The database can only be used for a subset of all the queries. These queries can be in the CMIS QL or AFTS QL. CMIS QL expressions are more likely to use TMDQ because of the default behavior to do exact matches. AFTS QL defaults to full text search and uses constructs not supported by the database engine. For example, PATH queries.

In general, TMDQ does not support:

* Structural queries, full text search, and special fields: This includes SITE that are derived from structure and long strings (> 1024 characters). Text fields support exact and pattern-based matching subject to the database collation. Filter queries are rewritten along with the main query to create one large query. Ordering is fine, but again subject to database collation for text.
* Faceting.
* Any aggregation: This includes counting the total number of matches for the query.

Fingerprint support is only on the Index Server.

AFTS and CMIS queries are parsed to an abstract form. This is then sent to an execution engine. There are two execution engines: the database and the Solr index. The default is to try the database first and fall back to the Solr index, if the query is not supported against the database. This is configurable for a search subsystem and per query using the Java API.

To support TMDQ:

* Alfresco Content Services supports TMDQ by default.

## Features

The following are the available feature of the transactional metadata query.

* Transactional metadata query is supported for both Solr 6 and noindex search subsystems.
* Transactional metadata query does not support facets.
* When you enable transactional metadata queries, a query is parsed to check if all of its parts are supported by the database-based query engine. If yes, the database is used automatically.
* Using the database gives transactional consistency as opposed to the eventual consistency provided by Solr 6.
* If you use the transactional metadata query with the noindex subsystem, the search functionality in Alfresco Share won't work as it relies on full text search.
* Normally, a query will be executed against the database, if possible. Database execution of a query depends on the query itself. It also depends on the application of an optional patch to the database, which creates the required supporting database indexes. If the supporting indexes have been created, each index subsystem can be configured to:
* perform transactional execution of queries;
* execute queries transactionally, when possible, and fall back to eventual consistency; or
* always execute eventual consistency.
* When queries are executed against the database:
* Hidden nodes will be returned by the database, as they are in Alfresco Content Services 5.0.
* Large result sets are not supported because Alfresco Content Services does not evaluate permissions in query but as a post filter.
* Counts will not reflect the number of nodes that match the query.
* The `SearchParameters` and `QueryOptions` objects can be used to override this behaviour per query.
Alfresco Content Services supports the execution of a subset of the CMIS Query Language (CMIS QL) and Alfresco Full Text Search (AFTS) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query (TMDQ).

## Options supported by Query Languages

Use this information to know what options are supported by the Public API, CMIS Query Language (QL), and Alfresco Full Text Search Query Language (FTS QL).

### Public API and TMDQ

From public API, anything that is not a simple query, a filter query, an option that affects these, or an option that affects what is returned for each node in the results, is not supported by TMDQ.

TMDQ supports:

* `query`
* `paging`
* `include`
* `includeRequest`
* `fields`
* `sort`
* `defaults`
* `filterQueries`
* `scope` (single)
* `limits` for permission evaluation

The default limits for permission evaluation will restrict the results returned from TMDQ based on both the number of results processed and time taken. These can be increased, if required.

The Public API does not support TMDQ for:

* `templates`
* `localisation` and `timezone`
* `facetQueries`
* `facetFields`
* `facetIntervals`
* `pivots`
* `stats`
* `spellcheck`
* `highlight`
* `ranges facets`
* Solr `date math`

Some of these will be ignored and produce transactional results; others will fail and be eventual.

The Public API ignores the SQL select part of a CMIS query and generate the results as it would do for AFTS.

### CMIS QL & TMDQ

For CMIS QL, all expressions except for `CONTAINS()`, `SCORE()`, and `IN_TREE()` can now be executed against the database. Most data types are supported except for the CMIS uri and html types. Strings are supported but only if there are 1024 characters or less in length.

In Alfresco One 5.0, `OR`, decimal, and boolean types were not supported; it is only from Alfresco One 5.1 onwards that they are supported.

Primary and secondary types are supported and require inner joins to link them together. You can skip joins to secondary types from the fetch in CMIS using the public API. You would need an explicit `SELECT` list and supporting joins from a CMIS client. You still need joins to secondary types for predicates and ordering. As CMIS SQL supports ordering as part of the query language, you have to do it there and not via the Public API sort.

For multi-valued properties, CMIS QL supports `ANY` semantics from SQL 92. A query against a multi-lingual property, such as title or description, is treated as multi-valued and may match in any language. In the results, you will see the best value for your locale, which may not match the query. Also, ordering will consider any value.

### UPPER() and LOWER()

`UPPER()` and `LOWER()` functions were in early drafts for the CMIS 1.0 specification, but were subsequently dropped. These are not part of the CMIS 1.0 or 1.1 specifications. They are not supported in TMDQ.

### Alfresco FTS QL & TMDQ

It is more difficult to write AFTS queries that use TMDQ as the default behaviour is to use full text queries for text. These cannot go against the database. Also, special fields like `SITE` and `TAG` that are derived from the structure will not go to the database. `TYPE`, `ASPECT` and the related exact matches work fine with TMDQ. All property data types are fine but strings should be less than 1024 characters in length. Text queries have to be prefixed with `=` to avoid full text search. Additionally, there is partial support for `PARENT` queries, but database queries will be missing any categories since there is no notion of category paths in the database.

Ranges, PATH, and ANCESTOR are not currently supported.

### Database & TMDQ

Some differences between the database and TMDQ:

* The database has specific fixed collation as defined by the database schema. This affects all string comparisons, such as ordering or case sensitivity in equality. Solr uses Java localised collation and supports more advanced ordering and multi-lingual fields. The two engines can produce different results for lexical comparison, case sensitivity, ordering, or when using `mltext` properties.
* The database results include hidden nodes. You can exclude them in the query. The Solr index results will never include hidden nodes and respects the index control aspect.
* The database post filters the results to apply permissions. As a result, no total count can be provided and large result sets are not well supported. This also affects paging behaviour. Permission evaluation is truncated by time or number of evaluations. TMDQ is not intended to scale to more than 10s of thousands of nodes. It will not perform well for users who can read one node in a million. It cannot and will not tell you how many results matched the query. To do this could require an inordinate number of permission checks. It does enough to give you the page requested. The Solr index can apply permissions at query and facet time to billions of nodes. For the same reason, do not expect any aggregation support in TMDQ.
* `CONTAINS()` support is complicated. The pure CMIS part of the query and `CONTAINS()` part are melded together into a single abstract query representation. By default, in CMIS the `CONTAINS()` expression implies full text search, so the queries will go to the Solr index.
* The database does not score. It will return results in some order that depends on the query plan, unless you ask for specific ordering. A three part `OR` query, where some documents match more than one constraint, is treated as equal. For Solr index queries, the more parts of an `OR` match, the higher is the score. The docs that match more optional parts of the query will come higher up.
* Queries from Share will not use TMDQ as they will most likely have a full text part to the query and ask for facets.

### Exact match and patterns

TMDQ can support exact match on all properties (subject to database collation) regardless of the property index configuration in the data model. All text properties can support pattern matching. The database index supports a fixed number of leading characters. The database store a maximum string size before it overflows to another form. Only short form strings can be used in database queries.

Solr supports exact match on all non-text properties. Text properties only support exact and pattern matches if set to tokenised `both` or `false` in the data model. Solr provides support for values up to approximately 32,700 UTF-8 bytes.

The following specific CMIS QL fields are supported:

* `cmis:parentId`
* `cmis:objectcId`
* `cmis:objectTypeId`
* `cmis:baseTypeId`
* `cmis:contentStreamMimeType`
* `cmis:contentStreamLength`

The following CMIS QL comparison operators are supported:

* `=`, `!=,` `<>`, `<`, `<=`, `>`, `>=`
* `IN`, `NOT IN`, `LIKE`

The following AFTS exact matches and patterns are supported:

* `=<field>:term`
* `=<field>:ter*`
* `=<field>:*erm`

### Full text search for CMIS QL and AFTS

* CMIS QL
  * IN_TREE()
  * IN_FOLDER()
* AFTS
  * PATH

### Supported for special fields in TMDQ using AFTS

* TYPE
* ASPECT
* EXACTTYPE
* EXACTASPECT
* PARENT - but note that database queries will not contain any categories since there is no notion of category paths in the database

> **Note:** CMIS QL does not support any use of CONTAINS() using the database.

Transactional Metadata Query and the Solr index queries are intended to support different use cases. They differ in queries and options that they support and in the results they generate with respect to collation and scoring.

## Transactional metadata queries supported by database

Use this information to understand the queries supported by the database.

The Alfresco Full Text Search (FTS) query text can be used standalone or it can be embedded in CMIS-SQL using the `contains()` predicate function. The CMIS specification supports a subset of Alfresco FTS. For more information on search syntax, see [Alfresco Full Text Search Reference]({% link search-services/1.3/using/index.md %}).

**CMIS QL**

The following object types and their sub-types are supported:

* `cmis:document`

    For example:

    ```sql
    select * from cmis:document
    ```

* `cmis:folder`

    For example:

    ```sql
    select * from cmis:folder 
    ```

* Aspects

    For example:

    ```sql
    select * from cm:dublincore 
    ```

## CMIS property data types

The `WHERE` and `ORDER BY` clauses support the following property data types and comparisons:

* `string`
  * Supports all properties and comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`, `LIKE`
  * Supports ordering for single-valued properties
    For example:

    ```sql
    select * from cmis:document where cmis:name <> 'fred' order by cmis:name
    ```

* `integer`
  * Supports all properties and comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
  * Supports ordering for single-valued properties

* `double`
  * Supports all properties and comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
  * Supports ordering for single-valued properties
* `float`
  * Supports all properties and comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
  * Supports ordering for single-valued properties
* `boolean`
  * Supports properties and comparisons, such as `=` and `<>`
  * Supports ordering for single-valued properties
* `id`
  * Supports `cmis:objectId`, `cmis:baseTypeId`, `cmis:objectTypeId`, `cmis:parentId`, `=`, `<>`, `IN`, `NOT IN`
  * Ordering using a property, which is a CMIS identifier, is not supported
* `datetime`
  * Supports all properties and comparisons `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
  * Supports ordering for single-valued properties
    For example:

    ```sql
    select * from cmis:document where cmis:lastModificationDate = '2010-04-01T12:15:00.000Z' order by
     cmis:creationDate ASC
    ```

> **Note:** While the CMIS URI data type is not supported, multi-valued properties and multi-valued predicates as defined in the CMIS specification are supported. For example,

```sql
select * from ext:doc where 'test' = ANY ext:multiValuedStringProperty
```

## Supported predicates

A predicate specifies a condition that is true or false about a given row or group. The following predicates are supported:

* Comparison predicates, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `<>`
  * `IN` predicate
  * `LIKE` predicate

    > **Note:** Prefixed expressions perform better and should be used where possible.

* `NULL` predicate 
* Quantified comparison predicate (`= ANY`)
* Quantified IN predicate (`ANY .... IN (....)`)
* `IN_FOLDER` predicate function

## Unsupported predicates

The following predicates are not supported:

* TEXT search predicate, such as `CONTAINS()` and `SCORE()` 
* `IN_TREE()` predicate

## Supported logical operators

The following logical operators are supported:

* `AND` 
* `NOT`
* `OR`

## Other operators

In the following cases, the query will go to the database but the result might not be as expected. In all other unsupported cases, the database query will fail and fall back to be executed against the Solr 6 subsystem.

* `IS NOT NULL`
* `IS NULL`: Currently, this operator will only find properties that are explicitly NULL as opposed to the property not existing.
* `SORT`: The multi-valued and `mltext` properties will sort according to one of the values. Ordering is not localized and relies on the database collation. It uses an `INNER JOIN`, which will also filter NULL values from the result set.
* `d:mltext`: This data type ignores locale. However, if there is more than one locale, the localised values behave as a multi-valued string. Ordering on `mltext` will be undefined as it is effectively multi-valued.
* `UPPER()` and `LOWER()`: Comparison predicates provide additional support for SQL `UPPER()` and LOWER() functions (that were dropped from a draft version of CMIS specification but are supported for backward compatibility).

## Configuring transactional metadata query

Configure the transaction metadata query using the subsystem properties.

The common properties used to configure the transactional metadata query for the search subsystems are:

* `solr.query.cmis.queryConsistency`
* `solr.query.fts.queryConsistency`

These properties should be set in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file.

The default value for these properties is `TRANSACTIONAL_IF_POSSIBLE`. However, you can override it with any of the following permitted values:

* `EVENTUAL`
* `TRANSACTIONAL`

The `solr.query.cmis.queryConsistency` and `solr.query.fts.queryConsistency` properties can also be set per query on the `SearchParameters` and `QueryOptions` objects.

## Configuring an optional patch for upgrade

Transactional metadata query requires two optional patches to be applied for full support. If no patch is applied there is no database support.

The first patch does not support boolean, float or double properties, and disjunction (OR). It adds the database support for TMDQ equivalent to an out-of-the-box Alfresco One 5.0 install (where float, double, boolean, and disjunctions are not supported).

The second patch adds the database support for TMDQ equivalent to an out-of-the-box Alfresco One 5.1 install. Some CMIS QL use cases where `OR` would be used are supported by using `IN`. In Alfresco One 5.1 and later versions, these restrictions go away after applying all TMDQ optional patches. The database size will be approximately 25% larger with all indexes applied.

To use or run a query against the `float`, `double`, or `boolean` property data types, you need to run an optional patch that adds the required indexes to the database. To do so, set the following property in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

```bash
system.metadata-query-indexes-more.ignored=false 
```

When using all other data types (such as `string`, `integer`, `id`, or `datetime`), to enable the patch that adds the required indexes to the database, set the following property in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file:

```bash
system.metadata-query-indexes.ignored=false 
```

If these optional patches are not run, the metadata query will not be used, regardless of the configuration. This configuration is checked when the subsystem is reloaded.

For a new install, the default behavior is to use the `TRANSACTIONAL_IF_POSSIBLE` metadata queries. For an upgraded system, the `TRANSACTIONAL_IF_POSSIBLE` metadata queries will be used only if the upgrade patches have been run.

## Adding optional indexes to a database

When you are upgrading the database, you can add optional indexes in order to support the metadata query feature. This information lets you know the likely duration of the upgrade and how to do it incrementally.

For large repositories, creating the database indexes to support the transactional metadata query can take some time. To check how long it will take, you can add the first index to the database and note the time taken. The full upgrade is estimated to take less than 10 times this value. However, this can vary depending on the structure of the data, the database, and the size of the repository.

The [SQL patch script](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/dbscripts/upgrade/4.2/org.hibernate.dialect.Dialect/metadata-query-indexes.sql) can be run in parts, adding one index at a time. The patch is marked complete by the statement that inserts into alf_applied_patch. The patch can be marked as unapplied using the SQL delete statement.

## Configuring search in Alfresco Share

The following sections describe how to configure search in Alfresco Share.

## Controlling permissions checking

You can limit the time Alfresco Content Services spends on ensuring that the user executing the search has the necessary permissions to see each result. Setting this limit increases search speed and reduces the use of resources.

You can limit both the time spent and the number of documents checked before Alfresco Content Services returns a search query using the `system.acl.maxPermissionCheckTimeMillis` and the `system.acl.maxPermissionChecks` properties. The default values are 10000 and 1000 respectively.

1. Open the `<classpathRoot>/alfresco-global.properties` file.

2. Set the `system.acl.maxPermissionCheckTimeMillis` property.

    For example, `system.acl.maxPermissionCheckTimeMillis=20000`.

3. Set the `system.acl.maxPermissionChecks` property.

    For example, `system.acl.maxPermissionChecks=2000`.

    > **Note:** If you increase these values and have a query that returns a very large number of results, (a) the search results will take longer to be returned to the user, and (b) the system will spend longer to check permissions, leading to the possibility of performance degradation. If you set these values to a low number, you run the risk of inconsistent search results every time you run the same search. These settings are also applied when paging. So paging the results will only go up to the maximum returned results based on these settings.

## Controlling serch results

Use this information to control the maximum number of items that an Alfresco Share search returns.

By default, the Share search feature returns a maximum of 250 search results. You can extend this number of search results to return more than 250 entries.

1. Download the [share-config.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.1/configuration/alfresco/share-config.xml) file.

2. Open the share-config.xml file and copy the `<config evaluator="string-compare" condition="Search" replace="true">` section.

3. Open the `<web-extension>share-config-custom.xml` file and then paste the copied section.

4. Locate the `<max-search-results>250</max-search-results>` property and then edit the value to your preferred number of search results.

5. For the changes to take effect, refresh the Alfresco Content Services web scripts. To refresh the web scripts:

    1. Navigate to the web scripts Home page.

        For example, go to: `http://<your-host>:8080/share/page/index`.

    2. Click **Refresh Web Scripts**.

        You have now refreshed the web scripts and set a limit to the number of items a search in Share returns.

> **Note:** Custom searches and searches from the node browser use the `solr.query.maximumResultsFromUnlimitedQuery` property to control search results. For more information, see [Solr core configuration properties
]({% link search-services/1.3/config/index.md %}#solr-core-configuration-properties).
