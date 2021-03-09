---
title: Query Accelerator install properties
---

* Enable the Query Accelerator by setting the property `queryAccelerator.enabled` to `true`.
* Define the location of the Query Accelerator config files by setting the property `queryAccelerator.config.dir`.
* The size of each population batch.

## Properties example

```bash
queryAccelerator.enabled=true
queryAccelerator.config.dir=shared/classes/alfresco/extension/querysets
queryAccelerator.populator.workerBatchSize=5000
```

If you are using Docker Compose in development, you will need to copy
your query set definition into your running ACS repository container.
One way is to use the following command:

```bash
docker cp custom_queryset.json <alfresco container>:/usr/local/tomcat/shared/classes/alfresco/extension/querysets/
```

In a Kubernetes environment, [ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/){:target="_blank"}
can be used to add query set definitions. You will need to create
a ConfigMap from the JSON file and mount the ConfigMap through a volume
to the ACS repository pods.

```bash
kubectl create configmap custom-queryset-config --from-file=name_of_a_file.json
```

The necessary volumes are already provided out of the box and the files
in ConfigMap `custom-queryset-config` will be mounted to
`/usr/local/tomcat/shared/classes/alfresco/extension/querysets/`.

> From Kubernetes documentation: Caution: If there are some files
in the mountPath location, they will be deleted.