'''
{
    'validateMessagesShowId': '_validatorMessage',
    'validateMessages': {},
    'messages': [],
    'httpstatus': 200,
    'data': {
        'normal_passengers': [{
            'gat_version': '',
            'passenger_id_type_code': '1',
            'country_code': 'CN',
            'passenger_type_name': '成人',
            'born_date': '2017-10-05 00:00:00',
            'passenger_type': '1',
            'passenger_name': 'XXX',
            'total_times': '99',
            'phone_no': '',
            'passenger_id_type_name': '中国居民身份证',
            'recordCount': '3',
            'gat_born_date': '',
            'code': '1',
            'gat_valid_date_start': '',
            'mobile_no': 'XXXXXXXX',#电话号码
            'passenger_id_no': 'XXXXXXXXXXXXXXX',
            'address': '',
            'index_id': '0',
            'passenger_flag': '0',
            'first_letter': '',
            'sex_name': '男',
            'email': '978726321@qq.com',
            'postalcode': '',
            'sex_code': 'M',
            'gat_valid_date_end': ''
        }, {
            'gat_version': '',
            'passenger_id_type_code': '1',
            'country_code': 'CN',#
            'passenger_type_name': '成人',#
            'born_date': '2016-08-22 00:00:00',#注册时间 yyyy-MM-dd HH:MM:ss
            'passenger_type': '1',#购票类型
            'passenger_name': '',#姓名
            'total_times': '99',
            'phone_no': '',
            'passenger_id_type_name': '中国居民身份证',
            'recordCount': '3',
            'gat_born_date': '',
            'code': '3',
            'gat_valid_date_start': '',
            'mobile_no': '',
            'passenger_id_no': 'XXXXXXXXXXXX',#身份证号
            'address': '',
            'index_id': '1',
            'passenger_flag': '0',
            'first_letter': '',#姓名首字母大写
            'sex_name': '男',
            'email': '',
            'postalcode': '',
            'sex_code': 'M',#性别编码
            'gat_valid_date_end': ''
        }
        ],
        'other_isOpenClick': ['91', '93', '98', '99', '95', '97'],
        'isExist': True,
        'exMsg': '',
        'two_isOpenClick': ['93', '95', '97', '99'],
        'dj_passengers': []
    },
    'status': True
}
'''
#乘客名,证件类型,证件号,乘客类型
'''
乘客类型:
adult: "1",
child: "2",
student: "3",
disability: "4"
'''
def getOldPassengerStr(userInfo):
    oldPassengerStr = ""

    for x in range(0,len(userInfo)):
        
        Str=""
        Str = userInfo[x]['passenger_name'] + "," + userInfo[x]['passenger_id_type_code'] + "," + userInfo[x]['passenger_id_no'] + "," + userInfo[x]['passenger_type']
        if x!=0:
            oldPassengerStr = oldPassengerStr+"_"+Str
        else:
            oldPassengerStr = Str
        
    return oldPassengerStr

#座位编号,0,票类型,乘客名,证件类型,证件号,手机号码,保存常用联系人(Y或N)
#商务座(9),特等座(P),一等座(M),二等座(O),高级软卧(6),软卧(4),硬卧(3),软座(2),硬座(1),
#票类型指的是，成人票，学生票等的编码
def getPassengerTicketStr(userInfo,seat_type_codes):
    passengerTicketStr = ""
    for x in range(0,len(userInfo)):

        Str=""
        if ("WZ" == seat_type_codes):
            pass
        else:
            Str = seat_type_codes;  
        Str = Str + ",0," + userInfo[x]['passenger_id_type_code'] + "," + userInfo[x]['passenger_name'] + "," + userInfo[x]['passenger_id_type_code'] + "," + userInfo[x]['passenger_id_no'] + ","  + (userInfo[x]['mobile_no']) + ",N";  
        if x!=0:
            passengerTicketStr = passengerTicketStr+"_"+Str
        else:
            passengerTicketStr = Str

    return passengerTicketStr 


    