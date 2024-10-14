---
title: Logging
---

Federation Services logging allows you to access and set the log levels of all Federation Services classes.

## Accessing and Updating the Logging File

Federation Services logging is set in the following file:

```text
[Federation Services folder]/WEB-INF/classes/log4j.properties
```

You can set the log level of all Federation Services classes by changing the following:

```text
log4j.logger.com.simflofy = debug, 3sixty-admin
```

Replace debug with another valid options:

| Level | Description |
| ----- | ----------- |
| ALL | All levels including custom levels. |
| DEBUG | Designates fine-grained informational events that are most useful to debug an application. |
| ERROR | Designates error events that might still allow the application to continue running. |
| FATAL | Designates very severe error events that will presumably lead the application to abort. |
| INFO | Designates informational messages that highlight the progress of the application at coarse-grained level. |
| OFF | The highest possible rank and is intended to turn off logging. |
| TRACE | Designates finer-grained informational events than the DEBUG. |
| WARN | Designates potentially harmful situations. |
  
In production, Federation Services suggests setting logging to the `ERROR` level.

You'll notice there are other entries. These entries will override the `com.simflofy` setting for the specific packages they reference.

For example, this sets the SharePoint connector logging to `TRACE`. The second line is necessary to prevent double-logging:

```text
log4j.logger.com.simflofy.connectors.sharepoint = trace, 3sixty-admin
log4j.additivity.com.simflofy.connectors.sharepoint = false
```

### Federation Services Admin Log View

To get a basic view of the log file, the Logging page can be found under the Admin Menu

This page uses the global property `simflofy.admin.log.path`, with a default value of `${catalina.base}/logs/3sixty-admin.log`.

To modify this value edit `simflofy-global.properties` in the `3sixty-admin/WEB-INF/classes` directory, for example:

```text
simflofy.admin.log.path=/my/log/directory/logs/3sixty-admin.log
```

On this page the user can download the complete 3sixty-admin.log, as well as filter the last 5000 lines of the log file:

| Level | Logs |
| ----- | ---- |
| Info | Info, Error |
| Debug | Info, Error, Debug |
| Trace | All |
| Error | Error only |
  
You can also set the value `simflofy.max.log.size` to prevent performance issues. Defaults to `10 MB`. KB and GB are also valid sizes.

## Log Levels

On the **Log Levels** page you can add or remove [log appenders](https://dzone.com/articles/log-appender-what-is-it-and-why-would-you-use-it){:target="_blank"}. Both of which are temporary. There is a list of all available connectors if you wish to modify the logging level for an individual connector.
