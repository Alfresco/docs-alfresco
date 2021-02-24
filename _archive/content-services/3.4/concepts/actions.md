---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Customization, Alfresco repository]
keyword: [extend Alfresco, repository, actions]
---

# Actions

Actions are Spring beans that act upon a content node. You develop actions using Java and register them with the repository through a Spring configuration file. Actions provide the ideal place to put your common, highly reusable business logic. You can then call these actions from within the repository for any number of content objects.

You can do many interesting things with the Alfresco repository that are actually implemented as actions. For example, you might wire in a rule behind a space that tells the space to automatically make copies of incoming content. The rule triggers an action. You just have to implement one method that tells the action what to do. Your method is given the action parameters as well as the node upon which the action is being called. You could write a very simple copy action that might look something like this:

```
public void executeImpl(Action action, NodeRef node)
{
  if (this.nodeService.exists(node) == true)
  {
  // we take in two parameters
  NodeRef parent = (NodeRef) action.getParameterValue("destination_folder");
  String name = (String) action.getParameterValue("destination_name");
  
  // association type and associated content name
  QName assocType = (QName) ContentModel.ASSOC_CONTAINS;
  Qname assocName = QName.createQName(ContentModel.CONTENT_MODEL_1_0_URI, name);

  // Create a new copy of the node
  this.copyService.copyAndRename(node, parent, assocType, assocName, true);
  }
}
```

You register your Java bean via Spring configuration, and it is then registered with the repository under a specified ID. For the example above, you might select the ID ‘‘my-copy-action.’’

If you have written other Java backing classes for Alfresco \(such as aspects, transformers, or other actions\), you could reuse this action from within those. You may also reuse it from within any server-side scripting files you may have. Here is an example of JavaScript that copies a document to the Company Home folder by using your custom action:

```
var myCopyAction = actions.create("my-copy-action");
myCopyAction.parameters["destination_folder"] = companyhome;
myCopyAction.parameters["destination_name"] = "Copy of " + document.name;
myCopyAction.execute(document);
```

You can also invoke this action from the user interface directly. You can configure Alfresco Explorer and Alfresco Share to participate in providing buttons to trigger actions directly.

**Parent topic:**[Alfresco repository extension points](../concepts/customize-overview.md)

