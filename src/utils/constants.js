export const JUDGE_STATUS = {
  '-2': {
    name: '编译错误 / CE',
    short: 'CE',
    color: 'black',
    type: 'warning'
  },
  '-1': {
    name: '答案错误 / WA',
    short: 'WA',
    color: 'red',
    type: 'error'
  },
  '0': {
    name: '答案正确 / AC',
    short: 'AC',
    color: 'green',
    type: 'success'
  },
  '1': {
    name: '时间超限 / TLE',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '2': {
    name: '时间超限 / TLE',
    short: 'TLE',
    color: 'red',
    type: 'error'
  },
  '3': {
    name: '内存超限 / MLE',
    short: 'MLE',
    color: 'red',
    type: 'error'
  },
  '4': {
    name: '运行异常 / RE',
    short: 'RE',
    color: 'red',
    type: 'error'
  },
  '5': {
    name: '系统错误 / SE',
    short: 'SE',
    color: 'red',
    type: 'error'
  },
  '6': {
    name: '请等待',
    color: 'yellow',
    type: 'warning'
  },
  '7': {
    name: '判断中',
    color: 'blue',
    type: 'info'
  },
  '8': {
    name: 'Partial Accepted',
    short: 'PAC',
    color: 'blue',
    type: 'info'
  },
  '9': {
    name: '提交中',
    color: 'yellow',
    type: 'warning'
  }
}

export const CONTEST_STATUS = {
  'NOT_START': '1',
  'UNDERWAY': '0',
  'ENDED': '-1'
}

export const CONTEST_STATUS_REVERSE = {
  '1': {
    name: '未开始',
    color: 'yellow'
  },
  '0': {
    name: '进行中',
    color: 'green'
  },
  '-1': {
    name: '已结束',
    color: 'red'
  }
}

export const RULE_TYPE = {
  ACM: 'ACM',
  OI: 'OI'
}

export const CONTEST_TYPE = {
  PUBLIC: 'Public',
  PRIVATE: 'Password Protected'
}

export const USER_TYPE = {
  REGULAR_USER: 'Regular User',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'Super Admin'
}

export const PROBLEM_PERMISSION = {
  NONE: 'None',
  OWN: 'Own',
  ALL: 'All'
}

export const STORAGE_KEY = {
  AUTHED: 'authed',
  PROBLEM_CODE: 'problemCode',
  languages: 'languages'
}

export function buildProblemCodeKey (problemID, contestID = null) {
  if (contestID) {
    return `${STORAGE_KEY.PROBLEM_CODE}_${contestID}_${problemID}`
  }
  return `${STORAGE_KEY.PROBLEM_CODE}_NaN_${problemID}`
}

export const GOOGLE_ANALYTICS_ID = 'UA-111499601-1'
