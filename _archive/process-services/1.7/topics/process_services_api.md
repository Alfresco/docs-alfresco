# Alfresco Process Services REST API

The REST API exposes data and operations that are specific to Alfresco Process Services.

In contrast to the Process Engine REST API, the Alfresco Process Services REST API can be called using any user. The following sections describe the supported REST API endpoints.

-   **[Server Information](../topics/server_information.md)**  
 To retrieve information about the Process Services version, use the following command:
-   **[Profile](../topics/profile.md)**  
This operation returns account information for the current user. This is useful to get the name, email, the groups that the user is part of, the user picture, and so on.
-   **[Runtime Apps](../topics/runtime_apps.md)**  
When a user logs into Process Services, the landing page is displayed containing all the apps that the user is allowed to see and use.
-   **[App Definitions List](../topics/app_definitions_list.md)**  
 To retrieve all App definitions including ones that were not deployed at runtime:
-   **[App Import And Export](../topics/app_import_and_export.md)**  
It is possible to export app definitions and import them again. From the REST API point of view, this is useful to bootstrap an environment \(for users or continuous integration\).
-   **[App Publish and Deploy](../topics/app_publish_and_deploy.md)**  
 Before an app model can be used, it needs to be published. This can be done through following call:
-   **[Process Definition Models List](../topics/process_definition_models_list.md)**  
 To retrieve a list of process definition models:
-   **[Model Details and History](../topics/model_details_and_history.md)**  
 Both app definition and process definition models are versioned.
-   **[BPMN 2.0 Import and Export](../topics/bpmn_2_0_import_and_export.md)**  
 To export a process definition model to a BPMN 2.0 XML file:
-   **[Process Definitions](../topics/process_definitions.md)**  
 Get a list of process definitions \(visible within the tenant of the user\):
-   **[Start Form](../topics/start_form.md)**  
When process definition has a start form \(`hasStartForm` is `true` as in the call above\), the start form can be retrieved as follows:
-   **[Start Process Instance](../topics/start_process_instance.md)**  
To start process instances, use:
-   **[Process Instance List](../topics/process_instance_list.md)**  
 To get the list of process instances:
-   **[Get Process Instance Details](../topics/get_process_instance_details.md)**  

-   **[Delete a Process Instance](../topics/delete_a_process_instance.md)**  

-   **[Process Instance Audit Log As JSON](../topics/process_instance_audit_log_as_json.md)**  
 If you need the audit log information as a JSON you can use the next URL:
-   **[Process instance variables](../topics/process_instance_variables.md)**  
 A process instance can have several variables.
-   **[Process Instance Identity links](../topics/process_instance_identity_links.md)**  

-   **[Task List](../topics/task_list.md)**  
To return a list of tasks, use:
-   **[Task Details](../topics/task_details.md)**  

-   **[Task Form](../topics/task_form.md)**  

-   **[Create a Standalone Task](../topics/create_a_standalone_task.md)**  
To create a task \(for the user in the authentication credentials\) that is not associated with a process instance:
-   **[Task Actions](../topics/task_actions.md)**  
 To update the details of a task:
-   **[Task Variables](../topics/task_variables.md)**  
 To create new task variables:
-   **[Task Identity links](../topics/task_identity_links.md)**  
 To get all identity links for a task:
-   **[User Task Filters](../topics/user_task_filters.md)**  
Custom task queries can be saved as a user task filter. To get the list of task filters for the authenticated user:
-   **[Comments](../topics/comments.md)**  
 Comments can be added to a process instance or a task.
-   **[Checklists](../topics/checklists.md)**  
 You can add checklists to a task for tracking purposes.
-   **[Task Audit Info \(as JSON\)](../topics/task_audit_info_as_json.md)**  
 To obtain the audit information for a specific task in JSON format, use the following URL:

**Parent topic:**[REST API](../topics/rest_api.md)

