# Creating rules

You can create rules to manage folders in a process. There are two ways to create rules in the Share Connector:

-   **[Create your own rules](http://docs.alfresco.com/5.2/tasks/library-folder-rules-define-create.html)** for creating new set of rules for a folder

-   **[Link to an existing rules set](http://docs.alfresco.com/5.2/tasks/library-folder-rules-define-link.html)** to reuse the existing set of rules defined for another folder


The options are listed under **Perform Actions**. Follow the steps until you reach the Process Services specific actions \(under More Actions\), and then continue as follows.

**To create rules for processes**:

1.  Create a rule or link to an existing rules set.
2.  From **New Rules** \> **Perform Actions**, select **Start Activiti Process** to initiate a process from Process Services.
3.  Click **Start Activiti Process**.
4.  Customize the rule with the following options:
    -   **Process Definition** - Select from the predefined process definitions based on where you want to apply the rule to.

    -   **Process Name** - Enter a process name for your rule.

    -   **Content form field** - Select content for attaching a content type field in the form.

    -   **Additional form fields** - Select additional criteria for the rule such as Assignee, Due Date, Task Description, Message, and add their values. To select more than one criteria, click **+** \(plus icon\).

5.  You can also select from the following **Other Options**:
    -   **Disable rule** - Turns off any existing rules.

    -   **Run applies to subfolders** - Applies the rule to this folder and all its subfolders.

    -   **Run rule in the background** - Runs the rule in the background. You can also select an action to run if an error occurs with the rule. These actions are set up by your Administrator.

6.  Click **Create** or **Create and Create Another** to save this rule and start creating another one.

The rule is applied to the selected folder and displayed on the **Rules** page. Once a rule is added, the following options become available:

-   **Inherit Rules** - Use for applying rules to inherit from a parent folder. You can turn the rule on and off by clicking on it.

-   **New Rule** - Click to add more rules to a folder as you need in the same way as you would add new rules.

-   **Run Rules** - Click to manually run the rules on existing folder items or subfolders at any time.


**Parent topic:**[Using the Share Connector demo](../topics/using_the_share_connector_demo.md)

