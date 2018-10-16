import sys
from PyQt5.QtWidgets import *
from PyQt5.uic import loadUi
from PyQt5.QtCore import *
from PyQt5.QtGui import QFont,QColor,QBrush,QPixmap
import  requests
from PIL import Image
import http.cookiejar as cookielib
import  json
import os
import urllib.request
import urllib.parse
import re


# data={'status': True, 'validateMessagesShowId': '_validatorMessage', 'data': {'errMsg': '系统繁忙，请稍后重试！', 'submitStatus': False}, 'messages': [], 'validateMessages': {}, 'httpstatus': 200}

# inormation_bool = False
# print(not inormation_bool)



def XXX(count):
	count = count+1
	return count
def YYY():
	global information_count
	print(information_count)
	information_count = XXX(information_count)
	print(information_count)
if __name__ == '__main__':
	information_count=0

	YYY()
	YYY()

