# Configuring Alfresco Process Services

Configure Alfresco Process Services using a properties file named activiti-app.properties. This file must be placed on the application server’s classpath to be found.

Additionally, the properties file is available with the following options:

-   An activiti-app.properties file with default values in the WAR file \(or exploded WAR folder\) under the WEB-INF/classes/META-INF/activiti-app folder.

-   An activiti-app.properties file with custom values on the classpath. For example, the WEB-INF/classes folder of the WAR, the */lib* folder of Tomcat, or other places specific to the web container being used.


The values of a configuration file on the classpath have precedence over the values in the WEB-INF/classes/META-INF/activiti-app/activiti-app.properties file.

For the Alfresco Process Services user interface, there is an additional configuration file named app-cfg.js. This file is located inside the .war file’s script directory.

-   **[Minimal configuration](../topics/minimal_configuration.md)**  
 At a minimum, the application requires the following settings to run:
-   **[General Server settings](../topics/general_server_settings.md)**  
 By default, the following properties are defined for general server that can be modified.
-   **[Encrypting configuration properties](../tasks/ps-encryption-process-flow.md)**  
You can encrypt sensitive properties in the activiti-app.properties, activiti-admin.properties and activiti-ldap.properties configuration files.
-   **[Database configuration](../topics/databaseConfiguration.md)**  
Set the following properties to change the database.
-   **[Language Support](../topics/ps-language-support.md)**  

-   **[Configuring Kerberos against Active Directory \(AD\)](../tasks/ps-auth-kerberos-ADconfig.md)**  
Process Services support for Kerberos SSO allows customers with existing Kerberos AD infrastructure to quickly and easily set up windows-based SSO for their users’ access. It’s established as a security standard in many organizations and does not require additional infrastructure. It allows users secure access to the Process Services app \(`activiti-app`\) without explicit login through a web browser.
-   **[Configuring CORS](../topics/enabling-cors.md)**  
To enable Cross Origin Resource Sharing \(CORS\) in Alfresco Process Services, set the `cors.enabled` property to true in the activiti-app.properties file.
-   **[Business Calendar settings](../topics/business_calendar_settings.md)**  
Business Calendar is used to calculate relative due dates for tasks. To exclude weekends when calculating a task’s relative due date, set the *calendar.weekends* property as follows:
-   **[Login Session](../topics/login_session.md)**  
To invalidate the current APS app login session when you close the web browser, do the following:
-   **[Initial User Created on First Start Up](../topics/initial_user_created_on_first_start_up.md)**  
When the application starts for the first time, it will verify that there is at least one user in the system. If not, a user with superuser rights will be created.
-   **[Email Server configuration](../topics/emailServerConfiguration.md)**  
 The application sends out emails to users on various events. For example, when a task is assigned to the user.
-   **[Elasticsearch configuration](../topics/elasticsearch_configuration.md)**  

-   **[Application Access and default example app](../topics/application_access_and_default_example_app.md)**  
It is possible to configure whether users get access to the model editors \(the **App Designer** application\) and the analytics application.
-   **[Group Manager Involvement](../topics/group_manager_involvement.md)**  
When a task is created that has one or more candidate groups assigned, the group managers for those groups will be automatically involved with the created task. To stop group managers from being involved, set the following property to false.
-   **[Process Definition Cache](../topics/process_definition_cache.md)**  
The Process Engine operates in a stateless way. However, there is data that will never change, which makes it a prime candidate for caching.
-   **[Content Storage](../topics/contentStorageConfig.md)**  
Alfresco Process Services enables you to upload content, such as attaching a file to a task or a form. This content is stored on a disk with the following configuration settings for the path:
-   **[Microsoft Office integration](../topics/microsoft_office_integration.md)**  
The Microsoft Office integration \(opening an Office document directly from the browser\) doesn’t need any specific configuration. However, the protocol used for the integration mandates the use of **HTTPS** servers by default. This means that Alfresco Process Services must run on a server that has HTTPS and its certificates are correctly configured.
-   **[Logging back-end metrics](../topics/logging_backend_metrics.md)**  
The application uses SLF4J bounded to Log4j. The log4j.properties configuration file can be found in the WEB-INF/classes folder of the WAR file.
-   **[External Identity Management \(LDAP/Active Directory\)](../topics/externalIdentityManagement.md)**  
It’s possible to hook up a centralized user data store with Alfresco Process Services. Any server supporting the LDAP protocol can be used. Special configuration options and logic has been included to work with Active Directory \(AD\) systems too.
-   **[Integration with external systems](../topics/integration_with_external_systems.md)**  
You can integrate Alfresco Process Services with external systems.
-   **[Validator configuration](../topics/validator_configuration.md)**  
By default, Alfresco Process Services is configured in a way that process modelers have access to all powerful features of the Process Engine. In many organizations this is not a problem, as the people who are modeling are trusted IT people or business analysts.
-   **[License configuration](../topics/license_configuration.md)**  
It is possible to start up the application without a license \(it will then enter read only mode\) and later upload one from the user interface. See the following table for settings that apply to that scenario.
-   **[Multi-schema multi-tenancy \(MS-MT\)](../topics/multi_schema_multi_tenancy_ms_mt.md)**  
It is possible to run Alfresco Process Services in so-called "multi-schema multi-tenancy" mode \(MS-MT\). This is a multi-tenant setup, where every tenant has its own database schema. This means that the data of one tenant is completely separated from the data of other tenants.
-   **[Cross-Site Request Forgery \(CSRF\)](../topics/cross_site_request_forgery.md)**  
Cross-Site Request Forgery, also referred to as CSRF, is one of the most common form of attacks plaguing web browsers. This type of attack results in a malicious request being submitted on a user’s behalf without their consent.

**Parent topic:**[Administering Alfresco Process Services](../topics/adminGuide.md)

