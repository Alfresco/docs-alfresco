---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# Authorization

Your application uses the information registered with Alfresco to authorize itself when it is run by a user.

## Requesting an authorization code

The following HTML is from the Alfresco OAuth sample and shows an application with an API key \(client\_id\) of `l74dx104ddc00c3db4509b2d02f62c3a01234`, a redirect URI of `http://localhost:8080/alfoauthsample/mycallback.html` and a scope of `public_api` authorizing with Alfresco. You should always use the value `public_api` for scope.

```

<!DOCTYPE html>
<html>
<head>
<title>Alfresco OAuth Sample Demo</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
</head>
<body>
<h1>Welcome to the Alfresco OAuth Sample App</h1>
<form action="https://api.alfresco.com/auth/oauth/versions/2/authorize">
client_id: <input
   name="client_id"
   value="l74dx104ddc00c3db4509b2d02f62c3a01234"
   size="50px"
>
This must match the registered value
<br />
redirect_uri: <input
   name="redirect_uri"
   value="http://localhost:8080/alfoauthsample/mycallback.html"
   size="70px"
>
* This must match the registered value
<br />
scope: <input
   name="scope"
   value="public_api"
>
<br />
response_type: <input
   name="response_type"
   value="code"
   readonly="readonly"
><br />
<input type="submit"></form>
</html>

         
```

Alfresco will ask the user for their userid and password to grant or deny access to resources for your application. If they grant access, then Alfresco will invoke the callback URI with the authorization code.

## Exchanging the authorization code for an access token

Once the application has an authorization code, it can exchange this for an access token. The following HTML is from the Alfresco OAuth sample and shows an application with an authorization code of `f9d9f182-700b-4c67-8235-b6ea08870872` API Key \(client\_id\) of `l74dx104ddc00c3db4509b2d02f62c3a01234` , and a key secret \(client\_secret\) of `ebf0708b9c8a46efb0115024a7a204e0` requesting an access token. Note that once the application has an authorization code, it has 10 minutes to exchange it. After that, the authorization code is invalid and the application must request a new one.

```

<!DOCTYPE html>
<html>
<head>
<title>OAuth Callback page</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
</head>
<body>
<h1>OAuth Sample - Callback page</h1>
<form id="tokenForm" action="https://api.alfresco.com/auth/oauth/versions/2/token" method="post" target="ipostresponse">
code: <input id="authCode" name="code" value="f9d9f182-700b-4c67-8235-b6ea08870872" size="50px"><br/>
client_id: <input name="client_id" value="l74dx104ddc00c3db4509b2d02f62c3a01234" size="50px">
* This must match the registered value in the developer portal</font><br/>

client_secret: <input name="client_secret" value="ebf0708b9c8a46efb0115024a7a204e0" size="50px">
* This must match the registered value in the developer portal</font><br/>

redirect_uri: <input name="redirect_uri" value="http://localhost:8080/alfoauthsample/mycallback.html" size="70px">
* This must match the registered value in the developer portal</font><br/>
grant_type: <input name="grant_type" value="authorization_code" readonly="readonly"><br/>
<input type="submit">
</form>
</html>
         
```

The application will get a JSON response body like this:

```

{
  "access_token":"87727764-3876-43b9-82a1-1ca917302ce5",
  "token_type":"Bearer",
  "expires_in":3600,
  "refresh_token":"596f6074-f432-4aeb-a162-8196213c659c",
  "scope":"public_api"
}
```

The following table explains the response properties:

|Property|JSON Type|Description|
|--------|---------|-----------|
|access\_token|string|An access token that can be used to make authenticated calls using the Alfresco One API for one hour.|
|token\_type|string|The type of token.|
|expires\_in|number|The number of seconds the access token will be valid for. Alfresco will issue access tokens valid for one hour.|
|refresh\_token|string|Once the access token expires, the application must [get a new access token](pra-refresh-token.md) using this refresh token. The refresh token is valid for seven days.|
|scope|string|Always use public\_api as the value of scope.|

The access token can be used to make authenticated calls using the Alfresco One API for one hour. After that period, the application must [get a new access token](pra-refresh-token.md) using the refresh token.

## Using the access token

For simplicity, the example adds the access token to the query as a parameter. Note that the preferred method to pass the access token to Alfresco is to include it in the HTTP request header in the `Authorization` field in the following format:

```

            Value: Bearer [your access token]
```

This is a an example:

```
Bearer d1358c05-6564-4086-94b6-a7e14ce3490
```

The application now has an access token, and can use it to make API calls. The following HTML code is from the Alfresco OAuth sample and shows an authenticated call to the `sites` API.

```

<!DOCTYPE html>
<html>
<head>
<title>Alfresco OAuth Sample Demo</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
</head>
<body>
<h1>OAuth Sample - Use the access token</h1>
<form id="callerForm" action="" method="get" target="ipostresponse">
Paste your Access token here: <input name="access_token" value="" size="60px"><br/>
API url to call (via HTTP.GET) <input id="urlToCall" value="https://api.alfresco.com/alfresco.com/public/alfresco/versions/1/sites" size="70px"><br/>
<input type="submit">
</form>
</body>
</html>
         
```

The application will get a JSON response body like this:

```
{
  "list" : {
    "pagination" : {
      "count" : 2,
      "hasMoreItems" : false,
      "skipCount" : 0,
      "maxItems" : 100
    },
    "entries" : [ {
      "entry" : {
        "site" : {
          "id" : "general-test-site",
          "title" : "General Test Site",
          "visibility" : "PRIVATE",
          "description" : "Test Site"
        },
        "id" : "general-test-site",
        "role" : "SiteCollaborator"
      }
    }, {
      "entry" : {
        "site" : {
          "id" : "fred-bloggs-yourcompany-com",
          "visibility" : "PRIVATE",
          "description" : "Fred Bloggs's private home site."
        },
        "id" : "fred-bloggs-yourcompany-com",
        "role" : "SiteManager"
      }
    } ]
  }
}
```

**Parent topic:**[Authentication for Alfresco Cloud](../../../pra/1/concepts/pra-authentication-cloud.md)

