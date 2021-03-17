---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Search API

The Search API provides access to the search features of Alfresco Content Services.

The Search API accepts POST requests containing JSON structures as described in the table below. The JSON is structured to group options related to different query concepts together.

The Search API is defined under the search namespace. It uses the `/search` endpoint, which does not accept any URL parameters and is therefore, completely controlled via the parameters in a POST body.

**Note:** The `/search` endpoint is available in Alfresco Content Services 5.2.7 and newer versions.

The elements used by the `/search` endpoint are:

|Element|Type|Parameters|Description|Reference|
|-------|----|----------|-----------|---------|
|`query`|string|-   `language`
-   `userQuery`
-   `query`

|This specifies a basic query to be parsed with minimum possible query parameters.|See [query](search-api-query.md).|
|`paging`| |-   `maxItems`
-   `skipCount`

|This restricts the number of results to be displayed.|See [paging](search-api-paging.md).|
|`include`|string| |This returns additional information about the node.|See [include](search-api-include.md).|
|`includeRequest`|boolean| |When this element is set to `true`, the original request is included in the response.|See [includeRequest](search-api-includeRequest.md).|
|`fields`|string| |This specifies a list of field names.|See [fields](search-api-fields.md).|
|`sort`| |-   `type`
-   `field`
-   `ascending`

|The `sort` element lets you sort the results of a query.|See [sort](search-api-sort.md).|
|`templates`| |-   `name`
-   `template`

|This specifies the templates used for query expansion.|See [sort](search-api-templates.md).|
|`defaults`| |-   `textAttributes`
-   `defaultFTSOperator`
-   `defaultFTSFieldOperator`
-   `namespace`
-   `defaultFieldName`

|This specifies the common query defaults.|See [defaults](search-api-defaults.md).|
|`timezone`|string| |This specifies a valid timezone id supported by `@see java.time.ZoneId`.|See [timezone](search-api-timezone.md).|
|`filterQueries`| |-   `query`
-   `tags`

|This specifies the constraints that apply to the results set but do not affect the score of each entry.|See [filterQueries](search-api-filterQueries.md).|
|`facetQueries`| |-   `query`
-   `label`

|This specifies the facet queries to include.|See [facetQueries](search-api-facetQueries.md).|
|`facetFields`| |-   `field`
-   `label`
-   `prefix`
-   `sort`
-   `method`
-   `missing`
-   `limit`
-   `offset`
-   `mincount`
-   `facetEnumCacheMinDf`
-   `excludeFilters`

|This specifies the simple facet fields to include.|See [facetFields](search-api-facetFields.md).|
|`facetIntervals`| |-   `sets`
-   `intervals`

|This specifies the facet intervals.|See [facetIntervals](search-api-facetIntervals.md).|
|`pivots`| |-   `key`

|This specifies a list of pivot keys.|See [pivots](search-api-pivots.md).|
|`stats`| |-   `field`
-   `label`
-   `min`
-   `max`
-   `sum`
-   `count`
-   `missing`
-   `mean`
-   `stddev`
-   `sumOfSquares`
-   `distinctValues`
-   `countDistinct`
-   `cardinality`
-   `cardinalityAccuracy`
-   `excludeFilters`
-   `percentiles`

|This specifies a list of stats request.|See [stats](search-api-stats.md).|
|`spellcheck`| |-   `query`

|This specifies a request that spellcheck fragments to be added to result set rows.|See [spellcheck](search-api-spellcheck.md).|
|`scope`| |-   `locations`

|This specifies the scope or the locations that are queried.|See [scope](search-api-scope.md).|
|`limits`| |-   `permissionEvaluationTime`
-   `permissionEvaluationCount`

|This limits the time and resources used for query execution.|See [limits](search-api-limits.md).|
|`highlight`| |-   `prefix`
-   `postfix`
-   `snippetCount`
-   `fragmentSize`
-   `maxAnalyzedChars`
-   `mergeContiguous`
-   `usePhraseHighlighter`
-   `fields`

|This specifies the request that highlight fragments to be added to the result set rows.|See [highlight](search-api-highlight.md).|
|`range`| |-   `range`
-   `start`
-   `end`
-   `gap`
-   `hardend`
-   `include`
-   `other`
-   `method`

|This is useful for stitching together a series of range queries on any date or numeric field that supports range queries.|See [range](search-api-range.md).|

**Note:** The POST response in the examples used for various elements is only a part of the full result returned by the query. For detailed information, see the [Search API Postman collection](https://www.getpostman.com/collections/be013a0a99c6428e5017).

**Note:** Limited stats are available with Solr 4 as compared to Solr 6. So, the Solr 4 response may be different from the Solr 6 response. Also, there are some differences between the default Solr 4 core and the rerank core. The rerank core is the default core with Solr 6 but you can also use it with Solr 4.

**Note:** It is advisable to use a Swagger-aware editor.

-   **[query](../concepts/search-api-query.md)**  
The `query` element specifies the basic query to be parsed. This is the only mandatory parameter with any query.
-   **[paging](../concepts/search-api-paging.md)**  
Use the `paging` element to restrict the number of results to be displayed. By default, results are limited to the first 100.
-   **[include](../concepts/search-api-include.md)**  
The `include` element returns additional information about the node.
-   **[includeRequest](../concepts/search-api-includeRequest.md)**  

-   **[fields](../concepts/search-api-fields.md)**  
The `fields` element specifies a list of field names. Use this parameter to restrict the fields returned within a response, for example, if you want to save on the overall bandwidth. The list applies to a returned individual entity or entries within a collection.
-   **[sort](../concepts/search-api-sort.md)**  
The `sort` element lets you sort the results of a query. It specifies an array of sort specifications. The array order defines the ordering precedence.
-   **[templates](../concepts/search-api-templates.md)**  
CMIS `CONTAINS()` now supports templates. The `templates` element specifies the templates used for query expansion. A template is a way to define and abstract complex queries from the user.
-   **[defaults](../concepts/search-api-defaults.md)**  

-   **[timezone](../concepts/search-api-timezone.md)**  
This specifies a valid timezone id supported by `@see java.time.ZoneId`.
-   **[filterQueries](../concepts/search-api-filterQueries.md)**  
The `filterQueries` also support multi-select facets to enable building complex `filterQueries`. It limits the result found and specifies the constraints that apply to the results set but do not affect the score or the rank of the results found by the query.
-   **[facetQueries](../concepts/search-api-facetQueries.md)**  
The `facetQueries` element specifies the facet queries to include. These queries are used to generate a single-facet value based on the number of documents that matched the overall query and the facet query.
-   **[facetFields](../concepts/search-api-facetFields.md)**  
The `facetFields` element specifies the simple facet fields to include in a query. These facets are generated by counting field values for all results that match the query. This is the default behaviour of all the filter queries applied.
-   **[facetIntervals](../concepts/search-api-facetIntervals.md)**  
The `facetIntervals` element specifies facet intervals. It is more restrictive but fast range-based faceting. It enables you to control the ranges using `Intervals` and provides much more flexibility on what you get in your ranges. In `intervals`, the ranges don't overlap so you can double-count the entries and use date maths expressions, such as TODAY, THIS WEEK, THIS MONTH, and THIS YEAR.
-   **[pivots](../concepts/search-api-pivots.md)**  
The `pivots` element specifies a list of pivot keys. It enables nested facet fields where you can put any number of single facet fields inside each other so that it becomes a chain of fields.
-   **[stats](../concepts/search-api-stats.md)**  
The `stats` element specifies a list of simple statistics for numeric, dates, and text fields within the document set.
-   **[spellcheck](../concepts/search-api-spellcheck.md)**  
The `spellcheck` element specifies a request that spellcheck fragments should be added to the result set rows. The properties reflect Solr spellcheck parameters.
-   **[scope](../concepts/search-api-scope.md)**  
The `scope` element specifies the scope or the locations that are queried. By default, search uses the `nodes` location, which is the `workspace://SpacesStore` content store. To change the scope to another location, you can use the `locations` JSON body parameter.
-   **[limits](../concepts/search-api-limits.md)**  
The `limits` element limits the time and resources used for query execution. Limits applied to the query go to the database.
-   **[highlight](../concepts/search-api-highlight.md)**  
The `highlight` element specifies the request that highlight fragments should be added to the result set rows. The properties reflect Solr highlighting parameters.
-   **[range](../concepts/search-api-range.md)**  
The `range` element keeps together a series of range queries on any date or numeric field that supports range queries. It allows you to create a number of buckets and then group things by those.

**Parent topic:**[API Reference](../concepts/dev-reference-guide.md)

