# Master/Slave differences of the admin endpoints

The table shows the differences of the admin endpoints.

|Action|Master|Slave|
|------|------|-----|
|check|Returns an empty response from Solr (only the response header) without an error message.

|Same as master.

|
|nodereport\*|Full node report response is returned.

|Minimal node report response including a warning message that alerts you about the slave nature of the receiver (i.e. "This response comes from a slave core and it contains minimal information").

|
|aclreport\*|Full acl report response is returned.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|txreport|Full Tx report response is returned.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|acltxreport\*|Full response is returned.|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|rangecheck|Full RangeCheck response (only if the core is using `DBID_RANGE` routing).

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|expand|Full Expand response (only if the core is using `DBID_RANGE` routing).

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|report|Full core report.

|A response with a warning message that will alert you that the action is not available on slave nodes.

|
|purge, reindex, retry, index, fix|Action correctly executed.

|No action taken. Empty response returned.

|
|summary\*|Master/Standalone node summary.

|Slave node summary (minimal, compared with master).

|
|new core/new index|No difference between master and slave.

|No difference between master and slave.

|
|updatecore/updateindex|No difference between master and slave.|No difference between master and slave.

|
|updateshared|No difference between master and slave.|No difference between master and slave.

|
|removecore|No difference between master and slave.|No difference between master and slave.

|
|newdefaultindex/newdefaultcore|No difference between master and slave.|No difference between master and slave.

|
|log4j|No difference between master and slave.|No difference between master and slave.

|

> **Note:** \* If the `core` or `coreName` parameter is missing the response will return the report for each registered core.

**Parent topic:**[Synchronous Actions](../concepts/solr-admin-sync-actions.md)

