const SUCCESS = 0;
const FAILURE = 1;
const ERROR = -1;

const SUCCESS_MSG = 'success';
const SFAILURE_MSG = 'failure';

class AjaxResult {
  errNo = 0;
  data = {};
  message = '';

  constructor (errNo, data, message) {
    this.errNo = errNo;
    this.data = data;
    this.message = message
  }
}

const emptySucess = () => {
  return new AjaxResult(SUCCESS, {}, SUCCESS_MSG);
};

const sucess = data => {
  return new AjaxResult(SUCCESS, data, SUCCESS_MSG);
};

const fail = data => {
  return new AjaxResult(FAILURE, data, SFAILURE_MSG);
};

const error = (data, failMsg) => {
  return new AjaxResult(ERROR, data, failMsg);
};

export {
  emptySucess,
  sucess,
  fail,
  error
};
