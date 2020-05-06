# General Notes

This project aims to demonstrate the skills learned in Software Development, both front-end and back-end using the MEAN Stack, and in Data Science. This project is an online bookstore that will be able to enable users to purchase books online. It will include a recommender system for products and tags, using Natural Language Processing (NLP) techniques and Machine Learning models. 

Data Science techniques will mostly be reflected in Jupyter notebooks where supporting explanations are included. You may check the "books_to_scrape" folder to see how the data were scraped from "books.toscrape.com". We used the Scrapy library where the spider used is "books_to_scrape\spiders\books.py". Before storing data to the database, we process the data using a Jupyter notebook "scraped_data_processing.ipynb". A recommender system for tags was built using NLP techniques, specifically, using GloVe word vectors (recommender_system\recommender_system_tags.ipynb).

# Seed Database

To seed the MongoDB database, execute a GET method to the route "/api/seed-database".