---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Authentication and Security, Authentication, Administration]
keyword: [configuration, Kerberos, Active Directory, authentication]
---

# Configure, Build and Install Jasig CAS Server

This topic describes the steps to build your own pre-configured CAS Server on machine 1 using Maven that integrates with Alfresco's authentication systems.

1.  Execute the following commands to set the appropriate directory structure.

    ```
    cd /root
    mkdir -p custom-cas-server/src/main/webapp/WEB-INF/classes
    cd custom-cas-server 
    ```

2.  Create the Maven Project Object Model \(POM\) for the customized server. Create a file pom.xml that pulls in the required CAS Server dependencies. Please note that we are using CAS 3.3.5. Now, include LDAP and X509 certificate support as shown below:

    ```
    <?xml version="1.0"?>
    <project xmlns="http://maven.apache.org/POM/4.0.0"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>org.alfresco.cas</groupId>
        <artifactId>alfresco-cas</artifactId>
        <version>1.0-SNAPSHOT</version>
        <packaging>war</packaging>
        <name>Alfresco CAS webapp</name>
        <organization>
            <name>Alfresco</name>
            <url>http://www.alfresco.com</url>
        </organization>
        <description>Alfresco's configuration of the JA-SIG CAS server.</description>
        <dependencies>
            <dependency>
                <groupId>org.jasig.cas</groupId>
                <artifactId>cas-server-webapp</artifactId>
                <version>3.3.5</version>
                <type>war</type>
            </dependency>
    
            <dependency>
                <groupId>org.jasig.cas</groupId>
                <artifactId>cas-server-core</artifactId>
                <version>3.3.5</version>
            </dependency>
    
            <!-- if you need LDAP handler -->
            <dependency>
                <groupId>org.jasig.cas</groupId>
                <artifactId>cas-server-support-ldap</artifactId>
                <version>3.3.5</version>
            </dependency>
    
            <!-- if you need X509 handler -->
            <dependency>
                <groupId>org.jasig.cas</groupId>
                <artifactId>cas-server-support-x509</artifactId>
                <version>3.3.5</version>
            </dependency>
    
          </dependencies>
        <build>
            <finalName>cas</finalName>
            <plugins>
                <plugin>
                    <artifactId>maven-compiler-plugin</artifactId>
                    <version>RELEASE</version>
                    <configuration>
                        <source>1.5</source>
                        <target>1.5</target>
                    </configuration>
                </plugin>
            </plugins>
        </build>
        <repositories>
            <repository>
                <id>jasig-repository</id>
                <name>JA-SIG Maven2 Repository</name>
                <url>http://developer.ja-sig.org/maven2</url>
            </repository>
        </repositories>
        <reporting>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-project-info-reports-plugin</artifactId>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-javadoc-plugin</artifactId>
                </plugin>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-changelog-plugin</artifactId>
                </plugin>
            </plugins>
        </reporting>
    </project> 
    ```

3.  Add the files that you need to customize. Create the main Spring configuration file in src/main/webapp/WEB-INF/deployerConfigContext.xml.

    In the example below:

    -   the LDAP directory is Active Directory, so the user names are in the form of User Principal Names \(UPNs\). These consist of a user name followed by an @ sign followed by the UPN suffix. This indicates that the `userDn` property of `contextSource` and the filter property of `FastBindLdapAuthenticationHandler` must use this same UPN format. For any other type of LDAP directory, you may need to bind with a full Distinguished Name \(DN\), in which case `userDn` should also be a DN and you will have to use `BindLdapAuthenticationHandler` instead of `FastBindLdapAuthenticationHandler` in order to resolve a user's DN from their user ID.
    -   authentication is enabled via SSL certificates with `X509CertificateCredentialsToIdentifierPrincipalResolver` and `X509CredentialsAuthenticationHandler`. This enables the Alfresco Share to securely authenticate itself as a client of Alfresco web application.
    -   an extra `x509Check` bean is used. This is required by the Spring web flow configuration to automatically forward clients with a trusted SSL certificate.
    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <beans xmlns="http://www.springframework.org/schema/beans" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-2.0.xsd">
    
       <!-- Preconfigure our LDAP directory -->
       <bean id="contextSource" class="org.springframework.ldap.core.support.LdapContextSource">
          <property name="pooled" value="true" />
          <property name="urls">
             <list>
                <value>ldap://ldap.host.com:389/</value>
             </list>
          </property>
          <property name="userDn" value="alfresco@domain" />
          <property name="password" value="secret" />
          <property name="baseEnvironmentProperties">
             <map>
                <entry>
                   <key>
                      <value>java.naming.security.authentication</value>
                   </key>
                   <value>simple</value>
                </entry>
             </map>
          </property>
       </bean>
    
       <bean id="authenticationManager" class="org.jasig.cas.authentication.AuthenticationManagerImpl">
          <property name="credentialsToPrincipalResolvers">
             <list>
                <bean
                   class="org.jasig.cas.adaptors.x509.authentication.principal.X509CertificateCredentialsToIdentifierPrincipalResolver">
                   <property name="identifier" value="$CN" />
                </bean>
                <bean class="org.jasig.cas.authentication.principal.UsernamePasswordCredentialsToPrincipalResolver" />
                <bean class="org.jasig.cas.authentication.principal.HttpBasedServiceCredentialsToPrincipalResolver" />
             </list>
          </property>
    
          <property name="authenticationHandlers">
             <list>
                <bean class="org.jasig.cas.authentication.handler.support.HttpBasedServiceCredentialsAuthenticationHandler">
                   <property name="httpClient" ref="httpClient" />
                </bean>
                <bean class="org.jasig.cas.adaptors.x509.authentication.handler.support.X509CredentialsAuthenticationHandler">
                   <property name="trustedIssuerDnPattern" value="^.*CN=Dave's Certificate Authority, O=Alfresco Software Inc\., L=Maidenhead, ST=Berkshire, C=GB$" />
                </bean>
                <bean class="org.jasig.cas.adaptors.ldap.FastBindLdapAuthenticationHandler">
                   <property name="filter" value="%u@domain" />
                   <property name="contextSource" ref="contextSource" />
                </bean>
             </list>
          </property>
       </bean>
    
       <bean id="userDetailsService" class="org.springframework.security.userdetails.memory.InMemoryDaoImpl">
          <property name="userMap">
             <value>
    
             </value>
          </property>
       </bean>
    
       <bean id="attributeRepository" class="org.jasig.services.persondir.support.StubPersonAttributeDao">
          <property name="backingMap">
             <map>
                <entry key="uid" value="uid" />
                <entry key="eduPersonAffiliation" value="eduPersonAffiliation" />
                <entry key="groupMembership" value="groupMembership" />
             </map>
          </property>
       </bean>
    
       <bean id="serviceRegistryDao" class="org.jasig.cas.services.InMemoryServiceRegistryDaoImpl" />
    
       <!-- Extra x509 bean -->
       <bean id="x509Check" p:centralAuthenticationService-ref="centralAuthenticationService"
          class="org.jasig.cas.adaptors.x509.web.flow.X509CertificateCredentialsNonInteractiveAction">
          <property name="centralAuthenticationService" ref="centralAuthenticationService" />
       </bean>
    </beans> 
    ```

4.  Add your logging configuration to src/main/webapp/WEB-INF/classes/log4j.properties.

    ```
    # For JBoss: Avoid to setup Log4J outside $JBOSS_HOME/server/default/deploy/log4j.xml!
    # For all other servers: Comment out the Log4J listener in web.xml to activate Log4J.
    log4j.rootLogger=ERROR, stdout, logfile
    
    log4j.appender.stdout=org.apache.log4j.ConsoleAppender
    log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
    log4j.appender.stdout.layout.ConversionPattern=%d %p [%c] - <%m>%n
    
    log4j.appender.logfile=org.apache.log4j.RollingFileAppender
    log4j.appender.logfile.File=cas.log
    log4j.appender.logfile.MaxFileSize=512KB
    # Keep three backup files.
    log4j.appender.logfile.MaxBackupIndex=3
    # Pattern to output: date priority [category] - message
    log4j.appender.logfile.layout=org.apache.log4j.PatternLayout
    log4j.appender.logfile.layout.ConversionPattern=%d %p [%c] - %m%n
    
    # WARNING: Setting the org.springframework logger to DEBUG displays debug information about
    # the request parameter values being bound to the command objects.  This could expose your
    # password in the log file.  If you are sharing your log files, it is recommend you selectively
    # apply DEBUG level logging on a an org.springframework.* package level (i.e. org.springframework.dao)
    log4j.logger.org.springframework=WARN
    #log4j.logger.org.springframework.web.servlet.i18n=DEBUG
    #log4j.logger.org.springframework.web.servlet.view=DEBUG
    #log4j.logger.org.quartz=DEBUG
    
    log4j.logger.org.jasig=INFO
    # WARNING: Setting the flow package to DEBUG will display
    # the parameters posted to the login servlet including
    # cleartext authentication credentials
    log4j.logger.org.jasig.cas.web.flow=INFO
    #log4j.logger.org.jasig.cas.authentication=DEBUG
    #log4j.logger.org.jasig.cas.web.flow.TicketGrantingTicketCheckAction=DEBUG
    #log4j.logger.org.jasig.cas.services.DefaultServiceRegistry=DEBUG
    #log4j.logger.org.jasig.cas.services=DEBUG 
    log4j.logger.org.jasig.cas.adaptors.x509.authentication.handler.support.X509CredentialsAuthenticationHandler=DEBUG
    ```

5.  Create a file `src/main/webapp/WEB-INF/login-webflow.xml` with the following code to ensure auto-redirect through the login screen with the client certificate that was exported to `alfresco-system.p12`.

    ```
     <?xml version="1.0" encoding="UTF-8"?>
        <flow xmlns="http://www.springframework.org/schema/webflow"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="
                  http://www.springframework.org/schema/webflow
                  http://www.springframework.org/schema/webflow/spring-webflow-1.0.xsd">
    
    	<start-state idref="initialFlowSetup"/>
    
    	<action-state id="initialFlowSetup">
    	  <action bean="initialFlowSetupAction" />
          <transition on="success" to="ticketGrantingTicketExistsCheck" />
    	</action-state>
    	
    	<decision-state id="ticketGrantingTicketExistsCheck">
    	  <if test="${flowScope.ticketGrantingTicketId != null}" then="hasServiceCheck" else="gatewayRequestCheck" />
    	</decision-state>
        
    	<decision-state id="gatewayRequestCheck">
    	  <if test="${externalContext.requestParameterMap['gateway'] != '' &amp;&amp; externalContext.requestParameterMap['gateway'] != null &amp;&amp; 
           flowScope.service != null}" then="redirect" else="startAuthenticate" /> (!!NOTE: This line is a part of the `if` statement and should be written in a single line) 
    	</decision-state>
    	
    	<decision-state id="hasServiceCheck">
    	  <if test="${flowScope.service != null}" then="renewRequestCheck" else="viewGenericLoginSuccess" />
    	</decision-state>
    	
    	<decision-state id="renewRequestCheck">
    	  <if test="${externalContext.requestParameterMap['renew'] != '' &amp;&amp; externalContext.requestParameterMap['renew'] != null}" then="startAuthenticate" 
           else="generateServiceTicket" /> (!!NOTE: This line is a part of the `if` statement and should be written in a single line)
    	</decision-state>
    	
    	<!-- 
    		The "warn" action makes the determination of whether to redirect directly to the 
            requested service or display the "confirmation" page to go back to the server.
    	-->
    	<decision-state id="warn">
    		<if test="${flowScope.warnCookieValue}" then="showWarningView" else="redirect" />
    	</decision-state>
    	
    	<action-state id="startAuthenticate">
    		<action bean="x509Check" />
    		<transition on="success" to="sendTicketGrantingTicket" />
    		<transition on="error" to="viewLoginForm" />
    	</action-state>
       
    	<view-state id="viewLoginForm" view="casLoginView">
    			<render-actions>
    			<action bean="authenticationViaFormAction" method="setupForm"/>
    			<action bean="authenticationViaFormAction" method="referenceData"/>
    		</render-actions>
    		<transition on="submit" to="bindAndValidate" />
    	</view-state>
    	
    	<action-state id="bindAndValidate">
    		<action bean="authenticationViaFormAction" />
    		<transition on="success" to="submit" />
    		<transition on="error" to="viewLoginForm" />
    	</action-state>
    	
    	<action-state id="submit">
    		<action bean="authenticationViaFormAction" method="submit" />
    		<transition on="warn" to="warn" />
    		<transition on="success" to="sendTicketGrantingTicket" />
    		<transition on="error" to="viewLoginForm" />
    	</action-state>
    	
    	<action-state id="sendTicketGrantingTicket">
    		<action bean="sendTicketGrantingTicketAction" />
    		<transition on="success" to="serviceCheck" />
    	</action-state>
    
    	<decision-state id="serviceCheck">
    		<if test="${flowScope.service != null}" then="generateServiceTicket" else="viewGenericLoginSuccess" />
    	</decision-state>
    	
    	<action-state id="generateServiceTicket">
    		<action bean="generateServiceTicketAction" />
    		<transition on="success" to ="warn" />
    		<transition on="error" to="viewLoginForm" />
    		<transition on="gateway" to="redirect" />
    	</action-state>
    
    	<!-- 
    		the "viewGenericLogin" is the end state for when a user attempts to login without 
            coming directly from a service. They have only initialized their single-sign on 
            session.
    	-->
    	<end-state id="viewGenericLoginSuccess" view="casLoginGenericSuccessView" />
    
    	<!-- 
    		The "showWarningView" end state is the end state for when the user has requested 
            privacy settings (to be "warned") to be turned on.  It delegates to a view defines
            in default_views.properties that display the "Please click here to go to the service.
            " message.
    	-->
    	<end-state id="showWarningView" view="casLoginConfirmView" />
    
    	<!-- 
    		The "redirect" end state allows CAS to properly end the workflow while still 
            redirecting the user back to the service required.
    	-->
    	<end-state id="redirect" view="bean:dynamicRedirectViewSelector" />
    	
    	<end-state id="viewServiceErrorView" view="viewServiceErrorView" />
        
        <end-state id="viewServiceSsoErrorView" view="viewServiceSsoErrorView" />
    
    	<global-transitions>
    	  <transition to="viewServiceErrorView" on-exception="org.springframework.webflow.execution.repository.NoSuchFlowExecutionException" />
          <transition to="viewServiceSsoErrorView" on-exception="org.jasig.cas.services.UnauthorizedSsoServiceException" />
          <transition to="viewServiceErrorView" on-exception="org.jasig.cas.services.UnauthorizedServiceException" />
    	</global-transitions>
    </flow> 
    ```

6.  Finally, build your configured version of the CAS war file and plug it into Tomcat:

    ```
    cd /root/custom-cas-server
    mvn -Dmaven.test.skip=true package install
    cp target/cas.war /opt/apache-tomcat-6.0.35/webapps/
    ```


**Parent topic:**[Using Alfresco with CAS authentication through Apache mod\_auth\_cas](../concepts/alf-modauthcas-home.md)

