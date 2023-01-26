const Sauce = require("../models/sauces");
const fs = require("fs");

exports.NewSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.GetSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.OneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

exports.ChangeSauce = (req, res, next) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.DelSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.Like = (req, res, next) => {
  switch (req.body.like) {
    case 1:
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: req.body.like++ },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Like ajouté" }))
        .catch((error) => res.status(400).json({ error }));
      break;
    case -1:
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: req.body.like++ * -1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then((sauce) => res.status(200).json({ message: "Dislike ajouté" }))
        .catch((error) => res.status(400).json({ error }));
      break;
    case 0:
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Like annulé" });
              })
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then((sauce) => {
                res.status(200).json({ message: "Dislike annulé" });
              })
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
  }
};


  

/*

exports.NewSauce = (req, res, next) => {
    delete req.body._id;
    const produit = new Produit({
        ...req.body
    });
    produit.save()
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.modifierProduit = (req, res, next) => {
    Produit.updateOne({ _id: req.params.id  }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({  message : 'Sauce modifiée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.supprimerProduit = (req, res, next) => {
    Produit.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
        .catch(error => res.status(400).json({ error }));
};

exports.RecupererUnProduit = (req, res, next) => {
    Produit.findOne({ _id: req.params.id  })
        .then(produit => res.status(200).json(produit))
        .catch(error => res.status(404).json({error}));
};

exports.RecupererTousLesProduits = (req, res, next) => {
    Produit.find()
        .then(produits => res.status(200).json(produits))
        .catch(error => res.status(400).json({ error }));
};

*/