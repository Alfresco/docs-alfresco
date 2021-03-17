---
author: [Alfresco Documentation, Alfresco Documentation]
---

# WorkflowService

Provides a client-facing API for interacting with workflows and tasks.

|Information|WorkflowService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The Activiti workflow engine is built into Alfresco Content Services. You can [create and manage workflows](../topics/wf-howto.md) directly from your Dashboard. Of course, with the WorkflowService, you can create and manage these workflows programmatically. The default workflows out-of-the-box are: -   New Task
-   Assign a new task to yourself or a colleague
-   Review and approve \(group review\)
-   Assign a review task to a group
-   Review and Approve \(one or more reviewers\)
-   Assign a review task to multiple reviewers
-   Review and Approve \(pooled review\)
-   Assign a review task to multiple reviewers, who can take ownership of the task
-   Review and Approve \(single reviewer\)
-   Assign a review task to a single reviewer

 It is also possible to create custom workflows.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/workflow/WorkflowService.html)|
|Java example|An extensive example of using the Workflow API is provided in the code ./projects/repository/source/java/org/alfresco/repo/workflow/WorkflowInterpreter.java.|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Workflow platform extension point documentation](dev-extension-points-workflow.md)
-   [Creating and managing workflows](../topics/wf-howto.md)
-   [Activiti documentation](http://docs.alfresco.com/activiti/topics/welcome.html)

|
|Tutorials|-   [Creating Custom Advanced Workflows in Alfresco by Jeff Potts](https://ecmarchitect.com/alfresco-developer-series-tutorials/workflow/tutorial/tutorial.html)

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

