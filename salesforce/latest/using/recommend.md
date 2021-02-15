---
title: Surfacing recommended content
---

You can configure a Visualforce Page for one or more Salesforce objects or record types, for example Opportunity or Account, to display a Recommended Content panel. The configuration consists of one or more named sections. Each section executes an Alfresco Search Query which can return many results of content items per query. The queries can also be informed by Salesforce field values that can be matched with Alfresco metadata values (content model properties).

A sales rep can view the Recommended Content panel when creating, viewing, and editing Salesforce objects. The panel will run each of the pre-configured Alfresco Search Queries and display a list of content item results for each named section. Each content item result will initially show the name of the document or file with a clickable link to open the Salesforce Connector preview page.

## Configuration and setup (Sales Admin)

You can configure a Visualforce Page to run one or more Alfresco Search Queries.

To use the Recommended Content feature, a Visualforce page must be added to your Salesforce organization using the following pattern:

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

The `id`, `name`, and `query` parameters are mandatory. The `sort` and `maxResults` are optional but have pre-defined values if you don't configure them.

In a simple scenario the sales administrator curates the recommended content into two specific folders within Alfresco Content Services. These folders are visible when you create new opportunities in Salesforce. In this case the sales administrator could configure something similar to the following examples, which display two sections by running two Alfresco search queries to list content within two specific parent folders:

**Example 1:**

```xml
<apex:page standardController="Opportunity">
  <apex:canvasApp id="AlfCanvas" applicationName="Alfresco_Salesforce_Connector" width="100%" height="450px" scrolling="auto"

  parameters="{'recommended':[

    {'id': 1, 'name': 'Data Sheets', 'query': 'PARENT:\'workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813\' AND TYPE:content'},
    {'id': 2, 'name': 'Competitive Info', 'query': 'PARENT:\'workspace://SpacesStore/8f2105b4-daaf-4874-9e8a-2152569d109b\' AND TYPE:content'}]}"/>
</apex:page>
```

>**Note:** The parent `nodeRef` can be copied from the Share URL when listing a folder. A `path` query could be used instead of a `parent` query but will stop working if the folder is renamed or moved.

**Example 2:**

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

### Simple examples of Alfresco search queries

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

>**Note:** For more details related to the syntax of the Alfresco Search Query Language see [Alfresco Full Text Search Reference](https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-intro.html) and [Search in fields](https://docs.alfresco.com/search-enterprise/concepts/searchsyntax-fields.html).

### Advanced examples of Alfresco search queries (informed by Salesforce field values)

The Alfresco Search Query can reference properties from the Salesforce object using the standard Salesforce notation of `{!<Object>.<property>}`. For example `{!Opportunity.Name}` would display the name of the Opportunity record where the Visualforce page is being displayed.

You can use complicated business logic, or reference object properties that don't have a child relationship to the object, through additional Apex code referenced in the `extensions` attribute of the `apex:page` tag.

If a property could have characters that may break the structure of a JSON file they should be wrapped in a [Salesforce formula function](https://help.salesforce.com/articleView?id=customize_functions.htm&type=5){:target="_blank"} i.e. `{!JSENCODE(Opportunity.Name)}`.

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

### Assumptions and implications

Exact match for values in Salesforce and/or Alfresco drop-downs (list of values).

* Typical example might use:
  * Alfresco custom metadata (content models) with list constraints.
  * Salesforce pickvalues.

* Example with custom Salesforce object fields

  **Prerequisites**

  * custom Alfresco properties: `TS:ProductName` and `TS:Region`
  * custom Opportunity fields: `AlfProductName` and `AlfRegion` (the labels of custom fields in Salesforce are suffixed by `__c`)

  * Opportunity with the Recommended Content panel configured with the following queries:

    ```json
    {[
        {'id':1,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}  AND  Region: {!JSENCODE(Opportunity.AlfRegion__c)}','query':'(=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}) AND (=TS:Region:{!JSENCODE(Opportunity.AlfRegion__c)})'},
        {'id':2,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}','query':'=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}'}
    ]}
    ```

    1. Opportunity is configured with `AlfProductName` = `Alfresco Content Services` and `AlfRegion` = `EMEA`:

        ![edit-demo-opportunity]({% link salesforce/images/edit-demo-opportunity.png %})

        Queries results are displayed in the Recommended Content panel:

        ![demo-opportunity]({% link salesforce/images/demo-opportunity.png %})

    2. Opportunity is updated with `AlfProductName` = `Alfresco Governance Services`:

        ![editting-demo-opportunity]({% link salesforce/images/editting-demo-opportunity.png %})

        Recommended Content panel is dynamically updated:

        ![demo-opportunity2]({% link salesforce/images/demo-opportunity2.png %})

## Surfacing recommended content (Sales Rep)

A Sales Rep creates, views and/or edits a Salesforce object, such as a new Opportunity.

>**Note:** As with the current Salesforce Connector, the Sales Rep needs to login to Alfresco Content Services before they will be able to see the Recommended Content query results. The Sales Rep can login within the Salesforce Connector panel or by using the Alfresco Content Services URL within another browser tab.

### UI Interfaces

As per the current Salesforce connector its necessary to login to Alfresco Content Services. This is done either in the Salesforce component or in a separate Share tab.

### Viewing recommended content

Lightning UI:

![]({% link salesforce/images/sf-poc-layout-lightning.png %})

Classic UI:

![]({% link salesforce/images/sf-poc-layout-classic.png %})

Once you click on a file in the recommended content panel, the existing Salesforce Connector Doc Details tab will open:

![]({% link salesforce/images/sf-preview-sfdc-document.png %})

## APIs and error handling

Here you can find web scripts, API examples, and how to address queries defined in the Salesforce object can produce errors

### Private Share web script

`GET /share/page/dp/ws/sfdc-recommended-content/{id}`

where `{id}` path parameter is a record ID (eg. `0011R00002PA12OQAT`).

Sample response (HTML content generated from a FreeMarker template):

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

### Private Repo web script

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

#### Query property

As per above example Search Query (for example: `"query": "PARENT:\"workspace://SpacesStore/38745585-816a-403f-8005-0a55c0aec813\" AND TYPE:content"`).

#### Sort order property

A list of sort parameters defined in JSON format, for example: `"sort" : [{"field":<property>, "ascending":true or false}]`.

If not configured then implement the pre-defined default:

```json
"sort" : [{"field":"cm:name", "ascending":false}]
```

We should also allow adding a secondary sort, in addition to primary.

Examples:

* Sort alphabetically by name, default if no sort configured):

  ```json
  "sort" : [{"field":"cm:name", "ascending":true}]
  ```

* Sort by the most recently modified:

  ```json
  "sort" : [{"field":"cm:modified", "ascending":false}]
  ```

* Sort alphabetically and for the same file name (for example: across different folders), and then sort by most recently modified.:

  ```json
  "sort" : [{"field":"cm:name", "ascending":true},{"field":"cm:modified", "ascending":false}]
  ```

#### Max results

Initially there will be no paging or infinite scrolling. If not configured then implement pre-defined default, e.g. 10.

### Error handling

There are some scenarios and situations where the queries defined in the Salesforce object can produce errors in the Alfresco Repository or can return empty results:

* Where the defined Salesforce object contains no queries `({[]})` the Sales Rep will be presented with a message that says *'No queries set. Check your queries setup.'*. No log will be present in the Alfresco Repository.

* Where no content was found for a query, the Sales Rep will be presented with a message (within the requested category) saying that No content was found. Check your query setup. All the other sections and results will be presented.

    ```json
    {[
      {"id":2,"name":"My query with no results","query":"TYPE:content AND cm:creator:an_unicorn"}
    ]}
    ```

* Where the defined Salesforce object contains invalid queries, the Sales Rep will be presented with a message (within the requested category) saying that a semantically invalid query was provided. Check your setup. Besides the presented message, a log entry detailing what went wrong will be present in the Alfresco Repository logs. All the other sections and results will be presented.

    ```json
    {[
      {"id":1,"name":"My invalid query","query":"<lots of /\ invalid characters ;',.???!!!"}
    ]}
    ```

* JSON syntax errors are handled by the `SignedRequest` package.

<!-- private repo: https://github.com/Alfresco/alfresco-content-connector-for-salesforce/blob/master/alfresco-content-connector-for-salesforce-repo/src/main/java/org/alfresco/integrations/sfdc/webscripts/SignedRequest.java#L88 -->

* In the situation where the defined Salesforce object contains semantically invalid JSON, the Sales Rep will be presented with a message saying that a semantically invalid JSON body representing the queries was provided. Check your setup. Besides the presented message, a log entry detailing what went wrong will be present in the Alfresco Repository logs. No section will be presented.

## Lightning configuration and setup

Create a new lightning page with lightning configuration.

1. Go to **Setup > Visualforce** pages:

    ![visualforce-pages]({% link salesforce/images/visualforce-pages.png %})

2. **Create** a new page:

    ![visualforce-pages4]({% link salesforce/images/visualforce-pages4.png %})

3. Go to **Lightning App Builder**:

    ![lightning-app-builder2]({% link salesforce/images/lightning-app-builder2.png %})

4. Select **Record Page** and then click **Next**:

    ![customize-lightning-experience]({% link salesforce/images/customize-lightning-experience.png %})

5. Select **Opportunity** and enter a name for the new lightning page and then click **Next**:

    ![create-new-lightning-page-label]({% link salesforce/images/create-new-lightning-page-label.png %})

6. Select the **layout** you want and click **Finish**:

    ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})

7. Select the **section** where you want to insert the component, and then select the **component** from the Visualforce menu on the left:

    ![desired-name-page]({% link salesforce/images/desired-name-page.png %})

8. Go to an **Opportunity** page to see the new view.

    ![visualforce-opportunity]({% link salesforce/images/visualforce-opportunity.png %})

## Classic configuration and setup

Create a new lightning page with classic configuration.

1. Go to **Setup > Visualforce** pages:

    ![visualforce-pages-classic]({% link salesforce/images/visualforce-pages-classic.png %})"

2. **Create** a new page:

    ![visualforce-pages2]({% link salesforce/images/visualforce-pages2.png %})"

3. Go to **Lightning App Builder**:

    ![lightning-app-builder]({% link salesforce/images/lightning-app-builder.png %})"

4. Select **Record Page** and then click **Next**:

    ![customize-lightning-experience]({% link salesforce/images/customize-lightning-experience.png %})"

5. Select **Opportunity** and enter a name for the new lightning page and then click **Next**:

    ![create-new-lightning-page-label]({% link salesforce/images/create-new-lightning-page-label.png %})"

6. Select the **layout** you want and click **Finish**:

    ![create-new-lightning-page]({% link salesforce/images/create-new-lightning-page.png %})"

7. Select the **section** where you want to insert the component, and then select the **component** from the Visualforce menu on the left:

    ![desired-name-page]({% link salesforce/images/desired-name-page.png %})"

8. Go to an **Opportunity** page to see the new view:

    ![visualforce-opportunity]({% link salesforce/images/visualforce-opportunity.png %})"

## Search considerations in Salesforce and Alfresco

Consider how you want to structure your information based on whether you need to restrict access.

There are a number of ways in Salesforce that you can search for content, and the results returned depend on the method.

You can search:

1. In a Salesforce record.

    If you search for information (for example, an account) in a Salesforce record, only accounts that are linked to that particular Salesforce record are returned.  Content might exist in multiple places, but that content is returned only if it is linked with the record.

2. In the Alfresco Repository tab that is displayed in Salesforce.

    If you search for content in the Alfresco Repository tab, all results that you have permission to see are returned from the Alfresco repository. The user can then link the file to one or more Salesforce records.

    If metadata synchronization is enabled, this synchronization happens when a user views a Salesforce record that contains the Alfresco canvas app. The app checks whether a folder for that record exists in Alfresco, and creates a new folder if it does not exist. The app then adds the mapped property values from the Salesforce record to the parent record folder in Alfresco.  If a user searches for that metadata directly in Alfresco (for example, using the Share application), the results are returned successfully.

There is certain content, and associated metadata, that you might want only certain users to see; for example, Human Resources (HR) personnel data. Use a private site for this record type. See [Creating sites](TODO_LINK:https://docs.alfresco.com/6.2/concepts/sites-intro.html) for more information about the different site types.

You can map an specific object (and therefore all records associated with that object) to a named site in Share. See part 4 of [Step 6: Add the Alfresco app using a Salesforce Lightning Component]({% link salesforce/latest/install/index.md %}#addappusinglightningcomponent) for instructions on how to do this.
