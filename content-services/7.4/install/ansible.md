---
title: Install with Ansible
---

This page describes how to install Content Services using an [Ansible](https://www.ansible.com){:target="_blank"} playbook. Ansible is an open-source software provisioning, configuration management, and application installation tool that enables infrastructure as code. Alfresco provides an Ansible playbook capable of installing Content Services (Enterprise Edition).

Before continuing you need to be familiar with some [Ansible concepts](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html){:target="_blank"}: and the notion of [idempotency](https://docs.ansible.com/ansible/latest/reference_appendices/glossary.html#term-Idempotency){:target="_blank"}:.

## The control node

The machine the playbook is run from is known as the control node. Ansible has some prerequisites for this control node. The main one is that it needs to run on a POSIX compliant system ; meaning Linux or others Unix (Including MacOSX), but not windows.
On windows please see the provided `Vagrantfile` in order to kick start a local Linux VM where to deploy the playbook.

More info on [control node](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#control-node){:target="_blank"}.

## Managed nodes

The managed nodes are the machines/hosts where the Alfresco platform and all its related components will be prepared, installed, and configured. In a minimal installation, such as a dev environment, the control node and the managed node can be the same machine, though usually deployment is done from the control node to many managed nodes.

## Understanding the inventory file

An [inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html){:target="_blank"} is used to describe the architecture or environment where you want to deploy the Content Services platform. Each managed machine/host taking part in the environment needs to be described with at least:

* a `host name`: a name, which in most cases can be anything (It is though a good practice to use a name or an address that all managed machines can resolve and reach from their local network).

And optionally:

* an `ansible_user` variable: if the host requires a unique and specific user to login to.
* an `ansible_host` variable; if the host needs to be reached through an address that's different from the `inventory_hostname` (e.g. machine is only reachable through a bastion host or some sort of NAT).
* an `ansible_private_key_file` in case your hosts needs a specific SSH key in order to login to it.

A Content Services inventory file has the following groups a host can belong to:

* `repository`: the list of one or more hosts that will get a Content Services repository deployed.
* `database`: a host on which the playbook will deploy PostgreSQL.
* `activemq`: the host on which the playbook will deploy the message queue component required by Content Services.
* `external_activemq`: an alternative group to `activemq` in case you don't want to deploy ActiveMQ using our basic activemq role but instead use an ActiveMQ instance of yours which matched your hosting standards.
* `search`: a single host on which to deploy Alfresco Search Services.
* `search_enterprise`: one or more hosts on which to deploy Search Enterprise, as an alternative to Alfresco Search.
* `elasticsearch`: one or more hosts on which to deploy the ElasticSearch cluster backing Search Enterprise.
* `external_elasticsearch`: an alternative group to `elasticsearch` in case you don't want to deploy ElasticSearch using the [community ElasticSearch role](https://github.com/buluma/ansible-role-elasticsearch){:target="_blank"} but instead use an ElasticSearch cluster of yours which matches your hosting standards.
* `nginx`: a single host on which the playbook will deploy an NGINX reverse proxy configured for the numerous http based services, such as Alfresco Share and Alfresco Digital Workspace.
* `acc`: a single host where you want the Alfresco Control Center UI to be installed.
* `adw`: a single host where you want the Alfresco Digital Workspace UI to be installed.
* `transformers`: a single host where the playbook will deploy the Alfresco Transform Service components.
* `syncservice`: a single host where the Alfresco Sync Service will be deployed.

> **Note:** Ansible also ships with a default group called `all`, which all hosts always belongs to.

Inventory files provided as examples in this playbook are all written in YAML. Groups are always children items of the `all` group itself or of other groups. Hosts are mentioned after a `hosts` key under any group (including the `all` group). So a generic example would be:

```yaml
---
all:
  children:
    repository:
      hosts:
        repo1.example.com:
```

An inventory file can also be used to set variables within a specific scope. Variables can be specified at the hosts, groups, or all levels, thus affecting the scope in which that variable is available. So if a variable, such as `ansible_user`, is valid for all hosts, it should be set once under the `all` group.

See [Ansible variable precedence documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#understanding-variable-precedence){:target="_blank"} to better understand how precedence works.

In most cases we recommend that you use your inventory to add the configuration variables that you need, tweaking the playbook to your needs.

We provide example inventories:

* **Local** where all the components are installed on the control node machine:

![deployment-type-local]({% link content-services/images/deployment-type-local.png %})

* **Remote** (also known as `ssh`) where components are installed on one or more remote `hosts`. These hosts can be bare metal machines, virtual machines, or instances running on a public cloud:

![deployment-type-ssh]({% link content-services/images/deployment-type-ssh.png %})

* **HA** (also known as `ha` - high availability). It's very similar to the `ssh` one but also provides a skeleton for repository clustering.

Complete documentation about the inventory file is available at [Ansible](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html#intro-inventory){:target="_blank"}.

## Prerequisites

If you're using the Enterprise edition of Content Services, then you need credentials to access the necessary artifacts from [Nexus](https://nexus.alfresco.com/nexus/){:target="_blank"}. Customers can request these through [Hyland Community](https://community.hyland.com/){:target="_blank"}.

### Control Node

In addition to the requirements mentioned earlier for control nodes in general, the playbook requires Ansible 2.14+, which in turn requires Python 3.9+.

### Target O/S

While Content Services supports a wide range of OS, the playbook is only supported for a subset of them. The table below gives detailed information on the status of supported OS:

**Legend:**

* Y = platform supported and tested on this playbook

* [Y] = platform supported but not automatically tested on this playbook

* X = platform not supported by this playbook (despite officially supported by Alfresco)

* \- = platform not officially supported by Alfresco

| OS Flavor / version | 7.4 Enterprise / Community | 7.3 Enterprise | 7.2 Enterprise | 7.1 Enterprise | 7.0 Enterprise |
|-|-|-|-|-|-|
| Amazon Linux (v2) | X | X | X | X | X |
| Amazon Linux (v1) | X | X | X | X | X |
| RHEL 8.7 | [Y] | - | - | - | - |
| RHEL 8.6 | Y | Y | - | - | - |
| RHEL 8.5 | [Y] | Y | Y | - | - |
| RHEL 8.4 | - | Y | Y | Y | Y |
| RHEL 8.2 | - | Y | Y | Y | Y |
| RHEL 7.7 | - | - | - | Y | Y |
| RHEL 7.6 | - | - | - | Y | Y |
| CentOS 7 x64 | [Y] | Y | Y | Y | Y |
| Ubuntu 22.04 | Y | Y | - | - | - |
| Ubuntu 20.04 | Y | Y | Y | Y | Y |
| Ubuntu 18.04 | - | - | Y | Y | Y |
| SUSE 15.0 | - | - | - | - | X |
| SUSE 12.0 SP1 x64 | - | - | - | - | X |

> **Note:** Ansible version 2.14.x is used for testing this playbook.

### Component versions

The table below shows the version of the components deployed by the playbook for Content Services 7.x and Community.

| Component | 7.4 Enterprise | 7.3 Enterprise | 7.2 Enterprise | 7.1 Enterprise | 7.0 Enterprise | Community |
|-|-|-|-|-|-|-|
| OpenJDK | 17.0.3 | 17.0.3 | 11.0.15 | 11.0.15 | 11.0.15 | 17.0.03 |
| Apache Tomcat | 9.0.59 | 9.0.59 | 9.0.59 | 9.0.59 | 8.5.76 | 9.0.59 |
| PostgreSQL | 14.x | 14.x | 13.x | 13.x | 13.x | 14.x |
| Apache ActiveMQ | 5.16.6 | 5.16.6 | 5.16.6 | 5.16.6 | 5.16.6 | 5.16.6 |
| Repository | 7.4.0 | 7.3.0 | 7.2.1 | 7.1.1 | 7.0.1.4 | 7.4.0 |
| Share | 7.4.0 | 7.3.0 | 7.2.1 | 7.1.1 | 7.0.1.4 | 7.4.0 |
| Search Services | 2.0.6.1 | 2.0.5 | 2.0.4 | 2.0.2 | 2.0.1.1 | 2.0.6.1 |
| Search Enterprise | 3.3.0 | 3.2.0 | 3.1.1 | 3.1.1 | - | N/A |
| All-In-One Transform Engine | 3.1.0 | 3.0.0 | 2.5.7 | 2.5.6 | 2.3.10 | 3.1.0 |
| AOS | 1.6.0 | 1.5.0 | 1.4.1 | 1.4.0 | 1.4.0 | 1.6.0 |
| GoogleDocs | 3.4.0 | 3.3.0 | 3.2.2 | 3.2.1 | 3.2.1 | 3.4.0 |
| Digital Workspace | 4.0.0 | 3.1.0 | 2.9.0 | 2.6.0 | 2.1.0 | N/A |
| Transform Router | 2.1.0 | 2.0.0 | 1.5.3 | 1.5.1 |1.3.2 | N/A |
| Shared File Store | 2.1.0 | 2.0.0 | 0.16.1 | 0.16.1 | 0.13.0 | N/A |
| Sync Service | 3.9.0 | 3.8.0 | 3.6.0 | 3.5.0 | 3.4.0 | N/A |

## Set up Ansible

Not all distributions of Linux may match the version requirements for Ansible and its dependencies. Below we describe how to configure a control node with one of the many ways to set a Python virtual environment. With Python `virtualenvs` you can install the exact same versions of Ansible we use when testing without impacting your system installation of Python. By doing so, you're ensuring the best chances of success.

1. Download the Ansible playbook [zip file](https://nexus.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/alfresco-ansible-deployment/2.3.0/alfresco-ansible-deployment-2.3.0.zip){:target="_blank"}.

   If you're not working directly on the control node, transfer the ZIP file to the control node together with the SSH private key required to login to the target machines, and SSH into the control node.

   ```bash
   scp  alfresco-ansible-deployment-<version>.zip user@controlnode:
   ssh-copy-id -i ~/.ssh/ansible_rsa user@controlnode
   ssh  user@controlnode
   unzip alfresco-ansible-deployment-<version>.zip
   cd alfresco-ansible-deployment
   ```
  
   You can also use Git to fetch latest sources (or a specific release for example by adding `-b v2.1.0`) on the control node with:

   ```bash
   git clone https://github.com/Alfresco/alfresco-ansible-deployment.git
   cd alfresco-ansible-deployment
   ```

   > **Note:** You may want to generate an SSH key pair locally and use it later for deployment. Whether you use a locally generated key, or copy over a key to the control node, it is your responsibility to deploy it to the target machines so Ansible can use it. Using SSH keys is recommended but not mandatory. If you instead use password, make sure to add the `-k` switch to the `ansible` command, so it prompts you for a password.

2. Check prerequisites and install required tools:

    ```bash
    python --version # must be at least 3.9 in order to use Ansible 2.14
    sudo apt install virtualenvwrapper unzip # Use your distro's package manager instead of apt if it's not Debian based
    ```

3. Install Ansible and required dependencies in Python `virtualenv`:

    ```bash
    unzip alfresco-ansible-deployment-<version>.zip
    cd alfresco-ansible-deployment
    mkvirtualenv alfresco-ansible
    pip install -r requirements.txt
    ansible-galaxy install -r requirements.yml
    ```

4. If you intend to deploy an Enterprise system, create environment variables to hold your Nexus credentials as shown below (replacing the values appropriately):

   ```bash
   export NEXUS_USERNAME="<your-username>"
   export NEXUS_PASSWORD="<your-password>"
   ```

   > **Note:** If your password contains `!`, then you need to escape it with `\`, as it's a special character to `bash`, and it's used to refer to previous commands. The same escape method applies for other specials characters.

Without any additional configuration applied, the playbook installs the default Content Services components. See the [configuration](#configure-your-installation) section below to adjust some of the configurable installation options.

To install everything on the control node, follow the steps in the [Local installation](#local-installation) section. To install to one or more other machines, follow the steps in the [Remote installation](#remote-installation) section.

### Specifying a different component repository

In case you want to use a different server/repository for a specific artifact to further customize your deployment, you can override the default URL in two ways:

You can change the value of `component.repository` key for the selected component, provided that the path to your custom artifact follows the conventional [Maven2 Repository Layout](https://maven.apache.org/repository/layout.html){:target="_blank"}. For example to change the repository of Content Services artifact you would:

Edit `group_vars/all.yml`:

```yaml
acs:
  version: 7.2.1
  repository: "{{ nexus_repository.enterprise_releases }}/alfresco-content-services-distribution"
  edition: Enterprise
```

to

```yaml
acs:
  version: 7.2.1
  repository: "https://your.repo.com/path/to/your/artifacts"
  edition: Enterprise
```

> **Note:** This assumes that the full URL to your custom artifact looks like `https://your.repo.com/path/to/your/artifacts/7.2.1/alfresco-content-services-distribution-7.2.1.zip`.

In case you want to install a different ACS version (not latest), you should make similar changes to the respective `*-extra-vars.yml` file.

The other way is to override the URL completely:

In `group_vars/all.yml` you need to find the section under which the default download URL for the specific artifact is defined out of `downloads`, `war_downloads` and `amp_downloads` and override it, for example:

```yaml
downloads:
  acs_zip_url: "https://your.repo.com/path/to/your/artifacts/your-alfresco-content-services-community-distribution.zip"
  acs_zip_sha1_checksum_url: "https://your.repo.com/path/to/your/artifacts/your-alfresco-content-services-community-distribution.zip.sha1"
```

Or:

```yaml
war_downloads:
  - url: "https://your.repo.com/path/to/your/artifacts/your-api-explorer.war"
    sha1_checksum_url: "https://your.repo.com/path/to/your/artifacts/your-api-explorer.war.sha1"
    dest: "{{ content_folder }}/web-server/webapps/api-explorer.war"
```

Or:

```yaml
amp_downloads:
  - url: "https://your.repo.com/path/to/your/artifacts/your-alfresco-aos-module.amp"
    sha1_checksum_url: "https://your.repo.com/path/to/your/artifacts/your-alfresco-aos-module.amp.sha1"
    dest: "{{ content_folder }}/amps_repo/alfresco-aos-module.amp"
```

> **Note:** Be careful not to override the value for `dest` key.

## Local installation

The diagram below shows the result of a local installation.

![acs-localhost]({% link content-services/images/acs-localhost.png %})

To install Content Services (Enterprise) on your local machine, navigate to the folder where you extracted the ZIP, and run the playbook as the current user (the playbook will escalate privileges when required):

```bash
cd alfresco-ansible-deployment-<version>
ansible-playbook playbooks/acs.yml -i inventory_local.yml
```

Alternatively, to deploy other versions of Content Services use one of the following commands:

* **7.3:** `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.3.N-extra-vars.yml"`
* **7.2:** `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.2.N-extra-vars.yml"`
* **7.1:** `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.1.N-extra-vars.yml"`
* **7.0:** `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.0.N-extra-vars.yml"`

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** The playbook takes around 30 minutes to complete.

By default, the Content Services playbook will now also check Operating System compatibility. You can add the flag `-e skip_os_test=true` if you want to deploy on an unsupported Operating System distribution.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the block below:

```bash
PLAY RECAP *******************************************************************************************************
acc_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration etc., see [Useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.4/admin/securing-install.md %}).

## Remote installation

To install to other hosts (i.e. managed hosts) than the control node, an SSH connection is required. The control node must have network access to all the target hosts and permission to SSH into the machine.

> **Note:** The inventory file (`inventory_ssh.yml`) is used to specify the target IP addresses and the SSH connection details. You can specify one IP address for all the hosts to obtain a single-machine installation, or different IP addresses for a multi-machine installation.

The example snippet below demonstrates how to install the repository to a host with an IP address of `50.6.51.7` using an SSH key located at `/path/to/id_rsa`.

```yaml
repository:
  hosts:
    repository.acme.local:
      ansible_host: 50.6.51.7
      ansible_private_key_file: "/path/to/id_rsa"
```

### Single machine installation

The diagram below shows the result of a single machine installation.

![acs-single-machine]({% link content-services/images/acs-single-machine.png %})

Once you've prepared the target host and configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

To check that your inventory file is configured correctly, and the control node is able to connect to the target host, navigate to the folder where you extracted the ZIP to and run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To deploy different versions of Content Services use one of the following commands:

* **7.3:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.3.N-extra-vars.yml"`
* **7.2:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.2.N-extra-vars.yml"`
* **7.1:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.1.N-extra-vars.yml"`
* **7.0:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"`

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** Depending on the number of hosts in the target environment, and the network performances, the playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
acc_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration etc., see [Useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.4/admin/securing-install.md %}).

### Multi-machine installation

The diagram below shows the result of a multi-machine installation.

![acs-multi-machine]({% link content-services/images/acs-multi-machine.png %})

Once you've prepared the target hosts (ensuring the [relevant ports](#tcp-port-configuration) are accessible) and configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

To check that your inventory file is configured correctly, and that the control node is able to connect to the target hosts, run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To deploy different versions of Content Services use one of the following commands:

* **7.3:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.3.N-extra-vars.yml"`
* **7.2:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.2.N-extra-vars.yml"`
* **7.1:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.1.N-extra-vars.yml"`
* **7.0:** `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"`

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** The playbook takes around 30 minutes to complete.

Once the playbook is complete, Ansible displays a play recap to let you know that everything is done, similar to the following:

```bash
PLAY RECAP *******************************************************************************************************
acc_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
activemq_1                 : ok=24   changed=0    unreachable=0    failed=0    skipped=17   rescued=0    ignored=0
adw_1                      : ok=24   changed=6    unreachable=0    failed=0    skipped=6    rescued=0    ignored=0
database_1                 : ok=20   changed=0    unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
nginx_1                    : ok=21   changed=8    unreachable=0    failed=0    skipped=8    rescued=0    ignored=0
repository_1               : ok=92   changed=43   unreachable=0    failed=0    skipped=14   rescued=0    ignored=0
search_1                   : ok=34   changed=13   unreachable=0    failed=0    skipped=11   rescued=0    ignored=0
syncservice_1              : ok=39   changed=18   unreachable=0    failed=0    skipped=13   rescued=0    ignored=0
transformers_1             : ok=81   changed=10   unreachable=0    failed=0    skipped=44   rescued=0    ignored=0
```

For details about the webapp URLs, location of logs, configuration, and more, see [Useful information](#usefulinfo).

If you're deploying a production system, ensure that you review the additional information provided in [Securing your installation]({% link content-services/7.4/admin/securing-install.md %}).

### Additional command switches for ansible-playbook

There are other useful arguments you can use with the `ansible-playbook` command. Some are mentioned below, but take a look at [The ansible-playbook documentation](https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html){:target="_blank"} for a complete list of options.

* `-k`: Prompt for SSH password. Useful when no SSH keys have been deployed but needs to be the same on all hosts (prefer SSH whenever possible).
* `-K`: Prompt for sudo password. Useful when the user used to connect to the machine is not `root`.
* `-e`: Pass an extra variable or override an existing one.
* `-l`: Limit the play to a subset of hosts (either groups or individuals hosts or a mix of both).
* `-u user`: specify the username to use to connect to all targets (prefer adding the `ansible_ssh_user` to the inventory file in the right scope, e.g. under the `all` group)

## Content Services cluster

Due to load or high availability needs, you might want to deploy a cluster of several repository nodes. This can easily be achieved by:

* Giving the playbook the location of the shared storage used for the Content Services `contentstore` (See [Shared storage documentation](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/docs/shared-contentstore.md){:target="_blank"} for details).
* Specifying several hosts within the `repository` hosts group.

> **Warning:** As mentioned in the [Set up clustering]({% link content-services/7.4/admin/cluster.md %}#scenarioredundancycluster) documentation, "*All the servers in a cluster should have static IP addresses assigned to them*". Not meeting this prerequisite won't prevent the playbook from working, but the cluster will most likely stop working if the IP addresses for the servers ever changes.

For example:

```yaml
...
  repository:
    vars:
      cs_storage:
        type: nfs
        device: nas.infra.local:/exports/contentstore
        options: _netdev,noatime,nodiratime
    hosts:
      ecm1.infra.local:
      ecm2.infra.local:
      ingester.infra.local:
        cluster_keepoff: true
...
```

In some circumstances, you may want to have a repository node that's dedicated to a scheduled task (such as ingesting massive amount of documents). Depending on the nature of the task, and the requirements of your organization, it may be preferable to leave this node out of the cluster. To leave nodes out of the cluster set the `cluster_keepoff` variable to `true` in one of the `repository` group nodes. It will provision the node with the repository and share services but make sure it's not taking part in neither the share, nor the repository cluster realm.

A typical use case is to have a dedicated Solr tracking node. The playbook will then prefer to use that dedicated node, if it finds one, for Solr tracking and only use the other as a backup server (no load balancing).

## Useful information {#usefulinfo}

The following section contains further information about the Ansible installation approach.

### Check if startup has completed

Before accessing any of the webapps make sure that the deployment has started up properly. You can check this in the logs as follows:

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
* Control Center: `http://<control-node-public-ip>/control-center` (Enterprise Only)
* Sync Service: `http://<control-node-public-ip>/syncservice` (Enterprise Only)

If you did a [remote installation](#remote-installation), where the Ansible control node and Alfresco components are installed on different nodes, then use:

* Digital Workspace: `http://<nginx-host-ip>/workspace`
* Share: `http://<nginx-host-ip>/share`
* Repository: `http://<nginx-host-ip>/alfresco`
* API Explorer: `http://<nginx-host-ip>/api-explorer`
* Control Center: `http://<nginx-host-ip>/control-center` (Enterprise Only)
* Sync Service: `http://<nginx-host-ip>/syncservice` (Enterprise Only)

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
| `postgresql-<version>.service` | PostgreSQL DB Service (where `<version>` is 13 for Content Services 7.x and 14 for Content Services 7.3 or 7.4) |
| `nginx.service` | NGINX Service |
| `alfresco-content.service` | Content Service |
| `alfresco-search.service` | Alfresco Search Services |
| `alfresco-shared-fs.service` | Alfresco Shared File Store Controller Service |
| `alfresco-sync.service` | Alfresco Sync Service |
| `alfresco-tengine-aio.service` | Alfresco All-In-One (AIO) Transform Core Engine |
| `alfresco-transform-router.service` | Alfresco Transform Router Service |
| `elasticsearch-connector.service` | Alfresco Search Enterprise Service |
| `elasticsearch-connector-reindex.service` | Alfresco Search Enterprise job to force the reindexing of all the contents of the store |
| `elasticsearch.service` | ElasticSearch Service |

**Note:** Some configuration changes (for example postgres pg_hba and properties files) can trigger a service restart and a consequent application downtime. For this reason you may want to run the playbook only during a scheduled maintenance window.

### TCP port configuration

Several roles set up services that listen on TCP ports, and several roles wait for TCP ports to be listening before continuing to run (indicated by `Yes` in the "Required For Installation" column). The table below shows the communication paths and port numbers used:

| Target Host | Target Port | Source Hosts | Required For Installation |
| ----------- | ----------- | ------------ | ------------------------- |
| activemq | 61616 | `repository`, `syncservice`, `transformers`, `search enterprise` | Yes |
| database | 5432 | `repository`, `syncservice` | Yes |
| repository | 8080 | `nginx`, `search`, `syncservice`, `acc`, `adw` | Yes |
| search | 8983 | `repository` | No |
| transformers (aio t-engine) | 8090 | `repository` | No |
| syncservice | 9090 | `nginx` | No |
| adw | 80 | `nginx` | No |
| nginx | 80 | `<client-ips>` | No |
| nginx | 443 | `<client-ips>` | No |

> **Note:** When using the ACS Community, some of these ports do not need to be opened (e.g. transform router/sfs, acc, adw).

## Configure your installation

By default, without any configuration applied, the playbook installs a limited trial of the Enterprise version of Content Services 7.x that goes into read-only mode after 2 days. If you'd like to try Content Services for a longer period, request the 30-day [Download Trial](https://www.alfresco.com/platform/content-services-ecm/trial/download){:target="_blank"}.

This section describes how to configure your installation before running the playbook.

### License

If you have a valid license, place your `*.lic` file in the `configuration_files/licenses` folder before running the playbook.

> **Note:** You can also [upload a license]({% link content-services/7.4/admin/license.md %}) via the Admin Console once the system is running.

### Alfresco/Solr authentication

As of Content Services 7.2 and/or Search services 2.0.3, the repository <--> Solr communication requires authentication. The playbook will set up that authentication scheme using the new `secret` method. This methods need to be passed a shared secret. In order to do so use the variable below:

```yaml
reposearch_shared_secret: dummy
```

> **Note:** Do not use a secret called *dummy* as shown above, but use a stronger secret.

This secret should be placed either in the inventory file under the `all` group scope, or passed as an extra variable (it needs to be available to the localhost `hostvars` array of variables).

> **Warning:** Should you forget to provide that shared secret, the playbook will generate a random one. While that may sound convenient, keep in mind that doing so will break the idempotency of the playbook, and the shared secret will be updated every time you run the playbook.

### Mutual TLS authentication

As of Content Services 7.4 mTLS authentication is supported using Transformation service, see the [security section](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/docs/SECURITY.md){:target="_blank"} in the GitHub repo for more information or read our [mTLS page]({% link content-services/7.4/config/mtls.md %}).

### Secrets management

This playbook expects that security-relevant secrets are configured within the
`vars/secrets.yml` file.

It is strongly recommended to enable [Ansible
Vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html){:target="_blank"} encryption
or use [third-party plugins](#third-party-lookup-plugins) to avoid keeping
secrets in plaintext on the control node file-system.

We provide a `secrets-init.yml` playbook to automatically generate secure
secrets and encrypt them with Ansible Vault.

#### Enable Ansible Vault support

To start using **Ansible Vault** integration, a password needs to be provided to
Ansible to make encryption/decryption working during the play.

There are different ways to provide that password Ansible Vault, from manually
via user input on each ansible-playbook run using the `--ask-vault-pass` flag
(example below), to more advanced scenarios.

```bash
pipenv run ansible-playbook --ask-vault-pass playbooks/acs.yml
```

While we recommend to refer to the official Ansible documentation to properly configure
[Ansible vault](https://docs.ansible.com/ansible/latest/user_guide/vault.html#managing-vault-passwords){:target="_blank"},
below is a basic configuration that will help you in quickly installing Alfresco
without to having to input the Vault password every time.

Configure a password in a file (e.g. `~/.vault_pass.txt`), optionally
auto generating it with:

```bash
openssl rand -base64 21 > ~/.vault_pass.txt
```

Set `ANSIBLE_VAULT_PASSWORD_FILE` to that file location so that can
automatically picked-up when running Ansible:

```bash
export ANSIBLE_VAULT_PASSWORD_FILE=~/.vault_pass.txt
```

Now you are ready to start using Ansible Vault.

#### Populate secrets with Ansible Vault

Ansible Vault provides two alternative ways to protect secrets:

* [Encrypted variables](https://docs.ansible.com/ansible/latest/user_guide/vault.html#encrypting-individual-variables-with-ansible-vault){:target="_blank"}
* [Encrypted files](https://docs.ansible.com/ansible/latest/user_guide/vault.html#encrypting-files-with-ansible-vault){:target="_blank"}

In the previous links you can read both advantages and disadvantages of the two approaches.

> If you are upgrading from previous versions of the playbook, you may want to
> read [upgrade notes](playbook-upgrade.md#secrets-management).

##### Encrypted variables

With Encrypted variables you can use the `secrets-init.yml` playbook to
handle the first-time generation of secrets and also to automatically add new
secrets that may be introduced in future versions of the playbook.

To automatically setup/update secrets, run:

```bash
pipenv run ansible-playbook -e vault_init=encrypted_variables playbooks/secrets-init.yml
```

##### Encrypted files

With Encrypted files you can use the `secrets-init.yml` playbook to handle
the first-time generation of secrets but for updates you have to provide them as
described below. However you can provide your own passwords too.

```bash
pipenv run ansible-playbook -e vault_init=plaintext playbooks/secrets-init.yml
```

and then replace the autogenerated passwords with your own.

To enable file encryption and automatically autogenerate any missing secrets,
run:

```bash
pipenv run ansible-playbook  -e vault_init=encrypted_file playbooks/secrets-init.yml
```

After the first run, you can access the encrypted file vault with:

```bash
pipenv run ansible-vault view vars/secrets.yml
```

or to add/edit secrets with:

```bash
pipenv run ansible-vault edit vars/secrets.yml
```

Please refer to the [official Ansible documentation](https://docs.ansible.com/ansible/latest/user_guide/vault.html){:target="_blank"} to learn how to interact with existing encrypted variables or files.

#### Third-party lookup plugins

Variables defined in `vars/secrets.yml` can also reference remote values using
third-parties lookup plugins instead of using Ansible Vault.

To generate a stub secrets file, run:

```bash
pipenv run ansible-playbook -e vault_init=plugin playbooks/secrets-init.yml
```

And then edit `vars/secrets.yml` to fill all the required arguments for the plugin you want to use as described in the plugin documentation pages:

* [HashiCorp Vault](https://docs.ansible.com/ansible/latest/collections/community/hashi_vault/hashi_vault_lookup.html){:target="_blank"}
* [AWS Secrets](https://docs.ansible.com/ansible/latest/collections/amazon/aws/aws_secret_lookup.html){:target="_blank"}
* [1Password](https://docs.ansible.com/ansible/latest/collections/community/general/onepassword_lookup.html){:target="_blank"}
* [CyberArk](https://docs.ansible.com/ansible/latest/collections/community/general/cyberarkpassword_lookup.html){:target="_blank"}

### Alfresco global properties

You can provide your [repository configuration](https://github.com/Alfresco/acs-deployment/blob/master/docs/properties-reference.md){:target="_blank"} by editing the `configuration_files/alfresco-global.properties` file.

The properties defined in this file are appended to the generated `alfresco-global.properties` located in `/etc/opt/alfresco/content-services/classpath`.

### Enable SSL

If you have a FQDN and a certificate you want to use, place the certificate and the key in the `configuration_files/ssl_certificates` folder before running the playbook. Also, replace the `fqdn_alfresco: "your_domain.com"` with your own domain in `group_vars/all.yml` along with setting `use_ssl: true`.

> **Note:** The certificate and the key should be named the same as the domain, for example, `your_domain.com.key` and `your_domain.com.crt`

### Apply your own modules (AMP)

Several AMP files are downloaded and applied during playbook execution, these are defined in a variable which is either in the `group_vars/all.yml` file, or an `-extra-vars.yml` file (in case of an older Content Services version).
For that reason there is a common way to override this variable. If you want to change the list of AMPs you'll need to directly change the variable from the file where it is defined.

1. Open `group_vars/all.yml` or the `x.y.N-extra-vars.yml` file and amend `amp_downloads` variable definition.
2. In the `group_vars/all.yml` file, add any additional AMPs you want to apply to the `amp_downloads` variable as well, paying close attention to the `dest` property. If it's a repository AMP, use the `amps_repo` folder, if it's a Share AMP, use the `amps_share` folder.
3. Save the file and run the playbook as normal.

> **Note:** This mechanism will be improved in a future release.

### JVM options

Each Java based service deployed by the playbook is configured with some default settings, including memory settings. The defaults are defined in the roles' specific default variables (for an example, see the default settings for the [repository](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/roles/repository/defaults/main.yml){:target="_blank"}) so they can be overridden in the inventory_file using the right scope. For example, to override the `JAVA_OPTS` environment variable for the All-In-One Transform Engine place the following in the inventory file:

```yaml
---
all:
  children:
    transformers:
      tengine_environment:
        JAVA_OPTS:
          - -Xms512m
          - -Xmx1g
          - $JAVA_OPTS
```

All the `_environment` variables defined for the roles are dictionaries, and all their keys are added to the relevant components' start script. This allows you to define any number of environment variables. Key values are a list of strings to allow for easier manipulation. When overriding the default environment variables you should make sure you're not retiring important ones, so always take a look at the `https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/ROLE_NAME/defaults/main.yml` file first.

### External databases

By default, the playbook installs and configures a Postgres database server for you. That server is a basic PostgreSQL setup with no specific optimization or features. For example, it doesn't provide any high availability mechanism.

> This server also requires to NOT have a sudo configuration with `requirestty` set.

If you'd prefer to use an external database server, you can override the `repo_db_url` variable as described in the earlier section.

An example custom database URL is shown below:

```yaml
repo_db_url: jdbc:mysql://54.164.117.56:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
repo_db_driver: com.mysql.jdbc.Driver
```

Along with the URL, the database driver binaries need to be provided for one or both services in the `configuration_files/db_connector_repo` and/or `configuration_files/db_connector_sync` folders.

The default database username (`repo_db_username` and/or `sync_db_username`) and password (`repo_db_password` and/or `sync_db_password`) in the configuration file `group_vars/all.yml` can also be overridden with your custom values.

See [Configuring databases]({% link content-services/7.4/config/databases.md %}) for more details.

### External ActiveMQ

This playbook provides support for a single host declared inside the `activemq` group that will deploy and configure an ActiveMQ instance that is suitable for testing/evaluation only (no failover and default credentials).
It's strongly suggested that you provide your own ActiveMQ instance by defining in the inventory file, exactly one host as a member of the `external_activemq` group (nested inside the `external` group) as follows:

```yaml
all:
  children:
    external_activemq:
      hosts:
        whatever.mq.eu-west-1.amazonaws.com:
        activemq_username: alfresco
        activemq_port: 61617
        activemq_transport: tcp # or ssl
    external:
      children:
        external_activemq:
```

Every hosts under the `external` group is not directly managed by the Content Services playbook and is required in the inventory just for the sake of architecture description.

### External ElasticSearch

In case you want to provide your own ElasticSearch cluster (or use AWS
OpenSearch, as an example) you can define in the inventory file exactly one host as a member of the `external_elasticsearch` group (nested inside the `external` group) as follows:

```yaml
all:
  children:
    external_elasticsearch:
      hosts:
        whatever.eu-west-1.es.amazonaws.com:
          elasticsearch_username: admin
          elasticsearch_port: 9200
          elasticsearch_protocol: http # or https with port 443
    external:
      children:
        external_elasticsearch:
```

Every hosts under the `external` group is not directly managed by the Content Services playbook and is required in the inventory just for the sake of architecture description.

### Custom keystore

The playbook installs a default keystore to ease the installation process, however, we recommend you [generate your own keystore]({% link search-services/latest/config/keys.md %}).

There are three steps required to use a custom keystore:

1. Place your generated keystore file in the `configuration_files/keystores` folder. These are copied to `/var/opt/alfresco/content-services/keystore`.
2. Override the `use_custom_keystores` variable defined in your inventory as a `repository` group variable.
3. Override the `acs_environment` variable and define your custom `JAVA_TOOL_OPTIONS` configuration.
4. Add `repo_custom_keystore_password` and `repo_custom_keystore_metadata_password` in `vars/secrets.yml`

An example custom `extra-vars` file is shown below:

```yaml
repository:
  vars:
    use_custom_keystores: true
    acs_environment:
      JAVA_OPTS:
        - -Xms512m
        - -Xmx3g
        - -XX:+DisableExplicitGC
        - -Djava.awt.headless=true
        - -XX:ReservedCodeCacheSize=128m
        - $JAVA_OPTS"
      JAVA_TOOL_OPTIONS:
        - -Dencryption.keystore.type=pkcs12
        - -Dencryption.cipherAlgorithm=AES/CBC/PKCS5Padding
        - -Dencryption.keyAlgorithm=AES
        - -Dencryption.keystore.location=/var/opt/alfresco/content-services/keystore/<your-keystore-file>
        - -Dmetadata-keystore.metadata.algorithm=AES"
```

## Troubleshooting

The following section includes troubleshooting information.

### Search Enterprise Reindexing

You can trigger the reindexing of existing content in Search Enterprise using a dedicated playbook:

```bash
pipenv run ansible-playbook playbooks/search-enterprise-reindex.yml -i <inventory_file>.yml
```

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
https://artifacts.alfresco.com/nexus/service/local/repositories/enterprise-releases/content/org/alfresco/alfresco-content-services-distribution/7.0.0/alfresco-content-services-distribution-7.1.0.zip.sha1
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

What needs to be removed from a system depends on your inventory configuration. The steps below presume:

1. A localhost or single machine installation, meaning all roles were run on the same machine.
2. Deployment of ansible artifacts by using `platform-cleanup.yml` playbook and `platform-uninstall.yml` playbook respectively.
3. Cleanup and uninstall of Content Services.

Below are the services, packages & folders we are removing when uninstalling.

1. Stop and remove the following `systemd` services:

   * alfresco-transform-router.service
   * alfresco-shared-fs.service
   * alfresco-tengine-aio.service
   * alfresco-sync.service
   * alfresco-search.service
   * alfresco-content.service
   * nginx.service
   * activemq.service
   * postgres-`version`.service (where `version` is 13 for Content Services 7.x and 14 for Content Services 7.3 or 7.4)

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

In order to uninstall this from the hosts run the following command:

```bash
pipenv run ansible-playbook playbooks/platform-uninstall.yml -i inventory_ssh.yml
```

### Cleanup

This playbook will remove the temporary artifacts which are stored on the hosts. In order to cleanup the system post deployment run the following command:

```bash
pipenv run ansible-playbook playbooks/platform-cleanup.yml -i <inventory_file>.yml
```

> **Note:** This playbook can break the idempotency, for example, downloaded artifacts need to removed by running the cleanup playbook.

### Additional troubleshooting

For the latest troubleshooting information, refer to the [project documentation](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/docs/deployment-guide.md#troubleshooting){:target="_blank"}.
