import time
import os
import requests
import uuid
session = requests.Session()
requests.packages.urllib3.disable_warnings()

def download_captcha():
    """
    下载验证码图片
    :param retry:
    :return:
    """

    
    url2 = "https://kyfw.12306.cn/passport/captcha/captcha-check?answer=129%2C122%2C175%2C132&login_site=E&rand=sjrand"
    time.sleep(3)
    r = session.get(url2, verify=False)
    filename = "temp/%s.png" % uuid.uuid4()
    with open(filename, "wb") as file:
        file.write(r.content)
    return filename
		


if __name__ == "__main__": 		
	download_captcha()