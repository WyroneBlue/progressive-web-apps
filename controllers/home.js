const index = (req, res) => {
    const page = {
        title: "Home"
    };

    res.status(200).render('home', {
        page,
    });
};

const test = (req, res) => {
    const page = {
        title: "Test"
    };

    res.status(200).render('test', {
        page,
    });
};

export { index, test }