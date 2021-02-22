# NodeService

Provides an API for managing nodes.

|Information|NodeService|
|-----------|-----------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Nodes are the fundamental data structure in Alfresco ECM. All content that is stored is represented by a node data structure, which contains content metadata and is persisted in a database \(such as PostgreSQL\). The content referenced by the node is stored as a \*.bin file in a content store \(such as the file system, S3, encrypted or other content store\). Every node in the system is referenced by a NodeRef, which is made up of the content store protocol, the content store name, and the Universal Unique Identifier \(UUID\) of the content, for example: `workspace://SpacesStore/ccb906ba-a768-4ccb-8b26-515119e1efdc`. Generally nodes are of two main types, a content node \(`cm:content`\), or a folder node \(`cm:folder`\). Folders can contain child nodes. Note that each content store will have a root node, and all other nodes in the store will be children of the root node.

 The NodeService provides an extensive API for managing nodes. Functionality includes:

-   Adding aspects, children, properties, associations
-   Getting aspects, children, properties, associations
-   Removing aspects, children, properties, associations
-   Creating and deleting stores
-   Creating and deleting nodes
-   Checking for existence of a node
-   Get available content stores
-   Moving nodes

 The NodeService makes extensive use of NodeRefs to reference the node of interest.

|
|Deployment - App Server|Deploy as AMP or Simple Module \(JAR\) package.|
|Deployment - SDK Project|Use SDK archetypes to produce AMP or Simple Module.|
|Java API|[Java API](http://dev.alfresco.com/resource/docs/java/org/alfresco/service/cmr/repository/NodeService.html)|
|Java example|```

                  

// Getting a NodeRef from its path

StoreRef storeRef = new StoreRef(StoreRef.PROTOCOL_WORKSPACE, "SpacesStore");
ResultSet rs = searchService.query(storeRef, SearchService.LANGUAGE_LUCENE, "PATH:\"/app:company_home/app:user_homes/sys:boris/cm:mypics\"");
NodeRef companyHomeNodeRef = null;
try
{
  if (rs.length() == 0)
  {
      throw new AlfrescoRuntimeException("Didn't find Company Home");
  }
  companyHomeNodeRef = rs.getNodeRef(0);
}
finally
{
  rs.close();
}

// Getting a file name from a NodeRef

String fileName = (String) nodeService.getProperty(nodeRef, ContentModel.PROP_NAME);

// Reading a property of a node
// The property may come from an aspect or not. You will probably want to cast to the appropriate type.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
value = nodeService.getProperty(nodeRef, PROP_QNAME_MY_PROPERTY);

// Updating a property of a node
// The property may come from an aspect or not.

QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
nodeService.setProperty(nodeRef, PROP_QNAME_MY_PROPERTY, value);

// Getting the parent of a NodeRef

ChildAssociationRef childAssociationRef = nodeService.getPrimaryParent(nodeRef);
NodeRef parent = childAssociationRef.getParentRef();

// Adding an aspect to a node
// Supposing the "MyAspect" aspect defines a "myProperty" property in the "custom.model" namespace.

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
QName PROP_QNAME_MY_PROPERTY = QName.createQName("custom.model", "myProperty");
Map<QName,Serializable> aspectValues = new HashMap<QName,Serializable>();
aspectValues.put(PROP_QNAME_MY_PROPERTY, value);
nodeService.addAspect(nodeRef, CUSTOM_ASPECT_QNAME, aspectValues);

// Checking whether a node has a given aspect

QName CUSTOM_ASPECT_QNAME = QName.createQName("custom.model", "MyAspect");
boolean hasAspect = nodeService.hasAspect(node, CUSTOM_ASPECT_QNAME);

// Looping through children of a NodeRef

List<ChildAssociationRef> children = nodeService.getChildAssocs(companyHome);
for (ChildAssociationRef childAssoc : children) {
  NodeRef childNodeRef = childAssoc.getChildRef();
  // Use childNodeRef here.
}

// Creating a child association between two existing NodeRef

QName PROP_QNAME_MY_CHILD_ASSOCIATION = QName.createQName("custom.model", "myChildAssociation");
nodeService.addChild(parentNodeRef, childNodeRef, PROP_QNAME_MY_CHILD_ASSOCIATION, PROP_QNAME_MY_CHILD_ASSOCIATION);

// Creating an association between two NodeRef

QName PROP_QNAME_MY_ASSOCIATION = QName.createQName("custom.model", "myAssociation");
nodeService.createAssociation(sourceNodeRef, targetNodeRef, PROP_QNAME_MY_ASSOCIATION);

// Setting the type of a node

QName PROP_QNAME_MY_TYPE = QName.createQName("custom.model", "myType");
nodeService.setType(finalOriginal, MY_TYPE);

// Getting the MIME type of a node

ContentData contentData = (ContentData) nodeService.getProperty(nodeRef, ContentModel.PROP_CONTENT);
String originalMimeType = contentData.getMimetype();

// Adding a category to a node

ArrayList<NodeRef> categories = new ArrayList<NodeRef>(1);
categories.add(categoryNode);
if(!nodeService.hasAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE)
{
  HashMap<QName, Serializable> props = new HashMap<QName, Serializable>();
  props.put(ContentModel.PROP_CATEGORIES, categories);
  nodeService.addAspect(targetNode, ContentModel.ASPECT_GEN_CLASSIFIABLE, props);
}
else
{
  nodeService.setProperty(targetNode, ContentModel.PROP_CATEGORIES, categories);
}

// Getting the categories of a node

List<NodeRef> categories = (List<NodeRef>) nodeService.getProperty(nodeRef, ContentModel.PROP_CATEGORIES);

// Deleting a node for real (not recycle bin)

nodeService.addAspect(nodeRef, ContentModel.ASPECT_TEMPORARY, null);
nodeService.deleteNode(nodeRef);
                  
               
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).
-   [Custom Content Store platform extension point documentation](dev-extension-points-custom-content-store.md)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

