# Security configuration overrides

Configure security with the `com.activiti.conf.SecurityConfiguration` class. It allows you to switch between database and LDAP/Active Directory authentication out of the box. It also configures REST endpoints under "/app" to be protected using a cookie-based approach with tokens and REST endpoints under "*/api*" to be protected by Basic Auth.

You can override these defaults, if the out-of-the-box options are not adequate for your environment. The following sections describe the different options.

All the *overrides* described in the following sections follow the same pattern of creating a Java class that implements a certain interface. This class needs to be annotated by *@Component* and must be found in a package that is component-scanned.

**Note:** Webapp and API use the same Spring HTTP security for authentication. To distinguish the security configurations, you should specify the path that the configuration applies to. These use /app and /api by default. For example, API configuration should begin with the following:

```
httpSecurity.antMatcher("/api/**")
```

-   **[Global security override](../topics/securityConfigurationGlobalOverride.md)**  
Global security override is the most important override. It allows you to replace the default authentication mechanism.
-   **[PasswordEncoder override](../topics/passwordencoder_override.md)**  
By default, Alfresco Process Services uses the `org.springframework.security.crypto.password.StandardPasswordEncoder` for encoding passwords in the database. Note that this is only relevant when using database-backed authentication \(so does not hold LDAP/Active Directory\). This is an encoder that uses SHA-256 with 1024 iterations and a random salt.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

