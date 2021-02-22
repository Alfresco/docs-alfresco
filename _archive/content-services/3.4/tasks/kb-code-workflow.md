---
author: [Alfresco Documentation, Alfresco Documentation]
source: Professional Alfresco Book
audience: 
category: [Knowledge Base, API/Script]
keyword: knowledge base
---

# Adding a custom workflow to the Alfresco repository

Adding a custom workflow to the Alfresco repository includes a process definition file and a workflow bootstrap file. The latter comprises a Spring bean that informs the Alfresco repository of the new workflow process definition.

1.  Define a custom Knowledge Base article approval workflow as follows:

    Add the file kb-approval-process-definition.xml to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension

    kb-approval-process-definition.xml

    ```
    <?xml version="1.0" encoding="UTF-8"?>
    <process-definition xmlns="urn:jbpm.org:jpdl-3.1" name="wf:articleapproval">
    
       <swimlane name="initiator" />
    
       <start-state name="start">
          <task name="wf:submitReviewTask" swimlane="initiator" />
             <event type="node-leave">
    
                <!-- Call script once the package exists i.e. on node-leave -->
                <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
    
                   <!-- Check you have a document attached to the package -->
                   <!-- Apply the KB Aspect (kb:status) if not set already. -->
                   <!-- Note: The default kb:status property is draft -->
                      <script>
                    var l = bpm_package.children.length;
                    if (l > 0)
                    {
                              for (var i = 0, child = null; l > i; i++)
                              {
                                child = bpm_package.children[i];
                          if (!child.hasAspect("kb:status"))
                          {
                             child.addAspect("kb:status");
                             child.save();
                          }
                              }
                    }
                    else
                    {
                       if (logger.isLoggingEnabled())
                       {
                          logger.log("Error: Package has no content. Length: " + 
                             bpm_package.children.length + " Package: " + bpm_package);
                       }
                    }
                    </script>
                </action>
             </event>
          <transition name="" to="review" />
       </start-state>
    
       <swimlane name="reviewer">
           <assignment actor-id="#{bpm_assignee.properties['cm:userName']}" />
       </swimlane>
    
       <task-node name="review">
          <!-- Update the status to In Review when you enter this task -->
          <event type="node-enter">
             <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
                <script>
                   for (var i = 0, child = null, 
                        l = bpm_package.children.length; l > i; i++)
                   {
                      child = bpm_package.children[i];
                      child.properties["kb:status"] = "Pending Approval";
                      child.save();
                   }
                </script>
             </action>
          </event>
    
          <task name="wf:reviewTask" swimlane="reviewer">
             <event type="task-create">
                <script>
                   if (bpm_workflowDueDate != void)
                   {
                      taskInstance.dueDate = bpm_workflowDueDate;
                   }
                   if (bpm_workflowPriority != void)
                   {
                      taskInstance.priority = bpm_workflowPriority;
                   }
                 </script>
              </event>
          </task>
          <transition name="reject" to="rejected" />
          <transition name="approve" to="approved"/>
       </task-node>
    
       <task-node name="rejected">
          <!-- Update the status to Draft when you enter this task -->
          <event type="node-enter">
             <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
                <script>
                   for (var i = 0, child = null, 
                        l = bpm_package.children.length; l > i; i++)
                   {
                      child = bpm_package.children[i];
                      child.properties["kb:status"] = "Draft";
                      child.save();
                   }
                </script>
             </action>
          </event>
    
          <task name="wf:rejectedTask" swimlane="initiator" />
          <transition name="" to="end" />
       </task-node>
    
       <task-node name="approved">
          <!-- Update the status to Approved when you enter this task -->
          <event type="node-enter">
             <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
                <script>
                   for (var i = 0, child = null, 
                        l = bpm_package.children.length; l > i; i++)
                   {
                      child = bpm_package.children[i];
                      child.properies["kb:status"] = "Current";
                      child.save();
                   }
                </script>
             </action>
          </event>
    
          <task name="wf:approvedTask" swimlane="initiator" />
          <transition name="" to="end" />
       </task-node>
    
       <end-state name="end" />
    
       <event type="process-end">
          <!-- Update the status to Approved when you enter this task -->
          <action class="org.alfresco.repo.workflow.jbpm.AlfrescoJavaScript">
             <script>
                if (cancelled)
                {
                   for (var i = 0, child = null, 
                        l = bpm_package.children.length; l > i; i++)
                   {
                      child = bpm_package.children[i];
                      if (child.hasAspect("kb:status"))
                      {
                         child.properties["kb:status"] = "Draft";
                         child.save();
                      }
                      if (logger.isLoggingEnabled())
                      {
                         logger.log("Workflow cancelled, status reset to Draft");
                      }
                   }
                }
                if (logger.isLoggingEnabled())
                {
                   logger.log("Workflow completed");
                }
             </script>
          </action>
       </event>
    
    </process-definition>
    ```

2.  Bootstrap the custom workflow into the Alfresco repository as follows:

    Add the file kb-workflow-context.xml to the following directory:

    <installLocation\>\\tomcat\\shared\\classes\\alfresco\\extension

    kb-workflow-context.xml

    ```
    <?xml version='1.0' encoding='UTF-8'?>
    <!DOCTYPE beans PUBLIC '-//SPRING//DTD BEAN//EN' 
       'http://www.springframework.org/dtd/spring-beans.dtd'>
    <beans>
    
       <bean id="parallel.workflowBootstrap" parent="workflowDeployer">
          <property name="workflowDefinitions">
             <list>
                <props>
                   <prop key="engineId">jbpm</prop>
                   <prop key="location">
                      alfresco/extension/kb-approval-process-definition.xml
                   </prop>
                   <prop key="mimetype">text/xml</prop>
                   <prop key="redeploy">false</prop>
                </props>
             </list>
          </property>
       </bean>
    
    </beans>
    ```


**Parent topic:**[Customizing Document Library services](../tasks/kb-code-doclibrary.md)

