# Embedded Setup

This is the default configuration. The following properties need to be set when using Elasticsearch in an embedded setup:

|Property

|Description

|Default

|
|`elastic-search.server.type`|**embedded**|`embedded`|
|`elastic-search.data.path`|Defines where Elasticsearch will store its data on disk. `$user_home$` can be used in the path. Make sure the application or application server has the right privileges to write to this path. To back up the Elasticsearch data easily, simply backup the content of this folder.|`$user_home$/activiti-elastic-search-data`|

**Note:** Booting up multiple Alfresco Process Services instances with Elasticsearch configured in embedded mode will not cluster. To enable Out-of-the-box clustering, set the `elastic-search.discovery.type` to the required type and configure it appropriately.

**Parent topic:**[Elasticsearch configuration settings](../topics/general_settings.md)

