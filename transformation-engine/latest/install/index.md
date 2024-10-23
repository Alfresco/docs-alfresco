---
title: Installation overview
---

The standalone Document Transformation Engine runs on Microsoft Windows and provides file transformations.

## Prerequisites

There are a number of important notes to consider when installing the Document Transformation Engine in addition to the [Supported platforms]({% link transformation-engine/latest/support/index.md %}).

* The Document Transformation Engine requires an installation of [Alfresco Transform Service]({% link transform-service/latest/install/index.md %}).

* The standalone Document Transformation Engine requires the software components to be installed and available on the same machine.

* Only install the English versions of Microsoft Windows Server, and Microsoft Office because other languages cause encoding issues resulting in unpredictable behavior.

    > **Note:** Although the engine must be configured in English, this has no impact on the transformation language used for documents.

* Microsoft Office (32-bit and 64-bit).

    > **Note:** Please be advised that the Alfresco Document Transformation Engine (DTE) uses Microsoft Office to automate the creation of high-fidelity renderings of Office document formats; as a result, it is your responsibility as a user of DTE to ensure that you have proper licensing arrangements in place with Microsoft to allow for such automation.

* To enable the Document Transformation Engine to work with non-English documents you must install the desired Microsoft Office language pack of the language you want to work with.

* The Document Transformation Engine does not work with Windows non-English regional settings.

* Make sure that the Windows print spooler service is running.

See [Supported platforms]({% link transformation-engine/latest/support/index.md %}) for more information.

### Sizing

There are a number of recommendations for calculating sizing. You will need:

* Four high clocked cores per engine, with between 4 GB and 6 GB RAM. If you find that you need more power, it is better to add another engine instance with a similar specification than to upgrade the hardware. The reason for this is that Microsoft Office is not very scalable.

* Between 10 GB and 15 GB of free space. Storage is not that important, but if you have lots of large files, you should make sure that creating temporary copies of those files will not slow the system down.

* Gigabit Ethernet.

* At least one CPU for each concurrent transformation that is expected to be processed by the engine.

### Disc I/O bandwidth

Microsoft Office transformations are I/O-heavy, and so on some solutions, I/O contention can be a performance bottleneck. When multiple Word conversions occur in parallel, performance can suffer heavily from poor random read and write speeds.

## Installation

The Document Transformation Engine is installed using an `msi` file where you can select to install a T-Engine at the same time. Alternatively you can install the Document Transformation Engine using the `msi` and use Docker Compose to install the T-Engine. See [Install with MSI]({% link transformation-engine/latest/install/msi.md %}) for more details.

### Set `JAVA_HOME`

If you're using any JDK which does not set a registry key, you need to manually set the `JAVA_HOME` system variable. This mostly happens when using a `zip` package installation of the JDK.

1. Locate your JDK installation (it's most likely in a directory such as `C:\Program Files\jdk-11.x.x`).
2. Search for **Advanced system settings**.
3. Select **View advanced system settings > Environment Variables**.
4. In the **System variables** section, click **New** (or **User variables** for a single user setting).
5. Add the following settings:

    * Variable name = `JAVA_HOME`
    * Variable value = path to the JDK installation (from step 1).

6. Click **OK** (twice) and finally click **Apply** to save the changes.
