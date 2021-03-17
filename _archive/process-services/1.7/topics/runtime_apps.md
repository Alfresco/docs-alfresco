# Runtime Apps

When a user logs into Process Services, the landing page is displayed containing all the apps that the user is allowed to see and use.

The corresponding REST API request to get this information is:

```
GET api/enterprise/runtime-app-definitions
```

**Response:**

```
{
     "size": 3,
     "total": 3,
     "data": [
          {
               "deploymentId": "26",
               "name": "HR processes",
               "icon": "glyphicon-cloud",
               "description": null,
               "theme": "theme-6",
               "modelId": 4,
               "id": 1
          },
          {
               "deploymentId": "2501",
               "name": "Sales onboarding",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 1002,
               "id": 1000
          },
          {
               "deploymentId": "5001",
               "name": "Engineering app",
               "icon": "glyphicon-asterisk",
               "description": "",
               "theme": "theme-1",
               "modelId": 2001,
               "id": 2000
          }
     ],
     "start": 0
}
```

The `id` and `modelId` property of the apps are important here, as they are used in various operations described below.

**Parent topic:**[Alfresco Process Services REST API](../topics/process_services_api.md)

