# Multi-node clustered setup

You can run the application on multiple servers, for performance, resilience or for failover reasons. The application architecture is designed to be stateless. This means that any server can handle any request from any user. When using multiple servers, it is enough to have a traditional load balancer \(or proxy\) in front of the servers running the Alfresco Process Services application. Scaling out is done in a "horizontal" way, by adding more servers behind the load balancer.

![images/multi-node-setup.png](../images/multi-node-setup.png)

Note that each of the servers will connect to the same relational database. While scaling out by adding more servers, make sure that the database can handle the additional load.

**Parent topic:**[Administering](../topics/adminGuide.md)

