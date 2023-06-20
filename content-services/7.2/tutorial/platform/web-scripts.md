---
title: Repository Web Scripts Tutorials
---

Use these hands-on tutorials to help get you up and running with repository web scripts as quickly as possible.

These tutorials assume you have Content Services installed locally at `http://localhost:8080`. If this is not 
the case you will need to amend the URLs used in the tutorials accordingly.

See also [Repo Web Script]({% link content-services/7.2/develop/repo-ext-points/web-scripts.md %}) extension point.

## Listing pre-built web scripts

There are many pre-built web scripts provided out-of-the-box available for reuse. Before developing a new web script, 
always check to see if one already exists that supports your requirements or is near enough to save you time.

The Web Script Framework keeps an index of all web scripts registered in the Content Services application server, 
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

This task describes how to invoke a web script using [cURL](https://curl.se/){:target="_blank"}.

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

4.  Register the Hello World web script with Content Services.

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

4.  Register the Hello User web script with Content Services.

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

3.  Re-register the Hello User web script with Content Services.

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

>**Note:** RFC 2616 ([https://www.ietf.org/rfc/rfc2616.txt](https://www.ietf.org/rfc/rfc2616.txt){:target="_blank"}) is the specification for the Hypertext Transfer Protocol – HTTP/1.1.

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
which is performed by Content Services, the web script is invoked. Otherwise, the process stops and the 
invocation of the web script fails.

Having found the `hellouser.get.html.ftl` response template, the Web Script Framework renders its result back to the 
web browser. The template, which is now running as an authenticated user, has access to special Content Services 
objects. In this case, the template renders the name of the authenticated user through the object `${person.properties.userName}`.

>**Note:** HTTP Basic authentication is a method designed to allow a web browser or other client program to provide credentials in the form of a user name and password when making an HTTP request.

### Specifying user identity

There are several options for specifying the user with which to invoke a web script: HTTP Basic authentication, ticket, 
or as a Guest.

HTTP Basic authentication allows you to specify your user name and password within an HTTP request. A request to a 
web script can include the user name and password of the Content Services user to authenticate as, meaning the 
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

Content negotiation makes it possible to serve different versions of a document at a given URI so that a client can 
specify which version best fits its capabilities. For example, a web browser can specify which type of image is preferred, 
such as GIF or PNG, for display purposes.

A client uses an Accept header to specify a prioritized list of preferred MIME types for the response. When the 
Web Script Framework receives an HTTP request with an Accept header, it responds with the web script response format 
that most closely matches the highest-priority MIME type preference.

By default, content negotiation is disabled; however, each web script can enable content negotiation by declaring its 
requirements in its descriptor document. This involves mapping an incoming Accept header MIME type preference to one of 
its response formats.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions**.

4.  Create a folder to represent the top-level package structure (skip this step if the **org** space already exists):

    1.  In the Create menu, select **Create Folder**.
    2.  Enter the name for the folder in the Name field: `org`
    3.  Click **Save**.
    4.  Navigate to the freshly created org folder.

5.  Create a sub-package (skip this step if the **example** space already exists):

    1.  In the Create menu, select **Create Folder**.
    2.  Enter the name for the folder in the Name field: `example`
    3.  Click Save.
    4.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

6.  Create a web script description document for your content negotiation sample:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field as: `negotiate.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>Negotiation Sample</shortname>
          <description>Response format driven by content negotiation</description>
          <url>/negotiate</url>
          <negotiate accept="text/html">html</negotiate>
          <negotiate accept="application/json">json</negotiate>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

7.  Create an HTML response template for your content negotiation sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `negotiate.get.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
          <body>HTML response.</body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder

8.  Create a JSON response template for your content negotiation sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `negotiate.get.json.ftl`
    3.  Type the following in the content box:

        ```json
        {"response": "json"}
        ```

    4.  Click **Create**.

9.  Register the web script with Content Services.

    1.  Open a new tab in the web browser.
    2.  In the new tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    3.  If prompted, log in with the user name `admin` and password `admin`.
    4.  Click **Refresh Web Scripts**. (The number of web scripts will increase.)

    Content negotiation is declared by listing the mappings between an incoming preferred MIME type and a web script response format. In your sample, the HTML and JSON response formats are mapped to the `text/html` and application/json MIME types, respectively:

    ```xml
    ...
    <negotiate accept="text/html">html</negotiate>
    <negotiate accept="application/json">json</negotiate>
    ...
    ```

10. Type the following in your command line to test that your sample web script responds appropriately to content negotiation by explicitly requesting JSON:

    ```bash
    curl -H "Accept: application/json" "http://localhost:8080/alfresco/service/negotiate"
    ```

    The response is:

    ```json
    {"response": "json"}
    ```

11. Type the following in your command line to test that the best response format is chosen:

    ```bash
    curl -H "Accept: text/xml,text/*" "http://localhost:8080/alfresco/service/negotiate"
    ```

    This time the response is:

    ```xml
    <html><body>HTML response.</body></html>
    ```

Your sample web script does not provide an XML response format so cannot respond to the preferred `text/xml` MIME type; 
however, it can respond with the HTML response format that matches the second preference of `text/*`.

## Configuring a web script

When developing a web script, you can implement capabilities that provide flexibility in how they behave. The 
Web Script Framework supports this by allowing each web script to carry a configuration file, which the web script can 
interrogate to alter its behavior.

This task demonstrates how to create a web script whose response is driven by a configuration file.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a web script description document for your configuration sample:

    1.  In the Create menu, select XML.
    2.  Enter the name for the web script in the **Name** field as: `configuration.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>Configuration Sample</shortname>
          <description>Response driven from configuration</description>
          <url>/config</url>
          <authentication>user</authentication>
        </webscript>
        ```

    4.  Click **Create**.

    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

5.  Create a configuration file for your configuration sample:

    1.  In the Create menu, select **XML**.
    2.  Enter the name in the **Name** field: `configuration.get.config.xml`
    3.  Type the following in the content box:

        ```xml
        <greeting>
          <text>Hello</text>
          <repeat>3</repeat>
        </greeting>        
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

6.  Create a controller script for your configuration sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the **Name** field: `configuration.get.js`
    3.  Type the following in the content box:

        ```javascript
        var greeting = new XML(config.script); 
        model.repeat = parseInt(greeting.repeat);
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

7.  Create a response template for your configuration sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the **Name** field, such as: `configuration.get.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <#list 1..repeat as i>
            ${config.script.greeting.text}
        </#list>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

8.  Register the web script with Content Services.

    1.  In a web browser, create a new tab.
    2.  In the newly created tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    3.  If prompted, log in with the user name `admin` and password `admin`.
    4.  Click **Refresh Web Scripts**. The number of web scripts available will increment.

    The configuration file name `configuration.get.config.xml` adheres to the naming convention defined by the Web Script Framework. Configuration file names are structured as: `<web script id>.<http method>.config.xml`.

    The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document. The `<http method>` specifies which HTTP method initiates the web script and must be the same as the associated web script description document.

    Finally, all configuration file names must end with `.config.xml`, which indicates to the Web Script Framework that the file is a configuration file.

    Configuration is expressed as any valid XML. In your sample, you specify the greeting text to render and the number of times to repeat the greeting. Controller scripts access the configuration XML through the root object named `config.script`. Additionally, E4X, a JavaScript XML API, is used to traverse the XML structure and extract values.

    ```javascript
    ...
    var greeting = new XML(config.script); 
    model.repeat = greeting.repeat; 
    ... 
    ```

    Your sample extracts the number of times to repeat the greeting from the configuration XML and places the value into the Web script model with the name `repeat`.

9.  Test your configuration sample by typing the following in your command line:

    ```bash
    curl -uadmin:admin "http://localhost:8080/alfresco/service/config"
    ```

    The response is:

    ```text
    Hello 
    Hello 
    Hello
    ```

You have altered the configuration by modifying the configuration XML file, or by creating a new configuration file of 
the same name in a web script location that comes earlier in the Web Script Framework search path.

## Creating a web script using cache controls

Caching is an important aspect of web scripts and is often required to support high-load applications such as websites 
backed by Content Services. You should consider caching when developing web scripts.

This task demonstrates cache controls by creating a sample web script that sets the last modified date.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create a web script description document for your cache sample:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `cache.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>Cache example</shortname>
          <description>Demonstrate cache controls</description>
          <url>/cache</url>
          <authentication>user</authentication>
          <cache>
            <never>false</never>
            <mustrevalidate/>
          </cache>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

4.  Create a controller script for your cache sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `cache.get.html.ftl`
    3.  Type the following in the content box:

        ```text
        Cached response
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Register the web script with Content Services.

    1.  Create a new browser tab.
    2.  In the browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    3.  If prompted, log in with the user name `admin` and password `admin`.
    4.  Click **Refresh Web Scripts**.

    A message indicates there is an additional web script.

    >**Note:** The Web Script Framework does not perform any caching of its own. It ensures correct HTTP headers are transmitted based on the web script cache controls for an external cache to interpret.

6.  Test your cache sample with cURL by typing the following in your command line:

    ```bash
    curl -uadmin:admin -v "http://localhost:8080/alfresco/service/cache"
    ```

    The returned response is similar to the following, where the `Cache-Control` and `Last-Modified` headers are present:

    ```text
    * About to connect() to localhost port 8080 (#0)
    * Trying ::1... connected
    * Connected to localhost (::1) port 8080 (#0)
    * Server auth using Basic with user ‘admin’
    > GET /alfresco/service/cache HTTP/1.1
    > Authorization: Basic YWRtaW46YWRtaW4=
    > Host: localhost:8080
    > Accept: */*
    >
    < HTTP/1.1 200 OK
    < Server: Apache-Coyote/1.1
    < Cache-Control: must-revalidate
    < Last-Modified: Tue, 02 Feb 2010 09:07:05 GMT
    < Content-Type: text/html;charset=UTF-8
    < Content-Length: 16
    < Date: Tue, 02 Feb 2010 09:07:05 GMT
    ```

## Processing multipart forms

This task demonstrates how to handle `multipart/form-data` form submits by creating two web scripts for the 
following functions:

* Present a form that allows the selection of a file along with title and description
* Upload the selected file into the repository

1.  Log in to Alfresco Share

    1.  Open a web browser and enter the following URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a web script description document for your form:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `multipart.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>File Upload Sample</shortname>
          <description>Form to upload file.</description>
          <url>/multipart</url>
          <authentication>user</authentication>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

5.  Create an HTML response template for your form:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `multipart.get.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
          <body>
            <form action="${url.service}" method="post" enctype="multipart/form-data">
              File: <input type="file" name="file"><br>
              Title: <input name="title"><br>
              Description: <input name="description"><br>
              <input type="submit" name="submit" value="Upload">
            </form>
          </body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

6.  Create a web script description document for your upload web script:

    1.  In the Create menu, select **XML**.
    2.  Enter the name in the Name field: `multipart.post.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>File Upload Sample</shortname>
          <description>Handling of multipart/form-data requests.</description>
          <url>/multipart</url>
          <authentication>user</authentication>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

7.  Create a controller script for your upload web script:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `multipart.post.js`
    3.  Type the following in the content box:

        ```javascript
        // extract file attributes
        var title = args.title;
        var description = args.description;
        
        // extract file
        var file = null;
        for each (field in formdata.fields)
        {
          if (field.name == "file" && field.isFile)
          {
            file = field;
          }
        }
        
        // ensure file has been uploaded
        if (file.filename == "")
        {
          status.code = 400;
          status.message = "Uploaded file cannot be located";
          status.redirect = true;
        }
        else
        {
          // create document in company home from uploaded file
          upload = companyhome.createFile(file.filename) ;
          upload.properties.content.guessMimetype(file.filename);
          upload.properties.content.write(file.content);
          upload.properties.title = title;
          upload.properties.description = description;
          upload.save();
          // setup model for response template
          model.upload = upload;
        }
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

8.  Create a response template for your upload web script:

    1.  In the Create menu, select **plain Text**.
    2.  Enter the name in the Name field: `multipart.post.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
          <body>
            Uploaded ${upload.name} of size ${upload.properties.content.size}.
          </body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

9.  Register the web scripts with Alfresco.

    1.  Switch to a new browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Click **Refresh Web Scripts**.

    A message indicates there are two additional web scripts.


Your sample form consists of only three input fields, where one is of type `file`. The form posts its content to the 
action URI as identified by the root object `url.service`, which for this sample is `/multipart` and specifies the 
`multipart/form-data` content type.

```xml
... 
<form action="${url.service}" method="post" enctype="multipart/form-data"> 
...
```

Your two web scripts are mapped to the same URI. However, the form is attached to the HTTP GET method and the upload is 
attached to the HTTP POST method, which allows your form to post to the same URI as the form itself.

When `multipart/form-data` is posted to a web script, the Web Script Framework provides a special root object named 
`formdata` that allows access to the posted request through a simple API, hiding the complexities of parsing the request 
directly. The API provides access to each form field, including its name and value. For form fields of type `file`, 
the content of the uploaded file is also provided. To simplify even further, all fields other than those of type file 
are also added to the root objects `args` and `argsM`. Your upload web script extracts the form title and description 
fields from the `args` root object and locates the uploaded file through the `formdata` root object.

```javascript
...
var title = args.title;
var description = args.description;
var file = null;
for each (field in formdata.fields)
{
  if (field.name == "file" &amp;&amp; field.isFile)
  {
    file = field;
  }
}
...
```

If a file has been uploaded, the upload web script creates a new document within the Alfresco content repository under 
the `Company Home` folder. The document is named after the file name of the uploaded file and its content is taken from 
the file content.

```javascript
...
upload = companyhome.createFile(file.filename) ;
upload.properties.content.guessMimetype(file.filename);
upload.properties.content.write(file.content);
...
```

The created document is placed into the web script model, allowing the upload response template to render a message 
confirming the name and size of the uploaded file.

```javascript
...
model.upload = upload;
...
```

### Testing the upload web script

This task demonstrates how to test an upload web script.

1.  Launch the upload form:

    1.  Open a web browser and enter the following URL: `http://localhost:8080/alfresco/service/multipart`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Fill in the file, title, and description fields of the form.
    4.  Click **Upload**.

    If you see a confirmation message detailing the name and size of the uploaded file, your web script is working.

2.  Locate the created document in the repository.

    1.  Open a web browser and enter the following URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Click the Repository link in the Share header and locate the document whose name matches the uploaded file name.
    4.  Examine the properties and content of the created document.

## Creating request processing web scripts

When performing an HTTP POST to a web script, the posted request body often contains content that needs processing by 
the web script. To allow access to the request body, the Web Script Framework provides a special root object named 
`requestbody` that represents the content of the request. The `requestbody` is a `ScriptContent` object allowing access 
to the request content either as a string or as a content stream.

This task demonstrates request processing by creating a web script, which simply responds with the content of the HTTP request.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create a web script description document for your request body sample:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `requestbody.post.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>Request Body Sample</shortname>
          <description>Render the request body in the response</description>
          <url>/requestbody</url>
          <authentication>user</authentication>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

4.  Create a controller script for your request body sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `requestbody.post.js`
    3.  Type the following in the content box:

        ```javascript
        model.requestcontent = requestbody.content;
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

5.  Create an HTML response template for your request body sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `requestbody.post.html.ftl`
    3.  Type the following in the content box:

        ```javascript
        ${requestcontent}
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

6.  Register the web scripts with Content Services.

    1.  In a new web browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Click **Refresh Web Scripts**.

    A message indicates there is an additional web script.

    Your example consists of just two lines of code. The controller script extracts the request content from the `requestbody` root object and places it into the Web script model under the name `requestcontent`. The response template simply outputs the model value into the response.

7.  Test this web script with cURL by typing the following in your command line:

    ```bash
    curl -uadmin:admin -H "Content-Type: application/json" --data-binary "{\"request\":\"body\"}" "http://localhost:8080/alfresco/service/requestbody"
    ```

    This posts a request body of `{"request": "body"}` to your web script, which in turn responds with: `{"request": "body"}`

Often the content posted in a request is structured using data formats such as XML or JSON, which the web script has to 
parse. Parser code is generally painful to develop, so the Web Script Framework provides a mechanism known as a 
Format Reader that parses a request of a given MIME type into an object that represents the request content. The object 
is then supplied to the controller script, which can interrogate the object to extract request content.

### Extending the request processing web script

You can extend the request processing web script example by adding a new controller script that uses the `json` root 
object provided by the Web Script Framework.

This task demonstrates how to extend the request processing web script.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create an additional controller script for your request body sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name in the Name field: `requestbody.post.json.js`
    3.  Type the following in the content box:

        ```javascript
        model.requestcontent = json.get("request");
        ```

    4.  Click **Create**.

4.  Re-register the web script with Content Services.

    1.  In a web browser tab, enter the URL: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Click **Refresh Web Scripts**.

    Format Readers are not invoked automatically. You have to ask the Web Script Framework to convert the response and provide the resulting object to the controller script. You can do this by creating a controller script with an alternate naming convention: `<web script id>.<httpmethod>.<format>.js`

    The difference here is that the controller script file name also contains the `<format>` segment, indicating to the Web Script Framework that requests of the specified format are handled by this controller and require the converted root object.

    In the example, you create a new controller script named requestbody.post.json.js to handle JSON posted requests. This controller now has access to the `json` root object, as provided by the JSON Format Reader, and can extract values directly from the JSON document.

    ```javascript
    ...
    model.requestcontent = json.get("request");
    ...
    ```

5.  Test the updated web script with cURL by typing the following in your command line:

    ```bash
    curl -uadmin:admin -H "Content-Type: application/json" --data-binary
    "{\"request\": \"body\"}" "http://localhost:8080/alfresco/service/requestbody"
    ```

    This posts a request body of `{"request": "body"}` to your web script, which in turn responds with: `body`

    Instead of echoing the complete request as before, the updated controller script extracts the value named request from the JSON document and places it into the web script model, which in this case is the value `body`.

## Creating a photo search script

This tutorial shows you how to develop a script that provides the ability to search a site for photos.

There are no prerequisites for this tutorial.

This tutorial takes you through the creation of a simple web script to search a site for photos.

1.  Create the web script description file:In your favorite editor create the file `photo-search.get.desc.xml` with the following contents:

    ```xml
    <webscript>
       <shortname>Photo Search</shortname>
       <description>Searches the specified site for photos</description>
       <url>/photo-search/{site}?maxResults={maxResults?}</url>
       <format default="html">extension</format>
       <authentication>user</authentication>
    </webscript>
    ```

    Save the file in the following directory `<installLocation>/tomcat/shared/classes/alfresco/extension/templates/webscripts`. You will need to create the `templates` and `webscripts` sub-directories as they do not exist by default. You might also need to change this directory path if you are using a Java application server other than Tomcat.

2.  In the same directory create the JavaScript controller, `photo-search.get.js`:

    ```javascript
    const DEFAULT_MAX_RESULTS = 500;
    const SITES_SPACE_QNAME_PATH = "/app:company_home/st:sites/";
    
    function doSearch(siteId, maxResults)
    {
        var alfQuery =
            'ASPECT:"exif:exif"' +
            ' AND PATH:"' + SITES_SPACE_QNAME_PATH + '/cm:' + siteId +
            '/cm:documentLibrary//*"' +
            ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}thumbnail"' +
            ' AND NOT TYPE:"{http://www.alfresco.org/model/content/1.0}folder"';
    
        var queryDef = {
            query: alfQuery,
            language: "fts-alfresco",
            page: {maxItems: maxResults},
            templates: []
        };
    
        return search.query(queryDef);
    }
    
    function main()
    {
        var siteId = url.templateArgs.site;
        var maxResults = (args.maxResults !== null) ? parseInt(args.maxResults) : 
            DEFAULT_MAX_RESULTS; 
    
        var nodes = doSearch(siteId, maxResults);
    
        model.nodes = nodes;
        model.site = siteId;
    }
    
    main();
    ```

3.  Now create a template file, `photo-search.get.html.ftl`, in the same directory, to display some information about the photos found:

    ```xml
    <p>List of photos in site: ${site}</p>
    <table border="3">
      <tr><th>File name</th><th>Properties</th><th>Manufacturer</th><th>dateTimeOriginal</th><th>focalLength</th></tr>
    
      <#assign manufacturer = "{http://www.alfresco.org/model/exif/1.0}manufacturer"/>  
      <#assign dateTimeOriginal = "{http://www.alfresco.org/model/exif/1.0}dateTimeOriginal"/>  
      <#assign focalLength = "{http://www.alfresco.org/model/exif/1.0}focalLength"/>  
    
      <#list nodes as node>
        <tr>
          <td>${node.name}</td>
          <td>
            <#assign keys = node.properties?keys/>
            <#list keys as k>
              ${k}
            </#list>
         </td>
          <td>
            <#if node.properties[manufacturer]?exists>
              ${node.properties[manufacturer]}
            </#if>
          </td>
          <td>
            <#if node.properties[dateTimeOriginal]?exists>
              ${node.properties[dateTimeOriginal]?date}
            </#if>
          </td>
          <td>
            <#if node.properties[focalLength]?exists>
              ${node.properties[focalLength]}
            </#if>
          </td>
        </tr>
      </#list>
    </table>
    ```

    This FreeMarker template displays some EXIF information for each photo.

4.  Restart Content Services to ensure that the newly created `templates/webscripts` directory is added to the Tomcat classpath.

5.  In Share, create a sample site such as `sample-site`.

6.  Upload a number of different files, including some photos, into your sample site's document library.

7.  Run the script using a URL such as `http://localhost:8080/alfresco/service/photo-search/<sample-site>`. You can change `<sample-site>` to be the name of a site you have created.

## Developing a Folder Listing web script

This tutorial describes how to create a Folder Listing web script that mimics the behavior of the `dir` command in 
Microsoft Windows, or `ls` in Linux and Mac OS X.

Given a folder path, the web script lists the contents of that folder in the repository in abbreviated or verbose form 
depending on a user provided flag.

### Creating a description document

This task creates a web script description document for a Folder Listing web script.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`

    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a web script description document for the Folder Listing example:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `dir.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript> 
          <shortname>Folder Listing Utility</shortname> 
          <description>Sample demonstrating the listing of folder contents</description>
          <url>/dir/{folderpath}?verbose={verbose?}</url> 
          <format default="html">extension</format> 
          <authentication>user</authentication> 
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.


You now have a web script package named`/org/example` where you will place all your component files for the Folder 
Listing web script. You have already placed the description document there, which is named `dir.get.desc.xml`.

Your Folder Listing web script defines the following short name and description:

```xml
<shortname>Folder Listing Utility</shortname>
<description>Sample demonstrating the listing of folder contents</description>
```

As the Folder Listing web script queries the repository, you must ensure that only authenticated users have access. 
This means the web script will only return folder contents that the authenticated user has permission to see.

Your Folder Listing web script defines the following level of authentication: `<authentication>user</authentication>`

### Creating a controller script

The description document describes the Folder Listing web script and a JavaScript controller script implements its 
behavior. The controller establishes the folder to list from the invoked URI and query the repository for that folder 
ensuring error conditions are catered for.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create a web script controller script for your Folder Listing example:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name for the web script in the Name field: `dir.get.js`
    3.  Type the following in the content box:

        ```javascript
        // extract folder listing arguments from URI
        var verbose = (args.verbose == "true" ? true : false);
        var folderpath = url.templateArgs.folderpath;
        
        // search for folder within Alfresco content repository
        var folder = roothome.childByNamePath(folderpath);
        
        // validate that folder has been found
        if (folder == undefined || !folder.isContainer) {
           status.code = 404;
           status.message = "Folder " + folderpath + " not found.";
           status.redirect = true;
        }
        
        // construct model for response template to render
        model.verbose = verbose;
        model.folder = folder; 
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

The component script file name `dir.get.js` adheres to the naming convention defined by the Web Script Framework. 

Your Folder Listing example now comprises the following two component files:

1.  `/org/example/dir.get.desc.xml`
2.  `/org/example/dir.get.js`

The Web Script Framework knows that both these files are related to the same web script, as they share web script 
package, web script ID, and HTTP method.

### Parsing the web script URI

A web script is invoked when a URI is requested that matches one of the URI templates defined by the web script. The 
web script might need to access the requested URI to allow it to extract arguments that might have been passed in as 
URI query parameters or embedded as values in the URI path.

Your Folder Listing web script defines the following URI template with one URI-path token and one query parameter token: 
`<uri>/dir/{folderpath}?verbose={verbose?}</uri>`

To extract the values provided for the `{folderpath}` and `{verbose}` tokens, your Folder Listing controller script uses 
the following JavaScript:

```javascript
...
var verbose = (args.verbose == "true" ? true : false);
var folderpath
...
```

The `args` root object is a special object provided by the Web Script Framework to all controller scripts. 
It represents a map of the URI query-parameter values indexed by their name. In this case, the controller script is 
extracting the `verbose` query parameter. If the query parameter is not specified on the URI, the returned value is null.

The `url.templateArgs` root object is another special object provided by the Web Script Framework. It represents a map 
of all values provided for tokens in the URI path, indexed by token name. In this case, the controller script is 
extracting the value for the `folderpath` token. URI-path values are never null.

Imagine a client has made the following URI request: `/dir/Company%20Home?verbose=true`

The resulting value of `verbose` is true and the value of `folderpath` is `Company Home`.

### Calling services

Controller scripts have access to services provided by Content Services. This allows a web script to query or 
perform operations against content residing in the repository. Services are exposed as root objects and each service 
provides its own API to program against.

Your Folder Listing web script needs to retrieve the folder value provided on the URI, identified by the 
`{folderpath}` token:

```javascript
...
var folder = roothome.childByNamePath(folderpath);
...
```

The `roothome` root object is a special object provided by the Web Script Framework, which represents the root folder 
in the repository. From this object, it is possible to navigate through the content repository folder hierarchy or find 
sub-folders by name. Your controller script finds a sub-folder using the folder name provided in the URI.

There are many other root objects available to controller templates.

### Constructing the model

The controller script creates a model for subsequent rendering by a response template. A model is a map of values 
indexed by their name, which can be read from and written to by the controller script.

The Folder Listing web script adds the verbose flag and retrieved folder to the model:

```javascript
...
model.verbose = verbose;
model.folder = folder;
...
```

The `model` root object is provided to the controller script by the Web Script Framework. All items added to the model 
are available to the response template.

### Creating a response template

The final stage of web script execution is to render a response back to the initiating client in an appropriate format 
based on the client's preference. A response template written in FreeMarker is responsible for rendering each format 
provided by the web script.

The Folder Listing web script provides a response in HTML for rendering to a web browser, and one in JSON for consumption 
by other clients. The response lists all the documents and folders contained within the folder retrieved by the 
controller script as specified in the Folder Listing web script URL.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a web script response template for your Folder Listing example:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name for the web script in the Name field: `dir.get.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
          <head>
            <title>Folder ${folder.displayPath}/${folder.name}</title>
          </head>
          <body>
            <p>Alfresco ${server.edition} Edition v${server.version} : dir</p>
            <p>Contents of folder ${folder.displayPath}/${folder.name}</p>
            <table>
            <#list folder.children as child>
               <tr>
                   <td><#if child.isContainer>d</#if></td>
                   <#if verbose>
                      <td>${child.properties.modifier}</td>
                      <td><#if child.isDocument>
                         ${child.properties.content.size}</#if></td>
                      <td>${child.properties.modified?date}</td>
                   </#if>
                   <td>${child.name}</td>
               </tr>
            </#list>
            </table>
          </body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate to the org/example folder using the breadcrumb trail.

    The component script file name`dir.get.html.ftl`, adheres to the naming convention defined by the Web Script Framework. All response template file names must end with `.ftl`. The `<web script id>` identifies the web script and must be the same as the web script ID defined in the file name of the associated web script description document. The `<http method>` specifies which HTTP method will initiate the web script and again must be the same as the associated web script description document. The format rendered by the response template is represented by `<format>`, the Web Script Framework abbreviation for a MIME type.

Your Folder Listing example now has the following three component files:

1.  `/org/example/dir.get.desc.xml`
2.  `/org/example/dir.get.js`
3.  `/org/example/dir.get.html.ftl`

The Web Script Framework knows that all of these files are related to the same web script as they share web script 
package, web script ID, and HTTP method.

#### Accessing the model

Response templates have access to the model created by the controller script. Each named value added to the model is 
accessible as a template root object by its respective model name.

Your Folder Listing controller script placed two values into the model: one named folder, a folder object, and the 
other named verbose, a boolean. Your response template uses these two values to drive the rendered output on the response:

```xml
...
Contents of folder ${folder.displayPath}/${folder.name}
. . .
<#list folder.children as child>
. . .
<#if verbose>
. . .
</#if>
</#list>
...
```

The `folder` object renders properties of the folder and iterates through its children while the `verbose` flag 
determines if extra detail should be output.

#### Accessing services

As well as model root objects, response templates have access to services provided by the Content Services 
server, allowing a response template to directly query or navigate parts of the repository or access the context within 
which the web script is executing, such as the currently authenticated user.

Although response templates can perform their own logic, this should not be encouraged. It is better to implement 
web script logic in controller scripts, allowing the response template to focus only on rendering the output. 
This allows the easy creation of multiple response templates, as logic does not have to be duplicated in each. 
It also means logic is encapsulated in one place, so changes to logic are centralized.

The Folder Listing web script first renders details about the server:

`Alfresco ${server.edition} Edition v${server.version} : dir`

The `server` root object is a special object provided by the Web Script Framework, which represents the server within 
which the web script is executing. In this case, the response template simply accesses properties of the server.

There are many other root objects available to response templates.

### Registering and testing web scripts

The web script index provides some administration of web scripts, in particular, for those developers creating new web scripts.

With a complete Folder Listing web script implementation, you can register and test your web script.

1.  Register the web script with Content Services:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click **Refresh Web Scripts** on the Web Scripts Home page.

    The Web Script Framework find all web scripts and registers them with Content Services. When there is a problem registering a web script, the index provides a list of web scripts that failed registration along with the reason for the failure.

3.  Perform your first test:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/dir/Company%20Home`
    2.  If you see the contents of the Company Home folder listed, your web script is working.

4.  Check the verbose flag:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/dir/Company%20Home?verbose=true`
    2.  If you see the contents of the Company Home folder listed in verbose form, your web script is working.

5.  Check the error handling of a folder that does not exist:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/dir/doesnotexist`
    2.  If you see an error page detailing a 404 status response, your web script is working.

    When testing status response codes, it is useful to test with the cURL client to access to the status code sent on the HTTP response. For example, to repeat the 'folder does not exist' test with cURL, type the following in your command line:

    `curl -uadmin:admin -v "http://localhost:8080/alfresco/service/dir/doesnotexist"`

    The returned response is similar to the following where the 404 status code is explicitly logged:

    ```text
    * About to connect() to localhost port 8080 (#0)
    *   Trying ::1... connected
    * Connected to localhost (::1) port 8080 (#0)
    * Server auth using Basic with user 'admin'
    > GET /alfresco/service/dir/doesnotexist HTTP/1.1
    > Authorization: Basic YWRtaW46YWRtaW4=
    > Host: localhost:8080
    > Accept: */*
    > 
    < HTTP/1.1 404 Not Found
    < Server: Apache-Coyote/1.1
    < Cache-Control: no-cache
    < Pragma: no-cache
    < Content-Type: text/html;charset=UTF-8
    < Content-Length: 1487
    < Date: Tue, 26 Jan 2010 10:28:28 GMT
    ```

You have registered and tested a web script implementation. Each time a web script component file is modified, you must 
register the web script again by using the web script index page.

### Creating multiple response templates

A web script can support multiple response formats to allow it to be used by a variety of clients. For example, it can 
render an HTML response for human consumption in a web browser, and a JSON response for machine consumption by other clients.

This task adds support for JSON to the Folder Listing web script, in addition to HTML.

1.  Log in to Alfresco Share:

    1.  In your browser, enter: `http://localhost:8080/share/`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a JSON response template for your Folder Listing example:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name for the web script in the Name field: `dir.get.json.ftl`
    3.  Type the following in the content box:

        ```json
        { 
          "server" : "Alfresco ${server.edition} Edition v${server.version}",
          "folder" :
          {
            "path" : "${folder.displayPath}",
            "name" : "${folder.name}" 
          },
          "children" : [
            <#list folder.children as child>
            {
                "isfolder" : <#if child.isContainer>true<#else>false</#if>,
                <#if verbose>
                "modifier" : "${child.properties.modifier}",
                "size" : <#if child.isDocument>
                  ${child.properties.content.size?c}<#else>null</#if>,
                "modified" : "${child.properties.modified?date}",
                </#if>
                "name" : "${child.name}"
            }<#if child_has_next>,</#if>
          </#list>
          ]
        }
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumb trail.

5.  Register the web script again:

    1.  In a new browser tab, enter: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Click **Refresh Web Scripts**. A message indicates all web scripts have refreshed.

6.  Test your response template:

    1.  Type the following in your command line:

        `curl -uadmin:admin "http://localhost:8080/alfresco/service/dir/Company%20Home.json"`

    2.  If you see the contents of the Company Home folder, your response template is working.

    Each web script supports an unlimited number of response templates; however, there can only be one response template for each format. This is enforced by the naming convention for response templates. Your Folder Listing web script now supports two formats: HTML and JSON.

7.  Type the following in your command line to request the contents of a folder that does not exist in JSON format:

    `curl -uadmin:admin "http://localhost:8080/alfresco/service/dir/doesnotexist.json"`

    The web script responds with an error response, but in JSON format, as the client requested.

    >**Note:** Whenever you change a web script implementation, including adding and removing response templates, you must re-register the web script by using the web script index.

#### Adding a response status code template

Response status code templates allow a web script to render a custom response for a given status code. This is useful 
for providing unique information about a status code or to render a custom human readable interface. Your Folder Listing 
web script returns a 404 (Not Found) status code if the requested folder to list does not exist in the content repository. 
By default, the web script responds with a generic response that provides details about the status including its 
descriptive message. This is useful for diagnosis but might not be consumable by the typical user of the web script. 
You can add a custom response status code template that renders a human readable message when the folder cannot be found.

1.  Log in to Alfresco Share:

    1.  In your browser, enter: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click on the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create the response status code template:

    1.  In the Create menu, select `Plain Text`.
    2.  Enter the name for the web script in the Name field: `dir.get.html.404.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
           <body>
             <p>Alfresco ${server.edition} Edition v${server.version} : dir</p>
             <p>Folder <b>${url.templateArgs.folderpath}</b> not found.</p>
           </body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate back to the folder org/example using the breadcrumb trail.

5.  Test your response code template:

    1.  Type the following in a new browser tab:

        `http://localhost:8080/alfresco/service/dir/doesnotexist`

    2.  If you see the custom message, your response status code template is working.

    As with all web script component files, response status code template file names adhere to a naming convention as defined by the Web Script Framework.

Response status code templates have access to the same root objects as normal web script response templates except the 
default templates `<code>.ftl` and `status.ftl` only have access to the root objects `url`, `status`, `server`, and `date`.

When developing web scripts, leave the implementation of response status code templates until the end as they are not 
essential to their execution. You can test without custom response status code templates, as the Web Script Framework 
will always eventually find the default template `status.ftl` in the root package.

As with all other response templates, adding and removing a response status code template requires you to re-register 
the web script.

### Debugging a controller script

The Content Services server provides a built-in JavaScript Debugger that can be applied to web scripts. It is 
a useful tool for diagnosing the cause of issues and for stepping through the controller scripts of others to learn how 
they have implemented capabilities and used services.

When developing a web script, you might encounter an issue for which the solution is not obvious. In this case, it is 
useful to step through the controller script code line by line to pinpoint the cause of the issue.

>CAUTION: If you are running Content Services on Microsoft Windows as a Service then the debugger might not display. A work around is to start Content Services from the command line for debugging purposes.

1.  Log in:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/index`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Enable the JavaScript Debugger:

    1.  Click **Refresh Web Scripts** on the Web Scripts Home page to ensure the Web Script Framework has cleared its caches.
    2.  Click **List Web Scripts.**
    3.  Click **JavaScript Debugger**.
    4.  Click **Enable** to launch the **JavaScript Debugger**in a separate window.

3.  Invoke your web script:

    1.  In your browser, enter: `http://localhost:8080/alfresco/service/dir/Company%20Home`
    2.  Log in if required using user name `admin` and password `admin`.
    3.  If you see your web script's controller script inside the JavaScript Debugger window, you are ready to debug.

4.  Debug the controller script:

    1.  Click **Step Over** in the JavaScript Debugger to execute the currently highlighted line.
    2.  Interrogate the value of the verbose variable by typing `verbose` in the Expression window of the JavaScript Debugger.
    3.  Interrogate the value of the `{folderpath}` token by typing `url.templateArgs.folderpath` in the Expression window of the JavaScript Debugger.

5.  Continue web script execution:

    1.  Click **Go** in the JavaScript Debugger.
    2.  If you see the output of your web script in the web browser, you have successfully used the JavaScript Debugger.

## Creating a Folder Listing Java-backed web script

A Folder Listing Java-backed web script mimics the behavior of the `dir` command in Microsoft Windows, or `ls` in 
Linux and Mac OS X.The controller script in this implementation is in Java. The client interacts with it through HTTP 
requests and responses. In comparison to an implementation with JavaScript, this allows you to build a library of 
scripted web scripts exposing a well-defined interface and then, over time, replace their implementation with Java, 
if requirements such as performance become critical. As long as the interface does not change, the user will not notice.

### Creating the scripted components of a Folder Listing web script

The first task in creating a Folder Listing web script is to create the scripted components.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Click the Repository link in the Share header.

3.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

4.  Create a web script description document for the Java Folder Listing example:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `javadir.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript>
          <shortname>Folder Listing Utility</shortname>
          <description>Java-backed implementation of listing folder contents
          </description>
          <url>/javadir/{folderpath}?verbose={verbose?}</url>
          <authentication>user</authentication>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

5.  Create a web script response template for your Java Folder Listing example:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name for the web script in the Name field: `javadir.get.html.ftl`
    3.  Type the following in the content box:

        ```xml
        <html>
         <head>
          <title>Folder ${folder.displayPath}/${folder.name}</title>
          </head>
         <body>
           <p>Alfresco ${server.edition} Edition v${server.version} : dir</p>
          <p>Contents of folder ${folder.displayPath}/${folder.name}</p>
          <table>
           <#list folder.children as child>
           <tr>
           <td><#if child.isContainer>d</#if></td>
           <#if verbose>
             <td>${child.properties.modifier}</td>
             <td><#if child.isDocument>
               ${child.properties.content.size}</#if></td>
             <td>${child.properties.modified?date}</td>
           </#if>
           <td>${child.name}</td>
           </tr>
           </#list>
          </table>
         </body>
        </html>
        ```

    4.  Click **Create**.
    5.  Navigate back to the org/example folder using the breadcrumb trail.

The web script description specifies a URI template containing the tokens `{folderpath}` and `{verbose?}`. The 
`folderpath` token represents the folder to list and the `verbose` URI argument specifies whether a verbose listing 
is required or not. The HTML response template renders the contents of the specified folder, taking into account the 
`verbose` flag. It does this by accessing the web script model values named `folder` and `verbose`.

The web script is not yet complete, as it is still missing its controller. The controller must parse the URI to extract 
the token values, interact with the repository to locate the specified folder, and populate the model for subsequent 
rendering by the HTML response template.

It is also possible to create these files as stand-alone files using an external text editor. Once these files are 
created you could locate them as follows:

```text
./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.desc.xml
./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.html.ftl     
```

### Developing a controller for a Folder Listing Java-backed web script

To complete the Folder Listing Java-backed web script, you must create its controller. The controller parses the URI to 
extract the token values, interacts with the repository to locate the specified folder, and populates the model for 
subsequent rendering by the HTML response template.

This develops a controller in Java.

1.  Create the Java class for the Folder Listing web script:

    1.  Launch your Java IDE.
    2.  Create a Java package called `org.example`
    3.  Create a Java class called `JavaDir`
    4.  Implement the Java class as follows:

        ```java
        package org.example;
        
        import java.util.HashMap;
        import java.util.Map;
        
        import org.alfresco.repo.model.Repository;
        import org.alfresco.service.cmr.repository.NodeRef;
        import org.springframework.extensions.webscripts.Cache;
        import org.springframework.extensions.webscripts.DeclarativeWebScript;
        import org.springframework.extensions.webscripts.Status;
        import org.springframework.extensions.webscripts.WebScriptException;
        import org.springframework.extensions.webscripts.WebScriptRequest;
        
        public class JavaDir extends DeclarativeWebScript
        {
        	private Repository repository;
        
        	public void setRepository(Repository repository)
        	{
        		this.repository = repository;
        	}
        
        	protected Map<String, Object> executeImpl(WebScriptRequest req,
        			Status status, Cache cache)
   			{
        
        		NodeRef folder;
        		
        		// extract folder listing arguments from URI
        		String verboseArg = req.getParameter("verbose");
        		Boolean verbose = Boolean.parseBoolean(verboseArg);
        		
        		Map<String, String> templateArgs =
        				req.getServiceMatch().getTemplateVars();
        		String folderPath = templateArgs.get("folderpath");
        		
        		if (folderPath.equals("Company Home")){
        			
        			folder = repository.getCompanyHome();	
        						
        		}
        		else {
        			String nodePath = "workspace/SpacesStore/" + folderPath;
        			folder = repository.findNodeRef("path", nodePath.split("/"));
        		}
        		
        		// validate that folder has been found
        		if (folder == null)
        		{
        			throw new WebScriptException(Status.STATUS_NOT_FOUND,
        					"Folder " + folderPath + " not found");
        		}
        
        		// construct model for response template to render
        		Map<String, Object> model = new HashMap<String, Object>();
        		model.put("verbose", verbose);
        		model.put("folder", folder);
        		return model;
  			}
        }
        ```

    5.  Compile the Java class.

        >**Note:** You will need to link against the various required classes that are imported, such as `DeclarativeWebScript`. To do this you will need to import the Alfresco SDK into your IDE workspace, or you can import the various Alfresco projects into your workspace from the source code. You can then configure your project properties to include the required projects and libraries into your Java Build Path. Projects that need to be linked could include `Core`, `Data Model`, `Deployment`, `MBean`, `Remote API`, `Repository`, and `Web Framework Commons`. Libraries could include the `spring-webscripts` and `spring-webscripts-api` JAR files. The projects and libraries you need to include will depend on what your Java-backed web script actually needs to do.

    6.  Place the compiled Java class into the folder `<install_dir>/tomcat/webapps/alfresco/WEB-INF/classes/org/example`.

2.  Create the Spring Framework configuration for registering your web script Java class:

    1.  Create an XML file called `javadir-context.xml`.
    2.  Register the Java class as follows:

        ```xml
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN 2.0//EN'
          'http://www.springframework.org/dtd/spring-beans-2.0.dtd'>
        <beans>
          <bean id="webscript.org.example.javadir.get"
            class="org.example.JavaDir" parent="webscript">
          <property name="repository" ref="repositoryHelper"/>
          </bean>
        </beans>
        ```

    3.  Place the Spring Framework configuration file into the extension classpath of the Content Services server, in this case `<install_dir>/tomcat/shared/classes/alfresco/extension/javadir-context.xml`.

        >**Important:** When deploying a Java-backed web script to the Content Services server, you must restart the server to fully register the web script.

3.  In Share, create a folder test under the Repository root.

4.  Upload some sample content files to the `test` folder.

5.  Test your Java-backed web script by typing the following in a tab of your web browser:

    `http://localhost:8080/alfresco/service/javadir/Company%20Home/test?verbose=true`

    If successful, a verbose listing of the contents of the test folder displays.

6.  Test your Java-backed web script again by typing the following in your web browser:

    `http://localhost:8080/alfresco/service/javadir/Company%20Home`

    If successful, a verbose listing of the contents of the Company Home folder displays. Externally, this Folder Listing web script looks and behaves the same as its scripted web script implementation.

For ease of reference here are the standalone files that were created in this project, along with their locations:

```text
./tomcat/shared/classes/alfresco/extension/javadir-context.xml
./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.desc.xml
./tomcat/shared/classes/alfresco/extension/templates/webscripts/org/example/javadir.get.html.ftl
./tomcat/webapps/alfresco/WEB-INF/classes/org/example/JavaDir.class     
```

### Parsing the URI

Your Folder Listing web script defines the following URI template with one URI-path token and one query parameter 
token: `<uri>/javadir/{folderpath}?verbose={verbose?}</uri>`

To extract the values provided for the `{folderpath}` and `{verbose}` tokens, the following Java code is used:

```java
...
String verboseArg = req.getParameter("verbose");
Boolean verbose = Boolean.parseBoolean(verboseArg);
Map<String, String> templateArgs = req.getServiceMatch().getTemplateVars();
String folderPath = templateArgs.get("folderpath");
...
```

Access to the request that invoked the web script is through the `req` parameter of the `executeImpl()` method. This 
parameter encapsulates everything about the request, including its URI, query parameters, and header values. In particular, 
the `getParameter()` method of the request provides access to query parameters, which your web script uses to retrieve 
the value of the verbose flag. If the query parameter is not specified on the URI, the returned value is null.

Access to tokens specified in the URI path is also through the `req` parameter. A map of all URI-path token values 
indexed by token name is provided by `req.getServiceMatch().getTemplateVars()`. Your web script uses this map to 
retrieve the value of the folderpath token. URI-path token values are never null.

Imagine a client has made the following URI request: `/javadir/Company%20Home?verbose=true`

The resulting value of `verbose` is true and the value of `folderpath` is `Company Home`.

### Calling services

As a Java-backed web script, all services provided by the Content Services server are available for use. Any 
Java API within the server process, subject to security controls, is accessible.

Access to services is provided through Dependency Injection (DI); instead of the Java-backed web script locating its 
dependent services, the dependent services are handed to the web script.

Content Services uses the Spring Framework for its Dependency Injection capabilities. This means that 
dependencies are specified in a separate XML configuration file as part of the Java-backed web script registration. 
For each dependency, the Java-backed web script provides a setter method for accepting a reference to the dependent 
service. The Spring Framework invokes each of the setter methods with the appropriate configured dependency during the 
initialization of the Java-backed web script. By the time the web script is executed, all dependent services are 
available within the `executeImpl()` method.

Your Folder Listing web script must locate the folder within the repository, identified by the `folderpath` token. 
To accomplish this, the web script injects a Repository service that provides some simple content repository access 
capabilities.

```java
...
public class JavaDir extends DeclarativeWebScript
{
  private Repository repository;
  public void setRepository(Repository repository)
  {
    this.repository = repository;
  }
  protected Map<String, Object> executeImpl(WebScriptRequest req,
    Status status, Cache cache)
  {
    ...
		if (folderPath.equals("Company Home")){		
			folder = repository.getCompanyHome();	
		}
		else {
			String nodePath = "workspace/SpacesStore/" + folderPath;
			folder = repository.findNodeRef("path", nodePath.split("/"));
		}    ...
   }
}
```

### Setting the response status code

A web script uses a response status code to inform the calling client of its execution outcome. In Java, exceptions are 
often used for this and Java-backed web scripts can follow suit.

The Folder Listing web script validates that the provided folder path actually exists in the repository using the 
following code pattern:

```java
...
if (folder == null)
{
   throw new WebScriptException(Status.STATUS_NOT_FOUND,
    "Folder " + folderPath + " not found");
}
...
```

The `WebScriptException` class is a special kind of exception supported by the Web Script Framework, which carries a 
status code and message. Whenever a web script throws this kind of exception, the Web Script Framework translates it 
into the equivalent status on the HTTP response. All other exceptions are caught by the Web Script Framework and 
translated into the 500 status code, which means an internal error occurred. In all cases, the status response template 
has access to details such as the status code, status message, and exception call stack. Throwing an exception is not 
always ideal, so the Web Script Framework provides another approach to setting the response status code. The `executeImpl()` 
method is passed a Status object, which allows the web script to set the status explicitly.

Your Folder Listing Web script can implement folder validation using the following alternate code:

```java
...
if (folder == null)
{
   status.setCode(Status.SC_NOT_FOUND);
   status.setMessage("Folder " + folderPath + " not found");
   status.setRedirect(true);
   return;
}
...
```

One advantage of setting the status explicitly is that the web script can control whether a status response template is 
used to render the status through the `setRedirect()` method. Exceptions can be handled in a similar manner:

```java
...
catch(ConstraintException e)
{
  status.setCode(Status.SC_FORBIDDEN);
  status.setMessage("Cannot create folder");
  status.setException(e);
  status.setRedirect(true);
}
...      
```

The `setException()` method allows the web script to associate the status with the caught exception.

### Constructing the model

The controller creates a model for subsequent rendering by a response template. A model is a map of values indexed by 
name. In Java, the model is simply returned from the `executeImpl()` method as a `Map`.

The Folder Listing web script constructs a `HashMap` and places the `verbose` flag and located `folder` into it:

```java
...
  Map<String, Object> model = new HashMap<String, Object>();
  model.put("verbose", verbose);
  model.put("folder", folder);
  return model;
...
```

The model is then subsequently available to response templates, which can use the values to render the output. Values 
placed into the map by Java are converted to values that the FreeMarker template language can access. For example, 
your Java Folder Listing web script places a `NodeRef` into the model under the name `folder`, which it received from 
the `Repository` service. A `NodeRef` represents a reference to an object residing in the content repository. The 
Web Script Framework converts `NodeRefs` into full objects so that FreeMarker templates can easily reference their 
object properties and methods as demonstrated by your Folder Listing response template:

`Contents of folder ${**folder**.displayPath}/${**folder**.name}`

A Java-backed web script does not have to create a model. In this case, the `executeImpl()` method can return null.

### Registering a Java-backed web script

You must register a Java-backed web script with the Web Script Framework through Spring Framework configuration, which 
supports the notion of a bean: a declaration of a Java class instance.

Each Java-backed web script is defined by its own bean declaration. For example, the Java Folder Listing web script is 
declared as follows:

```xml
...
<beans>
...
  <bean id="webscript.org.example.javadir.get"
   class="org.example.JavaDir" parent="webscript">
...
  </bean>
...
</beans>
```

Spring beans have a unique identifier through their `id` attribute and construct an instance of the Java class as named 
through their `class` attribute. The Web Script Framework uses the following bean `id` naming convention for locating 
Java-backed web scripts:

`webscript.<web script package>.<web script id>.<http method>`

The `<web script package>`, `<web script id>`, and `<http method>` bind the Java class to the associated web script. 
The `class` attribute refers to the Java class implementing the Java-backed web script. Finally, all web script bean 
declarations must have the parent `'webscript`.

In this tutorial the bean file was located at:

```text
./tomcat/shared/classes/alfresco/extension/javadir-context.xml
```

### Declaring service dependencies

The Spring bean is where service dependencies are declared.

The Folder Listing web script declares a single dependency on the `Repository` service as follows:

```xml
...
<bean id="webscript.org.example.javadir.get"
  class="org.example.JavaDir" parent="webscript">
** <property name="repository" ref="repositoryHelper"/>**
</bean>
...    

```

Each dependency is represented by a `<property>` element whose `name` attribute identifies the setter method to call 
and whose `ref` attribute identifies the service to depend on. The `ref` value is actually an ID of another bean. 
All Content Services services are declared as beans, so can be injected in this way. In the example, repository 
maps to the `setRepository()` method and `repositoryHelper` maps to the bean representing the `Repository` service.

```java
...
public class JavaDir extends DeclarativeWebScript
{
  ...
  public void <b>setRepository</b>(Repository repository)
  {
  ...
  }
}
```

Although this example only declares a single dependency, you can declare multiple dependencies. The Spring Framework 
calls setter methods during the initialization of the Java-backed web script, so all dependencies are resolved by the 
time the `executeImpl()` is invoked.

## Creating a new kind of web script

To extend the capabilities of the Web Script Framework, you can develop a new kind of web script to encapsulate behavior 
you want to reuse across many scripted web scripts.

This example encapsulates the logic for finding a node in the content repository given a node path and placing that 
node into the web script model. Web scripts of this kind only have to declaratively specify the node path in their 
web script description for the model to automatically populate with the associated node.

1.  Create the Java class for your new web script:

    1.  Launch your Java IDE.
    2.  Create a Java package whose name is: `org.example`
    3.  Create a Java class whose name is: `NodeWebScript`
    4.  Implement the Java class as follows:

        ```java
        package org.example;
        
        import java.io.Serializable;
        import java.util.HashMap;
        import java.util.Map;
        
        import org.alfresco.repo.model.Repository;
        import org.alfresco.service.cmr.repository.NodeRef;
        import org.springframework.extensions.webscripts.Cache;
        import org.springframework.extensions.webscripts.DeclarativeWebScript;
        import org.springframework.extensions.webscripts.Status;
        import org.springframework.extensions.webscripts.WebScriptException;
        import org.springframework.extensions.webscripts.WebScriptRequest;
        
        public class NodeWebScript extends DeclarativeWebScript {
        
        	private Repository repository;
        
        	public void setRepository(Repository repository) {
        		this.repository = repository;
        	}
        
        	protected Map<String, Object> executeImpl(WebScriptRequest req,
        			Status status, Cache cache) {
        
        		// extract node path from description extensions
        		Map<String, Serializable> extensions = getDescription().getExtensions();
        		String path = (String) extensions.get("path");
        
        		// search for folder within Alfresco content repository
        		String nodePath = "workspace/SpacesStore/" + path;
        		NodeRef node = repository.findNodeRef("path", nodePath.split("/"));
        
        		// validate that node has been found
        		if (node == null) {
        			throw new WebScriptException(Status.STATUS_NOT_FOUND, "Path "
        					+ path + " not found");
        		}
        		// construct model for response template to render
        		Map<String, Object> model = new HashMap<String, Object>();
        		model.put("node", node);
        		return model;
        	}
        }
        ```

    5.  Compile the Java class.
    6.  Place the compiled Java class into the folder `org/example` within the web application classpath of the Content Services server. For example, you can use ./tomcat/webapps/alfresco/WEB-INF/classes/org/example.

2.  Create a Java class for extracting the node path configuration for your new kind of web script:

    1.  Create a Java class in the package `org.example` whose name is: `NodeWebScriptExtension`.
    2.  Implement the Java class as follows:

        ```java
        package org.example;
        
        import java.io.InputStream;
        import java.io.Serializable;
        import java.util.HashMap;
        import java.util.Map;
        import org.dom4j.Document;
        import org.dom4j.DocumentException;
        import org.dom4j.Element;
        import org.dom4j.io.SAXReader;
        import org.springframework.extensions.webscripts.DescriptionExtension;
        import org.springframework.extensions.webscripts.WebScriptException;
        
        public class NodeWebScriptExtension implements DescriptionExtension
        {
        	public Map<String, Serializable> parseExtensions(String serviceDescPath,
        			InputStream servicedesc)
        			{
        		Map<String, Serializable> extensions =
        				new HashMap<String, Serializable>();
        				SAXReader reader = new SAXReader();
        				try
        				{
        
        					// extract path value from description document
        					Document document = reader.read(servicedesc);
        					Element rootElement = document.getRootElement();
        					Element pathElement = rootElement.element("path");
        					String path = pathElement.getTextTrim();
        					extensions.put("path", path);
        				}
        				catch (DocumentException e)
        				{
        					throw new WebScriptException("Failed to parse", e);
        				}
        				return extensions;
        			}
        }
        ```

    3.  Compile the Java class.
    4.  Place the compiled Java class into the folder `org/example` within the web application classpath of the Content Services server. For example, you can use ./tomcat/webapps/alfresco/WEB-INF/classes/org/example.

3.  Create the Spring Framework configuration file for registering your new web script.

    1.  Create an XML file whose name is: `nodewebscript-context.xml`
    2.  Register the Java classes as follows:

        ```xml
        <?xml version='1.0' encoding='UTF-8'?>
        <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN 2.0//EN'
        'http://www.springframework.org/dtd/spring-beans-2.0.dtd'>
        
        <beans>
          <bean id="webscript.org.example.nodewebscript"
            class="org.example.NodeWebScript" parent="webscript"
            scope="prototype">
          <property name="repository" ref="repositoryHelper"/>
          </bean>
        
          <bean id="webscriptdesc.org.example.nodewebscript"
            class="org.example.NodeWebScriptExtension"/>
        </beans>
        ```

    3.  Place the Spring Framework configuration into the extension classpath of the Content Services server. For example, you can use `./tomcat/shared/classes/alfresco/extension`.

4.  Restart Content Services to fully register the Java-backed web script.

Your example Java class extends `DeclarativeWebScript` just like other Java-backed web scripts. Its primary purpose is 
to locate a node in the repository given a node path, which it does using the `Repository` service. The `NodeRef` 
returned from the `Repository` service is placed into the web script model under the name `node`.

### Testing the new kind of web script

When developing a scripted web script, you can specify its kind through its web script description document. If the new 
kind of web script supports extensions to the web script description document, you must provide those as well. Otherwise, 
development of the web script is the same as any other web script.

This example implements a simple web script based on the example `NodeWebScript` kind, which renders information about 
the `Data Dictionary` folder in the repository.

1.  Log in to Alfresco Share:

    1.  Open a web browser and enter the URL: `http://localhost:8080/share`
    2.  If prompted, log in with the user name `admin` and password `admin`.

2.  Navigate to **Data Dictionary > Web Scripts Extensions > org > example**.

3.  Create a web script description document for your Data Dictionary information sample:

    1.  In the Create menu, select **XML**.
    2.  Enter the name for the web script in the Name field: `info.get.desc.xml`
    3.  Type the following in the content box:

        ```xml
        <webscript kind="org.example.nodewebscript">
          <shortname>Node Info</shortname>
          <description>Demonstration of Web script Kind</description>
          <url>/info</url>
          <authentication>user</authentication>
          <path>Company Home/Data Dictionary</path>
        </webscript>
        ```

    4.  Click **Create**.
    5.  Navigate back to the folder org/example using the breadcrumb trail.

4.  Create a web script response template for your Data Dictionary information sample:

    1.  In the Create menu, select **Plain Text**.
    2.  Enter the name for the web script in the Name field: `info.get.html.ftl`
    3.  Type the following in the content box:

        ```text
        ${node.name} created on ${node.properties.created?date}
        ```

    4.  Click **Create**.
    5.  Navigate back to the `org/example` folder using the breadcrumbs trail.

5.  Register the Data Dictionary Information web script with Content Services:

    1.  Type the following in your web browser, and log in with the user name `admin` and password `admin` if requested:`http://localhost:8080/alfresco/service/index`
    2.  Click **Refresh Web Scripts**. A message displays indicating there is one additional web script.

6.  Test the web script:

    1.  Open a web browser tab and enter: `http://localhost:8080/alfresco/service/info`
    2.  If prompted, log in with the user name `admin` and password `admin`.
    3.  Look for a message similar to the following:

        ```text
        Data Dictionary created on Feb 15, 2013                       
        ```

        This means your web script is working.

The web script kind is specified through the `kind` attribute of the `<webscript>` element contained within the 
web script description document. Its value is the `<web script kind id>` as defined in the Spring configuration for 
the new kind of web script.

In your example, the `NodeWebScript` kind is selected by specifying its identifier of `org.example .nodewebscript`:

```xml
<webscript **kind="org.example.nodewebscript"**>
. . .
**<path>**Company Home/Data Dictionary</path>
. . .
</webscript>
```

As expected by the `NodeWebScript`, the description document also specifies a path to a node in the repository. In the 
example, you specify the Data Dictionary folder through the custom `<path>` element. Your example does not provide a 
controller script, as the `NodeWebScript` Java class already encapsulates the behavior of locating a node given a path 
and populating the web script model. In this case, the located node is placed into the web script model under the 
name `node`.

`${node.name} created on ${node.properties.created?date}`

This means the response template can simply refer to `node` to render the output.
