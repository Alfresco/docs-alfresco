---
title: Prerequisites and sizing
---

## Recommended software environment

Server-side

* Server operating system:
  * Windows Server 2012R2 (64-bit) or Red Hat Enterprise Linux (64-bit)
  * Other versions of Windows and Linux are supported, contact us for more details
* Web server:
  * Tomcat 8.x+ (64-bit)
  * Other application server wrappers are supported, contact us for more details
* Java:
  * Java 11 + (64-bit)
  * If you are using Java 17, refer to our [Java 17 support guide]({% link enterprise-viewer/3.6/install/java-support.md %}).

Client Browsers:

1. Internet Explorer 11 +
2. Firefox
3. Chrome
4. Safari

## Recommended hardware environment

Virtual servers (VMWare-based) and Enterprise Viewer are fully compatible and supported. Bare metal
servers with an OS directly installed are also supported.

## Server sizing (based on peak and average concurrent user loads)

### Review monthly statistics

For this evaluation, we’ll assume all the users are concurrent users.

| Concurrent reviewers & viewers (Users) | Recommended server specifications |
| -------------------------------------- | --------------------------------- |
| Peak users | Average users | Total RAM | Load balanced servers |
| ---------- | ------------- | --------- | --------------------- |
| 1,000+ | 500 | 64 GB^ | 2 - 4 |
| 500 | 250 | 32 GB^ | 2 |
| 200 | 100 | 16 GB^ | 1 - 2 |
| 100 | 50 | 8 GB^ | 1 |
| 50 | 20 | 6 GB^ | 1 |

**_“Users”_** _includes both reviewers themselves, and anyone viewing annotated documents._

****_Total RAM_** _is total RAM, split evenly across all servers, when multiple load balanced servers are called
for._

*****_Load Balanced Servers._** _Each server is assumed to have 4 CPUs._

*** Memory recommendations are between Enterprise Viewer, OpenContent, and AEVT. If these are on separate servers the memory can be divided between them. Our initial recommended split is 50% / 40% / 10% between AEVT / OpenContent / Enterprise Viewer

## Sample of server sizing

### Review monthly statistics example

For this evaluation, we'll assume all the users are concurrent users.

| Month | Total reviewers & viewers | Avg. day reviewers & viewers |
| ----- | ------------------------- | ---------------------------- |
| Jan- 14 | 5,748 | 287 |
| Feb- 14 | 7,184 | 359 |
| Mar- 14 | 7,230 | 362 |
| Apr- 14 | 7,866 | 393 |
| May- 14 | 6,232 | 312 |
| Jun- 14 | 6,023 | 301 |
| Jul- 14 | 7,019 | 351 |
| Aug- 14 | 7,246 | 362 |
| Sep- 14 | 8,782 | 439 |
| Oct- 14 | 10,069 | 503 |
| Total | 73,399 | 367 |

We can see here three key figures:

* Lowest value: 287
* Peak value: 503
* Average value: 367

It means the system must be able to handle a maximum of 500 concurrent users.

### Recommended options

Based on these assumptions, the following options are recommended:

1. 2 servers with the following specifications:
   * 4 CPUs
   * 32 GB RAM per server
   * Tomcat Java options:
      * `Xms512M`
      * `Xmx 20 G`
      * `XX:MaxPermSize=256m`
      * `XX:-DisableExplicitGC`
   * `web.xml`
      * `maxThreads=2 50`
   * 30 GB HDD space
   * Servers must be load-balanced the load-balancer must have:
      * Session affinity: enabled
      * Web server probe: recommended
2. 4 servers with the following specifications
   * 4 CPUs
   * 16 GB RAM per server
   * Tomcat Java Options:
      * `Xms512M`
      * `Xmx1 0 G`
      * `XX:MaxPermSize=256m`
      * `XX:-DisableExplicitGC`
   * `web.xml`
      * `maxThreads= 125`
   * 30 GB HDD space
   * Servers must be load-balanced the load-balancer must have:
     * Session affinity: enabled
     * Web server probe : recommended
