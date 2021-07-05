---
title: Web scripts
---

Repository web scripts are the fundamental building blocks used for extending the REST API in Alfresco Content Services.

|Information|Repository web scripts|
|-----------|----------------------|
|Support Status|[Full Support]({% link support/latest/policies/product-lifecycle.md %})|
|Architecture Information|-   [Platform Architecture]({% link content-services/5.2/develop/software-architecture.md %}#platform-architecture)
-   [Presentation Web Scripts (Surf) vs Data Web Scripts (Repository)]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#web-script-types)

|
|Description|Web Scripts are a way of implementing [REST-based API](https://en.wikipedia.org/wiki/Representational_state_transfer). They could also be referred to as Web Services. They are stateless and scale extremely well. Repository Web Scripts are defined in XML, JavaScript, and FreeMarker files and stored under alfresco/extension/templates/webscripts. Repository Web Scripts are referred to as *Data Web Scripts* as they usually return JSON or XML. Before embarking on implementing a Repository web scripts it is recommended that you establish if the required functionality is already available out-of-the-box. Many operations that you might want to perform may be available, see [Alfresco REST API]({% link content-services/5.2/develop/api-reference.md %}#rest-apis).

 The simplest Web Script you can write consists of a *descriptor* and a *template*. The descriptor will tell you what URL that should be used to invoke the Web Script. The template is used to assemble the output returned from the Web Script. This kind of Web Script is very static to its nature and will always return the exact same content. Most Web Scripts also include a *controller* that is used to dynamically assemble a map of data that is then processed by the template to produce the final output. The data that the controller produces could come from anywhere as the controller can be implemented in both JavaScript and Java. Any content from the repository that should be included in the response can be fetched via Alfresco Content Services-specific JavaScript root objects, such as `companyhome`, or services, such as the Node Service, if the controller is implemented in Java.

 The following picture illustrates how a Repository Web Script request is processed:

![]({% link content-services/images/dev-extensions-repo-web-scripts-architecture.png %})

 The controller can fetch content from different sources, such as the repository, or a remote Web Service on the Internet. Note that the special root object called [remote]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints), which is available for Surf web scripts to fetch remote data on the internet, is not available when implementing a Repository Web Script JavaScript controller. To fetch remote data on the Internet from a Repository Web Script, a Java controller is needed.

 Now, to get going implementing web scripts we will start with the simplest possible Repository Web Script. The usual Hello World example comes to mind. When implementing a new Web Script it is good to start with the **descriptor** file, it will define what URL(s) that should be used to invoke the Web Script. It is defined in XML and looks something like this:

```xml
<webscript>
    <shortname>Hello World</shortname>
    <description>Hello World Sample Web Script that responds back with a greeting</description>
    <url>/tutorial/helloworld</url>
    <format default="html"></format>
    <family>Alfresco Tutorials</family>
</webscript>
```

 The important part here is the `<url>` element, which determines what URL should be used to invoke the Web Script. When specifying the URL leave out the part that maps to the Web Script dispatcher Servlet, which is `http://{host}:{port}/alfresco/service`. So to invoke this Web Script use a URL with the `http://{host}:{port}/alfresco/service/tutorial/helloworld` format.

 Next important thing in the descriptor file is the `<format` element, which specifies what content format we can expect in the response when invoking this Web Script. In this case it will return a HTML fragment, so we set format to `default="html"`. Finally we need to somehow define a unique identifier for this Web Script, which will be used to look up other files that are part of the Web Script implementation. This is handled implicitly by the file name convention, which for Web Script descriptor files follow the `<web script id>.<http method>.desc.xml` format. If we store this descriptor in a file called helloworld.get.desc.xml then the unique identifier will be `helloworld`. But that's not all, the HTTP method also plays a part in the identification of a Web Script, in this case it is set to `get`, which means it is intended to be invoked with a HTTP GET Request.

 > **Important:** The Web Script URL needs to be unique throughout the Alfresco Content Services installation. And if two or more web scripts have the same identifier, then they need to be stored in different directory locations. For example, if you have two extensions deploying a Web Script with the same file name, in the same location (i.e. directory), then the last one to be deployed will overwrite the other one, even if the URL is different between the two.

 To complete the Hello World Web Script implementation we just need a **template** to go along with the descriptor, it is defined in a FreeMarker file and looks like this:

```xml
<h2>Hello World!</h2>
```

 Web Script template file names also follow a naming convention: `<web script id>.<http method>.<format>.ftl`. The above template could be stored in a file called helloworld.get.html.ftl, which would implicitly associate it with the descriptor file as it has the same identifier and HTTP method. We are also indicating that this template produces HTML markup. This Web Script implementation is now complete.

 To try out the Hello World Web Script we first need to deploy it by copying the files to the correct directory in the Alfresco Content Services installation, see below for locations. Then refresh the web scripts from the `http://{host}:{port}/alfresco/service/index` page so Alfresco Content Services knows about it. And then invoke it using the URL in a browser as follows:

 ![]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld.png %})

 Most of the time the content that is returned is provided indirectly via a **controller**. The controller sets up the `model` containing the data that should be passed over to the template. Controllers can be implemented in both JavaScript (this is server side JavaScript, Alfresco Content Services provides this by embedding the Rhino JavaScript engine) and Java. Let's add a JavaScript controller for the Hello World Web Script. It will put a property called `message` in the `model`. This new property will contain a slightly improved Hello World message that includes the name of the logged in user. Here is the controller implementation:

```text
model.message = "Hello World " + person.properties.firstName + ' ' + person.properties.lastName + "!";
```

 Here we use an Alfresco Content Services-specific JavaScript root object called `person` to get first and last name of the logged in user. The `model` variable is automatically available to us in the controller and we can put whatever data we want in it for later use in the template.

 The Web Script controller file names follow the `<web script id>.<http method>.js` naming convention. The above controller should be stored in a file called helloworld.get.js so it is matched up with the Hello World Web Script descriptor. To take advantage of this new data in the `model` we need to update the template as follows:

```xml
<h2>${message}</h2>
```

 The update to the Web Script is now finished. However, if we were to try and invoke the Web Script we would see an exception as currently it is not set up to authenticate with a username and password. We cannot use the `people` root object to access Repository information about users without being authenticated. In fact, we cannot access anything in the Repository without first authenticating, so using other root objects such as `companyhome` requires authentication too.

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

 When setting the `authentication` property to be able to read and write to the Repository we need to have these operations wrapped in a transaction. This is automatically done as soon as we set the `authentication` element to anything else than `none`. By default another element called `<transaction>` is then set to `required`.

 After deploying the updated Web Script files and the new controller file, and refreshing the web scripts, we will see the following when invoking it again (assuming we logged in as Administrator):

![]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-auth.png %})

 Now, what if we wanted to present the Hello World message in different languages depending on what the browser `Accept-Language` header was, how would we do that?

 We would then turn to Web Script i18n **properties** files. These files are created in the same way as Java resource bundles. The naming convention for these files is `<web script id>.<http method>[_<locale>].properties`. For the default English resource file you can leave out the locale. So for our Hello World Web Script it would be called helloworld.get.properties and contain the following:

```text
hello.world=Hello World
```

 To add a Swedish translation we would create a properties file called `helloworld.get_sv.properties` with the following content:

```text
hello.world=Hej Världen
```

 To make use of this property we would have to update the controller as follows:

```text
model.message = person.properties.firstName + ' ' + person.properties.lastName + "!";
```

 Leaving out the Hello World string so it can be localized. The template need the following update to read the resource string:

```xml
<h2>${msg("hello.world")} - ${personName}</h2>
```

 There are also situations where we just want to be able to externally **configure** the Web Script with minimal changes to the main implementation of it. Basically we don't want to touch the descriptor, controller, or template. Just feed it with some new configuration. Let's say for example that our greeting message should be slightly different at certain times of the year, such as an extra Merry Christmas message around that time.

This can be done with an extra configuration file that follows the <web script id>.<http method>.config.xml naming convention. The Hello World Web Script configuration will look like this:

 ```xml
<greeting>
    <text>Merry Christmas!</text>
    <active>true</active>
</greeting>
```

 The configuration file can contain any arbitrary XML structure. In this case it contains a message text and an indication if this text should be active or not. We store this configuration in a file called helloworld.get.config.xml. To access this configuration we would have to make a change to the controller as follows:

```text
var greeting = new XML(config.script);
model.greetingActive = greeting.active[0].toString();
model.greetingText = greeting.text[0].toString();
model.personName = person.properties.firstName + ' ' + person.properties.lastName + "!";
```

 We use the JavaScript root object `config` to access the XML. This is then fed into the `XML` object, which is part of the E4X JavaScript library that enables us to process XML directly in JavaScript (more info: `http://www.w3schools.com/e4x/default.asp`). We can then navigate into the XML structure and grab the data that we need. We add two variables to the `model` to hold the greeting message and if it should be active or not. All we got to do now is update the template to take advantage of the new data:

```html
<h2>${msg("hello.world")} - ${personName}</h2>
<#if greetingActive == "true">
    <p>
        <i>${greetingText}</i>
    </p>
</#if>
```

 This is the first time we have started to use some FreeMarker directives. Common statements such as `if,then,else` are supported. Directives are preceded with `#`. Note that when you use model variables such as the `greetingActive` inside a directive statement they don't have to be enclosed in `${ }`.

 Invoking the Hello World Web Script should now give us the following result:

 ![]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-auth-conf.png %})

 It is now very simple to change the extra message to whatever we want without having to touch the main implementation of the Web Script, just update the helloworld.get.config.xml file, and we can turn off the message all together if we want to.

 Sometimes when implementing a Web Script there are things that cannot be done in a JavaScript controller, such as accessing the file system and fetching content on the Internet. We then need to turn to **Java based controllers**. To implement a Web Script controller in Java we create a class that extends the `org.springframework.extensions.webscripts.DeclarativeWebScript` class. Using a Java controller will allow us to fetch and process data from wherever we want to.

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

 Note here that we are expected to return a model object, which is just a hash map. When we got both a JavaScript controller and a Java controller the latter one is executed first. The new Java controller is not yet associated with the Hello World Web Script. We need to define a Spring bean for it with an `id` that connects the controller with this Web Script:

```xml
<beans>
	<bean id="webscript.alfresco.tutorials.helloworld.get"
		  class="org.alfresco.tutorial.webscripts.HelloWorldWebScript"
		  parent="webscript">
	</bean>
</beans>
```

 The `id` should be specified following the `webscript.<packageId>.<web-script-id>.<httpMethod>` format. The trickiest part of the `id` is probably the `packageId`. When specified as in the above example it is assumed that the descriptor file is located in the `alfresco/extension/templates/webscripts/alfresco/tutorials` directory.

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

 Here we use another FreeMarker directive called `assign` that can be used to define new variables. In this case we define a new variable `datetimeformat` to hold the date and time format we want to use when displaying current date and time. To display the date in this format we use a so called built-in for dates called `string`. Calling the Web Script will now show the following response:

 ![]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-helloworld-java-contr.png %})

 > **Important:** The `DeclarativeWebScript` class is used when we have a template, and maybe a JavaScript controller as part of the Web Script. But there are situations, such as streaming and downloading a file, where there is no need for a template. In these cases we can extend the `org.springframework.extensions.webscripts.AbstractWebScript` class instead. It has an execute method that will allow you to return nothing and instead just put something on the response output stream, as in the following example:

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

 The Hello World Web Script demonstrates most of the features available to us when implementing web scripts. However, it might not be the most realistic Web Script implementation, it is not something we would need to do in a "real" project. It is more likely that we will have to implement a REST API based on a custom content model, such as the [ACME sample content model]({% link content-services/5.2/develop/repo-ext-points/content-model.md %}).

The key principles of REST involve separating your API into logical resources. These resources are manipulated using HTTP requests where the method (GET, POST, PUT, DELETE) has specific meaning.

 When working with custom content models, what can we make a resource? Normally, these should be nouns that make sense from the perspective of the API consumer. We should not have internal implementation details visible in our API! When looking at a content model it probably makes sense to use the types as resources, so for the ACME content model we could have the ACME Document, ACME Contract, and so on as resources.

 When we have identified our resources, we need to identify what actions apply to them and how those would map to the API. REST-ful principles provide strategies to handle CRUD actions using HTTP methods mapped as follows:

-   **GET /acmedocs** - Retrieves a list of ACME Documents
-   **GET /acmedocs/{noderef}** - Retrieves a specific ACME Document with specified node reference
-   **POST /acmedocs** - Creates a new ACME Document
-   **PUT /acmedocs/{noderef}** - Updates ACME Document with specified node reference
-   **DELETE /acmedocs/{noderef}** - Deletes ACME Document with specified node reference

 A good thing about REST is that we leverage existing HTTP methods to implement significant functionality on just a single `/acmedocs` endpoint. There are no method naming conventions to follow and the URL structure is clean and clear.

 Try and keep the resource URLs as lean as possible. Things like filters, sorting, search, and what properties to return can quite easily be implemented as parameters on top of the base URL.

 Here are some examples:

 -   Filtering: **GET /acmedocs?sc={security classification}** - Retrieves a list of ACME Documents that has been tagged with passed in security classification.
-   Sorting: **GET /acmedocs?sort=[-+]{property}** - Retrieves a list of ACME Documents sorted in ascending or descending order on the property passed in.
-   Searching: **GET /acmedocs?q={keyword}** - Retrieves a list of ACME Documents matching FTS on keyword passed in.
-   Properties: **GET /acmedocs?props={field1,field2,...}** - Retrieves a list of ACME Documents, only the specified properties are returned.
-   **GET /acmedocs?q=London&sc=Public&sort=-cm:created** - Combination of the above.

 When it comes to response format JSON is usually a good choice as it is compact and works well with most programming languages and widget libraries.

 As a demonstration on how to implement a REST API according to these best practices, we will look at how to implement a Web Script that can be used to return a list of ACME documents matching a keyword using Full Text Search (FTS). Based on REST API design principles, the **descriptor** would then look something like this:

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

 The above descriptor could be stored in a file called `acme-documents.get.desc.xml` as this Web Script should be used to search for files with the ACME document type applied. To invoke this Web Script we would use a URL with the format `http://{host}:{port}/alfresco/service/tutorial/acmedocs?q=london`.

 Next step is to create a controller that takes the search keyword, does a FTS, and then adds information about the matching nodes to the `model` object:

```text
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

 Here we first check if we got a search keyword passed in, if we don't we will exclude the FTS from the query. We then do the Lucene search on the ACME Document type and keyword using the Alfresco Content Services-specific `search` root object. If we get any nodes back we create an array of information objects that we add to the `model` to be sent to the template. If the query did not match any nodes we use the special `status` root object to send back a HTTP 404 not found message.

 The controller needs to be stored in a file called acme-documents.get.js to match up with the descriptor.

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

 Here a new FreeMarker directive called `list` is used to loop through the document information for the matching nodes. We also use a very handy build-in (`!`) that will check if the variable has a value (i.e. is not null), if it doesn't the right hand side value will be used as default.

 The template should be stored in a file called acme-documents.get.json.ftl as it returns JSON and should be matched up with the correct descriptor.

 This completes this ACME Docs Web Script, executing it will return a result looking something like this:

 ![]({% link content-services/images/dev-extensions-repo-web-scripts-invoke-acmedocs-search-sample.png %})

 In this call there were two documents that matched, having the ACME Document type applied, or a sub-type such as ACME Contract, and with a text that contained the word "sample".

> **Important:** The above example with free text search will actually match both sample, sampling, and sampled. The search engine uses stemming so all these variations will be reduced to their [word stem](https://en.wikipedia.org/wiki/Word_stem), base or [root](https://en.wikipedia.org/wiki/Root_%28linguistics%29) form before matching starts.

 We have now seen a lot of examples of how to get stuff from the repository, what about if we wanted to POST some stuff to the repository and store it? This is simple, tell the web script container that the web script is of type `POST`, and that we expect to upload and store stuff in the repository with it.

 As an example, let's create an ACME Docs web script that can be used to upload some JSON data with information that is to be used when creating an ACME Text document. The descriptor will look like this:

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

 The above descriptor could be stored in a file called acme-documents.post.desc.xml as this Web Script should be used to POST stuff to the Repository. To invoke this Web Script we would use a `cURL` command looking something like this:

```bash
curl -v -u admin:admin -d @sample.json -H 'Content-Type:application/json' http://localhost:8080/alfresco/service/tutorial/acmedocs
```

The `sample.json` file would contain the JSON structure as described in the descriptor. Next up is the controller, which should extract the JSON and then create the ACME Text Document based on the data:

```text
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

 The controller file should be called acme-documents.post.json.js to tell the Web Script container that it will be receiving POSTed JSON. When the controller is expecting JSON like this it provides a convenience root object called `json` that can be used to extract the JSON data. We then use another Alfresco Content Services-specific root object called `companyhome` that can be used to search for a folder, such as `/Guest Home` in this case. The `childByNamePath` assumes that you are searching from `/Company Home` so no need to specify it in the path to the node, this method can also be used to search for files. The node reference for the newly created ACME Text document is passed in to the template via the `model`.

 The template for the Web Script is simple and looks like this:

```html
<p>The ACME Document was added successfully with the node reference: ${nodeRef}</p>
```

 The template file should be called acme-documents.post.html.ftl to be associated with the ACME Documents Web Script.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/extension/templates/webscripts/{domain specific directory path} - Descriptor, JavaScript controller, template, properties files, configurations (Untouched by re-deployments and upgrades)
-   Note. if you are developing a Web Script with a Java controller you are better off using a proper SDK project, see next.

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/platform-jar/src/main/resources/alfresco/extension/templates/webscripts/{domain specific directory path} - Descriptor, JavaScript controller, template, properties files, configurations
-   aio/platform-jar/src/main/java/{domain specific directory path} - implementation of Java controller
-   aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/webscript-context.xml - Java controller Spring Bean

|
|More Information|-   [Web Script naming conventions]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#naming-conventions)
-   [JavaScript root objects]({% link content-services/5.2/develop/api-reference.md %}#root-objects) - for use in a JavaScript controller
-   [FreeMarker root objects]({% link content-services/5.2/develop/api-reference.md %}#default-model-objects) - for use in a template
-   [Where to put your web scripts](#web-script-locations) (When trying them out without a build project)
-   [Caching approach]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#caching) - HTTP Response caching and web scripts
-   [Presentation Tier web scripts](#surf-web-scripts) - i.e. Surf web scripts
-   [Web Script examples that create Data Lists]({% link content-services/5.2/develop/repo-ext-points/data-lists.md %})

|
|Sample Code|-   [Different Web Script implementations as in above description](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-web-script-repo)
-   [web scripts that create Data Lists](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/custom-data-list-repo)

|
|Tutorials|-   [Jeff Potts web scripts tutorial](http://ecmarchitect.com/alfresco-developer-series-tutorials/webscripts/tutorial/tutorial.html) - a must read
-   [XML Configuration]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#configuring-a-web-script) - Additional XML configuration for Web Script
-   [Cache Control]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#creating-a-web-script-using-cache-controls) - Additional Cache control configuration for Web Script
-   [POST data processing]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#creating-request-processing-web-scripts) - Additional Cache control configuration for Web Script

|

-   **[Repository-tier web scripts]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#repository-tier-web-scripts)**  
Web scripts provide a unique way to programmatically interact with the Alfresco Content Services server. Unlike other interfaces exposed by Alfresco Content Services, web scripts offer a RESTful API for the content residing in the repository. The REST (Representational State Transfer) web architecture is based on HTTP requests and responses, URIs (Uniform Resource Identifiers), and document types.

## Surf web scripts {#surf-web-scripts}

When you look under the covers of the Share web application you will notice that most of the functionality is implemented as Surf Web Scripts. This is true for both Pages and Dashlets.

|Extension Point|Surf Web Scripts|
|---------------|----------------|
|Architecture Information|-   [Share Architecture]({% link content-services/5.2/develop/software-architecture.md %}#share-architecture)
-   [Presentation Web Scripts (Surf) vs Data Web Scripts (Repository)]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#web-script-types)

|
|Description|Web Scripts are just another name for a [REST-based API](https://en.wikipedia.org/wiki/Representational_state_transfer). Could also be referred to as Web Services. They are stateless and scale extremely well. Surf Web Scripts are defined in XML, JavaScript, and FreeMarker files and stored under alfresco/web-extension/site-webscripts. Surf Web Scripts are referred to as *Presentation Web Scripts* as they usually return HTML, or some other UI markup.The simplest Web Script you can write consist of a *descriptor* and a *template*. The descriptor will tell you what URL that should be used to invoke the Web Script. And the template is used to assemble the output returned from the Web Script. This kind of Web Script is very static to its nature and will always return the exact same content. Most Web Scripts also include a *controller* that is used to dynamically assemble a map of data that is then processed by the template to produce the final output. The data that the controller produces could come from anywhere as the controller can be implemented in both JavaScript and Java. Any content from the repository that should be included is however fetched via a repository web script (also called a Data web script), as the Surf Web Script controller does not have direct access to the repository (that is, it does not have access to root objects such as `companyhome`).

The following picture illustrates how a Presentation web script and a Data web script work together to generate the user interface (this is how most of the Share user interface is generated):

![]({% link content-services/images/dev-extensions-share-web-scripts-architecture.png %})

As we can see in the above figure a Surf Web Script is not called directly from the browser (with http://localhost:8080/share/service/...) but instead indirectly via either a [Surf Page]({% link content-services/5.2/develop/share-ext-points/surf-pages.md %}#surf-pages) or a [Surf Dashlet]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets). Surf web scripts are also used when constructing [Aikau Pages]({% link content-services/5.2/develop/share-ext-points/aikau-pages.md %}#aikau-pages) and [Aikau Dashlets]({% link content-services/5.2/develop/share-ext-points/aikau-dashlets.md %}#aikau-dashlets).

> **Note:** For a Surf application such as Alfresco Share, or an application created from the Aikau archetype, the authentication is handled at the page level. And any Web Script components or Aikau pages that run within that context will be authenticated. A Share dashlet is already running within an authenticated page so will also be authenticated. On the other hand, if you call a Surf Web Script URL directly in a browser address bar there is no authentication (that is, no context). You would need to have a `JSESSIONID` that is already authenticated (that is, by the page). Surf ties the given `JSESSIONID` to the TICKET that is stored in the session for that user for that connector (`alfresco`, `alfresco-api`). When a client-side library on an authenticated page makes an XHR call to a `/service` URL it will be passing the `JSESSIONID` automatically.

The JavaScript controller can fetch content from different remote sources, such as the repository and Web Services on the Internet. To do this the controller uses a special root object called [remote]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints, which can be used to authenticate and connect to a remote service.

To connect to a Remote Service on the Internet the controller will look something like this:

```javascript
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

Web Script controller file names follow a naming convention: `<web script id>.<http method>.js`, the above controller could be stored in a file called `londonweather.get.js`.

Note the use of the `http` [connector]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints when communicating with external Web Services. Now, to create a Web Script you also need a descriptor, which is defined in XML and looks something like this:

```xml
<webscript>
   <shortname>London Weather</shortname>
   <description>Simple Surf Web Script fetching London weather information</description>
   <family>Share</family>
   <url>/tutorial/london-weather</url>
</webscript>   
```

Web Script descriptor file names follow a naming convention: `<web script id>.<http method>.desc.xml`, the above descriptor should be stored in a file called `londonweather.get.desc.xml` to link it to the controller. The template for a Web Script is defined in FreeMarker and looks something like this:

```xml
<div>
<#if weather?exists>
    <h1>London Weather Today</h1>
<h2>${weather[0].description}</h2>
<#else>
    Could not access weather information.
</#if>
</div>
```

Web Script template file names follow a naming convention: `<web script id>.<http method>.<format>.ftl`, the above template should be stored in a file called `londonweather.get.html.ftl` to link it to the descriptor.The London weather web script does not need any authentication with Alfresco Content Services so it could actually be called directly from the browser with the `http://localhost:8080/share/service/tutorial/london-weather` URL, and we should see a response similar to:

**London Weather Today**

**light rain**

It is more likely though that we would use this Web Scrip as a basis for a [Surf Dashlet]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets).

If we instead want to fetch and present data from the repository, we will most likely call an out-of-the-box repository web script, although it is common to implement and use your own repository web scripts. To connect and call an Alfresco repository web script (that is, Data web script) you will do something like this:

```text
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

For this controller to successfully pass on authentication information when making the repository web script call it need to be called in context of a [Surf Page]({% link content-services/5.2/develop/share-ext-points/surf-pages.md %}#surf-pages) or a [Surf Dashlet]({% link content-services/5.2/develop/share-ext-points/surf-dashlets.md %}#surf-dashlets). Note the use of the `alfresco` [connector]({% link content-services/5.2/develop/reference/surf-framework-ref.md %}#connectors-and-endpoints when communicating with a repository. This connector assumes that you will call the older **deprecated** v0 REST API (http://localhost:8080/alfresco/service). We use it here as the feature of searching for people is not yet available in the v1 REST API.

We should use the [v1 REST API]({% link content-services/5.2/develop/api-reference.md %}#entity-reference) as much as possible, which requires a different connector called `alfresco-api`. Here is an example controller that uses the v1 API to get all the sites in the Repository:

```text
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

The v1 REST API is actually split up into two different APIs depending on what we want to do. If we want to manage files and folders then we will have to use the CMIS API. And when we want to access Alfresco specific content, such as sites, then we need to use the Alfresco Content Services REST API. Both of these are accessible via the `alfresco-api` connector. As we saw above, the Alfresco v1 REST API is accessible via the `/-default-/public/alfresco/versions/1` URL. The CMIS API is accessible via the `/-default-/public/cmis/versions/1.1` URL. The following is an example of a Surf Web Script controller that uses the CMIS API to access the top folders and files in the repository:

```text
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

This controller puts the top folder content and search result into the model and we can use it in a template as follows:

```text
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

Note that we need to use different way of accessing the CMIS properties than the standard . (dot) notation.

> **Warning:** When parsing the JSON response do not use the `eval('('+result+')');` function as it is not secure. Instead use `jsonUtils.toObject` as in the above examples.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/web-extension/site-webscripts/ (Untouched by re-depolyments and upgrades)
-   tomcat/webapps/share/components/ (when web resources are included you need to put them directly into the exploded webapp, this is **NOT** recommended. Use a Share JAR extension module project instead)

|
|[Deployment All-in-One SDK project]({% link content-services/5.2/develop/sdk.md %}#getting-started-with-alfresco-content-services-sdk-3).|-   aio/share-jar/src/main/resources/alfresco/web-extension/site-webscripts
-   aio/share-jar/src/main/resources/META-INF/resources/share-jar/components (when web resources such as CSS and JS are included)

|
|More Information|-   [Presentation Tier Web Scripts]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#presentation-web-scripts)
-   [Where to put your Web Scripts](#web-script-locations) (When trying them out without a build project)
-   [Controller Root Objects]({% link content-services/5.2/develop/api-reference.md %}#surf-root-objects) (Root objects that can be used in the JavaScript controller)
-   [Template Root Objects]({% link content-services/5.2/develop/alfresco-full-text-search-ref.md %}#templates) (Root objects that can be used when the main FreeMarker template for a Page is rendered)
-   [Component Root Objects]({% link content-services/5.2/develop/api-reference.md %}#components) (Root objects that can be used when the FreeMarker template is rendered for a Page Component Web Script)
-   [Caching approach]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#caching) - HTTP Response caching and Web Scripts (from repository web script section but still applicable)

**Important**. There are two [types]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#web-script-types) of web scripts, [Repository Web Scripts]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#repository-web-scripts) and [Surf Web Scripts]({% link content-services/5.2/develop/reference/web-scripts-ref.md %}#presentation-web-scripts). When you work with Surf web scripts you have access to different content ([root objects](#root-objects)) then when using repository web scripts.


|
|Sample Code|-   [Custom Surf Pages, Surf Dashlets, and Surf Web Scripts](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-51/all-in-one/add-surf-dashlet-and-page-share)

|
|Tutorials|-   [XML Configuration]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#configuring-a-web-script) - Additional XML configuration for Web Script (from repository web script section but still applicable)
-   [Cache Control]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#creating-a-web-script-using-cache-controls) - Additional Cache control configuration for Web Script (from repository web script section but still applicable)
-   [POST data processing]({% link content-services/5.2/tutorial/platform/web-scripts.md %}#creating-request-processing-web-scripts) - Additional Cache control configuration for Web Script (from repository web script section but still applicable)
-   [Exploring the Root Objects](#exploring-root-objects)

|
|Alfresco Developer Blogs| |

-   **[Presentation-tier web scripts](#presentation-tier-web-scripts)**  
Web scripts can be written that run in the presentation tier.

### Presentation-tier web scripts

Web scripts can be written that run in the presentation tier.

Web scripts can be developed that run in the presentation tier. You could have the repository running on one server (say at port 8080) and the presentation tier running on another server (say on port 8081). These two tiers can communicate - for example, Share accesses the repository via the Repository REST API. When running a web script in the presentation tier, the web script has access to numerous root objects that are only available in the presentation tier. Likewise, some root objects that are available to web scripts when running in the repository tier are not available to web scripts running in the presentation tier. For example, objects associated with core repository concepts, such as nodes, are not directly available to web scripts running in the presentation tier.

-   **[Web script locations](#web-script-locations)**  
Web scripts need to be located on the application server classpath.
-   **[Root objects](#root-objects)**  
Web scripts written to run in the presentation tier have access to presentation-tier root objects, not available in the repository context.
-   **[Surf tutorials](#surf-tutorials)**  
Tutorials demonstrating how to use Surf.
-   **[FreeMarker extensibility directives in Web Script templates]({% link content-services/5.2/develop/reference/freemarker-ref.md %}#freemarker-extensibility-directives-in-web-script-templates)**  
Extensibility directives provide a way of dynamically editing HTML through configuration.

#### Web script locations

Web scripts need to be located on the application server classpath.

There are certain locations where it is the convention to locate your web scripts. The normal location when using the Tomcat application server is `./tomcat/shared/classes/alfresco`. Within that directory there are a couple of directories you should know about:

-   `extension` - your repository-tier web scripts will most likely be located here, typically in `templates/webscripts`. Web scripts are usually organized into packages below this directory, for example `org/alfresco/*`. You might create a package `com/mycompany/*` in which you can locate your company's web scripts.
-   `web-extension` - custom Share configuration can go directly into this directory. There are two important sub-directories in the `web-extension` directory: `site-data` and `site-webscripts`. `site-data` would contain Surf configuration XML files, such as page definitions, template-instances and components (see the Surf Framework documentation). The `site-webscripts` directory would contain your presentation tier web scripts, consisting of description files, JavaScript controllers and FreeMarker template files.

#### Root objects

Web scripts written to run in the presentation tier have access to presentation-tier root objects, not available in the repository context.

When running a web script in the presentation tier, the web script has access to numerous root objects that are only available in the presentation tier. Likewise, some root objects that are available to web scripts when running in the repository tier are not available to web scripts running in the presentation tier. For example, objects associated with core repository concepts, such as nodes, are not directly available to web scripts running in the presentation tier.

#### Surf tutorials

Tutorials demonstrating how to use Surf.

The tutorials use the Alfresco SDK to create a basic Surf project archetype. This provides a foundation on which to build your own Surf-based projects.

-   **[Creating a Surf project](#creating-a-surf-project)**  
A Surf project can be created most conveniently using the Alfresco SDK 2.0.
-   **[Exploring root objects](#exploring-root-objects)**  
When running in the presentation tier, there are a number of root objects available to your Surf project.

##### Creating a Surf project

A Surf project can be created most conveniently using the Alfresco SDK 2.0.

The Alfresco SDK, based on Maven, provides a simple way to create a fresh Surf project that you can work with and extend.

You need to have Maven installed. The version required is 3.2.2+. As Maven is a Java program, you will also need to have Java installed.

Surf projects require a number of configuration files and boiler plate code. The project directory hierarchy for a typical Surf project can also be quite daunting. To alleviate this problem, it is recommended that you create a Surf project using the Alfresco SDK. This will create a project structure for you, and populate all the required configuration files for you. Each of the files in the archetype are clearly documented. The Surf project archetype provides a convenient starting point for your own Surf projects.

1.  In the terminal run the following command:

    mvn archetype:generate -DarchetypeCatalog=https://artifacts.alfresco.com/nexus/content/groups/public-snapshots/archetype-catalog.xml

2.  Choose the Surf project archetype (`spring-surf-archetype`).

3.  When prompted for `groupId` enter `com.alfresco.tutorials`, or other suitable package name you would prefer.

4.  When prompted for `artifactId` enter a suitable project name such as `simple-surf-project`.

5.  If prompted for a `packageId` accept the default.

6.  The project will be created.

7.  Change into the directory created for you based on the artifactId. In this case it will be `simple-surf-project`.

8.  You can now build the project with the following command:

    ```
    
                            
        mvn install                    
                            
                        
    ```

9.  You can now run the project with the following command:

    ```
    
                            
        mvn jetty:run                    
                            
                        
    ```

10. Once the server has booted up you can point your web browser at `http://localhost:8080/` to see the Surf web site.

11. You can type a URL such as the following to further test the web site: `http://localhost:8080/page/home/welcome/tony`

12. You can now explore the project more conveniently by importing the project into an IDE such as Eclipse.
13. In Eclipse, select File, Import, and then select Existing Maven Project.

14. Browse to the simple-surf-project directory.

15. Click **Finish** to import the project into Eclipse.

    Now that the project is imported into Eclipse, you can use the Package Explorer to explore the directory hierarchy and files. Note that all the basic configuration files you need are present and heavily commented. You can use this project as the starting point for your own projects.


##### Exploring root objects

When running in the presentation tier, there are a number of root objects available to your Surf project.

This tutorial builds on the project created in the [previous tutorial](#creating-a-surf-project).

There are a number of root objects exposed to your JavaScript code and FreeMarker templates in your Surf project. This tutorial shows how you can explore what's available. All of the Surf root objects are documented in the [Surf API Reference for web scripts]({% link content-services/5.2/develop/api-reference.md %}#spring-surf-api).

1.  In the Eclipse Package Explorer, expand out your `simple-surf-project` to find the file src/main/webapp/WEB-INF/webscripts/home/body.get.html.ftl. This is the FreeMarker template whose output is injected into the body of the page found at: `http://localhost:8080/simple-surf-project/page/home`.

2.  Load the file into your editor.

3.  Change the code to be as follows:

    ```xml
    <#-- This is an example of how to request a CSS dependency. The resource request will
         be made in the <head> element of the page (because this is where the <@outputCSS>
         directive has been placed. A checksum suffix generated from the file contents 
         will be appended to the request so that the browser can cache it indefinitely.
         The group attribute is used when dependencies are aggregated together into a single
         request. -->
    
    <#-- APB
    <@link href="${url.context}/res/css/body.css" group="default"/>
    -->
    
    <div class="body">
        <!-- The body class defined in the "css/body.css" file sets a background image to 
             provide an example of how images referenced from within CSS files are encoded
             when the "generate-css-data-images" configuration option is enabled (see the
             "WEB-INF/surf.xml" file). -->
             
             <h2>Root Object Test</h2>
             
    		 <hr/>
             <p>theme: ${theme}</p>
             <p>locale: ${locale}</p>
                      
    		 <hr/>
    		 <p>Page root object:</p>		 
             <p>page.url.url: ${page.url.url}</p>
             <p>page.id: ${page.id}</p>
             <p>page.title: ${page.title}</p>
             
             <hr/>
             <p>context: ${context}</p>
    
    		<hr/>
    		<p>User root object:</p>
    		<p>user.id: ${user.id}</p>
    		<p>user.name: ${user.name}</p>
    		<p>user.fullName: ${user.fullName}</p>
    		<p>user.firstName: ${user.firstName}</p>        
    		 
     		<hr/>
     		<p>List page properties:</p>
            <#assign keys = page.properties?keys/>
            <#list keys as k>
              ${k} => ${page.properties[k]}
            </#list>
             
     		<hr/>
     		<p>List user properties:</p>
            <#assign keys = user.properties?keys/>
            <#list keys as k>
              ${k} => ${user.properties[k]},
            </#list>
             
     		<hr/>
     		<p>List context properties:</p>
     		<table border="2">
            <#assign keys = context.properties?keys/>
            <#list keys as k>
            	<#if context.properties[k]??>
            		<tr>
              		<#if context.properties[k]?is_boolean>
              			<#if context.properties[k]>
              				<td>${k} => TRUE</td>
              			<#else>
              				<td>${k} => FALSE</td>
              			</#if>
              			<br/>
              		<#else>
              			<td>${k} => ${context.properties[k]}</td>
              		</#if>
              		</tr>
              	</#if>
            </#list>
            </table>
    
     		<hr/>
     		<p>List template properties:</p>
     		<table border="2">
            <#assign keys = template.properties?keys/>
            <#list keys as k>
            	<#if template.properties[k]??>
            		<tr>
              		<#if template.properties[k]?is_boolean>
              			<#if template.properties[k]>
              				<td>${k} => TRUE</td>
              			<#else>
              				<td>${k} => FALSE</td>
              			</#if>
              			<br/>
              		<#else>
              			<td>${k} => ${template.properties[k]}</td>
              		</#if>
              		</tr>
              	</#if>
            </#list>
            </table>
    </div>                
    ```

    First, you comment out the code that places a background image using the CSS. This is no longer required. Then code has been added that explores the root objects as documented in the [Surf API Reference for web scripts]({% link content-services/5.2/develop/api-reference.md %}#spring-surf-api).

4.  Make sure you have no instances of Alfresco Content Services running.

5.  Rebuild your project on the command line using the command `mvn clean install`.

6.  Run the project by entering the command: `mvn jetty:run`.

    You can also [set up Eclipse so that it is possible to run your Maven project from within Eclipse](http://books.sonatype.com/m2eclipse-book/reference/running-sect-running-maven-builds.html).

7.  In your web browser navigate to `http://localhost:8080/simple-surf-project/page/home`.

    Information will be displayed about the various root objects.

8.  You can expand your FreeMarker code to include more root objects. Then refresh the page to display the results.

You have seen how to explore some of the root objects.
