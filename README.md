# 乐脸付小程序 #

## 支付接口 ##
``` 
url：https://fw.lepay.vip//index.php/Register/PayAndRefund/tofastpay  
请求方式：post  
发送数据：  
money:1  
code: 284236166272756154  
merchantid:15  
storeid:460
```

## 支付宝二维码接口 ##
``` 
https://fw.lepay.vip/Pay/WxFacePay/qrCodePay
请求方式 POST
type  2 支付宝固定
money  0.01
stats  0 固定
storeid	460

返回
{result: {…}, status: 1, msg: "订单创建成功"}
msg
:
"订单创建成功"
result
:
{code: "10000", msg: "Success", out_trade_no: "2019110120154415726101505", qr_code: "https://qr.alipay.com/bax02707k7pgmu0l1vcx0077"}
status
:
1

```
## wx二维码接口 ##
``` 
https://fw.lepay.vip/Pay/WxFacePay/qrCodePay
请求方式 POST
type  1 微信固定
money  0.01
stats  0 固定
storeid	460

返回
{msg: "请求成功", code: "000000", data: {…}}
code
:
"000000"
data
:
{qrcode: "weixin://wxpay/bizpayurl?pr=uEjiUsG", out_trade_no: "2019110120163115726101507"}
msg
:
"请求成功"

```

## 微信订单查询 ##
``` 
https://fw.lepay.vip/Pay/WxFacePay/queryOrder
POST
out_trade_no  2019110109530315725701449
storeid    460


{
"msg": "请求成功",
"code": "000000",
"data": {
"order_state": "SUCCESS",
"out_trade_no": "2019110109530315725701449",
"tradedate": 1572573193
}
}

```

## 支付宝订单查询 ##
``` 
https://fw.lepay.vip/Pay/WxFacePay/aliQueryOrder
POST
out_trade_no  2019110109174115725701437

返回
{
"msg": "请求成功",
"code": "000000",
"data": {
"code": "10000",
"msg": "Success",
"buyer_logon_id": "139******61",
"buyer_pay_amount": "0.10",
"buyer_user_id": "2088422301171157",
"fund_bill_list": [
{
"amount": "0.10",
"fund_channel": "PCREDIT"
}
],
"invoice_amount": "0.10",
"out_trade_no": "2019110109174115725701437",
"point_amount": "0.00",
"receipt_amount": "0.10",
"send_pay_date": "2019-11-01 09:17:42",
"total_amount": "0.10",
"trade_no": "2019110122001471151409472832",
"trade_status": "TRADE_SUCCESS"
}
}

```
## 广告接口 ##
``` 
https://fw.lepay.vip/Pay/WxFacePay/getadvert
POST
storeid  460

```


## 小程序相关文档 ##

收银台相关   https://opendocs.alipay.com/mini/multi-platform/ltz60x  

支付宝小程序相关 https://opendocs.alipay.com/mini/framework  

发布调试： https://opendocs.alipay.com/mini/multi-platform/vcs0fv