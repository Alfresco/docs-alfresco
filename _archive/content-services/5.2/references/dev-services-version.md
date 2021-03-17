---
author: [Alfresco Documentation, Alfresco Documentation]
---

# VersionService

Provides an API for managing the versions of a piece of content.

|Information|VersionService|
|-----------|--------------|
|Support Status|[Full Support](http://docs.alfresco.com/support/concepts/su-product-lifecycle.html)|
|Architecture Information|[Platform Architecture](../concepts/dev-platform-arch.md)|
|Description|Alfresco has a strong versioning story, which gives you the ability to version any content stored in the repository, no matter what the file type \(**note**. folders are not versionable\). Versions are full files and not diffs of the files. Alfresco gives you the ability to have both major and minor versions of content. Versions can be created/updated by checkout/checkin, by rule, through any interface or through script/APIs.

If a content file has the aspect `versionable` applied to it, then multiple versions of the file can be managed. The `VersionService` provides an API to allow you to do this programmatically: -   `createVersion` - this creates a new version of the file, which is placed at the end of the appropriate version history. If the file has no version history then one is created and this version is considered to be the initial version.
-   `getVersionHistory` - this gets the version history that relates to the file.
-   `deleteVersionHistory` - this deletes the version history for a versioned file.
-   `getCurrentVersion` - gets the current version for a file.
-   `revert` - reverts the state of a file to that of a previous version.
-   `restore` - restores a previously deleted file from a version in its version history.

|
|Deployment - App Server|It is not likely that you will deploy Java extensions directly into a Tomcat application server as classes and Spring context files. Use an SDK build project instead.|
|[Deployment All-in-One SDK project](../concepts/sdk-getting-started.md).|-   Java files: aio/platform-jar/src/main/java/\{package path\}
-   Spring beans: aio/platform-jar/src/main/resources/alfresco/module/platform-jar/context/service-context.xml

|
|Java API|[Java API documentation](http://dev.alfresco.com/resource/AlfrescoOne/5.1/PublicAPI/org/alfresco/service/cmr/version/VersionService.html)|
|Java example|Alfresco provides the ability to apply behaviors / policies to content/metadata within the repository. You can think of these as event listeners, that allow you to take custom actions based on what is happening within the repository. In this example we are listening to the `afterCreateVersion` event and then we check if we have reached the maximum number of versions that we want to store, if we have, then we delete the last one \(by default Alfresco has no limit of how many versions it stores\):

 ```
import org.alfresco.repo.policy.Behaviour;
import org.alfresco.repo.policy.JavaBehaviour;
import org.alfresco.repo.policy.PolicyComponent;
import org.alfresco.repo.version.VersionServicePolicies;
import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.version.Version;
import org.alfresco.service.cmr.version.VersionHistory;
import org.alfresco.service.namespace.NamespaceService;
import org.alfresco.service.namespace.QName;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class MaxVersionPolicy implements VersionServicePolicies.AfterCreateVersionPolicy {
    private static Log logger = LogFactory.getLog(MaxVersionPolicy.class);

    /**
     * The Alfresco Service Registry that gives access to all public content services in Alfresco.
     */
    private ServiceRegistry serviceRegistry;

    private PolicyComponent policyComponent;
    private Behaviour afterCreateVersion;

    /**
     * Max number of versions we will store of a file in the repo
     */
    private int maxVersions;

    public void setPolicyComponent(PolicyComponent policyComponent) {
        this.policyComponent = policyComponent;
    }

    public void setServiceRegistry(ServiceRegistry serviceRegistry) {
        this.serviceRegistry = serviceRegistry;
    }

    public void setMaxVersions(int maxVersions) {
        this.maxVersions = maxVersions;
    }

    /**
     * Spring bean init() method
     */
    public void init() {
        this.afterCreateVersion = new JavaBehaviour(this, "afterCreateVersion",
                Behaviour.NotificationFrequency.TRANSACTION_COMMIT);

        this.policyComponent.bindClassBehaviour(QName.createQName(
                NamespaceService.ALFRESCO_URI, "afterCreateVersion"),
                MaxVersionPolicy.class, this.afterCreateVersion);
    }

    @Override
    public void afterCreateVersion(NodeRef versionableNode, Version version) {
        VersionHistory versionHistory = serviceRegistry.getVersionService().getVersionHistory(versionableNode);

        if (versionHistory != null) {
            logger.debug("Current number of versions: " + versionHistory.getAllVersions().size());
            logger.debug("least recent/root version: " + versionHistory.getRootVersion().getVersionLabel());

            // If the current number of versions in the VersionHistory is greater
            // than the maxVersions limit, remove the root/least recent version
            if (versionHistory.getAllVersions().size() > maxVersions) {
                logger.debug("Removing Version: " + versionHistory.getRootVersion().getVersionLabel());
                serviceRegistry.getVersionService().deleteVersion(versionableNode, versionHistory.getRootVersion());
            }
        } else {
            logger.debug("versionHistory does not exist");
        }
    }
}
```

 The Spring bean for the `MaxVersionPolicy` class looks like this:

 ```
<bean id="org.alfresco.training.maxVersion" 
        class="org.alfresco.training.platformsample.MaxVersionPolicy"
        init-method="init">
    <property name="policyComponent">
        <ref bean="policyComponent" />
    </property>
    <property name="serviceRegistry">
        <ref bean="ServiceRegistry" />
    </property>
    <!-- The max number of versions per versioned file -->
    <property name="maxVersions">
        <value>10</value>
    </property>
</bean>
```

|
|More Information|-   [Java API - Access and Transaction Management documentation](dev-extension-points-public-java-api.md).

|

**Parent topic:**[Public Java API services](../concepts/dev-services.md)

