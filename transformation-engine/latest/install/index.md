---
title: Installation overview
---

The standalone Document Transformation Engine runs on Microsoft Windows and provides file transformations.

## Prerequisites

There are a number of important notes to consider when installing the Document Transformation Engine in addition to the [supported platforms]({% link transformation-engine/latest/support/index.md %}).

* The standalone Document Transformation Engine requires the software components to be installed and available on the same machine.

* Only install the English versions of Microsoft Windows Server 2012 R2, and Microsoft Office 2016 32 bit because other languages cause encoding issues resulting in unpredictable behavior.

    > **Note:** Although the engine must be configured in English, this has no impact on the transformation language used for documents.

* To enable the Document Transformation Engine to work with non-English documents you must install the desired Microsoft Office language pack of the language you want to work with.

* The Document Transformation Engine does not work with Windows non-English regional settings.

* Make sure that the Windows print spooler service is running.

### Sizing

There are a number of recommendations for calculating sizing. You will need:

* Four high clocked cores per engine, with between 4 GB and 6 GB RAM. If you find that you need more power, it is better to add another engine instance with a similar specification than to upgrade the hardware. The reason for this is that Microsoft Office is not very scalable.

* Between 10 GB and 15 GB of free space. Storage is not that important, but if you have lots of large files, you should make sure that creating temporary copies of those files will not slow the system down.

* Gigabit Ethernet.

* At least one CPU for each concurrent transformation that is expected to be processed by the engine.

### Disc I/O bandwidth

Microsoft Office transformations are I/O-heavy, and so on some solutions, I/O contention can be a performance bottleneck. When multiple Word conversions occur in parallel, performance can suffer heavily from poor random read and write speeds.

Using an Amazon EC2 instance c3.2xlarge, the I/O metrics are as follows:

* sequential read speed: 131 MB/s
* sequential write speed: 83 MB/s
* random qd32 read speed: 10,4 MB/s
* random qd32 write speed: 3,8 MB/s

## Installation

The Document Transformation Engine is installed using an `msi` file where you can select to install a T-Engine at the same time. Alternatively you can install the Document Transformation Engine using the `msi` and use Docker Compose to install the T-Engine, for more see [Installation]({% link transformation-engine/latest/install/msi.md %}). There is also an [SDK that can be installed]({% link transformation-engine/latest/install/sdk.md %}).
