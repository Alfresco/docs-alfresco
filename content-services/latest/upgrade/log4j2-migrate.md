---
title: Log4j2 Migration Guide
---

This guide serves as a compendium of best practices and tips on how to migrate from Log4j 1.x to Log4j 2.x, in the context of Alfresco Content Services (ACS) and in-process extensions such as custom Alfresco Module Packages (AMPs).

## Dependencies

In the context of in-process extensions (for example custom AMPs), it is important that the proper logging dependencies are transitively available via inheritance from the appropriate Alfresco Repository version. It is also ideal to exclude any and all Log4j 1.x / Reload4j dependencies that may be inherited either directly or transitively from any dependency within your project.

Some of the libraries that should be available for logging purposes are:

* `org.apache.logging.log4j:log4j-api`
* `org.apache.logging.log4j:log4j-core`
* `org.apache.logging.log4j:log4j-slf4j2-impl`

Some of the libraries that should not be included instead are:

* `log4j:log4j`
* `ch.qos.reload4j:reload4j`
* `org.slf4j:slf4j-log4j12`
* `org.slf4j:slf4j-reload4j`

Note that these lists are subject to change over time. They're also not fully comprehensive but just serve as an example.

## Code impacts

The migration's impact on the actual codebase should be fairly small, assuming best practices have been followed and the underlying logging framework is properly abstracted, for example, via Simple Logging Facade for Java (Slf4j) APIs.

### Logger declaration

This section is only useful in case best practices have not been followed, and the loggers have been instantiated directly rather than through a facade such as the one offered by Slf4j. This would then be the best time to actually adapt the codebase to best practices.

**Before (Log4j 1.x)**

```java
import org.apache.log4j.Logger;
...
private static final Logger LOGGER = Logger.getLogger(MyClass.class);
```

**After (Log4j 2.x + Slf4j API)**

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
...
private static final Logger LOGGER = LoggerFactory.getLogger(MyClass.class);
```

### Framework extension

It is fairly common, especially for test purposes, to extend the underlying logging framework by implementing custom logging components (such as Appenders) that better serve our purposes. The extension process has changed significantly since Log4j 1.x, relying on different abstractions and offering an annotation-based approach.

See the official Log4j 2.x documentation, [Extending Log4j](https://logging.apache.org/log4j/2.x/manual/extending.html){:target="_blank"}, for more details on how to proceed.

### Nested Diagnostic Context

The Log4j 1.x Nested Diagnostic Context (NDC) is still available in Log4j 2.x, but it's accessible through a different API (`ThreadContext`) and it's conceptually mapped to the newer Thread Context Stack. If you were relying on the NDC to store thread-based data, you should now adapt your code to use the `ThreadContext` calls instead, as explained in the official Log4j 2.x documentation, [Thread Context](https://logging.apache.org/log4j/2.x/manual/thread-context.html){:target="_blank"}.

## Deployment impacts

### Tomcat + Java Security Manager

If the Java Security Manager is enabled within Tomcat, you may need to grant more permissions to applications that rely on Log4j 2.x. An example application bundled within Content Services which requires additional permissions is `_vti_bin` (included in Alfresco Office Services). To avoid any `AccessControlException` related to Log4j 2.x operations, the `catalina.policy` file can be extended to allow the required permissions.

Example for the `_vti_bin` web app:

```java
grant codeBase "file:${catalina.base}/webapps/_vti_bin/-" {
    permission java.security.AllPermission;
};
```

## Configuration

There are substantial differences in the configuration syntax between Log4j 1.x and 2.x. Here are some basic examples showcasing some of these differences. For more detailed information, see the official Log4j 2.x documentation:

* [Migrating from Log4j 1.x to 2.x](https://logging.apache.org/log4j/2.x/manual/migration.html){:target="_blank"}
* [Log4j 2.x configuration guide](https://logging.apache.org/log4j/2.x/manual/configuration.html){:target="_blank"}

> **Note:** When trying to configure Log4j 2.x the `log4j.properties` file serves no purpose anymore, and is replaced by the `log4j2.properties` file instead.

### Root logger definition

**Before (Log4j 1.x)**

```bash
# Set root logger level to error and attach two appenders (console + rolling file)
log4j.rootLogger=error, Console, File
```

**After (Log4j 2.x)**

```bash
rootLogger.level=error
rootLogger.appenderRef.stdout.ref=ConsoleAppender
rootLogger.appenderRef.rolling.ref=RollingAppender
```

### Appender definition

**Before (Log4j 1.x)**

```bash
###### Console appender definition #######
log4j.appender.Console=org.apache.log4j.ConsoleAppender
log4j.appender.Console.layout=org.alfresco.util.log.log4j.SanitizingPatternLayout
log4j.appender.Console.layout.ConversionPattern=%d{ISO8601} %x %-5p [%c{3}] [%t] %m%n

###### File appender definition (daily rolling file) #######
log4j.appender.File=org.apache.log4j.DailyRollingFileAppender
log4j.appender.File.File=alfresco.log
log4j.appender.File.Append=true
log4j.appender.File.DatePattern='.'yyyy-MM-dd
log4j.appender.File.layout=org.alfresco.util.log.log4j.SanitizingPatternLayout
log4j.appender.File.layout.ConversionPattern=%d{yyyy-MM-dd} %d{ABSOLUTE} %-5p [%c] [%t] %m%n
```

**After (Log4j 2.x)**

```bash
###### Console appender definition #######
appender.console.type=Console
appender.console.name=ConsoleAppender
appender.console.layout.type=PatternLayout
{%raw%}appender.console.layout.pattern=%d{ISO8601} %x %-5p [%c{3}] [%t] %replace{%m}{[\r\n]+}{}%n {%endraw%}

###### File appender definition (daily rolling file) #######
appender.rolling.type=RollingFile
appender.rolling.name=RollingAppender
appender.rolling.fileName=alfresco.log
appender.rolling.filePattern=alfresco.log.%d{yyyy-MM-dd}
appender.rolling.layout.type=PatternLayout
{%raw%}appender.rolling.layout.pattern=%d{yyyy-MM-dd} %d{ABSOLUTE} %-5p [%c] [%t] %replace{%m}{[\r\n]+}{}%n {%endraw%}
appender.rolling.policies.type=Policies
appender.rolling.policies.time.type=TimeBasedTriggeringPolicy
appender.rolling.policies.time.interval=1
```

### Logger definition

**Before (Log4j 1.x)**

```bash
# Set the logger for the org.springframework package to WARN
log4j.logger.org.springframework=warn
```

**After (Log4j 2.x)**

```bash
logger.springframework.name=org.springframework
logger.springframework.level=warn
```

### Configuration augmentation/override

The Log4j configuration augmentation and override mechanism provided by Content Services still works in the same way, guaranteeing that additional log4j properties files with the appropriate suffix will be imported as augmentations/overrides of the original `log4j2.properties` configuration file.

> **Note:** The suffix has changed from `-log4j.properties` to `-log4j2.properties`. Therefore, an additional configuration file named, for example `custom-log4j.properties` has to be migrated to use the Log4j 2.x syntax, and finally be renamed to `custom-log4j2.properties` instead so it's picked up by the augmentation/override mechanism.

## SanitizingPatternLayout

`SanitizingPatternLayout` is a class provided by the `alfresco-log-sanitizer` library, which serves as an extension to the Log4j 1.x `PatternLayout` to harden Content Services against [CWE-117: Improper Output Neutralization for Logs](https://cwe.mitre.org/data/definitions/117.html){:target="_blank"}.

This implementation, being specific to Log4j 1.x, serves no purpose anymore and won't be packaged in Content Services 7.4.0.

Log4j 2.x offers regex replacement functionalities for logs out of the box, guaranteeing that Content Services is hardened against CWE-117 without needing any custom implementations, but just relying on the `%replace` layout parameter instead.

### Configuration example

**Before (Log4j 1.x)**

```bash
log4j.appender.Console.layout=org.alfresco.util.log.log4j.SanitizingPatternLayout
log4j.appender.Console.layout.ConversionPattern=%d{ISO8601} %x %-5p [%c{3}] [%t] %m%n
```

**After (Log4j 2.x)**

```bash
appender.console.layout.type=PatternLayout
{%raw%}appender.console.layout.pattern=%d{ISO8601} %x %-5p [%c{3}] [%t] %replace{%m}{[\r\n]+}{}%n {%endraw%}
```

Notice the usage of the {%raw%}`%replace{%m}{[\r\n]+}{}`{%endraw%} layout parameter to make sure logs are properly sanitized.

## JMX Management

### Configuring loggers at runtime via JMX

The `Alfresco:Name=Log4jHierarchy` JMX bean has now been replaced by `Alfresco:Name=Log4jManagement`. This new implementation does not expose APIs to change the logger thresholds at runtime since it is unnecessary.

The very same operation should now be performed instead via the native Log4j 2.x `org.apache.logging.log4j2:type=<LogContextName>,component=Loggers` beans instead (note that the `<LogContextName>` is not a fixed value).

The `Loggers` component contains a dynamic list of beans that allow the reconfiguration of loggers at runtime by editing their attributes:

| Attribute name | Example value |
| -------------- | ------------- |
| Level | `WARN` |
| Additive | `true` |

### Adding new loggers at runtime via JMX

If you were relying on the `Alfresco:Name=Log4jHierarchy` JMX bean to add new loggers at runtime, you can now use the `Alfresco:Name=Log4jManagement` bean to perform the same operation.

The `Alfresco:Name=Log4jManagement` bean exposes an `addLoggerMBean` operation which requires the package or class name of the desired logger as input. Once the logger is successfully added, a new JMX bean will be registered under `org.apache.logging.log4j2:type=<LogContextName>,component=Loggers`. This additional bean will be of type `LoggerConfigAdminMBean` - it should match the name of the desired package/class name, and it can be reconfigured at runtime as described in the section above.

> **Note:** If you have multiple `org.apache.logging.log4j2:type=<LogContextName>,component=Loggers` components with different `<LogContextName>` values, you can identify the correct one to refer to by checking the value of the `Alfresco:Name=Log4jManagement` read-only attribute named `LogContextName`. The value of `LogContextName` should match.

### Alfresco JMX logger and Alfresco log settings

It's important to note that there are no changes related to the tailing of the logs via JMX (`jmxlogger:type=LogEmitterAlfresco`), the library that was used for this purpose has been adapted and extended to work with Log4j 2.x instead, guaranteeing full compatibility and exposing the very same JMX APIs to interact with the underlying logging library.

This also guarantees that the **Admin Console** > **Log Settings** UI works as it used to.

## Exporting logs in JSON format

Log4j 2.x makes it possible to natively output logs in JSON format, without the need for additional plugins.

### Example configuration

Here is a basic configuration example for outputting logs in JSON format. The presented configuration stores logs in a daily rolling file named `alfresco.json`, with each log statement being represented as an individually valid JSON fragment presented in a single line and separated from the next by a new line.

For more fine-grained control over the desired output, see the official Log4j 2.x documentation, [JSON Layout](https://logging.apache.org/log4j/2.x/manual/layouts.html#JSONLayout){:target="_blank"}. This offers an exhaustive explanation about all the properties specific to the JSON Layout that can be configured.

```bash
rootLogger.level=error
rootLogger.appenderRef.json.ref=JsonAppender

###### Daily JSON rolling file appender definition #######
appender.json.type=RollingFile
appender.json.name=JsonAppender
appender.json.fileName=alfresco.json
appender.json.filePattern=alfresco.json.%d{yyyy-MM-dd}
appender.json.layout.type=JsonLayout
appender.json.layout.eventEol=true
appender.json.layout.compact=true
appender.json.policies.type=Policies
appender.json.policies.time.type=TimeBasedTriggeringPolicy
appender.json.policies.time.interval=1
```

### Example output

Given the configuration above, the `alfresco.json` file would look similar to the following:

```text
{"instant":{"epochSecond":1669033790,"nanoOfSecond":415261100},"thread":"localhost-startStop-1","level":"INFO","loggerName":"org.springframework.extensions.webscripts.DeclarativeRegistry","message":"Registered 0 Schema Description Documents (+0 failed) ","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":129,"threadPriority":5}
{"instant":{"epochSecond":1669033790,"nanoOfSecond":420403300},"thread":"localhost-startStop-1","level":"INFO","loggerName":"org.springframework.extensions.webscripts.AbstractRuntimeContainer","message":"Initialised Public Api Web Script Container (in 2563.5293ms)","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":129,"threadPriority":5}
{"instant":{"epochSecond":1669033790,"nanoOfSecond":475128400},"thread":"asynchronouslyRefreshedCacheThreadPool1","level":"INFO","loggerName":"org.springframework.extensions.webscripts.DeclarativeRegistry","message":"Registered 14 Web Scripts (+0 failed), 103 URLs","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":133,"threadPriority":5}
{"instant":{"epochSecond":1669033790,"nanoOfSecond":475128400},"thread":"asynchronouslyRefreshedCacheThreadPool1","level":"INFO","loggerName":"org.springframework.extensions.webscripts.DeclarativeRegistry","message":"Registered 0 Package Description Documents (+0 failed) ","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":133,"threadPriority":5}
{"instant":{"epochSecond":1669033790,"nanoOfSecond":476132900},"thread":"asynchronouslyRefreshedCacheThreadPool1","level":"INFO","loggerName":"org.springframework.extensions.webscripts.DeclarativeRegistry","message":"Registered 0 Schema Description Documents (+0 failed) ","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":133,"threadPriority":5}
{"instant":{"epochSecond":1669033819,"nanoOfSecond":711004700},"thread":"http-bio-8080-exec-1","level":"INFO","loggerName":"org.alfresco.repo.management.subsystems.ChildApplicationContextFactory","message":"Starting 'Search' subsystem, ID: [Search, managed, solr6]","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":318,"threadPriority":5}
{"instant":{"epochSecond":1669033820,"nanoOfSecond":425889600},"thread":"http-bio-8080-exec-1","level":"INFO","loggerName":"org.alfresco.repo.management.subsystems.ChildApplicationContextFactory","message":"Startup of 'Search' subsystem, ID: [Search, managed, solr6] complete","endOfBatch":false,"loggerFqcn":"org.apache.commons.logging.impl.SLF4JLocationAwareLog","threadId":318,"threadPriority":5}
...
```
