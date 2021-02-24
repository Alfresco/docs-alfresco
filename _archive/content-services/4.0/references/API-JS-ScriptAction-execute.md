---
author: [Alfresco Documentation, Alfresco Documentation]
source: JavaScript API
audience: 
category: JS API
option: execute
---

# `execute()`

`execute()` these methods execute the action against the specified node.

**Parent topic:**[ScriptAction API](../references/API-JS-ScriptAction.md)

## `execute(node)`

`execute(node)` executes the action against the specified node.

The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

### Parameters

-   **node**

    The node on which to execute the action.


### Example

Executing the mail action:

```


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

## `execute(node, readOnly, newTxn)`

`execute(node, readOnly, newTxn)` executes the action against the specified node.

The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

### Parameters

-   **node**

    The node on which to execute the action.

-   **readOnly**

    Set to true to start a read-only transaction, false otherwise.

-   **newTxn**

    Set to true to start a new transaction, false to use the existing transaction.


### Example

```

             
        
```

## `execute(nodeRef)`

`execute(nodeRef)` executes the action against the specified node.

The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

### Parameters

-   **nodeRef**

    The node on which to execute the action.


### Example

```

             
        
```

## `execute(nodeRef, readOnly, newTxn)`

`execute(nodeRef, readOnly, newTxn)` executes the action against the specified node.

The action \(and its parameters\) may be reused against many nodes by repeatedly invoking execute. Between invocations, the parameters of the action may be changed.

### Parameters

-   **nodeRef**

    The node on which to execute the action.

-   **readOnly**

    Set to true to start a read-only transaction, false otherwise.

-   **newTxn**

    Set to true to start a new transaction, false to use the existing transaction.


### Example

```

             
        
```

