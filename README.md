# StudyBuddy – Lab 04

StudyBuddy ist eine Webanwendung, mit der Lernende ein persönliches Profil erstellen können, um passende Lernpartner zu finden. Die Anwendung erlaubt es, Lern- und Lehrthemen anzugeben, Profile anderer Nutzer zu sehen und Lernpartner zu finden.

# Projektbeschreibung & User Stories

# Ziel des Projekts

Eine einfache, responsive Web-App mit folgenden Funktionen:

1.Benutzerprofil anzeigen
2.Lern-/Lehrthemen verwalten
3.Community-Bereich mit anderen Nutzern
3.Einheitliches Layout mit Sidebar und Suche

# User Stories

# Benutzerprofil
1.Als Benutzer möchte ich mein Profil anzeigen lassen, mit Sprachen, Themen und Lernpräferenzen.
2. Als Benutzer möchte ich sehen, welche Themen ich lernen und welche ich unterrichten kann.

# Community
1. Als Benutzer möchte ich eine Liste anderer Mitglieder sehen, um passende Lernpartner zu finden.
2. Als Benutzer möchte ich mit anderen Benutzern in Kontakt treten (Buttons: "Details", "Nachricht").

# Layout
1. Als Benutzer möchte ich eine feste Sidebar mit Navigation und ein Suchfeld im Header.
2. Als Benutzer möchte ich ein leichtes und intuitives Design.

# Technik
1. Als Entwickler möchte ich Express durch Next.js ersetzen.
2. Als Entwickler möchte ich API-Routen nutzen und Server Side Rendering mit `getServerSideProps`.
3.Als Entwickler möchte ich das Projekt in Docker betreiben können.


# Technische Umsetzung

1.Umstellung des Express/Handlebars-Projekts auf Next.js.
2.Globale Layoutstruktur über `_app.tsx` und `Layout.tsx`.
3.Bootstrap und eigene Styles via `import` eingebunden (Wahrscheinlich sp'ter zu tailwind).
4.Zwei Hauptseiten (`/profile`, `/community`) als SSR-React-Komponenten mit echten API-Calls.
5.Serverseitige Datenversorgung über `getServerSideProps`.
6.Docker-Support mit multistage `Dockerfile`.

# Technische Probleme & Lösungen

# Problem 1: `next build` schlägt fehl wegen `<link>`
Ursache war `<link rel="stylesheet">` in Komponenten (verboten in Next.js)
Unsere Lösung ist Alle Styles via `import` in `_app.tsx` geladen

# Problem 2: `bootstrap.min.css` nicht gefunden
Die Ursache war Bootstrap war nicht im Projekt installiert
Unsere Lösung `npm install bootstrap` + korrekter Import in `_app.tsx`

# Problem 3: Docker build schlägt fehl (RUN npm run build)
Ursache: ESLint-Fehler (nicht verwendete Head-Importe in profile.tsx und community.tsx)
Lösung: Nicht verwendete Head-Importe entfernt, ESLint-Fehler behoben

# Problem 4: Fehlende Bootstrap-Abhängigkeit im Container
Ursache: bootstrap/dist/css/bootstrap.min.css nicht installiert , Module not found
Lösung: Bootstrap mit npm install bootstrap installiert und Dockerfile neu gebaut

# Problem 5: falscher Docker-Kontext oder Verzeichnis
Ursache: Dockerfile wurde im falschen Verzeichnis oder mit falschem Kontext ausgeführt
Lösung: Verzeichnisstruktur überprüft, Dockerfile in Projektroot verschoben und docker build -t study-buddy . erneut ausgeführt

Als Ergebnis
Docker Image erfolgreich gebaut (study-buddy:latest)
docker run hello-world getestet, Docker funktioniert
Image ist jetzt bereit für Deployment oder Weiterentwicklung.


