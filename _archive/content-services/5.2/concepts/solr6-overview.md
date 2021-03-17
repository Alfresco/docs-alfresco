---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Solr 6 features and enhancements

Alfresco Content Services 5.2.7 comes with new enhancements to Alfresco’s search capabilities. Use this information to know about the new features of the Alfresco Search Services 1.2.

**New features and enhancements of Solr 6**

-   **New sharding options**

    The new sharding approach randomly assigns nodes to shards by using the following methods:

    -   DBID \(murmur hash\): The most common and the default sharding method is to use the Alfresco node reference. It supports sharding of nodes based on the murmur hash of the DBID.
    -   ACLID \(murmur hash\): Use an ACLID approach if your repository makes extensive use of ACLs.
    -   DateMonth: Use the date-based sharding to group your data sequentially by DATE. It also allows any month grouping \(sesquiannually, year, quarter, month\)
    -   Use any string property, such as date, datetime, or text with a regular expression extraction and hashing as a sharding option. All documents with the same extracted key value will be in the same shard.
    For more information, see [Solr 6 sharding methods](solr6-shard-approaches.md).


-   **Fingerprints**

    To enable you to find similar documents, Solr 6 generates a fingerprint of a document's content using the MinHash technique.

-   **Highlighting**

    Search term highlighting is now available in Share to help users identify the content they are looking for. The search term entered by the user is highlighted in the Search Results page if it is found in a file name, title, or description. The search results page also extracts and displays a snippet of relevant text from a document that contains the searched term.

-   **Multi-select facets**

    Multi-select faceting allows you to see and select multiple facet values for different facets. Generally, facets only apply to the data that is being filtered. With multi-select faceting, it is now possible to show facets for all documents, including those documents that would be seen without facet filtering applied.

-   **Category faceting**

    Solr 6 allows you to create facets based on categories in the public API for search.

-   **Indexing Multiple Document Versions**

    A standard search usually looks at the most recent version of a document. With Solr 6, Alfresco can index all the versions of a document \(across different stores - live, archive, and deleted\) by indexing the version store. If version store indexing is enabled, all the previous versions of a document can be searched and all matching versions will be returned.

    This feature is useful in cases where you need to search the entire history of a document. The archive store may be much larger than the index for live documents as there may be many more previous versions of a document than the single live version. So, use this feature with caution.

    This feature is not exposed in Share; it is only available via the REST API.

-   **Improved Solr Admin screen**

    Improvements have been made to the Admin screen to enable complete Solr configuration. For more information, see [Configuring Solr 6 sharding using the Admin Console](../tasks/adminconsole-indexserver-sharding.md).


**Parent topic:**[Configuring Alfresco Search Services with Solr 6](../concepts/solr6-home.md)

