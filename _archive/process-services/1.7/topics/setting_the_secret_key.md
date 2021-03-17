# Setting the secret key

When Alfresco One communicates with Activiti, it sends a secret token and username to Activiti and switches it for user specific Activiti token.

To override the default secret token, simply specify an *activiti.secret* property in the *alfresco-global.properties* file.

```
activiti.secret=my-custom-secret
```

The secret token must match the *Repository secret* field for your *Alfresco repository* in the Activiti Identity Management app.

The secret token appears in clear text, therefore, to avoid saving it like that:

1.  Override the value \(and all other Activiti properties\) using Alfresco One subsystems and JMX.

2.  To connect to an Alfresco One Server using JMX, see:

    [http://docs.alfresco.com/4.0/concepts/jmx-intro-config.html](http://docs.alfresco.com/4.0/concepts/jmx-intro-config.html)

3.  Once connected, navigate to */Alfresco/Configuration/Activiti/default/Attributes* and modify the value for *activiti.secret*.


