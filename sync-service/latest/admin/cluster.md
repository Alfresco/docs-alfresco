---
title: Set up clustering
---

There are a number of prerequisites and configuration properties to consider when setting up Sync Service in a clustered environment.

## Prerequisites

For the Sync Service to run in clustered mode, ensure that your Alfresco Content Services instance has a clustering license installed and clustering is enabled.

## Clustering through load balancer

If you're using a load balancer, set the **dsync.service.uris** property to point to the address of the load balancer in `alfresco-global.properties`.

For example, if a load balancer is set up to run on `http://172.29.102.168:9999/alfresco`, modify the `alfresco-global.properties` file to include the following:

```bash
### DesktopSync ###
dsync.service.uris=http://172.29.102.168:9999/alfresco
```

## Clustering properties

Configure the sync server cluster by setting the following properties in the `config.yml` file.

> **Note:** These properties are optional.

| Clustering property | Description |
| ------------------- | ----------- |
| sync.cluster.enabled | *Optional*. This enables clustering. Example setting: true |
| sync.cluster.interface | *Optional*. This specifies a particular network interface to use for clustering. It might be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address beginning with `10.256`. Example setting: `10.256.*.*` |
| sync.clusterCheck.timeout | *Optional*. This specifies the time to wait for a cluster node ping before marking the node as not alive (ms). Example setting: 4000 |
| sync.hazelcast.password | *Optional*. This specifies the password used by the cluster members to access or join the Hazelcast cluster. Example setting: synccluster |
| sync.hazelcast.port | *Optional*. This specifies the port to use for clustering. Example setting: 5701 |
| sync.hazelcast.autoinc.port | *Optional*. This enables Hazelcast to make several attempts to find a free port, starting at the value of `alfresco.hazelcast.port`. **Note:** It's recommended that you don't use this property. Example setting: false |
| sync.hazelcast.max.no.heartbeat.seconds | *Optional*. This specifies the maximum timeout of heartbeat (in seconds) for a node to assume it is dead. Example setting: 15 |
| sync.hazelcast.bind.any | *Optional*. This specifies if Hazelcast can bind to any/all interfaces. This must be `false` for the `sync.cluster.interface` property to have any meaningful effect. Example setting: false |
| sync.hazelcast.mancenter.enabled | *Optional*. This specifies if the Hazelcast Management Center (mancenter) is being used for cluster management. See the [Hazelcast documentation](https://docs.hazelcast.org/docs/management-center/3.8.4/manual/html/Deploying_and_Starting.html){:target="_blank"} for more information. Example setting: false|
| sync.hazelcast.mancenter.url | *Optional*. This specifies the mancenter URL. Example setting: `http://<host-ip>:<port>/mancenter`. |

> **Note:** Ensure that clocks on all the sync server nodes (cluster members) are synchronized using a tool like [ntp.org](https://www.ntp.org/){:target="_blank"}.

> **Note:** Ensure that all the cluster nodes have the same settings in `config.yml` file, with one possible exception. Only change the `<sync.cluster.interface>` property, if the IP address of the cluster node is specified instead of a wildcard value.

## AWS Auto Scaling groups

An AWS Auto Scaling group monitors your applications and automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost. Using AWS Auto Scaling, it's easy to setup application scaling for multiple resources across multiple services in minutes.

See [https://aws.amazon.com/autoscaling](https://aws.amazon.com/autoscaling/){:target="_blank"} for more information.

Given that Sync Service is stateless, it can be deployed easily with AWS Auto Scaling groups. However, there are some important aspects to keep in mind.

## General guidelines

* The recommended way to set up the `sync.cluster.interface` property is in the `config.yml` file. This specifies a particular network interface that Hazelcast uses for clustering. It could be a wildcard value, such as `10.256.*.*`, which means an attempt is made to bind with an interface having an IP address that begins with `10.256`:

    ```bash
    sync:
        cluster:
            interface: 10.256.*.*
    ```

    By doing this, all the dynamically started Sync instances will be able to see each other and form a cluster successfully.

* To run various operations on a Sync Service instance via JMX (for example, checking the number of instances in the cluster, running a cluster wide check to ensure that each member sees each other, shutting down the Sync Service etc.), you'll need to connect from a bastion host (i.e. a machine located in the same network as the instance). This is required because the `syncservice.sh` script that's embedded in the `AlfrescoSyncServer-5.0.x.zip` distribution zip doesn't specify a value for `java.rmi.server.hostname`. By doing this, JMX will bind to the private IP, allowing Sync instances to be started dynamically by AWS Auto Scaling groups.
* The last and most important aspect is to ensure that Sync Service is shut down gracefully, by running the `./syncservice.sh stop` command. This will prevent hanging database connections. In addition, this will allow the current sync instance to deregister from the database.

When Sync Service starts, Hazelcast tries to find the other cluster members by performing connections with IPs of previously registered clustered members stored in the database. By deregistering a *soon to be dead* cluster member from the database means a smaller number of connections will be attempted. This should result in faster startup times for Hazelcast and inherently the Sync Service.

Follow the steps listed in the [aws-lambda-lifecycle-hooks-function](https://github.com/aws-samples/aws-lambda-lifecycle-hooks-function){:target="_blank"} GitHub project to correctly run `./syncservice.sh stop` when the instance is terminated, where you'll be using Auto Scaling lifecycle hooks, Lambda, and the EC2 Run Command.

> **Note:** You'll need to modify some of the steps in [aws-lambda-lifecycle-hooks-function](https://github.com/aws-samples/aws-lambda-lifecycle-hooks-function){:target="_blank"}:

1. **Step 1 - Create an SNS topic to receive the result of the backup**

    Skip this step.

2. **Step 3 - Create an Auto Scaling group and configure the lifecycle hook**

    1. Instead of using the User Data to specify the script to install the AWS Systems Manager (SSM) agent, you can manually install it, and then only afterwards, create the necessary AMI.

        See [Manually Install SSM Agent on Amazon EC2 Linux Instances](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-manual-agent-install.html#agent-install-ubuntu){:target="_blank"} to identify the steps depending on the Linux flavor.

    2. Add the lifecycle hooks from the user interface.

    3. Add a lifecycle hook from the Auto Scaling Groups EC2 console.

        Complete the following fields:

        * Lifecycle Transition: Instance Terminate
        * Heartbeat Timeout: 300 seconds

            This defines the amount of time it takes from when the hook is invoked till the instance is terminated - `300s` should be more than enough for the `./syncservice.sh stop` command to run.

3. **Step 4 - Create an S3 bucket for files**

    Skip this step.

4. **Step 5 - Create the SSM document**

    The [EC2 Systems Manager Shared Resources Document](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-ssm-docs.html){:target="_blank"} can be simplified to just execute `./syncservice.sh stop`.

    There's no need to bother with adding code to complete the lifecycle hook, since this is done inside the [Python lambda](https://github.com/aws-samples/aws-lambda-lifecycle-hooks-function/blob/master/lambda_backup.py){:target="_blank"} (see the `abandon_lifecycle` method).

    ```bash
    {
        "schemaVersion": "1.2",
        "description": "Shuts down Sync Service",
        "parameters": {},
        "runtimeConfig": {
            "aws:runShellScript": {
                "properties": [
                    {
                        "id": "0.aws:runShellScript",
                        "runCommand": [
                            "#!/usr/bin/env bash",
                            "sudo /home/ubuntu/service-sync/syncservice.sh stop"
                        ]
                    }
                ]
            }
        }
    }
    ```

5. **Step 6 - Create the Lambda function**

    Make one small change to the Python script.

    1. In `def check_command(command_id, instance_id)`, before checking for the command execution status:

        ```bash
        response_iterator['CommandInvocations'][0]['Status']
        ```

    2. Check if the list is empty. For example:

        ```bash
        if not len(response_iterator['CommandInvocations']) == 0:
        ```
