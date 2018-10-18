import urllib
from bs4 import BeautifulSoup
from xlwt import *  
import json
import time 
import random
def main(count):
	global bools
	bools = True
	train_dit={}
	global information_json
	global information_response
	global information_count
	information_json=''
	information_response=''
	information_list=['','A','B','C','D','E','O']
	#information_url = "https://kyfw.12306.cn/otn/leftTicket/query"+information_list[count]+"?leftTicketDTO.train_date="+startTime+"&leftTicketDTO.from_station="+startStation_sx+"&leftTicketDTO.to_station="+endStation_sx+"&purpose_codes=ADULT"
	information_url = "https://kyfw.12306.cn/otn/leftTicket/query"+information_list[count]+"?leftTicketDTO.train_date=2018-10-16&leftTicketDTO.from_station=GYW&leftTicketDTO.to_station=MYW&purpose_codes=ADULT"
	print(information_url)
	try:
		information_request = urllib.request.Request(information_url,None)
		information_response = urllib.request.urlopen(information_request,None,timeout=10)
	except Exception as e:
		information_count = count+1
		main(information_count)
		
	information_html = information_response.read()
	information_soup = BeautifulSoup(information_html, "html.parser")
	information_json = information_soup.string

	if information_json==None:
		if bools:
			information_count = count+1
			main(information_count)
	else:	
		information_html_json = json.loads(information_json)
		try:
			train_information_data = information_html_json['data']
			train_information = information_html_json['data']['result']
			for i in range(len(train_information)):
				train_information_list = train_information[i].split("|")
				train_dit.update({train_information_list[3]:train_information_list})
		except:
			print(information_html_json['messages'][0])
		bools= False
	return train_dit,information_count


if __name__ == '__main__':
	train_dit,count = main(0)
	print(count)