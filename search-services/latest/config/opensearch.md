---
title: Configure OpenSearch
---

You can configure OpenSearch to use a search engine proxy.

[OpenSearch](https://github.com/dewitt/opensearch){:target="_blank"} is a collection of simple formats for sharing search string results, in order to extend existing schemas such as ATOM or RSS. The list of registered search engines is in /config/alfresco/web-scripts-config.xml. You can configure a search engine proxy so that the OpenSearch client indirectly submits a search request through the Alfresco Content Services Web Server (the proxy), rather than directly to the search engine.

1. Create a new file called `/config/alfresco/extension/web-scripts-config-custom.xml`.

    This file will contain the search engine proxy information.

2. Create a new search engine proxy, using the `proxy` attribute. For example:

    ```xml
    <engine label="Alfresco Open Source Talk" proxy="opentalk">
        <url type="application/rss+xml">http://blogs.alfresco.com/opentalk/
      os-query?s={searchTerms}&itemstart={startIndex?}&itempage={startPage?}
      &itemlimit={count?}</url>
    </engine>
    ```

   > **Note:** The value of the `proxy` attribute must be a unique name that identifies the search engine.

3. Save `/config/alfresco/extension/web-scripts-config-custom.xml`.
