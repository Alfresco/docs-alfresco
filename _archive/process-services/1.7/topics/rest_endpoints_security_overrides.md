# REST Endpoints security overrides

You can change the default security configuration of the REST API endpoints by implementing the `com.activiti.api.security.AlfrescoApiSecurityOverride` interface. By default, the REST API endpoints use the Basic Authentication method.

Similarly, you can override the default cookie+token based security configuration with the regular REST endpoints \(those used by the UI\) by implementing the `com.activiti.api.security.AlfrescoWebAppSecurityOverride` interface.

**Note:** Webapp and API use the same Spring HTTP security for authentication. To distinguish the security configurations, you should specify the path that the configuration applies to. These use /app and /api by default. For example, API configuration should begin with the following:

```
httpSecurity.antMatcher("/api/**")
```

**Parent topic:**[Global security override](../topics/securityConfigurationGlobalOverride.md)

