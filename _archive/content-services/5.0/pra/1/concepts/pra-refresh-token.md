---
author: Alfresco Documentation
---

# Refreshing an access token

After one hour, your application's access token will be invalid. You can use the refresh token to request a new access token without having to re-authenticate with the user. The refresh token is valid for 28 days or until a new access token is requested.

When the access token expires, API requests will receive an HTTP 401 response with the following body:

```

{
  "error":"invalid_request",
  "error_description":"The access token expired"
}
```

**Note:** The error description `The access token expired` is the only way your application can recognize this error. Your application should request a new access token using the refresh token.

The following HTML is from the Alfresco OAuth sample and shows an application with a refresh token of `e98f372c-e5a6-49e5-ba55-a035234577eb2` API Key \(client\_id\) of `l74dx104ddc00c3db4509b2d02f62c3a01234`, and a key secret \(client\_secret\) of `ebf0708b9c8a46efb0115024a7a204e0` requesting a new access code.

```

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Alfresco OAuth Sample Demo</title>
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
</head>
<body>
<h1>OAuth Sample - Refresh the access token</h1>
<form id="tokenForm" action="https://api.alfresco.com/auth/oauth/versions/2/token" method="post" target="ipostresponse">
refresh_token: <input name="refresh_token" value="e98f372c-e5a6-49e5-ba55-a035234577eb2" size="60px"><br/>
client_id: <input name="client_id" value="l74dx104ddc00c3db4509b2d02f62c3a01234" size="50px">
* This must match the registered value in the developer portal<br/>
client_secret: <input name="client_secret" value="ebf0708b9c8a46efb0115024a7a204e0" size="50px">
* This must match the registered value in the developer portal<br/>
grant_type: <input name="grant_type" value="refresh_token" readonly="readonly"><br/>
<input type="submit">
</form>
</body>
</html>

```

The response will have a body that looks like this:

```

{
  "access_token":"28f88a82-a62b-4e44-9312-16a4a5d2e71c",
  "token_type":"Bearer",
  "expires_in":3600,
  "refresh_token":"e98f372c-e5a6-49e5-ba55-a0358d877eb2",
  "scope":"public_api"
}
```

Note that you can refresh the access token at any time before the timeout expires. The old access token becomes invalid when the new one is granted. The new refresh token supplied in the response body can be used in the same way.

**Parent topic:**[Authentication for Alfresco Cloud](../../../pra/1/concepts/pra-authentication-cloud.md)

