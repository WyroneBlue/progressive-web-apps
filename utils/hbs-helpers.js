const boolFn = (check, val) => {
    return check === true ? val : '';
};

const timesFn = (n, block) => {
    var accum = '';
    for (var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
};

export { boolFn, timesFn };