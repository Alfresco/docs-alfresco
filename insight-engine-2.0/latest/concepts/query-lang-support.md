# Options supported by Query Languages

Use this information to know what options are supported by the Public API, CMIS Query Language \(QL\), and Alfresco Full Text Search Query Language \(FTS QL\).

**Public API and TMDQ**

From public API, anything that is not a simple query, a filter query, an option that affects these, or an option that affects what is returned for each node in the results, is not supported by TMDQ.

TMDQ supports:

-   `query`
-   `paging`
-   `include`
-   `includeRequest`
-   `fields`
-   `sort`
-   `defaults`
-   `filterQueries`
-   `scope` \(single\)
-   `limits` for permission evaluation

The default limits for permission evaluation will restrict the results returned from TMDQ based on both the number of results processed and time taken. These can be increased, if required.

The Public API does not support TMDQ for:

-   `templates`
-   `localisation` and `timezone`
-   `facetQueries`
-   `facetFields`
-   `facetIntervals`
-   `pivots`
-   `stats`
-   `spellcheck`
-   `highlight`
-   `ranges facets`
-   Solr `date math`

Some of these will be ignored and produce transactional results; others will fail and be eventual.

The Public API ignores the SQL select part of a CMIS query and generate the results as it would do for AFTS.

**CMIS QL & TMDQ**

For CMIS QL, all expressions except for `CONTAINS()`, `SCORE()`, and `IN_TREE()` can now be executed against the database. Most data types are supported except for the CMIS uri and html types. Strings are supported but only if there are 1024 characters or less in length.

In Alfresco One 5.0, `OR`, decimal, and boolean types were not supported; it is only from Alfresco One 5.1 onwards that they are supported.

Primary and secondary types are supported and require inner joins to link them together. You can skip joins to secondary types from the fetch in CMIS using the public API. You would need an explicit `SELECT` list and supporting joins from a CMIS client. You still need joins to secondary types for predicates and ordering. As CMIS SQL supports ordering as part of the query language, you have to do it there and not via the Public API sort.

For multi-valued properties, CMIS QL supports `ANY` semantics from SQL 92. A query against a multi-lingual property, such as title or description, is treated as multi-valued and may match in any language. In the results, you will see the best value for your locale, which may not match the query. Also, ordering will consider any value.

***UPPER\(\) and LOWER\(\)***

`UPPER()` and `LOWER()` functions were in early drafts for the CMIS 1.0 specification, but were subsequently dropped. These are not part of the CMIS 1.0 or 1.1 specifications. They are not supported in TMDQ.

**Alfresco FTS QL & TMDQ**

It is more difficult to write AFTS queries that use TMDQ as the default behaviour is to use full text queries for text. These cannot go against the database. Also, special fields like `SITE` and `TAG` that are derived from the structure will not go to the database. `TYPE`, `ASPECT` and the related exact matches work fine with TMDQ. All property data types are fine but strings should be less than 1024 characters in length. Text queries have to be prefixed with `=` to avoid full text search. Additionally, `PARENT` is supported but `OR` is supported from Alfresco One 5.1 onwards.

Ranges, PATH, and ANCESTOR are not currently supported.

**Database & TMDQ**

Some differences between the database and TMDQ:

-   The database has specific fixed collation as defined by the database schema. This affects all string comparisons, such as ordering or case sensitivity in equality. Solr uses Java localised collation and supports more advanced ordering and multi-lingual fields. The two engines can produce different results for lexical comparison, case sensitivity, ordering, or when using `mltext` properties.
-   The database results include hidden nodes. You can exclude them in the query. The Solr index results will never include hidden nodes and respects the index control aspect.
-   The database post filters the results to apply permissions. As a result, no total count can be provided and large result sets are not well supported. This also affects paging behaviour. Permission evaluation is truncated by time or number of evaluations. TMDQ is not intended to scale to more than 10s of thousands of nodes. It will not perform well for users who can read one node in a million. It cannot and will not tell you how many results matched the query. To do this could require an inordinate number of permission checks. It does enough to give you the page requested. The Solr index can apply permissions at query and facet time to billions of nodes. For the same reason, do not expect any aggregation support in TMDQ.
-   `CONTAINS()` support is complicated. The pure CMIS part of the query and `CONTAINS()` part are melded together into a single abstract query representation. By default, in CMIS the `CONTAINS()` expression implies full text search, so the queries will go to the Solr index.
-   The database does not score. It will return results in some order that depends on the query plan, unless you ask for specific ordering. A three part `OR` query, where some documents match more than one constraint, is treated as equal. For Solr index queries, the more parts of an `OR` match, the higher is the score. The docs that match more optional parts of the query will come higher up.
-   Queries from Share will not use TMDQ as they will most likely have a full text part to the query and ask for facets.

**Exact match and patterns**

TMDQ can support exact match on all properties \(subject to database collation\) regardless of the property index configuration in the data model. All text properties can support pattern matching. The database index supports a fixed number of leading characters. The database store a maximum string size before it overflows to another form. Only short form strings can be used in database queries.

Solr supports exact match on all non-text properties. Text properties only support exact and pattern matches if set to tokenised `both` or `false` in the data model. Solr provides supports values up to approximately 32,700 UTF-8 bytes.

The following specific CMIS QL fields are supported:

-   `cmis:parentId`
-   `cmis:objectcId`
-   `cmis:objectTypeId`
-   `cmis:baseTypeId`
-   `cmis:contentStreamMimeType`
-   `cmis:contentStreamLength`

The following CMIS QL comparison operators are supported:

-   `=`, `!=,` `<>`, `<`, `<=`, `>`, `>=`
-   `IN`, `NOT IN`, `LIKE`

The following AFTS exact matches and patterns are supported:

-   `=<field>:term`
-   `=<field>:ter*`
-   `=<field>:*erm`

**Full text search for CMIS QL and AFTS**

-   CMIS QL
    -   IN\_TREE\(\)
    -   IN\_FOLDER\(\)
-   AFTS
    -   PATH

**Supported for special fields in TMDQ using AFTS**

-   PARENT
-   TYPE
-   ASPECT
-   EXACTTYPE
-   EXACTASPECT

**Note:** CMIS QL does not support any use of CONTAINS\(\) using the database.

Transactional Metadata Query and the Solr index queries are intended to support different use cases. They differ in queries and options that they support and in the results they generate with respect to collation and scoring.

**Parent topic:**[Transactional metadata query](../concepts/intrans-metadata.md)

