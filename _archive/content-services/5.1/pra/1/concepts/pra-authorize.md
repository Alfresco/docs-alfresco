---
author: Alfresco Documentation
---

# Authorization

Your application uses the information registered with Alfresco to request authorization from the user.

You can download a self-contained Sample Alfresco OAuth Application [here](https://github.com/Alfresco/alfresco-oauth-sample). The Sample Alfresco OAuth Application is an example of how authorization works.

## Requesting an authorization code

The following screenshor is from the Alfresco OAuth sample and shows an application with an API key \(client\_id\) of `l74dx104ddc00c3db4509b2d02f62c3a01234`, a redirect URI of `http://localhost:8080/alfoauthsample/mycallback.html` and a scope of `public_api` authorizing with Alfresco. You should always use the value `public_api` for scope.

![](../images/pra-auth-samp-1.png)

The application submits a URL requesting authorization that looks like this:

```
https://api.alfresco.com/auth/oauth/versions/2/authorize?client_id=l74dx104ddc00c3db4509b2d02f62c3a01234&redirect_uri=http://localhost:8181/oauthsample/mycallback.html&response_type=code&scope=public_api"
      
```

The user sees the following request to grant or deny access to resources for your application. If they grant access, then Alfresco will invoke the callback URI with the authorization code.

![](../images/pra-auth-screen.png)

## Exchanging the authorization code for an access token

Once the application has an authorization code, it can exchange this for an access token. The following screenshot is from the Alfresco OAuth sample requesting an access token. Note that once the application has an authorization code, it has 10 minutes to exchange it for an access token. After that, the authorization code is invalid and the application must request a new one.

![](../images/pra-auth-samp-2.png)

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
|access\_token|string|An access token that can be used to make authenticated calls using the Alfresco REST API for one hour.|
|token\_type|string|The type of token.|
|expires\_in|number|The number of seconds the access token will be valid for. Alfresco will issue access tokens valid for one hour.|
|refresh\_token|string|Once the access token expires, the application must [get a new access token](pra-refresh-token.md) using this refresh token. The refresh token is valid for seven days.|
|scope|string|Always use public\_api as the value of scope.|

The access token can be used to make authenticated calls using the Alfresco REST API for one hour. After that period, the application must [get a new access token](pra-refresh-token.md) using the refresh token.

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

![](../images/pra-auth-samp-3.png)

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

## Using the access token with cURL

If you want to test out the Alfresco REST API on your Alfresco in the Cloud site using cURL, obtain an access token using the Sample Alfresco OAuth Application [here](https://github.com/Alfresco/alfresco-oauth-sample). Then you can use the access token in a cURL call like this:

```
curl --header "Authorization: Bearer 98f11aac-4d61-47ec-95cd-826def18daaa" https://api.alfresco.com/alfresco.com/public/alfresco/versions/1/sites
```

**Parent topic:**[Authentication for Alfresco Cloud](../../../pra/1/concepts/pra-authentication-cloud.md)

