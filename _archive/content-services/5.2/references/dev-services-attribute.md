---
author: [Alfresco Documentation, Alfresco Documentation]
---

# AttributeService

This provides services for reading, writing, and querying global attributes.

|Information|AttributeService|
|-----------|----------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|The `AttributeService` is used to get and set global, arbitrary attributes. Attributes typically have a key and a value, where the key consists of three segments \(known as a key set\) and a value. Attributes are stored in the database so they persist over server restarts. An example of use is for persisting system-wide JMX configuration properties in Alfresco Content Services. The `AttributeService` class provides a Java interface for creating and managing attributes, including methods such as:

-   `Serializable getAttribute(Serializable ... keys)` - get an attribute using a list of unique keys
-   `getAttributes(AttributeQueryCallback callback, Serializable ... keys)` - Getting a collection of attributes
-   `Serializable getAttribute(Serializable ... keys)` - Getting a single attribute
-   `setAttribute(Serializable value, Serializable ... keys)` - Set attribute or create attribute if doesn't exist
-   `removeAttribute(Serializable ... keys)` - Removing an attribute
-   `removeAttributes(Serializable ... keys)` - Removing a collection of attributes

Collections of Attributes can be processed on retrieval by implementing a callback handler object. The callback handler object's `handleAttribute` method is invoked for each attribute retrieved.

**Note**. The `AttributeService` is not what you would use to get the attributes \(more correctly, "properties"\) of a node. Use the [NodeService](dev-services-node.md) class for that.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java source code: aio/platform-jar/src/main/java/\{domain specific package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API Documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/attributes/AttributeService.html)|
|Java example|The following example shows how you could map a unique document identifier to an Alfresco node reference independtly of nodes: ```
public class DocId2NodeRefMapper {
    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public static final String ROOT_ATTR_PATH = "docId2NodeRefMappings";
    public static final String DOC_ID_ATTR_NAME = "documentId";

    public void mapDocId2NodeRef(String doc_id, NodeRef nodeRef) {
 
        // Check if mapping to node ref is already set up
        if (this.serviceRegistry.getAttributeService().exists(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id)) {
 
            // Check to see if this node has already been registered
            if (!this.serviceRegistry.getAttributeService().getAttribute(ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id).equals(nodeRef)) {
                throw new RuntimeException("Duplicate entry id:" + doc_id);
            }
        }

        // Register node reference under document identifier
        this.serviceRegistry.getAttributeService().setAttribute(nodeRef, ROOT_ATTR_PATH, DOC_ID_ATTR_NAME, doc_id);
    }
}
```

Notice how when you set the attribute value the value is the first parameter of the `setAttribute` method.

| |
|More Information|-   [Tech Talk Live video](https://www.youtube.com/watch?v=obQ_89MFtRs)
-   [AttributeService Primer video](https://vimeo.com/67580571)
-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

