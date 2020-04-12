BOT_NAME = 'books_to_scrape'

SPIDER_MODULES = ['books_to_scrape.spiders']
NEWSPIDER_MODULE = 'books_to_scrape.spiders'

# Enable pipelines to be used. Number is the order of the pipeline to be used.
ITEM_PIPELINES = {
    'scrapy.pipelines.images.ImagesPipeline': 1,
    'books_to_scrape.pipelines.CustomImageNamePipeline': 2
}

# Specify the directory where the images will be saved.
IMAGES_STORE = "/scraped_images"

# Include thumbnails for the images.
IMAGES_THUMB = {
    'small': (50, 50),
    'big': (260, 260),
}
