# General Settings

The following properties are applicable to both embedded and client setup.

|Property

|Description

|Default

|
|elastic-search.cluster.name

|The name of the Elasticsearch cluster to connect to

|activiti-elastic-search-cluster

|
|elastic-search.node.name

|The name of the specific node of this server. The client node will have this name plus the suffix *-client*. In the embedded setup there will also be a data node with a *-data* suffix.

|activiti

|
|elastic-search.default.index.name

|The name of the index in which the data will be stored. Only change this if there is a name clash for some reason in your Elasticsearch installation

|activiti

|
|elastic-search.tenant.index.prefix

|When running Alfresco Process Services with multi-tenancy, each tenant has its own index alias. Change this value to change the prefix applied to the alias.

|activiti\_tenant

|
|elastic-search.enable.http

|Enables the HTTP REST API of Elasticsearch. It is advised not to set this to true, unless traffic to it is strictly controlled by firewall rules.

|false

|
|elastic-search.enable.http.cors

|Enables \(when *elastic-search.enable.http* is *true*\) cross-origin resource sharing, i.e. whether a browser on another origin can do requests to Elasticsearch.

|false

|

Elasticsearch nodes \(both client and data Elasticsearch nodes: therefore, this applies for both embedded and client setups\) need to find each other to work in a clustered setup. This can be configured using multicast or unicast:

To change the type of discovery:

|Property

|Description

|Default

|
|elastic-search.discovery.type

|The way nodes find each other: *multicast* or *unicast*.

|multicast

|

When using *multicast*, the following properties can be set:

|Property

|Description

|Default

|
|elastic-search.discovery.multicast.group

|The multicast group address to use.

|224.2.2.4

|
|elastic-search.discovery.multicast.port

|The multicast port to use.

|54328

|
|elastic-search.discovery.multicast.ttl

|The time-to-live of the multicast message.

|3

|
|elastic-search.discovery.multicast.address

|The address to bind to.

|All available network interfaces \(0.0.0.0\)

|

When using unicast, only one property needs to be set:

|Property

|Description

|Default

|
|elastic-search.discovery.hosts

|The way nodes find each other: *multicast* or *unicast*.

|Either an array setting or a comma delimited setting. Each value is either in the form of *host:port*, or in the form of *host\[port1-port2\]*

|

**Parent topic:**[Elasticsearch configuration](../topics/elasticsearch_configuration.md)

