---
title: Repository Web Scripts Tutorials
---

Use these hands-on tutorials to help get you up and running with repository web scripts as quickly as possible.

These tutorials assume you have Alfresco Content Services installed locally at `http://localhost:8080`. If this is not 
the case you will need to amend the URLs used in the tutorials accordingly.

See also [Repo Web Script]({% link content-services/latest/develop/repo-ext-points/web-scripts.md %}) extension point.

## Listing pre-built web scripts

There are many pre-built web scripts provided out-of-the-box available for reuse. Before developing a new web script, 
always check to see if one already exists that supports your requirements or is near enough to save you time.

The Web Script Framework keeps an index of all web scripts registered in the Alfresco Content Services application server, 
which makes it easy to establish what is already available. It is not unusual for hundreds of web scripts to be registered. 
To ease navigation the index organizes web scripts by:

* URI
* Web script package
* Web script family

A web script package is a collection of related web scripts, such as those for integrating with Microsoft Office or 
those providing the CMIS AtomPub binding.

A web script family identifies web scripts of a similar kind, such as portlets and Share dashlets. Think of families as 
a way of tagging or categorizing web scripts.

To display an HTML page of the index:

1.  Type the URI `http://localhost:8080/alfresco/service/index`.

2.  If prompted, log in with the user name `admin` and password `admin`.

    The Web Scripts Home page displays.

    ![webscript-index]({% link content-services/images/webscript-index.png %})

    The index contains an entry for each registered web script and provides several ways to navigate through them.

    Each web script displays a full description including its URI(s) for invocation.

3.  Drill down into the implementation of the web script to see its descriptor, controller script, and response template components.

    This can be very useful as a learning resource or as the basis for a copy/paste approach to creating new web scripts.

## Invoking a web script using cURL

When exploring or developing web scripts, a web browser can be limiting as a client. For example, it cannot perform any 
HTTP method other than GET without coding. You can use an alternative client called cURL, a command line tool that 
supports common protocols such as FTP and HTTP. cURL is a valuable web script debugging and testing tool.

This task describes how to invoke a web script using [cURL](http://curl.haxx.se/){:target="_blank"}.

1.  Install cURL.

    If using Linux or Mac OS X, you can install cURL through apt-get or Macports. If running Microsoft Windows, you can install cURL through Cygwin.

2.  Once installed, type the following in the command line to invoke an index of web scripts available:

    `curl -uadmin:admin "http://localhost:8080/alfresco/service/index"`

    This tells cURL to invoke the URL defined associated with the index web script, which returns in a categorized list of web scripts being returned.

## Developing a Hello World web script {#helloworldws}

Building a Hello World web script is the best way to gain an understanding of the Web Script Framework. This example is 
simple enough to build and execute within a few minutes.

The Hello World web script consists of one web script description document and one FreeMarker response template, both 
created by using Alfresco Share.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the **Repository** link on the Share header.

    4.  Navigate to **Data Dictionary > Web Scripts Extensions**.

2.  Create a web script description document for the Hello World example.

    1.  Click the Create menu item, and select **XML** to create a new XML file.

    2.  Enter `hello.get.desc.xml` as the web script name in the **Name** field.

    3.  Enter the following in the content box:

        ```xml
        <webscript>
          <shortname>Hello</shortname>
          <description>Polite greeting</description>
          <url>/hello</url>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Click Web Scripts Extensions folder again.

3.  Create a web script response template to render the Hello World greeting.

    1.  In the Create menu, create a Plain Text file.

    2.  Enter `hello.get.html.ftl` as the template name in the **Name** field.

    3.  Type `Hello World` in the Enter Content box.

    4.  Click **Create**.

4.  Register the Hello World web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  In the new tab, type `http://localhost:8080/alfresco/service/index`.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

    A message indicates there is one additional web script.

5.  Type `http://localhost:8080/alfresco/service/hello` in the web browser to test the new web script.

    A Hello World message is displayed, indicating your web script is working.

### Locating the Hello World example

One of the most useful uses of the index is to determine if a web script actually exists. To walk through this process, 
you can locate the newly created Hello World example.

To locate the Hello World sample web script, navigate to the Web Scripts Home page (`http://localhost:8080/alfresco/service/index`). 
If prompted, log in with the user name `admin` and password `admin`.

When invoking a web script URI, the Web Script Framework might respond with a Not Found error. This can be due to an 
incorrectly formed URI or because the web script is not registered at all. To determine which, navigate the index to 
see if the Web Script Framework knows of it.

>**Note:** Notice that the web script index URI starts with `/alfresco/service`. This is correct: the web script index is itself just another web script. The index is a series of web scripts each providing a different navigation of the index at the following URIs:
>
>* http://localhost:8080/alfresco/service/index/uri/
>* http://localhost:8080/alfresco/service/index/package/

1.  On the Web Scripts Home page, select the **Browse by Web Script URI** link.

2.  Use the web browser search feature to locate `/hello` within the page.

3.  Once found, click the `/hello` link to display the full description of the Hello World web script.

### How Hello World works

After creating the sample Hello World web script you typed the URL in the web browser to test it. This caused the 
Web Script Framework to kick into action. It is triggered whenever a URL starting with `/alfresco/service` is invoked.

First, the Web Script Framework determines which web script to invoke by matching the remainder of the URL and the 
HTTP method of the HTTP request (in this case, a GET request from the web browser) to the appropriate registered web script 
descriptor, if one matches. The Hello World web script is matched to the URL `/hello` as defined by its web script descriptor 
file named `hello.get.desc.xml`.

Having found a web script, the Web Script Framework executes it by first invoking its controller script, if one exists, 
and then invoking its response template to render an HTTP response. The simple Hello World example does not consist of a 
controller script and does not define a default kind of response to render, so the Web Script Framework assumes an HTML 
response is to be rendered and locates the FreeMarker template named `hello.get.html.ftl`. The template renders an HTML 
response back to the web browser, which in turn displays Hello World.

## Creating a Hello User web script with authentication

To see authentication in action, you can make a slightly more interesting Hello World example named Hello User that 
requires authenticated access and responds with a personalized greeting.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the Repository link in the Share header.

    4.  Navigate to **Data Dictionary > Web Scripts Extensions**.

2.  Create a web script description document for the Hello User example.

    1.  In the Create menu, select **XML**.

    2.  Enter `hellouser.get.desc.xml` as the web script name in the Name field.

    3.  Enter the following in the content box:

        ```xml
        <webscript>
          <shortname>Hello User</shortname>
          <description>Personalized greeting</description>
          <url>/hellouser</url>
          <authentication>user</authentication>
          <negotiate accept="text/html">html</negotiate>
          <negotiate accept="application/json">json</negotiate>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Click the Web Scripts Extensions directory again to return to the folder.

3.  Create a web script response template to render the Hello User greeting.

    1.  In the Create menu, select Plain Text.

    2.  Enter `hellouser.get.html.ftl` as the template name in the Name field.

    3.  Type `Hello ${person.properties.userName}` in the content box.

    4.  Click **Create**.

    5.  Again, navigate back to the Web Scripts Extensions folder by clicking on it in the breadcrumb trail.

4.  Register the Hello User web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  Type `http://localhost:8080/alfresco/service/index` in the web browser.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

        A message indicates there is one additional web script.

5.  Type `http://localhost:8080/alfresco/service/hellouser` in the web browser to test the new web script.

    A Hello admin message displays indicating your web script is working.

### Returning a JSON response format

While a web script that returns HTML (such as the Hello World sample web script) is fine for rendering a user interface, 
it is not so good for a data web script that needs to returns a format that is machine-readable, such as JSON. (JSON, 
short for JavaScript Object Notation, is a lightweight data interchange format, often used for transmitting structured 
data over a network connection.)

A web script can offer multiple response formats where each format is supported by its own response template. Clients 
that invoke the web script either rely on the default response format or can explicitly ask for a specific response format.

Add another response format to the Hello User web script that returns the greeting in JSON format.

1.  Log in to Alfresco Share.

    1.  Type `http://localhost:8080/share` in the web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    3.  Click the Repository link in the Share header.

    4.  Navigate to **Data Dictionary > Web Scripts Extensions**.

2.  Create a new web script response template to render the Hello User greeting in JSON.

    1.  In the Create menu, select Plain Text.

    2.  Enter `hellouser.get.json.ftl` as the template name in the **Name** field.

    3.  Type the following in the Enter Content box.

        ```json
        {greeting: "hello", user: "${person.properties.userName}"}
        ```

    4.  Click **Create**.

    5.  Navigate back to the Web Scripts Extensions folder by clicking on it in the bread crumb trail.

3.  Re-register the Hello User web script with Alfresco Content Services.

    1.  Open a new browser tab.

    2.  In the new tab, navigate to `http://localhost:8080/alfresco/service/index` in the web browser.

    3.  If prompted, log in with the user name `admin` and password `admin`.

    4.  Click **Refresh Web Scripts**.

    A message indicates there is *no* additional web script (just a response format has been added).

4.  Finally, type the following on the command line to test the web script.

    ```bash
    curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser.json"
    ```

    The message `{greeting: "hello", user: "admin"}` displays indicating your web script is working.

### Selecting a response format

There are several ways for a client to explicitly select a response format: URL extension, URL query parameter, and 
`Accept` header.

The URL extension approach simply requires the URL to end with the format of the response to select, such as `<webscript url>.<format>`.

Sometimes, a web script URL cannot support the format extension approach as the URL might naturally end with an extension 
anyway. For example, web script URL paths that refer to folder and file names in the content repository already have the 
extension inherited from the file name. For these scenarios, it is possible to explicitly select the response format by 
using the URL query parameter, such as `<webscript url>?format=<format>`.

Each format actually maps to a MIME type, which is set on the HTTP response allowing a client to process or render the 
response appropriately. The Web Script Framework provides a registry of formats where the commonly used MIME types are 
mapped as follows:

* html => text/html
* text => text/plain
* xml => text/xml
* atom => application/atom+xml
* rss => application/rss+xml
* json => application/json

Another approach to selecting a response format is to use the HTTP Accept header, as defined by RFC 2616 section 14. 
A client uses an Accept header to specify a prioritized list of preferred MIME types for the response. When the Web Script 
Framework accepts an HTTP request with an Accept header, it responds with the response format that most closely matches 
the highest priority preference.

>**Note:** RFC 2616 ([http://www.ietf.org/rfc/rfc2616.txt](http://www.ietf.org/rfc/rfc2616.txt){:target="_blank"}) is the specification for the Hypertext Transfer Protocol – HTTP/1.1.

Web browsers typically provide an Accept header on all their HTTP requests, but most HTTP clients offer some way of 
specifying an `Accept` header.

If a client does not explicitly request a specific response format, the web script uses its predefined default response format.

Refer to the following instructions to explicitly select a response format. Each option uses the Hello User sample web script.

To use the URL extension approach, type one of the following statements in your command line to explicitly select 
either HTML or JSON:

```bash
curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser.json"
```

```bash
curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser.html"
```

To explicitly select the response format for the Hello User web script using the URL query parameter, type one of the 
following statements in your command line:

```bash
curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser?format=json"
```

```bash
curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser?format=html"
```

To use an Accept header when invoking the Hello User web script to select the response format, type the following in 
your command line:

```bash
curl -uadmin:admin -H "Accept: text/html" "http://localhost:8080/alfresco/service/hellouser"
```

### How Hello User works

The sample web script required user level authentication in its `hellouser.get.desc.xml` descriptor file. This indicated 
to the Web Script Framework that prior to invoking the web script, a user has to first log in.

By default, the Web Script Framework initiates the login process through HTTP Basic authentication, which informs the 
web browser to display a login box for the user to enter their user name and password. Upon successful authentication, 
which is performed by Alfresco Content Services, the web script is invoked. Otherwise, the process stops and the 
invocation of the web script fails.

Having found the `hellouser.get.html.ftl` response template, the Web Script Framework renders its result back to the 
web browser. The template, which is now running as an authenticated user, has access to special Alfresco Content Services 
objects. In this case, the template renders the name of the authenticated user through the object `${person.properties.userName}`.

>**Note:** HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

### Specifying user identity

There are several options for specifying the user with which to invoke a web script: HTTP Basic authentication, ticket, 
or as a Guest.

HTTP Basic authentication allows you to specify your user name and password within an HTTP request. A request to a 
web script can include the user name and password of the Alfresco Content Services user to authenticate as, meaning the 
client does not have to ask for them. The cURL client supports this feature.

You can specify a ticket instead of an explicit user name and password. A ticket represents a pre-authenticated user 
who has already performed the login process. Tickets can be programmatically established by using the pre-built Login 
web script.

A final option enables you to specify that a web script be executed as the guest user. Guests are not named users, so 
do not need to log in; however, they might be restricted in what they can see or do in the repository.

Refer to the following instructions to specify user identity. Each option uses the [Hello User sample web script](#helloworldws).

* For **HTTP Basic authentication**, type the following in your command line:

    ```bash
    curl -uadmin:admin "http://localhost:8080/alfresco/service/hellouser"
    ```

    This informs cURL to invoke the URL defined by your Hello User web script as the user admin, which returns Hello admin.

    When comparing this to invoking the Hello User web script through the web browser, you can see that the cURL client did not subsequently ask for the user name and password, whereas the web browser did.

    >**Note:** Upon successful authentication, a client might remember that the current session is authenticated, thus requiring the authentication process to be initiated only once. For example, a user already logged in using the current web browser session won't be asked to log in again.

* To specify a ticket, type the following in your command line to log in:

    ```bash
    curl "http://localhost:8080/alfresco/service/api/login?u=admin&pw=admin"
    ```

    This informs cURL to invoke the URL defined by the Login web script, which returns XML similar to the following:

    ```xml
    <?xml version="1.0" encoding="URF-8"?>
      <ticket>TICKET_0a748bc2543f2b271dc4cb9955c11a042cad72cd</ticket>
    ```

    1.  With a ticket established, it is possible to invoke other web scripts with that ticket, indicating to the Web Script Framework to execute the web script as the user represented by the ticket. This is achieved by adding the following URL query parameter to the web script URL: `alf_ticket=<ticket>`

    2.  To execute the Hello User web script with a ticket, type the following in your command line, substituting the ticket with the value returned from your web script login:

        ```bash
        curl "http://localhost:8080/alfresco/service/hellouser?alf_ticket=TICKET_0a748bc2543f2b271dc4cb9955c11a042cad72cd"
        ```

* For **Guest invocation**, add the following URL query parameter to the web script URL: `guest=true`

    Remember, guests can only invoke web scripts that require Guest authentication; they cannot invoke User or Admin required web scripts. To invoke the Hello User web script as guest, type the following in your command line:

    ```bash
    curl "http://localhost:8080/alfresco/service/hellouser?guest=true"
    ```

    You might expect this to respond with a polite greeting, but instead you will receive a 401 error message stating that the Hello User web script requires user authentication and a guest has attempted access.

### Using the JSON callback

Creating a callback example involves creating an HTML page that invokes the Hello User web script with a callback that 
displays the JSON response in an alert box.

>**Note:** For security reasons, this mechanism is disabled by default. To enable it on any web scripts container, set the bean property: `allowCallbacks = true`. This change can be made in `web-scripts-application-context.xml`, or more conveniently outside of the `alfresco.war` file in `tomcat/shared/classes/alfresco/extension/custom-web-context.xml`.

1.  Create a `custom-web-context.xml` file in the extension directory (`tomcat/shared/classes/alfresco/extension`).

2.  Copy the complete bean `bean id="webscripts.container` from the `web-scripts-application-context.xml` file located (v5.1) in the `./alfresco/WEB-INF/lib/alfresco-remote-api-5.1.jar/alfresco/web-scripts-application-context.xml` into the custom context file.

3.  Add the property `<property name="allowCallbacks">` to the bean (see example below):

    ```xml
    <bean id="webscripts.container" class="org.alfresco.repo.web.scripts.TenantRepositoryContainer" parent="baseAlfrescoRepositoryContainer" init-method="setup">
        <property name="configService" ref="webscripts.config" />
        <property name="name"><value>Repository</value></property>
        <property name="allowCallbacks"><value>true</value></property>
        <property name="scriptObjects">
          <map merge="true">
            <entry key="paging">
              <ref bean="webscripts.js.paging"/>
            </entry>
          </map>
        </property>
        <property name="webScriptsRegistryCache" ref="webScriptsRegistryCache"/>
        <!-- Use the time-limited transaction helper to keep request times to an acceptable duration -->
        <property name="transactionService" ref="transactionService" />
        <!-- The transaction helper used to generate error responses must be unlimited -->
        <property name="fallbackTransactionHelper" ref="retryingTransactionHelper" />
        <property name="authorityService" ref="AuthorityService" />
        <property name="repository" ref="repositoryHelper" />
        <property name="repositoryImageResolver" ref="webscripts.repo.imageresolver" />
        <property name="templateProcessorRegistry" ref="webscripts.repo.registry.templateprocessor" />
        <property name="scriptProcessorRegistry" ref="webscripts.repo.registry.scriptprocessor" />
        <property name="descriptorService" ref="DescriptorService" />
        <property name="tenantAdminService" ref="tenantAdminService" />
        <property name="encryptTempFiles" value="${webscripts.encryptTempFiles}"/>
        <property name="tempDirectoryName" value="${webscripts.tempDirectoryName}"/>
        <property name="memoryThreshold" value="${webscripts.memoryThreshold}"/>
        <property name="maxContentSize" value="${webscripts.setMaxContentSize}"/>
    </bean>
    ```

4.  Restart application server.

5.  Create the HTML page.

    1.  Create a file named `callback.html` on your machine's local file system.

    2.  Edit the file and add the following HTML:

        ```xml
        <html>
            <body>
                <script>
                // callback function to display greeting
                function showGreeting(res) {alert(res.greeting + ' ' + res.user);}
                // invoke web script hello user web script
                var script = document.createElement('SCRIPT');
                script.type = 'text/javascript';
                script.src = 'http://localhost:8080/alfresco/s/hellouser.json?alf_callback=showGreeting';
                document.body.appendChild(script);
                </script>
            </body>
        </html>
        
        
        ```

6.  Test the callback.

    1.  Open the file `callback.html` file in your web browser.

    2.  If prompted, log in with the user name `admin` and password `admin`.

    An alert box displaying the message hello admin indicates your callback is working.

### Understanding how the JSON callback works

The easiest way to understand the callback example is to invoke the Hello User web script directly and interrogate the response.

Type the following in the command line: 

```bash
curl -uadmin:admin "http://localhost:8080/alfresco/s/hellouser.json?alf_callback=showGreeting"
```

This mimics the web script invocation made in the `callback.html` file.

The response is:

```javascript
showGreeting({greeting: "hello", user: "admin"})
```

This is simply the vanilla Hello User web script response passed as an argument to the function named `showGreeting` as 
defined by the `alf_callback` query parameter. The full response is treated as JavaScript by the web browser, which executes it.

## Processing complex HTTP requests
## Configuring a web script
## Creating a web script using cache controls
## Processing multipart forms
### Testing the upload web script
## Creating request processing web scripts
### Extending the request processing web script
## Creating a photo search script
## Developing a Folder Listing web script
### Creating a description document
### Creating a controller script
### Parsing the web script URI
### Calling services
### Constructing the model
### Creating a response template
#### Accessing the model
#### Accessing services
### Registering and testing web scripts
### Creating multiple response templates
#### Adding a response status code template
### Debugging a controller script
## Creating a Folder Listing Java-backed web script
### Creating the scripted components of a Folder Listing web script
### Developing a controller for a Folder Listing Java-backed web script
### Parsing the URI
### Calling services
### Setting the response status code
### Constructing the model
### Registering a Java-backed web script
### Declaring service dependencies
## Creating a new kind of web script
### Testing the new kind of web script
