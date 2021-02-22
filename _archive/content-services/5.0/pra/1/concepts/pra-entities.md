---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: api
option: api
---

# What is an entity?

The generic term used in the API for any object in an Alfresco repository is entity. An entity is of a specific entity type, and has a unique entity id.

The Alfresco REST API operates on the following entity types:

-   **sites**

    An Alfresco site is a project area where you can share content and collaborate with other site members.

-   **containers**

    A container is a folder or space in a site.

-   **members**

    Members are the people who collaborate on a site.

-   **people**

    People are the users of Alfresco. A person entity describes the user as they are known to Alfresco.

-   **favoriteSites**

    The sites that a person has marked as favorite in Alfresco \(Deprecated\). Use the favorites entity and methods.

-   **preferences**

    A person's preferences in Alfresco.

-   **networks**

    A network is the group of users and sites that belong to an organization. You can find out specific network information or how it relates to a person.

-   **activities**

    Activities describe any past activity in a site, for example creating an item of content, commenting on a node, liking an item of content.

-   **nodes**

    A node is an overall term for an item of content or a folder.

-   **comments**

    A person can comment on folders and individual items to give other users information or notes specific to that content.

-   **tags**

    Any item of Alfresco content can be tagged.

-   **ratings**

    A person can rate an item of content by liking it. They can also remove their like of an item of content.

-   **favorites**

    A favorite describes an Alfresco entity that a person has marked as a favorite.

-   **site membership requests**

    A site membership request describes a request for a person to join a site in Alfresco.

-   **deployments**

    A deployment resource represents one file inside a deployment.

-   **process definitions**

    A process definition is a description of an execution flow in terms of activities. New processes are created and started for a process definition.

-   **processes**

    A process describes a running instance of a process definition.

-   **tasks**

    A task describes one task for a human user.


A logical group of entities is termed a collection.

**Parent topic:**[Getting started](../../../pra/1/concepts/pra-getting-started.md)

