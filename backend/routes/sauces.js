const express = require('express');
const router = express.Router();
const multer =  require('../middleware/multer-config')
const auth = require('../middleware/auth')

// On importe le schéma d'un produit (sauce)

const routeCtrl = require('../controllers/sauces')

// On intercepte seulement les requêtes GET ajoute l'url visée par l'application (route) afin que le front end puisse faire une requête vers cet api. On créé deux sauces. On récupère une réponse avec un code 200 et on renvoie nos objets en réponse JSON

router.get('/', routeCtrl.GetSauces)
router.post('/',multer, routeCtrl.NewSauce)

router.get('/:id', routeCtrl.OneSauce)
router.put('/:id', auth, routeCtrl.ChangeSauce)
router.delete('/:id', auth, routeCtrl.DelSauce)
router.post('/:id/like', auth, routeCtrl.Like)

module.exports = router;