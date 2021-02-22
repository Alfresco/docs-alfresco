# Data Models

A Data Model enables you to access and manipulate data related to a business process in Alfresco Process Services. For example, you can define a data model that maps to a relational database \(via JDBC\) or a custom API to connect to an external source such as a patient database or a customer database.

To use the Data Model functionality effectively, perform one or all of the following steps:

-   Reference an entity while mapping variables.

-   Make entity fields visible in the process by mapping them.

-   Reference mapped entity fields in forms when creating or editing forms.

-   Reference entity fields in expressions when creating or maintaining decision tables.


-   **[Connecting your data model to a relational database](../topics/connecting_your_data_model_to_a_relational_database.md)**  
You can establish connection from your process with a relational database. To enable the connection, you must first register the data source for your tenant in the Identity Management app in Alfresco Process Services.
-   **[Defining data models](../topics/defining_data_models.md)**  
Once defined, Data Models enable you to read, insert, update, and delete entities while working through your process.
-   **[Importing data models](../topics/importing_data_models.md)**  
Use these instructions to import a data model from a database schema.
-   **[Using data model in your processes](../topics/using_data_model_in_your_processes.md)**  
Once you have defined the data model for a database data source, the next step is to use them in forms, decision tables, and process conditions, by mapping them into form fields or process variables. For example, to use patients’ information, you can map their information such as their name and address into your forms.
-   **[Saving data using your data model](../topics/saving_data_using_your_data_model.md)**  
 As you collect new data about an entity, you may wish to save this back to the database. However, as this is not done automatically when a form is saved, you must create a task in your process to explicitly save the data you want.
-   **[Creating data models for folders](../concepts/ps-create-datamodel.md)**  
You can map entities to the Alfresco Content Services repository to create data models for Alfresco Content Services folders.
-   **[Importing content models](../tasks/ps-import-model.md)**  
With Alfresco Content Services you can define and use custom content models using either XML or the Alfresco Share Model Manager. You can import content models and use them in your data models.
-   **[Using folder entities in process applications](../concepts/ps-folder-entities.md)**  
When you've created a folder data model, you can use it in several ways.

**Parent topic:**[Process Services Landing Page](../concepts/Landing-page.md)

