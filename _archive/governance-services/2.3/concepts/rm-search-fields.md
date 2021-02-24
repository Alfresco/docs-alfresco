---
author: Alfresco Documentation
source: 
audience: [, ]
category: User Help
option: Records Management
---

# Search field options

If you select to **Insert Field** for a search, then the following fields are available if you select a **Content**, **Record**, or **Disposition Schedule** field.

|Title|Field name|Description|
|-----|----------|-----------|
|Keywords \(text and name\)|`keywords`|Used to search for the name, title, description fields, and text. This field is tokenized.|
|Identifier|`identifier`|The unique identifier for the record. The system generates this identifier.|
|Name|`name`|The name of the record. This is populated with the name of the file that was uploaded.|
|Title|`title`|The title of the record. This is populated with the name of the file that was uploaded. Change the value to show the title of the record.|
|Description|`description`|A short description of the record.|
|Creator|`creator`|The person\(s\) who created this record.|
|Created|`created`|The date that this record was created.|
|Modifier|`modifier`|The last user to make any modifications to this record.|
|Modified|`modified`|The time that the last modification occurred.|
|Author|`author`|The name of the document author\(s\).|
|Originator|`originator`|The person or department in the Originating Organization.|
|Date Filed|`dateFiled`|The date that the record was filed.|
|Publication Date|`publicationDate`|The date that the record is published. Select the date from the calendar selection box.|
|Review Date|`reviewDate`|The date that this record is due for review.|
|Originating Organization|`originatingOrganization`|This is who created the document/record in the first place. Often this will be the organization running the software, but in some cases might be an external organization.|
|Media Type|`mediaType`|The type of the media.|
|Format|`format`|The media on which the record is stored.|
|Date Received|`dateReceived`|The date that the record was received from the originator.|
|Location|`location`|The physical location of the record. This is mainly applicable to non-electronic records.|
|Addressee|`address`|The address of the originating organization to be used for correspondence.|
|Other Addressee|`otherAddress`|The CC list from an email.|
|Supplemental Marking List|`markings`|This list is defined in the RM List of Values tool in the RM Admin Tools.|
|Disposition Events|`dispositionEvents`|User defined disposition events.|
|Disposition Action Name|`dispositionActionName`|The name of the disposition action. The values can be Accession, Destroy, Retain, Transfer, and Cutoff.|
|Disposition Action As of Date|`dispositionActionAsOf`|The date that the disposition action occurred.|
|Disposition Events Eligible|`dispositionEventsEligible`|Specifies whether this record has any eligible events. The values can be true or false.|
|Disposition Period|`dispositionPeriod`|The period of time to which the disposition action is set. The values can be day, fymonthend, fyquarterend, fyyearend, monthend, quarterend, yearend, immediately, month, none, notset, quarter, week, or year.|
|Has Disposition Schedule|`dispositionSchedule`|Specifies whether this record is under a disposition schedule. The value can be true or false.|
|Disposition Instructions|`dispositionInstructions`|The text summary of the disposition steps.|
|Disposition Authority|`dispositionAuthority`|The legislation relevant to the disposition instructions, in particular, relating to the disposal of the record. For example, GRS 2 Item 7.|
|Hold Reason|`holdReason`|The reason that the record is in the Hold area.|
|Vital Record Review Period|`vitalRecordReviewPeriod`|The review period set for a vital record. The values can be day, fymonthend, fyquarterend, fyyearend, monthend, quarterend, yearend, immediately, month, none, notset, quarter, week, year.|

**Parent topic:**[Creating a search](../tasks/rm-search-create.md)

