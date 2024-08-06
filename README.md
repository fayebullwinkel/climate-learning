Climate Learning Platform

Willkommen auf der Klimaplattform! Dies ist eine web-basierte Lernplattform, die es Nutzer*innen ermöglicht, mehr über den Klimawandel und Klimaanpassung zu lernen. Diese Applikation verwendet Strapi als Backend und React als Frontend.

Inhaltsverzeichnis

1. Technologien
2. Installation
    - Lokale Installation
    - Docker Installation
3. Nutzung
    - Backend starten
    - Frontend starten
    - Mit Docker starten
4. Verzeichnisstruktur
5. Support und Kontakt

# Technologien

- Backend: Strapi
- Frontend: React
- Containerisierung: Docker

# Installation

## Lokale Installation

Für die lokale Installation werden Node.js und npm benötigt.

1. Repository klonen:
    ```bash
    git clone git@github.com:fayebullwinkel/climate-learning.git
    cd climate-learning
    ```

2. Backend-Abhängigkeiten installieren:
    ```bash
    cd backend
    npm install
    ```

3. Frontend-Abhängigkeiten installieren:
    ```bash
    cd ../frontend
    npm install
    ```

## Docker Installation

Für die Docker-Installation wird Docker benötigt.

1. Repository klonen:
    ```bash
    git clone git@github.com:fayebullwinkel/climate-learning.git
    cd climate-learning
    ```

2. Docker-compose-Datei ausführen:
    ```bash
    docker-compose up --build
    ```

# Nutzung

## Backend starten

In das Backend-Verzeichnis wechseln und der Entwicklungsserver starten:
bash
cd backend
npm run develop

Das Backend wird nun unter http://localhost:1337 laufen.

## Frontend starten

In das Frontend-Verzeichnis wechseln und der Entwicklungsserver starten:
bash
cd frontend
npm run start

Das Frontend wird nun unter http://localhost:3000 laufen.

## Mit Docker starten

Nachdem die `docker-compose`-Datei ausgeführt wurde, sind das Backend unter http://localhost:1337 und das Frontend unter http://localhost:3000 zugänglich.

bash
docker-compose up --build


# Verzeichnisstruktur

Eine Übersicht der wichtigsten Verzeichnisse und Dateien:

``
climate-learning/
│
├── backend/              Strapi Backend
│   └── ...
│
├── frontend/             React Frontend
│   └── ...
│
├── docker-compose.yml    Docker Compose Datei zum Starten der Container
│
├── README.md             Diese Datei
│
└── ...
``

# Support und Kontakt

Falls Fragen bestehen oder auf Probleme gestoßen wird, kann folgender Kontakt genutzt werden:

- Email: faye.bullwinkel@web,de
- GitHub Issues: https://github.com/fayebullwinkel/climate-learning/issues

Wir hoffen, dass diese Plattform nützlich ist und freuen uns über Feedback!