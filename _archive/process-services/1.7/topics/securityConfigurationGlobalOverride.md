# Global security override

Global security override is the most important override. It allows you to replace the default authentication mechanism.

The interface to implement the global security override is called `com.activiti.api.security.AlfrescoSecurityConfigOverride`. It has one method `configureGlobal` which is called instead of the default logic. It sets up either database-backed or LDAP-backed authentication if an instance implementing this interface is found on the classpath.

Building further on the example in [Example implementation](customIdmExample.md), use the users.txt file, in combination with the `FileSyncService`, so that the application uses the user information in the file to execute authentication.

Spring Security \(which is used as underlying framework for security\) expects an implementation of the `org.springframework.security.authentication.AuthenticationProvider` to execute the actual authentication logic. What we have to do in the *configureGlobal* method is then instantiate our custom class:

```
package com.activiti.extension.bean;

@Component
public class MySecurityOverride implements AlfrescoSecurityConfigOverride {

  public void configureGlobal(AuthenticationManagerBuilder auth, UserDetailsService userDetailsService) {
    MyAuthenticationProvider myAuthenticationProvider = new MyAuthenticationProvider();
    myAuthenticationProvider.setUserDetailsService(userDetailsService);
    auth.authenticationProvider(myAuthenticationProvider);
  }

}
```

Note how this example passed the default `UserDetailsService` to this authentication provider. This class is responsible for loading the user data \(and its capabilities or *authorities* in Spring Security lingo\) from the database tables. Since we synchronized the user data using the same source, we can just pass it to our custom class.

So the actual authentication is done in the `MyAuthenticationProvider` class here. In this simple example, we just have to compare the password value in the *users.txt* file for the user. To avoid having to do too much low-level Spring Security plumbing, we let the class extend from the `org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider` class.

```
public static class MyAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

  protected Map<String, String> userToPasswordMapping = new HashMap<String, String>();

  protected UserDetailsService userDetailsService;

  public MyAuthenticationProvider() {

    // Read users.txt, and create a {userId, password} map
    try {
      InputStream inputStream = this.getClass().getClassLoader().getResourceAsStream("users.txt");
      BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
      String line = bufferedReader.readLine();
      while (line != null) {
        String[] parsedLine = line.split(";");
        userToPasswordMapping.put(parsedLine[0], parsedLine[4]);
        line = bufferedReader.readLine();
      }

      inputStream.close();
      } catch (Exception e) {
        e.printStackTrace();
      }
    }


  protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

    // We simply compare the password in the token to the one in the users.txt file

    String presentedPassword = authentication.getCredentials().toString();
    String actualPassword = userToPasswordMapping.get(userDetails.getUsername());

    if (!StringUtils.equals(presentedPassword, actualPassword)) {
      throw new BadCredentialsException("Bad credentials");
    }
  }

  protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {

    // Here we simply defer the loading to the UserDetailsService that was passed to this instance

    UserDetails loadedUser = null;
    try {
      loadedUser = userDetailsService.loadUserByUsername(username);
    } catch (Exception e) {
      throw new AuthenticationServiceException(e.getMessage(), e);
    }
    return loadedUser;
  }

}
```

There’s one last bit to configure. By default, the application is configured to log in using the email address. Set the following property to switch that to the *externalId*, meaning the id coming from the external IDM source \(*jlennon* in the *users.txt* file for example\):

```
security.authentication.use-externalid=true
```

Use the following property to configure case-sensitivity for logins:

```
security.authentication.casesensitive=true
```

Alternatively, you can override the *AuthenticationProvider* that is used \(instead of overriding the *configureGlobal*\) by implementing the `com.activiti.api.security.AlfrescoAuthenticationProviderOverride` interface.

-   **[REST Endpoints security overrides](../topics/rest_endpoints_security_overrides.md)**  
You can change the default security configuration of the REST API endpoints by implementing the `com.activiti.api.security.AlfrescoApiSecurityOverride` interface. By default, the REST API endpoints use the Basic Authentication method.
-   **[UserDetailsService override](../topics/userdetailsservice_override.md)**  
If the default `com.activiti.security.UserDetailsService` does not meet the requirement \(although it should cover most use cases\), you can override the implementation with the `com.activiti.api.security.AlfrescoUserDetailsServiceOverride` interface.

**Parent topic:**[Security configuration overrides](../topics/security_configuration_overrides.md)

