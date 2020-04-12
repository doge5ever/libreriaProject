# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

# Used to download images. Refer to pipelines and the settings to see how the pipeline is set up to download the images.
class ImageItem(scrapy.Item):
    images = scrapy.Field()
    image_urls = scrapy.Field()
    image_name = scrapy.Field()
