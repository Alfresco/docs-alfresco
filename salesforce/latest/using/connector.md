---
title: Using Content Connector for Salesforce
---

With the Salesforce Connector you can upload, create, and delete files, and link Alfresco content with Salesforce records. 
You can also browse and search Alfresco directly from within Salesforce.

There are two methods you can use to work with your Alfresco content in Salesforce. If your Salesforce administrator 
has added the Alfresco app to your Salesforce settings, you can use Alfresco:

1. Directly in a Salesforce record (if the Alfresco app has been added to the record layout)
2. By using the **Alfresco Repository** tab on the Salesforce toolbar. Use this method if you need to associate or link files with Salesforce records.

Salesforce administrators can use this information to install and configure the Salesforce Connector: 
[Installing and configuring the Salesforce Connector]({% link salesforce/latest/install/index.md %}).

## Working with Alfresco content in a Salesforce record

You can work with your Alfresco files directly from a Salesforce record.

The Alfresco app can be added to any record type that supports layouts (for example; Accounts, Cases, and Opportunities), 
if it's been added by your Salesforce administrator. You'll see a section containing Alfresco content if the app has 
been added to the record type. The name of this section depends on what your Salesforce administrator has called it. 
In this task, we'll call it the Alfresco section.

1.  In Salesforce, click the record that you want to work with. For example, this might be a specific account from the **Accounts** tab in Salesforce.
2.  In the **Alfresco** section, enter your Alfresco login details. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco](TODO_LINK:http://docs.alfresco.com/5.1/tasks/gs-login.html) for more information.
3.  In the **Alfresco** section you can:

    * **Search** for content using the search box.
    * **Create** a new folder or text document in Alfresco.
        Click the name of a folder and it opens in the current Salesforce view. Click a file and it opens a new Alfresco window showing the full details of that file. As you are already logged in to Alfresco, you don't need to enter your Alfresco login details again.
    * Click **Upload** to navigate to content on your device and upload it.
    * **Add** one or more files by dragging and dropping directly into the window. A new window tells you whether each file or folder has been added successfully.

    There's also a breadcrumb trail of folders to help you navigate.

    File actions include **Download**, **View in Browser**, and **Remove Association** if a file or folder has been linked with the record. See [Linking Alfresco content with a Salesforce record](#linkingrecord) for more information about linking content with records.

    >**Note:** You can also delete content that you have created or have permission to delete.

    >**Note:** While you are editing a file, associated files are not visible. After you have checked the file in, any file associations are then shown.
    >
    >![View of Alfresco in a record]({% link salesforce/images/salesforce-record-files.png %})

## Using the Alfresco Repository tab in Salesforce

You can use the **Alfresco Repository** tab to link a file or folder with a record, to add files or folders to Alfresco, 
and to find content.

1.  In Salesforce, click **Alfresco Content Connector**. This is available from the **Force.com** App Menu.

2.  Click the **Alfresco Repository** tab.

    Log in to Alfresco. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco](TODO_LINK:http://docs.alfresco.com/5.1/tasks/gs-login.html) for more information.

    An Alfresco view is displayed, with tabs for **Personal Files**, **Repository**, **Sites**, and **Search**.

    ![salesforce-repo-completed]({% link salesforce/images/salesforce-repo-completed.png %})

3.  On each tab you can:

    * **Search** for content using the search box.
    * **Create** a new folder or text document in Alfresco.
        Click the name of a folder and it opens in the current Salesforce view. Click a file and it opens a new Alfresco window showing the full details of that file. As you are already logged in to Alfresco, you don't need to enter your Alfresco login details again.
    * Click **Upload** to navigate to content on your device and upload it.
    * **Add** one or more files by dragging and dropping directly into the window. A new window tells you whether each file or folder has been added successfully.
    
    There's also a breadcrumb trail of folders to help you navigate.

4.  On each file or folder you can use the same actions that are available in Alfresco. For example, folder actions include **Download as Zip** and **Delete Folder**.

    There is an additional action, **Associate with Salesforce Record**. This allows you to link a file with a specific record in Salesforce. You can select from a list of recently viewed records. See [Linking Alfresco content with a Salesforce record](#linkingrecord) for more information.

5.  **Personal Files** tab: You can add files here that are stored in Alfresco, but are not shared with other users. Any files and folders that you add here are shown in the **Library > Personal Files** folder.

6.  **Repository** tab: This is a view of the full Alfresco repository, and is most useful for system administrators. This is the same structure that you see if you click **Repository** from the toolbar in Alfresco.

7.  **Sites** tab: This is a list of your Alfresco sites, and the place that most users look for their content. You need to be a member (or creator) of a site for it to be displayed here. If you click a site, it opens the contents into a new tab that has the same name as your site.

    For example, if I am a member of a site called **Salesforce default**, a new tab called **Salesforce default** is displayed where I can see folders and files:

    ![salesforce-sites]({% link salesforce/images/salesforce-sites.png %})

8.  **Search** tab: Search in the repository or sites in Alfresco. The search uses the Alfresco faceted search and filtering. The usual Alfresco actions are available for any files or folders that are returned in the search results.

## Linking Alfresco content with a Salesforce record {#linkingrecord}

Use the **Alfresco Repository** tab and **Associate with Salesforce Record** option to associate or link a file with a record 
in Salesforce.

When you are working with a Salesforce record, there might be marketing, customer-related or other files that you want 
to store alongside the record. Use this option to link your Alfresco files with your records. When you link a file, 
the record ID is stored in the parent folder.

1.  In Salesforce, click **Alfresco Content Connector**. This is available from the **Force.com** App Menu.

2.  Click the **Alfresco Repository** tab.

3.  Enter your Alfresco login details. Contact your system administrator if you don't know what your login details are for Alfresco. See [Logging in to Alfresco](TODO_LINK:http://docs.alfresco.com/5.1/tasks/gs-login.html) for more information.

    An Alfresco view is displayed, with tabs for **Personal Files**, **Repository**, **Sites**, and **Search**.

4.  Find the file or folder you require by searching or navigating. Right-click the file, select the record that you want to link from **Most recently used records** and click **+** and **OK** to link the record with the Alfresco content.

    On every file that you see in the **Alfresco** section, you have the option to **Associate with Salesforce Record**. This allows you to link content with a specific record in Salesforce. When you use this action, you can select from a list of recently viewed records to associate with:

    ![salesforce-associate]({% link salesforce/images/salesforce-associate.png %})

    To better identify the record that you require, you can hover over a recently used record to see the Record ID, Record Type and Site that relate to that record.

    ![salesforce-link]({% link salesforce/images/salesforce-link.png %}){:height="18px" width="18px"} denotes that the file is now linked with a record. Also, in the **Alfresco** section of the Salesforce record itself, you'll see the same file is displayed as a linked file.

5.  Go to the Salesforce record that you used to link to your Alfresco content.

    In the Alfresco section of the record, you'll see the file is displayed as a linked file.

    ![salesforce-record-files]({% link salesforce/images/salesforce-record-files.png %})

6.  Click the folder to open it in Alfresco.

## Surfacing Recommended Content in a Salesforce Record

You can configure a Visualforce Page for one or more Salesforce objects or record types, for example Opportunity or Account, 
to display a Recommended Content panel. The configuration consists of one or more named sections. 
Each section executes an Alfresco Search Query which can return many results of content items per query. 
The queries can also be informed by Salesforce field values that can be matched with Alfresco metadata values (content model properties).

A sales rep can view the Recommended Content panel when creating, viewing, and editing Salesforce objects. 
The panel will run each of the pre-configured Alfresco Search Queries and display a list of content item results for 
each named section. Each content item result will initially show the name of the document or file with a clickable 
link to open the Salesforce Connector preview page.

### Configuration and Setup (Sales Admin)

Configure a Visualforce Page to run one or more Alfresco Search Queries.

To use the Recommended Content feature a Visualforce page must be added to your Salesforce organization using 
the following pattern:

```xml
<apex:page standardController="<Salesforce Object>">
  <apex:canvasApp id="AlfCanvas" applicationName="<The name of your Connected App>" width="100%" height="450px" scrolling="auto" parameters="<A JSON Object the follows the structure documented below>"/>
</apex:page>
```

The structure of the parameters object is:

```json
{'recommended': [
    {'id': 1, 'name': 'Name 1', 'query': 'Alfresco Search Query (afts syntax)' }, 
    {'id': 2, 'name': 'Name 2', 'query': 'Alfresco Search Query (afts syntax)', maxResults : 10 }
    {'id': 3, 'name': 'Name 3', 'query': 'Alfresco Search Query (afts syntax)', 'sort': [{'field':'cm:name', 'ascending':true}] }, 
    {'id': 2, 'name': 'Name 2', 'query': 'Alfresco Search Query (afts syntax)', 'sort': [{'field':'cm:modified', 'ascending':false}], 'maxResults': 7 } 
    ]}
```

The `id`, `name`, and `query` parameters are mandatory. The `sort` and `maxResults` are optional but have 
pre-defined values if you don't configure them.

In a simple scenario the sales administrator curates the recommended content into two specific folders within 
Alfresco Content Services. These folders are visible when you create new opportunities in Salesforce. 
In this case the sales administrator could configure something similar to the following examples, which display 
two sections by running two Alfresco search queries to list content within two specific parent folders:

```xml
<apex:page standardController="Opportunity">
<apex:canvasApp id="AlfCanvas" applicationName="Alfresco_Salesforce_Connector" width="100%" height="450px" scrolling="auto" 
parameters="{'recommended':[
      {'id': 1, 'name': 'Data Sheets', 'query': 'PARENT:\'workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813\' AND TYPE:content'}, 
      {'id': 2, 'name': 'Competitive Info', 'query': 'PARENT:\'workspace://SpacesStore/8f2105b4-daaf-4874-9e8a-2152569d109b\' AND TYPE:content'}]}"/>
</apex:page>
```

>**Note:** The parent `nodeRef` can be copied from the Share URL when listing a folder. A `path` query could be used instead of a `parent` query but will stop working if the folder is renamed or moved.

Or

```xml
<apex:page standardController="Opportunity">
  <apex:canvasApp id="AlfCanvas" applicationName="Alfresco_One_for_Salesforce" width="100%" height="500px" scrolling="auto" 
  
  parameters="{'recommended':[
  
   {'id':1,'name':'Customer Presentation','query':'(=TS:Solution:\'Content Management\') AND (=TS:SalesMotion:\'Propose Solution\') AND (=TS:MarketingContentType:\'Customer Presentation\')'},
   {'id':2,'name':'Datasheets','query':'(=TS:Solution:\'Content Management\') AND (=TS:SalesMotion:\'Propose Solution\') AND (=TS:MarketingContentType:\'Datasheet\')'},
   {'id':3,'name':'Demo Video','query':'(=TS:Solution:\'Content Management\') AND (=TS:SalesMotion:\'Propose Solution\') AND (=TS:MarketingContentType:\'Demo Video\')'},
   {'id':4,'name':'Training - Technical','query':'(=TS:Solution:\'Content Management\') AND (=TS:SalesMotion:\'Propose Solution\') AND (=TS:MarketingContentType:\'Training- Technical\')'}
 
  ]}"/>
  
</apex:page>
```

**Simple examples of Alfresco search queries**

List content within a parent folder:

```json
{[
  {"id":1,"name":"My 1","query":"PARENT:'workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813' AND TYPE:content"}
]}
```

List content with given tag(s):

```json
{[
  {"id":1,"name":"My 1","query":"TAG:'mytag1' AND TYPE:content"},
  {"id":2,"name":"My 2","query":"TAG:'mytag1' AND TAG:'mytag2' TYPE:content"}
]}
```

List content matching specific metadata custom property / properties (example 1):

```json
{[
  {"id":1,"name":"My 1","query":"=myprefix:myprop1:'value x' AND TYPE:content"},
  {"id":2,"name":"My 2","query":"=myprefix:myprop1:'value x' AND =myprefix:myprop2:'value y' AND TYPE:content"}
]}
```

List content matching specific metadata custom property / properties (example 2):

```json
{[
  {"id":1,"name":"Customer Presentation","query":"(=TS:Solution:'Content Management') AND (=TS:SalesMotion:'Propose Solution') AND (=TS:MarketingContentType:'Customer Presentation')"},
  {"id":2,"name":"Datasheets","query":"(=TS:Solution:'Content Management') AND (=TS:SalesMotion:'Propose Solution') AND (=TS:MarketingContentType:'Datasheet')"}
]}
```

>**Note:** For more details related to the syntax of the Alfresco Search Query Language see [Alfresco Full Text Search Reference](TODO_LINK:https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-intro.html) and [Search in fields](TODO_LINK:https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-fields.html).

**Advanced examples of Alfresco search queries (informed by Salesforce field values)**

The Alfresco Search Query can reference properties from the Salesforce object using the standard Salesforce notation 
of `{!<Object>.<property>}`. For example `{!Opportunity.Name}` would display the name of the Opportunity record where 
the Visualforce page is being displayed.

You can use complicated business logic, or reference object properties that don't have a child relationship to the object, 
through additional Apex code referenced in the `extensions` attribute of the `apex:page` tag.

If a property could have characters that may break the structure of a JSON file they should be wrapped in a 
[Salesforce formula function](https://help.salesforce.com/articleView?id=customize_functions.htm&type=5) 
i.e. `{!JSENCODE(Opportunity.Name)}`.

Example with Salesforce object field pickvalue (single-valued and mandatory):

```json
{[
  {"id":1,"name":"My 1","query":"=myprefix:myprop1:{!Opportunity.LeadSource}"}
]}
```

Example with Salesforce object field pickvalue (single-valued and optional):

```json
{[
  {"id":1,"name":"My 1","query":"{!IF(ISBLANK(Opportunity.LeadSource),(''),('AND =my:prop:'+Opportunity.LeadSource))}"}
]}
```

>**Note:** In this example, the extra property match is not applied if the field is not set.

**Assumptions and Implications**

Exact match for values in Salesforce and/or Alfresco drop-downs (list of values).

* Typical example might use:
    * Alfresco custom metadata (content models) with list constraints.
    * Salesforce pickvalues.

* Example with custom Salesforce object fields
    Prerequisites
    * custom Alfresco properties: `TS:ProductName` and `TS:Region`
    * custom Opportunity fields: `AlfProductName` and `AlfRegion` (the labels of custom fields in Salesforce are suffixed by `__c`)
    * Opportunity with the Recommended Content panel configured with the following queries.

        ```json
        {[
            {'id':1,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}  AND  Region: {!JSENCODE(Opportunity.AlfRegion__c)}','query':'(=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}) AND (=TS:Region:{!JSENCODE(Opportunity.AlfRegion__c)})'},
            {'id':2,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}','query':'=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}'}
        ]}
        ```

        1.  Opportunity is configured with `AlfProductName` = `Alfresco Content Services` and `AlfRegion` = `EMEA`:
        
            ![edit-demo-opportunity]({% link salesforce/images/edit-demo-opportunity.png %})

            Queries results are displayed in the Recommended Content panel:

            ![demo-opportunity]({% link salesforce/images/demo-opportunity.png %})

        2.  Opportunity is updated with `AlfProductName` = `Alfresco Governance Services`:
        
            ![editting-demo-opportunity]({% link salesforce/images/editting-demo-opportunity.png %})

            Recommended Content panel is dynamically updated:
            
            ![demo-opportunity2]({% link salesforce/images/demo-opportunity2.png %})

### Surfacing Recommended Content in a Salesforce Record (Sales Rep)

A Sales Rep creates, views and/or edits a Salesforce object, such as a new Opportunity.

>**Note:** As with the current Salesforce Connector, the Sales Rep needs to login to Alfresco Content Servicesbefore they will be able to see the Recommended Content query results. The Sales Rep can login within the Salesforce Connector panel or by using the Alfresco Content Services url within another browser tab.

**UI Interfaces**

As per the current Salesforce connector its necessary to login to Alfresco Content Services. This is done either in 
the Salesforce component or in a separate Share tab.

**Sales Rep - Viewing recommended Content**

Lightning UI:

![]({% link salesforce/images/sf-poc-layout-lightning.png %})

Classic UI:

![]({% link salesforce/images/sf-poc-layout-classic.png %})

Once you click on a file in the recommended content panel, the existing Salesforce Connector Doc Details tab will open:

![]({% link salesforce/images/sf-preview-sfdc-document.png %})

### APIs and Error handling

Here you can find scripts and API examples.

**Private Share Web Script**

`GET /share/page/dp/ws/sfdc-recommended-content/{id}`

where `{id}` path parameter is a record ID (eg. `0011R00002PA12OQAT`).

Sample response (HTML content generated from a Free Marker template):

```xml
<#assign results = queries?eval.list>
<ul class="list-categories">
    <#list results as result>
        <li>
            <div class="rc-group">
                <p>${result.name}</p>
                <ul class="list-recommended-entries">
                    <#list result.alfrescoNodes as entry>
                        <li class="list-recommended-entries_item">
                            <div class="rc-item">
                                  <a class="rc-item__link" href="${url.context}/page/sfdc-document-details?nodeRef=${entry.nodeRef}" target="_blank">
                                      <img src="${url.context}/proxy/alfresco/api/node/${entry.nodeRef?replace(":/","")}/content/thumbnails/doclib?c=queue&ph=true"
                                           width="100" height="100" align="middle" class="rc-item-thumbnail" />
                                      <p class="rc-item-text-main">${entry.name}</p>
                                  </a>
                            </div>
                        </li>
                    </#list>
                </ul>
            </div>
        </li>
    <#else>
        <p>No content found</p>
    </#list>
</ul>
```

**Private Repo Web Script**

`POST /alfresco/s/sfdc/recommendedContent`

Sample request data:

```json
[
    {"id": 1, "name": "Name 1", "query": "PARENT:\"workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813\" AND TYPE:content"}, 
    {"id": 2, "name": "Name 2", "query": "PARENT:\"workspace://SpacesStore/a211774d-ba6d-4a35-b97f-dacfaac7bde3\" AND TYPE:content", "sort" : [{"field":"cm:name", "ascending":false}], "maxResults" : 5}
]           
```

>**Note:** If `sort` is not specified then the response defaults to `field:cm:name`, `ascending:true`. If `maxResults` is not specific then defaults to `10`.

Sample response:

```json
{
    "list": [
        {
            "id": 1,
            "name": "Name 1",
            "nodeRefs": [
                {
                    "nodeRef": "workspace://SpacesStore/3a40287c-c64c-44bd-a36e-ed5244bb1bd9",
                    "name": "my doc1.txt"
                },
                {
                    "nodeRef": "workspace://SpacesStore/99cb2789-f67e-41ff-bea9-505c138a6b23",
                    "name": "my doc2.pdf"
                }
            ]
        },
        {
            "id": 2,
            "name": "Name 2",
            "nodeRefs": [
                {
                    "nodeRef": "workspace://SpacesStore/150398b3-7f82-4cf6-af63-c450ef6c5eb8",
                    "name": "my doc3.txt"
                },
                {
                    "nodeRef": "workspace://SpacesStore/f3bb5d08-9fd1-46da-a94a-97f20f1ef208",
                    "name": "my doc4.txt"
                }
            ]
        }
    ]
}    
```

**Query property:**

As per above example Search Query (e.g. `"query": "PARENT:\"workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813\" AND TYPE:content"`).

**Sort Order property:**

A list of sort parameters defined in JSON format, eg. `"sort" : [{"field":<property>, "ascending":true or false}]`. 
If not configured then implement pre-defined default, e.g. `"sort" : [{"field":"cm:name", "ascending":false}]`. 
We should also allow adding a secondary sort, in addition to primary. 

For example:

* `"sort" : [{"field":"cmcm:name", "ascending":true}]` (=> alphabetically by name, default if no sort configured)
* `"sort" : [{"field":"cmcm:modified", "ascending":false}]` (=> most recently modified)
* `"sort" : [{"field":"cmcm:name", "ascending":true},{"field":"cm:modified", "ascending":false}]` This will sort alphabetically and for same file name (eg. across different folders) then sort by most recently modified.

**Max Results**

Initially there will be no paging or infinite scrolling. If not configured then implement pre-defined default, eg. 10.

**Error handling**

There are some scenarios and situations where the queries defined in the Salesforce object can produce errors in the 
Alfresco Repository or can return empty results:

* Where the defined Salesforce object contains no queries `({[]})` the Sales Rep will be presented with a message that says *'No queries set. Check your queries setup.'*. No log will be present in the Alfresco Repository.

* Where no content was found for a query the Sales Rep will be presented with a message (within the requested category) saying that No content was found. Check your query setup. All the other sections and results will be presented.

    ```json
    {[
      {"id":2,"name":"My query with no results","query":"TYPE:content AND cm:creator:an_unicorn"}
    ]}
    ```

* Where the defined Salesforce object contains invalid queries the Sales Rep will be presented with a message (within the requested category) saying that Semantically invalid query was provided. Check your setup. Besides the presented message, a log entry detailing what went wrong will be present in the Alfresco Repository logs. All the other sections and results will be presented.

    ```json
    {[
      {"id":1,"name":"My invalid query","query":"<lots of /\ invalid charcaters ;',.???!!!"}
    ]}
    ```

* JSON syntax errors are handled by the [SignedRequest](https://github.com/Alfresco/alfresco-content-connector-for-salesforce/blob/master/alfresco-content-connector-for-salesforce-repo/src/main/java/org/alfresco/integrations/sfdc/webscripts/SignedRequest.java#L88).

* In the situation where the defined Salesforce object contains semantically invalid JSON the Sales Rep will be presented with a message saying that Semantically invalid JSON body representing the queries was provided. Check your setup. Besides the presented message, a log entry detailing what went wrong will be present in the Alfresco Repository logs. No section will be presented.

### Lightning Configuration and Setup

Create a new lightning page with lightning configuration.

1.  Go to **Setup > Visualforce** pages:
    
    ![visualforce-pages]({% link salesforce/images/visualforce-pages.png %})

2.  **Create** a new page:

    ![visualforce-pages4]({% link salesforce/images/visualforce-pages4.png %})

3.  Go to **Lightning App Builder**:

    ![lightning-app-builder2]({% link salesforce/images/lightning-app-builder2.png %})

4.  Select **Record Page** and then click **Next**:

    ![customize-lightning-experience]({% link salesforce/images/customize-lightning-experience.png %})

5.  Select **Opportunity** and enter a name for the new lightning page and then click **Next**:

    ![create-new-lightning-page-label]({% link salesforce/images/create-new-lightning-page-label.png %})

6.  Select the **layout** you want and click **Finish**:

    ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

7.  Select the **section** where you want to insert the component, and then select the **component** from the Visualforce menu on the left:

    ![desired-name-page]({% link salesforce/images/desired-name-page.png %})

8.  Go to an **Opportunity** page to see the new view.

    ![visualforce-opportunity]({% link salesforce/images/visualforce-opportunity.png %})

### Classic Configuration and Setup

Create a new lightning page with classic configuration.

1.  Go to **Setup > Visualforce** pages:

    ![visualforce-pages-classic]({% link salesforce/images/visualforce-pages-classic.png %})"

2.  **Create** a new page:

    ![visualforce-pages2]({% link salesforce/images/visualforce-pages2.png %})"

3.  Go to **Lightning App Builder**:
    
    ![lightning-app-builder]({% link salesforce/images/lightning-app-builder.png %})"

4.  Select **Record Page** and then click **Next**:

    ![customize-lightning-experience]({% link salesforce/images/customize-lightning-experience.png %})"

5.  Select **Opportunity** and enter a name for the new lightning page and then click **Next**:

    ![create-new-lightning-page-label]({% link salesforce/images/create-new-lightning-page-label.png %})"

6.  Select the **layout** you want and click **Finish**:

    ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})"

7.  Select the **section** where you want to insert the component, and then select the **component** from the Visualforce menu on the left:

    ![desired-name-page]({% link salesforce/images/desired-name-page.png %})"

8.  Go to an **Opportunity** page to see the new view:

    ![visualforce-opportunity]({% link salesforce/images/visualforce-opportunity.png %})"

## Search considerations in Salesforce and Alfresco

Consider how you want to structure your information based on whether you need to restrict access.

There are a number of ways in Salesforce that you can search for content, and the results returned depend on the method. 

You can search:

1.  In a Salesforce record.

    If you search for information (for example, an account) in a Salesforce record, only accounts that are linked to that particular Salesforce record are returned.  Content might exist in multiple places, but that content is returned only if it is linked with the record.

2.  In the Alfresco Repository tab that is displayed in Salesforce.

    If you search for content in the Alfresco Repository tab, all results that you have permission to see are returned from the Alfresco repository. The user can then link the file to one or more Salesforce records.

    If metadata synchronization is enabled, this synchronization happens when a user views a Salesforce record that contains the Alfresco canvas app. The app checks whether a folder for that record exists in Alfresco, and creates a new folder if it does not exist. The app then adds the mapped property values from the Salesforce record to the parent record folder in Alfresco.  If a user searches for that metadata directly in Alfresco (for example, using the Share application), the results are returned successfully.

There is certain content, and associated metadata, that you might want only certain users to see; for example, 
Human Resources (HR) personnel data. Use a private site for this record type. 
See [Creating sites](TODO_LINK:http://docs.alfresco.com/5.1/concepts/sites-intro.html) for more information about the different site types.

You can map an specific object (and therefore all records associated with that object) to a named site in Share. 
See step (4) of [(6) Add the Alfresco app using a Salesforce Lightning Component]({% link salesforce/latest/install/index.md %}#addappusinglightningcomponent) for instructions on how to do this.
