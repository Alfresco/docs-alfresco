---
author: [Alfresco Documentation, Alfresco Documentation]
---

# Request password reset for a person

Requesting a password reset for a a person \(user\) in the repository.

|API Call|POST /people/\{id\}/request-password-reset POST /people/\{personId\}/reset-password

|
|--------|-------------------------------------------------------------------------------------|
|API Explorer URL|[http://localhost:8080/api-explorer/\#!/people/requestPasswordReset](http://localhost:8080/api-explorer/#!/people/requestPasswordReset) [http://localhost:8080/api-explorer/\#!/people/resetPassword](http://localhost:8080/api-explorer/#!/people/resetPassword)|
|See also|[How to create a person](dev-api-by-language-alf-rest-manage-people-groups-create-person.md)|
|Repository Info|[Concepts](dev-repository-concepts.md) [Glossary](dev-glossary.md)|

It’s possible to request a reset of the password for a person \(user\). An email will be sent to the user with information on how to reset the password via a link to a specific UI client. The POST body specifies what client that should be used to reset the password:

```
{
  "client": "my client"
}
```

Currently only the Alfresco Share UI client is registered with the Alfresco Repository server. So you would POST the following:

```
{
  "client": "share"
}
```

Use the following POST call:

**http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/\{id\}/request-password-reset**

The identifier for the person that requests a password reset is specified with the `{id}` parameter.

To request a password reset via the Alfresco Share UI client for a person with id `test` make the following call:

```
$ curl -X POST -H 'Content-Type: application/json' -H 'Accept: application/json' -d '{ "client": "share" }' 'http://localhost:8080/alfresco/api/-default-/public/alfresco/versions/1/people/test/request-password-reset' | jq
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    21    0     0  100    21      0   1500 --:--:-- --:--:-- --:--:--  1500
```

An email is now sent by the server to the email address that is stored for the `test` user. So to test this you would need to configure an SMTP server that the Alfresco repository server can talk to and send the email.

**Parent topic:**[Managing People and Groups](../concepts/dev-api-by-language-alf-rest-manage-people-groups-intro.md)

