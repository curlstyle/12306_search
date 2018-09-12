import urllib
from bs4 import BeautifulSoup
from xlwt import *  
import json
import getstr_utils
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap
import sys

DTO_res_json = {
	'validateMessagesShowId': '_validatorMessage',
	'validateMessages': {},
	'messages': [],
	'httpstatus': 200,
	'data': {
		'normal_passengers': [{
			'gat_version': '',
			'passenger_id_type_code': '1',
			'country_code': 'CN',
			'passenger_type_name': '成人',
			'born_date': '2017-10-05 00:00:00',
			'passenger_type': '1',
			'passenger_name': 'XXX',
			'total_times': '99',
			'phone_no': '',
			'passenger_id_type_name': '中国居民身份证',
			'recordCount': '3',
			'gat_born_date': '',
			'code': '1',
			'gat_valid_date_start': '',
			'mobile_no': 'XXXXXXXX',#电话号码
			'passenger_id_no': 'XXXXXXXXXXXXXXX',
			'address': '',
			'index_id': '0',
			'passenger_flag': '0',
			'first_letter': '',
			'sex_name': '男',
			'email': 'xxxxxxx@xx',
			'postalcode': '',
			'sex_code': 'M',
			'gat_valid_date_end': ''
		}, {
			'gat_version': '',
			'passenger_id_type_code': '1',
			'country_code': 'CN',#
			'passenger_type_name': '成人',#
			'born_date': '2016-08-22 00:00:00',#注册时间 yyyy-MM-dd HH:MM:ss
			'passenger_type': '1',#购票类型
			'passenger_name': 'YYY',#姓名
			'total_times': '99',
			'phone_no': '',
			'passenger_id_type_name': '中国居民身份证',
			'recordCount': '3',
			'gat_born_date': '',
			'code': '3',
			'gat_valid_date_start': '',
			'mobile_no': '',
			'passenger_id_no': 'XXXXXXXXXXXX',#身份证号
			'address': '',
			'index_id': '1',
			'passenger_flag': '0',
			'first_letter': '',#姓名首字母大写
			'sex_name': '男',
			'email': '',
			'postalcode': '',
			'sex_code': 'M',#性别编码
			'gat_valid_date_end': ''
		}
		],
		'other_isOpenClick': ['91', '93', '98', '99', '95', '97'],
		'isExist': True,
		'exMsg': '',
		'two_isOpenClick': ['93', '95', '97', '99'],
		'dj_passengers': []
	},
	'status': True
}

class A(QDialog):
    def __init__(self):
        super(A, self).__init__()
        loadUi('select_people_dialog.ui', self)
        self.checkBox={}
        for x in range(0,len(DTO_res_json['data']['normal_passengers'])):
        	self.checkBox[x]=QCheckBox(DTO_res_json['data']['normal_passengers'][x]['passenger_name'])
        	self.gridLayout.addWidget(self.checkBox[x])

    def accept(self):
    	global people_list
    	people_list=[]
    	for x in range(0,len(DTO_res_json['data']['normal_passengers'])):
    		if self.checkBox[x].checkState()==2:
    			people_list.append(DTO_res_json['data']['normal_passengers'][x])
    	if people_list==[]:
    		QMessageBox.information(self,"提醒","请勾选联系人！",QMessageBox.Yes)
    	else:	
    		self.reject()

if __name__ == '__main__':
    
    app = QApplication(sys.argv)
    a = A()
    a.show()
    sys.exit(app.exec_())