---
author: Alfresco Documentation
---

# Alfresco One API

The Alfresco One API lets you access content in an on-premise Alfresco repository, and in Alfresco cloud, from your own applications. The API is RESTful, which means each call is an HTTP request, so you don't even need a programming language to try it out. You can just type a URL address in a web browser. It consists of two parts, the standard CMIS API, which lets you manage and access content, and the new Alfresco One REST API which lets you manage Alfresco's additional features such as ratings and comments, that are not covered by the CMIS standard.

To get started you need access to an instance of Alfresco or an [Alfresco Cloud](http://cloud.alfresco.com/) account. You will also need [authorization](../concepts/pra-authentication.md) to your chosen repository. Once you have that, you can try out API calls using:

-   A web browser
-   An HTTP URL tool such as [cURL](http://curl.haxx.se/) or [RESTClient](http://restclient.org/). Some of these tools let you build your GET, PUT, POST, and DELETE commands simply, take care of authentication, and will save your test calls for repeated use.

You make API requests by sending a URL using one of five HTTP API methods, GET, POST, PUT, DELETE, and OPTIONS. Here's an example:-

```

https://api.alfresco.com/yourcompany.com/public/alfresco/versions/1/sites/fred-bloggs-yourcompany-com
```

Sending this URL using the HTTP GET method invokes the `sites` Alfresco Public RESTFul method. This call requests information on the site with the id fred.blogs.yourcompany.com. The server will return an HTTP response with the following JSON body :-

```

{
   "entry":{
      "title":"Fred Blogg's Home",
      "description":"Fred Blogg's private home site.",
      "visibility":"PRIVATE",
      "id":"fred-bloggs-yourcompany-com"
   }
}
```

-   **[What's new in the Alfresco One API](../../../pra/1/topics/pra-whats-new.md)**  
At Alfresco we're always thinking up new ways to help you write great applications.
-   **[How does an application do work on behalf of a user?](../../../pra/1/concepts/pra-authentication.md)**  
 Your application must authenticate with the Alfresco server to work with Alfresco resources. If your application is using resources on an Alfresco on-premise repository it uses basic HTTP authentication. If your application is using resources on an Alfresco Cloud account it uses OAuth authentication.
-   **[Alfresco CMIS API](../../../pra/1/topics/cmis-welcome.md)**  
Alfresco fully implements both the CMIS 1.0 and 1.1 standards to allow your application to manage content and metadata in an Alfresco repository or in Alfresco cloud. This section gives a brief overview of the URL format for CMIS REST API calls, and explains the format of responses.
-   **[Alfresco REST API](../../../pra/1/topics/pra-welcome-aara.md)**  
The Alfresco REST API lets you manage alfresco-specific features of content in an on-premise Alfresco repository, and in Alfresco cloud from your own applications.

**Parent topic:**[Developing Applications and Extensions](../../../concepts/dev-applications-extensions-intro.md)

