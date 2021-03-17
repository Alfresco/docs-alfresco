---
author: [Alfresco Documentation, Alfresco Documentation]
source: 
audience: 
category: [Alfresco Server, Administration, Configuration]
keyword: [solr, search, lucene]
---

# JBoss logging

You can add logger elements to the <JBOSS\_EAP\_HOME\>\\standalone\\configuration\\standalone.xml file for configuring JBoss logging.

```
<logger category="org.hibernate">
    <level name="ERROR"/>
</logger>
<logger category="org.hibernate.util.JDBCExceptionReporter">
                <level name="FATAL"/>
            </logger>
            <logger category="org.hibernate.event.def.AbstractFlushingEventListener">
                <level name="FATAL"/>
            </logger>
            <logger category="org.hibernate.type">
                <level name="WARN"/>
            </logger>
            <logger category="org.hibernate.cfg.SettingsFactory">
                <level name="WARN"/>
            </logger>
            <logger category="org.springframework">
                <level name="WARN"/>
            </logger>
            <logger category="org.springframework.remoting.support">
                <level name="ERROR"/>
            </logger>
            <logger category="org.springframework.util">
                <level name="ERROR"/>
            </logger>
            <logger category="org.apache.axis">
                <level name="INFO"/>
            </logger>
            <logger category="org.apache.ws">
                <level name="INFO"/>
            </logger>
            <logger category="org.apache.cxf">
                <level name="ERROR"/>
            </logger>
            <logger category="org.apache.myfaces.util.DebugUtils">
                <level name="INFO"/>
            </logger>
            <logger category="org.apache.myfaces.el.VariableResolverImpl">
                <level name="ERROR"/>
            </logger>
            <logger category="org.apache.myfaces.application.jsp.JspViewHandlerImpl">
                <level name="ERROR"/>
            </logger>
            <logger category="org.apache.myfaces.taglib">
                <level name="ERROR"/>
            </logger>
            <logger category="net.sf.jooreports.openoffice.connection">
                <level name="FATAL"/>
            </logger>
            <logger category="org.hibernate.ps.PreparedStatementCache">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.admin">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.cache.TransactionalCache">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.model.filefolder">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.tenant">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.avm">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.config">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.config.JndiObjectFactoryBean">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.config.JBossEnabledWebApplicationContext">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.management.subsystems">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.management.subsystems.ChildApplicationContextFactory$ChildApplicationContext">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.security.sync">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.security.person">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.sample">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.web">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.webservice">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.service.descriptor.DescriptorService">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.importer.ImporterBootstrap">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.web.ui.common.Utils">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.admin.patch.PatchExecuter">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.domain.patch.ibatis.PatchDAOImpl">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.admin.patch.impl.DeploymentMigrationPatch">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.version.VersionMigrator">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.admin.patch.impl.ResetWCMToGroupBasedPermissionsPatch">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.module.ModuleServiceImpl">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.domain.schema.SchemaBootstrap">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.admin.ConfigurationChecker">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.node.index.AbstractReindexComponent">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.node.index.IndexTransactionTracker">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.node.index.FullIndexRecoveryComponent">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.node.index.AVMFullIndexRecoveryComponent">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.util.OpenOfficeConnectionTester">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.node.db.hibernate.HibernateNodeDaoServiceImpl">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.domain.hibernate.DirtySessionMethodInterceptor">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.transaction.RetryingTransactionHelper">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.util.transaction.SpringAwareUserTransaction.trace">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.util.AbstractTriggerBean">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.enterprise.repo.cluster">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.version.Version2ServiceImpl">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.workflow">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.smb.protocol">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.ftp.protocol">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.webdav.protocol">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.fileserver">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.node.integrity">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.search.Indexer">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.search.impl.lucene.index">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.search.impl.lucene.fts.FullTextSearchIndexerImpl">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.web.forms.xforms.XFormsBean">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.web.forms.XSLTRenderingEngine">
                <level name="ERROR"/>
            </logger>
            <logger category="alfresco.missingProperties">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.web.ui.repo.component.property.UIChildAssociation">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.web.ui.repo.component.property.UIAssociation">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.dictionary">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.dictionary.types.period">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.mbeans.VirtServerRegistry">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.util.RuntimeSystemPropertiesSetter">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.content.ReplicatingContentStore">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.content.replication">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.activities">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.usage">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.module.vti">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.forms">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.web.config.forms">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.web.scripts.forms">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.opencmis">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.opencmis.AlfrescoCmisServiceInterceptor">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.cmis">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.cmis.dictionary">
                <level name="WARN"/>
            </logger>
            <logger category="org.apache.chemistry.opencmis">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.imap">
                <level name="INFO"/>
            </logger>
            <logger category="org.jbpm.graph.def.GraphElement">
                <level name="FATAL"/>
            </logger>
            <logger category="org.springframework.extensions.webscripts">
                <level name="INFO"/>
            </logger>
            <logger category="org.springframework.extensions.webscripts.ScriptLogger">
                <level name="WARN"/>
            </logger>
            <logger category="org.springframework.extensions.webscripts.ScriptDebugger">
                <level name="OFF"/>
            </logger>
            <logger category="org.alfresco.repo.web.scripts">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.web.scripts.BaseWebScriptTest">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.web.scripts.AlfrescoRhinoScriptDebugger">
                <level name="OFF"/>
            </logger>
            <logger category="org.alfresco.repo.jscript">
                <level name="ERROR"/>
            </logger>
            <logger category="org.alfresco.repo.jscript.ScriptLogger">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.cmis.rest.CMISTest">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.avm.actions">
                <level name="INFO"/>
            </logger>
            <logger category="org.alfresco.repo.bulkimport">
                <level name="WARN"/>
            </logger>
            <logger category="org.alfresco.repo.content.metadata.AbstractMappingMetadataExtracter">
                <level name="WARN"/>
            </logger>
            <logger category="org.apache.pdfbox.pdmodel.font.PDSimpleFont">
                <level name="FATAL"/>
            </logger>
            <logger category="org.apache.pdfbox.pdmodel.font.PDFont">
                <level name="FATAL"/>
            </logger>
            <logger category="org.apache.pdfbox.pdmodel.font.PDCIDFont">
                <level name="FATAL"/>
            </logger>
            <logger category="org.alfresco.repo.search.impl.noindex.NoIndexIndexer">
                <level name="FATAL"/>
            </logger>
            <logger category="org.alfresco.repo.search.impl.noindex.NoIndexSearchService">
                <level name="FATAL"/>
            </logger>
            <logger category="org.alfresco.repo.search.impl.lucene.index.IndexInfo">
                <level name="WARN"/>
            </logger> 
```

**Parent topic:**[Configuring JBoss for Alfresco](../tasks/alf-jboss-config.md)

