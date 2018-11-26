export function EmptyGoal() {
  return {
    goal: '',
  };
}

export function EmptyProblem() {
  return {
    problem: '',
  };
}

export function getArrWithFirst(len, fill, first) {
  let retArr = getArrWith(len, fill);

  retArr[0] = first;

  return retArr;
}

export function getArrWith(len, fill) {
  return new Array(len).fill(fill);
}

export function getFirstKey(obj) {
  return Object.keys(obj)[0];
}

export function arrObjEqual(arr1, arr2, key) {
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i][key] !== arr2[i][key]) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function arrEqual(arr1, arr2) {
  if (arr1.length === arr2.length) {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function emptyArrStart(pushFx, defaultNum = 1) {
  let retArr = [];

  for (let i = 0; i < defaultNum; i++) {
    retArr.push(pushFx());
  }

  return retArr;
}

export function arrRmEmptyObj(arr, key) {
  let retArr = [];

  for (let i = 0; i < arr.length; i++) {
    const selected = arr[i];
    const shouldPush = ((key && selected[key]) || (!key && selected)) ? true : false;

    if (shouldPush) {
      retArr.push(selected);
    }
  }

  return retArr;
}

export function arrPushFor(arr, push, defaultNum = 1) {
  let retArr = arr.slice();

  for (let i = 0; i < defaultNum; i++) {
    retArr.push(push);
  }

  return retArr;
}

export function getAddTotal(arr, addTarget, key) {
  let addTotal = addTarget;

  for (let i = arr.length - 1; i >= 0; i--) {
    let selected = arr[i];

    if (key) {
      selected = arr[i][key];
    }

    if (!selected && addTotal > 0) {
      addTotal--;
    } else {
      break;
    }
  }

  return addTotal;
}

export function arrObjConform(arr, objFx, defaultNum = 1) {
  const defaultArr = emptyArrStart(objFx, defaultNum);

  if (arr.length === 0) {
    return defaultArr;
  }

  const defaultObj = objFx();
  const defaultKey = getFirstKey(defaultObj);
  const isArrDefault = arrObjEqual(arr, defaultArr, defaultKey);

  if (isArrDefault) {
    return defaultArr;
  }

  let retArr = arr.slice();

  if (defaultNum > 1) {
    const addTotal = getAddTotal(retArr, defaultNum - 1, defaultKey);

    retArr = arrPushFor(retArr, defaultObj, addTotal);
  }

  return retArr;
}

export function arrObjCondense(arr, objFx, defaultNum = 1) {
  let retArr = arrRmEmptyObj(arr, getFirstKey(objFx()));

  retArr = arrObjConform(retArr, objFx, defaultNum);

  return retArr;
}

export function arrConform(arr, defaultNum = 1) {
  const empty = '';
  const defaultArr = getArrWith(defaultNum, empty);

  if (arr.length === 0 || arrEqual(arr, defaultArr)) {
    return defaultArr;
  }

  let retArr = arr.slice();

  if (defaultNum > 1) {
    const addTotal = getAddTotal(retArr, defaultNum - 1);

    retArr = arrPushFor(retArr, empty, addTotal);
  }

  return retArr;
}

export function arrCondense(arr, defaultNum = 1) {
  let retArr = arrRmEmptyObj(arr);

  retArr = arrConform(retArr, defaultNum);

  return retArr;
}

export function stripNullEmpty(arr) {
  let retArr = [];

  for (let i = 0; i < arr.length; i++) {
    const arrElement = arr[i];

    if (arrElement !== null && arrElement.length !== 0) {
      retArr.push(arrElement);
    }
  }

  return retArr;
}

export function timeFormat(timestamp) {
  let theDate = new Date(timestamp);
  let year = theDate.getFullYear();
  let month = (theDate.getMonth() < 10) ? '0' + theDate.getMonth() : theDate.getMonth();
  let date = theDate.getDate();
  let hour = (theDate.getHours() < 10) ? '0' + theDate.getHours() : theDate.getHours();
  let min = (theDate.getMinutes() < 10) ? '0' + theDate.getMinutes() : theDate.getMinutes();
  let sec = (theDate.getSeconds() < 10) ? '0' + theDate.getSeconds() : theDate.getSeconds();
  let time = year + '-' + month + '-' + date + '_' + hour + '-' + min + '-' + sec;

  return time;
}

// export function nonNullLength(arr) {
//   let counter = 0;

//   for (let i = 0; i < arr.length; i++) {
//     const arrElement = arr[i];

//     if (arrElement !== null) {
//       counter++;
//     }
//   }

//   return counter;
// }

// export function arrObjFlat(arr, flatOnKey) {
//   let retArr = [];

//   for (let i = 0; i < arr.length; i++) {
//     let innerArr = arr[i][flatOnKey];

//     if (innerArr) {
//       for (let j = 0; j < innerArr.length; j++) {
//         retArr.push(innerArr[j]);
//       }
//     }
//   }

//   return retArr;
// }
