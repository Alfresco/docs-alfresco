# Hook points

A *hook point* is a place where custom logic can be added. Typically this is done by implementing a certain interface and putting the class implementing the interface on the classpath where it can be found by the classpath component scanning \(package `com.activiti.extension.bean` for example\).

-   **[Login/LogoutListener](../topics/login_logoutlistener.md)**  
 **interface**: com.activiti.api.security.LoginListener and com.activiti.api.security.LogoutListener
-   **[Process engine configuration configurer](../topics/process_engine_configuration_configurer.md)**  
 **interface**: com.activiti.api.engine.ProcessEngineConfigurationConfigurer
-   **[Rule engine configuration configurer](../topics/rule_engine_configuration_configurer.md)**  
 **interface**: com.activiti.api.engine.DmnEngineConfigurationConfigurer
-   **[Process Engine event listeners](../topics/process_engine_event_listeners.md)**  
It is possible to listen to events fired by the Process Engine. By default \(and if enabled\) there is a listener that captures these events, processes them before sending them to Elasticsearch \(which is used for analytics\). If the event data should be going somewhere else, for example an external BI warehouse, the following interface should be implemented and can be used to execute any logic when the event is fired.
-   **[Processing document generation variables](../topics/processing_document_generation_variables.md)**  
 **interface**: com.activiti.api.docgen.TemplateVariableProcessor
-   **[Business Calendar](../topics/business_calendar.md)**  
 Use the business calendar when calculating due dates for tasks.

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

