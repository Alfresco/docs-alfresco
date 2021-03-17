---
title: Administer Azure Connector
nav: false
---

Use this information to identity known issues and limitations while using the Azure Connector.

## ReactiveX framework that AzureSDK is based on is not working with Security Manager enabled in Tomcat

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
