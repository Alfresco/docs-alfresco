---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: 
option: 
---

# User roles and permissions

Alfresco uses *roles* to determine what a user can and cannot do in a space. These roles are associated with *permissions*.

The following table shows each role and the permissions for that role. As a general rule:

-   Users have all rights in their *own* spaces

-   Administrators have all rights in *all* spaces


|**Note:**

All permissions apply to the invited space

|Owner \(1\)

|Coordinator

|Collaborator

|Contributor

|Editor

|Consumer

|
|-------------------------------------------------------|-------------|-------------|--------------|-------------|--------|----------|
|See invited space

|X

|X

|X

|X

|X

|X

|
|View content

|X

|X

|X

|X

|X

|X

|
|Copy content

|X

|X

|X

|X

|X

|X

|
|Preview content in template

|X

|X

|X

|X

|X

|X

|
|View content properties

|X

|X

|X

|X

|X

|X

|
|Check in content to invited space

|X

|X

|X

||X

||
|Checkout content to different space.

|X

|X

|X

||X

||
|Update/edit content created by other users

|X

|X

|X

||X

||
|Update properties for content created by other users

|X

|X

|X

||X

||
|Edit existing discussions

|X

|X

|X

||X

||
|Create/add new content \(1\)

|X

|X

|X

|X

|||
|Cut/delete content created by other users

|X

|X

|||||
|Create child spaces in the invited space

|X

|X

|X

|X

|||
|View content rules

|X

|X

|X

|X

|||
|Checkout content to same space.

|X

|X

|X

||\(2\)

||
|Contribute to existing discussions

|X

|X

|X

|X

|||
|Invite others

|X

|X

|||||
|Start new discussion topic

|X

|X

|X

|X

|||
|Delete content created by other users

|X

|X

|||||
|Same access rights as content owner

|X

|X

|||||
|Take ownership of content

|X

|X

|||||
|Create space rules

|X

|X

|||||

**Note:**

\(1\) A creator automatically owns their own created content.

\(2\) Because an editor cannot create a new file in the invited space.

All permissions are based on the default permission model. Your system administrator can fine-tune the model. For example, an editor can be prevented from editing topic discussions.

You can grant permission for users to do specific tasks in your space. You do this by *inviting* users to join your space.

Each role applies only in the space in which it is assigned. For example, you could invite a user to one of your spaces as an *editor*. You could invite that same user to a different space as a *collaborator*. That same user could be invited to someone else's space as a *coordinator*.

**Parent topic:**[Reference](../concepts/ch-reference-explorer.md)

