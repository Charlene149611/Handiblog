## Projet Handiblog

Créer une plateforme qui recense les catégories de handicaps liés au numérique.  
Création d'articles avec des propositions de solutions.  
Un utilisateur peut créer un article s'il est membre.  
Un utilisateur non authentifié peut lire des articles.  
Un admin a tous les privilèges.

## Souhait du client

Lutter contre la discrimination numérique.

## But de l'application

Promouvoir et sensibiliser à l'utilisation d'un outil adapté à l’handicap.

## Structure du projet

```
Handiblog/
├── config/
│   └── db.js
├── controllers/
│   ├── articlesController.js
│   └── usersController.js
├── middlewares/
│   ├── authMiddleware.js
│   └── upload.js
├── models/
│   ├── articlesModel.js
│   └── usersModel.js
├── public/
│   ├── css/
│   │   └── style.css
│   └── uploads/
│       └── .gitkeep
├── node_modules/
├── routes/
│   ├── articlesRoutes.js
│   └── usersRoutes.js
├── views/
│   ├── _partialFooter.twig
│   ├── _partialHeader.twig
│   ├── article.twig
│   ├── articles.twig
│   ├── home.twig
│   ├── login.twig
│   └── register.twig
├── .gitignore
├── app.js
├── package.json
└── yarn.lock
```

## Projet fil rouge CCP2

Travail de groupe : Hervé, Jon et Charlène.  
Rôles : développeur frontend, développeur backend et documentaliste.  
Durée du projet : 4 semaines  
Livrable : application web

## 📋 Workflow Git collaboratif — branches perso + main

Ce projet est collaboratif avec 3 développeurs :

- Charlène (`charlene`)
- Hervé (`herve`)
- Jon (`jon`)

Chacun travaille sur sa propre branche personnelle, et la branche `main` reste la branche stable et partagée.

---

### 1. Travailler sur sa branche personnelle

- Toujours coder sur ta branche perso (ex : `charlene`)
- Ne pas faire de changements directement sur `main`

---

### 2. Mettre à jour la branche `main` locale

#### Commandes Git utiles

- **Mettre à jour la branche principale locale :**
    ```bash
    git checkout main
    git pull origin main
    ```

- **Mettre à jour ta branche perso avec `main` :**
    ```bash
    git checkout <ta_branche>  # ex: charlene
    git merge main
    ```

- **Pousser ta branche perso sur GitHub :**
    ```bash
    git push origin <ta_branche>
    # ou pour la première fois :
    git push -u origin <ta_branche>
    ```

- **Fusionner ta branche perso dans `main` localement :**
    ```bash
    git checkout main
    git pull origin main
    git merge <ta_branche>
    git push origin main
    ```

- **Supprimer une branche localement :**
    ```bash
    git branch -d <ta_branche>
    ```

- **Supprimer une branche sur GitHub :**
    ```bash
    git push origin --delete <ta_branche>
    ```

- **Changer l’éditeur Git (par exemple, utiliser Nano au lieu de Vim sous Windows) :**
    ```bash
    git config --global core.editor "nano"
    ```

---

## 🛠️ Bonnes pratiques

- Faire des commits réguliers et explicites.
- Toujours relire son code avant de pousser.
- Résoudre les conflits de fusion avant de pousser sur `main`.
- Utiliser des messages de commit clairs et concis.

## 🎨 Design & Accessibilité

L'application adopte un design simple, épuré et accessible :

- **Contrastes élevés** pour la lisibilité.
- **Navigation clavier** facilitée.
- **Balises ARIA** pour l’accessibilité.
- **Responsive** : compatible mobile, tablette et desktop.
- **Police lisible** et taille adaptée.

## 📚 Ressources utiles

- [WCAG — Règles d’accessibilité](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [MDN Web Docs — Accessibilité](https://developer.mozilla.org/fr/docs/Web/Accessibility)
- [GitHub Docs — Git Branches](https://docs.github.com/en/get-started/using-git/about-branches)

---
