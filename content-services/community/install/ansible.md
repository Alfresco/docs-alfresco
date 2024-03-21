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

## Deployment

For the Ansible deployment, refer to the following page which provides the most up-to-date reference with current OS, Ansible version, and Python runtime/libraries:
[Ansible Deployment Guide](https://alfresco.github.io/alfresco-ansible-deployment/deployment-guide.html){:target="_blank"}