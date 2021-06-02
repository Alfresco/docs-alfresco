---
title: Upgrade Process Services
---

You can upgrade from earlier versions to Process Services.

>**Note:** Before upgrading, you should back up your database and properties files, such as `activiti-app.properties`.

There are two methods for upgrading:

* Using the Process Services setup wizard
* Manually

>**Important:** If you integrate Process Services with Alfresco Content Services then be aware that from version 1.11 only repositories on version 5.2 and later are supported. Upgrade to a later version of Alfresco Content Services before updating Process Services to continue using this functionality.

## Upgrade using a setup wizard

You can use the Process Services setup wizard to upgrade to the latest version. The process is similar to [installing for the first time]({% link process-services/latest/install/manual.md %}#install-using-setup-wizards).

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

>**Tip**: You can also upload a [license]({% link process-services/latest/install/manual.md %}#license) from the user interface.

## Upgrade manually

You can upgrade using the WAR file in your application server distribution. These instructions use the WAR file from the Apache Tomcat based distribution, however you can choose from different distributions for various application servers.

Review the [Supported Stacks]({% link process-services/latest/support/index.md %}) list to see what’s supported.

Follow these steps to upgrade using the War file:

1. Stop the web server running the application.
2. Deploy the new WAR file in your web server by placing it in the `/webapps` folder in Tomcat.
3. Boot up the web server and start Process Services to check if it’s working as expected.

Any database upgrade changes should have now been applied.

## Upgrading from 1.x to 2.x

When you upgrade from APS 1.x to 2.x you are upgrading from Activi 5.x to 6. There are breaking changes that you need to be aware of in order for your system to function correctly after you have upgraded.

> **Note:** You do not need to migrate your database when upgrading from 1.x to 2.x.

### Alfresco Process Services breaking changes

#### PVM classes

All classes from the `org.activiti.engine.impl.pvm` package and subpackages have been removed. This is because the `_PVM_` (Process Virtual Machine) model has been removed and replaced by a simpler and more lightweight model.
This means that `ActivitiImpl`, `ProcessDefinitionImpl`, `ExecutionImpl`, `TransitionImpl` are invalid.

Generally, most of the usage of these classes in version 5 came down to getting information that was contained in the process definition. In version 6, all the process definition information can be found through the _BpmnModel_, which is a Java representation of the BPMN 2.0 XML for the process definition (enhanced to make certain operations and searches easier).

The quickest way to get the `BpmnModel` for a process definition is to use the `org.activiti.engine.impl.util.ProcessDefinitionUtil` class:

---bash
// The whole model
ProcessDefinitionUtil.getBpmnModel(String processDefinitionId);

// Only the specific process definition
ProcessDefinitionUtil.getProcess(String processDefinitionId);
----

#### ActivityExecution is replaced by DelegateExecution

We removed `ActivityExecution` and replaced it where used with the `DelegateExecution` class.

All methods from the `ActivityExecution` class are copied to the `DelegateExecution` class.

#### Job, timer, suspended and dead letter jobs

Activiti 5 had only 1 job table and this meant that a fairly complex query had to be executed to get the jobs that needed to be executed from the database.

With Activiti 6, the jobs have been split up in a job `ACT_RU_JOB`, timer `ACT_RU_TIMER_JOB`, suspended `ACT_RU_SUSPENDED_JOB`, and `ACT_RU_DEADLETTER_JOB` dead letter table. Jobs in the job table can be directly executed in the same way as asynchronous and due timer jobs. So there's no need for a complex query anymore, the only where clause is a lock time column that should be `NULL`.
Timer jobs are now persisted in a dedicated timer jobs table and there's a Runnable that checks for timer jobs due to execute. When a timer job is due to be executed, the job will be moved to the job table. When the job executor Runnable is ready to execute the job it will be fetched from the job table and executed. When a process definition and process instance is suspended, the corresponding jobs will be moved to a separate suspended job table. This simplifies the job executor query and makes it very clear which jobs are suspended. If a job execution fails, the job will be placed in the timer job table with a due date that's set to current time + the async failed job wait time configured on the process engine configuration. When the job is due to be executed it will be moved to the job table again and be executed. When the number of retries is down to zero, the job will be moved to the dead letter table and no automatic execution will be performed. This also simplifies the default job executor queries and makes it obvious which jobs are stuck and might need manual intervention.

The embedded Activiti 5 engine in Activiti 6 works with these 4 job tables as well. But there's only one threadpool fetching jobs from the database. When a job is fetched from the database, the engine version for the job is checked based on the process definition id, and the job is executed by the Activiti 6 or embedded Activiti 5 Engine.

#### Signaling an execution

In version 2.x, the `signal()` methods have been renamed to `trigger()`.

This also means that `SignalableActivityBehavior`, the interface to be implemented for behaviors that can be `triggered` from external sources, is now called `TriggerableActivityBehavior`.

#### Checked Exceptions

In version 5, the delegate classes like `JavaDelegate` and `ActivityBevior` had `throws Exception` in their signature. As with any modern framework, the use of checked Exceptions has been removed in version 6.

#### Delegate classes

`org.activiti.engine.impl.pvm.delegate.ActivityBehavior` has changed package and lives now in `org.activiti.engine.impl.delegate`.

The following methods have been removed from `DelegateExecution`:

* `end()`
* `createdExecution()`

They have been replaced by calls to the `ExecutionEntityManager`, which can be fetched through `Context.getCommandContext.getExecutionEntityManager()`.

#### EntityManagers

In Activiti version 5, all `EntityManager`, which was responsible for persistence but also certain logic classes did not have an interface. In version 6, all `EntityManager` classes have been renamed to have `Impl` as suffix and an interface without the suffix. This effectively means that the version 5 `EntityManager` class name is now the name of the corresponding interface.

All `EntityManager` interfaces extend the generic `org.activiti.engine.impl.persistence.entity.EntityManager` interface. All implementation classes extend a generic `AbstractEntityManager` interface. The `UserIdentityManager` interface has been renamed to `UserEntityManager`. The `GroupIdentityManager` interface has been renamed to `GroupEntityManager`

#### PersistentObject renamed to Entity

The class `org.activiti.engine.impl.db.PersistentObject` has been renamed to `Entity` to be consistent with all the other classes suchg as `EntityManagers`.

All related classes that used the term 'persistent object' have been refactored to 'entity' too.

### Alfresco Process Services third-party breaking changes

The following are third party breaking changes that have occured.

