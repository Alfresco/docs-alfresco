---
author: Alfresco Documentation
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Authenticating users with SAML SSO for REST API

After configuring SAML for REST API requests in Alfresco, if you want to access any REST API, you need to authenticate the users via SAML SSO before making any REST API requests.

Without authenticating the user, if you try to access any of the SAML-protected URLs, for example:

```
https://localhost:8443/alfresco/api/-default-/public/alfresco/versions/1/sites
```

you will get an unauthorized 401 response, as shown below:

```
{
    "status" :
  {
    "code" : 401,
    "name" : "Unauthorized",
    "description" : "The request requires HTTP authentication."
  }, 
  
  "message" : "02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get", 
  "exception" : "org.springframework.extensions.webscripts.WebScriptException - 02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get",
 
  "callstack" :
  [
          ""      ,"org.springframework.extensions.webscripts.WebScriptException: 02210007 Authentication failed for Web Script org\/alfresco\/api\/ResourceWebScript.get"
      ,"org.alfresco.repo.web.scripts.RepositoryContainer.executeScriptInternal(RepositoryContainer.java:404)"
      ,"org.alfresco.repo.web.scripts.RepositoryContainer.executeScript(RepositoryContainer.java:281)"
      ...
      ,"org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:310)"
      ,"java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142)"
      ,"java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617)"
      ,"java.lang.Thread.run(Thread.java:745)"
  ],
 
  "server" : "Enterprise v5.0.3 (r122151-b84) schema 8 040",
  "time" : "21 mars 2017 11:45:44"
}
```

In order to authenticate a user via SAML, follow these steps:

1.  Open the following URL in a web browser. This can either be a webview component in a mobile or desktop app or within an iframe in a web app:

    ```
    https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate
    ```

    You will be redirected to your identity provider's login page.

2.  Specify the login credentials.

    If the identity provider has accepted the credentials, the browser will be redirected to `https://localhost:8443/alfresco/service/saml/-default-/rest-api/authenticate-response`. The SAML authentication has ended and you can close the webview component or iframe.

3.  Start making authenticated requests. You have two ways to make requests to the repository:

    1.  Use the `alf_ticket` contained in the JSON file returned by the `/authenticate-response`. A desktop or mobile application that was running the SAML authentication in a webview can access the content of this webview and grab the `alf_ticket` from the JSON file. Then this application can use the `alf_ticket` to make requests such as `curl https://localhost:8443/alfresco/api/-default-/public/alfresco/versions/1/sites?alf_ticket=TICKET_ed6db2aca17e94864799c9849780f66c0a738e9b`

    2.  Use the authentication cookie. A web application has typically no access to the content of an iframe. So you are not able to read the `alf_ticket` from the `/authenticate-response`. However the repository has established a security context with the current session, which means you can start making requests such as `https://localhost:8443/alfresco/api/-default-/public/alfresco/versions/1/sites` in the same browser.dfg


To logout from Alfresco using REST API, use the following `/logout-request`:

```
https://localhost:8443/alfresco/service/saml/-default-/rest-api/logout-request?alf_ticket=TICKET_17196d7019fc1704ed29a270bf4f54598393abdc
```

Response:

```
{"entry":{}}
```

The SAML ticket is now invalid and the user can no longer access Alfresco. To access Alfresco again, repeat the above mentioned steps.

**Parent topic:**[Configuring SAML SSO for REST API](../concepts/config-saml-restapi.md)

