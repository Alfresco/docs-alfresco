---
title: Surfacing recommended content
---

You can configure a Visualforce Page for one or more Salesforce objects, for example Opportunity or Account, to display a **Recommended Content** panel. The configuration consists of one or more named sections. Each section executes an Alfresco Search Query which can return many results of content items per query. The queries can also be informed by Salesforce field values that can be matched with Alfresco metadata values (content model properties).

A Salesforce user can view the **Recommended Content** panel when creating, viewing, and editing Salesforce objects. The panel will run each of the pre-configured Alfresco Search Queries and display a list of content item results for each named section. Each content item result will initially show the name of the document or file with a clickable link to open the Share document details page.

Starting from version 2.3.4, the Sales Admin can optionally apply the aspect `Recommended Content Link` (`sfdc:recommendedContentLink`) in the **Document Details** page, and then edit the **Properties** to configure where the link should send the Salesforce user. Only one type of link is allowed per document.

The properties for the type of link are:

| Property | Description |
| -------- | ----------- |
| Details | Opens the **Document Details** page in a new tab/window. This is the default behavior if the aspect isn't applied (i.e. the same behavior as in previous releases of the Salesforce Connector). |
| Parent | Opens the parent folder view of the document/folder in a new tab/window. |
| Download | Downloads the content. |
| External | Opens the link provided in the `External link` field in a new tab/window. |
| Record | Opens the Salesforce record provided in the `Record link` field in a new tab/window. |

You must provide additional settings when you select a link type of either `External` or `Record`:

| Property | Description |
| -------- | ----------- |
| External | *Mandatory.* Enter either a relative link (to the parent window) or an absolute link in the `External link` field. If an absolute link is provided, the link must use the `https` protocol. |
| Record | *Mandatory.* Enter the 15 or 18 character Salesforce record Id (alphanumeric) in the `Record link` field. |

> **Note:** Both fields are validated when you click **Save**. You'll get an error message if you enter invalid characters for the URL in the`External link` field, or not enough characters for the Salesforce record Id in the `Record link` field.

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

>**Note:** For more details related to the syntax of the Alfresco Search Query Language see [Alfresco Full Text Search Reference]({% link search-services/latest/using/index.md %}).

### Advanced examples of Alfresco search queries (informed by Salesforce field values)

The Alfresco Search Query can reference properties from the Salesforce object using the standard Salesforce notation of `{!<Object>.<property>}`. For example `{!Opportunity.Name}` would display the name of the Opportunity record where the Visualforce page is being displayed.

You can use complicated business logic, or reference object properties that don't have a child relationship to the object, through additional Apex code referenced in the `extensions` attribute of the `apex:page` tag.

If a property could have characters that may break the structure of a JSON file they should be wrapped in a [Salesforce JSENCODE formula function](https://help.salesforce.com/articleView?id=customize_functions.htm&type=5){:target="_blank"} i.e. `{!JSENCODE(Opportunity.Name)}`.

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

  * Opportunity with the **Recommended Content** panel configured with the following queries:

    ```json
    {[
        {'id':1,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}  AND  Region: {!JSENCODE(Opportunity.AlfRegion__c)}','query':'(=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}) AND (=TS:Region:{!JSENCODE(Opportunity.AlfRegion__c)})'},
        {'id':2,'name':'Product Name: {!JSENCODE(Opportunity.AlfProductName__c)}','query':'=TS:ProductName:{!JSENCODE(Opportunity.AlfProductName__c)}'}
    ]}
    ```

    1. Opportunity is configured with `AlfProductName` = `Alfresco Content Services` and `AlfRegion` = `EMEA`:

        ![edit-demo-opportunity]({% link salesforce/images/edit-demo-opportunity.png %})

        Queries results are displayed in the **Recommended Content** panel:

        ![demo-opportunity]({% link salesforce/images/demo-opportunity.png %})

    2. Opportunity is updated with `AlfProductName` = `Alfresco Governance Services`:

        ![editting-demo-opportunity]({% link salesforce/images/editting-demo-opportunity.png %})

        **Recommended Content** panel is dynamically updated:

        ![demo-opportunity2]({% link salesforce/images/demo-opportunity2.png %})

## Surfacing recommended content (Sales Rep)

A Sales Rep creates, views and/or edits a Salesforce object, such as a new Opportunity.

>**Note:** As with the current Salesforce Connector, the Sales Rep needs to login to Alfresco Content Services before they will be able to see the Recommended Content query results. The Sales Rep can login within the Salesforce Connector panel or by using the Alfresco Content Services URL within another browser tab.

### UI Interfaces

As per the current Salesforce Connector its necessary to login to Alfresco Content Services. This is done either in the Salesforce component or in a separate Share tab.

### Viewing recommended content

Lightning UI:

![]({% link salesforce/images/sf-poc-layout-lightning.png %})

Classic UI:

![]({% link salesforce/images/sf-poc-layout-classic.png %})

Once you click on a file in the **Recommended Content** panel, the existing Salesforce Connector Document Details tab will open (by default):

![]({% link salesforce/images/sf-preview-sfdc-document.png %})

Starting from version 2.3.4, once you click on a file in the **Recommended Content** panel, one of the following actions may occur (if configured by the sales administrator):

* Open the **Document Details** page in a new tab/window (this is the default behavior).
* Open the **Document Details** parent folder.
* Download the content.
* Link to an external resource.
* Link to a Salesforce record.

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

There is certain content, and associated metadata, that you might want only certain users to see; for example, Human Resources (HR) personnel data. Use a private site for this record type. See [Creating sites]({% link content-services/latest/using/sites/index.md %}#creating-a-site) for more information about the different site types.

You can map an specific object (and therefore all records associated with that object) to a named site in Share. See part 4 of [Step 6: Add the Alfresco app using a Salesforce Lightning Component]({% link salesforce/latest/install/index.md %}#addappusinglightningcomponent) for instructions on how to do this.
