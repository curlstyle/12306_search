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

class DialogWindow(QDialog):
	def __init__(self):
		super(DialogWindow, self).__init__()
		loadUi('dialog.ui', self)

		self.dialog_tableWidget.setEditTriggers(QTableWidget.NoEditTriggers)
		self.dialog_tableWidget.setSelectionBehavior(QTableWidget.SelectRows)#设置选择行为，以行为单位
		self.dialog_tableWidget.setSelectionMode(QTableWidget.SingleSelection)#设置选择模式，选择单行
	def item_set(self,item):
		train_no = item[20].text()
		start_no = item[18].text()
		end_no = item[19].text()
		types = item[21].text()
		time = item[22].text()
		print(train_no,start_no,end_no,types,time)
		price_data = Get_price_information(train_no,start_no,end_no,types,time)
		#特等座A9
		if item[6].text():
			self.dialog_tableWidget.setItem(0,0, QTableWidgetItem(item[6].text()))
			self.dialog_tableWidget.setItem(0,1, QTableWidgetItem(price_data["A9"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(0,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(0,1, QTableWidgetItem(""))
		if item[7].text():
			#一等座M
			self.dialog_tableWidget.setItem(1,0, QTableWidgetItem(item[7].text()))
			self.dialog_tableWidget.setItem(1,1, QTableWidgetItem(price_data["M"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(1,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(1,1, QTableWidgetItem(""))
		if item[8].text():
			#二等座O
			self.dialog_tableWidget.setItem(2,0, QTableWidgetItem(item[8].text()))
			self.dialog_tableWidget.setItem(2,1, QTableWidgetItem(price_data["O"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(2,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(2,1, QTableWidgetItem(""))
		if item[9].text():
			#高级软卧A6
			self.dialog_tableWidget.setItem(3,0, QTableWidgetItem(item[9].text()))
			self.dialog_tableWidget.setItem(3,1, QTableWidgetItem(price_data["A6"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(3,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(3,1, QTableWidgetItem(""))
		if item[10].text():
			##软卧A4
			self.dialog_tableWidget.setItem(4,0, QTableWidgetItem(item[10].text()))
			self.dialog_tableWidget.setItem(4,1, QTableWidgetItem(price_data["A4"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(4,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(4,1, QTableWidgetItem(""))
		if item[11].text():
			#动卧F
			self.dialog_tableWidget.setItem(5,0, QTableWidgetItem(item[11].text()))
			self.dialog_tableWidget.setItem(5,1, QTableWidgetItem(price_data["F"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(5,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(5,1, QTableWidgetItem(""))
		if item[12].text():
			#硬卧A3
			self.dialog_tableWidget.setItem(6,0, QTableWidgetItem(item[12].text()))
			self.dialog_tableWidget.setItem(6,1, QTableWidgetItem(price_data["A3"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(6,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(6,1, QTableWidgetItem(""))
		if item[13].text():
			#软座A2
			self.dialog_tableWidget.setItem(7,0, QTableWidgetItem(item[13].text()))
			self.dialog_tableWidget.setItem(7,1, QTableWidgetItem(price_data["A2"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(7,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(7,1, QTableWidgetItem(""))
		if item[14].text():
			#硬座A1
			self.dialog_tableWidget.setItem(8,0, QTableWidgetItem(item[14].text()))
			self.dialog_tableWidget.setItem(8,1, QTableWidgetItem(price_data["A1"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(8,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(8,1, QTableWidgetItem(""))
		if item[15].text():
			#无座WZ
			self.dialog_tableWidget.setItem(9,0, QTableWidgetItem(item[15].text()))
			self.dialog_tableWidget.setItem(9,1, QTableWidgetItem(price_data["WZ"].replace("짜","")))
		else:
			self.dialog_tableWidget.setItem(9,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(9,1, QTableWidgetItem(""))
		if item[16].text():
			#其他
			self.dialog_tableWidget.setItem(10,0, QTableWidgetItem(item[16].text()))
		else:
			self.dialog_tableWidget.setItem(10,0, QTableWidgetItem(""))
			self.dialog_tableWidget.setItem(10,1, QTableWidgetItem(""))



	def buy_ticket(self):
		ticket_item = self.dialog_tableWidget.selectedItems()
		print(ticket_item[0].text())
		if ticket_item == []:
			QMessageBox.information(self,"提醒","请选择票务种类！",QMessageBox.Yes)	
		if ticket_item[0].text()=='':
			QMessageBox.information(self,"提醒","请选择有效的种类！",QMessageBox.Yes)
		elif ticket_item[0].text()=='无':
			print('无')
		else:
			print('有票')
			img_dialog.show()
			img_dialog.get_captcha_image()

class img_dialog(QDialog):
	def __init__(self):
		super(img_dialog, self).__init__()
		loadUi('img_dialog.ui', self)

	def get_captcha_image(self):
		ver_url="https://kyfw.12306.cn/passport/captcha/captcha-image?login_site=E"
		check_res=my_session.get(ver_url)
		with open('captcha.jpg','wb') as f:
			f.write(check_res.content)
		#self.image = QImage()

		image_shape = (64, 64, 3)
		img_num = image_utils.judge_image_background('captcha.jpg')
		img_list = image_utils.split_image_text('captcha.jpg',(image_shape[0], image_shape[1]),img_num)
		for row in img_list:
			row.save("img/title-%d.jpg" % (img_list.index(row) + 1))

		self.title_lable.setPixmap(QPixmap('img/title-1.jpg'))
		if img_num==2:
			self.title_lable_2.setPixmap(QPixmap('img/title-2.jpg'))
		

		img_list = image_utils.cut_images('captcha.jpg',(image_shape[0], image_shape[1]))
		for row in img_list:
			row.save("img/lable-%d.jpg" % (img_list.index(row) + 1))

		self.img_lable_1.setPixmap(QPixmap('img/lable-1.jpg'))
		self.img_lable_2.setPixmap(QPixmap('img/lable-2.jpg'))
		self.img_lable_3.setPixmap(QPixmap('img/lable-3.jpg'))
		self.img_lable_4.setPixmap(QPixmap('img/lable-4.jpg'))
		self.img_lable_5.setPixmap(QPixmap('img/lable-5.jpg'))
		self.img_lable_6.setPixmap(QPixmap('img/lable-6.jpg'))
		self.img_lable_7.setPixmap(QPixmap('img/lable-7.jpg'))
		self.img_lable_8.setPixmap(QPixmap('img/lable-8.jpg'))

	def accept(self):
		ids = []
		if self.checkBox_1.checkState()==2:
			ids.append(0)
		if self.checkBox_2.checkState()==2:
			ids.append(1)
		if self.checkBox_3.checkState()==2:
			ids.append(2)
		if self.checkBox_4.checkState()==2:
			ids.append(3)
		if self.checkBox_5.checkState()==2:
			ids.append(4)
		if self.checkBox_6.checkState()==2:
			ids.append(5)
		if self.checkBox_7.checkState()==2:
			ids.append(6)
		if self.checkBox_8.checkState()==2:
			ids.append(7)
		self.reject()
		

		datas={"answer":image_utils.submit_captcha(ids),"login_site":"E","rand":"sjrand"}
		check_url="https://kyfw.12306.cn/passport/captcha/captcha-check"
		check_res=my_session.post(check_url,data=datas)
		print(check_res.text)
		if check_res.text[43:-2] == "4":
			QMessageBox.information(self,"提醒",check_res.text[19:-20],QMessageBox.Yes)
			login_dialog.show()
		else:
			QMessageBox.information(self,"提醒",check_res.text[19:-20]+'，请再次勾选！',QMessageBox.Yes)
			img_dialog.show()
			img_dialog.get_captcha_image()


class login_dialog(QDialog):
	"""docstring for login_dialog"""
	def __init__(self):
		super(login_dialog, self).__init__()
		loadUi('login_dialog.ui', self)

	def accept(self):
		username = self.lineEdit_1.text()
		password = self.lineEdit_2.text()

		login_url="https://kyfw.12306.cn/passport/web/login"
		uamtk_url="https://kyfw.12306.cn/otn/uamauthclient"
		Uamtk_url="https://kyfw.12306.cn/passport/web/auth/uamtk"
		user_url="https://kyfw.12306.cn/otn/login/userLogin"

		data={"username":username,"password":password,"appid":"otn"}
		login_res=my_session.post(login_url,data=data)
		print(login_res.text)
		data2={"appid":"otn"}

		Uamtk_res=my_session.post(Uamtk_url,data=data2)
		json=json.loads(Uamtk_res.text)
		umtk_id=json["newapptk"]
		print(umtk_id)

		data1={"tk": umtk_id}
		uamtk_res=my_session.post(uamtk_url,data=data1)
		print(uamtk_res.text)

		data3={"_json_att":""}
		use_res=my_session.post(user_url,data=data3)
		print(use_res.text)
		
		print(my_session)

class MainWindow(QMainWindow):
	def __init__(self, parent=None):
		super(MainWindow, self).__init__(parent)
		loadUi('12306.ui', self)

		self.dateEdit.setDate(QDate.currentDate())

		# self.tableWidget.setColumnHidden(18,True);
		# self.tableWidget.setColumnHidden(19,True);

		self.tableWidget.setEditTriggers(QTableWidget.NoEditTriggers)
		self.tableWidget.setSelectionBehavior(QTableWidget.SelectRows)#设置选择行为，以行为单位
		self.tableWidget.setSelectionMode(QTableWidget.SingleSelection)#设置选择模式，选择单行

	def item_DoubleClick(self):
		
		item = self.tableWidget.selectedItems()
		print(item[17].text())
		if item[17].text()=="预订":
			dialogWindow.show()
			dialogWindow.item_set(item)
		elif item[17].text()=="列车停运":
			QMessageBox.information(self,"提醒","该次列车处于停运状态,无车票信息！",QMessageBox.Yes)
		else:
			QMessageBox.information(self,"提醒","出错！",QMessageBox.Yes)





		

	def button_click(self):
		# self.tableWidget.clearContents()

		row_count = self.tableWidget.rowCount()
		for x in range(row_count):
			row_count1 = self.tableWidget.rowCount()
			self.tableWidget.removeRow(row_count1-1)
		
		start_station = self.lineEdit.text()#.isEmpty() 
		end_station = self.lineEdit_2.text()
		if start_station=="" or end_station=="":
			QMessageBox.warning(self,"警告","起始站和终点站不能为空!")
		else:
			start_time = self.dateEdit.text()
			print(start_station,end_station,start_time)
		train.Get_station_dit()
		startStation_sx = train.Get_sx_by_station_name(start_station)
		print(startStation_sx)
		endStation_sx = train.Get_sx_by_station_name(end_station)
		print(endStation_sx)

		train_dit = train.Get_train_information(startStation_sx,endStation_sx,start_time)
		#print(train_dit)
		#print(station_sx_dit[])

		#隐藏表头
		#self.tableWidget.verticalHeader().setVisible(False)
		count = 0
		for i in train_dit.keys():

			self.tableWidget.insertRow(count)
			self.tableWidget.setItem(count,0, QTableWidgetItem(train_dit[i][3]))
			self.tableWidget.setItem(count,1, QTableWidgetItem(train.Get_station_name_by_sx(train_dit[i][4])))
			self.tableWidget.setItem(count,2, QTableWidgetItem(train.Get_station_name_by_sx(train_dit[i][5])))
			self.tableWidget.setItem(count,3, QTableWidgetItem(train_dit[i][8]))
			self.tableWidget.setItem(count,4, QTableWidgetItem(train_dit[i][9]))
			self.tableWidget.setItem(count,5, QTableWidgetItem(train_dit[i][10]))
			#特等座
			self.tableWidget.setItem(count,6, QTableWidgetItem(train_dit[i][32]))
			#一等座
			self.tableWidget.setItem(count,7, QTableWidgetItem(train_dit[i][31]))
			#二等座
			self.tableWidget.setItem(count,8, QTableWidgetItem(train_dit[i][30]))
			#高级软卧
			self.tableWidget.setItem(count,9, QTableWidgetItem(train_dit[i][21]))
			#软卧
			self.tableWidget.setItem(count,10, QTableWidgetItem(train_dit[i][23]))
			#动卧
			self.tableWidget.setItem(count,11, QTableWidgetItem(train_dit[i][33]))
			#硬卧
			self.tableWidget.setItem(count,12, QTableWidgetItem(train_dit[i][28]))
			#软座
			self.tableWidget.setItem(count,13, QTableWidgetItem(train_dit[i][24]))
			#硬座
			self.tableWidget.setItem(count,14, QTableWidgetItem(train_dit[i][29]))
			#无座
			self.tableWidget.setItem(count,15, QTableWidgetItem(train_dit[i][26]))
			#其他
			self.tableWidget.setItem(count,16, QTableWidgetItem(train_dit[i][22]))
			#备注
			self.tableWidget.setItem(count,17, QTableWidgetItem(train_dit[i][1]))
			#始发站编号
			self.tableWidget.setItem(count,18, QTableWidgetItem(train_dit[i][16]))
			#到达站编号
			self.tableWidget.setItem(count,19, QTableWidgetItem(train_dit[i][17]))
			#车辆编号
			self.tableWidget.setItem(count,20, QTableWidgetItem(train_dit[i][2]))
			#票价编号
			self.tableWidget.setItem(count,21, QTableWidgetItem(train_dit[i][35]))
			#出发日期
			self.tableWidget.setItem(count,22, QTableWidgetItem(start_time))
			count+=1

if __name__ == "__main__":
	my_session=requests.session() 		
	app=0 #This is the solution 
	app = QApplication(sys.argv)
	w = MainWindow()
	dialogWindow = DialogWindow()
	img_dialog=img_dialog()
	login_dialog=login_dialog()
	w.show()
	sys.exit(app.exec())

        # self.labelTips.hide()
        # self.pushButtonOK.clicked.connect(self.slotLogin)
        # self.pushButtonCancle.clicked.connect(self.slotCancle)

    # def slotLogin(self):
    #     if self.lineEditUser.text() != "admin" or self.lineEditPasswd.text() != "123456":
    #         self.labelTips.show()
    #         self.labelTips.setText("用户名或密码错误！")
    #     else:
    #         self.accept()

    # def slotCancle(self):
    #     self.reject()

 
