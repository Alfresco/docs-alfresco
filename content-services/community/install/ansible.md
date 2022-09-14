---
title: Install with Ansible
---

This page describes how to install Community Edition using an [Ansible](https://www.ansible.com){:target="_blank"} playbook. Ansible is an open-source software provisioning, configuration management and application installation tool that enables infrastructure as code. Alfresco provides an Ansible playbook capable of installing the latest Community Edition.

Before continuing you need to be familiar with some [Ansible concepts](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html){:target="_blank"}:

* [control node](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#control-node){:target="_blank"}: the machine the playbook is run from is known as the **control node**.

* [connection type](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters){:target="_blank"}: the type of connection to the host.

* [inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#intro-inventory){:target="_blank"}: used to describe where the different Content Services should be installed.

There are two types of installations - local and remote:

* **Local** where all the components are installed on the control node machine:

![deployment-type-local]({% link content-services/images/deployment-type-local.png %})

* **Remote** (also known as `ssh`) where components are installed on one or more remote `hosts`. These hosts can be bare metal machines, Virtual machines, or instances running on a public cloud:

![deployment-type-ssh]({% link content-services/images/deployment-type-ssh.png %})

## Target O/S

The playbooks have been tested using Ansible 2.9.21 (or later) on target hosts with the following operating systems:

* CentOS 7 and 8
* Red Hat Enterprise Linux 7 and 8

Additional target environments will be added in future releases.

## Set up Ansible

A control node is required to run the playbook. You can use any computer as a control node that has Python installed. Usually, laptops, desktops, and servers can all run Ansible.

In the interest of keeping this guide simple, we'll use an AWS EC2 instance as the control node. The required steps are:

1. Launch an EC2 instance using the CentOS 7 or 8 (x86_64) AMI from the Marketplace (instance size/type does not matter):

    ![centos-ami]({% link content-services/images/centos-ami.png %})

2. Download the Ansible playbook [zip file](https://nexus.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/alfresco-ansible-deployment/1.1.1/alfresco-ansible-deployment-1.1.1.zip){:target="_blank"}.

3. Transfer the ZIP file to the control node and SSH into the machine:

    ```bash
    scp -i <yourpem-file> <local-path>/alfresco-ansible-deployment-<version>.zip centos@<control-node-ip>:/home/centos/
    ssh -i <yourpem-file> centos@<control-node-ip>
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

Without any additional configuration applied, the playbook installs the default Alfresco Content Services components. See the [configuration](#configure-your-installation) section below to adjust some of the configurable installation options.

To install everything on the control node, follow the steps in the [Local installation](#local-installation) section. To install to one or more other machines, follow the steps in the [Remote installation](#remote-installation) section.

## Local installation

The diagram below shows the result of a local installation.

![acs-localhost]({% link content-services/images/acs-localhost.png %})

To deploy Community Edition use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@community-extra-vars.yml"
```

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the block below:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

Once Community Edition has initialized, access the system using the following URLs with a browser:

* Share: `http://<control-node-public-ip>/share`
* Repository: `http://<control-node-public-ip>/alfresco`
* API Explorer: `http://<control-node-public-ip>/api-explorer`

## Remote installation

To install to hosts other than the control node, an SSH connection is required. The control node must have network access to all the target hosts and permission to SSH into the machine.

> **Note:** The inventory file (`inventory_ssh.yml`) is used to specify the target IP addresses and the SSH connection details. You can specify one IP address for all the hosts to obtain a single-machine installation, or different IP addresses for a multi-machine installation.

The example snippet below shows how to install the repository to a host with an IP address of `50.6.51.7` using an SSH key located at `/path/to/ssh_key.pem`:

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

To check that your inventory file is configured correctly and the control node is able to connect to the target host, navigate to the folder where you extracted the ZIP, and run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To deploy Community Edition, run:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@community-extra-vars.yml"
```

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

Once Community Edition has initialized, access the system using the following URLs with a browser:

* Share: `http://<target-host-ip>/share`
* Repository: `http://<target-host-ip>/alfresco`
* API Explorer: `http://<target-host-ip>/api-explorer`

### Multi-machine installation

The diagram below shows the result of a multi-machine installation.

![acs-multi-machine]({% link content-services/images/acs-multi-machine.png %})

Once you've prepared the target hosts (ensuring the [relevant ports](#tcp-port-configuration) are accessible) and configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

To check that your inventory file is configured correctly and the control node is able to connect to the target hosts, run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To deploy Community Edition:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@community-extra-vars.yml"
```

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

Once Community Edition has initialized, access the system using the following URLs with a browser:

* Share: `http://<nginx-host-ip>/share`
* Repository: `http://<nginx-host-ip>/alfresco`
* API Explorer: `http://<nginx-host-ip>/api-explorer`

## Useful information

The following section contains further information about the Ansible installation approach.

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
| `postgres-13.service` | PostgreSQL DB Service |
| `nginx.service` | NGINX Service |
| `alfresco-content.service` | Alfresco Content Service |
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

This section describes how to configure your installation before running the playbook.

### Alfresco global properties

You can provide your [repository configuration](https://github.com/Alfresco/acs-deployment/blob/master/docs/properties-reference.md){:target="_blank"} by editing the `configuration_files/alfresco-global.properties` file.

The properties defined in this file are appended to the generated `alfresco-global.properties` located in `/etc/opt/alfresco/content-services/classpath`.

### Override playbook variables

Ansible provides a mechanism to [override variables](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#defining-variables-at-runtime){:target="_blank"} when you run the playbook.

Whilst it's possible to override any variable defined by the playbook, we've only tested changing the variables defined in `group_vars/all.yml`.

When running the playbook, you can override variables by using either the `--extra-vars` or `-e` command line option.

If you have more than one variable to override, we recommend using a separate file. The file name must be prefixed with "@", for example:

```bash
ansible-playbook ... --extra-vars "@my-vars.yml"
```

### Apply AMPs

Several Alfresco Module Packages (AMP files) are downloaded and applied when you run the playbook. These are defined in a variable that can be override using the mechanism described in the previous section. Follow the steps below to apply your own AMPs

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

See [Configuring databases]({% link content-services/community/config/databases.md %}) for more details.

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

### Known issues

* The playbook downloads several large files, so you'll experience some pauses while they transfer. You'll also see the message *"FAILED - RETRYING: Verifying if `<file>` finished downloading (nnn retries left)"* appearing many times. Despite the wording this is **not** an error, so you can ignore it and wait for the process to finish.
* The playbook is not yet fully idempotent (meaning it can be run multiple times with the same result) so may cause issues if you make changes and run multiple times.
* The `firewalld` service can prevent the playbook from completing successfully if it's blocking the [ports required](#tcp-port-configuration) for communication between the roles.

### Remove a previous installation

What needs to be removed from a system depends on your inventory configuration. The steps below presume a localhost or single machine installation, i.e. where all roles were run on the same machine.

1. Stop and remove the following `systemd` services:

   * alfresco-tengine-aio.service
   * alfresco-search.service
   * alfresco-content.service
   * activemq.service
   * nginx.service
   * postgres-13.service

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
