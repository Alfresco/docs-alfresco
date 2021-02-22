---
author: Alfresco Documentation
---

# Controlling search results in Share

This topic provides instructions on controlling the maximum number of items that a Share search returns.

By default, the Share search returns a maximum of 250 search results. If you want the search to return more than 250 entries, complete the following steps.

1.  Ensure that the <web-extension\>\\share-config-custom.xml file exists. If the file does not exist:

    1.  Locate the following .sample configuration override file:

        <web-extension\>\\share-config-custom.xml.sample

    2.  Copy and rename the file to:

        <web-extension\>\\share-config-custom.xml

2.  Copy the `<config evaluator="string-compare" condition="Search" replace="true">` section from the <configRoot\>\\classes\\alfresco\\share-config.xml file.

3.  Paste the copied section into the <web-extension\>\\share-config-custom.xml file.

4.  In the <web-extension\>\\share-config-custom.xml file, edit the value for the `<max-search-results>` property to reflect the number of search results you want Share to return.

5.  For the changes to take effect, refresh the Alfresco web scripts. To refresh the web scripts:

    1.  Navigate to the Alfresco web scripts Home page.

        For example, go to: http://<your-host\>:8080/share/page/index.

    2.  Click on **Refresh Web Scripts**.

        You have now refreshed the web scripts and set a limit to the number of items a search in Share returns.

6.  Test the search configuration.

    1.  Browse to the location of your Alfresco installation.

        For example, http://<your-host\>:8080/share.

    2.  Search for folders or documents in the Share repository.

    Notice that the number of search items returned is not more than what you specified in the <web-extension\>\\share-config-custom.xml file.

    **Note:** Custom searches and searches from the node browser use the `solr.query.maximumResultsFromUnlimitedQuery` property to control search results. For more information, see [Solr core configuration properties](../concepts/solrcore-properties-file.md).


**Parent topic:**[Configuring search in Alfresco Share](../concepts/config_alfresco_share_search.md)

