---
author: Alfresco Documentation
---

# Out-of-the-box content models

The repository comprises several content models out of the box for specifying the core content types of an ECM system. They are expressed in terms of the content metamodel and provide a set of samples on which to base custom content models.

It's good to know about the existing content models before we start defining our own custom models. There are two main reasons for this. The first reason is that **we don't want to define types and aspects that are already available** in the out-of-the-box models, such as generic file and folder types. And the second reason is that **we don't want to clash with the out of the box models** when we define our custom models, meaning we don't want to use the same namespace or prefix that's used by an out-of-the-box model as this will prevent our custom model from deploying.

The following content models are good to know a bit more about then just the namespace and prefix:

-   **Data Dictionary model**

    The base model upon which all other models depend \(located in the file [dictionaryModel.xml](https://github.com/Alfresco/alfresco-data-model/blob/master/src/main/resources/alfresco/model/dictionaryModel.xml)\), the Data Dictionary model provides definitions for the fundamental data types, such as `d:text` and `d:boolean`. It exposes the namespace URI `http://www.alfresco.org/model/dictionary/1.0` with prefix `d`.

-   **System model**

    The repository depends on a system model \(located in the file [systemModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/systemModel.xml)\) that provides definitions for types used by the implementation of the repository, such as `sys:base`, `sys:root`, and `sys:reference`. In most cases, it should not be required to refer to definitions in the system model from your own custom models. It exposes the namespace URI http://www.alfresco.org/model/system/1.0 with prefix `sys`.

-   **ECM domain model**

    The Enterprise Content Management \(ECM\) domain model \(located in the file [contentModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/contentModel.xml)\) provides definitions for types and aspects, such as `cm:folder`, `cm:content` \(for files\), `cm:versionable` \(aspect for controlling versioning of files\), and `cm:auditable` \(aspect with created, creator, modified, modifier info\). All server services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/content/1.0 with prefix `cm`. When you define custom types you extend out-of-the-box types, such as `cm:folder` and `cm:content`.

-   **BPM domain model**

    The Business Process Management \(BPM\) domain model \(located in the file [bpmModel.xml](https://github.com/Alfresco/alfresco-repository/blob/master/src/main/resources/alfresco/model/bpmModel.xml)\) provides definitions for types, such as `bpm:package`, `bpm:task`, `bpm:workflowTask`, and `bpm:assignee`. All workflow services, protocols, and clients are focused on these types. It exposes the namespace http://www.alfresco.org/model/bpm/1.0 with prefix `bpm`. These types and aspects are used by the out-of-the-box workflows.


The following list contains the out-of-the-box content model namespaces and prefixes that we **must not** use when we define our custom content models:

```
<namespace uri="http://www.alfresco.com/model/activiti-bpm-suite/1.0"                  prefix="abs"/>
<namespace uri="http://www.alfresco.org/model/action/1.0"                              prefix="act"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/ADOBEXMP/1.0"           prefix="adobexmp"/>
<namespace uri="http://www.alfresco.org/model/ai/1.0"                                  prefix="ai" />
<namespace uri="http://www.alfresco.org"                                               prefix="alf"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/alfcmis"                        prefix="alfcmis"/>
<namespace uri="http://www.alfresco.org/model/application/1.0"                         prefix="app"/>
<namespace uri="aps"                                                                   prefix="aps"/>      
<namespace uri="http://www.alfresco.org/model/audio/1.0"                               prefix="audio"/>
<namespace uri="http://www.alfresco.org/model/blogintegration/1.0"                     prefix="blg"/>
<namespace uri="http://www.alfresco.org/model/bpm/1.0"                                 prefix="bpm" />
<namespace uri="http://www.alfresco.org/model/content/1.0"                             prefix="cm"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/cs01"                           prefix="cmis"/>
<namespace uri="http://www.alfresco.org/model/cmis/custom"                             prefix="cmiscustom"/>
<namespace uri="http://www.alfresco.org/model/cmis/1.0/cs01ext"                        prefix="cmisext"/>
<namespace uri="http://www.alfresco.org/model/custommodelmanagement/1.0"               prefix="cmm" />
<namespace uri="custom.model"                                                          prefix="custom"/>
<namespace uri="http://www.alfresco.org/model/dictionary/1.0"                          prefix="d"/>
<namespace uri="http://www.alfresco.org/model/quickr/draft/approve/1.0"                prefix="da"/>
<namespace uri="http://www.alfresco.org/model/dropbox/1.0"                             prefix="db"/>
<namespace uri="http://purl.org/dc/elements/1.1/"                                      prefix="dc"/>
<namespace uri="http://www.alfresco.org/model/datalist/1.0"                            prefix="dl"/>
<namespace uri="http://www.alfresco.org/model/dod5015/1.0"                             prefix="dod"/>
<namespace uri="http://www.alfresco.org/model/download/1.0"                            prefix="download"/>
<namespace uri="http://www.alfresco.org/model/distributionpolicies/1.0/model"          prefix="dp" />
<namespace uri="http://www.alfresco.org/model/emailserver/1.0"                         prefix="emailserver" />
<namespace uri="http://www.alfresco.org/model/exif/1.0"                                prefix="exif"/>
<namespace uri="http://www.alfresco.org/model/forum/1.0"                               prefix="fm"/>
<namespace uri="http://www.alfresco.org/model/googledocs/2.0"                          prefix="gd2" />
<namespace uri="http://www.alfresco.org/model/hybridworkflow/1.0"                      prefix="hwf" />
<namespace uri="http://www.alfresco.org/model/calendar"                                prefix="ia"/>
<namespace uri="http://www.alfresco.org/model/imap/1.0"                                prefix="imap" />
<namespace uri="http://www.alfresco.org/model/workflow/invite/moderated/1.0"           prefix="imwf" />
<namespace uri="http://www.alfresco.org/model/workflow/invite/nominated/1.0"           prefix="inwf" />
<namespace uri="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"                           prefix="Iptc4xmpCore"/>
<namespace uri="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"                           prefix="Iptc4xmpExt"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/IPTCXMP/1.0"            prefix="iptcxmp"/>
<namespace uri="http://www.alfresco.org/model/linksmodel/1.0"                          prefix="lnk"/>
<namespace uri="http://www.alfresco.com/model/machine/learning/sentiment/analysis/1.0" prefix="mlsa"/>
<namespace uri="http://www.alfresco.org/system/modules/1.0"                            prefix="module" />
<namespace uri="http://www.alfresco.org/model/content/metadata/PBCORE/1.0"             prefix="pbcoreModel" />
<namespace uri="http://www.pbcore.org/PBCore/PBCoreNamespace.html"                     prefix="pbcore"/>
<namespace uri="http://ns.adobe.com/photoshop/1.0/"                                    prefix="photoshop"/>
<namespace uri="http://ns.useplus.org/ldf/xmp/1.0/"                                    prefix="plus"/>
<namespace uri="http://www.alfresco.org/model/content/metadata/PLUSLDF/1.0"            prefix="plusldf"/>
<namespace uri="http://www.alfresco.org/model/quickr/psheet/1.0"                       prefix="ps"/>
<namespace uri="http://www.alfresco.org/model/publishing/1.0"                          prefix="pub" />
<namespace uri="http://www.alfresco.org/model/qshare/1.0"                              prefix="qshare" />
<namespace uri="http://www.alfresco.org/model/quickr/1.0"                              prefix="qr"/>
<namespace uri="http://www.alfresco.org/model/remotecredentials/1.0"                   prefix="rc"/>
<namespace uri="http://www.alfresco.org/system/registry/1.0"                           prefix="reg" />
<namespace uri="http://www.alfresco.org/model/workflow/resetpassword/1.0"              prefix="resetpasswordwf" />
<namespace uri="http://www.alfresco.org/model/recordsmanagement/1.0"                   prefix="rma"/>
<namespace uri="http://www.alfresco.org/model/rmcustom/1.0"                            prefix="rmc"/>
<namespace uri="http://www.alfresco.org/model/recordsmanagementreport/1.0"             prefix="rmr"/>
<namespace uri="http://www.alfresco.org/model/recordableversion/1.0"                   prefix="rmv"/>
<namespace uri="http://www.alfresco.org/model/rmworkflow/1.0"                          prefix="rmwf"/>
<namespace uri="http://www.alfresco.org/model/rendition/1.0"                           prefix="rn"/>
<namespace uri="http://www.alfresco.org/model/rule/1.0"                                prefix="rule"/>
<namespace uri="http://schema.org"                                                     prefix="schema" />
<namespace uri="http://www.alfresco.org/model/content/smartfolder/1.0"                 prefix="smf" />
<namespace uri="http://www.alfresco.org/model/solrfacet/1.0"                           prefix="srft" />
<namespace uri="http://www.alfresco.org/model/solrfacetcustomproperty/1.0"             prefix="srftcustom"/>
<namespace uri="http://www.alfresco.org/model/site/1.0"                                prefix="st"/>
<namespace uri="http://www.alfresco.org/model/sitecustomproperty/1.0"                  prefix="stcp"/>
<namespace uri="http://www.alfresco.org/model/surf/1.0"                                prefix="surf"/>
<namespace uri="http://www.alfresco.org/model/sync/1.0"                                prefix="sync"/>
<namespace uri="http://www.alfresco.org/model/system/1.0"                              prefix="sys" />
<namespace uri="http://www.alfresco.org/model/transfer/1.0"                            prefix="trx" />
<namespace uri="http://www.alfresco.org/model/user/1.0"                                prefix="usr"/>
<namespace uri="http://www.alfresco.org/model/versionstore/1.0"                        prefix="ver"/>
<namespace uri="http://www.alfresco.org/model/versionstore/2.0"                        prefix="ver2"/>
<namespace uri="http://www.alfresco.org/view/repository/1.0"                           prefix="view"/>
<namespace uri="http://www.alfresco.org/model/webdav/1.0"                              prefix="webdav"/>
<namespace uri="http://www.alfresco.org/model/workflow/1.0"                            prefix="wf"/>
<namespace uri="http://www.alfresco.org/model/website/1.0"                             prefix="ws" />
<namespace uri="http://ns.adobe.com/xap/1.0/"                                          prefix="xmp"/>
<namespace uri="http://ns.adobe.com/xap/1.0/rights/"                                   prefix="xmpRights"/>
```

**Parent topic:**[Content Model](../references/dev-extension-points-content-model.md)

