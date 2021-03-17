# Behaviours / Policies

Behaviour Policies can be used to run custom code when an event, such a adding a content item or deleting a content item, happens.

|Information|Behaviors|
|-----------|---------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Sometimes, using rules might not be enough for what we want to do. Let's say that we wanted to execute a business rule just before a node is deleted and a business rule after the node has been deleted. This cannot be done with rules, as they allow us to execute business rules only when nodes are created, deleted, or updated. Other examples are executing business logic after document version changes or when an association is deleted. In these cases we have to turn to the Alfresco event model, which enables us to execute Java or JavaScript code when an event happens in the system. In Alfresco, these events are referred to as behaviour policies.

 The events that we can listen to are associated with the service that triggers them. Here's a list of some of the event policies:

 -   org.alfresco.repo.content.ContentServicePolicies \(OnContentUpdatePolicy, OnContentPropertyUpdatePolicy etc\)
-   org.alfresco.repo.copy.CopyServicePolicies \(OnCopyNodePolicy, BeforeCopyPolicy etc\)
-   org.alfresco.repo.node.NodeServicePolicies \(OnCreateStorePolicy, OnCreateNodePolicy etc\)
-   org.alfresco.repo.version.VersionServicePolicies \(OnCreateVersionPolicy, OnRevertVersionPolicy etc\)

To create an "event handler", we first start with the event handler implementation itself. In this example, we will listen to a couple of content events and do some logging when they occur:

 ```
public class DocumentEventHandler {
    private static Logger logger = LoggerFactory.getLogger(DocumentEventHandler.class);

    private PolicyComponent eventManager;
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void setPolicyComponent(PolicyComponent policyComponent) {
        this.eventManager = policyComponent;
    }

    public void registerEventHandlers() {
        eventManager.bindClassBehaviour(
                NodeServicePolicies.OnCreateNodePolicy.QNAME,
                ContentModel.TYPE_CONTENT,
                new JavaBehaviour(this, "onAddDocument",
                        Behaviour.NotificationFrequency.TRANSACTION_COMMIT));

        eventManager.bindClassBehaviour(
                NodeServicePolicies.OnUpdateNodePolicy.QNAME,
                ContentModel.TYPE_CONTENT,
                new JavaBehaviour(this, "onUpdateDocument",
                        Behaviour.NotificationFrequency.TRANSACTION_COMMIT));

        eventManager.bindClassBehaviour(
                NodeServicePolicies.OnDeleteNodePolicy.QNAME,
                ContentModel.TYPE_CONTENT,
                new JavaBehaviour(this, "onDeleteDocument",
                        Behaviour.NotificationFrequency.TRANSACTION_COMMIT));
    }

    public void onAddDocument(ChildAssociationRef parentChildAssocRef) {
        NodeRef parentFolderRef = parentChildAssocRef.getParentRef();
        NodeRef docRef = parentChildAssocRef.getChildRef();

        // Check if node exists, might be moved, or created and deleted in same transaction.
        if (docRef == null || !serviceRegistry.getNodeService().exists(docRef)) {
            // Does not exist, nothing to do
            logger.warn("onAddDocument: A new document was added but removed in same transaction");
            return;
        } else {
            logger.info("onAddDocument: A new document with ref ({}) was just created in folder ({})",
                    docRef, parentFolderRef);
        }
    }

    public void onUpdateDocument(NodeRef docNodeRef) {
        // Check if node exists, might be moved, or created and deleted in same transaction.
        if (docNodeRef == null || !serviceRegistry.getNodeService().exists(docNodeRef)) {
            // Does not exist, nothing to do
            logger.warn("onUpdateDocument: A document was updated but removed in same transaction");
            return;
        } else {
            NodeRef parentFolderRef = serviceRegistry.getNodeService().getPrimaryParent(docNodeRef).getParentRef();
            logger.info("onUpdateDocument: A document with ref ({}) was just updated in folder ({})",
                    docNodeRef, parentFolderRef);
        }
    }

    public void onDeleteDocument(ChildAssociationRef parentChildAssocRef, boolean isNodeArchived) {
        NodeRef parentFolderRef = parentChildAssocRef.getParentRef();
        NodeRef docRef = parentChildAssocRef.getChildRef();
        logger.info("onDeleteDocument: A document with ref ({}) was just deleted in folder ({})",
                docRef, parentFolderRef);
    }
}
```

 The event handler should contain one method per event we want to handle \(i.e. run some code for\). In this case we want to log some stuff when the user adds content files \(`onAddDocument`\), updates content files \(`onUpdateDocument`\), and deletes content files \(`onDeleteDocument`\).

 These method names can actually be called whatever you want, but it is obviously good to name them so it is easy to see what event they handle. These methods are however expected to take certain parameters. To find out which ones we need to look in the source code for the `org.alfresco.repo.node.NodeServicePolicies` class and look up the specific policy `interface` such as `OnCreateNodePolicy`, it will have the method signature that we need to follow, such as `public void onCreateNode(ChildAssociationRef childAssocRef)` in the case of the `onAddDocument` method.

 This just defines our event handling methods and we need to also register them with the Event Manager \(referred to as the Policy Component by Alfresco\), so that they get called when these events happens. To do this we have created another method called `registerEventHandlers` that will be used to register our event methods with the event manager.

 There are three things you need to tell the Event Manager when you register an event handler method:

 -   **Event**: What event we want to listen to. For example, we have told the event manager to call `onAddDocument` when the `onCreateNode` event happens.
-   **Content Model Class**: We also need to tell the event manager for what type of content it should notify us. In the case of `onAddDocument` we want to be notified when any type of content is created \(that is, any content of type `cm:content` or subtype thereof\). We are not restricted to use only types; we can also specify aspects such as anything with versioning turned on \(that is, `ContentModel.ASPECT_VERSIONABLE`\). If we want the event method to be called for several different aspects and types, then we have to call `bindClassBehaviour` several times.
-   **Event Handler Method**: The last thing we need to do is to tell the event manager what method in our code makes up the actual event handler. In the case of the `onAddDocument` method we want it to be called when the `onCreateNode` event happens for a node of type Content.

 To complete a Behaviour Policy implementation we need to add the `DocumentEventHandler` class to the Spring context and make sure that the `registerEventHandlers` method is called:

 ```
<bean id="org.alfresco.tutorial.policy.documentEventHandler" class="org.alfresco.tutorial.policy.DocumentEventHandler"
    init-method="registerEventHandlers">
  <property name="policyComponent">
      <ref bean="policyComponent"/>
  </property>
  <property name="serviceRegistry">
      <ref bean="ServiceRegistry" />
  </property>
</bean>
```

 This makes it possible to pinpoint exactly what content should be affected by the business logic when the event occurs. Besides being able to bind the business logic to a particular content model class \(that is, type or aspect\), it can also be bound to either a content model association or a content model property.

 When an operation such as adding a document is executed, it is done in a transaction. During this, any registered event handlers are called in the same transaction and in the order they were registered. Because of this, a faulty event handler could prohibit the system from working properly. Let's say, we install an event handler that triggers when content is added to the system \(that is, `onCreateNode`\) and we have made a mistake when coding it.

 If this coding mistake results in an exception being thrown, then that rolls back the transaction. This would effectively block anybody from adding content to the system. So if unexpected errors happen after installing a lot of event handlers, it might be a good idea to remove them and see if they are the cause of the problem.

 It is possible to do even more fine-tuning of where in the transaction event handlers should be called \(that is, compared to just before or after an operation\). There are three different stages \(Alfresco calls it notification frequencies\) where the custom handler could be configured to be invoked:

 -   **EVERY\_EVENT**: This is the default if the notification frequency is not specified. The event handler is then just executed wherever it is being invoked in the code. The name of this notification frequency implies that the event handler will be called multiple times, but that is not the case.
-   **TRANSACTION\_COMMIT**: The event handler is queued and invoked at the end of the transaction after it has been committed. A proxy around the event handler manages the queuing.
-   **FIRST\_EVENT**: The event handler is invoked just after the transaction is started. A proxy around the event handler manages this.

**Important:** When using the event manager it is important to know that it manages synchronous events. So whatever code we implement in the event handler will be executed in the same transaction as the main Alfresco code that triggered the event. This means that the code in the event handler will impact the performance of general Alfresco operations such as adding a document. So we need to be careful about this and use this event system only when it is really necessary.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/extension/some-context.xml - Register your custom policy Spring bean \(Untouched by re-deployments and upgrades\)
-   Note. if you are developing a Policy with Java you are better off using a proper SDK project, see next.

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-amp-archetype.md)|-   repo-amp/src/main/java/\{domain specific directory path\} - implementation of Policy behaviour class
-   repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/service-context.xml - Policy Spring Bean registration

|
|More Information| |
|Sample Code|Not available|
|Tutorials|-   [Jeff Potts Behaviour Policy tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/behaviors/tutorial/tutorial.html) - a must read

|
|Alfresco Developer Blogs| |

