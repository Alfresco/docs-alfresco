---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
---

# Controlling search results in Share

This topic provides instructions on controlling the maximum number of items that a Share search returns.

By default, the Share search feature returns a maximum of 250 search results. You can extend this number of search results to return more than 250 entries.

1.  Download the [share-config.xml](http://dev.alfresco.com/resource/AlfrescoOne/5.0/configuration/alfresco/share-config.xml) file.

2.  Open the share-config.xml file and copy the `<config evaluator="string-compare" condition="Search" replace="true">` section.

3.  Open the <web-extension\>\\share-config-custom.xml file and then paste the copied section.

4.  Locate the `<max-search-results>250</max-search-results>` property and then edit the value to your preferred number of search results.

5.  For the changes to take effect, refresh the Alfresco web scripts. To refresh the web scripts:

    1.  Navigate to the Alfresco web scripts Home page.

        For example, go to: http://<your-host\>:8080/share/page/index.

    2.  Click on **Refresh Web Scripts**.

        You have now refreshed the web scripts and set a limit to the number of items a search in Share returns.


**Note:** Custom searches and searches from the node browser use the `solr.query.maximumResultsFromUnlimitedQuery` property to control search results. For more information, see [Solr 4 core configuration properties](../concepts/solrcore4-properties-file.md).

**Parent topic:**[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)

