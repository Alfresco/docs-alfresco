---
title: Install with Ansible
---

# Alfresco Ansible Installation

This page describes how to install Alfresco Content Services (ACS) using an [Ansible](https://www.ansible.com) playbook. Ansible is an open-source software provisioning, configuration management and application installation tool enabling infrastructure as code. Alfresco provides an Ansible playbook capable of installing Alfresco Content Services (ACS) Enterprise 7.x or 6.2.N.

Before continuing we need to introduce some [Ansible concepts](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html); [control node](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#control-node), [connection type](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#connecting-to-hosts-behavioral-inventory-parameters) and the [inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#intro-inventory).

The machine the playbook is run from is known as the **control node**. An **inventory** file is used to describe where the different Content Services should be installed on. 

There are two types of installation: 
* **Local** where all the components will be installed on the control node machine:

![](../../images/deployment-type-local.png)

* **Remote** (also known as `ssh`) where components can be installed on one or more remote `hosts`. These hosts can be bare metal machines, Virtual machines or instances running on a public cloud:

![](../../images/deployment-type-ssh.png)


## Prerequisites

* For Alfresco Content Services Enterprise, credentials to access the necessary artefacts from [Nexus](https://artifacts.alfresco.com). Customers can request these through [Hyland Community](https://community.hyland.com/)


# Setting up Ansible

As mentioned in the introduction a control node is required to run the playbook. You can use any computer that has a Python installation as a control node; laptops, shared desktops, and servers can all run Ansible.

In the interest of keeping this guide simple we will use an AWS EC2 instance as the control node, the steps required are shown below:

1. Launch an EC2 instance using the Centos 7 or 8 (x86_64) AMI from the Marketplace (instance size/type does not matter)

    ![](../../images/centos-ami.png)

2. Download the Ansible playbook [zip file](https://nexus.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/alfresco-ansible-deployment/1.0/alfresco-ansible-deployment-1.0.zip)

3. Transfer the ZIP file to the control node and SSH into the machine

    ```bash
    scp -i <yourpem-file> <local-path>/alfresco-ansible-deployment-<version>.zip centos@<control-node-ip>:/home/centos/
    ssh -i <yourpem-file> centos@<control-node-ip>
    ```

4. Install the required dependencies for Ansible (replace the 7 with 8 in the URL if you're using CentOS 8)

    ```bash
    sudo yum install -y unzip https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
    ```

5. Install Ansible

    ```bash
    sudo yum install -y ansible
    ```

6. Extract the ZIP file

    ```bash
    unzip alfresco-ansible-deployment-<version>.zip
    ```

7. Create environment variables to hold your Nexus credentials as shown below (replacing the values appropriately):

    ```bash
    export NEXUS_USERNAME="<your-username>"
    export NEXUS_PASSWORD="<your-password>"
    ```

Without any additional configuration applied, the playbook will install the default Alfresco Content Services components. Please review the [configuration](#configure-your-installation) section below, to adjust some of the configurable installation options.

To install everything on the control node follow the steps in the [Locahost Installation](#Local-Installation) section or to install to one or more other machines follow the steps in the [Remote Installation](#Remote-Installation) section.


# Local Installation

The diagram below shows the result of a local installation.

![](../../images/acs-localhost.png)

To install ACS 7 Enterprise on the local machine navigate to the folder you extracted the ZIP to and execute the playbook as the current user using the following command (the playbook will escalate privileges when required):

```bash
ansible-playbook playbooks/acs.yml -i inventory_local.yml
```

Alternatively, to install an earlier version of ACS Enterprise (e.g. 6.2.2)  system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@6.2.N-extra-vars.yml"
```

> NOTE: The playbook takes around 30 minutes to complete.

Once the playbook is complete Ansible will display a play recap to let you know that everything is done, similar to the block below:

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

Once ACS has initialized access the system using the following URLs with a browser:

* Digital Workspace: `http://<control-node-public-ip>/workspace`
* Share: `http://<control-node-public-ip>/share`
* Repository: `http://<control-node-public-ip>/alfresco`
* API Explorer: `http://<control-node-public-ip>/api-explorer`

# Remote Installation

To install to hosts other than the control node an SSH connection is required. The control node must have network access to all the target hosts and permission to SSH into the machine.

> **Note:** The inventory file (`inventory_ssh.yml`) is used to specify the target IP addresses and the SSH connection details. You can specify one IP address for all the hosts to obtain a single-machine installation, or different IP addresses for a multi-machine installation.

The example snippet below demonstrates how to install the repository to a host with an IP address of `50.6.51.7` and SSH key at `/path/to/ssh_key.pem`.

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


## Single Machine Installation

The diagram below shows the result of a single machine installation.

![](../../images/acs-single-machine.png)

Once you have prepared the target host and configured the inventory_ssh.yaml file as described above, you are ready to run the playbook.

To check your inventory file is configured correctly and the control node is able to connect to the target host navigate to the folder you extracted the ZIP to and run the following command:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To install ACS 7 Enterprise on the target host execute the playbook as the current user using the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml
```

Alternatively, to install an ACS 6.2.N Enterprise system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"
```

> NOTE: The playbook takes around 30 minutes to complete.

Once the playbook is complete Ansible will display a play recap to let you know that everything is done, similar to the block below:

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

Once ACS has initialized access the system using the following URLs with a browser:

* Digital Workspace: `http://<target-host-ip>/workspace`
* Share: `http://<target-host-ip>/share`
* Repository: `http://<target-host-ip>/alfresco`
* API Explorer: `http://<target-host-ip>/api-explorer`

## Multi Machine Installation

The diagram below shows the result of a multi machine installation.

![](../../images/acs-multi-machine.png)

Once you have prepared the target hosts (ensuring the [relevant ports](#tcp-port-configuration) are accessible) and configured the inventory_ssh.yaml file as described above, you are ready to run the playbook.

To check your inventory file is configured correctly and the control node is able to connect to the target hosts run the following command:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To install ACS 7 Enterprise on the target hosts execute the playbook as the current user using the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml
```

Alternatively, to install an ACS 6.2.N Enterprise system use the following command:

```bash
ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"
```

> NOTE: The playbook takes around 30 minutes to complete.

Once the playbook is complete Ansible will display a play recap to let you know that everything is done, similar to the block below:

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

Once ACS has initialized access the system using the following URLs with a browser:

* Digital Workspace: `http://<nginx-host-ip>/workspace`
* Share: `http://<nginx-host-ip>/share`
* Repository: `http://<nginx-host-ip>/alfresco`
* API Explorer: `http://<nginx-host-ip>/api-explorer`

# Useful Information

## Folder Structure

Regardless of role and connection type a consistent folder structure is used, you will find the installed files in the following locations:

| Path | Purpose |
| :--- | :--- |
| ```/opt/alfresco```     | Binaries |
| ```/etc/opt/alfresco``` | Configuration |
| ```/var/opt/alfresco``` | Data |
| ```/var/log/alfresco``` | Logs |

## Service Configuration

The following systemd services are installed and can be used to stop and start Alfresco components:

| Service Name | Purpose |
| :--- | :--- |
| ```activemq.service``` | ActiveMQ Service |
| ```postgresql-<version>.service``` | Postgresql DB Service (where `<version>` is 11 for ACS 6.2.N and 13 for ACS 7.x) |
| ```nginx.service``` | Nginx Service |
| ```alfresco-content.service``` | Alfresco Content Service |
| ```alfresco-search.service``` | Alfresco Search Service |
| ```alfresco-shared-fs.service``` | Alfresco Shared File Store Controller Service |
| ```alfresco-sync.service``` | Alfresco Sync Service |
| ```alfresco-tengine-aio.service``` | Alfresco AIO Transform Core Engine |
| ```alfresco-transform-router.service``` | Alfresco Transformation Router Service |

## TCP Port Configuration

Several roles setup services that listen on TCP ports and several roles wait for TCP ports to be listening before continuing execution (indicated by `Yes` in the "Required For Installation" column). The table below shows the communication paths and port numbers used.

| Target Host | Target Port | Source Hosts | Required For Installation |
| :--- | :--- | :--- | :--- |
| activemq | 61616 | repository, syncservice, transformers | Yes |
| database | 5432 | repository, syncservice | Yes |
| repository | 8080 | nginx, search, syncservice | Yes |
| search | 8983 | repository | No |
| transformers (aio t-engine) | 8090 | repository | No |
| syncservice | 9090 | nginx | No |
| adw | 80 | nginx | No |
| nginx | 80 | `<client-ips>` | No |
| nginx | 443 | `<client-ips>` | No |

> NOTE: The transformers host will also contain the transform router process running on port 8095 and the shared file system process running on 8099 but communication between these components remains local.

# Configure your installation

By default, without any configuration applied, the playbook will install a limited trial of the Enterprise version of Alfresco Content Services 7.x that goes into read-only mode after 2 days. If you'd like to try Alfresco Content Services for a longer period, request the 30-day [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download).

The sections below describe how you can configure your installation before running the playbook.

## License

If you have a valid license place your `*.lic` file in the `configuration_files/licenses` folder before running the playbook.

>NOTE: You can also [upload a license](https://docs.alfresco.com/6.2/tasks/at-adminconsole-license.html) via the Admin Console once the system is running.

## Alfresco Global Properties

You can provide your [repository configuration](https://github.com/Alfresco/acs-deployment/blob/master/docs/properties-reference.md) by editing the `configuration_files/alfresco-global.properties` file.

The properties defined in this file will be appended to the generated "alfresco-global.properties" located in "/etc/opt/alfresco/content-services/classpath".

## Override Playbook Variables

Ansible provides a mechanism to [override variables](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#defining-variables-at-runtime) provided by the playbook at runtime.

Whilst it's possible to override any variable defined by the playbook we have only tested changing the variables defined in `group_vars/all.yml`.

Variables can be overridden using either the `--extra-vars` or `-e` command line option when running the playbook.

If you have more than one variable to override we recommend using a separate file. The file name must be prefixed with "@", for example:

```bash
ansible-playbook ... --extra-vars "@my-vars.yml"
```

## AMPs

Several AMP files are downloaded and applied during playbook execution, these are defined in a variable that can be overridden using the mechanism described in the previous section. Follow the steps below to apply your own AMPs

1. Open `group_vars/all.yml` and copy the whole `amp_downloads` variable definition
2. Create a new file and paste the `amp_downloads` variable
3. Add any additional AMPs you want to apply paying close attention to the `dest` property. If it's a repository AMP use the `amps_repo` folder, if it's a Share AMP use the `amps_share` folder
4. Save the file and reference it via the `--extra-vars` option when running the playbook

>NOTE: This mechanism will be improved in a future release.

## JVM Options

Each Java based service installed by the playbook is configured with some default settings, including memory settings.

The defaults are defined in group_vars/all.yml so they can be overridden using the mechanism described [above](#override-playbook-variables).

For example, to override the JAVA_OPTS environment variable for the All In One Transformer Engine place the following in your extra vars file:

```yaml
tengine_environment:
  JAVA_OPTS: "$JAVA_OPTS -Xms512m -Xmx1g"
```

The `*_environment` variable is defined as a dictionary, all keys are added to the relevant components start script thus allowing you to define any number of environment variables.

## External Databases

By default the playbook will install and configure a Postgres server for you. If you'd prefer to use an external database server you can override the `repo_db_url` variable as described [previously](#override-playbook-variables).

An example custom database url is shown below:

```yaml
repo_db_url: jdbc:mysql://54.164.117.56:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
repo_db_driver: com.mysql.jdbc.Driver
```

Along with the url the database driver binaries need to be provided for one or both services in the `configuration_files/db_connector_repo` and/or `configuration_files/db_connector_sync` folders.

The default database username (`repo_db_username` and/or `sync_db_username`) and password (`repo_db_password` and/or `sync_db_password`) in the configuration file `group_vars/all.yml` can also be overidden with your custom values.

Please refer to the [Configuring Databases](https://docs.alfresco.com/6.2/concepts/intro-db-setup.html) documentation for more detailed information.

## Custom Keystore

By default the playbook installs a default keystore to ease the installation process, however, we recommend you [generate your own keystore](https://docs.alfresco.com/6.2/concepts/keystore-generate.html) following the [instructions here](https://docs.alfresco.com/6.2/concepts/keystore-config.html).

There are three steps required to use a custom keystore:

1. Place your generated keystore file in the `configuration_files/keystores` folder (these get copied to /var/opt/alfresco/content-services/keystore)
2. Override the `use_custom_keystores` variable defined in group_vars/all.yml
3. Override the `acs_environment` variable and define your custom JAVA_TOOL_OPTIONS configuration

An example custom extra-vars file is shown below:

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

# Troubleshooting

## Known Issues

* The playbook downloads several large files so you will experience some pauses while they transfer and you'll also see the message "FAILED - RETRYING: Verifying if `<file>` finished downloading (nnn retries left)" appearing many times. Despite the wording this is **not** an error so please ignore and be patient!
* The playbook is not yet fully idempotent so may cause issues if you make changes and run multiple times
* The `firewalld` service can prevent the playbook from completing successfully if it's blocking the [ports required](#tcp-port-configuration) for communication between the roles


## Failed Downloads

If you see an error similar to the one below (in particular the mention of `HTTP Error 401: Unauthorized`) you've most likely forgotten to setup your Nexus credentials or mis-configured them.

```bash
fatal: [search_1]: FAILED! => {"attempts": 3, "changed": false, "dest": "/tmp/ansible_artefacts/alfresco-search-services-2.0.1.zip", "elapsed": 0, "msg": "Request failed", "response": "HTTP Error 401: Unauthorized", "status_code": 401, "url": "https://artifacts.alfresco.com/nexus/service/local/repositories/enterprise-releases/content//org/alfresco/alfresco-search-services/2.0.1/alfresco-search-services-2.0.1.zip"}
```

You can run the command shown below in the same terminal you're using to run the playbook to quickly test downloading a protected resource from Nexus.

```bash
wget -qO /dev/null --user=${NEXUS_USERNAME} --password=${NEXUS_PASSWORD} https://artifacts.alfresco.com/nexus/service/local/repositories/enterprise-releases/content/org/alfresco/alfresco-content-services-distribution/6.2.2/alfresco-content-services-distribution-6.2.2.pom
```

If everything is configured correctly you should see the following at the end of the output:

```bash
Saving to: ‘alfresco-content-services-distribution-6.2.2.pom’

alfresco-content-services-distribution-6.2.2.pom      100%[=============================================>]   8.53K  --.-KB/s    in 0.003s  

2021-02-18 13:50:44 (2.54 MB/s) - ‘alfresco-content-services-distribution-6.2.2.pom’ saved [8739/8739]
```

## Removing a previous installation

What needs to be removed from a system will depend on your inventory configuration. The steps below presume a localhost or single machine installation i.e. where all roles were run on the same machine.

1. Stop and remove the following systemd services:
   * alfresco-transform-router.service
   * alfresco-shared-fs.service
   * alfresco-tengine-aio.service
   * alfresco-sync.service
   * alfresco-search.service
   * alfresco-content.service
   * nginx.service
   * activemq.service
   * postgres-`version`.service (where `version` is 11 for ACS 6.2.N and 13 for ACS 7.x)
2. Remove the following yum packages:
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

> NOTE: An additional "uninstall" playbook may be provided in the future.

## Communication Failures

If you are using a multi-machine installation and the playbook fails with an error similar to the one shown below you may need to check the firewall configuration on the target hosts.

```bash
TASK [../roles/repository : Notify alfresco content service] 
*******************************************************************************************************
fatal: [repository_1]: FAILED! => {"changed": false, "elapsed": 300, "msg": "Timeout when waiting for 192.168.0.126:5432"}
```

Either disable the firewall completely or refer to the [ports configuration](#tcp-port-configuration) section for what ports need to be accessible.

Presuming you are using `firewalld` the following example commands can be used to open a port, replacing `<port-number>` with the approriate number or replacing `<service-name>` with a well know service name e.g. "http".

```bash
firewall-cmd --permanent --add-port=<port-number>/tcp
```

or

```bash
firewall-cmd --permanent --add-service=<service-name>
```

> After the firewall config has been set up a reload of the `firewalld` service is needed

## Playbook Failures

If the playbook fails for some reason try re-running it with the `-v` option, if that still doesn't provide enough information try re-running with the `-vvv` option.

## Alfresco Failures

If the playbook completes successfully but the system is not functioning the best place to start is the log files, these can be found in the `/var/log/alfresco` folder on the target hosts. Please note the nginx log files are owned by root as the nginx process is running as root so it can listen on port 80.
