import os
from concurrent.futures import ThreadPoolExecutor
from urllib import request
import re
from urllib.parse import urljoin
from bs4 import BeautifulSoup

import time

# 参数times用来模拟网络请求的时间
def get_html(times):
    time.sleep(times)
    print("get page {}s finished".format(times))
    return times



with ThreadPoolExecutor(max_workers=5) as executor:
    task1 = executor.submit(get_html, (3))
    task2 = executor.submit(get_html, (2))
    # done方法用于判定某个任务是否完成
    print(task1.done())
    # cancel方法用于取消某个任务,该任务没有放入线程池中才能取消成功
    print(task2.cancel())
    time.sleep(4)
    print(task1.done())
    # result方法可以获取task的执行结果
    print(task1.result())

# 执行结果
# False  # 表明task1未执行完成
# False  # 表明task2取消失败，因为已经放入了线程池中
# get page 2s finished
# get page 3s finished
# True  # 由于在get page 3s finished之后才打印，所以此时task1必然完成了
# 3     # 得到task1的任务返回值


