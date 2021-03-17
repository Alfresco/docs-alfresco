---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# Search examples

Refer to the search criteria examples provided in the following table to better understand how to perform content searches in Share.

|To locate...|Enter the search criteria...|This searches...|
|------------|----------------------------|----------------|
|the word *banana* anywhere it exists|bananaor

=banana

|names, titles, descriptions, blog comments, and content in all page components**Note:** Performing the search without a qualifier expands the search to include tags.

|
|the exact phrase *banana peel* anywhere it exists|"banana peel"|names, titles, descriptions, blog comments, and content in all page components|
|the words *banana*, *peel*, and *slippery* where they all appear together in any order or position|banana AND peel AND slippery

|names, titles, descriptions, blog comments, and content in all page components|
|content containing any of the words *banana*, *peel*, and *slippery*|banana peel slippery

or

banana OR peel OR slippery|names, titles, descriptions, blog comments, and content in all page components|
|the word *banana* where it is used in a title|title:banana|titles in the Wiki, Blog, Document Library, Discussions, and Data List page components|
|the word *banana* where it is used in a name|name:banana|names of folders and content items in the Document Library page component and titles in the Wiki page component|
|the word *banana* where it is used in the description|description:banana|descriptions of folders and content items in the Document Library page component and of lists in the Data Lists page component|
|the word *banana* where it is used in site content|TEXT:banana|wiki pages; blog postings and comments; content items; and discussion items and replies|
|content created on May 26, 2010|created:"2010-05-26"|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|content created between May 26 and May 31, 2010|created:\["2010-05-26" to "2010-05-31"\]|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified on May 26, 2010|modified:"2010-05-26"|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified between May 26 and May 31, 2010|modified:\["2010-05-26" to "2010-05-31"\]|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content created by a specific user|creator:username**Note:** Replace *username* with the appropriate Share user name.

|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content modified by a specific user|modifier:username**Note:** Replace *username* with the appropriate Share user name.

|wiki pages, blog postings, library folders, content items, events, links, discussion topics, and data lists, including comments made on this content|
|any content containing the letter sequence useThe results returned will include references to *use*, *user*, *reuse*, etc.

|TEXT:\*use\*|wiki pages, blog postings, library folders, content items, and discussion topics, including comments made on this content|

**Parent topic:**[Searching for content](../concepts/search-intro.md)

**Related information**  


[Search syntax](rm-searchsyntax-intro.md)

