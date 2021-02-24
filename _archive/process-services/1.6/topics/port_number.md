# Alfresco Process Services port

The default settings assume that Process Services is running on [http://127.0.0.1:8080/](http://127.0.0.1:8080/). If so, you don’t have to do anything.

If you have Process Services running on another domain or port \(that is, 9090\), you can override the default setting by adding the following line at the bottom of the <alfresco-tomcat\>/shared/classes/alfresco-global.properties file in Tomcat, where the repository is located:

```
activiti.domain=http://127.0.0.1:9090
```

**Parent topic:**[Modifying the default settings](../topics/modifying_the_default_settings.md)

