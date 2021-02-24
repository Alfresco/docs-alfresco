---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Search

Solr provides indexing of metadata and the plain text of content. This can be queried using various query languages, including Lucene and CMIS Query Language.

|Information|Search|
|-----------|------|
|Java API|To search for nodes use the [SearchService](dev-services-search.md), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/search/SearchService.html).|
|JavaScript API|Use the `search` root object, for more info see the [JavaScript API Documentation](API-JS-Search.md)|
|Alfresco ReST API|The Alfresco ReST API provides a number of ways to search for content in the repository, both simple term based search and more complex search on types and aspects. You can search on files and folders, people, sites etc. See the [Search User Guide](../concepts/dev-api-by-language-alf-rest-searching-for-nodes.md).|
|CMIS ReST API|The CMIS ReST API has extensive support for searching with the CMIS Query Language \(QL\). See the [CMIS Getting Started](../pra/1/concepts/cmis-getting-started.md) section on how to get going with the CMIS ReST API. This section covers the ATOM binding where you work with XML. If you prefer to work with JSON, then have a look at the [Browser binding](../pra/1/concepts/cmis-1.1-intro.md) available in CMIS 1.1.Then look at the [CMIS QL](../pra/1/concepts/cmis-query.md) Introduction.

If you are developing a remote client in Java and want to use CMIS for searching, then have a look at the [OpenCMIS](http://chemistry.apache.org/java/developing/index.html) Java Library.

|
|Mobile SDK \(iOS\)|The [SearchService](http://docs.alfresco.com/mobile_sdk/ios/references/services/AlfrescoSearchService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/ios/references/model/Model.html) also exposes [the SearchLanguage data structure](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoSearchLanguage.html).|
|Mobile SDK \(Android\)|The [SearchService](http://docs.alfresco.com/mobile_sdk/android/references/client_api/services/SearchService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/ClientAPI-Model.html) also exposes [the SearchLanguage data structure](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/SearchLanguage.html).|
|More Information|-   [Search Syntax](../concepts/rm-searchsyntax-APIs.md). \(CMIS, Java, JavaScript\)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

