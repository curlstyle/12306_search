import sys
import train
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap
from train import *

class DialogWindow(QDialog):
	def __init__(self):
		super(DialogWindow, self).__init__()
		loadUi('dialog.ui', self)
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
	app=0 #This is the solution 
	app = QApplication(sys.argv)
	w = MainWindow()
	dialogWindow = DialogWindow()
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

 
