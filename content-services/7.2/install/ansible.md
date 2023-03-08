---
title: Install with Ansible
---

This page describes how to install Content Services using an [Ansible](https://www.ansible.com){:target="_blank"} playbook. Ansible is an open-source software provisioning, configuration management, and application installation tool that enables infrastructure as code. Alfresco provides an Ansible playbook capable of installing Content Services (Enterprise Edition) version 7.x or 6.2.N.

Before continuing you need to be familiar with some [Ansible concepts](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html){:target="_blank"}: and the notion of [idempotency](https://docs.ansible.com/ansible/latest/reference_appendices/glossary.html#term-Idempotency){:target="_blank"}:.

## The control node
The machine the playbook is run from is known as the control node. Ansible has some prerequisites for this control node. The main one is that it needs to run on a POSIX compliant system ; meaning Linux or others Unix (Including MacOSX), but not windows.
On windows please see the provided `Vagrantfile` in order to kick start a local Linux VM where to deploy the playbook.

More info on [control node](https://docs.ansible.com/ansible/latest/user_guide/basic_concepts.html#control-node){:target="_blank"}

## Managed nodes
The managed nodes are the machines/hosts where the Alfresco platform and all its related components will be prepared, installed, 
and configured. In a minimal installation, such as a dev environment, the control node and the managed node can be the 
same machine, though usually deployment is done from the control node to many managed nodes.

## Understanding the inventory file
An [inventory file](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html){:target="_blank"} is used 
to describe the architecture or environment where you want to deploy the Content Services platform. Each managed 
machine/host taking part in the environment needs to be described with at least:

* a `host name`: a name, which in most cases can be anything (It is though a good practice to use a name or 
  an address that all managed machines can resolve and reach from their local network).

And optionally:

* an `ansible_user` variable: if the host requires a unique and specific user to login to.
* an `ansible_host` variable; if the host needs to be reached through an address that's different from the 
  `inventory_hostname` (e.g. machine is only reachable through a bastion host or some sort of NAT).
* an `ansible_private_key_file` in case your hosts needs a specific SSH key in order to login to it.

A Content Services inventory file has the following groups a host can belong to:

* `repository`: the list of one or more hosts that will get a Content Services repository deployed.
* `database`: a host on which the playbook will deploy the Content Services database. 
* `activemq`: the host on which the playbook will deploy the message queue component required by Content Services.
* `external_activemq`: an alternative group to `activemq` in case you don't want to deploy ActiveMQ using our basic 
  activemq role but instead use an ActiveMQ instance of yours which matched your hosting standards.
* `search`: a single host on which to deploy Alfresco Search Services.
* `nginx`: a single host on which the playbook will deploy an NGINX reverse proxy configured for the numerous http 
  based services, such as Alfresco Share and Alfresco Digital Workspace.
* `adw`: a single host where you want the Alfresco Digital Workspace UI to be installed.
* `transformers`: a single host where the playbook will deploy the Alfresco Transformation Service components.
* `syncservice`: a single host where the Alfresco Sync Service will be deployed.

>**Note:** Ansible also ships with a default group called `all`, which all hosts always belongs to.

Inventory files provided as examples in this playbook are all written in YAML. Groups are always children items of the `all` 
group itself or of other groups. Hosts are mentioned after a `hosts` key under any group (including the `all` group).
So a generic example would be:

```yaml
---
all:
  children:
    repository:
      hosts:
        repo1.example.com:
```

An inventory file can also be used to set variables within a specific scope. Variables can be specified at the hosts, 
groups or all levels, thus affecting the scope in which that variable is available. So if a variable, such as `ansible_user`, 
is valid for all hosts, it should be set once under the `all` group.

See [Ansible variable precedence documentation](https://docs.ansible.com/ansible/latest/user_guide/playbooks_variables.html#understanding-variable-precedence){:target="_blank"}
to better understand how precedence works.

In most cases we recommend that you use your inventory to add the configuration variables that you need, tweaking the 
playbook to your needs.

We provide example inventories:

* **Local** where all the components are installed on the control node machine:

![deployment-type-local]({% link content-services/images/deployment-type-local.png %})

* **Remote** (also known as `ssh`) where components are installed on one or more remote `hosts`. These hosts can be bare 
  metal machines, virtual machines, or instances running on a public cloud:

![deployment-type-ssh]({% link content-services/images/deployment-type-ssh.png %})

* **HA** (also known as `ha` - high availability). It's very similar to the `ssh` one but also provides a skeleton for 
  repository clustering.

## Prerequisites
If you're using the Enterprise edition of Content Services, then you need credentials to access the necessary artifacts from 
[Nexus](https://artifacts.alfresco.com/nexus/){:target="_blank"}. Customers can request these through 
[Hyland Community](https://community.hyland.com/){:target="_blank"}.

### Control Node
In addition to the requirements mentioned earlier for control nodes in general, the playbook requires Ansible 2.12+, 
which in turn requires python 3.8+.

### Target O/S
While Content Services supports a wide range of OS, the playbook is only supported for a subset of them. The table below 
gives detailed information on the status of supported OS (Additional target environments will be added in future releases):

| OS Flavor / version | 7.2 Enterprise| 7.1 Enterprise | 7.0 Enterprise | 6.2.2 Enterprise | Community |
|-|-|-|-|-|-|
| Amazon Linux (v2) | - | - | - | - | - |
| Amazon Linux (v1) | - | - | - | - | - |
| RHEL 8.4 | [x] |[x] |[x] | - | [x] |
| RHEL 8.2 | [x] |[x] |[x] | - | [x] |
| RHEL 7.7 | - |[x] |[x] | - | [x] |
| RHEL 7.6 | - |[x] | [x] | [x] | [x] |
| CentOS 8 x64 | [x] |[x] |[x] | - | [x] |
| CentOS 7 x64 | [x] |[x] |[x] | [x] | [x] |
| Ubuntu 20.04 | [x] |[x] |[x] | - | [x] |
| Ubuntu 18.04 | - |[x] |[x] | [x] | [x] |
| SUSE 15.0 | - | - | - | - | - |
| SUSE 12.0 SP1 x64 | - | - | - | - | - |

>**Note:** Ansible version 2.12.x is used for testing this playbook.

### Component versions
The table below shows the version of the components deployed by the playbook for Content Services 7.x and 6.2.N.

| Component | 7.2 Enterprise | 7.1 Enterprise | 7.0.N Enterprise | 6.2.N Enterprise | Community |
|-|-|-|-|-|-|
| OpenJDK | 11.0.13 | 11.0.13 | 11.0.13 | 11.0.13 | 11.0.13 |
| Apache Tomcat | 9.0.59 | 9.0.59 | 9.0.59 | 8.5.72 | 9.0.59 |
| PostgreSQL | 13.x | 13.x | 13.x | 11.x | 13.x |
| Apache ActiveMQ | 5.16.4 | 5.16.4 | 5.16.4 | 5.15.14 | 5.16.4 |
| Repository | 7.2.0 | 7.1.1 | 7.0.1.4 | 6.2.2 | 7.1.1.2 |
| Share | 7.2.0 | 7.1.1 | 7.0.1.4 | 6.2.2 | 7.1.1.2 |
| Search Services | 2.0.3 | 2.0.2 | 2.0.1.1 | 1.4.3 | 2.0.3 |
| All-In-One Transformation Engine | 2.5.7 | 2.5.6 | 2.3.10 | 2.5.6 | 2.5.7 |
| AOS | 1.4.1 | 1.4.0 |  1.4.0 | 1.3.1 |  |
| GoogleDocs | 3.2.1 | 3.2.1 | 3.2.1 | 3.2.0 |  |
| Digital Workspace | 2.7.0 | 2.6.0 | 2.1.0 | 2.6.0 | N/A |
| Transform Router | 1.5.2 | 1.5.1 |1.3.2 | 1.5.1 | N/A |
| Shared File Store | 0.16.1 | 0.16.1 | 0.13.0 | 0.16.1 | N/A |
| Sync Service | 3.6.0 | 3.5.0 | 3.4.0 | 3.3.3.1 | N/A |

## Set up Ansible
Not all distributions of Linux may match the version requirements for Ansible and its dependencies. Below we describe 
how to configure a control node  with one of the many ways to set a python virtual environment. With python `virtualenvs` 
you can install the exact same versions of Ansible we use when testing without impacting your system installation of python. 
Doing so you're ensuring best chances of success.

1. Download the Ansible playbook [zip file](https://nexus.alfresco.com/nexus/service/local/repositories/releases/content/org/alfresco/alfresco-ansible-deployment/2.0.0/alfresco-ansible-deployment-2.0.0.zip)

2. If you're not working directly on the control node, transfer the ZIP file to the control node together with the 
   SSH private key required to login to the target machines, and SSH into the machine

    ```bash
    scp  alfresco-ansible-deployment-<version>.zip user@controlnode:
    scp  ~/.ssh/ansible_rsa user@controlnode:.ssh
    ssh  user@controlnode
    ```

    >**Note:** You may want to generate an SSH key pair locally and use it later for deployment. Whether you use a locally
    >generated key, or copy over a key to the control node, it is your responsibility to deploy it to the target machines 
    >so Ansible can use it. Using SSH keys is recommended but not mandatory. If you instead use password, make sure to add 
    >the `-k`switch to the ansible command, so it prompts you for a password.

2. Check prerequisites and install required tools:

    ```bash
    python --version # must be at least 3.8 in order to use Ansible 2.12
    sudo apt install virtualenvwrapper unzip # Use your distro's package manager instead of apt if it's not Debian based
    ```

3. Install Ansible and required dependencies in python `virtualenv`:

    ```bash
    unzip alfresco-ansible-deployment-<version>.zip
    cd alfresco-ansible-deployment
    mkvirtualenv alfresco-ansible
    pip install -r requirements.txt
    ansible-galaxy install -r requirements.yml
    ```

4. If you intend to deploy an Enterprise system, create environment variables to hold your Nexus credentials as shown 
   below (replacing the values appropriately):

   ```bash
   export NEXUS_USERNAME="<your-username>"
   export NEXUS_PASSWORD="<your-password>"
   ```

   > **Note:** If your password contains `!`, then you need to escape it with `\`, as it's a special character to 
   > `bash`, and it's used to refer to previous commands. Same escape method apply for other specials characters

Without any additional configuration applied, the playbook installs the default Content Services components. See the 
[configuration](#configure-your-installation) section below to adjust some of the configurable installation options.

To install everything on the control node, follow the steps in the [Local installation](#local-installation) section. 
To install to one or more other machines, follow the steps in the [Remote installation](#remote-installation) section.

## Local installation
The diagram below shows the result of a local installation.

![acs-localhost]({% link content-services/images/acs-localhost.png %})

To install Content Services 7.2 (Enterprise) on your local machine, navigate to the folder where you extracted the ZIP, 
and run the playbook as the current user (the playbook will escalate privileges when required):

```bash
cd alfresco-ansible-deployment-<version>
ansible-playbook playbooks/acs.yml -i inventory_local.yml
```

Alternatively, to deploy other versions of Content Services use one of the following commands:

* **7.1**: `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.1.N-extra-vars.yml"`
* **7.0**: `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@7.0.N-extra-vars.yml"`
* **6.2**: `ansible-playbook playbooks/acs.yml -i inventory_local.yml -e "@6.2.N-extra-vars.yml"`

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

If you're deploying a production system, ensure that you review the additional information provided in 
[Securing your installation]({% link content-services/7.2/admin/securing-install.md %}).

## Remote installation

To install to other hosts (i.e. managed hosts) than the control node, an SSH connection is required. The control node 
must have network access to all the target hosts and permission to SSH into the machine.

> **Note:** The inventory file (`inventory_ssh.yml`) is used to specify the target IP addresses and the SSH connection 
> details. You can specify one IP address for all the hosts to obtain a single-machine installation, or different IP 
> addresses for a multi-machine installation.

The example snippet below demonstrates how to install the repository to a host with an IP address of `50.6.51.7` using 
an SSH key located at `/path/to/id_rsa`.

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

To check that your inventory file is configured correctly, and the control node is able to connect to the target host, 
navigate to the folder where you extracted the ZIP to and run:

```bash
ansible all -m ping -i inventory_ssh.yml
```
To deploy different versions of Content Services use one of the following commands:

* **7.2**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml`
* **7.1**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.1.N-extra-vars.yml"`
* **7.0**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"`
* **6.2**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"`

If you see an error message during installation, then check for [possible causes](#errormsg).

> **Note:** Depending on the number of hosts in the target environment, and the network performances, the playbook 
> takes around 30 minutes to complete.

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

If you're deploying a production system, ensure that you review the additional information provided in 
[Securing your installation]({% link content-services/7.2/admin/securing-install.md %}).

### Multi-machine installation

The diagram below shows the result of a multi-machine installation.

![acs-multi-machine]({% link content-services/images/acs-multi-machine.png %})

Once you've prepared the target hosts (ensuring the [relevant ports](#tcp-port-configuration) are accessible) and 
configured the `inventory_ssh.yaml` file as described above, you're ready to run the playbook.

To check that your inventory file is configured correctly, and that the control node is able to connect to the 
target hosts, run:

```bash
ansible all -m ping -i inventory_ssh.yml
```

To deploy different versions of Content Services use one of the following commands:

* **7.2**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml`
* **7.1**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.1.N-extra-vars.yml"`
* **7.0**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@7.0.N-extra-vars.yml"`
* **6.2**: `ansible-playbook playbooks/acs.yml -i inventory_ssh.yml -e "@6.2.N-extra-vars.yml"`

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

If you're deploying a production system, ensure that you review the additional information provided in 
[Securing your installation]({% link content-services/7.2/admin/securing-install.md %}).

### Additional command switches for ansible-playbook
There are other useful arguments you can use with the `ansible-playbook` command. Some are mentioned bellow, but take a 
look at [The ansible-playbook documentation](https://docs.ansible.com/ansible/latest/cli/ansible-playbook.html){:target="_blank"} 
for a complete list of options.

* `-k`: Prompt for SSH password. Useful when no SSH keys have been deployed but needs to be the same on all hosts (prefer SSH whenever possible).
* `-K`: Prompt for sudo password. Useful when the user used to connect to the machine is not `root`.
* `-e`: Pass an extra variable or override an existing one.
* `-l`: Limit the play to a subset of hosts (either groups or individuals hosts or a mix of both).
* `-u user`: specify the username to use to connect to all targets (prefer adding the `ànsible_ssh_user` to the inventory 
  file in the right scope, e.g. under the `all`group)

## Content Services cluster
Due to load or high availability needs, you might want to deploy a cluster of several repository nodes. This can easily 
be achieved by:

* Giving the playbook the location of the shared storage used for the Content Services `contentstore` (See 
  [Shared storage documentation](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/docs/shared-contentstore.md){:target="_blank"} 
  for details).
* Specifying several hosts within the `repository` hosts group.

> **Warning**: as mentioned in the [Alfresco official documentation](https://docs.alfresco.com/content-services/7.2/admin/cluster/#scenarioredundancycluster), 
> "All the servers in a cluster should have static IP addresses assigned to them".
> Not meeting this pre-requisite won't prevent the playbook from working, but the cluster will most likely stop 
> working if the IP addresses for the servers ever changes.

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

In some circumstances, you may want to have a repository node that's dedicated to a scheduled task (such as ingesting massive 
amount of documents). Depending on the nature of the task, and the requirements of your organisation, it may be preferable 
to leave this node out of the cluster. To leave nodes out of the cluster set the `cluster_keepoff` variable to `true` in 
one of the `repository` group nodes. It will provision the node with the repository and share services but make sure it's 
not taking part in neither the share, nor the repository cluster realm.

>A typical use case is to have a dedicated Solr tracking node. The playbook will then prefer to use that dedicated node 
>, if it finds one, for solr tracking and only use the other as a backup server (no load balancing).

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

> **Note:** You can also [upload a license]({% link content-services/7.2/admin/license.md %}) via the Admin Console once the system is running.

### Alfresco/Solr authentication

As of Content Services 7.2 and/or Search services 2.0.3, the repository <--> solr communication requires authentication. 
The playbook will set up that authentication scheme using the new `secret` method. This methods need to be passed a 
shared secret. In order to do so use the variable below:

```yaml
reposearch_shared_secret: dummy
```

>**Note**: Of course do not use a secret called *dummy* as shown above, but use a stronger secret.

This secret should be placed either in the inventory file under the `all` group scope, or passed as an extra variable 
(it needs to be available to the localhost `hostvars` array of variables).

>**Warning**: Should you forget to provide that shared secret, the playbook will generate a random one. While that may 
> sound convenient, keep in mind that doing so will break the idempotency of the playbook, and the shared secret will be 
> updated everytime you run the playbook.

### Alfresco global properties

You can provide your [repository configuration](https://github.com/Alfresco/acs-deployment/blob/master/docs/properties-reference.md){:target="_blank"} 
by editing the `configuration_files/alfresco-global.properties` file.

The properties defined in this file are appended to the generated `alfresco-global.properties` located in 
`/etc/opt/alfresco/content-services/classpath`.

### Apply your own modules (AMP)

Several AMP files are downloaded and applied during playbook execution, these are defined in a variable which is either 
in the `group_vars/all.yml` file, or an `-extra-vars.yml` file (in case of an older Content Services version).
For that reason there is a common way to override this variable. If you want to change the list of AMPs you'll need to 
directly change the variable from the file where it is defined.

1. Open `group_vars/all.yml` or the `x.y.N-extra-vars.yml` file  and amend `amp_downloads` variable definition
2. In the `group_vars/all.yml` file, add any additional AMPs you want to apply to the `amp_downloads` variable as well, 
   paying close attention to the `dest` property. If it's a repository AMP, use the `amps_repo` folder, if it's a Share AMP, 
   use the `amps_share` folder.    
3. Save the file and run the playbook as normal.

>**Note:** This mechanism will be improved in a future release.

### JVM options

Each Java based service deployed by the playbook is configured with some default settings, including memory settings.
The defaults are defined in the roles' specific default variables (for an example, see the default settings for the 
[repository](https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/roles/repository/defaults/main.yml){:target="_blank"})
so they can be overridden in the inventory_file using the right scope.
For example, to override the `JAVA_OPTS` environment variable for the All-In-One Transform Engine place the following 
in the inventory file:

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

All the `_environment` variables defined for the roles are dictionaries, and all their keys are added to the relevant 
components start script. This allows you to define any number of environment variables. Key values are a list of 
strings to allow for easier manipulation. When overriding the default environment variables you should make sure you're not retiring 
important ones, so always take a look at the `https://github.com/Alfresco/alfresco-ansible-deployment/blob/master/ROLE_NAME/defauls/main.yml` 
file first.

### External databases

By default, the playbook installs and configures a Postgres database server for you. If you'd prefer to use an external 
database server, you can override the `repo_db_url` variable as described in the earlier section.

An example custom database URL is shown below:

```yaml
repo_db_url: jdbc:mysql://54.164.117.56:3306/alfresco?useUnicode=yes&characterEncoding=UTF-8
repo_db_driver: com.mysql.jdbc.Driver
```

Along with the URL, the database driver binaries need to be provided for one or both services in the 
`configuration_files/db_connector_repo` and/or `configuration_files/db_connector_sync` folders.

The default database username (`repo_db_username` and/or `sync_db_username`) and password (`repo_db_password` and/or 
`sync_db_password`) in the configuration file `group_vars/all.yml` can also be overridden with your custom values.

See [Configuring databases]({% link content-services/7.2/config/databases.md %}) for more details.

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
        activemq_password: alfresco
        activemq_port: 61617
    external:
      children:
        external_activemq:
```

Every hosts under the `external` group is not directly managed by the acs playbook and is required in the inventory just for the sake of architecture description.

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
