---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Workflow

The Activiti workflow engine is built into Alfresco Content Services. It also provides UI in Alfresco Share to allow you to create standard workflows and manage them. In addition, as a developer, you can create custom workflows and manage them programmatically.

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
parameters["bpm:workflowDescription"] = "Testing Workflow ";
parameters["someCustomWorkflowVariable"]="someVal";
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
parameters["bpm:workflowDueDate"] = futureDate; 
workflowAction.startWorkflow(package, parameters);               
```

|
|Alfresco ReST API|The Alfresco ReST API provides APIs for dealing with process definitions, process instances, and tasks. To see the reference documentation for these APIs, and to try them out on the online ReST API explorer, go to [https://api-explorer.alfresco.com/api-explorer](https://api-explorer.alfresco.com/api-explorer). If you have the ReST API explorer running locally, then go to [http://localhost:8080/api-explorer](http://localhost:8080/api-explorer). Now, by default the ReST API Explorer will show the API Definitions for the Core API. You need to switch to the Workflow API definition in the *API definition* drop down box at the top of the page.|
|CMIS ReST API|Not Available|
|Mobile SDK \(iOS\)|The [WorkflowService](http://docs.alfresco.com/mobile_sdk/ios/references/services/AlfrescoWorkflowService.html) is exposed. The [Model](http://docs.alfresco.com/mobile_sdk/ios/references/model/Model.html) also exposes various [Workflow data structures](http://docs.alfresco.com/mobile_sdk/ios/references/model/AlfrescoWorkflowProcess.html).|
|Mobile SDK \(Android\)|The Node is exposed in the SDK Model. You can review the [documentation for AlfrescoNode](http://docs.alfresco.com/mobile_sdk/android/references/client_api/model/Node.html)|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Workflow platform extension point documentation](dev-extension-points-workflow.md)
-   [Creating and managing workflows](../topics/wf-howto.md)
-   [Activiti Documentation](http://docs.alfresco.com/activiti/topics/welcome.html)

|

**Parent topic:**[Using the APIs by Function](../concepts/dev-api-by-function.md)

