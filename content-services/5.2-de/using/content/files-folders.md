---
title: Arbeiten mit Dateien und Ordnern
---

Nachdem Dateien einer Site hinzugefügt wurden, können die Mitglieder der Site darauf zugreifen und mit ihnen arbeiten. Mitglieder können nicht nur Dateien hinzufügen, sondern Dateien auch anzeigen, herunterladen, bearbeiten und löschen.

## Bearbeiten von Dateien {#editing-files}

Es gibt mehrere Möglichkeiten, Inhalte zu bearbeiten. Diese Optionen sind verfügbar, wenn sie für einen Dateityp geeignet sind.

Mit der Aktion **Offline bearbeiten** können Sie eine Datei auf Ihren Computer herunterladen, damit Sie sie dort bearbeiten können. Hierdurch wird die Datei in der Bibliothek gesperrt, damit andere Benutzer sie nicht gleichzeitig bearbeiten können. Diese Option ist für jede Datei verfügbar.

Mit der Aktion **In Microsoft Office bearbeiten** können Sie eine Datei im entsprechenden MS Office-Programm bearbeiten. Die Datei ist in Alfresco Share gesperrt, während sie bearbeitet wird. Diese Option ist nur für Dateien mit der Version Microsoft Office 2003 oder höher verfügbar.

Mit der Aktion **In Alfresco Share bearbeiten** können Sie reine Text-, HTML- oder XML-Dateien direkt in der Dokumentenbibliothek bearbeiten. Diese Option ist für diese Dateitypen verfügbar, die alle mit der Funktion **Erstellen** in der Bibliothek erstellt werden können.

Mit der Aktion **In Google Docs bearbeiten** können Sie Dateien in Google Docs bearbeiten. Die Datei ist in Alfresco Share gesperrt, während sie bearbeitet wird. Diese Option ist für unterstützte Dokument-, Präsentations- und Tabellenkalkulationsformate verfügbar.

Sie können auch die Eigenschaften einer Datei bearbeiten oder Inhalte als neue Version einer bestehenden Datei hochladen.

### Bearbeiten von Inhalten {#editing-content}

Die Aktualisierung Ihrer Inhalte in Alfresco Share ist ganz einfach. Sie können sogar wählen, ob Sie sie in Microsoft Office, offline oder in Google Docs bearbeiten möchten.

1.  Bewegen Sie in der Elementliste der Dokumentenbibliothek den Mauszeiger auf eine der Dateien.

    Hiermit wird das Element markiert und die für dieses Element verfügbaren Aktionen werden angezeigt.

2.  Klicken Sie auf **Mehr** und wählen Sie dann **Offline bearbeiten**.

    Alfresco Share zeigt nun eine Benachrichtigung an, dass das Dokument gesperrt ist. Je nach Browser wird der Inhalt entweder automatisch heruntergeladen oder Sie müssen den gewünschten Speicherort auswählen.

    Das Dokument wird an diesem Speicherort gespeichert, und dem Titel wird der Zusatz **(Arbeitskopie)** hinzugefügt.

3.  Öffnen Sie das Dokument nun an diesem Speicherort mit Ihrer bevorzugten Software und nehmen Sie eine Änderung vor.

4.  Speichern und schließen Sie es das Dokument anschließend.

5.  Bewegen Sie anschließend in Alfresco Share Ihren Mauszeiger auf das Dokument und klicken Sie auf **Neue Version hochladen**.

    ![Update File page]({% link content-services/images/UpdateFile.png %})

6.  Klicken Sie auf der **Datei aktualisieren** auf das Symbol zum Durchsuchen und wählen Sie das Dokument **Arbeitskopie** aus.

    > **Hinweis:** Wenn Sie eine Datei mit einem anderen Namen oder Dateityp auswählen, wird diese angezeigt. Sie können wie im nächsten Schritt fortfahren, abbrechen oder eine andere Datei zum Hochladen auswählen. Wenn Sie fortfahren, wird der hochgeladene Dateiname und/oder Dateityp verwendet.

7.  Lassen Sie für die Version die Option für kleinere Änderungen ausgewählt und klicken Sie auf **Hochladen**.

8.  Klicken Sie nach dem Hochladen Sie auf **OK**. Im Bildschirm wird eine Änderungsaktualisierung angezeigt.

9.  Klicken Sie auf **Site-Dashboard**. Es werden Aktualisierungsbenachrichtigungen in den Dashlets angezeigt.





### Bearbeiten von Dateien offline {#editing-files-offline}

Wenn Sie eine Datei offline bearbeiten, wird sie auf Ihren Computer heruntergeladen und in der Bibliothek gesperrt, damit sie von anderen Benutzern nicht überschrieben werden kann, während Sie offline Änderungen vornehmen.

1.  Bewegen Sie den Mauszeiger auf eine Datei und klicken Sie auf **Mehr** und dann auf **Offline bearbeiten**.

    Die anschließenden Eingabeaufforderungen sind je nach Browser unterschiedlich.

2.  Nehmen Sie die entsprechenden Eingaben vor. Wenn Sie zum Öffnen oder Speichern der Datei aufgefordert werden, speichern Sie diese auf Ihrem Computer.

    > **Hinweis:** Abhängig von Ihren Browser-Einstellungen wird die Datei möglicherweise automatisch an einem Standardspeicherort auf Ihrem Computer gespeichert.

    Die Datei wird der Ansicht mit den **von mir bearbeiteten** Dateien hinzugefügt (auf der linken Seite der Bibliothek). Die Originaldatei ist weiterhin an ihrem ursprünglichen Speicherort in der Bibliothek gespeichert. Ein Symbol weist Benutzer darauf hin, dass die Datei von Ihnen zur Bearbeitung gesperrt ist.

3.  Sie können nun die heruntergeladene Version öffnen und bearbeiten.

    Klicken Sie abschließend auf **Neue Version hochladen**, um die bearbeitete Version in Alfresco Share hochzuladen.

    Sie können auf **Bearbeitung abbrechen** klicken, um die Datei ohne Änderungen zu entsperren.


### Bearbeiten von Dateien in Alfresco Share {#editing-files-in-alfresco-share}

Sie können reine Textdateien sowie HTML- und XML-Dateien direkt in Alfresco Share bearbeiten.

> **Hinweis:** Diese Aktion ist auch für Dateien verfügbar, die mit dem Aspekt **Inline editierbar** konfiguriert sind.

1.  Bewegen Sie den Mauszeiger auf eine Datei und klicken Sie auf **Mehr** und dann auf **In Alfresco Share bearbeiten**.

    Die Seite **Inhalt bearbeiten** wird angezeigt.

2.  Bearbeiten Sie die Dateidetails und den Inhalt nach Bedarf.

    Für **Name** werden die folgenden Sonderzeichen nicht unterstützt: `* " < > \ / . ? :` und `|`. Wenn der Name ein unzulässiges Zeichen enthält, ist die Schaltfläche **Speichern** deaktiviert.

    > **Hinweis:** Der Ordnername *kann* einen Punkt enthalten, solange er nicht das letzte Zeichen ist. Hiermit können Sie eine Erweiterung hinzufügen (z. B. .txt, .html oder .xml).

3.  Klicken Sie auf **Speichern**.


### Bearbeiten von Dateien in Microsoft Office {#editing-files-in-microsoft-office}

Sie können Microsoft Office-Dateien direkt aus Alfresco Share bearbeiten. Wenn Sie eine Datei bearbeiten, ist sie in Share gesperrt, bis Sie die Bearbeitung abgeschlossen haben.

> **Wichtig:** Wenn Sie an einem Mac arbeiten, müssen Sie sicherstellen, dass Sie auf die neueste Unter-Versionsnummer von Microsoft Office aktualisiert haben. Wenn Sie eine ältere Version installiert haben, treten möglicherweise Probleme beim Öffnen von Dokumenten auf.

1.  Bewegen Sie den Mauszeiger auf eine Datei und klicken Sie auf **Mehr** und dann auf **In Microsoft Office bearbeiten**.

    Sie werden aufgefordert sicherzustellen, dass Sie dem Inhalt vertrauen können.

    Die Datei wird in einem separaten Fenster geöffnet. In Share wird die Datei als gesperrt angezeigt.

    > **Hinweis:** Möglicherweise erhalten Sie eine weitere Aufforderung, Ihre Login-Daten für Share einzugeben und die **Bearbeitung zu aktivieren**.

2.  Sie können nun die Datei bearbeiten.

    Die Unter-Versionsnummer in Share wird bei jedem Speichern der Datei aktualisiert. Alle gängigen Microsoft Office-Funktionen sind verfügbar.

3.  Speichern Sie abschließend die Datei und schließen Sie sie.


Falls **In Microsoft Office bearbeiten** nicht verfügbar ist, prüfen Sie Folgendes:

-   Sie verfügen über die Site-Berechtigung zum Bearbeiten der Datei. Verbraucher können nur eine Datei anzeigen.
-   Sie verwenden [unterstützte Plattformen]({% link content-services/5.2/support/index.md %})


### Bearbeiten von Dateien in Google Docs {#editing-files-in-google-docs}

Der Aktion **In Google Docs bearbeiten** ist für alle Dateien verfügbar, die in Google Docs bearbeitet werden können. Es werden alle gängigen Dokument-, Präsentations- und Tabellenkalkulationsformate unterstützt.

Von Ihnen bearbeitete Dateien werden vorübergehend in Google Docs gespeichert und dann aus Google Docs entfernt, sobald sie wieder in Alfresco Share eingecheckt wurden.

1.  Bewegen Sie den Mauszeiger auf eine Datei und klicken Sie auf **Mehr** und dann auf **In Google Docs bearbeiten**.

    Autorisieren Sie Share für den Zugriff auf Ihr Google Docs-Konto bei entsprechender Aufforderung. Wenn Sie einen Google-Benutzernamen in Ihrem Alfresco Share-Profil angegeben haben, wird dieser als Standardkonto verwendet.

    >**Tipp:** Wenn Ihr Browser Sie auffordert, Popups für Google Docs zuzulassen, stimmen Sie zu. Wenn Sie Safari verwenden, können Sie Google Docs erst dann verwenden, wenn Sie alle Popups in den Einstellungen aktiviert haben. Aus Sicherheitsgründen empfiehlt es sich daher, einen anderen Browser zu verwenden.

    > **Hinweis:** Wenn Sie die Datei zuvor für die Bearbeitung gesperrt haben und nun zu ihr zurückkehren, steht die Aktion **Bearbeitung in Google Docs fortsetzen** zur Verfügung.

    Die Datei wird in Google Docs in einer neuen Browser-Registerkarte geöffnet. Sie ist in Share gesperrt, damit andere Benutzer nicht bearbeiten können, solange Sie daran arbeiten. Die Datei bleibt gesperrt, bis Sie Ihre Änderungen verwerfen oder speichern.

2.  Bearbeiten Sie den Inhalt.

3.  Schließen Sie abschließend die Google Docs-Browser-Registerkarte.

    In Alfresco Share wird mit der Datei das Symbol ![Geolocation metadata icon]({% link content-services/images/ico-googledocs.png %}) angezeigt, um anzugeben, dass sie in Google Docs geöffnet ist.

4.  Klicken Sie in Alfresco Share auf **Mehr** und dann auf **Google Doc einchecken**.

    Sie können auch **Bearbeitung in Google Docs fortsetzen** wählen, um die Bearbeitung fortzusetzen, oder **Bearbeitung in Google Docs abbrechen**, um die Bearbeitungssitzung und alle vorgenommenen Änderungen zu verwerfen.

5.  Geben Sie im Dialogfeld **Versionsinformationen** an, ob die Revision größer oder geringer ist, und fügen Sie dann alle Informationen hinzu, die für die von Ihnen vorgenommenen Aktualisierungen relevant sein könnten.

6.  Klicken Sie auf **OK**.

    Damit wird die Datei in Alfresco Share gespeichert und die Datei entsperrt.

    >**Tipp:** Weitere Informationen zur Arbeit mit Google Docs finden Sie in den [Häufig gestellte Fragen zu Google Docs](#google-docs-faqs).




### Freigeben von Google Docs-Dateien {#sharing-google-docs-files}

Sie können Google Docs-Dateien freigeben, während Sie sie bearbeiten, damit mehrere Benutzer gleichzeitig mit einem Dokument arbeiten können.

1.  Bewegen Sie den Mauszeiger auf eine Datei und klicken Sie auf **Mehr** und dann auf **In Google Docs bearbeiten**, oder wählen Sie diese Option in der Vorschau aus.

    Autorisieren Sie Alfresco Share für den Zugriff auf Ihr Google Docs-Konto bei entsprechender Aufforderung.

    > **Hinweis:** Wenn Sie die Datei zuvor für die Bearbeitung gesperrt haben und nun zu ihr zurückkehren, klicken Sie auf die Aktion **Bearbeitung in Google Docs fortsetzen**.

    Die Datei wird in Google Docs geöffnet. Sie wird in Share gesperrt, damit sie kein anderer Benutzer bearbeiten kann, während sie von Ihnen bearbeitet wird. Die Datei bleibt gesperrt, bis Sie Ihre Änderungen verwerfen oder speichern.

2.  Klicken Sie auf **Freigeben**.

3.  Geben Sie die E-Mail-Adressen der Personen, für die Sie freigeben möchten, in das Textfeld unter **Mitarbeiter hinzufügen** ein. Sie können einzelne Personen, eine Mailingliste oder eine Auswahl aus Ihren Kontakten hinzufügen.

4.  Wählen Sie im Menü neben den einzelnen Mitarbeitern die Zugriffsebene aus. **Kann anzeigen**, **Kann kommentieren** oder **Kann bearbeiten**.

5.  Klicken Sie auf **Fertig**.

    Alle Benutzer, für die Sie das Dokument freigegeben haben, erhalten eine E-Mail mit einem Link zu der Datei. Wenn diese auf den Link klicken, können sie die Datei während Ihrer Bearbeitungssitzung Datei ansehen und bearbeiten. Wenn Sie die Datei wieder in Share speichern oder die Änderungen verwerfen, können Sie sie nicht weiter bearbeiten, ohne die vorherigen Schritte zu wiederholen.

6.  Wenn Sie Ihre Bearbeitung abgeschlossen haben, schließen Sie die Registerkarten von Google Drive und klicken in Ihrer Bearbeitungssitzung in Share auf **In Alfresco Share speichern**.



### Häufig gestellte Fragen zu Google Docs {#google-docs-faqs}

Wenn Sie Probleme bei der Arbeit mit Dateien in Google Docs haben, schauen Sie sich in der Liste nach, ob es eine Möglichkeit gibt, Ihr Problem zu lösen.

**Bei der Verwendung von Google Docs in Internet Explorer (IE) wird ein Fehler angezeigt.**

Google Drive/Google Editor unterstützt nur die beiden neuesten Versionen von IE (11 und 10). Bei allen anderen Versionen wird die Meldung angezeigt, dass der Browser veraltet ist. (Das Gleiche gilt für Safari (nicht unter Windows unterstützt), Firefox und Google Chrome – nur die letzten beiden Versionen werden unterstützt.)

**Ist die Schaltfläche Freigeben jetzt in Google Docs verfügbar?**

Die Schaltfläche **Freigeben** ist voll funktionsfähig.

**Ein leerer Bildschirm oder eine Warnung, dass Sie die Berechtigung zum Zugreifen auf ein Element benötigen, wird angezeigt.**

Möglicherweise gibt es einen Konflikt zwischen den Google OAuth-Anmeldeinformationen, die in Ihrem Alfresco Share-Konto hinterlegt sind, und denen, mit denen Sie versucht haben, das Dokument zu öffnen, oder mit denen Sie derzeit bei Google angemeldet sind. Melden Sie sich von Ihrem Google-Konto ab, und melden Sie sich wieder bei dem ursprünglichen Konto an, mit dem das Dokument bearbeitet wurde.

**Ihr Dokument wird 'heruntergestuft'.**

Wenn Sie versuchen, ein Dokument zu bearbeiten, das in Google Docs importiert werden kann, Google Ihnen jedoch nicht erlaubt, es im gleichen Format zu exportieren, wird eine Meldung angezeigt, die darauf hinweist, dass Ihr Dokument heruntergestuft wird. Dies sollte eher 'hochgestuft' als 'heruntergestuft' lauten.

**Dokumente, die verworfen oder in Alfresco Share gespeichert wurden, sind in Google Drive weiterhin sichtbar.**

Google hat Verbesserungen vorgenommen, so dass dies kein Problem mehr sein sollte.

**Die Option In Google Docs bearbeiten ist nicht verfügbar.**

Unter bestimmten Umständen ist die Option **In Google Docs bearbeiten** nicht verfügbar. Dies kann zum Beispiel der Fall sein, wenn Sie versuchen, Dokumente oder Tabellenkalkulationen mit einer Größe von mehr als 2 MB und Präsentationen mit einer Größe von mehr als 50 MB zu bearbeiten, oder wenn die Bearbeitung des Dateityps nicht unterstützt wird. Die Option wird nicht angezeigt, wenn Sie keine Schreibberechtigung für das Dokument haben. Die Option **In Google Docs bearbeiten** ist bei Verwendung von IE8 ebenfalls nicht verfügbar.

**Google Docs-Tabellen scheinen abgeschnitten zu sein.**

Wenn Sie eine Tabellenkalkulation in Google Docs erstellen, in Alfresco Share speichern und sie anschließend erneut in Google bearbeiten, können die Zeilen und Spalten abgeschnitten erscheinen. Die Tabellenkalkulation ist jedoch weiterhin voll funktionsfähig, und Sie können neue Zeilen und Spalten in Google Docs hinzufügen. Wenn Sie das Dokument in Excel öffnen, können Sie sehen, dass es nicht abgeschnitten ist.

Das Problem wird dadurch verursacht, dass Google den Datei-Inhalt auf ein Minimum optimiert, so dass sie mit einer kleineren Dateigröße übertragen werden kann.

**Warum wurde der Dokumententitel nicht aktualisiert, nachdem ich das Dokument wieder eingecheckt habe?**

Es gibt eine Verzögerung zwischen der Speicherzeit des Titels und dem Zeitpunkt, zu dem er über die Google-API verfügbar ist. Wenn Sie das Dokument nach einer Titeländerung schnell speichern, kann dies dazu führen, dass der Titel nicht in Alfresco Share aktualisiert wird, wenn Sie das Dokument wieder einchecken.

**Meldungen der Art Es ist etwas schief gegangen... Bitte neu laden und Die Datei ist nicht vorhanden werden angezeigt.**

Wenn Sie ein Google Docs-Formular in Alfresco Share bearbeiten oder anzeigen, wird es temporär in Google Docs gespeichert. Wenn es eingecheckt oder die Bearbeitung in Share abgebrochen wird, wird diese temporäre Version aus Google Drive entfernt und ist nicht mehr verfügbar. Sie können über Share auf die Datei zugreifen.


### Bearbeiten von Datei- und Ordnereigenschaften {#editing-file-and-folder-properties}

Bearbeiten Sie die grundlegenden Details eines Ordners oder eine Datei, um Namen, Beschreibung und Tags zu ändern.

> **Hinweis:** Falls dem ausgewählten Ordner oder der ausgewählten Datei der Aspekt *Klassifizierbar* zugewiesen ist, ist eine weitere Option **Kategorien** verfügbar.

1.  Bewegen Sie den Mauszeiger auf eine Datei oder einen Ordner und klicken Sie auf **Eigenschaften bearbeiten**.

    Im Dialogfeld **Eigenschaften bearbeiten** werden die grundlegenden Metadaten für das Element angezeigt. Mit dem Link **Alle Eigenschaften** in der oberen rechten Ecke können alle für das Element verfügbaren Eigenschaften angezeigt werden.

2.  Bearbeiten Sie die Details.

    Der **Name** unterstützt die folgenden Sonderzeichen nicht: `* " < > \ / ? :` und `|`.

    > **Hinweis:** Der Name kann einen Punkt beinhalten, solange er nicht das letzte Zeichen ist.

3.  Klicken Sie unter dem Label **Tags** auf **Auswählen*, um die Tag-Zuordnungen zu bearbeiten. Sie können vorhandene Tags hinzufügen und entfernen oder neue Tags erstellen.

    In der linken Spalte auf der Seite **Auswählen** werden die in diesem Netzwerk verwendeten Tags aufgeführt. In der rechten Spalte werden die bereits dem Ordner oder Element zugeordneten Tags angezeigt.

    1.  **Erstellen Sie ein neues Tag:** Geben Sie den Tag-Namen ein und klicken Sie auf das Symbol **Neues Objekt erstellen** ![Create Tag icon]({% link content-services/images/ico-create-tag.png %}) (oder drücken Sie die EINGABETASTE). Erstellen Sie die Tags nacheinander. Das Tag kann ein einzelnes Wort oder auch eine Wortfolge sein.

    2.  **Fügen Sie ein vorhandenes Tag hinzu:** Suchen Sie ein Tag in der linken Spalte und klicken Sie auf das Symbol **Hinzufügen** ![Add Tag icon]({% link content-services/images/ico-add-tag.png %}), um es dem aktuellen Ordner oder Element zuzuordnen.

    3.  **Entfernen Sie ein vorhandenes Tag:** Suchen Sie ein Tag in der rechten Spalte und klicken Sie auf das Symbol **Entfernen** ![Remove Tag icon]({% link content-services/images/ico-remove-tag.png %}).

    4.  Klicken Sie auf **OK**, um die Änderungen zu speichern.

    >**Tipp:** Sie können Tags hinzufügen, bearbeiten und löschen, indem Sie den Mauszeiger auf vorhandene Tags oder die Beschreibung **Keine Tags** in der Dokumentenbibliothek verschieben.

4.  Klicken Sie auf **Speichern**.


### Hochladen neuer Versionen {#uploading-new-versions}

Sie können Inhalte von Ihrem Computer hochladen, um eine Datei zu aktualisieren.

Führen Sie diese Aktion für eine von Ihnen gesperrte Datei aus, wird der Inhalt aktualisiert und die Sperre wird gleichzeitig entfernt. Diese Aktion ist auch für eine nicht gesperrte Datei möglich, um sie zu aktualisieren, ohne sie zuerst in den Computer herunterzuladen.

1.  Suchen Sie die zu aktualisierende Datei.

    > **Hinweis:** In der Ansicht **Ich bearbeite** wird die von Ihnen zur Bearbeitung gesperrte Datei angezeigt.

2.  Bewegen Sie den Mauszeiger auf die Datei und klicken Sie auf **Mehr** und dann auf **Neue Version hochladen**.

3.  Klicken Sie im Dialogfeld **Datei aktualisieren** auf **Dateien zum Hochladen auswählen**.

4.  Suchen Sie die aus Ihrem Computer hochzuladenden Datei und wählen Sie sie aus.

    > **Hinweis:** Wenn Sie eine Datei mit einem anderen Namen oder Dateityp auswählen, wird diese angezeigt. Sie können wie im nächsten Schritt fortfahren, abbrechen oder eine andere Datei zum Hochladen auswählen. Wenn Sie fortfahren, wird der hochgeladene Dateiname und/oder Dateityp verwendet.

5.  Geben Sie an, ob es sich um eine geringere oder größere Revision handelt.

6.  Fügen Sie im Feld **Kommentare** alle für die Aktualisierung relevanten Informationen hinzu.

7.  Klicken Sie auf **Hochladen**.

8.  Gibt die Statusanzeige an, dass das Hochladen abgeschlossen ist, klicken Sie auf **OK**.

    Mit der Aktualisierung einer gesperrten Datei wird diese entsperrt und aus der Ansicht **Ich bearbeite** entfernt.


## Herunterladen von Dateien {#downloading-files}

Sie können Dateien schnell aus Alfresco Share herunterladen, um eine lokale Kopie zu erstellen.

> **Wichtig:** Wenn Sie eine gesperrte Datei auswählen, laden Sie tatsächlich die letzte Version herunter, die Share hinzugefügt wurde. Diese ist möglicherweise veraltet. Der Benutzer, der sie zur Bearbeitung gesperrt hat, verfügt möglicherweise außerhalb von Share über eine neuere Version der Datei.

1.  Bewegen Sie den Mauszeiger auf eine Datei/einen Ordner, und klicken Sie auf **Herunterladen**/**Als ZIP herunterladen**.

    Sie werden aufgefordert, die Datei zu öffnen oder zu speichern. Abhängig von Ihren Browser-Einstellungen wird die Datei möglicherweise automatisch an einem Standardspeicherort auf Ihrem Computer gespeichert.

2.  Speichern Sie die Datei auf Ihrem Computer.

    >**Tipp:** Sie können auch mehrere Dateien und/oder Ordner auswählen und aus dem Menü **Ausgewählte Elemente** als **Zip herunterladen**.

    >**Tipp:** Handelt es sich bei einer Datei um eine Microsoft Office-, PDF- oder andere textbasierte Datei (kein Bild oder Video), können Sie sie auch in ihrem Originalformat oder als PDF in die Dateivorschau **herunterladen**.


## Freigeben von Dateien {#sharing-files}

Sie können eine Datei problemlos freigeben, auch für Mitarbeiter, die kein Alfresco Share-Konto haben. Wenn Sie auf die Aktion **Freigeben** klicken, wird eine URL generiert, die Sie per E-Mail senden oder über soziale Netzwerke veröffentlichen können.

Mitarbeiter mit Zugriff auf die URL können die Datei anzeigen. Die Mitarbeiter mit einem Share-Konto können sich anmelden. Mitarbeiter ohne Konto können eines erstellen.

Diese Option ist in der detaillierten Ansicht der Dokumentenbibliothek und in der Dateivorschau verfügbar. Klicken Sie in den grafischen Ansichten der Dokumentenbibliothek auf ![Information icon]({% link content-services/images/ico-information.png %}), um die Option anzuzeigen.

1.  Suchen Sie in der **Dokumentenbibliothek** die freizugebende Datei.

    Sie können nur Dateien freigeben, keine Ordner.

2.  Klicken Sie auf **Freigeben** ![Share icon]({% link content-services/images/ico-share.png %}).

    Es wird ein Fenster mit der URL für diese Datei angezeigt.

    >**Tipp:** Mit der Aktion **Anzeigen** können Sie eine Vorschau der Datei anzeigen lassen, um sicherzustellen, dass es sich um den freizugebenden Inhalt handelt.

3.  Klicken Sie auf das Symbol, das Ihre Freigabemethode widerspiegelt.

    > **Hinweis:** Sie können den Link auf kopieren und an beliebiger Stelle einfügen, wie zum Beispiel in eine E-Mail oder ein Dokument.

    Wenn Sie eine Freigabeoption auswählen, wird eine Ihrer Auswahl entsprechende Seite angezeigt.

4.  Geben Sie die Details in der angezeigten Seite ein und teilen Sie den Link.

    -   E-Mail: Betreff und Text der E-Mail sind bereits für Sie ausgefüllt. Fügen Sie einen Empfänger hinzu und bearbeiten Sie gegebenenfalls die Nachricht und senden Sie sie dann.
    -   Facebook: Schreiben Sie einen Kommentar, der mit dem Link gepostet werden soll, und geben Sie an, wie Sie ihn teilen möchten. Klicken Sie auf **Link teilen**.
    -   Twitter: Bearbeiten Sie gegebenenfalls die Nachricht und klicken Sie auf **Tweet**.
    -   Google+: Schreiben Sie einen Kommentar, der mit dem Link gepostet werden soll, und geben Sie an, mit wem Sie ihn teilen möchten. Klicken Sie auf **Freigeben**.

    >**Tipp:** Wenn es sich bei einer Datei um einen Microsoft Office-, PDF- oder einen anderen textbasierten Dateityp handelt (nicht um ein Bild oder Video), können Sie auch in der Dateivorschau auf ![Advanced Search icon]({% link content-services/images/ico-link.png %}) klicken, um einen Link zum Element zu teilen, und sogar **Link für aktuelle Seite** auswählen.

### Abbrechen eines freigegebenen Links {#cancelling-a-shared-link}

Soll Ihr öffentlich freigegebener Link nicht mehr verfügbar sein, können Sie den Link aufheben. Nachdem Sie einen Link ungültig gemacht haben, kann niemand mehr auf die öffentliche Seite zugreifen.

1.  Suchen Sie die zuvor freigegebene Datei.

2.  Klicken Sie auf **Freigegeben**.

    Das Fenster mit der URL des Elements wird angezeigt.

3.  Klicken Sie auf **Freigabe aufheben**.


## Anwenden von Aspekten {#applying-aspects}

Mit Aspekten können Sie zusätzliche Funktionen, Eigenschaften oder Optionen zu Dateien hinzufügen. Alfresco Share stellt eine Liste der Standardaspekte bereit.

Eine detaillierte Liste der verfügbaren Aspekte und ihrer Funktion finden Sie unter [Über Aspekte]({% link content-services/5.2/config/repository.md %}#about-aspects).

1.  Wählen Sie eine Datei aus, um sie in der Dateivorschau zu öffnen.

2.  Klicken Sie in der Liste der Dokumentenaktionen auf **Aspekte verwalten**.

    Die Seite **Aspekte** wird geöffnet.

3.  Klicken Sie in der Liste **Verfügbar zum Hinzufügen** neben den Aspekten, die Sie der Datei hinzufügen möchten, auf ![Add icon]({% link content-services/images/ico-add.png %}).

    Klicken Sie auf ![Delete icon]({% link content-services/images/ico-delete.png %}), um alle vorhandenen Aspekte aus der Liste **Aktuell ausgewählt** zu entfernen.

4.  Klicken Sie auf **Änderungen anwenden**.

    Die ausgewählten Aspekte werden auf die Datei angewendet. Der Datei hinzugefügte zusätzliche Eigenschaften werden in der Dateivorschau angezeigt. Sie können diese Eigenschaften mit **Eigenschaften bearbeiten** unter **Dokumentenaktionen** bearbeiten. 


## Verwalten von Datei- und Ordnerberechtigungen {#managing-file-and-folder-permissions}

Sie können für alle Inhalte, die Sie der Dokumentenbibliothek hinzufügen, die standardmäßigen Site-Berechtigungen überschreiben. Hiermit können Sie steuern, was Site-Mitglieder sehen und welche Aktionen Sie für Ihren Inhalt ausführen können.

Jedem Benutzer ist in der Site eine Rolle zugewiesen: Manager, Mitarbeiter, Beitragender oder Verbraucher. Jede Rolle verfügt über einen Standardsatz Berechtigungen. Hiermit werden die Aktionen gesteuert, die Site-Mitglieder [auf der Site ausführen]({% link content-services/5.2-de/using/permissions.md %}) können.

Die Funktion **Berechtigungen verwalten** fällt nicht unter die Site-Berechtigungen. Hiermit können Sie die Site-Rolle eines Benutzers für ein bestimmtes Inhaltselement oder einen Ordner überschreiben. Das heißt, Sie können einem Site-Mitglied umfangreicheren oder weniger umfangreichen Zugriff auf bestimmten Inhalt geben als für andere Inhalte in der Bibliothek.

Dies kann sehr hilfreich sein, um Inhalte auszublenden oder nur auf eine bestimmte Gruppe Site-Mitglieder zu beschränken.

> **Hinweis:** Denken Sie daran, ihren Inhalt zu schützen. Falls Sie jemandem Zugriff auf eine Datei oder einen Ordner geben, sieht diese Person den Navigationsverlaufspfad dorthin, auch wenn sie keinen Zugriff auf den übergeordneten Ordner hat.

![Local permissions privacy]({% link content-services/images/local-permissions-privacy.png %})

> **ACHTUNG:**
> Geben Sie Benutzern keine Berechtigungen, die keine Site-Mitglieder sind, da dies Probleme mit der Dokumentenbibliothek nach sich ziehen kann.

1.  Verschieben Sie den Mauszeiger auf eine Datei/einen Ordner in der Bibliothek und klicken Sie auf **Mehr** und dann auf **Berechtigungen verwalten**.

2.  Verwalten Sie die geerbten Berechtigungen:

    -   **Berechtigungen erben Ein** ![Inherit Permissions On]({% link content-services/images/ico-enabled-on.png %}) gibt an, dass Berechtigungen vom übergeordneten Ordner geerbt werden. Klicken Sie auf diese Schaltfläche, um die vererbten Berechtigungen zu ignorieren.
    -   **Berechtigungen erben Aus** ![Inherit Permissions Off]({% link content-services/images/ico-enabled-off.png %}) gibt an, dass keine Berechtigungen vom übergeordneten Ordner geerbt werden. Klicken Sie auf diese Schaltfläche, um die Berechtigungen zu erben.
3.  Verwalten Sie die lokalen Berechtigungen:

    1.  Klicken Sie auf **Benutzer hinzufügen**.

    2.  Suchen Sie nach dem Benutzer, für den Sie Berechtigungen definieren möchten.

    3.  Klicken Sie auf **Suche** oder drücken Sie die EINGABETASTE.

        Die Suche liefert eine Liste mit Benutzern.

    4.  Klicken Sie auf **Hinzufügen**, um einen Benutzer der Tabelle **Lokal eingestellte Berechtigungen** hinzuzufügen. Dem Benutzer erhält die Rolle **Verbraucher**.

    5.  Ändern Sie die Rolle nach Bedarf.

    6.  Wiederholen Sie diesen Schritt, um weitere Benutzer hinzuzufügen und ihre Berechtigungen für denselben Inhalt festzulegen.

        > **Hinweis:** Möchten Sie die Berechtigungen für einen Benutzer rückgängig machen, klicken Sie in der Spalte **Aktionen** auf **Löschen**.

4.  Klicken Sie auf **Speichern**.


## Inhaltseigentümer werden {#becoming-content-owner}

Sie können das Eigentum an Dateien und Ordnern von anderen Benutzern übernehmen.

Dies kann notwendig werden, wenn jemand, der das Eigentum an einer Datei oder einem Ordner hatte, das Unternehmen verlassen hat und Sie die Verantwortung dafür übernehmen müssen.

> **Hinweis:** Sie müssen Site-Manager sein oder die Berechtigung zum Löschen einer Datei oder eines Ordners haben, um Eigentümer zu werden, siehe [Benutzerrollen und Berechtigungen]({% link content-services/5.2-de/using/permissions.md %}).

1.  Klicken Sie auf eine Datei, um die Dateivorschau zu öffnen.

    >**Tipp:** Wenn Sie das Eigentum an einem Ordner übernehmen, müssen Sie den Mauszeiger darauf verschieben und **Details anzeigen** auswählen.

2.  Klicken Sie auf **Eigentümer werden** und wählen Sie **OK**.

    Sie haben nun die vollen Eigentumsrechte an der Datei/dem Ordner.


## Ändern des Inhaltstyps {#changing-the-content-type}

Sie können den Inhaltstyp einer Datei von der Standardeinstellung in einen spezifischeren Wert ändern.

Sie können den Inhaltstyp nur ändern, wenn Ihr Alfresco-Administrator die Inhaltstyp-Eigenschaften so konfiguriert hat, dass Sie eine Datei durch die Angabe eines Typs optimieren können (z. B. Ändern eines Standarddokuments in ein Richtliniendokument).

1.  Klicken Sie auf eine Datei, um sie in der Dateivorschau zu öffnen.

2.  Klicken Sie in der Liste **Dokumentaktionen** auf **Typ ändern**.

    Das Dialogfeld **Typ ändern** wird aufgerufen.

3.  Wählen Sie den gewünschten Typ aus.

    > **Hinweis:** Die Liste **Neuer Typ** ist leer. Typen müssen zunächst von einem Alfresco-Administrator definiert werden.

4.  Klicken Sie auf **OK**.

    Wenn Sie einer Datei eine Typ-Eigenschaft zugewiesen haben, wird diese sowohl in der Dateivorschau als auch im Bildschirm **Eigenschaften bearbeiten** für die Datei angezeigt.

### Arbeiten mit replizierten Inhalten {#working-with-replicated-content}

Alfresco Content Services-Administratoren können Alfresco Content Services-Systeme so konfigurieren, dass Inhalte über mehrere Repositorys hinweg repliziert werden. Für Dateien und Ordner, die als Ergebnis eines Replikationsjobs erstellt wurden, wird das Symbol **Aus einem anderen Repository übertragen** in der Dateiliste angezeigt.

Dieses Symbol zeigt an, dass es sich um replizierten und nicht den ursprünglichen Inhalt handelt. Je nach Übertragungskonfiguration kann der Inhalt schreibgeschützt sein.

Inhalte, die mit diesem Symbol gekennzeichnet sind, zeigen auch die Aktion **In Quell-Repository anzeigen** an. Wählen Sie diese Aktion, um den Dateivorschaubildschirm für die zugehörige **ursprüngliche** Inhaltsdatei oder den zugehörigen Ordner anzuzeigen.
