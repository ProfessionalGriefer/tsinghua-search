# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

from scrapy import Field, Item


class CourseItem(Item):
    # define the fields for your item here like:
    title_en = Field()
    title_cn = Field()
    number = Field()
    sequence = Field()
    credit = Field()
    department = Field()
    instructor = Field()
    time = Field()
    features = Field()
    remarks = Field()

    link = Field()
    description_en = Field()
    description_cn = Field()

    id = Field()
