---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: API
option: TagScope Object API
---

# TagScope object

The tagging-related `ScriptNode` methods such as `getTagScope` return `TagScope` objects.

## Introduction

A `TagScope` object represents the roll up of tags within the scope of a node tree. More specifically, a *tag scope* is a designated container \(i.e. a folder\) for tagged content. The tag scope defines a set of aggregated data \(*tag scope data*\) on the number of occurences \(i.e. count\) of each tag within the container. The repository tagging services are responsible for keeping the tag scope data up-to-date as tags are added and removed from files and folders within the container.

When a `cm:tasgscope` aspect is applied to a `cm:folder` node it defines a tag scope container, which aggregates the occurence of tags applied to objects within the container.

```
<aspect name='cm:tagscope'>
    <title>Tag Scope</title>
    <properties>
        <property name='cm:tagScopeCache'>
            <title>Tags</title>
            <type>d:content</type>
            <protected>true</protected>
        </property>        
    </properties>    
</aspect>
```

The aspect defines a single `d:content` property containing the aggregated data in plain text. The structure of the content is as follows:

```
presentation|24
tech|23
dev|23
sales|18
video|18
```

This is the data that is returned when API requests are made for tagging data.

## Properties

The `TagScope` object type provides the following property:

-   **`tags`**

    A read-only array containing the tag details in count order.


-   **[getCount](../references/API-JS-TagScope-getCount.md)**  
`getCount(tag)` gets the count of a tag; that is, how many times the tag is used within the tag scope. This is zero if the tag is not present.
-   **[getTopTags](../references/API-JS-TagScope-getTopTags.md)**  
`getTopTags(topN)` gets the top tags ordered by count.
-   **[refresh](../references/API-JS-TagScope-refresh.md)**  
`refresh()` refreshes the tag scope, causing the tags and counts within the tag scope to be updated.

**Parent topic:**[Tagging service](../references/API-JS-TaggingService.md)

