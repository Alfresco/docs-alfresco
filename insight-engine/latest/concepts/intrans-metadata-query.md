---
author: Alfresco Documentation
source: 
---
## Transactional metadata queries supported by database

Use this information to understand the queries supported by the database.

The Alfresco Full Text Search (FTS) query text can be used standalone or it can be embedded in CMIS-SQL using the `contains()` predicate function. The CMIS specification supports a subset of Alfresco FTS. For more information on search syntax, see [Alfresco Full Text Search Reference](searchsyntax-intro.md).

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
*  `float`
   * Supports all properties and comparisons, such as `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
   * Supports ordering for single-valued properties
*   `boolean`
   *  Supports properties and comparisons, such as `=` and `<>`
   *  Supports ordering for single-valued properties
*  `id`
   * Supports `cmis:objectId`, `cmis:baseTypeId`, `cmis:objectTypeId`, `cmis:parentId`, `=`, `<>`, `IN`, `NOT IN`
   * Ordering using a property, which is a CMIS identifier, is not supported
*  `datetime`
    -   Supports all properties and comparisons `=`, `<>`, `<`, `<=`, `>=`, `>`, `IN`, `NOT IN`
    -   Supports ordering for single-valued properties
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

*   `NULL` predicate 
*   Quantified comparison predicate (`= ANY`)
*   Quantified IN predicate (`ANY .... IN (....)`)
*   `IN_FOLDER` predicate function

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
* `SORT`: The multi-valued and `mltext` properties will\\ sort according to one of the values. Ordering is not localized and relies on the database collation. It uses an `INNER JOIN`, which will also filter NULL values from the result set.
* `d:mltext`: This data type ignores locale. However, if there is more than one locale, the localised values behave as a multi-valued string. Ordering on `mltext` will be undefined as it is effectively multi-valued.
* `UPPER()` and `LOWER()`: Comparison predicates provide additional support for SQL `UPPER()` and LOWER() functions (that were dropped from a draft version of CMIS specification but are supported for backward compatibility).
