---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Using Filtered search

Use this information for an overview of the filtered search capability in Alfresco Share along with its configuration details. It also describes how to define your own custom filters.

Filtered search is a powerful search feature that allows users to filter and customize their results by applying multiple filters to their search results in a navigational way. Filtered search breaks up search results into multiple categories, typically showing counts for each, and allows the user to drill down or further restrict their search results based on those filters.

**Important:** Filtered search uses the Solr 4 search subsystem and is enabled by default from Alfresco Content Services 5.0 onwards. For more information on migrating from your existing search subsystem to Solr 4, see [Upgrading search](search-migration.md).

**Configuring filtered search**

You can configure filtered search either by using the [configuration files](filtered-search-prop.md) or by using the [Share Search Manager](super-search-manager.md).

-   **[Filtered search configuration file and default properties](../concepts/filtered-search-prop.md)**  
There are a number of default filtered search configuration properties defined. The default filtered search properties are explained here.
-   **[Defining custom search filters using configuration file](../tasks/filtered-search-custom.md)**  
You can define and create your own custom filters for being displayed on the search result page.

**Parent topic:**[Configuring search with Solr 4](../concepts/solr-home.md)

