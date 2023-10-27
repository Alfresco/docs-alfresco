---
title: Administer Azure Connector
---

Use this information to administer the Azure Connector.

## Upgrade

Use this information to upgrade the Azure Connector from a previous version for Tomcat-based deployments only.

1. Stop the Content Services server.

2. Navigate to the root directory of your installation.

3. Use the following command to check for the module you wish to delete:

    ```bash
    java -jar bin/alfresco-mmt.jar list tomcat/webapps/alfresco.war
    ```

    This displays a list of the installed modules. Make a note of the module ID of the module you wish to uninstall, for example, `org_alfresco_integrations_AzureConnector`.

4. Use the Module Management Tool (MMT) to uninstall the AMP from the repository WAR (`alfresco.war`). For example:

    ```bash
    java -jar bin/alfresco-mmt.jar uninstall  org_alfresco_integrations_AzureConnector tomcat/webapps/alfresco.war
    ```

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-(mmt)) and [Uninstall an AMP file]({% link content-services/latest/install/zip/amp.md %}#uninstall-an-amp-file).

5. Navigate to the `amps` directory.

6. Delete any previously installed Azure Connector AMP.

7. Copy the AMP file you downloaded during [installation]({% link microsoft-azure/3.2/install/index.md %}) to the `amps` directory.

8. Use the Module Management Tool (MMT) to install the AMP into the repository WAR (`alfresco.war`).

    For more information, see [Using the Module Management Tool (MMT)]({% link content-services/latest/develop/extension-packaging.md %}#using-the-module-management-tool-(mmt))and [Install Alfresco Module Package]({% link content-services/latest/install/zip/amp.md %}).

    > **Note:** You must install the Azure Connector AMP using `-force`.

9. Check that the [configuration]({% link microsoft-azure/3.2/config/index.md %}) is set up correctly for your environment.

    > **Note:** When upgrading from Azure Connector version 1.0, make sure you define the Azure authentication mode and a supported value in your `alfresco-global.properties` file.

    > **Note:** To upgrade a system that's never used the file system (i.e. on-premises installation without locally saved binaries), we recommend that you choose a pure Azure content store. See [Azure Connector content store subsystems]({% link microsoft-azure/3.2/config/index.md %}#azure-subsystems) for more details.

10. Starting from version 1.2, the Azure Connector has the deleted content store disabled by default, since this feature is already present in Microsoft's Azure Storage services. For details on how to re-enable it, see [Azure Connector deleted content store]({% link microsoft-azure/3.2/config/index.md %}#azure-connector-deleted-content-store).

11. Start the server.

## Known issues

Use this information to identity known issues and limitations while using Azure Connector.

### ReactiveX framework that AzureSDK is based on is not working with Security Manager enabled in Tomcat

This usually results in the following exception:

```bash
access: access denied ("java.util.PropertyPermission" "jctools.spsc.max.lookahead.step" "read")
    java.lang.Exception: Stack trace
        at java.base/java.lang.Thread.dumpStack(Thread.java:1387)
        at java.base/java.security.AccessControlContext.checkPermission(AccessControlContext.java:462)
        at java.base/java.security.AccessController.checkPermission(AccessController.java:895)
        at java.base/java.lang.SecurityManager.checkPermission(SecurityManager.java:322)
        at java.base/java.lang.SecurityManager.checkPropertyAccess(SecurityManager.java:1066)
        at java.base/java.lang.System.getProperty(System.java:810)
        at java.base/java.lang.Integer.getInteger(Integer.java:1331)
        at java.base/java.lang.Integer.getInteger(Integer.java:1287)
        at io.reactivex.internal.queue.SpscArrayQueue.<clinit>(SpscArrayQueue.java:43)
        at io.reactivex.internal.operators.flowable.FlowableFlatMap$MergeSubscriber.getMainQueue(FlowableFlatMap.java:222)
        at io.reactivex.internal.operators.flowable.FlowableFlatMap$MergeSubscriber.tryEmitScalar(FlowableFlatMap.java:245)
        at io.reactivex.internal.operators.flowable.FlowableFlatMap$MergeSubscriber.onNext(FlowableFlatMap.java:152)
        at io.reactivex.internal.operators.flowable.FlowableMap$MapSubscriber.onNext(FlowableMap.java:68)
        at com.microsoft.rest.v2.util.FlowableUtil$FileReadFlowable$FileReadSubscription.drain(FlowableUtil.java:311)
        at com.microsoft.rest.v2.util.FlowableUtil$FileReadFlowable$FileReadSubscription.completed(FlowableUtil.java:383)
        at com.microsoft.rest.v2.util.FlowableUtil$FileReadFlowable$FileReadSubscription.completed(FlowableUtil.java:258)
        at java.base/sun.nio.ch.Invoker.invokeUnchecked(Invoker.java:127)
        at java.base/sun.nio.ch.SimpleAsynchronousFileChannelImpl$2.run(SimpleAsynchronousFileChannelImpl.java:335)
        at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1128)
        at java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:628)
        at java.base/java.lang.Thread.run(Thread.java:834)
        at java.base/jdk.internal.misc.InnocuousThread.run(InnocuousThread.java:134)
 access: domain that failed ProtectionDomain  null
    null
    <no principals>
    null
```

See [https://bz.apache.org/bugzilla/show\_bug.cgi?id=61568](https://bz.apache.org/bugzilla/show_bug.cgi?id=61568){:target="_blank"} for more.
