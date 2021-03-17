---
author: [Alfresco Documentation, Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Search examples

Refer to these search criteria examples to better understand how to perform content searches.

|To locate...|Enter the search criteria...|This searches...|
|------------|----------------------------|----------------|
|the word *banana* anywhere it exists|bananaor

=banana

|names, titles, descriptions, comments, and content**Note:** Performing the search without a qualifier expands the search to include tags.

|
|the exact phrase *banana peel* anywhere it exists|"banana peel"|names, titles, descriptions, comments, and content|
|the words *banana*, *peel*, and *slippery* where they all appear together in any order or position|banana AND peel AND slippery

|names, titles, descriptions, comments, and content|
|content containing any of the words *banana*, *peel*, and *slippery*|banana peel slippery

or

banana OR peel OR slippery|names, titles, descriptions, comments, and content|
|the word *banana* where it is used in a title|title:banana|titles|
|the word *banana* where it is used in a name|name:banana|names of folders and content items in the library; wiki page titles|
|the word *banana* where it is used in the description|description:banana|descriptions of folders and content items in the library; descriptions of data lists|
|the word *banana* where it is used in site content|TEXT:banana|wiki pages; blog postings and comments; content items; and discussion items and replies|
|content created on September 26, 2011|created:"2011-09-26"|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|content created between September 26 and September 30, 2011|created:\["2011-09-26" to "2011-09-30"\]|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified on September 26, 2011|modified:"2011-09-26"|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified between September 26 and September 30, 2011|modified:\["2011-09-26" to "2011-09-30"\]|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content created by a specific user|creator:username**Note:** Replace *username* with the appropriate user name.

|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified by a specific user|modifier:username**Note:** Replace *username* with the appropriate user name.

|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content containing the letter sequence *use*The results returned will include references to *use*, *user*, *reuse*, etc.

|TEXT:\*use\*|wiki pages, blog postings, library folders, content items, and discussion topics, including comments made on this content|

**Parent topic:**[Searching for content](../concepts/search-intro.md)

**Parent topic:**[Reference](../concepts/share-reference.md)

