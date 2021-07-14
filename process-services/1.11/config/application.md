---
title: Application configuration
---

There are several configuration options for application, process and task management.

## Application access

It is possible to configure whether users get access to the model editors (the **App Designer** application) and the analytics application.

Access to the default application is configured through *capabilities*. In the admin UI, it is possible to create *system groups*. These groups have a set of capabilities. All users part of that group have those capabilities.

The following settings configure app access when a new user is created in the system (manual or through LDAP sync). To enable access, set the property `app.[APP-NAME].default.enabled` to `true`. If `true`, a newly created user will be given access to this app.

The access is configured by adding the user to a group with a certain capability that enabled the app. The name of that group can be configured using the `app.[APP-NAME].default.capabilities.group` property. If this property is set, and the `app.[APP-NAME].default.enabled property` is set to `true`, the group with this name will be used to add the user to and provide access to the app. If the group does not exist, it is created. If the property is commented, and `app.[APP-NAME].default.enabled property`, a default name is used.

Current possible app names: `{ analytics | kickstart }`

|Property|Default|
|--------|-------|
|app.analytics.default.enabled|`true`|
|app.analytics.default.capabilities.group|`analytics-users`|
|app.kickstart.default.enabled|`true`|
|app.kickstart.default.capabilities.group|`kickstart-users`|

The following setting, if set to `true`, will create a default example app with some simple review and approve 
processes for every newly created user.

|Property|Default|
|--------|-------|
|app.review-workflows.enabled|`false`|

## User creation

When the application starts for the first time, it will verify that there is at least one user in the system. If not, a user with superuser rights will be created.

The default user ID to sign in with is `admin@app.activiti.com` using password `admin`. 

>**Important**: This should be changed after signing in for the first time.

The initial user details can be modified (must be done `before` first start up) with following properties:

|Property|Description|
|--------|-----------|
|admin.email|The email address used to create the first user, which also acts as the sign in identifier.|
|admin.group|Capabilities in Process Services are managed by adding users into certain groups. The first user will have all capabilities enabled. This property defines the name of the group to which the first user will be added. By default it is `Superusers`.|

## Login session

It is possible to invalidate the current Process Services app login session when you close the web browser. By default, closing the web browser will maintain the session cookie and will keep the current login session open.

To invalidate the login session, do the following:

1. Open the `<InstallLocation>/tomcat/lib/activiti-app.properties` file.

2. Locate and set `security.use-http-session` to true.

    ```text
    security.use-http-session=true
    ```

    Set this property to `false` if you do not wish to enable this behavior.

## Process definition cache

The Process Engine operates in a stateless way. However, there is data that will never change, which makes it a prime candidate for caching.

A process definition is an example of such *static data*. When you deploy a BPMN 2.0 XML file to the Process Engine, the engine parses it to something it can execute, and stores the XML and some data, such as the description, business key, in the database. Such a process definition will never change. Once it’s in the database, the stored data will remain the same until the process definition is deleted.

On top of that, parsing a BPMN 2.0 XML to something executable is quite a costly operation compared with other engine operations. This is why the Process Engine internally uses a process definition cache to store the parsed version of the BPMN 2.0 XML.

![activiti-proc-def-cache]({% link process-services/images/activiti-proc-def-cache.png %})

In a multi-node setup, each node will have a cache of process definitions. When a node goes down and comes up, it will rebuild the cache as it handles process instances, tasks. and so on.

The process definition cache size can be set by the following property:

|Property|Description|
|--------|-----------|
|activiti.process-definitions.cache.max|The number of process definitions kept in memory. When the system needs to cope with many process definitions concurrently, it is advised to make this value higher than the default. The default value is `128`. |

## Validator configuration

By default, Process Services is configured in a way that process modelers have access to all powerful features of the Process Engine. In many organizations this is not a problem, as the people who are modeling are trusted IT people or business analysts.

However, some organizations may expose the modeling tools of Process Services directly to all end users giving them access to the full array of its capabilities. In such a scenario, some users may gather sensitive data or swamp the resources of the servers. Therefore, various *validators* are introduced that can be enabled or disabled, when required. These validators are run before a process model is deployed to the engine and will block deployment in case of a validation error.

### Disable tasks

The following validators disable the usage of certain tasks. The various validators are configured through the regular Process Services properties. The default value for these validators is `false`. Set the property to `true` to enable the validator.

* `validator.editor.bpmn.disable.startevent.timer|signal|message|error`: Disables the usage of the timer, signal, message or error start event in a process definition.
* `validator.editor.bpmn.disable.scripttask`: Disables the usage of the *script task* in a process definition. Disabling script tasks is typically something you’ll want to do when exposing the modeling tools to end users. Scripts, contrary to the service tasks, don’t need any class on the classpath to be executed. As such, it’s very easy with scripts to execute code with bad intentions.
* `validator.editor.bpmn.disable.servicetask`: Disables the usage of the *service task* in a process definition. Service tasks are used to call custom logic when the process instance executes the service task. A service task is configured to either use a class that needs to be put on the classpath or an expression. This setting disables the usage of service tasks completely.
* `validator.editor.bpmn.disable.executionlistener`: Disables the possibility to define execution listeners in a BPMN process definition. Execution listeners allow to add custom logic to the process diagram that is not visible in the diagram. This setting also disables task listeners on tasks.
* `validator.editor.bpmn.disable.mailtask`: Disables the *mail task* that is used for sending emails.
* `validator.editor.bpmn.disable.intermediatethrowevent`: Disables the usage of all intermediate throw events: none, signal, message, error. They can be used to create infinite loops in processes.
* `validator.editor.bpmn.disable.manualtask`: Disables the usage of the *manual task* task in a process definition.
* `validator.editor.bpmn.disable.businessruletask`: Disables the usage of the *business rule task* in a process definition.
* `validator.editor.bpmn.disable.cameltask`: Disables the usage of the *Camel task* in a process definition. Camel tasks can interact with Apache Camel for various system integrations and have, like regular `JavaDelegate` classes access to the whole engine.
* `validator.editor.bpmn.disable.muletask`: Disables the usage of the *Mule task* in a process definition. Mule tasks are used to interact with a Mule server.

### Limit functionality

The following validators don’t disable a task as a whole, but rather a feature:

* `validator.editor.bpmn.disable.startevent.timecycle`: Allows the usage of a timer start event, but not with a *timeCycle* attribute, as it could be used to create process instances or tasks for many people very quickly, or simply to stress the system resources.
* `validator.editor.bpmn.limit.servicetask.only-class`: Limits the service task to only be configured with a class attribute (so no expression or delegate expression is allowed). Since the available classes are restricted by what is on the classpath, there is a strict control over which logic is exposed.
* `validator.editor.bpmn.limit.usertask.assignment.only-idm`: Limits the user task assignment to only the values that can be selected using the *Identity Store* option in the assignment pop-up. The reasoning to do this, is that this is the only way *safe* values can be selected. Otherwise, by allowing fixed values like expression, a random bean could be invoked or used to get system information.
* `validator.editor.bpmn.disable.loopback`: Disables looping back with a sequence flow from an element to itself. If enabled, it is possible this way to create infinite loops (if not applied correctly).
* `validator.editor.bpmn.limit.multiinstance.loop`: Limits the loop functionality of a multi-instance: only a loop cardinality between 1 and 10 is allowed and a collection nor completion condition is allowed. So basically, only very simple loops are permitted. Currently applied to call activities, sub processes and service tasks.
* `validator.editor.dmn.expression`: Validates the expressions in the decision tables to be correct according to the DMN specification. **By default this is `true` (unlike the others!)**. This means that by default, the DMN decision tables are checked for correctness. If using the structured expression editor to fill in the decision tables, the resulting expressions will be valid. However,if you want to type any MVEL expressions, this property needs to be set
to `false`.

## Log back-end metrics

The application uses SLF4J bounded to Log4j. The `log4j.properties` configuration file can be found in the `WEB-INF/classes` folder of the WAR file.

See [SLF4J](http://www.slf4j.org/){:target="_blank"} and [Log4j](http://logging.apache.org/log4j/)(:target="_blank") for more information.

For all REST API endpoints available in the application, metrics are gathered about run-time performance. These statistics can be written to the log.

|Property|Description|
|--------|-----------|
|metrics.console.reporter.enabled|Boolean value. If `true`, the REST API endpoint statistics will be logged. The default value is `false`. |
|metrics.console.reporter.interval|The interval of logging in seconds. Do note that these logs are quite large, so this should not be set to be too frequent. The default value is `60`. |

>**Note** that the statistics are based on the run-time timings since the last start up. When the server goes down, the metrics are lost.

Example output for one REST API endpoint:

```text
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

## Business calendar

The business calendar is used to calculate relative due dates for tasks. To exclude weekends when calculating a task’s 
relative due date, set the `calendar.weekends` property as follows:

```text
# Weekend days comma separated (day's first 3 letters in capital)
calendar.weekends=SAT,SUN
```

## Group manager involvement

When a task is created that has one or more candidate groups assigned, the group managers for those groups will be automatically involved with the created task. To stop group managers from being involved, set the following property to `false`.

|Property|Default|
|--------|-------|
|app.runtime.groupTasks.involveGroupManager.enabled|`true`|

>**Note:** Users that do not have a primary group defined may not have a group manager. To define the primary group, go to **Identity Management > Users > Select an action > Change primary group**.

## Process and task query lists

Process Services provides REST API operations that allow you to query tasks, process instances, historic tasks and historic process instances. You can also request to include task and process variables by using the parameters `includeTaskLocalVariables` and `includeProcessVariables` and setting their values to `true`. When executing REST API calls that include these variables, the result sets could be quite large and you may wish to limit or control the list size provided in the response. The following table shows the properties you can set in the `activiti-app.properties` file to configure this.

|Property|Description|
|--------|-----------|
|query.task.limit|Limits the number of tasks returned from the query `GET /runtime/tasks`.|
|query.execution.limit|Limits the number of process instances returned from the query `GET /runtime/process-instances`.|
|query.historic.task.limit|Limits the number of historic tasks returned from the query `POST /enterprise/historic-tasks/query`.|
|query.historic.process.limit|Limits the number of historic process instances returned from the query `POST /enterprise/historic-process-instances/query`.|

>**Note:**
>
>* You cannot specify the `includeTaskLocalVariables` parameter when using the process and historic process query operations. This is only available for `GET /runtime/tasks` and `POST /enterprise/historic-tasks/query`. You can use the `includeProcessVariables` parameter for all queries specified in the table and apply the corresponding property configuration.
>* If the property configuration for a query limit is not enabled in `activiti-app.properties`, the default limit for the number of instances returned is `20000`.
>* If you omit the `includeTaskLocalVariables` and `includeProcessVariables` parameters or set them to `false`, the request excludes the variables from the response and does not apply the query limit configurations.
>* Setting higher limits for the process or task query properties results in more records fetched from the database. This is likely to mean that you experience slower REST API response times.

## Languages

The Process Services interface is supported for use with a number of languages that have been through a 
quality assurance (QA) and linguistic testing cycle.

Process Services is supported with the following languages:

* US English
* Swedish
* Spanish
* French
* Italian
* Japanese
* Norwegian Bokmå
* Dutch
* Brazilian Portuguese
* Russian
* Simplified Chinese

To change the display language for Process Services, configure the appropriate language in your browser settings.
