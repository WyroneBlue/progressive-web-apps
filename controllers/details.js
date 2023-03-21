const index = (req, res) => {

    const page = {
        title: "Details"
    };

    const id = req.params.id;
    console.log(id);

    res.status(200).render('details', {
        layout: 'details',
        page,
    });
};

export { index }