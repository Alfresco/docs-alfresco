# Alfresco Content Services repository configuration

The following steps explain how to configure the repository settings.

**Modifying the default integration name**

You can modify the default Alfresco Content Services integration name by setting the value of activiti.alfrescoRepositoryName. This value must correspond to an Alfresco Content Services repository configured in Activiti. The default name for the integration is *alfresco-1*, however you can modify it, if required

1.  Locate the alfresco-global.properties file located at <alfresco-tomcat\>/shared/classes\>:

    ```
    activiti.alfrescoRepositoryName=alfresco-1
    ```

2.  Modify the value after the hyphen \(`-`\) with a number that matches the `Id` of the repository. The `repository Id` is available as a column in the **Activiti app** \> **Identity Management** app \> **Tenants** \> **Alfresco Repositories** list.

**Modifying the Activiti app name**

You can modify the Activiti app name to display the same app name in Share by modifying the following value in the *alfresco-global.properties* file:

```
activiti.appDefinitionName=Some Custom App
```

**Setting the secret key**

When Alfresco Content Services communicates with Process Services, it sends a secret token and user name and switches it for user specific Process Services token.

To override the default secret token, specify an `activiti.secret` property in the alfresco-global.properties file.

```
activiti.secret=my-custom-secret
```

The secret token must match the `Repository secret` field for the repository in the Identity Management app.

The secret token appears in clear text, therefore, to avoid saving it like that:

1.  Override the value \(and all other properties\) using Alfresco Content Services subsystems and JMX.
2.  To connect to an Alfresco Content Services server using JMX, see:

    [http://docs.alfresco.com/5.2/concepts/jmx-intro-config.html](http://docs.alfresco.com/5.2/concepts/jmx-intro-config.html)

3.  Once connected, navigate to /Alfresco/Configuration/Activiti/default/Attributes and modify the value for `activiti.secret`.

**Parent topic:**[Modifying the default settings](../topics/modifying_the_default_settings.md)

