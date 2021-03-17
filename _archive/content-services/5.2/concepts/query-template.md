---
author: Alfresco Documentation
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Query templates in Share and Public API

A query template processes a simple user query and generates a more complex query. It is similar to the DisMax query parser in Solr.

The Share template for live search looks like this:

```
%(cm:name cm:title cm:description TEXT TAG)
```

The `%` identifies something to replace and is followed by a field or a group of fields. Any query that you enters for the template will be applied to those fields. If you specify a groups of fields, they are all combined together using the `OR` operator.

For example, if you search for *alfresco* in the live search, it will generate:

```
(cm:name:alfresco OR cm:title:alfresco OR cm:description:alfresco OR TEXT:alfresco OR TAG:alfresco)
```

If you search for *=Alfresco* in the live search, it will generate:

```
(=cm:name:Alfresco OR =cm:title:Alfresco OR =cm:description:Alfresco OR =TEXT:Alfresco OR =TAG:Alfresco)
```

By default, multiple words are combined together in a query using `AND`. For example, using *one two*, generates the following query:

```
(cm:name:(one AND two) OR  cm:title:(one AND two) OR cm:description:(one AND two) OR TEXT:(one AND two) OR TAG:(one AND two))
```

Searching for the phrase**"alfresco is great"**, generates the following query:

```
(cm:name:"alfresco is great" OR cm:title:"alfresco is great" OR cm:description:"alfresco is great" OR TEXT:"alfresco is great" OR TAG"alfresco is great")
```

In this example, the template is simply defining the fields used for search. You can also add different importance to each term by specifying each field rather than a replacement group. Here, we are ranking the fields in the order of their importance starting from highest to lowest: `name` over `title` \>, `title` over `description`, and all over `TEXT` \(content\) and `TAG`.

```
(%cm:name^10 OR  %cm:title^2  OR %cm:description^1.5 OR %TEXT OR %TAG)
```

Query templates can contain any query element to limit the results to certain types.

```
(%cm:name^10 OR  %cm:title^2  OR %cm:description^1.5 OR %TEXT OR %TAG) AND TYPE:content
```

You can split your template into two parts: one for content and one for folders. This lets you change the balance of relevance between them.

