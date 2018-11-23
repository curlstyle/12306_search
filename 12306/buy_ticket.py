import sys
import train
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap
from train import *
import  requests
from PIL import Image
import image_utils
import http.cookiejar as cookielib
import  json
import os
import urllib.request
import urllib.parse
import re
import getstr_utils
import time_utils
import proxy_ip_utils
import random
def postOrder(my_session,order_url,order_data):
	order_res_json = {'httpstatus': 200, 'status': False, 'validateMessages': {}, 'messages': ['提交失败，请重试...'], 'validateMessagesShowId': '_validatorMessage'}
	while order_res_json['status']==False:
		order_res = my_session.post(order_url,data=order_data)
		order_res_json = json.loads(order_res.text)
		print('postOrder',order_res_json)
		time.sleep(2)
		

def get_initDc(my_session,initDc_url,DTO_url):
	initDc_data = {
		"_json_att": ""
	}
	initDc_res = my_session.post(initDc_url,data=initDc_data)

	if initDc_res.status_code == requests.codes.ok:
		a1 = re.search(r'globalRepeatSubmitToken.+', initDc_res.text).group()
		globalRepeatSubmitToken = re.sub(r'(globalRepeatSubmitToken)|(=)|(\s)|(;)|(\')', '', a1)
		#print(globalRepeatSubmitToken)
		#print(initDc_res.text)
		a2 = re.search(r'queryLeftTicketRequestDTO\':([\s\S]*?);', initDc_res.text).group()
		a3 = re.search(r'ypInfoDetail\':\'([\s\S]*?)\'', a2).group()
		a4 = re.search(r'train_location\':\'([\s\S]*?)\'', a2).group()
		leftTicketStr = re.sub(r'(ypInfoDetail)|(,)|(\s)|(;)|(\')|(:)', '', a3)
		train_location = re.sub(r'(train_location)|(,)|(\s)|(;)|(\')|(:)', '', a4)
		a5 = re.search(r'purpose_codes\':\'([\s\S]*?)\'', initDc_res.text).group()
		purpose_codes = re.sub(r'(purpose_codes)|(,)|(\s)|(;)|(\')|(:)', '', a5)
		key_str = re.search(r'key_check_isChange\':\'([\s\S]*?)\'', initDc_res.text).group()
		key_check_isChange = re.sub(r'(key_check_isChange)|(,)|(\s)|(;)|(\')|(:)', '', key_str)
		#print(leftTicketStr)
		#print(train_location)
		#print(key_check_isChange)
		##查询联系人信息
		DTO_data = {
				"_json_att": "",
				"REPEAT_SUBMIT_TOKEN": globalRepeatSubmitToken 
		}
		DTO_res = my_session.post(DTO_url,data=DTO_data)
		DTO_res_json = json.loads(DTO_res.text)

		
		return DTO_res_json,globalRepeatSubmitToken,purpose_codes,key_check_isChange,leftTicketStr,train_location
def checkOrder(my_session,checkOrderInfo_url,checkOrderInfo_data):

	checkOrder_res = my_session.post(checkOrderInfo_url,data=checkOrderInfo_data)
	checkOrder_res_json = json.loads(checkOrder_res.text)
	if checkOrder_res_json['data']['submitStatus']==False:
		print('开启代理IP提交方式！')
		ipList = proxy_ip_utils.finally_ip()
		print(ipList)
		time.sleep(10)
		while checkOrder_res_json['data']['submitStatus']==False:
			proxies = {'http':'http://%s'%(random.choice(ipList))}
			try:
				checkOrder_res = my_session.request(method='post',url=checkOrderInfo_url,data=checkOrderInfo_data,proxies=proxies)
				checkOrder_res_json = json.loads(checkOrder_res.text)
			except Exception as e:
				print(e)
			
			print('proxies',proxies,'checkOrder_res_json',checkOrder_res_json)
			#time.sleep(1)

def getQueue(my_session,getQueue_url,getQueue_data):
	
	getQueue_res = my_session.post(getQueue_url,data=getQueue_data)
	getQueue_res_json = json.loads(getQueue_res.text)
	print('getQueue_res_json',getQueue_res_json)

def confirmOrder(my_session,confirmOrder_url,confirmOrder_data):
	inormation_bool = False
	while not inormation_bool:
		confirmOrder_res = my_session.post(confirmOrder_url,data=confirmOrder_data)
		confirmOrder_res_json = json.loads(confirmOrder_res.text)
		print('confirmOrder_res_json',confirmOrder_res_json)
		if confirmOrder_res_json['status']:
			inormation_bool = confirmOrder_res_json['data']['submitStatus']

		time.sleep(2)