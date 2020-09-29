---
title: App Designer
---

Use the App Designer to create process models, forms, app definitions, and share your models and definitions with others. 
As you create items, they appear as tiles on their respective page. The Last Modified drop-down on the top-right 
enables you to sort the display order ranging from last modified, oldest first, name order, or reverse name order. 
Use the filter on the left to filter the list of displayed items. Additionally, if you are unable to find a specific process, 
use the search box to find more processes. If your processes require human input, then you will need forms to gather it.

![Kickstart App]({% link process-services/images/app-kickstart.png %})

You can filter the list of Business Process Models using the following options on the left:

* **My items** - View all your processes / app definitions / data models / stencils / reusable forms / reusable decision tables. The filter name changes based on the tab you are in. For example, in case of the Forms tab, it changes to My reusable forms and to My App definitions when you are in the Apps tab.
* **Shared with Me** - View items shared by others with you.
* **Shared with Others** - View items that you have shared with others.
* **Favorited** - View your favorite items.
* **Everyone’s** - View all processes regardless of who created them.

>**Note:** The **Everyone’s** filter is applicable for admin purposes only. You can’t use this option to allow others to reuse the model. To allow someone else to use this model, it has to be shared first.

The App Designer panel includes the following tabs:

* **Processes** - Provide tools for creating new processes, modifying existing processes, and importing processes from outside Process Services. If your account has the capability, you can also import existing models that are defined in BPMN 2.0 standard format.

>**Note:** If you haven’t created any processes yet, then you will see shortcuts for creating a process. You can use the simple [Step editor]({% link process-services/latest/using/step.md %}), or the more powerful [BPMN editor]({% link process-services/latest/using/bpmn.md %}). If you are not familiar with the BPMN 2.0 Business Process Model language, then the Step Editor is for you. However, if you’d like to create complex processes, then the BPMN Editor will let you use the full power of the language. It’s helpful if you’re familiar with BPMN 2.0 for using the BPMN Editor.

* **Forms** - Provide tools for creating new forms, and modifying existing forms. Filter the list of displayed forms using the options on the left. You can view all your forms, or just those shared by others with you, or those you have shared with others, or just those you have favorited. If you haven’t created any forms yet, then a new button called Create a new form now! will appear on the **Forms** tab.

* **Decision Tables** - List decision tables that can be used across processes. Decision tables are an easy way to define business rules.

* **Apps** - Create new apps, modify existing apps, and import apps from outside Process Services. You create an app to group one or more of your processes, so you manipulate them as one unit. You can make an app available for yourself and share it with others. An app can contain no process at all, which allows you to create simple task list.

* **Data Models** - Enable you to map your business data with a relational database or a custom API such as a customer database, patient database, and so on. You can create business objects to connect to an external database that can be accessed by all processes in your application.

* **Stencils** - A stencil is a palette consisting of both standard and customized controls that are common to the Step editor, BPMN editor, and Forms editor. When you create a process or a form, you can specify a specific stencil or use the default for the editor you are using.

    >**Note:** When editing a form in the form editor, you can change the existing stencil assigned to the form.

    1.  Click the Form Stencils drop-down list in the upper right corner of the screen.
    2.  Select a stencil from the list.
    3.  The new stencil is assigned to the form and its controls appear in the form palette.

    >**Note:** When you change stencils and a field existing in the form canvas is not available in the new stencil, a validation error is displayed. To resolve this issue, remove the field from the form canvas.

### App Designer editor

Open the App Designer editor by clicking a process definition, reusable form, reusable decision table, app definition, 
data models, or the stencils tab. The App Designer editor provides features such as copy, comment, delete, add to favorites, 
share with others, and export. You can also open the corresponding editor to make changes to the content, 
and perform actions specific to the item type. For example, you can publish an app definition or edit a process.

![Kickstart App Editor]({% link process-services/images/app-kickstart-editor-1.png %})

In the above example, the App Designer editor was opened for an app definition called publisher. 
The editor always displays the details of the selected item on the top panel along with a set of buttons on the top right. 
The right-most button opens the editor corresponding to the item displayed. So in the example, the right-most button opens the app editor. 
If a process definition created via the step editor is opened in the App Designer editor, then the App Editor would open the step editor.
