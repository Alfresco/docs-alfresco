---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: Customization
option: JVM tuning
---

# Low end machines

This section applies if you have less than 2GB available.

The stack size of 1024K \(-Xss1024K\) is generous. Some installations may require a little over 512K on occasion. Many may only use 256K. If the per-thread memory consumption is too high for your installation, reduce the stack size to 512K and then to 256K and note any memory-related errors in the logs.

The `NewSize` should be kept as large as possible. It can be reduced, but the memory consumption should be watched on a monitoring tool, for example, JConsole, to ensure that the rate of spillover of temporary objects is kept down. If the machine is supporting 500 simultaneous operations, for instance, then the spillover of temporary objects \(from `NewSize` being too small\) will cause hold-ups on memory assignment as the garbage collector does sweeps.

**Parent topic:**[JVM settings](../concepts/jvm-settings.md)

