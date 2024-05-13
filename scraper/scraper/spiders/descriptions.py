import scrapy
from scraper.items import CourseItem
from urllib.parse import urlencode

import re
import json


class DescriptionSpider(scrapy.Spider):
    name = "descriptions"

    url = "https://zhjwe.cic.tsinghua.edu.cn/"
    start_urls = []

    def __init__(self, jsessionid="abc4fx4GXWXMZgJGIuR9y"):
        self.jsessionid = jsessionid

    # https://stackoverflow.com/questions/32623285/how-to-send-cookie-with-scrapy-crawlspider-requests
    def request(self, url, callback, body):
        cookies = {"JSESSIONID": self.jsessionid}
        request = scrapy.Request(
            url=url,
            callback=callback,
            cookies=cookies,
            method="POST",
            body=body,
            headers={
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Scroll",
                "Origin": "https://zhjwe.cic.tsinghua.edu.cn",
                "Referer": "https://zhjwe.cic.tsinghua.edu.cn/xkJxs.vxkJxsJxjhBs.do",
                "Sec-Fetch-Site": "same-origin",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            errback=self.handle_failure,
        )
        return request

    def handle_failure(self, failure):
        print("Failure", failure.request.body)
        yield self.request(
            failure.request.url,
            self.parse_item,
            failure.request.body,
        )

    def start_requests(self):
        with open("links.txt", "r") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                self.start_urls.append(self.url + line)

        for url in self.start_urls:
            body = None
            yield self.request(url, self.parse_item, body)

    def parse_item(self, response, **_):
        output = re.findall(r"var gridData.+?\];", response.text, re.S)
        data = re.sub(r"var gridData =", "", output[0])
        data = re.sub(r"\];", r"\]", output[0])
        data = re.sub(re.compile(r"(/\*.*?\*/)", re.DOTALL), "", data)
        with open("output.json", "w") as f:
            f.write(data)
        data = json.loads(data)

        course = CourseItem()
        for row in data:
            course["title_en"] = row[0]

            link = re.findall(r"href='.+?'", row[1])[0]
            course["link"] = re.sub(r"(href=|')", "", link)

            course["title_cn"] = re.sub(r"<.+?>", "", row[1])

            course["number"] = row[2]
            course["sequence"] = row[3]
            course["credit"] = row[4]
            course["department"] = row[5]

            instructor = re.sub(re.compile(r"<.+?>", re.DOTALL), "", row[6])
            course["instructor"] = instructor

            course["time"] = row[7]
            course["features"] = row[8]
            course["remarks"] = row[9]

            yield course
