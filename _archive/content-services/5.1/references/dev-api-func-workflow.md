---
author: Alfresco Documentation
---

# Workflow

Alfresco has the Activiti workflow engine built in. It also provides UI in Share to allow you to create standard workflows and manage them. In addition, as a developer, you can create custom workflows and manage them programmatically.

|Information|Workflow|
|-----------|--------|
|Public Java API|To start and manage workflow instances use the [WorkflowService](dev-services-workflow.md), see also the [JavaDocs](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/workflow/WorkflowService.html).|
|Repository JavaScript API|Use the `workflow` root object, for more info see the [Workflow JavaScrip API documentation](API-JS-WorkflowService.md). Example of how to start a workflow with an attached file:

```
var aFile = search.findNode("<NodeRef>");
var workflowAction = workflow.getDefinitionByName('activiti$some-process-definition-name');
var package= workflow.createPackage();
package.addNode(aFile);
var parameters = new Array(2);
parameters["bpm:workflowDescription"] = "Testing BOPP Workflow ";
parameters["someCustomWorkflowVariable"]="someVal";
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
parameters["bpm:workflowDueDate"] = futureDate; 
workflowAction.startWorkflow(package, parameters);               
```

|
|Alfresco REST API|The Alfresco REST API provides APIs for dealing with [Process Definitions](../pra/1/concepts/act-procdefs.md), [Processes](../pra/1/concepts/act-processes.md), and [Tasks](../pra/1/concepts/act-tasks.md).|
|Mobile SDK \(iOS\)|The [WorkflowService](http://docs.alfresco.com/mobile_sdk/ios/references/services/AlfrescoWorkflowService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/ios/references/model/Model.html) also exposes various [Workflow data structures](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoWorkflowProcess.html).|
|Mobile SDK \(Android\)|The Node is exposed in the SDK Model. You can review the [documentation for Alfresco Node](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Node.html)|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Workflow platform extension point documentation](dev-extension-points-workflow.md)
-   [Creating and managing workflows](../topics/wf-howto.md)
-   [Activiti Documentation](http://docs.alfresco.com/activiti/topics/welcome.html)

|

**Parent topic:**[By Function](../concepts/dev-api-by-function.md)

