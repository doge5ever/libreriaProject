const booksSeed = require('../seed/booksSeed');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  getBooks: (req, res) => {
    if (req.query.random) {
      Book
      .aggregate(
        [{ $sample: { size: +req.query.length } }])
      .then((docs) => 
        res.json(docs))
      .catch((err) => {
        console.log(err)
      });
    } else {
      searchInFields = ['title'];
      keywords = req.query.keywords ? req.query.keywords.split(' ') : ['.'];
      sort = "titleAlpha"
      selectFields = ['title', 'rating', 'price']
      searchQueryParams = [];
      sortParams = [];

      searchInFields.forEach((field) => {
        keywords.forEach((keyword) => {
          searchQueryParams.push({
            [field] : {
              $regex: keyword,
              $options: 'i'
            }
          })
        })  
      });

      switch (sort) {
        case 'titleAlpha':
          sortParams.push(['title', 1])
      }
      Book
        .find({
          $or: searchQueryParams,
          rating: {$gte: req.query.rating ? req.query.rating : 1},
          price_USD: {
            $gte: req.query.min ? +req.query.min : 0,
            $lte: req.query.max ? +req.query.max : Number.MAX_VALUE,
          },
        }, selectFields)
        .sort(sortParams)
        .limit(+req.query.length)
        .then((docs) => {
          console.log("Sent data.")
          res.json(docs)
        })
        .catch((err) => {
          console.log(err)
        });
      }
    }
  }

