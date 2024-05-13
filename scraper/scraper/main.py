from typing import Union

from fastapi import FastAPI

import subprocess
import json


app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.get("/courses")
def crawl():
    jsessionid = "abc4fx4GXWXMZgJGIuR9y"
    return json.loads(
        subprocess.check_output(
            [
                "scrapy",
                "crawl",
                "courses",
                "--nolog",
                "-o",
                "-:json",
                "-a",
                f"jsessionid={jsessionid}",
            ]
        )
    )
