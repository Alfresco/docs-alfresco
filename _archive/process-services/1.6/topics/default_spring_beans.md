---
author: Alfresco Documentation
---

# Default Spring Beans

Use the following sections for information about the default spring beans in Alfresco Process Services.

-   **[Audit Log Bean \(auditLogBean\)](../topics/audit_log_bean_auditlogbean.md)**  
 The `auditLogBean` can be used to generate audit logs in .pdf format for a completed process instance or a completed task. The log will be saved as a field value for the process and the task \(if a task audit log is generated\).
-   **[Document Merge Bean \(documentMergeBean\)](../topics/document_merge_bean_documentmergebean.md)**  
 The `documentMergeBean` can be used to merge the content of multiple documents \(files of type .doc or.docx\) from a process into a single document which will be become the value of a provided process variable. The file name of the new document will be set to the file name of the first field in the list followed by the string "\_merged" and the suffix from the same field.
-   **[Email Bean \(emailBean\)](../topics/email_bean_emailbean.md)**  
 The `emailBean` can be used to retrieve the email of the current user or the process initiator.
-   **[User Info Bean \(userInfoBean\)](../topics/user_info_bean_userinfobean.md)**  
 The *userInfoBean* makes it possible to get access to general information about a user or just the email of a user.

**Parent topic:**[Custom Logic](../topics/custom_logic.md)

