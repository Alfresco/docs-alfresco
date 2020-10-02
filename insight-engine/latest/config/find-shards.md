---
title: Finding shards at query time
---
Use a JMX client to find shards at query time.

1. In JConsole, go to **MBeans \> Alfresco \> Configuration \> Search \> managed \> solr6 \> Attributes**.

    All the Solr attributes are listed on this page.

    ![](../images/Solr4Attributes.png)

2. Set the following properties:

    ```bash
    solr6.alfresco.numShards=10
    solr6.archive.numShards=10
    ```

3. In JConsole, go to **MBeans \> Alfresco \> Configuration \> Search \> managed \> solr6 \> solr6.store.mappings**.

4. Set `numShards` for `solrMappingAlfresco` and `solrMappingArchive`.

    1. Go to **solrMappingAlfresco \> Attributes \> numShards** and set the value of `numShards`.

        ```bash
        numShards=10
        ```

    2. Go to **solrMappingArchive \> Attributes \> numShards** and set the value of `numShards`.

        ```bash
        numShards=10
        ```
