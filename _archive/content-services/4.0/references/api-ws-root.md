---
author: Alfresco Documentation
---

# Root objects available in all web scripts

This section looks at some of the more commonly used root objects that are available to web scripts regardless of the context in which they run.

|Root Object|Type in Script Runtime|Description|
|-----------|----------------------|-----------|
|`args`|Associative array|A map of query parameter values indexed by query parameter name. This is only available if the script was executed using the Script Servlet.|
|`argsM`|Associative array|A map of multi-valued query parameters, where each key is an argument name and each value is an array containing all respective argument values, even if only one is supplied.|
|`atom`|Object|A host object for parsing and generating Atom \(Publishing\) documents.|
|`cache`|`org.springframework.extensions.webscripts.Cache`|The `cache` object allows control over how the web script response is cached.|
|`config`|XML configuration data from a file|Provides access to the web script configuration read from an XML file.|
|`date`|java.util.Date|The date and time the web script was invoked.|
|`format`|`org.springframework.extensions.webscripts.FormatModel`|The `format` object represents the chosen format of the rendered response.|
|`formdata`|Object|Encapsulates data submitted via a form. See `formdata` documentation.|
|`guest`|Boolean|A simple boolean value indicating whether the current is a guest user or not.|
|`json`|JSONArray or JSONObject|A host object for parsing and generating JSON objects POSTed to the web script.|
|`jsonUtils`|Object|A host object for parsing and generating JSON objects.|
|`headers`|Associative array|A map of request header values indexed by header name.|
|`headersM`|Associative array|A map of multi-valued request headers, where each key is a header name and each value is an array containing all respective header values, even if only one is supplied.|
|`logger`|Object|A host object providing access to console logging facilities for debugging of scripts. See the [Logging API](API-JS-Logging.md).|
|`model`|Associative array|An empty associative array which may be populated by the JavaScript. Values placed into this array are available as root objects in Web Script response templates.|
|`msg`|Object|Provides access to the localized messages associated with a web script.|
|`requestbody`|Object|A ScriptContent representing the content of the request body.

 As with formdata, the content may be converted to a string \(if plausible\) or written to an output stream such as a content object held in the Alfresco Repository.

 Often, content is posted in a structured form such as XML or JSON. In these cases, the content can be converted to a string and subsequently parsed by the controller script. However, this can become cumbersome or error prone if the parsing is required by several Web Scripts implementations. To alleviate this problem, the Web Scripts framework provides the notion of a Format Reader which parses a request of a given mimetype into an object structure that is then automatically provided to the Controller Script.

 Out-of-the-box, the Web Script framework provides the following Format Readers.

 -   **JSON**

Parses a request of mimetype application/json into a JSON object named `json`.

-   **Atom Feed**

Parses a request of mimetype application/atom+xml;type=feed into an Apache Abdera Feed object named feed.

-   **Atom Entry**

Parses a request of mimetype application/atom+xml;type=entry into an Apache Abdera Entry object named entry.

-   **Atom**

Parses a request of mimetype application/atom+xml into either an Abdera Feed or Entry object named feed and entry respectively.


 Format Readers are not invoked automatically i.e. sending a JSON request to a Web Script does not automatically provide a json root object to the Controller Script. The fall-back requestbody is provided instead.

 To explicitly initiate a Format Reader requires a Controller Script whose name is structured:

 ```


<serviceId>.<httpMethod>.<format>.js

            
```

 For example:

 ```
 

folder.post.json.js  => create 'json' root object for Controller Script when application/json mimetype is posted
folder.post.atomentry.js  => create 'entry' root object for Controller Script when application/atom+xml;type=entry mimetype is posted

            
```

|
|`server`|`org.alfresco.repo.web.scripts.RepositoryServerModel`|A description of the web script container hosting the web script.|
|`status`|`org.springframework.extensions.webscripts.Status`|The `status` object represents a response status.|
|`url`|`org.springframework.extensions.webscripts.DefaultURLModel`|Provides access to the web script URI, or parts of the URI, that triggered the web script.|
|`webscript`|`org.springframework.extensions.webscripts.DescriptionImpl`|The `webscript` object provides metadata describing the web script currently being executed.|

**Note:** A full list of root objects is available in the [root objects section of the JavaScript API Reference](API-JS-rootscoped.md).

**Parent topic:**[Web script reference](../concepts/dev-ws-reference.md)

