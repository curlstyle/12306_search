import http.cookiejar as cookielib
import  json
import os
import urllib.request
import requests
import sys

checkUser_url = 'https://kyfw.12306.cn/otn/login/checkUser'
order_url = 'https://kyfw.12306.cn/otn/leftTicket/submitOrderRequest'
my_session=requests.session() 
headers = {'Accept': '*/*',
       'Accept-Language': 'en-US,en;q=0.8',
       'Cache-Control': 'max-age=0',
       'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.22 Safari/537.36 SE 2.X MetaSr 1.0',
       'Connection': 'keep-alive',
       'Referer': 'https://kyfw.12306.cn/otn/login/checkUser'
       }
if os.path.exists('cookie.txt')==True:
	if os.path.getsize('cookie.txt')!=0:

		my_session.cookies = cookielib.LWPCookieJar()
		my_session.cookies.load('cookie.txt', ignore_discard=True, ignore_expires=True)
		
		handler=urllib.request.HTTPCookieProcessor(my_session.cookies)

		opener = urllib.request.build_opener(handler)
		response = opener.open(checkUser_url)
		text_html = response.read().decode('utf-8')
		str_json = json.loads(text_html)
		print(str_json)
		#order_data = {......}
		
		buy_ticket.postOrder(my_session,order_url,order_data)	
