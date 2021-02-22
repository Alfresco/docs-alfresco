---
author: Alfresco Documentation
---

# Rendering a Surf page

This example describes how to render a Surf page through Spring Web MVC.

In this example:

-   A request arrives to a simple Spring Surf application in the following form: `http://localhost:8080/hotels`
-   The Spring MVC dispatcher receives this request and tries to find a controller that matches the URI /hotels. In this case, it does not find a match. Thus, a controller is not found, nothing is invoked, and a model is not set up.
-   The Spring MVC dispatcher then tries to find a view resolver that can resolve views for the URI /hotels. It will walk through the available view resolvers and ask each one if it can handle this URI.
-   Since this is a simple Surf application, each of the Surf view resolvers are interrogated and asked whether they can resolve /hotels. The two most interesting resolvers are these:
    1.  `PageViewResolver` checks to see if there is a Surf Page object defined that maps to the URL `/hotels`. If so, it produces a `PageView` view object to render the response.
    2.  `WebScriptViewResolver` checks to see if there is a web script defined that maps to the URL `/hotels`. If so, it produces a `WebScriptView` view object to render the response.
-   If a `PageView` is produced, Surf renders back the Hotels page. If a `WebScriptView` is produced, Surf asks the web script engine to render back the web script matching the URI /hotels.

1.  To render back a Hotels page that lists all the hotels available on your website, define a page in Surf that maps to the /hotels URI using the following XML. For example:

    ```
    <?xml version='1.0' encoding='UTF-8'?> 
     <page> 
      <id>hotels</id> 
     </page>
    ```

    Surf picks this up as it knows there is a page object with the URI /hotels.

2.  Provide the template to use to render markup to the response by hardcoding in FreeMarker. For example:

    ```
    <html> 
      <body> 
        <table> 
          <tr> 
            <td>Walton Cottage</td> <td>Maidenhead, UK</td> 
          </tr> 
          <tr> 
          <td>Victorian Treasure</td> <td>Lodi, WI</td> 
        </tr> 
        </table> 
      </body> 
    </html> 
    ```


When you hit the `/hotels` URI, the dispatcher walks through the view resolvers and settles on the `PageViewResolver` and renders your page to the browser.

**Parent topic:**[Spring Web MVC](../concepts/spring-web-mvc.md)

