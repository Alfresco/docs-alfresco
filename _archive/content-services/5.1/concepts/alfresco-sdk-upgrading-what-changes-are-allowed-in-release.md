---
author: Alfresco Documentation
---

# What changes are allowed in an SDK release?

The following describes the kind of changes you can expect \(are allowed\) in major, minor, and patch releases.

A 3 digit versioning scheme is used, **major.minor.patch** \(e.g. 2.1.0\). The following is a list of changes that can go into each one of these releases:

1.  **major**
    1.  *Backward incompatible changes* \(e.g. changes in the archetype project structure, functional changes in archetypes POMs, functional changes in existing profiles\)
    2.  *Changes in the artifact naming*
2.  **minor** Cannot change existing behaviors \(e.g. existing profiles semantics, build lifecycle, archetype structure\).
    1.  *New features* \(e.g. new alfresco-sdk-parent, new archetype profiles, new properties\)
    2.  *New artifacts*
3.  **patch** Ideally no changes to the code of the archetypes.
    1.  *Bug Fixes*
    2.  *Limited changes to SDK parent and Alfresco Plugin*

Note that in addition to this there can be beta releases to give early access to features.

**Parent topic:**[Upgrading SDK version for an extension project](../concepts/alfresco-sdk-upgrading-sdk-version.md)

