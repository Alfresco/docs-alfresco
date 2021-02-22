# Audit Log Bean \(`auditLogBean`\)

The `auditLogBean` can be used to generate audit logs in .pdf format for a completed process instance or a completed task. The log will be saved as a field value for the process and the task \(if a task audit log is generated\).

**Note:** Audit logs can only be used against a completed process instance or a completed task.

The following code can be used in the expression of a service task to generate a process instance audit log named *My first process instance audit log*. The third argument determines if the current date shall be appended to the file name. The pdf will be associated with the process field *myFieldName*.

`${auditLogBean.generateProcessInstancePdf(execution, *My first process instance audit log*, true, *myFieldName*)}`

To create a task audit log named *My first task audit log* add the following expression to the "complete" event in a task listener. Again the third argument determines if the current date shall be appended to the file name. The pdf will be associated with the field *myFieldName*.

`${auditLogBean.generateTaskPdf(task, *My first task audit log*, true, *myFieldName*)}`

You can view the audit logs from the My Tasks app by clicking the "Audit Log" link when viewing the details of a completed process or task. When doing so the following two rest calls are made.

Process instance audit log:

```
GET app/rest/process-instances/{process-instance-id}/audit
```

Task audit log:

```
GET app/rest/tasks/{task-id}/audit
```

**Parent topic:**[Default Spring Beans](../topics/default_spring_beans.md)

