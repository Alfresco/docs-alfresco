---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
---

# Best practices when using Smart Folders

There are a number of best practices when using Smart Folders in Alfresco.

Server Configuration and Alfresco Search Service:

-   Configure the Alfresco Search Service to use Solr 4
-   Configure transactional queries in the Search Service to use the database always, or if possible.
-   When you define a search query, restrict the query to certain types or aspects \(using +TYPE or +ASPECT\), otherwise the query will search for all content.
-   When defining a filing rule for a Smart Folder, use a transactional query for that folder where possible, otherwise uploaded files will not appear immediately. See [Transactional metadata queries supported by database](intrans-metadata-query.md) for more information.

Smart Folder Templates:

-   Use the FTS query language \(this is mandatory for Smart Folders\). All other languages are experimental and do not allow creation or upload of new objects into a Smart Folder.
-   If you are using CIFS or WebDAV, only `cm:folder` types are supported for a folder. Do not use a sub type of `cm:folder`; instead use aspects to apply properties to a folder.
-   Don't create filing rules that don't match the query criteria for the folder.
-   Don't use folder types in a filing rule \(creating physical folders in Smart Folders is not supported\).

General guidance:

-   Use the optional `id` property for every folder node to shorten the `noderef` for a Smart Folder \(the length of noderefs can become critical\). The ID must be unique in a template.
-   We recommend uploading content through Alfresco Share or the CMIS APIs. File system protocols such as WebDAV, CIFS, or IMAP are currently unsupported.
-   When you create a model, don't use the `-` \(dash\) character in a type, aspect, or property name. A better method is to used mixed case in your names. If you have used the `-` character in a property name, you must escape the property name in a Smart Folder Template, using `\\`; for example, `mod:first-name` must be escaped to `mod:first\\-name`.

**Parent topic:**[Configuring Smart Folders](../concepts/sf-intro.md)

