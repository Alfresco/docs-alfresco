---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# stats

The `stats` element specifies a list of simple statistics for numeric, dates, and text fields within the document set.

## Parameters

The parameter for the `stats` element is:

|Parameter|Type|Description|
|---------|----|-----------|
|`field`|String|The stats field.|
|`label`|String|A label to include for referencing the stats field.|
|`min`|Boolean|The minimum value of the field. The default value is `true`.|
|`max`|Boolean|The maximum value of the field. The default value is `true`.|
|`sum`|Boolean|The sum of all the values of the field. The default value is `true`.|
|`count`|Boolean|The number of values found. The default value is `true`.|
|`missing`|Boolean|The number which do not have a value for this field. The default value is `true`.|
|`mean`|Boolean|The average of all the values. The default value is `true`.|
|`stddev`|Boolean|This is the standard deviation. The default value is `true`.|
|`sumOfSquares`|Boolean|The sum of all values square. The default value is `true`.|
|`distinctValues`|Boolean|The set of all distinct values for the field. The default value is `false`.|
|`countDistinct`|Boolean|The number of distinct values. The default value is `false`.|
|`cardinality`|Boolean|A statistical approximation of the number of distinct values. The default value is `false`.|
|`cardinalityAccuracy`|Number|The number between `0.0` and `1.0` indicating how aggressively the algorithm should try to be accurate. This parameter is used with boolean cardinality flag. The default value is `0.3`.|
|`excludeFilters`|String|A list of filters to exclude.|
|`percentiles`|Number|A list of percentile values, for example, `1,99,99.9`.|

**Note:** It is not possible to do a date range Vs Stats.

## Example

-   **Example of numeric stats:**

    In this example, we want to display the statistics for the `content.size` field. All the parameters, such as min, max, sum, missing, and so on are computed against all the records.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "content.size",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```

-   **Example of date stats:** In this example, we want to find the statistics about when content was created. The response will return the statistics for the whole repository. To see when content was created in a site, you can add `filterQueries` to for that site\(s\) to narrow down the result.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "created",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```

-   **Example of text stats:** In this example, we want to know what kind of content exists in my repository. The response will show a stats on how many documents, folders, people, or custom types and models exist in the repository.

    ```
    {
      "query": {
        "query": "name:*"
      },
        "stats": [
            {
                "field": "TYPE",
                "label": "myStat",
                "min": true,
                "max": true,
                "stddev": true,
                "missing": true, 
                "sum": true,
                "count": true,
                "sumOfSquares": true,
                "percentiles": ["1","12.5","25","50","75","99"],
                "distinctValues": true,
                "countDistinct": true,
                "cardinality": true,
                "cardinalityAccuracy": 0.1
          }
          ]
    }
    ```


**Parent topic:**[Search API](../concepts/search-api.md)

