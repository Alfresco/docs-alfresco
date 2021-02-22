---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: create
---

# ```execute```

`execute(node)`

This method executes the action against the specified node. The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

## Parameters

-   **node**

    The specified node


## Example

```
Executing the mail action:

// create mail action   
var mail = actions.create("mail");   
mail.parameters.to = "davidc@alfresco.com";   
mail.parameters.subject = "Hello from JavaScript";   
mail.parameters.from = "davidc@alfresco.com";   
mail.parameters.template = root.childByNamePath
("Company Home/Data Dictionary/Email Templates/notify_user_email.ftl");   
mail.parameters.text = "some text, in case template is not found";   
// execute action against a document       
mail.execute(doc); 

```

**Parent topic:**[ScriptAction API](../references/API-JS-ScriptAction.md)

