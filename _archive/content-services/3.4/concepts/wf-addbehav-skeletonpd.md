---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Administration
option: workflow
---

# Adding behavior to a process definition

You can add behavior to a process definition to describe the data flow, task assignments, and repository actions.

Based on the task model, the complete process definition is shown in the following code snippet.

Note:

-   The swimlane assignee is mapped to the process variable `bpm_assignee`.

-   A task-create event is used to initialize the due date and priority of the ad hoc task.

-   The ad hoc task completed transition event is used to call Alfresco JavaScript that sends an email.

    **Note:** If you have a JavaScript that returns details of the host, for example, the protocol, the host name, and the port, use the sysAdmin subsystem properties to specify these values.

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    
    <process-definition xmlns="urn:jbpm.org:jpdl-3.1" name="wf:adhoc">
    
      <swimlane name="initiator"/>
    
      <start-state name="start">
        <task name="wf:submitAdhocTask" swimlane="initiator"/>
        <transition name="" to="adhoc"/>
      </start-state>
    
      <swimlane name="assignee">
        <assignment actor-id="#{bpm_assignee.properties['cm:userName']}"/>
      </swimlane>
       
      <task-node name="adhoc">
        <task name="wf:adhocTask" swimlane="assignee">
          <event type="task-create">
            <script>
              if (bpm_workflowDueDate != void)
              {
                taskInstance.dueDate = bpm_workflowDueDate;
              }
              if (bpm_workflowPriority != void)
              {
                taskInstance.priority = bpm_workflowPriority;
              }
            </script>
          </event>
        </task>
        <transition name="" to="completed">
          <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
            <script>
              if (wf_notifyMe)
              {
                var mail = actions.create("mail");
                mail.parameters.to = initiator.properties["cm:email"];
                mail.parameters.subject = "Adhoc Task " + bpm_workflowDescription;
                mail.parameters.from = bpm_assignee.properties["cm:email"];
                mail.parameters.text = "It's done";
                mail.execute(bpm_package);
              }
            </script>
          </action>
        </transition>
      </task-node>
       
      <task-node name="completed">
        <task name="wf:completedAdhocTask" swimlane="initiator"/>
        <transition name="" to="end"/>
      </task-node>
          
      <end-state name="end"/>
    
      <event type="process-end">
         <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
            <script>
               if (logger.isLoggingEnabled())
                  logger.log("End of process.  Cancelled: " + cancelled);
            </script>
         </action>
      </event>
       
    
    </process-definition>
    ```

    Notes about the code snippet:

    -   The swimlane `assignee` is mapped to the process variable `bpm_assignee`
    -   A task-create event is used to initialize the due date and priority of the ad-hoc task
    -   The adhoc task completed transition event is used to call Alfresco JavaScript that sends an email
    -   A process-end event is used to log the end of the workflow

**Parent topic:**[Creating and managing workflows](../topics/wf-howto.md)

**Related information**  


[sysAdmin subsystem properties](sysadmin-subsystem-props.md)

