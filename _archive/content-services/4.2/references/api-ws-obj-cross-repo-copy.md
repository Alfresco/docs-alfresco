---
author: Alfresco Documentation
---

# crossRepoCopy

A root level object crossRepoCopy is provided to enable copy of nodes between document management spaces \(ADM\) and WCM spaces \(AVM\).

A root level object crossRepoCopy is provided to enable copy of nodes between document management spaces \(ADM\) and WCM spaces \(AVM\):

```
        
ScriptNode copy(ScriptNode source, ScriptNode destination, String name) 

```

Copies a source node to the specified destination folder. The source or destination node can be in any repository store such as an AVM Store or the SpaceStore. When copying between stores of different types, the aspects and properties of the node will remain intact but the node type may be downgraded and all associations will be lost.

**Parent topic:**[Root objects reference](../references/api-ws-root-ref.md)

