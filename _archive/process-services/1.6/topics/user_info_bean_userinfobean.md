# User Info Bean \(`userInfoBean`\)

The *userInfoBean* makes it possible to get access to general information about a user or just the email of a user.

To get general information about a user \(the data that can be found in `com.activiti.domain.idm.User`\), use the following expression where `userId` is the database ID of the user and can be supplied either as a Long or a String.

`${userInfoBean.getUser(123, execution)}`

To get the email of a user use the following expression where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getEmail(123, execution)}`

To get the first name of a user use the following expression where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getFirstName(123, execution)}`

To get the last name of a user use the following expression where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getLastName(123, execution)}`

To get both first name and last name of a user use the following expression where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getFullName(123, execution)}`

To get a user object representing the current user use the following expression where the returned value is an instance of LightUserRepresentation containing fields like id, firstName, lastName, email, externalId, pictureId.

`${userInfoBean.getCurrentUser()}`

To get a user’s primary group name use the following expression where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getPrimaryGroupName(123)}`

To get a group object representing a user’s primary group use the following expression where the return value is an instance of LightGroupRepresentation, containing id, name, externalId and status, and where 123 is the database id of the user and can be supplied either as a Long or a String.

`${userInfoBean.getPrimaryGroup(123)}`

**Parent topic:**[Default Spring Beans](../topics/default_spring_beans.md)

