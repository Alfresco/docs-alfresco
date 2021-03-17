---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
option: 
---

# Configuring a dynamic asset collection

There are several configurations that you can make when editing a dynamic asset collection. Edit the query to change the location from which the web assets are being retrieved or to exclude an asset from being selected. You can also change the maximum number of assets to be retrieved and the interval at which the query run.

This task assumes you are in the Document Library page component of the Quick Start site and that the **Show Folders** feature is enabled.

1.  Navigate to **Alfresco Quick Start \> Quick Start Editorial \> root \> news \> collections**.

2.  Locate the folder **section.articles** and click **Edit Metadata** in the associated action list.

    The **Query Language** field indicates if the defined query is CMIS \(cmis-alfresco\) or Lucene \(lucene\). The **Query** field displays the defined query.

    The value in the **Maximum Size** field indicates the maximum number of assets that can be associated with this template component. The number of assets selected when the query is run will not exceed this value.

    The **Minutes to Query Refresh** field displays the time interval, in minutes, at which the query is automatically run.

    The **Web Assets** list displays the content currently selected for use by the asset collection **section.articles**. As this is a dynamic asset collection, the web assets listed are those that were retrieved the last time the query was run.

3.  Edit the query as desired.

    In the example

    ```
    select d.* from cmis:document as d where in_tree(d, '${section:.}') and 
    d.cmis:objectTypeId='D:ws:article' order by d.cmis:creationDate desc
    ```

    the default CMIS query retrieves articles and orders them in the **Web Assets** list by date/time. The query will retrieve up to 30 articles, as indicated by the value in the **Maximum Size**field.

    You can use the keyword `section` in native CMIS queries in the following ways:

    -   The keyword `section` is used in this CMIS query to show all content items of type `ws:article` from the current section: `'${section:.}'`.
    -   To reference an absolute section from the site root, such as **Quick Start Editorial \> root \> blog**, use `'${section:/blog}'`.
    -   To reference a subsection of the current section, such as **Quick Start Editorial \> root \> news \> companies**, use `'${section:companies}'`.
    -   To reference the parent of the current section, use `'${section:..}'`.
    -   To reference the site root, use `'${section:/}'`.
    As the query is standard CMIS, you can also use standard property names, such as `cmis:contentStreamMimeType`. Therefore, to return all PDF documents within the current section, you could use:

    ```
    select d.* from cmis:document as d where in_tree(d, '${section:.}') and 
    d.cmis:objectTypeId='cmis:document' and d.cmis:contentStreamMimeType='application/pdf' 
    order by d.cmis:creationDate desc
    ```

4.  Click **Submit**.

    In the Quick Start website, navigate to the News landing page to view the changes. Refresh the page if the changes are not immediately visible.


**Parent topic:**[Selecting articles for the landing page](../concepts/qs-articles-select.md)

