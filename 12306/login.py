import  requests
from PIL import Image
import  json

check_url="https://kyfw.12306.cn/passport/captcha/captcha-check"
ver_url="https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E"
uamtk_url="https://kyfw.12306.cn/otn/uamauthclient"
Uamtk_url="https://kyfw.12306.cn/passport/web/auth/uamtk"
user_url="https://kyfw.12306.cn/otn/login/userLogin"

headers = {'Accept': '*/*',
           'Accept-Language': 'en-US,en;q=0.8',
           'Cache-Control': 'max-age=0',
           'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
           'Connection': 'keep-alive',
           'Referer': 'http://www.xicidaili.com/nn'
           }


def login():
    routeUrl = "http://www.mafengwo.cn/plan/route.php"
    # 下面有两个关键点
        # 第一个是header，如果不设置，会返回500的错误
        # 第二个是allow_redirects，如果不设置，session访问时，服务器返回302，
        # 然后session会自动重定向到登录页面，获取到登录页面之后，变成200的状态码
        # allow_redirects = False  就是不允许重定向
    responseRes = mafengwoSession.get(routeUrl, headers = headers, allow_redirects = False)
    print(f"isLoginStatus = {responseRes.status_code}")
    if responseRes.status_code != 200:
        return False
    else:
        return True
	


# check_res=my_session.get(ver_url)
# #将验证码保存到本地
# with open('1.jpg','wb') as f:
# 	f.write(check_res.content)
# img=Image.open('1.jpg')
# img.show()#将图片表示出来，用画图工具打开，然后就能看见像素
# ver=input("请输入验证码>>>")#从验证码中得知的像素
# #构造表单,字典类型
# datas={"answer":ver,"login_site":"E","rand":"sjrand"}
# check_res=my_session.post(check_url,data=datas)
# print(check_res.text)
# type(check_res.text)
# #抓包分析，得到提交账号和密码的url
# login_url="https://kyfw.12306.cn/passport/web/login"
# username=input("请输入账号：")
# password=input("请输入密码：")
# data={"username":username,
# "password":password,
# "appid":"otn"}
# login_res=my_session.post(login_url,data=data)
# print(login_res.text)

# data2={"appid":"otn"}
# Uamtk_res=my_session.post(Uamtk_url,data=data2)
# json=json.loads(Uamtk_res.text)
# umtk_id=json["newapptk"]
# print(umtk_id)

# data1={"tk": umtk_id}
# uamtk_res=my_session.post(uamtk_url,data=data1)
# print(uamtk_res.text)

# data3={"_json_att":""}
# use_res=my_session.post(user_url,data=data3)
# print(use_res.text)