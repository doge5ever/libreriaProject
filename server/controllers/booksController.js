const booksSeed = require('../seed/booksSeed');
const mongoose = require('mongoose');
const Book = mongoose.model('Book');

module.exports = {
  getSingleBook: (req, res) => {
    console.log('Received the product ID:', req.params.product_id)
    Book
      .findOne({product_id: req.params.product_id})
      .then((doc) => {
        if (doc) {
          console.log('Found product. Sent data.')
        } else {
          console.log('Product not found. Sent data.')
        }
        res.json(doc)
    })
    .catch((err) => {
      console.log(err)
    });
  },

  getBooks: (req, res) => {
    console.log('Received the following query parameters:', req.query)

    // THIS SHOULD THROW AN ERROR WHEN BOTH SELECT AND DESELECT ARE PROVIDED.
    // RIGHT NOW, WE OVERRIDE THE VALUE OF DESELECT WHEN BOTH SELECT AND 
    // DESELECT ARE PROVIDED.
    let selectString = '';
    if (req.query.select) {
      if (Array.isArray(req.query.select)) {
        req.query.select.forEach((field) => {
          selectString += field + ' ';
        });
      } else {
        selectString += req.query.select;
      }
    } else {
      if (req.query.deselect) {
        if (Array.isArray(req.query.deselect)) {
          req.query.select.forEach((field) => {
            selectString += '-' + field + ' ';
          });
        } else {
          selectString += '-' + req.query.deselect;
        }
      }
    }



    // FIX THE SELECTION IN THE RANDOM TO STREAMLINE CODE: https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-project.
    if (req.query.random) {
      projectParams = {};
      if (req.query.select) {
        if (Array.isArray(req.query.select)) { 
          req.query.select.forEach((field) => {
            projectParams[field] = 1;
        })} else {
          projectParams = {[req.query.select]: 1}
        }          
      } else {
        projectParams['nonExistentField'] = 0;
      }
      console.log(projectParams)
      Book
      .aggregate(
        [
          { $sample: { size: +req.query.limit } },
          { $project: projectParams }
        ])
      .then((output) => {
        res.json(output);
        console.log(`Found ${output.total} matches for ${req.query.keywords}. Sent data.`);
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      searchInFields = ['title'];
      keywords = req.query.keywords ? req.query.keywords.split(' ') : ['.'];
      sort = "titleAlpha"

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
        .paginate({
          $or: searchQueryParams,
          tag: req.query.tag ? req.query.tag : /./,
          rating: {$gte: req.query.rating ? +req.query.rating : 1},
          price_USD: {
            $gte: req.query.minPrice ? +req.query.minPrice : 0,
            $lte: req.query.maxPrice ? +req.query.maxPrice : Number.MAX_VALUE,
          },
        }, {
          select: selectString,
          sort: sortParams,
          limit: +req.query.limit,
          page: +req.query.page,
        })
        .then((output) => {
          res.json(output)
          console.log('THIS IS THE QUERY', req.query)
          console.log(`Found ${output.total} matches for '${req.query.keywords}'. Sent data.`)
        })
        .catch((err) => {
          console.log(err)
        });
      }

    }
  }

