# Defining data models

Once defined, Data Models enable you to read, insert, update, and delete entities while working through your process.

When configuring data source and data models for DBMSs you will normally require the JDBC driver to be available at run-time. Alfresco Process Services is only supplied with the driver for the H2 database. For other DBMSs \(MySQL, Oracle, PostgreSQL\) make sure that the relevant JDBC drivers are in the classpath, for example the Tomcat library path or <Process Services Installation\>/tomcat/webapps/activiti-app/WEB-INF/lib.

You can either manually define a data model or import it from an existing data source, such as a relational database schema or an Alfresco content model.

**To define a data model:**

1.  From the **App Designer**, click **Data Models**. The Data Models page is displayed.
2.  Click **Create Data Model**. The Create a new data model dialog box appears. Or to import an existing data model, click **Import Data Model**.
3.  Select the data source that you defined in Identity Management.
4.  Click **Add Entity** and enter data in the following fields:
    -   **Entity name** – The name you want to use for the entity, for example, Customer.

    -   **Entity description** **\(optional\)** – Description of the entity.

    -   **Table name** – The database table name that you want the entity to be mapped to, for example Customer.

    -   **Attributes** – Displays the entity attributes as you add them.

5.  Click **Add Attribute** and enter data in the following fields:
    -   **Attribute name** – Name you want to use for the attribute, for example, Customer Id.

    -   **Attribute description \(optional\)** – Description of the attribute.

    -   **Column name** – Column name as specified in the database, for example, id.

    -   **Attribute type** – One of the following attribute types: String, number, date.

    -   **Primary key** – Select to indicate if the attribute is a primary key or not.

    -   **Database generated value \(autoincrement\)** - Select this if the primary key is set to autoincrement in the database.

    -   **Required** – Select to indicate if the attribute should be mandatory or not.

6.  Save the data model.

**Note:** The **Remove entity** and **Remove attribute** buttons can be used to remove entities and attributes respectively.

**Parent topic:**[Data Models](../topics/data_models.md)

