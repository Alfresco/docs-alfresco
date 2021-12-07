---
title: Benutzerrollen und Berechtigungen
---

Mit der Rolle eines Benutzers wird festgelegt, welche Aktionen diese auf einer Site ausführen können. Jede Rolle verfügt über einen Standardsatz Berechtigungen.

Die folgenden Abschnitte werden diese Berechtigungen beschrieben. Allgemein gilt:

-   Manager haben volle Rechte auf alle Inhalte einer Site (sowohl selbst als auch von anderen Site-Mitgliedern erstellte Inhalte).
-   Mitarbeiter haben volle Rechte auf eigene Site-Inhalte. Von anderen Site-Mitgliedern erstellte Inhalte können sie bearbeiten aber löschen.
-   Beitragende haben volle Rechte auf eigene Site-Inhalte. Von anderen Site-Mitgliedern erstellte Inhalte können sie weder bearbeiten noch löschen.
-   Verbraucher haben nur Leserechte für eine Site, können aber keine eigenen Inhalte erstellen.

> **Hinweis:** Neben diesen vier Standardrollen sind an verschiedenen Stellen in Alfresco Share möglicherweise auch andere Rollen verfügbar.

-   Koordinator: Haben volle Rechte auf alle Inhalte (sowohl selbst erstellte als auch von anderen Site-Mitgliedern erstellte Inhalte).
-   Editor: Haben Rechte zum Ändern von Dateieigenschaften und zum Ein- und Auschecken von Dateien, sie können aber keine eigenen Inhalte erstellen.

Ihr Alfresco-Administrator kann auch zusätzliche Rollen hinzufügen.

Site-Manager können eine [Site-Rolle für die Site-Benutzer ändern]({% link content-services/5.2-de/using/sites/index.md %}#changing-a-site-role).

Wenn Sie Mitglied von zwei Benutzergruppen sind, die über unterschiedliche Berechtigungen verfügen, erhalten Sie die Summe aller Berechtigungen. Verfügt beispielsweise Gruppe 1 über die Berechtigung zum Anzeigen einer Datei und Gruppe 2 über die Berechtigung zum Anzeigen und Bearbeiten einer Datei, erhielten Sie die Berechtigung zum Anzeigen und Bearbeiten der Datei.

> **Hinweis:** Site-Inhalt kann definiert werden als jeder Inhalt, der für eine Site erstellt oder dieser hinzugefügt wird. Dies umfasst unter anderem Wiki-Seiten, Blog-Posts, Bibliotheksordner und -elemente, Kalenderereignisse, Diskussionsthemen und Kommentare zu jedem beliebigen Inhalt.

## Dashboard-Berechtigungen

In den folgenden Abschnitten werden die Benutzerberechtigungen für Dashboards (persönliche und Site) und Dashlets detailliert beschrieben.

Jeder Benutzer verfügt über vollen Zugriff auf die im persönlichen Dashboard verfügbaren Symbolleisten- und Dashlet-Funktionen, die im persönlichen Dashboard verfügbar sind.

### Site-Dashboard

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Benutzer zu Site einladen | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site-Dashboard anpassen| | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site-Details bearbeiten | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site anpassen (Komponenten auswählen) | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site verlassen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Site-Dashlets

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| RSS Feed – RSS-Feed-URL konfigurieren | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Datenlisten der Site – Datenliste erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Site-Links – Site-Links erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Web-Ansicht – Web-Ansicht konfigurieren | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Wiki – Wiki-Dashlet konfigurieren | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Dashlet **Übersicht Dateityp auf Site** – Details anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Dashlet **Übersicht Beitragender auf Site** – Details anzeigen und Datumsbereich ändern | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

## Inhaltsberechtigungen

In den folgenden Abschnitten werden die Benutzerberechtigungen für Inhalte detailliert beschrieben.

### Dokumentenbibliothek

Ordner und Dateien:

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Seite mit Ordner-/Elementdetails anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Gefällt mir/Gefällt mir nicht mehr | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Als Favorit markieren/Favoritenmarkierung aufheben | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ordner/Element umbenennen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ordner/Element umbenennen – von anderem Benutzer erstellt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Grundlegende Details bearbeiten – von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Grundlegende Details bearbeiten – von anderem Benutzer erstellt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Benutzerdefinierte Eigenschaften bearbeiten – von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Benutzerdefinierte Eigenschaften bearbeiten – von anderem Benutzer erstellt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kopieren | ![tick image]({% link assets/img/done_24px.svg %}) * | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Verschieben – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Verschieben – Inhalt von anderem Benutzer erstellt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Löschen – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Löschen – Inhalt von anderem Benutzer erstellt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Berechtigungen verwalten – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Berechtigungen verwalten – Inhalt von anderem Benutzer erstellt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Aspekte verwalten – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Aspekte verwalten – Inhalt von anderem Benutzer erstellt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Typ ändern – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Typ ändern – Inhalt von anderem Benutzer erstellt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seiten-URL kopieren | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar hinzufügen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar bearbeiten – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar bearbeiten – Inhalt von anderem Benutzer erstellt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar löschen – Inhalt von Ihnen erstellt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar löschen – Inhalt von anderem Benutzer erstellt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

> **Hinweis:** (1) Ein Benutzer mit der Rolle **Verbraucher** kann einen Ordner oder eine Datei in eine andere Site kopieren, wenn der Benutzer, der die Aktion ausführt, in der Ziel-Site über die Rolle **Manager**, **Mitarbeiter** oder **Beitragender** verfügt.

>**Tipp:** Verbraucher, die zuvor eine Site-Rolle innehatten, mit der Sie Inhalte hinzufügen konnten, behalten ihre vorherigen Berechtigungen für alle von Ihnen hinzugefügten Inhalte.

Nur Ordner:

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Ordner erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ordner lokalisieren | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Regeln im selbst erstellten Ordner verwalten | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Regeln in einem Ordner verwalten, der von einem anderen Benutzer erstellt wurde | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

Nur Dateien:

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Inhalt erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Inhalt hochladen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Inhalt herunterladen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Im Browser anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Neue Version hochladen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Neue Version hochladen – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Neue Version hochladen – von anderem Benutzer gesperrt | | | | |
| Online bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Online bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Inline bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Inline bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Offline bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Offline bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Veröffentlichen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Veröffentlichung zurücknehmen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Auschecken in Google Docs – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Auschecken in Google Docs – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Einchecken in Google Docs – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Einchecken in Google Docs – von anderem Benutzer erstellt/hinzugefügt | | | | |
| Bearbeitung abbrechen – von Ihnen gesperrt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Bearbeitung abbrechen – von anderem Benutzer gesperrt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Originalversion anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Arbeitskopie anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| In Google Docs anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Workflow starten | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Datei lokalisieren | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Vorherige Version herunterladen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Auf vorherige Version zurücksetzen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Kalender

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Ereignis anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Neues Ereignis erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ereignis bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ereignis bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ereignis löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Ereignis löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

### Wiki

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Neue Seite erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite umbenennen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite umbenennen – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seite löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Hauptseite bearbeiten | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Hauptseite umbenennen | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Hauptseite löschen | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Seitendetails anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Vorherige Seitenversion anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Diskussionen

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Neues Thema erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Thema bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Thema bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Thema löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Thema löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Diskussionen anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Antwort hinzufügen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Antwort bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Antwort bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Blog

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Neuen Post erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Post bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Post bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Blog-Post anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Post extern veröffentlichen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Post extern veröffentlichen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Externen Post aktualisieren – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Externen Post aktualisieren – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Externen Post entfernen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Externen Post entfernen – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |

### Links

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Neuen Link erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Link bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Link bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Link löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Link bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Linkdetails anzeigen | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Kommentar löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

### Datenlisten

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Liste erstellen | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Liste bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Liste bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Liste löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Liste löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement hinzufügen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement hinzufügen – von anderem Benutzer erstellt/hinzugefügt| | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement bearbeiten – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement bearbeiten – von anderem Benutzer erstellt/hinzugefügt | | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement duplizieren – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement duplizieren – von anderem Benutzer erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement löschen – von Ihnen erstellt/hinzugefügt | | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) | ![tick image]({% link assets/img/done_24px.svg %}) |
| Listenelement löschen – von anderem Benutzer erstellt/hinzugefügt | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

## Mitgliederberechtigungen

Im folgenden Abschnitt werden die Mitglieder-Berechtigungen detailliert erläutert.

| Berechtigung | Verbraucher | Beitragender | Mitarbeiter | Manager |
| ---------- | :------: | :---------: | :----------: | :-----: |
| Benutzerrolle ändern | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Benutzer aus Site entfernen | | | | ![tick image]({% link assets/img/done_24px.svg %}) |
| Einladung stornieren | | | | ![tick image]({% link assets/img/done_24px.svg %}) |

## Poweruser


Alfresco Share-Poweruser verfügen über zusätzliche Optionen, die für Standardbenutzer nicht verfügbar sind.

Diese Optionen werden zur Verfügung gestellt, wenn Ihr Alfresco-Administrator Ihnen erweiterte Berechtigungen erteilt, indem er Sie bei einer Poweruser-Gruppe anmeldet.

Derzeit sind die folgenden zusätzlichen Optionen verfügbar:

-   Site-Manager
-   Suchmanager

Wenn Sie über die folgenden Berechtigungen verfügen, können Sie über einen zusätzlichen Link in der Symbolleiste auf den Site-Manager und über Bildschirm mit den Suchergebnissen auf den Suchmanager zugreifen.

-   Der Site-Manager steht den Benutzern in den Berechtigungsgruppen `ALFRESCO_ADMINISTRATORS` und `SITES_ADMINISTRATORS` zur Verfügung.
-   Der Suchmanager steht den Benutzern in den Berechtigungsgruppen `ALFRESCO_ADMINISTRATORS` und `ALFRESCO_SEARCH_ADMINISTRATORS` zur Verfügung.

### Site-Manager

Der Site-Manager wird für die Verwaltung von Sites verwendet. Sie haben die Kontrolle über die Sichtbarkeit aller Sites und können Sites löschen oder sich zum Site-Manager ernennen.

> **Hinweis:** Der Site-Manager steht den Benutzern in den Berechtigungsgruppen `ALFRESCO_ADMINISTRATORS` und `SITES_ADMINISTRATORS` zur Verfügung. Wenn Sie Mitglied der Gruppe `ALFRESCO_ADMINISTRATORS` sind, können Sie über die **Admin-Tools** in der Symbolleiste auf den Site-Manager zugreifen. Wenn Sie Mitglied der Gruppe `SITE_ADMINISTRATORS` sind, verfügen Sie in der Symbolleiste über die zusätzliche Option **Site-Manager**.

Der Site-Manager zeigt die Namen und den Status der erstellten Sites an, unabhängig von deren Sichtbarkeitseinstellung. Sie können das Menü **Sichtbarkeit** verwenden, um die Sichtbarkeit einer beliebigen Site zu ändern. Sie können die Sichtbarkeit einer Site z. B. auf **Öffentlich**, **Moderiert** oder **Privat** festlegen. Jede Änderung der Sichtbarkeit, die Sie an einer Site vornehmen, wird sofort übernommen.

Im Menü **Aktionen** sind zwei Möglichkeiten verfügbar:

-   **Site löschen**
-   **Site-Manager werden**

Sie können jede der Sites in der Site-Manager-Liste löschen, indem Sie im Menü **Aktionen** die Option **Site löschen** auswählen. Diese Aktion löscht alle Details und Inhalte der Site.

Die Spalte **Ich bin ein Site-Manager** zeigt die Sites an, für die Sie die Berechtigung als Site-Manager haben. Wenn Sie noch kein Manager einer Site sind, wählen Sie im Menü **Aktionen** die Option **Site-Manager werden**.

### Suchmanager

Mit dem Suchmanager können Sie Details zu vorhandenen Suchfiltern sehen und neue Filter erstellen.

> **Hinweis:** Suchmanager steht den Benutzern in den Berechtigungsgruppen `ALFRESCO_ADMINISTRATORS` und `ALFRESCO_SEARCH_ADMINISTRATORS` zur Verfügung.

Auf den Suchmanager greifen Sie vom Suchergebnis-Bildschirm aus zu. Geben Sie einfach eine ** Suche in das Suchfeld ein, und drücken Sie die EINGABETASTE. Klicken Sie dann auf dem Bildschirm mit den Suchergebnissen auf **Suchmanager**.

> **Hinweis:** Gefilterte Suchergebnisse können mit einem Lesezeichen versehen werden, um einen schnellen und einfachen Zugriff zu ermöglichen.

Alle vorhandenen Filter (einschließlich Standardfilter) werden zusammen mit ihren Details in der Reihenfolge angezeigt, in der sie auf dem Bildschirm der Suchergebnisse angezeigt werden. Sie können die Reihenfolge ändern, indem Sie mit den ![]({% link content-services/images/arrows.png %}) Schaltflächen die Filter in der Reihenfolge nach oben oder unten verschieben.

Klicken Sie auf **Neuen Filter erstellen**, um [neue Suchfilter zu erstellen](#creating-new-search-filters).

Die meisten Filterdetails können bearbeitet werden, indem Sie den Mauszeiger darüber bewegen und auf das angezeigte Symbol ![Configure icon]({% link content-services/images/ico-configure.png %}) klicken.

-   **Filter-ID**

    Die eindeutige ID des Filters. Klicken Sie darauf, um die Details zu bearbeiten.

-   **Filtername**

    Der Name des Filters, der im Suchergebnisbildschirm angezeigt wird. Standardfilter zeigen den internationalisierten Nachrichtenschlüssel und nicht den Filternamen an, der auf dem Bildschirm mit den Suchergebnissen angezeigt wird.

-   **Filtern nach Eigenschaft**

    Die Eigenschaft oder das Feld, auf der bzw. dem der Filter basiert.

-   **Filtertyp**

    Gibt an, wie der Filter im Suchergebnisbildschirm angezeigt wird. Die Standardoption ist **Einfacher Filter**.

-   **Mit Suchergebnissen anzeigen**

    Gibt an, ob der Filter im Suchergebnisbildschirm angezeigt wird. Filter, für die diese Option deaktiviert ist, werden nicht angezeigt. Standardfilter können nicht gelöscht werden und müssen deaktiviert werden, um sie auszublenden.

-   **Standardfilter**

    Gibt an, ob der Filter ein Standardfilter oder ein benutzerdefinierter Filter ist. Standardfilter sind vordefiniert und können nicht gelöscht werden. Sie können diese Filter ausblenden, indem Sie die Option **Mit Suchergebnissen anzeigen** deaktivieren.

-   **Filterverfügbarkeit**

    Die Sites, in denen der Filter verfügbar ist.

### Erstellen neuer Suchfilter

Im Suchmanager können Sie schnell Ihre eigenen angepassten Filter mit einer Vielzahl von Optionen erstellen.

1.  Greifen Sie auf den **Suchmanager** vom Suchergebnis-Bildschirm aus zu und klicken Sie dann auf **Neuen Filter erstellen**.

    >**Tipp:** Sie können auch auf eine vorhandene Filter-ID klicken, um sie zu bearbeiten.

2.  Geben Sie eine eindeutige Kennung für die **Filter-ID** für den neuen Suchfilter ein.

3.  Geben Sie einen **Filternamen** ein. Dies ist der Name des Filters, der im Suchergebnisbildschirm angezeigt wird. Für Standardfilter geben die hier angezeigten Ergebnisse nicht die tatsächliche Anzeige im Suchergebnisbildschirm wieder.

    > **Hinweis:** Angepasste Filter können nicht als **Standardfilter** ausgewählt werden.

4.  Die Option **Mit Suchergebnissen anzeigen** ist standardmäßig ausgewählt. Deaktivieren Sie sie, wenn der Filter nicht in im Suchergebnisbildschirm angezeigt werden soll.

5.  Wählen Sie in der Dropdown-Liste **Filtern nach Eigenschaft** eine Eigenschaft aus, nach der gefiltert werden soll.

6.  Wählen Sie einen **Filtertyp** aus. So wird der Filter im Suchergebnisbildschirm angezeigt. Die Standardoption ist **Einfacher Filter** (ein Kontrollkästchen).

7.  Wählen Sie die Reihenfolge der **Sortieren nach**, in der die Filterergebnisse auf der Suchergebnisseite angezeigt werden sollen.

8.  Wählen Sie die **Anzahl der Filter**, die standardmäßig im Suchergebnisbildschirm angezeigt werden sollen.

9.  Wählen Sie die **Mindestlänge Filter**. Auf diese Weise können Sie kurze Wörter wie **und** und **bis** aus den Filterergebnissen ausschließen.

10. Wählen Sie die **Mind. erforderliche Ergebnisse** aus. Dabei handelt es sich um die Mindestanzahl an Übereinstimmungen, die ein Filterergebnis aufweisen muss, um im Suchergebnisbildschirm angezeigt zu werden.

11. Wählen Sie die Filterverfügbarkeit aus:

    -   **Überall** – in allen Sites sichtbar
    -   **Ausgewählte Sites** – nur in ausgewählten Sites sichtbar Klicken Sie auf ![]({% link content-services/images/ico-add.png %}), um eine Site hinzuzufügen, wählen Sie sie dann aus der Liste aus und klicken Sie zur Bestätigung auf ![]({% link content-services/images/ico-tick.png %}). Klicken Sie auf ![]({% link content-services/images/ico-add.png %}), um bei Bedarf weitere Sites hinzuzufügen.

12. Klicken Sie auf **Speichern**.
