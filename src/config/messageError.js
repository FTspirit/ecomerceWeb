const messageError = {
  InternalServerError: {
    vn: 'Hệ thống đang bảo trì',
    en: 'Internal Server Error',
  },
  NotFound: {
    vn: 'Không tìm thấy',
    en: 'Not Found',
  },
  addCarError: {
    vn: 'Thông tin biển số xe đã tồn tại',
    en: 'License plate information already existed',
  },
  FeaturePenaltyError: {
    vn: 'Tính năng tra cứu phạt nguội đang bảo trì, vui lòng thử lại sau',
    en: 'The penalty search feature  is currently under maintenance',
  },
  LicensePlateNotfound: {
    vn: 'Biển số xe không có thông tin phạt nguội',
    en: 'The license plate has no fine information',
  },
  deleteLicensePlate: {
    vn: 'Thông tin biển số xe không hợp lệ',
    en: 'Invalid license plate information',
  },
  phoneNumberExist: {
    vn: 'Số điện thoại đã tồn tại trong hệ thống',
    en: 'Phone number already exists',
  },
  phoneNumberNotExist: {
    vn: 'Số điện thoại không tồn tại trong hệ thống',
    en: 'Phone number not exists',
  },
  userRegisted: {
    vn: 'Người dùng đã đăng kí trong hệ thống',
    en: 'User registered',
  },
  updatePassword: {
    vn: 'Cập nhật mật khẩu thất bại',
    en: 'Password update failed',
  },
  otpCodeInvalid: {
    vn: 'Mã OTP không hợp lệ',
    en: 'OTP code is invalid',
  },
  changePasswordCurrent: {
    vn: 'Mật khẩu hiện tại không hợp lệ',
    en: 'Invalid current password',
  },
  changePasswordSame: {
    vn: 'Mật khẩu mới không được giống mới mật khẩu hiện tại',
    en: 'The new password cannot be the same as the current password',
  },
  customerIdNotExist: {
    vn: 'Người dùng không tồn tại trong hệ thống',
    en: 'User not exist',
  },
  xIdNotFound: {
    vn: 'Không tìm thấy x-id',
    en: 'x-id not found',
  },
  sessionOTPTimeout: {
    vn: 'Phiên làm việc hết hạn',
    en: 'Session time out',
  },
  banAccount: {
    vn: 'Tài khoản bị khóa',
    en: 'Account locked',
  },
  loginWithPasswordFail: {
    vn: 'Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.',
    en: 'Wrong phone number or password',
  },
  tooManyRequest: {
    vn: 'Quá nhiều yêu cầu. Vui lòng thử lại sau.',
    en: 'Too many request.',
  },
};
module.exports = messageError;
