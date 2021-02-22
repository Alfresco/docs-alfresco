---
author: [Alfresco Documentation, Alfresco Documentation]
---

# SearchService

This encapsulates the execution of search against different indexing mechanisms.

|Information|SearchService|
|-----------|-------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages. The query languages supported include: -   LANGUAGE\_CMIS\_ALFRESCO
-   LANGUAGE\_CMIS\_STRICT
-   LANGUAGE\_FTS\_ALFRESCO
-   LANGUAGE\_LUCENE
-   LANGUAGE\_SOLR\_ALFRESCO
-   LANGUAGE\_SOLR\_CMIS
-   LANGUAGE\_SOLR\_FTS\_ALFRESCO
-   LANGUAGE\_XPATH

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/search/SearchService.html)|
|Java example|```

                  
// Simple example
ResultSet results = searchService.query(storeRef, SearchService.LANGUAGE_FTS_ALFRESCO, "quick");
                  
// Find all the nodes under the root node by QName namespace:one
// The prefix must be resolved to a URI
ResultSet results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PATH:\"/namespace:one\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:five/namespace:twelve\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:*/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:*/namespace:five/namespace:*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/namespace:*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/*/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/*/namespace:five/*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/namespace:one/*/namespace:nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//*/./.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//./*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"//././*/././.\"", null, null);

// Examples using the default namespace
results = searcher.query(storeRef, "lucene", "PATH:\"//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//common\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//*\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one/five//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//five/nine\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.\"", null, null);
results = searcher.query(storeRef, "lucene", "PATH:\"/one//thirteen/fourteen//.//.\"", null, null);

// Type based queries.
// escapeQName uses QueryParser static method to escape the string.

QName qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(qname) + ":\"01\"", null, null);

qname = QName.createQName(NamespaceService.ALFRESCO_URI, "long-ista");
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(qname) + ":\"2\"", null, null);
    
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "float-ista");
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(qname) + ":\"3.4\"", null, null);
      
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "double-ista")) + ":\"5.6\"", null, null);
   
Date date = new Date();
String sDate = CachingDateFormat.getDateFormat().format(date);
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "date-ista")) + ":\"" + sDate + "\"", null, null);
    
results = searcher.query(storeRef, "lucene",
               "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "datetime-ista")) + ":\"" + sDate + "\"", null, null);

results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "boolean-ista")) + ":\"true\"", null,
               null);

results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "qname-ista")) + ":\"{wibble}wobble\"",
               null, null);
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "guid-ista")) + ":\"My-GUID\"", null,
               null);
  
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "category-ista")) + ":\"CategoryId\"",
               null, null);
 
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "noderef-ista")) + ":\"" + n1 + "\"",
               null, null);
          
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(QName.createQName(NamespaceService.ALFRESCO_URI, "path-ista")) + ":\""
               + nodeService.getPath(n3) + "\"", null, null);
      

// Queries based on type.

results = searcher.query(storeRef, "lucene", "TYPE:\"" + testType.toString() + "\"", null, null);
    
results = searcher.query(storeRef, "lucene", "TYPE:\"" + testSuperType.toString() + "\"", null, null);

results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testAspect.toString() + "\"", null, null);
      
results = searcher.query(storeRef, "lucene", "ASPECT:\"" + testSuperAspect.toString() + "\"", null, null);
   

// Full text search examples

results = searcher.query(storeRef, "lucene", "TEXT:\"fox\"", null, null);
       
QName queryQName = QName.createQName("alf:test1", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       

// Canned queries and query parameters

queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
results = searcher.query(storeRef, queryQName, null);
       
queryQName = QName.createQName("alf:test2", namespacePrefixResolver);
QueryParameter qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "woof");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
      
queryQName = QName.createQName("alf:test3", namespacePrefixResolver);
qp = new QueryParameter(QName.createQName("alf:banana", namespacePrefixResolver), "/one/five//*");
results = searcher.query(storeRef, queryQName, new QueryParameter[] { qp });
    
// TODO: should not have a null property type definition
QueryParameterDefImpl paramDef = new QueryParameterDefImpl(QName.createQName("alf:lemur", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "fox");
results = searcher.query(storeRef, "lucene", "TEXT:\"${alf:lemur}\"", null, new QueryParameterDefinition[] { paramDef });
       
paramDef = new QueryParameterDefImpl(QName.createQName("alf:intvalue", namespacePrefixResolver), (PropertyTypeDefinition) null, true, "1");
qname = QName.createQName(NamespaceService.ALFRESCO_URI, "int-ista");
results = searcher.query(storeRef, "lucene", "\\@" + escapeQName(qname) + ":\"${alf:intvalue}\"", null, new QueryParameterDefinition[] { paramDef });

// Other

results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "PARENT:\"" + rootNodeRef.toString() + "\"", null, null);
       
results = searcher.query(rootNodeRef.getStoreRef(), "lucene", "+PARENT:\"" + rootNodeRef.toString() + "\" +QNAME:\"one\"", null, null);
                  
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

