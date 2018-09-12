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
import json
import sys



class DynAddObject(QDialog):
    def __init__(self, parent=None):
        super(DynAddObject, self).__init__(parent)
        
        self.layout = QGridLayout()
        
        self.setLayout(self.layout)
        self.add()

    def add(self):
        self.button={}
        for i in range(1, 8):
            self.button[i]=QRadioButton(str(i))
            self.layout.addWidget(self.button[i])


if __name__ == "__main__":
    app = QApplication(sys.argv)
    form = DynAddObject()
    form.show()
    app.exec_()