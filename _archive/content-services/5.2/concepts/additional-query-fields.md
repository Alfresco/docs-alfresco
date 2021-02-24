---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Structure, tags, categories, and query

Alfresco Content Services 5.2.7 supports structural queries to find documents by how they are arranged in a folder structure, how they are categorised, and how they have been tagged.

You can add new types of category, add your new categories to existing hierarchies, use aspects on the base category object. All these categories are discoverable. Categories and tags are implemented the same way. Tags are a flat category whereas categories are treated as an additional path to a document in a category hierarchy. A document is linked to a category by setting a property to the node ref of one or more categories.

Alfresco Search Services provides new information in the index and fields that can be used in the query, filter queries and, facets. These are:

-   `TAG` - Used to index all the lowercase tags that have been assigned to a node. It provides easy query time access to concepts in Share.
-   `SITE` - Used to index the site short name for a node in any site. It provides easy query time access to concepts in Share. It may be possible that a node exists in more than one site. If a node does not exist in any site, it is assigned a value of `_REPOSITORY_`.
-   `NPATH`- Specifies the name path to a node. `NPATH` support queries that will progressively drill into a folder or category structure and support faceting to count the documents and folders in each part of the next layer. See the example below for how it is indexed.
-   `PNAME`- Specifies the path from the node up through its parents. `PNAME` support queries that will progressively drill into a folder or category structure and support faceting to count the documents and folders in each part of the next layer. For more information, see the example below.
-   `APATH` - Used as `NPATH` but using `UUID`. The `UUID` can be used as the key for internationalisation \(Solr 6 only\). `APATH` does the same job with a `UUID` key to aid internationalisation and a bridge to other public APIs where `UUID` is ubiquitous.
-   `ANAME` - Used as `PNAME` but using `UUID`. The `UUID` can be used as the key for internationalisation \(Solr 6 only\). `ANAME` does the same job with a `UUID` key to aid internationalisation and a bridge to other public APIs where `UUID` is ubiquitous.

The Search public API in Alfresco Content Services 5.2.7 exposes filter queries and faceting by field with prefix restrictions. These, in combination with the additional data, supports new ways to drill-in and roll up data.

**Example to show what's in the index**

```
"PATH":["/{http://www.alfresco.org/model/application/1.0}company_home/{http://www.alfresco.org/model/site/1.0}sites/
{http://www.alfresco.org/model/content/1.0}woof/{http://www.alfresco.org/model/content/1.0}documentLibrary/
{http://www.alfresco.org/model/content/1.0}CMIS-v1.1-cs01.pdf"]
"SITE":["woof"]
"APATH":[
         
          "0/264ed642-b527-488a-9139-ecde3673e4de",          
          "1/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612,a4e4-354d10f3217e",         
          "2/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2",         
          "3/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19",         
          "4/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",        
          "F/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675"]
              
"ANAME":[
          "0/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",          
          "1/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",      
          "2/b9f14a0f-cffb-4409-b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2
           -9ae5-9f4ffbad2675",          
          "3/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409-b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d
           -9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",          
          "4/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675",         
          "F/264ed642-b527-488a-9139-ecde3673e4de/e4c94340-8e40-4612-a4e4-354d10f3217e/b9f14a0f-cffb-4409
           -b8d0-d77e89eca0e2/4f3c4bcd-2ee1-462d-9462-24b7a72acc19/340d5e93-89bf-4cc2-9ae5-9f4ffbad2675"]
"NPATH":[
          "0/Company Home",
          "1/Company Home/Sites",
          "2/Company Home/Sites/woof",
          "3/Company Home/Sites/woof/documentLibrary",          
          "4/Company Home/Sites/woof/documentLibrary/CMIS-v1.1-cs01.pdf",          
          "F/Company Home/Sites/woof/documentLibrary/CMIS-v1.1-cs01.pdf"]
"PNAME":[
          "0/documentLibrary",                    
          "1/woof/documentLibrary",                    
          "2/Sites/woof/documentLibrary",          
          "3/Company Home/Sites/woof/documentLibrary",          
          "F/Company Home/Sites/woof/documentLibrary"]
```

**Queries to use**

**SITE**

To find things by `SITE`, use:

```
SITE:"woof"
```

You can also do this in a filter query in the Search API as filter queries are cached, reused, and warmed.

**TAG**

Similarly for `TAG`, use:

```
 TAG:tag
```

SITE and TAG also support faceting.

**NPATH**

`NPATH` can be used for navigation. To get the top level names, request for a facet on `NPATH` starting with the prefix `0/`.

You can then remove the `0/` from the facets returned to get the names of the top level things.

Here's the JSON body of the request:

```
{  
  "query": {
    "query": "*"
  },
  "facetFields": {
    "facets": [
      {"field": "NPATH", "prefix": "0/"}
     ]
  }
}
```

The response contains `0/categories`.

Now lets drill into another layer. We need the prefix `1/categories` and we filter out the things based on where we want to drill-in `0/categories`, as shown below:

```
{  
  "query": {
    "query": "*"
  },
  "filterQueries": [{"query": "NPATH:\"0/categories\""}],
  "facetFields": {
    "facets": [
      {"field": "NPATH", "prefix": "1/categories"}
    ] 
   }
}
```

This gives us `1/categories/General` and `1/categories/Tags`. Now let's skip a few steps and count the stuff in the `General/Languages` category.

```
{
  "query": {
    "query": "*"
  },
  "filterQueries": [{"query": "NPATH:\"2/categories/General/Languages\""}],
  "facetFields": {
    "facets": [
      {"field": "NPATH" }
    ]
  }
}
```

In a clean repository, this will show both the structure of Language and how many sub-categories exist.

**PNAME**

`PNAME` gives faceting based on ancestry. It can highlight common structures for storing data or departure from such a structure, for example, things in odd locations. If you have used folders to encode state you can roll up on this state.

`PNAME` can also be used to count direct members of a category whereas, `NPATH` can count everything below a category. The design in `PNAME` uses the same prefix for each. So, to get the next category layer with total and direct counts, use:

```
{  
  "query": {
    "query": "*"
  },
   "filterQueries": [{"query": "NPATH:\"2/categories/General/Regions\""}],
   "facetFields": {   
     "facets": [
      {"field": "NPATH", "prefix": "3/categories/General/Regions", "label": "clade"},
      {"field": "PNAME", "prefix": "3/categories/General/Regions", "label": "direct"}   
     ]
  }
}
```

**Parent topic:**[query](../concepts/search-api-query.md)

