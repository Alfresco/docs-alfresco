---
author: [Alfresco Documentation, Alfresco Documentation]
---

# The Workflow Console

Use the Workflow Console in the Admin Console to manage Activiti workflows, including testing of newly developed workflows. You can also debug current in-flight workflows.

1.  Open the Admin Console.

2.  In the **Consoles** section, click **Workflow Console**. You see the **Workflow Console** page.

3.  Perform the following commands as required for managing workflows:

    1.  To output the contents of the file located at <definitionClassPath\>, type show file <definitionClassPath\>.

        where <definitionClassPath\> is the class path to workflow definition file.

    2.  To deploy workflow definitions to server, type deploy <workflowEngine\> <definitionClassPath\>.

        where <workflowEngine\> is the name of workflow engine \(Activiti\) and <definitionClassPath\> is the class path to workflow definition.

    3.  To redeploy the last workflow definition, type redeploy.

    4.  To list the latest deployed workflow definitions or display all workflow definitions \(including previous versions\) with the additional keyword `all`, type show definitions \[all\].

    5.  To use the workflow definition identified by `<workflowDefId>`, type use definition \[<workflowDefId\>\].

        If you use `use definition []` instead, the currently selected workflow definition is shown.

    6.  To undeploy the latest version of the workflow definition identified by `<workflowDefId>`, type undeploy definition <workflowDefId\>.

        This will also terminate and remove all in-flight workflows associated with the definition.

        If multiple versions of the definition exist, you will need to undeploy each version in turn to remove the definition completely or issue the `undeploy definition name` command.

    7.  To undeploy all versions of a workflow definition, type undeploy definition name <workflowName\>.

        Just like `undeploy definition`, all in-flight workflows associated with each version are terminated.

4.  Perform the following commands as required for managing variables:

    The following variables are defined automatically when the console starts. They may be deleted or modified.

    -   `var bpm:package package 1` \(test package of one document\)
    -   `var bpm:assignee person admin` \(test assignee who is admin\)
    1.  To show all defined variables, type var.

    2.  To define or update a variable, type var <varName\>\[\*\]=<varValue\>.

        where:

        -   `<varName>` is the variable name
        -   `[*]` defines a collection \(if specified\)
        -   `<varValue>` is the variable value \(comma-separated list of values\)
        ```
        var bpm:assignee*=admin,fred
        var wf:notifyMe=true
        ```

    3.  To define or update a \(`cm:person`\) node ref variable, type var <varName\>\[\*\] person <varValue\>.

        where:

        -   `<varName>` is the variable name
        -   `[*]` defines a collection \(if specified\)
        -   `<varValue>` is the variable value \(comma-separated list of values\)
        ```
        var bpm:assignee* person admin,fred
        ```

    4.  To define or update a \(`usr:authorityContainer`\) node ref variable, type var <varName\>\[\*\] group <varValue\>.

        where:

        -   `<varName>` is the variable name
        -   `[*]` defines a collection \(if specified\)
        -   `<varValue>` is the variable value \(comma-separated list of values\)
        ```
        var bpm:groupAssignee group GROUP_Engineering
        ```

    5.  To define or update a \(`bpm:workflowPackage`\) node ref variable, type var <varName\> package <itemCount\>.

        ```
        var bpm:package package 4
        ```

        A new workflow package is created containing `<itemCount>` content items.

    6.  To delete an existing variable, type var <varName\>=.

5.  Perform the following commands as required for managing workflows:

    1.  To start a new workflow using the currently selected workflow definition, type start \[<varName\[=varValue\>\]\]\*.

        ```
        start bpm:assignee=david wf:predefined
        ```

    2.  To display a list of active workflows for the currently selected workflow definition, type show workflows \[all\].

        This command display a list of all workflows \(latest and previous versions of process definitions\) when used with the additional keyword `all`.

    3.  To use the specified `<workflowId>`, type use workflow <workflowId\>.

    4.  To describe the specified `<workflowId>`, type desc workflow <workflowId\>.

    5.  To display the workflow paths for the specified `<workflowId>`, type show paths \[<workflowId\>\].

        If `<workflowId>` is omitted, the paths for the currently started workflow are shown.

    6.  To describe the specified `<pathId>`, type desc path <pathId\>.

        This command includes the list of properties associated with the path.

    7.  To display all available transitions for the specified `<workflowId>`, type show transitions \[<workflowId\>\].

        If `<workflowId>` is omitted, the transitions for the currently started workflow are shown.

    8.  To signal transition on specified `<pathId>`, type signal <pathId\> \[<transitionName\>\].

        If `<transitionName>` is omitted, the default transition is taken.

    9.  To fire an event of custom `eventtype` against the specified path, type event <pathId\> <eventtype\>.

    10. To fire an event of custom `eventtype` against the specified path, type event <pathId\> <eventtype\>.

    11. To end \(cancel\) the specified `<workflowId>`, type end workflow <workflowId\>.

    12. To force deletion of the specified `<workflowId>`, type delete workflow <workflowId\>.

    13. To force deletion of all in-flight workflows, type delete all workflows.

6.  Perform the following commands as required for managing workflow timers:

    1.  To display a list of active timers for the currently selected workflow definition, type show timers \[all\].

        This command displays a list of all timers when used with the additional keyword `all`.

7.  Perform the following commands as required for managing tasks:

    1.  To list tasks assigned to the currently selected user, type show my tasks.

    2.  To list tasks completed by the currently selected user, type show my completed.

    3.  To list tasks in a pool for the currently selected user, type show my pooled.

    4.  To list the tasks associated with the specified workflow `<pathId>`, type show tasks \[<pathId\>\].

        If `<pathId>` is omitted, the tasks associated with the currently selected workflow path are shown.

    5.  To describe the task identified by `<taskId>` user, type desc task <taskId\>.

    6.  To update the state of the specified `<taskId>`, type update task <taskid\> \[<varName\[=varValue\>\]\]\*.

        Task properties are provided as name/value pairs or references to pre-defined variables.

    7.  To end the task identified by `<taskId>`, type end task <taskId\> \[<transitionName\>\].

        If `<transitionName>` is omitted, the default transition is taken.

    8.  To query for tasks, type query task \[predicate\]\*.

        If no predicates are provided, all in-progress tasks are returned \(across all active workflows\).


**Parent topic:**[Workflow tools](../concepts/wf-tools.md)

