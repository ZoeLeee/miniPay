export const RequestStatus={
  OK:1,
  Fail:0,
}
const HOST_URL="https://fw.lepay.vip/index.php/";
const CODE_URL="https://fw.lepay.vip/Pay/WxFacePay/";

export const RequestApi={
  Pay:HOST_URL+"Register/PayAndRefund/tofastpay",
  Login:HOST_URL+"Xcxapi/MerchantLogin/login",
  Code:CODE_URL+ "qrCodePay",
}

export const PayType={
  My:"0",
  Wx:"1",
}