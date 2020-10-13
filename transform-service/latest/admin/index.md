---
title: Troubleshooting Transform Service
---

Use this information to help troubleshoot the Transform Service.

## How do I monitor the Transform Engines (e.g. LibreOffice) and the Transform Router?

There are two options for monitoring each component:

* View the logs via the Kubernetes dashboard.
* Access the `/metrics` and the `/prometheus` endpoint, which expose information about the running processes.

## What do I do if LibreOffice hangs?

If LibreOffice hangs, the health endpoint will fail to respond, and the container/pod will automatically reboot. This applies to all five Docker transformers. The Alfresco Content Services Helm deployment uses two replicas for each component of the Transform Service by default (except for the shared file store) in order to provide scalability and fault tolerance.

## What debug logging is available for the Transform Service?

All the key operations are logged, as well as the different entry and exit points for all kind of processes and actions.

## What do I do if Tika runs out of memory?

Similar to LibreOffice, the Tika container/pod should automatically restart since OOM is an error. If the automatic restart fails, the pods can be restarted from the Kubernetes dashboard.

## How do I monitor ActiveMQ / Amazon MQ?

* Access the ActiveMQ Admin Console (Web Console) at `<amazon-mq-host>`.
* The micrometer implementation also monitors the size of the queue.

## Are any metrics sent to/via HeartBeat?

No. HeartBeat hasn't been integrated yet.

## Where are the temporary files located for individual and multi-step transforms?

The individual transform, or Transform Engine, cleans up its own temporary files within the running container. For multi-step transforms, the intermediate files will eventually be cleaned up by the Shared File Store.

## Is any monitoring/metrics system available?

Yes:

* All the Transform Service components use micrometer.
* The Prometheus service that's deployed ingests data from the Transform Router.

## If a transform fails when uploading a complex XLSX document, what happens?

The Transform Service will attempt to retry the transform a few times (this is configurable). Otherwise, a failed transform is returned to the repository, so no preview or thumbnail will be available. The repository will no longer retry.

## Can you share the Transform Service with multiple repositories?

This release will only support a single Alfresco Content Services repository instance. For example, if you have two or more separate Alfresco Content Services deployments (whether clustered or not), then each one will need to its own Transform Service instance.

## Error handling in transform router

Use this information to review the possible responses from the Transform Router (T-Router) if a problem occurs.

The Transform Service is designed to be easy to set-up and debug. However, when a problem occurs, the T-Router tries to respond with a failed Transform Reply (T-Reply). Here are a few examples:

|T-Reply|Possible T-Reply response|
|-------|-------------------------|
|400 BAD REQUEST|T-Request with an `invalid JSON` is received|
|400 BAD REQUEST|T-Request with `invalid/missing values` is received|
|400 BAD REQUEST|T-Request with an `unsupported transformation` is received|
|500 INTERNAL SERVER ERROR|Transformation `fails in the T-Engine`|
|500 INTERNAL SERVER ERROR|When any other `unexpected exception in the T-Router` is thrown|
|no reply|When a `Java Error` (*Throwable*, but not *Exception*) occurs in the T-Router, the problem is only logged.|