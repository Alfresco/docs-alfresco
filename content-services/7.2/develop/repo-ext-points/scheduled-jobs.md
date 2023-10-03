---
title: Scheduled Jobs Extension Point
---

Content Services automatically runs a number of scheduled jobs, for example the content store cleaner job and 
temporary file cleaner job. It is possible to configure new scheduled jobs.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

A scheduled job in Content Services can be compared to a Unix [cron job](https://en.wikipedia.org/wiki/Cron){:target="_blank"}. 
It is kicked off based on a [cron expression](http://www.quartz-scheduler.org/documentation/quartz-2.3.0/tutorials/crontrigger.html){:target="_blank"} 
and can then execute a piece of Java code or JavaScript code. The repository embeds the [Quartz](http://www.quartz-scheduler.org){:target="_blank"} 
job scheduler, which is part of the Spring Framework. It works with triggers, jobs, and job details to enable definition 
of all kinds of scheduled jobs. To define a new job we start with the **job implementation**, create a class with an 
execute method as follows:

```java
public class ScheduledJobExecuter {
    private static final Logger LOG = LoggerFactory.getLogger(ScheduledJobExecuter.class);

    /**
     * Public API access
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    /**
     * Executer implementation
     */
    public void execute() {
        LOG.info("Running the scheduled job");

        // Work/Job implementation goes here...
    }
}
```

The class can be called anything you like, but it is good practice to name it after the job it is executing. In this 
case it is just a template for how it should be done and it just prints a log statement. Use the `ServiceRegistry` 
to get to any Public API services that are needed for the implementation, such as the `NodeService`.

We then create the **Job details** class as follows:

```xml
public class ScheduledJob extends AbstractScheduledLockedJob implements StatefulJob {
    @Override
    public void executeJob(JobExecutionContext context) throws JobExecutionException {
        JobDataMap jobData = context.getJobDetail().getJobDataMap();

        // Extract the Job executer to use
        Object executerObj = jobData.get("jobExecuter");
        if (executerObj == null || !(executerObj instanceof ScheduledJobExecuter)) {
            throw new AlfrescoRuntimeException(
                    "ScheduledJob data must contain valid 'Executer' reference");
        }

        final ScheduledJobExecuter jobExecuter = (ScheduledJobExecuter) executerObj;

        AuthenticationUtil.runAs(new AuthenticationUtil.RunAsWork<Object>() {
            public Object doWork() throws Exception {
                jobExecuter.execute();
                return null;
            }
        }, AuthenticationUtil.getSystemUserName());
    }
}
```

The Job details class extends the `AbstractScheduledLockedJob` class, which has job lock service functionality to 
lock job, so it can run safely in a cluster. It is also important that it implements the `StatefulJob` interface so 
the job is not triggered concurrently on different nodes. The Job details class expects the Job executer to be passed 
into it so it can use it to execute the scheduled job. The `runAs` method of the code makes it possible to set what user 
that should be used when executing the job, in this case it has been set up to use the System user. If you wanted to use 
the Admin user you would have to change `AuthenticationUtil.getSystemUserName()` to `AuthenticationUtil.getAdminUserName()`. 
This is the only implementation needed, the rest is Spring configuration.

Start defining a **Spring bean for the Job executer** as follows:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.actions.ScheduledJobExecuter"
    class="org.alfresco.tutorial.scheduledjob.actions.ScheduledJobExecuter">
  <property name="serviceRegistry">
      <ref bean="ServiceRegistry" />
  </property>
</bean>
```

Then the **Job detail bean**:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.jobDetail" 
      class="org.springframework.scheduling.quartz.JobDetailFactoryBean">
  <property name="jobClass">
      <value>org.alfresco.tutorial.scheduledjob.jobs.ScheduledJob</value>
  </property>
  <property name="jobDataAsMap">
      <map>
          <entry key="jobExecuter" value-ref="org.alfresco.tutorial.scheduledjob.actions.ScheduledJobExecuter" />
          <entry key="jobLockService" value-ref="jobLockService" />
      </map>
  </property>
</bean>
```

The Job detail bean takes a `jobClass` representing the Job details implementation and a `jobExecuter` class that will 
do the actual work. The `jobLockService` is passed in to handle locking in a cluster environment.

Next step is to define a **Job trigger bean**:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.trigger" 
       class="org.springframework.scheduling.quartz.CronTriggerFactoryBean">
    <property name="jobDetail" ref="org.alfresco.tutorial.scheduledjob.jobDetail" />
    <property name="cronExpression" value="${org.alfresco.tutorial.scheduledjob.cronexpression}" />
    <property name="startDelay" value="${org.alfresco.tutorial.scheduledjob.cronstartdelay}" />
</bean>
```

In this case we have defined a Cron trigger, there are other triggers like `SimpleTriggerFactoryBean` that can be used too. 
The trigger bean takes a reference to the `jobDetail` bean so it knows what job to kick off. It also takes two parameters 
with the cron expression and cron start delay. In this case we have defined these parameters as being set via external 
properties. This is good practice so a System Administrator can manage the scheduled jobs. These properties will go into 
the modules `alfresco-global.properties` as follows:

```text
org.alfresco.tutorial.scheduledjob.cronexpression=0 0/2 * * * ?
org.alfresco.tutorial.scheduledjob.cronstartdelay=240000
org.alfresco.tutorial.scheduledjob.enabled=true
```

In this case the scheduled job is set up to be run every second minute. And there will be a start delay of 4 minutes for 
the job. The start delay is important as this makes it possible to delay all scheduled jobs until the Content Services 
server has started up properly, otherwise search might not work properly for example.

The last thing needed to get this scheduled job going is to pass in the job trigger to the scheduler, this can be done as follows:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.SchedulerAccessor" 
      class="org.alfresco.schedule.AlfrescoSchedulerAccessorBean">
    <property name="scheduler" ref="schedulerFactory"/>
    <property name="triggers">
      <list>
          <ref bean="org.alfresco.tutorial.scheduledjob.trigger"/>
      </list>
    </property>
    <property name="enabled" value="${org.alfresco.tutorial.scheduledjob.enabled}" />
</bean>
```

Note that neither Spring's `org.springframework.scheduling.quartz.SchedulerAccessorBean` nor the trigger bean definition 
has an `enabled` flag. If it's required to control the scheduling of the trigger via properties we can use the 
`org.alfresco.schedule.AlfrescoSchedulerAccessorBean` instead of Spring's accessor, as in the example above.

Sometimes we might want the scheduled job to be applied to a set of nodes determined by a query and the job implementation 
to be in the form of a [Repository Action]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}). Having the job implemented as a repository 
action is handy as it can then be re-used in other places. Implementing this kind of scheduled job usually starts off 
with the repository action class:

```java
public class SimpleRepoActionExecuter extends ActionExecuterAbstractBase {
    private static final Logger LOG = LoggerFactory.getLogger(SimpleRepoActionExecuter.class);

    public static final String PARAM_SIMPLE = "simpleParam";

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
        paramList.add(new ParameterDefinitionImpl(
                PARAM_SIMPLE,
                DataTypeDefinition.TEXT,
                true,
                getParamDisplayLabel(PARAM_SIMPLE)));
    }

    @Override
    protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
        // Get parameter values
        String simpleParam = (String) action.getParameterValue(PARAM_SIMPLE);

        LOG.info("Simple Repo Action called from scheduled Job, [" + PARAM_SIMPLE + "=" + simpleParam + "]");

        if (serviceRegistry.getNodeService().exists(actionedUponNodeRef) == true) {
            // The implementation of the Repo Action goes here...
            String nodeName = (String)serviceRegistry.getNodeService().getProperty(
                    actionedUponNodeRef, ContentModel.PROP_NAME);

            LOG.info("Simple Repo Action invoked on node [name=" + nodeName + "]");
        }
    }
}
```

The repository action class extends the `ActionExecuterAbstractBase` as usual and implements the `addParameterDefinitions` 
and `executeImpl` methods that are part of the action interface. See more information about how to implement repository 
actions [here]({% link content-services/7.2/develop/repo-ext-points/repo-actions.md %}). We use the `ServiceRegistry` to get to the 
public API, such as the `NodeService`. The `actionedUponNodeRef` will contain a node that is part of a result from a 
query set up in a Spring bean (we will configure this bean in a bit).

This is the only Java code that needs to be implemented, the rest is Spring bean configuration, let's start with the repository action:

```xml
<bean id="simple-action"
	  class="org.alfresco.tutorial.scheduledjob.actions.SimpleRepoActionExecuter"
	  parent="action-executer">
	<property name="serviceRegistry">
		<ref bean="ServiceRegistry" />
	</property>
</bean>
```

This simple repository action has been given the ID `simple-action`. Next bean up is:

```xml
<bean id="templateActionModelFactory"
      class="org.alfresco.repo.action.scheduled.FreeMarkerWithLuceneExtensionsModelFactory">
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
</bean>
```

This defines a factory implementation that builds suitable models for the FreeMarker templating language. Next is the 
template action bean definition that will refer to the repository action bean and pass in any needed parameters to the action:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.repoaction.simpleTemplateActionDefinition"
          class="org.alfresco.repo.action.scheduled.SimpleTemplateActionDefinition">
        <property name="actionName">
            <value>simple-action</value>
        </property>
        <property name="parameterTemplates">
            <map>
                <entry>
                    <key><value>simpleParam</value></key>
                    <value>Simple param value</value>
                </entry>
            </map>
        </property>
        <property name="templateActionModelFactory">
            <ref bean="templateActionModelFactory" />
        </property>
        <property name="dictionaryService">
            <ref bean="DictionaryService" />
        </property>
        <property name="actionService">
            <ref bean="ActionService" />
        </property>
        <property name="templateService">
            <ref bean="TemplateService" />
        </property>
    </bean>
```

Here the `action-name` will reference the repository action ID, which is `simple-action` in our case. The `parameterTemplates` 
map contain any parameters that the repository action is expecting, such as the `simpleParam`. The last bean we need to 
define is the one that specifies the node query and the cron expression for when to run the scheduled job:

```xml
<bean id="org.alfresco.tutorial.scheduledjob.repoaction.simpleRepoActionCronJob"
          class="org.alfresco.repo.action.scheduled.CronScheduledQueryBasedTemplateActionDefinition">
        <property name="transactionMode">
            <value>UNTIL_FIRST_FAILURE</value>
        </property>
        <property name="compensatingActionMode">
            <value>IGNORE</value>
        </property>
        <property name="searchService">
            <ref bean="SearchService" />
        </property>
        <property name="templateService">
            <ref bean="TemplateService" />
        </property>
        <property name="queryLanguage">
            <value>lucene</value>
        </property>
        <property name="stores">
            <list>
                <value>workspace://SpacesStore</value>
            </list>
        </property>
        <property name="queryTemplate">
            <value>PATH:"/app:company_home/*"</value>
        </property>
        <property name="cronExpression">
            <value>${org.alfresco.tutorial.scheduledjob.repoaction.cronexpression}</value>
        </property>
        <property name="jobName">
            <value>SimpleRepoActionJob</value>
        </property>
        <property name="jobGroup">
            <value>AlfrescoTutorialsJobGroup</value>
        </property>
        <property name="triggerName">
            <value>triggerSimpleRepoAction</value>
        </property>
        <property name="triggerGroup">
            <value>AlfrescoTutorialsTriggers</value>
        </property>
        <property name="scheduler">
            <ref bean="schedulerFactory" />
        </property>
        <property name="actionService">
            <ref bean="ActionService" />
        </property>
        <property name="templateActionModelFactory">
            <ref bean="templateActionModelFactory" />
        </property>
        <property name="templateActionDefinition">
            <ref bean="org.alfresco.tutorial.scheduledjob.repoaction.simpleTemplateActionDefinition" />
        </property>
        <property name="transactionService">
            <ref bean="TransactionService" />
        </property>
        <property name="runAsUser">
            <value>System</value>
        </property>
    </bean>
```

The `queryTemplate` property should contain the node query. In this case we have specified a Lucene PATH query 
`PATH:"/app:company_home/*"` that will return all nodes under `/Company Home`. The repository action, which is 
indirectly specified via the `templateActionDefinition` property, will be called ones for each one of these nodes. 
And the whole job will be kicked off based on the `cronExpression` that we specify, in this case we pass it in via 
external property that is specified in the alfresco-global.properties file.

When the job is kicked off and the repository action is called for each node matching the query there are a couple of 
parameters that can be used to control the behavior, first the `transactionMode`:

* `ISOLATED_TRANSACTIONS` - for each node the action is run in an isolated transaction. Failures are logged.
* `UNTIL_FIRST_FAILURE` - for each node the action is run in an isolated transaction. The first failure stops this.
* `ONE_TRANSACTION`- the actions for all nodes are run in one transaction. One failure will roll back all.

Then we got the `compensatingActionMode` parameter:

* `IGNORE` - This parameter is not used when the action is implemented as a `SimpleTemplateActionDefinition`
* `RUN_COMPENSATING_ACTIONS_ON_FAILURE` - This parameter can be used to indicate that in case of the action failing call another compensation action. This requires the use of the `compensatingTemplateActionDefinition` property in the `SimpleTemplateActionDefinition` definition.

Sometimes it is convenient to be able to have the action implemented as a server side JavaScript. This can be done with the following type of `SimpleTemplateActionDefinition`:

```xml
<bean id="runScriptAction" class="org.alfresco.repo.action.scheduled.SimpleTemplateActionDefinition">
    <property name="actionName">
        <value>script</value>
    </property>
    <property name="parameterTemplates">
        <map>
            <entry>
                <key>
                    <value>script-ref</value>
                </key>
                <value>\$\{selectSingleNode('workspace://SpacesStore', 'lucene', 'PATH:"/app:company_home/app:dictionary/app:scripts/cm:exampleScript.js"' )\}</value>
            </entry>
        </map>
    </property>
    <property name="templateActionModelFactory">
        <ref bean="templateActionModelFactory"/>
    </property>
    <property name="dictionaryService">
        <ref bean="DictionaryService"/>
    </property>
    <property name="actionService">
        <ref bean="ActionService"/>
    </property>
    <property name="templateService">
        <ref bean="TemplateService"/>
    </property>
</bean>
```

Here the `action-name` refers to one of the out-of-the-box repository actions called `script` that can be used to execute 
a JavaScript. The script is passed in as the `script-ref` parameter.

## Out-of-the-box scheduled jobs definitions

Alfresco runs a number of scheduled jobs that assist in the maintenance of a production environment.

These jobs are defined in the [scheduled-jobs-context.xml](https://github.com/Alfresco/alfresco-repository/blob/alfresco-repository-6.8/src/main/resources/alfresco/scheduled-jobs-context.xml){:target="_blank"} file.

|Scheduled job|Description|
|-------------|-----------|
|`contentStoreCleanerTrigger`|Launches the `contentStoreCleaner` bean, which identifies, and deletes or purges orphaned content from the content store while the system is running. Content is said to be orphaned when all references to a content binary have been removed from the metadata. By default, this job is triggered at 4:00 am each day. In a clustered environment, this job could be enabled on a headless (non-public) node only, which will improve efficiency.|
|`nodeServiceCleanupTrigger`|Performs cleanup operations on DM node data, including old deleted nodes and old transactions. In a clustered environment, this job could be enabled on a headless (non-public) node only, which will improve efficiency.|
|`tempFileCleanerTrigger`|Cleans up all Alfresco temporary files that are older than the given number of hours. Subdirectories are also emptied and all directories below the primary temporary subdirectory are removed. The job data must include the `protectHours` property, which is the number of hours to protect a temporary file from deletion since its last modification. The `system.tempFileCleaner.maxFilesToDelete` parameter can be used to configure a maximum number of files that the `TempFileCleanerTrigger` can delete when it is triggered, the default value is `null` and it's data type is `Long`. The `system.tempFileCleaner.maxTimeToRun` parameter can be used to determine a maximum duration for the `TempFileCleanerTrigger` to run after it starts, the default value is `null` and its data type is `Duration`.|

## Deployment - App Server

Most suitable for JavaScript backed jobs using the `script` template action. For Java backed jobs use a Repository 
JAR extension module. 

* Spring Beans: `tomcat/shared/classes/alfresco/extension/my-content-model-context.xml` (File name has to end in `-context.xml` to be picked up as Spring Bean context file)
* JavaScript file: Upload to `/Company Home/Data Dictionary/Scripts`

These file locations are untouched by re-deployments and upgrades.
## Deployment All-in-One SDK project

* Java job implementations: `aio/platform-jar/src/main/java/{custom package path}`
* Job default configuration: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/alfresco-global.properties`
* Spring Beans: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/scheduler-context.xml`

## Sample Code
 
* [Java based Job implementation and Repo action Job implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/schedule-job-repo){:target="_blank"} (**Note**. this is 5.x code and it differs a little bit as Spring was updated to version 5.x in ACS 6.x. Some stuff in implementing Quartz schedulers changed, but not much, see above and compare with tutorial code)
