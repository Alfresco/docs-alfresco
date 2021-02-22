# Logging back-end metrics

The application uses SLF4J bounded to Log4j. The log4j.properties configuration file can be found in the WEB-INF/classes folder of the WAR file.

See [SLF4J](http://www.slf4j.org/) and [Log4j](http://logging.apache.org/log4j/) for more information.

For all REST API endpoints available in the application, metrics are gathered about run-time performance. These statistics can be written to the log.

|Property

|Description

|Default

|
|metrics.console.reporter.enabled

|Boolean value. If true, the REST API endpoint statistics will be logged.

|false

|
|metrics.console.reporter.interval

|The interval of logging in seconds. Do note that these logs are quite large, so this should not be set to be too frequent.

|60

|

Note that the statistics are based on the run-time timings since the last start up. When the server goes down, the metrics are lost.

Example output for one REST API endpoint:

```
com.activiti.runtime.rest.TaskQueryResource.listTasks
  count = 4
  mean rate = 0.03 calls/second
  1-minute rate = 0.03 calls/second
  5-minute rate = 0.01 calls/second
  15-minute rate = 0.00 calls/second
  min = 5.28 milliseconds
  max = 186.55 milliseconds
  mean = 50.74 milliseconds
  stddev = 90.54 milliseconds
  median = 5.57 milliseconds
  75% <= 141.34 milliseconds
  95% <= 186.55 milliseconds
  98% <= 186.55 milliseconds
  99% <= 186.55 milliseconds
  99.9% <= 186.55 milliseconds
```

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

