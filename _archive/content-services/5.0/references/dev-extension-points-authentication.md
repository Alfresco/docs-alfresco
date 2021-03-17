# Authentication

Alfresco provides a number of authentication systems out-of-the-box, such as LDAP. It is also possible to implement and configure custom authentication systems.

|Information|Authentication|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco includes multiple authentication systems, including Alfresco Database, Active Directory, LDAP, Kerberos, External, and can be set up to authenticate with one of them or a combination of them. Normally these authentication systems cover most of the authentication combinations and mechanisms needed. Make sure to read through the [authentication and security section](../concepts/auth-intro.md) before proceeding so you are sure that there is not already an out-of-the-box authentication solutions that will work for you. In special circumstances when there is a proprietary authentication system that Alfresco needs to authenticate with, a custom authentication mechanism can be implemented and deployed. These are usually authentication systems or authentication databases that provides no standard authentication protocol, such as LDAP, and that does not provide a user interface where the user can login and be redirected to Alfresco \(this is called proxy authentication and the External authentication method can be used out-of-the-box, see [this information](../concepts/auth-basics.md)\).

 Each authentication system that Alfresco supports is implemented as a [subsystem](dev-extension-points-custom-subsystem.md) that can be enabled and configured independently.

 To demonstrate how to implement a custom/proprietary authentication mechanism we will implement an authentication component that just authenticates a certain user-name held in memory. The same approach can be used to implement an authentication component that connects to a remote system for authentication or simply authenticates via for example a RDBMS system.

 The first thing we need to do is create a new type for the subsystem category **Authentication**. We do this by creating a directory under the /alfresco/subsystems/Authentication directory. Let's call this type customauthenticator. In this new directory we create a property file and a Spring context file with the following names:

 ```
customauthenticator-authentication.properties
customauthenticator-authentication-context.xml
```

 For these files to be picked up they need to end in .properties and -context.xml. So we could have used completely different file-names here if we wanted to, as long as they have the correct suffix. In the properties file we add the following properties:

 ```
customauthenticator.remote.server.hostname=host1.acme.com
customauthenticator.remote.server.port=5050
customauthenticator.allowGuestLogin=true 
```

 This should be properties that are needed by our custom authentication component, such as remote server connection information, database login info etc. The first two properties are there for demonstration purposes, they will not actually be used in this sample.

 After this we define our custom authentication component Spring bean in the Spring context file:

 ```
<bean id="authenticationComponent"
    class="org.alfresco.tutorial.repo.security.authentication.CustomAuthenticationComponentImpl"
    parent="authenticationComponentBase">
  <property name="allowGuestLogin"><value>${customauthenticator.allowGuestLogin}</value></property>
  <property name="remoteAuthenticatorHostname"><value>${customauthenticator.remote.server.hostname}</value></property>
  <property name="remoteAuthenticatorPort"><value>${customauthenticator.remote.server.port}</value></property>
  <property name="nodeService">
      <ref bean="nodeService" />
  </property>
  <property name="personService">
      <ref bean="personService" />
  </property>
  <property name="transactionService">
      <ref bean="transactionService" />
  </property>
  <property name="defaultAdministratorUserNames">
      <set>
          <value>${alfresco_user_store.adminusername}</value>
          <value>administrator</value>
      </set>
  </property>
  <property name="defaultGuestUserNames">
      <set>
          <value>${alfresco_user_store.guestusername}</value>
      </set>
  </property>
</bean>
```

 The `org.alfresco.tutorial.repo.security.authentication.CustomAuthenticationComponentImpl` class is where the custom authentication mechanism is implemented, and it uses the properties that we defined. This class will extend an out of the box base class called `org.alfresco.repo.security.authentication.AbstractAuthenticationComponent` that contains some basic implementation details. This class also needs access to a number of Alfresco Services that we inject.

 For information about how a typical authentication component class implementation looks like for your Alfresco version, and its Spring bean definition, open up the Alfresco source code and search for \*AuthenticationComponent\* classes and then look for Spring context files \(i.e. xml files\) that contains "`<bean id="authenticationComponent`".

 Now we can implement the `CustomAuthenticationComponentImpl` class, which in this case just allows the admin, guest, and john users to login:

 ```
package org.alfresco.tutorial.repo.security.authentication;

import net.sf.acegisecurity.Authentication;

import org.alfresco.error.AlfrescoRuntimeException;
import org.alfresco.repo.security.authentication.AbstractAuthenticationComponent;
import org.alfresco.repo.security.authentication.AuthenticationException;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class CustomAuthenticationComponentImpl extends AbstractAuthenticationComponent {
    private static final Log LOG = LogFactory.getLog(CustomAuthenticationComponentImpl.class);

   /**
    * Some custom properties that could be used to inject a remote login server hostname and port.
    * Not used at the moment but demonstrates property injection in custom authentication component.
    */
    private String remoteAuthenticatorHostname;
    private String remoteAuthenticatorPort;

    public void setRemoteAuthenticatorHostname(String remoteAuthenticatorHostname) {
        this.remoteAuthenticatorHostname = remoteAuthenticatorHostname;
    }

    public void setRemoteAuthenticatorPort(String remoteAuthenticatorPort) {
        this.remoteAuthenticatorPort = remoteAuthenticatorPort;
    }

    public void authenticateImpl(String userName, char[] password) throws AuthenticationException {
        if (LOG.isDebugEnabled()) {
           LOG.debug("Login request(" + remoteAuthenticatorHostname + ":" + remoteAuthenticatorPort +
           ") : [userName=" + userName + "][password=" + String.valueOf(password) + "]");
        }
      
        // Do your custom authentication here, and then set the current user (in this example we are only allowing
        // john to authenticate successfully, and we don't check pwd)
        // You would typically connect to the remote authentication mechanism to verify username/pwd...
        if (StringUtils.equals(userName, "john") || isGuestUserName(userName) ||
                getDefaultAdministratorUserNames().contains(userName)) {
            setCurrentUser(userName);
        } else {
            String msg = "Login request: username not recognized [userName=" + userName + "]";
            LOG.error(msg);
            throw new AuthenticationException(msg);
        }
    }

    /**
     * The default is not to support token base authentication
     */
    public Authentication authenticate(Authentication token) throws AuthenticationException {
        throw new AlfrescoRuntimeException("Authentication via token not supported");
    }

    /**
     * This authentication component implementation allows guest login
     * @return
     */
    @Override
    protected boolean implementationAllowsGuestLogin() {
        return true;
    }
}
```

 The `authenticationImpl` method is called by the Authentication subsystem to delegate the authentication to whatever mechanism is needed. This is the method where you should call an remote system or connect to a database to verify passed in `userName` and `password`. In this case we just checks if it is an Administrator user, guest user, or a user with user name set to `john`.

 For this authentication component to be used within a subsystem, and in an authentication chain \(i.e. where you try several authentication mechanism in order\), the following extra Spring bean definitions need to be included:

 ```
<!-- Wrapped version to be used within subsystem -->
<bean id="AuthenticationComponent" class="org.springframework.transaction.interceptor.TransactionProxyFactoryBean">
   <property name="proxyInterfaces">
      <list>
         <value>org.alfresco.repo.security.authentication.AuthenticationComponent</value>
      </list>
   </property>
   <property name="transactionManager">
      <ref bean="transactionManager" />
   </property>
   <property name="target">
      <ref bean="authenticationComponent" />
   </property>
   <property name="transactionAttributes">
      <props>
         <prop key="*">${server.transaction.mode.default}</prop>
      </props>
   </property>
</bean>

<!-- localAuthenticationService for authentication chaining -->
<bean id="localAuthenticationService" class="org.alfresco.repo.security.authentication.AuthenticationServiceImpl">
   <property name="ticketComponent">
      <ref bean="ticketComponent"/>
   </property>
   <property name="authenticationComponent">
      <ref bean="authenticationComponent"/>
   </property>
   <property name="sysAdminParams">
      <ref bean="sysAdminParams"/>
   </property>
</bean>
```

 The last thing needed to try out this authentication component is to enable it, we do this by some configuration in alfresco-global.properties:

 ```
authentication.chain=alfinst:alfrescoNtlm,custauth1:customauthenticator
```

In this case we have just added our new `customauthenticator` at the end of the default authentication chain with an instance name of `custauth1`.

 After restarting Alfresco we should be able to login with the user-name `john` using any password.

|
|Deployment - App Server|-   tomcat/shared/classes/alfresco/extension/subsystems/Authentication/\{type\} - Authentication component properties and Spring Beans
-   The Java class implementation does not lend itself very well to be directly deployed directly to the application server. Use a Repo AMP SDK project instead, see below.

|
|[Deployment - SDK Project](../tasks/alfresco-sdk-tutorials-amp-archetype.md)|-   repo-amp/src/main/amp/config/alfresco/subsystems/Authentication/\{type\} - Authentication component properties and Spring Beans
-   repo-amp/src/main/java - Authentication component implementation classes

|
|More Information|-   [Authentication subsystems overview](../concepts/auth-subsystem-intro.md)
-   [Authentication chain](../concepts/auth-subsystem-chain.md)
-   [Configuring Authentication subsystems](../concepts/auth-config-examples.md)

|
|Sample Code|-   [A sample implementation of a custom authentication mechanism](https://github.com/Alfresco/alfresco-sdk-samples/tree/alfresco-50/all-in-one/custom-authentication-repo)

|
|Tutorials|None|
|Alfresco Developer Blogs|None|

