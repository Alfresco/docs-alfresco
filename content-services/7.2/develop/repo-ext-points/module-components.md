---
title: Module Components Extension Point
---

A `ModuleComponent` executes code and is tied to a specific [Module]({% link content-services/7.2/develop/extension-packaging.md %}). 
It is packed with the rest of the module files in an AMP or JAR.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

An Content Services module, such as an AMP or a JAR, can have tightly coupled components (that is, Java classes) 
that are part of its implementation. When a module is loaded it will also execute the code for each one of its registered 
components. One component can depend on another component, so it is possible to set up the required execution order. 
A component can also be associated with an Content Services version range for which it is valid, which means 
that it will only be invoked if current Content Services version is in this version range. By default each one 
of the components will be executed only once when the module is deployed for the first time. To implement a module 
component you first need a [Repository AMP](https://github.com/Alfresco/alfresco-sdk/blob/master/docs/working-with-generated-projects/working-with-platform.md){:target="_blank"} 
project or a repository JAR project. Then start by implementing the component class as in the following example:

```java
public class DemoComponent extends AbstractModuleComponent {
    Log log = LogFactory.getLog(DemoComponent.class);

    @Override
    protected void executeInternal() throws Throwable {
        System.out.println("DemoComponent has been executed");
        log.debug("Test debug logging. Number of nodes in Company Home = " + childNodesCount(getCompanyHome()));
        log.info("This is only for information purposed. Better remove me from the log in Production");
    }

    public int childNodesCount(NodeRef nodeRef) {
        return serviceRegistry.getNodeService().countChildAssocs(nodeRef, true);
    }

    public NodeRef getCompanyHome() {
        return serviceRegistry.getNodeLocatorService().getNode("companyhome", null, null);
    }
}
```

All components should extend the `org.alfresco.repo.module.AbstractModuleComponent` class, it provides a lot of general 
plumbing so you don't have to do it. For example, it provides defaults for properties such as `executeOnceOnly` and it 
provides a `serviceRegistry` so you can get to the public API. The main method that needs to be implemented is called 
`executeInternal` and it should contain the work that needs to be done when this component is executed by the module. 
There can be other methods in the component that provides services useful to other parts of the module implementation. 
When the component implementation is done it needs to be registered with the module, this is done with a Spring bean 
as follows:

```xml
<bean id="org.alfresco.tutorial.exampleComponent"
    class="org.alfresco.tutorial.demoamp.DemoComponent"
    parent="module.baseComponent" >
  <property name="moduleId" value="${project.artifactId}" />  <!-- See module.properties -->
  <property name="name" value="exampleComponent" />
  <property name="description" value="A demonstration component" />
  <property name="sinceVersion" value="2.0" />
  <property name="appliesFromVersion" value="2.0" />
</bean>
```

The component Spring bean should extend (have as `parent`) the `module.baseComponent` bean, which will have the 
`ServiceRegistry` property defined and the `init-method` defined so it will be automatically registered with the module. 
The module that the component will be registered with is determined by the `moduleId` property, which should be set to 
the module id for the repository AMP or repository JAR. The `sinceVersion` and `appliesFromVersion` properties can be 
used to indicate for what Content Services versions this component should be activated.

If you want a component to be executed after another component use the `dependsOn` property as follows:

```xml
<bean id="org.alfresco.tutorial.anotherExampleComponent" 
     class="org.alfresco.tutorial.demoamp.AnotherDemoComponent" 
     parent="module.baseComponent">
   <property name="moduleId" value="${project.artifactId}" />  <!-- See module.properties -->
   <property name="name" value="anotherExampleComponent" />
   <property name="description" value="Another demonstration component" />
   <property name="sinceVersion" value="2.0" />
   <property name="appliesFromVersion" value="2.0" />
   <property name="dependsOn">
      <ref bean="org.alfresco.tutorial.exampleComponent" />
   </property>
</bean>
```

To execute the component at every server start use the following property:

```xml
<property name="executeOnceOnly" value="false" />
```

There is a special component implementation available out-of-the-box for importing content into the repository. 
It is called `ImporterModuleComponent` and you can use it by defining the a Spring bean like this:

```xml
<bean id="module.test.importerComponent" 
     class="org.alfresco.repo.module.ImporterModuleComponent" 
     parent="module.baseComponent">
   <property name="moduleId" value="my-module-id" />
   <property name="name" value="MyBootstrapModule" />
   <property name="description" value="My Modules initial data requirements" />
   <property name="sinceVersion" value="1.0" />
   <property name="appliesFromVersion" value="1.0" />
   <property name="appliesToVersion" value="1.4" />
   <property name="importer" ref="spacesBootstrap" />
   <property name="bootstrapViews">
    <list>
      <props>
         <prop key="path">/${spaces.company_home.childname}</prop>
         <prop key="location">alfresco/module/myModule-123/myACP.acp</prop>
      </props>
    </list>
   </property>
</bean>
```

Note here the use also of the `appliesToVersion` property. For more information about bootstrapping content see this 
[extension point]({% link content-services/7.2/develop/repo-ext-points/bootstrap-content.md %}).

## Deployment - App Server

* `tomcat/shared/classes/alfresco/extension/some-context.xml` - Define your component Spring beans here (Untouched by re-deployments and upgrades)
* **Note**. when developing Java components you are better off using a proper SDK project, see next.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{custom package path}` - implementation of module components
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - Component Spring Bean definitions

## Sample Code

* [A demo component implementation.](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/repo-amp){:target="_blank"}
