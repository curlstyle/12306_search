import sys
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap
import re
import os
class MainWindow(QMainWindow):
	def __init__(self, parent=None):
		super(MainWindow, self).__init__(parent)
		loadUi('../12306.ui', self)

		self.dateEdit.setDate(QDate.currentDate())

		# self.tableWidget.setColumnHidden(18,True);
		# self.tableWidget.setColumnHidden(19,True);

		self.tableWidget.setEditTriggers(QTableWidget.NoEditTriggers)
		self.tableWidget.setSelectionBehavior(QTableWidget.SelectRows)#设置选择行为，以行为单位
		self.tableWidget.setSelectionMode(QTableWidget.SingleSelection)
		self.action.triggered.connect(self.setEmail)
	def item_DoubleClick(self):
		pass
	def button_click(self):
		pass
	def setEmail(self):
		emailDialog.exec_()


class emailDialog(QDialog):
	"""docstring for ClassName"""
	def __init__(self):
		super(emailDialog, self).__init__()
		loadUi('../email_dialog.ui',self)
		if os.path.exists('Email.txt')==True and os.path.getsize('Email.txt')!=0:
			with open('Email.txt','r',encoding='utf-8') as f:
				Email_data=f.read()
				self.lineEdit.setText(Email_data)
		else:
			self.lineEdit.setText('')
	def accept(self):
		Email_data=self.lineEdit.text()
		a = re.match(r'[\w!#$%&\'*+/=?^_`{|}~-]+(?:\.[\w!#$%&\'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?', Email_data)
		if a==None:
			QMessageBox.information(self,"提醒","请输入正确的Email！",QMessageBox.Yes)
		else:
			QMessageBox.information(self,"提醒","保存成功，信息已保存在Email.txt文件中！",QMessageBox.Yes)
			with open('Email.txt','w',encoding='utf-8') as f:
				f.write(Email_data)
			self.reject()
if __name__ == '__main__':
	app=0 #This is the solution 
	app = QApplication(sys.argv)
	emailDialog = emailDialog()
	w = MainWindow()
	w.show()
	sys.exit(app.exec())