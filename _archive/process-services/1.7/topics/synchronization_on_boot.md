# Synchronization on boot

On a first boot, all users/groups must sync for the first time, otherwise nobody would be able to log in. The LDAP synchronization logic does this automatically. When creating a custom synchronization service, a custom `BootstrapConfigurer` can be used to do the same thing:

```
package com.activiti.extension.bean;

@Component
public class MyBootstrapConfigurer implements BootstrapConfigurer {

  @Autowired
  private FileSyncService fileSyncService;

  public void applicationContextInitialized(org.springframework.context.ApplicationContext applicationContext) {
    fileSyncService.asyncExecuteFullSynchronizationIfNeeded(null);
  }

}
```

This implements the `com.activiti.api.boot.BootstrapConfigurer` interface. If there is an instance implementing this interface on the classpath, it will be called when the application is booting up \(more precisely: after the Spring application context has been initialized\). Here, the class we created in the previous section, `FileSyncService` is injected. Note we add it to the component scanned package again and added the `@component` identifier.

Call the `asyncExecuteFullSynchronizationIfNeeded()` method. The null parameter means `the default tenant` \(that is, this is a non-multitenant setup\). This is a method from the `com.activiti.api.idm.ExternalIdmSourceSyncService` interface, which will do a full sync if no initial synchronization was done before.

As a side note, all synchronization logs are stored in a table **IDM\_SYNC\_LOG** in the database.

**Parent topic:**[Custom identity synchronization](../topics/custom_identity_synchronization.md)

