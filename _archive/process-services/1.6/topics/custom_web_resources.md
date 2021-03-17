---
author: Alfresco Documentation
---

# Custom web resources

If you want to add additional JavaScript functionality or override CSS rules, you can configure lists of additional web resources that are loaded by the browser for each Alfresco Process Services app. You do this by configuring a new resource in the tomcat/webapps/activiti-app folder.

Following is an example of a new resource section in the *app-cfg.js* file located in the *tomcat/webapps/activiti-app/scripts* folder:

```
ACTIVITI.CONFIG.resources = {
    '*': [
        {
            'tag': 'link',
            'rel': 'stylesheet',
            'href': ACTIVITI.CONFIG.webContextRoot + '/custom/style.css?v=1.0'
        }
    ],
    'workflow': [
        {
            'tag': 'script',
            'type': 'text/javascript',
            'src': ACTIVITI.CONFIG.webContextRoot + '/custom/javascript.js?v=1.0'
        }
    ]
};
```

The ACTIVITI.CONFIG.resources object makes it possible to load different files for each of the Activiti applications using their names as key for a list of additional resources that shall be loaded, the different app names are: *landing*, *analytics*, *editor*, *idm* and *workflow*. The *\** key means that a default resource list will be used unless there is a specific config key for the app being loaded.

For example, if a user would enter the *editor* app, with the config above deployed, *custom/style.css* would be the only custom resource that would be loaded. If a user would go to the *workflow* app, *custom/javascript.js* would be the only custom resource that would be loaded. So if *workflow* also wants to load the *custom/style.css* that would have to be specified again inside the *workflow* resource list.

**Note:** Remember to modify the *v*-parameter when you have done changes to your files to avoid the browser from using a cached version of your custom logic.

**Parent topic:**[Developer guide](../topics/developmentGuide.md)

