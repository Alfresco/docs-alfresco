# WorkflowService

Provides a client-facing API for interacting with Alfresco Workflows and Tasks.

|Information|WorkflowService|
|-----------|---------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The Activiti workflow engine is built into Alfresco ECM. You can [create and manage workflows](../topics/wf-howto.md) directly from your Dashboard. Of course, with the WorkflowService, you can create and manage these workflows programmatically. The default workflows OOTB are: -   New Task
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
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/workflow/WorkflowService.html)|
|Java example|An extensive example of using the Workflow API is provided in the code ./projects/repository/source/java/org/alfresco/repo/workflow/WorkflowInterpreter.java.|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Workflow platform extension point documentation](dev-extension-points-workflow.md)
-   [Creating and managing workflows](../topics/wf-howto.md)
-   [Activiti Documentation](http://docs.alfresco.com/activiti/topics/welcome.html)

|
|Tutorials|-   [Advanced Workflows using Activiti by Jeff Potts](http://ecmarchitect.com/archives/2012/02/20/1552)
-   [Alfresco workflow video by Joram Barrez](https://www.youtube.com/watch?v=og-pJPp9d_s)

|
|Alfresco Developer Blogs|None|

