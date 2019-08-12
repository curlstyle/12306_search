import time
import datetime
#Mon Jan  1 2018 00:00:00 GMT+0800 (中国标准时间)
#time.strftime("%a %b %d %Y %H:%M:%S %Z", time.localtime()) %Z 会出现乱码
# timestr = time.strftime("%a %b %d %Y %H:%M:%S", time.localtime())
# timestr = timestr + " GMT+0800"
# print(timestr)

def fmt_time(str_time):
	date_time = time.strptime(str_time, "%Y-%m-%d")
	timestr = time.strftime("%a %b %d %Y %H:%M:%S", date_time)
	timestr = timestr + " GMT+0800"
	return timestr

def compare_date(date1,date2):
    s_date = time.mktime(time.strptime(date1,'%Y-%m-%d'))
    e_date = time.mktime(time.strptime(date2,'%Y-%m-%d'))
    result = int(s_date) - int(e_date)
    if result>0:
    	return 1
    elif result==0:
    	return 0
    elif result<0:
    	return -1  

def compare_time(time1,time2):
	s_time = datetime.datetime.strptime(time1,'%H:%M:%S')
	e_time = datetime.datetime.strptime(time2,'%H:%M:%S')
	
	result = s_time - e_time

	if result.days>0:
		return 1
	elif result.days==0:
		return 0
	elif result.days<0:
		return -1  
#判断mid_time是否在time1，time2时间内
def compare_mid_time(s_time,e_time,mid_time):
	if mid_time!='24:00':
		s_time = datetime.datetime.strptime(s_time,'%H:%M')
		e_time = datetime.datetime.strptime(e_time,'%H:%M')
		mid_time = datetime.datetime.strptime(mid_time,'%H:%M')
		result1 = e_time - mid_time
		result2 = mid_time - s_time 
		# print(result1.days,result2.days)
		if result1.days==0 and result2.days==0:
			return True
		else:
			return False
	else:
		return True


if __name__ == '__main__':
	#print(fmt_time('2018-08-11'))
	if compare_mid_time('22:00','23:59','13:08'):
		
		print(compare_mid_time('22:00','23:59','13:08'))