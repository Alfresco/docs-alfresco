---
title: Patches Extension Point
---

A patch is a piece of Java code that executes once when Content Services starts. Custom patches can be implemented.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

A patch executes a piece of Java code when Content Services starts up, and logs the result in the 
`ALF_APPLIED_PATCHES` database table. A patch is only executed once and can be targeted at a certain Content Services 
version range. Patches are used a lot by Content Services internally to do things like database schema updates 
and content bootstrapping.

Developing a patch involves a number of steps of which the first one is to implement the Java class that does the actual 
work during the bootstrapping of the repository. As an example, a patch that creates a folder under the `Company Home` 
folder is examined:

```java
public class ContentCreationPatch extends AbstractPatch {
   private static Log logger = LogFactory.getLog(ContentCreationPatch.class);
   private static final String PATCH_ID = "org.alfresco.tutorial.patch.contentCreationPatch";
   private static final String MSG_SUCCESS = PATCH_ID + ".result";
   private static final String MSG_ERROR = PATCH_ID + ".error";
   
   /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
   private ServiceRegistry serviceRegistry;
   
   public void setServiceRegistry(ServiceRegistry serviceRegistry) {
      this.serviceRegistry = serviceRegistry;
   }
   
   @Override
   protected String applyInternal() throws Exception {
      logger.info("Starting execution of patch: " + I18NUtil.getMessage(PATCH_ID));
      
      // Get the store reference for the Repository store that contains live content
      StoreRef store = StoreRef.STORE_REF_WORKSPACE_SPACESSTORE;
      
      // Get root node for store
      NodeRef rootRef = serviceRegistry.getNodeService().getRootNode(store);
      
      // Do the patch work
      createFolder(getCompanyHomeNodeRef(rootRef));
      
      logger.info("Finished execution of patch: " + I18NUtil.getMessage(PATCH_ID));
      
      return I18NUtil.getMessage(MSG_SUCCESS);
    }
```

All patches should extend the `org.alfresco.repo.admin.patch.AbstractPatch` base class, which among other things has 
functionality to register the patch with the server so it is executed. When the patch is executed it will be run in a 
new transaction and any content created will have the System User as creator.

It is good practice to define a patch ID that distinguishes it from other patches, such as out-of-the-box patches and 
patches installed by other extension modules. So in this case `org.alfresco.tutorial.patch.contentCreationPatch` is 
used as the patch ID.

As with all other Java extensions the `ServiceRegistry` is used to get to the Java APIs, such as the `NodeService`. 
This patch gets the root node for the live content store (that is `workspace://SpacesStore`) and then calls a method 
to get the Company Home node reference:

```java
private NodeRef getCompanyHomeNodeRef(NodeRef rootNodeRef) {
    String companyHomeXPath = "/app:company_home";

    List<NodeRef> refs = searchService.selectNodes(rootNodeRef, companyHomeXPath, null,
      serviceRegistry.getNamespaceService(), false);
    if (refs.size() != 1) {
      throw new AlfrescoRuntimeException(I18NUtil.getMessage(MSG_ERROR,
         "Company home could not be found, XPATH query " + companyHomeXPath +
         " returned " + refs.size() + " nodes."));
    }

    return refs.get(0);
}
```

When the `Company Home` node reference is looked up, an XPATH expression is used. This is because the Apache Solr search 
functionality might not be fully initialized during bootstrapping so an XPATH based search is used instead, which does 
not use the Lucene index. Once you have obtained the node reference for `Company Home` the folder is created with the `NodeService`:

```java
private void createFolder(NodeRef rootRef) {
    String folderName = "FolderCreatedByPatch";
    NodeRef parentFolderNodeRef = rootRef;

    // Create Node
    QName associationType = ContentModel.ASSOC_CONTAINS;
    QName associationQName = QName.createQName(NamespaceService.CONTENT_MODEL_1_0_URI,
            QName.createValidLocalName(folderName));
    QName nodeType = ContentModel.TYPE_FOLDER;
    Map<QName, Serializable> nodeProperties = new HashMap<QName, Serializable>();
    nodeProperties.put(ContentModel.PROP_NAME, folderName);
    ChildAssociationRef parentChildAssocRef = nodeService.createNode(
            parentFolderNodeRef, associationType, associationQName, nodeType, nodeProperties);

    NodeRef newFolderNodeRef = parentChildAssocRef.getChildRef();

    // Add an aspect to the node
    Map<QName, Serializable> aspectProperties = new HashMap<QName, Serializable>();
    aspectProperties.put(ContentModel.PROP_TITLE, "My Patch Folder");
    aspectProperties.put(ContentModel.PROP_DESCRIPTION, "This is a folder that has been created by a patch");
    nodeService.addAspect(newFolderNodeRef, ContentModel.ASPECT_TITLED, aspectProperties);
}
```

When the patch class is completed a Spring bean needs to be defined for it. The bean needs to indicate to the server the 
version of Content Services for which it should be run. In the `bootstrap-context.xml` file define a bean as follows:

```xml
<bean id="patch.contentCreationPatch" class="org.alfresco.tutorial.patch.ContentCreationPatch" parent="basePatch">
   <property name="id">
      <value>org.alfresco.tutorial.patch.contentCreationPatch</value>
   </property>
   <property name="description">
      <value>org.alfresco.tutorial.patch.contentCreationPatch.description</value>
   </property>
   <property name="fixesFromSchema">
      <value>0</value>
   </property>
   <property name="fixesToSchema">
      <value>${version.schema}</value>
   </property>
   <property name="targetSchema">
      <value>10000</value>
   </property>
   <property name="serviceRegistry">
      <ref bean="ServiceRegistry"/>
   </property>
</bean>
```

The bean needs to extend the `basePatch` bean so the patch gets automatically registered with the server. Patches will 
be applied to the store only once. This patch should always be run once for every new installation, regardless of 
Content Services version, so setting the `fixesToSchema` value to `${version.schema}`. Note that patches are 
sorted according to `targetSchema`, and lowest will be executed first.

The last thing to do is define the i18n properties for the patch, this is done as follows in a property file:

```text
org.alfresco.tutorial.patch.contentCreationPatch=Create Content
org.alfresco.tutorial.patch.contentCreationPatch.description=Creating a folder under Company Home
org.alfresco.tutorial.patch.contentCreationPatch.result=Created a folder under Company Home
org.alfresco.tutorial.patch.contentCreationPatch.error=Could not create folder under Company Home: {0}
```

When this patch is executed you will see something like the following in the log file if everything went OK:

```text
2016-02-07 17:31:47,700 INFO [admin.patch.PatchExecuter] [localhost-startStop-1] Checking for patches to apply ... 
2016-02-07 17:31:48,207 INFO [admin.patch.PatchExecuter] [localhost-startStop-1] Applying patch 'org.alfresco.tutorial.patch.contentCreationPatch' (Creating a folder under Company Home). 
2016-02-07 17:31:48,550 INFO [admin.patch.PatchExecuter] [localhost-startStop-1] 
=== Applied patch === 
ID: org.alfresco.tutorial.patch.contentCreationPatch RESULT: 
Created a folder under Company Home 
=====================================
```

When working with patches there will be times when you will want to re-run a patch after an update to its implementation. 
Restarting Content Services will not re-run the patch as it only runs once. You can check the status of a patch 
with the following SQL query:

```text
select * from alf_applied_patch where id='org.alfresco.tutorial.patch.contentCreationPatch'
```

This will return information about if the patch was successfully applied, when it was run, to what 
Content Services version it was applied. If the patch failed then an error message is available. 
To reset this database record issue the following update:

```text
update alf_applied_patch set was_executed = 0, succeeded = 0 where id='org.alfresco.tutorial.patch.contentCreationPatch'
```

The patch will now be executed again if Content Services is restarted. However, note that you would have to 
delete any content this patch has created before doing this update, otherwise the patch will fail as the content 
already exists.

## Deployment - App Server

As patches are implemented in Java it is better to use an SDK project for deployment than deploying directly to an application server.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/java/{custom package path}` - Java patch implementation classes
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml` - Spring beans

## More Information

* See the [Bootstrap content]({% link content-services/7.2/develop/repo-ext-points/bootstrap-content.md %}) extension point for out-of-the-box patch implementations that import content.

## Sample Code

* [Sample patch implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-patch-repo){:target="_blank"}
