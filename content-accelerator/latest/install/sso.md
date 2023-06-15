---
title: Single Sign On Support for Content Accelerator
---

Alfresco Content Accelerator (ACA) supports two major types of Single Sign On integrations:

* Direct SAML (v3.3 and above)
* Identity Service (v3.5.1 and above)

As of ACA 3.5.1, the Direct SAML SSO component is deprecated. A future release of ACA may drop support for the Direct SAML SSO integration.

## Key differences between supported SSO

* Identity Service only supports implicit flow as of ACA v3.5.1. SAML secret is kept server-side for Direct SAML.
* Identity Service integration offers the ability for direct Alfresco login and SSO login in the same ACA instance, whereas Direct SAML integration does not.
* Identity Service integration offers logout functionality, whereas Direct SAML integration does not.
* Identity Service is based on the Keycloak identity management application. ACA utilizes the official Alfresco Javascript API to support the OAuth2/OICD connection to Identity Service.

## Identity Service configuration steps

### Supported features

* Support all authentication mechanisms supported in Alfresco Identity Service/Keycloak.
* Allow Direct Login and SSO Login in same instance.
* Optional prompt to force user to click link to direct to Identity Provider sign-in.

### Preconditions

* Install, deploy, and configure Identity Service.
* Install, deploy, and configure ACA on ACS.
* Ensure ACA can network communicate with Identity Service installation.

### Configuration

To enable and configure Identity Service SSO in ACA:

1. Navigate to the deployed "ocms" web application and edit the file located at `ocms/assets/config-overrides.js`.

    This file uses the JSON file format to configure the web application.

2. Uncomment the block titled `auth` and walk through the comments inside the `auth` block.

3. Update the values of the JSON values as needed to enable and configure your ACA SSO.

4. Save the file and open ACA in a web browser to test.

> **Note:** Restarting your Java Web Application server is typically not required for static file updates such as `config-overrides.js`, though this could vary based on your Java Web Application server installation and configuration.

> **Note:** Clearing browser cookies, history, cache, and local storage is recommended between configuration updates.

### Example configuration

For a deployment with the following desired characteristics:

* Identity Service deployed at `https://alfresco.com/myauthservice` with realm name `alfresco`.
* You wish to enable both direct login and SSO login.
* Your ACA instance is available at `https://alfresco.com/ocms`.

The `auth` block should look like this:

```js
"auth" : {
    // leave this enabled if you wish users to see the option for direct login using username/password directly into Alfresco
    enableDirectLogin: true,
    // should always be enabled if you wish to utilize this aisLogin functionality, if not, comment out this full "auth" block
    enableAisLogin: true,
    // if false, will prompt user to click link to login. if not, will automatically redirect to authorization provider
    automaticallyPerformAisLogin: false,
    // timer (in milliseconds) for redirect page. suggested range of 1000 - 5000. Set to 0 if you want an immediate redirect
    automaticLoginRedirectTimerMs: 0,
    // your oauth2 realm host
    host : 'https://alfresco.com/myauthservice/realms/alfresco',
    // your oauth2 clientId
    clientId: 'alfresco',
    // your oauth2 secret for the realm
    secret: '**********',
    // do not change scope - openid only option supported at this time
    scope: 'openid',
    // update the redirecturi to your loadbalanced url root
    redirectUri: 'https://alfresco.com/ocms/',
    // do not change
    silentRefreshTimeout: '300', //Optional parameter 10 minutes default value
    // do not change authType - OAUTH only option supported at this time
    authType: 'OAUTH',
    // do not change provider - ECM only option supported at this time
    provider: 'ECM'
}
```

## Direct SAML configuration steps

The following configuration steps are used to enable Direct SAML SSO integration.

> **Note:** The Identity Service and Direct SAML integrations are mutually exclusive, so if Direct SAML is utilized, do not include any Identity Service integrations in your ACA configuration files.

### SSO settings

The example configuration file below lives on the Java Web Application classpath, for example, `TOMCAT_HOME/shared/classes/hpi-overrides.properties`.

If one doesn't exist already, place one there and make sure the previous step of adding the `shared/classes` directory to the classpath is done.

```bash
# NOTE - this properties file should decribe the default properties for the ACA wrapper.  Project specific settings
# should be placed in an 'hpi-overrides.properties' overlay file.
#
# SSO settings
#

# SSO Client Authentication Key (used in getSessionForUser)
clientAuthenticationKey=

# If true, SSO will be enabled
enableSSO=false

# Boolean to enable or disable faking out the SSO user (this should only ever be true in development!!!!)
fakeSSO=false

# SSO Repository (optional for some implementations)
docbase=

# OpenContent Services REST Root URL (ex: http://{server}/OpenContent/rest)
ocURL=

# Endpoint to use to connect for SSO.  Should build off of the ocURL (ex: /authentication/getSessionForUser)
ssoEndpoint=/authentication/getSessionForUser

# Indicates whether or not SiteMinder is used for SSO
isSSOSiteminder=false

# Enable SAML Authentication logic
samlSSO=false

# SAML Context for load balanced/proxied environments
# Properties should define how ACA is accessed via LB/proxy
scheme=http
serverName=localhost
serverPort=80
includeServerPortInRequestURL=false
contextPath=/ocms

# Variables that provide us the ability to override environment settings externally
appRoot=
shareUrl=
serviceUrlRoot=
openAnnotateURL=
openAnnotateVideoURL=
```

### SAML settings

#### Identity Provider (IdP) SAML Setup

SSO, Recipient, Destination URLs: `http://{server}/ocms/saml/SSO`

Audience: `{server}`

#### ACA properties

Override the following properties in `hpi-overrides.properties`:

```bash
#A UUID should be generated for the clientAuthenticationKey
clientAuthenticationKey=<UUID>
enableSSO=true
samlSSO=true
ssoEndpoint=/authentication/getSessionForUser
ocURL=http://{server}/alfresco/OpenContent
entityId=http://{server}/hpi/saml/metadata
entityBaseURL=http://{server}/ocms

#The metadata file that you want to use (This file should live at the tomcat classpath, for example, TOMCAT_HOME/shared/classes/)
metadata.file=metadata.xml

# SAML Context for load balanced/proxied environments
# Properties should define how ACA is accessed via LB/proxy
scheme=http
serverName=localhost
serverPort=80
includeServerPortInRequestURL=false
contextPath=/ocms
```

#### hpi-security-context-override.xml

You will need to create a `hpi-security-context.xml` file and place it on the Tomcat classpath, for example, `TOMCAT_HOME/shared/classes/`. This file will contain the beans and settings for your SAML configuration. Below is an example of what this file could look like:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans" 
    xmlns:security="http://www.springframework.org/schema/security" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xmlns:context="http://www.springframework.org/schema/context" xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.1.xsd
              http://www.springframework.org/schema/security http://www.springframework.org/schema/security/spring-security.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-3.1.xsd">

    <!-- Scan for auto-wiring classes in spring saml packages -->
    <context:component-scan base-package="org.springframework.security.saml"/>

    <!-- Secured pages with SAML as entry point -->
    <security:http entry-point-ref="samlEntryPoint" use-expressions="false">
        <security:csrf disabled="true"/>
        <security:intercept-url pattern="/**" access="IS_AUTHENTICATED_FULLY"/>
        <security:custom-filter before="FIRST" ref="metadataGeneratorFilter"/>
        <security:custom-filter after="BASIC_AUTH_FILTER" ref="samlFilter"/>
    </security:http>

    <!-- Filters for processing of SAML messages -->
    <bean id="samlFilter" class="org.springframework.security.web.FilterChainProxy">
        <security:filter-chain-map request-matcher="ant">
            <security:filter-chain pattern="/saml/metadata/**" filters="metadataDisplayFilter"/>
            <security:filter-chain pattern="/saml/login/**" filters="samlEntryPoint"/>
            <security:filter-chain pattern="/saml/SSO/**" filters="samlWebSSOProcessingFilter"/>
            <security:filter-chain pattern="/saml/SSOHoK/**" filters="samlWebSSOHoKProcessingFilter"/>
        </security:filter-chain-map>
        <property name="firewall" ref="httpFirewall"/>
    </bean>

    <!-- Handler deciding where to redirect user after successful login -->
    <bean id="successRedirectHandler" class="com.tsgrp.hpi.user.HPIAuthenticationSuccessManager">
        <property name="defaultTargetUrl" value="/" />
    </bean>

    <!-- Handler deciding where to redirect user after failed login -->
    <bean id="failureRedirectHandler" class="org.springframework.security.web.authentication.HPIAuthenticationFailureHandler">
    </bean>

    <security:authentication-manager alias="authenticationManager">
        <!-- Register authentication manager for SAML provider -->
        <security:authentication-provider ref="samlAuthenticationProvider"/>
    </security:authentication-manager>

    <!-- Logger for SAML messages and events -->
    <bean id="samlLogger" class="org.springframework.security.saml.log.SAMLDefaultLogger"/>
       <bean id="keyManager" class="org.springframework.security.saml.key.JKSKeyManager">
            <constructor-arg value="classpath:saml.keystore"/>
            <constructor-arg type="java.lang.String" value="**********"/>
            <constructor-arg>
            <map>
                <entry key="my-saml-key" value="**********"/>
            </map>
            </constructor-arg>
            <constructor-arg type="java.lang.String" value="my-saml-key"/>
    </bean>

    <!-- Entry point to initialize authentication, default values taken from properties file -->
    <bean id="samlEntryPoint" class="org.springframework.security.saml.SAMLEntryPoint">
        <property name="defaultProfileOptions">
            <bean class="org.springframework.security.saml.websso.WebSSOProfileOptions">
                <property name="includeScoping" value="false"/>
            </bean>
        </property>
    </bean>

    <!-- Filter automatically generates default SP metadata -->
    <bean id="metadataGeneratorFilter" class="org.springframework.security.saml.metadata.MetadataGeneratorFilter">
        <constructor-arg>
            <bean class="org.springframework.security.saml.metadata.MetadataGenerator">
                <property name="entityId" value="${entityId}"/>
                <property name="extendedMetadata">
                    <bean class="org.springframework.security.saml.metadata.ExtendedMetadata">
                        <property name="signMetadata" value="false"/>
                        <property name="idpDiscoveryEnabled" value="false"/>
                    </bean>
                </property>
                <property name="entityBaseURL" value="${entityBaseURL}"/>
                <property name="requestSigned" value="false"/>
            </bean>
        </constructor-arg>
    </bean>

    <!-- The filter is waiting for connections on URL suffixed with filterSuffix and presents SP metadata there -->
    <bean id="metadataDisplayFilter" class="org.springframework.security.saml.metadata.MetadataDisplayFilter"/>

    <!-- Configure HTTP Client to accept certificates from the keystore for HTTPS verification -->
    <bean class="org.springframework.security.saml.trust.httpclient.TLSProtocolConfigurer">
        <property name="sslHostnameVerification" value="default"/>
    </bean>


    <!-- IDP Metadata configuration - paths to metadata of IDPs in circle of trust is here -->
    <bean id="metadata" class="org.springframework.security.saml.metadata.CachingMetadataManager">
        <constructor-arg>
            <list>
                <!-- Bean for HTTP-based metadata validation -->
                <!--<bean class="org.opensaml.saml2.metadata.provider.HTTPMetadataProvider">
                    <constructor-arg value="${metadataProviderURL}"/>
                    <constructor-arg>
                        <value type="int">5000</value>
                    </constructor-arg>
                    <property name="parserPool" ref="parserPool" />
                </bean>-->

                <!-- Bean for local metadata validation -->
                <bean class="org.springframework.security.saml.metadata.ExtendedMetadataDelegate">
                    <constructor-arg>
                        <bean class="org.opensaml.saml2.metadata.provider.FilesystemMetadataProvider">
                            <constructor-arg>
                                <value type="java.io.File">classpath:${metadata.file}</value>
                            </constructor-arg>
                            <property name="parserPool" ref="parserPool"/>
                        </bean>
                    </constructor-arg>
                    <constructor-arg>
                        <bean class="org.springframework.security.saml.metadata.ExtendedMetadata">
                        </bean>
                    </constructor-arg>
                    <property name="metadataTrustCheck" value="false"/>
                </bean>
            </list>
        </constructor-arg>
    </bean>

    <!-- SAML Authentication Provider responsible for validating of received SAML messages -->
    <bean id="samlAuthenticationProvider" class="org.springframework.security.saml.web.IDPSAMLAuthenticationProvider"/>

    <!-- HTTP contextProvider (make all this configurable) for a load balanced env -->
    <bean id="contextProvider" class="org.springframework.security.saml.context.SAMLContextProviderLB">
        <property name="scheme" value="${scheme}"/>
        <property name="serverName" value="${serverName}"/>
        <property name="serverPort" value="${serverPort}"/>
        <property name="includeServerPortInRequestURL" value="${includeServerPortInRequestURL}"/>
        <property name="contextPath" value="${contextPath}"/>
    </bean>

<!-- for a non load-balanced enviornment
<bean id="contextProvider" class="org.springframework.security.saml.context.SAMLContextProviderImpl">
  <property name="storageFactory">
    <bean class="org.springframework.security.saml.storage.EmptyStorageFactory"/>
  </property>
</bean> -->
    <!-- Processing filter for WebSSO profile messages -->
    <bean id="samlWebSSOProcessingFilter" class="org.springframework.security.saml.SAMLProcessingFilter">
        <property name="authenticationManager" ref="authenticationManager"/>
        <property name="authenticationSuccessHandler" ref="successRedirectHandler"/>
        <property name="authenticationFailureHandler" ref="failureRedirectHandler"/>
    </bean>

    <!-- Processing filter for WebSSO Holder-of-Key profile -->
    <bean id="samlWebSSOHoKProcessingFilter" class="org.springframework.security.saml.SAMLWebSSOHoKProcessingFilter">
        <property name="authenticationManager" ref="authenticationManager"/>
        <property name="authenticationSuccessHandler" ref="successRedirectHandler"/>
        <property name="authenticationFailureHandler" ref="failureRedirectHandler"/>
    </bean>


    <!-- Class loading incoming SAML messages from httpRequest stream -->
    <bean id="processor" class="org.springframework.security.saml.processor.SAMLProcessorImpl">
        <constructor-arg>
            <list>
                <ref bean="redirectBinding"/>
                <ref bean="postBinding"/>
                <ref bean="artifactBinding"/>
                <ref bean="soapBinding"/>
                <ref bean="paosBinding"/>
            </list>
        </constructor-arg>
    </bean>

    <!-- SAML 2.0 WebSSO Assertion Consumer -->
    <bean id="webSSOprofileConsumer" class="org.springframework.security.saml.websso.WebSSOProfileConsumerImpl">
        <property name="responseSkew" value="21660" />
        <!-- 6:01 -->
    </bean>

    <!-- SAML 2.0 Holder-of-Key WebSSO Assertion Consumer -->
    <bean id="hokWebSSOprofileConsumer" class="org.springframework.security.saml.websso.WebSSOProfileConsumerHoKImpl"/>

    <!-- SAML 2.0 Web SSO profile -->
    <bean id="webSSOprofile" class="org.springframework.security.saml.websso.WebSSOProfileImpl"/>

    <!-- SAML 2.0 Holder-of-Key Web SSO profile -->
    <bean id="hokWebSSOProfile" class="org.springframework.security.saml.websso.WebSSOProfileConsumerHoKImpl"/>

    <!-- SAML 2.0 ECP profile -->
    <bean id="ecpprofile" class="org.springframework.security.saml.websso.WebSSOProfileECPImpl"/>

    <!-- Bindings, encoders and decoders used for creating and parsing messages -->
    <bean id="postBinding" class="org.springframework.security.saml.processor.HTTPPostBinding">
        <constructor-arg ref="parserPool"/>
        <constructor-arg ref="velocityEngine"/>
    </bean>

    <bean id="redirectBinding" class="org.springframework.security.saml.processor.HTTPRedirectDeflateBinding">
        <constructor-arg ref="parserPool"/>
    </bean>

    <bean id="artifactBinding" class="org.springframework.security.saml.processor.HTTPArtifactBinding">
        <constructor-arg ref="parserPool"/>
        <constructor-arg ref="velocityEngine"/>
        <constructor-arg>
            <bean class="org.springframework.security.saml.websso.ArtifactResolutionProfileImpl">
                <constructor-arg>
                    <bean class="org.apache.commons.httpclient.HttpClient">
                        <constructor-arg>
                            <bean class="org.apache.commons.httpclient.MultiThreadedHttpConnectionManager"/>
                        </constructor-arg>
                    </bean>
                </constructor-arg>
                <property name="processor">
                    <bean class="org.springframework.security.saml.processor.SAMLProcessorImpl">
                        <constructor-arg ref="soapBinding"/>
                    </bean>
                </property>
            </bean>
        </constructor-arg>
    </bean>

    <bean id="soapBinding" class="org.springframework.security.saml.processor.HTTPSOAP11Binding">
        <constructor-arg ref="parserPool"/>
    </bean>

    <bean id="paosBinding" class="org.springframework.security.saml.processor.HTTPPAOS11Binding">
        <constructor-arg ref="parserPool"/>
    </bean>

    <!-- Initialization of OpenSAML library-->
    <bean class="org.springframework.security.saml.SAMLBootstrap"/>

    <!-- Initialization of the velocity engine -->
    <bean id="velocityEngine" class="org.springframework.security.saml.util.VelocityFactory" factory-method="getEngine"/>

    <!-- XML parser pool needed for OpenSAML parsing -->
    <bean id="parserPool" class="org.opensaml.xml.parse.StaticBasicParserPool" init-method="initialize">
        <property name="builderFeatures">
            <map>
                <entry key="http://apache.org/xml/features/dom/defer-node-expansion" value="false"/>
            </map>
        </property>
    </bean>

    <bean id="parserPoolHolder" class="org.springframework.security.saml.parser.ParserPoolHolder"/>

</beans>
```

#### OpenContent

In your `opencontent-override-placeholders.properties` file, set your client authentication key to the same string as the one set in ACA and enable SSO:

```bash
client.authentication.key=<UUID>
sso.enabled=true
```
