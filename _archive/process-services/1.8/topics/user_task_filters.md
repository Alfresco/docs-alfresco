# User Task Filters

Custom task queries can be saved as a user task filter. To get the list of task filters for the authenticated user:

```
GET api/enterprise/filters/tasks
```

with an option request parameter `appId` to limit the results to a specific app.

To get a specific user task filter:

```
GET api/enterprise/filters/tasks/{userFilterId}
```

To create a new user task filter:

```
POST api/enterprise/filters/tasks
```

with a json body that contains following properties:

-   `name` : Name of the filter.

-   `appId` : App ID where the filter can be used.

-   `icon` : Path of the icon image.

-   `filter`

    -   `sort` : Possible values: created-desc, created-asc, due-desc, due-asc.

    -   `state` : Open, completed.

    -   `assignment` : Involved, assignee, or candidate.


To update a user task filter:

```
PUT api/enterprise/filters/tasks/{userFilterId}
```

with a json body that contains following properties:

-   `name` : Name of the filter

-   `appId` : App ID where the filter can be used.

-   `icon` : Path of the icon image.

-   `filter`

    -   `sort` : Created-desc, created-asc, due-desc, due-asc.

    -   `state` : Open, completed.

    -   `assignment` : Involved, assignee, or candidate


To delete a user task filter:

```
DELETE api/enterprise/filters/tasks/{userFilterId}
```

To order the list of user task filters:

```
PUT api/enterprise/filters/tasks
```

with a json body that contains following properties:

-   `order` : Array of user task filter IDs.

-   `appId` : App ID.


To get a list of user process instance filters

```
GET api/enterprise/filters/processes
```

with an option request parameter `appId` to limit the results to a specific app.

To get a specific user process instance task filter:

```
GET api/enterprise/filters/processes/{userFilterId}
```

To create a user process instance task filter:

```
PUT  api/enterprise/filters/processes
```

with a json body that contains following properties:

-   `name` : Name of the filter.

-   `appId` : App ID where the filter can be used.

-   `icon` : Path of the icon image.

-   `filter`

    -   `sort` : Created-desc, created-asc.

    -   `state` : Running, completed, or all.


To update a user process instance task filter:

```
PUT  api/enterprise/filters/processes/{userFilterId}
```

with a json body that contains following properties:

-   `name` : Name of the filter.

-   `appId` : App ID, where the filter can be used.

-   `icon` : Path of the icon image.

-   `filter`

    -   `sort` : Possible values: created-desc, created-asc.

    -   `state` : Running, completed, or all.


To delete a user process instance task filter

```
DELETE  api/enterprise/filters/processes/{userFilterId}
```

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

