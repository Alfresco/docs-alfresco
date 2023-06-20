---
title: Data Lists Extension Point
---

Data lists are records of data stored in the repository as nodes. There are a number of data list types available but 
custom ones can also be implemented.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

Data Lists are useful when we have content that is not necessary associated with a file, such as a to-do list. 
This data is more like a database record than a content file with associated metadata. Out-of-the box Content Services 
comes with a number of data lists that are ready to be used:

* **Contact List** - Contacts list including first name, last name, full name, email, job title, phone (office), phone (mobile).
* **Event Agenda** - Manage event agenda items including session names, presenters, start and end times.
* **Event List** - Events list including title, description, location, start and end date/time.
* **Issue List** - Issues list including ID, status, priority, description, due data, comments, assign to, related issues.
* **Location List** - Locations/Addresses list
* **Meeting Agenda** - Manage meeting agenda items including description, owner, allocated time.
* **To Do List** - A simple to do list with optional assignee.
* **Task List (Simple)** - Simple tasks list including title, description, due date, priority, status, comments.
* **Task List (Advanced)** - Advanced tasks list including title, description, start and end dates, priority, status, comments, assignees and attachments.

As we can see, there are quite a few data lists available. If none of them is suitable for your application, then a 
custom data list can be implemented.

Before implementing a custom data list it is good to know a little bit about how they are stored in the repository. 
Let's say we have a site called Test, and in it we have created a new instance of the To Do data list called 'My To-do list'. 
We have then added two items to the list so it looks something like this:

![dev-extensions-repo-data-list-sample-todo]({% link content-services/images/dev-extensions-repo-data-list-sample-todo.png %})

If we now use the Node Browser to have a look at how this data list is stored in the repository, then we will see something like this:

![dev-extensions-repo-data-list-node-browser]({% link content-services/images/dev-extensions-repo-data-list-node-browser.png %})

The two to-do data list items are stored as `dl:todoList` types, which extends the `dl:dataListItem` type, which in 
turn extends the `cm:content` type. The `dl:dataList` node that contains these items knows that they should be of the 
`dl:todoList` type via the `dl:dataListItemType` property value.

The `dl:dataList` type extends the `cm:folder` type. So this is actually similar to a folder containing content less files 
(content items without the file and just metadata).

The only thing we need to do when creating a custom data list is to define a new type that extends the `dl:dataListItem` 
type. As you have probably figured out, a custom data list is defined as a type in a [content model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}).

Let's say we want to keep a list of projects that we are currently working on, then the content model type definition 
would look like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<model name="acmedl:datalistModel" xmlns="http://www.alfresco.org/model/dictionary/1.0">

    <!-- Optional meta-data about the model -->
    <description>ACME Data List Content model</description>
    <author>Martin Bergljung</author>
    <version>1.0</version>

    <imports>
        <!-- Import Alfresco Dictionary Definitions -->
        <import uri="http://www.alfresco.org/model/dictionary/1.0" prefix="d"/>
        <!-- Import Alfresco Content Domain Model Definitions -->
        <import uri="http://www.alfresco.org/model/content/1.0" prefix="cm"/>
        <!-- Import Alfresco Data List Model Definitions -->
        <import uri="http://www.alfresco.org/model/datalist/1.0"   prefix="dl" />
    </imports>

    <!-- Custom namespace for the ACME company Data Lists-->
    <namespaces>
        <namespace uri="http://www.acme.org/model/datalist/1.0" prefix="acmedl"/>
    </namespaces>

    <types>
        <!--
            Data List Item Type for the custom project list
            -->
        <type name="acmedl:projectListItem">
            <title>Project List Item</title>
            <parent>dl:dataListItem</parent>
            <properties>
                <property name="acmedl:projectName">
                    <type>d:text</type>
                    <mandatory>true</mandatory>
                </property>
                <property name="acmedl:projectNumber">
                    <type>d:int</type>
                    <mandatory>true</mandatory>
                </property>
                <property name="acmedl:projectDescription">
                    <type>d:text</type>
                </property>
                <property name="acmedl:projectStartDate">
                    <type>d:date</type>
                </property>
                <property name="acmedl:projectActive">
                    <type>d:boolean</type>
                    <default>true</default>
                </property>
            </properties>
            <associations>
                <association name="acmedl:projectMember">
                    <source>
                        <mandatory>false</mandatory>
                        <many>true</many>
                    </source>
                    <target>
                        <class>cm:person</class>
                        <mandatory>false</mandatory>
                        <many>true</many>
                    </target>
                </association>
            </associations>
        </type>
    </types>

</model>
```

Here we are defining a new data list item type called `acmedl:projectListItem` with a number of properties and an 
association to the project members. This is just straight forward custom [content model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) definitions.

We haven't given any of the properties or the association a title so we add a resource file with labels for the 
content model (called for example `datalist-model.properties`):

```text
acmedl_datalistModel.property.acmedl_projectName.title=Name
acmedl_datalistModel.property.acmedl_projectNumber.title=Number
acmedl_datalistModel.property.acmedl_projectDescription.title=Description
acmedl_datalistModel.property.acmedl_projectStartDate.title=Start Date
acmedl_datalistModel.property.acmedl_projectActive.title=Active
acmedl_datalistModel.association.acmedl_projectMember.title=Members
```

Content model definition and labels are bootstrapped on the repository side as follows:

```xml
<bean id="org.alfresco.tutorial.customdatalist.dictionaryBootstrap"
          parent="dictionaryModelBootstrap"
          depends-on="dictionaryBootstrap">
        <property name="models">
            <list>
                <!-- Bootstrap Data List Model -->
                <value>alfresco/module/${project.artifactId}/model/content-model.xml</value>
            </list>
        </property>
        <property name="labels">
            <list>
                <!-- Bootstrap Resource Bundles for data list type and properties -->
                <value>alfresco/module/${project.artifactId}/messages/datalist-model</value>
            </list>
        </property>
    </bean>
```

The Share application will ask the repository for these titles when putting together the data list user interface. 
The Share side need to however be configured with one form to be used when creating project list items and one form 
to be used when editing project list items.

This is done in `share-config-custom.xml` as usual:

```xml
<alfresco-config>
    <!--
        acmedl:projectListItem type create form config
        -->
    <config evaluator="model-type" condition="acmedl:projectListItem">
        <forms>
            <!-- Create item form -->
            <form>
                <field-visibility>
                    <show id="acmedl:projectName" />
                    <show id="acmedl:projectNumber" />
                    <show id="acmedl:projectDescription" />
                    <show id="acmedl:projectStartDate" />
                    <show id="acmedl:projectActive" />
                    <show id="acmedl:projectMember" />
                </field-visibility>
                <create-form template="../data-lists/forms/dataitem.ftl" />
                <appearance>
                </appearance>
            </form>
        </forms>
    </config>

    <!--
        acmedl:projectListItem type edit form config
    -->
    <config evaluator="node-type" condition="acmedl:projectListItem">
        <forms>
            <form>
                <field-visibility>
                    <show id="acmedl:projectName" />
                    <show id="acmedl:projectNumber" />
                    <show id="acmedl:projectDescription" />
                    <show id="acmedl:projectStartDate" />
                    <show id="acmedl:projectActive" />
                    <show id="acmedl:projectMember" />
                </field-visibility>
                <edit-form template="../data-lists/forms/dataitem.ftl" />
                <appearance>
                </appearance>
            </form>
        </forms>
    </config>
</alfresco-config>
```

If you want a special appearance for a field then use the standard form configuration alternatives as explained in the 
[content model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) section.

Now when we got the Data List up and running it is likely that we want to populate it. Maybe there is data in an external 
system that we want to populate the data list with, or we might just want to use a script to populate it in a repeatable 
and quick way.

One way of doing this is via a [Repository Web Script]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}). Let's create a simple 
Web Script that creates and populates the Project List we created above via both Java and JavaScript. 

The descriptor looks like this:

```xml
<webscript>
    <shortname>Create Data List</shortname>
    <description>Create Data List shows how to programmatically create a Data List instance with an item.</description>
    <url>/tutorial/createdatalist</url>
    <format default="html"></format>
    <authentication>user</authentication>
    <family>Alfresco Tutorials</family>
</webscript>
```

The JavaScript controller creates and populates a Project List like this:

```javascript
// Get/Create data list container
var site = companyhome.childByNamePath("Sites/swsdp");
var dataListContainer = "dataLists";
var dataLists = site.childByNamePath(dataListContainer);
if (!dataLists) {
    var dataLists = site.createNode(dataListContainer, "cm:folder");
    var dataListProps = new Array(1);
    dataListProps["st:componentId"] = dataListContainer;
    dataLists.addAspect("st:siteContainer", dataListProps);
}

var projectListName = "projectListB";
var projectList = dataLists.childByNamePath(projectListName);
if (!projectList) {
    var projectListItemType = "acmedl:projectListItem";

    // Create a Project List
    projectList = dataLists.createNode(projectListName, "dl:dataList");
    projectList.properties["dl:dataListItemType"] = projectListItemType;
    projectList.save();
    var projectListProps = [];
    projectListProps["cm:title"] = "Project List B";
    projectListProps["cm:description"] = "Another project list generated by a javascript.";
    projectList.addAspect("cm:titled", projectListProps);

    // Add an item to the project list
    var startDate = new Date();
    startDate.setDate(startDate.getDate() + 30);
    var project = projectList.createNode(null, projectListItemType);
    project.properties["acmedl:projectName"] = "Project B1";
    project.properties["acmedl:projectNumber"] = "1";
    project.properties["acmedl:projectDescription"] = "Project B1 handling important stuff";
    project.properties["acmedl:projectStartDate"] = startDate;
    project.properties["acmedl:projectActive"] = true;
    project.save();

    // Setup admin user as project member
    var adminUser = people.getPerson("admin");
    project.createAssociation(adminUser, "acmedl:projectMember");

    model.msg2 = "Created Data List: Project List B";
} else {
    model.msg2 = "Did not create Data List: Project List B already exists";
}
```

Working with data list from JavaScript on the server side is the same thing as working with nodes. To create a data list 
and add items to it means creating a number of nodes. The above code also shows how to create the site's data list 
container if it does not exist.

We can do the same thing in a Java Web Script controller:

```java
public class CreateDataListWebScript extends DeclarativeWebScript {
    private final static String NAMESPACE_URI = "http://www.acme.org/model/datalist/1.0";
    private final String DATA_LIST_SITE_CONTAINER = "dataLists";
    private final QName ACMEDL_PROJECT_LIST_ITEM_TYPE = QName.createQName(NAMESPACE_URI, "projectListItem");

    private ServiceRegistry serviceRegistry;

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    @Override
    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();

        // Name of the out-of-the-box Sample site (Web Site Design Project)
        String siteShortName = "swsdp";

        // Name of the data list we are about to create
        String dataListName = "projectListA";

        // Get or create the site data list container (assumes that the site exists)
        if (!serviceRegistry.getSiteService().hasContainer(siteShortName, DATA_LIST_SITE_CONTAINER)) {
            serviceRegistry.getSiteService().createContainer(siteShortName, DATA_LIST_SITE_CONTAINER,
                    ContentModel.TYPE_CONTAINER, null);
        }
        NodeRef dataListContainerNodeRef = serviceRegistry.getSiteService().getContainer(
                siteShortName, DATA_LIST_SITE_CONTAINER);

        // Check that the data list name is not already used
        if (serviceRegistry.getNodeService().getChildByName(
                dataListContainerNodeRef, ContentModel.ASSOC_CONTAINS, dataListName) == null) {
            Map<QName, Serializable> properties = new HashMap<QName, Serializable>();

            // Create the data list
            properties.put(ContentModel.PROP_NAME, dataListName);
            properties.put(ContentModel.PROP_TITLE, "Project List A");
            properties.put(ContentModel.PROP_DESCRIPTION, "A list of projects that has names starting with A");
            properties.put(DataListModel.PROP_DATALIST_ITEM_TYPE, "acmedl:" + ACMEDL_PROJECT_LIST_ITEM_TYPE.getLocalName());
            NodeRef datalistNodeRef = serviceRegistry.getNodeService().createNode(
                    dataListContainerNodeRef,
                    ContentModel.ASSOC_CONTAINS,
                    QName.createQName("cm:projectListA"),
                    DataListModel.TYPE_DATALIST,
                    properties).getChildRef();

            // Create a data list item
            properties.clear();
            properties.put(QName.createQName(NAMESPACE_URI, "projectName"), "Project A1");
            properties.put(QName.createQName(NAMESPACE_URI, "projectNumber"), "1");
            properties.put(QName.createQName(NAMESPACE_URI, "projectDescription"), "Project A1 handling important stuff");
            GregorianCalendar startDate = new GregorianCalendar(2016, 8, 5, 12, 0);
            properties.put(QName.createQName(NAMESPACE_URI, "projectStartDate"), startDate);
            properties.put(QName.createQName(NAMESPACE_URI, "projectActive"), true);
            NodeRef projectANodeRef = serviceRegistry.getNodeService().createNode(
                    datalistNodeRef, ContentModel.ASSOC_CONTAINS,
                    QName.createQName("cm:projectA1"),
                    ACMEDL_PROJECT_LIST_ITEM_TYPE,
                    properties).getChildRef();

            // Setup admin user as project member
            NodeRef adminUserNodeRef = serviceRegistry.getPersonService().getPerson("admin");
            serviceRegistry.getNodeService().createAssociation(projectANodeRef, adminUserNodeRef,
                    QName.createQName(NAMESPACE_URI, "projectMember"));

            model.put("msg", "Created Data List: Project List A");
        } else {
            model.put("msg", "Did not create Data List: Project List A already exists");
        }

        return model;
    }
```

Here we use the site service to check for the data list container and then the node service to create the different nodes.

We might also want to be able to populate data lists remotely. We can easily do this via CMIS. Let's say we got an 
Event data list already created and we want to populate it with some items.

Here is sample code for how to do that for an Event data list:

```java
private static final String SECONDARY_OBJECT_TYPE_IDS_PROP_NAME = "cmis:secondaryObjectTypeIds";

public boolean populateEventDataList(Session session, String eventDataListDesc) {
    // Get available DataLists in the out-of-the-box Sample site (Web Site Design Project)</pre>
    Folder dataLists = (Folder) session.getObjectByPath("/sites/swsdp/dataLists");

    // Iterate through the found data lists until we find the one we want to work with
    Iterator<CmisObject> it = dataLists.getChildren().iterator();
    Folder dataList = null;
    while (it.hasNext()) {
        CmisObject obj = it.next();
        if (obj.getDescription().compareToIgnoreCase(eventDataListDesc) == 0) {
            dataList = (Folder)obj;
        }
    }
    if (dataList == null) {
        // Could not find data list, create it via Share site first
        return false;
    }

    // Define the aspect that contains the titled and description properties, can be added as secondary type
    List<Object> aspects = new ArrayList<Object>();
    aspects.add("P:cm:titled");
    aspects.add("P:cm:attachable"); // Mandatory

    // Add an item to the "Event" data list
    Map<String, Object> properties = new HashMap<String, Object>();
    properties.put(PropertyIds.OBJECT_TYPE_ID, "D:dl:event");
    String eventName = "Summer Olympics";
    properties.put("cmis:name", eventName);
    properties.put(SECONDARY_OBJECT_TYPE_IDS_PROP_NAME, aspects);
    properties.put("cm:title", eventName);
    properties.put("cm:description", "The 2016 Summer Olympics, officially known as the Games of the XXXI Olympiad");
    properties.put("dl:eventNote", "Some notes");
    GregorianCalendar eventStartDate = new GregorianCalendar(2016,8,5,12,0);
    properties.put("dl:eventStartDate", eventStartDate);
    GregorianCalendar eventEndDate = new GregorianCalendar(2016,8,21,20,0);
    properties.put("dl:eventEndDate", eventEndDate);
    properties.put("dl:eventLocation", "Rio de Janeiro");
    properties.put("dl:eventRegistrations", "Some Regs");
    ObjectId newItemId = session.createItem(properties, dataList);

    return true;
}
```

The `populateEventDataList` method takes a parameter with the description of the event data list that we want to populate.

Note that all code examples assume that we are populating data lists in the out-of-the-box site "Web Site Design Project" 
with short-name `swsdp`.

## Deployment - App Server

* Data List Model Definition: `tomcat/shared/classes/alfresco/extension/myContentModel.xml` (File name can be anything you like as long as you refer to it in the Spring context file)
* Data List Model and Labels Bootstrap: `tomcat/shared/classes/alfresco/extension/my-content-model-context.xml` (File name has to end in -context.xml to be picked up as Spring Bean context file)
* Share UI configuration: `tomcat/shared/classes/alfresco/web-extension/share-config-custom.xml`

These file locations are untouched by re-deployments and upgrades.
 
## Deployment All-in-One SDK project

* Data List Model Definition: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/model/content-model.xml`
* Data List Model and Labels Bootstrap: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/bootstrap-context.xml`
* Data List Model Labels: `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/messages/datalist-model.properties`
* Share UI configuration: `aio/share-jar/src/main/resources/META-INF/share-config-custom.xml`

To implement and deploy a data list model with full UI support you need both a repository JAR and a Share JAR project.

## More Information

* [How to use the Data Lists from a site in Alfresco Share]({% link content-services/7.2/using/sites/features.md %}#data-list)
* [Content Models]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}) - data lists are a type of content model, read all about content models here

## Sample Code

* [Data List model implementation](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo){:target="_blank"} - repository Module with data list content model and sample Web Script code for how to programmatically populate data lists
* [Share UI configuration for the Data List](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-share){:target="_blank"} - Share Module with UI config
