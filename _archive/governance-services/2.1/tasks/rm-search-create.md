---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Creating a search

You can search all the contents of your Records Management site. You can narrow the results of your search by specifying relevant metadata fields and container types \(category, folder, record\). Once you create a search, you can save it to use again.

See [Advanced search options](../concepts/rm-search-syntax.md) for how to get the most out of the search facility.

1.  On the Records Search **Criteria** tab enter a search term in the box.

2.  If you want you can use the **Insert Field** and **Insert Date** options to do a more advanced search.

    |Search criteria|Description|
    |---------------|-----------|
    |**Insert Field**|Select from the options available what you want to search for. When you select an option it's added to the field below where you can then enter your search criteria. For example if you select **Disposition Schedule \> Disposition Action Name**, the field name `dispositionActionName:` is added and you can then type a disposition action name, such as `dispositionActionName:cutoff`. Don't insert a space between the colon and the search term. You can select multiple criteria.|
    |**Insert Date**|Select a date to search on or even multiple dates, see [searching for date ranges](rm-search-daterange.md).|

3.  Expand the **Results options** section and specify the content you want displayed in the search results.

    1.  In the Metadata section, select the metadata fields that you want to display in the search results. The metadata name becomes a column title in the results table, which can then be sorted.

    2.  In the Order section, specify how you want to sort the search results.

    3.  In the Components section, select the type of components you want the search to return.

4.  Click **Search**.

    The search results display in a table on the Results tab.


Clicking **New Search** returns you to the Criteria tab and clears the search fields, setting them to their default values. This lets you easily create a new search.

-   **[Search query examples](../concepts/rm-search-examples.md)**  
This section provides search examples of how to specify the search syntax.
-   **[Search field options](../concepts/rm-search-fields.md)**  
If you select to **Insert Field** for a search, then the following fields are available if you select a **Content**, **Record**, or **Disposition Schedule** field.
-   **[Search record type field options](../concepts/rm-search-specialfields.md)**  
If you select to **Insert Field** for a search, then the following fields are available if you select a **Web Record**, **Scanned Record**, **PDF Record**, or **Digital Photograph Record** field.

**Parent topic:**[Searching records](../concepts/rm-search.md)

