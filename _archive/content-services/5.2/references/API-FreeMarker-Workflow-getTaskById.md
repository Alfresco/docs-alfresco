---
author: Alfresco Documentation
---

# `getTaskById`

`getTaskById(taskId)` returns a single object representing a task for the specified Task ID for the current user.

## Parameters

-   **taskId**

    A string representing the task ID of the task to return.


## Returns

Returns a `WorkflowTaskItem` object for the task specified by the task ID.

## Example

```


<#-- task is WorkflowTaskItem object -->
<#assign task = workflow.getTaskById("activiti$144")>

<p>id: ${task.id}</p>
<p>initiator: ${task.initiator.properties.userName}</p>
<p>isCompleted: <#if task.isCompleted>TRUE<#else>FALSE</#if></p>
<p>name: ${task.name}</p>
<p>outcome: <#if task.isCompleted>${task.outcome}<#else>Task not yetcomplete!</#if></p>
<p>package: ${task.package}</p>
<p>Listing package resources...
  <ul>
    <#list task.packageResources as pr>
      <li>${pr}</li>
    </#list>
  </ul>
<p>qnameType: ${task.qnameType}</p>
<p>startDate: ${task.startDate?date}</p>
<p>type: ${task.type}</p>

<p>transitions:</p>
<ul>
  <#list task.transitions as tx>
    <li>transition:
    <#assign keys = tx?keys> 
      <ul>
        <#list keys as k>
          <li>${k}=${tx[k]}</li>
        </#list>
      </ul>
    </li>
  </#list>
</ul>

<hr/>

<p>All properties for the task (WorkflowTaskItem) object:</p>

<table border=1>
<#assign props = task.properties?keys>
<#list props as t>
  <#-- If the property exists -->
  <#if task.properties[t]?exists>
     <#-- If it is a date, format it accordingly-->
     <#if task.properties[t]?is_date>
     <tr><td>${t} = ${task.properties[t]?date}</td></tr>
     
     <#-- If it is a boolean, format it accordingly-->
     <#elseif task.properties[t]?is_boolean>
     <tr><td>${t} = ${task.properties[t]?string("yes", "no")}</td></tr>

     <#-- If it is a sequence, format it accordingly-->
     <#elseif task.properties[t]?is_sequence>
     <tr><td>
         <#assign items = task.properties[t]>
         <#assign i = 0>
           ${t}=
           <#list items as item>
           <p>${i}: ${item}</p>
           <#assign i = i+1>
         </#list>
     </td></tr>

     
     <#-- Otherwise treat it as a string -->
     <#else>
     <tr><td>${t} = ${task.properties[t]}</td></tr>
     </#if>
  </#if>
</#list>
</table>        

      
```

The preceding code snippet would generate output similar to the following:

```

id: activiti$147

initiator: admin

isCompleted: FALSE

name: Task allocated by colleague

outcome: Task not yetcomplete!

package: workspace://SpacesStore/dbe1f1b1-333f-421e-9f5b-ed260af8f9d4

Listing package resources...

qnameType: {http://www.alfresco.org/model/workflow/1.0}adhocTask

startDate: Jul 24, 2014

type: Task

transitions:

    transition:
        label=Task Done
        id=Next

All properties for the task (WorkflowTaskItem) object:
{http://www.alfresco.org/model/content/1.0}name = Task
{http://www.alfresco.org/model/bpm/1.0}startDate = Jul 24, 2014
{http://www.alfresco.org/model/bpm/1.0}package = Node Type: {http://www.alfresco.org/model/bpm/1.0}package Node Ref: workspace://SpacesStore/dbe1f1b1-333f-421e-9f5b-ed260af8f9d4
{http://www.alfresco.org/model/bpm/1.0}packageActionGroup = add_package_item_actions
{http://www.alfresco.org/model/bpm/1.0}packageItemActionGroup = edit_package_item_actions
{http://www.alfresco.org/model/content/1.0}owner = admin
{http://www.alfresco.org/model/bpm/1.0}percentComplete = 0
{http://www.alfresco.org/model/bpm/1.0}dueDate = Jul 31, 2014
{http://www.alfresco.org/model/bpm/1.0}reassignable = yes
{http://www.alfresco.org/model/bpm/1.0}hiddenTransitions =
{http://www.alfresco.org/model/bpm/1.0}description = My Task
{http://www.alfresco.org/model/content/1.0}created = Jul 24, 2014
{http://www.alfresco.org/model/bpm/1.0}status = Not Yet Started
{http://www.alfresco.org/model/bpm/1.0}taskId = 147
{http://www.alfresco.org/model/bpm/1.0}priority = 2
{http://www.alfresco.org/model/bpm/1.0}pooledActors= 
      
```

**Parent topic:**[Workflow API](../references/API-FreeMarker-Workflow.md)

