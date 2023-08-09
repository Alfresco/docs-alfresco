---
title: Upgrade Process Services
---

You can upgrade from earlier versions of Process Services.

> **Note:** Before upgrading, you should back up your database and properties files, such as `activiti-app.properties`.

There are two methods for upgrading:

* Using the Process Services setup wizard
* Manually

> **Important:** If you integrate Process Services with Alfresco Content Services then be aware that from version 1.11 only repositories on version 5.2 and later are supported. Upgrade to a later version of Alfresco Content Services before updating Process Services to continue using this functionality.

## Upgrade using a setup wizard

You can use the Process Services setup wizard to upgrade to the latest version. The process is similar to [installing for the first time]({% link process-services/2.3/install/manual.md %}#install-using-setup-wizards).

Follow these steps to upgrade:

1. Double-click the Process Services setup wizard.
2. Follow the instructions to install the latest version of Process Services.
3. After the installation is complete, copy the `activiti.lic` file to the Process Services installation directory: `<Install>/tomcat/lib` folder.

Alternatively, copy the license to your home directory using the terminal (OSX) or command prompt (Windows):

```bash
~/.activiti/enterprise-license/
```

```bash
C:\.activiti\enterprise-license
```

>**Tip**: You can also upload a [license]({% link process-services/2.3/install/manual.md %}#license) from the user interface.

## Upgrade manually

You can upgrade using the WAR file in your application server distribution. These instructions use the WAR file from the Apache Tomcat based distribution, however you can choose from different distributions for various application servers.

Review the [Supported Stacks]({% link process-services/2.3/support/index.md %}) list to see what’s supported.

Follow these steps to upgrade using the War file:

1. Stop the web server running the application.
2. Deploy the new WAR file in your web server by placing it in the `/webapps` folder in Tomcat.
3. Boot up the web server and start Process Services to check if it’s working as expected.

Any database upgrade changes should have now been applied.

## Upgrading from 1.x to 2.x

When you upgrade from Process Services 1.x to 2.x you are upgrading from Activiti 5.x to 7.x. There are breaking changes that you need to be aware of in order for your system to function correctly after you have upgraded.

> **Note:** You do not need to migrate your database when upgrading from 1.x to 2.x.

1. Navigate to [Hyland Community](https://community.hyland.com/){:target="_blank"} and download the latest Process Services installation file.  

2. In your 1.x installation you must ensure you set `activiti5.migration.enabled=true` and `activiti.engine5.enabled=true` in the `activiti-app.properties` file before migrating to Process Services 2.x.

    Setting the properties to `True` converts non-asynchronous processes to Activiti 7.x.

3. Upgrade to the latest version of Process Services using the installation file.

4. Once all in flight Process Services 1.x processes are complete you must set `activiti5.migration.enabled=false` and `activiti.engine5.enabled=false` in the `activiti-app.properties` file.

All process definitions that are Async/Timer will still be using Activiti 5.x but all other processes, including non-asynchronous processes, will be running on Activiti 7.x. This means your business operations can resume and any new processes will run on Activiti 7.x.
If you want to run the Process Services 2.3.6 installation again you must set `activiti5.migration.enabled=false` to ensure future applications restart.
Once all Process Services 1.x asynchronous processes are complete you must disable the Activiti 5.x engine by setting `activiti.engine5.enabled=false` in the `activiti-app.properties` file.

### Alfresco Process Services breaking changes

#### PVM classes

All classes from the `org.activiti.engine.impl.pvm` package and subpackages have been removed. This is because the `_PVM_` (Process Virtual Machine) model has been removed and replaced by a simpler and more lightweight model.
This means that `ActivitiImpl`, `ProcessDefinitionImpl`, `ExecutionImpl`, `TransitionImpl` are invalid.

Generally, most of the usage of these classes in version 5 came down to getting information that was contained in the process definition. In version 6, all the process definition information can be found through the _BpmnModel_, which is a Java representation of the BPMN 2.0 XML for the process definition (enhanced to make certain operations and searches easier).

The quickest way to get the `BpmnModel` for a process definition is to use the `org.activiti.engine.impl.util.ProcessDefinitionUtil` class:

```java
// The whole model
ProcessDefinitionUtil.getBpmnModel(String processDefinitionId);
// Only the specific process definition
ProcessDefinitionUtil.getProcess(String processDefinitionId);
```

#### ActivityExecution is replaced by DelegateExecution

We removed `ActivityExecution` and replaced it where used with the `DelegateExecution` class.

All methods from the `ActivityExecution` class are copied to the `DelegateExecution` class.

#### Job, timer, suspended and dead letter jobs

Activiti 5 had only 1 job table and this meant that a fairly complex query had to be executed to get the jobs that needed to be executed from the database.

From Activiti 6, the jobs have been split up in a job `ACT_RU_JOB`, timer `ACT_RU_TIMER_JOB`, suspended `ACT_RU_SUSPENDED_JOB`, and `ACT_RU_DEADLETTER_JOB` dead letter table.

#### Signaling an execution

In Activiti 6, the `signal()` methods have been renamed to `trigger()`.

This also means that `SignalableActivityBehavior`, the interface to be implemented for behaviors that can be `triggered` from external sources, is now called `TriggerableActivityBehavior`.

#### Checked Exceptions

In version 5, the delegate classes like `JavaDelegate` and `ActivityBehavior` had `throws Exception` in their signature. As with any modern framework, the use of checked Exceptions has been removed in version 6.

#### Delegate classes

`org.activiti.engine.impl.pvm.delegate.ActivityBehavior` has changed package and lives now in `org.activiti.engine.impl.delegate`.

The method `getEngineServices()` have been removed from `DelegateExecution`. It's possible to retrieve services like `RepositoryService` from `org.activiti.engine.impl.context.Context` using `Context.getProcessEngineConfiguration().getRepositoryService()`.

#### Identity management classes removed
In Activiti 7, the package `org.activiti.engine.identity` and all it's classes like `User` and `Group` were removed. While the classes have been removed the database tables like `ACT_ID_USER` and `ACT_ID_GROUP` will not be removed when upgrading from APS 1.x to APS 2. However, they'll not be created if you start APS 2 on a new database.

### Alfresco Process Services third-party breaking changes

The following are third party breaking changes that have occured.

* Spring framework upgraded from 4.x to 5
* Spring boot upgraded from 1.x to 2
* Hibernate upgraded from 4.x to 5
