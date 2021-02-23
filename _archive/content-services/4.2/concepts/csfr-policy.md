---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# Cross-Site Request Forgery \(CSRF\) filters in Alfresco Share

You can configure `CSRFPolicy` in Alfresco Share to prevent CSRF attacks that allow malicious requests to be unknowingly loaded by a user.

You can configure the CSRF filter to run with third party plugins and to stop specific repository services from being accessible directly through the Share proxy.

The filter is implemented in the `org.alfresco.web.site.servlet.CSRFFilter` that reads the `CSRFPolicy` configuration section in `share-security-config.xml`.

`CSRFPolicy` describes how and when the filter mitigates CSRF attacks:

-   Each logged in user receives a secret CSRF token.

-   The token is communicated to the browser using a `Alfresco-CSRF-Token` cookie.

-   When a logged in user performs a POST, PUT or DELETE HTTP request against Alfresco Share the token must be passed in the request using one of the following methods:

    -   As a custom HTTP request header called `Alfresco-CSRF-Token`
    -   As a URL parameter called `Alfresco-CSRF-Token`

        **Note:** Usually the header is required, but in some circumstances a header cannot be used and in this case the token can be passed using a URL parameter. The default config only accepts the URL parameter when the `Content-Type` header starts with `multipart/`.

-   Every time the logged in user visits a new Share page the token is renewed.
-   The filter checks that the referrer and original HTTP request headers match the current domain \(if this is present in the request\).

## Do I need to alter my custom code?

Generally, you should not need to alter your custom code, for example, the following cases need no code alteration:

-   You are reading data using GET requests only
-   You are using the standard `Alfresco.util.Ajax`, `alfresco/core/CoreXhr` or `Alfresco.forms.Form` javascript classes when creating, updating or deleting data
-   You are writing a non-browser client \(for example, a mobile application\)

However, in these situations you will need to alter your code:

1.  You are making an `XMLHttpRequest` with POST, PUT or DELETE methods without using the `Alfresco.util.Ajax` or `alfresco/core/CoreXhr` classes. If you are using the native `XMLHttpRequest` object or a third party library such as jQuery, add code to pass the token, for example:

    ```
    if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       xhrHeadersObject[Alfresco.util.CSRFPolicy.getHeader()] = Alfresco.util.CSRFPolicy.getToken();
    } 
    ```

    If you are using `YAHOO.util.DataSource` to load data with POST requests, add code similar to this example:

    ```
    if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       yuiDataSource.connMgr.initHeader(Alfresco.util.CSRFPolicy.getHeader(), Alfresco.util.CSRFPolicy.getToken(), false);
    } 
    ```

2.  You are making a form upload with enctype `multipart/form-data` without using `Alfresco.forms.Form`.

    When you upload a file by submitting a form with enctype `multipart/form-data` it is not possible to set a header on the request because it is not possible to set a header on any form submission in the browser. Pass the token as a URL parameter instead. If you are using the `Alfresco.forms.Form` class, this is handled for you automatically, otherwise add the token as a URL parameter, for example:

    ```
     if (Alfresco.util.CSRFPolicy && Alfresco.util.CSRFPolicy.isFilterEnabled())
    {
       url += "?" + Alfresco.util.CSRFPolicy.getParameter() + "=" + encodeURIComponent(Alfresco.util.CSRFPolicy.getToken());
    } 
    ```

3.  You are using a Flash movie inside Share to send HTTP requests with method POST.

    If you are using a Flash movie to upload files, using the `flash.net.FileReference ActionScript` class to perform a multipart/form-data request, add the token as a URL parameter in your Javascript before passing in the URL to the Flash movie. If your Flash movie is performing application/json or other text based POST requests, using the `flash.net.URLRequest and/or flash.net.navigateToURL` ActionScript classes and methods, pass the token and the name of the header so that it can be set from the Flash movie.


## When else might I need to make code updates?

If servers from other domains are allowed to POST requests to your system, then you need to reconfigure `CSRFPolicy` in your `share-config-custom.xml` file so that the token or header is not checked:

1.  Copy the `CSRFPolicy` configuration in `share-security-config.xml`.
2.  Paste the configuration into your `share-config-custom.xml` file, ensuring that it is replacing the old configuration section:

    ```
     <config evaluator="string-compare"
          condition="CSRFPolicy" **replace="true"**> 
    ```

3.  Copy the following code and add it as the first child of the <filter\>  element:

    ```
    
    <rule>
       <request>
          <method>POST</method>
          <path>/page/trusted/call/1|/page/trusted/call/2</path>
       </request>
       <action name="assertReferer">
          <param name="always">false</param>
          <param name="referer">https://www.trustedserver.com/.*</param>
       </action>
       <action name="assertOrigin">
          <param name="always">false</param>
          <param name="origin">https://www.trustedserver.com</param>
       </action>
    </rule>
    ```


The CSRF filter compares the incoming request with the rule request elements to find one that matches and then invokes the defined actions for that rule before normal Share processing begins.

If you want to completely block certain services in the repository, you can add these URLs to the CSRF filter:

1.  Copy the `CSRFPolicy` configuration in `share-security-config.xml`.
2.  Paste the configuration into your `share-config-custom.xml` file, ensuring that it is replacing the old configuration section:

    ```
     <config evaluator="string-compare"
          condition="CSRFPolicy" **replace="true"**> 
    ```

3.  Copy the following code and add it as the first child of the <filter\>  element:

    ```
    
         <rule>
       <request>
          <path>/proxy/alfresco/acme/special/services/.*</path>
       </request>
       <action name="throwError">
          <param name="message">It is not allowed to access this url from your browser</param>
       </action>
    </rule>
          
    ```


**Parent topic:**[Security policies and filters in Alfresco Share](../concepts/share-policies.md)

