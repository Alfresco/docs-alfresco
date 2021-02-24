---
author: [Alfresco Documentation, Alfresco Documentation]
---

# RenditionService

Provides support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content \(or other properties\) are changed. Examples of renditions include reformatted content \(essentially a transformation from one MIME-type to another\), rescaled images \(including thumbnails\), and the output of a Freemarker or XSLT template. Renditions can be performed synchronously or asynchronously and can be created at a specified location within the Alfresco repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

|Information|RenditionService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The DM Rendition Service was introduced in Alfresco 3.3. Its purpose is to provide support for rendering content nodes into other forms, known as renditions. The rendition nodes are derived from their source node and as such can be updated automatically when their source node's content \(or other properties\) are changed. Examples of renditions include: -   Reformatted content \(essentially a transformation from one MIME-type to another\)
-   Rescaled images \(including thumbnails\) the output of a Freemarker or XSLT template

 Renditions can be performed synchronously or asynchronously and can be created at a specified location within the Alfresco repository. By default they are created as primary children of their source node but it is possible to have them created at other nodes specified explicitly or as templated paths.

 -   **Rendering Engines**

Are responsible for performing the transformation on a source node to create a rendition. Different Rendering Engines will perform different types of transformation. They can be registered with the Rendition Service using a unique name.

-   **Rendering Engine Definitions**

Provide a description of a given Rendering Engine. Each Rendering Engine Definition exposes parameter definitions for all the parameters which can be provided to the associated Rendering Engine. Each parameter definition describes the parameter name, type and whether or not it is mandatory.

-   **Rendition Definitions**

Encapsulate all the necessary information for rendering a given source node into a rendition. This includes the Rendering Engine which is used to perform the rendition and all the parameter values specified. Rendition Definitions have unique, qualified names and can be persisted within the repository.

-   **Composite Rendition Definitions**

are a special type of Rendition Definition which allow the creation of renditions which require a sequence of two or more transformation steps. For example, a Composite Rendition Definition could be used to first reformat a PDF document into a PNG image and then resize the image to a small thumbnail. Composite Rendition Definitions specify an ordered list of other Rendition Definitions to be sequentially executed, with the output of the previous transformation feeding in as the source node for the next definition. All Composite Rendition Definitions specify the Composite Rendering Engine for their transformations.


 Available rendering engines include:

 -   Base rendering engine
-   Reformat rendering engine
-   Image rendering engine
-   FreeMarker rendering engine
-   XSLT rendering engine
-   HTML rendering engine
-   Composite rendering engine

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/rendition/RenditionService.html)|
|Java example|**Registering a new Rendering Engine**

 Rendering Engines are registered with the Rendition Service through Spring dependency injection. rendition-services-context.xml declares an abstract bean called baseRenderingAction which is the parent bean for all rendering engines. baseRenderingAction itself is a child bean of the ActionService's action-executer bean.

 Alfresco provides a number of concrete rendering engine beans e.g. reformat within the same spring context file. In order to register a new rendering engine, simply add new spring bean definitions in the normal way.

 **Retrieving registered Rendering Engine Definitions**

 ```

                
// Rendering Engine Definitions can be retrieved
// 1. as a list of all registered engine definitions

List<RenderingEngineDefinition> engineDefs = renditionService.getRenderingEngineDefinitions();

// 2. by name
// This name must be the same as the spring bean name used for the rendering engine.

String renderingEngineName = "myEngineName";
RenderingEngineDefinition engineDef = renditionService.getRenderingEngineDefinition(renderingEngineName);
             
```

 **Creating a Rendition Definition**

 ```


// Names must be provided for the rendition definition and the rendering engine to use.
QName  renditionName       = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
String renderingEngineName = ReformatRenderingEngine.NAME;

// Create the Rendition Definition object.
RenditionDefinition renditionDef = renditionService.createRenditionDefinition(renditionName, renderingEngineName);

// Set parameters on the rendition definition.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);


```

 **Storing a Rendition Definition**

 ```


// Store the Rendition Definition using the QName
// of the Rendition Definition as a unique identifier.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Retrieving a Rendition Definition**

 ```


// Rendition Definitions can be retrieved:
// 1. As a list of all stored Rendition Definitions
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 2. As a list of stored Rendition Definitions filtered by Rendering Engine name.
String renderingEngineName = "myEngineName";
List<RenditionDefinition> definitions = renditionService.loadRenditionDefinitions();

// 3. As a single Rendition Definition, uniquely identified by its QName.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);


```

 **Editing an existing Rendition Definition**

 ```


// Retrieve the existing Rendition Definition
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
RenditionDefinition renditionDef = renditionService.loadRenditionDefinition(renditionName);

// Make changes.
renditionDef.setParameterValue(AbstractRenderingEngine.PARAM_MIME_TYPE, MimetypeMap.MIMETYPE_PDF);
renditionDef.setParameterValue(RenditionService.PARAM_ORPHAN_EXISTING_RENDITION, true);

// Persist the changes.
renditionService.saveRenditionDefinition(renditionDef);


```

 **Performing a simple rendition**

 ```


// A rendition definition is required to perform any rendition.
// The rendition definition can be loaded from the repository or created as shown above.
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, renditionDef);


```

 **Performing a composite rendition**

 ```


// First obtain a Composite Rendition Definition
// This can be loaded from the repository or created as shown here.
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRendDefn");
CompositeRenditionDefinition compositeDefinition  = 
renditionService.createCompositeRenditionDefinition(renditionName);

// Now specify which other renditions are to be performed as part of the composite rendition.
RenditionDefinition reformatDefinition = renditionService.load(reformatRenditionName);
RenditionDefinition rescaleImageDefinition = renditionService.load(rescaleImageRenditionName);

compositeDefinition.addAction(reformatDefinition);
compositeDefinition.addAction(rescaleImageDefinition);

// Perform the composite rendition
NodeRef sourceNode = // obtained in the usual way e.g. from nodeService
ChildAssociationRef renditionAssoc = renditionService.render(sourceNode, compositeDefinition);


```

 **Retrieving renditions for a node**

 ```


NodeRef sourceNode = // obtained in the usual way e.g. from nodeService

// 1. Get all renditions with the specified node as their source.
List<ChildAssociationRef> allRenditions = renditionService.getRenditions(sourceNode);

// 2. Get the rendition with the specified source node and the specified rendition definition name.
//    If there is no matching rendition, null is returned
QName renditionName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI, "myRenditionDef");
ChildAssociationRef rendition = renditionService.getRenditionByName(sourceNode, renditionName);

// 3. Get the renditions with the specified source node whose MIME types match a filter
//    This example returns renditions whose mimetype starts with "image".
List<ChildAssociationRef> imageRenditions = renditionService.getRenditions(sourceNode, "image");



```

 **Specifying a RenditionDefinition as asynchronous or synchronous**

 This behaviour is inherited from the ActionService - remember that RenditionDefinition extends Action. So we can create a Rendition Definition as shown above and set it to execute asynchronously:

 ```


RenditionDefinition renditionDef = // created as shown above

renditionDef.setExecuteAsynchronously(true);


```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Mimetypes platform extension documentation](dev-extension-points-mimetypes.md)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

