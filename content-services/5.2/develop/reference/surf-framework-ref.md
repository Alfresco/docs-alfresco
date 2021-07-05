---
title: Surf content types
---

In Spring Surf, content is devided into *Semantic content* and *Presentation content*, and the web application looks at both to render the final look of the Web page.

## Semantic content

Semantic content represents the domain specific content that should be displayed on the web page. This can be for example project information,document information, customer information, discussion thread, wiki page data, workflow task information. This content is typically authored, approved, and published.

Semantic content describes what should be rendered. It contains the approved message but it does not contain any formatting information. It is represented in a structured data format, such as JSON or XML. The following code is an example of JSON text for a biography:

```
{ 
"author": "Pablo Neruda", 
"country": "Chile", "image": "pablo_neruda.jpg", 
"description": "Pablo Neruda is adored in South America for his romantic prose.", 
"popular_works": ["Cien sonetos de amor", "Confieso que he vivido"] 
}
```

This code does not contain any formatting like HTML tags or other markup, just simple data. This type of content is usually fetched by a Spring Surf Web Script dynamically.

## Presentation content

Presentation content are files that describe presentation configuration for a website, it is represented in XML and FreeMarker template files. Presentation content comprises configuration that tells the Surf rendering engine how the Web page or page component should look and feel.

Presentation content answers questions like:

-   What is the layout of the Web page
-   Which theme to use to render the Web page
-   How many articles to display on a Web page
-   Which advertisement to display in a particular section of the site for the current user

A website presentation framework, such as Surf, looks to this content to figure out how to display the page. For example, the following XML code configures a Surf Web Script for rendering a biography to end users and tells the web script to render a link to the full article as well as to show the image of the author.

```


<component> 
  <url>/content/display/biography</url> 
  <properties> 
    <link-title-to-full-article>true</link-title-to-full-article> 
    <show-image>true</show-image> 
  </properties> 
</component>

        
```

These properties are custom properties that are just passed on to the Web Script implementation. This component definition tells Surf to call this Web Script (i.e. `/content/display/biography`) to render the biography.

## Semantic and Presentation content work together to render the Web page.

The end-to-end rendering flow is illustrated in the following figure.

![]({% link content-services/images/12-1.png %})

This figure depicts a simple request for a biography of a poet. Here is what happens:

1.  Surf receives the browser request.
2.  Surf asks the content delivery services for the *Presentation Content* that describes what is being requested.
3.  The *Presentation Content* is handed back as XML and FTL.
4.  Surf determines the *Web Script* to execute using the configuration specified by the component XML.
5.  The *Web Script Controller* (JavaScript or Java) calls a service somewhere to retrieve biography data.
6.  The *biography* is returned as *JSON*.
7.  The *Web Script Template* (FreeMarker) renders HTML markup to the end user. This HTML contains presentation output (formatting) as well as the semantic data (the biography itself).

The website user then sees the poet's content. Rending a complete Web page with more stuff then just the biography, such as title, footer, header etc, will loop through step 4 - 7 multiple times.

## Content delivery services {#content-delivery-services}

Surf connects to content delivery services to provide content retrieval and query for presentation and semantic content.

This means that Surf applications can consist of either single-tier or dual-tier applications. The following figure shows three valid configurations for Surf. The standalone configuration on the left shows, all the presentation and semantic content stored as part of the Surf web application. It is self-contained and has everything that it needs so that requests can be services entirely from the web application in the presentation tier. This is a perfectly acceptable configuration. Surf imposes no requirements, it does not require a database, any local persistence, or even a user session.

![]({% link content-services/images/12-2.png %})

A more interesting scenario is the full content services configuration on the right, where the Surf application lives in the presentation tier but relies upon content delivery services in the content services tier to hand it data so that it can respond to incoming requests. This data consists of things like the biography or web script configuration information. In this case, Surf provides developers with connector and credential management so that interactions with the content delivery services can be performed on behalf of the end user. Surf provisions connectors to web script developers so they can retrieve feeds of data. This data is often represented in either JSON or XML, but it could also be in any number of other formats. Developers work with these feeds and render them back through view templates. Surf focuses on view caching and render performance to minimize the number of remote calls needed on each request.

Surf also has native support for the CMIS standard (Content Management Interoperability Services), an industry-adopted API for talking to ECM systems. Alfresco Content Services provides the leading open-source CMIS implementation, as well as an entire suite of tools around CMIS authoring and delivery. Surf is an ideal presentation technology for CMIS content delivery.

Surf developers have the option to independently scale out the presentation tier from the content services tier. The presentation tier is primarily developed with the intention of scaling to user load, while providing quick end-user responses, whereas the content services tier scales to content retrieval and query. A single page hit to the Surf application could result in several content services hits, a single hit, or no hits at all depending on the application design.

## Model-View-Controller {#model-view-controller}

MVC applications use a dispatcher to handle requests for an application. It looks at the URL to determine which controller to invoke to set up a model, and then which view to invoke to render the model.

The dispatcher uses mappings (usually URL mappings) to determine which controllers to invoke for the incoming URL. It also uses mappings to figure out which view to invoke to render the response back. A controller contains business logic that should run before the response is generated. It can do things like query a database or call out to a service. Its job is to place this data into the model. A view contains rendering logic responsible for building the response that the end user receives. It looks to the data in the model to inform its rendering process.

The following figure illustrates the process:

1.  The dispatcher handles an incoming request. Imagine that the incoming URI is /hotels.
2.  The dispatcher tries to find a matching controller for this URI.
3.  A controller is invoked if found. The controller calls out to some services to retrieve a list of hotels, creates a model, and then places this list of hotels into the model.
4.  The dispatcher tries to find a matching view for this URI.
5.  A view is invoked if found. The view receives the model and uses it to render HTML markup that displays the list of hotels.
6.  The response is sent back to the end user.

![]({% link content-services/images/12-4.png %})

The main benefit of the MVC pattern is that it clearly separates the business and rendering logic. This modularizes your application architecture, allowing you to plug in new views and new controllers. It provides reuse, as many views can share a single controller, or many controllers can share a single view.

## Spring Web MVC {#spring-web-mvc}

Spring Web MVC is the Model-View-Controller implementation for Spring framework web applications.

Based on Spring configuration, Java beans implement controllers, views, the model, and the mappings between URIs and handlers. Spring Web MVC is very extensible, letting you write your own Java code, plug in new beans, or rewire things through configuration.

The dispatcher for a Spring Web MVC application is the dispatcher servlet, which handles the request, executes the MVC pattern, and tries to identify a controller to handle the incoming request. A controller is a Plain Old Java Object (POJO) registered with the Spring framework. In the Spring framework, the model is a simple map of named properties. The controller computes these, and when finished, hands the model back to the dispatcher servlet. The dispatcher servlet then tries to determine a view to use to render the model to the end user. It consults a registry of view resolvers and asks each of them if they can handle the incoming request URI. If it finds a matching view resolver, it is used to produce a view object, rendering the model to the end user.

Typically, Spring Web MVC application developers focus most of their effort writing controllers and views in Java, which are then wired together with Spring configuration XML.


## Surf View Composition framework {#surf-view-composition-framework}

Surf provides a view composition framework.

Surf provides a View Composition framework that lets you define user interface items such as:

-   Pages
-   Templates
-   Regions
-   Components

 

-   **[Pages](#pages)**  
You can define views of pages including specific pages, page formats, and page types.
-   **[Templates and regions](#templates-and-regions)**  
A template is a reusable layout that you can build once and then apply it to many pages. Each page can then benefit from a common look-and-feel that was pre-prescribed. By changing the template, a web designer can affect many pages all at the same time. This is especially meaningful for large websites where you might need to manage hundreds, if not thousands, of pages.
-   **[Components](#components)**  
Surf lets you bind components to regions. A component usually associates a region with a web script.

## Pages {#pages}

You can define views of pages including specific pages, page formats, and page types.

Surf page XML defines Surf pages. A page binds to a URI. Surf allows you to render pages by passing the URI in the request.

-   Request a page using a URL as follows:

    `http://localhost:8080/surf/<page-id>`

    `http://localhost:8080/surf?p=<page-id>`

    If Surf finds this page, it looks at the page XML configuration to determine which template to use to render the output. Each page can have multiple templates keyed by format. A page might have a default template that it uses for HTML output to a browser, but it can have another template configured that it uses for output to a wireless device.

-   Request a particular format for a page using URLs as follows:

    `http://localhost:8080/surf/<page-id>?f=<format-id>`

    `http://localhost:8080/surf?p=<page-id>&f=<format-id>`

    This allows you to have different markup for different intended formats, such as for small display devices or integration purposes. Surf pages are also locale aware. This lets you finely adjust your site’s pages for different languages and localization needs. When you make a request for a page, Surf will do its best to find a match for your browser’s locale. If a locale match cannot be made, Surf will fall back to a specified default locale.

-   Request a page type using one of the following formats:

    `http://localhost:8080/surf/pt/<page-type-id>`

    `http://localhost:8080/surf?pt=<page-type-id>`

    Surf lets you group pages into page types. By requesting a page type, Surf will determine which page to use to satisfy your request. Surf defines a login page type. Your site might have two themes, such as a normal theme and a holiday theme. You can also have two distinct login pages, such as a normal login page and a holiday login page.

    When the holiday theme is active, you would like Surf to resort to using the holiday login page. All you have to do is switch the theme for the site. None of the links or URLs change at all. The URLs in this example, will always take you to the theme’s designated login page.

-   Request a login page type using one of the following formats:

    `http://localhost:8080/surf/pt/login`

    `http://localhost:8080/surf?pt=login`

    As before, you can request a particular format of the login page type by using a format parameter. Here are two URLs that request the wireless format of the login page type.

    `http://localhost:8080/surf/pt/login?f=wireless`

    `http://localhost:8080/surf?pt=login&f=wireless`


## Templates and regions {#templates-and-regions}

A template is a reusable layout that you can build once and then apply it to many pages. Each page can then benefit from a common look-and-feel that was pre-prescribed. By changing the template, a web designer can affect many pages all at the same time. This is especially meaningful for large websites where you might need to manage hundreds, if not thousands, of pages.

When Surf looks at a URI and determines the request, it starts the process of handling the view. The request might be for a specific page, a content item of type “article”, or a specific region of the current page (for example, in an AJAX request). Regardless of the request, the objective will eventually produce markup and send it out to the response. The key to making this happen is the template, which provides the basic layout of the response to the browser.

The following figure shows three pages for a sample website. Two of the pages are similar with the same page layout. They have four regions on the page, whereas the first page has only three regions. As such, you can describe these three pages with two templates. The templates are shown underneath the pages.

![]({% link content-services/images/12-5.png %})

The first template defines three regions with placeholder names (HEADER, BODY, FOOTER). The second template defines four regions (HEADER, MENU, CONTENT, FOOTER). The HEADER and FOOTER regions are common across all three pages. You can define the two templates in Surf and define regions along with region scope to allow reuse across templates, as illustrated in the following figure.

![]({% link content-services/images/12-6.png %})



In this figure, the region scope defines the entire website with only two templates and five scoped regions. There are three scopes: global, template, and page. Regions in the global scope need to be configured only once. Then, their configuration is reused by any templates or pages that include them. In this case, the HEADER and FOOTER regions are defined once in the global scope. Their content appears the same on all of the pages of the site.

Regions in the template scope need to be configured once per template. Any pages that use the template then reuse their configuration. In this case, the MENU region is defined in the template scope for one of the templates, but not the other. Thus, the two pages on the right side that use this template will have the MENU region in common. Regions in the page scope must be configured once per page, and their configurations are not reused. In this case, the BODY and CONTENT regions are in the page scope. This allows the two right-hand pages to be slightly different, but only in the CONTENT region.

The region tag defines regions on a template with the scope, such as page, template, or global. The following examples show how this is done in FreeMarker:

```
Globally scoped header region:
<@region id="header" scope="global" />

Template scoped navigation region:
<@region id="navigation" scope="template" />

Page scoped content region:
<@region id="content" scope="page" />
```

A template defines the basic structure of the rendered view, and then defines regions into which to include additional presentation. The following figure shows an example of the template that defines four regions: HEADER, MENU, CONTENT, and FOOTER. Sample code after the figure suggests how you could weave this into a FreeMarker template. It is up to Surf to resolve what to place in each of these regions when the template is rendered.

![]({% link content-services/images/12-7.png %})

```


<html>
   <head>
      ${head}
   </head>
   <body>
      <div class="header">
         <@region id="header" scope="global" />
      </div>
      <div class="menu">
         <@region id="menu" scope="template" />
      </div>
      <div class="content">
         <@region id="content" scope="page" />
      </div>
      <div class="footer">
         <@region id="footer" scope="global" />
      </div>
   </body>
</html>


```

When the template is processed, each of its region tags executes and attempts to look up something that should be included in that location in the template. The region tag is replaced by the output of something that is bound into that place in the template.

## Components {#components}

Surf lets you bind components to regions. A component usually associates a region with a web script.

Templates and scoped regions make it possible to reuse web scripts. You can have as many web scripts as you like, each encapsulating a unique bit of application functionality.

For example:

![]({% link content-services/images/12-8.png %})

A template brings several web scripts together into an overall markup structure. Here, you are rendering a page; however, the same concepts apply for any kind of view rendered from Surf using a template. Surf lets you define regions in various scopes and then resolves these upon request. This makes your site definition efficient and easier to manage by promoting reuse. Alfresco Share is an example of a Surf application whose pages are constructed through reuse of templates. All three scopes are used. The following figure provides an example of how this fits together.

![]({% link content-services/images/12-9.png %})



You can make changes to Alfresco Share pages by tweaking FreeMarker templates and web scripts. In Surf, web scripts not only provision remote interfaces to your applications, but also provide your application's presentation logic. These are presentation tier web scripts. Surf orchestrates them so they can all live together on a single view and interoperate against a common request context.

There are many more capabilities, such as pre-processing controllers to generate markup that should be injected into different parts of a page (for example, the `<head>` of an HTML page). Surf also provides additional web script and template API root-scoped objects and methods.

## Presentation content {#presentation-content}

Presentation content consists of templates, scripts, and XML files that Surf can pick up without a server restart.

Surf consults presentation content when it renders the user interface. Surf's presentation content consists of three kinds of files:

-   Surf objects
-   Templates
-   Web scripts

-   **[Surf objects](#surf-objects)**  
Surf objects define website parts and describe how they fit together to build the complete web application structure.
-   **[Templates and Surf](#templates-and-surf)**  
Templates are transformers that generate markup for the browser to render.
-   **[Web scripts and Surf](#web-scripts-and-surf)**  
Surf lets you reuse web scripts and bind them together into unlimited numbers of pages. The scripts are lightweight, making them easy to assemble and deploy.

## Surf objects {#surf-objects}

Surf objects define website parts and describe how they fit together to build the complete web application structure.

Objects describe things like pages, page hierarchy, chrome, or components that are reused across many pages. XML files define objects that are generally short. A single Surf application will have many XML files to define its objects. When Surf starts up, it looks for all these small XML fragments and gathers them to form a complete registry of all of the objects.

Example of the XML for a Page object:

```
<?xml version='1.0' encoding='UTF-8'?>
<page>
   <id>mypage</id>
   <title>My First Page</title>
   <description>This is an example of the XML for a Page</description>
</page>
```

A Spring project generally maintains these XML files as part of its project resources. They can reside under the WEB-INF directory or inside the classpath. Users can also manage these files inside the Alfresco Content Services server, where XML files can be individually managed, authorized, and approved as part of a lifecycle process. Once approved, these files are available to the Surf application.

Here are a few examples of the various presentation objects that Surf provides:

-   **Chrome**-application borders for regions and components
-   **Components**-binds web scripts into templates and pages
-   **Content Instance**-points to pages or templates to use when rendering content types (`cm:content` or `my:article`)
-   **Page** - a navigable location within a site
-   **Page Type** - indirection to non-navigable locations, such as a login page
-   **Template Instance** - configuration for dynamic templates
-   **Theme** - settings that define the site experience

## Templates and Surf {#templates-and-surf}

Templates are transformers that generate markup for the browser to render.

This markup is generally HTML for a website. Templates are applied to the current request context or model. Templates are often files that contain a composite of the output markup and processing tags. The tags execute and generate markup that is injected into the template at the location of the tag. This pattern is common for template types such as FreeMarker, PHP, and XSL.

Surf supports several useful tags out of the box. One commonly used tag is the region tag, which tells the template to look up a component and render its output at the location of the tag.

Here is an example of what a FreeMarker template responsible for rendering a page looks like in Surf:

```
<html>
   <head>
       ${head}
   </head>
   <body>
      <div class="header">
         <@region id="header" />
      </div>
      <div class="body">
         <@region id="body" />
      </div>
   </body>
</html>
```

A Spring project generally maintains these template files as part of its project resources. They can reside under the WEB-INF directory or inside the classpath. Users can also manage these files inside a content application server.


## Web scripts and Surf

Surf lets you reuse web scripts and bind them together into unlimited numbers of pages. The scripts are lightweight, making them easy to assemble and deploy.

Declarative web scripts implement a Model-View-Controller pattern. They have a single descriptor XML file that tells the web script dispatcher how to behave. Declarative web scripts have their own template views and optional scriptable controllers. You write new views by writing new template files. You write new controllers by writing new script files. Your scriptable controllers populate the model variable (a map). Your view uses the model during render. Surf allows you to merge your web scripts into the rendering of the overall page. that is, Surf lets your web script MVC participate in the overall Spring MVC.

Surf provides each web script with the appropriate context and runtime environment to render in the context of the overall request. The output of each web script merges with the output of the template to form the final markup. This markup is returned from the Spring MVC view.

For example:

![]({% link content-services/images/12-10.png %})

Rather than produce 100% of the output itself, the rendering template occasionally delegates work to the web script runtime when the region tags execute. The web script runtime executes miniature, scriptable MVC processes whose output merges into the overall rendition. The web script runtime can use and take advantage of the full request, user, and page context. You can build web scripts to define component implementations that can be accessed either standalone or stitched into an overall page presentation. A component can be like a widget or a gadget; something that you can plug into a website on one or more pages as a reusable bit of application functionality that participates in the overall page experience.

Web scripts can also be invoked standalone in that they can run outside the context of a page. You can surface components in menus or refresh portions of a web page using AJAX callbacks. Surf also provides portlet capabilities that wrap web scripts and components as JSR-268 portlets and dropped into portal servers.

A Spring project generally maintains web script files as part of its project resources. They could reside under the WEB-INF directory or inside the classpath. Users can also manage these files inside a content application server.

## Connectors and credentials {#connectors-and-credentials}

Web script developers often work with remote sources of data. Surf makes it easy to reach out to these information sources and pull together feeds of data.

These data sources are typically RESTful providers, CMIS repositories, or proprietary in nature. Furthermore, each data source might require a unique set of credentials to work with the data source.

Surf lets you define connectors responsible for communicating with endpoints where a data source lives, such as a server residing at an HTTP address. Connectors connect to an endpoint and communicate with it.

Connectors are wired together with authenticators so that they can effectively handshake and establish credentials with endpoints. This pattern abstracts away any of the manual management of connection state that you would otherwise need to perform. Using authenticators, connectors manage user identity and session state to the endpoint. This is automatically managed for the duration of the user session in the Surf application itself.

-   **[Connectors and endpoints](#connectors-and-endpoints)**  
Connectors and endpoints are both defined through simple configuration as part of Surf's remote configuration block.
-   **[Credentials](#credentials)**  
Surf provides credential management on behalf of users who access content using connectors. If a connector needs to know which credentials to attach to a given request during an authentication handshake, it can call upon the credential vault.
-   **[Authenticators](#authenticators)**  
Authenticating connectors are connectors that have authenticators plugged into them. An authenticator is a class that knows how to perform an authentication handshake with a specific kind of service or application.
-   **[Remote API](#remote-api)**  
The `remote` root-scoped object lets you connect to remote services and retrieve data feeds.

## Connectors and endpoints {#connectors-and-endpoints}

Connectors and endpoints are both defined through simple configuration as part of Surf's remote configuration block.

Declaring an endpoint is fairly simple. It will look something like this:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Alfresco Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
    </endpoint>
  </remote>
</config>
```

This defines an endpoint named `springsurf`. When talking to this endpoint, a connector of type `http` should be used. The data source lives at `www.springsurf.org:8080`. Since nothing else is provided, this is assumed to be an unauthenticated endpoint.

Surf provides a number of out-of-the-box connectors. The `http` connector lets you connect to HTTP or HTTPS endpoints. To assert an identity to the endpoint, you can adjust the configuration:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Alfresco Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
      <identity>declared</identity>
      <username>USERNAME</username>
      <password>PASSWORD</password>
    </endpoint>
  </remote>
</config>
```

The credentials for an `http` connector are passed through using basic authentication. The values USERNAME and PASSWORD are just placeholders for your own values. With an endpoint defined, you can code against the endpoint and use it without worrying about managing connection state and asserting credentials. You could use the following Web script controller code to retrieve something from the `springsurf` endpoint:

```
// get a connector to the springsurf endpoint
var connector = remote.connect("springsurf");
// place text file into the model
var txt = connector.get("/sample/helloworld.txt");
model.txt = txt;
```

The `remote` root-scope variable provides various methods and accessors for working with connectors. When it is used, the connection mechanics are abstracted away and your web script code becomes highly portable from one environment to another, as well as reusable across many users.

## Credentials {#credentials}

Surf provides credential management on behalf of users who access content using connectors. If a connector needs to know which credentials to attach to a given request during an authentication handshake, it can call upon the credential vault.

Surf's default credential vault is runtime-only; it is populated and used at runtime. If you restart the server, the credentials are lost and the user must provide their credentials again the next time the connector is used. Surf lets you override the credential vault implementation. It provides a number of additional credential vaults out of the box you can use or base your implementations on. These include a filesystem– persistent credential vault and a credential vault (where your credentials are stored in an Alfresco Content Services-managed file).

To use the credential vault, you inform the endpoint that its identity is driven from the current user. You can make this change to your endpoint definition:

```
<config evaluator="string-compare" condition="Remote">
  <remote>
    <endpoint>
      <id>springsurf</id>
      <name>Alfresco Surf</name>
      <connector-id>http</connector-id>
      <endpoint-url>http://www.springsurf.org</endpoint-url>
      <identity>user</identity>
    </endpoint>
  </remote>
</config>
```

Connectors to this endpoint will look for the user’s credentials in the credential vault. If credentials are not found and the endpoint requires authentication, the connection can fail. However, if credentials are available in the vault, they will be applied and the connector will access the endpoint on behalf of the developer without the need for manual login.

## Authenticators {#authenticators}

Authenticating connectors are connectors that have authenticators plugged into them. An authenticator is a class that knows how to perform an authentication handshake with a specific kind of service or application.

For example, MediaWiki provides a REST-based means for authenticating. You pass in your user credentials and it hands back an HTTP cookie. This cookie must be applied to every subsequent request, as MediaWiki looks to it to inform the application of who is making the request.

Alfresco Content Services has a similar REST-based means for authenticating. It is slightly different in that the RESTful parameters are not the same as those of MediaWiki. Also, Alfresco Content Services hands back a ticket in an XML return payload. This ticket must be applied to the HTTP headers of every subsequent call so that Alfresco Content Services knows who is making the request. Every application has a slightly different way of handling its authentication. For this reason, Surf makes it easy to write your own authenticators and plug them into your connectors entirely through configuration.

You define authenticators through configuration as well:

```
<authenticator>
    <id>alfresco-ticket</id>
    <name>Alfresco Authenticator</name>
    <description>Alfresco Authenticator</description>
    <class>org.alfresco.connector.AlfrescoAuthenticator</class>
</authenticator>
```

You can then bind them to connectors using configuration, or you can write your own connectors:

```
<connector>
    <id>alfresco</id>
    <name>Alfresco Connector</name>
    <description>Connects to Alfresco using ticket-based authentication</description>
    <class>org.alfresco.connector.AlfrescoConnector</class>
    <authenticator-id>alfresco-ticket</authenticator-id>
</connector>
```

The `alfresco-ticket` authenticator and the `alfresco` connector are both available to Surf developers out of the box to connect to an Alfresco Content Services instance. All you need to do is define an endpoint that points to an Alfresco Content Services instance and uses the `alfresco` connector. Alfresco Content Services connectors use an authenticator to perform a handshake ahead of any actual interaction. The handshake establishes who the user is and then sets up the connector session so that subsequent requests contain the appropriate connection information (cookies, request headers, and so forth). The endpoint definition looks like this:

```
<endpoint>
    <id>alfresco</id>
    <name>Alfresco REST API</name>
    <description>Alfresco REST API</description>
    <connector-id>alfresco</connector-id>
    <endpoint-url>http://localhost:8080/alfresco/s</endpoint-url>
    <identity>user</identity>
</endpoint>
```

This endpoint is named `alfresco`. It uses an `alfresco` connector and will draw credentials from the user’s credential vault. This is all defined in configuration. You could use the `alfresco` endpoint to talk to an Alfresco Content Services instance and access its remote API. For example, you can interact with the CMIS API on the repository. Here is an example of retrieving XML from the CMIS API:

```
// get a connector to the alfresco endpoint
var connector = remote.connect("alfresco");
// place CMIS text onto the model
model.cmis = connector.get("/api/path/workspace/SpacesStore");
```

By simply coding to the remote object, you do not need to worry about how to connect to the endpoint or pass along user state.

## Remote API {#remote-api}

The `remote` root-scoped object lets you connect to remote services and retrieve data feeds.

The basic pattern is to use the remote object to get a connector to a specific endpoint, which is identified by endpoint ID. For example:

`var connector = remote.connect(ENDPOINT_ID);`

By filling in `ENDPOINT_ID` with the correct value, you have a connector to the remote service. The connector variable is an object with additional methods describing all the ways you can work with the endpoint.

The following methods are the basic HTTP method types that support the essential CRUD (create, read, update, delete) operations of most RESTful services. You can use these to work with services right within your web scripts.:

-   `post(uri, body)`—POSTs content to the given URI
-   `post(uri, body, contentType)`—POSTs content of the specified type to the given URI
-   `get(uri)`—GETs content from the given URI
-   `put(uri, body)`—PUTs content to the given URI
-   `put(uri, body, contentType)`— PUTs content of the specified type to the given URI
-   `delete(uri)`—Invokes a URI as a DELETE request

## Surf object XML quick reference (siteData) {#surf-object-xml-quick-reference-sitedata}

Surf objects are defined in XML. This document provides a quick reference guide to the most commonly used Surf objects, and how they are defined in XML.

### File locations

In the following sections you will see that two locations are specified:

-   `classpath:/alfresco/site-data`
-   `classpath:/alfresco/web-extension/site-data`

It's important to note that the `alfresco/web-extension/site-data` directory will be processed after the `alfresco/site-data` directory. Usually core Alfresco Content Services objects would be located in `alfresco/site-data` directory, and third-party overrides/extensions would be located in `alfresco/web-extension/site-data`.

-   **[Component](#component)**  
Component instances describe bindings between a region and a rendering engine that is responsible for generating the component's markup. Typically the rendering engine is the Surf web script engine.
-   **[Configuration](#configuration)**  
Configuration files let you store arbitrary XML descriptions for use in your custom Surf objects. In most cases, the only time you will need to construct one of these objects is when describing site configuration. An example of a site configuration follows.
-   **[Page](#page)**  
A page describes a URL-addressable destination that has been resolved and for which a view must be produced. A page aligns with the concept of a web page from the end user's point of view. Pages are often arranged into page hierarchies that constitute a web site's navigation structure.
-   **[Template instance](#template-instance)**  
Template instances wrap configuration around a template file. The template file receives all the properties of the template instance and can use these properties to inform its rendering logic. This empowers a single template file to render differently based on the configuration stored in the template instance.
-   **[Template type](#template-type)**  
Template types contain information that is common across many template instances of the same type. A template type defines one or more rendering processors. It maybe also define properties that all template instances of the given type will receive at render time.
-   **[Theme](#theme)**  
Themes capture default settings for the rendering of elements in the request. A theme is a unique identifier as well as a collection of properties and page type overrides. When a theme is selected, its properties and its page type overrides apply to the request.

## Component {#component}

Component instances describe bindings between a region and a rendering engine that is responsible for generating the component's markup. Typically the rendering engine is the Surf web script engine.

### Locations

-   `classpath:/alfresco/site-data/components`
-   `classpath:/alfresco/web-extension/site-data/components`

### Definition

```    
<component>
  <!-- Required -->
  <scope>page | template | global</scope>
  <region-id>REGION_ID</region-id>
  <source-id>SOURCE_ID</source-id>

  <!-- Optional -->
  <url>URL</url>
  <component-type-id>COMPONENT_TYPE_ID</component-type-id>
  <chrome>CHROME_ID</chrome>
</component>
```

### Properties

-   `<id>` - Component IDs follow a convention:
    -   For page and template scoped region bindings the convention is `<scope>.<region-id>.<source-id>`
    -   For bindings to regions in the global scope the convention is `global.<region-id>`
-   `<scope>` - The scope of the binding (page, template, global)
-   `<region-id>` - The name of the region that is being bound.
-   `<source-id>` - The ID of the page or template instance to which the component is bound. For the global scope this should be set to `global`.

### Optional properties

-   `<url>` - The web script URL (if a web script is being rendered)
-   `<component-type-id>` - The ID of the component type for this component.
-   `<chrome>` - The ID of the Chrome used to frame this component's presentation.

### Example - Page scope binding

This component binds the web script with the URL `/sample/content` to the paged-scoped region named `content` on the page `home`. It therefore has the ID `page.content.home`.

```
    classpath:/alfresco/web-extension/site-data/compnents/page.content.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>page.content.home</id>
      <scope>page</scope>
      <region-id>content</region-id>
      <source-id>home</source-id>
      <url>/sample/content</url>
    </component>
```

### Example - Template scope binding

This example binds the web script with the URL `/sample/header` to the template-scoped region named `header` on the `home` template. It therefore has the ID `template.header.home`.

```
    classpath:/alfresco/web-extension/site-data/compnents/template.header.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>template.header.home</id>
      <scope>template</scope>
      <region-id>header</region-id>
      <source-id>home</source-id>
      <url>/sample/header</url>
    </component>
```

### Example - Global scope binding

This example binds the web script with the URL `/sample/footer` to the global-scoped region named `footer`. It therefore has the ID `global.footer`.

```
    classpath:/alfresco/web-extension/site-data/compnents/global.footer.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>global.footer</id>
      <scope>global</scope>
      <region-id>footer</region-id>
      <source-id>global</source-id>
      <url>/sample/footer</url>
    </component>
```

### Example - Custom page scope binding

This example binds the web script with the URL `/sample/content` to the page-scoped region named `content` on the page `home`. It informs Surf to wrap the Component with a custom component Chrome when it renders. It also provides a few custom properties that the web script can use while it executes

```
    classpath:/alfresco/web-extension/site-data/compnents/page.content.home.xml
    
    <?xml version="1.0" encoding="utf-8"?>
    <component>
      <id>page.content.home</id>
      <scope>page</scope>
      <region-id>content</region-id>
      <source-id>home</source-id>
      <url>/sample/content</url>
      <chrome>sample-chrome</chrome>
      <properties>
        <view>FULL</view>
        <style>formal</style>
      </properties>
    </component>
```

## Configuration {#configuration}

Configuration files let you store arbitrary XML descriptions for use in your custom Surf objects. In most cases, the only time you will need to construct one of these objects is when describing site configuration. An example of a site configuration follows.

### Locations

-   `classpath:/alfresco/site-data/configurations`
-   `classpath:/alfresco/web-extension/site-data/configurations`

### Definition

```  
<configuration>
  <source-id>SOURCE_ID</source-id>
</configuration>
```

### Properties

-   `<source-id>` - Tags the configuration as pertaining to an arbitrary ID. Surf will automatically look for configuration where `source-id` is `site`.

### Example - Site configuration

The following file defines the Surf site configuration. It describes a Configuration object that is bound to the site source ID.

```  
classpath:/alfresco/web-extension/site-data/configurations/default.site.configuration.xml

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <title>My Web Site</title>
  <source-id>site</source-id>
  <properties>
    <root-page>welcome</root-page>
  </properties>
</component>
```

## Page {#page}

A page describes a URL-addressable destination that has been resolved and for which a view must be produced. A page aligns with the concept of a web page from the end user's point of view. Pages are often arranged into page hierarchies that constitute a web site's navigation structure.

Pages can specify whether they require user authentication before rendering. Unauthenticated users will not be able to render the page.

Pages also have optional types that allow them to be dispatched by page type rather than Page ID. Pages have one or more template instances associated with them. This allows them to render distinctly for different intended output formats (for example, HTML, PDF, or wireless).

### Locations

-   `classpath:/alfresco/site-data/pages`
-   `classpath:/alfresco/web-extension/site-data/pages`

### Definition

```     
<page>
  <!-- Optional authentication setting -->
  <authentication>none | user</authentication>

  <!-- Optional page type ID (otherwise assumes generic) -->
  <page-type-id>PAGE_TYPE_ID</page-type-id>
  
  <!-- Use this to associate a default template -->
  <template-instance>TEMPLATE_ID</template-instance>
  
  <!-- Use this to associate a template to this page for a given format -->
  <template-instance format="FORMAT_ID">TEMPLATE_ID</template-instance>
</page>
```

### Properties

-   `<template-instance>` - The IDs of one or more template instances that will be used to render this Page when requested for a give FORMAT_ID. If the format attribute is not supplied, it is assumed to have the value `default`.

### Optional properties

-   `<authentication>` - the level of authentication required in order for the end user to access this page. Valid authentication values are `none` or `user` (defaults to none).
-   `<page-type-id>` - the ID of the page type of this page.

### Example - page with authentication

The following file defines a page called "products". Only authenticated users are allowed to access the page. When the page is asked to render in the default format, it looks to the template instance with the ID `landing1`. When the page is asked to render in the print format, it looks to the template instance with the ID landing1-print.

Were you to set up the `landing1-print` template, you would be able to request the print format for this page using the following URL:

`http://localhost:8080/webapp/page/products?f=print`

```    
classpath:/alfresco/web-extension/site-data/pages/products.xml

<?xml version="1.0" encoding="utf-8"?>
<page>
  <id>products</id>
  <title>Products Page Title</title>
  <description>Products Page Description</description>
  <authentication>user</authentication>
  <template-instance>landing1</template-instance>
  <template-instance format="print">landing1-print</template-instance>
</page>
```

## Template instance {#template-instance}

Template instances wrap configuration around a template file. The template file receives all the properties of the template instance and can use these properties to inform its rendering logic. This empowers a single template file to render differently based on the configuration stored in the template instance.

For simple cases where the template instance is not required to store additional configuration, it may remain a very lightweight pointer to the template file. For more advanced cases, the template instance may store render-time information concerning how to lay out elements on the page.

### Locations

-   `classpath:/alfresco/site-data/template-instances`
-   `classpath:/alfresco/web-extension/site-data/template-instances`

### Definition

```     
<template-instance>
  <template-type>TEMPLATE_TYPE_ID</template-type>
</template-instance>
```

### Properties

-   `<template-type>` - the ID of the template type used to render this template instance. If a template path is provided here, the template type is assumed to be FreeMarker and the path is used for rendering.

### Example - landing template with configuration

```   
classpath:/alfresco/web-extension/site-data/template-instances/landing1.xml

<?xml version="1.0" encoding="utf-8" ?>
<template-instance>
  <id>landing1</id>
  <template-type>landing</template-type>
  <properties>
    <columns>2</columns>
    <rows>3</rows>
  </properties>
</template-instance>
```

## Template type {#template-type}

Template types contain information that is common across many template instances of the same type. A template type defines one or more rendering processors. It maybe also define properties that all template instances of the given type will receive at render time.

When the framework needs to render a template instance, it considers the template type and merges its properties forward. The `uri` of the template instance overrides the `uri` of the template type.

### Locations

-   `classpath:/alfresco/site-data/template-types`
-   `classpath:/alfresco/web-extension/site-data/template-types`

### Definition

```    
<template-type>
  <!-- Required "view" processor -->
  <processor mode="view">
    <id>PROCESSOR_ID</id>
    
    <!-- Optional Uri -->
    <uri>PROCESSOR_URI</uri>
</template-type>
```

### Properties

-   `<processor>` - identifies the rendition processor to use. Valid PROCESSOR_ID values include `freemarker`, `jsp`, and a custom ID. With the FreeMarker processor, PROCESSOR_URI should identify the path to the FTL file relative to the /templates directory. With the JSP processor, PROCESSOR_URI should identify the path to the JSP file relative to the web application root.

### Example - FreeMarker template processor

The following file defines a template type that is used by template instances to invoke the FreeMarker processor.

```    
classpath:/alfresco/web-extension/site-data/template-types/freemarker.xml
            
<?xml version="1.0" encoding="utf-8" ?>
<template-type>
  <id>freemarker</id>
  <title>FreeMarker Template Type</title>
  <processor mode="view">
    <id>freemarker</id>
  </processor>
</template-type>  
```

## Theme {#theme}

Themes capture default settings for the rendering of elements in the request. A theme is a unique identifier as well as a collection of properties and page type overrides. When a theme is selected, its properties and its page type overrides apply to the request.

A theme captures default settings for the rendering framework. Different themes can have different rendering behaviors.

### File locations

In the following sections you will see that two locations are specified:

-   `classpath:/alfresco/site-data/themes`
-   `classpath:/alfresco/web-extension/site-data/themes`

### Definition

```
<theme>
  <!-- Optional page type overrides -->
  <page-types>
    <page-type>
      <id>PAGE_TYPE_ID</id>
      <page-id>PAGE_ID</page-id>
    </page-type>
  </page-types>
</theme>
```

### Properties

-   `<page-types>` - one or more optional overrides that assign page instances to be used when Surf asks for a Page of a particular type. Using this mechanism, themes can swap out different default Pages to significantly affect the look and feel.

### Example

The following file defines a theme that overrides the login page type to include a different default page. When this theme is used, Surf will render back the `default-login-page` Page when the `login` page type is requested.

```   
classpath:/alfresco/web-extension/site-data/themes/default.xml

<?xml version="1.0" encoding="utf-8"?>
<theme>
  <id>default</id>
  <page-types>
    <page-type>
      <id>login</id>
      <page-id>default-login-page</page-id>
    </page-type>
  </page-types>
</theme>
```

## Advanced Surf Topics {#advanced-surf-topics}

Advanced topics in the Surf development framework.

Specific information:

-   How checksums work
-   CSS data image support
-   Dependency aggregation

-   **[Surf Checksums](#surf-checksums)**  
Checksums can be applied to JavaScript and CSS resources to facilitate efficient upgrading of Alfresco Content Services.
-   **[Surf CSS data image support](#surf-css-data-image-support)**  
Surf provides support for CSS data URIs.
-   **[Surf dependency aggregation](#surf-dependency-aggregation)**  
There are additional FreeMarker template directives related to aggregate dependencies.

## Surf Checksums {#surf-checksums}

Checksums can be applied to JavaScript and CSS resources to facilitate efficient upgrading of Alfresco Content Services.

One of the problems that has affected upgrades of Alfresco Content Services in the past is that the end-user's browser can end up using cached copies of JavaScript and CSS files that have been updated during the upgrade. Surf has a service called the “DependencyHandler” which solves this specific problem.

The approach taken is to append a unique checksum to the end of each requested JavaScript and CSS dependency, where the checksum is generated from the contents of the file. If file content is changed the checksum generated will be different. The checksum associated with the file is cached for the lifecycle of the web server - this means that it does not need to be generated for each request. Surf performance has actually been enhanced by this mechanism because Surf also caches the location from which the dependency was retrieved Surf can retrieve dependencies from a number of different locations, for example, JAR files, class path, file system, remote location, and so on.

This feature is enabled by default in the webapps/share/WEB-INF/surf.xml file:

```
<web-framework>
  ...
   <use-checksum-dependencies>true</use-checksum-dependencies>
  ...
</web-framework>
```

> **Important:** Note that this value should not be changed for Alfresco version 4.2 and later, or Alfresco 3.4 and earlier. It can however be changed for Share in Alfresco versions 4.0 and 4.1.

In order to make use of the Dependency Handler you will need to use the <@script>, <@link> and <@checksumResource> FreeMarker directives in your template instance and web script files, for example:

```
<@script src="${url.context}/res/yui/yahoo/yahoo.js"></@script>
<@link rel="stylesheet" type="text/css" href="${url.context}/res/css/base.css" />
<@checksumResource src="${url.context}/res/css/ipad.css"/>
```

These examples are taken from the `resources.get.html.ftl` file where the `${url.context}` is a FreeMarker variable set to the application context, for example `share`.

-   **<@script>**

    Generates JavaScript script import declarations.

-   **<@link>**

    Rolls up multiple CSS requests into a style declaration using a separate `@import` statement for each usage of <@link>.

-   **<@checksumResource>**

    Generates just the URL, that is without being specific to CSS or JavaScript and can therefore be used with images or even web script requests. One additional feature of the <@checksumResource> directive is that you can specify the attribute `parameter` which makes the checksum appear as the value of a request parameter of the supplied name (rather than as part of the file name itself).


### Debug and production suffices

The Dependency Handler is capable of dealing with production (minified) and debug versions of files. The Spring application context configuration for the bean allows you to specify the different file suffices that can be used for both production and debug versions and the Dependency Handler will work through the different suffices until it finds a matching file. This means that Surf will always be able to fall back to the debug version of the code if a minified version does not exist. By default the debug suffices are:

-   No suffix
-   _src
-   -debug

The production suffices are:

-   -min
-   -minified
-   no suffix

You can change these suffices by overriding the definition for the `dependency.handler` bean in the Spring application context in case you want to add, remove or re-order the default entries.

### Current limitations

The current limitation of this solution is that it only works with static requests from the page and not dynamic requests made from a script. However, many JavaScript libraries provide their own solution to this problem (for example TinyMCE).

## Surf CSS data image support {#surf-css-data-image-support}

Surf provides support for CSS data URIs. Data URIs are a way of embedding image data into a CSS page. The advantage of using this approach is that no additional HTTP Requests are required to fetch and return images. This increases the performance of a web page considerable, especially for pages with numerous image files.

Much of the performance hit associated with a browser loading a web page comes from the multiple HTTP Requests (and returns) that are required to load multiple resources required by the page, particularly image files. One solution to this is to combine the images into a so called CSS Sprite - this means that a single HTTP request is then required for a page with multiple images. CSS is then used to locate sub-sections of the CSS Sprite on the web page. While this provides a performance boost, especially for image rich pages, it still requires an HTTP request to obtain the CSS Sprite file. Also, the technique requires some preparation on the part of the web page developer.

An alternative to the CSS Sprite is to use Data URIs. Data URIs effectively allow data to be embedded within the CSS stylesheet itself. This data can be image data. The advantage of this approach is that no additional HTTP Requests are required for images beyond the one to fetch the CSS stylesheet itself. This represents an additional performance boost, and is more convenient for the web page developer, as it does not require the potentially tricking positioning code required by the CSS Sprite approach (although in practice this is somewhat alleviated by web page design tools).

While it might seem that embedding image data into a CSS file has the potential to make CSS files unweildy, the image data is typically Base64 encoded and gzipped to make it far more compact.

With regards Share, while the CSS Sprite could be applied to Share pages, it has the potential to break existing Share customizations, so this appraoch is not used in Share. The approach taken instead is to use the Data URI approach to embed images in CSS stylesheets.

### Configuration in Share

Surf can now automatically produce CSS data images by simply adding the following line to its configuration file. For Share this configuration file is located in webapps/share/WEB-INF/surf.xml.

```
<web-framework> 
   ...
      <generate-css-data-images>true</generate-css-data-images> 
   ... 
</web-framework>
```

[Providing that checksum dependencies are also enabled](#surf-checksums) then all images reference by CSS files will be embedded as data within those CSS files. In addition to eliminating HTTP requests for images, when an image changes, the CSS checksum will change so the browser will not use stale cached images. The Dependency Handler service defers some of this work to a dedicated `CssDataImage` service which can be overridden in the Spring application context if required. All images are cached for the life-cycle of the server so that performance is not impeded when requesting the same image multiple times.

> **Important:** CSS data image files are not supported by Internet Explorer versions 6 and 7. If these browsers are detected then the CSS data image will not be generated.

## Surf dependency aggregation {#surf-dependency-aggregation}

There are additional FreeMarker template directives related to aggregate dependencies.

### Introduction

This information expands on FreeMarker template attributes and directives.

### The group attribute

The documentlist.get.html.ftl template uses the `group` attribute in the `<@link>`, `<@script>`, `<@inlineScript>` and `<@createWidgets>` directives. This attribute determines the order in which dependency requests and JavaScript code are output into the rendered HTML page.

Surf supports the ability to aggregate multiple files into a single resource to reduce the number of HTTP requests made by the client, in order to increase page loading performance. The `group` attribute is used to determine how dependencies are aggregated into the generated resources. Managing the groups is important because once generated a resource is cached on the server to improve response times for subsequent requests. If a single group were to be used then only one HTTP request would be made per page, but the performance gained through reduced requests would be lost to server side aggregation for each request.

In order for the same Share code to be able to support different Surf operation modes the `group` attribute is also applied when processing individual dependency requests. Groups are output in the order they are requested and all the dependency requests and code are output for each group in turn.

By way of example, for the following HTML:

```
<@script src="/aaa.js" group="1"/>
<@script src="/bbb.js" group="2"/>
<@script src="/ccc.js" group="3"/>
<@script src="/ddd.js" group="2"/>
<@script src="/eee.js" group="1"/>
```

The output is:

```
<script src="/aaa.js"></script>
<script src="/eee.js"></script>
<script src="/bbb.js"></script>
<script src="/ddd.js"></script>
<script src="/ccc.js"></script>
```

Note that `/eee.js` is the second requested import despite appearing last in the list and that `/ccc.js` is last despite it appearing 3rd. This is because all of group "1" is output before any of group "2", and all of group "2" is output before group "3".

### Mixing `<@script>` and `<@inlineScript>`

Given files A.js and `B.js` and a WebScript template containing the following:

```
<@script src="${url.context}/res/A.js" group="calc"/>
   <@inlineScript group="calc">
      // A comment between imports
   </@>
<@script src="${url.context}/res/B.js" group="calc">
```

When the final page is rendered in the source you would see an import like this:

```
&lt;script type=&quot;text/javascript&quot; src=&quot;/share/res/A.js&quot;&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot;&gt;//&lt;![CDATA[
   // A comment between imports
//]]&gt;&lt;/script&gt;
&lt;script type=&quot;text/javascript&quot; src=&quot;/share/res/B.js&quot;&gt;&lt;/script&gt;
```

Note that the JavaScript from the `<@inlineScript>` directive is placed between the two imports because they are in the same group. The same is true for any custom directive that outputs JavaScript, for example the `<@createWidgets>` directive.

### Configuring Surf to Aggregate Dependencies

To enable the use of aggregate dependencies you will need to make a Surf configuration change. By default the capability is disabled in Surf and is unlikely to ever enabled by default in future releases of Alfresco Content Services.

To enable it you set the following line within the Surf configuration file, webapps/share/WEB-INF/surf.xml:

```       
    <web-framework>
        ...
        <aggregate-dependencies>true</aggregate-dependencies>
        ...
    </web-framework>
```

CAUTION:

Any third-party modules or add-ons that have been applied might not support this feature.

### Aggregated Dependency Output

If you do enable dependency aggregation then you can expect the following behaviour to occur. If the file A.js contains:

```
var a = 1;
```

and the file B.js contains:

```
var c = a + b;
```

and you have a WebScript template containing the following:

```
<@script src="${url.context}/res/A.js" group="calc"/>
   <@inlineScript group="calc">
      var b = 1;
   </@>
<@script src="${url.context}/res/B.js" group="calc">
```

When the final page is rendered in the source you would see an import like this:

```
<script type="text/javascript" src="/share/res/20146f7250123ea2437a0d16d5c323.js"></script> <!-- Group Name: "calc" -->
```

The source of that file would contain:

```

var a = 1;
var b = 1;
var c = a + b;
```

The resource name is an MD5 checksum generated from the combined source code. The generated resource is cached on the server so that it doesn't need to be generated each time. If extra content is added to the group (even dynamically by a module) then the resource will be regenerated and the checksum will naturally change to ensure that the browser requests a different file.

### Debugging

The `<client-debug>` setting located in webapps/share/WEB-INF/classes/alfresco/share-config.xml, will work when enabled, even when using aggregation. An aggregated resource will still be produced but each aggregated file will be separated by a comment similar to the following:

```
/*Path=A.js*/
```

This will allow you to determine the source file in which errors occur when debugging.

### The Output Directives

Previous versions of Alfresco Share relied on the use of the `${head}` FreeMarker model property to output all the dependency requests generated on the first pass of all the web script *.head.ftl files. This property is populated during this first pass and then output in `<head>` HTML element defined in the alfresco-template.ftl template. Current code also contains a reference to that property, as this is used to support legacy *.head.ftl files and dependencies defined through any `<dependencies>` elements in extension module configuration. There are also two new directives: `<@outputJavaScript/>` and `<@outputCSS/>`.

As their names suggest these directives are used to output the JavaScript and CSS dependency requests made by using the `<@link>`, `<@script>`, `<@inlineScript>`, and `<@createWidgets>` directives. The `output` directives act as placeholders in extensibility model and accumulate requests to output content as the remainder of the Surf page is processed - only when the page has completely been processed is their final content rendered into the output stream.

Towards the end of the alfresco-template.ftl file you will also see a commented out directive <@relocateJavaScript>. The purpose of this directive is to change the location in the page where JavaScript output is rendered. It is suggested to move JavaScript to the end of a page to increase page performance. It is only possible to use this directive if there is no hard-coded `<script>` elements on the page that depend on imported files or JavaScript dependencies output by using the `${head}` property. When uncommented though you will see that it produces a very clean source file for your page with all the JavaScript located at the end. The `<@relocateJavaScript>` directive is available should you wish to use to in custom Surf pages.
