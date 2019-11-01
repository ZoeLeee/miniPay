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
  Banner:CODE_URL+"getadvert",
  MyPayRes:CODE_URL+"aliQueryOrder",
  WxPayRes:CODE_URL+"queryOrder",
}

export const PayType={
  My:"0",
  Wx:"1",
}

export const UseMode={
  Link:"0",
  NoLink:"1",
}

export const USE_MODE_KEY="useMode";