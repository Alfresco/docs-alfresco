---
author: Alfresco Documentation
---

# NodeLocator Service Java API

The `NodeLocatorService` looks up node locators registered using Spring configuration by name.

A node locator must implement the `NodeLocator` interface, whose definition is shown below:

```

          
public interface NodeLocator
{
    NodeRef getNode(NodeRef source, Map<String, Serializable> params);
    public List<ParameterDefinition> getParameterDefinitions(); 
}


```

A `NodeLocator` in its simplest form takes a source node, some optional parameters, and then returns a node or null if a suitable node could not be found. If a node is not found the `NodeLocatorService` returns the `NodeRef` representing **Company Home**.

The source node is not mandatory. Node locators can be used to return well known nodes, **Company Home**, **User Home**, for example, in which case a source node is not required.

If a `NodeLocator` has parameters, define them using the same definition classes \(`ParameterDefinition`\) used by the `ActionService`.

A base class called `AbstractNodeLocator` is provided and it is recommended that your `NodeLocator` extends this base class. It provides the functionality to register the `NodeLocator` with the `NodeLocatorService` registry. This class also defines an abstract method your implementation must override.

```
public abstract String getName();
```

This is the unique name for your `NodeLocator` and will be used by the `NodeLocatorService` in the lookup process. It is also used in the `startLocation` configuration.

The example locator, `NamedFolderNodeLocator`, will be named `namedfolder` and will expect a single parameter called `name`, which will indicate what folder to locate. The full source for this example is shown below.

```

            
public class NamedFolderNodeLocator extends AbstractNodeLocator
{
    public static final String LOCATOR_NAME = "namedfolder";
    public static final String NAME_PARAM = "name";

    private NodeService nodeService;
    private FileFolderService fileFolderService;

    public void setNodeService(NodeService nodeService)
    {
        this.nodeService = nodeService;
    }

    public void setFileFolderService(FileFolderService fileFolderService)
    {
        this.fileFolderService = fileFolderService;
    }

    @Override
    public NodeRef getNode(NodeRef source, Map<String, Serializable> params)
    {
        NodeRef node = null;

        String folderName = (String)params.get(NAME_PARAM);
        if (source != null && folderName != null)
        {
            // get the parent of the source node
            NodeRef parent = nodeService.getPrimaryParent(source).getParentRef();
            // look for a child with the provided name
            NodeRef folder = nodeService.getChildByName(parent, ContentModel.ASSOC_CONTAINS, folderName);
            // make sure it's a folder
            if (folder != null && fileFolderService.getFileInfo(folder).isFolder())
            {
                node = folder;
            }
        }
        return node;
    }

    public List<ParameterDefinition> getParameterDefinitions()
    {
        List<ParameterDefinition> paramDefs = new ArrayList<ParameterDefinition>(2);
        paramDefs.add(new ParameterDefinitionImpl(NAME_PARAM, DataTypeDefinition.TEXT, false, "Name"));
        return paramDefs;
    }

    public String getName()
    {
        return LOCATOR_NAME;
    }
}


```

The `source` parameter in `getNode()` represents the starting point, in a form association control this will be the node being edited, for a create form it will be the destination node. The example finds the primary parent of the source node and looks for a child folder with the given name. This is a fairly simple example but it shows how this could be extended to allow for a named folder to be located up or down a folder hierarchy.

**Parent topic:**[NodeLocator service](../concepts/node-locator-intro.md)

