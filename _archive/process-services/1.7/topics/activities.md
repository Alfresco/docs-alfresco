# Activities

An activity describes a single item of work to be performed in a process. Alfresco Process Services provides some Activity types that are additional to those described in the BPMN 2.0 specification.

An activity is always visualized as a rectangle with rounded corners.

-   **[User task](../topics/user_task.md)**  
A user task enables you to model work to be done by a human actor. When process execution arrives at a user task in the process definition, it creates a new task in the task list of the assignee or assignees defined in the task.
-   **[Service task](../topics/service_task.md)**  
Use a service task to invoke an external Java class or execute an expression \(for example to call a Spring bean\).
-   **[Script task](../topics/script_task.md)**  
A script task defines a JavaScript script or other script language \(JSR-223 compatible language\) that is executed when a process instance executes this step.
-   **[Business rule task](../topics/business_rule_task.md)**  
A Business rule task executes one or more rules. It is mainly there for compatibility with Alfresco Process Services community. Alfresco recommends that you use Decision tables. See LINKHERE for more information.
-   **[Receive task](../topics/receive_task.md)**  
A Receive Task waits for the arrival of an external trigger. This trigger is sent programmatically \(via Java or REST API\). For process to process triggering, use the signal events.
-   **[Manual task](../topics/manual_task.md)**  
A Manual Task defines a task that is external to Alfresco Process Services. You use it to model work done which the Process Engine does not know of. A manual task is handled as a pass-through activity, the Process Engine automatically continues the process from the instant process execution arrives at a manual task activity.
-   **[Mail task](../topics/mail_task.md)**  
You can enhance your business process with this automatic mail service task that sends emails to one or more recipients. The task supports normal email features such as cc lists, bcc lists, and HTML content.
-   **[Camel task](../topics/camel_task.md)**  
You use the Camel task to send messages to, and receive messages from Apache Camel.
-   **[Mule task](../topics/mule_task.md)**  
Use the Mule task to send messages to the Mule ESB \(Enterprise Service Bus\).
-   **[Rest call task](../topics/rest_call_task.md)**  
The rest call task is used to communicate with a REST endpoint. The endpoint can be defined in the process definition, or it can be defined company-wide by an administrator. In the latter case, a logical name is all that is needed.
-   **[Generate document task](../topics/generate_document_task.md)**  
The generate document task generates a document \(Word or PDF\) and stores the reference to the document as a process variable. The document is based on a \(Word\) template that describes how the document needs to be rendered, using process variables and various constructs \(such as if-clauses and loops\). See the Developer Guide on how to use the generate document task.
-   **[Decision task](../topics/decision_task.md)**  
You use a decision task to select a decision table while designing your process model. A decision table enables you to define a set of business rules that will be applied when it’s executed. See the LINKHERE section for more information.
-   **[Store Entity task](../topics/store_entity_task.md)**  
Use the Store entity task to update data models or entities with process values such as variables or form fields. The updated entities can then be mapped to variables and used while creating processes.

**Parent topic:**[BPMN editor](../topics/bpmn_editor.md)

