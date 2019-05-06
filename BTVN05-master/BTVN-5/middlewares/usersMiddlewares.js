const creatUser = (req, res, next) => {
    if (!req.body.username) {
        return next (new Error('require_username'));
    }
    if (!req.body.age) {
        return next (new Error('require_age'));
    }
    if (!req.body.address) {
        return next (new Error('require_adress'));
    }
    return next();
};

const updateUser = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    if (!req.body){
        return next (new Error('require_data_update'));
    }
    return next();
};

const getUser = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    return next();
};

const deleteUser = (req, res, next) => {
    if (isNaN(parseInt(req.params.id))) {
        return next (new Error('require_id_is_number'));
    }
    return next();
};

module.exports = {
    creatUser,
    updateUser,
    getUser,
    deleteUser
};