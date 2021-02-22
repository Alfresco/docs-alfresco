---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Searching

This section provides information on how to search for content and metadata in the Repository.

Searching the content in the Repository is one of the major benefits of using Alfresco Content Services. It is possible to search both in the text content of files and in the metadata for folders and files.

You can search the Repository in two different ways. The first approach is easy and requires only a GET call with the `term` that you want to search for in the text content or metadata. This call searches the whole repository and every type of file that can be transformed to text. The second approach is a POST call with the search query that you want to use. It’s more powerful and allows you to do a more specific search, such as where in the Repository to search and in what type of files to search.

This section also goes through how to specifically search for sites and people.

-   **[Finding folders and files by a term](../concepts/dev-api-by-language-alf-rest-finding-content-by-term.md)**  
Simple search in metadata and content with a term.
-   **[Finding sites by a term](../concepts/dev-api-by-language-alf-rest-finding-sites-by-term.md)**  
Simple search for sites with a term.
-   **[Finding people by a term](../concepts/dev-api-by-language-alf-rest-finding-people-by-term.md)**  
Simple search for people with a term.
-   **[Finding content by a search query](../concepts/dev-api-by-language-alf-rest-finding-content-by-search-query.md)**  
Use a search query to be able to do a more specific search, such as where to search and for what.

**Parent topic:**[ReST API](../concepts/dev-api-by-language-alf-rest.md)

