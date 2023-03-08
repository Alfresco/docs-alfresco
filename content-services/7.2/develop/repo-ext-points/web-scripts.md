---
title: Web Scripts Extension Point
---

Repository Web Scripts are the fundamental building blocks used for extending the ReST API in Content Services 
to support domain specific content types.

Architecture Information: [Platform Architecture]({% link content-services/7.2/develop/software-architecture.md %}#platformarch)

## Description

Web Scripts are a way of implementing [REST-based API](https://en.wikipedia.org/wiki/Representational_state_transfer){:target="_blank"}. 
They could also be referred to as Web Services. They are stateless and scale extremely well. Repository Web Scripts are 
defined in XML, JavaScript, and FreeMarker files and stored under alfresco/extension/templates/webscripts. 
Repository Web Scripts are referred to as *Data Web Scripts* as they usually return JSON or XML. Before embarking on 
implementing a Repository web scripts it is recommended that you establish if the required functionality is already 
available out-of-the-box. Many operations that you might want to perform may be available, see 
[Alfresco REST API]({% link content-services/7.2/develop/rest-api-guide/index.md %}).

 The simplest Web Script you can write consists of a *descriptor* and a *template*. The descriptor will tell you what 
 URL that should be used to invoke the Web Script. The template is used to assemble the output returned from the 
 Web Script. This kind of Web Script is very static to its nature and will always return the exact same content. 
 Most Web Scripts also include a *controller* that is used to dynamically assemble a map of data that is then processed 
 by the template to produce the final output. The data that the controller produces could come from anywhere as the 
 controller can be implemented in both JavaScript and Java. Any content from the repository that should be included in 
 the response can be fetched via Content Services-specific JavaScript root objects, such as `companyhome`, or 
 services, such as the Node Service, if the controller is implemented in Java.

 The following picture illustrates how a Repository Web Script request is processed:

![dev-extensions-repo-web-scripts-architecture]({% link content-services/images/dev-extensions-repo-web-scripts-architecture.png %})

The controller can fetch content from different sources, such as the repository, or a remote Web Service on the Internet. 
Note that the special root object called [remote]({% link content-services/7.2/develop/reference/surf-framework-ref.md %}#connectorsendpoints), which is available for 
Surf web scripts to fetch remote data on the internet, is not available when implementing a Repository Web Script 
JavaScript controller. To fetch remote data on the Internet from a Repository Web Script, a Java controller is needed.

Now, to get going implementing web scripts we will start with the simplest possible Repository Web Script. The usual 
Hello World example comes to mind. When implementing a new Web Script it is good to start with the **descriptor** file, 
it will define what URL(s) that should be used to invoke the Web Script. It is defined in XML and looks something 
like this:

```xml
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World Sample Web Script that responds back with a greeting</description>
    <url>/tutorial/helloworld</url>
    <format default="html"></format>
    <family>Alfresco Tutorials</family>
</webscript>
```

The important part here is the `<url>` element, which determines what URL should be used to invoke the Web Script. 
When specifying the URL leave out the part that maps to the Web Script dispatcher Servlet, which is 
`http://{host}:{port}/alfresco/service`. So to invoke this Web Script use a URL with the 
`http://{host}:{port}/alfresco/service/tutorial/helloworld` format.

Next important thing in the descriptor file is the `<format` element, which specifies what content format we can expect 
in the response when invoking this Web Script. In this case it will return a HTML fragment, so we set format to 
`default="html"`. Finally we need to somehow define a unique identifier for this Web Script, which will be used to look 
up other files that are part of the Web Script implementation. This is handled implicitly by the file name convention, 
which for Web Script descriptor files follow the `<web script id>.<http method>.desc.xml` format. If we store this 
descriptor in a file called `helloworld.get.desc.xml` then the unique identifier will be `helloworld`. But that's not all, 
the HTTP method also plays a part in the identification of a Web Script, in this case it is set to `get`, which means it 
is intended to be invoked with a HTTP GET Request.

>**Important:** The Web Script URL needs to be unique throughout the Content Services installation. And if two or more web scripts have the same identifier, then they need to be stored in different directory locations. For example, if you have two extensions deploying a Web Script with the same file name, in the same location (i.e. directory), then the last one to be deployed will overwrite the other one, even if the URL is different between the two.

To complete the Hello World Web Script implementation we just need a **template** to go along with the descriptor, it is 
defined in a FreeMarker file and looks like this:

```xml
<h2>Hello World!</h2>
```

Web Script template file names also follow a naming convention: `<web script id>.<http method>.<format>.ftl`. The above 
template could be stored in a file called `helloworld.get.html.ftl`, which would implicitly associate it with the descriptor 
file as it has the same identifier and HTTP method. We are also indicating that this template produces HTML markup. This 
Web Script implementation is now complete.

To try out the Hello World Web Script we first need to deploy it by copying the files to the correct directory in the 
Content Services installation, see below for locations. Then refresh the web scripts from the 
`http://{host}:{port}/alfresco/service/index` page so Content Services knows about it. And then invoke it using 
the URL in a browser as follows:

![dev-extensions-repo-web-scripts-invoke-helloworld]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld.png %})

Most of the time the content that is returned is provided indirectly via a **controller**. The controller sets up the 
`model` containing the data that should be passed over to the template. Controllers can be implemented in both 
JavaScript (this is server side JavaScript, Content Services provides this by embedding the Rhino JavaScript engine) 
and Java. Let's add a JavaScript controller for the Hello World Web Script. It will put a property called `message` in 
the `model`. This new property will contain a slightly improved Hello World message that includes the name of the logged 
in user. Here is the controller implementation:

```javascript
model.message = "Hello World " + person.properties.firstName + ' ' + person.properties.lastName + "!";
```

Here we use an Content Services-specific JavaScript root object called `person` to get first and last name of 
the logged in user. The `model` variable is automatically available to us in the controller and we can put whatever data 
we want in it for later use in the template.

The Web Script controller file names follow the `<web script id>.<http method>.js` naming convention. The above controller 
should be stored in a file called `helloworld.get.js` so it is matched up with the Hello World Web Script descriptor. 
To take advantage of this new data in the `model` we need to update the template as follows:

```xml
<h2>${message}</h2>
```

The update to the Web Script is now finished. However, if we were to try and invoke the Web Script we would see an 
exception as currently it is not set up to authenticate with a username and password. We cannot use the `people` root object 
to access Repository information about users without being authenticated. In fact, we cannot access anything in the 
Repository without first authenticating, so using other root objects such as `companyhome` requires authentication too.

Authentication is configured in the descriptor file with an extra `<authentication>` element as follows:

```xml
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World Sample Web Script that responds back with a greeting</description>
    <url>/tutorial/helloworld</url>
    <format default="html"></format>
    <authentication>user</authentication>
    <family>Alfresco Tutorials</family>
</webscript>
```

When setting the `authentication` property to be able to read and write to the Repository we need to have these 
operations wrapped in a transaction. This is automatically done as soon as we set the `authentication` element to 
anything else than `none`. By default another element called `<transaction>` is then set to `required`.

After deploying the updated Web Script files and the new controller file, and refreshing the web scripts, we will see 
the following when invoking it again (assuming we logged in as Administrator):

![dev-extensions-repo-web-scripts-invoke-helloworld-auth]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-auth.png %})

Now, what if we wanted to present the Hello World message in different languages depending on what the browser 
`Accept-Language` header was, how would we do that?

We would then turn to Web Script i18n **properties** files. These files are created in the same way as Java resource 
bundles. The naming convention for these files is `<web script id>.<http method>[_<locale>].properties`. For the default 
English resource file you can leave out the locale. So for our Hello World Web Script it would be called 
`helloworld.get.properties` and contain the following:

```text
hello.world=Hello World
```

To add a Swedish translation we would create a properties file called `helloworld.get_sv.properties` with the following content:

```text
hello.world=Hej Världen
```

To make use of this property we would have to update the controller as follows:

```javascript
model.message = person.properties.firstName + ' ' + person.properties.lastName + "!";
```

Leaving out the Hello World string so it can be localized. The template need the following update to read the resource string:

```xml
<h2>${msg("hello.world")} - ${personName}</h2>
```

There are also situations where we just want to be able to externally **configure** the Web Script with minimal changes 
to the main implementation of it. Basically we don't want to touch the descriptor, controller, or template. Just feed it 
with some new configuration. Let's say for example that our greeting message should be slightly different at certain 
times of the year, such as an extra Merry Christmas message around that time.

This can be done with an extra configuration file that follows the `<web script id>.<http method>.config.xml` naming convention. 
The Hello World Web Script configuration will look like this:

```xml
<greeting>
    <text>Merry Christmas!</text>
    <active>true</active>
</greeting>
```

The configuration file can contain any arbitrary XML structure. In this case it contains a message text and an indication 
if this text should be active or not. We store this configuration in a file called `helloworld.get.config.xml`. To access 
this configuration we would have to make a change to the controller as follows:

```javascript
var greeting = new XML(config.script);
model.greetingActive = greeting.active[0].toString();
model.greetingText = greeting.text[0].toString();
model.personName = person.properties.firstName + ' ' + person.properties.lastName + "!";
```

We use the JavaScript root object `config` to access the XML. This is then fed into the `XML` object, which is part of 
the E4X JavaScript library that enables us to process XML directly in JavaScript 
(more info: `http://www.w3schools.com/e4x/default.asp`). We can then navigate into the XML structure and grab the data 
that we need. We add two variables to the `model` to hold the greeting message and if it should be active or not. All 
we got to do now is update the template to take advantage of the new data:

```xml
<h2>${msg("hello.world")} - ${personName}</h2>
<#if greetingActive == "true">
    <p>
        <i>${greetingText}</i>
    </p>
</#if>
```

This is the first time we have started to use some FreeMarker directives. Common statements such as `if,then,else` are 
supported. Directives are preceded with `#`. Note that when you use model variables such as the `greetingActive` inside 
a directive statement they don't have to be enclosed in `${ }`.

Invoking the Hello World Web Script should now give us the following result:

![dev-extensions-repo-web-scripts-invoke-helloworld-auth-conf]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-auth-conf.png %})

It is now very simple to change the extra message to whatever we want without having to touch the main implementation of 
the Web Script, just update the `helloworld.get.config.xml` file, and we can turn off the message all together if we want to.

Sometimes when implementing a Web Script there are things that cannot be done in a JavaScript controller, such as accessing 
the file system and fetching content on the Internet. We then need to turn to **Java based controllers**. To implement a 
Web Script controller in Java we create a class that extends the `org.springframework.extensions.webscripts.DeclarativeWebScript` 
class. Using a Java controller will allow us to fetch and process data from wherever we want to.

Let's implement a Java controller that just adds a current date and time variable to the `model`:

```java
package org.alfresco.tutorial.webscripts;

import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class HelloWorldWebScript extends DeclarativeWebScript {
    @Override
    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("currentDateTime", new Date());
        return model;
    }
}
```

Note here that we are expected to return a model object, which is just a hash map. When we got both a JavaScript controller 
and a Java controller the latter one is executed first. The new Java controller is not yet associated with the 
Hello World Web Script. We need to define a Spring bean for it with an `id` that connects the controller with this Web Script:

```xml
<beans>
	<bean id="webscript.alfresco.tutorials.helloworld.get"
		  class="org.alfresco.tutorial.webscripts.HelloWorldWebScript"
		  parent="webscript">
	</bean>
</beans>
```

The `id` should be specified following the `webscript.<packageId>.<web-script-id>.<httpMethod>` format. The trickiest 
part of the `id` is probably the `packageId`. When specified as in the above example it is assumed that the descriptor 
file is located in the `alfresco/extension/templates/webscripts/alfresco/tutorials` directory.

With the new `currentDateTime` variable in the `model` we can use it in the template to get it displayed in the response:

```xml
<#assign datetimeformat="yyyy-MM-dd HH:mm:ss">
<h2>${msg("hello.world")} - ${personName}</h2>
<#if greetingActive == "true">
    <p>
        <i>${greetingText}</i>
    </p>
</#if>
<p>The time is now: "${currentDateTime?string(datetimeformat)}</p> 
```

Here we use another FreeMarker directive called `assign` that can be used to define new variables. In this case we define 
a new variable `datetimeformat` to hold the date and time format we want to use when displaying current date and time. 
To display the date in this format we use a so called built-in for dates called `string`. Calling the Web Script will 
now show the following response:

![dev-extensions-repo-web-scripts-invoke-helloworld-java-contr]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-java-contr.png %})

**Important:** The `DeclarativeWebScript` class is used when we have a template, and maybe a JavaScript controller as 
part of the Web Script. But there are situations, such as streaming and downloading a file, where there is no need for 
a template. In these cases we can extend the `org.springframework.extensions.webscripts.AbstractWebScript` class instead. 
It has an execute method that will allow you to return nothing and instead just put something on the response output 
stream, as in the following example:

```java
package org.alfresco.tutorial.webscripts;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.extensions.webscripts.AbstractWebScript;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;
import org.springframework.extensions.webscripts.WebScriptResponse;

import java.io.IOException;

public class JSONResponseWebScript extends AbstractWebScript {
    @Override
    public void execute(WebScriptRequest req, WebScriptResponse res)
            throws IOException {
        try {
            JSONObject obj = new JSONObject();
            obj.put("name", "Alfresco");
            String jsonString = obj.toString();
            res.getWriter().write(jsonString);
        } catch (JSONException e) {
            throw new WebScriptException("Unable to serialize JSON");
        }
    }
}
```

The Hello World Web Script demonstrates most of the features available to us when implementing web scripts. However, 
it might not be the most realistic Web Script implementation, it is not something we would need to do in a "real" project. 
It is more likely that we will have to implement a ReST API based on a custom content model, such as the 
[ACME sample content model]({% link content-services/7.2/develop/repo-ext-points/content-model.md %}).

The key principles of REST involve separating your API into logical resources. These resources are manipulated using 
HTTP requests where the method (GET, POST, PUT, DELETE) has specific meaning.

When working with custom content models, what can we make a resource? Normally, these should be nouns that make sense 
from the perspective of the API consumer. We should not have internal implementation details visible in our API! 
When looking at a content model it probably makes sense to use the types as resources, so for the ACME content model we 
could have the ACME Document, ACME Contract, and so on as resources.

When we have identified our resources, we need to identify what actions apply to them and how those would map to the API. 
REST-ful principles provide strategies to handle CRUD actions using HTTP methods mapped as follows:

* **GET /acmedocs** - Retrieves a list of ACME Documents
* **GET /acmedocs/{noderef}** - Retrieves a specific ACME Document with specified node reference
* **POST /acmedocs** - Creates a new ACME Document
* **PUT /acmedocs/{noderef}** - Updates ACME Document with specified node reference
* **DELETE /acmedocs/{noderef}** - Deletes ACME Document with specified node reference

A good thing about ReST is that we leverage existing HTTP methods to implement significant functionality on just a 
single `/acmedocs` endpoint. There are no method naming conventions to follow and the URL structure is clean and clear.

Try and keep the resource URLs as lean as possible. Things like filters, sorting, search, and what properties to return 
can quite easily be implemented as parameters on top of the base URL.

Here are some examples:

* Filtering: **GET /acmedocs?sc={security classification}** - Retrieves a list of ACME Documents that has been tagged with passed in security classification.
* Sorting: **GET /acmedocs?sort=[-+]{property}** - Retrieves a list of ACME Documents sorted in ascending or descending order on the property passed in.
* Searching: **GET /acmedocs?q={keyword}** - Retrieves a list of ACME Documents matching FTS on keyword passed in.
* Properties: **GET /acmedocs?props={field1,field2,...}** - Retrieves a list of ACME Documents, only the specified properties are returned.
* **GET /acmedocs?q=London&sc=Public&sort=-cm:created** - Combination of the above.

When it comes to response format JSON is usually a good choice as it is compact and works well with most programming 
languages and widget libraries.

As a demonstration on how to implement a REST API according to these best practices, we will look at how to implement a 
Web Script that can be used to return a list of ACME documents matching a keyword using Full Text Search (FTS). Based on 
ReST API design principles, the **descriptor** would then look something like this:

```xml
<webscript>
    <shortname>Search ACME Documents</shortname>
    <description>Returns metadata as JSON for all ACME documents in the repository that matches search keyword</description>
    <url>/tutorial/acmedocs?q={keyword}</url>
    <authentication>user</authentication>
    <format default="json"></format>
    <family>Alfresco Tutorials</family>
</webscript>
```

The above descriptor could be stored in a file called `acme-documents.get.desc.xml` as this Web Script should be used to 
search for files with the ACME document type applied. To invoke this Web Script we would use a URL with the format 
`http://{host}:{port}/alfresco/service/tutorial/acmedocs?q=london`.

Next step is to create a controller that takes the search keyword, does a FTS, and then adds information about the 
matching nodes to the `model` object:

```javascript
function AcmeDocumentInfo(doc) {
    this.name = doc.name;
    this.creator = doc.properties.creator;
    this.createdDate = doc.properties.created;
    this.modifier = doc.properties.modifier;
    this.modifiedDate = doc.properties.modified;
    this.docId = doc.properties["acme:documentId"];
    this.securityClassification = doc.properties["acme:securityClassification"];
}

function main() {
    var searchKeyword = args["q"];
    if (searchKeyword == null || searchKeyword.length == 0) {
        searchKeyword = "";
    } else {
        searchKeyword = " AND TEXT:\"" + searchKeyword + "\"";
    }

    var acmeDocNodes = search.luceneSearch("TYPE:\"acme:document\"" + searchKeyword);
    if (acmeDocNodes == null || acmeDocNodes.length == 0) {
        status.code = 404;
        status.message = "No ACME documents found";
        status.redirect = true;
    } else {
        var acmeDocInfos = new Array();
        for (i = 0; i < acmeDocNodes.length; i++) {
            acmeDocInfos[i] = new AcmeDocumentInfo(acmeDocNodes[i]);
        }
        model.acmeDocs = acmeDocInfos;
        return model;
    }
}

main();
```

Here we first check if we got a search keyword passed in, if we don't we will exclude the FTS from the query. We then 
do the Lucene search on the ACME Document type and keyword using the Content Services-specific `search` 
root object. If we get any nodes back we create an array of information objects that we add to the `model` to be sent 
to the template. If the query did not match any nodes we use the special `status` root object to send back a HTTP 404 
not found message.

The controller needs to be stored in a file called `acme-documents.get.js` to match up with the descriptor.

The template for this Web Script should construct a JSON representation of the resources/nodes that match the query:

```xml
<#assign datetimeformat="EEE, dd MMM yyyy HH:mm:ss zzz">
{
    "acmeDocs" : [
        <#list acmeDocs as acmeDoc>
            {
                "name"          : "${acmeDoc.name}",
                "creator"       : "${acmeDoc.creator}",
                "createdDate"   : "${acmeDoc.createdDate?string(datetimeformat)}",
                "modifier"      : "${acmeDoc.modifier}",
                "modifiedDate"  : "${acmeDoc.modifiedDate?string(datetimeformat)}",
                "docId"         : "${acmeDoc.docId!"Unknown"}",
                "securityClass" : "${acmeDoc.securityClassification!"Unknown"}"
            }
            <#if acmeDoc_has_next>,</#if>
        </#list>
    ]
}
```

Here a new FreeMarker directive called `list` is used to loop through the document information for the matching nodes. 
We also use a very handy build-in (`!`) that will check if the variable has a value (i.e. is not null), if it doesn't 
the right hand side value will be used as default.

The template should be stored in a file called `acme-documents.get.json.ftl` as it returns JSON and should be matched 
up with the correct descriptor.

This completes this ACME Docs Web Script, executing it will return a result looking something like this:

![dev-extensions-repo-web-scripts-invoke-acmedocs-search-sample]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-acmedocs-search-sample.png %})

In this call there were two documents that matched, having the ACME Document type applied, or a sub-type such as 
ACME Contract, and with a text that contained the word "sample".

>**Important:** The above example with free text search will actually match both sample, sampling, and sampled. The search engine uses stemming so all these variations will be reduced to their [word stem](https://en.wikipedia.org/wiki/Word_stem){:target="_blank"}, base or [root](https://en.wikipedia.org/wiki/Root_%28linguistics%29){:target="_blank"} form before matching starts.

We have now seen a lot of examples of how to get stuff from the repository, what about if we wanted to POST some stuff 
to the repository and store it? This is simple, tell the web script container that the web script is of type `POST`, 
and that we expect to upload and store stuff in the repository with it.

As an example, let's create an ACME Docs web script that can be used to upload some JSON data with information that is 
to be used when creating an ACME Text document. The descriptor will look like this:

```xml
<webscript>
    <shortname>Create ACME Document</shortname>
    <description>Create an ACME Text Document by uploading JSON data
        with both metadata and content for the text document.

        POST body should include JSON such as:
        {
        name: "acmedocument2.txt",
        docId: "DOC002",
        securityClass: "Public",
        content: "Some text to represent the content of the document"
        }
    </description>
    <url>/tutorial/acmedocs</url>
    <authentication>user</authentication>
    <transaction>required</transaction>
    <format default="html">any</format>
    <family>Alfresco Tutorials</family>
</webscript>
```

The above descriptor could be stored in a file called `acme-documents.post.desc.xml` as this Web Script should be used to 
POST stuff to the Repository. To invoke this Web Script we would use a `cURL` command looking something like this:

```bash
curl -v -u admin:admin -d @sample.json -H 'Content-Type:application/json' http://localhost:8080/alfresco/service/tutorial/acmedocs
```

The `sample.json` file would contain the JSON structure as described in the descriptor. Next up is the controller, 
which should extract the JSON and then create the ACME Text Document based on the data:

```javascript
// Get the POSTed JSON data
var name = json.get("name");
var docId = json.get("docId");
var securityClass = json.get("securityClass");
var content = json.get("content");

// Create the new ACME Text Document
var acmeTextDocFileName = name;
var guestHomeFolder = companyhome.childByNamePath("Guest Home");
var acmeTextDocFile = guestHomeFolder.childByNamePath(acmeTextDocFileName);
if (acmeTextDocFile == null) {
    var contentType = "acme:document";
    var properties = new Array();
    properties['acme:documentId'] = docId;
    properties['acme:securityClassification'] = securityClass;
    acmeTextDocFile = guestHomeFolder.createNode(acmeTextDocFileName, contentType, properties);
    acmeTextDocFile.content = content;
    acmeTextDocFile.mimetype = "text/plain";

    // Send back the NodeRef so it can be further used if necessary
    model.nodeRef = acmeTextDocFile.nodeRef;
} else {
    status.code = 404;
    status.message = "ACME Text Document with name: '" + acmeTextDocFileName + "' already exist!";
    status.redirect = true;
}
```

The controller file should be called `acme-documents.post.json.js` to tell the Web Script container that it will be 
receiving POSTed JSON. When the controller is expecting JSON like this it provides a convenience root object called 
`json` that can be used to extract the JSON data. We then use another Content Services-specific root object 
called `companyhome` that can be used to search for a folder, such as `/Guest Home` in this case. The `childByNamePath` 
assumes that you are searching from `/Company Home` so no need to specify it in the path to the node, this method can 
also be used to search for files. The node reference for the newly created ACME Text document is passed in to the 
template via the `model`.

The template for the Web Script is simple and looks like this:

```xml
<p>The ACME Document was added successfully with the node reference: ${nodeRef}</p>
```

The template file should be called `acme-documents.post.html.ftl` to be associated with the ACME Documents Web Script.

## Deployment - App Server

* `tomcat/shared/classes/alfresco/extension/templates/webscripts/{domain specific directory path}` - Descriptor, JavaScript controller, template, properties files, configurations (Untouched by re-deployments and upgrades)
* **Note**. if you are developing a Web Script with a Java controller you are better off using a proper SDK project, see next.

## Deployment All-in-One SDK project

* `aio/platform-jar/src/main/resources/alfresco/extension/templates/webscripts/{domain specific directory path}` - Descriptor, JavaScript controller, template, properties files, configurations
* `aio/platform-jar/src/main/java/{domain specific directory path}` - implementation of Java controller
* `aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/webscript-context.xml` - Java controller Spring Bean

## More Information

* [Web Script Reference]({% link content-services/7.2/develop/reference/web-scripts-ref.md %})
* [Admin Console Component Web Script]({% link content-services/7.2/develop/repo-ext-points/admin-console-components.md %})
* [Out-of-the-box JavaScript root objects]({% link content-services/7.2/develop/reference/repo-root-objects-ref.md %}) - for use in a JavaScript controller
* [Custom JavaScript root objects]({% link content-services/7.2/develop/repo-ext-points/javascript-root-objects.md %}) - for use in a JavaScript controller
* [Out-of-the-box FreeMarker root objects]({% link content-services/7.2/develop/reference/freemarker-ref.md %}) - for use in a template
* [Presentation Tier web scripts]({% link content-services/7.2/develop/share-ext-points/web-scripts.md %}) - i.e. Surf web scripts
* [Web Script examples that create Data Lists]({% link content-services/7.2/develop/repo-ext-points/data-lists.md %})

## Sample Code

* [Different Web Script implementations as in above description](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-web-script-repo){:target="_blank"}
* [web scripts that create Data Lists](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo){:target="_blank"}

## Tutorials

* [Jeff Potts web scripts tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/webscripts/tutorial/tutorial.html){:target="_blank"} - a must read
* [XML Configuration]({% link content-services/7.2/develop/reference/web-scripts-ref.md %}#wscomponents) - Additional XML configuration for Web Script
* [Cache Control]({% link content-services/7.2/develop/reference/web-scripts-ref.md %}#cachecontrols) - Additional Cache control configuration for Web Script
