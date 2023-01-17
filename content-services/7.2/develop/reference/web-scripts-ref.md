---
title: Web Scripts Reference
---

Web scripts provide a unique way to programmatically interact with the Content Services server. Unlike other 
interfaces exposed by Content Services, web scripts offer a RESTful API for the content residing in the repository. 
The REST (Representational State Transfer) web architecture is based on HTTP requests and responses, URIs 
(Uniform Resource Identifiers), and document types.

Web scripts let you implement your own RESTful API without tooling or Java knowledge, requiring only a text editor. 
This approach to developing an Content Services API means that web scripts offer many advantages over existing 
technologies, including ease and speed of development, and flexibility in API design. By focusing on the RESTful 
architectural style, web scripts let you build custom URI-identified and HTTP accessible content management web services 
backed by the Content Services server.

Web scripts provide RESTful access to content held within your repository. You can place controls on your content to 
manage it and provide uniform access for a wide variety of client applications and services, such as a browser, portal, 
search engine, or custom application. Because of the inherent distributed nature of this interface, all repositories 
within the enterprise can resemble one logical collection of inter-related documents (like the web), letting you apply 
web technologies such as caching, authentication, proxies, and negotiation to your repository resources.

You can build your own RESTful interface using lightweight scripting technologies (such as JavaScript and FreeMarker), 
allowing you to arbitrarily map any content in the repository to resources on the web, or you can use out-of-the-box 
web scripts that already encapsulate many of the mappings. The Content Services CMIS (Content Management Interoperability Services) 
AtomPub binding is implemented as a series of web scripts.

You can use web scripts for various solutions, such as:

* Integrating Content Services with third party systems
* Providing feeds
* Developing data services
* Developing UI services such as portlets
* Customizing search
* Acting as a back-end to client tools, such as Orbeon Forms
* Integrating with Microsoft Office
* Developing Facebook applications
* Building UI components in Surf

## Understanding web scripts

Web scripts let you programmatically interact with the Content Services server. Unlike other interfaces exposed 
by Content Services, web scripts offer a RESTful API for content in the repository.

REST (Representational State Transfer) is an architectural style of which the web architecture is the most prominent 
example, one based on HTTP requests and responses, URIs (Uniform Resource Identifiers), and document types.

Web scripts let you implement your own RESTful API without tooling or Java knowledge. You simply need your favorite 
text editor. No compilation, generators, server restarts, or complex installs are required. This approach to developing 
an Content Services API means that web scripts offer many advantages over existing technologies, including ease 
and speed of development, and flexibility in API design.

By focusing on the RESTful architectural style and ease of development, web scripts let you build your own custom 
URI-identified and HTTP accessible content management web services backed by the Content Services server. 
This is like having an HTTP server with a built-in content repository allowing clients to easily access, manage, and 
cross-link content via a tailored RESTful interface designed specifically for the application requirements.

## Web script types

A web script is a service bound to a URI that responds to HTTP methods such as GET, POST, PUT, and DELETE.

There are two kinds of web scripts that use the same underlying code:

1. [Data web scripts]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %})
2. [Presentation web scripts]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %})

![webscript-types]({% link content-services/images/webscript-types.png %})

### Repository web scripts

Repository web scripts encapsulate access and modification of content/data held in the content repository; therefore, 
they are provided and exposed only by the Content Services server.

Data web scripts provide a server interface for client applications to query, retrieve, update, and perform processes, 
typically using request and response formats such as XML and JSON.

### Presentation web scripts

Presentation web scripts let you customize and extend the web UI. They typically render HTML and can include 
browser-hosted JavaScript.

Unlike data web scripts, presentation web scripts can be hosted in the Content Services server or in a 
separate presentation server. When hosted separately, presentation web scripts in the presentation server interact 
with data web scripts in the Alfresco content application server by using the Repository REST API.

## Web Script Framework

The Web Script Framework is designed according to the Model View Controller (MVC) pattern (sometimes referred to as 
MVC for the web). While its primary design goal is to ensure that simple web scripts are easy to develop, advanced 
web scripts can support various features, such as rendering outputs in multiple languages, exposing and adhering to 
configuration options, and handling HTML form uploads.

You can call existing web scripts or create your own web scripts for new scenarios. For example, you can create your 
own web script to expose a RESTful interface onto a custom content repository extension.

![wsf-design]({% link content-services/images/wsf-design.png %})

### Web script components {#wscomponents}

The Web Script Framework lets you create a web script using familiar technologies, such as scripting and template languages.

Each web script comprises only the following components:

* A description document
* An optional controller script
* One or more FreeMarker response templates

Each component is implemented in its own file. The Web Script Framework dictates where the files are located and how 
they are named. This allows the framework to automatically locate and register web scripts without having to tell the 
framework where they are. In some cases, a web script can fall back to Java or rely on advanced Web Script Framework 
features where scripting alone cannot support the requirements of the web script.

Users of a web script only interact through the web script interface, which comprises its URI, HTTP method, and 
request/response document types. All of these are described in the web script description document, which is defined 
by the web script creator.

![9-1]({% link content-services/images/9-1.png %})

#### Web script description document

A web script description document is an XML file that describes the URI and HTTP method that initiates the web script. 
For example, the web script is given a short name and description, along with authentication and transactional needs. 
URI bindings are described as URI templates.

An example of a web script description document follows:

```xml
<webscript>
  <shortname>Blog Search Sample</shortname>
  <description>Sample that finds all blog entries whose content contains the specified search term</description>
   <url>/sample/blog/search?q={searchTerm}</url>
   <url>/sample/blog/search.atom?q={searchTerm}</url>
   <url>/sample/b/s?q={searchTerm}</url>
   <url>/sample/b/s.atom?q={searchTerm}</url>
   <format default="html">extension</format>
   <authentication>guest</authentication>
   <transaction>required</transaction>
</webscript>
```

#### Web script controller script

A web script controller script is a JavaScript file that contains the actual logic of a web script.

The controller script can query the repository to build a set of data items, known as a model, to render in the response. 
It might also update the repository for URIs that intend to modify the repository (PUT, POST, and DELETE method bindings). 
The JavaScript has access to the URI query string, services, and repository data entry points.

```javascript
// check that search term has been provided
if (args.q == undefined || args.q.length == 0)
{
   status.code = 400;
   status.message = "Search term has not been provided.";
   status.redirect = true;
}
else
{
   // perform search
   var nodes = search.luceneSearch("TEXT:" + args.q);
   model.resultset = nodes;
}        
```

#### Web script response template

Known as views, web script response templates render output in the correct format for specific needs, such as HTML, 
Atom, XML, RSS, JSON, CSV, or any combination of these.

The HTTP response is rendered by using one of the supplied templates, where the chosen template is based on the required 
response content type or status outcome. The template has access to the URI query string, common repository data entry 
points, and any data items built by the optional controller script.

```xml 
<html>
  <body>
    <img src="${url.context}/images/logo/AlfrescoLogo32.png" alt="Alfresco" />
    Blog query: ${args.q}
    <br/>
    <table>
<#list resultset as node>
     <tr>
       <td><img src="${url.context}${node.icon16}"/></td>
       <td><a href="${url.serviceContext}/api/node/content/${node.nodeRef.storeRef.protocol}/${node.nodeRef.storeRef.identifier}/${node.nodeRef.id}/${node.name?url}">${node.name}</a></td>
     </tr>
</#list>
    </table>
  </body>
</html>        
```

### Naming conventions

Web script component file names adhere to the naming conventions defined by the Web Script Framework.

#### Description documents

Web script description document file names have the following structure:

`<web script id>.<http method>.desc.xml`

* `<web script id>` identifies the web script and must be unique within a web script package. A web script is uniquely identified by its web script package and web script ID. For example:`/org/alfresco/tutorials/helloworld`
* `<http method>` specifies which HTTP method initiates the web script. Typically, this is GET, but other common methods include POST, PUT, and DELETE. A web script that only queries the repository is bound to the HTTP GET method.
* All description document file names end with `.desc.xml,` indicating to the Web Script Framework the file is actually a description document that defines a web script. In the XML description document, web script descriptors have a root `<webscript>` element within which everything is defined.

The `<shortname>` and `<description>` elements provide human readable titles for the web script. You can see these in 
web script documentation and the web script index at: `http://localhost:8080/alfresco/service/index`

#### JavaScript based Controllers

Controller script file names have the following structure:

`<web script id>.<http method>[.<format>].js`

* `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
* `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
* `<format>` is an **optional** parameter in the controller name that can be used to specify a format of a POSTed request body. Out-of-the-box the Web Script framework provides the JSON (format = `json`), Atom Feed (format = `atomfeed`), Atom Entry (format = `atomentry`), and Atom (format = `atom`) formats. To get access to the POSTed data we can then use the `json`, `feed`, and `entry` JavaScript root objects in the controller. The Atom format provides both `feed` and `entry` root objects in the controller.
* All controller script file names end with .js indicating to the Web Script Framework that the file is a controller script.

#### Java based Controllers

To bind a Spring bean to a Web Script it is only necessary to create a bean with an `id` of the following structure:

`id="webscript.<packageId>.<web script id>.<httpMethod>"`

#### FreeMarker Templates - View

Template file names have the following structure:

`<web script id>.<httpMethod>.<format>.ftl`

* `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
* `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
* `<format>` specifies the format of the response template whose value is one of the following:
    * **html** => text/html
    * **text** => text/plain
    * **xml** => text/xml
    * **atom** => application/atom+xml
    * **atomentry** => application/atom+xml;type=entry
    * **atomfeed** => application/atom+xml;type=feed
    * **rss** => application/rss+xml
    * **json** => application/json
    * **opensearchdescription** => application/opensearchdescription+xml
    * **mediawiki** => text/plain (Media Wiki markup)
    * **portlet** => text/html (head & tail chopped)
    * **fbml** => text/html
    * **php** => text/html
    * **js** => text/javascript
    * **calendar** => text/calendar
* All template file names end with `.ftl` indicating to the Web Script Framework that the file is a FreeMarker template.
* Multiple response format files can be used for a Web Script implementation.

#### FreeMarker Templates - Response status

Response status code document file names adhere to a naming convention as defined by the Web Script Framework. 
The appropriate response status code template is searched for in the following order:

1.  A template located in the same folder as the web script description document for rendering a specific status code response, which adheres to the naming convention `<web script id>.<http method>.<format>.<status code>.ftl`
2.  A template located in the same folder as the web script description document for rendering a response of any status code, which adheres to the naming convention `<web script id>.<http method>.<format>.status.ftl`
3.  A package-level template located in the package of the web script but, if not found, is searched for in the parent package hierarchy, up to the root package for rendering a response of any status code, which adheres to the naming convention `<format>.status.ftl`
4.  A template located in the root package for rendering an HTML response for the specific status code, which adheres to the naming convention `<status code>.ftl`
5.  A template located in the root package for rendering an HTML response of any status code, which adheres to the naming convention:`status.ftl`

#### Message Bundles

Web Script responses may be localized. Resource file names have the following structure:

`<web script id>.<httpMethod>[_<locale>].properties`

* `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
* `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
* _<locale> specifies the what localized bundle the file provides, such as for example French: helloworld.get**_fr**.properties
* All message bundle file names end with .properties indicating to the Web Script Framework that the file belongs to a resource bundle.

#### Configuration

Configuration is accessed via the `config` root object, which is available during both controller script and 
template execution. Configuration file names have the following structure:

`<web script id>.<httpMethod>.config.xml`

* `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document.
* `<http method>` specifies which HTTP method will initiate the web script and must be the same as the associated web script description document.
* All configuration file names end with config.xml indicating to the Web Script Framework that the file is a file with external configuration.

### File locations

Web script component files are located in the file system within the Java classpath or in the repository.

The Web Script Framework searches for web scripts in the following order:

* In the content repository under the folder **/Company Home/Data Dictionary/Web Scripts Extensions**
* In the content repository under the folder **/Company Home/Data Dictionary/Web Scripts**
* In the classpath under the folder `/alfresco/extension/templates/webscripts`
* In the classpath under the folder `/alfresco/templates/webscripts`

Placing web scripts in the classpath lets you package and deploy them with other extensions that comprise your solution. 
You can install them using standard Content Services tools without having to upload them into the repository. 
However, it might not be as convenient to edit them while developing them as if they were located in the Alfresco 
content repository where you can easily edit them using Alfresco Share. You can also export and import web scripts in 
the content repository using the ACP (Alfresco Content Package) mechanism.

>**Note:** For a default installation of Content Services, the classpath is located at `<installLocation>/tomcat/shared/classes/alfresco/extension`

A single Content Services server can contain hundreds of web scripts, each implemented with multiple files. 
To help manage all these web scripts, the Web Script Framework lets you organize web script component files into a 
hierarchical folder or package structure, similar to a Java package construct. Typically, the package name follows the 
reverse domain name pattern. For example, web scripts are all located in a folder named `org/alfresco`, which is 
reserved by Content Services.

### URI anatomy

Web scripts are invoked through their defined URIs. Every web script URI follows the same form.

For example:

`http[s]://<host>:<port>/[<contextPath>/]/<servicePath>[/<scriptPath>] [?<scriptArgs>]`

The `host`, `port`, and `contextPath` are all predefined by where the Content Services server is installed. 
By default, the `contextPath` is `alfresco`.

The Web Script Framework is mapped to `servicePath`. All Content Services server URL requests that start with 
`/<contextPath>/<servicePath>` trigger the Web Script Framework into action by assuming that a web script is to be invoked. 
By default, there are two variations of `servicePath` that are acceptable: `/service` and an abbreviated version `/s`.

Both of the following URIs will invoke a web script, in this case an admin call:

* `curl -uadmin:admin "http://localhost:8080/alfresco/service/api/admin/usage"`
* `curl -uadmin:admin "http://localhost:8080/alfresco/s/api/admin/usage"`

The `scriptPath` identifies the web script to invoke and is defined by the web script itself. It must be unique within 
an Content Services server. Duplicate URIs result in a web script registration failure and one of the URIs will 
have to be adjusted before successful registration. A `scriptPath` can be as simple or as complex as required and can 
comprise many path segments. For example, the CMIS web script URI to retrieve children of a folder residing in the 
repository contains the folder path. The following command line retrieves the children of the Data Dictionary folder 
as an Atom feed:

`curl -uadmin:admin "http://localhost:8080/alfresco/s/cmis/p/Data%20Dictionary/children"`

Finally, a web script URI can support query parameters as defined by the web script to control its behavior. For example, 
the CMIS web script to retrieve folder children can be restricted to return only documents, filtering out folders:

`curl -uadmin:admin "http://localhost:8080/alfresco/s/cmis/p/Data%20Dictionary/children?types=documents"`

There are some query parameters that apply to all web script invocations such as `alf_ticket` and `format`, which can 
be mixed with web script specific parameters:

`curl -uadmin:admin "http://localhost:8080/alfresco/s/cmis/p/Data%20Dictionary/children?types=documents&format=atomfeed"`

When in doubt over how to construct a URI for a given web script, consult its web script descriptor file, which you can 
find by using the web script index. The web script index can be displayed by directing your browser to the following URL:

`http://localhost:8080/alfresco/service/index`

### URI template

A URI template is a URI containing tokens that can be substituted with actual values. Tokens represent values to query 
parameters or values within the URI path where the syntax for expressing a token is {`<token name>`}.

An example of specifying a URI with two query parameters — one named “a” and the other named “b” is: `/add?a={a}&amp;b={b}`

>**Note:** The query parameter delimiter “&” must be expressed as '&amp;' in web script descriptor documents, as “&” has special meaning within XML.

A client can generate the URI for invoking this web script when given the URI template and values for a and b. 
For example, if a is set to 1. and b is set to 2, the resulting URI is:`/add?a=1&b=2`

Query parameter tokens can indicate that the parameter is optional through the convention of appending a ‘?’ to the 
token name. For example, to indicate that the query parameter ‘b’ is optional, the URI template becomes: `/add?a={a}&amp;b={b?}`

Although you can mark parameters as optional, it is only a convention and the Web Script Framework does not enforce 
mandatory query parameters. This responsibility is given to the web script developer. An example of specifying a URI 
path with embedded tokens — one named ‘user’ and the other named ‘profilekind’ is: `/user/{user}/profile/{profilekind}`

Any URI that matches the URI template will invoke the web script that defines it. A match is made when:

* All static parts of the URI template match the URI
* All tokens within the URI template have been given values by the URI

For example, the following URIs match:

`/user/joe/profile/public`

`/user/fred/profile/full`

But the following URIs do not match:

`/user/profile/public`

`/user/joe/profile`

The value of a token in a URI path can itself have multiple path segments. For example, the following URI specifies the 
user value `joe/smith` and matches the previous URI template: `/user/joe/smith/profile/public`

When a URI request is made, the Web Script Framework locates the associated web script by finding the closest matching 
URI template for the URI. For example, consider that two web scripts each define their own similar URIs:

* Web script A defines the URI template:`/a/b`
* Web script B defines the URI template: `/a/{z}`

The URI`/a/b` invokes web script A, while the URI `/a/c`invokes web script B. Matching of static parts of the URI 
template takes precedence over matching a token value. The same token name can appear multiple times in a single 
URI template. Although rare, it is worth knowing the implications on matching to a web script. Consider the following 
URI template where the ‘user’ token is specified twice: `/user/{user}/profile/{user}`

For a match to occur, the value provided for each same named token must be the same.

This URI matches: `/user/joe/profile/joe`

But this URI does not match: `/user/joe/profile/fred`

Web script developers have access to the value provided for each token in both the controller script and response template.

### Format readers

The Web Script Framework provides out-of-the-box format readers.

* **JSON** parses a request of MIME type `application/json` into a root object named `json`
* **Atom Feed** parses a request of MIME type `application/atom+xml;type=feed` into a root object named `feed` whose type is an `Apache Abdera Feed` object
* **Atom Entry** parses a request of MIME type `application/atom+xml;type=entry` into a root object named `entry` whose type is an `Apache Abdera Entry` object
* **Atom** parses a request of MIME type `application/atom+xml` into a root object named either `feed` (`Apache Abdera Feed`) or `entry` (`Apache Abdera Entry`), depending on the request content

### Response status code templates

Web scripts use response status code templates to render a custom response for a given status code. This is useful for 
providing unique information about a status code or to render a custom human readable interface.

Response status code templates have access to the same root objects as normal web script response templates, except 
that the default templates `<code>.ftl` and `status.ftl`only have access to the root objects `url`, `status`, `server`, and `date`.

>**Note:** When developing web scripts, leave the implementation of response status code templates until the end as the templates are not essential to web script execution. You can test without custom response status code templates as the Web Script Framework will always eventually find the default template `status.ftl` in the root package. As with all other response templates, adding and removing a response status code template requires you to register the web script again.

#### Response status codes

A web script uses a response status code to inform the calling client of its execution outcome.

The following scenarios can use status codes:

* To inform the client of an error situation, such as an item not found in the repository.
* To inform the client of an occurrence of an event, such as a new item has been created.
* To instruct the client to perform a follow-up request, such as to ask for user name and password credentials.
* To inform the client of success.

For example, the Folder Listing web script validates that the provided folder path actually exists in the repository 
using the following JavaScript in the controller script:

```javascript
...
if (folder == undefined || !folder.isContainer) {
  status.code = 404;
  status.message = "Folder " + folderpath + " not found.";
  status.redirect = true;
}
...
```

The `status` root object is a special object provided to all controller scripts by the Web Script Framework. It allows 
a web script to specify the response status code along with an associated status message. Typically, the value of the 
status code is set to a standard HTTP status code.

It is useful when reporting error status codes to provide additional information about the error in the response, 
such as the cause of the error. To support this, the Web Script Framework allows for a custom status response template 
to be rendered, but this happens only if the `status.redirect` value is set to true. A default status response template 
is provided by the Web Script Framework, which renders everything known about the status, so it is not necessary to 
develop your own; however, you can create a custom status response template. If the value of `status.redirect` is set 
to false, the status code is set on the response, but the response template for the requested format is rendered anyway.

## Invoking web scripts

A common client for invoking web scripts is a web browser, as many content rich applications are web applications. 
The web browser also provides an easy and convenient client for testing web scripts while developing them.

However, the web browser is not the exclusive client from which to invoke a web script. Any client capable of sending 
HTTP requests and receiving HTTP responses can be used. A good example is the cURL client that has full support for the 
HTTP protocol and is often used for testing the various capabilities of web scripts.

Although a client can use HTTP directly to invoke web scripts, the Web Script Framework also provides many helpers for 
invoking web scripts from environments that do not know HTTP. This allows the invocation of a web script using a 
mechanism that is natural to the calling environment and to the developer who knows the calling environment.

For example, helpers are provided that allow the following clients to naturally invoke web scripts:

* **Surf** allows the invocation of a web script as if it were a Surf component, for example to create a Share dashlet
* **JSR-168 portal** allows the invocation of a web script as if it were a JSR-168 portlet
* **JSF page** allows the invocation of a web script as if it were a tag library

A carefully developed web script can be used from multiple environments without the need to change its implementation. 
For example, a web script for displaying your Content Services checked-out documents can be used standalone 
directly in a web browser, as a portlet in a JSR-168 portal, or as a dashlet in Alfresco Share.

## Working with client limitations

Not all HTTP clients are equivalent in their capabilities. Many clients have limitations that mean certain HTTP features 
are not supported. Rather than dismiss those clients and reduce the scope of where web scripts can be invoked, the 
Web Script Framework provides helpers for working around those limitations.

These helpers include:

* Tunneling HTTP methods
* Forcing a successful HTTP response
* Using JSON callbacks

### Tunneling HTTP methods

Not all clients can issue all HTTP methods. In the most severe case, a client might be restricted to GET and POST only. 
In this situation, the Web Script Framework provides a mechanism for tunneling any HTTP method through a POST method. 
This is achieved by setting an override header named `X-HTTP-Method-Override` on the HTTP request whose value is the 
method name to invoke.

For example, to invoke the following web script through an HTTP POST but inform the Web Script Framework to really 
perform a GET, you would type the following in the command line:

`curl -uadmin:admin -d "" -H "X-HTTP-Method-Override:GET" http://localhost:8080/alfresco/s/api/admin/usage`

>**Note:** cURL's `–d` parameter informs cURL to perform an HTTP POST. The complete cURL manual can be found at [https://curl.se/docs/manual.html](https://curl.se/docs/manual.html){:target="_blank"}.

In really unfortunate circumstances, some clients do not even support HTTP headers; therefore, the Web Script Framework 
also supports a query parameter named `alf_method` for representing the method to override.

For the equivalent of the override header, but expressed as a query parameter, you would type the following in the 
command line:

`curl -uadmin:admin -d "" http://localhost:8080/alfresco/s/api/admin/usage?alf_method=GET`

Tunneling HTTP methods is a last resort that should be used only when no other workaround is available. Each HTTP 
method has its own characteristics such as how it is cached, which HTTP clients and intermediaries expect. When tunneling 
these methods through HTTP POST, those expectations can no longer be met.

>**Note:** If both the override header and query parameter are specified in the HTTP request, then the header takes precedence over the query parameter.

Method overrides are also supported when issuing HTTP GET requests through the `alf_method` query parameter. This is 
particularly useful for testing some non-GET methods by using the web browser.

### Forcing success response status

Not all clients can gracefully handle non-success HTTP response codes, such as the Adobe Flash runtime player, which 
is the runtime for Adobe Flex applications.

In this situation, web scripts provide a mechanism to force an HTTP response to indicate success in its response header; 
however, the response body will still represent the content as if a non-success status had occurred, allowing a client 
to interrogate error codes and messages, if provided by the web script.

To force success, the `alf-force-success-response` header is set on the HTTP request whose value is always set to `true`. 
For example, to force a success response status for a request to retrieve children of a folder that does not exist, 
you would type the following in the command line:

`curl -uadmin:admin -v -H "alf-force-success-response:true" "http://localhost:8080/alfresco/s/cmis/p/doesnotexist"`

Although the response status code is 200 (which means Success), the body of the response will still represent a failure 
and include details such as the real status code (in this case, 404, which means Not Found) and an error message.

### JSON callbacks

Web scripts that provide JSON responses are often invoked directly from within a web browser by using the `XMLHttpRequest` 
object. This is a technique popularly known as AJAX. For security reasons, solutions like these can run into cross-domain 
issues, a restriction that requires you to proxy your requests on the server side. Typically, to work around these issues, 
public services, such as Yahoo! JSON Services, provide a callback mechanism.

>**Note:** A full description of the JSON callback mechanism can be found at [http://developer.yahoo.com/javascript/json.html#callbackparam](http://developer.yahoo.com/javascript/json.html#callbackparam){:target="_blank"} on the Yahoo! Developer Network.

Web scripts also provide this mechanism, which wraps the JSON response text in parentheses and a function name of your 
choosing. A callback is invoked by adding the following URL query parameter to the web script request:

`alf_callback=<function>`

The `function` parameter specifies the name of a client-side JavaScript function to invoke.

## Exception handling in web scripts

Great care must be taken when using exception handling within a web script. If any exception expected to be handled by 
the repository is handled by the web script, this can lead to inconsistency of state, and potentially corruption of the 
repository.

As a web script executes it will perform operations such as creating a new document in the repository. While it seems 
logical to handle possible exceptions, such as failure to create a document (possibly due to permissions, or the 
existence of a document with the same name in the same folder), this should be avoided at the web script level. Such 
exceptions will be handled appropriately by the repository. In practice you should only carry out exception handling 
for exceptions that you know are not handled at a lower layer of Content Services.

## Caching

A key aspect of HTTP is its ability to support caching of HTTP responses, relieving workload on the HTTP server, which 
does not have to re-create the HTTP response for every request. From a client perspective this gives a prompt response.

The Web Script Framework complies with HTTP caching, in particular with the notions of Last Modified Time and ETag 
(a kind of hash), allowing the caching of Web script responses using HTTP-aware caches.

>**Note:** An ETag (entity tag) is a response header used to determine change in content at a given URL. Clients and caches use the ETag in subsequent requests to determine with the server if the content needs refreshing.

The Web Script Framework does not invent its own caching approach but relies on the caching protocol defined by HTTP. 
Each web script specifies how it is to be cached, which the Web Script Framework translates into appropriate HTTP headers 
when it is invoked. A third party HTTP cache that is deployed as part of the application then caches the web script 
response.

It is often necessary to cache the retrieval of content streams of documents residing in the repository as these can be 
large in size. A typical setup to support this scenario (as shown in the following figure) is to place an HTTP cache proxy 
between the client (for example, a web browser) and the Content Services server.

![caching-setup]({% link content-services/images/caching-setup.png %})

A pre-built, out-of-the-box web script exists for retrieving the content stream of a document residing in the repository. 
This web script is CMIS compliant and also specifies its HTTP caching requirements. With the HTTP cache proxy deployed, 
the content responses are cached intelligently and the cache is only updated when the content is updated in the repository. 
This setup will also cache all other responses from web scripts that indicate how they are to be cached.

When developing a web script, you can specify its caching requirements, such as how long to keep the response in the 
cache or how to calculate the hash for the response. It is important to note that the Web Script Framework does not 
actually perform any caching. Instead, Content Services relies on one of the many HTTP caches already available, 
such as Squid (www.squid-cache.org), an HTTP caching proxy. Therefore, you must either embed an HTTP cache in your client 
or deploy an HTTP-cache proxy in front of the Content Services server to enable caching.

### Runtime cache controls {#cachecontrols}

Some cache controls can be set only during the execution of a web script, such as setting when the content of the 
response was last modified. To support this, the Web Script Framework provides a special root object named `cache` 
to all controller scripts for allowing cache controls to be set at runtime.

The `cache` root object provides the following API:

* `neverCache` (read/write Boolean): Controls whether web script response should be cached at all; true means never cache. If not set, the default value is specified by the cache control section of the web script descriptor.
* `isPublic` (read/write Boolean): Controls whether web script response should be cached by public caches. If not set, the default value is specified by the cache control section of the web script descriptor.
* `mustRevalidate` (read/write Boolean): Controls whether cache must revalidate its version of the web script response to ensure freshness. If not set, the default value is specified by the cache control section of the web script descriptor.
* `maxAge` (read/write long): Specifies the maximum amount of time (in seconds, relative to the time of request) that the response will be considered fresh. If not set, the default value is null.
* `lastModified` (read/write date): Specifies the time that the content of the response last changed. If not set, the default value is null.
* `ETag` (read/write string): Specifies a unique identifier that changes each time the content of the response changes. If not set, the default value is null.

### Descriptor cache controls

When developing a web script, you can specify whether its response is to be cached and, if so, how it is to be cached 
through the web script descriptor document.

The optional `<cache>` element of the web script descriptor provides the following cache flags:

* `never`: (Optional) Specifies whether caching should be applied at all. If true, the web script response should never be cached; otherwise, the web script response can be cached.
* `public`: (Optional) Specifies whether authenticated responses should be cached in a public cache. If true, the web script response should never be cached; otherwise, the web script response can be cached.
* `mustrevalidate`: (Optional) Specifies whether a cache must revalidate its version of the web script response in order to ensure freshness. If true, the cache must revalidate; otherwise, the cache can revalidate.

For example, the following web script descriptor specifies that responses can be cached, but never in a public cache 
as the response requires authentication, and that the cache must revalidate to ensure freshness of the content.

```xml
<webscript>
    <shortname>Design time cache sample</shortname>
    <url>/cache</url>
    <authentication>user</authentication>
    <cache>
        <never>false</never>
        <public>false</public>
        <mustrevalidate/>
    </cache>
</webscript>
```

## Authenticating web scripts

You can invoke a web script without first authenticating, that is, without specifying a user name and password as 
identification. This is rare when interacting with the Content Services server as access to or management of 
content in the repository is usually restricted to particular people or groups of people.

To support restricted access, a web script can specify its authentication requirements. There are four levels of 
required authentication:

* **None**: The web script does not require any authentication to be invoked.
* **Guest**: The web script can be invoked by a guest user of the Content Services server.
* **User**: The web script must be invoked by a named user known to the Content Services server.
* **Admin**: The web script must be invoked by a named user who is an administrator of the Content Services server.

An authenticated web script has access to all the services of the Content Services server and thus can perform 
any operation, although it still adheres to the permissions of the authenticated user.

### JSR-168 Authenticator

JSR-168 Authenticator only works if running on the repository tier, and it does not work for web scripts running in the 
Share tier. Surf has support for JSR-168 portlets built-in.

### Custom client authentication

HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in 
the form of a user name and password when making an HTTP request.

If you are using the Alfresco checked-out documents web script as a JSR-168 portlet configured into your portal, when 
you launch the portal the portal itself asks you to log in. The web script needs to know who is authenticated, so the 
Web Script Framework communicates with the portal to determine the currently authenticated user. When the web script is 
rendered in the portal page, the web script is invoked as the portal user.

Behind the scenes, the Web Script Framework chooses the most appropriate option for specifying the user identity, either 
HTTP Basic authentication, ticket, or guest when invoking the web script. The same mechanism is used for Alfresco Share.

## Forms and web scripts

Applications use HTML forms to create and update data. Content applications use forms to upload files from a user's 
local file system. HTML forms allow data to be submitted in one of two content types: URL-encoded (`application-x-www-form-urlencoded`) 
and multipart form data (`multipart/form-data`).

Web scripts can handle URL-encoded submissions as other requests, where the web script parses the URI to extract the form data. 
However, the URL-encoded approach is inefficient for sending large quantities of binary data or text containing non-ASCII characters.

To submit forms containing files, non-ASCII, and binary data, the multipart form data content type must be used; however, 
this type of request is not as simple to parse for the server. Given the common requirement to submit files to the repository, 
the Web Script Framework provides explicit support for handling multipart form data submissions by hiding the complexity of 
request parsing from the developer of the web script.

## Internationalization (i18n)

Internationalization (often abbreviated to i18n) is an important consideration when developing a web script.

For human-readable web script responses it is often necessary to render the output in the preferred language of the user 
or the preferred language of the client. This means that human-readable text cannot be placed directly in the web script 
response template.

Therefore, the Web Script Framework uses the common practice of allowing text to be placed into resource bundles, where 
a resource bundle exists for each supported language.

### Creating resource bundles supporting i18n

The Web Script Framework allows text to be placed into resource bundles, where a resource bundle exists for each supported language.

This task creates a simple web script that renders an HTML message.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create a web script description document for your i18n sample:

    1.  In the Create menu, select **XML**.

    2.  Enter the name for the web script in the Name field: `i18n.get.desc.xml`

    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>I18n Sample</shortname>
          <description>Internationalization Sample</description>
          <url>/i18n</url>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

4.  Create a default message bundle for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `i18n.get.properties`

    3.  Type the following in the content box:

        ```text
        greeting=Hello
        farewell=Goodbye
        ```

    4.  Click **Create**.

5.  Create a response template for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name in the Name field: `i18n.get.html.ftl`

    3.  Type the following in the content box:

        ```javascript
        ${msg("greeting")}. ${msg("farewell")}
        ```

    4.  Click **Create**.

    5.  Navigate back to org/example using the breadcrumb trail.

6.  Register the i18n web script with Content Services.

    1.  In a web browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click **Refresh Web Scripts**. A message indicates there is one additional web script.

7.  Test your response template to ensure it is rendering values from the default resource bundle by type the following in your command line: `curl "http://localhost:8080/alfresco/service/i18n"`

    The response is: `Hello. Goodbye.`

The web script response template uses the `msg` method to render text whose value is taken from the resource bundle 
associated with the required language. Resource bundles contain one or more messages, each identified by a name; this 
is the name passed to the `msg` method. The example refers to the messages `greeting` and `farewell`.

Each resource bundle adheres to the naming convention defined by the Web Script Framework, which are structured as follows: 
`<web script id>.<http method>[_<locale>].properties`

The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of 
the associated Web script description document. The `<http method>` specifies which HTTP method will initiate the web 
script and must be the same as the associated web script description document.

The optional `<locale>` identifies the language for which this resource bundle applies. If not specified, the resource 
bundle is treated as the fallback set of values if no other relevant resource bundle for the required language can be found.

Finally, all resource bundle file names end with `.properties`. This indicates to the Web Script Framework that the file 
is a resource bundle.

### Adding resource bundles for additional languages

Once you have created and registered your web script, you can add additional resource bundles for other languages.

This task adds another resource bundle for the German language.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link on the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a German resource bundle for your i18n sample:

    1.  In the Create menu, select **Plain Text**.

    2.  Enter the name for the web script in the Name field: `i18n.get_de.properties`

    3.  Type the following in the content box:

        ```text
        greeting=Guten Tag
        farewell=Auf Wiedersehen
        ```

    4.  Click **Create**.

    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Re-register the i18n web script with Content Services.

    1.  In a web browser, enter the URL: `http://localhost:8080/alfresco/service/index`

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click **Refresh Web Scripts**.

        This time you have created a resource bundle for the German language as identified by the locale of `de`. Locales are specified as follows: `<language>[_<country>][_<variant>]`

        The language argument is a valid ISO language code, which is a lowercase, two-letter code as defined by ISO-639. The optional country argument is a valid ISO country code, which is an uppercase, two-letter code as defined by ISO-3166. Finally, the optional variant argument is a vendor-or web browser–specific code.

6.  Test your response template to ensure it is rendering values from the German resource bundle by typing the following in your command line: `curl -H "Accept-Language: de" "http://localhost:8080/alfresco/service/i18n"`

    The response is: `Guten Tag. Auf Wiedersehen.`

A client specifies its preferred language through the HTTP header named `Accept-Language`, to which the Web Script Framework adheres.

### Overriding the default message bundle

To quickly provision your site for many different countries and languages, you can provide a message bundle for the 
Alfresco Share configuration. To do so, you need to wire in your own message bundle to Share that overrides Share’s 
default message bundle values.

Define a Spring bean that overrides Alfresco Share's default message bundle so it includes your custom bundle.

```xml
<?xml version='1.0' encoding='UTF-8'?>
<!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
   'http://www.springframework.org/dtd/spring-beans.dtd'>

<beans>

   <bean id="webscripts.resources"   
         class="org.alfresco.i18n.ResourceBundleBootstrapComponent">

      <property name="resourceBundles">
         <list>
            <value>alfresco.messages.webscripts</value>
            <value>alfresco.messages.slingshot</value>
            **<value>alfresco.web-extension.messages.kbsite</value>**
         </list>
      </property>
   </bean>

</beans>
```

This Spring bean adds support for an additional message bundle called `kbsite.properties` located under `web-extension/messages`. 
In this message bundle, you might define the following key/value pairs:

```text
page.kbSiteDashboard.title=Knowledge Base Site Dashboard
page.kbSiteDashboard.description=Knowledge Base site's dashboard page
title.kbSite=Knowledge Base Site
```

These are the same keys that the preset configuration and web script were looking for. You can now fully internationalize 
your new site preset. You can provide bundles so that the Create Site wizard works for languages such as Spanish or Mandarin Chinese.

## Java-backed web scripts

Java-backed web scripts are web scripts whose controller implementation is written in Java, rather than JavaScript.

Java-backed web scripts are useful when you want to:

* Access Content Services not available by using the JavaScript API
* Interact with systems whose only API is exposed by using Java
* Override how responses are rendered, such as to stream large content
* Ensure that performance is absolutely critical

Unlike scripted web scripts, Java-backed web scripts require more tooling for their development as you must compile 
the Java source code, package, and deploy to the Content Services server.

A Java-backed web script is constructed like a scripted web script, except that a Java class replaces the controller 
script. It still has the same intent of encapsulating the behavior of the web script and producing a model for subsequent 
rendering by a response template. Content Services is aware of the Java class through Spring Framework 
configuration, which identifies the Java class as being the behavior for the web script. All other components are 
exactly the same as those for scripted web scripts.

### Java approach to web scripts

The Java class for a Java-backed web script has to follow one rule: it must implement the Java interface: 
`org.alfresco.web.scripts.WebScript`

This interface defines the following two methods that must be implemented:

```java
/**
* Gets the Web script Description
*
* @return the Web script description
*/
public WebScriptDescription getDescription();
/**
* Execute the Web script
*
* @param req the Web script request
* @param res the Web script response
*/
public void execute(WebScriptRequest req, WebScriptResponse res) throws
IOException;
```

The first method, `getDescription()`, returns a `WebScriptDescription` object, which is a Java representation of the 
web script description XML document. The second method, `execute()`, is invoked by the Web Script Framework to initiate 
the web script.

The Web Script Framework also provides two Java classes that implement the difficult parts of this interface, which you 
can extend as a starting point. The simplest helper Java class is named as follows: `org.alfresco.web.scripts.AbstractWebScript`

This helper provides an implementation of `getDescription()` but does not provide any execution assistance, which it 
delegates to its derived class. This allows a Java-backed web script to take full control of the execution process, 
including how output is rendered to the response.

The other helper Java class is named: `org.alfresco.web.scripts.DeclarativeWebScript`

This helper provides an implementation of `getDescription()` and `execute()`. It encapsulates the execution of a 
scripted web script, which is:

* Locate an associated controller script written in JavaScript and, if found, execute it.
* Locate an associated response template for the requested format and execute it, passing the model populated by the controller script.

By default, all web scripts implemented through scripting alone are backed by the `DeclarativeWebScript` Java class. 
There is one special hook point that makes this a useful class for your own Java-backed web scripts to extend. Prior 
to controller script execution, `DeclarativeWebScript` invokes the template method `executeImpl()`, which it expects 
derived Java classes to implement.

`protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache)`

This is where the behavior of a custom Java-backed web script is encapsulated, including the population of the web 
script model, which is returned from this method.

The Java Folder Listing web script uses `DeclarativeWebScript` for its starting point.

```java 
... 
public class JavaDir extends DeclarativeWebScript
{

    ...
    protected Map<String, Object> executeImpl(WebScriptRequest req, Status status,
      Cache cache)
    {

    ...
    return model;
    }
    ...
}
```

The model returned from `executeImpl`() is passed to the response template for subsequent rendering. Prior to template 
rendering, the model can also be accessed and further refined by a controller script, if one happens to be provided for 
the web script. Apart from implementing the `WebScript` interface, there are no other web script demands on the Java class. 
You can give the Java class any name and place it in any Java package.
