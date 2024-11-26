---
title: Install with Ansible
---

This page describes how to install Content Services using an [Ansible](https://www.ansible.com){:target="_blank"} playbook. Ansible is an open-source software provisioning, configuration management, and application installation tool that enables infrastructure as code. Alfresco provides an Ansible playbook capable of installing Content Services (Enterprise Edition) version 7.x or 6.2.N.

Before continuing you need to be familiar with some [Ansible concepts](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html){:target="_blank"}:

* [control node](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#control-node){:target="_blank"}: the machine the playbook is run from is known as the **control node**.

* [connection type](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters){:target="_blank"}: the type of connection to the host.

* [inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#intro-inventory){:target="_blank"}: defines the hosts and groups of hosts upon which commands, modules, and tasks in a playbook operate. The inventory file lists individual hosts or user-defined groups of hosts.

There are two types of installations - local and remote:

* **Local** where all the components are installed on the control node machine:

![deployment-type-local]({% link content-services/images/deployment-type-local.png %})

* **Remote** (also known as `ssh`) where components are installed on one or more remote `hosts`. These hosts can be bare metal machines, Virtual machines, or instances running on a public cloud:

![deployment-type-ssh]({% link content-services/images/deployment-type-ssh.png %})

## Prerequisites

If you're using the Content Services (Enterprise), then you need credentials to access the necessary artifacts from [Nexus](https://nexus.alfresco.com/nexus/){:target="_blank"}. Customers can request these through [Hyland Community](https://community.hyland.com/){:target="_blank"}.

## Target O/S

The playbooks have been tested using Ansible 2.9.21 (or later) on target hosts with the following operating systems:

* CentOS 7 and 8
* Red Hat Enterprise Linux 7 and 8

Additional target environments will be added in future releases.

## Set up Ansible

A control node is required to run the playbook. You can use any computer as a control node that has Python installed. Usually, laptops, desktops, and servers can all run Ansible.

In the interest of keeping this guide simple, we'll use an AWS EC2 instance as the control node. The required steps are:

1. Launch an EC2 instance using the CentOS 7 or 8 (x86_64) AMI from the Marketplace:

    > **Note:** If you plan to install Content Services on this host too, referred to as a [local installation](#local-installation), then you need at least a `t2.xlarge` instance with 16GB RAM
    > (*Warning: This instance type is not free*).
    > This might be the case when you just want to try it out for the first time. If you're just using this node as an Ansible control node, then a free `t2.micro` should be sufficient.

    ![centos-ami]({% link content-services/images/centos-ami.png %})

2. Download the Ansible playbook [zip file](https://nexus.alfresco.com/nexus/repository/releases/org/alfresco/alfresco-ansible-deployment/1.1.1/alfresco-ansible-deployment-1.1.1.zip){:target="_blank"}.

3. Transfer the ZIP file to the control node and SSH into the machine:

    ```bash
    scp -i <yourpem-file> <local-path>/alfresco-ansible-deployment-<version>.zip centos@<control-node-ip>:/home/centos/
    ssh -i <yourpem-file> centos@<control-node-ip>
    ```

    For example:

    ```bash
    -rw-r--r--@ 1 mbergljung  staff  119559 16 Mar 08:18 alfresco-ansible-deployment-1.1.1.zip
    -rw-r--r--@ 1 mbergljung  staff    1700 16 Mar 08:18 ansible-test.pem
    $ chmod 400 ansible-test.pem
    $ scp -i ansible-test.pem alfresco-ansible-deployment-1.1.1.zip centos@3.86.89.7:/home/centos/
    alfresco-ansible-deployment-1.1.1.zip                                                    100%  117KB 308.1KB/s   00:00
    $ ssh -i ansible-test.pem centos@3.86.89.7
    [centos@ip-172-31-83-57 ~]$
    ```

4. Install the required dependencies for Ansible (replace the `7` with `8` in the URL if you're using CentOS 8):

    ```bash
    sudo yum install -y unzip https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    ```

5. Install Ansible:

    ```bash
    sudo yum install -y ansible
    ```

6. Extract the ZIP file:

    ```bash
    unzip alfresco-ansible-deployment-<version>.zip
    ```

7. Create environment variables to hold your Nexus credentials as shown below (replacing the values appropriately):

    ```bash
    export NEXUS_USERNAME=<your-username>
    export NEXUS_PASSWORD=<your-password>
    ```

    > **Note:** If your password contains `!`, then you need to escape it with `\`, as it's a special character to `bash`, and it's used to refer to previous commands.

Without any additional configuration applied, the playbook installs the default Content Services components. See the [configuration](#configure-your-installation) section below to adjust some of the configurable installation options.

To install everything on the control node, follow the steps in the [Local installation](#local-installation) section. To install to one or more other machines, follow the steps in the [Remote installation](#remote-installation) section.

## Local installation

The diagram below shows the result of a local installation.

![acs-localhost]({% link content-services/images/acs-localhost.png %})

To install Content Services 7.1 (Enterprise) on your local machine, navigate to the folder where you extracted the ZIP, 
and run the playbook as the current user (the playbook will escalate privileges when required):

```bash
cd alfresco-ansible-deployment-<version>
ansible-playbook playbooks/acs.yml -i inventory_local.yml
```

Alternatively, to deploy a Content Services 7.0 system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.0.N-extra-vars.yml"
```

Alternatively, to deploy a Content Services 6.2.x system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@6.2.N-extra-vars.yml"
```

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the block below:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration etc., see [useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.1/admin/securing-install.md %}).

## Remote installation

To install to hosts other than the control node, an SSH connection is required. The control node must have network access to all the target hosts and permission to SSH into the machine.

> **Note:** The inventory file (`inventory_ssh.yml`) is used to specify the target IP addresses and the SSH connection details. You can specify one IP address for all the hosts to obtain a single-machine installation, or different IP addresses for a multi-machine installation.

The example snippet below demonstrates how to install the repository to a host with an IP address of `50.6.51.7` using an SSH key located at `/path/to/ssh_key.pem`.

```yaml
repository:
  hosts:
    repository_1:
    connection: shh
    ansible_host: 50.6.51.7
    ansible_private_key_file: "/path/to/ssh_key.pem"
    ansible_user: centos
    ansible_ssh_common_args: "-o UserKnownHostsFile=/dev/null -o ControlMaster=auto
      -o ControlPersist=60s -o ForwardX11=no -o LogLevel=ERROR
      -o IdentitiesOnly=yes -o StrictHostKeyChecking=no"
```

### Single machine installation

The diagram below shows the result of a single machine installation.

![acs-single-machine]({% link content-services/images/acs-single-machine.png %})

Once you've prepared the target host and configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

To check that your inventory file is configured correctly and the control node is able to connect to the target host, 
navigate to the folder where you extracted the ZIP to and run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To install Content Services 7.1 on the target host, run the playbook as the current user:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml
```

Alternatively, to deploy a Content Services 7.0 system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"
```

Alternatively, to deploy a Content Services 6.2.x system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"
```

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration etc., see [useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.1/admin/securing-install.md %}).

### Multi-machine installation

The diagram below shows the result of a multi-machine installation.

![acs-multi-machine]({% link content-services/images/acs-multi-machine.png %})

Once you've prepared the target hosts (ensuring the [relevant ports](#tcp-port-configuration) are accessible) and 
configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

>**Note:** Currently, Alfresco Digital Workspace (ADW) must be deployed on the same host (`adw_1`) as the 
>NGINX reverse proxy (`nginx_1`). We'll address this issue in a future release.

To check that your inventory file is configured correctly, and that the control node is able to connect to the 
target hosts, run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To install Content Services 7.1 on the target hosts, run the playbook as the current user:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml
```

Alternatively, to deploy a Content Services 7.0 system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"
```

Alternatively, to deploy a Content Services 6.2.x system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"
```

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration etc., see [useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.1/admin/securing-install.md %}).

## Useful information {#usefulinfo}

The following section contains further information about the Ansible installation approach.

### Check if startup has completed

Before accessing any of the webapps make sure that the deployment has started up properly. You can check this in the logs
as follows:

```bash
alfresco-ansible-deployment-1.1.1]$ sudo su
[root@ip-172-31-31-172 alfresco-ansible-deployment-1.1.1]# cd /var/log/alfresco/
[root@ip-172-31-31-172 alfresco]# tail -f alfresco.log
2021-03-16 09:44:38,147 INFO  [org.springframework.extensions.webscripts.DeclarativeRegistry] [main] Registered 0 Schema Description Documents (+0 failed)
2021-03-16 09:44:38,149 INFO  [org.springframework.extensions.webscripts.AbstractRuntimeContainer] [main] Initialised Public Api Web Script Container (in 1743.6327ms)
2021-03-16 09:44:38,163 INFO  [org.springframework.extensions.webscripts.DeclarativeRegistry] [asynchronouslyRefreshedCacheThreadPool1] Registered 14 Web Scripts (+0 failed), 103 URLs
2021-03-16 09:44:38,163 INFO  [org.springframework.extensions.webscripts.DeclarativeRegistry] [asynchronouslyRefreshedCacheThreadPool1] Registered 0 Package Description Documents (+0 failed)
2021-03-16 09:44:38,163 INFO  [org.springframework.extensions.webscripts.DeclarativeRegistry] [asynchronouslyRefreshedCacheThreadPool1] Registered 0 Schema Description Documents (+0 failed)
2021-03-16 09:44:38,298 WARN  [org.alfresco.web.scripts.servlet.X509ServletFilterBase] [main] clientAuth does not appear to be set for Tomcat. clientAuth must be set to 'want' for X509 Authentication
2021-03-16 09:44:38,299 WARN  [org.alfresco.web.scripts.servlet.X509ServletFilterBase] [main] Attempting to set clientAuth=want through JMX...
2021-03-16 09:44:38,330 WARN  [org.alfresco.web.scripts.servlet.X509ServletFilterBase] [main] Unable to set clientAuth=want through JMX.
2021-03-16 09:45:30,228 INFO  [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-10] Starting 'Transformers' subsystem, ID: [Transformers, default]
2021-03-16 09:45:30,374 INFO  [org.alfresco.repo.management.subsystems.ChildApplicationContextFactory] [http-nio-8080-exec-10] Startup of 'Transformers' subsystem, ID: [Transformers, default] complete
```

### Web application URLs

After an installation has completed you'll find the different user interfaces.

If you did a [local installation](#local-installation), where the Ansible control node and Alfresco components are running, use:

* Digital Workspace: `http://<control-node-ip>/workspace`
* Share: `http://<control-node-ip>/share`
* Repository: `http://<control-node-ip>/alfresco`
* API Explorer: `http://<control-node-ip>/api-explorer`

If you did a [remote installation](#remote-installation), where the Ansible control node and Alfresco components are installed on different nodes, then use:

* Digital Workspace: `http://<nginx-host-ip>/workspace`
* Share: `http://<nginx-host-ip>/share`
* Repository: `http://<nginx-host-ip>/alfresco`
* API Explorer: `http://<nginx-host-ip>/api-explorer`

To login to Digital Workspace and Share, you can use username **admin** and password **admin**.

### Folder structure

A consistent folder structure is used regardless of the role and connection type. You'll find the installed files in the following locations:

| Path | Purpose |
| ---- | ------- |
| `/opt/alfresco`     | Binaries |
| `/etc/opt/alfresco` | Configuration |
| `/var/opt/alfresco` | Data |
| `/var/log/alfresco` | Logs |

### Service configuration

The following `systemd` services are installed, which you can use to stop and start each service:

| Service Name | Purpose |
| ------------ | ------- |
| `activemq.service` | ActiveMQ Service |
| `postgresql-<version>.service` | PostgreSQL DB Service (where `<version>` is 11 for Content Services 6.2.N and 13 for Content Services 7.x) |
| `nginx.service` | NGINX Service |
| `alfresco-content.service` | Content Service |
| `alfresco-search.service` | Alfresco Search Services |
| `alfresco-shared-fs.service` | Alfresco Shared File Store Controller Service |
| `alfresco-sync.service` | Alfresco Sync Service |
| `alfresco-tengine-aio.service` | Alfresco All-In-One (AIO) Transform Core Engine |
| `alfresco-transform-router.service` | Alfresco Transform Router Service |

### TCP port configuration

Several roles set up services that listen on TCP ports, and several roles wait for TCP ports to be listening before continuing to run (indicated by `Yes` in the "Required For Installation" column). The table below shows the communication paths and port numbers used:

| Target Host | Target Port | Source Hosts | Required For Installation |
| ----------- | ----------- | ------------ | ------------------------- |
| activemq | 61616 | `repository`, `syncservice`, `transformers` | Yes |
| database | 5432 | `repository`, `syncservice` | Yes |
| repository | 8080 | `nginx`, `search`, `syncservice` | Yes |
| search | 8983 | `repository` | No |
| transformers (aio t-engine) | 8090 | `repository` | No |
| syncservice | 9090 | `nginx` | No |
| adw | 80 | `nginx` | No |
| nginx | 80 | `<client-ips>` | No |
| nginx | 443 | `<client-ips>` | No |

> **Note:** The `transformers` host also contains the Transform Router process running on port `8095`, and the shared file system process running on `8099`, but communication between these components remains local.

## Configure your installation

By default, without any configuration applied, the playbook installs a limited trial of the Enterprise version of Content Services 7.x that goes into read-only mode after 2 days. If you'd like to try Content Services for a longer period, request the 30-day [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

This section describes how to configure your installation before running the playbook.

### License

If you have a valid license, place your `*.lic` file in the `configuration_files/licenses` folder before running the playbook.

> **Note:** You can also [upload a license]({% link content-services/7.1/admin/license.md %}) via the Admin Console once the system is running.

### Alfresco global properties

You can provide your [repository configuration](https://github.com/Alfresco/acs-deployment/blob/master/docs/properties-reference.md){:target="_blank"} by editing the `configuration_files/alfresco-global.properties` file.

The properties defined in this file are appended to the generated `alfresco-global.properties` located in `/etc/opt/alfresco/content-services/classpath`.

### Override playbook variables

Ansible provides a mechanism to [override variables](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#defining-variables-at-runtime){:target="_blank"} when you run the playbook.

Whilst it's possible to override any variable defined by the playbook, we've only tested changing the variables defined in `group_vars/all.yml`.

When running the playbook, you can override variables by using either the `--extra-vars` or `-e` command line option.

If you have more than one variable to override, we recommend using a separate file. The file name must be prefixed with `@`, for example:

```bash
ansible-playbook ... --extra-vars "@my-vars.yml"
```

### Apply your own modules (AMP or JAR)

Several Alfresco Module Packages (AMP files) are downloaded and applied when you run the playbook **execution**. These are defined in a variable that you can override using the mechanism described in the previous section. Follow the steps below to apply your own AMPs:

1. Open `group_vars/all.yml` and copy the whole `amp_downloads` variable definition.
2. Create a new file and paste the `amp_downloads` variable.
3. Add any additional AMPs you want to apply, paying close attention to the `dest` property. If it's a repository AMP use the `amps_repo` folder; if it's a Share AMP use the `amps_share` folder.
4. Save the file and reference it via the `--extra-vars` option when running the playbook.

> **Note:** This mechanism will be improved in a future release.

### JVM options

Each Java based service installed by the playbook is configured with some default settings, including memory settings.

The defaults are defined in `group_vars/all.yml` so they can be overridden using the mechanism described [above](#override-playbook-variables).

For example, to override the `JAVA_OPTS` environment variable for the AIO Transform Core Engine place the following in your extra vars file:

```yaml
tengine_environment:
  JAVA_OPTS: "$JAVA_OPTS -Xms512m -Xmx1g"
```

The `*_environment` variable is defined as a dictionary, all keys are added to the relevant components start script, thus allowing you to define any number of environment variables.

### External databases

By default, the playbook installs and configures a Postgres server for you. If you'd prefer to use an external database server, you can override the `repo_db_url` variable as described in the earlier [override](#override-playbook-variables) section.

An example custom database URL is shown below:

```yaml
repo_db_url: jdbc:mysql://54.164.117.56:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
repo_db_driver: com.mysql.jdbc.Driver
```

Along with the URL, the database driver binaries need to be provided for one or both services in the `configuration_files/db_connector_repo` and/or `configuration_files/db_connector_sync` folders.

The default database username (`repo_db_username` and/or `sync_db_username`) and password (`repo_db_password` and/or `sync_db_password`) in the configuration file `group_vars/all.yml` can also be overidden with your custom values.

See [Configuring databases]({% link content-services/7.1/config/databases.md %}) for more details.

### Custom keystore

The playbook installs a default keystore to ease the installation process, however, we recommend you [generate your own keystore]({% link search-services/latest/config/keys.md %}).

There are three steps required to use a custom keystore:

1. Place your generated keystore file in the `configuration_files/keystores` folder. These are copied to `/var/opt/alfresco/content-services/keystore`.
2. Override the `use_custom_keystores` variable defined in `group_vars/all.yml`.
3. Override the `acs_environment` variable and define your custom `JAVA_TOOL_OPTIONS` configuration.

An example custom `extra-vars` file is shown below:

```yaml
use_custom_keystores: true
acs_environment:
  JAVA_OPTS: " -Xms512m -Xmx3g -XX:+DisableExplicitGC
    -XX:+UseConcMarkSweepGC
    -Djava.awt.headless=true
    -XX:ReservedCodeCacheSize=128m
    $JAVA_OPTS"
  JAVA_TOOL_OPTIONS: " -Dencryption.keystore.type=pkcs12
    -Dencryption.cipherAlgorithm=AES/CBC/PKCS5Padding
    -Dencryption.keyAlgorithm=AES
    -Dencryption.keystore.location=/var/opt/alfresco/content-services/keystore/<your-keystore-file>
    -Dmetadata-keystore.password=<your-keystore-password>
    -Dmetadata-keystore.aliases=metadata
    -Dmetadata-keystore.metadata.password=<your-keystore-password>
    -Dmetadata-keystore.metadata.algorithm=AES"
```

## Troubleshooting

The following section includes troubleshooting information.

### Error messages {#errormsg}

Errors that you might encounter during an installation.

#### Incorrect Nexus credentials

The following error during installation indicates Nexus login issues:

```text
*fatal: [transformers_1]: FAILED! =>
{
"msg": "An unhandled exception occurred while templating '
.....
Error was a <class 'ansible.errors.AnsibleError'>, original message: An unhandled exception occurred while running the lookup plugin 'url'.
Error was a <class 'ansible.errors.AnsibleError'>, original message: Received HTTP error for
https://artifacts.alfresco.com/nexus/repository/enterprise-releases/org/alfresco/alfresco-content-services-distribution/7.0.0/alfresco-content-services-distribution-7.1.0.zip.sha1
 : HTTP Error 401: basic auth failed"
}*
```

To fix this, check that you've specified the correct Nexus credentials (i.e. `NEXUS_USERNAME` an `NEXUS_PASSWORD`).

#### Cannot access any web applications

If running on AWS make sure the security group associated with the EC2 instance has port `80` open in an Inbound rule. If running on a bare metal host make sure that the host is not blocked by a firewall.

### Known issues

* The playbook downloads several large files so you'll experience some pauses while they transfer. You'll also see the message *"FAILED - RETRYING: Verifying if `<file>` finished downloading (nnn retries left)"* appearing many times. Despite the wording this is **not** an error, so you can ignore it and wait for the process to finish.
* The playbook is not yet fully idempotent (meaning it can be run multiple times with the same result) so may cause issues if you make changes and run multiple times.
* The `firewalld` service can prevent the playbook from completing successfully if it's blocking the [ports required](#tcp-port-configuration) for communication between the roles.
* The `nginx` and `adw` roles need to be deployed to the same host otherwise the [playbook fails](#nginx-failure).

### Remove a previous installation

What needs to be removed from a system depends on your inventory configuration. The steps below presume a localhost or single machine installation, i.e. where all roles were run on the same machine.

1. Stop and remove the following `systemd` services:

   * alfresco-transform-router.service
   * alfresco-shared-fs.service
   * alfresco-tengine-aio.service
   * alfresco-sync.service
   * alfresco-search.service
   * alfresco-content.service
   * nginx.service
   * activemq.service
   * postgres-`version`.service (where `version` is 11 for Content Services 6.2.N and 13 for Content Services 7.x)

2. Remove the following `yum` packages:

   * ImageMagick
   * libreoffice
   * nginx
   * postgresql

3. Remove the following folders:

   * /opt/apache-activemq-`version`
   * /opt/apache-tomcat-`version`
   * /opt/libreoffice`version`
   * /opt/openjdk-`version`
   * /opt/alfresco
   * /etc/opt/alfresco
   * /var/opt/alfresco
   * /var/log/alfresco
   * /tmp/ansible_artefacts
   * /tmp/Alfresco

> **Note:** An additional "uninstall" playbook may be provided in the future.

### Additional troubleshooting

For the latest troubleshooting information, refer to the [project documentation](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/docs/deployment-guide.md#troubleshooting){:target="_blank"}.
