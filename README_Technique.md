# Handwritting – Application de dessin à main levée (Angular)

##  Présentation du projet

**Nom** : Handwritting  
**Objectif** : Permettre à l'utilisateur de dessiner à main levée dans le navigateur, avec la possibilité d’annuler, refaire et exporter le dessin au format SVG.  
**Type de projet** : Application web front-end  
**Technologies** : Angular, HTML, CSS

---

##  Fonctionnalités principales

-  Dessin libre sur un canvas
-  Annuler / Refaire (Undo / Redo)
-  Export en SVG
-  Interface avec outils via une sidebar

---

## 📁 Structure du projet

```plaintext
src/
├── app/               → Composant principal
├── bottom-btn/        → Contient les boutons Undo / Redo
├── services/          → Service qui connecte la sidebar au canvas
├── side-bar/          → Barre d’outils (sélection de l’action : crayon, gomme, etc.)
├── top-bar/           → Contient le bouton d’export SVG
├── index.html         → Page principale
├── main.ts            → Point d’entrée Angular
└── styles.css         → Feuilles de style globales
```

---

##  Composants & rôles

| Composant     | Rôle                                                                 |
|---------------|----------------------------------------------------------------------|
| `app/`        | Composant racine                                                     |
| `side-bar/`   | Contient les outils de dessin (ex : crayon, gomme)                  |
| `top-bar/`    | Contient le bouton **"Exporter en SVG"**                            |
| `bottom-btn/` | Contient les boutons **Undo / Redo**                                 |
| `services/`   | **Service de liaison** entre la sidebar et le canvas (transmet les actions sélectionnées) |

---

##  Installation & Lancement

```bash
# 1. Cloner le projet
git clone https://github.com/ton-repo/handwritting.git
cd handwritting

# 2. Installer les dépendances
npm install

# 3. Lancer le projet
ng serve

# 4. Accéder à l'application
http://localhost:4200
```

---

##  Remarques

- Le projet est 100% front-end, aucune base de données ni backend.

---

##  Évolutions possibles (V2 ?)

?


---

##  Auteurs

Projet réalisé dans le cadre d’un exercice Angular par Maelle, Anselme, Maxance et Noah – 2025