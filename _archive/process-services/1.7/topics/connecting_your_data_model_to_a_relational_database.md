# Connecting your data model to a relational database

You can establish connection from your process with a relational database. To enable the connection, you must first register the data source for your tenant in the Identity Management app in Alfresco Process Services.

**To configure the data source:**

1.  In the **Identity Management** app, click **Tenants** \> **Data sources**.
2.  Click + \(plus icon\) and configure the following settings \(see the *activiti-app.properties* file for more details\):
    -   **Name** – Name of your data source. For example, modeler.

    -   **JDBC url** – The JDBC URL used to connect to the database. For example:

        *jdbc:mysql://127.0.0.1:3306/modeler?characterEncoding=UTF-8* - **Driver class** – The JDBC driver used to connect to the database. For example: com.mysql.jdbc.Driver - **Username & Password** – The username and password of the account used to connect to the database. . Click **Save**.


**Parent topic:**[Data Models](../topics/data_models.md)

