---
author: Alfresco Documentation
---

# Surf web scripts

When you look under the covers of the Share web application you will notice that most of the functionality is implemented as Surf Web Scripts. This is true for both Pages and Dashlets.

|Extension Point|Surf Web Scripts|
|---------------|----------------|
|Architecture Information|-   [Share Architecture](dev-extensions-share-architecture-extension-points.md)
-   [Presentation Web Scripts \(Surf\) vs Data Web Scripts \(Repository\)](ws-types.md)

|
|Description|Web Scripts are just another name for a [REST-based API](https://en.wikipedia.org/wiki/Representational_state_transfer). Could also be referred to as Web Services. They are stateless and scale extremely well. Surf Web Scripts are defined in XML, JavaScript, and FreeMarker files and stored under alfresco/web-extension/site-webscripts. Surf Web Scripts are referred to as *Presentation Web Scripts* as they usually return HTML, or some other UI markup.The simplest Web Script you can write consist of a *descriptor* and a *template*. The descriptor will tell you what URL that should be used to invoke the Web Script. And the template is used to assemble the output returned from the Web Script. This kind of Web Script is very static to its nature and will always return the exact same content. Most Web Scripts also include a *controller* that is used to dynamically assemble a map of data that is then processed by the template to produce the final output. The data that the controller produces could come from anywhere as the controller can be implemented in both JavaScript and Java. Any content from the repository that should be included is however fetched via a repository web script \(also called a Data web script\), as the Surf Web Script controller does not have direct access to the repository \(that is, it does not have access to root objects such as `companyhome`\).

The following picture illustrates how a Presentation web script and a Data web script work together to generate the user interface \(this is how most of the Share user interface is generated\):

![](../images/dev-extensions-share-web-scripts-architecture.png)

As we can see in the above figure a Surf Web Script is not called directly from the browser \(with http://localhost:8080/share/service/...\) but instead indirectly via either a [Surf Page](dev-extensions-share-surf-pages.md) or a [Surf Dashlet](dev-extensions-share-surf-dashlets.md). Surf web scripts are also used when constructing [Aikau Pages](dev-extensions-share-aikau-pages.md) and [Aikau Dashlets](dev-extensions-share-aikau-dashlets.md).

**Note:** For a Surf application such as Alfresco Share, or an application created from the Aikau archetype, the authentication is handled at the page level. And any Web Script components or Aikau pages that run within that context will be authenticated. A Share dashlet is already running within an authenticated page so will also be authenticated. On the other hand, if you call a Surf Web Script URL directly in a browser address bar there is no authentication \(that is, no context\). You would need to have a `JSESSIONID` that is already authenticated \(that is, by the page\). Surf ties the given `JSESSIONID` to the TICKET that is stored in the session for that user for that connector \(`alfresco`, `alfresco-api`\). When a client-side library on an authenticated page makes an XHR call to a `/service` URL it will be passing the `JSESSIONID` automatically.

The JavaScript controller can fetch content from different remote sources, such as the repository and Web Services on the Internet. To do this the controller uses a special root object called [remote](surf-connectors-endpoints.md), which can be used to authenticate and connect to a remote service.

To connect to a Remote Service on the Internet the controller will look something like this:

```
// Most services will require an API Key
// You can get one for the openweathermap API here: http://openweathermap.org/appid
var apiKey = "Put your API Key here.....";
// Get weather for London in JSON structure
var londonWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=" + apiKey;
var connector = remote.connect("http");
var JSONString = connector.get(londonWeatherURL);

// create json object from data
var londonWeatherJSON = jsonUtils.toObject(JSONString);
model.weather = londonWeatherJSON["weather"];  
```

Web Script controller file names follow a naming convention: `<web script id>.<http method>.js`, the above controller could be stored in a file called londonweather.get.js.

Note the use of the `http` [connector](surf-connectors-endpoints.md) when communicating with external Web Services. Now, to create a Web Script you also need a descriptor, which is defined in XML and looks something like this:

```
<webscript>
   <shortname>London Weather</shortname>
   <description>Simple Surf Web Script fetching London weather information</description>
   <family>Share</family>
   <url>/tutorial/london-weather</url>
</webscript>   
```

Web Script descriptor file names follow a naming convention: `<web script id>.<http method>.desc.xml`, the above descriptor should be stored in a file called londonweather.get.desc.xml to link it to the controller.The template for a Web Script is defined in FreeMarker and looks something like this:

```
<div>
<#if weather?exists>
    <h1>London Weather Today</h1>
<h2>${weather[0].description}</h2>
<#else>
    Could not access weather information.
</#if>
</div>
```

Web Script template file names follow a naming convention: `<web script id>.<http method>.<format>.ftl`, the above template should be stored in a file called londonweather.get.html.ftl to link it to the descriptor.The London weather web script does not need any authentication with Alfresco Content Services so it could actually be called directly from the browser with the `http://localhost:8080/share/service/tutorial/london-weather` URL, and we should see a response similar to:

**London Weather Today**

**light rain**

It is more likely though that we would use this Web Scrip as a basis for a [Surf Dashlet](dev-extensions-share-surf-dashlets.md).

If we instead want to fetch and present data from the repository, we will most likely call an out-of-the-box repository web script, although it is common to implement and use your own repository web scripts. To connect and call an Alfresco repository web script \(that is, Data web script\) you will do something like this:

```
var filterValue = args.filter;
if (filterValue == null) {
   filterValue = "";
}
var connector = remote.connect("alfresco");
var peopleJSONString = connector.get("/api/people?filter=" + filterValue);
var peopleJSON = jsonUtils.toObject(peopleJSONString);

model.people = peopleJSON["people"];
model.filterValue = filterValue;  
```

For this controller to successfully pass on authentication information when making the repository web script call it need to be called in context of a [Surf Page](dev-extensions-share-surf-pages.md) or a [Surf Dashlet](dev-extensions-share-surf-dashlets.md). Note the use of the `alfresco` [connector](surf-connectors-endpoints.md) when communicating with a repository, This connector assumes that you will call the older **deprecated** [v0 REST API](http://docs.alfresco.com/5.0/references/RESTful-Repository.html) \(http://localhost:8080/alfresco/service\). We use it here as the feature of searching for people is not yet available in the v1 REST API.

We should use the [v1 REST API](../pra/1/concepts/pra-resources.md) as much as possible, which requires a different connector called `alfresco-api`. Here is an example controller that uses the v1 API to get all the sites in the Repository:

```
var siteJSON = {}
var connector = remote.connect("alfresco-api");
var result = connector.get("/-default-/public/alfresco/versions/1/sites");
if (result.status.code == status.STATUS_OK) {
    var siteJSON = jsonUtils.toObject(result);
}

model.sites = siteJSON["list"]["entries"];
```

Can then be displayed via the following template example:```
<#if sites?? && (sites?size > 0)>
<h1>Search Result:</h1>
    Found ${sites?size} sites.
    <#list sites as s>
        <br/>
        <a href="${url.context}/page/site/${s.entry.id}">${s.entry.title}</a>
    </#list>
<#else>
    Did not find any sites.
</#if>
```

The v1 REST API is actually split up into two different APIs depending on what we want to do. If we want to manage files and folders then we will have to use the CMIS API. And when we want to access Alfresco specific content, such as sites, then we need to use the Alfresco Content Services REST API. Both of these are accessible via the `alfresco-api` connector. As we saw above, the Alfresco v1 REST API is accessible via the `/-default-/public/alfresco/versions/1` URL. The CMIS API is accessible via the `/-default-/public/cmis/versions/1.1` URL. The following is an example of a Surf Web Script controller that uses the CMIS API to access the top folders and files in the repository:```
var connector = remote.connect("alfresco-api");

// Get some stuff via CMIS REST API
var topFolderContentAsJSONString = connector.get("/-default-/public/cmis/versions/1.1/browser/root");

// Query via CMIS REST API
var queryStatement = encodeURIComponent("select * from cmis:document where cmis:name like 'Project%'");
var cmisQuery = "cmisselector=query&q=" + queryStatement + "&searchAllVersions=false&includeAllowableActions=false&includeRelationships=none&skipCount=0&maxItems=10";
var queryResult = connector.get("/-default-/public/cmis/versions/1.1/browser?" + cmisQuery);

var topFolderContentJSON = jsonUtils.toObject(topFolderContentAsJSONString);
var docs = jsonUtils.toObject(queryResult);

model.topContent = topFolderContentJSON["objects"];
model.docs = docs["results"];
```

This controller puts the top folder content and search result into the model and we can use it in a template as follows: ```
<#if topContent?? && (topContent?size > 0)>
<h1>Top Folders:</h1>
    Found ${topContent?size} content items in the top folder (/Company Home).
<#list topContent as tc>
        <br/>
${tc.object.properties["cmis:name"].value}
    </#list>
<#else>
    Did not find any content items in the top folder (root).
</#if>

<#if docs?? && (docs?size > 0)>
<h1>Search Result:</h1>
    Found ${docs?size} documents.
<#list docs as d>
        <br/>
${d.properties["cmis:name"].value}
    </#list>
<#else>
    Did not find any documents.
</#if>
```

Note that we need to use different way of accessing the CMIS properties than the standard . \(dot\) notation.

**Warning:** When parsing the JSON response do not use the `eval('('+result+')');` function as it is not secure. Instead use `jsonUtils.toObject` as in the above examples.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-webscripts/ \(Untouched by re-depolyments and upgrades\)
-   tomcat/webapps/share/components/ \(when web resources are included you need to put them directly into the exploded webapp, this is **NOT** recommended. Use a Share JAR extension module project instead\)

|
|[Deployment All-in-One SDK project](sdk-getting-started.md).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts
-   aio/share-jar/src/main/resources/META-INF/resources/share-jar/components \(when web resources such as CSS and JS are included\)

|
|More Information|-   [Presentation Tier Web Scripts](ws-types-presentation.md)
-   [Where to put your Web Scripts](ws-presentation-locations.md) \(When trying them out without a build project\)
-   [Controller Root Objects](../references/APISurf-rootscoped.md) \(Root objects that can be used in the JavaScript controller\)
-   [Template Root Objects](../references/APISurf-templates.md) \(Root objects that can be used when the main FreeMarker template for a Page is rendered\)
-   [Component Root Objects](../references/APISurf-components.md) \(Root objects that can be used when the FreeMarker template is rendered for a Page Component Web Script\)
-   [Caching approach](ws-caching-about.md) - HTTP Response caching and Web Scripts \(from repository web script section but still applicable\)

**Important**. There are two [types](ws-types.md) of web scripts, [Repository Web Scripts](ws-types-data.md) and [Surf Web Scripts](ws-types-presentation.md). When you work with Surf web scripts you have access to different content \([root objects](ws-presentation-root-objects.md)\) then when using repository web scripts.


|
|Sample Code|-   [Custom Surf Pages, Surf Dashlets, and Surf Web Scripts](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-surf-dashlet-and-page-share)

|
|Tutorials|-   [XML Configuration](../tasks/ws-config.md) - Additional XML configuration for Web Script \(from repository web script section but still applicable\)
-   [Cache Control](../tasks/ws-cache-using.md) - Additional Cache control configuration for Web Script \(from repository web script section but still applicable\)
-   [POST data processing](../tasks/ws-request-process.md) - Additional Cache control configuration for Web Script \(from repository web script section but still applicable\)
-   [Exploring the Root Objects](../tasks/surf-tutorials-exploring-root-objects.md)

|
|Alfresco Developer Blogs| |

-   **[Presentation-tier web scripts](../concepts/ws-presentation-intro.md)**  
Web scripts can be written that run in the presentation tier.

**Parent topic:**[Share Extension Points](../concepts/dev-extensions-share-extension-points-introduction.md)

