exports.fakeUserData = {
    first_name: 'Dummy',
    last_name: 'User',
    email: 'testing@user.com',
    password: '123456'
};

exports.fakeEmployeeData = {
    name: "Abhishek",
    salary: "145000",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform"
}

exports.fakeEmployeeList = [
    {
        "name": "Abhishek",
        "salary": "145000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Anurag",
        "salary": "90000",
        "currency": "USD",
        "department": "Banking",
        "on_contract": "true",
        "sub_department": "Loan"
    },
    {
        "name": "Himani",
        "salary": "240000",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Yatendra",
        "salary": "30",
        "currency": "USD",
        "department": "Operations",
        "sub_department": "CustomerOnboarding"
    },
    {
        "name": "Ragini",
        "salary": "30",
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Nikhil",
        "salary": "110000",
        "currency": "USD",
        "on_contract": "true",
        "department": "Engineering",
        "sub_department": "Platform"
    },
    {
        "name": "Guljit",
        "salary": "30",
        "currency": "USD",
        "department": "Administration",
        "sub_department": "Agriculture"
    },
    {
        "name": "Himanshu",
        "salary": "70000",
        "currency": "EUR",
        "department": "Operations",
        "sub_department": "CustomerOnboarding"
    },
    {
        "name": "Anupam",
        "salary": "200000000",
        "currency": "INR",
        "department": "Engineering",
        "sub_department": "Platform"
    }
]

exports.mockRequest = (sessionData, body, params, query) => ({
    session: { data: sessionData },
    body,
    params,
    query
});

exports.mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};