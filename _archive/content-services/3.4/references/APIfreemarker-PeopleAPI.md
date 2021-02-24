---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Development
option: FreeMarker template API
---

# People API

The People API provides basic user and group query and inspection capabilities.

## `getPerson(username)`

Returns the person node \(cm:person\) for the given username; returns null if not found.

## `getGroup(groupname)`

Returns a group node \(usr:authorityContainer\) for the given group authority name; returns null if not found.

## `getMembers(group)`

Gets the members \(people\) of a group, including all sub-groups.

## `getMembers(group, recurse)`

Gets the members \(people\) of a group; optionally recurse into sub-groups.

## `getContainerGroups(person)`

Gets the groups that contain the specified person \(cm:person node\).

## `isAdmin(person)`

Returns true if the specified person \(cm:person node\) is a member of the Administrator group.

## `isGuest(person)`

Returns true if the specified person \(cm:person node\) is a guest user.

## `getCapabilities(person)`

Returns a map of capabilities \(boolean assertions\) for the given person.

## `isAccountEnabled(person)`

Returns true if the specified user account is enabled; returns false if disabled.

**Parent topic:**[Alfresco Repository FreeMarker Template reference](../references/APIfreemarker-intro.md)

