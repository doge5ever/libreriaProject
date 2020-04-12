# -*- coding: utf-8 -*-
import sys
sys.path.append('..')

import scrapy
from scrapy.http import Request
from items import ImageItem


def product_description(response, value):
    # Get the next tag to th where its attribute is text "UPC".
    return response.xpath('//th[text()="' + value + '"]/following-sibling::td/text()').extract_first()

class BooksSpider(scrapy.Spider):
    name = 'books'
    allowed_domains = ['books.toscrape.com']
    start_urls = ['http://books.toscrape.com/']

    def parse(self, response):
        book_rel_urls = response.xpath('//h3/a/@href').extract()
        for rel_url in book_rel_urls:   
            abs_url = response.urljoin(rel_url)
            yield Request(abs_url, callback = self.parse_book)

        next_page_url = response.xpath('//a[text()="next"]/@href').extract_first()
        try:
            absolute_next_page_url = response.urljoin(next_page_url)
            yield Request(absolute_next_page_url)
        except:
            pass

    def parse_book(self, response):
        title = response.xpath("//h1/text()").extract_first()
        tag = response.xpath("//ul[@class='breadcrumb']//li/a/text()").extract()[2]
        image_url = response.xpath("//img/@src").extract_first()
        image_url = image_url.replace("../../","http://books.toscrape.com/")

        rating = response.xpath("//p[contains(@class, 'star-rating')]/@class").extract_first()
        rating = rating.replace("star-rating ", "")
        product_desc = response.xpath("//article/p/text()").extract_first()
        UPC = product_description(response, "UPC")
        product_type = product_description(response, "Product Type")
        price_excl_tax = product_description(response, "Price (excl. tax)")
        price_incl_tax = product_description(response, "Price (incl. tax)")
        tax = product_description(response, "Tax")
        availability = product_description(response, "Availability")
        number_of_reviews = product_description(response, "Number of reviews")

        yield {
            'title': title,
            'tag': tag,
            'rating': rating,
            'product_desc': product_desc,
            'UPC': UPC,
            'product_type': product_type,
            'price_excl_tax': price_excl_tax,
            'price_incl_tax': price_incl_tax,
            'tax': tax,
            'availability': availability,
            'number_of_reviews': number_of_reviews,
        }
        # Used to download the image of the book cover where the file name is the UPC.
        Images = ImageItem()
        Images['image_urls'] = [image_url]
        Images['image_name'] = UPC
        yield Images
