# Process Instance Identity links

Either the users or groups involved with a process instance.

To create an identity link of a process instance:

```
POST api/enterprise/process-instances/{processInstanceId}/identitylinks
```

**Example request**:

```
{
     "user": "1",
     "type": "customType"
}
```

Get identity links of a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/identitylinks
```

Get identity links by family type of a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/{family}
```

Where, `Family` should contain users or groups, depending on the identity you want to link.

To get involved people in a process instance:

```
GET api/enterprise/process-instances/{processInstanceId}/identitylinks
```

You can get identity links for either user or groups. For example:

```
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/users
GET api/enterprise/process-instances/{processInstanceId}/identitylinks/groups
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

