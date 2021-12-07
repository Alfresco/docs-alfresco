---
title: Verwenden von Alfresco Content Services aus anderen Anwendungen heraus 
---

Es gibt verschiedene Möglichkeiten, außerhalb von Alfresco Share auf Inhalte zuzugreifen und diese zu nutzen.

**Microsoft Office**

Sie können Dateien direkt über Microsoft Office-Anwendungen wie Word und Excel öffnen, bearbeiten und speichern. Mit derselben Funktion können Sie auch Dateien über Windows Explorer öffnen. Außerdem haben Sie die Möglichkeit, ein Netzlaufwerk zu Alfresco Content Services zuzuordnen.

**Microsoft Outlook**

Dank der Outlook-Integration in Alfresco können Sie Ihre E-Mail-Nachrichten über Microsoft Outlook in Alfresco Content Services speichern und archivieren. Sie können E-Mail-Nachrichten per Drag-and-Drop in Alfresco Share ablegen und daraus entfernen sowie automatisch Eigenschaften hinzufügen, wenn eine E-Mail-Nachricht archiviert wird. Andere Optionen wie **Vollständige Suche**, **Tagging**, **Metadaten-Support** und **Workflow-Funktionen** sind ebenfalls verfügbar.

**Verknüpfungen im Windows Explorer**

Ihr Alfresco-Administrator kann verschiedene Verknüpfungen aktivieren, damit Sie Dateien über Windows Explorer oder Ihren Desktop bearbeiten können.

## Verwenden von Alfresco Content Services aus Microsoft Office heraus

Mit Alfresco Office Services (AOS) können Sie direkt über Ihre Microsoft Office-Anwendungen auf Inhalte zugreifen.

Das bedeutet, dass Sie Microsoft Office-Dateien (Word, PowerPoint und Excel) in Alfresco Content Services durchsuchen, öffnen und speichern können, ohne über Chrome, Firefox oder einen anderen Webbrowser auf Alfresco Share zugreifen zu müssen.

Sie können auch im Windows Explorer nach Inhalten suchen oder ein Netzlaufwerk zuordnen.

Weitere Informationen zu Alfresco Office Services finden Sie unter [Alfresco Office Services]({% link microsoft-office/1.1/using/index.md %}).

## Verwenden von Alfresco Content Services aus Microsoft Outlook heraus

Mit der Alfresco Outlook-Integration können Sie die E-Mail- und Repository-Verwaltung nutzen, ohne Microsoft Outlook verlassen zu müssen.

Sie können E-Mails direkt in Alfresco Share archivieren, die vollständige Metadatenunterstützung, umfassende Such-, Tagging- und Workflow-Funktionen nutzen, Dateien anhängen und archivierte E-Mails in Ihrem Posteingang anzeigen.

Weitere Informationen zur Alfresco Outlook-Integration finden Sie unter [Alfresco Outlook-Integration]({% link microsoft-outlook/2.4/install/index.md %}).

## Verwenden der Tastenkombinationen im Windows Explorer

Sie können mit Dateien arbeiten, ohne dass Sie sich tatsächlich in der Alfresco Share-Oberfläche befinden.

Der Administrator kann das Repository so zuordnen, dass Sie über den Windows Explorer oder eine Desktop-Verknüpfung auf Ihre Inhalte zugreifen können. Wenn Sie auf diese Weise arbeiten, werden auf jeder Ebene der Alfresco Content Services-Dateistruktur bis zu drei zusätzliche Dateien angezeigt:

-   `__CheckInOut.exe`
-   `__ShowDetails.exe`
-   `__Share.url`

> **Hinweis:** Die Datei `Share.url` ist nur innerhalb von Site-Ordnern verfügbar und nicht überall im Repository.

Mit diesen Dateien können Sie Inhalte zum Repository hinzufügen, Dokumente ein- und auschecken, Dokumentendetails anzeigen und Alfresco Share in einem Browserfenster öffnen.

> **Hinweis:** Diese Optionen funktionieren nur, wenn Sie in einer Windows-Umgebung arbeiten.

### Hinzufügen einer Datei von außerhalb von Alfresco Share {#add-a-file-from-outside-alfresco-share}

Sie können Inhalte einfach per Drag & Drop von außerhalb von Share in das Repository ziehen.

> **Hinweis:** Diese Funktionalität ist in einer Windows-Umgebung verfügbar, wenn das Alfresco Content Services-Repository von Ihrem Administrator zugeordnet wurde, so dass Sie über den Windows Explorer darauf zugreifen können.

1.  Wählen Sie eine Datei im Windows Explorer oder auf Ihrem Desktop aus.

2.  Ziehen Sie die Datei auf den Speicherort im Repository, dem Sie es hinzufügen möchten.

    Die Datei wird an der ausgewählten Stelle im Repository hinzugefügt.

### Auschecken von Dateien von außerhalb von Alfresco Share {#check-out-files-from-outside-alfresco-share}

Mithilfe von `CheckInOut.exe` können Sie Inhalt auschecken, damit Sie sicher daran arbeiten können.

> **Hinweis:** `CheckInOut.exe` ist in einer Windows-Umgebung verfügbar, wenn das Alfresco Content Services-Repository von Ihrem Administrator zugeordnet wurde, so dass Sie über den Windows Explorer darauf zugreifen können.

1.  Ziehen Sie im Windows Explorer eine Datei aus dem zugeordneten Repository auf das Symbol `CheckInOut.exe`.

    > **Hinweis:** Auf jeder Ebene des Repositorys ist eine Kopie von `CheckInOut.exe` vorhanden.

2.  Klicken Sie auf **OK**, wenn das Dialogfeld zur Ausführung einer Eincheck-/Auscheck-Aktion angezeigt wird.

3.  Klicken Sie auf **OK**, wenn eine Meldung erscheint, dass die Datei ausgecheckt wurde.

    Eine Kopie Ihrer Datei wird an demselben Speicherort erstellt, an dem die Originaldatei abgelegt ist. Dem Titel wird (Arbeitskopie) angehängt. Die Originaldatei ist jetzt gesperrt, so dass Sie zwar an der Datei (Arbeitskopie) arbeiten können, andere Benutzer bis zum Einchecken jedoch keine Änderungen daran vornehmen können.

4.  Wenn die Arbeiten an der Datei abgeschlossen sind und Sie Ihre Änderungen gespeichert haben, ziehen Sie die Datei (Arbeitskopie) auf das Symbol `CheckInOut.exe`.

5.  Klicken Sie auf **OK**, wenn das Dialogfeld zur Ausführung einer Eincheck-/Auscheck-Aktion angezeigt wird.

    Die Datei (Arbeitskopie) wird entfernt und alle im ausgecheckten Zustand vorgenommenen Aktualisierungen werden auf die Originaldatei angewendet.

### Anzeigen von Elementdetails von einem zugeordneten Laufwerk aus {#view-item-details-from-a-mapped-drive}

Mithilfe von `ShowDetails.exe` können Sie Elementdetails und -eigenschaften anzeigen.

> **Hinweis:** `ShowDetails.exe` ist in einer Windows-Umgebung verfügbar, wenn das Alfresco Content Services-Repository von Ihrem Administrator zugeordnet wurde, so dass Sie über den Windows Explorer darauf zugreifen können.

1.  Wählen Sie eine Datei im zugeordneten Repository im Windows Explorer oder auf Ihrem Desktop aus.

2.  Ziehen Sie die Datei aus dem zugeordneten Repository auf `ShowDetails.exe`.

    > **Hinweis:** Auf jeder Ebene des Repositorys ist eine Kopie von `ShowDetails.exe` vorhanden.

    Es wird ein neues Browserfenster mit der Alfresco Share-Dateivorschau angezeigt. Es enthält eine Vorschau der Datei und ihrer Eigenschaften.

### Öffnen von Alfresco Share in einem Browserfenster {#open-alfresco-share-in-a-browser-window}

Mithilfe von `Share.url` können Sie Share in einem Browserfenster öffnen.

`Share.url` ist eine Tastenkombination für Share. Es ist in einer Windows-Umgebung verfügbar, wenn das Alfresco Content Services-Repository von Ihrem Administrator zugeordnet wurde, so dass Sie über den Windows Explorer darauf zugreifen können.

1.  Navigieren Sie im Windows Explorer zu dem Ort im Repository, den Sie öffnen möchten.

    > **Hinweis:** Die Datei `Share.url` ist nur innerhalb von Site-Ordnern verfügbar und nicht überall im Repository.

2.  Doppelklicken Sie auf `Share.url`.

    > **Hinweis:** Auf jeder Ebene des Repositorys ist eine Kopie von `Share.url` vorhanden.

    Alfresco Share wird in einem Browserfenster geöffnet und zeigt die Position an, auf der Sie auf `Share.url` geklickt haben.
