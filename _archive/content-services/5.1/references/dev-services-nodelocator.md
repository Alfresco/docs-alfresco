---
author: [Alfresco Documentation, Alfresco Documentation]
---

# NodeLocatorService

The NodeLocatorService looks up node locators registered via Spring configuration by name.

|Information|NodeLocatorService|
|-----------|------------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|**Introduction**

 The 4.0 release saw the introduction of the `NodeLocatorService`.

 The service provides a way to lookup one node from another, its main use is from the Forms association control, allowing custom "startLocation" strategies to be plugged in.

 **Configuration**

 The `NodeLocatorService` looks up node locators by name, the out-of-the-box node locators are defined in a file named node-locator-context.xml.

 This Spring configuration file defines a base bean that can be used to define new node locator implementations. Using this bean will automatically register the node locator with the repository and make it available.

 This page will use an example node locator to describe the service, it will allow a named folder to be found. To define the example node locator the following Spring configuration would be used \(in a custom context file\):

 ```

               
<bean id="namedFolderNodeLocator" class="com.example.NamedFolderNodeLocator" parent="baseNodeLocator">
   <property name="NodeService" ref="NodeService" />
   <property name="FileFolderService" ref="FileFolderService" />
</bean>
               
               
```

 **Java API**

 The `NodeLocatorService` looks up node locators registered via Spring configuration by name. A node locator must implement the NodeLocator interface, whose definition is shown below:

 ```

                  
public interface NodeLocator
{
    NodeRef getNode(NodeRef source, Map<String, Serializable> params);
    public List<ParameterDefinition> getParameterDefinitions(); 
}
                     
                     
```

 A NodeLocator in its simplest form takes a source node, some optional parameters and returns a node or null if a suitable node could not be found. If a node is not found the NodeLocatorService returns the NodeRef representing "Company Home".

 The source node is not mandatory, node locators can be used to return well known nodes, "Company Home", "User Home" for example in which case a source node is not required.

 If a NodeLocator has parameters they must be defined using the same definition classes \(ParameterDefinition\) used by the ActionService.

 A base class `AbstractNodeLocator` is provided and it is recommended that your NodeLocator extends this base class. It provides the functionality to register the NodeLocator with the NodeLocatorService registry. This class also defines an abstract method your implementation must override.

 ```

public abstract String getName();
                     
```

 This is the unique name for your NodeLocator and will be used by the NodeLocatorService in the lookup process. It is also used in the startLocation configuration.

 **Example**

 Our example locator, NamedFolderNodeLocator, will be named "namedfolder" and will expect a single parameter called "name" which will indicate what folder to locate. The full source for this example is shown below:

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
        if (source != null && folderName != null)
        {
           // get the parent of the source node
           NodeRef parent = nodeService.getPrimaryParent(source).getParentRef();
           // look for a child with the provided name
           NodeRef folder = nodeService.getChildByName(parent, ContentModel.ASSOC_CONTAINS, folderName);
           // make sure it's a folder
           if (folder != null && fileFolderService.getFileInfo(folder).isFolder())
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

 The "source" parameter in `getNode()` represents the starting point, in a form association control this will be the node being edited, for a create form it will be the destination node. Our example finds the primary parent of the source node and looks for a child folder with the given name. This is a fairly simple example but it is easy to see how this could be extended to allow for a named folder to be located up or down a folder hierarchy.

 **REST API**

 A REST API is provided for the NodeLocatorService, it is used by the form association control to determine the startLocation of the control but of course can be used by any client if required.

 The webscript descriptor is shown below:

 ```


<webscript> 
   <shortname>Node Locator</shortname>
   <description>Locates a Node in the repository using the specified Node Location strategy.</description>
   <url>/api/{store_type}/{store_id}/{node_id}/nodelocator/{node_locator_name}</url>
   <url>/api/nodelocator/{node_locator_name}</url>
   <format default="json"/>
   <authentication>user</authentication>
   <transaction allow="readonly">required</transaction>
</webscript>
```

 Two URLs are supported, one that allows a source node to be provided and one that does not, this is useful for "well known" nodes, "Company Home", "Sites Home" for example. Parameters are passed as query string parameters, a request for our example node locator may look like the following:

 ```
http://localhost:8080/alfresco/api/workspace/SpacesStore/28740556-129a-4ae8-b6c8-952fff728d63/nodelocator/namedfolder?name=Example
```

 A typical response is shown below:

 ```

{
  "data":
  {
    "nodeRef": "workspace://SpacesStore/d2a8bc42-4874-4d45-9a23-33cdd02be777"
  }
}
```

 **startLocation**

 The main use of the NodeLocatorService is to determine where the forms association control should start when it is first displayed. In some scenarios the picker may need to start in the root of the document library of a Share site or start in the folder where the node being edit is located. See the next section for a list of NodeLocators provided out-of-the-box.

 NodeLocators are configured using form control parameters. The name of the NodeLocator implementation is provided as the 'startLocation' parameter and the parameters are provided by a 'startLocationParameters' parameter. They should be provided in the form of query string parameters, for example `name=value&name=value`.

 The configuration for our example node locator is shown below, it will look for a folder named "Example" in the same folder as the node being edited.

 ```


<field id="my:association">
   <control>
      <control-param name="startLocation">{namedfolder}</control-param>
      <control-param name="startLocationParams">name=Example</control-param>
   </control>
</field>

```

 **Note:** The curly braces are required around the node locator name.

 **Available Node Locators**

 The following table shows the node locators available out-of-the-box, the parameters they accept and their use.

 |Name|Class|Parameters|Usage|
|----|-----|----------|-----|
|companyhome|CompanyHomeNodeLocator|None|Returns the Company Home node|
|userhome|UserHomeNodeLocator|None|Returns the current user's home folder node|
|sharedhome|SharedHomeNodeLocator|None|Returns the Shared Home root node|
|siteshome|SitesHomeNodeLocator|None|Returns the Sites root node|
|doclib|DocLibNodeLocator|None|Returns the documentLibrary node for the site the source node belongs to|
|self|SelfNodeLocator|None|Returns the source node|
|xpath|XPathNodeLocator|query, store\_type and store\_id|Returns the node pointed to by the given XPath query. The XPath should be relative to the root of a store. If a source node is provided the Store is taken from the node, otherwise the store\_type and store\_id must be provided.|
|ancestor|AncestorNodeLocator|type and aspect|Returns an ancestor node of the source node. If no parameters are provided the immediate parent is returned. If a type parameter is present the first ancestor node of that type is returned. If an aspect parameter is present the first ancestor node with that aspect applied is returned. The type and aspect parameters can be combined thus finding an ancestor node of a certain type and with a specific aspect applied.|

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/repo/nodelocator/NodeLocatorService.html)|
|Java example|See Description for example.|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

