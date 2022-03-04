---
title: Data Models
---

A data model allows you to represent complex objects your application is handling. It allows you to define the standard data structure you will use in your application using JSON schema. A data model is useful when you want to query an internal or external service that has a specific structure.
The data model editor allows you to visually create the JSON schema and the JSON editor allows you to see the JSON output. When you use a data model it provides auto-completion in your scripts and expressions. You can also map a data model with your process variables and connector properties. You can use the Upload button to upload a previously defined JSON schema.

A data model is useful when you query a service

Mention download 

Mention go global, how do you turn that off. What does this mean? 

Why is Global Datamodel available from the screen with

How to create a data model (add, edit, delete its elements).

How to use a data model in the app.

See the JSON schema standard

![Data model]({% link process-automation/images/data-model.png %})

## Properties

The properties of a data model are:

| Property | Description |
| -------- | ----------- |
| Data model name | *Required.* The name of the data model. Must be in lowercase and between 1 and 26 characters in length. Alphanumeric characters and hyphens are allowed, however the name must begin with a letter and end alphanumerically, for example `finance`. |
| Type | *Required.* Use the Type field to select the JSON schema type you want to use, for example. You can select more than one JSON schema, but only one of the others. |
| Upload | *Optional.* You can upload a predefined data model. It must be in JSON format. |
| Data model description | *Optional.* A free text description of what the data model is for, for example `blah blah` |

## Create a Data Model

**Note:** Data models are specific to your installation and configuration. The example described here creates a data model called Person. The model ensures that the any service that uses the Person object understands its structure. This example is simple but it allows you to see how the process works but your data models could be more involved. Mention why person is an object, because it contains different  fields.

Make sure you put in a JSON example

Explain the replicate button 

The following example creates a data model that represents

### Create a global data model

To create a data model:

1. Sign into the Modeling Application and open a Project, and then click on **Data Models**.

2. Click the **+** icon next to **Data Models**.

  **Note:** You care able to upload already defined data models by using the **Upload button**. Any data model you upload must be written in the JSON format.

3. Enter a name for the data model, for example Person.

4. Enter a description for the data model, for example 'This model provides the data structure for the object Person'.

  You are presented with the Data Model Editor.

5. From the **Type** dropdown list select **object** and then enter a meaningful title.

   You need to select object because the Person data model will contain different fields.

   **Note:** The title entered will be seen by a user when using a form with this data model.

  Using the modelling App means you don't need to set the fields of the file.

  **Note:** You can only select one **JSON schema type** from the **Type** dropdown list because of the rules that govern how JSON schema works. You can however select multiple other elements of the dropdown list such as aspects from the Modelling app and Composition. The Modelling app aspects are already predefined by the application which means you do not need to configure any fields or properties if you select them. From the Composition section you might select **anyOf** which would ensure the request contains any of the elements of Person. For more on JSON schema see (JSON schema)[https://json-schema.org/].

  You can click the cog icon to access the advanced settings. The settings are standard JSON schema configuration settings, for more see (JSON schema)[https://json-schema.org/].

6. Click the **+** icon to add a property to the Person object.

  A new row is created.

7. Enter 'Name' for the new row and then select the **Required** check box.

  Selecting the required check box ensures when a new person is added, the entry must include a Name.

8. From the **Type** dropdown list select **string** and then enter a meaningful title.

9. Click the **+** icon to add another property to the Person object.

10. Enter 'Birthday' for the new row.

11. From the **Type** dropdown list select **date** from the Modelling app section and then enter a meaningful title.

12. Click the **+** icon to add another property to the Person object.

13. Enter 'Gender' for the new row and then select the **Required** check box.

14. From the **Type** dropdown list select **enum** from the Enumeration section and then enter a meaningful title.

15. Select the cog icon to access the Advanced settings and enter the gender definitions you would like to include in the **Enumerated values** box. Click **Save**.

  You can see the JSON definition of the enumerated values in the preview section.

16. Click the **Save** icon to save the data model and then click the **JSON Editor** button to see the JSON file create, from the Data Model Editor.

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

To create a data model in a project:

1. Sign into the Modeling Application and open a project.

2. Click the **NEW** dropdown.

### Using Ref in a data model 18 mins in demo

1. 