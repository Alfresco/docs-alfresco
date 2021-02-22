# Content Storage

Alfresco Process Services enables you to upload content, such as attaching a file to a task or a form. This content is stored on a disk with the following configuration settings for the path:

```
contentstorage.fs.rootFolder=data/
```

**Important:** When using multiple instances of the application, make sure that this path references a shared network drive. This is so that all nodes are able to access all content as the application is stateless and any server can handle any request

**Parent topic:**[Configuring Alfresco Process Services](../topics/administration_application_config.md)

