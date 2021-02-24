# Adding users to an LDAP group

Active Directory sets a limit on the number of attributes stored in a group that are retrievable in a single query. To overcome this, you can use incremental retrieval of data. This involves limiting the number of attribute values in a single query. To reduce the number of times the query is required to contact the server, set the number of values requested as close, as possible, to the maximum.

Process Services provides the capability to configure the number of group members retrieved per query subject to the limitations imposed by Active Directory. Follow these steps to enable this:

1.  Open the <InstallLocation\>/tomcat/webapps/activiti-app/WEB-INF/classes/META-INF/activiti-app/activiti-ldap.properties file.
2.  Set ldap.synchronization.groupMemberRangeEnabled to true.

    ```
    ldap.synchronization.groupMemberRangeEnabled=true
    ```

3.  Set the maximum number of members to retrieve in a single query.

    ```
    ldap.synchronization.groupMemberRangeSize=1500
    ```

    **Note:** This value should not exceed the limit set by Active Directory. If this is greater than the Active Directoy limit, no members are returned. See [https://msdn.microsoft.com/en-us/library/ms676302\(v=vs.85\).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx) for information related to the maximum number of values returned in a single query in Active Directory. For further information regarding the behavior of the range attribute see [https://msdn.microsoft.com/en-us/library/ms676302\(v=vs.85\).aspx](https://msdn.microsoft.com/en-us/library/ms676302(v=vs.85).aspx).


**Note:** If you set the enablement property to true, the default value for ldap.synchronization.groupMemberRangeSize is set to 1000.

**Parent topic:**[Synchronization](../topics/synchronization.md)

