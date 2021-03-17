---
author: Alfresco Documentation
---

# Root objects available in all templates

This information lists root objects that are available to template code running in all contexts.

The following root objects are available in templates regardless of the context in which they run:

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`args`|Associative array|A map of query parameter values indexed by query parameter name. This is only available if the script was executed using the Script Servlet.|
|`argsM`|Associative array|A map of multi-valued query parameters, where each key is an argument name and each value is an array containing all respective argument values, even if only one is supplied.|
|`cache`|`org.springframework.extensions.webscripts.Cache`|The `cache` object allows control over how the web script response is cached.|
|`config`|XML configuration data from a file|Provides access to the web script configuration read from an XML file.|
|`date`|java.util.Date|The date and time the web script was invoked.|
|`format`|`org.springframework.extensions.webscripts.FormatModel`|The `format` object represents the chosen format of the rendered response.|
|`guest`|Boolean|A simple boolean value indicating whether the current is a guest user or not.|
|`headers`|Associative array|A map of request header values indexed by header name.|
|`headersM`|Associative array|A map of multi-valued request headers, where each key is a header name and each value is an array containing all respective header values, even if only one is supplied.|
|`messages`|JSON|A JSON representation of all localized messages for the Web Script.|
|`server`|`org.alfresco.repo.web.scripts.RepositoryServerModel`|A description of the web script container hosting the web script.|
|`status`|`org.springframework.extensions.webscripts.Status`|The `status` object represents a response status.|
|`url`|`org.springframework.extensions.webscripts.DefaultURLModel`|Provides access to the web script URI, or parts of the URI, that triggered the web script.|
|`webscript`|`org.springframework.extensions.webscripts.DescriptionImpl`|The `webscript` object provides metadata describing the web script currently being executed.|

**Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference](API-JS-rootscoped.md).

**Parent topic:**[Web Scripts](../concepts/ws-reference.md)

