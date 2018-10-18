#!/usr/bin/python
# -*- coding: UTF-8 -*-
 
import smtplib;  
from email.mime.text import MIMEText  
'''
摘自 https://blog.csdn.net/qq_21395195/article/details/79600301
'''
def send_email(host,username,passwd,send_to,subject,content):  
    msg = MIMEText( content.encode('utf8'), _subtype = 'html', _charset = 'utf8')  
    msg['From'] = username  #发件人的名字 
    msg['Subject'] = u'%s' % subject  #邮件的主题
    msg['To'] = ",".join(send_to)  
      
    try:  
        s = smtplib.SMTP_SSL(host,465)          
        s.login(username, passwd )  
        s.sendmail(username, send_to,msg.as_string())  
        s.close()  
    except Exception as e:  
        print ('Exception: send email failed', e)  
  
if __name__ == '__main__':  
    host = 'smtp.qq.com'  
    username = '978726321@qq.com'  
    passwd = 'gtskanozhqstbfjh'  
    to_list = ['978726321@qq.com'] #可以发给自己 
    subject = "邮件主题"  
    content = '使用Python发送邮件'  
    send_email(host,username,passwd,to_list,subject,content)
 