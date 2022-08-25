exports.fakeUserData = {
    first_name: 'Dummy',
    last_name: 'User',
    email: 'testing@user.com',
    password: '123456'
};

exports.mockRequest = (sessionData, body) => ({
    session: { data: sessionData },
    body,
});

exports.mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};