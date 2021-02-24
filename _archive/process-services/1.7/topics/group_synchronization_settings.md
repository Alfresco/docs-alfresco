# Group Synchronization Settings

|Property

|Description

|LDAP Example

|Active Directory Example

|
|ldap.synchronization.groupSearchBase

|The group search base restricts the LDAP group query to a sub section of a tree on the LDAP server.

|ou=groups,dc=alfresco,dc=com

|ou=groups,dc=alfresco,dc=com

|
|ldap.synchronization.groupQuery

|The query to select all objects that represent the groups to import \(used in **full synchronization**\).

|\(objectclass\\=groupOfNames\)

|\(objectclass\\=group\)

|
|ldap.synchronization.groupDifferentialQuery

|The query to select objects that represent the groups to import that have changed since a certain time \(used in the **differential synchronization**\).

|||
|ldap.synchronization.groupIdAttributeName

|The attribute on LDAP group objects to map to the authority name property in Alfresco Process Services.

|cn

|cn

|
|ldap.synchronization.groupMemberAttributeName

|The attribute in LDAP on group objects that defines the DN for its members. This is an important setting as is defines **group memberships** of users and **parent-child** relations between groups.

|member

|member

|
|ldap.synchronization.groupType

|The group type in LDAP.

|groupOfNames

|group

|

**Parent topic:**[Synchronization](../topics/synchronization.md)

