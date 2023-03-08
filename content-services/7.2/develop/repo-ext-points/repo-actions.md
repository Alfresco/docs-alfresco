---
title: Repository Actions Extension Point
---

Repository actions are reusable units of work that can be invoked from the User Interface (UI). Examples include 
Workflow and web scripts. Much of the functionality in the Share UI is backed by an Action.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

An Action is a discrete unit of work that can be invoked repeatedly. It can be invoked from a number of Alfresco features, 
such as Folder Rules, Workflows, Web Scripts, and Scheduled Jobs. The following are examples of out-of-the-box actions: 
Check-Out, Check-In, Update, Add Aspect, Copy, Cut, Paste, Send Email, Move, Specialize Type, Edit, and Delete.

An action can contain both a back-end part (business logic) and a front-end part (UI widgets). The back-end implementation 
is usually done by extending the `alfresco.war` with what is known as a Repository Action. This Extension Point documentation 
describes the back end. The front-end implementation is usually achieved by extending the Alfresco `share.war` with a 
[Document Library Action]({% link content-services/7.2/develop/share-ext-points/doclib.md %}).

Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the 
repository through a Spring configuration file. Actions provide the ideal place to put your common, highly reusable 
business logic. You can then call these actions from within the repository for any number of content objects.

You can perform operations on the repository where those operations are implemented as actions. For example, you might 
create a folder rule that automatically sends an email with incoming content as an attachment. The rule triggers an action. 
You must implement one method that tells the action what to do. Your method is given the action parameters as well as 
the node upon which the action is being called. An example implementation of a *Send-As-Email* action that can handle 
email attachments is as follows:

```java
public class SendAsEmailActionExecuter extends ActionExecuterAbstractBase {
    private static Log logger = LogFactory.getLog(SendAsEmailActionExecuter.class);

    public static final String PARAM_EMAIL_TO_NAME = "to";
    public static final String PARAM_EMAIL_SUBJECT_NAME = "subject";
    public static final String PARAM_EMAIL_BODY_NAME = "body_text";

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    @Override
    protected void addParameterDefinitions(List<ParameterDefinition> paramList) {
        for (String s : new String[]{PARAM_EMAIL_TO_NAME, PARAM_EMAIL_SUBJECT_NAME, PARAM_EMAIL_BODY_NAME}) {
            paramList.add(new ParameterDefinitionImpl(s, DataTypeDefinition.TEXT, true, getParamDisplayLabel(s)));
        }
    }

    @Override
    protected void executeImpl(Action action, NodeRef actionedUponNodeRef) {
        if (serviceRegistry.getNodeService().exists(actionedUponNodeRef) == true) {
            // Get the email properties entered via Share Form
            String to = (String) action.getParameterValue(PARAM_EMAIL_TO_NAME);
            String subject = (String) action.getParameterValue(PARAM_EMAIL_SUBJECT_NAME);
            String body = (String) action.getParameterValue(PARAM_EMAIL_BODY_NAME);

            // Get document filename
            Serializable filename = serviceRegistry.getNodeService().getProperty(
                    actionedUponNodeRef, ContentModel.PROP_NAME);
            if (filename == null) {
                throw new AlfrescoRuntimeException("Document filename is null");
            }
            String documentName = (String) filename;

            try {
                // Create mail session
                Properties mailServerProperties = new Properties();
                mailServerProperties = System.getProperties();
                mailServerProperties.put("mail.smtp.host", "localhost");
                mailServerProperties.put("mail.smtp.port", "2525");
                Session session = Session.getDefaultInstance(mailServerProperties, null);
                session.setDebug(false);

                // Define message
                Message message = new MimeMessage(session);
                String fromAddress = "training@alfresco.com";
                message.setFrom(new InternetAddress(fromAddress));
                message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
                message.setSubject(subject);

                // Create the message part with body text
                BodyPart messageBodyPart = new MimeBodyPart();
                messageBodyPart.setText(body);
                Multipart multipart = new MimeMultipart();
                multipart.addBodyPart(messageBodyPart);

                // Create the Attachment part
                //
                //  Get the document content bytes
                byte[] documentData = getDocumentContentBytes(actionedUponNodeRef, documentName);
                if (documentData == null) {
                    throw new AlfrescoRuntimeException("Document content is null");
                }
                //  Attach document
                messageBodyPart = new MimeBodyPart();
                messageBodyPart.setDataHandler(new DataHandler(new ByteArrayDataSource(
                        documentData, new MimetypesFileTypeMap().getContentType(documentName))));
                messageBodyPart.setFileName(documentName);
                multipart.addBodyPart(messageBodyPart);

                // Put parts in message
                message.setContent(multipart);

                // Send mail
                Transport.send(message);

                // Set status on node as "sent via email"
                Map<QName, Serializable> properties = new HashMap<QName, Serializable>();
                properties.put(ContentModel.PROP_ORIGINATOR, fromAddress);
                properties.put(ContentModel.PROP_ADDRESSEE, to);
                properties.put(ContentModel.PROP_SUBJECT, subject);
                properties.put(ContentModel.PROP_SENTDATE, new Date());
                serviceRegistry.getNodeService().addAspect(actionedUponNodeRef, ContentModel.ASPECT_EMAILED, properties);
            } catch (MessagingException me) {
                me.printStackTrace();
                throw new AlfrescoRuntimeException("Could not send email: " + me.getMessage());
            }
        }
    }
    
    private byte[] getDocumentContentBytes(NodeRef documentRef, String documentFilename) { ... }
}
```

Repository Action implementations should extend the `org.alfresco.repo.action.executer.ActionExecuterAbstractBase` base class.

Many action implementations will need some input data and this is handled via parameter definitions. The `addParameterDefinitions` 
method is used to indicate to the system what parameters an action requires. In the case of this "Send-As-Email" action address, 
subject, and body text needs to be passed into the action.

The `executeImpl` method is the main method where the action logic is implemented. This method takes an `Action` object, 
which can be used to get to the passed in parameters, and a `NodeRef` pointing to the content node (file or folder) that 
the action was applied to.

Once the action implementation is finished it needs to be registered via a Spring bean before it can be used and recognized 
in the UI. Here is how you can register the "Send-As-Email" action:

```xml
<beans>
	<bean id="send-as-email"
		  class="org.alfresco.tutorial.repoaction.SendAsEmailActionExecuter"
		  parent="action-executer">
		<property name="serviceRegistry">
			<ref bean="ServiceRegistry" />
		</property>
	</bean> 
</beans>
```

The important part of the Spring bean definition is the `id`, which will be the identifier this action will be known by. 
Then the bean needs to have the `action-executer` bean as parent. Note here the use of `ServiceRegistry`, which is the 
best practice approach to get to the Content Services public services, such as the `NodeService`.

You can now invoke this action from, for example, a snippet of JavaScript code like this (useful if the action should 
be invoked from a Rule):

```javascript
var document = space.childByNamePath("/somefile.txt");
var sendAsEmailAction = actions.create("send-as-email");
sendAsEmailAction.parameters["to"] = "fred.blogs@alfresco.com";
sendAsEmailAction.parameters["subject"] = "Doc " + document.name;
sendAsEmailAction.parameters["body_text"] = "A copy of the " + document.name + " is attached";
sendAsEmailAction.execute(document);
```

In Content Services JavaScript the special root object `actions` are used to invoke an action.

We can also invoke actions from custom Java code:

```java
public void sendEmailWithDoc(String to, String subject, String bodyText, NodeRef docNodeRef) {
    boolean executeAsync = true;
    Map<String, Serializable> aParams = new HashMap<String, Serializable>();
    aParams.put("to", to);
    aParams.put("subject", subject);
    aParams.put("body_text", bodyText);

    Action a = serviceRegistry.getActionService().createAction("send-as-email", aParams);
    if (a != null) {
       serviceRegistry.getActionService().executeAction(a, docNodeRef, true, executeAsync);
    } else {
       throw new RuntimeException("Could not create send-as-email action");
    }
}
```

The `ActionService` is used to both create and invoke the action. Note here that it is possible to execute an action 
asynchronously in the background, as in the above Java code that sets `executeAsync` to `true`.

So you can see that Repository Actions are useful in many different situations, such as when you want to:

* Define one or more operations that can be executed repeatedly (Re-use)
* Make it easy for end-users to invoke common operations, either by clicking a menu item or by configuring a rule on a folder that will execute the operations automatically (Hide complex logic)
* Perform one or more operations from a workflow (Automation)
* Perform one or more operations on a schedule (Automation)

>**Important:** There is already an out-of-the-box `mail` action, which can be used to send an email. However, it does not support sending an attachment.

## Deployment - App Server

A Repository Action is usually implemented in Java, which is not suitable for manual installation into an 
Content Services installation. Use a Repo AMP project instead.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{domain specific directory path}` - Java action implementation
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml` - Action Spring Bean definition

## Sample Code

* [Custom Repository Action Implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-action-repo){:target="_blank"}
* [See the Rating Extension Point for example action that creates a rating for a node](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-rating-repo){:target="_blank"}

## Tutorials

* [Jeff Potts Alfresco Developer Series: Adding Repo and DocLib actions](http://ecmarchitect.com/alfresco-developer-series-tutorials/actions/tutorial/tutorial.html){:target="_blank"} - a very thorough walk-through of how to develop Repository Actions and Document Library actions, a must read.
