---
title: Transactional metadata query
---

Alfresco Content Services supports the execution of a subset of the CMIS Query Language (CMIS QL) and Alfresco Full Text Search (AFTS) queries directly against the database. Also, the noindex subsystem supports queries only against the database. This collection of features is called transactional metadata query (TMDQ).

TMDQ supports use cases where eventual consistency is not the preferred option.

The Elasticsearch subsystem is eventually consistent. The amount of time a change a change takes to reflect in the index is normally less than 1 second, but can be longer under heavy load, or for complex/cascading updates. Elasticsearch indexes the metadata and the content of each updated node, in the order in which the nodes were last changed. The indexing components will try to index information about nodes as fast as possible, but content indexing is likely to be limited by the time needed to extract text from the files and all indexing will be affected by the rate at which the nodes are being changed.

Some queries can be executed both transactionally against the database or with eventual consistency against the Elasticsearch index. Only a subset of queries using the AFTS or CMIS query languages can be executed against the database. No queries using the Lucene query language can be used against the database whereas, `selectNodes` (XPATH) on the Java API always goes against the database, walking and fetching nodes as required.

In general, TMDQ does not support:

* Structural queries.
* Full text search.
* Special fields (For example `SITE`).
* Faceting.
* Any aggregation.
   > **Note:** This includes counting the total number of matches for the query.

AFTS and CMIS queries are parsed to an abstract form. This is then sent to an execution engine. There are two execution engines: the database and the Elasticsearch index. The default is to try the database first and fall back to the Elasticsearch index, if the query is not supported against the database. This is configurable for a search subsystem and per query using the Java API.

> **Note:** Alfresco Content Services supports TMDQ by default.

## Options supported by Query Languages

Use this information to know what options are supported by the v1 REST API, CMIS Query Language (QL), and Alfresco Full Text Search Query Language (FTS QL).

### v1 REST API and TMDQ

For the v1 REST API, anything that is not a simple query, a filter query, an option that affects these, or an option that affects what is returned for each node in the results, is not supported by TMDQ.

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

The v1 REST API does not support TMDQ for:

* `templates`
* `localisation` and `timezone`
* `facetQueries`
* `facetFields`
* `highlight`
* `ranges facets`

The use of these with TMDQ is undefined. Some of these options will be ignored and results will come from the database; others will cause the database query to fail and ACS will fail over to return results from the search index.

The V1 REST API ignores the SQL `SELECT` part of a CMIS query and generates the results as it would do for AFTS.

### CMIS QL & TMDQ

For CMIS QL, all expressions except for `CONTAINS()`, `SCORE()`, and `IN_TREE()` can now be executed against the database. Most data types are supported except for the CMIS uri and html types. Strings are supported but only if they are 1024 characters or less in length.

Primary and secondary types are supported and require inner joins to link them together. You can skip joins to secondary types from the fetch in CMIS using the v1 REST API. You would need an explicit `SELECT` list and supporting joins from a CMIS client. You still need joins to secondary types for predicates and ordering. As CMIS SQL supports ordering as part of the query language, you have to do it there and not via the v1 REST API sort.

For multi-valued properties, CMIS QL supports `ANY` semantics from SQL 92. A query against a multi-lingual property, such as title or description, is treated as multi-valued and may match in any language. In the results, you will see the best value for your locale, which may not match the query. Also, ordering will consider any value.

### UPPER() and LOWER()

`UPPER()` and `LOWER()` functions were in early drafts for the CMIS 1.0 specification, but were subsequently dropped. These are not part of the CMIS 1.0 or 1.1 specifications. They are not supported in TMDQ.

### Alfresco FTS QL & TMDQ

It is more difficult to write AFTS queries that use TMDQ as the default behaviour is to use full text queries for text and full text queries cannot be served by the database. Also, special fields like `SITE` and `TAG` that are derived from paths or other nodes will not be handled by the database. `TYPE`, `ASPECT` and the related exact matches will work with TMDQ. All property data types are fine but strings should be less than 1024 characters in length. Text queries have to be prefixed with `=` to avoid full text search.

Ranges, PATH, and ANCESTOR are not currently supported.

### Database & TMDQ

Some differences between the database and TMDQ:

* The database has specific fixed collation as defined by the database schema. This affects all string comparisons, such as ordering or case sensitivity in equality. Elasticsearch uses Java localised collation and supports more advanced ordering and multi-lingual fields. The two engines can produce different results for lexical comparison, case sensitivity, ordering, or when using `mltext` properties.
* The database post filters the results to apply permissions. As a result, no total count can be provided and large result sets are not well supported. This also affects paging behaviour. Permission evaluation is truncated by time or number of evaluations. TMDQ is not intended to scale to tens of thousands of nodes. It will not perform well for users who can only read one node in a million. It cannot tell you how many results matched the query and cannot support aggregations. It will try to do enough to give you the page requested. The Elasticsearch index can apply permissions at query and facet time, allowing queries to scale to billions of nodes.
* The CMIS part of the query and `CONTAINS()` part are melded together into a single abstract query representation. By default, in CMIS the `CONTAINS()` expression implies full text search, so the queries will go to the Elasticsearch index.
* The database does not score. It will return results in some order that depends on the query plan, unless you ask for specific ordering. A three part `OR` query, where some documents match more than one constraint, is treated as equal. For Elasticsearch index queries, the more parts of an `OR` match, the higher is the score. The docs that match more optional parts of the query will come higher up.
* Queries from Share will not use TMDQ as they will most likely have a full text part to the query and ask for facets.
* Exact term search will behave differently when executed against the database or the search index. This is due to how tokenisation is applied to strings in the search index, for more see [Exact Term Queries](https://hub.alfresco.com/t5/alfresco-content-services-blog/exact-term-queries-in-search-services-2-0/ba-p/302200).

### Exact match and patterns

TMDQ can support exact match on all properties (subject to database collation) regardless of the property index configuration in the data model. All text properties can support pattern matching. The database index supports a fixed number of leading characters. The database store a maximum string size before it overflows to another form. Only short form strings can be used in database queries.

Elasticsearch supports exact match on all non-text properties. Text properties only support exact and pattern matches if set to tokenised `both` or `false` in the data model. Elasticsearch provides supports values up to approximately 32,700 UTF-8 bytes.

The following specific CMIS QL fields are supported:

* `cmis:parentId`
* `cmis:objectId`
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

### Support for special fields in TMDQ using AFTS

* PARENT
* TYPE
* ASPECT
* EXACTTYPE
* EXACTASPECT

> **Note:** CMIS QL does not support any use of `CONTAINS()` using the database.

Transactional Metadata Query and the Elasticsearch index queries are intended to support different use cases. They differ in queries and options that they support and in the results they generate with respect to collation and scoring.

## Transactional metadata queries supported by database

Use this information to understand the queries supported by the database.

The Alfresco Full Text Search (FTS) query text can be used standalone or it can be embedded in CMIS-SQL using the `CONTAINS()` predicate function. The CMIS specification supports a subset of Alfresco FTS. For more information on search syntax, see [Alfresco Full Text Search Reference]({% link search-services/latest/using/index.md %}).

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
  * Supports comparisons using `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN` and `LIKE`.
  * Supports ordering for single-valued properties, for example:

    ```sql
    select * from cmis:document where cmis:name <> 'fred' order by cmis:name
    ```

* `integer`, `double`, and `float`
  * Supports comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`.
  * Supports ordering for single-valued properties.
* `boolean`
  * Support for comparisons `=` and `<>`
  * Supports ordering for single-valued properties.
* `id`
  * Supports `cmis:objectId`, `cmis:baseTypeId`, `cmis:objectTypeId` and `cmis:parentId` fields.
  * Support for comparisons, using `=`, `<>`, `IN` and `NOT IN`.
  * Ordering using a property, which is a CMIS identifier, is not supported.
* `datetime`
  * Supports comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN` and `NOT IN`.
  * Support ordering for single-valued properties, for example:

    ```sql
    select * from cmis:document where cmis:lastModificationDate = '2010-04-01T12:15:00.000Z' order by
     cmis:creationDate ASC
    ```

While the CMIS URI data type is not supported, multi-valued properties and multi-valued predicates as defined in the CMIS specification are supported.

  For example:

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
* `IN_FOLDER` predicate function

## Unsupported predicates

The following predicates are not supported by TMDQ:

* TEXT search predicate, such as `CONTAINS()` and `SCORE()`
* `IN_TREE()` predicate

## Supported logical operators

The following logical operators are supported:

* `AND` 
* `NOT`
* `OR`

## Other operators

In the following cases, the query will go to the database but the result might not be as expected. In all other unsupported cases, the database query will fail and fall back to be executed against the Elasticsearch subsystem.

* `IS NOT NULL`
* `IS NULL`: Currently, this operator will only find properties that are explicitly NULL as opposed to the property not existing.
* `SORT`: The multi-valued and `mltext` properties will sort according to one of the values. Ordering is not localized and relies on the database collation. It uses an `INNER JOIN`, which will also filter NULL values from the result set.
* `d:mltext`: This data type ignores locale. However, if there is more than one locale, the localised values behave as a multi-valued string. Ordering on `mltext` will be undefined as it is effectively multi-valued.

## Configuring transactional metadata query

Configure the transaction metadata query using the subsystem properties.

The common properties used to configure the transactional metadata query for the search subsystems are:

* `query.cmis.queryConsistency`
* `query.fts.queryConsistency`

These properties should be set in the `<TOMCAT_HOME>/shared/classes/alfresco-global.properties` file.

> **Important:** The name of these properties has changed. They were called `solr.query.cmis.queryConsistency` and `solr.query.fts.queryConsistency` but these were deprecated. The old names of the properties will still work with Elasticsearch but it is highly recommended you update them in your configuration.

The default value for these properties is `TRANSACTIONAL_IF_POSSIBLE`. However, you can override it with any of the following permitted values:

* `EVENTUAL`
* `TRANSACTIONAL`

The `query.cmis.queryConsistency` and `query.fts.queryConsistency` properties can also be set per query on the `SearchParameters` and `QueryOptions` objects in the V1 REST API.

## Configuring search in Alfresco Share

The following sections describe how to configure search in Alfresco Share.

### Controlling permissions checking

TMDQ may take a long time when trying to create a page of results with a sparse result set. You can limit the time Alfresco Content Services spends per TMDQ query by configuring a maximum duration or a maximum number of permission checks before returning. Setting this limit increases search speed and reduces the use of resources but may result in the user receiving a partial page of results for expensive queries.

You can limit both the time spent and the number of documents checked before Alfresco Content Services returns search results using the `system.acl.maxPermissionCheckTimeMillis` and the `system.acl.maxPermissionChecks` properties. The default values are 10000 and 1000 respectively.

1. Open the `<classpathRoot>/alfresco-global.properties` file.

2. Set the `system.acl.maxPermissionCheckTimeMillis` property.

    For example, `system.acl.maxPermissionCheckTimeMillis=20000`.

3. Set the `system.acl.maxPermissionChecks` property.

    For example, `system.acl.maxPermissionChecks=2000`.

    > **Note:** If you increase these values and have a query that returns a very large number of results, (a) the search results will take longer to be returned to the user, and (b) the system will spend longer to check permissions, leading to the possibility of performance degradation. If you set these values to a low number, you run the risk of inconsistent search results every time you run the same search. These settings are also applied when paging. So paging the results will only go up to the maximum returned results based on these settings.

### Limiting search results

Use this information to control the maximum number of items that an Alfresco Share search returns.

By default, the Share search feature returns a maximum of 250 search results. You can extend this number of search results to return more than 250 entries.

1. Download your `share-config.xml` file found at `tomcat/webapps/share/WEB-INF/classes/alfresco/share-config.xml`, for more see [Share Configuration Extension Point](https://docs.alfresco.com/content-services/latest/develop/share-ext-points/share-config/).

2. Open the `share-config.xml` file and copy the `<config evaluator="string-compare" condition="Search" replace="true">` section.

3. Open the `<web-extension>share-config-custom.xml` file and then paste the copied section.

4. Locate the `<max-search-results>250</max-search-results>` property and then edit the value to your preferred number of search results.

5. For the changes to take effect, refresh the Alfresco Content Services web scripts. To refresh the web scripts:

    1. Navigate to the web scripts Home page.

        For example, go to: `http://<your-host>:8080/share/page/index`.

    2. Click **Refresh Web Scripts**.

        You have now refreshed the web scripts and set a limit to the number of items a search in Share returns.
