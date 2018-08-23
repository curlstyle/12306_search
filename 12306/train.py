import urllib
from bs4 import BeautifulSoup
from xlwt import *  
import json

station_name_url = "https://kyfw.12306.cn/otn/resources/js/framework/station_name.js"

headers = {'Accept': '*/*',
           'Accept-Language': 'en-US,en;q=0.8',
           'Cache-Control': 'max-age=0',
           'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36',
           'Connection': 'keep-alive',
           'Referer': 'http://www.xicidaili.com/nn'
           }
station_dit={}
station_sx_dit={}

class Station():
	def __init__(self,Station_name_y_num,Station_name,Station_name_sx,Station_name_qp,Station_name_jp,Station_name_num):
		self.Station_name_y_num=Station_name_y_num #车站英文编号
		self.Station_name=Station_name #车站名称
		self.Station_name_sx=Station_name_sx #车站名称缩写
		self.Station_name_qp=Station_name_qp #车站名称全拼
		self.Station_name_jp=Station_name_jp #车站名称简拼
		self.Station_name_num=Station_name_num #车站编号
	def SetStation_show(self):
		print(self.Station_name_y_num,self.Station_name,self.Station_name_sx,self.Station_name_qp,self.Station_name_jp,self.Station_name_num)

# startStation=""
# endStation=""
def Get_station_dit():

	station_name_request = urllib.request.Request(station_name_url,None,headers)
	station_name_response = urllib.request.urlopen(station_name_request,None,timeout=10)

	station_name_html = station_name_response.read()
	station_name_soup = BeautifulSoup(station_name_html, "html.parser")
	station_name_list = station_name_soup.string

	start_index = station_name_list.find('\'', 0, len(station_name_list))
	end_index = station_name_list.find('\'', start_index+1, len(station_name_list))

	station_name_list = station_name_list[start_index+1:end_index]

	singleStation = station_name_list.split("@");
	print(len(singleStation))

	for i in range(len(singleStation)-1):
		singleStation_list = singleStation[i+1].split("|")
		station_dit.update({singleStation_list[1]:singleStation_list})
		station_sx_dit.update({singleStation_list[2]:singleStation_list})

def Get_sx_by_station_name(station_name):
	
	#print(dit["株洲南"])
	#['zzn', '株洲南', 'KVQ', 'zhuzhounan', 'zzn', '2746']

	station = Station(station_dit[station_name][0],station_dit[station_name][1],station_dit[station_name][2],station_dit[station_name][3],station_dit[station_name][4],station_dit[station_name][5])
	return station.Station_name_sx
	

def Get_station_name_by_sx(station_name_sx):
	station = Station(station_sx_dit[station_name_sx][0],station_sx_dit[station_name_sx][1],station_sx_dit[station_name_sx][2],station_sx_dit[station_name_sx][3],station_sx_dit[station_name_sx][4],station_sx_dit[station_name_sx][5])
	return station.Station_name
# startStation=""
# endStation=""
# startTime="" yyyy-MM-dd
def Get_train_information(startStation_sx,endStation_sx,startTime):
	train_dit={}
	information_url = "https://kyfw.12306.cn/otn/leftTicket/query?leftTicketDTO.train_date="+startTime+"&leftTicketDTO.from_station="+startStation_sx+"&leftTicketDTO.to_station="+endStation_sx+"&purpose_codes=ADULT"
	print(information_url)
	information_request = urllib.request.Request(information_url,None,headers)
	information_response = urllib.request.urlopen(information_request,None,timeout=10)

	information_html = information_response.read()
	information_soup = BeautifulSoup(information_html, "html.parser")
	information_json = information_soup.string
	try:
		information_html_json = json.loads(information_json)
	except Exception as e:
		raise e

	try:
		train_information_data = information_html_json['data']
		train_information = information_html_json['data']['result']
		for i in range(len(train_information)):
			train_information_list = train_information[i].split("|")
			train_dit.update({train_information_list[3]:train_information_list})
	except Exception as e:
		print(information_html_json['messages'][0])
	return train_dit


# train_no=''
# from_station_no=''
# to_station_no=''
# seat_types=''
# train_date=''
def Get_price_information(train_no,from_station_no,to_station_no,seat_types,train_date):
	ticket_price_information_url = 'https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice?train_no='+train_no+'&from_station_no='+from_station_no+'&to_station_no='+to_station_no+'&seat_types='+seat_types+'&train_date='+train_date
	print(ticket_price_information_url)
	#ticket_price_information_url = 'https://kyfw.12306.cn/otn/leftTicket/queryTicketPrice?train_no=760000D63805&from_station_no=01&to_station_no=25&seat_types=OMO&train_date=2018-07-10'
	ticket_price_information_request = urllib.request.Request(ticket_price_information_url,None,headers)
	ticket_price_information_response = urllib.request.urlopen(ticket_price_information_request,None,timeout=10)

	ticket_price_information_html = ticket_price_information_response.read()
	ticket_price_information_soup = BeautifulSoup(ticket_price_information_html, "html.parser")
	ticket_price_information_json = ticket_price_information_soup.string
	try:
		ticket_price_information_html_json = json.loads(ticket_price_information_json)
	except Exception as e:
		raise e

	#print(ticket_price_information_html_json['data'])
	return ticket_price_information_html_json['data']
# information_html_json['data']['result']
