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

    if (req.query.random) {
      Book
        .aggregate(
          [
            { $sample: { size: req.query.limit ? +req.query.limit : 3} },
            { $project: parseProject(req.query) }
          ])
        .then((output) => {
          res.json(output);
          console.log('This is the output: ', output);
        })
        .catch((err) => {
          console.log(err)
        });
    } else {
      Book
        .find({product_id: {
          $in: req.query.product_id
        }}, 
          parseSelect(req.query))
        .then((output) => {
          res.json(output);
          console.log(`Found matches. Sent data.`)
        })
        .catch((err) => {
          console.log(err)
        });
    }
  },
    
  paginateBooks: (req, res) => {
    Book
      .paginate({
        $or: parseKeywords(req.query),
        tag: req.query.tag ? req.query.tag : /./,
        rating: {$gte: req.query.rating ? +req.query.rating : 1},
        price_USD: {
          $gte: req.query.minPrice ? +req.query.minPrice : 0,
          $lte: req.query.maxPrice ? +req.query.maxPrice : Number.MAX_VALUE,
        },
      }, {
        select: parseSelect(req.query),
        sort: parseSort(req.query),
        limit: +req.query.limit,
        page: +req.query.page,
      })
      .then((output) => {
        res.json(output)
        console.log('Received the following query parameters: ', req.query)
        console.log(`Found ${output.total} matches for '${req.query.keywords}'. Sent data.`)
      })
      .catch((err) => {
        console.log(err)
      });
    },

  getTags: (req, res) => {
    Book
      .distinct('tag')
      .then((output) => {
        res.json(output)
        console.log(`Fetched ${output.length} distinct tags. Data sent.`)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

parseKeywords = (params) => {
  searchInFields = ['title'];
    keywords = params.keywords ? params.keywords.split(' ') : ['.'];
    searchQueryParams = [];

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
  return searchQueryParams
};

parseSort = (params) => {
  if (!params.sort) {
    return [['title', 1]]
  }
  sortArray = Array.isArray(params.sort) ? params.sort : [params.sort];
  returnArray = []
  
  sortArray.forEach((param) => {
    switch (params.sort) {
      case 'title':
        returnArray.push(['title', 1]);
        case 'priceAsc':
          returnArray.push(['price_USD', 1]);
        case 'priceDesc':
          returnArray.push(['price_USD', -1]);
        case 'ratingAsc':
          returnArray.push(['rating', 1]);
        case 'ratingDesc':
          returnArray.push(['rating', -1]);
    }
  })
};

parseSelect = (params) => {
  if ((params.select !== undefined) && (params.deselect !== undefined)) {
    throw "Select and deselect query parameters cannot be both defined.";
  }
  
  let selectString = '';
  if (params.select) {
    if (Array.isArray(params.select)) {
      params.select.forEach((field) => {
        selectString += field + ' ';
      });
    } else {
        selectString += params.select;
    }
  } else {
    if (params.deselect) {
      if (Array.isArray(params.deselect)) {
        params.select.forEach((field) => {
          selectString += '-' + field + ' ';
        });
      } else {
        selectString += '-' + params.deselect;
      }
    }
  }
  return selectString;
};

parseProject = (params) => {
  projectParams = {};
      if (params.select) {
        if (Array.isArray(params.select)) { 
          params.select.forEach((field) => {
            projectParams[field] = 1;
        })} else {
          projectParams = {[params.select]: 1}
        }          
      } else {
        projectParams['nonExistentField'] = 0;
      }
  return projectParams;
};