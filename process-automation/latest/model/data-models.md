---
title: Data Models
---

A data model allows you to represent complex objects your application is handling. It allows you to define the standard data structure you will use in your application using JSON schema. A data model is useful when you want to query an internal or external service that has a specific structure.
The data model editor allows you to visually create the JSON schema and the JSON editor allows you to see the JSON code of the schema. When you use a data model it provides auto-completion in your scripts and expressions. You can also map a data model with your process variables and connector properties. You can use the Upload button to upload a previously defined JSON schema that you have downloaded from Process Automation.

These instructions describe how to make a data model for a specific process but you can create a data model for use at a global level where the same data model properties can be used across multiple processes. To create a global data model Click **New** > **Data model** from the home screen. Alternatively you can transform your data model into a global one by selecting the three dots on the right hand side of your open data model and selecting **Turn global**.  

**Note:** If you transform your data model into a global one you are unable to revert it.

## Properties

The properties of a data model are:

| Property | Description |
| -------- | ----------- |
| Data model name | *Required.* The name of the data model. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example 'Person'. |
| Type | *Required.* Use the Type field to select the JSON schema type you want to use, for example `object`. You can't select more than one JSON schema type from the dropdown list. You can select more than one type from the Modelling app, Enumeration, and Composition sections. |
| Upload | *Optional.* You can upload a predefined data model. It must be in JSON schema format, for more see [JSON schema](https://json-schema.org/). |
| Data model description | *Optional.* A free text description of what the data model is, for example 'This data model represents a person in the organization'. |

## Create a Data Model

The following example creates a data model that represents a person, including their name, date of birth, and gender.

**Note:** Data models are specific to your installation and configuration. The example described here creates a data model called Person. The model ensures that the any service that uses the Person object understands its structure. This example is simple but it allows you to see how the process works but your data models could be more involved. Mention why person is an object, because it contains different  fields.

### Create a global data model

To create a data model:

1. Sign into the Modeling Application and open a Project, and click the **+** icon next to **Data Models**.

    **Note:** You care able to upload already defined data models by using the **Upload button** next to Data models. Any data model you upload must be written in the JSON format.

2. Enter a name for the data model, for example person.

3. Enter a description for the data model, for example 'This model provides the data structure for the object Person'.

  You are presented with the Data Model Editor.

4. From the **Type** dropdown list select **object** and then enter a meaningful title.

   You need to select object because the Person data model will contain different fields.

     **Note:** The title entered will be seen by a user when using a form with this data model.

     Using the modelling App means you don't need to set the fields of the file.

    **Note:** You can only select one **JSON schema type** from the **Type** dropdown list because of the rules that govern how JSON schema works. You can however select multiple other elements of the dropdown list such as aspects from the Modelling app and Composition. The Modelling app aspects are already predefined by the application which means you do not need to configure any fields or properties if you select them. From the Composition section you might select **anyOf** which would ensure the request contains any of the elements of Person. For more on JSON schema see.

    You can click the cog icon to access the advanced settings. The settings are standard JSON schema configuration settings, for more see [JSON schema](https://json-schema.org/).

5. Click the **+** icon to add a property to the Person object.

  A new row is created.

6. Enter 'Name' for the new row and then select the **Required** check box.

    Selecting the required check box ensures when a new person is added, the entry must include a Name.

7. From the **Type** dropdown list select **string** and then enter a meaningful title.

8. Click the **+** icon to add another property to the Person object.

9. Enter 'Birthday' for the new row.

10. From the **Type** dropdown list select **date** from the Modelling app section and then enter a meaningful title.

11. Click the **+** icon to add another property to the Person object.

12. Enter 'Gender' for the new row and then select the **Required** check box.

13. From the **Type** dropdown list select **enum** from the Enumeration section and then enter a meaningful title.

14. Select the cog icon to access the Advanced settings and enter the gender definitions you would like to include in the **Enumerated values** box. Click **Save**.

    You can see the JSON definition of the enumerated values in the preview section.

15. Click the **Save** icon to save the data model and then click the **JSON Editor** button to see the JSON file created of the data model.

  **Note:** You can also use references in your data model, for more see 

```JSON
{
    "description": "This model describes the structure of the person object.",
    "type": "object",
    "properties": {
        "Name": {
            "type": "string",
            "title": "Name of person"
        },
        "Birthday": {
            "$ref": "#/$defs/primitive/date"
        },
        "Gender": {
            "enum": [
                "Female",
                "Male"
            ],
            "title": "Gender of person"
        }
    },
    "title": "Add person",
    "required": [
        "Name",
        "Gender"
    ]
}
```

You have created a data model called Person that can be used in Process Automation. Use the Simulator on the right to view how the information you have added to the data model appears on a form. You can test the rules you have created for each property and you can see the JSON output when a new person is added.

![Data model]({% link process-automation/images/data-model.png %})

### Using a data model in a project

To use the data model you created in a project:

1. In the Modelling Application click the **+** icon next to processes and create a new process called person-process.

2. Select **Create REST connector** from the **Connectors** menu.

3. Select **Create new instance** from the **Connector Editor Settings** window and enter **rest-connector-person** for the Connector name.

4. Use an arrow to connect the Rest connector object.

5. Select the Rest connector object and then click the **Append task** icon.

6. Select the second object and click the **Change type** icon and then select **User Task**.

7. Ensure the second object is still selected and then click **Assignment** in the properties pane.

8. Select Identity and assign the task to the appropriate user and then click **Assign**.

7. Click **Append EndEvent** from the user task.

8. Click anywhere in the whitespace to de-select from the tasks and then click **Edit Process Variables**.

9. Click the **+** symbol and enter a name for the variable called 'person'.

10. Click the **Type** dropdown menu and select Data Models and then select the person data model. Click **Update**.

    You can see the properties of your data model in the Process variables window.

11. Select the Rest connector object and then from the **Action** dropdown list select **Get**.

     In this example you are calling a service using the Rest connector. You can see in the Output mapping section that the output of the `restResult` is a person. This means your person variable will be populated with the result which means you can use the data within your person task.

12. Create a new form from the menu on the right and call it 'person' and then add a textbox to it.

13. In the **Field Editor** of the textbox add a label called 'Name' and then click **Save**.

    **Note:** You must do this for all the fields you want on your form.

    You now have a user task that is using the person form that contains a checkbox called 'Name'.
  
14. Go back to the process and select the user task and then edit the **Process variable/Value** field of the parameter called 'Name' that is under input mapping.

     **Note:** You must do this for all the fields you want on your form.

15. On the **Edit variable mapping** window select Expression and add `${person.Name}` and then click **Update**.

    You have added the value that the Name field will use on the form. You must do this for all the fields you want on your phone.

    **Note:** You can use the auto-completion functionality to enter the expression.

You now have a data model that is being used by a process that is processing complex objects.

### Using Ref in a data model

You can also use references when constructing your data model. Using the person data model you created earlier as an example, you can use references within that data model of objects you may want to re-use. For example a reference called ID (which is used company wide as the ID of an exmployee), which might be constructed of a username, and position.

To use references in a data model:

1. In the person data model, click `Add definition` next to the references field.

2. Enter 'ID' for the name of the roq, and From the **Type** dropdown list select **object** and then enter a meaningful title.

3. Click the **+** icon again to add row.

4. Enter 'Username' for the name of the row, and From the **Type** dropdown list select **object** and then enter a meaningful title.

5. Click the **+** icon again to add another row in the main person data model.

6. Enter a name for the row, for example company and then select required.

7. From the **Type** dropdown list select **ref** under the composition heading.

8. From the second **Type** dropdown list that appears select the references block you want to use.  
