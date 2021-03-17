# Deploying AMPs

The Share Connector is applied to an installation using two AMP files.

From activiti-share-connector-x.x.x.zip, copy the AMPs to the correct amps folder in the Alfresco Content Services installation. For example:

-   Copy the <zip\>/alfresco/amps/alfresco-connector-repo-x.x.x.amp AMP to <alfresco-dir\>/amps

-   Copy the <zip\>/alfresco/amps\_share/alfresco-connector-share-x.x.x.amp AMP to <alfresco-dir\>/amps\_share


Install the AMPs by running the following command on a terminal from within theAlfresco Content Services installation directory, and then follow the instructions:

```
bin/apply_amps.sh
```

**Parent topic:**[Alfresco Content Services configuration](../topics/content_services_config.md)

