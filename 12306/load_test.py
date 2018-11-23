import sys
import train
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap,QMovie
from train import *
import  requests
from PIL import Image
import image_utils
import json
import sys

class loadDialog(QDialog):
	"""docstring for loadDialog"""
	def __init__(self):
		super(loadDialog, self).__init__()
		loadUi('load.ui', self)
		pm = QMovie("img/load.gif")
		#pm.setSpeed(100)
		#self.label_2.setWindowFlags(FramelessWindowHint)  # 无边框
		#self.label_2.setAttribute(WA_TranslucentBackground) 
		self.label_2.setMovie(pm)
		pm.start()
		self.label_2.show()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    form = loadDialog()
    form.show()
    app.exec_()