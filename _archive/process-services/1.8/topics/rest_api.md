# REST API

Alfresco Process Services comes with a REST API. The REST API is an enterprise equivalent of the Open Source REST API, exposing the generic Process Engine operations. It also includes a dedicated set of REST API endpoints for features specific to Alfresco Process Services.

**Important:** An internal REST API also exists that is used as REST endpoints by the JavaScript user interface. Do NOT use this API as the REST API URLs might modify the product to use unsupported features. In addition, the internal REST API uses a different authentication mechanism tailored towards web browser use.

-   **[Enabling CORS](../topics/enable-cors.md)**  
Solutions that use Alfresco Process Services REST APIs may be in a different domain or port. This is known as Cross Origin Resource Sharing \(CORS\).
-   **[REST API Authorization](../topics/rest_api_authorization.md)**  
The REST API uses authorization rules to determine a user’s access control for a process instance or task.
-   **[Using the REST API Explorer](../topics/rest_api_explorer.md)**  
Alfresco Process Services comes with a built-in REST API Explorer. This lets you discover and test the REST APIs of a locally running Process Services instance.
-   **[RAML support](../concepts/RAML-support.md)**  
Alfresco Process Services provides a RAML file that works with popular REST API development tools.
-   **[Alfresco Process Services REST API](../topics/process_services_api.md)**  
The REST API exposes data and operations that are specific to Alfresco Process Services.
-   **[Process Engine REST API](../topics/process_engine_rest_api.md)**  

-   **[Historic processes and tasks](../topics/history.md)**  
This section covers the examples for querying historic process instances and task instances in the Alfresco Process Services API. You can query for historic process instances and tasks to get information about ongoing and past process instances, or tasks.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

