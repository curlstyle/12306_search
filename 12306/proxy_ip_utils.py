#!/usr/bin/python3 
"""
取自我另一个项目https://github.com/curlstyle/Proxy_IP-spider
"""

import urllib.request  
from bs4 import BeautifulSoup
from lxml import etree
#from multiprocessing.dummy import Pool as ThreadPool
from pathos.multiprocessing import ProcessingPool as ThreadPool
import time

 
url = "http://www.xicidaili.com/nn"  
ip_list=[]
headers = {'Accept': '*/*',
           'Accept-Language': 'en-US,en;q=0.8',
           'Cache-Control': 'max-age=0',
           'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
           'Connection': 'keep-alive',
           'Referer': 'http://www.xicidaili.com/nn'
           }
def get_ip_list(url,headers):
	request = urllib.request.Request(url,None,headers)  
	response = urllib.request.urlopen(request)  
	html = response.read().decode('utf-8') 
	soup = BeautifulSoup(html, "html.parser")

	datas_ip = etree.HTML(html).xpath('//table[contains(@id,"ip_list")]/tr/td[2]/text()')
	datas_port = etree.HTML(html).xpath('//table[contains(@id,"ip_list")]/tr/td[3]/text()')
	return datas_ip,datas_port

def test_ip(ipList,portList):
	user_agent ='Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.22 Safari/537.36 SE 2.X MetaSr 1.0'
	headers_test = {'User-Agent':user_agent}
	proxy = {'http':'http://%s:%s'%(ipList,portList)}
	proxy_handler = urllib.request.ProxyHandler(proxy)
	opener = urllib.request.build_opener(proxy_handler)
	urllib.request.install_opener(opener)

	test_url = "https://www.12306.cn/index/"
	try:

		req = urllib.request.Request(url=test_url,headers=headers_test)
		res = urllib.request.urlopen(req,None,timeout=30)
		try:
			content = res.read()
			if content:
				ip_str = str(ipList+":"+portList)
				#print(ip_str +"  可用")
				#ip_list.append(ip_str)
				return ip_str 
			else:
				print(ip_str +"  不可用")
		except Exception as e:
			print("内容读取失败,正重新尝试读取")
			content = res.read()
			if content:
				ip_str = str(ipList+":"+portList)
				#print(ip_str +"  可用")
				#ip_list.append(ip_str)
				return ip_str 
			else:
				print(ip_str +"  不可用")
	except Exception as e:
		raise e
			
def finally_ip():
	(ipList,portList) = get_ip_list(url,headers)
	#运行pool = ThreadPool(2)有时会出现module '__main__' has no attribute '__spec__'错误  不造如何解决
	#尝试过 __spec__=None 的方式  没有什么用
	pool = ThreadPool(4)
	#start_time = time.time()
	results = pool.map(test_ip,ipList,portList)
	pool.close()
	pool.join()
	#end_time = time.time()
	#print("并行耗时："+str(end_time-start_time))
	return results
	   

if __name__ == '__main__':
	print(finally_ip())

	
		





  
