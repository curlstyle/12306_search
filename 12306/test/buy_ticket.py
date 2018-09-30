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

data={'status': True, 'validateMessagesShowId': '_validatorMessage', 'data': {'errMsg': '系统繁忙，请稍后重试！', 'submitStatus': False}, 'messages': [], 'validateMessages': {}, 'httpstatus': 200}

inormation_bool = False
print(not inormation_bool)
