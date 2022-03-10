const errMsg = {
  errCode: "E0000",
  errStr: "Occurred Error",
};
export const ERR_E0001 = "E0001";
const errAccountMsg = {
  errCode: ERR_E0001,
  errStr: "Not found the account",
};
export const ERR_E0002 = "E0002";
const errPasswordMsg = {
  errCode: ERR_E0002,
  errStr: "Password is Error",
};

export const integratedFetch = (data, errCode = null, delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (null === errCode) {
        return resolve(data);
      } else if (errCode === ERR_E0001) {
        return reject(errAccountMsg);
      } else if (errCode === ERR_E0002) {
        return reject(errPasswordMsg);
      }
      return reject(errMsg);
    }, delay);
  });
};
