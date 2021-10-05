---
title: Installing and Getting Started with the API Explorer
---

Information about Alfresco ReST API Explorer and how to install it and getting going with it.

## Introduction

The Alfresco ReST API v1 is described in the OpenAPI specification format (formerly Swagger specification). This is good as lots of different tools can read this format, and you can also use the specification to generate ReST API clients in different languages, such as Java.

Alfresco uses the Alfresco ReST API OpenAPI specification to provide an [API Explorer](https://github.com/Alfresco/rest-api-explorer), so you can easily read about all the APIs and try them out. The API Explorer comes in the format of a WAR file that needs to be installed (dropped) into your ACS installation.

If you just want to have a look at the latest API Explorer, then you can use an online version of it available here: [https://api-explorer.alfresco.com/api-explorer/](https://api-explorer.alfresco.com/api-explorer/)

## Installing

Most likely you would want to install the API Explorer into your local ACS installation. You can find the Alfresco API Explorer WAR file in [Alfresco’s Nexus repository](https://artifacts.alfresco.com/nexus/#nexus-search;quick~api-explorer). Pick the version that closest matches your ACS installation.

To install the WAR file follow one of two approaches. If you are using a trial version of ACS then you follow the first approach described below. If you are using the [Alfresco SDK]({% link content-services/5.2/develop/sdk.md %}) you would want to follow the second approach.

***Installing the WAR file into an ACS Trial environment*:**

*1) Stop Alfresco Content Services (ACS) Tomcat Server*

You would typically do this with the provided script: `<ALF_INSTALL_DIR> $ ./alfresco.sh stop tomcat`

*2) Rename the API Explorer WAR file*

Rename the downloaded API Explorer WAR file to `api-explorer.war`.

*3) Copy the renamed WAR file into `tomcat/webapps` directory*

Copy the `api-explorer.war` file into the `<ALF_INSTALL_DIR>/tomcat/webapps` directory.

*4) Start the ACS Tomcat Server*

You would typically do this with the provided script: `<ALF_INSTALL_DIR> $ ./alfresco.sh start tomcat`:

***Installing the WAR file into an Alfresco SDK AIO project:***

*1) Verify that the API Explorer WAR is being installed*

The Alfresco SDK version 3.x will by default deploy the API Explorer WAR for you. If that is not the case verify that the property (i.e. `enableApiExplorer`) for this is enabled (i.e. set to `true`) in the Alfresco Maven plug-in configuration:

```xml
<plugin>
<groupId>org.alfresco.maven.plugin</groupId>
<artifactId>alfresco-maven-plugin</artifactId>
<version>${alfresco.sdk.version}</version>
<configuration>

    <!-- We need the flat file H2 database to run the Repo -->
    <enableH2>true</enableH2>
    <!-- We always need the Platform/Repo webapp - alfresco.war -->
    <enablePlatform>true</enablePlatform>
    <!-- Enable Solr webapp so we can use search -->
    <enableSolr>true</enableSolr>
    <!-- We need Share webapp, so we got a UI for working with the Repo -->
    <enableShare>true</enableShare>
    <!-- Enable the REST API Explorer -->
    <enableApiExplorer>true</enableApiExplorer>
...
```

Done!

You should now be able to access the API Explorer at [http://localhost:8080/api-explorer](http://localhost:8080/api-explorer/#/):

![]({% link content-services/images/dev-api-by-language-alf-rest-api-explorer-1.png %})

## Getting started

You make API requests by sending a URL using one of five HTTP API methods, GET, POST, PUT, DELETE, and OPTIONS. Here's an example of a URL to get all sites in a local Alfresco installation:

```bash
http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/sites
```

You can use the ReST API Explorer to make this request:

-   In your web browser, navigate to `[http://localhost:8080/api-explorer/#!/sites/listSites](http://localhost:8080/api-explorer/#!/sites/listSites)`. You'll see full documentation for the **GET /sites** API method, including the query and body parameter formats, and the expected and error response schemas.
-   At the end of the description you'll see the **Try it out!** button. Press it now.

    You've just made your first Alfresco ReST API request. You will see the request URL you've just invoked, the corresponding Curl command, the JSON response body that the Alfresco repository has returned, the HTTP response code, and the response headers: ![]({% link content-services/images/dev-api-by-language-alf-rest-api-explorer-2.png %})

Note this call returns a list of site **entries**. All lists returned by the Alfresco ReST API are of this format.

## Installing a tool to make HTTP calls

Information about the **cURL** command line tool that can be used to make HTTP calls.

When we have an ACS Server up and running we also need a tool that can be used to make HTTP requests to the server. The ReST API is accessed via HTTP and returns responses in JSON. We could use a Web Browser for all API calls that require HTTP GET, but lots of API calls will need a client that can execute HTTP POST and HTTP PUT operations.

So it is best to start working with a tool that can make HTTP GET, POST, and PUT calls. One such tool is **cURL** and it is commonly available on most Linux based systems. Check if you have it by doing:

```bash
$ curl 
curl: try 'curl --help' or 'curl --manual' for more information
```

If you don’t have curl installed you can find it here: [https://curl.se/](https://curl.se/){:target="_blank"}

## Installing a tool to format JSON responses

Information about the **jq** command line tool that can be used to format JSON responses.

The Alfresco ReST API will return responses in JSON format. When we work with the ReST API from the command line via cURL these JSON responses will not be formatted in a way that is easily readable.

So it would be good to feed it into some utility that could format the JSON. For this we can use a tool called **jq**. It can be found here: [https://stedolan.github.io/jq/](https://stedolan.github.io/jq/). Install it and you should be ready to go with the rest of this section.

## Authenticating with the Repository {#authentication-with-the-repository}

Before you can use the Alfresco ReST API you need to authenticate with the server to get a ticket.

### Introduction

Before you can call any of the API endpoints, except a few ones that doesn't require authentication, you need to authenticate with the Repository so your operations are executed on behalf of a specific user. When you authenticate successfully a ticket is returned that can be used in subsequent calls to the API. A ticket is valid for a specific time, so if you don't make any calls for a while, then you might get 401 errors back, which means you need to authenticate again to get a new ticket.

### Authenticating to get a ticket

To authenticate with the Repository the following URL is used, and it is part of the Authentication API:

**http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets**

When calling this URL a HTTP POST should be used with the username and password as data:

```bash
$ curl --header "Content-Type: application/json" --request POST --data '{"userId":"admin","password":"admin"}' http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets
{"entry":
  {"id":  "TICKET_08eb7e2e2c17964ca51f0f33186cc2fc9d56d593",
   "userId":"admin"
  }
}
```

Here I’m logging in as **admin** with password **admin**, which is common for local developer/test installations of ACS. But you can use any other username/password combination that represents a user in the Alfresco User database, being it local or linked to LDAP. However, it's good to use the **admin** user when you are playing around with the ReST API as you will almost always get a response back as you have full access. You don't have to worry about the user having the correct permissions to execute the call, having access to the content, etc. A ticket is return inside a JSON object.

We can make the POST call a bit shorter as `-H` is short for `--header` and `-d` for `--data`. The `-request POST` part is optional if you use `-d`, as the `-d` flag implies a POST request. So the call can also be executed as follows:

```bash
$ curl -H "Content-Type: application/json" -d '{"userId":"admin","password":"admin"}' http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets | jq
{  
  "entry": {    
    "id": "TICKET_08eb7e2e2c17964ca51f0f33186cc2fc9d56d593",    
    "userId": "admin"  
  }
}
```

You get the same ticket back if you call the API multiple times.

*Windows users*:

Single quotes around JSON does not work on Windows, use double quotes instead:

```bash
curl -H "Content-Type: application/json" -d "{\"userId\":\"admin\",\"password\":\"admin\"}" http://localhost:8080/alfresco/api/-default-/public/authentication/versions/1/tickets
```

### Base64 encoding the ticket

When we have the ticket we need to base64 encode it before we can use it in subsequent calls:

*On Mac and Linux*:

```bash
$ echo -n 'TICKET_08eb7e2e2c17964ca51f0f33186cc2fc9d56d593' | openssl base64
VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=
```

*On Windows*:

```bash
powershell "[convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes(\"TICKET_08eb7e2e2c17964ca51f0f33186cc2fc9d56d593\"))"
```

### Using the ticket

Now when we got a base64 encoded ticket, such as `VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=`, we can start using it in an API call. The way we use the ticket in a Curl call is to add it with the `Authorization` header as follows:

```bash
curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic {ticket}' '{API endpoint URL}' | jq
```

With an example ticket and an example API endpoint it will look like this:

```bash
curl -X GET -H 'Accept: application/json' -H 'Authorization: Basic VElDS0VUXzA4ZWI3ZTJlMmMxNzk2NGNhNTFmMGYzMzE4NmNjMmZjOWQ1NmQ1OTM=' 'http://localhost:8080/alfresco/api/discovery' | jq
```

This ReST API Guide contains hundreds of examples of how to use a ticket with GET, POST, PUT, and DELETE calls.
