import time

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

if __name__ == '__main__':
	print(fmt_time('2018-08-11'))