## Projet Handiblog

Créer une plateforme qui recense les catégories de handicaps liés au numérique
Création d'article avec des propositions de solutions
Un utilisateur peut créer un article s'il est membre
Un utilisateur non authentifié peut lire des articles
Un admin a tous les privilèges

## Souhait du client 
Lutter contre la discrimination numérique

## But de l'application
Promouvoir et sensibiliser à l'utilisation d'un outil adapté à l'handicap

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