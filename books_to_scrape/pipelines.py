# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import os
from urllib.parse import urlparse
from scrapy.http import Request

from scrapy.pipelines.images import ImagesPipeline

# Extend the data ImagesPipeline to include to save the book cover with its file name as its UPC.
class CustomImageNamePipeline(ImagesPipeline):

    def get_media_requests(self, item, info):
        return [Request(x, meta={'image_name': item["image_name"]})
                for x in item.get('image_urls', [])]

    def file_path(self, request, response=None, info=None):
        return '%s.jpg' % request.meta['image_name']