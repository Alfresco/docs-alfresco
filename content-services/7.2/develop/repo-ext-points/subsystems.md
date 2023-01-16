---
title: Subsystems Extension Point
---

Subsystems are configurable modules responsible for a piece of functionality in Content Services. It is 
possible to implement an extension as a custom subsystem.


Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

Description

Subsystems are configurable modules responsible for a piece of functionality in Content Services. The 
functionality is often optional such as the IMAP server or can have several different implementations, such as 
authentication.

A subsystem can be thought of as a mini-server that runs embedded within the main Content Services server. 
A subsystem has the following characteristics:

* It can be started, stopped, and configured independently of the Content Services server during runtime
* It has its own isolated Spring application context and configuration

Subsystems are independent processes that can be brought up and down. This design lets an administrator of the system 
change a single configuration without having to bring down the entire Content Services system. The advantages 
are reliability and availability.

Examples of subsystems include:

* **Audit**: Configuration of audit parameters
* **Authentication**: Contains different authentication subsystems such as LDAP
* **E-mail**: SMTP support for sending e-mails
* **File servers**: FTP
* **Google Docs**: Google Docs integration
* **IMAP**: Internal IMAP server
* **Open Office transformations**: Helps converting office documents to text
* **Search**: Search system integration, Lucene, Solr, None
* **Synchronization**: LDAP synchronization settings
* **Sys admin**: It allows real-time control across some general repository parameters
* **Third-party**: Owns the SWFTools and ImageMagick content transformers

Implementing an extension as a subsystem allows a more fully decoupled customization. It is, for example, possible to 
disable the customization at run time.

The first thing we need to do before starting the implementation of our custom subsystem is to decide what category and 
type we want to use:

* **Category** - this is a broad description of the subsystem, such as Search or Authentication
* **Type** - this is a particular flavor (that is, implementation) of the subsystem category, such as Solr and Lucene or LDAP and Kerberos

Implementing a type of a subsystem category is pretty much the same thing as implementing a platform customization, 
the customization is just deployed a bit differently then we are used to. Note also that subsystems are platform (repository) specific 
and a Share customization cannot be implemented as a subsystem.

For demonstration purposes we will assume that we have started to implement integrations with different Semantic content 
products, and the first one is a Cloud based Named Entities service. This service can be used to send in a text and get 
back named entities such as people, companies, and countries.

The category for this custom subsystem will be called Semantic and the type for the first implementation will be called 
Named Entities. 

The first thing we should always do when implementing a subsystem is to **implement the platform extension** 
(that should be deployed as a subsystem) in the normal way and deploy as a Simple JAR extension. 
When the extension works fine deployed as a JAR module we can continue and turn it into a subsystem deployment.

In our case we got the following simple class representing our semantic named entities service:

```java
public class DummyNamedEntitiesServiceImpl implements NamedEntitiesService {
    private static final Log LOG = LogFactory.getLog(DummyNamedEntitiesServiceImpl.class);

    /**
     * Properties used to connect to the remote named entities semantic cloud service.
     * Not used in this dummy implementation.
     */
    private String remoteServiceHostname;
    private String remoteServiceAipKey;
    private String remoteServicePort;

    /**
     * Service registry for access to Alfresco public API
     */
    private ServiceRegistry serviceRegistry;

    public void setRemoteServiceHostname(String remoteServiceHostname) {
        this.remoteServiceHostname = remoteServiceHostname;
    }

    public void setRemoteServiceAipKey(String remoteServiceAipKey) {
        this.remoteServiceAipKey = remoteServiceAipKey;
    }

    public void setRemoteServicePort(String remoteServicePort) {
        this.remoteServicePort = remoteServicePort;
    }

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void extractNamedEntities(NodeRef nodeRef) {
        if (serviceRegistry.getNodeService().exists(nodeRef)) {
            LOG.info("Extracting named entities for node [nodeRef=" + nodeRef + "]");

            // Dummy implementation that does nothing
            // In a real implementation we would:
            // 1) extract the text for the node via for example NodeService and ContentService
            // 2) call the remote service with the text to get the named entities
            // 3) add a custom NamedEntities aspect to the node with the extracted entities, such as person, company, country etc.
        } else {
            LOG.error("Node does not exist [nodeRef=" + nodeRef + "]");
        }
    }

}
```

So this class doesn't actually do anything, it is just a dummy implementation as this extension point is about subsystem 
implementations and deployments, not about doing an integration with a semantic service in the Cloud. The class is 
registered in the usual place, such as `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml`, 
the bean definition looks like this:

```xml
<bean id="namedEntitiesService"
       class="org.alfresco.tutorial.semantic.namedentities.DummyNamedEntitiesServiceImpl">
     <property name="remoteServiceHostname"><value>${namedentities.remote.service.hostname}</value></property>
     <property name="remoteServicePort"><value>${namedentities.remote.service.port}</value></property>
     <property name="remoteServiceAipKey"><value>${namedentities.remote.service.api.key}</value></property>
     <property name="serviceRegistry">
         <ref bean="ServiceRegistry" />
     </property>
 </bean>
```

We inject the properties that are needed to connect to the remote Cloud service and we inject the Service Registry 
so we can get to the Content Services public API. This service would now be available to any other bean in 
the Spring context. However, when we turn this extension into being deployed as a subsystem the `namedEntitiesService` 
bean will no longer be available outside of the subsystem Spring context. This is important, and we need to provide 
another way of accessing the service that the subsystem provides, such as via a web script.

The repository web script descriptor looks like this:

```xml
<webscript>
    <shortname>Extract Named Entities</shortname>
    <description>This Web Script is used to call the Named Entities Service to extract named entities from a text</description>
    <url>/tutorial/extractentities?nodeId={nodeId}</url>
    <authentication>user</authentication>
</webscript>
```

And it is implemented with a Java controller as follows:

```java
public class NamedEntitiesWebScript extends DeclarativeWebScript {
    private static final String NODEID_PARAM_NAME = "nodeId";

    /**
     * Service registry for access to Alfresco public API
     */
    private ServiceRegistry serviceRegistry;

    /**
     * Named entities service to call to extract entities for text
     */
    private NamedEntitiesService namedEntitiesService;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void setNamedEntitiesService(NamedEntitiesService namedEntitiesService) {
        this.namedEntitiesService = namedEntitiesService;
    }

    @Override
    protected Map<String, Object> executeImpl(WebScriptRequest webScriptRequest, Status status) {
        Map<String, Object> model = new HashMap<String, Object>();

        String nodeId = webScriptRequest.getParameter(NODEID_PARAM_NAME);

        if (StringUtils.isBlank(nodeId)) {
            status.setCode(400, "Failed entity extraction: required node ID data has not been provided");
            status.setRedirect(true);
        } else {
            NodeRef nodeRef = new NodeRef(StoreRef.STORE_REF_WORKSPACE_SPACESSTORE + "/" + nodeId);
            if (!serviceRegistry.getNodeService().exists(nodeRef)) {
                status.setCode(404, "Failed entity extraction: no node found for node reference:" + nodeRef);
                status.setRedirect(true);
            } else {
                namedEntitiesService.extractNamedEntities(nodeRef);

                model.put("message", "Successfully completed named entities extraction");
                model.put("nodeId", nodeId);
            }
        }

        return model;
    }
}
```

The web script controller is registered with the following Spring bean definition:

```xml
<bean id="webscript.namedentities.get"
       class="org.alfresco.tutorial.semantic.namedentities.NamedEntitiesWebScript"
       parent="webscript">
    <property name="namedEntitiesService">
        <ref bean="namedEntitiesService" />
    </property>
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
</bean>
```

We inject the `namedEntitiesService` into the web script controller so it can be called. The web script is invoked via 
a simple HTTP URL (e.g. `http://localhost:8080/alfresco/service/tutorial/extractentities?nodeId=34e4a654-b45e-4be1-80db-25da1e4c82a7`), 
which is the way that we can access the services of this subsystem without direct access to the Spring context. 
The subsystem implementation will be decoupled from the rest of the Spring context.

Now that we have a standard working platform (that is, repository) extension we can turn it into a subsystem implementation 
and deployment.

To start our subsystem implementation create a new category called **Semantic**. We do this by creating a directory under 
the `/alfresco/subsystems` directory. Then we create the type directory **namedEntities** as a subdirectory to Semantic 
so we end up with the `/alfresco/subsystems/Semantic/namedEntities` directory path. In the namedEntities directory we 
create the following two files:

```text
namedentities-semantic.properties
namedentities-semantic-context.xml
```

The properties file will contain the configuration that our extension needs and the context file will register all the 
Spring beans that are needed for the complete subsystem implementation. For these files to be picked up they need to end 
in .`properties` and `-context.xml`. So we could have used completely different file-names here if we wanted to, as 
long as they have the correct suffix. In the properties file we add the following properties:

```text
namedentities.remote.service.hostname=host1.acme.com
namedentities.remote.service.port=80
namedentities.remote.service.api.key=HHS44HGS22672BDSSSS444SSSS
```

In this case these properties point to a fictional Cloud service that provide named entities extraction. We should 
include all properties needed by the platform extension. In this case the properties are there for demonstration purposes, 
they will actually not be used to connect to a remote service, just demonstrate how to inject properties into the extension code.

After this it is time to **move our Spring beans** from the `service-context.xml` file into the `namedentities-semantic-context.xml` 
Spring context file. We are basically moving our beans out of the general Spring context into a specific subsystem Spring context, 
where they can access the Spring context (such as `serviceRegistry`) but not the other way around.

Now, to kick off the Spring context for the subsystem category and type add the following Spring bean to the `service-context.xml` 
Spring context file (note that we add this bean to the Spring context known to the Content Services server, so 
it can start the subsystem):

```xml
<bean id="namedEntitiesService.subsystem.type"
       class="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory"
       parent="abstractPropertyBackedBean">
     <property name="category">
         <value>Semantic</value>
     </property>
     <property name="typeName">
         <value>namedEntities</value>
     </property>
     <property name="instancePath">
         <list>
             <value>namedEntities</value>
         </list>
     </property>
     <property name="autoStart">
         <value>true</value>
     </property>
 </bean>
```

There are three different kinds of subsystem Spring context factories, including the one used above:

* `ChildApplicationContextFactory` - single extension instance deployment, can be stopped, reconfigured and started at runtime via JMX
* `SwitchableApplicationContextFactory` - allows swapping of subsystem type implementations (that is, Lucene vs Solr)
* `DefaultChildApplicationContextManager` - Chain or pick subsystem type (that is, Authentication chain)

Start Content Services with this subsystem implementation, and you should see the following in the log when it is mounted:

```text
2016-02-15 15:45:56,901 INFO [management.subsystems.ChildApplicationContextFactory] [localhost-startStop-1] Starting 'Semantic' subsystem, ID: [Semantic, namedEntities] 
2016-02-15 15:45:56,925 INFO [management.subsystems.ChildApplicationContextFactory] [localhost-startStop-1] Startup of 'Semantic' subsystem, ID: [Semantic, namedEntities] complete 
```

We can manage it from JConsole:

![dev-extensions-repo-custom-subsystem-jconsole]({% link content-services/images/dev-extensions-repo-custom-subsystem-jconsole.png %})

From JConsole we can re-configure, start, and stop our new custom subsystem.

However, if we actually call the web script it will not work. This is because the web script descriptor is registered 
with the web script container and when it is looking for any controller belonging to the web script it does not see the 
subsystem context with the controller bean definition. So when the web script is called the log will show an error where 
`nodeId` is unknown, basically the web script container has gone directly to the web script template and bypassed the 
controller.

The way we can fix this is to move the web script controller Spring bean definition back into the `service-context.xml` 
file so it is known to Content Services and the web script container. But then we got the problem that the 
controller Spring bean will not load as it knows nothing about the subsystem `namedEntitiesService` bean. So, is there a 
way to expose a Spring bean in a subsystem context so it can be used in the main parent Spring context? Yes there is, we 
can use a proxy approach, define the following bean in the `service-context.xml` file:

```xml
<bean id="namedEntitiesService.proxy" class="org.alfresco.repo.management.subsystems.SubsystemProxyFactory">
     <property name="sourceApplicationContextFactory">
         <ref bean="namedEntitiesService.subsystem.type" />
     </property>
     <property name="sourceBeanName">
         <value>namedEntitiesService</value>
     </property>
     <property name="interfaces">
         <list>
             <value>org.alfresco.tutorial.semantic.namedentities.NamedEntitiesService</value>
         </list>
     </property>
 </bean>
```

This `namedEntitiesService.proxy` bean definition creates a proxy for the `namedEntitiesService` bean in the 
subsystem context. We can then change the web script controller bean definition to use it (also in `service-context.xml`):

```xml
<bean id="webscript.namedentities.get"
       class="org.alfresco.tutorial.semantic.namedentities.NamedEntitiesWebScript"
       parent="webscript">
     <property name="namedEntitiesService">
         <ref bean="namedEntitiesService.proxy" />
     </property>
     <property name="serviceRegistry">
         <ref bean="ServiceRegistry" />
     </property>
 </bean>
```

The subsystem Spring context file `namedentities-semantic-context.xml` now only contains the following bean definition:

```xml
<bean id="namedEntitiesService"
       class="org.alfresco.tutorial.semantic.namedentities.DummyNamedEntitiesServiceImpl">
     <property name="remoteServiceHostname"><value>${namedentities.remote.service.hostname}</value></property>
     <property name="remoteServicePort"><value>${namedentities.remote.service.port}</value></property>
     <property name="remoteServiceAipKey"><value>${namedentities.remote.service.api.key}</value></property>
     <property name="serviceRegistry">
         <ref bean="ServiceRegistry" />
     </property>
 </bean>
```

Using this proxy approach also has the benefit that if the subsystem is stopped it will be automatically started if we 
call any method in the `NamedEntitiesService` interface.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/extension/subsystems/{category}/{type}` - extension properties and Spring Beans
* The Java class implementation does not lend itself very well to be directly deployed directly to the application server. Use a repository AMP SDK project instead, see below.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/resources/alfresco/subsystems/{category}/{type}` - extension component properties and Spring Beans
* `aio/platform-jar/src/main/java/{custom package path}` - extension implementation classes

## More Information

* [Configure subsystems]({% link content-services/7.2/config/subsystems.md %})

## Sample Code

* [A sample implementation of a custom subsystem](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-subsystem-repo){:target="_blank"}
