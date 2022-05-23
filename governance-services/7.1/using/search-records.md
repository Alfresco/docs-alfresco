---
title: Searching records
---

You can use the Records Search to quickly search the {% include tooltip.html word="fileplan" text="File Plan" %} to find records, and save your search query to use again.

You can either do a basic search, just searching for a term as you would in a search engine, or you can use the 
advanced search functionality. There's lots of options available for you to set really specific searches that you 
can use again and again. See [Advanced search options](#advanced-search-options) for more details on getting the most 
out of the search tool.

## Accessing the Records Search

You can search records to find those that you're looking for, and save searches for future use.

1. In the Records Management site click **Records Search**.

    The Search page displays.

2. Click the **Criteria** tab to perform a search or the **Results** tab to view the results of a search.

## Creating a search

You can search all the contents of your Records Management site. You can narrow the results of your search by specifying relevant metadata fields and container types ({% include tooltip.html word="category" text="category" %}, folder, record). Once you create a search, you can save it to use again.

See [Advanced search options](#advanced-search-options) for how to get the most out of the search facility.

1. On the Records Search **Criteria** tab enter a search term in the box.

2. If you want you can use the **Search by** field and **Search Date** options to do a more advanced search.

    |Search criteria|Description|
    |---------------|-----------|
    |Search by|Select from the options available what you want to search for. When you select an option it's added to the field below where you can then enter your search criteria. For example if you select **Retention Schedule > Retention Action Name**, the field name `retentionActionName:` is added and you can then type a retention action name, such as `retentionActionName:cutoff`. Don't insert a space between the colon and the search term. You can select multiple criteria.|
    |Search Date|Select a date to search on or even multiple dates, see [searching for date ranges](#searching-for-date-ranges).|

3. Expand the **Results options** section and specify the content you want displayed in the search results.

    1. In the Metadata section, select the metadata fields that you want to display in the search results. The metadata name becomes a column title in the results table, which can then be sorted.

    2. In the Order section, specify how you want to sort the search results.

    3. In the Components section, select the type of components you want the search to return.

4. Click **Search**.

    The search results display in a table on the Results tab.

Clicking **New Search** returns you to the Criteria tab and clears the search fields, setting them to their default values. This lets you easily create a new search.

### Search query examples

Use these examples to see how the Search by and Search Date options work.

* **Finding folders/records due for cut off before 1st Jan 2010**

    `dispositionActionName:cutoff and dispositionActionAsOf:[MIN TO "2010-01-01"]`

* **Finding records due for transfer before 1st Jan 2010**

    `dispositionActionName:transfer and dispositionActionAsOf:[MIN TO "2010-01-01"]`

* **Finding categories or folders with a monthly cycling date**

    `vitalRecordReviewPeriod::month`

    > **Note:** Ensure that you've selected the component in the**Results options** section.

### Search field options

If you select to **Search by** for a search, then the following fields are available if you select a **Content**, **Record**, or **Retention Schedule** field.

|Title|Field name|Description|
|-----|----------|-----------|
|Keywords (text and name)|`keywords`|Used to search for the name, title, description fields, and text. This field is tokenized.|
|Identifier|`identifier`|The unique identifier for the record. The system generates this identifier.|
|Name|`name`|The name of the record. This is populated with the name of the file that was uploaded.|
|Title|`title`|The title of the record. This is populated with the name of the file that was uploaded. Change the value to show the title of the record.|
|Description|`description`|A short description of the record.|
|Creator|`creator`|The person(s) who created this record.|
|Created|`created`|The date that this record was created.|
|Modifier|`modifier`|The last user to make any modifications to this record.|
|Modified|`modified`|The time that the last modification occurred.|
|Author|`author`|The name of the document author(s).|
|Originator|`originator`|The person or department in the Originating Organization.|
|Date Filed|`dateFiled`|The date that the record was filed.|
Publication Date|`publicationDate`|The date that the record is published. Select the date from the calendar selection box.|
|Review Date|`reviewDate`|The date that this record is due for review.|
|Originating Organization|`originatingOrganization`|This is who created the document/record in the first place. Often this will be the organization running the software, but in some cases might be an external organization.|
|Media Type|`mediaType`|The type of the media.|
|Format|`format`|The media on which the record is stored.|
|Date Received|`dateReceived`|The date that the record was received from the originator.|
|Location|`location`|The physical location of the record. This is mainly applicable to non-electronic records.|
|Addressee|`address`|The address of the originating organization to be used for correspondence.|
|Other Addressee|`otherAddress`|The CC list from an email.|
|Supplemental Marking List|`markings`|This list is defined in the RM List of Values tool in the RM Admin Tools.|
|Retention Events|`dispositionEvents`|User defined retention events.|
|Retention Action Name|`dispositionActionName`|The name of the retention action. The values can be Accession, Destroy, Retain, Transfer, and Cutoff.|
|Retention Action As of Date|`dispositionActionAsOf`|The date that the retention action occurred.|
|Retention Events Eligible|`dispositionEventsEligible`|Specifies whether this record has any eligible events. The values can be true or false.|
|Retention Period|`dispositionPeriod`|The period of time to which the retention action is set. The values can be day, fymonthend, fyquarterend, fyyearend, monthend, quarterend, yearend, immediately, month, none, notset, quarter, week, or year.|
|Has Retention Schedule|`dispositionSchedule`|Specifies whether this record is under a {% include tooltip.html word="retentionschedule" text="retention schedule" %}. The value can be true or false.|
|Retention Instructions|`dispositionInstructions`|The text summary of the retention steps.|
|Retention Authority|`dispositionAuthority`|The legislation relevant to the retention instructions, in particular, relating to the disposal of the record. For example, GRS 2 Item 7.|
|Hold Reason|`holdReason`|The reason that the record is in the Hold area.|
|Vital Record Review Period|`vitalRecordReviewPeriod`|The review period set for a vital record. The values can be day, fymonthend, fyquarterend, fyyearend, monthend, quarterend, yearend, immediately, month, none, notset, quarter, week, year.|

### Search record type field options

If you select to **Search by** for a search, then the following fields are available if you select a **Web Record**, **Scanned Record**, **PDF Record**, or **Digital Photograph Record** field.

> **Note:** These options are only available in {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites.

|Record type|Special type name|Description|
|-----------|-----------------|-----------|
|Scanned records|`dod:scannedFormat`|Image Format|
|Scanned records|`dod:scannedFormatVersion`|Image Format Version|
|Scanned records|`dod:resolutionX`|Image Resolution X|
|Scanned records|`dod:resolutionY`|Image Resolution Y|
|Scanned records|`dod:scannedBitDepth`|Scanned Bit Depth|
|PDF records|`dod:producingApplication`|Producing Application|
|PDF records|`dod:producingApplicationVersion`|Producing Application Version|
|PDF records|`dod:pdfVersion`|PDF version|
|PDF records|`dod:creatingApplication`|Creating application|
|PDF records|`dod:documentSecuritySettings`|Document security settings|
|Digital photograph records|`dod:caption`|Caption|
|Digital photograph records|`dod:photographer`|Photographer|
|Digital photograph records|`dod:copyright`|Copyright|
|Digital photograph records|`dod:bitDepth`|Bit Depth|
|Digital photograph records|`dod:imageSizeX`|Image Size X|
|Digital photograph records|`dod:imageSizeY`|Image Size Y|
|Digital photograph records|`dod:imageSource`|Image Source|
|Digital photograph records|`dod:compression`|Compression setting|
|Digital photograph records|`dod:iccIcmProfile`|ICC/ICM profile|
|Digital photograph records|`dod:exifInformation`|EXIF information|
|Web records|`dod:webFileName`|Web file name|
|Web records|`dod:captureMethod`|Method of capture|
|Web records|`dod:contentManagementSystem`|Content management System|
|Web records|`dod:webPlatform`|Web platform|
|Web records|`dod:webSiteName`|Web site name|
|Web records|`dod:webSiteURL`|Web site URL|
|Web records|`dod:captureDate`|Date of capture|
|Web records|`dod:contact`|Capture contact|

## Using a saved search

The Records Management site includes a number of default searches that you can use instead of creating your own. You also have access to searches you've created and saved yourself, as well as those created by other users.

1. On the Records Search page click **Saved Searches** and select a search option.

    The **Critera** tab is auto-filled with the saved search options. You can change these if you want.

2. Click **Search**.

    The search results display in a table on the Results tab.

## Saving a search

When you've run a search and are looking at the search results, you can select to save it.

1. Click **Save Search**.

2. Enter a **Name** and **Description** for the search.

3. Click **Save**.

    The search you save will be available for all site members.

The saved search displays in the **Saved Searches** menu on the Search page. The same list is available 
in the explorer panel of the File Plan.

> **Note:** The saved search feature saves only the search query and not the results. This means that when you next use the saved search, you might get different results, depending on the activity in the Records Management system.

## Printing search results

You can print the search results.

1. Click the Records Search **Results** tab to view the search results.

2. Click **Printer Layout**.

3. Print the page using your browser print option.

4. Click **Screen Layout** to return to the standard view.

## Exporting search results

You can export search results as an Alfresco Content Package (ACP).

1. Click the Records Search **Results** tab to view the search results.

2. Click **Export**.

    Depending on your browser you are prompted to open or save the file.

    > **Note:** You can also export the results from the Printer Layout view.

## Deleting a saved search

You can delete any of your own saved searches, and if you have the required user permissions 
you can also delete the default searches included with the Records Management site.

1. Click the **Saved Searches** menu on the **Search** page to view the available search queries.

2. Select the query you want to delete.

    The **Critera** tab is displayed so you can check that this is the search you want to delete.

3. Click **Delete Search**.

4. Click **Remove** to confirm the deletion.

## Adding search results to a hold - Records Search {#addsearchresults2holdRecordsSearch}

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can add records, and record folders to a hold to freeze them. 
A hold allows objects on hold for a particular reason to be tracked as a set. Holds prevent changes to on hold objects, 
which have their retention schedules suspended until the hold is removed. When you add a folder to a hold, 
all records within the folder are also added to the hold.

1. Click the Records Search tab and search for an item you wish to add to a hold.

2. Review the search results and select the check box next to the item(s) you want to add to a hold.

3. Click the **Selected Items** drop down list and select **Add to Hold**.

    The Add to Hold screen displays.

4. Select one or more holds and click **OK**.

    A message displays confirming that the record or folder is on hold.

    > **Note:** If no holds have been set up in the Holds area then the screen will be empty. Records and folders remain on hold until they have been removed from all holds they're added to.

The selected records and/or folders remain in their place in the File Plan. They are also shown in the **Holds** area of the explorer panel.

> **Note:** To remove a record from a hold hover over it in the File Plan or the Holds area and select **Remove from Hold**. You can remove more than one record at a time by selecting your items and then clicking the **Selected Items** drop down list and then **Remove from Hold**.

## Adding search results to a hold - Share search {#addsearchresults2holdShareSearch}

Users with the appropriate {% include tooltip.html word="capabilities" text="capabilities" %} can add search result items from the main Share search to a hold. 
This means you can select search results from a records management site or from a collaboration site, and add them to a hold. 
This includes content, records, and record folders. For records and record folders this would also suspend their 
retention schedules. When you add a record folder to a hold, all records within the folder are also added to the hold.

> **Note:** Smart folders can't be added to a hold but each individual item in a smart folder can be added to a hold.

1. Within the Share search bar, search for an item you wish to add to a hold.

2. Review the search results and select the check box next to the item(s) you want to add to a hold.

3. Click the **Selected Items** drop down list and select **Add to Hold**.

4. Select one or more holds and click **OK**.

    A message displays confirming that the item or items you have selected are now on hold.

    > **Note:** If no holds have been set up in the Holds area then the screen will be empty. Content, records, and records folders remain on hold until they have been removed from all holds they're added to.

The selected content, records, and records folders remain in their place in the File Plan, or Document Library (depending on the type of item on hold). They are also shown in the **Holds** area of the explorer panel.

> **Note:** To remove content from a hold hover over it in the File Plan, Document Library or the Holds area and select **Remove from Hold**. From the Holds area in the File Plan and from the List view in the File Plan you can remove more than one item at a time. You do this by selecting your items and clicking the **Selected Items** drop down list and then **Remove from Hold**.

## Removing items from hold

You can remove an item from a hold.

> **Note:** From the Holds area in the File Plan and from the List view in the File Plan you can remove more than one item at a time. You do this by selecting your items and clicking the **Selected Items** drop down list and then **Remove from Hold**.

1. In the folder where your items are stored, select the item you want to remove from the hold.

2. Select **Remove from Hold** from the **Selected Items** drop down list.

3. Select the hold where the item is to be removed from.

4. Click **Remove**.

## Advanced search options

As well as basic searches where you search for a specific word, you can also create more complex full text searches with multiple matches, tokens, phrases, wildcards, ranges, and grouping.

Full text searches can be very simple, using a text string, or you can do more complex searches with multiple matches, tokens, phrases, wildcards, ranges, and grouping. The search syntax follows the format:

```text
<field-name>:<search-value>
```

* `<field-name>` is the field within Records Management. For example, `identifier` is the field name for the unique record identifier.
* `:` (colon) separates the field name from the search value. Make sure there's no space between the colon separator and the value.
* `<search-value>` is the value that you want to search for.

Alfresco Records Management has a large number of fields to search against, see [Search field options](#search-field-options) and [Search record type field options](#search-record-type-field-options). The search query requires that you enter the internal name of these fields in the text box. The **Search by** menu list assists you when entering the fields.

To search for phrases, wrap the value string in "quotes". You can also use the wildcard matching characters, question mark (?) for a single character, and asterisk (\*) for zero or more characters to apply to any text value.

### Searching for text

To search for a simple text string in any record content, enter the text string.

For example, to find the text “healthcare” in any completed record:

1. Type `healthcare` in the **Search Text** box.

2. In the **Results options** section, select the components you want to search.

    To find a simple text string in any record name, title, description, or content, enter the following in the Query Text box:

    `keywords:healthcare`

    The keywords field is a special field name that allows you to match against the name, title, description, and content of a record.

    The basic syntax for matching against a field in search queries is the syntax format of the keywords field, then the colon (:), followed by the value to match against.

### Search using wildcards

An example of a simple wildcard query is to match any word starting with 'health' in any record name, title, description, or content.

1. In the **Search Text** box, enter:

    `keywords:health*`

2. In the **Results options** section, select the components you want to search..

The single and multiple wildcard characters can be combined as needed. For example, "*care" and "*car?" both match "healthcare".

### Searching for multiple fields

Multiple fields can be combined to match additional results. Each field, by default, will be OR combined with the previous.

1. In the **Search Text** box, enter:

    `keywords:healthcare keywords:hospital`

2. To return results that only contain both terms, use AND between the terms:

    `keywords:healthcare AND keywords:hospital`

3. In the **Results options** section, select the components you want to search.


The NOT operator and grouping of terms with brackets "(" and ")" are supported. For example:

```text
(KEYWORDS:healthcare AND KEYWORDS:hospital) AND NOT KEYWORDS:clinic
```

### Searching for phrases

To search for phrases, wrap the value string in "double quotes". An example of phrase matching is to match the 
field `originator` with the phrase “John Smith”.

1. In the **Search Text** box, enter:

    `originator:"John Smith"`

2. In the **Results options** section, select the components you want to search.


Wildcards are supported within phrase matching. For example, to match records that contain the text "John Smith" or 
"John Smithe" in the **Originator** metadata field, use the following query text:

```text
originator:"John Smith*" 
```

You can also escape embedded quotes in a phrase using back slash `\`.

### Searching for exact term

To search for exact terms, prefix the term with an equals symbol (`=`). An example of exact term matching is to 
match the word “part”.

1. In the **Search Text** box, enter:

    `=part`

2. In the **Results options** section, select the components you want to search.

This search will match "part" but will not match other terms that contain "part", such as "partners".

### Searching for dates

To search for date values, you can match date fields exactly.

To return records that were filed on 10th September 2009:

1. In the **Search by** menu, select **Records** and then **Date Filed**.

2. Select the date using the **Search Date** control. The query text displays as:

    `"2009-09-10"`

### Searching for date ranges

To search for date values, you can match date fields in a range.

To return date ranges, the syntax requires the From and To dates to be surrounded by square brackets. 
For example, to return records that were filed on or before the 10th January 2010:

1. In the **Search by** menu, select **Records** and then **Date Filed**.

2. Add the following search query:

    `[MIN TO "2010-01-10"]`


You must surround the query with square brackets. Use the `TO` token between dates to represent the range.

Use the `MIN` special token to denote the minimum possible date that can be represented by the system.

Use the `MAX` and `NOW` special tokens to indicate the maximum possible date and the current date, respectively.

For example, to find all records that were filed today, use the following query text:

```text
dateFiled:NOW
```

### Searching for special types

To search for special types, you can match the special type names using ASPECT.

> **Note:** These options are only available in {% include tooltip.html word="dod50152std" text="DoD 5015.2-STD" %} compliant Records Management sites.

For example, to search for all digital photograph records:

1. In the **Search Text**box, type:

    `ASPECT:"dod:digitalPhotographRecord"`

2. In the **Results options** section, select the check box for **Records**.

You can also search on the following special fields:

|Special fields|Description|
|--------------|-----------|
|dod:scannedRecord|Search for all scanned records.|
|dod:pdfRecord|Search for all PDF records.|
|dod:webRecord|Search for all web page records.|

### Searching for empty strings

An example of searching for empty strings is to match all the empty Location fields.

1. In the **Search Text** box, enter:

    `location:””`

2. In the **Results options** section, select the check box for **Records (Completed only)** and deselect the other component options.

3. Click **Search**.

The Results tab shows the completed records that have empty Location fields.

### Searching for components

In the **Results options** section, the Components area allows you to select the type of components to search. You can search for Records, Record Folders, and Record Categories, as well as On Hold and {% include tooltip.html word="cutoff" text="Cut Off" %} records. For record searches, you can also search for incomplete records and vital records.

For example, to search for only vital records:

1. In the **Results options** section, select the check box for **Records (Completed Only)**.

2. Select the check box for **Vital Only**.

3. In the **Metadata** section, select the check box for **Vital Record**.

4. Click **Search**.

The Results tab shows the vital records (the Vital Record field has a value of Yes).

> **Note:** The vital records that are due for review will have the ![]({% link governance-services/images/rm-vr-dueforreview.png %}){:height="18px" width="18px"} icon next to Yes.

### Searching using special operators

Additional special operators can form rich search queries. The following special operations are available:

* `ISNULL:"<field>"` matches a field that has not been set to any value
* `ISNOTNULL:"<field>"` matches a field that contains any value

For example:

1. To return all records where the Description metadata field has not been set to any value, type:

    `ISNULL:"cm:description"`

2. To return all records where the Subject metadata field has been set to any value:

    `ISNOTNULL:"cm:title"`

