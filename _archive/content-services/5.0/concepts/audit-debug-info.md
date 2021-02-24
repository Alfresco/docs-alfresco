---
author: [Alfresco Documentation, Alfresco Documentation]
audience: 
category: Administration
option: audit
---

# Debug information

The PropertyAuditFilter provides log4j debug information \(in the alfresco.log file\) when it rejects values. Turning on this debugger can generate large volumes of output.

## Enable debug

```
# Change file appender to include debug from any source
log4j.appender.File.Threshold=debug

# Enable debug from the PropertyAuditFilter
log4j.logger.org.alfresco.repo.audit.PropertyAuditFilter=debug
```

**Parent topic:**[Audit filters](../concepts/audit-filters.md)

